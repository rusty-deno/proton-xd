import * as lib from '../../bindings/bindings.ts';
import { Color,$rgba } from "./types/image.ts";
import { Option } from '../mod.ts';

import { WebViewAttributes } from "./types/window.ts";
import { WindowXD,WindowTrait } from './window/mod.ts';
import { Size } from "./types/dpi.ts";
import { $resultSync,Result,Ok } from "../std/error/result/mod.ts";



export class WebView {
  protected webviewAttrs: WebViewAttributes={};

  protected _window=new class extends WindowTrait {
    public windowAttrs={};
    public _addrs=new BigUint64Array(1);

    protected get _window(): bigint {
      return this._addrs[0];
    }
  };

  private get _ptr() {
    return this._window._addrs[0];
  }

  // deno-lint-ignore no-explicit-any
  #call<T=void,E=Error>(f: (ptr: bigint,...args: any[])=> T,...args: any[]): Result<T,E> {
    return $resultSync(()=> {
      if(!this._ptr) throw new Error("null pointer exception");
      return f(this._ptr,...args);
    });
  }

  public clearAllBrowsingData() {
    return this.#call(lib.clear_all_browsing_data);
  }

  public eval(js: string) {
    return this.#call(lib.eval_script,js);
  }

  public webViewInnerSize(): Size {
    if(!this._ptr) return WindowTrait.defaultSize;
    const ptr=lib.symbols.webview_inner_size(this._ptr)!;
    const arr=new Uint32Array(Deno.UnsafePointerView.getArrayBuffer(ptr,8));
    const size={
      height: arr[0],
      width: arr[1]
    };

    lib.free(BigInt(Deno.UnsafePointer.value(ptr)));
    return size;
  }

  public loadUrl(url: string|URL) {
    this._ptr?lib.load_url(this._ptr,url.toString()):this.webviewAttrs.url=url;
  }
  
  public lordUrlWithHeaders(url: string|URL,headers: Record<string,string>) {
    return this.#call(lib.load_url_with_headers,url.toString(),JSON.stringify(headers));
  }
  
  public printScreen() {
    return this.#call(lib.webview_print);
  }

  public setBackgroundColor(color: Color): Result<void,Error> {
    const rgba=$rgba(color);
    if(!this._ptr) {
      this.webviewAttrs.backgroundColor=rgba;
      return Ok(undefined);
    }

    return this.#call(lib.set_background_color,rgba.r,rgba.g,rgba.b,rgba.a);
  }

  public url() {
    return this.#call(lib.url).ok().or(new Option(this.webviewAttrs.url?.toString()));
  }

  public get window() {
    const {_addrs,windowAttrs}=this._window;
    return new WindowXD(_addrs[0],windowAttrs);
  }

  public zoom(scaleFactor: number) {
    this._ptr && lib.zoom(this._ptr,scaleFactor);
  }
}



