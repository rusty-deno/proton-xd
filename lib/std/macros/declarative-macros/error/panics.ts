
/**
 * # Panics
 * Exits the program with custom panic message provided by {@linkcode msg}.
 */
export function $panic(msg: string|Error="Program panicked.."): never {
  console.error(msg);
  return Deno.exit(1);
}

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

/**
 * Indicates unimplemented code by panicking with a message of "not implemented".
 * 
 * This allows your code to type-check, which is useful if you're prototyping or extending a abstract class that you dont plan to use at all.
 * 
 */
export function $unimplemented(msg="not implemented"): never {
  $panic(msg);
}