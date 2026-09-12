# LLMCSS

Native CSS component library for humans and AI coding agents. No build step, no runtime dependency, one prefix: `ai-*`.

```html
<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />
<button class="ai-btn ai-btn-primary">Save</button>
```

Add the runtime only if you use modal, drawer, dropdown, accordion, tabs, or toasts:

```html
<script src="https://llmcss.io/llmcss.js" defer></script>
```

That is the whole install. Everything else in this repo is optional: a CLI, an MCP server, and a JSON registry for agents that would rather fetch markup than guess it.

- Site: [llmcss.io](https://llmcss.io)
- Components gallery: [llmcss.io/components](https://llmcss.io/components)
- Templates gallery: [llmcss.io/templates](https://llmcss.io/templates)
- Quickstart: [QUICKSTART.md](QUICKSTART.md) or [llmcss.io/quickstart](https://llmcss.io/quickstart)
- Agent rules: [AGENTS.md](AGENTS.md), [docs/AGENT_RULES.md](docs/AGENT_RULES.md)
- Design rules for agents: [DESIGN_HARNESS.md](DESIGN_HARNESS.md)

## What this is

106 components (93 free, 13 Pro) across four categories, plus 18 wireframe section templates and 4 page blueprints. All CSS, no JavaScript required. An optional runtime adds modal, drawer, dropdown, accordion, tabs, toast, and command palette behavior, either via `data-ai-*` attributes on plain HTML or via light-DOM custom elements (`<ai-modal>`, `<ai-tabs>`, `<ai-dropdown>`, `<ai-accordion>`, `<ai-drawer>`, `<ai-toast>`, `<ai-command-palette>`).

## Install

```bash
npm install
npx llmcss list
npx llmcss add btn-variants
```

`add` writes HTML into `components/<category>/<id>.html` in your project. You can also copy markup straight from the gallery, or fetch it as JSON.

```bash
curl https://llmcss.io/registry.json
curl https://llmcss.io/r/btn-variants.json
```

## Machine-readable manifests

Generated from the CSS at build time, so they cannot drift from the stylesheet. An agent should read these instead of guessing class names.

- [classes.json](https://llmcss.io/classes.json): all 1176 `ai-*` classes, each with its family and the `ai-sm:` / `ai-md:` / `ai-lg:` / `ai-xl:` / `ai-cq:` prefixes that exist for it. If a class is not here, it does not exist.
- [tokens.json](https://llmcss.io/tokens.json): all 82 `--ai-*` tokens with their value in light, dark, each skin, and each focus preset.
- [states.json](https://llmcss.io/states.json): every `is-*` state class and every `data-ai-*` attribute, with allowed values and whether the author or the runtime applies it.
- [registry.json](https://llmcss.io/registry.json), [templates.json](https://llmcss.io/templates.json): component catalog and wireframe templates.

The MCP tools `list_classes`, `list_tokens` and `list_states` return the same data. Full agent specification: [llms-full.txt](https://llmcss.io/llms-full.txt).

## CLI

```bash
npx llmcss list                    # all components, free and pro
npx llmcss search <query>          # search by keyword, tag, or alias
npx llmcss info <id>               # raw component metadata
npx llmcss add <id>                # write component HTML into components/
npx llmcss validate <file>         # flag non ai- classes
npx llmcss lint --fix <file>       # auto-prefix common legacy classes
npx llmcss audit <file>            # anti-slop design checks
npx llmcss templates                     # list wireframe section templates
npx llmcss template get <id>             # output one section's HTML
npx llmcss template blueprints           # list full-page blueprints
npx llmcss template blueprint <id>       # assemble a full page
npx llmcss login <token>           # save a Pro license token
```

Binaries: `llmcss` and `llmcss-mcp` (aliases `cssai`, `cssai-mcp` also work).

## MCP server

```bash
npx llmcss-mcp
```

A stdio JSON-RPC server for editors and agents. It talks to the public catalog at llmcss.io; nothing runs long-lived on your machine. Tools: `search_components`, `get_component_markup`, `validate_markup`, `list_tokens`, `llmcss_get_harness`, `llmcss_slop_audit`, `list_wireframe_templates`, `get_wireframe_template`, `get_page_blueprint` (plus `cssai_get_harness` and `cssai_slop_audit` as aliases).

## Component index

Ids only. Full metadata: `npx llmcss info <id>` or `https://llmcss.io/r/{id}.json`. `*` marks Pro.

**Primitive (48):** btn-variants, btn-sizes, input-text, input-addon, switch-toggle, card-standard, badge-status, avatar-group, modal-dialog, tabs-system, dropdown-menu, accordion-faq, table-data, alert-callouts, animated-loaders, progress-bars, interactive-slider, skeleton-card, stepper-flow, segmented-toggle, popover-anchor, toast-stack, breadcrumb-nav, tooltip-hover, pagination-controls, divider-separator, textarea-counter, checkbox-radio-group, empty-state, kbd-shortcuts, quote-pull, code-block, file-dropzone, split-button, collapse-details, carousel-snap, floating-label, list-group, btn-group, level-bar, media-object, panel-list, notification-block, file-input, title-subtitle, chip-removable, select-native, input-icon

**Marketing (21):** navbar-modern, mobile-nav-drawer, mobile-nav-dropdown, hero-split, hero-bento-pro*, pricing-tier-cards, footer-multi-col, marquee-ticker, bento-editorial-pro*, pricing-matrix-pro*, section-shift, feature-grid, feature-list, stats-band, cta-band, callout-editorial, testimonial-grid, team-grid, announcement-bar, consent-bar, faq-section

**Application (34):** kpi-metric-cards, command-palette-pro*, auth-login-card, filter-toolbar, ai-chat-thread*, tool-trace*, approval-bar*, thought-chain*, agent-workspace*, mcp-widget-shell*, streaming-status*, citation-list*, sidebar-nav, stats-dashboard, notification-list, timeline-log, page-header, app-topbar, quota-meter, spark-stat, donut-stat, settings-list, log-console, health-grid, kanban-column, inbox-list, bar-chart, detail-list, date-range, data-grid, bulk-action-bar, tree-view, onboarding-checklist, error-state

**Ecommerce (3):** product-card, cart-drawer-pro*, product-grid

## Guides

- Editor completions: [docs/guides/editor-setup.md](docs/guides/editor-setup.md) (VS Code custom data and snippets generated from the stylesheet)
- Frameworks: [Rails](docs/guides/rails.md), [Django](docs/guides/django.md), [Astro](docs/guides/astro.md), [Next.js](docs/guides/nextjs.md), [SvelteKit](docs/guides/sveltekit.md), [Vue](docs/guides/vue.md)
- Migrating: [from Tailwind](docs/migration/tailwind.md), [from Bootstrap](docs/migration/bootstrap.md)
- Publishing: [docs/guides/publishing.md](docs/guides/publishing.md)
- Optional page-specific stylesheet: `npx llmcss trim <files...>` (the full stylesheet stays the supported default)

## Customizing

Set attributes on `<html>`:

```html
<html data-ai-theme="dark" data-ai-skin="obsidian">
```

- Theme: `data-ai-theme="light|dark"`
- Skin: `data-ai-skin="obsidian|editorial|executive|fintech|enterprise|emerald|violet|rose"`
- Focus ring: tune `--ai-focus-color`, `--ai-focus-width`, `--ai-focus-offset`, or set a preset with `data-ai-focus="neutral|thin|none"` on `<html>`. `--ai-tap-highlight` controls the mobile tap flash (transparent by default).
- Per-instance overrides: components read local CSS variables, for example `--ai-drawer-offset` on a top or bottom drawer to clear a fixed navbar.

Everything is a CSS variable under `@layer tokens` in `src/css/tokens.css`, loaded in this layer order: `reset, tokens, base, components, utilities`.

## Accessibility

The runtime (`https://llmcss.io/llmcss.js`, not required for CSS-only use) guarantees, for every modal, drawer, and command palette:

- Focus moves into the panel on open and back to the trigger on close.
- Tab is trapped inside the topmost overlay; Escape closes only that overlay.
- The rest of the page is marked `inert` while an overlay is open, except overlays opted into `.ai-drawer-no-lock` (modeless panels).
- `aria-expanded` stays in sync on every trigger pointing at the overlay.
- Tabs follow the WAI-ARIA tabs pattern (arrow keys, Home, End) and sync `aria-selected`.
- Motion respects `prefers-reduced-motion: reduce`.
- Focus rings only render on `:focus-visible` (keyboard), never on tap or click.

CSS-only usage (no runtime JS) still gets themed focus rings, WCAG AA contrast targets, and 44px minimum touch targets on buttons and inputs for coarse pointers, but toggle behavior then needs your own JavaScript or the custom elements.

## Design rules for agents

Eleven anti-slop laws, generated from `src/registry/laws.mjs` by `node src/registry/build-docs.mjs`:

<!-- laws:start -->
1. **Never nest containers**: Do not put a bordered card inside another bordered card. Nested boxes waste screen real estate and create dizzying visual layers.
2. **Never pulse static status pips**: Never attach continuous breathing or pulsing animations (`@keyframes pulse`) to steady states like "System Normal", "Online", or "Completed". Flashing elements demand attention when nothing has changed.
3. **Never use colored left-stripe borders**: Do not place thick 3px to 5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention.
4. **Never use electric purple or cyan halos and radial glows**: Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows.
5. **Never stamp formulaic eyebrows above headlines**: Avoid adding an uppercase monospace overline (`01 // FEATURES` or `OVERVIEW`) above every heading. When repeated everywhere, eyebrows become visual noise that delays reading the headline.
6. **Never crush letter-spacing below -0.04em or justify body text**: Do not apply extreme negative letter-spacing that makes characters collide, and never use `text-align: justify`, which causes distracting typographic rivers.
7. **Never place low-contrast gray text on colored backgrounds**: Never render neutral `#71717a` gray text over an accent surface or a tinted banner.
8. **Never create flat, identical metric grids**: Do not display 4 identical KPI cards with identical weights and icons.
9. **Never auto-scroll copy**: Do not force readers to wait for auto-scrolling tickers or animated marquee loops to read supported integrations or technologies.
10. **Always theme native browser surfaces**: An interface is incomplete if native browser affordances revert to un-themed system defaults.
11. **Never use square grid backgrounds**: Avoid covering backgrounds in repeating 20px to 40px square grid lines, dot grids, or mesh graph paper patterns built from intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits.
<!-- laws:end -->

Each law's remedy, plus the four archetypes (Executive Slate, Fintech Titanium, Obsidian Minimal, Editorial Atelier) and their token blocks, live in [DESIGN_HARNESS.md](DESIGN_HARNESS.md). Run `npx llmcss harness` or call the MCP tool `llmcss_get_harness` to get them at runtime. `npx llmcss audit <file>` checks a file against them.

## Pro

Pro adds advanced marketing, application, and ecommerce sections. $9/month via Polar. The token is shown once at checkout.

```bash
npx llmcss login llmcss_live_...
npx llmcss add tool-trace
```

Pro source is not in this repository. `npx llmcss add` on a Pro id fetches `GET /r/pro/{id}.json` with `Authorization: Bearer <token>`.

## License

- This repository: MIT ([LICENSE](LICENSE))
- Pro catalog: commercial subscription, kept in a private repository

Do not open a PR that adds Pro markup, Pro CSS sources, or `.env` files to this repo.
