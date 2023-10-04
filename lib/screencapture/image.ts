import { lib } from "../../bindings/bindings.ts";
import { $todo } from "../mod.ts";
import { $result } from "../std/error/result/macros.ts";
import { PathBuf } from "../std/path.ts";

export interface RGBAImage {
  height: number;
  width: number
  rgba: Uint8Array;
}

/**
 * * This is an image represented by a width and height and a container of channel data.
 * * It provides direct access to its pixels and various convertions
 */
export class ImageBuffer implements RGBAImage {
  public width: number;
  public height: number;
  public rgba: Uint8Array;

  constructor(img: RGBAImage) {
    this.rgba=img.rgba;
    this.height=img.height;
    this.width=img.width;
  }

  /**
   * Encodes the image data to a png image buffer
   */
  public png() {
    return readPointer(lib.symbols.convert(this.rgba,this.rgba.length,this.width,this.height,0,100));
  }
  
  /**
   * Encodes the image data to a jpeg image buffer
   */
  public jpeg(quality=100) {
    const ptr=lib.symbols.convert(this.rgba,this.rgba.length,this.width,this.height,69,quality);
    console.log(ptr);
    
    return readPointer(ptr);
  }

  public static async open(path: PathBuf) {
    return await $result(async ()=> {
      const _blob=await Deno.readFile(path);
      $todo();
    });
  }
  
  public static async fromURL(url: PathBuf) {
    return await $result(async ()=> {
      const res=await fetch(url);
      const _buff=await (await res.blob()).arrayBuffer();
      

    });
  }
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