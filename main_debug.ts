import ProtonXD from './lib/mod.ts';
import { None,Some } from './lib/rust/option.ts';

// ProtonXD.XD.init(new URL("http://127.0.0.1:5500/index.html"),{
//   title: "my-app"
// });
// "<html><body>hello wrld</body></html>"

let xd=None<number>(null);


const fn=new Deno.UnsafeCallback({
  parameters: [],
  result: "void"
},()=> {
  xd=Some(69)
});

fn.callback();

console.log(xd);

