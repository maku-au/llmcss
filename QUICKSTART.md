# LLMCSS quickstart

LLMCSS is a CSS library. Class prefix is `ai-*`. Copy CSS, use the CLI, or point an agent at the MCP server.

This page also lives at [llmcss.io/quickstart](https://llmcss.io/quickstart). Gallery: [llmcss.io/components](https://llmcss.io/components).

## 1. Link the stylesheet

```html
<!doctype html>
<html lang="en" data-ai-theme="light">
  <head>
    <link rel="stylesheet" href="https://llmcss.io/llmcss.css" />
  </head>
  <body>
    <button class="ai-btn ai-btn-primary">Save</button>
  </body>
</html>
```

Interactive components (modal, drawer, dropdown, accordion, tabs, toasts) need the runtime. One tag, no build:

```html
<script src="https://llmcss.io/llmcss.js" defer></script>
```

It registers `data-ai-toggle` / `data-ai-dismiss` / `data-ai-tab` handling and the `<ai-modal>` style custom elements. Everything else is CSS-only and works without it.

Dark mode: `data-ai-theme="dark"` on `<html>`. There is no `prefers-color-scheme` query in the CSS, so the OS setting alone changes nothing; set the attribute yourself. Skin: `data-ai-skin="obsidian"` (also `editorial`, `executive`, `fintech`, `enterprise`). `emerald`, `violet`, and `rose` are deprecated aliases of `data-ai-accent` of the same name and will be removed in 1.0.

Accent: `data-ai-accent="emerald|violet|rose|teal|steel|amber"` on `<html>` sets only the accent color; it composes with any skin and outranks the skin's own accent.

Density: `data-ai-density="compact|spacious"` scales the spacing steps components use for padding.

Focus: `data-ai-focus="neutral|thin|none"` on `<html>` swaps the focus ring preset.

Pin a release instead of tracking latest:

```html
<link rel="stylesheet" href="https://llmcss.io/v/0.3.0/llmcss.css" />
```

Optional fonts (body, display, mono):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
```

## 2. Get a component

```bash
npx llmcss list
npx llmcss add btn-variants
```

`add` writes `components/primitive/btn-variants.html`. Paste the markup into your page; the stylesheet above already has the classes. Or copy HTML straight from the gallery, or fetch JSON:

```bash
curl https://llmcss.io/registry.json
curl https://llmcss.io/r/btn-variants.json
```

## 3. A first layout

```html
<div class="ai-container-sm ai-p-8">
  <h1>Hello</h1>
  <p class="ai-text-secondary">Body uses the sans token. Titles use the display token.</p>
  <div class="ai-flex ai-gap-2 ai-mt-4">
    <button class="ai-btn ai-btn-primary">Continue</button>
    <button class="ai-btn ai-btn-outline">Cancel</button>
  </div>
</div>
```

Rules of thumb: no nested cards, no pulsing dots on static status, no purple gradients. Full list: [AGENTS.md](AGENTS.md).

## 4. Interactive components

Two ways to get modal, drawer, dropdown, accordion, tabs, toast, and command palette behavior:

```html
<button class="ai-btn" data-ai-toggle="modal" data-ai-target="#example">Open</button>
<div id="example" class="ai-modal">
  <div class="ai-modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="ai-modal-box">…</div>
</div>
```

```html
<ai-modal id="example">…</ai-modal>
```

The nesting matters:

| Component | Toggle needs | Target needs |
|---|---|---|
| Modal / drawer | `data-ai-target="#id"` | A backdrop plus a box or panel |
| Dropdown | An `.ai-dropdown` ancestor | |
| Accordion | An `.ai-accordion-item` ancestor | |
| Tabs | `data-ai-tab="#panel"` | An `.ai-tabs` ancestor |

Open state is the `open` attribute and the `.is-open` class interchangeably.

Both forms are optional. CSS-only markup renders and themes correctly without any JavaScript; the runtime adds focus trapping, Escape-to-close, and `aria-expanded` sync on top. Full contract: [llmcss.io/llms-full.txt](https://llmcss.io/llms-full.txt).

## 5. Templates

```bash
npx llmcss templates
npx llmcss template get wireframe-nav-minimal
npx llmcss template blueprint saas-landing
```

<!-- templates:start -->
- 26 section templates: 18 free wireframe, 8 themed Pro.
- 6 page blueprints: 4 free, 2 Pro.
<!-- templates:end -->

Gallery: [llmcss.io/templates](https://llmcss.io/templates).

## 6. Agents (MCP)

```bash
npx llmcss-mcp
```

Point your editor at that stdio server. It bundles the public catalog and fetches Pro entries from llmcss.io; it exposes `search_components`, `get_component_markup`, `validate_markup`, `list_classes`, `list_tokens`, `list_states`, `llmcss_get_harness`, `llmcss_slop_audit`, `list_wireframe_templates`, `get_wireframe_template`, `get_page_blueprint`.

`list_classes`, `list_tokens` and `list_states` return the same data as [llmcss.io/classes.json](https://llmcss.io/classes.json), [tokens.json](https://llmcss.io/tokens.json) and [states.json](https://llmcss.io/states.json). If a class is not in classes.json, it does not exist.

## 7. Pro (optional)

Pro is $9/month via Polar and unlocks themed templates and kits. After checkout you get a token, shown once. The component catalog (including command palette, cart, and agent chrome) is MIT.

```bash
npx llmcss login llmcss_live_...
npx llmcss template get themed-hero-obsidian
npx llmcss add themed-editorial-article-header
```

Or paste the token under License at [llmcss.io/account](https://llmcss.io/account). Without a token, `npx llmcss add` / `npx llmcss template get` on a Pro id exits 1 with a login hint, and the Pro entry stays `locked: true` with `html: null`. Never write Pro markup from memory.

## Commands

| Command | What it does |
|---|---|
| `npx llmcss list` | Free + Pro ids |
| `npx llmcss search <query>` | Search by keyword, tag, or alias |
| `npx llmcss add <id>` | Write component HTML into `components/` |
| `npx llmcss validate <file>` | Flag non-`ai-` classes |
| `npx llmcss lint --fix <file>` | Auto-prefix common legacy classes |
| `npx llmcss audit <file>` | Anti-slop design checks |
| `npx llmcss templates` | List wireframe section templates |
| `npx llmcss template blueprint <id>` | Assemble a full page |
| `npx llmcss-mcp` | Local MCP server (stdio) |

This repo is the MIT core. Pro source is not here.
