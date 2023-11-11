import { Option,None } from "../../mod.ts";
import { Vec } from "../../mod.ts";
import { Iter } from "./iter.ts";
import { LinkedList } from "../mod.ts";


export type Enumerate<T>=Iterable<[index: number,item: T]>;



export abstract class IterableTrait<T> implements Iterable<T> {
  abstract next(): T;
  abstract [Symbol.iterator](): Iterator<T>;

  public static fromIterable<T>(iter: Iterable<T>): IterableTrait<T> {
    return new class extends IterableTrait<T> {
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
    for(const iterator of this) f(iterator,i++,this);
  }

  public toArray() {
    return [...this];
  }
  
  public *enumerate(): Enumerate<T> {
    let i=0;
    for(const iter of this) yield [i++,iter];
  }
  
  public reduce(f: (prev: T,current: T,index: number)=> Option<T>|T): Option<T> {
    let folded=None<T>(null);

    for(const [i,element] of this.enumerate()) {
      const fold=f(folded.unwrapOr(element),this.next(),i);
      folded=fold instanceof Option?fold:new Option(fold);
    }
    
    return folded;
  }
  
  public toVec() {
    return Vec.fromIter(this);
  }

  public iter() {
    return new Iter(LinkedList.fromIter(this));
  }
}
