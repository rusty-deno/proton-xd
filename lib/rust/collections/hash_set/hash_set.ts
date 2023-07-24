import {Iter} from "../iter.ts";
import {HashMap} from "../hash_map/hash_map.ts";



export class HashSet<T> extends Iter<T> {
  private map: HashMap<T,null>=new HashMap;

  constructor(...entries: T[]) {
    super();
    for(const entry of entries) this.add(entry);
  }
  
  next(): T {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<T> {
    for(const entry of this.map) yield entry[0];
  }

  public add(data: T) {
    this.map.set(data,null);
  }
  
  public remove(data: T) {
    this.map.remove(data);
  }
}




