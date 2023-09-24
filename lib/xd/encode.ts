


const encoder=new TextEncoder;
export function encode(str: string) {
  return encoder.encode(str.endsWith("\0")?str:str+"\0");
}

export function stringify(obj: object) {
  return encode(JSON.stringify(obj));
}


