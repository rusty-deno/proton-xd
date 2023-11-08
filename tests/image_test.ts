import { assert } from "https://deno.land/std@0.132.0/_util/assert.ts";
import { ImageBuffer } from "../lib/xd/image/image.ts";


Deno.test("xd",()=> {
  const img=new ImageBuffer({ height: 69,width: 69,rgba: new Uint8Array }).pngSync();
  if(img.result instanceof Error) console.log(img.result);
  
  assert(img.containsErr());
});

