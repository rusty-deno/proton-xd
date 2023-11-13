import { IterableTrait,Fn } from "./mod.ts";

export class Inspect<T> extends IterableTrait<T> {
  constructor(private _iter: Iterable<T>,private f: Fn<[T],void>) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    for(const element of this._iter) {
      this.f(element);
      yield element;
    }
  }
}

