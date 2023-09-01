import { Ok,Err,Result } from "../../mod.ts";
import { HttpError } from "../error.ts";


export async function $fetch(inp: string|URL|Request,init?: RequestInit): Promise<Result<Response,HttpError>> {
  try {
    const res=await fetch(inp,init);
    if(!res.ok) throw new HttpError(res);

    return Ok(res);
  } catch(err) {    
    return Err(err);
  }
}