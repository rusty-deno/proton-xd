import panic from '../error/panic.ts';
import ErrorHandler from '../error/error_handle.ts';

export type Err=Error;
export type OK<T>=NonNullable<T>;


export default class Result<T> implements ErrorHandler<T,Err> {
  public readonly res: T|Err;

  constructor(res: T|Err) {
    this.res=res;
  }

  public unwrap(): T {
    if(this.res instanceof Error) panic(this.res);
    return this.res;
  }

  public unwrapOrElse(f: (err: Err)=> T): T {
    return this.res instanceof Error?f(this.res):this.res;
  }
  

}


export function Err() {
  return new Result(new Error());
}

