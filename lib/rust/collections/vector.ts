import Option from "../io/option.ts";
import { Enumerate } from "../iter.ts";
import Clone from '../clone.ts';


export default class Vec<T> extends Array<T> implements Clone<Vec<T>> {

  constructor(...elements: T[]) {
    super(...elements);
  }

  override forEach(f: (value: T,index: number,iter: this)=> void): void {
    let i=0;
    for(const iterator of this) f(iterator,i++,this);
  }


  public fold(f: (prev: T,current: T,index: number)=> Option<T>|T): Option<T> {
    return new Option(super.reduce((prev: T,current: T,index: number)=> {
      const xd=f(prev,current,index);
      return xd instanceof Option?xd.value!:xd;
    }));
  }

  next(): T {
    return this[Symbol.iterator]().next().value;
  }

  public enumerate(): Enumerate<T> {
    return super.entries();
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
  
}


