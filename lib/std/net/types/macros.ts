import { Handler } from "./server.ts";
import { Application } from '../server/application.ts';


export interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: Handler;
  get?(): Handler;
  set?(v: Handler): void;
}

export interface HandlerDecorator {
  (_this: Application,name: PropertyKey,descriptor: RouteHandlerDescriptor): void|PropertyDescriptor;
}



