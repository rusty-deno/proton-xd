
import { XD } from "./mod/mod.ts";


const xd=new XD("<html><body>hello wrld</body></html>",{},{
  devtools: true
});


xd.setBackgroundColor("#ff00ff");


xd.spawn();