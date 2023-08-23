import {instantiate,convert} from "../../bindings/encoder.generated.js";

await instantiate();


export type RawImage={
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

  constructor(img: RawImage) {
    this.bytes=img.bytes;
    this.height=img.height;
    this.width=img.width;
  }
  
  public png=(): Uint8Array=> convert(this.bytes,this.height,this.width,"image/png",100);
  
  public jpeg=(quality=100): Uint8Array=> convert(this.bytes,this.height,this.width,"image/jpeg",quality);
}

