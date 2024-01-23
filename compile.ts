
const process=new Deno.Command("cargo",{
  args: ["build"],
  stdout: "piped"
}).spawn();

console.log(process.stdout);
await process.status;


await Deno.copyFile(
  new URL("./target/debug/libxd.so",import.meta.url),
  new URL(`./bindings/bin/${Deno.build.target}.so`,import.meta.url)
);

