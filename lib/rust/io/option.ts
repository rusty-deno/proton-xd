import panic from '../error/panic.ts';

export type None=undefined|null;
export type Some<T>=NonNullable<T>;

export default class Option<T> {
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
}

export function Some<T>(val: T) {
  return new Option(val);
}

export function None<T>(val: None) {
  return new Option<T>(val);
}