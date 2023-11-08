const { args }=Deno;
const test=`${args.pop()!}_test.ts`;

if(args.length) args.unshift("--filter");
args.unshift("test",test);

const process=new Deno.Command("deno",{
  args,
  cwd: new URL("./",import.meta.url),
  stdout: "piped",
}).spawn();

console.log(process.stdout);

Deno.exit((await process.status).code);




