import { WebViewAttributes,WindowAttributes,FileOpenerOptions,SaveFileOptions } from './types/mod.ts';


/**
 * Default value of the window properties
 */
export const defaultWindowAttrs: WindowAttributes={
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
};

/**
 * Default value of the webview properties
 */
export const defaultWebViewAttrs: WebViewAttributes={
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
};

// deno-lint-ignore no-explicit-any
export function confirmDefaultVal(main: any,def: any): any {
  for(const key in def) main[key]??=def[key];
  return main;
}


/**
 * Default value of FileOpenerOptions
 */
export const defaultFileOpenerOptions: FileOpenerOptions={
  location: Deno.env.get("HOME")??"/home",
  type: "SingleFile"
};

export const defaultSaveFileOptions: SaveFileOptions={
  location: Deno.env.get("HOME")??"/home"
};