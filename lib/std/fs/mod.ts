import { $result,$resultSync } from '../error/result/mod.ts';
import { PathBuf } from '../path.ts';
import { file } from './file.ts';

export * from "./directory_builder.ts";
export * from "./file.ts";




export function canonicalize(path: PathBuf) {
  return $result(()=> Deno.realPath(path));
}

export function canonicalizeSync(path: PathBuf) {
  return $resultSync(()=> Deno.realPathSync(path));
}

export function copy(from: PathBuf,to: PathBuf) {
  return $result<void>(()=> Deno.copyFile(from,to));
}

export function copySync(from: PathBuf,to: PathBuf) {
  return $resultSync(()=> Deno.copyFileSync(from,to));
}

export function createDir(path: PathBuf,options?: Deno.MkdirOptions) {
  return $result(()=> Deno.mkdir(path,options));
}

export function createDirSync(path: PathBuf,options?: Deno.MkdirOptions) {
  return $resultSync(()=> Deno.mkdirSync(path,options));
}

export function link(original: string,link: string) {
  return $result(()=> Deno.link(original,link));
}

export function linkSync(original: string,link: string) {
  return $resultSync(()=> Deno.linkSync(original,link));
}

export function metadata(path: PathBuf) {
  return $result(()=> Deno.stat(path));
}

export function metadataSync(path: PathBuf) {
  return $resultSync(()=> Deno.statSync(path));
}

export function readFile(path: PathBuf) {
  return $result(()=> Deno.readFile(path));
}

export function readFileSync(path: PathBuf) {
  return $resultSync(()=> Deno.readFileSync(path));
}

export function readDir(path: PathBuf) {
  return $resultSync(()=> Deno.readDir(path));
}

export function readDirSync(path: PathBuf) {
  return $resultSync(()=> Deno.readDirSync(path));
}

export function readLink(path: PathBuf) {
  return $result(()=> Deno.readLink(path));
}

export function readLinkSync(path: PathBuf) {
  return $resultSync(()=> Deno.readLinkSync(path));
}

export function readToString(path: PathBuf,options?: Deno.ReadFileOptions) {
  return $result(()=> Deno.readTextFile(path,options));
}

export function readToStringSync(path: PathBuf) {
  return $resultSync(()=> Deno.readTextFileSync(path));
}

export function removeDir(path: PathBuf,options?: Deno.RemoveOptions) {
  return $result(()=> Deno.remove(path,options));
}

export function removeDirSync(path: PathBuf,options?: Deno.RemoveOptions) {
  return $resultSync(()=> Deno.removeSync(path,options));
}

export function rename(oldpath: PathBuf,newpath: PathBuf) {
  return $result(()=> Deno.rename(oldpath,newpath));
}

export function renameSync(oldpath: PathBuf,newpath: PathBuf) {
  return $resultSync(()=> Deno.renameSync(oldpath,newpath));
}

export function chmod(path: PathBuf,mode: number) {
  return $result(()=> Deno.chmod(path,mode));
}

export function chmodSync(path: PathBuf,mode: number) {
  return $resultSync(()=> Deno.chmodSync(path,mode));
}

export function chown(path: PathBuf,uid: number|null,gid: number|null) {
  return $result(()=> Deno.chown(path,uid,gid));
}

export function chownSync(path: PathBuf,uid: number|null,gid: number|null) {
  return $resultSync(()=> Deno.chownSync(path,uid,gid));
}

export function symlinkMetadata(path: PathBuf) {
  return $result(()=> Deno.lstat(path));
}

export function symlinkMetadataSync(path: PathBuf) {
  return $resultSync(()=> Deno.lstatSync(path));
}

export function writeFile(path: PathBuf,data: Uint8Array|ReadableStream<Uint8Array>,options?: Deno.WriteFileOptions) {
  return $result(()=> Deno.writeFile(path,data,options));
}

export function writeFileSync(path: PathBuf,data: Uint8Array,options?: Deno.WriteFileOptions) {
  return $resultSync(()=> Deno.writeFileSync(path,data,options));
}

export function writeTextFile(path: PathBuf,data: string|ReadableStream<string>,options?: Deno.WriteFileOptions) {
  return $result(()=> Deno.writeTextFile(path,data,options));
}

export function writeTextFileSync(path: PathBuf,data: string,options?: Deno.WriteFileOptions) {
  return $resultSync(()=> Deno.writeTextFileSync(path,data,options));
}

export function makeTempDir(options: Deno.MakeTempOptions) {
  return $result(()=> Deno.makeTempDir(options));
}

export function makeTempDirSync(options: Deno.MakeTempOptions) {
  return $resultSync(()=> Deno.makeTempDirSync(options));
}

export function makeTempFile(options: Deno.MakeTempOptions) {
  return $result(()=> Deno.makeTempFile(options));
}

export function makeTempFileSync(options: Deno.MakeTempOptions) {
  return $resultSync(()=> Deno.makeTempFileSync(options));
}

export function truncate(name: string,len?: number) {
  return $result(()=> Deno.truncate(name,len));
}

export function truncateSync(name: string,len?: number) {
  return $resultSync(()=> Deno.truncateSync(name,len));
}

export function open(path: string, options?: Deno.OpenOptions) {
  return file.open(path,options);
}


export function openSync(path: string, options?: Deno.OpenOptions) {
  return file.openSync(path,options);
}

export function create(path: string) {
  return file.create(path);
}

export function createSync(path: string) {
  return file.createSync(path);
}