import { symbols as lib,read_clipboard,write_to_clipboard,screenshot,screenshot_sync } from "../../bindings/bindings.ts";
import { defaultWindowAttrs as dwa,defaultWebViewAttrs as dweba } from "./default.ts";
import { WebViewAttributes,WindowAttributes } from './mod.ts';
import { isURL,Content } from "./types/mod.ts";
import { stringify } from "./encode.ts";
import { WebView } from "./webview.ts";
import { serWindowAttrs } from "../serde/window_attr.ts";
import { ImageBuffer } from "./image.ts";


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
  public spawn() {
    lib.init(
      stringify(serWindowAttrs(this._window.windowAttrs)),
      stringify(this.webviewAttrs),
      Deno.UnsafePointer.of(this._window._addrs)
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


  /**
   * # Screenshot
   * Captures a screenshot of the screen relative to provided x and y axis asyncronyously.
   * delay is 0s by default
   */
  public static async screenshot(x: number,y: number,delay=0): Promise<ImageBuffer> {
    return new ImageBuffer(JSON.parse(await screenshot(x,y,delay/1000)));
  }


  /**
   * # ScreenshotSync
   * Captures a screenshot of the screen relative to provided x and y axis syncronyously.
   * delay is 0s by default
   */
  public static screenshotSync(x: number,y: number,delay=0): ImageBuffer {
    return new ImageBuffer(JSON.parse(screenshot_sync(x,y,delay/1000)));
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

