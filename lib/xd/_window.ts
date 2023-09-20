import { symbols as lib } from "../../bindings/bindings.ts";
import { WindowAttributes } from "./types.ts";

export abstract class Window {
  private static encoder=new TextEncoder;
  protected static encode(str: string) {
    return this.encoder.encode(str.endsWith("\0")?str:str+"\0");
  }
  protected static stringify(obj: object) {
    return this.encode(JSON.stringify(obj));
  }

  protected abstract windowAttrs: WindowAttributes;
  // protected abstract webviewAttrs: WebViewAttributes;
  protected _addrs=new BigUint64Array(1);

  private get _window(): bigint|undefined {
    return this._addrs[0];
  }


  public async dragWindow() {
    this._window && await lib.drag_window(this._window);
  }

  public isClosable() {
    return this._window?lib.is_closable(this._window):this.windowAttrs.closable!;
  }

  public isDecorated() {
    return this._window?lib.is_decorated(this._window):this.windowAttrs.decorations!;
  }

  public isFocused() {
    return this._window?lib.is_focused(this._window):this.windowAttrs.focused!;
  }

  public isMaximizable() {
    return this._window?lib.is_maximizable(this._window):this.windowAttrs.maximizable!;
  }

  public isMaximized() {
    return this._window?lib.is_maximized(this._window):this.windowAttrs.maximized!;
  }

  public isMinimizable() {
    return this._window?lib.is_minimizable(this._window):this.windowAttrs.minimizable!;
  }

  public isMinimized() {
    return this._window?lib.is_minimized(this._window):this.windowAttrs.maximized!;
  }

  public isResizable() {
    return this._window?lib.is_resizable(this._window):this.windowAttrs.resizable!;
  }

  public isVisible() {
    return this._window?lib.is_visible(this._window):this.windowAttrs.visible!;
  }

  public theme() {
    return this._window?lib.theme(this._window)?"Dark":"Light":this.windowAttrs.theme!;
  }










}


