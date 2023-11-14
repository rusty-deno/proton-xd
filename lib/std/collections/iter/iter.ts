import { Rev } from './rev.ts';
import { Chain } from './chain.ts';
import { IterTrait } from "./mod.ts";
import { Option } from "../../mod.ts";
import { LinkedList } from '../linear/linked_list/linked_list.ts';




export class Iter<T> extends IterTrait<T> {
  private iter: LinkedList<T>;

  constructor(iter: Iterable<T>) {
    super();
    this.iter=Iter.linkedList(iter);
  }

  private static linkedList<T>(iter: Iterable<T>) {
    return iter instanceof LinkedList?iter:iter instanceof Iter?iter.iter:LinkedList.fromIter(iter);
  }

  public static default<T>() {
    return new Iter(new LinkedList<T>());
  }

  public static fromIterable<T>(iter: Iterable<T>) {
    return new Iter(LinkedList.fromIter(iter));
  }

  protected get _ll() {
    return this.iter
  }

  *[Symbol.iterator](): Iterator<T> {
    yield* this.iter;
  }

  public override chain(iter: Iterable<T>) {
    return new Chain(this.iter,iter);
  }

  public last() {
    return new Option(this.iter.back.value?.data);
  }

  public get length() {
    return this.iter.length;
  }

  public override rev() {
    return new Rev(this.iter);
  }
}





