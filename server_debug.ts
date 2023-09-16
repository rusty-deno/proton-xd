import { Server } from "./lib/std/net/mod.ts";

const server=new Server({ port: 6969 });


server.get("/",()=> {
  return new Response("xd");
});



server.listen();
