// deno-lint-ignore-file
import { Clone,Option,Some,None,Iter } from '../../mod.ts';
import { HasherFn,hash,Entry } from './mod.ts';
import { Vec } from '../mod.ts';
import { LinkedList } from '../linear/linked_list/linked_list.ts';
import { todo } from '../../error/panic.ts';
import sum from 'npm:hash-sum';

export class HashMap<K,V> extends Iter<Entry<K,V>> implements Clone {
  // private buckets=new Vec<Option<Entry<K,V>>>();
  private buckets=new Vec<Option<LinkedList<Entry<K,V>>>>();

  constructor(...entries: Entry<K,V>[]) {
    super();
    for(const entry of entries) this.set(entry[0],entry[1]);
  }

  public static withHasher<K,V>(fn: HasherFn<K>,...entries: Entry<K,V>[]) {
    const hash_map=new HashMap(...entries);
    hash_map.hasher=fn;
    return hash_map;
  }

  public static fromIter<K,V>(iter: Iterable<Entry<K,V>>) {
    const map=new HashMap<K,V>();
    for(const entry of iter) map.set(entry[0],entry[1]);
    return map;
  }
  
  public clone(): HashMap<K,V> {
    return structuredClone(this);
  }

  next(): Entry<K,V> {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<Entry<K,V>> {
    for(const {value} of this.buckets) {
      if(!value) continue;
      for(const entry of value) yield entry;
    }
  }

  public entries(): Vec<Entry<K,V>> {
    return new Vec(...this);
  }
  
  public get size(): number {
    return this.buckets.length;
  }

  public set(key: K,val: V): void {
    const hash=this.hash(key);
    if(this.buckets[hash].value)
      this.buckets[hash].value!.pushFront([key,val]);
    else
      this.buckets[hash]=Some(new LinkedList([key,val]));
  }

  public get(key: K): Option<V> {
    const bucket=this.buckets[this.hash(key)].value;
    if(bucket)
      for(const entity of bucket)
        if(sum(key)===sum(entity[0])) return Some(entity[1]);

    return None(null);
  }

  public has(key: K): boolean {
    return !this.get(key).isException;
  }

  public empty() {
    this.buckets=new Vec;
  }

  public isEmpty() {
    return !this.size;
  }

  public get hasher(): HasherFn<K> {
    return this.hash;
  }
  
  public set hasher(hasher: HasherFn<K>) {
    this.hash=hasher;
  }

  private hash=(key: K)=> hash(key);
  
  public remove(key: K): void {
    // this.buckets[this.hash(key)]=None(null);
    todo();
  }
  
  [Symbol.toStringTag]() {
    let str="\0";
    for(const entry of this) str+=`${entry[0]} => ${entry[1]}\n`;
    return str;
  }

  public toString() {
    return this[Symbol.toStringTag]();
  }
}
