// deno-lint-ignore-file
import { PathBuf } from "../../std/path.ts";
import { Img,image_from_buff } from "../../../image/lib/rs_lib.js";
import { $result,$resultSync } from "../../std/error/result/macros.ts";
import { CompressionType,Filter } from "../mod.ts";



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

  constructor(img: RGBAImage|Img) {
    if(img instanceof Img) {
      this.inner=img;
      return;
    }
    this.inner=new Img(img.rgba,img.height,img.width);
  }

  public static open(path: PathBuf,isBrga: boolean=false) {
    return $result(async ()=> {
      const inner=await image_from_buff(await Deno.readFile(path),isBrga);
      return new ImageBuffer(inner);
    });
  }
  
  public static fromURL(url: PathBuf,isBrga: boolean=false) {
    return $result(async ()=> {
      const res=await fetch(url);
      const buff=new Uint8Array(await (await res.blob()).arrayBuffer());
      return new ImageBuffer(await image_from_buff(buff,isBrga));
    });
  }

  public static openSync(path: PathBuf,isBrga: boolean=false) {
    return $resultSync(()=> {
      const inner=Img.image_from_buff_sync(Deno.readFileSync(path),isBrga);
      return new ImageBuffer(inner);
    });
  }


  /** Encodes the image data to a png image buffer */
  public pngSync(compression: CompressionType,filter: Filter) {
    return $resultSync(()=> this.inner.to_png_sync(compression_to_u8(compression),filter_to_u8(filter)));
  }

  /** Encodes the image data to a gif image buffer */
  public gifSync() {
    return $resultSync(this.inner.to_gif_sync);
  }
  
  /** Encodes the image data to a tga image buffer */
  public tgaSync() {
    return $resultSync(this.inner.to_tga_sync);
  }
  
  /** Encodes the image data to a jpeg image buffer */
  public jpegSync(quality=100) {
    return $resultSync(()=> this.inner.to_jpeg_sync(quality));
  }

  
  /** Encodes the image data to a bmp image buffer */
  public bmpSync() {
    return $resultSync(this.inner.to_bmp_sync);
  }

  
  /** Encodes the image data to a ico image buffer */
  public icoSync() {
    return $resultSync(this.inner.to_ico_sync);
  }

  /** Encodes the image data to a farbfeld image buffer */
  public farbfeldSync() {
    return $resultSync(this.inner.to_farbfeld_sync);
  }


}


function compression_to_u8(compression: CompressionType) {
  switch(compression) {
    case "Best": return 2;
    case "Fast": return 1;
    default: return 0;
  }
}

function filter_to_u8(filter: Filter) {
  switch(filter) {
    case "Sub": return 1;
    case "Up": return 2;
    case "Avg": return 3;
    case "Paeth": return 4;
    case "Adaptive": return 5;
    default: return 0;
  }
}


