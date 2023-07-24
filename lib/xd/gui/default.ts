// deno-lint-ignore-file
import { FileOpenerOptions } from './type.ts';

export const defaultOptions={
    location: Deno.env.get("HOME")??"/home",
    filename: "",
    type: "SingleFile"
} satisfies FileOpenerOptions;