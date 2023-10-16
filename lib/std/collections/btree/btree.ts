import { Iter } from "../iter.ts";
import { Option } from "../../mod.ts";
import { Vec } from "../mod.ts";
import { Node } from "./mod.ts";



export class BinaryTree<T> extends Iter<T> {
  root: Option<Node<T>>;

  constructor(root?: Node<T>) {
    super();
    this.root=new Option(root);
  }

  next(): T {
    return this[Symbol.iterator]().next().value;
  }
  
  *[Symbol.iterator](): Iterator<T> {
    if(!this.root.value) return;
    const stack=[];
    for(let current=this.root;current.value||stack.length;current=current.value!.right) {
      for(;current.value;current=current.value.left) stack.push(current);

      current=stack.pop()!;

      yield current.value!.data;
    }
  }

  [Symbol.toStringTag]() {
    // deno-lint-ignore prefer-const
    let str="";

    // deno-lint-ignore no-unused-vars
    for(const node of this);
    return str;
  }

  public toString() {
    return this[Symbol.toStringTag]();
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
    return Vec.fromIter(this);
  }

  public toPreOrderedArray() {
    return [...this];
  }

}





