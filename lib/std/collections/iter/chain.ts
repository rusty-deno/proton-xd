import { Rev } from "./rev.ts";
import { IterTrait } from './mod.ts';
import { LinkedList } from '../linear/linked_list/linked_list.ts';


export class Chain<T> extends IterTrait<T> {
  constructor(private iter: Iterable<T>,private _iter: Iterable<T>) {
    super();
  }
  
  *[Symbol.iterator]() {
    yield* this.iter;
    yield* this._iter;
  }
  
  public override rev() {
    if(isLL(this.iter)||isLL(this._iter)) {
      const iter=LinkedList.fromIter(this.iter);
      iter.append(LinkedList.fromIter(this._iter));

      return new Rev(iter);
    }
    return new Rev(this);
  }
}

function isLL<T>(iter: Iterable<T>): iter is LinkedList<T> {
  return iter instanceof LinkedList;
}

