# LLMCSS

Native CSS component library for humans and AI coding agents. No build step, no runtime dependency, every class name listed in one file.

```html
<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />
<button class="btn btn-primary">Save</button>
```

Add the runtime only if you use modal, drawer, dropdown, accordion, tabs, or toasts:

```html
<script src="https://llmcss.io/llmcss.js" defer></script>
```

That is the whole install. Everything else in this repo is optional: a CLI, an MCP server, and a JSON registry for agents that would rather fetch markup than guess it.

- Every class name is listed in [classes.json](https://llmcss.io/classes.json); nothing else styles the page. Classes carry no prefix (`btn`, not `ai-btn`).
- If a class is not listed there, it does not exist.
- Theming lives in `data-ai-theme`, `data-ai-skin`, `data-ai-accent`, `data-ai-density`, and `data-ai-focus` attributes on `<html>`.
- Run `npx llmcss validate <file>` before you ship markup.

- Site: [llmcss.io](https://llmcss.io)
- Components gallery: [llmcss.io/components](https://llmcss.io/components)
- Templates gallery: [llmcss.io/templates](https://llmcss.io/templates)
- Quickstart: [QUICKSTART.md](QUICKSTART.md) or [llmcss.io/quickstart](https://llmcss.io/quickstart)
- Agent rules: [AGENTS.md](AGENTS.md), [docs/AGENT_RULES.md](docs/AGENT_RULES.md)
- Design rules for agents: [DESIGN_HARNESS.md](DESIGN_HARNESS.md)

## What this is

<!-- stats:start -->
- **Classes:** 2312 classes across 40 families, listed in [classes.json](https://llmcss.io/classes.json).
- **Tokens:** 107 `--ai-*` custom properties, listed in [tokens.json](https://llmcss.io/tokens.json).
- **States:** 36 `is-*` classes, listed in [states.json](https://llmcss.io/states.json).
- **Components:** 122, all MIT: 54 primitive, 42 application, 21 marketing, 5 ecommerce.
- **Section templates:** 29 (18 free wireframe, 11 themed Pro).
- **Page blueprints:** 6 (4 free, 2 Pro).
<!-- stats:end -->

All CSS, no JavaScript required. An optional runtime adds modal, drawer, dropdown, accordion, tabs, toast, command palette, and split-pane behavior, either via `data-ai-*` attributes on plain HTML or via light-DOM custom elements (`<ai-modal>`, `<ai-tabs>`, `<ai-dropdown>`, `<ai-accordion>`, `<ai-drawer>`, `<ai-toast>`, `<ai-command-palette>`).

## Install

```bash
npx llmcss list
npx llmcss add btn-variants
```

No clone needed: `npx` fetches the `llmcss` package on demand. To add the CLI as a dev dependency instead, run `npm install --save-dev llmcss`.

`add` writes HTML into `components/<category>/<id>.html` in your project. You can also copy markup straight from the gallery, or fetch it as JSON.

```bash
curl https://llmcss.io/registry.json
curl https://llmcss.io/r/btn-variants.json
```

## Machine-readable manifests

Generated from the CSS at build time, so they cannot drift from the stylesheet. An agent should read these instead of guessing class names.

- [classes.json](https://llmcss.io/classes.json): every class, each with its family and the variants that exist for it: breakpoints `sm:` `md:` `lg:` `xl:` `2xl:`, container tiers `cq-sm:` `cq-md:` `cq-lg:`, and states such as `hover:`, `focus-visible:`, `group-hover:`, `dark:`, `print:` and `first:`. If a class is not here, it does not exist.
- [tokens.json](https://llmcss.io/tokens.json): every `--ai-*` token with its value in light, dark, each skin, and each focus preset.
- [states.json](https://llmcss.io/states.json): every `is-*` state class and every `data-ai-*` attribute, with allowed values and whether the author or the runtime applies it.
- [registry.json](https://llmcss.io/registry.json), [templates.json](https://llmcss.io/templates.json): component catalog and wireframe templates.

The MCP tools `list_classes`, `list_tokens` and `list_states` return the same data. Full agent specification: [llms-full.txt](https://llmcss.io/llms-full.txt).

## CLI

```bash
npx llmcss list                    # all components, free and pro
npx llmcss search <query>          # search by keyword, tag, or alias
npx llmcss info <id>               # raw component metadata
npx llmcss add <id>                # write component HTML into components/
npx llmcss validate <file>         # warn on unknown classes, fail on a stray ai- prefix (--strict fails on warnings too)
npx llmcss lint --fix <file>       # strip a stray ai- prefix
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

A stdio JSON-RPC server for editors and agents. It talks to the public catalog at llmcss.io; nothing runs long-lived on your machine. Tools: `search_components`, `get_component_markup`, `validate_markup`, `list_tokens`, `list_classes`, `list_states`, `llmcss_get_harness`, `llmcss_slop_audit`, `list_wireframe_templates`, `get_wireframe_template`, `get_page_blueprint` (plus `cssai_get_harness` and `cssai_slop_audit` as aliases).

## Component index

Components are split across four categories: primitive, marketing, application, ecommerce, and the counts are in [What this is](#what-this-is). Full list: `npx llmcss list`. Full metadata for one id: `npx llmcss info <id>` or `https://llmcss.io/r/{id}.json`. Full catalog as JSON: [registry.json](https://llmcss.io/registry.json).

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
- Skin: `data-ai-skin="obsidian|editorial|executive|fintech|enterprise|emerald|violet|rose"`. `emerald`, `violet`, and `rose` are deprecated aliases of `data-ai-accent` of the same name and will be removed in 1.0; use `data-ai-accent` instead.
- Accent: `data-ai-accent="emerald|violet|rose|teal|steel|amber"`. Sets only the accent color; composes with any skin and outranks the skin's accent.
- Density: `data-ai-density="compact|spacious"`. Scales the spacing steps components use for padding.
- Focus ring: tune `--ai-focus-color`, `--ai-focus-width`, `--ai-focus-offset`, or set a preset with `data-ai-focus="neutral|thin|none"` on `<html>`. `--ai-tap-highlight` controls the mobile tap flash (transparent by default).
- Per-instance overrides: components read local CSS variables, for example `--ai-drawer-offset` on a top or bottom drawer to clear a fixed navbar.

Everything is a CSS variable under `@layer tokens` in `src/css/tokens.css`, loaded in this layer order: `reset, tokens, base, components, utilities`.

## Accessibility

The runtime (`https://llmcss.io/llmcss.js`, not required for CSS-only use) guarantees, for every modal, drawer, and command palette:

- Focus moves into the panel on open and back to the trigger on close.
- Tab is trapped inside the topmost overlay; Escape closes only that overlay.
- The rest of the page is marked `inert` while an overlay is open, except overlays opted into `.drawer-no-lock` (modeless panels).
- `aria-expanded` stays in sync on every trigger pointing at the overlay.
- Tabs follow the WAI-ARIA tabs pattern (arrow keys, Home, End) and sync `aria-selected`.
- Motion respects `prefers-reduced-motion: reduce`.
- Focus rings only render on `:focus-visible` (keyboard), never on tap or click.

CSS-only usage (no runtime JS) still gets themed focus rings, WCAG AA contrast targets, and 44px minimum touch targets on buttons and inputs for coarse pointers, but toggle behavior then needs your own JavaScript or the custom elements.

## Design rules for agents

Eleven anti-slop laws, generated from `src/registry/laws.mjs` by `node src/registry/build-docs.mjs`:

<!-- laws:start -->
1. **Never nest containers**: Do not put a bordered container inside another bordered container. The audit walks the tag stack and flags every `.card`, `.panel` or `.kpi-card` that sits inside another `.card`, `.panel` or `.kpi-card`. Nested boxes waste screen real estate and create dizzying visual layers.
2. **Never pulse static status pips**: Never attach continuous breathing or pulsing animations to steady states like "System Normal", "Online", or "Completed". The audit flags the class tokens `animate-pulse`, `pulse`, `animate-ping`, `ping`, `breathe`, `blink` and `animate-bounce`, and any inline `animation:` value containing `pulse`, `ping`, `breathe`, `blink` or `glow`, unless the document also carries `is-streaming`. Flashing elements demand attention when nothing has changed.
3. **Never use colored left-stripe borders**: Do not place thick 3px to 5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention.
4. **Never use electric purple or cyan halos and radial glows**: Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows.
5. **Never stamp formulaic eyebrows above headlines**: Do not stamp a badge or a pill above a heading as an eyebrow, and do not repeat an uppercase monospace overline (`01 // FEATURES`, `OVERVIEW`) over every section. The audit flags a `span` or `div` carrying `.badge` or `.hero-badge` that is followed by an `h1` to `h4` within the next few lines, with `.product-badge-float` the only exemption. Repeated eyebrows become visual noise that delays reading the headline.
6. **Never crush letter-spacing below -0.04em or justify body text**: Do not apply extreme negative letter-spacing that makes characters collide, and never use `text-align: justify`, which causes distracting typographic rivers.
7. **Never place low-contrast gray text on colored backgrounds**: Never render neutral `#71717a` gray text over an accent surface or a tinted banner.
8. **Never create flat, identical metric grids**: Do not display 4 identical KPI cards with identical weights and icons.
9. **Never auto-scroll copy**: Do not force readers to wait for auto-scrolling tickers or animated marquee loops to read supported integrations or technologies.
10. **Always theme native browser surfaces**: An interface is incomplete if native browser affordances revert to un-themed system defaults.
11. **Never use square grid backgrounds**: Avoid covering backgrounds in repeating 20px to 40px square grid lines, dot grids, or mesh graph paper patterns built from intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits.
<!-- laws:end -->

Each law's remedy, plus the four archetypes (Executive Slate, Fintech Titanium, Obsidian Minimal, Editorial Atelier) and their token blocks, live in [DESIGN_HARNESS.md](DESIGN_HARNESS.md). Run `npx llmcss harness` or call the MCP tool `llmcss_get_harness` to get them at runtime. `npx llmcss audit <file>` checks a file against them.

## Pro

The MIT catalog is the full component set, including command palette, cart drawer, agent chrome, and bento heroes. There are no Pro components. Pro ($9/month via Polar) is themed section templates and page kits only. The token is shown once at checkout.

```bash
npx llmcss login llmcss_live_...
npx llmcss template get themed-hero-obsidian
npx llmcss template get themed-editorial-article-header
```

Themed source is not in this repository. `npx llmcss template get <pro-id>` and `npx llmcss template blueprint <pro-kit>` fetch `GET /r/pro/{id}.json` with `Authorization: Bearer <token>`. `npx llmcss add` never needs a token.

## License

- This repository: MIT ([LICENSE](LICENSE))
- Pro catalog: commercial subscription, kept in a private repository

Do not open a PR that adds themed Pro markup, Pro CSS sources, or `.env` files to this repo.
