import { $result,$resultSync,Result } from '../error/result/mod.ts';
import { PathBuf } from '../path.ts';
import { file } from './file.ts';

export * from "./directory_builder.ts";
export * from "./file.ts";




export async function canonicalize(path: PathBuf) {
  return await $result(()=> Deno.realPath(path));
}

export function canonicalizeSync(path: PathBuf) {
  return $resultSync(()=> Deno.realPathSync(path));
}

export async function copy(from: PathBuf,to: PathBuf): Promise<Result<void,Error>> {
  return await $result<void>(()=> Deno.copyFile(from,to));
}

export function copySync(from: PathBuf,to: PathBuf) {
  return $resultSync(()=> Deno.copyFileSync(from,to));
}

export async function createDir(path: PathBuf,options?: Deno.MkdirOptions) {
  return await $result(()=> Deno.mkdir(path,options));
}

export function createDirSync(path: PathBuf,options?: Deno.MkdirOptions) {
  return $resultSync(()=> Deno.mkdirSync(path,options));
}

export async function link(original: string,link: string) {
  return await $result(async ()=> await Deno.link(original,link));
}

export function linkSync(original: string,link: string) {
  return $resultSync(()=> Deno.linkSync(original,link));
}

export async function metadata(path: PathBuf) {
  return await $result(()=> Deno.stat(path));
}

export function metadataSync(path: PathBuf) {
  return $resultSync(()=> Deno.statSync(path));
}

export async function readFile(path: PathBuf) {
  return await $result(async ()=> await Deno.readFile(path));
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

export async function readLink(path: PathBuf) {
  return await $result(async ()=> await Deno.readLink(path));
}

export function readLinkSync(path: PathBuf) {
  return $resultSync(()=> Deno.readLinkSync(path));
}

export async function readToString(path: PathBuf,options?: Deno.ReadFileOptions) {
  return await $result(async ()=> await Deno.readTextFile(path,options));
}

export function readToStringSync(path: PathBuf) {
  return $resultSync(()=> Deno.readTextFileSync(path));
}

export async function removeDir(path: PathBuf,options?: Deno.RemoveOptions) {
  return await $result(async ()=> await Deno.remove(path,options));
}

export function removeDirSync(path: PathBuf,options?: Deno.RemoveOptions) {
  return $resultSync(()=> Deno.removeSync(path,options));
}

export async function rename(oldpath: PathBuf,newpath: PathBuf) {
  return await $result(async ()=> await Deno.rename(oldpath,newpath));
}

export function renameSync(oldpath: PathBuf,newpath: PathBuf) {
  return $resultSync(()=> Deno.renameSync(oldpath,newpath));
}

export async function chmod(path: PathBuf,mode: number) {
  return await $result(async ()=> await Deno.chmod(path,mode));
}

export function chmodSync(path: PathBuf,mode: number) {
  return $resultSync(()=> Deno.chmodSync(path,mode));
}

export async function chown(path: PathBuf,uid: number|null,gid: number|null) {
  return await $result(async ()=> await Deno.chown(path,uid,gid));
}

export function chownSync(path: PathBuf,uid: number|null,gid: number|null) {
  return $resultSync(()=> Deno.chownSync(path,uid,gid));
}

export async function symlinkMetadata(path: PathBuf) {
  return await $result(async ()=> await Deno.lstat(path));
}

export function symlinkMetadataSync(path: PathBuf) {
  return $resultSync(()=> Deno.lstatSync(path));
}

export async function writeFile(path: PathBuf,data: Uint8Array|ReadableStream<Uint8Array>,options?: Deno.WriteFileOptions) {
  return await $result(async ()=> await Deno.writeFile(path,data,options));
}

export function writeFileSync(path: PathBuf,data: Uint8Array,options?: Deno.WriteFileOptions) {
  return $resultSync(()=> Deno.writeFileSync(path,data,options));
}

export async function writeTextFile(path: PathBuf,data: ReadableStream<string>,options?: Deno.WriteFileOptions) {
  return await $result(async ()=> await Deno.writeTextFile(path,data,options));
}

export function writeTextFileSync(path: PathBuf,data: string,options?: Deno.WriteFileOptions) {
  return $resultSync(()=> Deno.writeTextFileSync(path,data,options));
}

export async function makeTempDir(options: Deno.MakeTempOptions) {
  return await $result(async ()=> await Deno.makeTempDir(options));
}

export function makeTempDirSync(options: Deno.MakeTempOptions) {
  return $resultSync(()=> Deno.makeTempDirSync(options));
}

export async function makeTempFile(options: Deno.MakeTempOptions) {
  return await $result(async ()=> await Deno.makeTempFile(options));
}

export function makeTempFileSync(options: Deno.MakeTempOptions) {
  return $resultSync(()=> Deno.makeTempFileSync(options));
}

export async function truncate(name: string,len?: number) {
  return await $result(async ()=> await Deno.truncate(name,len));
}

export function truncateSync(name: string,len?: number) {
  return $resultSync(()=> Deno.truncateSync(name,len));
}

export async function open(path: string, options?: Deno.OpenOptions) {
  return await file.open(path,options);
}


export function openSync(path: string, options?: Deno.OpenOptions) {
  return file.openSync(path,options);
}

export async function create(path: string) {
  return await file.create(path);
}

export function createSync(path: string) {
  return file.createSync(path);
}