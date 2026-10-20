// Índice no padrão llms.txt (https://llmstxt.org) para LLMs encontrarem o manual.
import { secoes } from "../dados";
import { cabecalho, URL_BASE } from "../llm";

export const dynamic = "force-static";

export function GET() {
  const corpo = `${cabecalho}

O manual inteiro em Markdown está em /llms-full.txt. Cada seção da página também tem um botão "Copiar para LLM".

## Manual

- [Manual completo em Markdown](${URL_BASE}/llms-full.txt): todas as seções em um arquivo
${secoes.map(([id, nome]) => `- [${nome}](${URL_BASE}/#${id})`).join("\n")}

## Arquivos

- [Logotipos em SVG](${URL_BASE}/downloads/logos/svg/logo-horizontal-cor.svg): também em /downloads/logos/pdf e /downloads/logos/png
- [Grafismos](${URL_BASE}/downloads/grafismo/svg/grafismo-padrao-simples-cheio-ouro.svg): pasta /downloads/grafismo/{svg,pdf,png}
`;
  return new Response(corpo, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
