// import { XD,$url } from "./mod.ts";


// XD.instantiate($url("./index.html",import.meta.url),{
//   title: "my-app",
// });


type Tree=(string|Tree)[];

const xd: Tree=[];

for await(const entity of Deno.readDir(`${Deno.env.get("HOME")}/Desktop`)) {
  xd.push(entity.name);
}

console.log(xd);


