
import { Fn } from '../../types.ts';
import { $unimplemented } from "../../mod.ts";
import { Some,None,Option } from '../../error/option/option.ts';
import { Inspect } from "./mod.ts";
import { IterMap } from "./map.ts";
import { IterMapWhile } from './map_while.ts';
import { RevIter } from './rev.ts';
import { SkippedIter } from './skip.ts';
import { SkipWhile } from './skip_while.ts';
import { StepBy } from './step_by.ts';
import { Take } from "./take.ts";
import { TakeWhile } from "./take_while.ts";
import { Chain } from './chain.ts';
import { Filter } from "./filter.ts";
import { FlatMap } from "./flat_map.ts";


export abstract class IterTrait<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;
  public next() {
    return new Option<T>(this[Symbol.iterator]().next().value);
  }

  
  public all(f: Fn<[T],boolean>) {
    for(const iter of this) if(!f(iter)) return false;

    return true;
  }

  public any(f: Fn<[T],boolean>) {
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
    $unimplemented();
  }

  public filter(f: Fn<[T],boolean>) {
    return new Filter(this,f);
  }

  public find(f: Fn<[T],boolean>) {
    for(const iter of this) if(f(iter)) return Some(iter);

    return None<T>();
  }

  public findMap<U>(f: Fn<[T],Option<U>>) {
    for(const iter of this) {
      const res=f(iter);
      if(res.contains()) res;
    }

    return None<T>();
  }
  
  public flatMap<U>(f: Fn<[T],Iterable<U>>) {
    return new FlatMap(this,f);
  }
  
  public flatten() {
    $unimplemented();
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

  public position(_f: Fn<[element: T],boolean>) {
    $unimplemented();
    return -1;
  }

  
  public reduce(f: Fn<[prev: T,current: T],T>): Option<T> {
    const first=this.next();
    if(first.value==null) return first;

    return Some(this.fold(first.value,f));
  }
  
  public rev() {
    return new RevIter(this);
  }

  public rfind(f: Fn<[element: T],boolean>) {
    for(const iter of this) if(f(iter)) return Some(iter);

    return None<T>();
  }

  public reverseFold<U>(init: U,f: Fn<[prev: U,element: T],U>) {
    return this.rev().fold(init,f);
  }

  public reversedPosition(_f: Fn<[element: T],boolean>) {
    $unimplemented();
    return -1;
  }

  public skip(skip: number) {
    return new SkippedIter(this.iter,skip);
  }

  public skipWhile(f: Fn<[element: T],boolean>) {
    return new SkipWhile(this.iter,f);
  }
  
  public stepBy(step: number) {
    return new StepBy(this.iter,step);
  }

  public take(n: number) {
    return new Take(this.iter,n);
  }

  public takeWhile(f: Fn<[element: T],boolean>) {
    return new TakeWhile(this.iter,f);
  }

  public zip(_iter: Iterable<T>) {
    $unimplemented();
  }













}






