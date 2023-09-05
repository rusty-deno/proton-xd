import { $panic } from '../mod.ts';
import { Clone } from '../clone.ts';


export abstract class Exception<T,E> implements Clone {

  /**
   * Function to match the value stored in the derived-class
   */
  protected abstract match<T1,E1>(t: (t: T)=> T1,e: (e: E)=> E1): T1|E1;

  /**
   * Function to access the value stored in the derived-class
   */
  protected abstract res(): T|E;

  /**
   * # `isException`
   * * It must be defined as it tells whether the stored value is an `Exception`.
   */
  protected abstract readonly isException: boolean;
  
  /**
   * * Returns `Exception` if the value is an `Exception`,otherwise returns optb.
   * * Arguments passed to and are eagerly evaluated; if you are passing the result of a function call, it is recommended to use andThen.
   */
  public abstract and(optb: this): unknown;

  /**
   * * Returns `Exception` if the object is `Exception`, otherwise calls f with the wrapped value and returns the result.
   * * Some languages call this operation flatmap.
   */
  public abstract andThen(f: (xd: T)=> unknown): unknown;

  /**
   * * Returns the `this` if it isn't an `Exception`,otherwise returns optb.
   */
  public or(optb: this): this {
    return this.isException?optb:this.clone();
  }
  /**
   * * Returns the `this` if it isn't an `Exception`,otherwise calls `f` and returns the result.
   */
  public orElse(f: (err: E)=> this): this {
    return this.match(_=> this.clone(),f);
  }
  
  /**
   * * Returns the contained value.
   * # Panics
   * * Panics if the value is a `None` with a custom panic message provided by msg.
   */
  public expect(msg: string): T {
    return this.match(t=> t,_=> $panic(msg));
  }
  
  /**
   * * Returns the contained non `Exception` value or a provided default.
   * * Arguments passed to unwrapOr are eagerly evaluated; if you are passing the result of a function call, it is recommended to use unwrapOrElse.
   */
  public unwrapOr(op: T): T {
    return this.match(t=> t,_=> op);
  }
  
  /**
   * Returns whether the object contains a non `Exception` value.
   */
  public contains() {
    return !this.isException;
  }
  
  public unwrap(): T {
    // deno-lint-ignore no-explicit-any
    return this.match(t=> t,e=> $panic(e as any));
  }
  
  public unwrapOrElse(f: (err: E)=> T): T {
    return this.match(t=> t,f);
  }

  public unwrapUnchecked(): T|E {
    return this.res();
  }
  
  clone(): this {
    return structuredClone(this);
  }
}