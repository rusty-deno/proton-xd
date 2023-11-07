// deno-lint-ignore-file
/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} buff
* @param {number} color_type
* @returns {Promise<Img>}
*/
export function image_from_buff(buff: Uint8Array, color_type: number): Promise<Img>;
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
* @param {number} color_type
* @returns {Img}
*/
  static image_from_buff_sync(buff: Uint8Array, color_type: number): Img;
/**
* @param {Uint8Array} w
*/
  to_png_sync(w: Uint8Array): void;
/**
* @param {Uint8Array} w
* @param {number} quality
*/
  to_jpeg_sync(w: Uint8Array, quality: number): void;
/**
* @param {Uint8Array} w
*/
  to_gif_sync(w: Uint8Array): void;
/**
* @param {Uint8Array} w
*/
  to_ico_sync(w: Uint8Array): void;
/**
* @returns {Uint8Array}
*/
  to_bmp_sync(): Uint8Array;
/**
* @param {Uint8Array} w
*/
  to_tga_sync(w: Uint8Array): void;
/**
* @param {Uint8Array} w
*/
  to_farbfeld_sync(w: Uint8Array): void;
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
