// deno-lint-ignore-file no-explicit-any
import { $panic } from '../../mod.ts';
import { Exception } from '../exception.ts';




export class Option<T> extends Exception<T,None> {
  protected isException: boolean;

  constructor(private _value: T|None) {
    super();
    this.isException=_value==null;
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
   * Returns `None` if the value is `None`,otherwise returns {@linkcode optb}.
   * 
   * Arguments passed to {@linkcode and} are eagerly evaluated.
   * 
   * If you are passing the result of a function call, it is recommended to use {@linkcode andThen}.
   * 
   * # Example
   * ```ts
   * const x=Some(0);
   * const y=Some(69)
   * $assertEq(x.and(y),Some(69));
   * ```
   */
  public and(optb: this): Option<T> {
    return this.isException?this:optb;
  }
  
  /**
   * Returns `None` if the option is `None`, otherwise calls {@linkcode f} with the wrapped value and returns the result.
   * 
   * Some languages call this operation `flatmap`.
   * 
   * # Example
   * ```ts
   * const xd=Some(0);
   * $assertEq(xd.andThen(x=> Some(69)),Some(69));
   * ```
   */
  public andThen(f: (xd: T)=> Option<T>): Option<T> {
    return this.match(f,_=> this.clone());
  }

  /**
   * Returns the {@linkcode Option} if it contains a value, otherwise returns {@linkcode optb}.
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
   * Returns the {@linkcode Option} if it contains a value, otherwise calls {@linkcode f} and returns the result.
   * 
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.orElse(()=> Some(69)),Some(69));
   * ```
   */
  public override orElse(f: (err: None)=> this): this {
    return this.match(_=> this.clone(),f);
  }

  /**
   * Returns the contained `Some` value.
   * 
   * # Panics
   * Panics if the value is a `None` with a custom panic message provided by {@linkcode msg}.
   * 
   * # Example
   * ```ts
   * const xd=Some(69);
   * console.log(xd.expect("xd is None"));
   * ```
   */
  public override expect(msg: string): T {
    return this.isException?this.res():$panic(msg);
  }

  /**
   * Returns the contained `None` value.
   * 
   * # Panics
   * Panics if the value is `Some` with a custom {@linkcode callback}.
   * 
   * # Example
   * ```ts
   * const xd=Some(69);
   * xd.expectNone(()=> $panic("xd is Some"));
   * ```
   */
  public expectNone(callback: (s: T)=> never): None {
    return this.match(callback,n=> n);
  }
  
  /**
   * Inserts the given `Some` value in the current {@linkcode Option}
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.insert(69),Some(69));
   * ```
   */
  public insert(val: T) {
    this._value=val;
    this.isException=false;
    return this;
  }

  /**
   * Returns the contained `Some` value or Inserts the given `Some` value in the current {@linkcode Option} and returns it.
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.getOrInsert(69),Some(69));
   * ```
   */
  public getOrInsert(val: T) {
    return this.match(t=> t,_=> this.value=val);
  }

  /**
   * Returns the contained `Some` value or a provided default {@linkcode optb}.
   * 
   * Arguments passed to {@linkcode unwrapOr} are eagerly evaluated;
   * 
   * if you are passing the result of a function call, it is recommended to use {@linkcode unwrapOrElse}.
   * 
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.unwrapOr(69),Some(69));
   * ```
   */
  public override unwrapOr(optb: T): T {
    return this.match(s=> s,_=> optb);
  }

  /**
   * Returns the contained `Some` value.
   * 
   * Because this function may panic, its use is generally discouraged.
   * 
   * Instead, prefer to use pattern matching and handle the None case explicitly, or call {@linkcode unwrapOr}, {@linkcode unwrapOrElse}.
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
   * Returns the contained `Some` value or if the value is `None` calls {@linkcode f} and returns the result.
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.unwrapOrElse(()=> Some(69)),Some(69));
   * ```
   */
  public override unwrapOrElse(f: (none: None)=> T): T {
    return this.match(s=> s,f);
  }

  public override unwrapUnchecked(): T|None {
    return this._value;
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
export function None<T>(val: None=null): Option<T> {
  return new Option<T>(val);
}
