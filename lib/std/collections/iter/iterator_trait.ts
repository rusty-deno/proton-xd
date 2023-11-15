import { Fn } from "../../types.ts";
import { Vec } from '../linear/vector.ts';
import { Option,Some } from "../../mod.ts";
import { Enumerate,Rev,Iter,IterMap,Inspect } from "./mod.ts";




export abstract class IteratorTrait<T> implements Iterable<T> {
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

  public enumerate() {
    return new Enumerate(this);
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
    return new Inspect(this,f);
  }

  public iter() {
    return new Iter<T>(this);
  }

  public map<U>(f: Fn<[element: T,index: number],U>) {
    return new IterMap(this,f);
  }

  public reduce(f: Fn<[prev: T,current: T],T>): Option<T> {
    const first=this.next();
    if(first.value==null) return first;

    return Some(this.fold(first.value,f));
  }

  public rev() {
    return new Rev(this);
  }
  
  public toArray() {
    return Array.from(this);
  }

  public toVec() {
    return Vec.fromIter(this);
  }
}








