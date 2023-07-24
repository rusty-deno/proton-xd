import { todo } from "../../mod.ts";


// deno-lint-ignore no-explicit-any
export function hash(obj: any): number {
  switch(typeof obj) {
    case "number":
    case "boolean":
      return Number(obj);
    case "string"://gperf
    default:
      todo();
  }
}

export type Entry<K,V>=[key: K,value: V];
export type HasherFn<K>=(obj: K)=> number;

export * from "./hash_map.ts";