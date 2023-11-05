/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} rgba
* @param {number} height
* @param {number} width
* @param {number} format
* @param {number} color_type
* @param {number} quality
* @returns {Uint8Array}
*/
export function convert_sync(rgba: Uint8Array, height: number, width: number, format: number, color_type: number, quality: number): Uint8Array;
/**
* @param {Uint8Array} rgba
* @param {number} height
* @param {number} width
* @param {number} format
* @param {number} color_type
* @param {number} quality
* @returns {Uint8Array}
*/
export function convert(rgba: Uint8Array, height: number, width: number, format: number, color_type: number, quality: number): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {Img}
*/
export function image_from_buff(buffer: Uint8Array): Img;
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
