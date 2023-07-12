import { Option,None } from "../io/option.ts";
import { Enumerate } from "../iter.ts";
import {Clone} from '../clone.ts';


export class Vec<T> extends Array<T> implements Clone {

  constructor(...elements: T[]) {
    super(...elements);
  }

  public override forEach(f: (value: T,index: number,iter: this)=> void): void {
    let i=0;
    for(const iterator of this) f(iterator,i++,this);
  }

  // public override at(index: number): Option<T> {
  //   return new Option(super.at(index));
  // }

  public fold(f: (prev: T,current: T,index: number)=> Option<T>|T): Option<T> {
    let folded: Option<T>=None(null);
    let i=0;

    for(const iterator of this) {
      const fold=f(folded.or(iterator),this.next(),++i);
      folded=fold instanceof Option?fold:new Option(fold);
    }
    
    return folded;
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


