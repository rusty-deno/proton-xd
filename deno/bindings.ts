function ext() {
  switch(Deno.build.os) {
    case "windows":
      return "dll";
    case "darwin":
      return "dylib";
    case "linux":
    default:
      return "so";
  }
}


export default class XD {
  private lib;
  private static encoder=new TextEncoder;
  constructor() {
    this.lib=Deno.dlopen(new URL(`../target/release/xd.${ext()}`,import.meta.url),{
      init: {
        parameters: ["buffer","buffer","u16","u16","buffer"],
        result: "void"
      }
    });
  }
  
  private static toBuffer=(str: string)=> XD.encoder.encode(str+"\0");
  
  public init=(
    title: string,
    url: string,
    width: number,
    height: number,
    icon: string
  )=> this.lib.symbols.init(XD.toBuffer(title),XD.toBuffer(url),width,height,XD.toBuffer(icon));


}


