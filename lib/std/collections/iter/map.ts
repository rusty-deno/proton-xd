import { Fn } from "../../types.ts";
import { IterTrait} from "./mod.ts";


export class IterMap<T,U> extends IterTrait<U> {
  constructor(private _iter: Iterable<T>,private f: Fn<[T,number],U>) {
    super();
  }
  
  *[Symbol.iterator]() {
    let i=0;
    for(const element of this._iter) yield this.f(element,i++);
  }
}







