"use client";
import { useState, type CSSProperties, type ReactNode } from "react";
import { copiarTexto, IconeCopiar } from "./copiar";

/**
 * Amostra de cor que copia o valor no clique. O rótulo troca para "Copiar" ao passar o mouse
 * ou focar pelo teclado, e para "Copiado" depois do clique.
 */
export function Copiavel({
  valor, rotulo, className = "", style, title, children,
}: {
  valor: string; rotulo: ReactNode; className?: string; style?: CSSProperties; title?: string; children?: ReactNode;
}) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    if (await copiarTexto(valor)) {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1600);
    }
  }

  return (
    <button type="button" className={`copiavel ${className}`} style={style} title={title} onClick={copiar}
      aria-label={`Copiar ${valor}`} data-copiado={copiado || undefined}>
      <span className="copiavel-rotulo">
        <span className="r-normal">{rotulo}</span>
        <span className="r-hover" aria-hidden="true">Copiar <IconeCopiar /></span>
        <span className="r-ok" aria-live="polite">{copiado ? "Copiado" : ""}</span>
      </span>
      {children}
    </button>
  );
}
