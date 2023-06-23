import panic from './panic.ts';

export type None=undefined|null;
export type Some<T>=NonNullable<T>;

export default class Option<T> {
  private v: T|None;
  constructor(v: T|None) {
    this.v=v;
  }


  public unwrap() {
    if(!this.v) panic("None value found.. panicked");
    return this.v;
  }

  public unwrapUnchecked() {
    return this.v;
  }

  public unwrapOrElse(f: ()=> T) {
    return this.v??f();
  }
}

export function Some<T>(v: T) {
  return new Option(v);
}

export function None<T>(v: None) {
  return new Option<T>(v);
}