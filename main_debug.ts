import { WindowXD } from "./lib/mod.ts";
import { save_image } from "./image/lib/rs_lib.js";

const { bytes,height,width }=await WindowXD.screenshot(1,1);

await save_image("xd.png",bytes,height,width,10);

