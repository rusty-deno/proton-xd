import { IterTrait } from "./iter_trait.ts";
import { Fn } from "../../types.ts";


export class FlatMap<T,U> extends IterTrait<U> {
  constructor(private _iter: Iterable<T>,private f: Fn<[T],Iterable<U>>) {
    super();
  }

  *[Symbol.iterator](): Iterator<U> {
    for(const element of this._iter)
      for(const entity of this.f(element)) yield entity;
  }



  
}








