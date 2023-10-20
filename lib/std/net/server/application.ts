// deno-lint-ignore-file no-unused-vars
import { Handler,Route,Method } from "../types/server.ts";
import { LinkedList,HashMap } from "../../collections/mod.ts";
import { Server } from "./server.ts";


type Token=`${Method}${Route}`;
export class Application {
  protected _routes=new HashMap<Token,Handler>();
  protected _dyn_routes=new LinkedList<readonly [Token,Handler]>();


  /**
   * Adds a route to the {@linkcode Server} with provided {@linkcode route}, {@linkcode method} and {@linkcode handler}
   * 
   * It isn't recommended to use.
   */
  public addRoute(route: Route|Route[],method: Method,handler: Handler) {
    if(!(route instanceof Array)) {
      this.pushRoute(route,method,handler);
      return;
    }
    for(const path of route) this.pushRoute(path,method,handler);
  }

  private pushRoute(route: Route,method: Method,handler: Handler) {
    const token: Token=`${method}${route}`;
    route.match(/\*/)?this._dyn_routes.pushBack([token,handler]):this._routes.set(token,handler);
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

  public getHandler(path: Route,method: Method): Handler {
    const token: Token=`${method}${path}`;
    const { value }=this._routes.get(token);
    if(value) return value;

    for(const [route,handler] of this._routes)
      if(token.match(new RegExp(route))) return handler;

    return ()=> new Response("Not Found",{ status: 404 });
  }
}





