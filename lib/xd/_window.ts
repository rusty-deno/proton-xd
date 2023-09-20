

export abstract class Window {
  private static encoder=new TextEncoder;
  protected static encode(str: string) {
    return this.encoder.encode(str.endsWith("\0")?str:str+"\0");
  }
  protected static stringify(obj: object) {
    return this.encode(JSON.stringify(obj));
  }

  protected _addrs=new BigUint64Array(1);

  


  





}

