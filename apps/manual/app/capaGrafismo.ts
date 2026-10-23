// Capa do manual: as linhas de grafismo do frame 5851:721 do Figma ("Fundo de vídeo encibra"),
// em quatro fileiras, com uma faixa cheia de ponta a ponta no lugar da fileira do meio.
import { AZULEJO_HERO, criarForma, verticesAzulejo } from "./formaChanfrada";

const H = AZULEJO_HERO.altura;
// Fileiras do Figma: começam em x 32 e se repetem a cada 263,18 px (azulejo + 41,7 px de vão).
const PASSO = 263.18;
const X0 = 32;
// Posição x e largura de cada azulejo, medidas no Figma. As fileiras A e B se alternam.
const FILEIRA_A: [number, number][] = [[-654, 254], [-368, 381], [45, 254], [331, 254], [617, 254], [903, 381], [1316, 254], [1602, 254]];
const FILEIRA_B: [number, number][] = [[0, 381], [413, 254], [699, 381], [1111, 254], [1397, 254], [1683, 381], [2096, 254], [2382, 381], [2795, 254], [3081, 254]];

export const CAPA = { largura: 1920, altura: 1080, traco: 3 };

// Cinco faixas de altura: A, B, a faixa cheia, A, B. O quadro de 1920 × 1080 fica centrado na faixa.
const topoFaixa = 30 + 2 * PASSO;
const y0 = topoFaixa + H / 2 - CAPA.altura / 2;
const linhas = [
  [FILEIRA_A, 30],
  [FILEIRA_B, 30 + PASSO],
  [FILEIRA_A, 30 + 3 * PASSO],
  [FILEIRA_B, 30 + 4 * PASSO],
] as const;

const formas = new Map<number, ReturnType<typeof criarForma>>();
const formaDe = (w: number) => formas.get(w) ?? formas.set(w, criarForma(verticesAzulejo(w, H))).get(w)!;

// Cada azulejo vira um <path> deslocado para a posição dele dentro do quadro da capa.
export const azulejosCapa = linhas.flatMap(([fileira, y]) =>
  fileira
    .filter(([x, w]) => X0 + x < CAPA.largura && X0 + x + w > 0)
    .map(([x, w]) => ({ x: X0 + x, y: y - y0, d: formaDe(w).caminho() })),
);

// Faixa cheia: a mesma forma, esticada de uma borda à outra, em coordenadas de 0 a 1 para o clipPath.
export const faixaCapa = {
  topo: (topoFaixa - y0) / CAPA.altura,
  altura: H / CAPA.altura,
  d: criarForma(verticesAzulejo(CAPA.largura, H)).caminho(0, { x: 1 / CAPA.largura, y: 1 / H }, 5),
};
