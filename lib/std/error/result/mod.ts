export * from "./result.ts";
export * from "./macros.ts";
export * from "./async_result.ts";


export type Res<T,E>={ ok: T }|{ err: E };