// Dados do manual usados tanto na página quanto na versão em Markdown para LLMs (llm.ts).
// Cores vêm de @encibra/marca/tokens.json; aqui ficam só os textos e as listas.
import { cor, tokens, type VarianteLogo } from "@encibra/marca";

export const versao = "1.1";
export const data = "outubro de 2026";

export const secoes = [
  ["principios", "Princípios"],
  ["logotipo", "Logotipo"],
  ["cores", "Cores"],
  ["paleta", "Paleta estendida"],
  ["tipografia", "Tipografia"],
  ["grafismo", "Grafismo"],
  ["aplicacoes", "Aplicações"],
  ["incorretos", "Usos incorretos"],
  ["arquivos", "Arquivos"],
] as const;
export type IdSecao = (typeof secoes)[number][0];

export const principios = [
  ["Plano por padrão", "A base é plana, como um bom desenho técnico: sem sombra e sem contorno decorativo. Vidro, gradiente mesh e ruído são recursos para enriquecer o grafismo, com regras próprias, e nunca tocam o logotipo."],
  ["Hierarquia por peso e cor", "O que importa fica mais pesado ou muda de cor. Não usamos caixas, sublinhados ou ícones para chamar atenção."],
  ["Ouro com intenção", "O Ouro Encibra marca o que importa: o ícone, o grafismo, a faixa da capa, números. Texto corrido nunca é ouro, e nunca é preto puro."],
] as const;

type Exemplo = { variante: VarianteLogo; fundo: string; titulo: string; texto: string };

export const variacoes: Exemplo[] = [
  { variante: "horizontal-negativo", fundo: "p-chumbo", titulo: "Negativa", texto: "Ícone em ouro e nome em branco. Para fundos chumbo, cinza azulado e escuros. É a versão dos slides escuros." },
  { variante: "horizontal-preto", fundo: "p-basico", titulo: "Monocromática preta", texto: "Impressão em uma cor, carimbos, fundo ouro e documentos em preto e branco." },
  { variante: "horizontal-branco", fundo: "p-escuro-foto", titulo: "Monocromática branca", texto: "Sobre fotos e fundos com textura, onde o ouro perderia leitura." },
];

export const icones: Exemplo[] = [
  { variante: "icone-amarelo", fundo: "p-basico", titulo: "Ouro", texto: "Avatar de redes, favicon e selos. Fundo claro ou chumbo." },
  { variante: "icone-preto", fundo: "p-ouro", titulo: "Preto", texto: "Sobre o Ouro Encibra e em impressão de uma cor." },
  { variante: "icone-branco", fundo: "p-chumbo", titulo: "Branco", texto: "Sobre fundos escuros e fotos." },
];

// Área de proteção e tamanho mínimo, com base em guias de marcas consolidadas (fontes em `fontesProtecao`).
export const protecao = {
  unidade: "x é metade da altura do ícone. Na Encibra, essa medida coincide com a altura das minúsculas do nome (o “n” de Encibra).",
  regra: "Deixe livre pelo menos 1x em todos os lados, medido a partir do retângulo que contém o logotipo. Quando houver espaço, prefira 2x.",
  porque: "A unidade sai do próprio logotipo, então a regra vale em qualquer tamanho sem régua: o ícone serve de gabarito. Spotify usa a mesma unidade (meia altura do ícone) e GitLab usa a altura das minúsculas.",
  minimos: [
    ["Horizontal na tela", "100 px de largura"],
    ["Horizontal impressa", "25 mm de largura"],
    ["Ícone na tela", "20 px de altura"],
    ["Ícone impresso", "6 mm de altura"],
    ["Bordado e gravação", "40 mm de largura"],
  ],
  abaixo: "Abaixo do mínimo o nome perde leitura: use só o ícone. Favicon de 16 px só a partir de um arquivo desenhado para esse tamanho.",
};

export const fontesProtecao = [
  ["Spotify Design Guidelines", "https://developer.spotify.com/documentation/design"],
  ["GitLab Brand: core logo", "https://design.gitlab.com/brand-logo/core-logo"],
  ["Unilever logo guidelines", "https://www.unilever.com/files/new-visual-identity-logo-guidelines.pdf"],
  ["Mastercard Brand Center", "https://www.mastercard.com/brandcenter/en/brand-requirements/mastercard"],
  ["SES exclusion zone", "https://brand.ses.com/brand-elements/exclusion-zone"],
] as const;

export const pares: [texto: string, fundo: string][] = [
  ["chumbo", "basico"],
  ["chumbo", "intermedio"],
  ["chumbo", "ouro"],
  ["ouro", "chumbo"],
  ["basico", "cinza-azulado"],
  ["ouro", "cinza-azulado"],
  ["neutro-600", "basico"],
  ["ouro", "basico"],
  ["basico", "ouro"],
];

export const nomeDe = (id: string) => {
  const principal = tokens.cores.find((c) => c.id === id);
  if (principal) return principal.nome;
  const extra = [...tokens.apoio, ...tokens.auxiliares, ...tokens.semanticas].find((c) => c.id === id);
  if (extra) return extra.nome;
  const [escala, tom] = [id.replace(/-\d+$/, ""), id.match(/\d+$/)?.[0]];
  const e = (tokens.escalas as Record<string, { nome: string }>)[escala];
  return e ? `${e.nome} ${tom}` : id;
};

export const proporcao = [
  { id: "basico", rotulo: "Básico", pct: 60 },
  { id: "chumbo", rotulo: "Chumbo", pct: 25 },
  { id: "ouro", rotulo: "Ouro", pct: 10 },
  { id: "cinza-azulado", rotulo: "Azulado", pct: 5 },
];

export const teoria = [
  ["Quase complementares", "O Ouro Encibra (matiz 87° em OKLCH) e o Cinza azulado (matiz 250°) ficam a 163° um do outro no círculo cromático. Cores opostas se reforçam: o azulado acalma e faz o ouro parecer mais luminoso."],
  ["Escalas em luminosidade percebida", "Cada escala vai de 50 (quase branco) a 900 (quase preto) em passos iguais de luminosidade OKLCH, o espaço de cor que acompanha o olho humano. O tom 500 do ouro é a cor da marca e o 700 do azulado é a cor de ação."],
  ["Ouro que esquenta no escuro", "Nos tons escuros, o ouro gira na direção do laranja, como acontece com o metal na sombra. Sem esse giro, o ouro escurecido fica esverdeado e sujo."],
  ["Apoio análogo e uma ponte", "Âmbar, terracota e oliva são vizinhas do ouro e dão calor sem competir com ele. O petróleo faz a ponte com o azulado. Use as cores de apoio em gráficos e mapas, nunca no lugar da cor da marca."],
] as const;

export const tipos = [
  { nivel: "Título", fonte: "DM Sans Bold", tamanho: "T (base)", exemplo: 48, peso: 700, regra: "Chumbo, ou DM Sans Medium em Ouro Encibra sobre fundo escuro." },
  { nivel: "Subtítulo", fonte: "DM Sans Medium", tamanho: "70% do título", exemplo: 34, peso: 500, regra: "Chumbo ou Neutro 600." },
  { nivel: "Texto", fonte: "DM Sans Regular", tamanho: "50% do subtítulo", exemplo: 17, peso: 400, regra: "Chumbo. Em documentos Word, o corpo é Aptos." },
];

export const grafismo = {
  construcao: [
    ["Dois retângulos", "Desenhe dois retângulos iguais de cantos arredondados, deslocados na diagonal. A largura é 1,1905 × a altura."],
    ["Cantos", "Superior direito e inferior esquerdo levam raio de 30% da largura. Os outros cantos levam metade desse raio."],
    ["Tangentes a 45°", "Una os dois retângulos por retas a 45° tangentes aos cantos. O contorno externo resultante é o grafismo."],
    ["Filete em toda quina", "As quinas onde o chanfro encontra os lados também são arredondadas. O grafismo nunca tem quina viva."],
  ],
  tamanhos: [
    ["Padrão", "Mesma altura do grande, mais estreito. Uso geral, ícones de seção, padrões."],
    ["Grande", "Mesma altura do padrão, mais largo. Placas de logotipo, faixas e painéis."],
  ],
  estilos: [
    ["Simples", "simples", "Uma forma. A base de tudo."],
    ["Duplo", "duplo", "Forma com um recorte interno concêntrico: moldura grossa quando cheio, dois contornos quando vazado."],
    ["Expandido", "expandido", "Chanfro alongado na diagonal, com recorte interno. Só existe no tamanho grande."],
  ],
  preenchimentos: [
    ["Cheio", "cheio", "Forma sólida."],
    ["Vazado", "vazado", "Só o contorno, em traço fino."],
  ],
  cores: [
    ["ouro", "Ouro", "p-basico"],
    ["chumbo", "Chumbo", "p-basico"],
    ["branco", "Branco", "p-chumbo"],
  ],
  regras: [
    "Padrão e grande têm sempre a mesma altura; só a largura muda. O expandido é o único que pode ter altura diferente.",
    "Use só os arquivos oficiais desta página; não redesenhe a forma.",
    "Mantenha a proporção. Para mudar o tamanho, escale a forma inteira.",
    "Os chanfros ficam sempre no canto superior esquerdo e no inferior direito.",
    "Combine cheios e vazados em ritmo, como na arte de Brasília, com espaço regular entre as formas.",
    "Use no máximo duas cores de grafismo por peça, além do fundo.",
  ],
};

// Efeitos de enriquecimento do grafismo. Valores técnicos em tokens.json (efeitos).
export const efeitos = {
  intro: "O grafismo sólido pode ganhar três efeitos: vidro, gradiente mesh e ruído. Eles dão profundidade e materialidade a peças digitais, ambientes e campanhas. Nos documentos a regra é a sobriedade: o grafismo fica sólido e os efeitos aparecem só onde a peça pede.",
  lista: [
    {
      id: "vidro",
      nome: "Vidro",
      oque: "O grafismo vira uma placa translúcida: desfoca e clareia o que está atrás, com um filete claro na borda.",
      como: "Preenchimento branco a 16%, desfoque de 24 px, saturação de 150% e borda de 1 px em branco a 55%. Sem sombra projetada.",
      quando: "Sobre foto, vídeo ou gradiente mesh. Sobre fundo liso o vidro não aparece e vira só uma forma pálida.",
      meios: "Digital (site, apps, redes, slides de capa) e ambientes, onde o vidro é vinil jateado ou acrílico fosco. No impresso, só como imagem já achatada.",
    },
    {
      id: "mesh",
      nome: "Gradiente mesh",
      oque: "Preenchimento com vários pontos de cor que se misturam suavemente dentro do grafismo ou no fundo.",
      como: "Use os quatro gradientes oficiais. Quatro pontos de cor no máximo, sempre vizinhos no círculo cromático, e o Ouro Encibra presente em pelo menos 40% da área quando ele for a cor da peça.",
      quando: "Grafismos grandes, fundos de capa e campanhas. Em formas pequenas o gradiente não se lê: use a cor sólida.",
      meios: "Digital e impresso. No impresso, aplique ruído junto para evitar faixas visíveis na transição.",
    },
    {
      id: "ruido",
      nome: "Ruído",
      oque: "Granulação fina e monocromática por cima do grafismo, que tira o aspecto plástico do digital.",
      como: "Textura oficial em modo sobreposição, a 8% no digital e a 4% no impresso. Nunca colorida.",
      quando: "Sempre junto de gradiente mesh e de vidro. Sozinho, só em fundos grandes de cor sólida.",
      meios: "Digital e impresso. Em tela pequena, reduza à metade.",
    },
  ],
  niveis: ["Não usar", "Sutil", "Moderado", "Livre"],
  // [tipo de peça, vidro, mesh, ruído, observação] com índice do nível em `niveis`
  intensidade: [
    ["Documentos Word e relatórios", 0, 0, 0, "Grafismo sólido. A capa usa a arte oficial."],
    ["Propostas e apresentações: conteúdo", 0, 1, 0, "Slides de conteúdo ficam sólidos; mesh só em fundos de destaque."],
    ["Apresentações: capa e separadores", 2, 2, 1, "Um efeito protagonista por slide."],
    ["Site e interfaces", 2, 2, 1, "Vidro em destaques sobre imagem. Botões e textos ficam sólidos."],
    ["Redes sociais e campanhas", 3, 3, 2, "Onde os efeitos têm mais espaço."],
    ["Ambientes e sinalização", 2, 1, 0, "Vidro como vinil jateado ou acrílico fosco; mesh só em impressão digital de grande formato."],
    ["Impressos gráficos (folder, cartaz)", 0, 2, 2, "Vidro só como imagem achatada; ruído obrigatório com mesh."],
  ] as [string, number, number, number, string][],
  regras: [
    "Efeitos só no grafismo cheio. O vazado é linha fina e perde leitura com qualquer efeito.",
    "O efeito nunca muda a forma: chanfros a 45°, cantos arredondados e filetes continuam iguais.",
    "Nunca aplique efeito no logotipo.",
    "Um efeito protagonista por peça. Ruído pode acompanhar qualquer um.",
    "Texto sobre efeito continua exigindo contraste de 4,5 : 1 no ponto mais claro do fundo.",
    "Nada de sombra projetada, brilho externo ou reflexo. O vidro se resolve com desfoque e filete.",
  ],
};

export const variantesGrafismo = (["padrao", "grande"] as const).flatMap((tamanho) =>
  grafismo.estilos
    .filter(([, id]) => !(tamanho === "padrao" && id === "expandido"))
    .flatMap(([nomeEstilo, estilo]) =>
      grafismo.preenchimentos.map(([nomePreench, preench]) => ({
        arquivo: `grafismo-${tamanho}-${estilo}-${preench}`,
        // Largura no desenho oficial, com a altura comum de 135 unidades: mostra todas na mesma escala.
        largura: tamanho === "padrao" ? 155 : estilo === "expandido" ? 245 : 247,
        titulo: `${tamanho === "padrao" ? "Padrão" : "Grande"} · ${nomeEstilo} · ${nomePreench}`,
      })),
    ),
);

export const errados: { fundo: string; estilo?: React.CSSProperties; titulo: string; texto: string }[] = [
  { fundo: "p-basico", estilo: { transform: "scaleX(1.35)" }, titulo: "Distorcer", texto: "Nunca esticar ou achatar." },
  { fundo: "p-basico", estilo: { transform: "rotate(-12deg)" }, titulo: "Girar", texto: "O logotipo fica sempre na horizontal." },
  { fundo: "p-basico", estilo: { filter: "drop-shadow(4px 6px 4px rgba(0,0,0,.45))" }, titulo: "Aplicar sombra", texto: "Nenhum efeito: sombra, brilho ou contorno." },
  { fundo: "p-basico", estilo: { filter: "hue-rotate(160deg) saturate(1.6)" }, titulo: "Trocar as cores", texto: "Use só as versões oficiais." },
  { fundo: "p-chumbo", titulo: "Colorida no escuro", texto: "O nome preto some. Use a versão negativa." },
  { fundo: "p-ouro", titulo: "Ícone ouro no ouro", texto: "Sobre o Ouro Encibra, use a versão preta." },
];

const logosArquivo: [nome: string, base: string, escuro: boolean][] = [
  ["Horizontal colorida", "logo-horizontal-cor", false],
  ["Horizontal negativa", "logo-horizontal-negativo", true],
  ["Horizontal preta", "logo-horizontal-preto", false],
  ["Horizontal branca", "logo-horizontal-branco", true],
  ["Ícone ouro", "icone-amarelo", false],
  ["Ícone preto", "icone-preto", false],
  ["Ícone branco", "icone-branco", true],
];

export const formatos = [
  ["SVG", "svg", "Web, apps e edição em Figma ou Illustrator. Vetor."],
  ["PDF", "pdf", "Gráfica, sinalização e documentos. Vetor."],
  ["PNG", "png", "Office, e-mail e redes. Fundo transparente, 2000 px."],
] as const;

export const arquivosLogos = logosArquivo.map(([nome, base, escuro]) => ({
  nome, base, escuro,
  links: formatos.map(([rotulo, ext]) => [rotulo, `/downloads/logos/${ext}/${base}.${ext}`] as const),
}));

export const arquivosExtras = [
  { tipo: "TTF", titulo: "Fontes", texto: "DM Sans Regular, Bold e Black (licença SIL Open Font). A Aptos vem com o Microsoft 365.",
    links: ["Regular", "Bold", "Black"].map((p) => [`DM Sans ${p}`, `/downloads/fonts/DMSans-${p}.ttf`] as const) },
  { tipo: "JPG", titulo: "Artes de fundo", texto: "Capa A4, capa de slide e fundo escuro com o padrão de blocos.",
    links: [["Capa A4", "/downloads/artes/capa-a4.jpg"], ["Capa de slide", "/downloads/artes/capa-slide.jpg"], ["Fundo escuro", "/downloads/artes/fundo-escuro.jpg"]] as const },
  { tipo: "PNG", titulo: "Textura de ruído", texto: "512 px, monocromática e repetível. Use em modo sobreposição, a 8% no digital e 4% no impresso.",
    links: [["Ruído 512 px", "/downloads/texturas/ruido-512.png"]] as const },
];

export const pontosAbertos = [
  `Os modelos de Word e PowerPoint e as artes de capa e de slide ainda usam #FFBF00. O Ouro Encibra oficial é ${cor.ouro} e eles precisam ser ajustados.`,
  "Os modelos de apresentação usam DM Sans Black nos títulos de capa, e o manual no Figma define DM Sans Bold ou Medium. Black fica reservado a capas e números grandes até haver decisão.",
  "O nome no logotipo colorido é preto puro, enquanto a regra de texto pede chumbo. No logotipo isso é aceito como exceção.",
  "Os Pantone foram escolhidos por cálculo (ΔE 2000 sobre os valores publicados pela Pantone). Confirme na escala física Formula Guide, sob luz D50 e no papel da peça, antes da primeira impressão.",
  "Área de proteção e tamanhos mínimos seguem a prática de mercado e ainda precisam ser aprovados pela Encibra.",
  "Faltam regras de fotografia e de iconografia.",
];
