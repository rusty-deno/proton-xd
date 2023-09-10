// deno-lint-ignore-file
import { Clone } from "../clone.ts";
import { Class } from "./types.ts";




export function Clone<C extends Class>(constructor: C) {
  return class extends constructor implements Clone {
    clone(): C {
      return structuredClone(this);
    }
  };
}


