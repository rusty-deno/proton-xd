import { Option } from "../../mod.ts";


export class Node<T> {
  data: T;
  next: Option<Node<T>>;
  
  constructor(data: T,next?: Node<T>|null) {
  this.data=data;
  this.next=new Option(next);
  }
}