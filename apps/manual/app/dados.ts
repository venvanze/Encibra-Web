// Dados do manual usados tanto na página quanto na versão em Markdown para LLMs (llm.ts).
// Cores vêm de @encibra/marca/tokens.json; aqui ficam só os textos e as listas.
import { cor, tokens, type VarianteLogo } from "@encibra/marca";

export const versao = "2.1";
export const data = "outubro de 2026";
export const atualizado = "outubro de 2026";

export const secoes = [
  ["principios", "Princípios"],
  ["logotipo", "Logotipo"],
  ["cores", "Cores e gradientes"],
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

// O primeiro passo da proporção (60%) é a base, que muda com o tema da peça
export const temasProporcao = [
  { id: "claro", nome: "Tema claro", base: "basico", rotulo: "Básico (branco)" },
  { id: "escuro", nome: "Tema escuro", base: "preto", rotulo: "Preto" },
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
    "Combine cheios e vazados em ritmo, com espaço regular entre as formas.",
    "Use no máximo duas cores de grafismo por peça, além do fundo.",
  ],
  texto: {
    intro: "Quando um texto vai dentro do grafismo (capas, faixas, placas e banners), ele segue um grid tirado da própria forma. Tudo sai de um módulo, m, o corte do chanfro.",
    regras: [
      "Módulo m: o corte do chanfro, igual a 27% da altura (H) do grafismo.",
      "Área de texto: recue m das quatro bordas. Os chanfros e os cantos ficam inteiros fora dela, e o texto nunca entra neles.",
      "A margem m é mínima: pode crescer, nunca diminuir. Se o texto não couber, quebre a linha ou alongue o grafismo grande na largura.",
      "Título em DM Sans Black, entrelinha 1, até duas linhas, com corpo de no máximo 22% de H.",
      "Alinhe à esquerda, na margem m, e centralize o bloco na vertical. Numa faixa que atravessa a página, o texto pode seguir a coluna do grid da página, desde que fique a pelo menos m da borda.",
      "Se outro elemento cobre a borda do grafismo (vidro, foto ou outro grafismo), a margem m conta a partir da borda desse elemento.",
      "Texto só no grafismo cheio simples, padrão ou grande, e na faixa. Vazado, duplo e expandido não recebem texto.",
    ],
  },
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
      como: "Use só os gradientes oficiais do capítulo Cores e gradientes, no modo claro ou no escuro conforme o fundo da peça. Quatro pontos de cor no máximo, sempre vizinhos no círculo cromático, e o Ouro Encibra presente em pelo menos 40% da área quando ele for a cor da peça.",
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

// Regras de uso dos gradientes oficiais (capítulo Cores e gradientes). Valores em tokens.json (efeitos.mesh).
export const gradientes = {
  intro: "Três gradientes oficiais, cada um feito de tons de uma só família de cor. Cada gradiente tem um modo claro, para peças de fundo claro com texto chumbo, e um modo escuro, para fundos escuros com texto branco. Clique numa amostra para copiar um prompt com as medidas exatas.",
  regras: [
    "Use só os gradientes oficiais, com a base e os pontos de cor exatos. Não crie variações nem troque cores.",
    "Cada gradiente fica dentro de uma família: ouro com ouro e âmbar, azulado com azulado, neutros com neutros. Nunca misture ouro e azulado no mesmo gradiente: a transição fica esverdeada e suja.",
    "Um gradiente por peça. Para contrastar, ponha um gradiente ao lado de uma cor sólida, não de outro gradiente.",
    "Modo claro com texto Chumbo, modo escuro com texto Básico (branco). O texto fica na área mais calma do gradiente e precisa de 4,5 : 1 no ponto mais claro do fundo.",
    "Use no grafismo cheio e em fundos de destaque: capas, separadores, banners, redes sociais e campanhas. Nunca no logotipo, em texto, ícones, botões, tabelas ou no fundo de páginas de documento.",
    "Sempre com ruído por cima (8% no digital, 4% no impresso), para tirar o aspecto plástico e evitar faixas na transição.",
    "No impresso, exporte o gradiente como imagem em alta resolução já convertida para CMYK. Em impressão de uma ou duas cores, use a cor sólida.",
  ],
};

export const historico: [string, string][] = [
  ["2.1", "Capítulo 03 passa a se chamar Cores e gradientes, com os gradientes oficiais e as regras de uso deles. Saiu o gradiente Ouro sobre azulado, que misturava as duas cores; ficam três: Ouro quente, Noite azulada e Carvão. Novo grid para texto dentro do grafismo, aplicado à capa A4 e à capa deste manual."],
  ["2.0", "Efeitos do grafismo (vidro, gradiente mesh e ruído) com intensidade por tipo de peça; quatro gradientes oficiais em modo claro e escuro, entre eles o Carvão, do preto ao chumbo; Preto como cor auxiliar; todas as cores copiáveis com um clique; escalas de 50 a 900 alinhadas; grafismos padrão e grande com a mesma altura; grid em proporção áurea; favicon e ícones de app."],
  ["1.1", "Cores com os nomes do Figma, CMYK e Pantone; paleta estendida; área de proteção e tamanho mínimo; capítulo do grafismo com 30 arquivos; downloads em SVG, PDF e PNG; versão para LLMs."],
  ["1.0", "Primeira versão no site: logotipo, cores, tipografia, aplicações e usos incorretos."],
];
