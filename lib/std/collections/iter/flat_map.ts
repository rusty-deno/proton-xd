import { IterTrait } from "./mod.ts";
import { Rev } from "./rev.ts";
import { Fn } from "../../types.ts";


export class FlatMap<T,U> extends IterTrait<U> {
  constructor(private _iter: Iterable<T>,private f: Fn<[T],Iterable<U>>) {
    super();
  }

  *[Symbol.iterator](): Iterator<U> {
    for(const element of this._iter) yield* this.f(element);
  }
  
  public override rev(): Rev<U> {
    return new Rev(this);
  }
}











