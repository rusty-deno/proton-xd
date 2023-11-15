export * from "./thread.ts";
import { Thread } from "./thread.ts";



// deno-lint-ignore require-await
export async function $spawn<T>(callback: ()=> T,name?: string) {
  return Thread.spawn(callback,name);
}
