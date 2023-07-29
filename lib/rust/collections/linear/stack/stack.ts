import { Option } from '../../../mod.ts';
import { Iter } from '../../iter.ts';
import { LinkedList } from '../linked_list/linked_list.ts';




export class Stack<T> extends Iter<T> {
  private data: LinkedList<T>;
  private current=0;
  public readonly size: number;

  constructor(size: number=16) {
    super();
    this.data=new LinkedList();
    this.size=size;
  }
  
  public get top() {
    return this.current;
  }
  

  next(): T {
    return this[Symbol.iterator]().next().value;
  }

  
  *[Symbol.iterator](): Iterator<T> {
    for(let entity=this.pop().value;entity;entity=this.pop().value) yield entity;
  }

  public static fromArray<T>(arr: T[]) {
    const stack=new Stack(arr.length);
    stack.data=LinkedList.fromArray(arr);
    stack.current=arr.length;
    return stack;
  }

  public pop(): Option<T> {
    this.current&&=--this.current;
    return this.data.popFront();
  }
  
  public push(entity: T) {
    if(this.current-1==this.data.length) return false;
    this.data.pushFront(entity);
    this.current++;
    return true;
  }
}







