import { contraste, cor, logos, tokens, Logo, type VarianteLogo } from "@encibra/marca";
import { Capitulo, Legenda, Rotulo } from "./componentes";
import { MenuLateral } from "./MenuLateral";

const secoes = [
  ["principios", "Princípios"],
  ["logotipo", "Logotipo"],
  ["cores", "Cores"],
  ["tipografia", "Tipografia"],
  ["elementos", "Elementos"],
  ["aplicacoes", "Aplicações"],
  ["incorretos", "Usos incorretos"],
  ["arquivos", "Arquivos"],
] as const;

function rgb(hex: string) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(" · ");
}

function razao(a: string, b: string) {
  return `${contraste(a, b).toFixed(1).replace(".", ",")} : 1`;
}

// Pares de texto/fundo avaliados na tabela de legibilidade.
const pares: [texto: string, fundo: string][] = [
  ["grafite", "branco"],
  ["grafite", "destaque"],
  ["grafite", "amarelo"],
  ["amarelo", "grafite"],
  ["cinza", "branco"],
  ["cinza", "amarelo"],
  ["amarelo", "branco"],
  ["branco", "amarelo"],
];
const nomeCor = Object.fromEntries(tokens.cores.map((c) => [c.id, c.nome.split(" ")[0]]));

const variacoes: { variante: VarianteLogo; fundo: string; titulo: string; texto: string }[] = [
  { variante: "horizontal-negativo", fundo: "p-grafite", titulo: "Negativa com ícone amarelo", texto: "Para fundos grafite e escuros. Versão preferida em slides escuros." },
  { variante: "horizontal-preto", fundo: "p-branco", titulo: "Monocromática preta", texto: "Impressão em uma cor, carimbos, fundo amarelo e documentos em preto e branco." },
  { variante: "horizontal-branco", fundo: "p-escuro-foto", titulo: "Monocromática branca", texto: "Sobre fotos e fundos escuros com textura, onde o amarelo perderia leitura." },
];

const icones: { variante: VarianteLogo; fundo: string; titulo: string; texto: string }[] = [
  { variante: "icone-amarelo", fundo: "p-branco", titulo: "Amarelo", texto: "Avatar de redes, favicon, selos. Fundo claro ou grafite." },
  { variante: "icone-preto", fundo: "p-amarelo", titulo: "Preto", texto: "Sobre o amarelo da marca e em impressão de uma cor." },
  { variante: "icone-branco", fundo: "p-grafite", titulo: "Branco", texto: "Sobre fundos escuros e fotos." },
];

const errados: { fundo: string; estilo?: React.CSSProperties; titulo: string; texto: string }[] = [
  { fundo: "p-branco", estilo: { transform: "scaleX(1.35)" }, titulo: "Distorcer", texto: "Nunca esticar ou achatar." },
  { fundo: "p-branco", estilo: { transform: "rotate(-12deg)" }, titulo: "Girar", texto: "O logotipo fica sempre na horizontal." },
  { fundo: "p-branco", estilo: { filter: "drop-shadow(4px 6px 4px rgba(0,0,0,.45))" }, titulo: "Aplicar sombra", texto: "Nenhum efeito: sombra, brilho ou contorno." },
  { fundo: "p-branco", estilo: { filter: "hue-rotate(160deg) saturate(1.6)" }, titulo: "Trocar as cores", texto: "Use só as versões oficiais." },
  { fundo: "p-grafite", titulo: "Colorida no escuro", texto: "O nome preto some. Use a versão negativa." },
  { fundo: "p-amarelo", titulo: "Ícone amarelo no amarelo", texto: "Sobre o amarelo, use a versão preta." },
];

const arquivos = [
  { tipo: "PNG", titulo: "Logotipos", texto: "Versões horizontais e ícones nas cores oficiais.",
    links: Object.keys(logos).map((v) => [v, `/downloads/logos/${v === "horizontal-negativo" ? "logo-horizontal-neg-icone" : v.startsWith("icone") ? v : `logo-${v}`}.png`]) },
  { tipo: "TTF", titulo: "Fontes", texto: "DM Sans Regular, Bold e Black. Aptos vem com o Microsoft 365.",
    links: ["Regular", "Bold", "Black"].map((p) => [`DM Sans ${p}`, `/downloads/fonts/DMSans-${p}.ttf`]) },
  { tipo: "JPG", titulo: "Artes de fundo", texto: "Capa A4, capa de slide e fundo escuro com o padrão de blocos.",
    links: [["Capa A4", "/downloads/artes/capa-a4.jpg"], ["Capa de slide", "/downloads/artes/capa-slide.jpg"], ["Fundo escuro", "/downloads/artes/fundo-escuro.jpg"]] },
];

export default function Manual() {
  return (
    <div className="layout">
      <MenuLateral secoes={secoes} />
      <main className="conteudo" id="topo">

      <header className="capa">
        <div className="wrap">
          <div className="capa-arte" role="img" aria-label="Capa do manual sobre a faixa amarela da Encibra">
            <div className="capa-texto">
              <h1>Manual de Marca</h1>
              <p>Guia de identidade visual da Encibra S.A.</p>
            </div>
          </div>
          <div className="capa-meta">
            <span><b>Versão</b> 1.0 (rascunho)</span>
            <span><b>Data</b> outubro de 2026</span>
            <span><b>Base</b> modelos oficiais de documentos Word e apresentações</span>
          </div>
        </div>
      </header>

      <Capitulo id="principios" numero="01" titulo="Princípios"
        lead="Este manual reúne as regras visuais da Encibra: logotipo, cores, tipografia, elementos gráficos e aplicações. Ele consolida o padrão que já está nos modelos oficiais de documentos e apresentações, para que toda peça da empresa saia reconhecível e consistente.">
        <div className="grid g3">
          <div className="principio"><h3>Sem sombras, sem enfeites</h3><p>Nada de sombras, contornos ou traços decorativos. A identidade é plana e limpa, como um bom desenho técnico.</p></div>
          <div className="principio"><h3>Hierarquia por peso e cor</h3><p>O que é importante fica mais pesado (DM Sans Black) ou muda de cor. Não usamos caixas, sublinhados ou ícones para chamar atenção.</p></div>
          <div className="principio"><h3>Amarelo com intenção</h3><p>O amarelo marca o que importa: a faixa da capa, números, destaques. Texto corrido nunca é amarelo, e o texto nunca é preto puro.</p></div>
        </div>
      </Capitulo>

      <Capitulo id="logotipo" numero="02" titulo="Logotipo" fundo="papel"
        lead="O logotipo combina o ícone, um “E” construído com o bloco chanfrado da marca, e o nome Encibra. A versão horizontal colorida sobre fundo claro é a principal e deve ser usada sempre que possível.">
        <div className="sub principal">
          <Rotulo>Versão principal</Rotulo>
          <div className="palco p-branco"><Logo altura={120} style={{ width: "100%", height: "auto" }} /></div>
          <Legenda titulo="Horizontal colorida">Ícone amarelo e nome em preto. Para fundos brancos ou claros. É a versão do cabeçalho dos documentos.</Legenda>
        </div>

        <div className="sub">
          <Rotulo>Variações</Rotulo>
          <div className="grid g3">
            {variacoes.map((v) => (
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
            {icones.map((v) => (
              <div key={v.variante}>
                <div className={`palco icone ${v.fundo}`}><Logo variante={v.variante} altura={96} /></div>
                <Legenda titulo={v.titulo}>{v.texto}</Legenda>
              </div>
            ))}
          </div>
          <p className="nota" style={{ marginTop: 16 }}>O ícone sozinho só aparece quando o nome Encibra já está visível por perto ou o espaço é pequeno demais para a versão horizontal.</p>
        </div>

        <div className="sub grid g2" style={{ alignItems: "start" }}>
          <div>
            <Rotulo proposta>Área de proteção </Rotulo>
            <div className="protecao">
              <span className="x t">x</span><span className="x l">x</span>
              <div className="miolo"><Logo altura={70} /></div>
            </div>
            <p className="muted" style={{ marginTop: 16 }}>Mantenha livre ao redor do logotipo uma margem <b>x</b> igual a metade da altura do ícone. Nenhum texto, borda ou imagem entra nessa área.</p>
          </div>
          <div>
            <Rotulo proposta>Tamanho mínimo </Rotulo>
            <div className="minimos">
              <figure><Logo altura={22} /><figcaption>Horizontal: 100 px na tela ou 25 mm impresso</figcaption></figure>
              <figure><Logo variante="icone-amarelo" altura={24} /><figcaption>Ícone: 24 px ou 6 mm</figcaption></figure>
            </div>
            <p className="muted" style={{ marginTop: 16 }}>Abaixo disso o nome perde leitura. Em espaços menores, use só o ícone.</p>
          </div>
        </div>
      </Capitulo>

      <Capitulo id="cores" numero="03" titulo="Cores"
        lead="Uma paleta curta: o amarelo Encibra como cor de marca, o grafite para texto e fundos escuros, e três tons de apoio para cinzas, tabelas e destaques.">
        <div className="grid g4">
          {tokens.cores.map((c, i) => (
            <div key={c.id} className={i < 2 ? "cor grande" : "cor"}>
              <div className="amostra" style={{ background: c.hex, color: cor[c.texto] }}>{c.nome}</div>
              <div className="dados"><b>{c.papel}</b><code>HEX {c.hex}</code><code>RGB {rgb(c.hex)}</code></div>
              <div className="uso">{c.uso}</div>
            </div>
          ))}
        </div>
        <p className="nota" style={{ marginTop: 16 }}>Equivalentes CMYK e Pantone para impressão gráfica ainda não foram definidos.</p>

        <div className="sub">
          <Rotulo proposta>Proporção de uso </Rotulo>
          <div className="proporcao" role="img" aria-label="Branco 60%, grafite 25%, amarelo 10%, tons de apoio 5%">
            <div style={{ flex: 60, background: cor.branco, color: cor.grafite }}>Branco 60%</div>
            <div style={{ flex: 25, background: cor.grafite, color: cor.branco }}>Grafite 25%</div>
            <div style={{ flex: 10, background: cor.amarelo, color: cor.grafite }}>Amarelo 10%</div>
            <div style={{ flex: 5, background: cor.destaque, color: cor.grafite }}>5%</div>
          </div>
          <p className="muted" style={{ marginTop: 12 }}>Em uma peça típica, o branco domina, o grafite carrega o texto e o amarelo aparece pouco, onde precisa ser visto. Capas são a exceção: a faixa amarela é o centro delas.</p>
        </div>

        <div className="sub">
          <Rotulo>Combinações e legibilidade (WCAG 2.1)</Rotulo>
          <div className="tabela-wrap">
            <table className="t">
              <thead><tr><th>Combinação</th><th>Contraste</th><th>Texto corrido</th><th>Título grande</th></tr></thead>
              <tbody>
                {pares.map(([texto, fundo]) => {
                  const r = contraste(cor[texto], cor[fundo]);
                  return (
                    <tr key={texto + fundo}>
                      <td><span className="par" style={{ background: cor[fundo], color: cor[texto] }}>{nomeCor[texto]} / {nomeCor[fundo].toLowerCase()}</span></td>
                      <td>{razao(cor[texto], cor[fundo])}</td>
                      <td className={r >= 4.5 ? "ok" : "nao"}>{r >= 4.5 ? "Sim" : "Não"}</td>
                      <td className={r >= 3 ? "ok" : "nao"}>{r >= 3 ? "Sim" : "Não"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="nota" style={{ marginTop: 12 }}>Texto corrido exige 4,5 : 1 e título grande exige 3 : 1. Por isso, sobre o amarelo, o texto é sempre grafite. Os valores são calculados a partir das cores oficiais.</p>
        </div>
      </Capitulo>

      <Capitulo id="tipografia" numero="04" titulo="Tipografia" fundo="papel"
        lead="DM Sans é a voz da marca: geométrica, direta e com pesos fortes para títulos e números. Em documentos Word, o texto corrido usa Aptos, a fonte padrão do Microsoft 365, pela leitura confortável em páginas longas.">
        <div className="grid g2" style={{ alignItems: "start" }}>
          <div className="especime" style={{ background: "var(--branco)" }}>
            <Rotulo>Fonte principal</Rotulo>
            <div className="aa">Aa</div>
            <h3 style={{ marginTop: 20, fontSize: 28, fontWeight: 900 }}>DM Sans</h3>
            <div className="chars">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789 ÁÉÍÓÚ ÂÊÔ ÃÕ Ç à ç ã õ &amp; % R$</div>
          </div>
          <div className="pesos">
            {([[900, "Black", "Capas, títulos de slide, números"], [700, "Bold", "Títulos em documentos"], [400, "Regular", "Corpo em apresentações"]] as const).map(([peso, nome, uso]) => (
              <div className="peso" key={peso}>
                <div className="amostra-t" style={{ fontWeight: peso }}>Inspeção acreditada</div>
                <div className="info">{nome}<br />{uso}</div>
              </div>
            ))}
            <div className="peso" style={{ borderBottom: 0 }}>
              <div style={{ minWidth: 0 }}>
                <span className="rotulo" style={{ marginBottom: 6 }}>Aptos · corpo de documentos</span>
                <p className="aptos-amostra">A Encibra atua na engenharia consultiva com rigor técnico e clareza. Este parágrafo mostra o corpo dos documentos: Aptos 12 pt, justificado, com entrelinha 1,5 e recuo de primeira linha de 1,25 cm.</p>
              </div>
              <div />
            </div>
          </div>
        </div>

        <div className="sub">
          <Rotulo>Hierarquia em documentos (A4)</Rotulo>
          <div className="tabela-wrap">
            <table className="t" style={{ background: "var(--branco)" }}>
              <thead><tr><th>Elemento</th><th>Fonte</th><th>Regras</th></tr></thead>
              <tbody>
                <tr><td>Título da capa</td><td>DM Sans Black</td><td>Sobre a faixa amarela, centralizado na vertical</td></tr>
                <tr><td>Título 1</td><td>DM Sans Bold</td><td>Caixa alta aplicada pelo estilo, numeração automática (1, 2, 3)</td></tr>
                <tr><td>Títulos 2 a 4</td><td>DM Sans Bold</td><td>Numeração automática (1.1, 1.1.1, 1.1.1.1), nunca digitada</td></tr>
                <tr><td>Corpo</td><td>Aptos 12 pt</td><td>Justificado, entrelinha 1,5, recuo de 1,25 cm, margens de 2,5 cm</td></tr>
                <tr><td>Tabelas</td><td>Aptos 9 pt</td><td>Cabeçalho em fundo papel {cor.papel}</td></tr>
                <tr><td>Legendas e fontes</td><td>Aptos, menor</td><td>Cinza {cor.cinza}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="sub">
          <Rotulo>Hierarquia em apresentações (16:9)</Rotulo>
          <div className="tabela-wrap">
            <table className="t" style={{ background: "var(--branco)" }}>
              <thead><tr><th>Elemento</th><th>Fonte</th><th>Tamanho e cor</th></tr></thead>
              <tbody>
                <tr><td>Título da capa</td><td>DM Sans Black</td><td>32 pt, grafite</td></tr>
                <tr><td>Subtítulo da capa</td><td>DM Sans Regular</td><td>20 pt, grafite a 60%</td></tr>
                <tr><td>Rodapé da capa (cliente, data)</td><td>DM Sans Regular</td><td>16 pt, grafite a 30%</td></tr>
                <tr><td>Número de seção e indicadores</td><td>DM Sans Black</td><td>Amarelo {cor.amarelo}</td></tr>
                <tr><td>Corpo e tópicos</td><td>DM Sans Regular</td><td>Grafite</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </Capitulo>

      <Capitulo id="elementos" numero="05" titulo="Elementos gráficos"
        lead="Tudo nasce da mesma forma: o bloco chanfrado do ícone, um retângulo com dois cantos opostos cortados a 45° e os outros dois arredondados.">
        <div className="grid g3">
          <div>
            <div className="forma-demo p-papel">
              <svg viewBox="0 0 200 130" aria-label="Bloco chanfrado"><path d="M34.64,0 H177.65 A22.35,22.35 0 0 1 200,22.35 V95.36 A11.19,11.19 0 0 1 196.72,103.28 L173.28,126.72 A11.19,11.19 0 0 1 165.36,130 H22.35 A22.35,22.35 0 0 1 0,107.65 V34.64 A11.19,11.19 0 0 1 3.28,26.72 L26.72,3.28 A11.19,11.19 0 0 1 34.64,0 Z" fill="var(--amarelo)" /></svg>
            </div>
            <Legenda titulo="Bloco chanfrado">Chanfro no canto superior esquerdo e no inferior direito, cantos arredondados nos outros dois. Todas as quinas levam filete, inclusive as do chanfro: o grafismo nunca tem quina viva.</Legenda>
          </div>
          <div>
            <div className="forma-demo p-branco" style={{ background: "url('/downloads/artes/capa-slide.jpg') center / cover" }} />
            <Legenda titulo="Faixa amarela">A faixa das capas recebe o título. Ela é arte oficial e não deve ser redesenhada.</Legenda>
          </div>
          <div>
            <div className="forma-demo" style={{ background: "url('/downloads/artes/fundo-escuro.jpg') center / cover" }} />
            <Legenda titulo="Padrão de blocos">Blocos em contorno fino, como textura de fundo, em slides escuros e capas.</Legenda>
          </div>
        </div>
      </Capitulo>

      <Capitulo id="aplicacoes" numero="06" titulo="Aplicações" fundo="papel"
        lead="Exemplos de como as regras se combinam nas peças mais comuns. Os modelos de Word e PowerPoint já aplicam tudo isso automaticamente.">
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
                <div className="dest">Caixa de destaque em fundo {cor.destaque} para conclusões e alertas.</div>
                <div className="rod"><span>Encibra S.A. — Relatório de Inspeção</span><span>3</span></div>
              </div>
              <Legenda titulo="Página interna">Logo à direita no cabeçalho, rodapé sem filete e numeração automática.</Legenda>
            </div>
            <div>
              <Rotulo>Indicadores</Rotulo>
              <div className="kpis" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
                <div className="kpi on"><b>98,4%</b><span>Indicador principal, em fundo destaque</span></div>
                <div className="kpi"><b>212 km</b><span>Indicador secundário, em fundo papel</span></div>
              </div>
              <div className="tabela-wrap" style={{ marginTop: 20 }}>
                <table className="t" style={{ background: "var(--branco)", fontSize: 13, fontFamily: "var(--aptos)" }}>
                  <thead><tr><th>Trecho</th><th>Extensão</th><th>Situação</th></tr></thead>
                  <tbody>
                    <tr><td>km 0 – 48</td><td>48 km</td><td>Conforme</td></tr>
                    <tr><td>km 48 – 112</td><td>64 km</td><td>Conforme</td></tr>
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
              <Legenda titulo="Separador de seção">Fundo grafite, número grande em amarelo e título em branco.</Legenda>
            </div>
          </div>
        </div>
      </Capitulo>

      <Capitulo id="incorretos" numero="07" titulo="Usos incorretos"
        lead="O logotipo e as cores só funcionam se forem usados sempre do mesmo jeito. Estes são os erros mais comuns.">
        <div className="grid g4 errado">
          {errados.map((e) => (
            <div key={e.titulo}>
              <div className={`palco ${e.fundo}`}><Logo altura={60} style={{ width: "100%", height: "auto", ...e.estilo }} /></div>
              <Legenda titulo={e.titulo}>{e.texto}</Legenda>
            </div>
          ))}
          <div>
            <div className="palco texto-erro p-branco" style={{ color: cor.amarelo }}>Texto amarelo sobre fundo branco</div>
            <Legenda titulo="Texto amarelo">Contraste de {razao(cor.amarelo, cor.branco)}. Ilegível.</Legenda>
          </div>
          <div>
            <div className="palco texto-erro p-branco" style={{ color: "#000000", fontFamily: "'Times New Roman', serif", fontWeight: 400 }}>Texto em preto puro e outra fonte</div>
            <Legenda titulo="Preto puro e fonte alheia">Texto é grafite {cor.grafite}, em DM Sans ou Aptos.</Legenda>
          </div>
        </div>
      </Capitulo>

      <Capitulo id="arquivos" numero="08" titulo="Arquivos e modelos" fundo="escuro"
        lead="Baixe sempre os arquivos oficiais desta página e nunca recrie o logotipo a partir de uma captura de tela.">
        <div className="grid g2" style={{ gap: "0 48px" }}>
          {arquivos.map((a) => (
            <div className="arquivo" key={a.titulo}>
              <div className="ico">{a.tipo}</div>
              <div>
                <b>{a.titulo}</b>
                <p>{a.texto}</p>
                <p className="downloads">
                  {a.links.map(([nome, href]) => (
                    <a key={href} href={href} download>{nome}</a>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="sub">
          <Rotulo>Pontos em aberto</Rotulo>
          <ul className="aberto">
            <li>O amarelo oficial é <b>{cor.amarelo}</b>. Os modelos de Word e PowerPoint e as artes de capa e de slide ainda usam <b>#FFBF00</b> e precisam ser ajustados.</li>
            <li>O fundo escuro dos slides é <b>#292929</b>, enquanto a cor de fundo escuro documentada é <b>{cor.grafite}</b>.</li>
            <li>O nome no logotipo colorido é preto puro, enquanto a regra de texto pede grafite. Para o logotipo isso é aceitável, mas convém registrar como exceção.</li>
            <li>Área de proteção, tamanho mínimo e proporção de cores são propostas deste manual e precisam de validação.</li>
            <li>Faltam equivalentes CMYK e Pantone para impressão gráfica e as regras de fotografia.</li>
          </ul>
        </div>
      </Capitulo>

      <footer className="fim">
        <div className="wrap">
          <Logo altura={20} />
          <span>Manual de Marca · versão 1.0 (rascunho) · outubro de 2026</span>
        </div>
      </footer>
      </main>
    </div>
  );
}
