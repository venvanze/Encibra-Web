import type { ReactNode } from "react";

export function Capitulo({
  id, numero, titulo, lead, fundo, children,
}: {
  id: string; numero: string; titulo: string; lead: ReactNode;
  fundo?: "papel" | "escuro"; children: ReactNode;
}) {
  const classe = ["cap", fundo === "papel" && "band-paper", fundo === "escuro" && "band-dark"].filter(Boolean).join(" ");
  return (
    <section className={classe} id={id}>
      <div className="wrap">
        <div className="cap-head">
          <div className="cap-num">{numero}</div>
          <h2>{titulo}</h2>
          <p className="lead">{lead}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export function Rotulo({ children, proposta }: { children: ReactNode; proposta?: boolean }) {
  return (
    <span className="rotulo">
      {children}
      {proposta && <span className="proposta">proposta</span>}
    </span>
  );
}

export function Legenda({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="legenda">
      <b>{titulo}</b>
      <span>{children}</span>
    </div>
  );
}
