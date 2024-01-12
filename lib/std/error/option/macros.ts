// deno-lint-ignore-file no-explicit-any
import { Option,None } from "./option.ts";
import { Fn,AsyncFn } from "../../types.ts";
import { AsyncOption } from "./async_option.ts";

export function $option<T,P extends any[]>(f: AsyncFn<P,T|None>,...args: P) {
  return new AsyncOption<T>(f(...args).then(opt=> new Option(opt)));
}

export function $optionSync<T,P extends any[]>(f: Fn<P,T|None>,...args: P) {
  return new Option<T>(f(...args));
}