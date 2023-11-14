import { LinkedList } from "../linear/linked_list/mod.ts";
import { Iter } from "./mod.ts";

export class Rev<T> extends Iter<T> {
  constructor(iter: Iterable<T>) {
    super(iter);
  }

  override *[Symbol.iterator]() {
    for(let iter=super._ll.back.value;iter&&iter.prev.deref()?.value;iter=iter.prev.deref()?.value) yield iter.data;
  }

  public toLinkedList() {
    return LinkedList.fromIter(this);
  }
}


