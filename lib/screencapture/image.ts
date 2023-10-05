import { $result } from "../std/error/result/macros.ts";
import { PathBuf } from "../std/path.ts";
import { instantiate,convert, image_from_buff } from "../../image/lib/rs_lib.generated.js";

await instantiate();


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

  /** Encodes the image data to a png image buffer */
  public png() {
    return this.convert(0);
  }

  /** Encodes the image data to a gif image buffer */
  public gif() {
    return this.convert(1);
  }
  
  /** Encodes the image data to a tga image buffer */
  public tga() {
    return this.convert(2);
  }
  
  /** Encodes the image data to a jpeg image buffer */
  public jpeg(quality=100) {
    return this.convert(3,quality);
  }

  
  /** Encodes the image data to a bmp image buffer */
  public bmp() {
    return this.convert(4);
  }

  
  /** Encodes the image data to a ico image buffer */
  public ico() {
    return this.convert(5);
  }

  /** Encodes the image data to a farbfeld image buffer */
  public farbfeld() {
    return this.convert(6);
  }

  private convert(format: 0|1|2|3|4|5|6,quality=100) {
    return convert(this.rgba,this.height,this.width,format,quality);
  }

  public static async open(path: PathBuf) {
    return await $result(async ()=> {
      const buff=await Deno.readFile(path);
      const { height,width,rgba }=image_from_buff(buff);
      return new ImageBuffer({ height,width,rgba });
    });
  }
  
  public static async fromURL(url: PathBuf) {
    return await $result(async ()=> {
      const res=await fetch(url);
      const blob=await res.blob();
      const { height,width,rgba }=image_from_buff(new Uint8Array(await blob.arrayBuffer()));
      return new ImageBuffer({ height,width,rgba });
    });
  }
}
