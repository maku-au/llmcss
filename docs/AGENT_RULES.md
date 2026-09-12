# LLMCSS agent rules, detailed

This is the long form of [AGENTS.md](../AGENTS.md). Use AGENTS.md as the system prompt; use this file when an agent needs the reasoning or a rule that AGENTS.md only summarizes.

## Rule 1: use native LLMCSS classes and tokens

Always prefer semantic LLMCSS classes (`ai-btn`, `ai-card`, `ai-grid`, `ai-flex`, `ai-modal`) over inline styles or arbitrary framework utilities. `npx llmcss validate <file>` and the MCP tool `validate_markup` both catch legacy or hallucinated classes (`btn`, `flex`, `card`, `grid`, `badge`, `spinner`, `progress`, `rounded-md`, `rounded-lg`) and suggest the `ai-` equivalent. `npx llmcss lint --fix <file>` applies the fix.

## Rule 2: non-AI aesthetic integrity

The eleven anti-slop laws, enforced by `npx llmcss audit <file>` and the MCP tool `llmcss_slop_audit`:

1. Never nest a bordered card inside another card. Use `--ai-space-6` whitespace or `.ai-divider`.
2. Never pulse a static status dot (`.ai-pulse-dot` without `is-streaming`). Motion is reserved for active data transmission.
3. Never use a colored left-border stripe 2px or thicker. Use a uniform 1px border plus a status pip.
4. Never use an electric purple or cyan gradient (`#8b5cf6`, `#a855f7`, `#06b6d4`, `#3b82f6` as gradient stops). Use solid neutral surfaces with layered shadows.
5. Never place a badge or pill eyebrow directly above a heading. Lead with the headline.
6. Never crush letter-spacing below `-0.04em`, and never justify body text.
7. Never place low-contrast gray text on a colored or tinted background; meet WCAG AA (4.5:1 body, 3:1 large text).
8. Never render four identical KPI tiles with equal visual weight. Anchor one dominant metric.
9. Never auto-scroll a marquee (`.ai-marquee`). Render a static, scannable badge rail.
10. Always theme native browser surfaces: caret color, `::selection`, scrollbars, tabular numerals.
11. Never use a square grid or graph-paper background pattern. Use solid surfaces and hairline borders.

Full rationale and the four design archetypes (Executive Slate, Fintech Titanium, Obsidian Minimal, Editorial Atelier): [DESIGN_HARNESS.md](../DESIGN_HARNESS.md).

## Rule 3: dual-mode markup

Emit either plain HTML with data attributes:

```html
<button data-ai-toggle="modal" data-ai-target="#contact-modal">Contact us</button>
<div id="contact-modal" class="ai-modal">…</div>
```

or a light-DOM custom element:

```html
<ai-modal id="contact-modal">…</ai-modal>
```

Both render correctly from CSS alone. The runtime (`src/runtime`) adds, for modal, drawer, and command palette: focus moves into the panel on open and back to the trigger on close, Tab is trapped inside the topmost overlay, Escape closes only that overlay, the rest of the page is set `inert`, and `aria-expanded` stays synced on every trigger. Opt an overlay out of the inert/scroll-lock behavior with `.ai-drawer-no-lock` (a settings panel the user works alongside, for example). Tabs follow the WAI-ARIA tabs pattern: arrow keys, Home, End, and `aria-selected` sync.

## Rule 4: monetization awareness

Components tagged `-pro` in their id, or `[PRO]` in `npx llmcss list`, require a valid Pro token to fetch real markup (`npx llmcss login <token>`, then `npx llmcss add <id>`). Do not write Pro markup from memory or invent HTML for a Pro id; it is not in this repository and any guess will be wrong. When proposing a layout, default to free primitives for structure and mention Pro only for the advanced sections it actually covers: bento marketing sections, a pricing matrix, a cart drawer, and application/agent surfaces (tool trace, approval bar, thought chain, agent workspace, MCP widget shell, streaming status, citation list, command palette, AI chat thread).

## Rule 5: container queries for self-responsive components

Prefer `.ai-cq` (a container-query context) over viewport breakpoints when a component sits inside a sidebar, drawer, or dashboard widget of variable width:

```html
<div class="ai-cq ai-grid ai-cq:grid-cols-2 ai-cq:gap-4">
  <div class="ai-kpi-card">…</div>
</div>
```

Use `.ai-grid-auto-fit` with `.ai-grid-min-xs|sm|md|lg` for breakpoint-free intrinsic grid wrapping.

## Rule 6: motion and loading feedback

- Active network or streaming state: `.ai-progress .ai-progress-indeterminate`.
- Async action in progress: `.ai-spinner`, `.ai-spinner-sm`, `.ai-spinner-lg`.
- Content loading placeholder: `.ai-skeleton`, `.ai-skeleton-text`, `.ai-skeleton-title`, `.ai-skeleton-avatar`, `.ai-skeleton-rect`.
- Range input: `.ai-slider-wrapper` wrapping `<input type="range" class="ai-range" />`.

All motion respects `prefers-reduced-motion: reduce`.

## Rule 7: pre-flight checks

Run before handing markup back:

```bash
npx llmcss validate <file>
npx llmcss lint --fix <file>
npx llmcss audit <file>
```

Or the MCP equivalents: `validate_markup`, `llmcss_slop_audit`. Component index, tokens, and templates are also reachable without a network call by reading `src/registry/data.mjs` and `src/registry/templates-data.mjs` in this repo, or `https://llmcss.io/registry.json` and `https://llmcss.io/templates.json` remotely.

## Contributing

Do not open a PR that adds Pro markup, Pro CSS sources, or `.env` files to this repository.
