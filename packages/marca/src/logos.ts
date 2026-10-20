import horizontalCor from "../assets/logos/logo-horizontal-cor.png";
import horizontalPreto from "../assets/logos/logo-horizontal-preto.png";
import horizontalBranco from "../assets/logos/logo-horizontal-branco.png";
import horizontalNegativo from "../assets/logos/logo-horizontal-neg-icone.png";
import iconeAmarelo from "../assets/logos/icone-amarelo.png";
import iconePreto from "../assets/logos/icone-preto.png";
import iconeBranco from "../assets/logos/icone-branco.png";

export const logos = {
  "horizontal-cor": horizontalCor,
  "horizontal-preto": horizontalPreto,
  "horizontal-branco": horizontalBranco,
  "horizontal-negativo": horizontalNegativo,
  "icone-amarelo": iconeAmarelo,
  "icone-preto": iconePreto,
  "icone-branco": iconeBranco,
} as const;

export type VarianteLogo = keyof typeof logos;
