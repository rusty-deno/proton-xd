import { IterTrait } from "./iter_trait.ts";

export class Chain<T,I extends Iterable<T>> extends IterTrait<T> {
  constructor(private _iter0: I,private _iter1: I) {
    super();
  }

  override *[Symbol.iterator](): Iterator<T> {
    for(const iter of this._iter0) yield iter;
    for(const iter of this._iter1) yield iter;
  }
}


