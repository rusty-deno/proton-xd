export enum Default {
  TITLE="untitled"
}


export const defaultWindowAttrs={
  innerSize: {height: 480,width: 1080},
  minInnerSize: {height: 10,width: 10},
  maxInnerSize: {height: 480,width: 1080},//todo
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
  windowIcon: "",
  preferredTheme: "Dark",
  focused: true,
  contentProtection: false,
  visibleOnAllWorkspaces: false,
};

export const defaultWebViewAttrs={
  userAgent: "None",
  visible: true,
  transparent: false,
  backgroundColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 255
  },
  zoomHotkeysEnabled: false,
  initializationScripts: [],
  clipboard: false,
  devtools: false,
  acceptFirstMouse: false,
  backForwardNavigationGestures: false,
  incognito: false,
  autoplay: true,
};

type IterObj={[key: string]: unknown};


export function confirmDefaultVal(main: IterObj,def: IterObj): any {
  let attrs: IterObj={};
  for(const key in def)
    attrs[to_snake_case(key)]=main[key]??def[key];

  return attrs;
}

export function to_snake_case(str: string) {
  return str.replace(/[A-Z]/g,(s)=> {
    return `_${s.toLowerCase()}`;
  });
}