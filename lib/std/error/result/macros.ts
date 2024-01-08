// deno-lint-ignore-file no-explicit-any
import { Fn,AsyncFn } from "../../types.ts";
import { Ok,Err } from "./result.ts";
import { AsyncResult } from "./async_result.ts";


export function $result<T,P extends any[],E=Err>(f: AsyncFn<P,T>,...args: P): AsyncResult<T,E> {
  return new AsyncResult(f(...args).then(res=> Ok(res)).catch(err=> Err(err)));
}

export function $resultSync<T,P extends any[],E=Err>(f: Fn<P,T>,...args: P) {
  try {
    return Ok<T,E>(f(...args));
  } catch (error) {
    return Err<T,E>(error);
  }
}