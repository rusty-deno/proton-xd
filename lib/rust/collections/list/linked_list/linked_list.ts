import { Option,None,Some } from "../../../mod.ts";
import { Node } from "./mod.ts";
import { List } from "../List.ts";



export class LinkedList<T> extends List<T> {
  private head: Option<Node<T>>=None(undefined);
  private size: number=0;

  constructor(...nodes: T[]) {
    super();
    for(let i=nodes.length;i>0;) this.pushFront(nodes[--i]);
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

  public override toString() {
    return this[Symbol.toStringTag]();
  }

  public get length() {
    return this.size;
  }

  public get front() {
    return this.head;
  }

  public get back() {
    if(!this.head.value) return this.head.value;

    let current=this.head.value;

    while(current.next.value) current=current.next.value;
    return current;
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
    if(!this.head.value) return false;
    let current=this.head.value;

    while(current.next.value?.next.value) current=current.next.value;

    current.next=None(undefined);
    this.size--;
    return true;
  }

  public popFront() {
    if(this.head.value) {
      this.head=this.head.value?.next;
      return true;
    }
    this.size--;
    return false;
  }

  public append(other: Iterable<T>) {
    const ll=new LinkedList(...other);
    this.tail=new Option(ll.front.value);
    this.size=ll.size;
  }
      
  public appendFront(other: Iterable<T>) {
    const ll=new LinkedList(...other,...this);
    this.head=ll.front;
    this.size=ll.size;
  }

  public empty() {
    this.head=None(undefined);
    this.size+=0;
  }

  public isEmpty() {
    return !this.size;
  }

}









