
import { Option } from "../../mod.ts";
import { Rev,Chain } from "./__mod.ts";
import { IterTrait } from "./mod.ts";
import { LinkedList } from '../linear/linked_list/linked_list.ts';




export class Iter<T> extends IterTrait<T> {
  private _iter: LinkedList<T>;

  constructor(iter: Iterable<T>) {
    super();
    this._iter=Iter.linkedList(iter);
  }

  private static linkedList<T>(iter: Iterable<T>) {
    return iter instanceof LinkedList?iter:iter instanceof Iter?iter._iter:LinkedList.fromIter(iter);
  }

  public static default<T>() {
    return new Iter(new LinkedList<T>());
  }

  public static fromIterable<T>(iter: Iterable<T>) {
    return new Iter(LinkedList.fromIter(iter));
  }

  protected get _ll() {
    return this._iter
  }

  *[Symbol.iterator](): Iterator<T> {
    yield* this._iter;
  }

  public override chain(iter: Iterable<T>) {
    return new Chain(this._iter,iter);
  }

  public last() {
    return new Option(this._iter.back.value?.data);
  }

  public get length() {
    return this._iter.length;
  }

  public override rev() {
    return new Rev(this._iter);
  }

  public toLinkedList() {
    return this._iter;
  }
}





