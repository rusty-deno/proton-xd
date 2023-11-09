// deno-lint-ignore-file
/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} buff
* @param {boolean} is_brga
* @returns {Promise<Img>}
*/
export function image_from_buff(buff: Uint8Array, is_brga: boolean): Promise<Img>;
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
* @returns {Uint8Array}
*/
export function to_jpeg(img: Img, quality: number): Uint8Array;
/**
* @param {Img} img
* @returns {Uint8Array}
*/
export function to_gif(img: Img): Uint8Array;
/**
* @param {Img} img
* @returns {Uint8Array}
*/
export function to_ico(img: Img): Uint8Array;
/**
* @param {Img} img
* @returns {Uint8Array}
*/
export function to_bmp(img: Img): Uint8Array;
/**
* @param {Img} img
* @returns {Uint8Array}
*/
export function to_tga(img: Img): Uint8Array;
/**
* @param {Img} img
* @returns {Uint8Array}
*/
export function to_farbfeld(img: Img): Uint8Array;
/**
*/
export class Img {
  free(): void;
/**
* @param {Uint8Array} rgba
* @param {number} height
* @param {number} width
*/
  constructor(rgba: Uint8Array, height: number, width: number);
/**
* @param {Uint8Array} buff
* @param {boolean} is_brga
* @returns {Img}
*/
  static image_from_buff_sync(buff: Uint8Array, is_brga: boolean): Img;
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
  height: number;
/**
*/
  readonly rgba: Uint8Array;
/**
*/
  width: number;
}
