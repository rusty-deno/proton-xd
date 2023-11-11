import { Iter } from './iter.ts';
import { LinkedList } from '../linear/linked_list/linked_list.ts';
import { Fn } from '../../types.ts';


export class IterMap<T,U> extends Iter<U> {
  constructor(private _iter: LinkedList<T>,private f: Fn<[T,number],U>) {
    super(new LinkedList);
  }
  
  override *[Symbol.iterator](): Iterator<U> {
    let i=0;
    for(const iter of this._iter) {
      const res=this.f(iter,i++);
      this.iter.pushBack(res);
      yield res;
    }
  }
}





