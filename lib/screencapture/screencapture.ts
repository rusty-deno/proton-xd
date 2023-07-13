import * as lib from "../../bindings/bindings.ts";
import { Image } from "./image.ts";


/**
 * @param {number} x represents x-axis
 * @param {number} y represents y-axis
 * @param {number} delay for delayed screenshots
 * @returns {Promise<Image>}
 */
export async function screenshot(x: number,y: number,delay: number=0): Promise<Image> {
  return new Image(JSON.parse(await lib.screenshot(x,y,delay/1000)));
}


 /**
 * @param {number} x represents x-axis
 * @param {number} y represents y-axis
 * @param {number} delay for delayed screenshots
 * @returns {Image}
 */
export function screenshotSync(x: number,y: number,delay: number=0): Image{
  return new Image(JSON.parse(lib.screenshot_sync(x,y,delay/1000)));
}







