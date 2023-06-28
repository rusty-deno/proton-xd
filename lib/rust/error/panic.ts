
export default function panic(msg?: string): never {
  throw new Error(msg);
}


export function todo(msg: string="not implemented"): never {
  panic(msg);
}

