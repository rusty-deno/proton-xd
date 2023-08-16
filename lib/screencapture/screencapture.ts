import * as lib from "../../bindings/bindings.ts";
import { Image } from "./image.ts";


export async function screenshot(x: number,y: number,delay=0): Promise<Image> {
  return new Image(JSON.parse(await lib.screenshot(x,y,delay/1000)));
}

export function screenshotSync(x: number,y: number,delay=0): Image{
  return new Image(JSON.parse(lib.screenshot_sync(x,y,delay/1000)));
}







