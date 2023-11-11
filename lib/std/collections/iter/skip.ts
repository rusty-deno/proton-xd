import { Iter } from './iter.ts';
import { LinkedList } from '../linear/linked_list/linked_list.ts';


export class SkippedIter<T> extends Iter<T> {

  constructor(iter: LinkedList<T>,private _skip: number) {
    super(iter);
  }


  override *[Symbol.iterator](): Iterator<T> {
    for(const iter of this.iter) {
      if(this._skip--) continue;

      yield iter;
    }
  }

  public override skip(skip: number) {
    return new SkippedIter(this.iter,this._skip+skip);
  }
}



