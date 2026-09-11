# LLMCSS Quickstart

LLMCSS is a CSS library. Prefix is `ai-*`. You can copy CSS, use the CLI, or point an agent at the MCP server.

Site: [llmcss.io](https://llmcss.io) · Gallery: [components](https://llmcss.io/components.html) · This page on the site: [llmcss.io/quickstart](https://llmcss.io/quickstart)

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

Optional fonts (body, titles, mono):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
```

Dark mode: `data-ai-theme="dark"` on `<html>`.  
Skin: `data-ai-skin="obsidian"` (also `executive`, `fintech`, `editorial`, `enterprise`).

## 2. Copy a free component

Browse [llmcss.io/components.html](https://llmcss.io/components.html) and copy HTML, or:

```bash
npx llmcss list
npx llmcss add btn-variants
```

That writes `components/primitive/btn-variants.html`. Paste the markup into your page. The stylesheet above already has the classes.

JSON for agents:

- Catalog: `https://llmcss.io/registry.json`
- One free component: `https://llmcss.io/r/btn-variants.json`

## 3. A first layout

```html
<div class="ai-container" style="max-width: 40rem; padding: var(--ai-space-8);">
  <h1>Hello</h1>
  <p class="ai-text-secondary">Body uses Plus Jakarta. Titles use the display face.</p>
  <div class="ai-flex ai-gap-2" style="margin-top: var(--ai-space-4);">
    <button class="ai-btn ai-btn-primary">Continue</button>
    <button class="ai-btn ai-btn-outline">Cancel</button>
  </div>
</div>
```

Rules of thumb: no nested cards, no pulsing dots on static status, no purple gradients. Full list: [AGENTS.md](AGENTS.md).

## 4. Templates

```bash
npx llmcss templates
npx llmcss template get wireframe-nav-minimal
npx llmcss template blueprint saas-landing
```

Gallery: [llmcss.io/templates.html](https://llmcss.io/templates.html)

## 5. Agents (MCP)

```bash
npx llmcss-mcp
```

Point your editor at that stdio server. It reads the public catalog at llmcss.io.

## 6. Pro (optional)

Pro is $9/month. After checkout you get a token (shown once).

```bash
npx llmcss login llmcss_live_...
npx llmcss add tool-trace
```

Or paste the token under **License** on the components gallery.

## Commands

| Command | What it does |
|---|---|
| `npx llmcss list` | Free + Pro ids |
| `npx llmcss add <id>` | Write HTML into `components/` |
| `npx llmcss validate <file>` | Catch non-`ai-` classes |
| `npx llmcss lint --fix <file>` | Auto-prefix common misses |
| `npx llmcss audit <file>` | Anti-slop checks |
| `npx llmcss-mcp` | Local MCP (stdio) |

This repo is the MIT core. Pro source is not here.
