const encoder = new TextEncoder();
const decoder = new TextDecoder();

function decode(buffer: Uint8Array): string {
  return decoder.decode(buffer);
}

function encode(v: string | Uint8Array): Uint8Array {
  return typeof v !== "string" ? v : encoder.encode(v);
}

function getExt() {
  switch (Deno.build.os) {
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
  const ptr = new Deno.UnsafePointerView(v);
  const lengthBe = new Uint8Array(4);
  const view = new DataView(lengthBe.buffer);
  ptr.copyInto(lengthBe, 0);
  const buf = new Uint8Array(view.getUint32(0));
  ptr.copyInto(buf, 4);
  return buf;
}

const url = new URL(`./bin/${Deno.build.target}.${getExt()}`, import.meta.url);

let uri = url.pathname;

// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
if (Deno.build.os === "windows") {
  uri = uri.replace(/\//g, "\\");
  // Remove leading slash
  if (uri.startsWith("\\")) {
    uri = uri.slice(1);
  }
}

export const lib = Deno.dlopen(uri, {
  alert: {
    parameters: ["buffer", "usize", "buffer", "usize", "u8"],
    result: "void",
    nonblocking: true,
  },
  alert_sync: {
    parameters: ["buffer", "usize", "buffer", "usize", "u8"],
    result: "void",
    nonblocking: false,
  },
  init: {
    parameters: ["buffer", "usize", "buffer", "usize"],
    result: "void",
    nonblocking: false,
  },
  open: {
    parameters: ["buffer", "usize"],
    result: "buffer",
    nonblocking: true,
  },
  open_sync: {
    parameters: ["buffer", "usize"],
    result: "buffer",
    nonblocking: false,
  },
  park: { parameters: [], result: "void", nonblocking: false },
  park_timeout: { parameters: ["f64"], result: "void", nonblocking: false },
  read_clipboard: { parameters: [], result: "buffer", nonblocking: false },
  save: {
    parameters: ["buffer", "usize"],
    result: "buffer",
    nonblocking: true,
  },
  save_sync: {
    parameters: ["buffer", "usize"],
    result: "buffer",
    nonblocking: false,
  },
  screenshot: {
    parameters: ["i32", "i32", "f32"],
    result: "buffer",
    nonblocking: true,
  },
  screenshot_sync: {
    parameters: ["i32", "i32", "f32"],
    result: "buffer",
    nonblocking: false,
  },
  sleep: { parameters: ["f32"], result: "void", nonblocking: false },
  write_to_clipboard: {
    parameters: ["buffer", "usize"],
    result: "void",
    nonblocking: false,
  },
  "confirm": {
    "parameters": ["buffer", "buffer", "u8"],
    "result": "bool",
    "nonblocking": true,
  },
  "confirm_sync": {
    "parameters": ["buffer", "buffer", "u8"],
    "result": "bool",
  },
  "spawn": {
    "parameters": ["function"],
    "result": "void",
    "monblocking": true,
  },
  "convert": {
    "parameters": ["buffer", "usize", "u32", "u32", "u8", "u8"],
    "result": "buffer",
  },
});
const { symbols } = lib;
addEventListener("unload", () => {
  lib.close();
});
export type FileDialogOptions = {
  location: string;
  filename: string;
  typ: FileOpenerType;
};
export type FileOpenerType =
  | "SingleFile"
  | "SingleDir"
  | "MultipleFile";
export type Header = {
  name: string;
  value: string;
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
export type Theme =
  | "Light"
  | "Dark";
export type WebViewAttrs = {
  user_agent: string | undefined | null;
  visible: boolean;
  transparent: boolean;
  background_color: Rgba | undefined | null;
  zoom_hotkeys_enabled: boolean;
  initialization_scripts: Array<string>;
  clipboard: boolean;
  devtools: boolean;
  accept_first_mouse: boolean;
  back_forward_navigation_gestures: boolean;
  incognito: boolean;
  autoplay: boolean;
  html: string | undefined | null;
  url: string | undefined | null;
  headers: Array<Header> | undefined | null;
};
export type WindowAttrs = {
  inner_size: Size | undefined | null;
  min_height: number | undefined | null;
  max_height: number | undefined | null;
  min_width: number | undefined | null;
  max_width: number | undefined | null;
  resizable: boolean;
  minimizable: boolean;
  maximizable: boolean;
  closable: boolean;
  title: string;
  maximized: boolean;
  visible: boolean;
  transparent: boolean;
  decorations: boolean;
  always_on_top: boolean;
  always_on_bottom: boolean;
  window_icon: string | undefined | null;
  theme: Theme;
  focused: boolean;
  content_protection: boolean;
  visible_on_all_workspaces: boolean;
  position: Position | undefined | null;
};
export function alert(a0: string, a1: string, a2: number) {
  const a0_buf = encode(a0);
  const a1_buf = encode(a1);

  const rawResult = symbols.alert(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
    a2,
  );
  const result = rawResult;
  return result;
}
export function alert_sync(a0: string, a1: string, a2: number) {
  const a0_buf = encode(a0);
  const a1_buf = encode(a1);

  const rawResult = symbols.alert_sync(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
    a2,
  );
  const result = rawResult;
  return result;
}
export function init(a0: string, a1: string) {
  const a0_buf = encode(a0);
  const a1_buf = encode(a1);

  const rawResult = symbols.init(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
  );
  const result = rawResult;
  return result;
}
export function open(a0: string) {
  const a0_buf = encode(a0);

  const rawResult = symbols.open(a0_buf, a0_buf.byteLength);
  const result = rawResult.then(readPointer);
  return result.then(decode);
}
export function open_sync(a0: string) {
  const a0_buf = encode(a0);

  const rawResult = symbols.open_sync(a0_buf, a0_buf.byteLength);
  const result = readPointer(rawResult);
  return decode(result);
}
export function park() {
  const rawResult = symbols.park();
  const result = rawResult;
  return result;
}
export function park_timeout(a0: number) {
  const rawResult = symbols.park_timeout(a0);
  const result = rawResult;
  return result;
}
export function read_clipboard() {
  const rawResult = symbols.read_clipboard();
  const result = readPointer(rawResult);
  return decode(result);
}
export function save(a0: string) {
  const a0_buf = encode(a0);

  const rawResult = symbols.save(a0_buf, a0_buf.byteLength);
  const result = rawResult.then(readPointer);
  return result.then(decode);
}
export function save_sync(a0: string) {
  const a0_buf = encode(a0);

  const rawResult = symbols.save_sync(a0_buf, a0_buf.byteLength);
  const result = readPointer(rawResult);
  return decode(result);
}
export function screenshot(a0: number, a1: number, a2: number) {
  const rawResult = symbols.screenshot(a0, a1, a2);
  const result = rawResult.then(readPointer);
  return result.then(decode);
}
export function screenshot_sync(a0: number, a1: number, a2: number) {
  const rawResult = symbols.screenshot_sync(a0, a1, a2);
  const result = readPointer(rawResult);
  return decode(result);
}
export function sleep(a0: number) {
  const rawResult = symbols.sleep(a0);
  const result = rawResult;
  return result;
}
export function write_to_clipboard(a0: string) {
  const a0_buf = encode(a0);

  const rawResult = symbols.write_to_clipboard(a0_buf, a0_buf.byteLength);
  const result = rawResult;
  return result;
}
