import { IterTrait,Fn } from "./mod.ts";




export class Filter<T> extends IterTrait<T> {
  constructor(private _iter: Iterable<T>,private f: Fn<[T],boolean>) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    for(const element of this._iter) if(this.f(element)) yield element;
  }
}




