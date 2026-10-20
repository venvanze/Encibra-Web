import tokens from "./tokens.json";

export { tokens };
export type Cor = (typeof tokens.cores)[number];
export const cor = Object.fromEntries(tokens.cores.map((c) => [c.id, c.hex])) as Record<string, string>;
export { contraste } from "./contraste";
export { logos, type VarianteLogo } from "./logos";
export { Logo } from "./components/Logo";
