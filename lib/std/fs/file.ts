import { $result,$resultSync } from "../error/result/mod.ts";
import { $option,$optionSync } from "../error/option/mod.ts";

export class FsFile {
  private fs: Deno.FsFile;
  constructor(f: Deno.FsFile) {
    this.fs=f;
  }
  

  public static create(path: string) {
    return $result(async ()=> new FsFile(await Deno.create(path)));
  }

  public static createSync(path: string) {
    return $resultSync(()=> new FsFile(Deno.createSync(path)));
  }
  
  public static open(path: string,options?: Deno.OpenOptions) {
    return $result(async ()=> new FsFile(await Deno.open(path,options)));
  }

  public static openSync(path: string,options?: Deno.OpenOptions) {
    return $resultSync(()=> new FsFile(Deno.openSync(path,options)));
  }


  public metadata() {
    return $result(async ()=>  await this.fs.stat());
  }

  public metadataSync() {
    return $resultSync(()=> this.fs.statSync());
  }

  public truncate(len?: number) {
    return $result(async ()=> await this.fs.truncate(len));
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

  public write(buf: Uint8Array) {
    return $result(()=> this.fs.write(buf));
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




