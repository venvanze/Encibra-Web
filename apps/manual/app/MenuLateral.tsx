"use client";

import { useEffect, useState } from "react";
import { Logo } from "@encibra/marca";
import { versao } from "./dados";

type Secao = readonly [id: string, nome: string];

/** Menu do manual: coluna fixa à esquerda no computador, barra no topo no celular. */
export function MenuLateral({ secoes }: { secoes: readonly Secao[] }) {
  const [ativa, setAtiva] = useState<string>(secoes[0][0]);

  // Marca no menu o capítulo que está na tela.
  useEffect(() => {
    const alvos = secoes.map(([id]) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtiva(visivel.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    alvos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [secoes]);

  return (
    <aside className="lateral">
      <a href="#topo" className="lateral-logo" aria-label="Voltar ao início">
        <Logo altura={26} />
        {/* Ícone house do Lucide (licença ISC), aparece ao lado do logo no hover */}
        <svg className="lateral-casa" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
      </a>
      <nav aria-label="Capítulos do manual">
        <ol>
          {secoes.map(([id, nome], i) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={ativa === id ? "location" : undefined}>
                <span className="lateral-num">{String(i + 1).padStart(2, "0")}</span>
                {nome}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <p className="lateral-rodape">Manual de Marca<br />versão {versao}</p>
    </aside>
  );
}
