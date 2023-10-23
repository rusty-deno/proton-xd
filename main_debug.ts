// import { Server } from "./lib/mod.ts";

// const app=new Server;


// app.get("/",()=> {
  



//   return new Response;
// });


// app.listen();
const xd="jhfaj/:aldfhalk(xd|69)/hfla/:xd69";
const regex=/:|\||(\(\w+\))/;


console.time("regex");
console.log(xd.match(regex));
console.timeEnd("regex");

console.time("str");
console.log(xd.search(regex));
console.timeEnd("str");

