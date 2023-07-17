import {serve} from "https://deno.land/std@0.193.0/http/server.ts";


const handler=(req: Request)=> {
  return new Response(`{"xd": 69}`,{status: 200});
}

await serve(handler,{port: 6969});
