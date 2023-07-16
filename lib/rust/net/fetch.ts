import { Result,Ok,Err } from "../mod.ts";
import { HttpError } from './error.ts';


export async function fetchApi(inp: string|URL|Request,init?: RequestInit): Promise<Result<Response,HttpError>> {
  try {
    const res=await fetch(inp,init);
    if(!res.ok) throw new HttpError(res);

    return Ok(res);
  } catch(err) {    
    return Err(err);
  }
}
