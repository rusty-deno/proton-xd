import { Server,GET } from "./mod/net.ts";
import { Req } from './lib/std/net/types/server.ts';


// Deno.serve(async ()=> new Response(await Deno.readTextFile("./index.html")));

class XD extends Server {
  @GET("/:xd/:xd1/(69|xd)")
  private xd(req: Req,_info: Deno.ServeHandlerInfo) {
    const params=req.params;
    console.log(params.xd,params.xd1);
    
    return new Response("xd",{ status: 200 });
  }
  
  public static main(): void {
    const xd=new XD({ port: 6969 });
    xd.listen();
  }
}

if(import.meta.main) XD.main();




