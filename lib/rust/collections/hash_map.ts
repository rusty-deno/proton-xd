import Iter from '../iter.ts';
import std from '../mod.ts';
import Option,{Some,None} from '../io/option.ts';
import { todo } from '../error/panic.ts';


export class HashMap<K,V> extends Iter<Entry<K,V>> implements std.Clone<HashMap<K,V>> {
  private _entries: Entry<K,V>[];
  constructor(...entries: Entry<K,V>[]) {
    super();
    this._entries=entries;
  }

  public clone(): HashMap<K,V> {
      return structuredClone(this);
  }

  next(): Entry<K,V> {
      return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<Entry<K,V>> {
      for(const entry of this._entries) yield entry;
  }

  public entries(): Entry<K,V>[] {
    return structuredClone(this._entries);
  }
  
  public get size(): number {
      return this._entries.length;
  }
  public set(key: K,val: V): void {
    todo();
  }
  public get(key: K): Option<V> {
    todo();
  }

  public has(key: K): boolean {
      return !!this.get(key);
  }

  public empty() {
      this._entries=[];
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

  private hash=(key: K): number=> {
    const h=hash(key);
    return h^(h>>>16);
  };
  
  public remove(key: K): void {
    todo();
  }
  
}

export function hash(_obj: any): number {
  todo();
}

export type Entry<K,V>=[key: K,value: V];
export type HasherFn<K>=(obj: K)=> number;

