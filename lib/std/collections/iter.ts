import { Option,None } from "../mod.ts";
import { Vec } from "../mod.ts";
import { LinkedList } from './linear/linked_list/linked_list.ts';


export type Enumerate<T>=Iterable<[index: number,item: T]>;



export abstract class Iter<T> implements Iterable<T> {
  abstract next(): T;
  abstract [Symbol.iterator](): Iterator<T>;

  public static fromIterable<T>(iter: Iterable<T>): Iter<T> {
    return new class extends Iter<T> {
      next(): T {
        return this[Symbol.iterator]().next().value;
      }
      [Symbol.iterator](): Iterator<T> {
        return iter[Symbol.iterator]();
      }
    };
  }
   
  public forEach(f: (value: T,index: number,iter: this)=> void) {
    let i=0;
    for(const iterator of this) {
      f(iterator,i++,this);
    }
  }

  public toArray() {
    return [...this];
  }
  
  public *enumerate(): Enumerate<T> {
    let i=0;
    for(const iterator of this) yield [i++,iterator];
  }
  
  public reduce(f: (prev: T,current: T,index: number)=> Option<T>|T): Option<T> {
    let folded: Option<T>=None(null);
    let i=0;

    for(const iterator of this) {
      const fold=f(folded.unwrapOr(iterator),this.next(),++i);
      folded=fold instanceof Option?fold:new Option(fold);
    }
    
    return folded;
  }

  public filter(fn: (element: T,index: number)=> boolean) {
    const filtered=new LinkedList<T>();

    for(const [index,element] of this.enumerate()) {
      if(!fn(element,index)) continue;
      filtered.pushBack(element);
    }

    return filtered.toVec();
  }

  public map<U>(fn: (element: T,index: number)=> U) {
    const map=new LinkedList<U>();

    for(const [index,element] of this.enumerate()) {
      map.pushBack(fn(element,index));
    }
    
    return Vec.fromIter(map);
  }
  
  public toVec() {
    return Vec.fromIter(this);
  }
}
