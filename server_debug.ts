import { Server } from "./lib/std/net/mod.ts";
import { GET } from './lib/std/net/macros/routes.ts';
import { HashMap } from "./lib/std/collections/hash_map/hash_map.ts";
import { Handler,Method,Route } from "./lib/std/net/types/server.ts";


class Main extends Server {
  protected _routes=new HashMap<`${Method}${Route}`,Handler>();

  @GET("/")
  private _root() {
    return new Response("xd");
  }

  public static main(_args: string[]): void {
    const server=new Main;
    server.init();
  }
}


Main.main([]);


