import Iter from '../iter.ts';


export default class Vec<T> extends Iter<T> {
  private size=0;
  [index: number]: T;
  
  constructor(...elements: T[]) {
    super();
    for(const element of elements) this[this.size++]=element;
  }

  next(): T {
    return this[Symbol.iterator]().next().value;
  }
  
  *[Symbol.iterator](): Iterator<T,any,undefined> {
    for(let i=0;i<this.size;i++) yield this[i];
  }

  public at() {
    
  }


  
  

} 


