export * from "./c_str.ts";
export * from "./str.ts";



import { Err,Ok } from '../io/result/result.ts';


export const encoder=new TextEncoder;
export const decoder=new TextDecoder;
export type c_str=Deno.PointerValue|string;


export function readPtr(v: Deno.PointerValue) {
  if(v===null) return Err<Uint8Array>(new Error("null pointer exception"));

  const ptr=new Deno.UnsafePointerView(v);
  const lengthBe=new Uint8Array(4);

  const view=new DataView(lengthBe.buffer);
  ptr.copyInto(lengthBe,0);

  const buf=new Uint8Array(view.getUint32(0));
  ptr.copyInto(buf,4);
  return Ok(buf);
}
