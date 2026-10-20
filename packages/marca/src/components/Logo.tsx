import type { CSSProperties } from "react";
import { logos, type VarianteLogo } from "../logos";

type Props = {
  variante?: VarianteLogo;
  altura?: number;
  className?: string;
  style?: CSSProperties;
};

/** Logotipo Encibra. A versão padrão é a horizontal colorida, para fundos claros. */
export function Logo({ variante = "horizontal-cor", altura = 24, className, style }: Props) {
  const img = logos[variante];
  const largura = Math.round((img.width / img.height) * altura);
  return (
    <img
      src={img.src}
      width={largura}
      height={altura}
      alt="Encibra"
      className={className}
      style={style}
    />
  );
}
