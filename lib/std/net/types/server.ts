
export type Addrs=URL|string;
export type Method="GET"|"HEAD"|"POST"|"PUT"|"DELETE"|"CONNECT"|"OPTIONS"|"TRACE"|"PATCH";
export type Route=`/${string}`;



export type Handler=(req: Request,connInfo?: ConnInfo)=> Response|Promise<Response>;


/**
 * Information about the connection a request arrived on.
*/
export interface ConnInfo {
  /** The local address of the connection. */
  readonly localAddr: Deno.Addr;
  /** The remote address of the connection. */
  readonly remoteAddr: Deno.Addr;
}