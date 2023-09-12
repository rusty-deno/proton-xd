import { Application } from './application.ts';
import { $unimplemented } from '../../declarative-macros/mod.ts';
import { Method,Route } from '../types/server.ts';


/**
 * Constructs a new HTTP Server instance.
 * 
 * # Example
 * ```ts
 * import { Server } from "<net.ts>";
import { ListenerOptions, ServerInit, Route } from '../types/server';
 * 
 * const port=6969;
 * 
 * const server=new Server();
 * server.get("/",()=> new Response("hello wrld",{ status: 200 }));
 * 
 * server.listen({ port });
 * ```
 */
export class Server extends Application {

  constructor(private _options: Deno.ServeOptions|Deno.ServeTlsOptions) {
    super();
  }


  /**
   * Closes the server.
   */
  public close() {
    $unimplemented();
  }
  
  /**
   * Starts the server
   */
  public init() {
    const _serve=Deno.serve(this._options,(req,info)=> {
      const method=req.method as Method;
      const route=req.url.substring(req.referrer.length) as Route;

      const handler=this._routes.get(`${method}${route}`).unwrapOr(()=> {
        return new Response("Not Found",{ status: 404 });
      });

      return handler(req,info);
    });
  }
}


