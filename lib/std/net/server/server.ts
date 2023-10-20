import { Application } from './application.ts';
import { Handler,Method,Route } from '../types/server.ts';
import { Thread } from "../../mod.ts";


/**
 * Constructs a new HTTP Server instance.
 * 
 * # Example
 * ```ts
 * import { Server } from "./mod/net.ts";
 * 
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

  /** Initiates a {@linkcode Server} on a new {@linkcode Thread}.*/
  public static async serve(handler: Handler,options: Deno.ServeOptions|Deno.ServeTlsOptions={}) {
    return await Thread.spawn(async ()=> {
      const _serve=Deno.serve(options,handler);
      await _serve.finished;
    });
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
    return this._options.hostname??"0.0.0.0";
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
  public async close() {}
  
  /** Starts the {@linkcode Server}. */
  public async listen() {
    const _serve=Deno.serve(this._options,(req,info)=> {
      const method=req.method as Method;
      const route=new URL(req.url).pathname as Route;

      const handler=this.getHandler(route,method);
      
      return handler(req,info);
    });
    this.close=()=> _serve.shutdown();
    await _serve.finished;
    this._finished=true;
  }
}



