import { Server } from "https://deno.land/std@0.193.0/http/server.ts";


const server=new Server({
  handler: _=> new Response,
});

server.close();

