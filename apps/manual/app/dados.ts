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
  ["Plano e limpo", "Nada de sombra, brilho, contorno ou degradê. A identidade é plana, como um bom desenho técnico."],
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
  const extra = [...tokens.apoio, ...tokens.semanticas].find((c) => c.id === id);
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
    ["Padrão", "Proporção próxima do quadrado. Uso geral, ícones de seção, padrões."],
    ["Grande", "Mais largo. Placas de logotipo, faixas e painéis."],
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
    "Use só os arquivos oficiais desta página; não redesenhe a forma.",
    "Mantenha a proporção. Para mudar o tamanho, escale a forma inteira.",
    "Os chanfros ficam sempre no canto superior esquerdo e no inferior direito.",
    "Combine cheios e vazados em ritmo, como na arte de Brasília, com espaço regular entre as formas.",
    "Use no máximo duas cores de grafismo por peça, além do fundo.",
  ],
};

export const variantesGrafismo = (["padrao", "grande"] as const).flatMap((tamanho) =>
  grafismo.estilos
    .filter(([, id]) => !(tamanho === "padrao" && id === "expandido"))
    .flatMap(([nomeEstilo, estilo]) =>
      grafismo.preenchimentos.map(([nomePreench, preench]) => ({
        arquivo: `grafismo-${tamanho}-${estilo}-${preench}`,
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
];

export const pontosAbertos = [
  `Os modelos de Word e PowerPoint e as artes de capa e de slide ainda usam #FFBF00. O Ouro Encibra oficial é ${cor.ouro} e eles precisam ser ajustados.`,
  "Os modelos de apresentação usam DM Sans Black nos títulos de capa, e o manual no Figma define DM Sans Bold ou Medium. Black fica reservado a capas e números grandes até haver decisão.",
  "O nome no logotipo colorido é preto puro, enquanto a regra de texto pede chumbo. No logotipo isso é aceito como exceção.",
  "Os Pantone foram escolhidos por cálculo (ΔE 2000 sobre os valores publicados pela Pantone). Confirme na escala física Formula Guide, sob luz D50 e no papel da peça, antes da primeira impressão.",
  "Área de proteção e tamanhos mínimos seguem a prática de mercado e ainda precisam ser aprovados pela Encibra.",
  "Faltam regras de fotografia e de iconografia.",
];
