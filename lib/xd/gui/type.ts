import { FileOpenerType } from "../../../bindings/bindings.ts";

export interface FileOpenerOptions {
    filename?: string;
    location?: string;
    type?: FileOpenerType
}

