import tokens from "./tokens.json";

export { tokens };
export type Cor = (typeof tokens.cores)[number];
// Mapa id → hex de todas as cores: principais, tons das escalas (ouro-700), apoio e semânticas.
export const cor = Object.fromEntries([
  ...tokens.cores.map((c) => [c.id, c.hex]),
  ...Object.entries(tokens.escalas).flatMap(([id, e]) => Object.entries(e.tons).map(([t, hex]) => [`${id}-${t}`, hex])),
  ...tokens.apoio.map((c) => [c.id, c.hex]),
  ...tokens.auxiliares.map((c) => [c.id, c.hex]),
  ...tokens.semanticas.map((c) => [c.id, c.hex]),
]) as Record<string, string>;
export { contraste } from "./contraste";
export { logos, type VarianteLogo } from "./logos";
export { Logo } from "./components/Logo";
