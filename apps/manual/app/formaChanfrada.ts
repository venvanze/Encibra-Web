/**
 * Geometria da forma chanfrada da marca: um polígono convexo em que cada
 * vértice tem um raio de filete próprio. É o retângulo com dois cantos
 * arredondados (superior direito e inferior esquerdo) e dois chanfrados a
 * 45° (superior esquerdo e inferior direito) que aparece nos azulejos do
 * hero do portfólio e na capa do manual (linhas de grafismo e faixa ouro).
 * Cópia de portfolio-virtual-encibra/components/v3/formaChanfrada.ts.
 *
 * `criarForma(vertices)` pré-calcula, uma vez por vértice, o centro do
 * filete e as duas normais externas; `caminho(d)` emite o contorno
 * deslocado `d` px para fora: como a forma é convexa, o deslocamento é a
 * MESMA figura com o mesmo centro em cada filete e o raio somado de `d`.
 * As arestas retas andam `d` na direção da normal externa e os cantos
 * arredondam progressivamente sozinhos.
 *
 * `escala` divide/multiplica as coordenadas na emissão, para o mesmo
 * contorno servir como <clipPath clipPathUnits="objectBoundingBox">
 * (coordenadas de 0 a 1): os arcos saem elípticos no espaço normalizado
 * e voltam a ser circulares quando o navegador estica a caixa, desde que
 * a caixa tenha a proporção da forma.
 */

export type Vertice = { x: number; y: number; r: number };
export type Ponto = { x: number; y: number };
export type Escala = { x: number; y: number };

const subtrair = (a: Ponto, b: Ponto): Ponto => ({ x: a.x - b.x, y: a.y - b.y });
const unitario = (a: Ponto): Ponto => {
  const m = Math.hypot(a.x, a.y);
  return { x: a.x / m, y: a.y / m };
};

const arredondar = (n: number, casas: number) => Number(n.toFixed(casas));

export function criarForma(vertices: Vertice[]) {
  const total = vertices.length;
  const centroX = vertices.reduce((s, v) => s + v.x, 0) / total;
  const centroY = vertices.reduce((s, v) => s + v.y, 0) / total;

  /** Normal de uma aresta apontando para fora (para longe do centroide). */
  function normalExterna(de: Ponto, para: Ponto): Ponto {
    const d = unitario(subtrair(para, de));
    const n = { x: -d.y, y: d.x };
    const meioX = (de.x + para.x) / 2;
    const meioY = (de.y + para.y) / 2;
    const paraFora = n.x * (meioX - centroX) + n.y * (meioY - centroY) > 0;
    return paraFora ? n : { x: -n.x, y: -n.y };
  }

  // Sentido do percurso em coordenadas SVG (y para baixo) define o
  // sweep-flag dos arcos.
  const areaComSinal = vertices.reduce((s, v, i) => {
    const proximo = vertices[(i + 1) % total];
    return s + (v.x * proximo.y - proximo.x * v.y);
  }, 0);
  const sentidoArco = areaComSinal > 0 ? 1 : 0;

  /*
   * Por vértice: centro do filete (fixo, não muda com o deslocamento) e as
   * normais externas das duas arestas que chegam nele. O ponto de
   * tangência do contorno deslocado a `d` é centro + normal × (raio + d).
   */
  const geometria = vertices.map((vertice, i) => {
    const anterior = vertices[(i + total - 1) % total];
    const proximo = vertices[(i + 1) % total];
    const chegando = unitario(subtrair(vertice, anterior));
    const saindo = unitario(subtrair(proximo, vertice));
    const normalChegando = normalExterna(anterior, vertice);
    const normalSaindo = normalExterna(vertice, proximo);

    // Giro no vértice → comprimento da tangente → ponto onde o filete começa.
    const cosseno = chegando.x * saindo.x + chegando.y * saindo.y;
    const giro = Math.acos(Math.min(1, Math.max(-1, cosseno)));
    const tangente = vertice.r * Math.tan(giro / 2);
    const inicioFilete = {
      x: vertice.x - chegando.x * tangente,
      y: vertice.y - chegando.y * tangente,
    };

    return {
      ponto: { x: vertice.x, y: vertice.y },
      centro: {
        x: inicioFilete.x - normalChegando.x * vertice.r,
        y: inicioFilete.y - normalChegando.y * vertice.r,
      },
      raio: vertice.r,
      normalChegando,
      normalSaindo,
      chegando,
      saindo,
      giro,
    };
  });

  /**
   * Contorno da forma deslocado `d` px para fora, como atributo `d` de
   * path. `escala` multiplica x e y na emissão (padrão 1); `casas` é a
   * precisão decimal (2 no espaço da forma, mais no normalizado).
   */
  function caminho(d = 0, escala: Escala = { x: 1, y: 1 }, casas = 2): string {
    const ex = (n: number) => arredondar(n * escala.x, casas);
    const ey = (n: number) => arredondar(n * escala.y, casas);
    return (
      geometria
        .map(({ centro, raio, normalChegando, normalSaindo }, i) => {
          const r = raio + d;
          const entrada = {
            x: centro.x + normalChegando.x * r,
            y: centro.y + normalChegando.y * r,
          };
          const saida = {
            x: centro.x + normalSaindo.x * r,
            y: centro.y + normalSaindo.y * r,
          };
          const comando = i === 0 ? "M" : "L";
          return (
            `${comando}${ex(entrada.x)} ${ey(entrada.y)}` +
            `A${ex(r)} ${ey(r)} 0 0 ${sentidoArco} ` +
            `${ex(saida.x)} ${ey(saida.y)}`
          );
        })
        .join("") + "Z"
    );
  }

  /**
   * Pontos de tangência (entrada/saída), centro, raio, direções das
   * arestas (chegando/saindo, já unitárias) e ângulo de giro de cada
   * vértice no contorno deslocado `d` px para fora — a mesma geometria de
   * `caminho`, mas como dados em vez de string, para desenhar cotas em
   * cima da forma (ver CotasNanquim.tsx). Ordem igual à de `vertices`.
   */
  function segmentos(d = 0) {
    return geometria.map(({ ponto, centro, raio, normalChegando, normalSaindo, chegando, saindo, giro }) => {
      const r = raio + d;
      return {
        ponto,
        centro,
        raio: r,
        normalChegando,
        normalSaindo,
        chegando,
        saindo,
        giro,
        entrada: { x: centro.x + normalChegando.x * r, y: centro.y + normalChegando.y * r },
        saida: { x: centro.x + normalSaindo.x * r, y: centro.y + normalSaindo.y * r },
      };
    });
  }

  return { caminho, segmentos };
}

/**
 * Vértices do azulejo do hero (frame 5851:721 do Figma) para uma caixa
 * `largura` × `altura`, com os cantos em px fixos, medidos no primeiro caminho do export: cantos
 * arredondados de 52,5px (superior direito e inferior esquerdo) e
 * chanfros a 45° que cortam 70,5px de cada aresta, com filetes de 26,3px
 * nas duas quinas de cada chanfro (superior esquerdo e inferior direito).
 * Os azulejos do hero têm larguras variadas e a mesma altura (221,5px):
 * só as arestas retas esticam, os cantos não — a mesma regra vale aqui
 * para qualquer caixa, inclusive a vertical.
 */
export const AZULEJO_HERO = {
  /** Caixa do primeiro azulejo do export do Figma, em px. */
  largura: 380.52,
  altura: 221.47,
  raioCanto: 52.53,
  raioFilete: 26.3,
  corteChanfro: 70.5,
};

export type MedidasForma = typeof AZULEJO_HERO;

export function verticesAzulejo(
  largura: number,
  altura: number,
  medidas: MedidasForma = AZULEJO_HERO,
): Vertice[] {
  const { raioCanto, raioFilete, corteChanfro: c } = medidas;
  return [
    { x: 0, y: altura, r: raioCanto },
    { x: largura - c, y: altura, r: raioFilete },
    { x: largura, y: altura - c, r: raioFilete },
    { x: largura, y: 0, r: raioCanto },
    { x: c, y: 0, r: raioFilete },
    { x: 0, y: c, r: raioFilete },
  ];
}
