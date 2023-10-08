import { Clone } from '../clone.ts';
import { Exception } from './exception.ts';


/** Async variation of {@linkcode Exception}. */
export class AsyncException<T,E> extends Promise<Exception<T,E>> implements Clone {

  constructor(res: Promise<Exception<T,E>>) {
    super(resolve=> resolve(res));
  }

  /**
   * * Returns {@linkcode Exception} if the value is an {@linkcode Exception},otherwise returns `optb`.
   * * Arguments passed to {@linkcode and} are eagerly evaluated; if you are passing the result of a function call, it is recommended to use {@linkcode andThen}.
   */
  public async and(optb: Awaited<this>): Promise<unknown> {
    return (await this).and(optb);
  }

  /**
   * * Returns {@linkcode Exception} if the object is {@linkcode Exception}, otherwise calls f with the wrapped value and returns the result.
   * * Some languages call this operation `flatmap`.
   */
  public async andThen(f: (xd: T)=> unknown): Promise<unknown> {
    return (await this).andThen(f);
  }

  /**
   * * Returns the `this` if it isn't an {@linkcode Exception},otherwise returns `optb`.
   */
  public async or(optb: Awaited<this>): Promise<Awaited<this>> {
    return (await this).or(optb);
  }

  /**
   * * Returns the `this` if it isn't an {@linkcode Exception},otherwise calls `f` and returns the result.
   */
  public async orElse(f: (err: E)=> Awaited<this>): Promise<Awaited<this>> {
    return (await this).orElse(f);
  }
  
  /**
   * * Returns the contained value.
   * # Panics
   * * Panics if the value is a `None` with a custom panic message provided by msg.
   */
  public async expect(msg: string): Promise<T> {
    return (await this).expect(msg);
  }
  
  /**
   * * Returns the contained non {@linkcode Exception} value or a provided default.
   * * Arguments passed to {@linkcode unwrapOr} are eagerly evaluated; if you are passing the result of a function call, it is recommended to use {@linkcode unwrapOrElse}.
   */
  public async unwrapOr(op: T): Promise<T> {
    return (await this).unwrapOr(op);
  }
  
  /**
   * Returns whether the object contains a non {@linkcode Exception} value.
   */
  public async contains() {
    return (await this).contains();
  }
  
  public async unwrap(): Promise<T> {
    return (await this).unwrap();
  }
  
  public async unwrapOrElse(f: (err: E)=> T): Promise<T> {
    return (await this).unwrapOrElse(f);
  }

  public async unwrapUnchecked(): Promise<T|E> {
    return (await this).unwrapUnchecked();
  }
  
  clone(): this {
    return structuredClone(this);
  }
}