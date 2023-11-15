import { IterTrait } from "./mod.ts";

export class Skip<T> extends IterTrait<T> {
  constructor(private _iter: Iterable<T>,private _skip: number) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    for(const element of this._iter) {
      if(this._skip-->0) continue;
      yield element;
    }
  }
}







