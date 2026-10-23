// O manual inteiro em Markdown como arquivo .md, para o botão de download do topo da página.
import { manualCompleto } from "../llm";

export const dynamic = "force-static";

export function GET() {
  return new Response(manualCompleto + "\n", { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
