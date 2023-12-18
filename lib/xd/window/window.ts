import * as lib from "../../../bindings/bindings.ts";
import { MessageType,WindowAttributes } from "../types/window.ts";
import { confirmDefaultVal,defaultFileOpenerOptions,defaultSaveFileOptions } from "../default.ts";
import { WindowTrait } from './_window.ts';
import { encode } from "../../serde/encode.ts";
import { Screenshot } from '../image/screenshot.ts';





export class WindowXD extends WindowTrait {
  constructor(protected _window: bigint,protected windowAttrs: WindowAttributes={}) {
    super();
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










function encodeEnum(type: MessageType) {
  switch(type) {
    case "Info": return 0;
    case 'Warning': return 1;
    case 'Error': return 2;
  }
}