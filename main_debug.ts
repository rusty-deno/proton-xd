// deno-lint-ignore-file
// import { screenshot } from "./mod/mod.ts";
import { LinkedList } from './lib/std/collections/linear/linked_list/linked_list.ts';

const xd=[0,1,2,3,4,5,69];
const ll=new LinkedList<number>();

ll.appendFront(LinkedList.fromArray(xd));



console.log(ll.at(-4).value);


