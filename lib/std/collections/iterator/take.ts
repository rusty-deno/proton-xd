import { IterableTrait } from "./mod.ts";


export class Take<T> extends IterableTrait<T> {
  constructor(private _iter: Iterable<T>,private n: number) {
    super();
  }

  override *[Symbol.iterator](): Iterator<T> {
    for(const iter of this._iter) {
      if(!this.n--) break;
      yield iter;
    }
  }
}

