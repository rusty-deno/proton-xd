// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: 7686e38de965d2e11a7c32524834d97a5b5a3a22
let wasm;

const cachedTextDecoder = new TextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1);
  getUint8Memory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
 * @param {Uint8Array} rgba
 * @param {number} height
 * @param {number} width
 * @param {number} format
 * @param {number} quality
 * @returns {Uint8Array}
 */
export function convert(rgba, height, width, format, quality) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.convert(retptr, ptr0, len0, height, width, format, quality);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

/**
 * @param {Uint8Array} buffer
 * @returns {Size}
 */
export function image_from_buff(buffer) {
  const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.image_from_buff(ptr0, len0);
  return Size.__wrap(ret);
}

const SizeFinalization = new FinalizationRegistry((ptr) =>
  wasm.__wbg_size_free(ptr)
);
/** */
export class Size {
  static __wrap(ptr) {
    const obj = Object.create(Size.prototype);
    obj.ptr = ptr;
    SizeFinalization.register(obj, obj.ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.ptr;
    this.ptr = 0;
    SizeFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_size_free(ptr);
  }
  /**
   * @returns {number}
   */
  get height() {
    const ret = wasm.__wbg_get_size_height(this.ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set height(arg0) {
    wasm.__wbg_set_size_height(this.ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get width() {
    const ret = wasm.__wbg_get_size_width(this.ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set width(arg0) {
    wasm.__wbg_set_size_width(this.ptr, arg0);
  }
}

const imports = {
  __wbindgen_placeholder__: {
    __wbindgen_throw: function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
  },
};

/**
 * Decompression callback
 *
 * @callback DecompressCallback
 * @param {Uint8Array} compressed
 * @return {Uint8Array} decompressed
 */

/**
 * Options for instantiating a Wasm instance.
 * @typedef {Object} InstantiateOptions
 * @property {URL=} url - Optional url to the Wasm file to instantiate.
 * @property {DecompressCallback=} decompress - Callback to decompress the
 * raw Wasm file bytes before instantiating.
 */

/** Instantiates an instance of the Wasm module returning its functions.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 */
export async function instantiate(opts) {
  return (await instantiateWithInstance(opts)).exports;
}

let instanceWithExports;
let lastLoadPromise;

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 * @returns {Promise<{
 *   instance: WebAssembly.Instance;
 *   exports: { convert: typeof convert; image_from_buff: typeof image_from_buff; Size : typeof Size  }
 * }>}
 */
export function instantiateWithInstance(opts) {
  if (instanceWithExports != null) {
    return Promise.resolve(instanceWithExports);
  }
  if (lastLoadPromise == null) {
    lastLoadPromise = (async () => {
      try {
        const instance = (await instantiateModule(opts ?? {})).instance;
        wasm = instance.exports;
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
        instanceWithExports = {
          instance,
          exports: getWasmInstanceExports(),
        };
        return instanceWithExports;
      } finally {
        lastLoadPromise = null;
      }
    })();
  }
  return lastLoadPromise;
}

function getWasmInstanceExports() {
  return { convert, image_from_buff, Size };
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated() {
  return instanceWithExports != null;
}

/**
 * @param {InstantiateOptions} opts
 */
async function instantiateModule(opts) {
  const wasmUrl = opts.url ?? new URL("rs_lib_bg.wasm", import.meta.url);
  const decompress = opts.decompress;
  const isFile = wasmUrl.protocol === "file:";

  // make file urls work in Node via dnt
  const isNode = globalThis.process?.versions?.node != null;
  if (isNode && isFile) {
    // the deno global will be shimmed by dnt
    const wasmCode = await Deno.readFile(wasmUrl);
    return WebAssembly.instantiate(
      decompress ? decompress(wasmCode) : wasmCode,
      imports,
    );
  }

  switch (wasmUrl.protocol) {
    case "file:":
    case "https:":
    case "http:": {
      if (isFile) {
        if (typeof Deno !== "object") {
          throw new Error("file urls are not supported in this environment");
        }
        if ("permissions" in Deno) {
          await Deno.permissions.request({ name: "read", path: wasmUrl });
        }
      } else if (typeof Deno === "object" && "permissions" in Deno) {
        await Deno.permissions.request({ name: "net", host: wasmUrl.host });
      }
      const wasmResponse = await fetch(wasmUrl);
      if (decompress) {
        const wasmCode = new Uint8Array(await wasmResponse.arrayBuffer());
        return WebAssembly.instantiate(decompress(wasmCode), imports);
      }
      if (
        isFile ||
        wasmResponse.headers.get("content-type")?.toLowerCase()
          .startsWith("application/wasm")
      ) {
        return WebAssembly.instantiateStreaming(wasmResponse, imports);
      } else {
        return WebAssembly.instantiate(
          await wasmResponse.arrayBuffer(),
          imports,
        );
      }
    }
    default:
      throw new Error(`Unsupported protocol: ${wasmUrl.protocol}`);
  }
}
