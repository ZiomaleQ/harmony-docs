import { serve } from "https://deno.land/std@0.125.0/http/server.ts";
import { read } from "./docs.ts";
import { handler } from "./html.tsx";

const data = read();

function handleAPI(req: Request): Response | Promise<Response> {
  const params = new URLSearchParams((new URL(req.url)).searchParams);
  const node = params.get("node");

  if (!node) {
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const nodeData = data.find((val) => val.name === node);
  return new Response(JSON.stringify(nodeData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function handleRequest(req: Request): Response | Promise<Response> {
  const { pathname } = new URL(req.url);

  if (pathname.startsWith("/api")) return handleAPI(req);
  else return handler(req);
}

serve(handleRequest);
console.log("Listening on port http://localhost:8000");
