// Auto-generated with deno_bindgen
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function decode(buffer: Uint8Array): string {
  return decoder.decode(buffer);
}

function encode(v: string | Uint8Array): Uint8Array {
  return typeof v !== "string" ? v : encoder.encode(v);
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

const url = new URL("xd.dll", import.meta.url);

let uri = url.pathname;

// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
if (Deno.build.os === "windows") {
  uri = uri.replace(/\//g, "\\");
  // Remove leading slash
  if (uri.startsWith("\\")) {
    uri = uri.slice(1);
  }
}

export const { symbols, close } = Deno.dlopen(uri, {
  error: {
    parameters: ["buffer", "usize", "buffer", "usize", "u8"],
    result: "void",
    nonblocking: false,
  },
  info: {
    parameters: ["buffer", "usize", "buffer", "usize", "u8"],
    result: "void",
    nonblocking: false,
  },
  init: {
    parameters: ["buffer", "usize", "buffer", "usize", "buffer", "usize"],
    result: "void",
    nonblocking: false,
  },
  message: {
    parameters: ["buffer", "usize", "buffer", "usize", "u8"],
    result: "void",
    nonblocking: false,
  },
  park: { parameters: [], result: "void", nonblocking: false },
  park_timeout: { parameters: ["f64"], result: "void", nonblocking: false },
  read_clipboard: { parameters: [], result: "buffer", nonblocking: false },
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
  warning: {
    parameters: ["buffer", "usize", "buffer", "usize", "u8"],
    result: "void",
    nonblocking: false,
  },
  write_to_clipboard: {
    parameters: ["buffer", "usize"],
    result: "void",
    nonblocking: false,
  },
});
export type Content =
  | {
    Html: {
      html: string;
    };
  }
  | {
    Url: {
      url: string;
    };
  }
  | {
    UrlAndHeaders: {
      url: string;
      headers: Array<Header>;
    };
  };
export type Header = {
  name: string;
  value: string;
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
  user_agent: string;
  visible: boolean;
  transparent: boolean;
  background_color: Rgba;
  zoom_hotkeys_enabled: boolean;
  initialization_scripts: Array<string>;
  clipboard: boolean;
  devtools: boolean;
  accept_first_mouse: boolean;
  back_forward_navigation_gestures: boolean;
  incognito: boolean;
  autoplay: boolean;
};
export type WindowAttrs = {
  inner_size: Size;
  min_inner_size: Size;
  max_inner_size: Size;
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
  window_icon: string;
  preferred_theme: Theme;
  focused: boolean;
  content_protection: boolean;
  visible_on_all_workspaces: boolean;
};
export function error(a0: string, a1: string, a2: number) {
  const a0_buf = encode(a0);
  const a1_buf = encode(a1);

  const rawResult = symbols.error(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
    a2,
  );
  const result = rawResult;
  return result;
}
export function info(a0: string, a1: string, a2: number) {
  const a0_buf = encode(a0);
  const a1_buf = encode(a1);

  const rawResult = symbols.info(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
    a2,
  );
  const result = rawResult;
  return result;
}
export function init(a0: string, a1: string, a2: string) {
  const a0_buf = encode(a0);
  const a1_buf = encode(a1);
  const a2_buf = encode(a2);

  const rawResult = symbols.init(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
    a2_buf,
    a2_buf.byteLength,
  );
  const result = rawResult;
  return result;
}
export function message(a0: string, a1: string, a2: number) {
  const a0_buf = encode(a0);
  const a1_buf = encode(a1);

  const rawResult = symbols.message(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
    a2,
  );
  const result = rawResult;
  return result;
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
export function warning(a0: string, a1: string, a2: number) {
  const a0_buf = encode(a0);
  const a1_buf = encode(a1);

  const rawResult = symbols.warning(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
    a2,
  );
  const result = rawResult;
  return result;
}
export function write_to_clipboard(a0: string) {
  const a0_buf = encode(a0);

  const rawResult = symbols.write_to_clipboard(a0_buf, a0_buf.byteLength);
  const result = rawResult;
  return result;
}
