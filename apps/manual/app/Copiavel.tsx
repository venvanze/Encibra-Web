"use client";
import { useState, type CSSProperties, type ReactNode } from "react";
import { copiarTexto, IconeCopiar } from "./copiar";
import { avisar } from "./Toast";

/**
 * Amostra de cor que copia o valor no clique. O rótulo troca para "Copiar" ao passar o mouse
 * ou focar pelo teclado, e para "Copiado" depois do clique, com um aviso (toast) na tela.
 */
export function Copiavel({
  valor, rotulo, className = "", style, title, children, textoHover = "Copiar", aviso, cores: coresAviso,
}: {
  valor: string; rotulo: ReactNode; className?: string; style?: CSSProperties; title?: string; children?: ReactNode;
  /** Texto do hover; o padrão é "Copiar". */
  textoHover?: string;
  /** Texto e cores do aviso (toast); por padrão saem do próprio valor. */
  aviso?: string; cores?: string[];
}) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    if (await copiarTexto(valor)) {
      setCopiado(true);
      const cores = coresAviso ?? valor.match(/#[0-9a-f]{6}/gi) ?? [];
      avisar(aviso ?? (cores.length > 1 ? "Cores copiadas para a área de transferência" : `${valor} copiado para a área de transferência`), cores);
      setTimeout(() => setCopiado(false), 1600);
    }
  }

  return (
    <button type="button" className={`copiavel ${className}`} style={style} title={title} onClick={copiar}
      aria-label={aviso ? `${textoHover}: ${title ?? ""}` : `Copiar ${valor}`} data-copiado={copiado || undefined}>
      <span className="copiavel-rotulo">
        <span className="r-normal">{rotulo}</span>
        <span className="r-hover" aria-hidden="true">{textoHover} <IconeCopiar /></span>
        <span className="r-ok" aria-hidden="true">Copiado</span>
      </span>
      {children}
    </button>
  );
}
