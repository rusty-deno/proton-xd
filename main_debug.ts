
import { XD } from "./mod/mod.ts";


const xd=new XD("<html><body>hello wrld</body></html>",{
  devtools: true
});


xd.window.setMaximizable(false);




setTimeout(()=> console.log(xd.window),1000);



xd.spawn();



