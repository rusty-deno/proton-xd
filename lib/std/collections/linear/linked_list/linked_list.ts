import { Option,None,Some } from "../../../mod.ts";
import { List } from "../List.ts";
import { Node } from "./mod.ts";


export class LinkedList<T> extends List<T> {
  private head: Option<Node<T>>=None(null);
  private size=0;

  constructor(...nodes: T[]) {
    super();
    for(let i=nodes.length;i>0;) this.pushFront(nodes[--i]);
  }

  public static fromArray<T>(arr: T[]) {
    const ll=new LinkedList<T>();
    for(let i=arr.length;i>0;) ll.pushFront(arr[--i]);
    return ll;
  }
  
  next(): T {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<T> {
    for(let iter=this.head.value;iter&&iter.next;iter=iter.next.value) yield iter.data;
  }

  public [Symbol.toStringTag]() {
    return [...this].join(" => ");
  }

  public toString() {
    return this[Symbol.toStringTag]();
  }

  public get length() {
    return this.size;
  }

  public get front() {
    return this.head;
  }

  public get back(): Option<Node<T>> {
    if(!this.head.value) return None(null);

    let current=this.head.value;

    while(current.next.value) current=current.next.value;
    return Some(current);
  }

  private set tail(node: Option<Node<T>>) {
    if(!this.head.value) return;
    let current=this.head.value;

    while(current.next.value) current=current.next.value;
    current.next=node;
  }

  public pushFront(data: T) {
    this.head=Some(new Node(data,this.head.value));
    this.size++;
  }

  public pushBack(data: T) {
    if(!this.head.value) {
      this.pushFront(data);
      return;
    }
    this.tail=Some(new Node(data));
    this.size++;
  }

  public popBack() {
    if(!this.head.value) return Option.None;
    let current=this.head.value;

    while(current.next.value?.next.value) current=current.next.value;
    const last=new Option(current.next.value?.data);
    current.next=None(null);
    this.size--;
    return last;
  }

  public popFront() {
    const entity=this.head.value?.data;
    this.head=new Option(this.head.value?.next.value);
    if(entity) --this.size;
    return new Option(entity);
  }

  public append(other: Iterable<T>) {
    const ll=new LinkedList(...other);
    this.tail=new Option(ll.front.value);
    this.size+=ll.size;
  }
      
  public appendFront(other: Iterable<T>) {
    for(const iter of other) {
      this.pushFront(iter);
      this.size++;
    }
  }

  public empty() {
    this.head=None(null);
    this.size=0;
  }

  public isEmpty() {
    return !this.size;
  }

  public reverse() {
    const ll=new LinkedList<T>;
    for(const node of this) ll.pushFront(node);
    return ll;
  }

  public toReverse() {
    this.head=this.reverse().head;
  }

  public at(index: number) {
    if(index<0) index+=this.size;
    for(let i=0,iter=this.head.value;;iter=iter?.next.value,i++) {
      if(i==index) return new Option(iter?.data);
    }
  }
  
}









