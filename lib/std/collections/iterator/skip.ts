import { IterableTrait } from './iterable_trait.ts';

export class Skip<T> extends IterableTrait<T> {
  constructor(private _iter: Iterable<T>,private _skip: number) {
    super();
  }


  *[Symbol.iterator](): Iterator<T> {
    for(const element of this._iter) {
      if(this._skip--) continue;
      yield element;
    }
  }
}







