// deno-lint-ignore-file
/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} buff
* @param {number} color_type
* @returns {Promise<Promise<any>>}
*/
export function image_from_buff(buff: Uint8Array, color_type: number): Promise<Promise<any>>;
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
  to_png(w: Uint8Array): void;
/**
* @param {Uint8Array} w
* @param {number} quality
*/
  to_jpeg(w: Uint8Array, quality: number): void;
/**
* @param {Uint8Array} w
*/
  to_gif(w: Uint8Array): void;
/**
* @param {Uint8Array} w
*/
  to_ico(w: Uint8Array): void;
/**
* @returns {Uint8Array}
*/
  to_bmp(): Uint8Array;
/**
* @param {Uint8Array} w
*/
  to_tga(w: Uint8Array): void;
/**
* @param {Uint8Array} w
*/
  to_farbfeld(w: Uint8Array): void;
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
