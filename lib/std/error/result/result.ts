// deno-lint-ignore-file no-explicit-any
import { Option,None,Some } from '../option/option.ts';
import { Exception } from '../exception.ts';

export type Ok<T>=T;
export type Err<E extends Error=Error>=E;
export type Res<T,E>={ ok: T }|{ err: E };


export class Result<T,E> extends Exception<T,E> {
  protected isException: boolean;

  constructor(private _result: Res<T,E>) {
    super();
    this.isException=Object.hasOwn(_result,"err");
  }

  protected match<T1,E1>(t: (t: T)=> T1,e: (e: E)=> E1): T1|E1 {
    const res=this._result as any;
    return Object.hasOwn(this._result,"ok")?t(res.ok):e(res.err);
  }

  protected res(): any {
    const res=this._result as any;
    return res[Object.hasOwn(res,"ok")?"ok":"err"];
  }

  public get result(): T|E {
    return this.res();
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
    return this.match(_=> None(null),err=> Some(err));
  }

  public ok(): Option<T> {
    return this.match(ok=> Some(ok),_=> None(null));
  }

  public containsErr() {
    return this.isException;
  }

  public insert(ok: T) {
    this._result={ok};
    this.isException=false;
  }

  public getOrInsert(ok: T): T {
    if(this.isException) this._result={ ok };
    return this.res();
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
