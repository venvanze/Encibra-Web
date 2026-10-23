<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

## Convenções visuais dos sites Encibra

- **Bordas (Rodrigo, 23/10/2026):** sempre internas, com `box-shadow: inset` (nunca `border` ou `outline`, que mudam o tamanho ou vazam para fora). Cor: branco a 8% de opacidade; sobre fundo branco/claro, o equivalente em preto (preto a 8%). No manual, use os tokens `--borda` (troca sozinho nas áreas escuras) e `--borda-clara` de `apps/manual/app/manual.css`. Exceções: anel de foco de acessibilidade e guias de diagrama.
- **Nada afiado:** todo canto é arredondado (tokens `--raio-p/m/g`), inclusive as quinas dos chanfros do grafismo.
