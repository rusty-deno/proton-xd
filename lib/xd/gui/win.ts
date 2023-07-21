import * as lib from '../../../bindings/bindings.ts';
import { Default } from '../default.ts';
import { MessageType } from './mod.ts';

const {symbols,encode}=lib;


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