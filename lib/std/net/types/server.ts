
export type Addrs=URL|string;
export type Method="GET"|"HEAD"|"POST"|"PUT"|"DELETE"|"CONNECT"|"OPTIONS"|"TRACE"|"PATCH";
export type Route=`/${string}`;


type Res=Response|Promise<Response>;

export type Handler=(
  (req: Request)=> Res
)|(
  (req: Request,connInfo: ConnInfo)=> Res
)|(
  ()=> Res
);


/** Information about the connection a request arrived on. */
export interface ConnInfo {
  /** The local address of the connection. */
  readonly localAddr: Deno.Addr;
  /** The remote address of the connection. */
  readonly remoteAddr: Deno.Addr;
}

/** Options for running an HTTP server. */
export interface ServerInit extends Partial<Deno.ListenOptions> {
  /**
   * The handler to invoke when route handlers throw an error.
   *
   * The default error handler logs and returns the error in JSON format.
   */
  onError?: (error: unknown)=> Response|Promise<Response>;
}

