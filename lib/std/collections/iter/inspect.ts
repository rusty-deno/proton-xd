import { IterTrait } from "./mod.ts";
import { Fn } from "../../types.ts";


export class Inspect<T> extends IterTrait<T> {
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

