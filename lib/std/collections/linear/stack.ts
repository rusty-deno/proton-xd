import { Option } from '../../../mod.ts';
import { LinkedList } from './linked_list/linked_list.ts';
import { IteratorTrait } from '../iter/iterator_trait.ts';




export class Stack<T> extends IteratorTrait<T> {
  private data: LinkedList<T>;
  private current=0;

  constructor(...iter: T[]) {
    super();
    this.data=LinkedList.fromArray(iter);
  }
  
  public get top() {
    return this.current;
  }

  public get length() {
    return this.data.length;
  }
  
  *[Symbol.iterator](): Iterator<T> {
    for(let entity=this.pop().value;entity;entity=this.pop().value) yield entity;
  }

  public static fromArray<T>(arr: T[]) {
    const stack=new Stack<T>();
    stack.data=LinkedList.fromIterRev(arr);
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







