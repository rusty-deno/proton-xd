import { Iter } from '../iter.ts';
import { Clone } from '../clone.ts';
import { Option,None,Some } from '../io/option.ts';
import { todo } from '../error/panic.ts';


export class HashMap<K,V> extends Iter<Entry<K,V>> implements Clone {
  private _entries: Option<Entry<K,V>>[]=[];
  constructor(...entries: Entry<K,V>[]) {
    super();
    for(const entry of entries) this.set(...entry);
  }

  public clone(): HashMap<K,V> {
    return structuredClone(this);
  }

  next(): Entry<K,V> {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<Entry<K,V>> {
    for(const entry of this._entries) {
      if(!entry?.value) continue;
      yield entry.value;
    }
  }

  public entries(): Entry<K,V>[] {
    return [...this];
  }
  
  public get size(): number {
    return this._entries.length;
  }

  public set(key: K,val: V): void {
    this._entries[this.hash(key)]=Some([key,val]);
  }

  public get(key: K): Option<V> {
    return new Option(this._entries[this.hash(key)].value?.[1]);
  }

  public has(key: K): boolean {
    return !this.get(key).isException;
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

  private hash=hash;
  
  public remove(key: K): void {
    this._entries[this.hash(key)]=None(undefined);
  }
  
  [Symbol.toStringTag]() {
    let str: string="\0";
    for(const entry of this) str+=`${entry[0]} => ${entry[1]}\n`;
    return str;
  }

  public override toString() {
    return this[Symbol.toStringTag]();
  }
}

export function hash(obj: any): number {
  switch(typeof obj) {
    case "number":
    case "boolean":
      return Number(obj);
    case "string"://gperf
    default:
      todo();
  }
}

export type Entry<K,V>=[key: K,value: V];
export type HasherFn<K>=(obj: K)=> number;

