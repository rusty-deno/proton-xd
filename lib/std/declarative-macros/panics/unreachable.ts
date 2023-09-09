import { $panic } from "./panic.ts";

/**
 * Indicates unreachable code by panicking with a message of "following code is unreachable."
 * 
 * This allows your code to type-check, which is useful if you're prototyping or extending a abstract class that you dont plan to use at all.
 * 
 */
export function $unreachable(msg="following code is unreachable.") {
  $panic(msg);
}
