import { HashMap } from "../../mod.ts";

// deno-lint-ignore no-explicit-any
export function $map<K extends keyof any,V>(map: Record<K,V>) {
  return HashMap.formRecord(map);
}
