import { Iter } from "./iter.ts";
import { Fn } from '../../types.ts';
import { LinkedList } from "../mod.ts";


export class Filter<T> extends Iter<T> {
  constructor(iter: LinkedList<T>,private f: Fn<[T],boolean>) {
    super(iter);
  }

  *[Symbol.iterator](): Iterator<T> {
    for(const element of this.iter) if(this.f(element)) yield element;
  }
}








