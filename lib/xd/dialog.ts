import * as lib from '../../bindings/bindings.ts';
import { Default } from './default.ts';

const {symbols,encode}=lib;
export enum MessageType {
  Info,
  Warning,
  Error
}



export async function message(message: string,title: string=Default.TITLE,type=MessageType.Info) {
  await lib.message(message,title,type);
}

export function messageSync(message: string,title: string=Default.TITLE,type=MessageType.Info) {
  lib.message_sync(message,title,type);
}







