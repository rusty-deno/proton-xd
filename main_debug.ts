import { WindowXD } from "./lib/mod.ts";
import { save_image } from './image/lib/rs_lib.js';

const ss=await WindowXD.screenshot(1,1);
save_image("xd.png",ss.bytes,ss.height,ss.width,10);


