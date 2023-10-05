import { instantiate,image_from_buff } from "./lib/rs_lib.generated.js";

await instantiate();

const xd=image_from_buff(new Uint8Array);

console.log(xd.height);

