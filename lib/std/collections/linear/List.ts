import { Option } from "../../mod.ts";



export abstract class List<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;
  abstract next(): T;
  /**
   * @param {number} index 
   * @returns {Option<T>}
   * @description improvement todo
   */
  public at(index: number): Option<T> {
    return new Option(Object.values(this)[index]);
  }
  
  public *enumerate(): Iterable<[T,number]> {
    let i=0;
    for(const element of this) yield [element,i++];
  }

  /**
   * @param {T} data 
   * @returns {number}
   * @description improvement todo
   */
  public indexOf(data: T): number {
    for(const [element,i] of this.enumerate()) if(Object.is(data,element)) return i;
    return -1;
  }

  public contains(data: T) {
    return Boolean(this.indexOf(data)+1);
  }
  
}