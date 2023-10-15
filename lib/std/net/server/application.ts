import { Handler,Route,Method } from "../types/server.ts";
import { HashMap } from "../../mod.ts";
// deno-lint-ignore no-unused-vars
import { Server } from "./server.ts";


export class Application {
  protected _routes=new HashMap<`${Method}${Route}`,Handler>();


  /**
   * Adds a route to the {@linkcode Server} with provided {@linkcode route}, {@linkcode method} and {@linkcode handler}
   * 
   * It isn't recommended to use.
   */
  public addRoute(route: Route,method: Method,handler: Handler) {
    this._routes.set(`${method}${route}`,handler);
  }
  
  /**
   * Adds a `GET` route to the {@linkcode Server} with provided {@linkcode Route}, {@linkcode Handler}
   */
  public get(route: Route,handler: Handler) {
    this.addRoute(route,"GET",handler);
  }

  /**
   * Adds a `HEAD` route to the {@linkcode Server} with provided {@linkcode Route}, {@linkcode Handler}
   */
  public head(route: Route,handler: Handler) {
    this.addRoute(route,"HEAD",handler);
  }

  /**
   * Adds a `POST` route to the {@linkcode Server} with provided {@linkcode Route}, {@linkcode Handler}
   */
  public post(route: Route,handler: Handler) {
    this.addRoute(route,"POST",handler);
  }

  /**
   * Adds a `PUT` route to the {@linkcode Server} with provided {@linkcode Route}, {@linkcode Handler}
   */
  public put(route: Route,handler: Handler) {
    this.addRoute(route,"PUT",handler);
  }

  /**
   * Adds a `DELETE` route to the {@linkcode Server} with provided {@linkcode Route}, {@linkcode Handler}
   */
  public delete(route: Route,handler: Handler) {
    this.addRoute(route,"DELETE",handler);
  }

  /**
   * Adds a `CONNECT` route to the {@linkcode Server} with provided {@linkcode Route}, {@linkcode Handler}
   */
  public connect(route: Route,handler: Handler) {
    this.addRoute(route,"CONNECT",handler);
  }

  /**
   * Adds a `OPTIONS` route to the {@linkcode Server} with provided {@linkcode Route}, {@linkcode Handler}
   */
  public options(route: Route,handler: Handler) {
    this.addRoute(route,"OPTIONS",handler);
  }

  /**
   * Adds a `TRACE` route to the {@linkcode Server} with provided {@linkcode Route}, {@linkcode Handler}
   */
  public trace(route: Route,handler: Handler) {
    this.addRoute(route,"TRACE",handler);
  }

  /**
   * Adds a `PATCH` route to the {@linkcode Server} with provided {@linkcode Route}, {@linkcode Handler}
   */
  public patch(route: Route,handler: Handler) {
    this.addRoute(route,"PATCH",handler);
  }
}





