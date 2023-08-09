export * from "./thread.ts";



export async function spawn<T>(callback: ()=> T,name?: string) {
  return (await import("./thread.ts")).Thread.spawn(callback,name);
}
