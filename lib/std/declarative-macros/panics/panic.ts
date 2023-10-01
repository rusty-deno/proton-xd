
/**
 * # Panics
 * Exits the program with custom panic message provided by {@linkcode msg}.
 */
export function $panic(msg: string|Error="Program panicked.."): never {
  throw msg instanceof Error?msg:new Error(msg);
}

