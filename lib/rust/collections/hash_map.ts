import Iter from '../iter.ts';
import std from '../mod.ts';
import Option,{Some,None} from '../io/option.ts';
import { todo } from '../error/panic.ts';


module hash_map {
  export class HashMap<K,V> extends Iter<Entry<K,V>> implements std.Clone<HashMap<V,V>> {
    private keys=new Set<K>();
    private vals: Option<V>[]=[];

    constructor(...entries: Entry<K,V>[]) {
      super();
      for(const entry of entries) {
        this.keys.add(entry[0]);
        this.vals[hash(entry[0])]=Some(entry[1]);
      }
    }

    public clone(): HashMap<V,V> {
      return structuredClone(this);
    }

    next(): Entry<K,V> {
      return this[Symbol.iterator]().next().value;
    }

    *[Symbol.iterator](): Iterator<Entry<K,V>> {
      for(const key of this.keys) yield [key,this.vals[hash(key)].value!];
    }

    public *entries(): Iterator<Entry<K,V>> {
      for(const entry of this) yield entry;
    }
    
    public get size(): number {
      return this.keys.size;
    }

    public set(key: K,val: V): void {
      this.keys.add(key);
      this.vals[hash(key)]=Some(val);
    }

    public get(key: K): Option<V> {
      return this.vals[hash(key)];
    }

    public has(key: K): boolean {
      return !!this.get(key);
    }

    public empty() {
      this.keys.clear();
    }

    public isEmpty() {
      return !this.keys.size;
    }

    public hasher(): (obj: K)=> number {
      return hash;
    }
    
    public remove(key: K): void {
      this.keys.delete(key);
      this.vals[hash(key)]=None(null);
    }
  }

  export function hash(_obj: any): number {
    todo();
  }

  export type Entry<K,V>=[key: K,value: V];
}



export default hash_map;