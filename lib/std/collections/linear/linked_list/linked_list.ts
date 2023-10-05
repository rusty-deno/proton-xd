import { Option,None,Some } from "../../../mod.ts";
import { List } from "../List.ts";
import { Node } from "./mod.ts";


export class LinkedList<T> extends List<T> {
  private head: Option<Node<T>>=None(null);
  private size=0;
  private _tail=new WeakRef(this.head);

  constructor(...nodes: T[]) {
    super();
    
    for(const node of nodes) this.putBack(new Node(node,null));

    this.size=nodes.length;
  }

  public static fromArray<T>(arr: T[]) {
    const ll=new LinkedList<T>();
    let current=ll.head;

    arr.forEach((node,i)=> {
      current.value=new Node(node);
      i===arr.length-1?ll._tail=new WeakRef(current):current=current.value.next;
    });

    ll.size=arr.length;
    return ll;
  }
  
  next(): T {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<T> {
    for(let iter=this.head.value;iter&&iter.next;iter=iter.next.value) yield iter.data;
  }

  private putBack(node: Node<T>) {
    this.tail.value?this.tail.insert(node):this.tail.value!.next=Some(node);
  }

  public get [Symbol.toStringTag]() {
    return [...this].join(" => ");
  }

  public toString() {
    return this[Symbol.toStringTag];
  }

  public get length() {
    return this.size;
  }

  public get front() {
    return this.head;
  }

  public get back(): Option<Node<T>> {
    return this._tail.deref()!;
  }

  private set tail(node: Option<Node<T>>) {
    this._tail.deref()!=node;
  }
  private get tail() {
    return this._tail.deref()!;
  }

  public pushFront(data: T) {
    this.head=Some(new Node(data,this.head.value));
    this.size++;
  }

  public pushBack(data: T) {
    this.tail=Some(new Node(data));
    this.size++;
  }

  public popBack() {
    const last=new Option(this._tail.deref()?.value?.data);
    this.tail=this._tail.deref()!.value!.prev;
    this._tail.deref()!.value!.next=None();
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









