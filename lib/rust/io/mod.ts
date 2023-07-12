export * from "./result.ts";
export * from "./option.ts";
export * from "./exception.ts";
export * from "./result.ts";



import * as Option_ from "./option.ts";
import * as opt_ from "./opt.ts";

export namespace option {
  export class Option<T> extends Option_.Option<T> {};
  
  export type Some<T>=NonNullable<T>;
  export function Some<T>(val: T) {
    return new Option(val);
  }
  
  export type None=null|undefined;
  export function None<T>(val: None): Option<T> {
    return new Option<T>(val);
  }

  export const {Opt,OptSync}=opt_;
}



import * as Result_ from "./result.ts";
import * as res_ from "./res.ts";

export namespace result {
  export class Result<T,E extends Error> extends Result_.Result<T,E> {};
  export type Ok<T>=Result_.Ok<T>;
  export type Err=Result_.Err;

  export function Err<T>(err: Err=new Error) {
    return new Result<T,Err>(err);
  }
  export function Ok<T>(res: T) {
    return new Result<T,Err>(res);
  }

  export const {Res,ResSync}=res_;
}