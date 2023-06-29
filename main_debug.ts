



// const txt=await Deno.readTextFile("xd.txt").catch((err: Error)=> {
//   console.log(err);
  
// });

// console.log(txt);


try {
  const txt=Deno.readTextFileSync("https://localhost:6969/xd.ts");
} catch(err) {
  if(!(err instanceof Error)) Deno.exit(1);
  
  
  console.log(err);
}