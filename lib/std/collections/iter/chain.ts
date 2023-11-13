import { LinkedList } from '../linear/linked_list/linked_list.ts';
import { Iter } from "./iter.ts";

export class Chain<T> extends Iter<T> {
  constructor(iter: LinkedList<T>,iter1: LinkedList<T>) {
    super(iter);
    super.iter.append(iter1);
  }
}


