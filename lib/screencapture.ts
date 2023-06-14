import JPEG from "npm:jpeg-js";
import * as png from "https://deno.land/x/pngs@0.1.1/mod.ts";
import * as lib from "../bindings/bindings.ts";

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

    for(let i=0;i<this.bytes.length;i+=4) {
      const b=this.bytes[i];
      const r=this.bytes[i+2];

      this.bytes[i]=r;
      this.bytes[i+2]=b;
      this.bytes[i+3]=255;
    }
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


