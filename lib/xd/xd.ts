import { read_clipboard,write_to_clipboard,init } from "../../bindings/bindings.ts";
import { defaultWindowAttrs as dwa,defaultWebViewAttrs as dweba } from "./default.ts";
import { WebViewAttributes,WindowAttributes } from './types/window.ts';
import { isURL,Content } from "./types/mod.ts";
import { WebView } from "./webview.ts";


/**
 * @class XD handles the webview and the window
 */
export class XD extends WebView {
  constructor(content: Content,webviewAttrs: WebViewAttributes={},windowAttrs: WindowAttributes={}) {
    super();
    this._window.windowAttrs={
      ...dwa,
      ...windowAttrs
    };
    this.webviewAttrs={
      ...dweba,
      ...webviewAttrs
    };
    this.webviewAttrs[isURL(content)?"url":"html"]=content.toString();
  }
  
  /**
   * Spawns the webview.
   */
  public async spawn() {
    await init(
      JSON.stringify(this._window.windowAttrs),
      JSON.stringify(this.webviewAttrs),
      Deno.UnsafePointer.value(Deno.UnsafePointer.of(this._window._addrs)) as bigint
    );
  }


  /**
   * Constructs XD and spawns the webview
   * 
   * @param {Content} content defines the initial content of the webview
   * @param {WindowAttributes} windowAttrs defines the window's properties
   * @param {WebViewAttributes} webviewAttrs defines the webview's propoerties
   */
  public static instantiate(content: Content,windowAttrs: WindowAttributes={},webviewAttrs: WebViewAttributes={}) {
    new XD(content,windowAttrs,webviewAttrs).spawn();
  }
}


/**
 * Writes the given string to the clipboard.
 * 
 * just like copy
 */
export function writeToClipboard(str: string) {
  write_to_clipboard(str);
}

/**
 * Reads the stored string from the clipboard.
 * 
 * just like paste
 */
export function readClipboard() {
  return read_clipboard();
}

