// deno-lint-ignore-file
import { $todo } from "../declarative-macros/mod.ts";
import { Class, DerivableMacro } from "./types.ts";



export function derive(...macros: readonly DerivableMacro[]) {
  return function<C extends Class>(constructor: C) {
    const _class=class extends constructor {};

    for(const macro of macros) {
      for(const [key,value] of macro()) $todo();
    }
  };
}


