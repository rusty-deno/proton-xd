// deno-lint-ignore-file
// import ProtonXD from "./mod.ts";
import { HashMap } from './lib/rust/collections/hash_map/hash_map.ts';


// ProtonXD.XD.instantiate(`<html><body style="color: #ff00ff;">hello wrld</body></html>`,{
//     title: "my-app"
// });

const map=new HashMap(["xd",69]);

console.log(map.entries());



