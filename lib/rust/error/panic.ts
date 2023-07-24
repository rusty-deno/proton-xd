

export function panic(err: string|Error="Program panicked"): never {
  console.error(err);
  return Deno.exit(1);
}


export function todo(msg="not implemented"): never {
  panic(msg);
}

