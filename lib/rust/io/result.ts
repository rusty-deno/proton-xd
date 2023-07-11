import Option,{ Some } from './option.ts';
import Exception from './exception.ts';

export type Ok<T>=NonNullable<T>;
export type Err<E extends Error=Error>=E;


export default class Result<T,E extends Error> extends Exception<T,E> {
  public readonly result: T|E;

  constructor(res: T|E) {
    super();
    this.result=res;
  }

  get isException() {
    return this.result instanceof Error;
  }

  public err(): Option<E> {
    return this.isException?Some(this.result):Option.None;
  }

  public and(res: Result<T,E>): Result<T,E> {
    return this.isException?this:res;
  }

  public andThen(f: (xd: T)=> Result<T,E>) {
    return this.result instanceof Error?this:f(this.result);
  }

  public orElse(op: (err: E)=> Result<T,E>) {
    return this.result instanceof Error?op(this.result):this;
  }

  public res() {
    return this.result;
  }




  public static Ok=<T>(res: T)=> Ok<T>(res);
  public static Err=<T>(err: Err=new Error)=> Err<T>(err);
}


export function Err<T>(err: Err=new Error) {
  return new Result<T,Err>(err);
}
export function Ok<T>(res: T) {
  return new Result<T,Err>(res);
}

export async function Res<T>(f: ()=> Promise<T>) {
  return new Result<T,Err>(await f().catch((error)=> error));
}

export function ResSync<T>(f: ()=> T) {
  try {
    return Ok<T>(f());
  } catch (error) {
    return Err<T>(error);
  }
}