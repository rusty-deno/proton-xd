import Iter from '../iter.ts';
import LinkedList from './linked_list.ts';
import { todo } from '../error/panic.ts';


export default class HashMap<K,V> extends Iter<Pair<K,V>> {
  private keys=new LinkedList<K>;
  private values=new LinkedList<V>;

  constructor(...pairs: Pair<K,V>[]) {
    super();
    todo();
  }

  next(): Pair<K,V> {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<Pair<K,V>> {
    for(const [i,key] of this.keys.enumerate()) {
      yield [key,this.values.at(i).value!];
    }
  }


}

export type Pair<K,V>=[key: K,value: V];
