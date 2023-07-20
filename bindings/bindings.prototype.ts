import { symbols } from "./bindings.ts";


export const prototypes: Deno.ForeignLibraryInterface={
  error_cfm: {
    parameters: ["buffer","buffer","u8"],
    result: "bool",
    nonblocking: true
  },
  message_cfm: {
    parameters: ["buffer","buffer","u8"],
    result: "bool",
    nonblocking: true
  },
  info_cfm: {
    parameters: ["buffer","buffer","u8"],
    result: "bool",
    nonblocking: true
  },
  warning_cfm: {
    parameters: ["buffer","buffer","u8"],
    result: "bool",
    nonblocking: true
  },
  error_cfm_sync: {
    parameters: ["buffer","buffer","u8"],
    result: "bool"
  },
  message_cfm_sync: {
    parameters: ["buffer","buffer","u8"],
    result: "bool"
  },
  info_cfm_sync: {
    parameters: ["buffer","buffer","u8"],
    result: "bool"
  },
  warning_cfm_sync: {
    parameters: ["buffer","buffer","u8"],
    result: "bool"
  },
  spawn: {
    parameters: ["function"],
    result: "void"
  }
};


