

import { Server } from "./lib/std/net/mod.ts";


// const _s=Deno.serve({},(req)=> {
//   console.log(req);
//   return new Response;
// });

let status=199;

const server=new Server({ port: 6969 });

server.get("/",()=> {
  if(status===599) server.close();
  ++status;
  return new Response(status.toString(),{status});
});


server.init();




