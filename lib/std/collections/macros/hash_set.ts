import { HashSet } from "../mod.ts";

/**
 * Constructs a {@linkcode HashSet}
 */
export function $set<T>(...entries: T[]) {
  return HashSet.formIter(entries);
}