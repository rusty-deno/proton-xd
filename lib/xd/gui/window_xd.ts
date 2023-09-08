import * as lib from '../../../bindings/bindings.ts';
import { confirmDefaultVal } from '../default.ts';
import { MessageType,FileOpenerOptions,SaveFileOptions } from './mod.ts';
import { defaultFileOpenerOptions,defaultSaveFileOptions } from './default.ts';

const {symbols}=lib;//dynamic library
const encoder=new TextEncoder;

/**
 * Encodes the given string into a buffer {@linkcode Uint8Array}
 */
function encode(str: string) {
  return encoder.encode(str.endsWith("\0")?str:str+"\0");
}

/**
 * Shows the given message with a pop-up window
 */
export async function message(message: string,title="Info",type=MessageType.Info) {
  await lib.alert(message,title,type);
}

/**
 * Shows the given message with a pop-up window
 */
export function messageSync(message: string,title="Info",type=MessageType.Info) {
  lib.alert_sync(message,title,type);
}


/**
 * Shows the given error with a error-pop-up window
 */
export async function error(err="Some error occured!",title="Error") {
  await message(err,title,MessageType.Error);
}

/**
 * Shows the given error with a error-pop-up window
 */
export function errorSync(err="Some error occured!",title="Error") {
  messageSync(err,title,MessageType.Error);
}

/**
 * Shows the given warning with a warning-pop-up window
 */
export async function warn(warning: string,title="Warning") {
  await message(warning,title,MessageType.Warning);
}

/**
 * Shows the given warning with a warning-pop-up window
 */
export function warnSync(warning: string,title="Warning") {
  messageSync(warning,title,MessageType.Warning);
}

/**
 * Shows a confirm pop-up returning boolean value
 */
export async function confirm(txt: string,title="Confirm",type=MessageType.Info) {
  return await symbols.confirm(encode(title),encode(txt),type);
}

/**
 * Shows a confirm pop-up returning boolean value
 */
export function confirmSync(txt: string,title="Confirm",type=MessageType.Info) {
  return symbols.confirm_sync(encode(title),encode(txt),type);
}



/**
 * Shows a choose-file pop-up window returning the file path
 */
export async function chooseFile(options: FileOpenerOptions={}) {
  const opt=confirmDefaultVal(options,defaultFileOpenerOptions);
  return await lib.open(JSON.stringify(opt));
}

/**
 * Shows a choose-file pop-up window returning the file path
 */
export function chooseFileSync(options: FileOpenerOptions={}) {
  const opt=confirmDefaultVal(options,defaultFileOpenerOptions);
  return  lib.open_sync(JSON.stringify(opt));
}

/**
 * Shows a save-file pop-up window returning the file patg
 */
export async function save(options: SaveFileOptions=defaultSaveFileOptions) {
  return await lib.save(JSON.stringify(options));
}

/**
 * Shows a save-file pop-up window returning the file patg
 */
export function saveSync(options: SaveFileOptions=defaultSaveFileOptions) {
  return lib.save_sync(JSON.stringify(options));
}