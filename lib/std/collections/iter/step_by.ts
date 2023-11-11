import { Iter } from './iter.ts';
import { LinkedList } from '../linear/linked_list/linked_list.ts';


export class StepBy<T> extends Iter<T> {
  constructor(iter: LinkedList<T>,private _step: number) {
    super(iter);
  }

  override *[Symbol.iterator](): Iterator<T> {
    let i=0;
    for(const iter of this.iter) if(i++%this._step==0) yield iter;
  }
}







