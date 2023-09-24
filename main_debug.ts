
import { XD } from "./mod/mod.ts";


const xd=new XD("<html><body>hello wrld</body></html>",{
  devtools: true
});


xd.window.setMaximizable(false);


console.log(xd);

setTimeout(()=> console.log(xd.window),20000)



xd.spawn();



