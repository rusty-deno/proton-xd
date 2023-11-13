import { Iter } from './iter.ts';


export class RevIter<T> extends Iter<T> {
  *[Symbol.iterator](): Iterator<T> {
    for(let iter=this.iter.back.value;iter&&iter.prev.deref()?.value;iter=iter.prev.deref()?.value) yield iter.data;
  }
}



