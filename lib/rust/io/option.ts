import {Exception} from './exception.ts';




export class Option<T> extends Exception<T,None> {
  public readonly value: T|None;

  constructor(val: T|None) {
    super();
    this.value=val;
  }

  res(): T|None {
    return this.value;
  }


  public and(op: this): Option<T> {
    return this.isException?this:op;
  }

  public andThen(f: (xd: T)=> Option<T>): Option<T> {
    return this.isException?this:f(this.value!);
  }

  get isException(): boolean {
    return !(this.value??false);
  }

  public orElse(op: (err: None)=> Option<T>): Option<T> {
    const val: any=this.value;
    return this.isException?op(val):this;
  }

  public static get None() {
    return None<any>(undefined);
  }
}

export type None=undefined|null;
export type Some<T>=NonNullable<T>;

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