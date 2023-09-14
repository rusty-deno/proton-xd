import { Server } from "./lib/std/net/mod.ts";
import { GET } from './lib/std/net/macros/routes.ts';

class Main extends Server {
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


