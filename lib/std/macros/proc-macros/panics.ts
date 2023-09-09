// deno-lint-ignore-file
import { $panic } from "../../mod.ts";



export function panics(condition: boolean,msg?: string) {
  return function(_target: Object,_key: keyof any,descriptor: PropertyDescriptor) {
    descriptor.value=function(...args: unknown[]) {
      if(condition) $panic(msg);
      return descriptor.value(...args);
    }
    
    return descriptor;
  };
}


