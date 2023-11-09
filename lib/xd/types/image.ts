import { Rgba } from "../../../bindings/bindings.ts";

export interface Rgb {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/**
 * Touple representing a RGB value
 */
export type RgbTouple=[
  r: number,
  g: number,
  b: number,
  a?: number
];

export type Color=string|Rgb|number|RgbTouple;


/**
 * Takes a color as argument and returns its RGBA representation
 * # Example
 * ```ts
 * const color="#ff00ff";
 * $assertEq($rgba(color),{ r: 0xff, g: 0x0, b: 0xff, a: 0xff });
 * ```
 */
export function $rgba(color: Color): Rgba {
  switch(typeof color) {
    // deno-lint-ignore no-case-declarations
    case "object":
      const isTouple=color instanceof Array;
      return {
        r: isTouple?color[0]:color.r,
        g: isTouple?color[1]:color.g,
        b: isTouple?color[2]:color.b,
        a: (isTouple?color[3]:color.a)??0xff
      };
    case "number":
      return hexToRgb(color);
    case "string":
      return hexToRgb(Number.parseInt(color.replace("#","0x")));
  }
}

/**
 * Returns the hexadecimal representation of a RGB color.
 * # Example
 * ```ts
 * const rgb=[255,0,255];
 * $assertEq($hex(rgb),0xff00ffff);
 * ```
 */
export function $hex(color: Rgb|RgbTouple) {
  return color instanceof Array?((color[0]*0x100+color[1])*0x100+color[2])*0x100+(color[3]??255):((color.r*0x100+color.g)*0x100+color.b)*0x100+(color.a??255);
}


function hexToRgb(color: number): Rgba {
  return {
    r: color&0xff,
    g: color&0xffff%0x100,
    b: color&0xffffff%0x100,
    a: color.toString().length>6?color&0xffffffff%0x100:0xff,
  };
}

export type CompressionType="Fast"|"Best"|"Default";
export type Filter="Sub"|"Up"|"Avg"|"Paeth"|"Adaptive"|"NoFilter";



