import { Server } from './lib/std/net/server/server.ts';


// Deno.serve(async ()=> new Response(await Deno.readTextFile("./index.html")));



const server=new Server({ port: 6969 });

server.get("/",()=> {
  return new Response();
});




server.listen();