import { Header,Rgba,Theme,Size,Position } from "../../bindings/bindings.ts";
export type {
  Position
};

export type Content=string|URL;

export interface WindowAttributes {
  innerSize?: Size;
  minHeight?: number;//todo
  maxHeight?: number;//todo
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
  windowIcon?: string;
  position?: Position;
}

export interface WebViewAttributes {
  userAgent?: string;
  visible?: boolean;
  transparent?: boolean;
  backgroundColor?: Rgba;
  zoomHotkeysEnabled?: boolean;
  initializationScripts?: Array<string>;
  clipboard?: boolean;
  devtools?: boolean;
  acceptFirstMouse?: boolean;
  backForwardNavigationGestures?: boolean;
  incognito?: boolean;
  autoplay?: boolean;
  html?: string;
  url?: string|URL;
  headers?: Header[];
}


export function toContent(content: Content): string {
  return JSON.stringify(content instanceof URL? {
    Url: {
      url: content.toString()
    }
  }:{
    Html: {
      html: content
    }
  });
}

