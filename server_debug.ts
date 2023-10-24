import { Server } from "./mod/net.ts";


// Deno.serve(async ()=> new Response(await Deno.readTextFile("./index.html")));



const server=new Server({ port: 6969 });



server.get("/:xd/:xd1/(69|xd)",(req)=> {
  const params=req.params;
  console.log(params.xd,params.xd1);
  
  return new Response("xd",{ status: 200 });
});




server.listen();