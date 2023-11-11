// deno-lint-ignore-file
import { Iter } from "../iter/iter_trait.ts";
import { Option } from "../../mod.ts";
import { Vec } from "../mod.ts";
import { Node,TreversalAlgorithm } from "./mod.ts";
import { LinkedList } from "../linear/linked_list/mod.ts";


export class BinaryTree<T> extends Iter<Node<T>> {
  root: Option<Node<T>>;

  constructor(root?: Node<T>) {
    super();
    this.root=new Option(root);
  }

  next(): Node<T> {
    return this[Symbol.iterator]().next().value;
  }
  
  *[Symbol.iterator](): Iterator<Node<T>> {
    if(this.root.containsNone()) return;
    const stack=new LinkedList<Node<T>>();

    for(let current=this.root;current.value||stack.length;current=current.value!.right) {
      console.log(current.value?.data);
      
      for(;current.value;current=current.value.left) stack.pushBack(current.value);

      current=stack.popBack();

      yield current.value!;
    }
  }
  
  public iter(algo: TreversalAlgorithm="in"): Iter<Node<T>> {
    switch(algo) {
      case "pre":case "PRE":case "preorder":case "PREORDER": return this.preorderedIter();
      case "post":case "POST":case "postorder":case "POSTORDER": return this.postorderedIter();
      default: return this;
    }
  }
  
  public inorderedIter(): Iter<Node<T>> {
    return this;
  }

  private *preIter(): Iterable<Node<T>> {
    const nodes=new LinkedList(this.root.value);
    for(const node of nodes) {
      if(!node) break;
      yield node;

      if(node.left.contains()) nodes.pushBack(node.left.value);
      if(node.right.contains()) nodes.pushBack(node.right.value);
    }
  }
  public preorderedIter() {
    return Iter.fromIterable(this.preIter());
  }


  private *postIter(): Iterable<Node<T>> {
    if(!this.root.value) return;
    const stack=new LinkedList<[Option<Node<T>>,number]>([this.root,0]);
    
    while(stack.length) {
      const [temp,i]=stack.at(-1).value!;
      stack.popBack();

      if(temp.containsNone()) continue;

      switch(i) {
        case 0: 
          stack.pushBack([temp,1]);
          if(temp.value?.left.contains()) stack.pushBack([temp.value.left,0]);
        break;
        case 1:
          stack.pushBack([temp,2]);
          if(temp.value?.right.contains()) stack.pushBack([temp.value.right,0]);
        break;
        default: yield temp.value!;
      }
    }
  }
  public postorderedIter() {
    return Iter.fromIterable(this.postIter());
  }

  public override map<U>(f: (element: Node<T>,index: number)=> U,algo?: TreversalAlgorithm): Vec<U> {
    return this.iter(algo).map(f);
  }
  
  public treverse(f: (data: T,node: Node<T>)=> void,algo?: TreversalAlgorithm) {
    for(const node of this.iter(algo)) f(node.data,node);
  }

  public override toVec(algo?: TreversalAlgorithm) {
    return Vec.fromIter(this.iter(algo));
  }

  public override toArray(algo?: TreversalAlgorithm) {
    return Array.from(this.iter(algo));
  }

}




