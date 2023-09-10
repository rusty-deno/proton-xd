// deno-lint-ignore-file

export interface AsyncPropertyDescriptor<T> extends PropertyDescriptor {
  value?: (...args: unknown[])=> Promise<T>;
  get?: ()=> Promise<T>;
  set?: (value: Promise<T>)=> void;
}

export type Class={
  new(...args: any[]): Object
};

export type DerivableMacro=(...args: any[])=> Array<[keyof any,any]>;



