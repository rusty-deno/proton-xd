export * from "./result.ts";
export * from "./macros.ts";




export type Res<T,E>={ ok: T }|{ err: E };