import { HashSet } from "../../collections/mod.ts";

export function $set<T>(...entries: T[]) {
  return HashSet.formIter(entries);
}