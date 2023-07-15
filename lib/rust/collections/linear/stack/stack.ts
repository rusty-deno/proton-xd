import { Option } from '../../../mod.ts';
import { Iter } from '../../iter.ts';




export class Stack<T> extends Iter<T> {
  private data: T[];
  private top=0;
  public readonly size: number;

  constructor(size: number=16) {
    super();
    this.data=new Array(size);
    this.size=size;
  }

  next(): T {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<T> {
    for(let iter=this.data.pop();iter;iter=this.data.pop()) yield iter!;
    this.data=new Array(this.size);
  }

  public static fromArray<T>(arr: T[]) {
    const stack=new Stack(arr.length);
    stack.data=arr;
    stack.top=arr.length;
    return stack;
  }

  public pop(): Option<T> {
    return new Option(this.data[this.top-1]);
  }

  public push(...elements: T[]) {
    for(const element of elements) {
      if(this.top>=this.size) continue;
      this.data[this.top++]=element;
    }
  }


}







