// Gera dist/tokens.css e dist/tailwind.css a partir de src/tokens.json, a fonte única das cores e fontes da marca.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const tokens = JSON.parse(readFileSync(new URL("../src/tokens.json", import.meta.url), "utf8"));
const linhas = [
  ...tokens.cores.map((c) => `  --cor-${c.id}: ${c.hex};`),
  ...Object.entries(tokens.fontes).map(([nome, pilha]) => `  --fonte-${nome}: ${pilha};`),
];
mkdirSync(new URL("../dist/", import.meta.url), { recursive: true });
writeFileSync(
  new URL("../dist/tokens.css", import.meta.url),
  `/* Gerado por scripts/gera-tokens.mjs. Edite src/tokens.json. */\n:root {\n${linhas.join("\n")}\n}\n`,
);
console.log(`tokens.css: ${linhas.length} variáveis`);

// Tema para Tailwind v4: classes como bg-amarelo, text-grafite e font-display.
const tema = [
  ...tokens.cores.map((c) => `  --color-${c.id}: ${c.hex};`),
  ...Object.entries(tokens.fontes).map(([nome, pilha]) => `  --font-${nome}: ${pilha};`),
];
writeFileSync(
  new URL("../dist/tailwind.css", import.meta.url),
  `/* Gerado por scripts/gera-tokens.mjs. Edite src/tokens.json. */\n@theme {\n${tema.join("\n")}\n}\n`,
);
console.log("tailwind.css gerado");
