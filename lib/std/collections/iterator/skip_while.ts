import { IterableTrait } from './iterable_trait.ts';
import { Fn } from "./mod.ts";



export class SkipWhile<T> extends IterableTrait<T> {
  constructor(private _iter: Iterable<T>,private f: Fn<[T],boolean>) {
    super();
  }
  
  *[Symbol.iterator](): Iterator<T> {
    for(const iter of this._iter) if(!this.f(iter)) yield iter;
  }
}