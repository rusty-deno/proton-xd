import { symbols as lib } from "../../bindings/bindings.ts";

export type RGBImage={
  height: number;
  width: number
  bytes: Uint8Array;
};

/**
 * This is an image represented by a width and height and a container of channel data.
 * It provides direct access to its pixels and various convertions
 */
export class ImageBuffer {
  public width: number;
  public height: number;
  public bytes: Uint8Array;

  constructor(img: RGBImage) {
    this.bytes=img.bytes;
    this.height=img.height;
    this.width=img.width;
  }

  /**
   * Encodes the image data to a png image buffer
   */
  public png=(): Uint8Array=> readPointer(lib.convert(this.bytes,this.bytes.length,this.width,this.height,0,100));
  
  /**
   * Encodes the image data to a jpeg image buffer
   */
  public jpeg=(quality=100): Uint8Array=> readPointer(lib.convert(this.bytes,this.bytes.length,this.width,this.height,69,quality));
}

function readPointer(v: Deno.PointerValue): Uint8Array {
  if(v===null) return new Uint8Array;

  const ptr=new Deno.UnsafePointerView(v);
  const lengthBe=new Uint8Array(4);

  const view=new DataView(lengthBe.buffer);
  ptr.copyInto(lengthBe,0);

  const buf=new Uint8Array(view.getUint32(0));
  ptr.copyInto(buf,4);

  return buf;
}