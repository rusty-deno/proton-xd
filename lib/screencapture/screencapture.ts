import * as lib from "../../bindings/bindings.ts";
import { ImageBuffer } from "./image.ts";


/**
 * # Screenshot
 * Captures a screenshot of the screen relative to provided x and y axis asyncronyously.
 * delay is 0s by default
 */
export async function screenshot(x: number,y: number,delay=0): Promise<ImageBuffer> {
  return new ImageBuffer(JSON.parse(await lib.screenshot(x,y,delay/1000)));
}


/**
 * # ScreenshotSync
 * Captures a screenshot of the screen relative to provided x and y axis syncronyously.
 * delay is 0s by default
 */
export function screenshotSync(x: number,y: number,delay=0): ImageBuffer {
  return new ImageBuffer(JSON.parse(lib.screenshot_sync(x,y,delay/1000)));
}







