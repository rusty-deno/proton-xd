// deno-lint-ignore-file
import { Clone,Option,Some,None,Iter } from '../../mod.ts';
import { HasherFn,hash,Entry } from './mod.ts';
import { Vec } from '../mod.ts';
import { LinkedList } from '../linear/linked_list/linked_list.ts';
import sum from 'npm:hash-sum';
import { todo } from '../../error/panic.ts';

export class HashMap<K,V> implements Clone {
  private buckets=new Vec<Option<LinkedList<Entry<K,V>>>>();

  constructor(...entries: Entry<K,V>[]) {
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
    for(const bucket of this.buckets) {
      if(!bucket?.value) continue;
      for(const entry of bucket.value) yield entry;
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

    if(!this.buckets[hash]?.value) {
      this.buckets[hash]=Some(new LinkedList([key,val]));
      return;
    }
    for(const entity of this.buckets[hash].value!) {
      if(!this.equals(entity[0],key)) continue;
      entity[1]=val;
      return;
    }
  }

  private equals<T extends K|V>(obj1: T,obj2: T) {
    return Number.parseInt(`0x${sum(obj1)}`)===Number.parseInt(`0x${sum(obj2)}`);
  }

  public get(key: K): Option<V> {
    try {
      for(const entity of this.buckets[this.hash(key)].value!)
        if(this.equals(entity[0],key)) return Some(entity[1]);
      throw new Error;
    }catch {
      return None(null);
    }
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
