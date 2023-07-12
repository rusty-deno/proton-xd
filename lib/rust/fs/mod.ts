import {Result} from '../io/result.ts';
import { Res,ResSync } from '../io/res.ts';
import { PathBuf } from '../path.ts';
import {file} from './file.ts';

export * from "./directory_builder.ts";
export * from "./file.ts";




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

export async function link(original: string,link: string) {
  return Res(async ()=> await Deno.link(original,link));
}

export function linkSync(original: string,link: string) {
  return ResSync(()=> Deno.linkSync(original,link));
}

export async function metadata(path: PathBuf) {
  return Res(async ()=> Deno.stat(path));
}

export function metadataSync(path: PathBuf) {
  return ResSync(()=> Deno.statSync(path));
}

export async function readFile(path: PathBuf) {
  return Res(async ()=> await Deno.readFile(path));
}

export function readFileSync(path: PathBuf) {
  return ResSync(()=> Deno.readFileSync(path));
}

export function readDir(path: PathBuf) {
  return ResSync(()=> Deno.readDir(path));
}

export function readDirSync(path: PathBuf) {
  return ResSync(()=> Deno.readDirSync(path));
}

export async function readLink(path: PathBuf) {
  return Res(async ()=> await Deno.readLink(path));
}

export function readLinkSync(path: PathBuf) {
  return ResSync(()=> Deno.readLinkSync(path));
}

export async function readToString(path: PathBuf,options?: Deno.ReadFileOptions) {
  return Res(async ()=> await Deno.readTextFile(path,options));
}

export function readToStringSync(path: PathBuf) {
  return ResSync(()=> Deno.readTextFileSync(path));
}

export async function removeDir(path: PathBuf,options?: Deno.RemoveOptions) {
  return Res(async ()=> await Deno.remove(path,options));
}

export function removeDirSync(path: PathBuf,options?: Deno.RemoveOptions) {
  return ResSync(()=> Deno.removeSync(path,options));
}

export async function rename(oldpath: PathBuf,newpath: PathBuf) {
  return Res(async ()=> await Deno.rename(oldpath,newpath));
}

export function renameSync(oldpath: PathBuf,newpath: PathBuf) {
  return ResSync(()=> Deno.renameSync(oldpath,newpath));
}

export async function chmod(path: PathBuf,mode: number) {
  return Res(async ()=> await Deno.chmod(path,mode));
}

export function chmodSync(path: PathBuf,mode: number) {
  return ResSync(()=> Deno.chmodSync(path,mode));
}

export async function chown(path: PathBuf,uid: number|null,gid: number|null) {
  return Res(async ()=> await Deno.chown(path,uid,gid));
}

export function chownSync(path: PathBuf,uid: number|null,gid: number|null) {
  return ResSync(()=> Deno.chownSync(path,uid,gid));
}

export async function symlinkMetadata(path: PathBuf) {
  return Res(async ()=> await Deno.lstat(path));
}

export function symlinkMetadataSync(path: PathBuf) {
  return ResSync(()=> Deno.lstatSync(path));
}

export async function writeFile(path: PathBuf,data: Uint8Array|ReadableStream<Uint8Array>,options?: Deno.WriteFileOptions) {
  return Res(async ()=> await Deno.writeFile(path,data,options));
}

export function writeFileSync(path: PathBuf,data: Uint8Array,options?: Deno.WriteFileOptions) {
  return ResSync(()=> Deno.writeFileSync(path,data,options));
}

export async function writeTextFile(path: PathBuf,data: ReadableStream<string>,options?: Deno.WriteFileOptions) {
  return Res(async ()=> await Deno.writeTextFile(path,data,options));
}

export function writeTextFileSync(path: PathBuf,data: string,options?: Deno.WriteFileOptions) {
  return ResSync(()=> Deno.writeTextFileSync(path,data,options));
}

export async function makeTempDir(options: Deno.MakeTempOptions) {
  return Res(async ()=> await Deno.makeTempDir(options));
}

export function makeTempDirSync(options: Deno.MakeTempOptions) {
  return ResSync(()=> Deno.makeTempDirSync(options));
}

export async function makeTempFile(options: Deno.MakeTempOptions) {
  return Res(async ()=> await Deno.makeTempFile(options));
}

export function makeTempFileSync(options: Deno.MakeTempOptions) {
  return ResSync(()=> Deno.makeTempFileSync(options));
}

export async function truncate(name: string,len?: number) {
  return Res(async ()=> await Deno.truncate(name,len));
}

export function truncateSync(name: string,len?: number) {
  return ResSync(()=> Deno.truncateSync(name,len));
}

export async function open(path: string, options?: Deno.OpenOptions) {
  return file.open(path,options);
}


export function openSync(path: string, options?: Deno.OpenOptions) {
  return file.openSync(path,options);
}

export async function create(path: string) {
  return file.create(path);
}

export function createSync(path: string) {
  return file.createSync(path);
}