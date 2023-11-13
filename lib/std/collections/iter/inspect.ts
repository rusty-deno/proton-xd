import { Fn } from '../../types.ts';
import { IterTrait } from './iter_trait.ts';



export class Inspect<T> extends IterTrait<T> {
  constructor(private _iter: Iterable<T>,private f: Fn<[element: T],void>) {
    super();
  }

  override *[Symbol.iterator](): Iterator<T> {
    for(const iter of this._iter) {
      this.f(iter);
      yield iter;
    }
  }
}












