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
  
  public chain(other: Iterable<T>) {
    return new class Chain extends IterTrait<T> {
      constructor(private _iter: Iterable<T>,private _other: Iterable<T>) {
        super();
      }

      *[Symbol.iterator](): Iterator<T> {
        yield* this._iter;
      }
    }(this,other);
  }
  
  public cycle() {
    return new class Chain extends IterTrait<T> {
      constructor(private _iter: Iterable<T>) {
        super();
      }

      *[Symbol.iterator](): Iterator<T> {
        for(;;)yield* this._iter;
      }
    }(this);
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











