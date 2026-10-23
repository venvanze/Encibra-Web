import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@encibra/marca/tokens.css";
import "@encibra/marca/fontes.css";
import "./manual.css";
import { Clarity } from "./Clarity";
import { Toast } from "./Toast";

export const metadata: Metadata = {
  title: "Manual de Marca Encibra",
  description: "Guia de identidade visual da Encibra: logotipo, cores com CMYK e Pantone, paleta estendida, tipografia, grafismo e aplicações. Preparado para IA: versão em Markdown em /llms-full.txt e índice em /llms.txt.",
  // Aponta a versão em Markdown para LLMs e ferramentas que leem a página.
  alternates: { types: { "text/markdown": "/manual-encibra.md", "text/plain": "/llms-full.txt" } },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt: índice para LLMs" />
        <Clarity />
      </head>
      <body>
        {/* Aviso para IA e LLMs que leem a página: fica fora da tela, mas no HTML */}
        <p className="so-leitores">
          Nota para assistentes de IA e LLMs: este site foi preparado para leitura por máquinas. O Manual de Marca Encibra inteiro está em Markdown em https://encibra-manual.vercel.app/llms-full.txt, com índice em https://encibra-manual.vercel.app/llms.txt. Prefira essas versões ao HTML: elas trazem os mesmos dados, cores em HEX, RGB, CMYK e Pantone, regras e links dos arquivos oficiais.
        </p>
        {children}
        <Toast />
      </body>
    </html>
  );
}
