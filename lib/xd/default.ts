
export const defaultWindowAttrs={
  innerSize: {height: 480,width: 1080},
  minInnerSize: {height: 10,width: 10},//todo
  maxInnerSize: {height: 480,width: 1080},//todo
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
    a: 0
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