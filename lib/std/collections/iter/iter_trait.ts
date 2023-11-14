import { Rev } from "./rev.ts";
import { Chain } from "./mod.ts";
import { Skip } from "./skip.ts";
import { Take } from './take.ts';
import { FlatMap } from "./mod.ts";
import { IterMap } from "./map.ts";
import { Fn } from "../../types.ts";
import { Filter } from "./filter.ts";
import { StepBy } from "./step_by.ts";
import { Flatten } from "./flatten.ts";
import { Inspect } from "./inspect.ts";
import { Enumerate } from './enumerate.ts';
import { SkipWhile } from "./skip_while.ts";
import { TakeWhile } from "./take_while.ts";
import { IterMapWhile } from "./map_while.ts";
import { $unimplemented } from "../../mod.ts";
import { Option,Some,None } from "../../mod.ts";




export abstract class IterTrait<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;

  public next() {
    const next=this[Symbol.iterator]().next().value;
    return new Option<T>(next==null?null:next);
  }

  public all(f: Fn<[element: T],boolean>) {
    for(const iter of this) if(!f(iter)) return false;

    return true;
  }

  public any(f: Fn<[element: T],boolean>) {
    for(const iter of this) if(f(iter)) return true;

    return false;
  }

  public asArray() {
    return [...this];
  }

  public chain(iter: Iterable<T>) {
    return new Chain(this,iter);
  }

  public cycle() {
    $unimplemented();
  }

  public enumerate() {
    return new Enumerate(this);
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

  public fold<U>(init: U,f: Fn<[prev: U,element: T],U>) {
    for(const iter of this) init=f(init,iter);
    
    return init;
  }

  public forEach(f: Fn<[element: T,index: number],void>) {
    let i=0;
    for(const iter of this) f(iter,i++);
  }

  public inspect(f: Fn<[element: T],void>) {
    return new Inspect(this,f);
  }
  
  public map<U>(f: Fn<[element: T,index: number],U>) {
    return new IterMap(this,f);
  }
  
  public mapWhile<U>(f: Fn<[element: T,index: number],Option<U>|U|None>) {
    return new IterMapWhile(this,f);
  }

  public position(f: Fn<[element: T],boolean>) {
    for(const [i,element] of this.enumerate()) if(f(element)) i;

    return -1;
  }

  public reduce(f: Fn<[prev: T,current: T],T>): Option<T> {
    const first=this.next();
    if(first.value==null) return first;

    return Some(this.fold(first.value,f));
  }

  public rev() {
    return new Rev(this);
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



