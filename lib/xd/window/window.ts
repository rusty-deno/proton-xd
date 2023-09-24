import { WindowAttributes } from "../types/window.ts";
import { WindowTrait } from './_window.ts';





export class WindowXD extends WindowTrait {
  constructor(protected _window: bigint,protected windowAttrs: WindowAttributes={}) {
    super();
  }
}





