
const process=new Deno.Command("cargo",{
  args: ["build"],
  stdout: "piped",
});

const cmd=process.spawn();

console.log(cmd.stdout);
