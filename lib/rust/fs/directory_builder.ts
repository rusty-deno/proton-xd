import { PathBuf } from '../path.ts';
import { createDirSync,createDir } from './mod.ts';


export class DirBuilder {
  public async create(path: PathBuf,options: Deno.MkdirOptions) {
    return createDir(path,options);
  }

  public createSync(path: PathBuf,options: Deno.MkdirOptions) {
    return createDirSync(path,options);
  }
}



