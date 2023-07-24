import * as lib from '../../../bindings/bindings.ts';
import { Default,confirmDefaultVal } from '../default.ts';
import { MessageType,FileOpenerOptions } from './mod.ts';
import { defaultOptions } from './default.ts';

const {symbols}=lib;
const encoder=new TextEncoder;
function encode(str: string) {
  return encoder.encode(str);
}

export async function message(message: string,title: string=Default.TITLE,type=MessageType.Info) {
  await lib.alert(message,title,type);
}

export function messageSync(message: string,title: string=Default.TITLE,type=MessageType.Info) {
  lib.alert_sync(message,title,type);
}

export async function error(err="Some error occured!",title="Error") {
  await message(err,title,MessageType.Error);
}

export function errorSync(err="Some error occured!",title="Error") {
  messageSync(err,title,MessageType.Error);
}

export async function warn(warning: string,title="Warning") {
  await message(warning,title,MessageType.Warning);
}

export function warnSync(warning: string,title="Warning") {
  messageSync(warning,title,MessageType.Warning);
}

export async function confirm(txt: string,title: string=Default.TITLE,type=MessageType.Info) {
  return await symbols.confirm(encode(title),encode(txt),type);
}

export function confirmSync(txt: string,title: string=Default.TITLE,type=MessageType.Info) {
  return symbols.confirm_sync(encode(title),encode(txt),type);
}



export async function chooseFile(options: FileOpenerOptions={}) {
  const opt=confirmDefaultVal(options as {[index: string]: unknown},defaultOptions);
  return await lib.open(JSON.stringify(opt));
}

export function chooseFileSync(options: FileOpenerOptions={}) {
  const opt=confirmDefaultVal(options as {[index: string]: unknown},defaultOptions);
  return  lib.open_sync(JSON.stringify(opt));
}

interface SaveFileOptions {
  filename?: string;
  location?: string;
}

export async function save(options: SaveFileOptions={filename: "",location: Deno.env.get("HOME")}) {
  return await lib.save(JSON.stringify(options));
}
