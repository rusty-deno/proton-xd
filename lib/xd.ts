import * as lib from "../bindings/bindings.ts";

export default class XD {
  // public static init=(
  //   title: string,
  //   url: string|URL,
  //   width: number,
  //   height: number,
  //   icon: string|URL,
  //   theme: Theme
  // )=> lib.init(
  //   title,
  //   url.toString(),
  //   width,
  //   height,
  //   icon.toString(),
  //   theme
  // );

  public static write_to_clipboard=(str: string)=> lib.write_to_clipboard(str);

  public static read_clipboard=()=> lib.read_clipboard();
}



export enum Theme {
  LIGHT,
  DARK
}