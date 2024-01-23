import { Theme,Position,Size } from "./mod.ts";
import { RGBAImage } from '../image/image.ts';
import { ImageBuffer } from '../image/image.ts';


export interface Options {
  window?: WindowAttributes;
  webview?: WebViewAttributes;
}



export type Icon=string|URL|RGBAImage;
export interface WindowAttributes {
  innerSize?: Size;
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
  title?: string;
  maximized?: boolean;
  visible?: boolean;
  transparent?: boolean;
  decorations?: boolean;
  alwaysOnTop?: boolean;
  alwaysOnBottom?: boolean;
  theme?: Theme;
  focused?: boolean;
  contentProtection?: boolean;
  visibleOnAllWorkspaces?: boolean;
  windowIcon?: ImageBuffer;
  position?: Position;
}


export interface WebViewAttributes {
  userAgent?: string;
  visible?: boolean;
  transparent?: boolean;
  backgroundColor?: Rgba;
  zoomHotkeysEnabled?: boolean;
  initializationScripts?: string[];
  clipboard?: boolean;
  devtools?: boolean;
  acceptFirstMouse?: boolean;
  backForwardNavigationGestures?: boolean;
  incognito?: boolean;
  autoplay?: boolean;
  html?: string;
  url?: string|URL;
  headers?: Array<Record<string,string>>;
}

export interface Rgba {
  r: number;
  g: number;
  b: number;
}


export type CursorIcon="Default"|
"Crosshair"|
"Hand"|
"Arrow"|
"Move"|
"Text"|
"Wait"|
"Help"|
"Progress"|
"NotAllowed"|
"ContextMenu"|
"Cell"|
"VerticalText"|
"Alias"|
"Copy"|
"NoDrop"|
"Grab"|
"Grabbing"|
"AllScroll"|
"ZoomIn"|
"ZoomOut"|
"EResize"|
"NResize"|
"NeResize"|
"NwResize"|
"SResize"|
"SeResize"|
"SwResize"|
"WResize"|
"EwResize"|
"NsResize"|
"NeswResize"|
"NwseResize"|
"ColResize"|
"owResize";
