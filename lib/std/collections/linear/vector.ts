import { Option,None,Enumerate,Clone } from "../../mod.ts";


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

  public fold(f: (prev: T,current: T,index: number)=> Option<T>|T): Option<T> {
    let folded: Option<T>=None(null);
    let i=0;

    for(const iterator of this) {
      const fold=f(folded.unwrapOr(iterator),this.next(),++i);
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
    const vec=new Vec<U>();
    for(const [index,element] of this.entries()) vec.push(fn(element,index,this));
    
    return vec;
  }

  public delete(index: number) {
    return delete this[index];
  }
}



