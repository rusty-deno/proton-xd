import { Entry } from './mod.ts';
import { Iter } from '../iter.ts';
import { Option } from '../../io/option/option.ts';
import { Vec } from '../linear/vector.ts';
import { HashSet } from '../hash_set/hash_set.ts';


export class HashMap<K,V> extends Iter<Entry<K,V>> {
  private map: Map<K,V>;

  constructor(...entries: Entry<K,V>[]) {
    super();
    this.map=new Map(entries);
  }

  public static fromIter<K,V>(iter: Iterable<Entry<K,V>>) {
    return new HashMap(...iter);
  }
  
  next(): Entry<K,V> {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<Entry<K,V>> {
    for(const entity of this.map) yield entity;
  }
  
  public entries(): Vec<Entry<K,V>> {
    return new Vec(...this.map);
  }

  public get size() {
    return this.map.size;
  }


  public get(key: K) {
    return new Option(this.map.get(key));
  }
  
  public set(key: K,value: V) {
    this.map.set(key,value);
  }

  public has(key: K) {
    return !!this.map.get(key);
  }

  public remove(key: K) {
    return this.map.delete(key);
  }

  public empty() {
    this.map.clear();
  }

  public isEmpty() {
    return !this.size;
  }

  public toString() {
    let str="";
    for(const entry of this.map) str+=`${entry[0]} => ${entry[1]}\n`;
    return str;
  }

  [Symbol.toStringTag]() {
    return this.toString();
  }

  public keySet() {
    return HashSet.formIter(this.map.keys());
  }

  public entrySet(): HashSet<Entry<K,V>> {
    return HashSet.formIter(this.map.entries());
  }
}


