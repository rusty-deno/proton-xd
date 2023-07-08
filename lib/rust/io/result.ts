import panic from "../error/panic.ts";
import Option,{ Some } from './option.ts';
import { Exception } from './exception.ts';

export type Ok<T>=NonNullable<T>;
export type Err<E extends Error=Error>=E;


export default class Result<T,E extends Error> implements Exception<T,E> {
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
  
  public err(): Option<E> {
    return this.res instanceof Error?Some(this.res):Option.None;
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