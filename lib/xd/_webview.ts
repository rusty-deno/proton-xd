import { WebViewAttributes,WindowTrait,Size } from './mod.ts';
import * as lib from '../../bindings/bindings.ts';
import { Color,$rgba } from "../screencapture/color.ts";
import { $unimplemented, Option } from '../mod.ts';


export abstract class WebViewTrait extends WindowTrait {
  protected _addrs=new BigUint64Array(2);
  protected abstract webviewAttrs: WebViewAttributes;
  
  private get _webview() {
    return this._addrs[1];
  }
  private set _webview_(webview: WebViewAttributes) {
    Object.assign(this.webviewAttrs,webview);
  }
  
  public clearAllBrowsingData() {
    this._webview && lib.clear_all_browsing_data(this._webview);
  }

  public eval(js: string) {
    this._webview && lib.eval_script(this._webview,js);
  }

  public webViewInnerSize(): Size {
    return this._webview?JSON.parse(lib.webview_inner_size(this._webview)):WindowTrait.defaultSize;
  }

  public loadUrl(url: string|URL) {
    this._webview?lib.load_url(this._webview,url.toString()):this.webviewAttrs.url=url;
  }
  
  public lordUrlWithHeaders(url: string|URL,headers: Record<string,string>) {
    this._webview && lib.load_url_with_headers(this._webview,url.toString(),JSON.stringify(headers));
  }
  
  public print() {
    this._webview && lib.webview_print(this._webview);
  }

  public setBackgroundColor(color: Color) {
    const rgba=$rgba(color);
    this._webview?lib.set_background_color(this._webview,JSON.stringify(rgba)):this.webviewAttrs.backgroundColor=rgba;
  }

  public url() {
    return new Option(this._webview && lib.url(this._webview));
  }

  public window() {
    $unimplemented();
  }

  public zoom(scaleFactor: number) {
    this._webview && lib.zoom(this._webview,scaleFactor);
  }
}



