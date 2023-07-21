import { symbols } from "./bindings.ts";


export const prototypes: Deno.ForeignLibraryInterface={
  confirm: {
    parameters: ["buffer","buffer","u8"],
    result: "bool",
    nonblocking: true
  },
  confirm_sync: {
    parameters: ["buffer","buffer","u8"],
    result: "bool"
  }
};


