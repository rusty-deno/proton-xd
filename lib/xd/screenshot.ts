import { ImageBuffer } from "./mod.ts";


export class Screenshot extends ImageBuffer {

  public async save(path: string) {
    await Deno.writeFile(path,new Uint8Array());
  }



}



