import { Entry } from './mod.ts';
import { Iter } from '../iter.ts';
import { Option } from '../../mod.ts';
import { Vec } from '../linear/vector.ts';
import { HashSet } from '../hash_set/hash_set.ts';
import { Clone } from '../../clone.ts';

/**
 * A HashMap implemented with quadratic probing and SIMD lookup.
 * An improved version of Map with extra type safety
 * 
 * # Example
 * ```ts
 * const map=new HashMap([69,"xd"]);
 * $assertEq(map.get(69),Some("xd"));
 * ```
 */
export class HashMap<K,V> extends Iter<Entry<K,V>> implements Clone {
  private unordered_map: Map<K,V>;

  constructor(...entries: Entry<K,V>[]) {
    super();
    this.unordered_map=new Map(entries);
  }

  /**
   * Constructs a HashMap from an iterable.
   * # Example
   * ```ts
   * const arr=new Vec(["xd",69],["69",0]);
   * const map=new HashMap(arr);
   * ```
   */
  public static fromIter<K,V>(iter: Iterable<Entry<K,V>>) {
    return new HashMap(...iter);
  }

  public static form<K,V>(map: Iterable<Entry<K,V>>) {
    return HashMap.fromIter(map);
  }

  /**
   * Constructs a HashMap from an Record.
   * # Example
   * ```ts
   * const map=new HashMap({
   *    xd: 69
   * });
   */
  public static formRecord<K extends string|number|symbol,V>(record: Record<K,V>) {
    const map=new HashMap<K,V>();
    for(const key in record) map.set(key,record[key]);
    return map;
  }
  
  next(): Entry<K,V> {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<Entry<K,V>> {
    for(const entity of this.unordered_map) yield entity;
  }

  public get size() {
    return this.unordered_map.size;
  }

  /**
   * Returns the value corresponding to the key.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>();
   * map.set(69,"xd");
   * $assertEq(map.get(69),Some("xd"));
   * ```
   */
  public get(key: K) {
    return new Option(this.unordered_map.get(key));
  }
  
  /**
   * * Inserts a key-value pair into the map.
   * * If the map did not have this key present, [None] is returned.
   * * If the map did have this key present, the value is updated, and the old value is returned.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>();
   * $assertEq(map.set(69,"xd"),Option.None);
   * ```
   */
  public set(key: K,value: V) {
    this.unordered_map.set(key,value);
  }

  /**
   * Returns true if the map contains a value for the specified key else false.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>();
   * map.set(69,"xd");
   * $assert(map.has(69));
   * ```
   */
  public has(key: K) {
    return !!this.unordered_map.get(key);
  }

  /**
   * Removes a key from the map, returning the value at the key if the key was previously in the map.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>();
   * map.set(69,"xd");
   * $assertEq(map.remove(69),Some("xd"));
   * ```
   */
  public remove(key: K) {
    return this.unordered_map.delete(key);
  }

  /**
   * Emties the current map.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>();
   * map.set(69,"xd");
   * map.empty();
   * $assertEq(map.size,0);
   * ```
   */
  public empty() {
    this.unordered_map.clear();
  }

  /**
   * Returns whether the map is empty
   * # Example
   * ```ts
   * const map=new HashMap<number,string>();
   * $assert(map.isEmpty());
   * ```
   */
  public isEmpty() {
    return !this.size;
  }

  /**
   * Returns the string representation of the current map.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>();
   * map.set(69,"xd");
   * $assertEq(map.toString,`{
   *    69: xd
   * }`);
   * ```
   */
  public toString() {
    if(this.isEmpty()) return "{}";
    let str="{\n\t";
    for(const [key,value] of this) str+=`${key} => ${value}\n`;
    return str+"\n}";
  }

  public get [Symbol.toStringTag]() {
    return this.toString();
  }

  /**
   * Returns a set of the keys present in the current map.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>(,["xd",69],["xd1",0]);
   * $assertEq(map.keySet(),new HashSet("xd","xd1"));
   * ```
   */
  public keySet() {
    return HashSet.formIter(this.unordered_map.keys());
  }

  /**
   * Returns a set of the keys present in the current map.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>(["xd",69],["xd1",0]);
   * $assertEq(map.keys(),$vec("xd","xd1"));
   * ```
   */
  public keys() {
    return Vec.fromIter(this.unordered_map.keys());
  }

  /**
   * Returns a set of the keys present in the current map.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>(["xd",69],["xd1",0]);
   * $assertEq(map.entrySet(),new HashSet(["xd",69],["xd1",0]));
   * ```
   */
  public entrySet(): HashSet<Entry<K,V>> {
    return HashSet.formIter(this.unordered_map.entries());
  }

  /**
   * Returns a set of the keys present in the current map.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>(["xd",69],["xd1",0]);
   * $assertEq map.entries(),$vec(["xd",69],["xd1",0]));
   * ```
   */
  public entries(): Vec<Entry<K,V>> {
    return new Vec(...this.unordered_map);
  }

  /**
   * Returns a set of the keys present in the current map.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>(["xd",69],["xd1",69]);
   * $assertEq(map.valueSet(),new HashSet(69));
   * ```
   */
  public valueSet() {
    return HashSet.formIter(this.unordered_map.values());
  }

  /**
   * Returns a set of the keys present in the current map.
   * # Example
   * ```ts
   * const map=new HashMap<number,string>(hashFn,["xd",69],["xd1",0]);
   * $assertEq(map.values(),$vec(69,0));
   * ```
   */
  public values() {
    return Vec.fromIter(this.unordered_map.values());
  }
  
  public clone() {
    return HashMap.fromIter(this.unordered_map);
  }

}


