import { $unimplemented,None,Option,Some,Vec } from "../mod.ts";
import { Fn } from "../types.ts";

export abstract class IterTrait<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;
  
  public next() {
    return new Option<T>(this[Symbol.iterator]().next().value);
  }

  public all(f: Fn<[element: T],boolean>) {
    for(const iter of this) if(!f(iter)) return false;

    return true;
  }

  public any(f: Fn<[element: T],boolean>) {
    for(const iter of this) if(f(iter)) return true;

    return false;
  }
}

export class Iter<T> extends IterTrait<T> {
  constructor(private _iter: Iterable<T>) {
    super();
  }

  *[Symbol.iterator](): Iterator<T> {
    yield* this._iter;
  }
}











