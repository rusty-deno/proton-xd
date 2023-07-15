import { Iter } from '../../../iter.ts';




export class Stack<T> extends Iter<T> {
  private data: T[];
  public readonly size: number;

  constructor(size: number=16) {
    super();
    this.data=new Array(size);
    this.size=size;
  }

  next(): T {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<T,any,undefined> {
    for(;this.data.length;) yield this.data.pop()!;
    this.data=new Array(this.size);
  }

  public static fromArray<T>(arr: T[]) {
    const stack=new Stack(arr.length);
    for(const element of arr) {
      
    }
    return stack;
  }


}







