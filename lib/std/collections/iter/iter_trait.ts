
import { Fn } from "../../types.ts";
import { $unimplemented } from "../../mod.ts";// unimplemented
import { Option,Some,None } from "../../mod.ts";
import { Chain,Skip,Take,FlatMap,Filter,StepBy,Flatten,SkipWhile,TakeWhile,IterMapWhile } from "./__mod.ts";
import { IteratorTrait } from "../mod.ts";


export abstract class IterTrait<T> extends IteratorTrait<T> {
  public chain(iter: Iterable<T>) {
    return new Chain(this,iter);
  }

  public cycle() {
    $unimplemented();
  }

  public filter(f: Fn<[element: T],boolean>) {
    return new Filter(this,f);
  }

  public find(f: Fn<[element: T],boolean>) {
    for(const iter of this)
      if(f(iter)) return Some(iter);

    return None<T>();
  }

  public findMap<U>(f: Fn<[element: T],Option<U>>) {
    for(const iter of this) {
      const res=f(iter);
      if(res.contains()) res;
    }

    return None<T>();
  }

  public flatMap<U>(f: Fn<[element: T],Iterable<U>>) {
    return new FlatMap(this,f);
  }

  public static flatten<T,U extends Iterable<T>,I extends Iterable<U>>(iter: I) {
    return new Flatten<T,U,I>(iter);
  }
  
  public mapWhile<U>(f: Fn<[element: T,index: number],Option<U>|U|None>) {
    return new IterMapWhile(this,f);
  }

  public position(f: Fn<[element: T],boolean>) {
    for(const [i,element] of this.enumerate()) if(f(element)) i;

    return -1;
  }

  public rfind(f: Fn<[element: T],boolean>) {
    return this.rev().find(f);
  }

  public rfold<U>(init: U,f: Fn<[prev: U,element: T],U>) {
    return this.rev().fold(init,f);
  }
  
  public rposition(f: Fn<[element: T],boolean>) {
    return this.rev().position(f);
  }

  public skip(skip: number) {
    return new Skip(this,skip);
  }

  public skipWhile(f: Fn<[element: T],boolean>) {
    return new SkipWhile(this,f);
  }

  public stepBy(step: number) {
    return new StepBy(this,step);
  }

  public take(n: number) {
    return new Take(this,n);
  }
  
  public takeWhile(f: Fn<[element: T],boolean>) {
    return new TakeWhile(this,f);
  }

  public zip(_iter: Iterable<T>) {
    $unimplemented();
  }
}



