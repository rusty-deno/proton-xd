import { XD,$url } from "./mod.ts";


XD.instantiate($url("./index.html",import.meta.url),{
  title: "my-app",
});



// const finalizer=new FinalizationRegistry((val)=> {
//   console.log("Xd",val);
// });

// const obj=[69];

// finalizer.register(obj,()=> {
//   console.log("xd");
// });




