// deno-lint-ignore-file no-explicit-any
import { Option,None,Some } from '../option/option.ts';
import { Exception } from '../exception.ts';

export type Ok<T>=T;
export type Err<E extends Error=Error>=E;
export type Res<T,E>={ ok: T }|{ err: E };


export class Result<T,E> extends Exception<T,E> {
  protected readonly isException: boolean;

  constructor(private result: Res<T,E>) {
    super();
    this.isException=Object.hasOwn(result,"err");
  }

  protected match<T1,E1>(t: (t: T)=> T1,e: (e: E)=> E1): T1|E1 {
    const res=this.result as any;
    return Object.hasOwn(this.result,"ok")?t(res.ok):e(res.err);
  }

  protected res(): any {
    const res=this.result as any;
    return res[Object.hasOwn(res,"ok")?"ok":"err"];
  }

  public and(res: Result<T,E>): Result<T,E> {
    return this.isException?this.clone():res;
  }

  public andThen(f: (xd: T)=> Result<T,E>) {
    return this.match(f,_=> this.clone());
  }

  public override orElse(op: (err: E)=> this) {
    return this.match(_=> this.clone(),op);
  }

  public err(): Option<E> {
    return this.match(_=> None(null),err=> Some(err as any));
  }

  public ok(): Option<T> {
    return this.match(ok=> Some(ok as any),_=> None(null));
  }

  public containsErr() {
    return this.isException;
  }

  public static Ok<T>(ok: T) {
    return new Result<T,any>({ ok });
  }

  public static Err<E>(err: E) {
    return new Result<any,E>({ err });
  }
}


export function Err<T,E>(err: E) {
  return new Result<T,E>({ err });
}
export function Ok<T,E>(ok: T) {
  return new Result<T,E>({ ok });
}
