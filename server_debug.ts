import { Server } from "./mod/net.ts";


// Deno.serve(async ()=> new Response(await Deno.readTextFile("./index.html")));



const server=new Server({ port: 6969 });



server.get("/:xd/(69|xd)",()=> {
  return new Response("xd",{ status: 200 });
});




server.listen();