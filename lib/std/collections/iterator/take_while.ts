import { IterableTrait,Fn } from "./mod.ts";

export class TakeWhile<T> extends IterableTrait<T> {
  constructor(private _iter: Iterable<T>,private f: Fn<[T],boolean>) {
    super();
  }

  override *[Symbol.iterator](): Iterator<T> {
    for(const iter of this._iter) {
      if(!this.f(iter)) break;

      yield iter;
    }
  }
}




