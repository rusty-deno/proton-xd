import { Server } from '../server.ts';
import { RouteMethod } from '../types.ts';

export type Name=string|symbol;

export function GET(route: string) {
  return function(_this: Server,_name: Name,descriptor: RouteMethod) {
    _this.get(route,descriptor.value!);
  };
}

export function HEAD(route: string) {
  return function(_this: Server,_name: Name,descriptor: RouteMethod) {
    _this.head(route,descriptor.value!);
  };
}

export function POST(route: string) {
  return function(_this: Server,_name: Name,descriptor: RouteMethod) {
    _this.post(route,descriptor.value!);
  };
}

export function PUT(route: string) {
  return function(_this: Server,_name: Name,descriptor: RouteMethod) {
    _this.put(route,descriptor.value!);
  };
}

export function DELETE(route: string) {
  return function(_this: Server,_name: Name,descriptor: RouteMethod) {
    _this.delete(route,descriptor.value!);
  };
}

export function CONNECT(route: string) {
  return function(_this: Server,_name: Name,descriptor: RouteMethod) {
    _this.connect(route,descriptor.value!);
  };
}

export function OPTIONS(route: string) {
  return function(_this: Server,_name: Name,descriptor: RouteMethod) {
    _this.options(route,descriptor.value!);
  };
}

export function TRACE(route: string) {
  return function(_this: Server,_name: Name,descriptor: RouteMethod) {
    _this.trace(route,descriptor.value!);
  };
}

export function PATCH(route: string) {
  return function(_this: Server,_name: Name,descriptor: RouteMethod) {
    _this.patch(route,descriptor.value!);
  };
}

