
const process=new Deno.Command("deno",{
    args: ["run","-A","./deno_bindgen/cli.ts"],
    stdout: "piped",
}).spawn();

console.log(process.stdout);


