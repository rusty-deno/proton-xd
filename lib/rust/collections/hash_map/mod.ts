import sum from "npm:hash-sum";

// deno-lint-ignore no-explicit-any
export function hash(obj: any): number {
  switch(typeof obj) {
    case "number": return obj;
    case "boolean": return Number(obj);
    case "undefined": return 0;
    case "string":
    case "bigint":
    default:
      return sum(obj);
  }
}

export type Entry<K,V>=[key: K,value: V];
export type HasherFn<K>=(obj: K)=> number;

export * from "./hash_map.ts";