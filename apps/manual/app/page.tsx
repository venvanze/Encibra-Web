import { contraste, cor, tokens, Logo } from "@encibra/marca";
import { Capitulo, Legenda, Rotulo } from "./componentes";
import { MenuLateral } from "./MenuLateral";
import { clarityAtivo } from "./Clarity";
import { Copiavel } from "./Copiavel";
import * as d from "./dados";
import { markdown } from "./llm";

function rgb(hex: string) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" · ");
}

function razao(a: string, b: string) {
  return `${contraste(a, b).toFixed(1).replace(".", ",")} : 1`;
}

// Texto legível sobre uma amostra: chumbo ou branco, o que tiver mais contraste.
function textoSobre(hex: string) {
  return contraste(hex, cor.chumbo) >= contraste(hex, cor.basico) ? cor.chumbo : cor.basico;
}

// Construção do grafismo: dois retângulos arredondados deslocados na diagonal e o contorno que os une.
// Largura = 1,1905 × altura; raio grande = 30% da largura; raio pequeno = metade do grande.
const G = (() => {
  const h = 100, w = 119.05, rb = 35.7, rs = 17.86, dd = 30, k = rs / Math.SQRT2;
  const ret = (x: number, y: number) =>
    `M${x + rs},${y} H${x + w - rb} A${rb},${rb} 0 0 1 ${x + w},${y + rb} V${y + h - rs} A${rs},${rs} 0 0 1 ${x + w - rs},${y + h} H${x + rb} A${rb},${rb} 0 0 1 ${x},${y + h - rb} V${y + rs} A${rs},${rs} 0 0 1 ${x + rs},${y} Z`;
  const contorno = [
    `M0,${dd + rs}`,
    `A${rs},${rs} 0 0 1 ${rs - k},${dd + rs - k}`,
    `L${dd + rs - k},${rs - k}`,
    `A${rs},${rs} 0 0 1 ${dd + rs},0`,
    `H${dd + w - rb}`,
    `A${rb},${rb} 0 0 1 ${dd + w},${rb}`,
    `V${h - rs}`,
    `A${rs},${rs} 0 0 1 ${dd + w - rs + k},${h - rs + k}`,
    `L${w - rs + k},${dd + h - rs + k}`,
    `A${rs},${rs} 0 0 1 ${w - rs},${dd + h}`,
    `H${rb}`,
    `A${rb},${rb} 0 0 1 0,${dd + h - rb}`,
    "Z",
  ].join(" ");
  return { a: ret(0, dd), b: ret(dd, 0), contorno, vb: `-6 -6 ${w + dd + 12} ${h + dd + 12}` };
})();

const etapas = [
  <><path d={G.a} className="g-guia" /><path d={G.b} className="g-guia" /></>,
  <><path d={G.a} className="g-guia" /><path d={G.b} className="g-guia" /><circle cx={35.7} cy={30 + 100 - 35.7} r={35.7} className="g-raio" /><circle cx={30 + 17.86} cy={17.86} r={17.86} className="g-raio" /></>,
  <><path d={G.a} className="g-guia" /><path d={G.b} className="g-guia" /><path d={G.contorno} className="g-linha" /></>,
  <path d={G.contorno} className="g-cheio" />,
];

// Gradiente mesh aproximado em CSS: quatro pontos de cor radiais sobre a cor base.
// Cada gradiente oficial tem um modo claro e um escuro.
type ModoMesh = "claro" | "escuro";
function mesh(id: string, modo: ModoMesh = "escuro") {
  const m = tokens.efeitos.mesh.find((x) => x.id === id)![modo];
  const [a, b, c, e] = m.pontos.map((p) => cor[p]);
  return [a, b, c, e].map((x, i) => `radial-gradient(at ${PONTOS_MESH[i][0]}% ${PONTOS_MESH[i][1]}%, ${x} 0, transparent ${PONTOS_MESH[i][2]}%)`).join(", ") + `, ${cor[m.base]}`;
}
// Pontos do mesh: posição (x, y) e até onde a cor se espalha antes de sumir.
const PONTOS_MESH = [[12, 18, 55], [88, 12, 50], [85, 88, 55], [15, 90, 50]] as const;

// Prompt para colar numa IA com as medidas exatas de um gradiente oficial.
function promptMesh(id: string, modo: ModoMesh) {
  const g = tokens.efeitos.mesh.find((x) => x.id === id)!;
  const m = g[modo];
  const texto = textoSobre(cor[m.base]) === cor.basico ? "branco #FFFFFF" : "chumbo #333333";
  const pontos = m.pontos.map((p, i) => {
    const [x, y, r] = PONTOS_MESH[i];
    return `${i + 1}. ${d.nomeDe(p)} ${cor[p]}, centro em x ${x}% e y ${y}%, sumindo para transparente em ${r}% da distância até o canto mais distante`;
  });
  return `Aplique o gradiente mesh oficial "${g.nome}" (modo ${modo}) do Manual de Marca Encibra, exatamente com estas medidas:

Cor de base (fundo sólido por baixo de tudo): ${d.nomeDe(m.base)} ${cor[m.base]}

Quatro pontos de cor radiais sobre a base, nesta ordem de camada:
${pontos.join("\n")}

CSS de referência:
background: ${mesh(id, modo)};

Textura de ruído por cima: granulação monocromática em modo de mesclagem overlay (sobreposição), 8% de opacidade no digital e 4% no impresso. Arquivo oficial: https://encibra-manual.vercel.app/downloads/texturas/ruido-512.png

Regras:
- Texto sobre este gradiente em ${texto}, com contraste mínimo de 4,5 : 1 no ponto mais claro do fundo.
- Se aplicar dentro do grafismo da Encibra (bloco com chanfros a 45° no canto superior esquerdo e no inferior direito), mantenha a forma intacta: cantos arredondados e filete nas quinas dos chanfros, nunca quina viva.
- Nunca aplique o gradiente no logotipo.
- Não adicione sombra, brilho ou reflexo.
- Não troque, não adicione e não reordene cores.`;
}
const vidro = tokens.efeitos.vidro;

const svgLogo = (base: string) => `/downloads/logos/svg/${base}.svg`;
const svgGrafismo = (arquivo: string, corG = "ouro") => `/downloads/grafismo/svg/${arquivo}-${corG}.svg`;

export default function Manual() {
  return (
    <div className="layout">
      <MenuLateral secoes={d.secoes} />
      <main className="conteudo" id="topo">

      <header className="capa">
        <div className="wrap">
          <div className="capa-arte" role="img" aria-label="Capa do manual sobre a faixa ouro da Encibra">
            <div className="capa-texto">
              <h1>Manual de Marca</h1>
              <p>Guia de identidade visual da Encibra</p>
            </div>
          </div>
          <div className="capa-meta">
            <a className="baixar-md" href="/manual-encibra.md" download="manual-de-marca-encibra.md">
              {/* Ícone download do Lucide (licença ISC) */}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
              Baixar manual em markdown (.md)
            </a>
          </div>
        </div>
      </header>

      <Capitulo id="principios" numero="01" titulo="Princípios" md={markdown.principios}
        lead="Este manual reúne as regras visuais da Encibra: logotipo, cores, tipografia, grafismo e aplicações. Ele consolida o padrão dos modelos oficiais e do manual no Figma, para que toda peça da empresa saia reconhecível.">
        <div className="grid g3">
          {d.principios.map(([t, x]) => (
            <div className="principio" key={t}><h3>{t}</h3><p>{x}</p></div>
          ))}
        </div>
      </Capitulo>

      <Capitulo id="logotipo" numero="02" titulo="Logotipo" fundo="intermedio" md={markdown.logotipo}
        lead="O logotipo combina o ícone, um “E” construído com o grafismo chanfrado, e o nome Encibra. A versão horizontal colorida sobre fundo claro é a principal.">
        <div className="sub principal">
          <Rotulo>Versão principal</Rotulo>
          <div className="palco p-basico"><Logo altura={120} style={{ width: "100%", height: "auto" }} /></div>
          <Legenda titulo="Horizontal colorida">Ícone em Ouro Encibra e nome em preto, para fundos brancos ou claros. É a versão do cabeçalho dos documentos.</Legenda>
        </div>

        <div className="sub">
          <Rotulo>Variações</Rotulo>
          <div className="grid g3">
            {d.variacoes.map((v) => (
              <div key={v.variante}>
                <div className={`palco ${v.fundo}`}><Logo variante={v.variante} altura={80} style={{ width: "100%", height: "auto" }} /></div>
                <Legenda titulo={v.titulo}>{v.texto}</Legenda>
              </div>
            ))}
          </div>
        </div>

        <div className="sub">
          <Rotulo>Ícone</Rotulo>
          <div className="grid g3">
            {d.icones.map((v) => (
              <div key={v.variante}>
                <div className={`palco icone ${v.fundo}`}><Logo variante={v.variante} altura={96} /></div>
                <Legenda titulo={v.titulo}>{v.texto}</Legenda>
              </div>
            ))}
          </div>
          <p className="nota" style={{ marginTop: 16 }}>O ícone sozinho só aparece quando o nome Encibra já está visível por perto ou quando o espaço é pequeno demais para a versão horizontal.</p>
        </div>

        <div className="sub grid aureo" style={{ alignItems: "start" }}>
          <div>
            <Rotulo>Área de proteção </Rotulo>
            <div className="protecao" role="img" aria-label="Logotipo com margem x em volta; x é metade da altura do ícone">
              <span className="x t">x</span><span className="x l">x</span><span className="x r">x</span><span className="x b">x</span>
              <div className="miolo"><Logo altura={70} /></div>
            </div>
            <p style={{ marginTop: 16 }}><b>x = metade da altura do ícone.</b> {d.protecao.regra}</p>
            <p className="muted">{d.protecao.porque}</p>
          </div>
          <div>
            <Rotulo>Tamanho mínimo </Rotulo>
            <div className="minimos">
              <figure><Logo altura={22} /><figcaption>Horizontal: 100 px · 25 mm</figcaption></figure>
              <figure><Logo variante="icone-amarelo" altura={20} /><figcaption>Ícone: 20 px · 6 mm</figcaption></figure>
            </div>
            <table className="t compacta" style={{ marginTop: 20 }}>
              <tbody>{d.protecao.minimos.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody>
            </table>
            <p className="muted" style={{ marginTop: 12 }}>{d.protecao.abaixo}</p>
          </div>
        </div>
        <p className="nota fontes">Referências: {d.fontesProtecao.map(([n, u], i) => <span key={u}>{i > 0 && " · "}<a href={u}>{n}</a></span>)}</p>
      </Capitulo>

      <Capitulo id="cores" numero="03" titulo="Cores" md={markdown.cores}
        lead="Cinco cores, com os nomes do manual no Figma. O Ouro Encibra é a cor da marca, o Cinza azulado é a cor de ação, e Chumbo, Intermédio e Básico fazem o texto e os fundos.">
        {/* Divisão áurea na primeira linha: marca e ação; a segunda linha leva as três cores de base */}
        {[tokens.cores.slice(0, 2), tokens.cores.slice(2)].map((linha, l) => (
          <div key={l} className={`cores-grid ${l === 0 ? "aureo" : "g3"}`}>
            {linha.map((c) => {
              const grande = l === 0;
              return (
                  <div key={c.id} className={grande ? "cor grande" : "cor"}>
                    <Copiavel valor={c.hex} rotulo={c.nome} className="amostra" style={{ background: c.hex, color: cor[c.texto] }} />
                    <dl className="dados">
                      <dt>Papel</dt><dd><b>{c.papel}</b></dd>
                      <dt>HEX</dt><dd><code>{c.hex}</code></dd>
                      <dt>RGB</dt><dd><code>{rgb(c.hex)}</code></dd>
                      <dt>CMYK</dt><dd><code>{c.cmyk}</code></dd>
                      <dt>Pantone</dt><dd><code>{c.pantone.c}</code><br /><code>{c.pantone.u}</code></dd>
                    </dl>
                    <div className="uso">{c.uso}{"impressao" in c && <><br /><i>{c.impressao}</i></>}</div>
                  </div>
              );
            })}
          </div>
        ))}
        <div className="sub nota-tecnica">
          <p className="nota"><b>CMYK</b> convertido com o perfil ICC ISO Coated v2 (FOGRA39), intenção colorimétrica relativa e compensação de ponto preto. Em papel não revestido, peça à gráfica a conversão com o perfil PSO Uncoated v3 (FOGRA52).</p>
          <p className="nota"><b>Pantone</b> escolhido pela menor diferença de cor (ΔE 2000) na biblioteca Solid Coated (C) e Uncoated (U). O 7408 U sai alaranjado no papel não revestido, por isso o ouro usa 7406 U. Confirme sempre na escala física antes da primeira impressão.</p>
        </div>

        <div className="sub">
          <Rotulo>Proporção de uso </Rotulo>
          <div className="proporcao">
            {d.proporcao.map((p) => (
              <Copiavel key={p.id} valor={cor[p.id]} rotulo={p.pct >= 10 ? `${p.rotulo} ${p.pct}%` : `${p.pct}%`} style={{ flex: p.pct, background: cor[p.id], color: textoSobre(cor[p.id]) }} />
            ))}
          </div>
          <p className="muted" style={{ marginTop: 12 }}>Em uma peça típica, o branco domina, o chumbo carrega o texto, o ouro aparece pouco e onde precisa ser visto, e o azulado marca as ações. Capas são a exceção: a faixa ouro é o centro delas.</p>
        </div>

        <div className="sub">
          <Rotulo>Combinações e legibilidade (WCAG 2.1)</Rotulo>
          <div className="tabela-wrap">
            <table className="t">
              <thead><tr><th>Combinação</th><th>Contraste</th><th>Texto corrido</th><th>Título grande</th></tr></thead>
              <tbody>
                {d.pares.map(([texto, fundo]) => {
                  const r = contraste(cor[texto], cor[fundo]);
                  return (
                    <tr key={texto + fundo}>
                      <td><span className="par" style={{ background: cor[fundo], color: cor[texto] }}>{d.nomeDe(texto)} / {d.nomeDe(fundo)}</span></td>
                      <td>{razao(cor[texto], cor[fundo])}</td>
                      <td className={r >= 4.5 ? "ok" : "nao"}>{r >= 4.5 ? "Sim" : "Não"}</td>
                      <td className={r >= 3 ? "ok" : "nao"}>{r >= 3 ? "Sim" : "Não"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="nota" style={{ marginTop: 12 }}>Texto corrido exige 4,5 : 1 e título grande exige 3 : 1. Por isso, sobre o ouro, o texto é sempre chumbo. Os valores são calculados a partir das cores oficiais.</p>
        </div>
      </Capitulo>

      <Capitulo id="paleta" numero="04" titulo="Paleta estendida" fundo="intermedio" md={markdown.paleta}
        lead="Tons e cores de apoio para gráficos, mapas, sinalização e interfaces. Eles saem das cores principais por regras de teoria das cores e nunca tomam o lugar delas.">
        <div className="grid g2 teoria">
          {d.teoria.map(([t, x]) => <div key={t}><h3>{t}</h3><p className="muted">{x}</p></div>)}
        </div>

        <div className="sub">
          <Rotulo>Escalas</Rotulo>
          {Object.entries(tokens.escalas).map(([id, e]) => (
            <div className="escala" key={id}>
              <b>{e.nome}</b>
              <div className="tons" style={{ "--n": Object.keys(e.tons).length } as React.CSSProperties}>
                {Object.entries(e.tons).map(([t, hex]) => {
                  const base = (id === "ouro" && t === "500") || (id === "cinza-azulado" && t === "700");
                  return (
                    <Copiavel key={t} valor={hex} rotulo={t} className={base ? "tom base" : "tom"} style={{ background: hex, color: textoSobre(hex) }} title={`--cor-${id}-${t}`}>
                      <code>{hex}</code>
                    </Copiavel>
                  );
                })}
              </div>
            </div>
          ))}
          <p className="nota">O tom marcado é a cor principal. Use os tons claros (50 a 200) como fundo e os escuros (700 a 900) para texto e linhas. Tokens: <code>--cor-ouro-700</code>, <code>--cor-neutro-600</code>; no Tailwind, <code>bg-ouro-50</code>.</p>
        </div>

        <div className="sub grid g2" style={{ alignItems: "start" }}>
          <div>
            <Rotulo>Cores de apoio</Rotulo>
            <div className="chips">
              {tokens.apoio.map((c) => (
                <div className="chip" key={c.id}>
                  <Copiavel valor={c.hex} rotulo="" className="chip-cor" style={{ background: c.hex, color: textoSobre(c.hex) }} />
                  <div><b>{c.nome}</b> <code>{c.hex}</code><span>{c.relacao}. Com branco: {razao(c.hex, "#FFFFFF")}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Rotulo>Cores de estado</Rotulo>
            <div className="chips">
              {tokens.semanticas.map((c) => (
                <div className="chip" key={c.id}>
                  <Copiavel valor={c.hex} rotulo="" className="chip-cor" style={{ background: c.hex, color: textoSobre(c.hex) }} />
                  <div><b>{c.nome}</b> <code>{c.hex}</code><span>{c.uso}. Com branco: {razao(c.hex, "#FFFFFF")}</span></div>
                </div>
              ))}
            </div>
            <p className="nota" style={{ marginTop: 12 }}>A atenção não passa 4,5 : 1 com branco: use em ícones, barras e fundos, com o texto em chumbo.</p>
          </div>
        </div>

        <div className="sub">
          <Rotulo>Exemplo: gráfico</Rotulo>
          <div className="grafico" role="img" aria-label="Gráfico de barras de exemplo nas cores da paleta estendida">
            {([["ouro", 86], ["cinza-azulado-700", 64], ["cinza-azulado-400", 52], ["ambar", 38], ["petroleo", 30], ["neutro-300", 18]] as const).map(([id, v]) => (
              <div key={id} className="barra"><div style={{ height: `${v}%`, background: cor[id] }} /><span>{d.nomeDe(id)}</span></div>
            ))}
          </div>
          <p className="nota" style={{ marginTop: 12 }}>Ordem sugerida das séries: Ouro, Cinza azulado 700, Cinza azulado 400, Âmbar, Petróleo e Neutro 300 para “outros”. Valores ilustrativos.</p>
        </div>
      </Capitulo>

      <Capitulo id="tipografia" numero="05" titulo="Tipografia" md={markdown.tipografia}
        lead="DM Sans é a voz da marca: geométrica, direta e com pesos fortes. Em documentos Word, o texto corrido usa Aptos, a fonte padrão do Microsoft 365, pela leitura confortável em páginas longas.">
        <div className="grid aureo-inv" style={{ alignItems: "start" }}>
          <div className="especime">
            <Rotulo>Fonte principal</Rotulo>
            <div className="aa">Aa</div>
            <h3 style={{ marginTop: 20, fontSize: 28 }}>DM Sans</h3>
            <div className="chars">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 ÁÉÍÓÚ ÂÊÔ ÃÕ Ç à ç ã õ &amp; % R$</div>
          </div>
          <div>
            <Rotulo>Escala do manual no Figma</Rotulo>
            <div className="escala-tipo">
              {d.tipos.map((t) => (
                <div key={t.nivel} className="nivel">
                  <div style={{ fontSize: t.exemplo, fontWeight: t.peso, lineHeight: 1.1 }}>{t.nivel}</div>
                  <div className="info"><b>{t.fonte}</b> · {t.tamanho}<br />{t.regra}</div>
                </div>
              ))}
            </div>
            <p className="nota">O subtítulo tem 70% do título e o texto tem 50% do subtítulo. Com título de 48 px: subtítulo 34 px, texto 17 px. DM Sans Black fica para títulos de capa e números grandes.</p>
          </div>
        </div>

        <div className="sub grid g2" style={{ alignItems: "start" }}>
          <div>
            <Rotulo>Documentos (A4)</Rotulo>
            <div className="tabela-wrap">
              <table className="t">
                <thead><tr><th>Elemento</th><th>Fonte</th><th>Regras</th></tr></thead>
                <tbody>
                  <tr><td>Título da capa</td><td>DM Sans Black</td><td>Sobre a faixa ouro</td></tr>
                  <tr><td>Títulos 1 a 4</td><td>DM Sans Bold</td><td>Numeração automática (1, 1.1, 1.1.1)</td></tr>
                  <tr><td>Corpo</td><td>Aptos 12 pt</td><td>Justificado, entrelinha 1,5, recuo de 1,25 cm</td></tr>
                  <tr><td>Tabelas</td><td>Aptos 9 pt</td><td>Cabeçalho em Intermédio</td></tr>
                  <tr><td>Legendas</td><td>Aptos, menor</td><td>Neutro 600</td></tr>
                </tbody>
              </table>
            </div>
            <p className="aptos-amostra">A Encibra atua na engenharia consultiva com rigor técnico e clareza. Este parágrafo mostra o corpo dos documentos em Aptos, justificado e com recuo de primeira linha.</p>
          </div>
          <div>
            <Rotulo>Apresentações (16:9)</Rotulo>
            <div className="tabela-wrap">
              <table className="t">
                <thead><tr><th>Elemento</th><th>Fonte</th><th>Tamanho e cor</th></tr></thead>
                <tbody>
                  <tr><td>Título da capa</td><td>DM Sans Black</td><td>32 pt, chumbo</td></tr>
                  <tr><td>Subtítulo da capa</td><td>DM Sans Regular</td><td>20 pt, chumbo a 60%</td></tr>
                  <tr><td>Rodapé da capa</td><td>DM Sans Regular</td><td>16 pt, chumbo a 30%</td></tr>
                  <tr><td>Número de seção</td><td>DM Sans Black</td><td>Ouro Encibra</td></tr>
                  <tr><td>Corpo e tópicos</td><td>DM Sans Regular</td><td>Chumbo</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Capitulo>

      <Capitulo id="grafismo" numero="06" titulo="Grafismo" fundo="intermedio" md={markdown.grafismo}
        lead="O grafismo é o bloco chanfrado que forma o ícone. Ele aparece sozinho, em padrões e como placa do logotipo, sempre com chanfros a 45° no canto superior esquerdo e no inferior direito.">
        <div className="sub">
          <Rotulo>Construção</Rotulo>
          <ol className="etapas">
            {d.grafismo.construcao.map(([t, x], i) => (
              <li key={t}>
                <svg viewBox={G.vb} aria-hidden="true">{etapas[i]}</svg>
                <b>{i + 1}. {t}</b>
                <span>{x}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="sub">
          <Rotulo>Variações</Rotulo>
          <p className="muted">Dois tamanhos, três estilos e dois preenchimentos, todos na mesma escala. Padrão e grande têm sempre a mesma altura e mudam só na largura. O expandido só existe no tamanho grande e é o único com altura diferente.</p>
          <div className="grid g5 grafismos">
            {d.variantesGrafismo.map((v) => (
              <figure key={v.arquivo}>
                <div className="palco-g p-basico"><img src={svgGrafismo(v.arquivo)} alt={`Grafismo ${v.titulo}`} style={{ width: `${(v.largura / 247) * 100}%` }} /></div>
                <figcaption>{v.titulo}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="sub">
          <Rotulo>Cores</Rotulo>
          <div className="grid g3">
            {d.grafismo.cores.map(([id, nome, fundo]) => (
              <figure key={id} className="cores-g">
                <div className={`palco-g ${fundo}`}>
                  <img src={svgGrafismo("grafismo-padrao-simples-cheio", id)} alt="" />
                  <img src={svgGrafismo("grafismo-padrao-duplo-vazado", id)} alt="" />
                  <img src={svgGrafismo("grafismo-grande-duplo-cheio", id)} alt="" />
                </div>
                <figcaption>{nome}{id === "branco" ? ", sobre fundos escuros e fotos" : id === "chumbo" ? ", em peças de uma cor e fundos claros" : ", a cor principal do grafismo"}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="sub">
          <Rotulo>Regras</Rotulo>
          <ul className="regras">{d.grafismo.regras.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>

        <div className="sub efeitos" id="efeitos">
          <Rotulo>Efeitos: vidro, gradiente mesh e ruído</Rotulo>
          <p className="muted">{d.efeitos.intro}</p>

          <div className="grid g3 efeitos-demo">
            <figure>
              <div className="palco-fx" style={{ background: mesh("noite") }}>
                <span className="fx-ruido" />
                <img className="fx-atras" src={svgGrafismo("grafismo-padrao-simples-cheio")} alt="" />
                <div className="fx-forma fx-vidro" style={{ background: vidro.preenchimento, backdropFilter: `blur(${vidro.desfoque}) saturate(${vidro.saturacao})`, WebkitBackdropFilter: `blur(${vidro.desfoque}) saturate(${vidro.saturacao})` }}>
                  <img src={svgGrafismo("grafismo-grande-simples-vazado", "branco")} alt="" />
                </div>
              </div>
              <figcaption><b>Vidro</b> Placa translúcida sobre o grafismo ouro e o gradiente.</figcaption>
            </figure>
            <figure>
              <div className="palco-fx p-basico">
                <div className="fx-forma" style={{ background: mesh("ouro", "claro") }}><span className="fx-ruido" /></div>
              </div>
              <figcaption><b>Gradiente mesh</b> Ouro quente dentro do grafismo grande, com ruído.</figcaption>
            </figure>
            <figure>
              <div className="palco-fx fx-comparar" style={{ background: mesh("encontro") }}>
                <span className="fx-ruido metade" />
                <span className="fx-rotulo esq">Sem ruído</span><span className="fx-rotulo dir">Com ruído</span>
              </div>
              <figcaption><b>Ruído</b> A granulação tira o aspecto plástico e evita faixas na impressão.</figcaption>
            </figure>
          </div>

          <div className="grid g3 efeitos-texto">
            {d.efeitos.lista.map((e) => (
              <div key={e.id}>
                <h3>{e.nome}</h3>
                <dl className="fx-dl">
                  <dt>O que é</dt><dd>{e.oque}</dd>
                  <dt>Como</dt><dd>{e.como}</dd>
                  <dt>Quando</dt><dd>{e.quando}</dd>
                  <dt>Meios</dt><dd>{e.meios}</dd>
                </dl>
              </div>
            ))}
          </div>

          <div className="sub">
            <Rotulo>Gradientes oficiais</Rotulo>
            <p className="muted" style={{ marginBottom: "var(--e4)" }}>Cada gradiente tem um modo claro, para peças e telas de fundo claro com texto chumbo, e um modo escuro, para fundos escuros com texto branco.</p>
            <div className="grid g4">
              {tokens.efeitos.mesh.map((m) => (
                <figure key={m.id} className="mesh-amostra">
                  <div className="mesh-par">
                    {(["claro", "escuro"] as const).map((modo) => {
                      const ids = [...new Set([m[modo].base, ...m[modo].pontos])];
                      return (
                        <Copiavel key={modo} valor={promptMesh(m.id, modo)} rotulo={modo === "claro" ? "Claro" : "Escuro"} className="mesh-copiar" textoHover="Copiar para IA"
                          aviso={`Prompt do ${m.nome} (${modo}) copiado. Cole na sua IA.`} cores={ids.map((p) => cor[p])}
                          title={`${m.nome}, modo ${modo}: ${ids.map((p) => d.nomeDe(p)).join(" · ")}`} style={{ background: mesh(m.id, modo), color: textoSobre(cor[m[modo].base]) }}><span className="fx-ruido" /></Copiavel>
                      );
                    })}
                  </div>
                  <figcaption><b>{m.nome}</b></figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="sub">
            <Rotulo>Intensidade por tipo de peça</Rotulo>
            <div className="tabela-wrap">
              <table className="t intensidade">
                <thead><tr><th>Peça</th><th>Vidro</th><th>Mesh</th><th>Ruído</th><th>Observação</th></tr></thead>
                <tbody>
                  {d.efeitos.intensidade.map(([peca, ...resto]) => (
                    <tr key={peca}>
                      <td>{peca}</td>
                      {(resto.slice(0, 3) as number[]).map((n, i) => (
                        <td key={i}><span className={`nivel-fx n${n}`} aria-hidden="true"><i /><i /><i /></span><span className="nivel-nome">{d.efeitos.niveis[n]}</span></td>
                      ))}
                      <td className="muted">{resto[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="sub">
            <Rotulo>Regras dos efeitos</Rotulo>
            <ul className="regras">{d.efeitos.regras.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
      </Capitulo>

      <Capitulo id="aplicacoes" numero="07" titulo="Aplicações" md={markdown.aplicacoes}
        lead="Como as regras se combinam nas peças mais comuns. Os modelos de Word e PowerPoint já aplicam tudo isso automaticamente.">
        <div className="sub">
          <Rotulo>Documentos (A4)</Rotulo>
          <div className="grid g3" style={{ alignItems: "start" }}>
            <div>
              <div className="a4"><div className="tit">Relatório de Inspeção Rodoviária</div></div>
              <Legenda titulo="Capa">Arte oficial com o título em DM Sans Black sobre a faixa.</Legenda>
            </div>
            <div>
              <div className="a4-pag">
                <div className="cab"><Logo altura={20} style={{ width: "26cqw", height: "auto" }} /></div>
                <h4>1 Introdução</h4>
                <p>Este relatório apresenta os resultados da inspeção realizada no trecho concedido, conforme o escopo contratado e os critérios aplicáveis.</p>
                <h5>1.1 Objetivo</h5>
                <p>Verificar o atendimento aos parâmetros de desempenho previstos no contrato de concessão.</p>
                <div className="dest">Caixa de destaque em Ouro 50 para conclusões e alertas.</div>
                <div className="rod"><span>Encibra · Relatório de Inspeção</span><span>3</span></div>
              </div>
              <Legenda titulo="Página interna">Logotipo à direita no cabeçalho, rodapé sem filete e numeração automática.</Legenda>
            </div>
            <div>
              <Rotulo>Indicadores</Rotulo>
              <div className="kpis" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
                <div className="kpi on"><b>98,4%</b><span>Indicador principal, em Ouro 50</span></div>
                <div className="kpi"><b>212 km</b><span>Indicador secundário, em Intermédio</span></div>
              </div>
              <div className="tabela-wrap" style={{ marginTop: 20 }}>
                <table className="t" style={{ fontSize: 13, fontFamily: "var(--aptos)" }}>
                  <thead><tr><th>Trecho</th><th>Extensão</th><th>Situação</th></tr></thead>
                  <tbody>
                    <tr><td>km 0 – 48</td><td>48 km</td><td style={{ color: cor.sucesso, fontWeight: 700 }}>Conforme</td></tr>
                    <tr><td>km 48 – 112</td><td>64 km</td><td style={{ color: cor.erro, fontWeight: 700 }}>Não conforme</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="nota" style={{ marginTop: 8 }}>Valores ilustrativos.</p>
            </div>
          </div>
        </div>

        <div className="sub">
          <Rotulo>Apresentações (16:9)</Rotulo>
          <div className="grid g2">
            <div>
              <div className="app-slide" style={{ backgroundImage: "url('/downloads/artes/capa-slide.jpg')" }}>
                <div className="titulo-capa"><strong>Proposta Técnica</strong><span>Inspeção da operação e desempenho</span><em>Cliente · outubro 2026</em></div>
              </div>
              <Legenda titulo="Capa">Título, subtítulo e rodapé, cada um no seu campo e na sua opacidade.</Legenda>
            </div>
            <div>
              <div className="app-slide" style={{ backgroundImage: "url('/downloads/artes/fundo-escuro.jpg')" }}>
                <div className="sep"><b>02</b><span>Metodologia</span></div>
              </div>
              <Legenda titulo="Separador de seção">Fundo chumbo, número grande em ouro e título em branco.</Legenda>
            </div>
          </div>
        </div>
      </Capitulo>

      <Capitulo id="incorretos" numero="08" titulo="Usos incorretos" fundo="intermedio" md={markdown.incorretos}
        lead="O logotipo, as cores e o grafismo só funcionam se forem usados sempre do mesmo jeito. Estes são os erros mais comuns.">
        <div className="grid g4 errado">
          {d.errados.map((e) => (
            <div key={e.titulo}>
              <div className={`palco ${e.fundo}`}><Logo altura={60} style={{ width: "100%", height: "auto", ...e.estilo }} /></div>
              <Legenda titulo={e.titulo}>{e.texto}</Legenda>
            </div>
          ))}
          <div>
            <div className="palco texto-erro p-basico" style={{ color: cor.ouro }}>Texto ouro sobre fundo branco</div>
            <Legenda titulo="Texto ouro">Contraste de {razao(cor.ouro, cor.basico)}. Ilegível.</Legenda>
          </div>
          <div>
            <div className="palco texto-erro p-basico" style={{ color: "#000000", fontFamily: "'Times New Roman', serif", fontWeight: 400 }}>Texto em preto puro e outra fonte</div>
            <Legenda titulo="Preto puro e fonte alheia">Texto é chumbo {cor.chumbo}, em DM Sans ou Aptos.</Legenda>
          </div>
          <div>
            <div className="palco p-basico">
              <svg viewBox="0 0 200 130" style={{ width: "70%" }} aria-hidden="true"><path d="M30,0 H200 V100 L170,130 H0 V30 Z" fill={cor.ouro} /></svg>
            </div>
            <Legenda titulo="Grafismo com quina viva">Toda quina leva filete, inclusive as do chanfro.</Legenda>
          </div>
          <div>
            <div className="palco p-basico">
              <img src={svgGrafismo("grafismo-padrao-simples-cheio")} alt="" style={{ width: "46%", transform: "scaleX(-1)" }} />
            </div>
            <Legenda titulo="Grafismo espelhado">Os chanfros ficam no canto superior esquerdo e no inferior direito.</Legenda>
          </div>
        </div>
      </Capitulo>

      <Capitulo id="arquivos" numero="09" titulo="Arquivos e modelos" fundo="escuro" md={markdown.arquivos}
        lead="Baixe sempre os arquivos oficiais desta página e nunca recrie o logotipo a partir de uma captura de tela.">
        <div className="sub">
          <Rotulo>Logotipos</Rotulo>
          <div className="formatos">
            {d.formatos.map(([f, , x]) => <p key={f}><b>{f}</b> {x}</p>)}
          </div>
          <div className="grid g4 logos-dl">
            {d.arquivosLogos.map((a) => (
              <div key={a.nome} className="logo-dl">
                <div className={`mini ${a.escuro ? "p-chumbo" : "p-basico"}`}>
                  <img src={svgLogo(a.base)} alt="" />
                </div>
                <b>{a.nome}</b>
                <p className="downloads">{a.links.map(([f, href]) => <a key={href} href={href} download>{f}</a>)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sub">
          <Rotulo>Grafismo</Rotulo>
          <p className="claro">{d.variantesGrafismo.length} formas em três cores, cada uma em SVG, PDF e PNG.</p>
          <div className="tabela-wrap">
            <table className="t escura">
              <thead><tr><th>Forma</th><th>Ouro</th><th>Chumbo</th><th>Branco</th></tr></thead>
              <tbody>
                {d.variantesGrafismo.map((v) => (
                  <tr key={v.arquivo}>
                    <td>{v.titulo}</td>
                    {["ouro", "chumbo", "branco"].map((c) => (
                      <td key={c} className="downloads">
                        {d.formatos.map(([f, ext]) => <a key={ext} href={`/downloads/grafismo/${ext}/${v.arquivo}-${c}.${ext}`} download>{f}</a>)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sub grid g2" style={{ columnGap: "var(--e5)" }}>
          {d.arquivosExtras.map((a) => (
            <div className="arquivo" key={a.titulo}>
              <div className="ico">{a.tipo}</div>
              <div>
                <b>{a.titulo}</b>
                <p>{a.texto}</p>
                <p className="downloads">{a.links.map(([nome, href]) => <a key={href} href={href} download>{nome}</a>)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sub">
          <Rotulo>Para LLMs</Rotulo>
          <p className="claro">O manual inteiro em Markdown está em <a href="/llms-full.txt">/llms-full.txt</a>, com índice em <a href="/llms.txt">/llms.txt</a>. Cada capítulo também tem o botão “Copiar para LLM”, que copia só aquele trecho.</p>
        </div>

        <div className="sub">
          <Rotulo>Histórico de versões</Rotulo>
          <ul className="aberto">{d.historico.map(([v, x]) => <li key={v}><b>{v}</b> · {x}</li>)}</ul>
        </div>
      </Capitulo>

      <footer className="fim">
        <div className="wrap">
          <Logo altura={20} />
          <span>Manual de Marca · versão {d.versao} · {d.data}</span>
          {clarityAtivo && <span className="fim-privacidade">Este site usa o Microsoft Clarity para entender como o manual é usado.</span>}
        </div>
      </footer>
      </main>
    </div>
  );
}
