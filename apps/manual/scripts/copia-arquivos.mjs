// Copia logos, grafismos, fontes e artes do pacote da marca para public/downloads,
// para que o manual ofereça os arquivos oficiais para download.
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const marca = dirname(require.resolve("@encibra/marca/tokens.json"));
const assets = join(marca, "..", "assets");
const destino = new URL("../public/downloads/", import.meta.url).pathname;

rmSync(destino, { recursive: true, force: true });
for (const pasta of ["logos", "grafismo", "fonts", "artes"]) {
  mkdirSync(join(destino, pasta), { recursive: true });
  cpSync(join(assets, pasta), join(destino, pasta), { recursive: true });
}
console.log("arquivos copiados para public/downloads");
