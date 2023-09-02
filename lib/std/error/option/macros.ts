import { Option,None } from "./option.ts";

export async function $option<T>(f: ()=> Promise<T|None>) {
  return new Option<T>(await f());
}

export function $optionSync<T>(f: ()=> T|None) {
  return new Option<T>(f());
}