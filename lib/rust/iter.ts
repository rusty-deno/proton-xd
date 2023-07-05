import Option,{None} from "./io/option.ts";
import { todo } from './error/panic.ts';


export type Enumerate<T>=Iterable<[index: number,item: T]>;



export default abstract class Iter<T> implements Iterable<T> {
  
  abstract next(): T;
  abstract [Symbol.iterator](): Iterator<T,any,undefined>;
  
  public forEach(f: (value: T,index: number,iter: this)=> void) {
    let i=0;
    for(const iterator of this) {
      f(iterator,i++,this);
    }
  }

  public toArray() {
    return new Array(...this);
  }
  
  public entries() {
    return this.toArray().entries();
  }
  
  public fold(f: (prev: T,current: T,index: number)=> Option<T>|T): Option<T> {
    let folded: Option<T>=None(null);
    let i=0;

    for(const iterator of this) {
      const fold=f(folded.or(iterator),this.next(),++i);
      folded=fold instanceof Option?fold:new Option(fold);
    }
    
    return folded;
  }

  public reduce(f: (prev: T,current: T,index: number)=> Option<T>|T): Option<T> {
    return this.fold(f);
  }

  public enumerate(): Enumerate<T> {
    todo();
  }
  
  public at(index: number) {
    let i=0;
    for(const iterator of this) if(i++===index) return iterator;
  }
  
}

const xd=[69];


xd.reduce((a,b)=> {
  return a+b;
});