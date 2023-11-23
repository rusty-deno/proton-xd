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

  public filter(f: Fn<[element: T],boolean>) {
    return new class Filter extends IterTrait<T> {
      constructor(private _iter: Iterable<T>,private f: Fn<[T],boolean>) {
        super();
      }

      *[Symbol.iterator](): Iterator<T> {
        for(const element of this._iter)
          if(this.f(element)) yield element;
      }
    }(this,f);
  }

  public find(f: Fn<[element: T],boolean>) {
    for(const iter of this)
      if(f(iter)) return Some(iter);

    return None<T>();
  }

  public findMap<U>(f: Fn<[element: T],Option<U>>) {
    for(const iter of this) {
      const res=f(iter);
      if(res.contains()) res;
    }

    return None<T>();
  }

  public flatMap<U>(f: Fn<[element: T],Iterable<U>>) {
    return new class FlatMap<T,U> extends IterTrait<U> {
      constructor(private _iter: Iterable<T>,private f: Fn<[T],Iterable<U>>) {
        super();
      }

      *[Symbol.iterator](): Iterator<U> {
        for(const element of this._iter) yield* this.f(element);
      }
    }(this,f);
  }
  
  public static flatten<T>(iter: Iterable<Iterable<T>>) {
    return new class Flatten<T> extends IterTrait<T> {
      constructor(private _iter: Iterable<Iterable<T>>) {
        super();
      }

      *[Symbol.iterator](): Iterator<T> {
        for(const element of this._iter) yield* element;
      }
    }(iter);
  }

  public fold<U>(init: U,f: Fn<[prev: U,element: T],U>) {
    for(const iter of this) init=f(init,iter);
    
    return init;
  }

  public forEach(f: Fn<[element: T,index: number],void>) {
    let i=0;
    for(const iter of this) f(iter,i++);
  }

  public inspect(f: Fn<[element: T],void>) {
    return new class Inspect<T> extends IterTrait<T> {
      constructor(private _iter: Iterable<T>,private f: Fn<[T],void>) {
        super();
      }
      
      *[Symbol.iterator](): Iterator<T> {
        for(const element of this._iter) {
          this.f(element);
          yield element;
        }
      }
    }(this,f);
  }

  public iter() {
    return new Iter(this);
  }
  
  public map<U>(f: Fn<[element: T,index: number],U>) {
    return new class IterMap<T,U> extends IterTrait<U> {
      constructor(private _iter: Iterable<T>,private f: Fn<[T,number],U>) {
        super();
      }
      
      *[Symbol.iterator](): Iterator<U> {
        let i=0;
        for(const element of this._iter) yield this.f(element,i++);
      }
    }(this,f);
  }

  public mapWhile<U>(f: Fn<[element: T,index: number],Option<U>|U|None>) {
    return new class IterMapWhile<T,U> extends IterTrait<U> {
      constructor(private _iter: Iterable<T>,private f: Fn<[T,number],U>) {
        super();
      }
      
      *[Symbol.iterator](): Iterator<U> {
        let i=0;
        for(const element of this._iter) {
          const _res=this.f(element,i++);
          const res=_res instanceof Option?_res.value:_res;
          if(res==null) break;
          
          yield res;
        }
      }
    }(this,f);
  }

  public position(f: Fn<[element: T],boolean>) {
    for(const [i,element] of this.enumerate()) if(f(element)) i;

    return -1;
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











