import { FileOpenerType } from "../../../bindings/bindings.ts";

export interface FileOpenerOptions {
    filename?: string;
    location?: string;
    type?: FileOpenerType
}

export enum MessageType {
    Info,
    Warning,
    Error
}

export interface SaveFileOptions {
    filename?: string;
    location?: string;
}
  