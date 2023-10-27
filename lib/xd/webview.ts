import * as lib from '../../bindings/bindings.ts';
import { Color,$rgba } from "./color.ts";
import { Option } from '../mod.ts';

import { WebViewAttributes } from './mod.ts';
import { WindowXD,WindowTrait } from './window/mod.ts';
import { Size } from "./types/dpi.ts";



export class WebView {
  protected webviewAttrs: WebViewAttributes={};

  protected _window=new class extends WindowTrait {
    public windowAttrs={};
    public _addrs=new BigUint64Array(2);

    protected get _window(): bigint {
      return this._addrs[0];
    }
  };
  
  private get _webview() {
    return this._window._addrs[1];
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
    this._webview?lib.set_background_color(this._webview,rgba.r,rgba.g,rgba.b,rgba.a):this.webviewAttrs.backgroundColor=rgba;
  }

  public url() {
    return new Option((this._webview && lib.url(this._webview))||null);
  }

  public get window() {
    const {_addrs,windowAttrs}=this._window;
    return new WindowXD(_addrs[0],windowAttrs);
  }

  public zoom(scaleFactor: number) {
    this._webview && lib.zoom(this._webview,scaleFactor);
  }
}



