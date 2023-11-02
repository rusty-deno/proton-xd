

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

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
* @returns {Img}
*/
export function image_from_buff(buffer) {
    const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.image_from_buff(ptr0, len0);
    return Img.__wrap(ret);
}

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
* @param {string} path
* @param {Uint8Array} buffer
* @param {number} height
* @param {number} width
* @param {number} color
*/
export function save_img(path, buffer, height, width, color) {
    const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    wasm.save_img(ptr0, len0, ptr1, len1, height, width, color);
}

/**
*/
export const ColorType = Object.freeze({
/**
* Pixel is 8-bit luminance
*/
L8:0,"0":"L8",
/**
* Pixel is 8-bit luminance with an alpha channel
*/
La8:1,"1":"La8",
/**
* Pixel contains 8-bit R, G and B channels
*/
Rgb8:2,"2":"Rgb8",
/**
* Pixel is 8-bit RGB with an alpha channel
*/
Rgba8:3,"3":"Rgba8",
/**
* Pixel is 16-bit luminance
*/
L16:4,"4":"L16",
/**
* Pixel is 16-bit luminance with an alpha channel
*/
La16:5,"5":"La16",
/**
* Pixel is 16-bit RGB
*/
Rgb16:6,"6":"Rgb16",
/**
* Pixel is 16-bit RGBA
*/
Rgba16:7,"7":"Rgba16",
/**
* Pixel is 32-bit float RGB
*/
Rgb32F:8,"8":"Rgb32F",
/**
* Pixel is 32-bit float RGBA
*/
Rgba32F:9,"9":"Rgba32F", });

const ImgFinalization = new FinalizationRegistry(ptr => wasm.__wbg_img_free(ptr));
/**
*/
export class Img {

    static __wrap(ptr) {
        const obj = Object.create(Img.prototype);
        obj.ptr = ptr;
        ImgFinalization.register(obj, obj.ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;
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
        const ret = wasm.__wbg_get_img_height(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set height(arg0) {
        wasm.__wbg_set_img_height(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get width() {
        const ret = wasm.__wbg_get_img_width(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set width(arg0) {
        wasm.__wbg_set_img_width(this.ptr, arg0);
    }
    /**
    * @returns {Uint8Array}
    */
    get rgba() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.img_rgba(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v0 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const imports = {
    __wbindgen_placeholder__: {
        __wbindgen_throw: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
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

