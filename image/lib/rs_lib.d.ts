/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} rgba
* @param {number} height
* @param {number} width
* @param {Format} format
* @param {number} quality
* @returns {Uint8Array}
*/
export function convert(rgba: Uint8Array, height: number, width: number, format: Format, quality: number): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {Img}
*/
export function image_from_buff(buffer: Uint8Array): Img;
/**
* @param {string} path
* @param {Uint8Array} buff
* @param {number} height
* @param {number} width
* @param {number} color_type
* @returns {string}
*/
export function save_image_sync(path: string, buff: Uint8Array, height: number, width: number, color_type: number): string;
/**
* @param {string} path
* @param {Uint8Array} buff
* @param {number} height
* @param {number} width
* @param {number} color_type
* @param {number} format
* @returns {string}
*/
export function save_image_wtih_format_sync(path: string, buff: Uint8Array, height: number, width: number, color_type: number, format: number): string;
/**
* @param {string} path
* @param {Uint8Array} buff
* @param {number} height
* @param {number} width
* @param {number} color_type
* @returns {Promise<string>}
*/
export function save_image(path: string, buff: Uint8Array, height: number, width: number, color_type: number): Promise<string>;
/**
* @param {string} path
* @param {Uint8Array} buff
* @param {number} height
* @param {number} width
* @param {number} color_type
* @param {number} format
* @returns {Promise<string>}
*/
export function save_image_wtih_format(path: string, buff: Uint8Array, height: number, width: number, color_type: number, format: number): Promise<string>;
/**
*/
export enum Format {
  Png = 0,
  Jpeg = 1,
  Gif = 2,
  WebP = 3,
  Pnm = 4,
  Tiff = 5,
  Tga = 6,
  Dds = 7,
  Bmp = 8,
  Ico = 9,
  Hdr = 10,
  OpenExr = 11,
  Farbfeld = 12,
  Avif = 13,
  Qoi = 14,
}
/**
*/
export enum ColorType {
  L8 = 0,
  La8 = 1,
  Rgb8 = 2,
  Rgba8 = 3,
  L16 = 4,
  La16 = 5,
  Rgb16 = 6,
  Rgba16 = 7,
  Rgb32F = 8,
  Rgba32F = 9,
  Brga8 = 10,
}
/**
*/
export class Img {
  free(): void;
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
