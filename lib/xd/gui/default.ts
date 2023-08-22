// deno-lint-ignore-file
import { FileOpenerOptions,SaveFileOptions } from './type.ts';

/**
 * Default value of FileOpenerOptions
 */
export const defaultFileOpenerOptions={
    location: Deno.env.get("HOME")??"/home",
    filename: "",
    type: "SingleFile"
} satisfies FileOpenerOptions;

export const defaultSaveFileOptions={
    filename: "",
    location: Deno.env.get("HOME")??"/home"
} satisfies SaveFileOptions;