import panic from "../error/panic.ts";
import Option,{ None,Some } from './option.ts';

export type Ok<T>=NonNullable<T>;
export type Err=Error;


export default class Result<T,E extends Error> {
  public readonly res: T|E;
  public readonly isErr: boolean;

  constructor(res: T|E) {
    this.res=res;
    this.isErr=this.res instanceof Error;
  }

  public and(res: Result<T,E>): Result<T,E> {
    return this.isErr?this:res;
  }

  public andThen(f: (xd: T)=> Result<T,E>) {
    return this.res instanceof Error?this:f(this.res);
  }
  
  public err() {
    return this.res instanceof Error?None<T>(null):Some(this.res);
  }

  public expect(msg: string): T {
    if(this.res instanceof Error) panic(msg);
    return this.res;
  }
  
  public expectErr(msg: string) {
    if(this.res instanceof Error) return this;
    panic(`${msg}: ${this.res}`);
  }

  public or(res: T) {
    return this.res instanceof Error?res:this.res;
  }
  
  public orElse(op: (err: E)=> Result<T,E>) {
    return this.res instanceof Error?op(this.res):this;
  }
  
  
  public unwrapOr(op: T) {
    return this.unwrapOrElse(()=> op);
  }

  public contains() {
    return !this.containsErr();
  }

  public containsErr() {
    return this.res instanceof Error;
  }
  
  public unwrap(): T {
    if(this.res instanceof Error) panic(this.res);
    return this.res;
  }
  
  public unwrapOrElse(f: (err: E)=> T): T {
    return this.res instanceof Error?f(this.res):this.res;
  }
}


export function Err<T>(err: Err=new Error) {
  return new Result<T,Err>(err);
}
export function Ok<T>(res: T) {
  return new Result<T,Err>(res);
}
