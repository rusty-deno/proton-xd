import { Fn } from "../../types.ts";
import { Option,None } from './option.ts';


export class AsyncOption<T> extends Promise<Option<T>> {
  constructor(val: Promise<Option<T>>) {
    super(resolve=> resolve(val));
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
  public and(optb: Option<T>) {
    return new AsyncOption(this.then(val=> val.and(optb)));
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
  public andThen(f: (xd: T)=> Option<T>) {
    return new AsyncOption(this.then(val=> val.andThen(f)));
  }
  
  /**
   * Returns `None` if the option is `None`, otherwise calls predicate with the wrapped value and returns:
   * * `Some` if predicate returns true (where t is the wrapped value), and
   * * `None` if predicate returns false.
   */
  public filter(predicate: Fn<[val: T],boolean>) {
    return new AsyncOption(this.then(opt=> opt.filter(predicate)));
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
  public or(optb: Option<T>) {
    return new AsyncOption(this.then(val=> val.or(optb)));
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
  public orElse(f: (err: None)=> Option<T>) {
    return new AsyncOption(this.then(val=> val.orElse(f)));
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
  public async expect(msg: string) {
    return (await this).expect(msg);
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
  public async expectNone(callback: (s: T)=> never) {
    return (await this).expectNone(callback);
  }
  
  /**
   * Inserts the given `Some` value in the current {@linkcode Option}
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.insert(69),Some(69));
   * ```
   */
  public async insert(val: T) {
    (await this).insert(val);
  }

  /** Empties the current {@linkcode Option}. */
  public async empty() {
    (await this).empty();
  }

  /**
   * Returns the contained `Some` value or Inserts the given `Some` value in the current {@linkcode Option} and returns it.
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.getOrInsert(69),Some(69));
   * ```
   */
  public async getOrInsert(val: T) {
    return (await this).getOrInsert(val);
  }
  
  /**
   * Maps an {@linkcode Option<T>} to {@linkcode Option<U>} by applying a function to a contained value (if `Some`) or returns `None` (if `None`).
   * 
   * Kind of like `?.` notation
   */
  public map<U>(f: Fn<[val: T], U>) {
    return new AsyncOption(this.then(opt=> opt.map(f)));
  }

  /**
   * Returns the provided default result (if `None`), or applies a function to the contained value.
   * 
   * Arguments passed to {@linkcode mapOr} are eagerly evaluated; if you are passing the result of a function call, it is recommended to use {@linkcode mapOrElse}, which is lazily evaluated.
   */
  public async mapOr<U>(def: U,f: Fn<[val: T],U>) {
    return (await this).mapOr(def,f);
  }

  /**
   * Computes a default function result (if `None`), or applies a different function to the contained value.
   */
  public async mapOrElse<U>(def: Fn<[],U>,f: Fn<[val: T],U>) {
    return (await this).mapOrElse(def,f);
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
  public async unwrapOr(optb: T) {
    return (await this).unwrapOr(optb);
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
  public async unwrap() {
    return (await this).unwrap();
  }

  /**
   * Returns the contained `Some` value or if the value is `None` calls {@linkcode f} and returns the result.
   * # Example
   * ```ts
   * const xd=None(null);
   * $assertEq(xd.unwrapOrElse(()=> Some(69)),Some(69));
   * ```
   */
  public async unwrapOrElse(f: (none: None)=> T) {
    return (await this).unwrapOrElse(f);
  }
  
  /**
   * Returns the contained `Some` value or if the value is `None` throws an exception.
   * #### Not recommended to use.
   */
  public async unwrapOrThrow() {
    return (await this).unwrapOrThrow();
  }
  
  /**
   * Returns the contained value without checking it.
   * 
   * #### It may lead the code to undefined behavior.
   * #### Not recommended to use.
   */
  public async unwrapUnchecked() {
    return (await this).unwrapUnchecked();
  }


  /**
   * Returns whether the object contains a `Some` value.
   */
  public async contains() {
    return (await this).contains();
  }

  /**
   * Returns whether the object contains a `None` value.
   */
  public async containsNone() {
    return (await this).containsNone();
  }
}




