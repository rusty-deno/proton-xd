// Auto-generated with deno_bindgen
function encode(v: string | Uint8Array): Uint8Array {
  if (typeof v !== "string") return v
  return new TextEncoder().encode(v)
}

function decode(v: Uint8Array): string {
  return new TextDecoder().decode(v)
}

// deno-lint-ignore no-explicit-any
function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v)
  const lengthBe = new Uint8Array(4)
  const view = new DataView(lengthBe.buffer)
  ptr.copyInto(lengthBe, 0)
  const buf = new Uint8Array(view.getUint32(0))
  ptr.copyInto(buf, 4)
  return buf
}

const url = new URL("../target/debug", import.meta.url)

let uri = url.pathname
if (!uri.endsWith("/")) uri += "/"

// https://docs.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibrarya#parameters
if (Deno.build.os === "windows") {
  uri = uri.replace(/\//g, "\\")
  // Remove leading slash
  if (uri.startsWith("\\")) {
    uri = uri.slice(1)
  }
}

const { symbols } = Deno.dlopen(
  {
    darwin: uri + "libxd.dylib",
    windows: uri + "xd.dll",
    linux: uri + "libxd.so",
    freebsd: uri + "libxd.so",
    netbsd: uri + "libxd.so",
    aix: uri + "libxd.so",
    solaris: uri + "libxd.so",
    illumos: uri + "libxd.so",
  }[Deno.build.os],
  {
    calender: {
      parameters: ["buffer", "usize"],
      result: "buffer",
      nonblocking: false,
    },
    dialog_box_html: {
      parameters: ["buffer", "usize", "buffer", "usize"],
      result: "void",
      nonblocking: false,
    },
    error: {
      parameters: ["buffer", "usize"],
      result: "buffer",
      nonblocking: false,
    },
    information: {
      parameters: ["buffer", "usize"],
      result: "buffer",
      nonblocking: false,
    },
    init: { parameters: [], result: "void", nonblocking: false },
    progress: { parameters: [], result: "buffer", nonblocking: false },
    question: {
      parameters: ["buffer", "usize"],
      result: "buffer",
      nonblocking: false,
    },
    read_clipboard: { parameters: [], result: "buffer", nonblocking: false },
    screenshot: {
      parameters: ["i32", "i32", "u32"],
      result: "buffer",
      nonblocking: true,
    },
    screenshot_sync: {
      parameters: ["i32", "i32", "u32"],
      result: "buffer",
      nonblocking: false,
    },
    warning: {
      parameters: ["buffer", "usize"],
      result: "buffer",
      nonblocking: false,
    },
    write_to_clipboard: {
      parameters: ["buffer", "usize"],
      result: "void",
      nonblocking: false,
    },
  },
)
export type Size = {
  height: number
  width: number
}
export type WindowAttrs = {
  inner_size: Size
  min_inner_size: Size
  max_inner_size: Size
  resizable: boolean
  minimizable: boolean
  maximizable: boolean
  closable: boolean
  fullscreen: boolean
  title: string
  maximized: boolean
  visible: boolean
  transparent: boolean
  decorations: boolean
  always_on_top: boolean
  always_on_bottom: boolean
  window_icon: string
  preferred_theme: number
  focused: boolean
  content_protection: boolean
  visible_on_all_workspaces: boolean
}
export function calender(a0: string) {
  const a0_buf = encode(a0)

  const rawResult = symbols.calender(a0_buf, a0_buf.byteLength)
  const result = readPointer(rawResult)
  return decode(result)
}
export function dialog_box_html(a0: string, a1: string) {
  const a0_buf = encode(a0)
  const a1_buf = encode(a1)

  const rawResult = symbols.dialog_box_html(
    a0_buf,
    a0_buf.byteLength,
    a1_buf,
    a1_buf.byteLength,
  )
  const result = rawResult
  return result
}
export function error(a0: string) {
  const a0_buf = encode(a0)

  const rawResult = symbols.error(a0_buf, a0_buf.byteLength)
  const result = readPointer(rawResult)
  return decode(result)
}
export function information(a0: string) {
  const a0_buf = encode(a0)

  const rawResult = symbols.information(a0_buf, a0_buf.byteLength)
  const result = readPointer(rawResult)
  return decode(result)
}
export function init() {
  const rawResult = symbols.init()
  const result = rawResult
  return result
}
export function progress() {
  const rawResult = symbols.progress()
  const result = readPointer(rawResult)
  return decode(result)
}
export function question(a0: string) {
  const a0_buf = encode(a0)

  const rawResult = symbols.question(a0_buf, a0_buf.byteLength)
  const result = readPointer(rawResult)
  return decode(result)
}
export function read_clipboard() {
  const rawResult = symbols.read_clipboard()
  const result = readPointer(rawResult)
  return decode(result)
}
export function screenshot(a0: number, a1: number, a2: number) {
  const rawResult = symbols.screenshot(a0, a1, a2)
  const result = rawResult.then(readPointer)
  return result.then(decode)
}
export function screenshot_sync(a0: number, a1: number, a2: number) {
  const rawResult = symbols.screenshot_sync(a0, a1, a2)
  const result = readPointer(rawResult)
  return decode(result)
}
export function warning(a0: string) {
  const a0_buf = encode(a0)

  const rawResult = symbols.warning(a0_buf, a0_buf.byteLength)
  const result = readPointer(rawResult)
  return decode(result)
}
export function write_to_clipboard(a0: string) {
  const a0_buf = encode(a0)

  const rawResult = symbols.write_to_clipboard(a0_buf, a0_buf.byteLength)
  const result = rawResult
  return result
}
