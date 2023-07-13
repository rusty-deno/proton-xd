import {instantiate,convert} from "../../bindings/encoder.generated.js";

await instantiate();

export interface ImageBuffer {
  height: number;
  width: number;
  bytes: Uint8Array;
}

export class Image {
  public width: number;
  public height: number;
  public readonly bytes: Uint8Array;

  constructor(img: ImageBuffer) {
    this.height=img.height;
    this.width=img.width;
    this.bytes=img.bytes;
  }
  
  /**
   * @returns {Uint8Array} encodes the rgba bytes into png format
   */
  public png=(): Uint8Array=> convert(this.bytes,this.height,this.width,"image/png",100);
  
  /**
   * @param {number} quality affects the quality of the image.. default is 100
   * @returns {Uint8Array}
   */
  public jpeg=(quality: number=100): Uint8Array=> convert(this.bytes,this.height,this.width,"image/jpeg",quality);
}