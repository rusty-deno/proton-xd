import { symbols as lib,read_clipboard,write_to_clipboard } from "../../bindings/bindings.ts";
import { defaultWindowAttrs as dwa,defaultWebViewAttrs as dweba } from "./default.ts";
import { WebViewTrait,isURL,WebViewAttributes,Content,WindowAttributes } from './mod.ts';



/**
 * @class XD handles the webview and the window
 */
export class XD extends WebViewTrait {
  protected windowAttrs: WindowAttributes;
  protected webviewAttrs: WebViewAttributes;

  constructor(content: Content,windowAttrs: WindowAttributes={},webviewAttrs: WebViewAttributes={}) {
    super();
    this.windowAttrs={
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
   * Initializes the webview.
   */
  public spawn() {
    lib.init(
      XD.stringify(this.windowAttrs),
      XD.stringify(this.webviewAttrs),
      Deno.UnsafePointer.of(this._addrs)
    );
  }



  public set window(window: WindowAttributes) {
    this.windowAttrs={
      ...this.windowAttrs,
      ...window
    };
  }
  /**
   * A reference to the properties of the webview
   */
  public get window(): WindowAttributes {
    return this.windowAttrs;
  }

  public set webview(webview: WebViewAttributes) {
    this.webview={
      ...this.webviewAttrs,
      ...webview
    };
  }
  /**
   * A reference to the properties of the webview
   */
  public get webview(): WebViewAttributes {
    return this.webviewAttrs;
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
 * possible keys of WindowAttributes
 * @type {WindowAttributes}
 */
export type WindowProperty=keyof WindowAttributes;

/**
 * possible keys of WebViewAttributes
 * @type {WebViewAttributes}
 */
export type WebViewProperty=keyof WebViewAttributes;


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

