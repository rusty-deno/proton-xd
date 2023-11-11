// interface Lib extends Deno.DynamicLibrary<any> {
//   [Symbol.dispose](): void;
// }

// const _lib=Deno.dlopen(new URL("./target/release/xd.dll",import.meta.url),{
//   available_monitors: {
//     parameters: ["usize"],
//     result: "buffer",
//     nonblocking: false,
//   },
// })

// using lib={
//   ..._lib,
//   [Symbol.dispose]() {
//     _lib.close();
//   }
// };


// console.log(lib);

import { WindowXD } from "./lib/mod.ts";

const ss=await WindowXD.screenshot(1,1);

Deno.writeFileSync("xd.png",ss.pngSync("Best","NoFilter").unwrap());

