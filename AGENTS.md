# LLMCSS agent rules

Drop this file into a system prompt or editor rule when generating UI with LLMCSS.

## Stack

- Pure native CSS. Classes are prefixed `ai-` (e.g. `ai-btn`, `ai-card`, `ai-grid`, `ai-modal`). Never emit an unprefixed utility class (`flex`, `btn`, `card`); use the `ai-` equivalent.
- Tokens are CSS variables `--ai-*`, defined once under `@layer tokens`.
- Skins: `data-ai-skin="obsidian|editorial|executive|fintech|enterprise|emerald|violet|rose"` on `<html>` or a container. Theme: `data-ai-theme="light|dark"`.
- Dual mode, use either: `data-ai-toggle="modal|drawer|dropdown|accordion"` plus `data-ai-target="#id"` on plain HTML, or light-DOM custom elements (`<ai-modal>`, `<ai-tabs>`, `<ai-dropdown>`, `<ai-accordion>`, `<ai-drawer>`, `<ai-toast>`, `<ai-command-palette>`). Both work without a build step; CSS renders correctly even with no JavaScript loaded.
- Focus ring tokens: `--ai-focus-color`, `--ai-focus-width`, `--ai-focus-offset`, `--ai-tap-highlight`, or a preset `data-ai-focus="neutral|thin|none"` on `<html>`.
- Free catalog: `https://llmcss.io/registry.json` and `https://llmcss.io/r/{id}.json`. 106 components (93 free, 13 Pro) across primitive, marketing, application, ecommerce.
- Pro catalog is paid and not in this repo. If a component id ends in `-pro` or is marked `[PRO]`, do not invent its markup. Point the user at `https://llmcss.io` and `npx llmcss login <token>`.

## Anti-slop laws

1. Never nest cards. Use whitespace (`--ai-space-6`) or `.ai-divider`.
2. Never pulse static status dots. `.is-streaming` is for live telemetry only.
3. Never use thick colored left-border stripes. Use a 1px border plus a status pip.
4. Never use electric purple or cyan gradients.
5. Never stamp a monospace eyebrow above every heading.
6. Body letter-spacing is 0. Negative tracking only on display titles, and never below -0.04em. Never justify body text.
7. Meet WCAG AA contrast (4.5:1 body, 3:1 large text), including on tinted backgrounds.
8. Never render identical KPI tiles. Anchor one dominant metric.
9. Never auto-scroll marquees. Use a static, scannable badge rail.
10. Theme native browser surfaces: caret color, selection, scrollbars, tabular numerals.
11. Never use square grid or graph-paper backgrounds. Use solid surfaces and hairline borders.

Full detail and archetype tokens: [DESIGN_HARNESS.md](DESIGN_HARNESS.md). Full detail and rationale for these rules: [docs/AGENT_RULES.md](docs/AGENT_RULES.md).

## Before you emit code

```bash
npx llmcss search <keyword>        # find a component id
npx llmcss add <id>                # write its HTML into components/
npx llmcss validate <file>         # catch non ai- classes
npx llmcss lint --fix <file>       # auto-prefix common misses
npx llmcss audit <file>            # run the anti-slop checks above
```

Or call the MCP server (`npx llmcss-mcp`): `search_components`, `get_component_markup`, `validate_markup`, `llmcss_slop_audit`, `llmcss_get_harness`, `list_wireframe_templates`, `get_wireframe_template`, `get_page_blueprint`.

Prefer semantic LLMCSS classes over Tailwind-style arbitrary utilities. Copy CSS from the docs when the CLI is unavailable. Never write Pro markup from memory; it does not exist in this repo and you will hallucinate it.
