import { Handler } from "./server.ts";


export interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: Handler;
  get?(): Handler;
  set?(v: Handler): void;
}







