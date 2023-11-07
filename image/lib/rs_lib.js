// deno-lint-ignore-file


const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertBoolean(n) {
    if (typeof(n) !== 'boolean') {
        throw new Error('expected a boolean argument');
    }
}

const CLOSURE_DTORS = new FinalizationRegistry(state => {
    wasm.__wbindgen_export_1.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_1.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state)
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function logError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        let error = (function () {
            try {
                return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
            } catch(_) {
                return "<failed to stringify thrown value>";
            }
        }());
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
        throw e;
    }
}

function _assertNum(n) {
    if (typeof(n) !== 'number') throw new Error('expected a number argument');
}
function __wbg_adapter_20(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure53_externref_shim(arg0, arg1, arg2);
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Uint8Array} rgba
* @param {number} height
* @param {number} width
* @param {number} format
* @param {number} color_type
* @param {number} quality
* @returns {Uint8Array}
*/
export function convert_sync(rgba, height, width, format, color_type, quality) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertNum(height);
        _assertNum(width);
        _assertNum(format);
        _assertNum(color_type);
        _assertNum(quality);
        wasm.convert_sync(retptr, ptr0, len0, height, width, format, color_type, quality);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1, 1);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* @param {Uint8Array} rgba
* @param {number} height
* @param {number} width
* @param {number} format
* @param {number} color_type
* @param {number} quality
* @returns {Promise<any>}
*/
export function convert(rgba, height, width, format, color_type, quality) {
    const ptr0 = passArray8ToWasm0(rgba, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    _assertNum(height);
    _assertNum(width);
    _assertNum(format);
    _assertNum(color_type);
    _assertNum(quality);
    const ret = wasm.convert(ptr0, len0, height, width, format, color_type, quality);
    return ret;
}

/**
* @param {Uint8Array} buffer
* @returns {Img}
*/
export function image_from_buff(buffer) {
    const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.image_from_buff(ptr0, len0);
    return Img.__wrap(ret);
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_0.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}
function __wbg_adapter_47(arg0, arg1, arg2, arg3) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure72_externref_shim(arg0, arg1, arg2, arg3);
}

/**
*/
export const Format = Object.freeze({ Png:0,"0":"Png",Jpeg:1,"1":"Jpeg",Gif:2,"2":"Gif",WebP:3,"3":"WebP",Pnm:4,"4":"Pnm",Tiff:5,"5":"Tiff",Tga:6,"6":"Tga",Dds:7,"7":"Dds",Bmp:8,"8":"Bmp",Ico:9,"9":"Ico",Hdr:10,"10":"Hdr",OpenExr:11,"11":"OpenExr",Farbfeld:12,"12":"Farbfeld",Avif:13,"13":"Avif",Qoi:14,"14":"Qoi", });

const ImgFinalization = new FinalizationRegistry(ptr => wasm.__wbg_img_free(ptr >>> 0));
/**
*/
export class Img {

    constructor() {
        throw new Error('cannot invoke `new` directly');
    }

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Img.prototype);
        obj.__wbg_ptr = ptr;
        ImgFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ImgFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_img_free(ptr);
    }
    /**
    * @returns {number}
    */
    get height() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.__wbg_get_img_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set height(arg0) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        _assertNum(arg0);
        wasm.__wbg_set_img_height(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get width() {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ret = wasm.__wbg_get_img_width(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set width(arg0) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        _assertNum(arg0);
        wasm.__wbg_set_img_width(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {Uint8Array}
    */
    get rgba() {
        try {
            if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertNum(this.__wbg_ptr);
            wasm.img_rgba(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const ThreadFinalization = new FinalizationRegistry(ptr => wasm.__wbg_thread_free(ptr >>> 0));
/**
*/
export class Thread {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Thread.prototype);
        obj.__wbg_ptr = ptr;
        ThreadFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ThreadFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_thread_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.thread_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {number}
    */
    static available_parallelism() {
        const ret = wasm.thread_available_parallelism();
        return ret >>> 0;
    }
    /**
    * @returns {Thread}
    */
    static current() {
        const ret = wasm.thread_current();
        return Thread.__wrap(ret);
    }
    /**
    * @returns {boolean}
    */
    static panicking() {
        const ret = wasm.thread_panicking();
        return ret !== 0;
    }
    /**
    */
    static park() {
        wasm.thread_park();
    }
    /**
    * @param {number} duration
    */
    static park_timeout(duration) {
        wasm.thread_park_timeout(duration);
    }
    /**
    * @param {number} duration
    */
    static sleep(duration) {
        wasm.thread_sleep(duration);
    }
    /**
    */
    static xd() {
        wasm.thread_xd();
    }
}

const imports = {
    __wbindgen_placeholder__: {
        __wbindgen_string_new: function(arg0, arg1) {
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cb_drop: function(arg0) {
            const obj = arg0.original;
            if (obj.cnt-- == 1) {
                obj.a = 0;
                return true;
            }
            const ret = false;
            _assertBoolean(ret);
            return ret;
        },
        __wbg_queueMicrotask_e5949c35d772a669: typeof queueMicrotask == 'function' ? queueMicrotask : notDefined('queueMicrotask'),
        __wbg_queueMicrotask_2be8b97a81fe4d00: function() { return logError(function (arg0) {
            const ret = arg0.queueMicrotask;
            return ret;
        }, arguments) },
        __wbindgen_is_function: function(arg0) {
            const ret = typeof(arg0) === 'function';
            _assertBoolean(ret);
            return ret;
        },
        __wbg_newnoargs_ccdcae30fd002262: function() { return logError(function (arg0, arg1) {
            const ret = new Function(getStringFromWasm0(arg0, arg1));
            return ret;
        }, arguments) },
        __wbg_call_669127b9d730c650: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments) },
        __wbg_self_3fad056edded10bd: function() { return handleError(function () {
            const ret = self.self;
            return ret;
        }, arguments) },
        __wbg_window_a4f46c98a61d4089: function() { return handleError(function () {
            const ret = window.window;
            return ret;
        }, arguments) },
        __wbg_globalThis_17eff828815f7d84: function() { return handleError(function () {
            const ret = globalThis.globalThis;
            return ret;
        }, arguments) },
        __wbg_global_46f939f6541643c5: function() { return handleError(function () {
            const ret = global.global;
            return ret;
        }, arguments) },
        __wbindgen_is_undefined: function(arg0) {
            const ret = arg0 === undefined;
            _assertBoolean(ret);
            return ret;
        },
        __wbg_call_53fc3abd42e24ec8: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments) },
        __wbg_new_feb65b865d980ae2: function() { return logError(function (arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wbg_adapter_47(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return ret;
            } finally {
                state0.a = state0.b = 0;
            }
        }, arguments) },
        __wbg_resolve_a3252b2860f0a09e: function() { return logError(function (arg0) {
            const ret = Promise.resolve(arg0);
            return ret;
        }, arguments) },
        __wbg_then_89e1c559530b85cf: function() { return logError(function (arg0, arg1) {
            const ret = arg0.then(arg1);
            return ret;
        }, arguments) },
        __wbg_buffer_344d9b41efe96da7: function() { return logError(function (arg0) {
            const ret = arg0.buffer;
            return ret;
        }, arguments) },
        __wbg_newwithbyteoffsetandlength_2dc04d99088b15e3: function() { return logError(function (arg0, arg1, arg2) {
            const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        }, arguments) },
        __wbg_new_d8a000788389a31e: function() { return logError(function (arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        }, arguments) },
        __wbindgen_throw: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_memory: function() {
            const ret = wasm.memory;
            return ret;
        },
        __wbindgen_closure_wrapper169: function() { return logError(function (arg0, arg1, arg2) {
            const ret = makeMutClosure(arg0, arg1, 54, __wbg_adapter_20);
            return ret;
        }, arguments) },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_export_0;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
            ;
        },
    },

};

const wasm_url = new URL('rs_lib_bg.wasm', import.meta.url);
let wasmCode = '';
switch (wasm_url.protocol) {
    case 'file:':
    wasmCode = await Deno.readFile(wasm_url);
    break
    case 'https:':
    case 'http:':
    wasmCode = await (await fetch(wasm_url)).arrayBuffer();
    break
    default:
    throw new Error(`Unsupported protocol: ${wasm_url.protocol}`);
}

const wasmInstance = (await WebAssembly.instantiate(wasmCode, imports)).instance;
const wasm = wasmInstance.exports;

wasm.__wbindgen_start();

