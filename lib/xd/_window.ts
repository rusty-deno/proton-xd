import { symbols as rust } from "../../bindings/bindings.ts";
import * as lib from "../../bindings/bindings.ts";
import { $unimplemented, Option } from "../mod.ts";
import { WindowAttributes } from "./types.ts";

export abstract class Window {
  private static encoder=new TextEncoder;
  protected static encode(str: string) {
    return this.encoder.encode(str.endsWith("\0")?str:str+"\0");
  }
  protected static stringify(obj: object) {
    return this.encode(JSON.stringify(obj));
  }
  private static readonly defaultPos={ x: 0,y: 0 };
  private static readonly defaultSize={ height: 0,width: 0 };


  protected abstract windowAttrs: WindowAttributes;
  // protected abstract webviewAttrs: WebViewAttributes;
  protected _addrs=new BigUint64Array(1);

  private get _window(): bigint|undefined {
    return this._addrs[0];
  }


  public availableMonitors(): lib.MonitorData[] {
    return this._window?JSON.parse(lib.available_monitors(this._window)):[];
  }

  public currentMonitor(): Option<lib.MonitorData> {
    $unimplemented();
    // return new Option(this._window && JSON.parse(lib.current_monitor(this._window)));
  }

  public cursorPos(): lib.Position {
    return this._window?JSON.parse(lib.cursor_position(this._window)):Window.defaultPos;
  }

  public async dragWindow() {
    this._window && await rust.drag_window(this._window);
  }

  public fullscreen() {
    $unimplemented()
  }

  public innerPosition(): lib.Position {
    return this._window?JSON.parse(lib.inner_position(this._window)):Window.defaultPos;
  }

  public isClosable() {
    return this._window?rust.is_closable(this._window):this.windowAttrs.closable!;
  }

  public isDecorated() {
    return this._window?rust.is_decorated(this._window):this.windowAttrs.decorations!;
  }

  public isFocused() {
    return this._window?rust.is_focused(this._window):this.windowAttrs.focused!;
  }

  public isMaximizable() {
    return this._window?rust.is_maximizable(this._window):this.windowAttrs.maximizable!;
  }

  public isMaximized() {
    return this._window?rust.is_maximized(this._window):this.windowAttrs.maximized!;
  }

  public isMinimizable() {
    return this._window?rust.is_minimizable(this._window):this.windowAttrs.minimizable!;
  }

  public isMinimized() {
    return this._window?rust.is_minimized(this._window):this.windowAttrs.maximized!;
  }

  public isResizable() {
    return this._window?rust.is_resizable(this._window):this.windowAttrs.resizable!;
  }

  public isVisible() {
    return this._window?rust.is_visible(this._window):this.windowAttrs.visible!;
  }

  public monitorFromPoint(_x: number,_y: number): lib.MonitorData {
    $unimplemented();
  }

  public outerPosition(): lib.Position {
    return this._window?JSON.parse(lib.outer_position(this._window)):Window.defaultPos;
  }

  public outerSize(): lib.Size {
    return this._window?JSON.parse(lib.outer_size(this._window)):Window.defaultSize;
  }

  public requestRedraw() {
    this._window && lib.request_redraw(this._window);
  }

  public requestUserAttention(requestType: lib.AttentionType="Informational") {
    this._window && lib.request_user_attention(this._window,requestType);
  }

  public scaleFactor() {
    return this._window?lib.scale_factor(this._window):0;
  }

  public theme() {
    return this._window?rust.theme(this._window)?"Dark":"Light":this.windowAttrs.theme!;
  }

  public title() {
    return this._window?lib.title(this._window):"untitled";
  }




}


