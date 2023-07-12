import { Option,None } from "./option.ts";

export async function Opt<T>(f: ()=> Promise<T|None>) {
  return new Option<T>(await f());
}

export function OptSync<T>(f: ()=> T|None) {
  return new Option<T>(f());
}