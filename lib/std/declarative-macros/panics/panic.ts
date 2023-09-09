
/**
 * # Panics
 * Exits the program with custom panic message provided by {@linkcode msg}.
 */
export function $panic(msg: string|Error="Program panicked.."): never {
  console.error(msg);
  return Deno.exit(1);
}

