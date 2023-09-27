import { symbols as rust } from "../../../bindings/bindings.ts";
import * as lib from "../../../bindings/bindings.ts";
import { $unimplemented,Option } from "../../mod.ts";
import { MinSize,SizeConstraints,WindowAttributes,MaxSize,MonitorInfo,Position,Size } from '../types/mod.ts';
import { encode } from "../encode.ts";
import { CursorIcon } from "../mod.ts";
import { RGBAImage,ImageBuffer } from '../../screencapture/image.ts';



export abstract class WindowTrait {
  public static readonly defaultPos={ x: 0,y: 0 };
  public static readonly defaultSize={ height: 0,width: 0 };
  
  protected abstract windowAttrs: WindowAttributes;
  protected abstract get _window(): bigint;

  private set _window_(window: WindowAttributes) {
    Object.assign(this.windowAttrs,window);
  }
  
  public availableMonitors(): MonitorInfo[] {
    return this._window?JSON.parse(lib.available_monitors(this._window)):[];
  }

  public currentMonitor(): Option<MonitorInfo> {
    $unimplemented();
    // return new Option(this._window && JSON.parse(lib.current_monitor(this._window)));
  }

  public cursorPos(): Position {
    return this._window?JSON.parse(lib.cursor_position(this._window)):WindowTrait.defaultPos;
  }

  public async dragWindow() {
    this._window && await rust.drag_window(this._window);
  }

  public fullscreen() {
    $unimplemented()
  }

  public innerPosition(): Position {
    return this._window?JSON.parse(lib.inner_position(this._window)):this.windowAttrs.innerSize??WindowTrait.defaultPos;
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

  public monitorFromPoint(_pos: Position): MonitorInfo {
    $unimplemented();
  }

  public position(): Position {
    return this._window?JSON.parse(lib.outer_position(this._window)):this.windowAttrs.position??WindowTrait.defaultPos;
  }

  public outerSize(): lib.Size {
    return this._window?JSON.parse(lib.outer_size(this._window)):WindowTrait.defaultSize;
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
  
  public setAlwaysOnTop(alwaysOnTop: boolean) {
    this._window?rust.set_always_on_top(this._window,alwaysOnTop):this.windowAttrs.alwaysOnTop=alwaysOnTop;
  }
  
  public setAlwaysOnBottom(alwaysOnBottom: boolean) {
    this._window?rust.set_always_on_bottom(this._window,alwaysOnBottom):this.windowAttrs.alwaysOnBottom=alwaysOnBottom;
  }
  
  public setClosable(closable: boolean) {
    this._window?rust.set_closable(this._window,closable):this.windowAttrs.closable=closable;
  }
  
  public setContentProtection(cotentProtection: boolean) {
    this._window?rust.set_content_protection(this._window,cotentProtection):this.windowAttrs.contentProtection=cotentProtection;
  }

  public setCursorGrab(grab: boolean) {
    this._window && rust.set_cursor_grab(this._window,grab);
  }

  public setCursorIcon(icon: CursorIcon) {
    this._window && lib.set_cursor_icon(this._window,icon);
  }
  
  public setCursorPosition(x: number,y: number) {
    this._window && rust.set_cursor_position(this._window,x,y);
  }

  public setCursorVisible(visible: boolean) {
    this._window && rust.set_cursor_visible(this._window,visible);
  }

  public setDecorations(decorations: boolean) {
    this._window?rust.set_decorations(this._window,decorations):this.windowAttrs.decorations=decorations;
  }

  public setFocus() {
    this._window?lib.set_focus(this._window):this.windowAttrs.focused=true;
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
  
  public setInnerSize(size: Size) {
    this._window?rust.set_inner_size(this._window,size.height,size.width):this._window_.innerSize=size;
  }

  public setInnerSizeConstraints(size: SizeConstraints) {
    if(this._window)
      return rust.set_inner_size_constraints(this._window,size.minWidth,size.minHeight,size.maxWidth,size.maxHeight);
    
    this._window_=size;
  }

  public setMaxInnerSize(size: MaxSize) {
    if(this._window)
      return this._window && rust.set_max_inner_size(this._window,size.maxHeight,size.maxWidth);

    this._window_=size;
  }
  
  public setMaximizable(maximizable: boolean) {
    this._window?rust.set_maximizable(this._window,maximizable):this.windowAttrs.maximizable=maximizable;
  }

  public setMaximized(maximized: boolean) {
    this._window?rust.set_maximized(this._window,maximized):this.windowAttrs.maximized=maximized;
  }
  
  public setMinInnerSize(size: MinSize) {
    if(this._window)
      return rust.set_min_inner_size(this._window,size.minHeight,size.minWidth);
    
    this._window_=size;
  }
  
  public setMinimizable(minimizable: boolean) {
    this._window?rust.set_minimizable(this._window,minimizable):this.windowAttrs.minimizable=minimizable;
  }
  
  public setMinimized(minimized: boolean) {
    this._window && rust.set_minimized(this._window,minimized);
  }

  public setOuterPosition({ x,y }: Position) {
    this._window && rust.set_outer_position(this._window,x,y);
  }

  public setProgressBar() {
    $unimplemented();
  }

  public setResizable(resizable: boolean) {
    this._window?rust.set_resizable(this._window,resizable):this.windowAttrs.resizable=resizable;
  }
  
  public setTitle(title: string) {
    this._window?rust.set_title(this._window,encode(title)):this.windowAttrs.title=title;
  }
  
  public setVisible(visible: boolean) {
    this._window?rust.set_visible(this._window,visible):this.windowAttrs.visible=visible;
  }

  
  public setVisibleOnAllWorkspaces(visible: boolean) {
    this._window?rust.set_visible_on_all_workspaces(this._window,visible):this.windowAttrs.visibleOnAllWorkspaces=visible;
  }

  public setWindowIcon(icon: string|URL|RGBAImage|ImageBuffer) {
    this._window?lib.set_window_icon(this._window,JSON.stringify(icon)):this.windowAttrs.windowIcon=icon;
  }

}


