// import { Server } from "./lib/mod.ts";
// import { Option, Some } from "./lib/mod.ts";
// import { BinaryTree } from "./mod/collections.ts";
import { LinkedList } from './lib/std/collections/linear/linked_list/linked_list.ts';


// const app=new Server;


// app.get("/",()=> {
  



//   return new Response;
// });


// app.listen();

// const tree=new BinaryTree({
//   data: 1,
//   left: Some({
//     data: 2,
//     left: Some({
//       data: 4,
//       left: Option.None,
//       right: Option.None
//     }),
//     right: Some({
//       data: 5,
//       left: Option.None,
//       right: Option.None
//     })
//   }),
//   right: Some({
//     data: 3,
//     left: Option.None,
//     right: Option.None
//   })
// });


// console.log("xd");
// console.log(...tree);


const ll=new LinkedList(69,1,2,3,4,5);

while(!ll.isEmpty()) {
  console.log(ll.popBack().value);
}

ll.pushBack(69);

console.log(ll.front,ll);




