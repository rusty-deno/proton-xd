import { $unimplemented, Option } from "../mod.ts";
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
    $unimplemented();
  }



  public enumerate() {
    return new class Enumerate<T> extends IterTrait<[number,T]> {
      constructor(private _iter: Iterable<T>) {
        super();
      }

      *[Symbol.iterator](): Iterator<[number,T]> {
        let i=0;
        for(const element of this._iter) yield [i++,element];
      }
    }(this);
  }





  public iter() {
    return new Iter(this);
  }
}

export class Iter<T> extends IterTrait<T> {
  constructor(private _iter: Iterable<T>) {
    super();
  }

  private static withYeilder<T>(iter: Iterable<T>,f: Fn<[],Iterator<T>>) {
    const self=new Iter<T>(iter);
    self[Symbol.iterator]=f;

    return self;
  }

  *[Symbol.iterator](): Iterator<T> {
    yield* this._iter;
  }


}











