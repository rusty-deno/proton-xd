import { Enumerate } from "../iter/enumerate.ts";
import { Option,Clone } from "../../mod.ts";
import { Iter } from "../mod.ts";
import { LinkedList } from './linked_list/linked_list.ts';


export class Vec<T> extends Array<T> implements Clone {
  constructor(...elements: T[]) {
    super(...elements);
  }

  public static fromIter<T>(iter: Iterable<T>) {
    return new Vec(...iter);
  }

  public static fromArr<T>(arr: T[]) {
    return this.fromIter(arr);
  }

  public override forEach(f: (value: T,index: number,iter: this)=> void): void {
    let i=0;
    for(const iterator of this) f(iterator,i++,this);
  }

  public fold(init: T,f: (prev: T,current: T,index: number)=> T): T {
    for(const [i,iter] of this.entries()) init=f(init,iter,i);
    
    return init;
  }

  public next() {
    return new Option<T>(this[Symbol.iterator]().next().value);
  }

  public enumerate() {
    return new Enumerate(this);
  }

  public toVec(): Vec<T> {
    return structuredClone(this);
  }

  public toArray(): T[] {
    return new Array(...this);
  }

  public clone(): Vec<T> {
    return structuredClone(this);
  }

  /**
   * @deprecated
   */
  public at(index: number) {
    return super.at(index);
  }
  
  public nth(index: number) {
    return new Option(super.at(index));
  }

  public override map<U>(fn: (element: T,index: number,vec: Vec<T>)=> U): Vec<U> {
    const vec=new LinkedList<U>();
    for(const [index,element] of this.entries()) vec.pushBack(fn(element,index,this));
    
    return vec.toVec();
  }

  public delete(index: number) {
    return delete this[index];
  }

  public iter() {
    return new Iter(this);
  }
}



