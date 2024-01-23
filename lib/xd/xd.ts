import { init } from "../../bindings/bindings.ts";
import { defaultWindowAttrs as dwa,defaultWebViewAttrs as dweba } from "./default.ts";
import { Options } from './types/window.ts';
import { isURL,Content } from "./types/mod.ts";
import { WebView } from "./webview.ts";


/**
 * @class {@linkcode XD} handles the webview and the window
 */
export class XD extends WebView {
  constructor(content: Content,{webview,window}: Options={}) {
    super();
    this._window.windowAttrs={
      ...dwa,
      ...window
    };
    this.webviewAttrs={
      ...dweba,
      ...webview
    };
    this.webviewAttrs[isURL(content)?"url":"html"]=content.toString();
  }
  
  /**
   * Spawns the webview on a different `thread`.
   */
  public spawn() {
    init(
      JSON.stringify(this._window.windowAttrs),
      JSON.stringify(this.webviewAttrs),
      BigInt(Deno.UnsafePointer.value(Deno.UnsafePointer.of(this._addrs)))
    );
  }


  /**
   * Constructs XD and spawns the webview
   * 
   * @param {Content} content defines the initial content of the webview
   * @param {WindowAttributes} windowAttrs defines the window's properties
   * @param {WebViewAttributes} webviewAttrs defines the webview's propoerties
   */
  public static instantiate(content: Content,options: Options={}) {
    new XD(content,options).spawn();
  }
}


