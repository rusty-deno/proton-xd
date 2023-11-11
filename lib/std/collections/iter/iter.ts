import { LinkedList } from "../mod.ts";
import { Fn } from '../../types.ts';
import { $unimplemented } from "../../mod.ts";
import { Some,None,Option } from '../../error/option/option.ts';
import { Inspect } from "./mod.ts";
import { IterMap } from "./map.ts";


export class Iter<T> implements Iterable<T> {
  constructor(protected iter: LinkedList<T>) {
    this.iter;
  }

  public static default<T>() {
    return new Iter(new LinkedList<T>());
  }

  public static fromIterable<T>(iter: Iterable<T>) {
    return new Iter(LinkedList.fromIter(iter));
  }

  [Symbol.iterator](): Iterator<T> {
    return this.iter[Symbol.iterator]();
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
    this.iter.append(iter instanceof LinkedList?iter:new LinkedList(iter));
  }


  public cycle() {
    $unimplemented();
  }

  public enumerate() {
    $unimplemented();
  }

  public *filter(f: Fn<[T],boolean>): Iterator<T> {
    for(const iter of this) if(f(iter)) yield iter;
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
    const iter=Iter.default<U>();
    for(const element of this) iter.chain(f(element));

    return iter;
  }
  
  public flatten() {
    $unimplemented();
  }
  
  public fold<I>(init: I,f: Fn<[prev: I,element: T],I>) {
    for(const iter of this) init=f(init,iter);
    
    return init;
  }
  
  public forEach(f: Fn<[element: T,index: number],void>) {
    let i=0;
    for(const iter of this) f(iter,i++);
  }
  
  public inspect(f: Fn<[element: T],void>) {
    return new Inspect(this.iter,f);
  }

  public last() {
    return new Option(this.iter.back.value?.data);
  }

  public get length() {
    return this.iter.length;
  }

  public map<U>(f: Fn<[element: T,index: number],U>) {
    return new IterMap(this.iter,f);
  }




  public toLinkedList() {
    return this.iter;
  }
}


[0].flat();
