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
    avisar(ok ? `Seção ${titulo} copiada em Markdown. Cole no chat da sua IA.` : "Não foi possível copiar. Tente de novo.", [], ok ? "llm" : "erro");
    setTimeout(() => setEstado(""), 2400);
  }

  return (
    <button type="button" className="copiar-llm" onClick={copiar} aria-label={`Copiar a seção ${titulo} em Markdown para IA`}>
      <IconeCopiar />
      {/* Os dois rótulos ficam empilhados e trocam com crossblur, como nas cores; o erro aparece só no aviso */}
      <span className="llm-rotulos" data-estado={estado === "ok" ? "ok" : undefined}>
        <span className="llm-normal">Copiar para IA</span>
        <span className="llm-ok" aria-hidden="true">Copiado</span>
      </span>
    </button>
  );
}
