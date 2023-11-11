import { Iter } from "./iter.ts";
import { LinkedList } from "../mod.ts";
import { Fn } from "../../types.ts";
import { None,Option } from "../../mod.ts";


export class IterMapWhile<T,U> extends Iter<U> {
  constructor(private _iter: LinkedList<T>,private f: Fn<[T,number],Option<U>|U|None>) {
    super(new LinkedList);
  }
  
  override *[Symbol.iterator](): Iterator<U> {
    let i=0;
    for(const iter of this._iter) {
      const _res=this.f(iter,i++);
      const res=_res instanceof Option?_res.value:_res;

      if(res==null) break;

      this.iter.pushBack(res);
      yield res;
    }
  }
}
