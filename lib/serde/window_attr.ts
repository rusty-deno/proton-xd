import { ImageBuffer } from "../mod.ts";
import { WindowAttributes,Icon } from '../xd/types/window.ts';


export function serIcon(icon: Icon) {
  const windowIcon=icon instanceof URL || typeof icon==="string"?
    { url: icon }
  :icon instanceof ImageBuffer?
    { rgba: icon.bytes,height: icon.height,width: icon.width }
  :icon;
  
  return windowIcon;
}

export function serWindowAttrs(attrs: WindowAttributes) {
  return attrs.windowIcon?Object.assign(attrs,{ windowIcon: attrs.windowIcon && serIcon(attrs.windowIcon) }):attrs;
}


