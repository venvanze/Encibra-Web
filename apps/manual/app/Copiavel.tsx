"use client";
import { useState, type CSSProperties, type ReactNode } from "react";
import { copiarTexto, IconeCopiar } from "./copiar";
import { avisar } from "./Toast";

/**
 * Amostra de cor que copia o valor no clique. O rótulo troca para "Copiar" ao passar o mouse
 * ou focar pelo teclado, e para "Copiado" depois do clique, com um aviso (toast) na tela.
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
      const cores = valor.match(/#[0-9a-f]{6}/gi) ?? [];
      avisar(cores.length > 1 ? "Cores copiadas para a área de transferência" : `${valor} copiado para a área de transferência`, cores);
      setTimeout(() => setCopiado(false), 1600);
    }
  }

  return (
    <button type="button" className={`copiavel ${className}`} style={style} title={title} onClick={copiar}
      aria-label={`Copiar ${valor}`} data-copiado={copiado || undefined}>
      <span className="copiavel-rotulo">
        <span className="r-normal">{rotulo}</span>
        <span className="r-hover" aria-hidden="true">Copiar <IconeCopiar /></span>
        <span className="r-ok" aria-hidden="true">{copiado ? "Copiado" : ""}</span>
      </span>
      {children}
    </button>
  );
}
