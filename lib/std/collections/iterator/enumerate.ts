import { IterableTrait } from "./mod.ts";

export class Enumerate<T> extends IterableTrait<[index: number,element: T]> {
  constructor(private _iter: Iterable<T>) {
    super();
  }

  *[Symbol.iterator](): Iterator<[number,T]> {
    let i=0;
    for(const element of this._iter) yield [i++,element];
  }
}

