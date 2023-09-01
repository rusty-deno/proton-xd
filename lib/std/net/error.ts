import { Err } from "../mod.ts";


export class HttpError<E extends (Err|Response)=Response> extends Error {
  err?: Err;
  res?: Response;

  constructor(res?: E) {
    super();
    if(res instanceof Response) this.res=res;
    else this.err=res;
  }

}

