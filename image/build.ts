
function fn(opt?: "compile"|"bindgen"): [string,string] {
  switch(opt??Deno.args[0]) {
    case "compile":default: return ["cargo","build --release --target wasm32-unknown-unknown"];
    case "bindgen": return ["wasm-bindgen","--target deno --weak-refs --reference-types --debug --out-dir lib target/wasm32-unknown-unknown/release/rs_lib.wasm"];
    case "build":
      run(fn("compile"));
    return fn("bindgen");
  }
}

function run([cmd,args]: [string,string]) {
  return new Deno.Command(cmd,{
    args: args.split(" "),
    stdout: "piped"
  }).spawn()
}

const process=run(fn());
console.log(process.stdout);

Deno.exit((await process.status).code);
