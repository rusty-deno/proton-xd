// deno-lint-ignore-file
// import ProtonXD from "./mod.ts";

import { readToStringSync } from "./lib/rust/fs/mod.ts";

// ProtonXD.XD.instantiate("<html><body>hello wrld</body></html>",{
//     title: "my-app"
// });

// import sum from "npm:hash-sum";


// const set=new Set;


// for(let i=1;i<=100;i++) {
//     let x=Number.parseInt("0x"+sum({i}));
//     set.add(x);
// }





const prototype=readToStringSync("./bindings/bindings.prototype.json").or("{}").trim();




console.log(prototype.substring(1,prototype.length-1));
