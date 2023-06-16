import { Theme } from "./xd.ts";

export const defaultWindowAttrs={
  innerSize: {height: 480,width: 1080},
  minInnerSize: {height: 480,width: 1080},//todo
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
  preferredTheme: Theme.DARK,
  focused: true,
  contentProtection: false,
  visibleOnAllWorkspaces: false,
};