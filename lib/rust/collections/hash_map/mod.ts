import sum from "npm:hash-sum";

// deno-lint-ignore no-explicit-any
export function hash(obj: any): number {
  switch(typeof obj) {
    case "boolean": return Number(obj);
    case "undefined": return 0;
    case "string":
    case "bigint":
    default:
      return obj==null?0:Number.parseInt(`0x${sum(obj)}`)&0xff;
  }
}

export type Entry<K,V>=[key: K,value: V];
export type HasherFn<K>=(obj: K)=> number;

export * from "./hash_map.ts";