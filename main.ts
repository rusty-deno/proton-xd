import ProtonXD from './lib/mod.ts';



const img=await ProtonXD.ScreenCapturer.screenshot(10,10);


Deno.writeFileSync("./xd.png",img.png());

