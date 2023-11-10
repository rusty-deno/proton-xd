// deno-lint-ignore-file
/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} buff
* @param {boolean} is_bgra
* @returns {Promise<Img>}
*/
export function image_from_buff(buff: Uint8Array, is_bgra: boolean): Promise<Img>;
/**
* @param {Img} img
* @param {number} compression
* @param {number} filter
* @returns {Promise<Uint8Array>}
*/
export function to_png(img: Img, compression: number, filter: number): Promise<Uint8Array>;
/**
* @param {Img} img
* @param {number} quality
* @returns {Promise<Uint8Array>}
*/
export function to_jpeg(img: Img, quality: number): Promise<Uint8Array>;
/**
* @param {Img} img
* @returns {Promise<Uint8Array>}
*/
export function to_gif(img: Img): Promise<Uint8Array>;
/**
* @param {Img} img
* @returns {Promise<Uint8Array>}
*/
export function to_ico(img: Img): Promise<Uint8Array>;
/**
* @param {Img} img
* @returns {Promise<Uint8Array>}
*/
export function to_bmp(img: Img): Promise<Uint8Array>;
/**
* @param {Img} img
* @returns {Promise<Uint8Array>}
*/
export function to_tga(img: Img): Promise<Uint8Array>;
/**
* @param {Img} img
* @returns {Promise<Uint8Array>}
*/
export function to_farbfeld(img: Img): Promise<Uint8Array>;
/**
*/
export class Img {
  free(): void;
/**
* @param {Uint8Array} bytes
* @param {number} height
* @param {number} width
* @param {boolean} is_bgra
*/
  constructor(bytes: Uint8Array, height: number, width: number, is_bgra: boolean);
/**
* @param {Uint8Array} buff
* @param {boolean} is_bgra
* @returns {Img}
*/
  static image_from_buff_sync(buff: Uint8Array, is_bgra: boolean): Img;
/**
* @param {number} compression
* @param {number} filter
* @returns {Uint8Array}
*/
  to_png_sync(compression: number, filter: number): Uint8Array;
/**
* @param {number} quality
* @returns {Uint8Array}
*/
  to_jpeg_sync(quality: number): Uint8Array;
/**
* @returns {Uint8Array}
*/
  to_gif_sync(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  to_ico_sync(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  to_bmp_sync(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  to_tga_sync(): Uint8Array;
/**
* @returns {Uint8Array}
*/
  to_farbfeld_sync(): Uint8Array;
/**
*/
  readonly bytes: Uint8Array;
/**
*/
  height: number;
/**
*/
  width: number;
}
