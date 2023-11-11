import { Iter } from "./iter.ts";
import { LinkedList } from "../mod.ts";

export class Take<T> extends Iter<T> {

  constructor(iter: LinkedList<T>,private n: number) {
    super(iter);
  }

  override *[Symbol.iterator](): Iterator<T> {
    for(const iter of this.iter) {
      if(!this.n--) break;

      yield iter;
    }
  }



}



