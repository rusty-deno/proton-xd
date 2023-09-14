import { Application } from './application.ts';
import { $unimplemented } from '../../declarative-macros/mod.ts';
import { Method,Route } from '../types/server.ts';


/**
 * Constructs a new HTTP Server instance.
 * 
 * # Example
 * ```ts
 * import { Server } from "./mod/net.ts";
import { ErrorHandler } from '../types/server';
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
  private _finished=false;

  constructor(private _options: Deno.ServeOptions|Deno.ServeTlsOptions={}) {
    super();
  }

  /**
   * Indicates whether the {@linkcode Server} is still running.
   * * It is set to `true` when the {@linkcode Server} is closed.
   */
  public get finished() {
    return this._finished;
  }

  /** hostname of the {@linkcode Server} */
  public get hostname() {
    return this._options.hostname??"127.0.0.1";
  }
  public set hostname(hostname) {
    this._options.hostname=hostname;
  }
  
  /** A reference to {@linkcode onError} callback. */
  public get onError() {
    return this._options.onError;
  }
  public set onError(f) {
    this._options.onError=f;
  }
  
  /** A reference to {@linkcode onListen} callback. */
  public get onListen() {
    return this._options.onListen;
  }
  public set onListen(onListen) {
    this._options.onListen=onListen;
  }

  /** Port of the {@linkcode Server}. */
  public get port() {
    return this._options.port??8000;
  }
  public set port(port) {
    this._options.port=port;
  }

  /** Represents the port's reusability as a `boolean` */
  public get reusePort() {
    return !!this._options.reusePort;
  }
  public set reusePort(reusePort) {
    this._options.reusePort=reusePort;
  }

  /** A reference to the {@linkcode Server}'s {@linkcode AbortSignal} */
  public get abordSignal() {
    return this._options.signal;
  }
  public set abordSignal(signal) {
    this._options.signal=signal;
  }




  /** Closes the {@linkcode Server}. */
  public close() {
    $unimplemented();
  }
  
  /** Starts the {@linkcode Server}. */
  public init() {
    const _serve=Deno.serve(this._options,(req,info)=> {
      const method=req.method as Method;
      const route=new URL(req.url).pathname as Route;

      const handler=this._routes.get(`${method}${route}`).unwrapOr(()=> {
        return new Response("Not Found",{ status: 404 });
      });
      
      return handler(req,info);
    });
    _serve.finished.then(_=> this._finished=true);
  }
}



