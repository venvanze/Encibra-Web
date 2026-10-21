"use client";
import { useEffect, useRef, useState } from "react";

const EVENTO = "manual:toast";

/** Mostra um aviso curto no rodapé da tela. Pode ser chamado de qualquer componente do cliente. */
export function avisar(texto: string, cores: string[] = []) {
  window.dispatchEvent(new CustomEvent<Aviso>(EVENTO, { detail: { texto, cores } }));
}

type Aviso = { texto: string; cores: string[] };

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
          <span>{aviso.texto}</span>
        </>
      )}
    </div>
  );
}
