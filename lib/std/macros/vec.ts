import { Vec } from "../mod.ts";

export function $vec<T>(...iter: T[]) {
  return Vec.fromArr(iter);
}