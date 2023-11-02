/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} rgba
* @param {number} height
* @param {number} width
* @param {number} format
* @param {number} quality
* @returns {Uint8Array}
*/
export function convert(rgba: Uint8Array, height: number, width: number, format: number, quality: number): Uint8Array;
/**
* @param {Uint8Array} buffer
* @returns {Img}
*/
export function image_from_buff(buffer: Uint8Array): Img;
/**
* @param {string} path
* @param {Uint8Array} buffer
* @param {number} height
* @param {number} width
* @param {number} color
*/
export function save_img(path: string, buffer: Uint8Array, height: number, width: number, color: number): void;
/**
*/
export enum ColorType {
/**
* Pixel is 8-bit luminance
*/
  L8 = 0,
/**
* Pixel is 8-bit luminance with an alpha channel
*/
  La8 = 1,
/**
* Pixel contains 8-bit R, G and B channels
*/
  Rgb8 = 2,
/**
* Pixel is 8-bit RGB with an alpha channel
*/
  Rgba8 = 3,
/**
* Pixel is 16-bit luminance
*/
  L16 = 4,
/**
* Pixel is 16-bit luminance with an alpha channel
*/
  La16 = 5,
/**
* Pixel is 16-bit RGB
*/
  Rgb16 = 6,
/**
* Pixel is 16-bit RGBA
*/
  Rgba16 = 7,
/**
* Pixel is 32-bit float RGB
*/
  Rgb32F = 8,
/**
* Pixel is 32-bit float RGBA
*/
  Rgba32F = 9,
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
