// Versão em Markdown de cada seção, para o botão "Copiar para LLM" e para /llms.txt e /llms-full.txt.
// Monta o texto a partir dos mesmos dados da página, para as duas versões não divergirem.
import { contraste, cor, tokens } from "@encibra/marca";
import * as d from "./dados";

const URL_BASE = "https://encibra-manual.vercel.app";
const r = (a: string, b: string) => contraste(a, b).toFixed(1).replace(".", ",");
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ");
const tabela = (cab: string[], linhas: string[][]) =>
  [`| ${cab.join(" | ")} |`, `| ${cab.map(() => "---").join(" | ")} |`, ...linhas.map((l) => `| ${l.join(" | ")} |`)].join("\n");

export const markdown: Record<d.IdSecao, string> = {
  principios: `## 01 Princípios

Este manual reúne as regras visuais da Encibra S.A.: logotipo, cores, tipografia, grafismo e aplicações. Ele consolida o padrão dos modelos oficiais de documentos e apresentações e do manual no Figma.

${d.principios.map(([t, x]) => `- **${t}.** ${x}`).join("\n")}`,

  logotipo: `## 02 Logotipo

O logotipo combina o ícone (um "E" construído com o grafismo chanfrado) e o nome Encibra. A versão principal é a **horizontal colorida**: ícone em Ouro Encibra e nome em preto, sobre fundo claro.

### Variações
${d.variacoes.map((v) => `- **${v.titulo}:** ${v.texto}`).join("\n")}

### Ícone
${d.icones.map((v) => `- **Ícone ${v.titulo.toLowerCase()}:** ${v.texto}`).join("\n")}
- O ícone sozinho só aparece quando o nome Encibra já está visível por perto ou quando o espaço é pequeno demais para a versão horizontal.

### Área de proteção
- **Unidade:** ${d.protecao.unidade}
- **Regra:** ${d.protecao.regra}
- **Por quê:** ${d.protecao.porque}

### Tamanho mínimo
${d.protecao.minimos.map(([a, b]) => `- ${a}: ${b}`).join("\n")}
- ${d.protecao.abaixo}

Referências: ${d.fontesProtecao.map(([n, u]) => `[${n}](${u})`).join(", ")}.`,

  cores: `## 03 Cores

Cinco cores principais, com os nomes do manual no Figma. O Ouro Encibra é a cor da marca e o Cinza azulado é a cor de ação.

${tabela(
  ["Cor", "Papel", "HEX", "RGB", "CMYK (FOGRA39)", "Pantone C / U", "Uso"],
  tokens.cores.map((c) => [c.nome, c.papel, c.hex, rgb(c.hex), c.cmyk, `${c.pantone.c} / ${c.pantone.u}`, c.uso + ("impressao" in c ? ` ${c.impressao}` : "")]),
)}

- CMYK convertido com perfil ICC ISO Coated v2 (FOGRA39), intenção colorimétrica relativa com compensação de ponto preto. Em papel não revestido, peça a conversão à gráfica com o perfil PSO Uncoated v3 (FOGRA52).
- Pantone escolhido pela menor diferença ΔE 2000 entre a cor da marca e a biblioteca Pantone Solid Coated e Uncoated. O 7408 U fica alaranjado demais no papel não revestido; por isso o uncoated do ouro é 7406 U.

### Proporção de uso
${d.proporcao.map((p) => `${p.rotulo} ${p.pct}%`).join(", ")}. Em capas a faixa ouro é o centro da peça.

### Legibilidade (WCAG 2.1)
Texto corrido exige 4,5 : 1 e título grande exige 3 : 1.

${tabela(
  ["Texto / fundo", "Contraste", "Texto corrido", "Título grande"],
  d.pares.map(([t, f]) => {
    const c = contraste(cor[t], cor[f]);
    return [`${d.nomeDe(t)} sobre ${d.nomeDe(f)}`, `${r(cor[t], cor[f])} : 1`, c >= 4.5 ? "Sim" : "Não", c >= 3 ? "Sim" : "Não"];
  }),
)}`,

  paleta: `## 04 Paleta estendida

Cores para gráficos, mapas, sinalização e interfaces. Elas apoiam as cores principais e nunca as substituem.

${d.teoria.map(([t, x]) => `- **${t}.** ${x}`).join("\n")}

### Escalas
${Object.entries(tokens.escalas)
  .map(([, e]) => `- **${e.nome}:** ${Object.entries(e.tons).map(([t, h]) => `${t} ${h}`).join(", ")}`)
  .join("\n")}

### Cores de apoio
${tokens.apoio.map((c) => `- **${c.nome}** ${c.hex}: ${c.relacao}. Contraste com branco ${r(c.hex, "#FFFFFF")} : 1.`).join("\n")}

### Cores de estado
${tokens.semanticas.map((c) => `- **${c.nome}** ${c.hex}: ${c.uso}. Contraste com branco ${r(c.hex, "#FFFFFF")} : 1.`).join("\n")}

Tokens CSS: \`--cor-ouro-700\`, \`--cor-cinza-azulado-200\`, \`--cor-neutro-600\`, \`--cor-sucesso\` etc. No Tailwind: \`bg-ouro-50\`, \`text-neutro-600\`.`,

  tipografia: `## 05 Tipografia

DM Sans é a fonte da marca. Em documentos Word, o texto corrido usa Aptos, a fonte padrão do Microsoft 365.

### Escala (manual no Figma)
${tabela(["Nível", "Fonte", "Tamanho", "Regra"], d.tipos.map((t) => [t.nivel, t.fonte, t.tamanho, t.regra]))}

Exemplo: título 48 px, subtítulo 34 px, texto 17 px. DM Sans Black fica para títulos de capa e números grandes.

### Documentos (A4)
- Título da capa: DM Sans Black sobre a faixa ouro.
- Títulos 1 a 4: DM Sans Bold, numeração automática (1, 1.1, 1.1.1).
- Corpo: Aptos 12 pt, justificado, entrelinha 1,5, recuo de 1,25 cm, margens de 2,5 cm.
- Tabelas: Aptos 9 pt, cabeçalho em Intermédio ${cor.intermedio}.
- Legendas e fontes: Aptos menor, em Neutro 600 ${cor["neutro-600"]}.

### Apresentações (16:9)
- Título da capa: DM Sans Black 32 pt, chumbo.
- Subtítulo da capa: DM Sans Regular 20 pt, chumbo a 60%.
- Número de seção e indicadores: DM Sans Black em Ouro Encibra.
- Corpo: DM Sans Regular, chumbo.`,

  grafismo: `## 06 Grafismo

O grafismo é o bloco chanfrado que forma o ícone: um retângulo com chanfros a 45° no canto superior esquerdo e no inferior direito e cantos arredondados nos outros dois.

### Construção
${d.grafismo.construcao.map(([t, x], i) => `${i + 1}. **${t}.** ${x}`).join("\n")}

### Variações
Tamanhos:
${d.grafismo.tamanhos.map(([t, x]) => `- **${t}:** ${x}`).join("\n")}

Estilos:
${d.grafismo.estilos.map(([t, , x]) => `- **${t}:** ${x}`).join("\n")}

Preenchimentos:
${d.grafismo.preenchimentos.map(([t, , x]) => `- **${t}:** ${x}`).join("\n")}

- Cores: Ouro Encibra, Chumbo e Branco.
- Total: ${d.variantesGrafismo.length} formas × 3 cores = ${d.variantesGrafismo.length * 3} arquivos, em SVG, PDF e PNG.

### Regras
${d.grafismo.regras.map((x) => `- ${x}`).join("\n")}

### Efeitos: vidro, gradiente mesh e ruído
${d.efeitos.intro}

${d.efeitos.lista.map((e) => `#### ${e.nome}\n- O que é: ${e.oque}\n- Como: ${e.como}\n- Quando: ${e.quando}\n- Meios: ${e.meios}`).join("\n\n")}

Valores técnicos: vidro com desfoque ${tokens.efeitos.vidro.desfoque}, saturação ${tokens.efeitos.vidro.saturacao}, preenchimento ${tokens.efeitos.vidro.preenchimento} e borda ${tokens.efeitos.vidro.borda}. Textura de ruído: [ruido-512.png](${URL_BASE}/downloads/texturas/ruido-512.png).

Gradientes oficiais:
${tokens.efeitos.mesh.map((m) => `- **${m.nome}:** base ${d.nomeDe(m.base)} ${cor[m.base]}; pontos ${[...new Set(m.pontos)].map((p) => `${d.nomeDe(p)} ${cor[p]}`).join(", ")}`).join("\n")}

Intensidade por tipo de peça:

${tabela(["Peça", "Vidro", "Mesh", "Ruído", "Observação"], d.efeitos.intensidade.map(([p, v, m, r, o]) => [p, d.efeitos.niveis[v], d.efeitos.niveis[m], d.efeitos.niveis[r], o]))}

Regras dos efeitos:
${d.efeitos.regras.map((x) => `- ${x}`).join("\n")}`,

  aplicacoes: `## 07 Aplicações

- **Capa de documento A4:** arte oficial com o título em DM Sans Black sobre a faixa ouro.
- **Página interna:** logotipo à direita no cabeçalho, rodapé sem filete, numeração automática, caixa de destaque em Ouro 50 ${cor["ouro-50"]}.
- **Indicadores:** número em DM Sans Black; o principal em fundo Ouro 50, os demais em Intermédio.
- **Capa de slide:** título, subtítulo e rodapé, cada um no seu campo e na sua opacidade.
- **Separador de seção:** fundo chumbo, número grande em ouro e título em branco.
- **Ambientes:** grafismos em adesivo branco e ouro, em ritmo de cheios e vazados.`,

  incorretos: `## 08 Usos incorretos

${d.errados.map((e) => `- **${e.titulo}:** ${e.texto}`).join("\n")}
- **Texto ouro sobre branco:** contraste de ${r(cor.ouro, cor.basico)} : 1, ilegível.
- **Preto puro e fonte alheia:** texto é chumbo ${cor.chumbo}, em DM Sans ou Aptos.
- **Grafismo com quina viva:** toda quina do grafismo, inclusive as do chanfro, é arredondada.`,

  arquivos: `## 09 Arquivos

Baixe sempre os arquivos oficiais e nunca recrie o logotipo a partir de uma captura de tela.

### Logotipos
${d.formatos.map(([f, , x]) => `- ${f}: ${x}`).join("\n")}

${d.arquivosLogos.map((a) => `- ${a.nome}: ${a.links.map(([f, u]) => `[${f}](${URL_BASE}${u})`).join(" · ")}`).join("\n")}

### Grafismo
Pasta \`/downloads/grafismo/{svg,pdf,png}/\`, arquivos \`grafismo-{padrao|grande}-{simples|duplo|expandido}-{cheio|vazado}-{ouro|chumbo|branco}\`. Exemplo: [grafismo-grande-duplo-vazado-ouro.svg](${URL_BASE}/downloads/grafismo/svg/grafismo-grande-duplo-vazado-ouro.svg).

### Outros
${d.arquivosExtras.map((a) => `- ${a.titulo}: ${a.texto} ${a.links.map(([n, u]) => `[${n}](${URL_BASE}${u})`).join(" · ")}`).join("\n")}

### Histórico de versões
${d.historico.map(([v, x]) => `- **${v}:** ${x}`).join("\n")}`,
};

export const cabecalho = `# Manual de Marca Encibra

> Guia de identidade visual da Encibra S.A., empresa brasileira de engenharia consultiva. Versão ${d.versao}, ${d.data}. Fonte: ${URL_BASE}`;

export const manualCompleto = [cabecalho, ...d.secoes.map(([id]) => markdown[id])].join("\n\n");
export { URL_BASE };
