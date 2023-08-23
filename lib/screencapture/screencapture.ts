import * as lib from "../../bindings/bindings.ts";
import { ImageBuffer } from "./image.ts";


export async function screenshot(x: number,y: number,delay=0): Promise<ImageBuffer> {
  return new ImageBuffer(JSON.parse(await lib.screenshot(x,y,delay/1000)));
}

export function screenshotSync(x: number,y: number,delay=0): ImageBuffer {
  return new ImageBuffer(JSON.parse(lib.screenshot_sync(x,y,delay/1000)));
}







