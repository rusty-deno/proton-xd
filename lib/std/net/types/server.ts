
export type Addrs=URL|string;
export type Method="GET"|"HEAD"|"POST"|"PUT"|"DELETE"|"CONNECT"|"OPTIONS"|"TRACE"|"PATCH";
export type Route=`/${string}`;


type Res=Response|Promise<Response>;
export type Handler=(...xd: [req: Request,info: Deno.ServeHandlerInfo])=> Res;

export interface Req extends Request {
  params: Record<string,string>;
}
