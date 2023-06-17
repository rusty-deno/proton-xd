import { Size,Theme,Rgba,Content as content,Header } from "../../bindings/bindings.ts";

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

export default interface WebViewAttributes {
  userAgent?: string
  visible?: boolean
  transparent?: boolean
  backgroundColor?: Rgba
  zoomHotkeysEnabled?: boolean
  initializationScripts?: Array<string>
  clipboard?: boolean
  devtools?: boolean
  acceptFirstMouse?: boolean
  backForwardNavigationGestures?: boolean
  incognito?: boolean
  autoplay?: boolean
}

export type Content=string|URL|UrlAndHeaders;

export abstract class UrlAndHeaders {
  abstract url: string|URL;
  abstract headers: Array<Header>
}

export function toContent(content: Content): string {
  return JSON.stringify(content instanceof UrlAndHeaders?{
    UrlAndHeaders: {
      url: content.url.toString(),
      headers: content.headers
    }
  }:
  content instanceof URL?{
    Url: {
      url: content.toString()
    }
  }:{
    Html: {
      html: content
    }
  });
}

type Iter={[key: string]: unknown};

export function confirmDefaultVal(main: Iter,def: Iter) {
  let attrs: Iter={};
  for(const key in def)
    attrs[to_snake_case(key)]=main[key]??def[key];

  return JSON.stringify(attrs);
}

function to_snake_case(str: string) {
  return str.replace(/[A-Z]/g,(s)=> {
    return `_${s.toLowerCase()}`;
  });
}