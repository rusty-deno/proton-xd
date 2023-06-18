//xd
import * as xd from "./xd/xd.ts";
import * as def from './xd/default.ts';
import * as xdTypes from "./xd/types.ts";

//screencapture
import * as sc from "./graphics/screencapture.ts";

//bindings
import * as lib from "../bindings/bindings.ts";

//color
import * as color from "./graphics/color.ts";

namespace ProtonXD {
  //xd
  export const {default: XD,readClipboard,writeToClipboard}=xd;
  export type Theme=lib.Theme;
  export const {UrlAndHeaders,confirmDefaultVal,toContent}=xdTypes;
  export type WindowAttributes=xdTypes.WindowAttributes;
  export type WebViewAttributes=xdTypes.default;


  //default
  export const {defaultWebViewAttrs,defaultWindowAttrs}=def;

  //color
  export const {rgba}=color;
  export type Color=color.Color;
  export type RgbArray=color.RgbArray;
  export type Rgb=color.Rgb;

  //screencapture
  export const ScreenCapturer=sc.default;
  export const {Image}=sc;
  export type ImageBuffer=sc.ImageBuffer;

  //api
  export const close=lib.close;
}


export default ProtonXD;