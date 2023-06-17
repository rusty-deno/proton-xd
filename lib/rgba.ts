import { Rgba } from "../bindings/bindings.ts";

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



export default function rgba(color: string|Rgb|number|RgbArray): Rgba {
  switch(typeof color) {
    case "object":
      const isRgb=color instanceof Rgb;
      return {
        r: isRgb?color.r:color[0],
        g: isRgb?color.g:color[1],
        b: isRgb?color.b:color[2],
        a: (isRgb?color.a:color[3])??255
      };
    case "number":
      return hexToRgb(color);
    case "string":
      return hexToRgb(Number.parseInt(color.replace("#","0x")));
  }
}

function hexToRgb(color: number): Rgba {
  return {
    r: color&0xff,
    g: color&0xffff%256,
    b: color&0xffffff%256,
    a: color.toString().length>6?color&0xffffffff%256:255,
  };
}