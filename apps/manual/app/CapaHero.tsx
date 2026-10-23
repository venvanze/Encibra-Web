"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { criarForma, verticesAzulejo } from "./formaChanfrada";

/*
 * Grafismo oficial (packages/marca/assets/grafismo), na altura de 134,923 dos arquivos.
 * Vazado padrão e grande: os mesmos contornos dos SVGs, com traço fino de 1,5 px na tela.
 */
const ALTURA = 134.923;
const PADRAO = { largura: 154.819, d: "M43.4189 0.5H122.819C140.216 0.500058 154.319 14.6031 154.319 32V92.4453C154.319 96.5534 152.689 100.494 149.785 103.4L123.334 129.878C120.427 132.788 116.482 134.423 112.368 134.423H32C14.603 134.423 0.5 120.32 0.5 102.923V43.4463C0.5 39.3381 2.13067 35.3976 5.03418 32.4912L32.4541 5.04492C35.3612 2.1351 39.3057 0.500098 43.4189 0.5Z" };
const GRANDE = { largura: 246.336, d: "M43.4189 0.5H214.336C231.733 0.5 245.836 14.603 245.836 32V92.4453C245.836 96.5535 244.205 100.494 241.302 103.4L214.851 129.878C211.943 132.788 207.998 134.423 203.885 134.423H32C14.603 134.423 0.5 120.32 0.5 102.923V43.4463C0.5 39.3381 2.13067 35.3976 5.03418 32.4912L32.4541 5.04492C35.3612 2.1351 39.3057 0.500098 43.4189 0.5Z" };
// Cantos do grafismo em fração da altura, medidos nos arquivos oficiais: canto 32, filete 16 (metade), chanfro 36,3
const CANTO = 32 / ALTURA, FILETE = 16 / ALTURA, CHANFRO = 36.3 / ALTURA;
// Vão regular entre as formas, em fração da altura (o do frame 5851:721 do Figma)
const VAO = 0.1445;
// Grafismos do fundo com metade da altura da faixa, para aparecerem em maior quantidade
const ESCALA_FUNDO = 0.5;
// Ritmo das fileiras (P = padrão, G = grande), alternando A e B como no Figma
const FILEIRAS = [
  { formas: "PGPPPGPP", inicio: -0.6 },
  { formas: "GPGPPGPGPP", inicio: 0 },
];

type Azulejo = { x: number; y: number; d: string };

function montarFundo(largura: number, altura: number, topoFaixa: number, hFaixa: number): Azulejo[] {
  const h = hFaixa * ESCALA_FUNDO;
  const s = h / ALTURA, vao = VAO * h, passo = h + vao;
  const ys: number[] = [];
  // A faixa ouro fica afastada das fileiras pelo mesmo vão que separa os grafismos entre si
  const folga = vao;
  for (let y = topoFaixa - folga - h; y + h > 0; y -= passo) ys.unshift(y);
  for (let y = topoFaixa + hFaixa + folga; y < altura; y += passo) ys.push(y);
  return ys.flatMap((y) => {
    // As fileiras vizinhas da faixa são B; daí para cima e para baixo alternam com A
    const linha = Math.round((y < topoFaixa ? topoFaixa - folga - h - y : y - topoFaixa - hFaixa - folga) / passo) + 1;
    const { formas, inicio } = FILEIRAS[(linha % 2 + 2) % 2];
    const out: Azulejo[] = [];
    let x = inicio * h, k = 0;
    while (x < largura) {
      const f = formas[k % formas.length] === "G" ? GRANDE : PADRAO;
      const w = f.largura * s;
      if (x + w > 0) out.push({ x, y, d: f.d });
      x += w + vao; k++;
    }
    return out;
  });
}

/**
 * Capa em tela cheia: grafismo vazado branco sobre o gradiente Carvão claro, que ocupa a largura
 * da tela (passa por baixo do menu) e esmaece com a rolagem, e uma faixa ouro com ruído, em
 * gradiente complementar ao do fundo, com o título em preto no grid. Os grafismos do fundo têm metade da altura da faixa; todos com os cantos dos arquivos oficiais.
 */
export function CapaHero({ fundo, cor, children, rodape }: { fundo: string; cor: string; children: ReactNode; rodape: ReactNode }) {
  const capa = useRef<HTMLElement>(null);
  const caixaFundo = useRef<HTMLDivElement>(null);
  const faixa = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; s: number; dx: number; dy: number; azulejos: Azulejo[]; recorte: string }>();

  useEffect(() => {
    const f = caixaFundo.current, b = faixa.current;
    if (!f || !b) return;
    const medir = () => {
      const rf = f.getBoundingClientRect(), rb = b.getBoundingClientRect();
      const h = rb.height;
      const medidas = { largura: rb.width, altura: h, raioCanto: CANTO * h, raioFilete: FILETE * h, corteChanfro: CHANFRO * h };
      setGeo({
        w: rf.width, h: rf.height, s: (h * ESCALA_FUNDO) / ALTURA, dx: rb.left - rf.left, dy: rb.top - rf.top,
        azulejos: montarFundo(rf.width, rf.height, rb.top - rf.top, h),
        recorte: `path("${criarForma(verticesAzulejo(rb.width, h, medidas)).caminho()}")`,
      });
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(f); ro.observe(b);
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
      // Enquanto a capa ocupa a maior parte da tela, o menu lateral fica mais transparente
      document.documentElement.toggleAttribute("data-na-capa", window.scrollY < el.offsetHeight * 0.5);
    };
    const rolar = () => { if (!quadro) quadro = requestAnimationFrame(atualizar); };
    atualizar();
    window.addEventListener("scroll", rolar, { passive: true });
    return () => { window.removeEventListener("scroll", rolar); cancelAnimationFrame(quadro); document.documentElement.removeAttribute("data-na-capa"); };
  }, []);

  return (
    <header className="capa" ref={capa}>
      <div className="capa-fundo" ref={caixaFundo} aria-hidden="true">
        <div className="capa-mesh" style={{ background: fundo }}><span className="fx-ruido" /></div>
        {geo && (
          <svg className="capa-linhas" viewBox={`0 0 ${geo.w} ${geo.h}`}>
            <defs>
              <radialGradient id="capa-luz" cx="62%" cy="48%" r="70%">
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity=".25" />
              </radialGradient>
              <mask id="capa-mascara"><rect width="100%" height="100%" fill="url(#capa-luz)" /></mask>
            </defs>
            <g mask="url(#capa-mascara)" fill="none" stroke="#fff" strokeWidth={1.5} vectorEffect="non-scaling-stroke">
              {geo.azulejos.map((a, i) => <path key={i} d={a.d} transform={`translate(${a.x} ${a.y}) scale(${geo.s})`} vectorEffect="non-scaling-stroke" />)}
            </g>
          </svg>
        )}
        <div className="capa-difuso" />
      </div>
      {/* O gradiente da faixa é desenhado na caixa do fundo inteiro, para cada ponto ficar sobre o ponto inverso do Carvão */}
      <div className="capa-faixa" ref={faixa} style={{
        background: cor, clipPath: geo?.recorte, visibility: geo ? undefined : "hidden",
        backgroundSize: geo && `${geo.w}px ${geo.h}px`, backgroundPosition: geo && `${-geo.dx}px ${-geo.dy}px`,
      }}>
        <span className="fx-ruido" />
        <div className="wrap capa-texto">{children}</div>
      </div>
      <div className="wrap capa-meta">{rodape}</div>
    </header>
  );
}
