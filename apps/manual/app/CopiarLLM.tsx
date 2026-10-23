"use client";
import { useState } from "react";
import { copiarTexto, IconeCopiar } from "./copiar";
import { avisar } from "./Toast";

// Copia a seção em Markdown, pronta para colar em um chat com uma LLM.
export function CopiarLLM({ texto, titulo }: { texto: string; titulo: string }) {
  const [estado, setEstado] = useState<"" | "ok" | "erro">("");

  async function copiar() {
    const ok = await copiarTexto(texto);
    setEstado(ok ? "ok" : "erro");
    avisar(ok ? `Seção ${titulo} copiada em Markdown. Cole no chat da sua LLM.` : "Não foi possível copiar. Tente de novo.", [], ok ? "llm" : "erro");
    setTimeout(() => setEstado(""), 2400);
  }

  return (
    <button type="button" className="copiar-llm" onClick={copiar} aria-label={`Copiar a seção ${titulo} em Markdown para LLM`}>
      <IconeCopiar />
      <span>{estado === "ok" ? "Copiado" : estado === "erro" ? "Não foi possível copiar" : "Copiar para LLM"}</span>
    </button>
  );
}
