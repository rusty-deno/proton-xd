// deno-lint-ignore-file
import { $result } from "../../std/error/result/macros.ts";
import { PathBuf } from "../../std/path.ts";
import { $unimplemented } from "../../mod.ts";
import * as lib from "../../../image/lib/rs_lib.js";
import { Img } from "../../../image/lib/rs_lib.js";


export interface RGBAImage {
  height: number;
  width: number
  rgba: Uint8Array;
}

/**
 * * This is an image represented by a width and height and a container of channel data.
 * * It provides direct access to its pixels and various convertions
 */
export class ImageBuffer {
  private inner: Img;

  constructor({ height,width,rgba }: RGBAImage) {
    this.inner=new Img(rgba,height,width);
  }

  /** Encodes the image data to a png image buffer */
  public pngSync() {
    const w=new Uint8Array;
    this.inner.to_png_sync(w);
    return w;
  }

  /** Encodes the image data to a gif image buffer */
  public gifSync() {
    
  }
  
  /** Encodes the image data to a tga image buffer */
  public tgaSync() {
    
  }
  
  /** Encodes the image data to a jpeg image buffer */
  public jpegSync(quality=100) {
    
  }

  
  /** Encodes the image data to a bmp image buffer */
  public bmpSync() {
    
  }

  
  /** Encodes the image data to a ico image buffer */
  public icoSync() {
    
  }

  /** Encodes the image data to a farbfeld image buffer */
  public farbfeldSync() {
    
  }

  private convert(format: 0|1|2|3|4|5|6,quality=100): Promise<Uint8Array> {
    return $unimplemented();
  }

  public static async open(path: PathBuf) {
    // return await $result(async ()=> {
    //   const buff=await Deno.readFile(path);
    //   const { height,width,rgba }=await await lib.image_from_buff(buff,10);
    //   return new ImageBuffer({ height,width,rgba });
    // });
  }
  
  public static async fromURL(url: PathBuf) {
    // return await $result(async ()=> {
    //   const res=await fetch(url);
    //   const blob=await res.blob();
    //   const { height,width,rgba }={};//image_from_buff(new Uint8Array(await blob.arrayBuffer()),10);
    //   return new ImageBuffer({ height,width,rgba });
    // });
  }
}
