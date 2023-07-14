import { Iter } from "../../iter.ts";
import { Option } from "../../mod.ts";
import { Vec } from "../mod.ts";
import { Node } from "./mod.ts";



export class BinaryTree<T> {
  root: Option<Node<T>>;

  constructor(root?: Node<T>) {
    this.root=new Option(root);
  }

  next(): T {
    return this[Symbol.iterator]().next().value;
  }
  
  *[Symbol.iterator](): Iterator<T,any,undefined> {
    const nodes=[this.root.value];
    for(const node of nodes) {
      if(!node) break;
      yield node.data;

      if(node.left.value) nodes.push(node.left.value);
      if(node.right.value) nodes.push(node.right.value);
    }
  }
  
  public treversePre(f: (data: T,node: Node<T>)=> void) {
    const nodes=[this.root.value];
    for(const node of nodes) {
      if(!node) break;
      f(node.data,node);

      if(node.left.value) nodes.push(node.left.value);
      if(node.right.value) nodes.push(node.right.value);
    }
  }

  public toPreOrderedVec() {
    return new Vec(...this);
  }

  public toPreOrderedArray() {
    return [...this];
  }

  


}





