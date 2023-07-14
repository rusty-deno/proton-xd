import { Option } from "../../mod.ts";



export class Node<T> {
  data: T;
  left: Option<Node<T>>;
  right: Option<Node<T>>;

  constructor(data: T,childs: Child<T>={}) {
    this.data=data;
    this.left=new Option(childs.left);
    this.right=new Option(childs.right);
  }
}

export interface Child<T> {
  left?: Node<T>;
  right?: Node<T>;
}




