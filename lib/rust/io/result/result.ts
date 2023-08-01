// deno-lint-ignore-file no-explicit-any
import { Option,Some } from '../option/option.ts';
import { Exception } from '../exception.ts';

export type Ok<T>=T;
export type Err<E extends Error=Error>=E;


export class Result<T,E> extends Exception<T,E> {
  public readonly result: T|E;
  public readonly isException: boolean;

  constructor(res: T|E,isException?: boolean) {
    super();
    this.result=res;
    this.isException=isException??res instanceof Error;
  }

  public err(): Option<E> {
    return this.isException?Some(this.result):Option.None;
  }

  public and(res: Result<T,E>): Result<T,E> {
    return this.isException?this:res;
  }

  public andThen(f: (xd: T)=> Result<T,E>) {
    return this.isException?this:f(this._res);
  }

  public orElse(op: (err: E)=> Result<T,E>) {
    return this.isException?op(this._res):this;
  }

  public res() {
    return this.result;
  }




  public static Ok=<T>(res: T)=> Ok<T>(res);
  public static Err=<T>(err: T)=> Err<T>(err);
}


export function Err<T>(err: T) {
  return new Result<any,T>(err,true);
}
export function Ok<T>(res: T) {
  return new Result<T,any>(res);
}

