import * as xd from "./xd/xd.ts";
import * as sc from "./screencapture.ts";
import { Theme as theme } from "../bindings/bindings.ts";

namespace ProtonXD {
  export const XD=xd.default;
  export type Theme=theme;
  
  export const ScreenCapturer=sc.default;
  export const Image=sc.Image;
  export type ImageBuffer=sc.ImageBuffer;
  
}


export default ProtonXD;