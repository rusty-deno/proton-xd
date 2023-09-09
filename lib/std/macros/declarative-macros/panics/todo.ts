import { $panic } from "./panic.ts";

/**
 * Indicates unfinished code.
 * 
 * This can be useful if you're prototyping and just want a placeholder to let your code pass type analysis.
 * 
 * # Panics
 * Always panics
 */
export function $todo(msg="following code hasn't been implemented yet."): never {
  $panic(msg);
}