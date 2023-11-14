import { Option } from "../../mod.ts";
import { Vec } from './vector.ts';
import { IteratorTrait } from '../iter/iterator_trait.ts';



export abstract class List<T> extends IteratorTrait<T> {

  public static fromIter<T>(iter: Iterable<T>) {
    return new class extends this<T> {
      [Symbol.iterator](): Iterator<T> {
        return iter[Symbol.iterator]();
      }
    };
  }
  
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
    for(const [i,element] of this.enumerate()) if(Object.is(data,element)) return i;
    return -1;
  }

  public contains(data: T) {
    return Boolean(this.indexOf(data)+1);
  }

  public toVec() {
    return Vec.fromIter(this);
  }
}