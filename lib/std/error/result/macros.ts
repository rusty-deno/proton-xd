import { Ok,Err,Result } from "./result.ts";


export async function $result<T,E=Err>(f: ()=> Promise<T>): Promise<Result<T,E>> {
  try {
    return Ok(await f());
  } catch (err) {
    return Err(err);
  }
}

export function $resultSync<T,E=Err>(f: ()=> T) {
  try {
    return Ok<T,E>(f());
  } catch (error) {
    return Err<T,E>(error);
  }
}