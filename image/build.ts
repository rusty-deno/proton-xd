
type Cmd=[string,string[]];

const COMPILE: Cmd=["cargo",["build","--release","--target","wasm32-unknown-unknown"]];
const BINDGEN: Cmd=["wasm-bindgen",["--target","deno","--weak-refs","--reference-types","--debug","--out-dir","lib","target/wasm32-unknown-unknown/release/rs_lib.wasm"]];
const CLEAN: Cmd=["cargo",["clean"]];


const run=([cmd,args]: Cmd)=> new Deno.Command(cmd,{
  args,
  cwd: new URL("./",import.meta.url),
  stdout: "piped",
}).spawn();


async function bindgen() {
  const process=run(BINDGEN);
  console.log(process.stdout);
  const { code }=await process.status;
  

  const cwd=Deno.cwd();
  Deno.chdir(new URL("./lib/",import.meta.url));

  for await(const { name } of Deno.readDir("./")) {
    if(!name.endsWith("s")) continue;

    const code=await Deno.readTextFile(name);
    await Deno.writeTextFile(name,"// deno-lint-ignore-file\n"+code);
  }

  Deno.chdir(cwd);
  return code;
}

async function compile() {
  const process=run(COMPILE);
  return (await process.status).code;
}

async function clean() {
  const { code }=await run(CLEAN).status;
  const cwd=Deno.cwd();

  Deno.chdir(new URL("./lib/",import.meta.url));
  for await(const file of Deno.readDir("./")) {
    Deno.remove(file.name);
  }

  Deno.chdir(cwd);
  return code;
}



async function main() {
  switch(Deno.args[0]) {
    case "compile": return await compile();
    case "bindgen": return await bindgen();
    case "clean": return clean();
    case "build": default: return await compile().then(bindgen);
  }
}

if(import.meta.main) Deno.exit(await main());