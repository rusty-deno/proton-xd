

const server=Deno.serve(()=> new Response(Deno.readTextFileSync("index.html")));



