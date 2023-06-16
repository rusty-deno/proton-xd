import * as lib from "../bindings/bindings.ts";
import { WebViewAttrs,Content,Header,Size,Theme as theme,WindowAttrs } from "../bindings/bindings.ts";
import { defaultWindowAttrs as dwa } from "./default.ts";


export enum Theme {
  LIGHT="Light",
  DARK="Dark"
}



export default class XD {

  public static init(windowAttrs: WindowAttributes={}) {
    // ,webViewAttrs: WebViewAttrs,scripts: string[],content: Content
    


  }

  public static write_to_clipboard=(str: string)=> lib.write_to_clipboard(str);

  public static read_clipboard=()=> lib.read_clipboard();
}

function defaultWindowAttributes(attrs: WindowAttributes): WindowAttrs {
  return {
    inner_size: attrs.innerSize??dwa.innerSize,
    max_inner_size: attrs.maxInnerSize??dwa.maxInnerSize,
    min_inner_size: attrs.minInnerSize??dwa.minInnerSize,
    resizable: attrs.resizable??true,
    minimizable: attrs.minimizable??true,
    maximizable: attrs.maximizable??true,
    closable: attrs.closable??true,
    title: attrs.title??dwa.title,
    maximized: attrs.maximized??false,
    visible: attrs.visible??true,
    transparent: attrs.transparent??false,
    decorations: attrs.decorations??true,
    always_on_top: attrs.alwaysOnTop??false,
    always_on_bottom: attrs.alwaysOnBottom??false,
    window_icon: attrs.windowIcon??dwa.windowIcon,
    preferred_theme: attrs.preferredTheme??dwa.preferredTheme,
    focused: attrs.focused??true,
    content_protection: attrs.contentProtection??false,
    visible_on_all_workspaces: attrs.visibleOnAllWorkspaces??false
  };
}

function defaultWebViewAttributes() {

}

function to_snake_case(str: string) {
  return str.replace(/[A-Z]/g,(s)=> {
    return `_${s.toLowerCase()}`;
  });
}

export interface WindowAttributes {
  innerSize?: Size;
  minInnerSize?: Size;//todo
  maxInnerSize?: Size;//todo
  resizable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
  title?: string;
  maximized?: boolean;
  visible?: boolean;
  transparent?: boolean;
  decorations?: boolean;
  alwaysOnTop?: boolean;
  alwaysOnBottom?: boolean;
  preferredTheme?: Theme;
  focused?: boolean;
  contentProtection?: boolean;
  visibleOnAllWorkspaces?: boolean;
  windowIcon?: string;
}

