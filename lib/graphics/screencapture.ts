import * as lib from "../../bindings/bindings.ts";
import {instantiate,convert} from "../../bindings/encoder.generated.js";

await instantiate();

namespace ScreenCapturer {
  /**
   * @param {number} x represents x-axis
   * @param {number} y represents y-axis
   * @param {number} delay for delayed screenshots
   * @returns {Promise<Image>}
   */
  export const screenshot=async (x: number,y: number,delay: number=0): Promise<Image>=> new Image(JSON.parse(await lib.screenshot(x,y,delay/1000)));
  
   /**
   * @param {number} x represents x-axis
   * @param {number} y represents y-axis
   * @param {number} delay for delayed screenshots
   * @returns {Image}
   */
  export const screenshotSync=(x: number,y: number,delay: number=0): Image=> new Image(JSON.parse(lib.screenshot_sync(x,y,delay/1000)));
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
   * @param {number} quality affects the quality of tthe image default is 100
   * @returns {Uint8Array}
   */
  public jpeg=(quality: number=100): Uint8Array=> convert(this.bytes,this.height,this.width,"image/jpeg",quality);
}

export interface ImageBuffer {
  height: number;
  width: number;
  bytes: Uint8Array;
}


export default ScreenCapturer;