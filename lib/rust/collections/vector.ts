import Option from "../io/option.ts";
import { Enumerate } from "../iter.ts";
import * as list from "./List.ts";
import Clone from '../clone.ts';


export default class Vec<T> implements Clone<Vec<T>> {
  private readonly arr=new Array<T>;
  
  constructor(...elements: T[]) {
    this.arr.push(...elements);
  }

  public get length() {
    return this.arr.length;
  }
  
  public set length(size: number) {
    this.arr.length=size;
  }

  next(): T {
    return this[Symbol.iterator]().next().value;
  }
  
  *[Symbol.iterator](): Iterator<T,any,undefined> {
    for(const iterator of this.arr) yield iterator;
  }

  public sort(f: (a: T, b: T)=> number) {
    this.arr.sort(f);
    return this;
  }

  public contains(data: T): boolean {
    return this.arr.includes(data);
  }

  public indexOf(data: T): number {
    return this.arr.indexOf(data);
  }

  public at(index: number): Option<T> {
    return new Option(this.arr.at(index));
  }

  public enumerate(): Enumerate<T> {
    return this.arr.entries();
  }
  
  public toArray(): T[] {
    return structuredClone(this.arr);
  }

  public toVec(): Vec<T> {
    return this.clone();
  }

  public clone(): Vec<T> {
    return structuredClone(this);
  }
}
