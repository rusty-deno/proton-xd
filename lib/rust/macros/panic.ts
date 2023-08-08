import { panic,todo } from "../error/panic.ts";

export function $panic(msg?: string|Error): never {
  panic(msg);
}

export function $todo(msg?: string): never {
  todo(msg);
}

