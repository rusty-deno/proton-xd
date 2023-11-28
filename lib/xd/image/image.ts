import { PathBuf } from "../../std/path.ts";
import { PngCompressionType,PngFilter } from "../types/image.ts";
import { Img } from "../../../image/lib/rs_lib.js";
import * as lib from "../../../image/lib/rs_lib.js";
import { $result,$resultSync } from "../../std/error/result/macros.ts";
import { $unimplemented, Result } from "../../mod.ts";
import { AsyncResult } from '../../std/error/result/async_result.ts';



export interface RGBAImage {
  height: number;
  width: number
  bytes: Uint8Array;
}

/**
 * This is an image represented by a width and height and a container of channel data.
 * 
 * It provides direct access to its pixels and various convertions
 */
export class ImageBuffer {
  private inner: Img;

  constructor(img: RGBAImage|Img,isBgra=false) {
    if(img instanceof Img) {
      this.inner=img;
      return;
    }
    this.inner=new Img(img.bytes,img.height,img.width,isBgra);
  }

  public static open(path: PathBuf,isBrga=false) {
    return $result(async ()=> {
      const inner=await lib.image_from_buff(await Deno.readFile(path),isBrga);
      return new ImageBuffer(inner);
    });
  }
  
  public static fromURL(url: PathBuf,isBrga=false) {
    return $result(async ()=> {
      const res=await fetch(url);
      const buff=new Uint8Array(await (await res.blob()).arrayBuffer());
      return new ImageBuffer(await lib.image_from_buff(buff,isBrga));
    });
  }

  public static openSync(path: PathBuf,isBrga=false) {
    return $resultSync(()=> {
      const inner=Img.image_from_buff_sync(Deno.readFileSync(path),isBrga);
      return new ImageBuffer(inner);
    });
  }
  
  public get height() {
    return this.inner.height;
  }
  
  public get width() {
    return this.inner.width;
  }

  public get bytes() {
    return this.inner.bytes;
  }


  /** Encodes the image data to a png image buffer */
  public png(compression: PngCompressionType="Default",filter: PngFilter="NoFilter") {
    return $result(()=> lib.to_png(this.inner,compression_to_u8(compression),filter_to_u8(filter)));
  }

  /** Encodes the image data to a png image buffer syncrobyously */
  public pngSync(compression: PngCompressionType="Default",filter: PngFilter="NoFilter") {
    return $resultSync(()=> this.inner.to_png_sync(compression_to_u8(compression),filter_to_u8(filter)));
  }

  /** Encodes the image data to a gif image buffer */
  public gif() {
    return $result(()=> lib.to_gif(this.inner));
  }

  /** Encodes the image data to a gif image buffer syncrobyously */
  public gifSync() {
    return $resultSync(this.inner.to_gif_sync);
  }

  /** Encodes the image data to a tga image buffer */
  public tga() {
    return $result(()=> lib.to_tga(this.inner));
  }
  
  /** Encodes the image data to a tga image buffer syncronyously */
  public tgaSync() {
    return $resultSync(this.inner.to_tga_sync);
  }

  /** Encodes the image data to a jpeg image buffer */
  public jpeg(quality=100) {
    return $result(()=> lib.to_jpeg(this.inner,quality));
  }

  /** Encodes the image data to a jpeg image buffer syncronyously */
  public jpegSync(quality=100) {
    return $resultSync(()=> this.inner.to_jpeg_sync(quality));
  }

  public webp(): AsyncResult<Uint8Array,Error> {
    return $unimplemented();
  }

  public webpSync(): Result<Uint8Array,Error> {
    return $unimplemented();
  }

  /** Encodes the image data to a bmp image buffer */
  public bmp() {
    return $result(()=> lib.to_bmp(this.inner));
  }

  /** Encodes the image data to a bmp image buffer syncronyously */
  public bmpSync() {
    return $resultSync(this.inner.to_bmp_sync);
  }

  /** Encodes the image data to a ico image buffer */
  public ico() {
    return $result(()=> lib.to_ico(this.inner));
  }

  /** Encodes the image data to a ico image buffer syncronyously */
  public icoSync() {
    return $resultSync(this.inner.to_ico_sync);
  }

  /** Encodes the image data to a farbfeld image buffer */
  public farbfeld() {
    return $result(()=> lib.to_farbfeld(this.inner));
  }

  /** Encodes the image data to a farbfeld image buffer syncronyously */
  public farbfeldSync() {
    return $resultSync(this.inner.to_farbfeld_sync);
  }

  public toRgbaImage(): RGBAImage {
    return this.inner;
  }
}


function compression_to_u8(compression: PngCompressionType) {
  switch(compression) {
    case "Best": return 2;
    case "Fast": return 1;
    default: return 0;
  }
}

function filter_to_u8(filter: PngFilter) {
  switch(filter) {
    case "Sub": return 1;
    case "Up": return 2;
    case "Avg": return 3;
    case "Paeth": return 4;
    case "Adaptive": return 5;
    default: return 0;
  }
}


