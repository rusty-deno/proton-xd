import rust,{toBuffer} from "./bindings.ts";

export default class XD {
  private lib;
  constructor() {
    this.lib=rust.symbols;
  }
  

  public init=(
    title: string,
    url: string,
    width: number,
    height: number,
    icon: string
  )=> this.lib.init(toBuffer(title),toBuffer(url),width,height,toBuffer(icon));
  

  public close=()=> {
    rust.close();
    Deno.exit(0);
  };
}


