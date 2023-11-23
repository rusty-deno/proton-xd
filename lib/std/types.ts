
// deno-lint-ignore no-explicit-any
type Params=Array<any>;

export interface Fn<P extends Params,R> {
  (...args: P): R;
}

export interface AsyncFn<P extends Params,R> {
  (...args: P): Promise<R>;
}

