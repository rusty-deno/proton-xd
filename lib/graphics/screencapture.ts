import JPEG from "npm:jpeg-js";
import * as png from "https://deno.land/x/pngs@0.1.1/mod.ts";
import * as lib from "../../bindings/bindings.ts";

export default class ScreenCapturer {
  
  /**
   * 
   * @param {number} x x axis
   * @param {number} y y axis
   * @param {number} delay for delayed screenshots
   * @returns {Promise<Image>}
   */
  public static screenshot=async (x: number,y: number,delay: number=0): Promise<Image>=> new Image(JSON.parse(await lib.screenshot(x,y,delay/1000)));
  
   /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} delay 
   * @returns {Image}
   */
  public static screenshotSync=(x: number,y: number,delay: number=0): Image=> new Image(JSON.parse(lib.screenshot_sync(x,y,delay/1000)));
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

  public png=()=> png.encode(this.bytes,this.width,this.height,{
    depth: png.BitDepth.Eight,
    color: png.ColorType.RGBA
  });
  
  public jpeg=(quality: number=100)=> new Uint8Array(JPEG.encode({data: this.bytes,width: this.width,height: this.height},quality).data);
}

export interface ImageBuffer {
  height: number;
  width: number;
  bytes: Uint8Array;
}


