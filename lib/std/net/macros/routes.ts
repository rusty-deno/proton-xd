import { Application } from '../mod.ts';
import { HandlerDescriptor,Route,HandlerDecorator } from '../types/mod.ts';


export function GET(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: HandlerDescriptor) {
    _this.get(route,descriptor.value!);
  };
}

export function HEAD(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: HandlerDescriptor) {
    _this.head(route,descriptor.value!);
  };
}

export function POST(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: HandlerDescriptor) {
    _this.post(route,descriptor.value!);
  };
}

export function PUT(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: HandlerDescriptor) {
    _this.put(route,descriptor.value!);
  };
}

export function DELETE(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: HandlerDescriptor) {
    _this.delete(route,descriptor.value!);
  };
}

export function CONNECT(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: HandlerDescriptor) {
    _this.connect(route,descriptor.value!);
  };
}

export function OPTIONS(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: HandlerDescriptor) {
    _this.options(route,descriptor.value!);
  };
}

export function TRACE(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: HandlerDescriptor) {
    _this.trace(route,descriptor.value!);
  };
}

export function PATCH(route: Route): HandlerDecorator {
  return function(_this: Application,_name: PropertyKey,descriptor: HandlerDescriptor) {
    _this.patch(route,descriptor.value!);
  };
}
