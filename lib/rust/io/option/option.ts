// deno-lint-ignore-file no-explicit-any
import { $panic } from '../../mod.ts';
import { Exception } from '../exception.ts';




export class Option<T> extends Exception<T,None> {
  public readonly value: T|None;
  protected readonly isException: boolean;

  constructor(val: T|None) {
    super();
    this.value=val;
    this.isException=!(val??false);
  }

  protected res(): any {
    return this.value;
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
    return this.isException?this:f(this.value!);
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
    return this.isException?op(this.res()):this.clone();
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
    if(this.isException) $panic(msg);
    return this.res();
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
  public expectNone(callback: (val: T)=> never): None {
    if(!this.isException) callback(this.res());
    return this.res();
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
  public unwrapOr(op: T): T {
    return this.isException?op:this.res();
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
  public unwrap(): T {
    const res=this.res();
    return this.isException?$panic(res):res;
  }

  /**
   * Returns the contained `Some` value or if the value is `None` calls `f` and returns the result.
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.unwrapOrElse(()=> Some(69)),Some(69));
   * ```
   */
  public unwrapOrElse(f: (none: None)=> T): T {
    const res=this.res();
    return this.isException?f(res):res;
  }


  /**
   * Returns whether the object contains a `Some` value.
   */
  public contains() {
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
}

export type None=undefined|null;
export type Some<T>=NonNullable<T>;
export const none=Option.None;

export function Some<T>(val: T) {
  return new Option(val);
}

/**
 * @param {None} val
 * @returns {Option<T>}
 * @description use for extream type safety
 */
export function None<T>(val: None): Option<T> {
  return new Option<T>(val);
}
