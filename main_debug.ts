// deno-lint-ignore-file
// import { XD,$url } from "./mod/mod.ts";
import { CString } from './lib/std/ffi/c_string.ts';
import { LinkedList } from './lib/std/collections/linear/linked_list/linked_list.ts';


// const app=new XD($url("./index.html",import.meta.url));



// app.window.setWindowIcon({ height: 69,width: 69,rgba: new Uint8Array });


// app.spawn();

// const url=new URL("./next.svg",import.meta.url);
// const res=await fetch(url.href);
// const blob=await res.blob();
// const file=new File([blob],url.pathname);

// console.log(await file.arrayBuffer());


const xd=new LinkedList(69,0,69);

console.log(xd.popBack().unwrap());

console.dir(xd.front);




