import { Rgba } from "../../bindings/bindings.ts";

export abstract class Rgb {
  abstract r: number;
  abstract g: number;
  abstract b: number;
  abstract a?: number;
}
export type RgbArray=[
  r: number,
  g: number,
  b: number,
  a?: number
];

export type Color=string|Rgb|number|RgbArray;


export function rgba(color: Color): Rgba {
  switch(typeof color) {
    case "object":
      const isRgb=color instanceof Rgb;
      return {
        r: isRgb?color.r:color[0],
        g: isRgb?color.g:color[1],
        b: isRgb?color.b:color[2],
        a: (isRgb?color.a:color[3])??0xff
      };
    case "number":
      return hexToRgb(color);
    case "string":
      return hexToRgb(Number.parseInt(color.replace("#","0x")));
  }
}

export const hex=(color: Rgb|RgbArray)=> color instanceof Rgb?((color.r*256+color.g)*256+color.b)*256+(color.a??255):((color[0]*256+color[1])*256+color[2])*256+(color[3]??255);

function hexToRgb(color: number): Rgba {
  return {
    r: color&0xff,
    g: color&0xffff%256,
    b: color&0xffffff%256,
    a: color.toString().length>6?color&0xffffffff%256:255,
  };
}



