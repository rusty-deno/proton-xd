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
 * * Suppose the keys are Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday.
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
  private length=0;
  public readonly hasher: HasherFn<K>;

  constructor(hasher: HasherFn<K>,...entries: Entry<K,V>[]) {
    this.hasher=hasher;
    for(const [key,value] of entries) this.table[this.hasher(key)]=[key,value];
    this.length=entries.length;
  }

  /**
   * Constructs a HashMap from an iterable.
   * # Example
   * ```ts
   * const arr=new Vec(["xd",69],["69",0]);
   * const table=new HashTable(hashFn,arr);
   * ```
   */
  public static fromIter<K,V>(hasher: HasherFn<K>,iter: Iterable<Entry<K,V>>) {
    const map=new HashTable<K,V>(hasher);
    for(const entry of iter) map.set(...entry);
    return map;
  }
  /**
   * Constructs a HashMap from an Record.
   * # Example
   * ```ts
   * const table=new HashTable(hashFn,{
   *    xd: 69
   * });
   */
  public static formRecord<K extends string|number|symbol,V>(hasher: HasherFn<K>,record: Record<K,V>) {
    const map=new HashTable<K,V>(hasher);
    for(const key in record) map.set(key,record[key]);
    return map;
  }
  

  public clone(): HashTable<K,V> {
    return HashTable.fromIter(this.hasher,this.entries());
  }
  
  /**
   * Constructs a HashMap from the current table and returns it.
   */
  public hashMap() {
    return HashMap.fromIter(this.entries());
  }

  next(): Entry<K,V> {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<Entry<K,V>> {
    for(const entry of this.table) yield entry;
  }
  
  public get capacity(): number {
    return this.table.length;
  }
  public get size() {
    return this.length;
  }
  
  /**
   * * Inserts a key-value pair into the map.
   * * If the map did not have this key present, [None] is returned.
   * * If the map did have this key present, the value is updated, and the old value is returned.
   * # Example
   * ```ts
   * const table=new HashTable<number,string>(hashFn);
   * assertEq(table.set(69,"xd"),Option.None);
   * ```
   */
  public set(key: K,value: V): Option<Entry<K,V>> {
    const index=this.hasher(key),entry=this.table.nth(index);
    this.table[index]=[key,value];
    ++this.length;
    return entry;
  }

  /**
   * Returns the value corresponding to the key.
   * # Example
   * ```ts
   * const table=new HashTable<number,string>(hashFn);
   * table.set(69,"xd");
   * assertEq(table.get(69),Some("xd"));
   * ```
   */
  public get(key: K): Option<V> {
    return new Option(this.table.at(this.hasher(key))?.[1]);
  }

  /**
   * Returns true if the map contains a value for the specified key else false.
   * # Example
   * ```ts
   * const table=new HashTable<number,string>(hashFn);
   * table.set(69,"xd");
   * assert(table.has(69));
   * ```
   */
  public has(key: K): boolean {
    return this.table.at(this.hasher(key))!==undefined;
  }
  
  /**
   * Emties the current table.
   * # Example
   * ```ts
   * const table=new HashTable<number,string>(hashFn);
   * table.set(69,"xd");
   * table.empty();
   * assertEq(table.size,0);
   * ```
   */
  public empty() {
    this.table=new Vec;
    this.length=0;
  }
  
  /**
   * Returns whether the table is empty
   * # Example
   * ```ts
   * const table=new HashTable<number,string>(hashFn);
   * assert(table.isEmpty());
   * ```
   */
  public isEmpty() {
    return !this.length;
  }
  
  /**
   * Removes a key from the map, returning the value at the key if the key was previously in the map.
   * # Example
   * ```ts
   * const table=new HashTable<number,string>(hashFn);
   * table.set(69,"xd");
   * assertEq(table.remove(69),Some("xd"));
   * ```
   */
  public remove(key: K): Option<V> {
    const index=this.hasher(key),entry=new Option(this.table.nth(index).value?.[1]);
    delete this.table[index];
    --this.length;
    return entry;
  }
  
  [Symbol.toStringTag]() {
    if(this.isEmpty()) return "{}";
    let str="{\n\t";
    for(const [key,value] of this) str+=`${key} => ${value}\n`;
    return str+"\n}";
  }
  
  /**
   * Returns the string representation of the current table.
   * # Example
   * ```ts
   * const table=new HashTable<number,string>(hashFn);
   * table.set(69,"xd");
   * assertEq(table.toString,`{
   *    69: xd
   * }`);
   * ```
   */
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

