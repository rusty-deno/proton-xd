import { IterableTrait } from "./mod.ts";

export class Flatten<T,U extends Iterable<T>,I extends Iterable<U>> extends IterableTrait<T> {
  constructor(private _iter: I) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    for(const iter of this._iter) yield* iter;
  }
}


