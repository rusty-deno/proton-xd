import * as lib from "../../../bindings/bindings.ts";
import { WindowAttributes } from "../types/window.ts";
import { WindowTrait } from './_window.ts';
import { Screenshot } from '../image/screenshot.ts';





export class WindowXD extends WindowTrait {
  constructor(private _addr: BigUint64Array,public windowAttrs: WindowAttributes={}) {
    super();
  }
  
  public get ptr() {
    return this._addr[0];
  }

  /**
   * Captures a screenshot of the screen relative to provided x and y axis asyncronyously.
   * 
   * {@linkcode delay} is 0s by default
   */
  public static async screenshot(x: number,y: number,delay=0) {
    const size=new Uint32Array(2);
    const ptr=Deno.UnsafePointer.of(size);
    return new Screenshot(await lib.screenshot(x,y,delay,Deno.UnsafePointer.value(ptr) as bigint),size[0],size[1]);
  }
  
  
  /**
   * Captures a screenshot of the screen relative to provided x and y axis syncronyously.
   * 
   * {@linkcode delay} is 0s by default
   */
  public static screenshotSync(x: number,y: number,delay=0) {
    const size=new Uint32Array(2);
    const ptr=Deno.UnsafePointer.of(size);
    return new Screenshot(lib.screenshot_sync(x,y,delay,Deno.UnsafePointer.value(ptr) as bigint),size[0],size[1]);
  }
}


