// import { Server } from "./lib/mod.ts";

// const app=new Server;


// app.get("/",()=> {
  



//   return new Response;
// });


// app.listen();


// const xd="/xd/lolxd/x/lolxd";
// const output=/\/xd\/(\w+)\/x\/(\w+)/;



const _input="/xd/:id/x/:id1/(xd|xd1|xd3)";
const xd=/:\w+|(\([\w+\|]+\))/g;

const out=_input.match(xd)!;

// console.log(out[2].split(/\||\(|\)/g).slice(1,4));
console.log(out);




