import { Vec } from "../linear/vector.ts";

export function $vec<T>(...iter: T[]) {
  return Vec.fromArr(iter);
}