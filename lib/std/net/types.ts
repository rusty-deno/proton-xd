
export type RouteCallback=(req: Request)=> Response|Promise<Response>;

export interface RouteMethod extends PropertyDescriptor {
  value?: RouteCallback;
  get?(): RouteCallback;
  set?(v: RouteCallback): void;
}

