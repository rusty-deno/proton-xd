import Thread from "./lib/thread/mod.ts";
import { None,Some } from './lib/rust/option.ts';

let xd=None<number>(null);

const t=new Thread(()=> {
  xd=Some(69);
  console.log(xd);
});

t.spawn();

