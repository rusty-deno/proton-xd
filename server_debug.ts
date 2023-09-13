

import { Server } from "./lib/std/net/mod.ts";


// const _s=Deno.serve({},(req)=> {
//   console.log(req);
//   return new Response;
// });


const server=new Server({ port: 6969 });

server.get("/",()=> {
  return new Response("xd");
});


server.init();




