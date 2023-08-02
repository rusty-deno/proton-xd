import {Iter} from "../iter.ts";
import { HasherFn,HashMap } from '../hash_map/mod.ts';



export class HashSet<T> extends Iter<T> {
  private map=new HashMap<T,null>();

  constructor(...entries: T[]) {
    super();
    for(const entry of entries) this.add(entry);
  }

  public static withHasher<T>(fn: HasherFn<T>,...entries: T[]) {
    const set=new HashSet(...entries);
    set.map.hasher=fn;
    return set;
  }
  
  public static fromIter<T>(entries: Iterable<T>) {
    const set=new Set<T>;
    for(const entry of entries) set.add(entry);
    return set;
  }
  
  next(): T {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<T> {
    for(const entry of this.map) yield entry[0];
  }

  public add(data: T,) {
    this.map.set(data,null);
  }
  
  public remove(data: T) {
    this.map.remove(data);
  }

  public toString() {
    return `{${this.toArray().join(" , ")}}`;
  }
}




