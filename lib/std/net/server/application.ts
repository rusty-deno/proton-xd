// deno-lint-ignore-file no-unused-vars
import { Handler,Route,Method } from "../types/server.ts";
import { LinkedList,HashMap } from "../../collections/mod.ts";
import { Server } from "./server.ts";
import { Req } from '../types/server.ts';


type Token=`${Method}${Route}`;
const DYNAMIC_TOKEN=/:\w+|(\([\w+\|]+\))/;
const GLOBAL_DYNAMIC_TOKEN=/:\w+|(\([\w+\|]+\))/g;

export class Application {
  protected _routes=new HashMap<Token,Handler>();
  protected _dyn_routes=new LinkedList<[RegExp,Handler,string]>();


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
    const token=`${method}${route}` satisfies Token;
    isDynamic(route)?this._dyn_routes.pushBack([intoRegex(token),handler,route]):this._routes.set(token,handler);
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

  protected handle(_req: Request,info: Deno.ServeHandlerInfo) {
    const path=new URL(_req.url).pathname as Route;
    const token=`${_req.method as Method}${path}` satisfies Token;
    const req={
      ..._req,
      params: {}
    } satisfies Req;

    return this.#handle(token,req,info);
  }

  #handle(token: Token,req: Req,info: Deno.ServeHandlerInfo) {
    const { value }=this._routes.get(token);
    if(value) return value(req,info);
    
    for(const [route,handler,path] of this._dyn_routes) {
      const tokens=token.match(route);
      if(!tokens) continue;
      const matches=path.match(GLOBAL_DYNAMIC_TOKEN);

      console.log(matches,tokens);
      
      

      return handler(req,info);
    }

    return new Response("Not Found",{ status: 404 });
  }
}

function isDynamic(route: Route) {
  return Boolean(route.search(DYNAMIC_TOKEN)+1);
}

/**
 * # Panics
 * Panics if {@linkcode path} is not a dynamic route.
 */
function intoRegex(token: Token) {
  return new RegExp(token.replace(/:\w+/g,"\\w+"));
}

