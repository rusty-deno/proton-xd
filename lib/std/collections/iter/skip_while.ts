import { Fn } from "../../types.ts";
import { IterTrait } from './iter_trait.ts';



export class SkipWhile<T> extends IterTrait<T> {
  constructor(private _iter: Iterable<T>,private f: Fn<[T],boolean>) {
    super();
  }
  
  *[Symbol.iterator](): Iterator<T> {
    for(const iter of this._iter) if(!this.f(iter)) yield iter;
  }
}