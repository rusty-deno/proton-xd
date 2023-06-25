import panic from './panic.ts';
import ErrorHandler from './error_handle.ts';

export default abstract class Result<T> implements ErrorHandler<T,Error> {
  abstract readonly res: T|Error;

  public unwrap(): T {
    if(this.res instanceof Error) panic(this.res.message);
    return this.res;
  }

  public unwrapOrElse(f: (err: Error)=> T): T {
    return this.res instanceof Error?f(this.res):this.res;
  }

  
}



