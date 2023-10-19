import { Option } from "../../mod.ts";
import { LinkedList } from './linked_list/linked_list.ts';
import { Vec } from './vector.ts';



export abstract class List<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;
  abstract next(): T;

  public static fromIter<T>(iter: Iterable<T>) {
    return new class extends List<T> {
      next(): T {
        return this[Symbol.iterator]().next().value;
      }
      [Symbol.iterator](): Iterator<T> {
        return iter[Symbol.iterator]();
      }
    };
  }



  /**
   * @param {number} index 
   * @returns {Option<T>}
   * @description improvement todo
   */
  public at(index: number): Option<T> {
    return new Option(Object.values(this)[index]);
  }
  
  /** Enumerates the List. */
  public *enumerate(): Iterable<[number,T]> {
    let i=0;
    for(const element of this) yield [i++,element];
  }

  /**
   * @param {T} data 
   * @returns {number}
   * @description improvement todo
   */
  public indexOf(data: T): number {
    for(const [i,element] of this.enumerate()) if(Object.is(data,element)) return i;
    return -1;
  }

  public contains(data: T) {
    return Boolean(this.indexOf(data)+1);
  }
  
  public forEach(f: (element: T,index: number,iter: List<T>)=> void) {
    for(const [i,element] of this.enumerate()) f(element,i,this);
  }

  public map<U>(f: (element: T,index: number,iter: List<T>)=> U): List<U> {
    const map=new LinkedList<U>();
    for(const [i,element] of this.enumerate()) map.pushBack(f(element,i,this));

    return List.fromIter(map);
  }

  public toVec() {
    return Vec.fromIter(this);
  }
}