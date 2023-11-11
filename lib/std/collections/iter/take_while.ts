import { Iter } from "./iter.ts";
import { LinkedList } from "../mod.ts";
import { Fn } from "../../types.ts";

export class TakeWhile<T> extends Iter<T> {
  constructor(iter: LinkedList<T>,private f: Fn<[T],boolean>) {
    super(iter);
  }

  override *[Symbol.iterator](): Iterator<T> {
    for(const iter of this.iter) {
      if(!this.f(iter)) break;

      yield iter;
    }
  }
}






