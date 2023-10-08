import { XD,$url } from './mod/mod.ts';



const xd=new XD($url("./index.html",import.meta.url),{},{
  title: "Document",
  closable: false
});


xd.spawn();

