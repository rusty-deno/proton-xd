import { todo } from '../error/panic.ts';

export abstract class Str extends String {
  protected abstract buffer: Uint8Array;

  *[Symbol.iterator](): IterableIterator<string> {
    for(const char of this.buffer) yield String.fromCharCode(char);
  }
  
  public override charAt(index: number): string {
    return String.fromCharCode(this.charCodeAt(index));
  }
  
  public override charCodeAt(index: number): number {
    return this.buffer[index];
  }
  
  public compareTo(that: string,locales?: string|string[],options?: Intl.CollatorOptions): number {
    return this.localeCompare(that,locales,options);
  }
  public substring(start: number,end?: number|undefined): string {
    todo();
  }
  public at(index: number): string|undefined {
    const ch=this.buffer.at(index);
    return ch===undefined?ch:String.fromCharCode(ch);
  }
}

