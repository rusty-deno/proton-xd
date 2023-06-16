import * as lib from "../bindings/bindings.ts";
import { WebViewAttrs,Content,Header,Size,Theme as theme,WindowAttrs } from "../bindings/bindings.ts";



export default class XD {
  // public static init=(
  //   title: string,
  //   url: string|URL,
  //   width: number,
  //   height: number,
  //   icon: string|URL,
  //   theme: Theme
  // )=> lib.init(
  //   title,
  //   url.toString(),
  //   width,
  //   height,
  //   icon.toString(),
  //   theme
  // );
  public static init(windowAttrs: WindowAttributes) {
    // ,webViewAttrs: WebViewAttrs,scripts: string[],content: Content



  }

  public static write_to_clipboard=(str: string)=> lib.write_to_clipboard(str);

  public static read_clipboard=()=> lib.read_clipboard();
}

export abstract class WindowAttributes {
  innerSize?: Size={height: 480,width: 1080};
  minInnerSize?: Size={height: 480,width: 1080};//todo
  maxInnerSize?: Size={height: 480,width: 1080};//todo
  resizable?: boolean=true;
  minimizable?: boolean=true;
  maximizable?: boolean=true;
  closable?: boolean=true;
  title?: string="untitled";
  maximized?: boolean=false;
  visible?: boolean=true;
  transparent?: boolean=false;
  decorations?: boolean=true;
  alwaysOnTop?: boolean=false;
  alwaysOnBottom?: boolean=false;
  // window_icon?: string
  preferredTheme?: Theme=Theme.DARK;
  focused?: boolean=true;
  contentProtection?: boolean=false;
  visibleOnAllWorkspaces?: boolean=false;
}

export enum Theme {
  LIGHT="Light",
  DARK="Dark"
}