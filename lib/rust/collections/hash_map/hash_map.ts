import { Entry } from './mod.ts';
import { Iter } from '../iter.ts';
import { Option } from '../../io/option/option.ts';
import { Vec } from '../linear/vector.ts';
import { HashSet } from '../hash_set/hash_set.ts';
import { Clone } from '../../clone.ts';


export class HashMap<K,V> extends Iter<Entry<K,V>> implements Clone {
  private unordered_map: Map<K,V>;

  constructor(...entries: Entry<K,V>[]) {
    super();
    this.unordered_map=new Map(entries);
  }

  public static fromIter<K,V>(iter: Iterable<Entry<K,V>>) {
    return new HashMap(...iter);
  }

  public static form<K,V>(map: Iterable<Entry<K,V>>) {
    return HashMap.fromIter(map);
  }


  
  next(): Entry<K,V> {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<Entry<K,V>> {
    for(const entity of this.unordered_map) yield entity;
  }
  
  public entries(): Vec<Entry<K,V>> {
    return new Vec(...this.unordered_map);
  }

  public get size() {
    return this.unordered_map.size;
  }


  public get(key: K) {
    return new Option(this.unordered_map.get(key));
  }
  
  public set(key: K,value: V) {
    this.unordered_map.set(key,value);
  }

  public has(key: K) {
    return !!this.unordered_map.get(key);
  }

  public remove(key: K) {
    return this.unordered_map.delete(key);
  }

  public empty() {
    this.unordered_map.clear();
  }

  public isEmpty() {
    return !this.size;
  }

  public toString() {
    let str="";
    for(const [key,value] of this.unordered_map) str+=`${key} => ${value}\n`;
    return str;
  }

  [Symbol.toStringTag]() {
    return this.toString();
  }

  public keySet() {
    return HashSet.formIter(this.unordered_map.keys());
  }

  public entrySet(): HashSet<Entry<K,V>> {
    return HashSet.formIter(this.unordered_map.entries());
  }

  public valueSet() {
    // todo;
  }

  public clone() {
    return HashMap.fromIter(this.unordered_map);
  }

}


