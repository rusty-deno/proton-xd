import { HashSet } from "../../collections/hash_set/hash_set.ts";

/**
 * Constructs a {@linkcode HashSet}
 */
export function $set<T>(...entries: T[]) {
  return HashSet.formIter(entries);
}