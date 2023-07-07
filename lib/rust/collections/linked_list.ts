import Option from "../io/option.ts"

export default class LinkedList<T> {
  




}


export interface Node<T> {
  data: T,
  ptr: Option<Node<T>>
}