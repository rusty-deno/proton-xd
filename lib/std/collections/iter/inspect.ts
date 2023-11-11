import { Iter } from './iter.ts';
import { LinkedList } from '../linear/linked_list/linked_list.ts';
import { Fn } from '../../types.ts';



export class Inspect<T> extends Iter<T> {
  constructor(iter: LinkedList<T>,private f: Fn<[element: T],void>) {
    super(iter);
  }

  override *[Symbol.iterator](): Iterator<T> {
    for(const iter of this.iter) {
      this.f(iter);
      yield iter;
    }
  }
}












