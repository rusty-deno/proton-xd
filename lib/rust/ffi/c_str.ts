import { c_str,encoder,readPtr,decoder,Str } from './mod.ts';



export class CString extends Str {
  protected readonly buffer: Uint8Array;

  constructor(str: c_str) {
    super();
    if(typeof str!=="string") return this.buffer=readPtr(str).or(new Uint8Array);

    const buf=encoder.encode(str[str.length-1]=="\0"?str:str+"\0");
    this.buffer=buf;
  }

  public get length() {
    return this.buffer.length;
  }
  
  public override toString() {
    return decoder.decode(this.buffer);
  }
}




