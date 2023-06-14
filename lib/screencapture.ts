import * as png from "https://deno.land/x/pngs@0.1.1/mod.ts";
import JPEG from "https://deno.land/x/jpeg@v1.0.1/mod.ts";
import * as lib from "../bindings/bindings.ts";
// import * as imgs from "https://deno.land/x/get_pixels@v1.2.0/mod.ts";


export default class ScreenCapturer {
  

  public static screenshot=(x: number,y: number)=> new Image(JSON.parse(lib.screenshot(x,y)));

  
}

export class Image {
  public width: number;
  public height: number;
  private bytes: Uint8Array;

  constructor(img: ImageBuffer) {
    this.height=img.height;
    this.width=img.width;
    this.bytes=img.bytes;
  }

  public png=()=> png.encode(this.bytes,this.width,this.height,{
    depth: png.BitDepth.Eight,
    color: png.ColorType.RGBA
  });

  public jpeg=()=> new Uint8Array(JPEG.encode({data: this.bytes,width: this.width,height: this.height}).data);
}

export interface ImageBuffer {
  height: number;
  width: number;
  bytes: Uint8Array;
}


