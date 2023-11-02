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
* @param {ColorType} color_type
* @returns {string}
*/
export function save_image_sync(path: string, buff: Uint8Array, height: number, width: number, color_type: ColorType): string;
/**
* @param {string} path
* @param {Uint8Array} buff
* @param {number} height
* @param {number} width
* @param {ColorType} color_type
* @param {Format} format
* @returns {string}
*/
export function save_image_wtih_format_sync(path: string, buff: Uint8Array, height: number, width: number, color_type: ColorType, format: Format): string;
/**
* @param {string} path
* @param {Uint8Array} buff
* @param {number} height
* @param {number} width
* @param {ColorType} color_type
* @returns {Promise<string>}
*/
export function save_image(path: string, buff: Uint8Array, height: number, width: number, color_type: ColorType): Promise<string>;
/**
* @param {string} path
* @param {Uint8Array} buff
* @param {number} height
* @param {number} width
* @param {ColorType} color_type
* @param {Format} format
* @returns {Promise<string>}
*/
export function save_image_wtih_format(path: string, buff: Uint8Array, height: number, width: number, color_type: ColorType, format: Format): Promise<string>;
/**
*/
export enum Format {
/**
* An Image in PNG Format
*/
  Png = 0,
/**
* An Image in JPEG Format
*/
  Jpeg = 1,
/**
* An Image in GIF Format
*/
  Gif = 2,
/**
* An Image in WEBP Format
*/
  WebP = 3,
/**
* An Image in general PNM Format
*/
  Pnm = 4,
/**
* An Image in TIFF Format
*/
  Tiff = 5,
/**
* An Image in TGA Format
*/
  Tga = 6,
/**
* An Image in DDS Format
*/
  Dds = 7,
/**
* An Image in BMP Format
*/
  Bmp = 8,
/**
* An Image in ICO Format
*/
  Ico = 9,
/**
* An Image in Radiance HDR Format
*/
  Hdr = 10,
/**
* An Image in OpenEXR Format
*/
  OpenExr = 11,
/**
* An Image in farbfeld Format
*/
  Farbfeld = 12,
/**
* An Image in AVIF format.
*/
  Avif = 13,
/**
* An Image in QOI format.
*/
  Qoi = 14,
}
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
