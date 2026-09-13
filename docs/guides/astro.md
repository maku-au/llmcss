# LLMCSS with Astro

## Quick reference

- Install: `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Runtime (optional, for modal/drawer/dropdown/accordion/tabs/toast/command palette): `<script src="https://llmcss.io/llmcss.js" defer></script>`
- Sample: `<button class="btn btn-primary">Save</button>`
- Validate: `npx llmcss validate <file>`

## 1. Add the tags

In `src/layouts/Layout.astro`, inside `<head>`:

```astro
<html lang="en" data-ai-theme="light" data-ai-skin="obsidian">
  <head>
    <link rel="stylesheet" href="https://llmcss.io/llmcss.css" />
    <script is:inline src="https://llmcss.io/llmcss.js" defer></script>
  </head>
  <body><slot /></body>
</html>
```

`is:inline` tells Astro to emit the tag verbatim instead of routing it through
the bundler, so keep the directive (or install `llmcss` from npm and import
`llmcss/dist/llmcss.js` yourself). Pinned CDN copy:
`https://cdn.jsdelivr.net/npm/llmcss@0.4.0/dist/llmcss.css`. On `<html>` set `data-ai-theme="light|dark"`,
`data-ai-skin="obsidian|editorial|executive|fintech|enterprise|emerald|violet|rose"`,
`data-ai-density="compact|spacious"`.

## 2. Islands and re-renders

Nothing needs re-initializing. The runtime installs one `click` and one `keydown`
listener on `document` and matches `data-ai-toggle`, `data-ai-dismiss` and
`data-ai-tab` with `closest()` at event time, so markup rendered later by a
hydrated island (React, Svelte, Vue, Solid) is handled by those listeners with no
extra call. Custom elements such as `<ai-modal>` upgrade through the
CustomElementRegistry as soon as they are inserted. `window.LLMCSS` is not a
re-init API; it exposes only `open(elOrSelector)` and `close(elOrSelector)`.

## 3. Staying CSS-only

Astro ships zero JavaScript by default, so the CSS-only path is the natural one
here: drop the `<script>` tag and keep the `<link>`. Everything except modal,
drawer, dropdown, accordion, tabs, toast and command palette behavior is pure CSS.

## 4. Example component

`src/components/ProjectCard.astro`:

```astro
---
const { name, status, summary, href } = Astro.props;
---
<article class="card">
  <div class="card-header flex items-center justify-between">
    <h3 class="card-title">{name}</h3>
    <span class="badge badge-success">{status}</span>
  </div>
  <div class="card-body">
    <p class="text-secondary">{summary}</p>
    <a class="btn btn-primary" href={href}>Open</a>
  </div>
</article>
```
