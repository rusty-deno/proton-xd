import { IterableTrait } from "../iter/iter_trait.ts";
import { Vec } from '../linear/vector.ts';


export class HashSet<T> extends IterableTrait<T> {
  private set: Set<T>;

  constructor(...entries: T[]) {
    super();
    this.set=new Set(entries);
  }

  public static formIter<T>(iter: Iterable<T>) {
    const set=new HashSet<T>();
    set.set=new Set(iter);
    return set;
  }

  public get size() {
    return this.set.size;
  }

  next(): T {
    return this[Symbol.iterator]().next().value;
  }

  *[Symbol.iterator](): Iterator<T> {
    for(const element of this.set) yield element;
  }
  
  public add(element: T) {
    this.set.add(element);
  }
  
  public remove(element: T) {
    return this.set.delete(element);
  }
  
  public entries() {
    return new Vec(...this.set);
  }

  public has(element: T) {
    return this.set.has(element);
  }

  public empty() {
    this.set.clear();
  }
  
  public isEmpty() {
    return !!this.set;
  }
}

