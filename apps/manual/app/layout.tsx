import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@encibra/marca/tokens.css";
import "@encibra/marca/fontes.css";
import "./manual.css";

export const metadata: Metadata = {
  title: "Manual de Marca Encibra",
  description: "Guia de identidade visual da Encibra S.A.: logotipo, cores, tipografia, elementos gráficos e aplicações.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
