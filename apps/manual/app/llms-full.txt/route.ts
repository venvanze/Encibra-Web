// O manual inteiro em Markdown, gerado dos mesmos dados da página.
import { manualCompleto } from "../llm";

export const dynamic = "force-static";

export function GET() {
  return new Response(manualCompleto + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
