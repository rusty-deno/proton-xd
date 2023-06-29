
export default function panic(err: string|Error="Program panicked"): never {
  console.error(err);
  Deno.exit(1);
}


export function todo(msg: string="not implemented"): never {
  panic(msg);
}

