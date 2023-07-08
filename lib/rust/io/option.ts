import panic from '../error/panic.ts';
import { Exception } from './exception.ts';

export type None=undefined|null;
export type Some<T>=NonNullable<T>;

export default class Option<T> implements Exception<T,None> {
  public readonly value: T|None;
  constructor(val: T|None) {
    this.value=val;
  }



  public or(opt: T) {
    return this.value??opt;
  }

  public unwrap() {
    if(!this.value) panic("None value found.. panicked");
    return this.value;
  }

  public unwrapUnchecked() {
    return this.value;
  }

  public unwrapOrElse(f: (err: None)=> T) {
    return this.value??f(this.value && undefined);
  }

  public static get None() {
    return None<any>(null);
  }
}

export function Some<T>(val: T) {
  return new Option(val);
}

/**
 * @param {None} val
 * @returns {Option<T>}
 * @description use for extream type safety
 */
export function None<T>(val: None): Option<T> {
  return new Option<T>(val);
}


export async function Opt<T>(f: ()=> Promise<T|None>) {
  return new Option<T>(await f());
}

export function OptSync<T>(f: ()=> T|None) {
  return new Option<T>(f());
}