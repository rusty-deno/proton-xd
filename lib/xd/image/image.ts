// deno-lint-ignore-file
import { PathBuf } from "../../std/path.ts";
import { Img,image_from_buff } from "../../../image/lib/rs_lib.js";
import { $result,$resultSync } from "../../std/error/result/macros.ts";



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

  public static open(path: PathBuf) {
    return $result(async ()=> {
      const inner=await image_from_buff(await Deno.readFile(path),0);
      return new ImageBuffer(inner);
    });
  }
  
  public static fromURL(url: PathBuf) {
    return $result(async ()=> {
      const res=await fetch(url);
      const buff=new Uint8Array(await (await res.blob()).arrayBuffer());
      return new ImageBuffer(await image_from_buff(buff,0));
    });
  }

  public static openSync(path: PathBuf) {
    return $resultSync(()=> {
      const inner=Img.image_from_buff_sync(Deno.readFileSync(path),0);
      return new ImageBuffer(inner);
    });
  }


  /** Encodes the image data to a png image buffer */
  public pngSync() {
    return $resultSync(()=> {
      const w=new Uint8Array;
      this.inner.to_png_sync(w);
      return w;
    });
  }

  /** Encodes the image data to a gif image buffer */
  public gifSync() {
    return $resultSync(()=> {
      const w=new Uint8Array;
      this.inner.to_gif_sync(w);
      return w;
    });
  }
  
  /** Encodes the image data to a tga image buffer */
  public tgaSync() {
    return $resultSync(()=> {
      const w=new Uint8Array;
      this.inner.to_tga_sync(w);
      return w;
    });
  }
  
  /** Encodes the image data to a jpeg image buffer */
  public jpegSync(quality=100) {
    return $resultSync(()=> {
      const w=new Uint8Array;
      this.inner.to_jpeg_sync(w,quality);
      return w;
    });
  }

  
  /** Encodes the image data to a bmp image buffer */
  public bmpSync() {
    return $resultSync(this.inner.to_bmp_sync);
  }

  
  /** Encodes the image data to a ico image buffer */
  public icoSync() {
    return $resultSync(()=> {
      const w=new Uint8Array;
      this.inner.to_ico_sync(w);
      return w;
    });
  }

  /** Encodes the image data to a farbfeld image buffer */
  public farbfeldSync() {
    return $resultSync(()=> {
      const w=new Uint8Array;
      this.inner.to_farbfeld_sync(w);
      return w;
    });
  }


}
