import { ImageBuffer } from "../mod.ts";
import { WindowAttributes,Icon } from '../xd/types/window.ts';


export function serIcon(icon: Icon) {
  const windowIcon=icon instanceof URL || typeof icon==="string"?
    { Url: { url: icon } }
  :icon instanceof ImageBuffer?
    { ImgBuff: { rgba: icon.bytes,height: icon.height,width: icon.width } }
  :{ ImgBuff: icon };
  return windowIcon;
}

export function serWindowAttrs(attrs: WindowAttributes) {
  if(attrs.windowIcon) attrs.windowIcon=serIcon(attrs.windowIcon) as unknown as Icon;
  return attrs;
}


