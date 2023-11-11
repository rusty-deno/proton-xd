// interface Lib extends Deno.DynamicLibrary<any> {
//   [Symbol.dispose](): void;
// }

// const _lib=Deno.dlopen(new URL("./target/release/xd.dll",import.meta.url),{
//   available_monitors: {
//     parameters: ["usize"],
//     result: "buffer",
//     nonblocking: false,
//   },
// })

// using lib={
//   ..._lib,
//   [Symbol.dispose]() {
//     _lib.close();
//   }
// };


// console.log(lib);


const xd=["0","1","2","3","4","5","69"];

xd.reduce((prev,current)=> {
  console.log(prev,current);

  return prev+current;
});




