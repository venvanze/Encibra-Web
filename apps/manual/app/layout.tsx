import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@encibra/marca/tokens.css";
import "@encibra/marca/fontes.css";
import "./manual.css";
import { Clarity } from "./Clarity";

export const metadata: Metadata = {
  title: "Manual de Marca Encibra",
  description: "Guia de identidade visual da Encibra: logotipo, cores com CMYK e Pantone, paleta estendida, tipografia, grafismo e aplicações.",
  // Aponta a versão em Markdown para LLMs e ferramentas que leem a página.
  alternates: { types: { "text/markdown": "/llms-full.txt", "text/plain": "/llms.txt" } },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Clarity />
      </body>
    </html>
  );
}
