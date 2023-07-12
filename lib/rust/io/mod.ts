import * as res from "./result.ts";
import * as opt from "./option.ts";
import * as exception from "./exception.ts";



export module io {
  export class Result<T,E extends Error> extends res.Result<T,E> {};
  export class Option<T> extends opt.Option<T> {};
  export abstract class Exception<T,E> extends exception.Exception<T,E> {};

  export type None=opt.None;
  export type Some<T>=opt.Some<T>;
  export const {None,Some,Opt,OptSync}=opt;

  export type Ok<T>=res.Ok<T>;
  export type Err<T extends Error>=res.Err<T>;
  export const {Err,Ok,Res,ResSync}=res;
}


export class Result<T,E extends Error> extends res.Result<T,E> {};
export class Option<T> extends opt.Option<T> {};
export abstract class Exception<T,E> extends exception.Exception<T,E> {};

