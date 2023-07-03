import Result,{Err,Ok} from '../io/result.ts';

type PathBuf=string|URL;


namespace fs {
  




  export async function canonicalize(path: PathBuf) {
    return Res(()=> Deno.realPath(path));
  }

  export function canonicalizeSync(path: PathBuf) {
    return ResSync(()=> Deno.realPathSync(path));
  }
  
  export async function copy(from: PathBuf,to: PathBuf): Promise<Result<void,Error>> {
    return Res<void>(()=> Deno.copyFile(from,to));
  }

  export function copySync(from: PathBuf,to: PathBuf) {
    return ResSync(()=> Deno.copyFileSync(from,to));
  }

  export async function createDir(path: PathBuf,options?: Deno.MkdirOptions) {
    return Res(()=> Deno.mkdir(path,options));
  }
  
  export function createDirSync(path: PathBuf,options?: Deno.MkdirOptions) {
    return ResSync(()=> Deno.mkdirSync(path,options));
  }


}

async function Res<T>(f: ()=> Promise<T>) {
  try {
    return Ok<T>(await f());
  } catch (error) {
    return Err<T>(error);
  }
}

function ResSync<T>(f: ()=> T) {
  try {
    return Ok<T>(f());
  } catch (error) {
    return Err<T>(error);
  }
}



export default fs;