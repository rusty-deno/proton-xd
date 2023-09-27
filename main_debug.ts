import { XD,$url } from "./mod/mod.ts";


const app=new XD($url("./index.html",import.meta.url));


app.window.setWindowIcon($url("./next.ico",import.meta.url));




app.spawn();
