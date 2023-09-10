// deno-lint-ignore-file
import { $unimplemented } from "../declarative-macros/mod.ts";
import { RouteCallback } from "./types.ts";



export class Server {
  
  public get(route: string,f: RouteCallback) {
    $unimplemented();
  }

  public head(route: string,f: RouteCallback) {
    $unimplemented();
  }

  public post(route: string,f: RouteCallback) {
    $unimplemented();
  }

  public put(route: string,f: RouteCallback) {
    $unimplemented();
  }

  public delete(route: string,f: RouteCallback) {
    $unimplemented();
  }

  public connect(route: string,f: RouteCallback) {
    $unimplemented();
  }

  public options(route: string,f: RouteCallback) {
    $unimplemented();
  }

  public trace(route: string,f: RouteCallback) {
    $unimplemented();
  }

  public patch(route: string,f: RouteCallback) {
    $unimplemented();
  }
}





