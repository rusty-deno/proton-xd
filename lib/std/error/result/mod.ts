import { Result,Err,Ok } from "./result.ts";

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

export * from "./result.ts";