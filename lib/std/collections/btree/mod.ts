import { Option } from "../../mod.ts";



export class Node<T> {
  data: T;
  left: Option<Node<T>>;
  right: Option<Node<T>>;

  constructor(data: T,children: Children<T>={}) {
    this.data=data;
    this.left=new Option(children.left);
    this.right=new Option(children.right);
  }
}

export interface Children<T> {
  left?: Node<T>;
  right?: Node<T>;
}

type Algo=("prE"|"post"|"in")|("preorder"|"postorder"|"inorder");
export type TreversalAlgorithm=Lowercase<Algo>|Uppercase<Algo>;


