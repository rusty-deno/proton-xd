import { fetchApi } from "./lib/mod.ts";
import { panic } from './lib/rust/error/panic.ts';


const res=(await fetchApi("http://localhost:6969/")).unwrapOrElse((e)=> {
  panic(e);
});

console.log();



