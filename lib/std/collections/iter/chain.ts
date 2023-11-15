import { IterTrait,Rev } from './mod.ts';
import { LinkedList } from '../linear/linked_list/linked_list.ts';


export class Chain<T> extends IterTrait<T> {
  constructor(private _iter: Iterable<T>,private __iter: Iterable<T>) {
    super();
  }
  
  *[Symbol.iterator]() {
    yield* this._iter;
    yield* this.__iter;
  }
  
  public override rev() {
    if(isLL(this._iter)||isLL(this._iter)) {
      const iter=LinkedList.fromIter(this._iter);
      iter.append(LinkedList.fromIter(this._iter));

      return new Rev(iter);
    }
    return new Rev(this);
  }
}

function isLL<T>(iter: Iterable<T>): iter is LinkedList<T> {
  return iter instanceof LinkedList;
}

