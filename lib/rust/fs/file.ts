import { Res, ResSync } from "../io/result.ts";
import { Opt,OptSync } from "../io/option.ts";


export default class file {
  private fs: Deno.FsFile;
  private constructor(f: Deno.FsFile) {
    this.fs=f;
  }
  

  public static async create(path: string) {
    return Res(async ()=> new file(await Deno.create(path)));
  }

  public static createSync(path: string) {
    return ResSync(()=> new file(Deno.createSync(path)));
  }
  
  public static async open(path: string,options?: Deno.OpenOptions) {
    return Res(async ()=> new file(await Deno.open(path,options)));
  }

  public static openSync(path: string,options?: Deno.OpenOptions) {
    return ResSync(()=> new file(Deno.openSync(path,options)));
  }

  public async metadata() {
    return Res(async ()=>  await this.fs.stat());
  }

  public metadataSync() {
    return ResSync(()=> this.fs.statSync());
  }

  public async truncate(len?: number) {
    return Res(async ()=> await this.fs.truncate(len));
  }

  public truncateSync(len?: number) {
    return ResSync(()=> this.fs.truncateSync(len));
  }
  
  public close() {
    this.fs.close();
  }

  public async read() {
    return Opt(async ()=> {
      const buf=new Uint8Array;
      const bytes=await this.fs.read(buf);
      return bytes==null?bytes:buf;
    });
  }

  public readSync() {
    return OptSync(()=> {
      const buf=new Uint8Array;
      const bytes=this.fs.readSync(buf);
      return bytes==null?bytes:buf;
    });
  }

  public async write(buf: Uint8Array) {
    return Res(async ()=> this.fs.write(buf));
  }

  public writeSync(buf: Uint8Array) {
    return ResSync(()=> this.fs.writeSync(buf));
  }

  public get readable() {
    return this.fs.readable;
  }

  public get writable() {
    return this.fs.writable;
  }

}




