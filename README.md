# encibra-web

Monorepo dos sites da Encibra S.A. Um só stack (TypeScript, React, Next.js) para o manual de marca,
a intranet, o site institucional e o portfólio, todos usando o mesmo pacote da marca.

```
packages/
  marca/      cores, fontes, logos e componentes da marca (@encibra/marca)
apps/
  manual/     manual de marca (Next.js, exportação estática)
  intranet/   próxima etapa: Next.js com login Microsoft 365
  site/       depois: Next.js + Payload CMS (substitui o WordPress; portfólio como coleção "Projetos")
```

## Rodar

```bash
pnpm install
pnpm dev            # todos os apps em modo de desenvolvimento
pnpm build          # build de produção (o manual sai em apps/manual/out)
```

## Mudar uma cor da marca

As cores e fontes têm uma fonte única: `packages/marca/src/tokens.json`.
O build gera `tokens.css` a partir dela, e todos os apps leem as variáveis `--cor-*` e `--fonte-*`.
A tabela de contraste do manual é recalculada sozinha.

## Fontes

DM Sans (SIL Open Font License) está no pacote. Aptos é licenciada pela Microsoft e não fica no
repositório; os apps usam Aptos quando ela está instalada e caem para Segoe UI ou Calibri.

## Deploy

Cada app é um projeto na Vercel apontando para a sua pasta (`apps/manual`, etc.).
