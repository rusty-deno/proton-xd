import { Header,Rgba,Theme,Size } from "../../bindings/bindings.ts";

export type Content=string|URL;

export interface WindowAttributes {
  innerSize?: Size;
  minInnerSize?: Size;//todo
  maxInnerSize?: Size;//todo
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
  preferredTheme?: Theme;
  focused?: boolean;
  contentProtection?: boolean;
  visibleOnAllWorkspaces?: boolean;
  windowIcon?: string;
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

