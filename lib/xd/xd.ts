import * as lib from "../../bindings/bindings.ts";
import { defaultWindowAttrs as dwa,defaultWebViewAttrs as dweba } from "./default.ts";
import WebViewAttributes,{ Content, WindowAttributes,confirmDefaultVal,toContent } from "./types.ts";

export default class XD {

  public static init(content: Content,windowAttrs: WindowAttributes={},webviewAttrs: WebViewAttributes={}) {
    lib.init(confirmDefaultVal(windowAttrs,dwa),confirmDefaultVal(webviewAttrs,dweba),toContent(content));
  }


}

export const writeToClipboard=(str: string)=> lib.write_to_clipboard(str);
export const readClipboard=()=> lib.read_clipboard();


