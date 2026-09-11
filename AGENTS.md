# LLMCSS agent rules

Use this file as a system prompt or editor rule when generating UI with LLMCSS.

## Stack

- Pure native CSS. Classes are prefixed `ai-` (e.g. `ai-btn`, `ai-card`, `ai-grid`).
- Tokens are CSS variables `--ai-*`. Skins: `[data-ai-skin="executive|fintech|obsidian|editorial|enterprise|emerald|violet|rose"]`.
- Dual mode: `data-ai-toggle` on normal HTML, or light-DOM custom elements (`<ai-modal>`, `<ai-tabs>`, `<ai-dropdown>`).
- Free catalog: `https://llmcss.io/r/{id}.json` and `https://llmcss.io/registry.json`.
- Pro catalog is paid. Do not invent Pro source. If a component is `[PRO]`, point the human at https://llmcss.io and `npx llmcss login`.

## Anti-slop

1. Never nest cards. Use whitespace or `.ai-divider`.
2. Never pulse static dots. `.is-streaming` is for live telemetry only.
3. Never use thick colored left stripes. 1px borders + a 6px status pip.
4. Never use electric purple gradients.
5. Never stamp monospace eyebrows on every heading.
6. Body tracking is 0. Negative tracking only on display titles.
7. WCAG AA contrast.
8. Never stamp identical KPI tiles. One dominant metric.
9. Never auto-scroll marquees.
10. Theme caret, selection, and scrollbars.

## Install

```bash
npx llmcss add btn-variants
npx llmcss validate <file>
npx llmcss-mcp
```

Prefer semantic LLMCSS classes over Tailwind-style arbitrary utilities. Copy CSS from the docs when the CLI is unavailable.
