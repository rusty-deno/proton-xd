import * as lib from "../../bindings/bindings.ts";
import { defaultWindowAttrs as dwa,defaultWebViewAttrs as dweba } from "./default.ts";
import { WebViewAttributes,Content,WindowAttributes,isURL } from "./types.ts";

/**
 * @class XD handles the webview and the window
 */
export class XD {
  private windowAttrs: WindowAttributes;
  private webviewAttrs: WebViewAttributes;

  /**
   * XD - The base class that handles the webview and the window
   * @param {Content} content defines the initial content of the webview
   * @param {WindowAttributes} windowAttrs defines the window's properties
   * @param {WebViewAttributes} webviewAttrs defines the webview's propoerties
   */
  constructor(content: Content,windowAttrs: WindowAttributes={},webviewAttrs: WebViewAttributes={}) {
    this.windowAttrs={
      ...dwa,
      ...windowAttrs
    };
    this.webviewAttrs={
      ...dweba,
      ...webviewAttrs
    };
    
    if(isURL(content)) //if content is an URL then sets the url
      this.webviewAttrs.url=content.toString();
    else
      this.webviewAttrs.html=content as string; //if content is not an URL then it must be html/text
  }
  
  public set window(window: WindowAttributes) {
    this.windowAttrs={
      ...this.windowAttrs,
      ...window
    };
  }
  /**
   * @description A reference to the properties of the webview
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
   * @description A reference to the properties of the webview
   */
  public get webview(): WebViewAttributes {
    return this.webviewAttrs;
  }
  

  /**
   * Initializes the webview..
   * updating window or webview after spawning the window doesn't affect them
   */
  public spawn() {
    lib.init(
      JSON.stringify(this.windowAttrs),
      JSON.stringify(this.webviewAttrs)
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
 * writes the given string to the clipboard;
 * just like copy
 */
export function writeToClipboard(str: string) {
  return lib.write_to_clipboard(str);
}

/**
 * reads the stored string from the clipboard;
 * just like paste
 * @default "\0" - empty string
 */
export function readClipboard() {
  return lib.read_clipboard();
}

