import * as lib from '../../bindings/bindings.ts';
import { Default } from './default.ts';

const {symbols,encode}=lib;
export enum MessageType {
  Info,
  Warning,
  Error
}



export async function message(message: string,title: string=Default.TITLE,type=MessageType.Info) {
  await lib.alert(message,title,type);
}

export function messageSync(message: string,title: string=Default.TITLE,type=MessageType.Info) {
  lib.alert_sync(message,title,type);
}

export async function error(err: string="Some error occured!",title: string="Error") {
  await message(err,title,MessageType.Error);
}

export function errorSync(err: string="Some error occured!",title: string="Error") {
  messageSync(err,title,MessageType.Error);
}

export async function warn(warning: string,title: string="Warning") {
  await message(warning,title,MessageType.Warning);
}

export function warnSync(warning: string,title: string="Warning") {
  messageSync(warning,title,MessageType.Warning);
}