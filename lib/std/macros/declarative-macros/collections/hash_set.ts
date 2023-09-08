import { HashSet } from "../../../collections/mod.ts";

/**
 * Constructs a {@linkcode HashSet}
 */
export function $set<T>(...entries: T[]) {
  return HashSet.formIter(entries);
}