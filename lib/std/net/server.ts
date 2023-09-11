// deno-lint-ignore-file
import { $unimplemented } from "../declarative-macros/mod.ts";
import { Handler,Route,Method } from "./types/server.ts";
import { HashMap } from "../mod.ts";



export class Server {
  private routes=new HashMap<string,Handler>();


  /**
   * Adds a route to the {@linkcode Server} with specified {@linkcode Route}, {@linkcode Method}
   */
  public addRoute(route: Route,method: Method,handler: Handler) {
    $unimplemented();
  }
  
  public get(route: Route,f: Handler) {
    $unimplemented();
  }

  public head(route: Route,f: Handler) {
    $unimplemented();
  }

  public post(route: Route,f: Handler) {
    $unimplemented();
  }

  public put(route: Route,f: Handler) {
    $unimplemented();
  }

  public delete(route: Route,f: Handler) {
    $unimplemented();
  }

  public connect(route: Route,f: Handler) {
    $unimplemented();
  }

  public options(route: Route,f: Handler) {
    $unimplemented();
  }

  public trace(route: Route,f: Handler) {
    $unimplemented();
  }

  public patch(route: Route,f: Handler) {
    $unimplemented();
  }
}



