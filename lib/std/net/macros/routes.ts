import { Server } from '../server.ts';
import { RouteHandlerDescriptor,Route } from '../types/mod.ts';


export type Name=string|symbol;

export function GET(route: Route) {
  return function(_this: Server,_name: Name,descriptor: RouteHandlerDescriptor) {
    _this.get(route,descriptor.value!);
  };
}

export function HEAD(route: Route) {
  return function(_this: Server,_name: Name,descriptor: RouteHandlerDescriptor) {
    _this.head(route,descriptor.value!);
  };
}

export function POST(route: Route) {
  return function(_this: Server,_name: Name,descriptor: RouteHandlerDescriptor) {
    _this.post(route,descriptor.value!);
  };
}

export function PUT(route: Route) {
  return function(_this: Server,_name: Name,descriptor: RouteHandlerDescriptor) {
    _this.put(route,descriptor.value!);
  };
}

export function DELETE(route: Route) {
  return function(_this: Server,_name: Name,descriptor: RouteHandlerDescriptor) {
    _this.delete(route,descriptor.value!);
  };
}

export function CONNECT(route: Route) {
  return function(_this: Server,_name: Name,descriptor: RouteHandlerDescriptor) {
    _this.connect(route,descriptor.value!);
  };
}

export function OPTIONS(route: Route) {
  return function(_this: Server,_name: Name,descriptor: RouteHandlerDescriptor) {
    _this.options(route,descriptor.value!);
  };
}

export function TRACE(route: Route) {
  return function(_this: Server,_name: Name,descriptor: RouteHandlerDescriptor) {
    _this.trace(route,descriptor.value!);
  };
}

export function PATCH(route: Route) {
  return function(_this: Server,_name: Name,descriptor: RouteHandlerDescriptor) {
    _this.patch(route,descriptor.value!);
  };
}


class XD extends Server {


  @GET("/")
  private xd(_req: Request) {
    return new Response;
  }
}

const _xd=new XD;

