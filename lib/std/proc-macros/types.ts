
export interface AsyncPropertyDescriptor<T> extends PropertyDescriptor {
  value?: (...args: unknown[])=> Promise<T>;
  get?: ()=> Promise<T>;
  set?: (value: Promise<T>)=> void;
}
