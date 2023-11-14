import { IterTrait } from "./mod.ts";

export class StepBy<T> extends IterTrait<T> {
  constructor(private _iter: Iterable<T>,private _step: number) {
    super();
  }

  override *[Symbol.iterator](): Iterator<T> {
    let i=0;
    for(const iter of this._iter) if(i++%this._step===0) yield iter;
  }
}







