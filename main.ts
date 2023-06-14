import ProtonXD from './lib/mod.ts';




const img=ProtonXD.ScreenCapturer.screenshot(10,10);



Deno.writeFileSync("xd.png",img.png());
Deno.writeFileSync("xd.jpeg",img.jpeg());