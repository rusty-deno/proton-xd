import { XD,$url } from "./mod/mod.ts";


const app=new XD($url("./index.html",import.meta.url));


// app.window.setWindowIcon($url("./next.ico",import.meta.url));
app.window.setWindowIcon({height: 0,width: 0,rgba: new Uint8Array});


app.spawn();
