"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AZULEJO_HERO, criarForma, verticesAzulejo } from "./formaChanfrada";
import { CAPA, azulejosCapa } from "./capaGrafismo";

/**
 * Capa em tela cheia: linhas de grafismo brancas sobre o gradiente Carvão claro, que esmaece
 * conforme a página rola, e uma faixa ouro sólida (só com ruído) com o título dentro do grid.
 * A faixa é recortada em px a partir da caixa real, para os cantos e filetes não deformarem.
 */
export function CapaHero({ fundo, cor, children, rodape }: { fundo: string; cor: string; children: ReactNode; rodape: ReactNode }) {
  const capa = useRef<HTMLElement>(null);
  const faixa = useRef<HTMLDivElement>(null);
  const [recorte, setRecorte] = useState<string>();

  useEffect(() => {
    const el = faixa.current;
    if (!el) return;
    const medir = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      // Cantos na proporção do azulejo, na escala da altura da faixa
      const s = h / AZULEJO_HERO.altura;
      const medidas = { ...AZULEJO_HERO, raioCanto: AZULEJO_HERO.raioCanto * s, raioFilete: AZULEJO_HERO.raioFilete * s, corteChanfro: AZULEJO_HERO.corteChanfro * s };
      setRecorte(`path("${criarForma(verticesAzulejo(w, h, medidas)).caminho()}")`);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = capa.current;
    if (!el) return;
    let quadro = 0;
    // O fundo vai de opaco a transparente na primeira parte da rolagem (some com 60% da capa rolada)
    const atualizar = () => {
      quadro = 0;
      const t = Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight * 0.6)));
      el.style.setProperty("--esmaecer", String(1 - t));
    };
    const rolar = () => { if (!quadro) quadro = requestAnimationFrame(atualizar); };
    atualizar();
    window.addEventListener("scroll", rolar, { passive: true });
    return () => { window.removeEventListener("scroll", rolar); cancelAnimationFrame(quadro); };
  }, []);

  return (
    <header className="capa" ref={capa}>
      <div className="capa-fundo" aria-hidden="true">
        <div className="capa-mesh" style={{ background: fundo }}><span className="fx-ruido" /></div>
        <svg className="capa-linhas" viewBox={`0 0 ${CAPA.largura} ${CAPA.altura}`} preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="capa-luz" cx="62%" cy="48%" r="70%">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity=".25" />
            </radialGradient>
            <mask id="capa-mascara"><rect width="100%" height="100%" fill="url(#capa-luz)" /></mask>
          </defs>
          <g mask="url(#capa-mascara)" fill="none" stroke="#fff" strokeWidth={CAPA.traco}>
            {azulejosCapa.map((a, i) => <path key={i} d={a.d} transform={`translate(${a.x} ${a.y})`} />)}
          </g>
        </svg>
      </div>
      <div className="capa-faixa" ref={faixa} style={{ background: cor, clipPath: recorte, visibility: recorte ? undefined : "hidden" }}>
        <span className="fx-ruido" />
        <div className="wrap capa-texto">{children}</div>
      </div>
      <div className="wrap capa-meta">{rodape}</div>
    </header>
  );
}
