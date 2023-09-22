import { WebViewAttributes,WindowAttributes } from './types/mod.ts';


/**
 * Default value of the window properties
 */
export const defaultWindowAttrs={
  resizable: true,
  minimizable: true,
  maximizable: true,
  closable: true,
  title: "untitled",
  maximized: false,
  visible: true,
  transparent: false,
  decorations: true,
  alwaysOnTop: false,
  alwaysOnBottom: false,
  theme: "Dark",
  focused: true,
  contentProtection: false,
  visibleOnAllWorkspaces: false,
} satisfies WindowAttributes;

/**
 * Default value of the webview properties
 */
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

// deno-lint-ignore no-explicit-any
export function confirmDefaultVal(main: any,def: any): any {
  for(const key in def) main[key]??=def[key];
  return main;
}
