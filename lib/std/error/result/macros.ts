import { Ok,Err,Result } from "./result.ts";


export async function $result<T>(f: ()=> Promise<T>): Promise<Result<T,Error>> {
  try {
    return Ok(await f());
  } catch (err) {
    return Err(err);
  }
}

export function $resultSync<T>(f: ()=> T) {
  try {
    return Ok<T,Err>(f());
  } catch (error) {
    return Err<T,Err>(error);
  }
}