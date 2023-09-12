import { Application } from '../mod.ts';
import { RouteHandlerDescriptor,Route,HandlerDecorator } from '../types/mod.ts';


export function GET(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: RouteHandlerDescriptor) {
    _this.get(route,descriptor.value!);
  };
}

export function HEAD(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: RouteHandlerDescriptor) {
    _this.head(route,descriptor.value!);
  };
}

export function POST(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: RouteHandlerDescriptor) {
    _this.post(route,descriptor.value!);
  };
}

export function PUT(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: RouteHandlerDescriptor) {
    _this.put(route,descriptor.value!);
  };
}

export function DELETE(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: RouteHandlerDescriptor) {
    _this.delete(route,descriptor.value!);
  };
}

export function CONNECT(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: RouteHandlerDescriptor) {
    _this.connect(route,descriptor.value!);
  };
}

export function OPTIONS(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: RouteHandlerDescriptor) {
    _this.options(route,descriptor.value!);
  };
}

export function TRACE(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: RouteHandlerDescriptor) {
    _this.trace(route,descriptor.value!);
  };
}

export function PATCH(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: RouteHandlerDescriptor) {
    _this.patch(route,descriptor.value!);
  };
}
