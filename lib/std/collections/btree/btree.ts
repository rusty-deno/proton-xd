import { Iter } from "../iter.ts";
import { $unimplemented,Option } from "../../mod.ts";
import { Vec } from "../mod.ts";
import { Node,TreversalAlgorithm } from "./mod.ts";



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
  
  public iter(algo: TreversalAlgorithm="in"): Iter<T> {
    switch(algo) {
      case "pre":case "PRE":case "preorder":case "PREORDER": return this.preorderedIter();
      case "post":case "POST":case "postorder":case "POSTORDER": return this.postorderedIter();
      default: return this;
    }
  }
  
  public inorderedIter(): Iter<T> {
    return this;
  }

  private *preIter(): Iterable<T> {
    const nodes=[this.root.value];
    for(const node of nodes) {
      if(!node) break;
      yield node.data;
      if(node.left.value) nodes.push(node.left.value);
      if(node.right.value) nodes.push(node.right.value);
    }
  }
  public preorderedIter() {
    return Iter.fromIterable(this.preIter());
  }

  // deno-lint-ignore require-yield
  private *postIter(): Iterable<T> {
    $unimplemented();
  }
  public postorderedIter() {
    return Iter.fromIterable(this.postIter());
  }




  public override map<U>(f: (element: T,index: number)=> U,algo: TreversalAlgorithm="in"): Vec<U> {
    return this.iter(algo).map(f);
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





