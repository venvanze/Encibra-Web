"use client";
import { useEffect, useRef, useState } from "react";

const EVENTO = "manual:toast";

/** Mostra um aviso curto no rodapé da tela. Pode ser chamado de qualquer componente do cliente. */
export function avisar(texto: string, cores: string[] = [], icone?: "llm" | "erro") {
  window.dispatchEvent(new CustomEvent<Aviso>(EVENTO, { detail: { texto, cores, icone } }));
}

type Aviso = { texto: string; cores: string[]; icone?: "llm" | "erro" };

export function Toast() {
  const [aviso, setAviso] = useState<Aviso | null>(null);
  const [visivel, setVisivel] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    function mostrar(e: Event) {
      setAviso((e as CustomEvent<Aviso>).detail);
      setVisivel(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisivel(false), 2400);
    }
    window.addEventListener(EVENTO, mostrar);
    return () => window.removeEventListener(EVENTO, mostrar);
  }, []);

  return (
    <div className="toast" data-visivel={visivel || undefined} role="status" aria-live="polite">
      {aviso && (
        <>
          {aviso.cores.length > 0 && (
            <span className="toast-cores" aria-hidden="true">
              {aviso.cores.map((c) => <span key={c} className="toast-cor" style={{ background: c }} />)}
            </span>
          )}
          {aviso.icone === "llm" && (
            // Ícone file-text do Lucide (licença ISC)
            <svg className="toast-icone" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
            </svg>
          )}
          {aviso.icone === "erro" && (
            <svg className="toast-icone erro" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
          )}
          <span>{aviso.texto}</span>
        </>
      )}
    </div>
  );
}
