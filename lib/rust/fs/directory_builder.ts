import { PathBuf } from '../path.ts';
import fs from './mod.ts';


export default class DirBuilder {
  public async create(path: PathBuf,options: Deno.MkdirOptions) {
    return fs.createDir(path,options);
  }

  public createSync(path: PathBuf,options: Deno.MkdirOptions) {
    return fs.createDirSync(path,options);
  }
}



