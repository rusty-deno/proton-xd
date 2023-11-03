
type Cmd=[string,string[]];

const COMPILE: Cmd=["cargo",["build","--release","--target","wasm32-unknown-unknown"]];
const BINDGEN: Cmd=["wasm-bindgen",["--target","deno","--weak-refs","--reference-types","--debug","--out-dir","lib","target/wasm32-unknown-unknown/release/rs_lib.wasm"]];

const run=([cmd,args]: Cmd)=> new Deno.Command(cmd,{
  args,
  cwd: new URL("./",import.meta.url)
}).spawn();


async function bindgen() {
  const status=await run(BINDGEN).status;
  const path=new URL("./lib/rs_lib.js",import.meta.url);

  const code=await Deno.readFile(path);
  const buff=[47,47,32,100,101,110,111,45,108,105,110,116,45,105,103,110,111,114,101,45,102,105,108,101,10,...code];// "// deno-lint-ignore-file"+code
  
  await Deno.writeFile(path,new Uint8Array(buff));

  return status.code;
}

async function compile() {
  const process=run(COMPILE);
  return (await process.status).code;
}

async function main() {
  switch(Deno.args[0]) {
    case "compile": return await compile();
    case "bindgen": return await bindgen();
    case "build": default: return await compile().then(bindgen);
  }
}

if(import.meta.main) Deno.exit(await main());