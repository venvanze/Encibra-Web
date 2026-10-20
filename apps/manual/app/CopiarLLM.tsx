"use client";
import { useState } from "react";

// Copia a seção em Markdown, pronta para colar em um chat com uma LLM.
export function CopiarLLM({ texto, titulo }: { texto: string; titulo: string }) {
  const [estado, setEstado] = useState<"" | "ok" | "erro">("");

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setEstado("ok");
    } catch {
      // Sem permissão de área de transferência: seleciona um textarea temporário.
      const area = document.createElement("textarea");
      area.value = texto;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      setEstado(document.execCommand("copy") ? "ok" : "erro");
      area.remove();
    }
    setTimeout(() => setEstado(""), 2400);
  }

  return (
    <button type="button" className="copiar-llm" onClick={copiar} aria-label={`Copiar a seção ${titulo} em Markdown para LLM`}>
      <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="9" height="9" rx="2" /><path d="M3 11V3a1 1 0 0 1 1-1h7" /></svg>
      <span aria-live="polite">{estado === "ok" ? "Copiado" : estado === "erro" ? "Não foi possível copiar" : "Copiar para LLM"}</span>
    </button>
  );
}
