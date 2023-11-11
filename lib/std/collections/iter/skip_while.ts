import { Iter } from './iter.ts';
import { LinkedList } from '../linear/linked_list/linked_list.ts';
import { Fn } from "../../types.ts";


export class SkipWhile<T> extends Iter<T> {

  constructor(iter: LinkedList<T>,private f: Fn<[T],boolean>) {
    super(iter);
  }

  override *[Symbol.iterator](): Iterator<T> {
    for(const iter of this.iter) {
      if(this.f(iter)) continue;
      yield iter;
    }
  }
}









