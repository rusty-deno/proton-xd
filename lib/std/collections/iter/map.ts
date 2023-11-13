import { Fn } from '../../types.ts';
import { IterTrait } from './iter_trait.ts';


export class IterMap<T,U> extends IterTrait<U> {
  constructor(private _iter: Iterable<T>,private f: Fn<[T,number],U>) {
    super();
  }
  
  override *[Symbol.iterator](): Iterator<U> {
    let i=0;
    for(const element of this._iter) yield this.f(element,i++);
  }
}





