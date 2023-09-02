import { Result,Ok,Err } from "./result.ts";


export async function $result<T>(f: ()=> Promise<T>) {
  return new Result<T,Err>(await f().catch((error)=> error));
}

export function $resultSync<T>(f: ()=> T) {
  try {
    return Ok<T>(f());
  } catch (error) {
    return Err<T>(error);
  }
}