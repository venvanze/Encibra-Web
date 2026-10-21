"use client";
import { useState } from "react";
import { copiarTexto, IconeCopiar } from "./copiar";

// Copia a seção em Markdown, pronta para colar em um chat com uma LLM.
export function CopiarLLM({ texto, titulo }: { texto: string; titulo: string }) {
  const [estado, setEstado] = useState<"" | "ok" | "erro">("");

  async function copiar() {
    setEstado((await copiarTexto(texto)) ? "ok" : "erro");
    setTimeout(() => setEstado(""), 2400);
  }

  return (
    <button type="button" className="copiar-llm" onClick={copiar} aria-label={`Copiar a seção ${titulo} em Markdown para LLM`}>
      <IconeCopiar />
      <span aria-live="polite">{estado === "ok" ? "Copiado" : estado === "erro" ? "Não foi possível copiar" : "Copiar para LLM"}</span>
    </button>
  );
}
