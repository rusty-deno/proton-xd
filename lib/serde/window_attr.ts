import { WindowAttributes,Icon } from '../xd/types/window.ts';
import { RGBAImage } from '../xd/image/image.ts';
import { $todo } from '../mod.ts';


export function serIcon(icon: Icon): RGBAImage {
  if(isRGBAImg(icon)) return {...icon,rgba: Array.from(icon.rgba) as unknown as Uint8Array};
  return $todo();
}

export function serWindowAttrs(attrs: WindowAttributes) {
  if(attrs.windowIcon) attrs.windowIcon=serIcon(attrs.windowIcon);
  return attrs;
}

function isRGBAImg(icon: Icon): icon is RGBAImage {
  return !(typeof icon==="string"||icon instanceof URL);
}

