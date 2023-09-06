// deno-lint-ignore-file no-explicit-any
import { $panic } from '../../mod.ts';
import { Exception } from '../exception.ts';




export class Option<T> extends Exception<T,None> {
  private _value: T|None;
  protected isException: boolean;

  constructor(val: T|None) {
    super();
    this._value=val;
    this.isException=val==null;
  }

  protected match<S,N>(t: (t: T)=> S,e: (e: None)=> N): S|N {
    const res=this.res();
    return this.isException?e(res):t(res);
  }

  protected res(): any {
    return this._value;
  }

  public get value() {
    return this._value;
  }

  public set value(val) {
    this._value=val;
    this.isException=val==null;
  }


  /**
   * * Returns `None` if the value is `None`,otherwise returns optb.
   * * Arguments passed to and are eagerly evaluated; if you are passing the result of a function call, it is recommended to use andThen.
   * 
   * # Example
   * ```ts
   * const x=Some(0);
   * const y=Some(69)
   * $assertEq(x.and(y),Some(69));
   * ```
   */
  public and(op: this): Option<T> {
    return this.isException?this:op;
  }
  
  /**
   * * Returns `None` if the option is `None`, otherwise calls f with the wrapped value and returns the result.
   * * Some languages call this operation flatmap.
   * 
   * # Example
   * ```ts
   * const xd=Some(69);
   * $assertEq(xd.andThen(x=> None(null)),None(null));
   * ```
   */
  public andThen(f: (xd: T)=> Option<T>): Option<T> {
    return this.match(f,_=> this.clone());
  }

  /**
   * * Returns the `Option` if it contains a value,otherwise returns optb.
   * 
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.or(Some(69)),Some(69));
   * ```
   */
  public override or(optb: this): this {
    return this.isException?optb:this.clone();
  }

  /**
   * * Returns the `Option` if it contains a value, otherwise calls `f` and returns the result.
   * 
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.orElse(()=> Some(69)),Some(69));
   * ```
   */
  public override orElse(op: (err: None)=> this): this {
    return this.match(_=> this.clone(),op);
  }

  /**
   * * Returns the contained `Some` value.
   * 
   * # Panics
   * * Panics if the value is a `None` with a custom panic message provided by msg.
   * 
   * # Example
   * ```ts
   * const xd=Some(69);
   * console.log(xd.expect("xd is None"));
   * ```
   */
  public override expect(msg: string): T {
    return this.match(s=> s,_=> $panic(msg));
  }

  /**
   * * Returns the contained `None` value.
   * 
   * # Panics
   * * Panics if the value is a `Some` with a custom callback.
   * 
   * # Example
   * ```ts
   * const xd=Some(69);
   * xd.expectNone(()=> console.log("xd is Some"));
   * ```
   */
  public expectNone(callback: (s: T)=> never): None {
    return this.match(callback,n=> n);
  }

  public insert(val: T) {
    this._value=val;
    this.isException=false;
  }

  public getOrInsert(val: T) {
    return this.match(t=> t,_=> this.value=val);
  }

  /**
   * * Returns the contained `Some` value or a provided default.
   * * Arguments passed to unwrapOr are eagerly evaluated; if you are passing the result of a function call, it is recommended to use unwrapOrElse.
   * 
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.unwrapOr(69),Some(69));
   * ```
   */
  public override unwrapOr(op: T): T {
    return this.match(s=> s,_=> op);
  }

  /**
   * * Returns the contained `Some` value.
   * * Because this function may panic, its use is generally discouraged. Instead, prefer to use pattern matching and handle the None case explicitly, or call `unwrapOr`, `unwrapOrElse`.
   * # Panics
   * Panics if the self value equals `None`.
   * # Example
   * ```ts
   * const xd=Some(69);
   * $assertEq(xd.unwrap(),69);
   * ```
   */
  public override unwrap(): T {
    return this.match(s=> s,e=> $panic(e as any));
  }

  /**
   * Returns the contained `Some` value or if the value is `None` calls `f` and returns the result.
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.unwrapOrElse(()=> Some(69)),Some(69));
   * ```
   */
  public override unwrapOrElse(f: (none: None)=> T): T {
    return this.match(s=> s,f);
  }


  /**
   * Returns whether the object contains a `Some` value.
   */
  public override contains() {
    return !this.isException;
  }

  /**
   * Returns whether the object contains a `None` value.
   */
  public containsNone() {
    return this.isException;
  }

  public static get None() {
    return None<any>(null);
  }

  public static Some<T>(val: T) {
    return new Option<T>(val);
  }
}

export type None=undefined|null;
export type Some<T>=NonNullable<T>;
export const none=Option.None;

export function Some<T>(val: T) {
  return Option.Some(val);
}

/**
 * Use it for extream type safety
 */
export function None<T>(val: None): Option<T> {
  return new Option<T>(val);
}
