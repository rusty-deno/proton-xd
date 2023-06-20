import ProtonXD from './lib/mod.ts';

// ProtonXD.XD.init(new URL("http://127.0.0.1:5500/index.html"),{
//   title: "my-app"
// });
// "<html><body>hello wrld</body></html>"


const img=await ProtonXD.ScreenCapturer.screenshot(1,1);

Deno.writeTextFileSync("bytes.json",JSON.stringify([...img.bytes]));
Deno.writeTextFileSync("png.json",JSON.stringify([...img.png()]));
