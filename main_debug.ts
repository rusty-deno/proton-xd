import { XD,$url } from "./mod.ts";

XD.instantiate($url("./index.html",import.meta.url),{
  title: "my-app",
});


// const ts=[
//   "resizable",
//   "minimizable",
//   "maximizable",
//   "closable",
//   "title",
//   "maximized",
//   "visible",
//   "transparent",
//   "decorations",
//   "alwaysOnTop",
//   "alwaysOnBottom",
//   "theme",
//   "focused",
//   "contentProtection",
//   "visibleOnAllWorkspaces",
// ].map(str=> str.toLowerCase());
// const rs=[
//   "inner_size",
//   "min_height",
//   "max_height",
//   "min_width",
//   "max_width",
//   "resizable",
//   "minimizable",
//   "maximizable",
//   "closable",
//   "title",
//   "maximized",
//   "visible",
//   "transparent",
//   "decorations",
//   "always_on_top",
//   "always_on_bottom",
//   "window_icon",
//   "theme",
//   "focused",
//   "content_protection",
//   "visible_on_all_workspaces",
//   "position",
// ].map(str=> str.replaceAll("_",""));


// for(const rs_ of rs) {
//   if(ts.includes(rs_)) continue;
//   console.log(rs_);
// }



