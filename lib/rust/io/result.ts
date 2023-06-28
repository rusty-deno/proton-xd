import panic from '../error/panic.ts';
import ErrorHandler from '../error/error_handle.ts';

export type Err=Error;
export type OK<T>=NonNullable<T>;


export default class Result<T> implements ErrorHandler<T,Error> {
  public readonly res: T|Error;

  constructor(res: T|Error) {
    this.res=res;
  }

  public unwrap(): T {
    if(this.res instanceof Error) panic(this.res.message);
    return this.res;
  }

  public unwrapOrElse(f: (err: Error)=> T): T {
    return this.res instanceof Error?f(this.res):this.res;
  }
  
  public unwrapOrUnchecked() {
    if(this.res instanceof Error) throw new Error(this.res.message,{
      cause: this.res.cause
    });
    return this.res;
  }

  
}


export function Err() {
  return new Result(new Error());
}

