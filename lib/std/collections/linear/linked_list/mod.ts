import { Option } from "../../../mod.ts";
export * from "./linked_list.ts";
export * from "./macros.ts";

export class Node<T> {
  next: Option<Node<T>>;
  prev: WeakRef<Option<Node<T>>>;
  
  constructor(public data: T,next: Node<T>|null=null,prev: WeakRef<Option<Node<T>>>|null=null) {
    this.data=data;
    this.next=new Option(next);
    this.prev=prev??new WeakRef(Option.None);
  }
}