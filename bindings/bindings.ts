
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

const bindingsUrl=new URL(`./bin/${Deno.build.target}.${getExt()}`, import.meta.url);

let bindingsUri=bindingsUrl.pathname;

// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
if (Deno.build.os==="windows") {
  bindingsUri=bindingsUri.replace(/\//g, "\\");
  // Remove leading slash
  if (bindingsUri.startsWith("\\")) {
    bindingsUri=bindingsUri.slice(1);
  }
}

export const lib=Deno.dlopen(bindingsUri, {
  clear_all_browsing_data: { parameters: [ "usize" ], result: "void", nonblocking: false }, current: { parameters: [  ], result: "void", nonblocking: false }, cursor_position: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, drag_window: { parameters: [ "usize" ], result: "void", nonblocking: false }, eval_script: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, file_dialog_add_filter: { parameters: [ "usize", "buffer", "usize", "buffer", "usize" ], result: "void", nonblocking: false }, file_dialog_remove_all_filters: { parameters: [ "usize" ], result: "void", nonblocking: false }, file_dialog_reset_filename: { parameters: [ "usize" ], result: "void", nonblocking: false }, file_dialog_reset_location: { parameters: [ "usize" ], result: "void", nonblocking: false }, file_dialog_reset_owner: { parameters: [ "usize" ], result: "void", nonblocking: false }, file_dialog_set_filename: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, file_dialog_set_location: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, file_dialog_set_title: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, file_dialog_show_open_multiple_file: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, file_dialog_show_open_single_dir: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, file_dialog_show_open_single_file: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, file_dialog_show_save_single_file: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, init: { parameters: [ "buffer", "usize", "buffer", "usize", "usize" ], result: "void", nonblocking: true }, inner_position: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, join: { parameters: [ "usize" ], result: "void", nonblocking: false }, join_async: { parameters: [ "usize" ], result: "void", nonblocking: true }, load_url: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, load_url_with_headers: { parameters: [ "usize", "buffer", "usize", "buffer", "usize" ], result: "void", nonblocking: false }, msg_dialog_reset_owner: { parameters: [ "usize" ], result: "void", nonblocking: false }, msg_dialog_set_text: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, msg_dialog_set_title: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, msg_dialog_show_alert: { parameters: [ "usize" ], result: "void", nonblocking: false }, msg_dialog_xd: { parameters: [ "usize", "u8" ], result: "void", nonblocking: false }, new_file_dialog: { parameters: [  ], result: "usize", nonblocking: false }, new_msg_dialog: { parameters: [  ], result: "usize", nonblocking: false }, outer_position: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, outer_size: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, park: { parameters: [  ], result: "void", nonblocking: false }, park_timeout: { parameters: [ "f64" ], result: "void", nonblocking: false }, read_clipboard: { parameters: [  ], result: "buffer", nonblocking: false }, request_redraw: { parameters: [ "usize" ], result: "void", nonblocking: false }, request_user_attention: { parameters: [ "usize", "u8" ], result: "void", nonblocking: false }, scale_factor: { parameters: [ "usize" ], result: "f64", nonblocking: false }, screenshot: { parameters: [ "i32", "i32", "f32", "usize" ], result: "buffer", nonblocking: true }, screenshot_sync: { parameters: [ "i32", "i32", "f32", "usize" ], result: "buffer", nonblocking: false }, set_background_color: { parameters: [ "usize", "u8", "u8", "u8", "u8" ], result: "void", nonblocking: false }, set_cursor_icon: { parameters: [ "usize", "u8" ], result: "void", nonblocking: false }, set_cursor_position: { parameters: [ "usize", "i32", "i32" ], result: "void", nonblocking: false }, set_focus: { parameters: [ "usize" ], result: "void", nonblocking: false }, set_fullscreen: { parameters: [ "usize", "buffer", "usize" ], result: "buffer", nonblocking: false }, set_ime_position: { parameters: [ "usize", "i32", "i32" ], result: "void", nonblocking: false }, set_inner_size: { parameters: [ "usize", "u32", "u32" ], result: "void", nonblocking: false }, set_inner_size_constraints: { parameters: [ "usize", "i32", "i32", "i32", "i32" ], result: "void", nonblocking: false }, set_max_inner_size: { parameters: [ "usize", "u32", "u32" ], result: "void", nonblocking: false }, set_min_inner_size: { parameters: [ "usize", "u32", "u32" ], result: "void", nonblocking: false }, set_outer_position: { parameters: [ "usize", "i32", "i32" ], result: "void", nonblocking: false }, set_progress_bar: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, set_title: { parameters: [ "usize", "buffer", "usize" ], result: "void", nonblocking: false }, set_window_icon: { parameters: [ "usize", "u32", "u32", "buffer", "usize" ], result: "void", nonblocking: true }, sleep: { parameters: [ "f32" ], result: "void", nonblocking: false }, spawn: { parameters: [ "usize" ], result: "usize", nonblocking: false }, title: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, url: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, webview_inner_size: { parameters: [ "usize" ], result: "buffer", nonblocking: false }, webview_print: { parameters: [ "usize" ], result: "void", nonblocking: false }, window: { parameters: [ "usize" ], result: "usize", nonblocking: false }, write_to_clipboard: { parameters: [ "buffer", "usize" ], result: "void", nonblocking: false }, zoom: { parameters: [ "usize", "f64" ], result: "void", nonblocking: false },
  "msg_dialog_show_confirm": {
    "parameters": [
      "usize"
    ],
    "result": "bool",
    "nonBlocking": null
  },
  "is_minimized": {
    "parameters": [
      "usize"
    ],
    "result": "bool",
    "nonBlocking": null
  },
  "theme": {
    "parameters": [
      "usize"
    ],
    "result": "bool",
    "nonBlocking": null
  },
  "is_minimizable": {
    "parameters": [
      "usize"
    ],
    "result": "bool",
    "nonBlocking": null
  },
  "is_resizable": {
    "parameters": [
      "usize"
    ],
    "result": "bool",
    "nonBlocking": null
  },
  "is_visible": {
    "parameters": [
      "usize"
    ],
    "result": "bool",
    "nonBlocking": null
  },
  "is_maximized": {
    "parameters": [
      "usize"
    ],
    "result": "bool",
    "nonBlocking": null
  },
  set_throw: {
    parameters: ["function"],
    result: "void"
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
    
export type Img = {
    bytes: Array<number>;
  height: number;
  width: number;
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
export function cursor_position(a0: bigint) {
  

  const rawResult=symbols.cursor_position(a0);
  const result=readPointer(rawResult);;
  return result;;
}
export function drag_window(a0: bigint) {
  

  const rawResult=symbols.drag_window(a0);
  const result=rawResult;;
  return result;;
}
export function eval_script(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.eval_script(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function file_dialog_add_filter(a0: bigint,a1: string,a2: string) {
  const a1_buf=encode((a1));
const a2_buf=encode((a2));

  const rawResult=symbols.file_dialog_add_filter(a0, a1_buf, a1_buf.byteLength, a2_buf, a2_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function file_dialog_remove_all_filters(a0: bigint) {
  

  const rawResult=symbols.file_dialog_remove_all_filters(a0);
  const result=rawResult;;
  return result;;
}
export function file_dialog_reset_filename(a0: bigint) {
  

  const rawResult=symbols.file_dialog_reset_filename(a0);
  const result=rawResult;;
  return result;;
}
export function file_dialog_reset_location(a0: bigint) {
  

  const rawResult=symbols.file_dialog_reset_location(a0);
  const result=rawResult;;
  return result;;
}
export function file_dialog_reset_owner(a0: bigint) {
  

  const rawResult=symbols.file_dialog_reset_owner(a0);
  const result=rawResult;;
  return result;;
}
export function file_dialog_set_filename(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.file_dialog_set_filename(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function file_dialog_set_location(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.file_dialog_set_location(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function file_dialog_set_title(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.file_dialog_set_title(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function file_dialog_show_open_multiple_file(a0: bigint) {
  

  const rawResult=symbols.file_dialog_show_open_multiple_file(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function file_dialog_show_open_single_dir(a0: bigint) {
  

  const rawResult=symbols.file_dialog_show_open_single_dir(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function file_dialog_show_open_single_file(a0: bigint) {
  

  const rawResult=symbols.file_dialog_show_open_single_file(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function file_dialog_show_save_single_file(a0: bigint) {
  

  const rawResult=symbols.file_dialog_show_save_single_file(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function init(a0: string,a1: string,a2: bigint) {
  const a0_buf=encode((a0));
const a1_buf=encode((a1));

  const rawResult=symbols.init(a0_buf, a0_buf.byteLength, a1_buf, a1_buf.byteLength, a2);
  const result=rawResult;;
  return result;;
}
export function inner_position(a0: bigint) {
  

  const rawResult=symbols.inner_position(a0);
  const result=readPointer(rawResult);;
  return result;;
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
export function msg_dialog_reset_owner(a0: bigint) {
  

  const rawResult=symbols.msg_dialog_reset_owner(a0);
  const result=rawResult;;
  return result;;
}
export function msg_dialog_set_text(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.msg_dialog_set_text(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function msg_dialog_set_title(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.msg_dialog_set_title(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function msg_dialog_show_alert(a0: bigint) {
  

  const rawResult=symbols.msg_dialog_show_alert(a0);
  const result=rawResult;;
  return result;;
}
export function msg_dialog_xd(a0: bigint,a1: number) {
  

  const rawResult=symbols.msg_dialog_xd(a0, a1);
  const result=rawResult;;
  return result;;
}
export function new_file_dialog() {
  

  const rawResult=symbols.new_file_dialog();
  const result=rawResult;;
  return result;;
}
export function new_msg_dialog() {
  

  const rawResult=symbols.new_msg_dialog();
  const result=rawResult;;
  return result;;
}
export function outer_position(a0: bigint) {
  

  const rawResult=symbols.outer_position(a0);
  const result=readPointer(rawResult);;
  return result;;
}
export function outer_size(a0: bigint) {
  

  const rawResult=symbols.outer_size(a0);
  const result=readPointer(rawResult);;
  return result;;
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
export function request_user_attention(a0: bigint,a1: number) {
  

  const rawResult=symbols.request_user_attention(a0, a1);
  const result=rawResult;;
  return result;;
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
export function set_cursor_icon(a0: bigint,a1: number) {
  

  const rawResult=symbols.set_cursor_icon(a0, a1);
  const result=rawResult;;
  return result;;
}
export function set_cursor_position(a0: bigint,a1: number,a2: number) {
  

  const rawResult=symbols.set_cursor_position(a0, a1, a2);
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
export function set_ime_position(a0: bigint,a1: number,a2: number) {
  

  const rawResult=symbols.set_ime_position(a0, a1, a2);
  const result=rawResult;;
  return result;;
}
export function set_inner_size(a0: bigint,a1: number,a2: number) {
  

  const rawResult=symbols.set_inner_size(a0, a1, a2);
  const result=rawResult;;
  return result;;
}
export function set_inner_size_constraints(a0: bigint,a1: number,a2: number,a3: number,a4: number) {
  

  const rawResult=symbols.set_inner_size_constraints(a0, a1, a2, a3, a4);
  const result=rawResult;;
  return result;;
}
export function set_max_inner_size(a0: bigint,a1: number,a2: number) {
  

  const rawResult=symbols.set_max_inner_size(a0, a1, a2);
  const result=rawResult;;
  return result;;
}
export function set_min_inner_size(a0: bigint,a1: number,a2: number) {
  

  const rawResult=symbols.set_min_inner_size(a0, a1, a2);
  const result=rawResult;;
  return result;;
}
export function set_outer_position(a0: bigint,a1: number,a2: number) {
  

  const rawResult=symbols.set_outer_position(a0, a1, a2);
  const result=rawResult;;
  return result;;
}
export function set_progress_bar(a0: bigint) {
  

  const rawResult=symbols.set_progress_bar(a0);
  const result=readPointer(rawResult);;
  return decode(result);;
}
export function set_title(a0: bigint,a1: string) {
  const a1_buf=encode((a1));

  const rawResult=symbols.set_title(a0, a1_buf, a1_buf.byteLength);
  const result=rawResult;;
  return result;;
}
export function set_window_icon(a0: bigint,a1: number,a2: number,a3: Uint8Array) {
  const a3_buf=encode((a3));

  const rawResult=symbols.set_window_icon(a0, a1, a2, a3_buf, a3_buf.byteLength);
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
  return result;;
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
 