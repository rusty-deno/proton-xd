import lib,{toBuffer} from "./bindings.ts";

export default class XD {
  private lib;
  constructor() {
    this.lib=lib.symbols;
  }
  

  public init=(
    title: string,
    url: string,
    width: number,
    height: number,
    icon: string
  )=> this.lib.init(toBuffer(title),toBuffer(url),width,height,toBuffer(icon));
  

  public close=()=> {
    lib.close();
    Deno.exit(0);
  };
}


