import { read } from "./docs.ts";

const content = read()

Deno.writeTextFileSync(Deno.cwd() + "/docs.json", JSON.stringify(content))