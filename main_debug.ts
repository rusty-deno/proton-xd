import { $fetch } from "./mod.ts";


for(let i=199;i<599;i++) {
  const res=await $fetch("http://localhost:6969/");
  const response=res.unwrap();
  console.log(response.status,response.statusText);
}


