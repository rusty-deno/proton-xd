import { Ok,Err } from "./result.ts";
import { AsyncResult } from "./async_result.ts";


export function $result<T,E=Err>(f: ()=> Promise<T>): AsyncResult<T,E> {
  return new AsyncResult(f().then(res=> Ok(res)).catch(err=> Err(err)));
}

export function $resultSync<T,E=Err>(f: ()=> T) {
  try {
    return Ok<T,E>(f());
  } catch (error) {
    return Err<T,E>(error);
  }
}