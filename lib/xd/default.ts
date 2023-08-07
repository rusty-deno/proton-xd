import { WebViewAttributes,WindowAttributes } from './types.ts';
export enum Default {
  TITLE="untitled"
}


export const defaultWindowAttrs={
  resizable: true,
  minimizable: true,
  maximizable: true,
  closable: true,
  title: Default.TITLE,
  maximized: false,
  visible: true,
  transparent: false,
  decorations: true,
  alwaysOnTop: false,
  alwaysOnBottom: false,
  preferredTheme: "Dark",
  focused: true,
  contentProtection: false,
  visibleOnAllWorkspaces: false,
} satisfies WindowAttributes;

export const defaultWebViewAttrs={
  visible: true,
  transparent: false,
  zoomHotkeysEnabled: false,
  initializationScripts: [],
  clipboard: false,
  devtools: false,
  acceptFirstMouse: false,
  backForwardNavigationGestures: false,
  incognito: false,
  autoplay: true,
} satisfies WebViewAttributes;

export type IterObj={[key: string]: unknown};


// deno-lint-ignore no-explicit-any
export function confirmDefaultVal(main: IterObj,def: IterObj): any {
  for(const key in def) main[key]??=def[key];
  return main;
}