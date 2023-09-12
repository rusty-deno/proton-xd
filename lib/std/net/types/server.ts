
export type Addrs=URL|string;
export type Method="GET"|"HEAD"|"POST"|"PUT"|"DELETE"|"CONNECT"|"OPTIONS"|"TRACE"|"PATCH";
export type Route=`/${string}`;


type Res=Response|Promise<Response>;

export type Handler=(
  (req: Request)=> Res
)|(
  (req: Request,connInfo: Deno.ServeHandlerInfo)=> Res
)|(
  ()=> Res
);


