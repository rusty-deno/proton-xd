


export class CString implements Iterable<number> {
  private static encoder=new TextEncoder;
  private static decoder=new TextDecoder;
  
  private buff: Uint8Array;

  constructor(str: string|Uint8Array|null="") {
    this.buff=str?CString.encode(str):new Uint8Array;
  }

  public static fromPtr(ptr: Deno.PointerValue) {
    return new CString(ptr && this.readPointer(ptr));
  }
  
  public static extractFromPtr(ptr: Deno.PointerValue) {
    return ptr?Deno.UnsafePointerView.getCString(ptr):"";
  }


  public get length(): number {
    return this.buff.byteLength-1;
  }
  public get byteOffset() {
    return this.buff.byteOffset;
  }
  public get bytes() {
    return this.buff;
  }


  public toString(options?: TextDecodeOptions) {
    return CString.decode(this.buff,options);
  }

  public get [Symbol.toStringTag]() {
    return this.toString();
  }

  *[Symbol.iterator]() {
    for(const byte of this.buff) yield byte;
  }



  public static encode(str: string|Uint8Array) {
    return str instanceof Uint8Array?this.ensureCBuff(str):this.encoder.encode(this.ensureCStr(str));
  }
  public static decode(buff: BufferSource,options?: TextDecodeOptions) {
    const cStr=this.decoder.decode(buff,options);
    return cStr.substring(0,cStr.length-1);
  }

  private static ensureCStr(str: string) {
    return str.endsWith("\0")?str:str+"\0";
  }
  private static ensureCBuff(buff: Uint8Array) {
    return buff.at(-1)===0?buff:Uint8Array.from([...buff,0]);
  }
  
  public static readPointer(v: Deno.PointerObject): Uint8Array {
    const ptr=new Deno.UnsafePointerView(v);
    const lengthBe=new Uint8Array(4);

    const view=new DataView(lengthBe.buffer);
    ptr.copyInto(lengthBe,0);

    const buf=new Uint8Array(view.getUint32(0));
    ptr.copyInto(buf,4);
    
    return buf;
  }
  
}


