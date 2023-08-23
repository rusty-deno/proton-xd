import { Clone,Option } from '../../mod.ts';
import { Entry } from './mod.ts';
import { HashSet, Vec } from '../mod.ts';
import { HashMap } from './hash_map.ts';

export type HasherFn<K>=(obj: K)=> number;


/**
 * A HashTable implemented constant time look-ups.
 * It's desined to be used only in special cases like keyword recognization,
 * Where the keys are limited and known at compile-time..
 * It must be used with a custom hash function..
 * # Example
 * * For example the keys are Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday.
 * * Then the hash-function may be second char of the string & length of the string
 * ```ts
 * const hash=(key: string)=> key.charCodeAt(1)&key.length;
 * const table=new HashTable(hash,["Sunday",0],["Monday",1],["Tuesday",2],["Wednesday",3],["Thursday",4],["Friday",5],["Saturday",6]);
 * 
 * console.log(table.get("Monday").unwrap());
 * ```
 */
export class HashTable<K,V> implements Clone {
  private table=new Vec<Entry<K,V>>();
  public readonly hasher: HasherFn<K>;

  constructor(hasher: HasherFn<K>,...entries: Entry<K,V>[]) {
    this.hasher=hasher;
    for(const entry of entries) this.set(entry[0],entry[1]);
  }

  public static fromIter<K,V>(hasher: HasherFn<K>,iter: Iterable<Entry<K,V>>) {
    const map=new HashTable<K,V>(hasher);
    for(const entry of iter) map.set(...entry);
    return map;
  }

  public static formRecord<K extends string|number|symbol,V>(hasher: HasherFn<K>,record: Record<K,V>) {
    const map=new HashTable<K,V>(hasher);
    for(const key in record) map.set(key,record[key]);
    return map;
  }
  
  public clone(): HashTable<K,V> {
    return HashTable.fromIter(this.hasher,this.entries());
  }

  public hashMap() {
    return HashMap.fromIter(this.entries());
  }

  next(): Entry<K,V> {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<Entry<K,V>> {
    for(const entry of this.table) yield entry;
  }
  
  public get size(): number {
    return this.table.length;
  }

  public set(key: K,value: V): void {
    this.table[this.hasher(key)]=[key,value];
  }

  public get(key: K): Option<V> {
    return new Option(this.table.at(this.hasher(key))?.[1]);
  }

  public has(key: K): boolean {
    return this.table.at(this.hasher(key))!==undefined;
  }

  public empty() {
    this.table=new Vec;
  }

  public isEmpty() {
    return !this.size;
  }
  
  public remove(key: K): void {
    delete this.table[this.hasher(key)];
  }
  
  [Symbol.toStringTag]() {
    let str="";
    for(const [key,value] of this) str+=`${key} => ${value}\n`;
    return str;
  }

  public toString() {
    return this[Symbol.toStringTag]();
  }

  public keySet() {
    return HashSet.formIter(this.keys());
  }

  public keys() {
    return this.table.map(([key,_])=> key);
  }

  public entrySet(): HashSet<Entry<K,V>> {
    return new HashSet(...this);
  }

  public entries(): Vec<Entry<K,V>> {
    return new Vec(...this);
  }

  public valueSet() {
    return HashSet.formIter(this.values());
  }

  public values() {
    return this.table.map(([_,value])=> value);
  }
}

