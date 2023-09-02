import { $result,$resultSync } from "../error/result/mod.ts";
import { $option,$optionSync } from "../error/option/mod.ts";

export class file {
  private fs: Deno.FsFile;
  constructor(f: Deno.FsFile) {
    this.fs=f;
  }
  

  public static async create(path: string) {
    return await $result(async ()=> new file(await Deno.create(path)));
  }

  public static createSync(path: string) {
    return $resultSync(()=> new file(Deno.createSync(path)));
  }
  
  public static async open(path: string,options?: Deno.OpenOptions) {
    return await $result(async ()=> new file(await Deno.open(path,options)));
  }

  public static openSync(path: string,options?: Deno.OpenOptions) {
    return $resultSync(()=> new file(Deno.openSync(path,options)));
  }

  public async metadata() {
    return await $result(async ()=>  await this.fs.stat());
  }

  public metadataSync() {
    return $resultSync(()=> this.fs.statSync());
  }

  public async truncate(len?: number) {
    return await $result(async ()=> await this.fs.truncate(len));
  }

  public truncateSync(len?: number) {
    return $resultSync(()=> this.fs.truncateSync(len));
  }
  
  public close() {
    this.fs.close();
  }

  public async read() {
    return await $option(async ()=> {
      const buf=new Uint8Array;
      const bytes=await this.fs.read(buf);
      return bytes==null?bytes:buf;
    });
  }

  public readSync() {
    return $optionSync(()=> {
      const buf=new Uint8Array;
      const bytes=this.fs.readSync(buf);
      return bytes==null?bytes:buf;
    });
  }

  public async write(buf: Uint8Array) {
    return await $result(()=> this.fs.write(buf));
  }

  public writeSync(buf: Uint8Array) {
    return $resultSync(()=> this.fs.writeSync(buf));
  }

  public get readable() {
    return this.fs.readable;
  }

  public get writable() {
    return this.fs.writable;
  }

}




