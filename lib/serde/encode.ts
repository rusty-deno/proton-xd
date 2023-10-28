const encoder=new TextEncoder;

/**
* Encodes the given string into a buffer {@linkcode Uint8Array}
*/
export function encode(str: string) {
  return encoder.encode(str.endsWith("\0")?str:str+"\0");
}

/**
 * Encodes an object into a `null` terminated `CString`.
 */
export function stringify(obj: object) {
  return encode(JSON.stringify(obj));
}


