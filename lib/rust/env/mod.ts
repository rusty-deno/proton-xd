import { Res,ResSync } from "../io/result.ts";
import { PathBuf } from "../path.ts";
import Option from '../io/option.ts';

export type Var=[key: string,value: string];

namespace env {

  export const args=Deno.args;
  
  export function currentDir() {
    return ResSync(()=> Deno.cwd());
  }

  export function currentExe() {
    return ResSync(()=> Deno.execPath());
  }

  export function homeDir() {
    return ResSync(()=> Deno.env.get("HOME"));
  }

  export function joinPaths(...paths: string[]) {
    return paths.join(Deno.build.os==="windows"?"\\":"/");
  }

  export function removeVar(k: string) {
    Deno.env.delete(k);
  }

  export function setCurrentDir(path: PathBuf) {
    return ResSync(()=> Deno.chdir(path));
  }

  export function setVar(key: string,value: string) {
    Deno.env.set(key,value);
  }
  
  export function getVar(key: string) {
    return new Option(Deno.env.get(key));
  }
  
  export function getAllVars(): Iterable<Var> {
    const object=Deno.env.toObject();
    
    return {
      *[Symbol.iterator](): Iterator<Var> {
        for(const key in object) yield [key,object[key]];
      }
    };
  }
  

}

export default env;
export const {
  args,
  currentDir,
  currentExe,
  getAllVars,
  getVar,
  homeDir,
  joinPaths,
  removeVar,
  setCurrentDir,
  setVar
}=env;