// import { XD,$url } from "./mod.ts";

// XD.instantiate($url("./index.html",import.meta.url),{
//   title: "my-app",
// });

const xd=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const set=new Set<number>();

for(const entity of xd) {
  const xd=entity.charCodeAt(1)&entity.length;
  console.log(xd);
  set.add(xd);
}

console.log(set.size);



