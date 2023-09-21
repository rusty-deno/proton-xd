import { symbols as rust } from "../../bindings/bindings.ts";
import * as lib from "../../bindings/bindings.ts";
import { $unimplemented, Option } from "../mod.ts";
import { Position,Size,MonitorData } from "../../bindings/bindings.ts";
import { MinSize,SizeConstraints,WindowAttributes } from './types.ts';




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

  private get _window(): bigint {
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
    return this._window?JSON.parse(lib.inner_position(this._window)):this.windowAttrs.innerSize??Window.defaultPos;
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

  public monitorFromPoint(_pos: Position): MonitorData {
    $unimplemented();
  }

  public position(): Position {
    return this._window?JSON.parse(lib.outer_position(this._window)):this.windowAttrs.position??Window.defaultPos;
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
  

  @Window.Setter("alwaysOnTop")
  public setAlwaysOnTop(alwaysOnTop: boolean) {
    rust.set_always_on_top(this._window,alwaysOnTop);
  }

  @Window.Setter("alwaysOnBottom")
  public setAlwaysOnBottom(alwaysOnBottom: boolean) {
    rust.set_always_on_bottom(this._window,alwaysOnBottom);
  }

  @Window.Setter("closable")
  public setClosable(closable: boolean) {
    rust.set_closable(this._window,closable);
  }

  @Window.Setter("contentProtection")
  public setContentProtection(cotentProtection: boolean) {
    rust.set_content_protection(this._window,cotentProtection);
  }

  public setCursorGrab(grab: boolean) {
    this._window && rust.set_cursor_grab(this._window,grab);
  }

  public setCursorIcon() {
    $unimplemented();
  }
  
  public setCursorPosition(x: number,y: number) {
    this._window && rust.set_cursor_position(this._window,x,y);
  }

  public setCursorVisible(visible: boolean) {
    this._window && rust.set_cursor_visible(this._window,visible);
  }

  @Window.Setter("decorations")
  public setDecorations(decorations: boolean) {
    rust.set_decorations(this._window,decorations);
  }

  public setFocus() {
    this._window?rust.set_focus(this._window):this.windowAttrs.focused=true;
  }

  public setFullscreen() {
    $unimplemented();
  }

  public setIgnoreCursorEvents(ignore: boolean) {
    this._window && rust.set_ignore_cursor_events(this._window,ignore);
  }
  
  public setImePosition({x,y}: Position) {
    this._window && rust.set_ime_position(this._window,x,y);
  }
  
  public setInnerPosition({height,width}: Size) {
    this._window && rust.set_inner_size(this._window,height,width);
  }

  public setInnerSizeConstraints({minWidth,minHeight,maxWidth,maxHeight}: SizeConstraints) {
    if(this._window) return rust.set_inner_size_constraints(this._window,minWidth,minHeight,maxWidth,maxHeight);
    this.windowAttrs={...this.windowAttrs,minWidth,minHeight,maxWidth,maxHeight};
  }

  public setMaxInnerSize({height,width}: Size) {
    this._window && rust.set_max_inner_size(this._window,height,width);
  }

  @Window.Setter("maximizable")
  public setMaximizable(maximizable: boolean) {
    this._window && rust.set_maximizable(this._window,maximizable);
  }

  @Window.Setter("maximized")
  public setMaximized(maximized: boolean) {
    this._window && rust.set_maximized(this._window,maximized);
  }
  
  public setMinInnerSize({ minHeight,minWidth }: MinSize) {
    if(this._window) return rust.set_min_inner_size(this._window,minHeight,minWidth);
  }

  @Window.Setter("minimizable")
  public setMinimizable(minimizable: boolean) {
    rust.set_minimizable(this._window,minimizable);
  }

  @Window.Setter("minimized")
  public setMinimized(minimized: boolean) {
    rust.set_minimized(this._window,minimized);
  }

  public setOuterPosition({ x,y }: Position) {
    this._window && rust.set_outer_position(this._window,x,y);
  }

  public setProgressBar() {
    $unimplemented();
  }

  @Window.Setter("resizable")
  public setResizable(resizable: boolean) {
    this._window && rust.set_resizable(this._window,resizable);
  }

  @Window.Setter("title")
  public setTitle(title: string) {
    rust.set_title(this._window,Window.encode(title));
  }
  
  @Window.Setter("visible")
  public setVisible(visible: boolean) {
    rust.set_visible(this._window,visible);
  }

  
  public setVisibleOnAllWorkspaces(visible: boolean) {
    this._window?rust.set_visible_on_all_workspaces(this._window,visible):this.windowAttrs.visibleOnAllWorkspaces=visible;
  }

  public setWindowIcon() {
    $unimplemented();
  }


  private static Setter<T>(key: string) {
    return function(_this: Window,_key: string,fn: PropertyDescriptor) {
      const original=fn.value;

      fn.value=function(arg: T) {
        // deno-lint-ignore no-explicit-any
        _this._window?original(arg):(_this.windowAttrs as any)[key]=arg;
      }
  
      return fn;
    };
  }
}


