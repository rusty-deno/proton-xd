import { panic } from "../error/panic.ts";


export abstract class Exception<T,E> {
  abstract res(): T|E;
  public abstract and(res: this): unknown;
  public abstract andThen(f: (xd: T)=> unknown): unknown;
  abstract get isException(): boolean;
  public abstract orElse(op: (err: E)=> unknown): unknown;

  protected get _res(): any {
    return this.res();
  }

  
  public expect(msg: string): T {
    if(this.isException) panic(msg);
    return this._res;
  }
  
  public expectErr(msg: string) {
    if(this.isException) return this;
    panic(`${msg}: ${this._res}`);
  }

  public or(res: T) {
    return this.isException?res:this._res;
  }
  
  public unwrapOr(op: T) {
    return this.unwrapOrElse(()=> op);
  }

  public contains() {
    return !this.isException;
  }

  public containsErr() {
    return this.isException;
  }
  
  public unwrap(): T {    
    return this.unwrapOrElse((e: any)=> {
      panic(e);
    });
  }
  
  public unwrapOrElse(f: (err: E)=> T): T {
    return this.isException?f(this._res):this._res;
  }


}

