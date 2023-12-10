
const encoder=new TextEncoder;
const decoder=new TextDecoder();

function decode(buffer: Uint8Array): string {
  return decoder.decode(buffer);
}

function encode(v: string|Uint8Array): Uint8Array {
  return typeof v !== "string" ? v : encoder.encode(v);
}

function getExt() {
  switch(Deno.build.os){
    case "windows":
      return "dll";
    case "darwin":
      return "dylib";
    default:
      return "so";
  }
}

// deno-lint-ignore no-explicit-any
function readPointer(v: any): Uint8Array {
  const ptr=new Deno.UnsafePointerView(v);
  const lengthBe=new Uint8Array(4);
  const view=new DataView(lengthBe.buffer);
  ptr.copyInto(lengthBe, 0);
  const buf=new Uint8Array(view.getUint32(0));
  ptr.copyInto(buf, 4);
  return buf;
}


export const lib=Deno.dlopen(new URL(`./bin/${Deno.build.target}.${getExt()}`,import.meta.url), {
  alert: { parameters: [ "buffer", "usize", "buffer", "usize", "u8" ], result: "void", nonblocking: true }, alert_sync: { parameters: [ "buffer", "usize", "buffer", "usize", "u8" ], result: "void", nonblocking: false }, available_monitors: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, clear_all_browsing_data: { parameters: [ "usize" ], result: "void", nonblocking: false }, current: { parameters: [  ], result: "void", nonblocking: false }, current_monitor: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, cursor_position: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, eval_script: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, fullscreen: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, inner_position: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, join: { parameters: [ "usize" ], result: "void", nonblocking: false }, join_async: { parameters: [ "usize" ], result: "void", nonblocking: true }, load_url: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, load_url_with_headers: { parameters: [ "usize", "buffer", "usize", "buffer", "usize" ], result: "void", nonblocking: false }, monitor_from_point: { parameters: [ "usize", "f64", "f64" ], result: "buffer", nonblocking: false }, open: { parameters: [ "buffer", "usize" ], result: "buffer", nonblocking: true }, open_sync: { parameters: [ "buffer", "usize" ], result: "buffer", nonblocking: false }, outer_position: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, outer_size: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, park: { parameters: [  ], result: "void", nonblocking: false }, park_timeout: { parameters: [ "f64" ], result: "void", nonblocking: false }, primary_monitor: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, read_clipboard: { parameters: [  ], result: "buffer", nonblocking: false }, request_redraw: { parameters: [ "usize" ], result: "void", nonblocking: false }, request_user_attention: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, save: { parameters: [ "buffer", "usize" ], result: "buffer", nonblocking: true }, save_sync: { parameters: [ "buffer", "usize" ], result: "buffer", nonblocking: false }, scale_factor: { parameters: [ "usize" ], result: "f64", nonblocking: false }, screenshot: { parameters: [ "i32", "i32", "f32", "usize" ], result: "buffer", nonblocking: true }, screenshot_sync: { parameters: [ "i32", "i32", "f32", "usize" ], result: "buffer", nonblocking: false }, set_background_color: { parameters: [ "usize", "u8", "u8", "u8", "u8" ], result: "void", nonblocking: false }, set_cursor_icon: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, set_focus: { parameters: [ "usize" ], result: "void", nonblocking: false }, set_fullscreen: { parameters: [ "usize", "buffer", "usize" ], result: "buffer", nonblocking: false }, set_progress_bar: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, set_window_icon: { parameters: [ "usize", "u32", "u32", "usize", "usize" ], result: "void", nonblocking: false }, sleep: { parameters: [ "f32" ], result: "void", nonblocking: false }, spawn: { parameters: [ "usize" ], result: "usize", nonblocking: false }, title: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, url: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, webview_inner_size: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, webview_print: { parameters: [ "usize" ], result: "void", nonblocking: false }, window: { parameters: [ "usize" ], result: "usize", nonblocking: false }, write_to_clipboard: { parameters: [ "buffer", "usize" ], result: "void", nonblocking: false }, zoom: { parameters: [ "usize", "f64" ], result: "void", nonblocking: false },
  "confirm": {
    "parameters": ["buffer","buffer","u8"],
    "result": "bool",
    "nonblocking": true
  },
  "confirm_sync": {
    "parameters": ["buffer","buffer","u8"],
    "result": "bool"
  },
  "init": {
    "parameters": ["buffer","buffer","pointer"],
    "result": "void"
  },
  "drag_window": {
    "parameters": ["usize"],
    "result": "void",
    "nonblocking": true
  },
  "is_closable": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "is_decorated": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "is_focused": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "is_maximizable": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "is_maximized": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "is_minimizable": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "is_minimized": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "is_resizable": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "is_visible": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "theme": {
    "parameters": ["usize"],
    "result": "bool"
  },
  "set_always_on_top": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_always_on_bottom": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_closable": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_content_protection": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_cursor_grab": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_cursor_position": {
    "parameters": ["usize","i32","i32"],
    "result": "void"
  },
  "set_cursor_visible": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_decorations": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_ignore_cursor_events": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_ime_position": {
    "parameters": ["usize","i32","i32"],
    "result": "void"
  },
  "set_inner_size": {
    "parameters": ["usize","u32","u32"],
    "result": "void"
  },
  "set_inner_size_constraints": {
    "parameters": ["usize","i32","i32","i32","i32"],
    "result": "void"
  },
  "set_max_inner_size": {
    "parameters": ["usize","u32","u32"],
    "result": "void"
  },
  "set_maximizable": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_maximized": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_min_inner_size": {
    "parameters": ["usize","u32","u32"],
    "result": "void"
  },
  "set_minimizable": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_minimized": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_outer_position": {
    "parameters": ["usize","i32","i32"],
    "result": "void"
  },
  "set_resizable": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_title": {
    "parameters": ["usize","buffer"],
    "result": "void"
  },
  "set_visible": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "set_visible_on_all_workspaces": {
    "parameters": ["usize","bool"],
    "result": "void"
  },
  "is_panicking": {
    "parameters": [],
    "result": "bool"
  },
  "set_throw": {
    "parameters": ["function"],
    "result": "void"
  }
});

export const { symbols }=xd(lib.symbols);

function xd<T>(symbols: T) {
  return {
    [Symbol.dispose]: ()=> lib.close(),
    symbols
  };
}


const fn=Deno.UnsafeCallback.threadSafe({
  parameters: ["buffer","usize"],
  result: "void"
},(buff: Deno.PointerValue<unknown>,len: number|bigint)=> {
  throw buff?decoder.decode(new Uint8Array(Deno.UnsafePointerView.getArrayBuffer(buff,len as number))):"";
});
fn.unref();
symbols.set_throw(fn.pointer);


export type AttentionType =   "Critical"  |
  "Informational";
export type FileDialogOptions = {
    location: string;
  filename: string;
  typ: FileOpenerType;
};
export type FileOpenerType =   "SingleFile"  |
  "SingleDir"  |
  "MultipleFile";
export type FullScreen =  { exclusive: {
   exclusive: VidMode;
} }  |
 { borderless: {
   borderless: MonitorData | undefined | null;
} }  |
  "none";
export type Img = {
    bytes: Array<number>;
  height: number;
  width: number;
};
export type MonitorData = {
    name: string | undefined | null;
  position: Position;
  scaleFactor: number;
  size: Size;
  modes: Array<VidMode>;
};
export type Position = {
    x: number;
  y: number;
};
export type Rgba = {
    r: number;
  g: number;
  b: number;
  a: number;
};
export type Size = {
    height: number;
  width: number;
};
export type Theme =   "Light"  |
  "Dark";
export type VidMode = {
    size: Size;
  bitDepth: number;
  refreshRate: number;
};
export type WebViewAttrs = {
    userAgent: string | undefined | null;
  visible: boolean;
  transparent: boolean;
  backgroundColor: Rgba | undefined | null;
  zoomHotkeysEnabled: boolean;
  initializationScripts: Array<string>;
  clipboard: boolean;
  devtools: boolean;
  acceptFirstMouse: boolean;
  backForwardNavigationGestures: boolean;
  incognito: boolean;
  autoplay: boolean;
  html: string | undefined | null;
  url: string | undefined | null;
  headers: Headers | undefined | null;
};
export type WindowAttrs = {
    innerSize: Size | undefined | null;
  minHeight: number | undefined | null;
  maxHeight: number | undefined | null;
  minWidth: number | undefined | null;
  maxWidth: number | undefined | null;
  resizable: boolean;
  minimizable: boolean;
  maximizable: boolean;
  closable: boolean;
  title: string;
  maximized: boolean;
  visible: boolean;
  transparent: boolean;
  decorations: boolean;
  alwaysOnTop: boolean;
  alwaysOnBottom: boolean;
  windowIcon: Img | undefined | null;
  theme: Theme;
  focused: boolean;
  contentProtection: boolean;
  visibleOnAllWorkspaces: boolean;
  position: Position | undefined | null;
};
export function alert(a0: string,a1: string,a2: number) {
  const a0_buf=encode((a0));
const a1_buf=encode((a1));

  const rawResult=symbols.alert(a0_buf, a0_buf.byteLength, a1_buf, a1_buf.byteLength, a2);
  const result=rawResult;;
  return result;;
}
export function alert_sync(a0: string,a1: string,a2: number) {
  const a0_buf=encode((a0));
const a1_buf=encode((a1));

  const rawResult=symbols.alert_sync(a0_buf, a0_buf.byteLength, a1_buf, a1_buf.byteLength, a2);
  const result=rawResult;;
  return result;;
}
export function available_monitors(a0: bigint) {
  

  const rawResult=symbols.available_monitors(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function clear_all_browsing_data(a0: bigint) {
  

  const rawResult=symbols.clear_all_browsing_data(a0);
  const result=rawResult;;
  return result;;
}
export function current() {
  

  const rawResult=symbols.current();
  const result=rawResult;;
  return result;;
}
export function current_monitor(a0: bigint) {
  

  const rawResult=symbols.current_monitor(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function cursor_position(a0: bigint) {
  

  const rawResult=symbols.cursor_position(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function eval_script(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.eval_script(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function fullscreen(a0: bigint) {
  

  const rawResult=symbols.fullscreen(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function inner_position(a0: bigint) {
  

  const rawResult=symbols.inner_position(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function join(a0: bigint) {
  

  const rawResult=symbols.join(a0);
  const result=rawResult;;
  return result;;
}
export function join_async(a0: bigint) {
  

  const rawResult=symbols.join_async(a0);
  const result=rawResult;;
  return result;;
}
export function load_url(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.load_url(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function load_url_with_headers(a0: bigint,a1: string,a2: string) {
  const a1_buf=encode((a1));
const a2_buf=encode((a2));

  const rawResult=symbols.load_url_with_headers(a0, a1_buf, a1_buf.byteLength, a2_buf, a2_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function monitor_from_point(a0: bigint,a1: number,a2: number) {
  

  const rawResult=symbols.monitor_from_point(a0, a1, a2);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function open(a0: string) {
  const a0_buf=encode((a0));

  const rawResult=symbols.open(a0_buf, a0_buf.byteLength);
  const result=rawResult.then(readPointer);;
  return result.then(decode);;
}
export function open_sync(a0: string) {
  const a0_buf=encode((a0));

  const rawResult=symbols.open_sync(a0_buf, a0_buf.byteLength);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function outer_position(a0: bigint) {
  

  const rawResult=symbols.outer_position(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function outer_size(a0: bigint) {
  

  const rawResult=symbols.outer_size(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function park() {
  

  const rawResult=symbols.park();
  const result=rawResult;;
  return result;;
}
export function park_timeout(a0: number) {
  

  const rawResult=symbols.park_timeout(a0);
  const result=rawResult;;
  return result;;
}
export function primary_monitor(a0: bigint) {
  

  const rawResult=symbols.primary_monitor(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function read_clipboard() {
  

  const rawResult=symbols.read_clipboard();
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function request_redraw(a0: bigint) {
  

  const rawResult=symbols.request_redraw(a0);
  const result=rawResult;;
  return result;;
}
export function request_user_attention(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.request_user_attention(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function save(a0: string) {
  const a0_buf=encode((a0));

  const rawResult=symbols.save(a0_buf, a0_buf.byteLength);
  const result=rawResult.then(readPointer);;
  return result.then(decode);;
}
export function save_sync(a0: string) {
  const a0_buf=encode((a0));

  const rawResult=symbols.save_sync(a0_buf, a0_buf.byteLength);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function scale_factor(a0: bigint) {
  

  const rawResult=symbols.scale_factor(a0);
  const result=rawResult;;
  return result;;
}
export function screenshot(a0: number,a1: number,a2: number,a3: bigint) {
  

  const rawResult=symbols.screenshot(a0, a1, a2, a3);
  const result=rawResult.then(readPointer);;
  return result;;
}
export function screenshot_sync(a0: number,a1: number,a2: number,a3: bigint) {
  

  const rawResult=symbols.screenshot_sync(a0, a1, a2, a3);
  const result=readPointer(rawResult);;
  return result;;
}
export function set_background_color(a0: bigint,a1: number,a2: number,a3: number,a4: number) {
  

  const rawResult=symbols.set_background_color(a0, a1, a2, a3, a4);
  const result=rawResult;;
  return result;;
}
export function set_cursor_icon(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.set_cursor_icon(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function set_focus(a0: bigint) {
  

  const rawResult=symbols.set_focus(a0);
  const result=rawResult;;
  return result;;
}
export function set_fullscreen(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.set_fullscreen(a0, a1_buf, a1_buf.byteLength);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function set_progress_bar(a0: bigint) {
  

  const rawResult=symbols.set_progress_bar(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function set_window_icon(a0: bigint,a1: number,a2: number,a3: bigint,a4: bigint) {
  

  const rawResult=symbols.set_window_icon(a0, a1, a2, a3, a4);
  const result=rawResult;;
  return result;;
}
export function sleep(a0: number) {
  

  const rawResult=symbols.sleep(a0);
  const result=rawResult;;
  return result;;
}
export function spawn(a0: bigint) {
  

  const rawResult=symbols.spawn(a0);
  const result=rawResult;;
  return result;;
}
export function title(a0: bigint) {
  

  const rawResult=symbols.title(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function url(a0: bigint) {
  

  const rawResult=symbols.url(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function webview_inner_size(a0: bigint) {
  

  const rawResult=symbols.webview_inner_size(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function webview_print(a0: bigint) {
  

  const rawResult=symbols.webview_print(a0);
  const result=rawResult;;
  return result;;
}
export function window(a0: bigint) {
  

  const rawResult=symbols.window(a0);
  const result=rawResult;;
  return result;;
}
export function write_to_clipboard(a0: string) {
  const a0_buf=encode((a0));

  const rawResult=symbols.write_to_clipboard(a0_buf, a0_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function zoom(a0: bigint,a1: number) {
  

  const rawResult=symbols.zoom(a0, a1);
  const result=rawResult;;
  return result;;
}
 