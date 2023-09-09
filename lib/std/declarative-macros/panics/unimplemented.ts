import { $panic } from "./panic.ts";

/**
 * Indicates unimplemented code by panicking with a message of "not implemented".
 * 
 * This allows your code to type-check, which is useful if you're prototyping or extending a abstract class that you dont plan to use at all.
 * 
 */
export function $unimplemented(msg="not implemented"): never {
  $panic(msg);
}