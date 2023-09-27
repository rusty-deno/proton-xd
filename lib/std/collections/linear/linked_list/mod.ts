import { Option } from "../../../mod.ts";
export * from "./linked_list.ts";
export * from "./doubly_linked_list.ts";
export * from "./macros.ts";

export class Node<T> {
  data: T;
  next: Option<Node<T>>;
  
  constructor(data: T,next?: Node<T>|null) {
    this.data=data;
    this.next=new Option(next);
  }
}