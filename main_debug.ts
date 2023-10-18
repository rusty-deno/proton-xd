// import { Server } from "./lib/mod.ts";
// import { Option, Some } from "./lib/mod.ts";
// import { BinaryTree } from "./mod/collections.ts";
import { LinkedList } from "./mod/collections.ts";


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


// console.log(...tree);

const ll=new LinkedList(1,2,3,4,5,69);


// for(const _ of ll) {
//   console.log(ll.popBack());
// }


console.dir(ll.back);
// console.log(ll.popBack());



