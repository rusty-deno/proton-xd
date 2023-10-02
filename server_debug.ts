

Deno.serve(async ()=> new Response(await Deno.readTextFile("./index.html")));

