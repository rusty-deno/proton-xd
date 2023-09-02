
export function $panic(err: string|Error="Program panicked"): never {
  console.error(err);
  return Deno.exit(1);
}


export function $todo(msg="not implemented"): never {
  $panic(msg);
}

export function $unimplemented(msg="following code hasn't been implemented yet."): never {
  $panic(msg);
}