import { ImageBuffer } from './image.ts';
import { PathBuf } from '../../std/path.ts';
import { ImageFormat } from '../types/image.ts';
import { $result,$resultSync } from "../../std/error/result/macros.ts";



export class Screenshot extends ImageBuffer {
  constructor(bytes: Uint8Array,height: number,width: number) {
    super({ bytes,height,width },true);
  }


  public save(path: PathBuf) {
    return $result(async ()=> {
      const buf=await this[guessFormat(path)]().unwrapOrThrow();

      await Deno.writeFile(path,buf);
    });
  }

  public saveSync(path: PathBuf) {
    return $resultSync(()=> {
      const buf=this[`${guessFormat(path)}Sync`]().unwrapOrThrow();

      Deno.writeFileSync(path,buf);
    });
  }

  public saveWithFormat(path: PathBuf,format: ImageFormat) {
    return $result(async ()=> {
      const buf=await this[format]().unwrapOrThrow();

      await Deno.writeFile(ensurePath(path,format),buf);
    });
  }
  
  public saveWithFormatSync(path: PathBuf,format: ImageFormat) {
    return $resultSync(()=> {
      const buf=this[`${format}Sync`]().unwrapOrThrow();

      Deno.writeFileSync(ensurePath(path,format),buf);
    });
  }


}

function ensurePath(path: PathBuf,format: ImageFormat) {
  const str=path.toString();
  return str.endsWith(`.${format}`)?str:`${str}.${format}`;
}

function guessFormat(path: PathBuf) {
  const str=path.toString();
  return str.substring(str.lastIndexOf(".")) as ImageFormat;
}

