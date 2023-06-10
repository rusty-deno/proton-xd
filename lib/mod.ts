import rust,{toBuffer} from "./bindings.ts";

namespace ProtonXD {

  export class XD {
    private static lib=rust.symbols;

    public static init=(
      title: string,
      url: string|URL,
      width: number,
      height: number,
      icon: string|URL,
      theme: Theme
    )=> this.lib.init(
      toBuffer(title),
      toBuffer(url.toString()),
      width,
      height,
      toBuffer(icon.toString()),
      theme
    );

    public static write_to_clipboard=(str: string)=> this.lib.write_to_clipboard(toBuffer(str));

    public static read_clipboard=()=> this.lib.read_clipboard();

    
  }
  



  export enum Theme {
    LIGHT,
    DARK
  }
}


export default ProtonXD;