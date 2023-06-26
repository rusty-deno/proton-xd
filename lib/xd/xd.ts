import * as lib from "../../bindings/bindings.ts";
import { defaultWindowAttrs as dwa,defaultWebViewAttrs as dweba,confirmDefaultVal,to_snake_case } from "./default.ts";
import WebViewAttributes,{ Content,WindowAttributes,toContent } from "./types.ts";


export default class XD {
  private content: Content;
  private windowAttrs: lib.WindowAttrs;
  private webviewAttrs: lib.WebViewAttrs;

  /**
   * @param {Content} content defines the initial content of the webview
   * @param {WindowAttributes} windowAttrs defined the window's properties
   * @param {WebViewAttributes} webviewAttrs defines the webview's propoerties
   */
  constructor(content: Content,windowAttrs: WindowAttributes={},webviewAttrs: WebViewAttributes={}) {
    this.content=content;
    this.windowAttrs=confirmDefaultVal(windowAttrs,dwa);
    this.webviewAttrs=confirmDefaultVal(webviewAttrs,dweba);
  }
  /**
   * @param {WindowAttributes} window
   * updates the properties of window..
   * doesn't affect its other properties
   */
  public set window(window: WindowAttributes) {
    this.windowAttrs=confirmDefaultVal(window,this.windowAttrs);
  }

  /**
   * @param {WebViewAttributes} webview
   * updates the properties of webview..
   * doesn't affect its other properties
   */
  public set webview(webview: WebViewAttributes) {
    this.webviewAttrs=confirmDefaultVal(webview,this.webviewAttrs);
  }

  /**
   * @returns {lib.WindowAttrs}
   * returns a reference to its window
   */
  public get window(): lib.WindowAttrs {
    return this.windowAttrs;
  }

  /**
   * @returns {lib.WebViewAttrs}
   * returns a reference to its webview
   */
  public get webview(): lib.WebViewAttrs {
    return this.webviewAttrs;
  }
  

  /**
   * Initializes the webview..
   * updating window or webview after initialization doesn't affect them
   */
  public init() {
    lib.init(JSON.stringify(this.windowAttrs),JSON.stringify(this.webviewAttrs),toContent(this.content));
  }


}

export type WindowProperty=keyof WindowAttributes;

export const writeToClipboard=(str: string)=> lib.write_to_clipboard(str);
export const readClipboard=()=> lib.read_clipboard();


