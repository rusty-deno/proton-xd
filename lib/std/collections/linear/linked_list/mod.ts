import { Option } from "../../../mod.ts";
export * from "./linked_list.ts";
export * from "./doubly_linked_list.ts";
export * from "./macros.ts";

export class Node<T> {
  next: Option<Node<T>>;
  prev: Option<Node<T>>;
  
  constructor(public data: T,next: Node<T>|null=null,prev: Node<T>|null=null) {
    this.data=data;
    this.next=new Option(next);
    this.prev=new Option(prev);
  }
}