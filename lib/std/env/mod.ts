import { Option,Result } from "../error/mod.ts";
import { PathBuf } from "../path.ts";
import { $resultSync } from "../error/result/mod.ts";
import { HashMap } from '../collections/hash_map/hash_map.ts';




export type Var=[key: string,value: string];
export const args=Deno.args;

/**
 * Returns a {@linkcode Result} of the string representation of current working directory.
 * 
 * Err varient {@linkcode Deno.errors.NotFound} - if directory not available.
 *
 * If the current directory can be reached via multiple paths (due to symbolic
 * links), `currentDir()` may return any one of them.
 *
 * ```ts
 * const cwd=env.currentDir();
 * console.log(cwd.unwrap());
 * ```
 *
 * Requires `allow-read` permission.
 *
 * @tags allow-read
 * @category Runtime Environment
 */
export function currentDir() {
  return $resultSync(()=> Deno.cwd());
}

/**
 * Returns a {@linkcode Result} of the path to the current deno executable.
 * 
 * Err varient {@linkcode Deno.errors.NotFound}
 *
 * ```ts
 * console.log(env.currentExe().unwrap());  // e.g. "/home/father/.local/bin/deno"
 * ```
 *
 * Requires `allow-read` permission.
 *
 * @tags allow-read
 * @category Runtime Environment
 */
export function currentExe(): Result<string,Deno.errors.NotFound> {
  return $resultSync(()=> Deno.execPath());
}

/**
 * Returns a {@linkcode Option} of the path to the home directory.
 *
 * ```ts
 * console.log(env.homeDir().unwrap());  // e.g. "/home"
 * ```
 *
 * Requires `allow-read` permission.
 *
 * @tags allow-read
 * @category Runtime Environment
 */
export function homeDir(): Option<string> {
  return new Option(Deno.env.get("HOME"));
}

/** Deletes the value of an environment variable.
 *
 * ```ts
 * env.set("SOME_VAR", "Value");
 * $assertEq(env.removeVar("SOME_VAR"),Some("Value"));
 * ```
 *
 * Requires `allow-env` permission.
 *
 * @tags allow-env
 */
export function removeVar(k: string): Option<string> {
  const var_=getVar(k);
  Deno.env.delete(k);
  return var_;
}

/**
 * Changes the current working directory to the specified path.
 * 
 * Err varient {@linkcode Deno.errors.NotFound} - if directory not found.
 * 
 * Err varient {@linkcode Deno.errors.PermissionDenied} - if the user does not have
 * operating system file access rights.
 *
 * ```ts
 * env.setCurrentDir("/home/userA");
 * env.setCurrentDir("../userB");
 * env.setCurrentDir("C:\\Program Files (x86)\\Java");
 * ```
 * 
 * Requires `allow-read` permission.
 *
 * @tags allow-read
 * @category Runtime Environment
 */
export function setCurrentDir(path: PathBuf) {
  return $resultSync(()=> Deno.chdir(path));
}

/** Sets the value of an environment variable.
 *
 * ```ts
 * env.setVar("SOME_VAR","Value");
 * $assertEq(env.getVar("SOME_VAR"),Some("Value"));
 * ```
 *
 * Requires `allow-env` permission.
 *
 * @tags allow-env
 */
export function setVar(key: string,value: string) {
  Deno.env.set(key,value);
}

/** Retrieves the value of an environment variable.
 * 
 * ```ts
 * console.log(Deno.env.get("HOME").unwrap());// e.g. outputs "/home/alice"
 * console.log(Deno.env.get("69").unwrap());
 * ```
 *
 * Requires `allow-env` permission.
 *
 * @tags allow-env
 */
export function getVar(key: string) {
  return new Option(Deno.env.get(key));
}

/** Returns a snapshot of the environment variables at invocation as a
 * simple {@linkcode HashMap}
 *
 * ```ts
 * env.set("TEST_VAR", "69");
 * const envMap=env.getMap();
 * $assertEq(envMap.get("TEST_VAR",Some("69")));
 * ```
 *
 * Requires `allow-env` permission.
 *
 * @tags allow-env
 */
export function getMap(): HashMap<string,string> {
  return HashMap.formRecord<string,string>(Deno.env.toObject());
}