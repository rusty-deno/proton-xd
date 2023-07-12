import {Option} from "../io/option.ts";
import {Iter} from "../iter.ts";


export abstract class List<T> extends Iter<T> {
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
      
  /**
   * @param {T} data 
   * @returns {number}
   * @description improvement todo
   */
  public indexOf(data: T): number {
    return Object.values(this).indexOf(data);
  }
  public contains(data: T) {
    return Boolean(this.indexOf(data)+1);
  }
}