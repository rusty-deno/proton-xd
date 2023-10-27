import { XD } from "./lib/mod.ts";


const ss=await XD.screenshot(1,1);
await Deno.writeFile("xd.jpg",await ss.jpeg());

