# LLMCSS with Vue

## Quick reference

- Install: `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Runtime (optional, for modal/drawer/dropdown/accordion/tabs/toast/command palette): `<script src="https://llmcss.io/llmcss.js" defer></script>`
- Sample: `<button class="btn btn-primary">Save</button>`
- Validate: `npx llmcss validate <file>`

## 1. Add the tags

For a Vite SPA the shell is `index.html` at the project root:

```html
<html lang="en" data-ai-theme="light" data-ai-skin="violet">
  <head>
    <link rel="stylesheet" href="https://llmcss.io/llmcss.css" />
    <script src="https://llmcss.io/llmcss.js" defer></script>
  </head>
  <body><div id="app"></div><script type="module" src="/src/main.ts"></script></body>
</html>
```

The `<script>` is optional and only powers modal, drawer, dropdown, accordion,
tabs, toast and command palette behavior. For npm, `npm install llmcss` and
`import "llmcss/dist/llmcss.css"` in `src/main.ts` (pinned CDN copy:
`https://cdn.jsdelivr.net/npm/llmcss@0.4.0/dist/llmcss.css`). On Nuxt there is no `index.html`: add the same two tags through `app.head.link` and `app.head.script`
in `nuxt.config.ts`, and set the `<html>` attributes with `app.head.htmlAttrs`
(`data-ai-theme`, `data-ai-skin`, `data-ai-density`).

## 2. Re-renders

Vue's reactivity never breaks LLMCSS and you never re-initialize it. The runtime
attaches one `click` and one `keydown` listener to `document` and matches
`data-ai-toggle`, `data-ai-dismiss` and `data-ai-tab` with `closest()` at event
time, so elements produced by `v-for`, `v-if` or a router view swap are handled
by the listeners already in place. Custom elements like `<ai-modal>` upgrade
through the CustomElementRegistry on insertion; tell Vue to leave them alone with
`compilerOptions.isCustomElement = (tag) => tag.startsWith("ai-")`.
`window.LLMCSS` is not a re-init API; it exposes only `open(elOrSelector)` and `close(elOrSelector)`.

## 3. Staying CSS-only

Delete the `<script>` tag. Everything except those seven interactive components is pure CSS and needs no JavaScript.

## 4. Example single file component

```vue
<script setup>
defineProps({ projects: { type: Array, default: () => [] } });
</script>

<template>
  <div class="grid gap-4">
    <article v-for="p in projects" :key="p.id" class="card">
      <div class="card-header flex items-center justify-between">
        <h3 class="card-title">{{ p.name }}</h3>
        <span class="badge badge-success">{{ p.status }}</span>
      </div>
      <div class="card-body">
        <p class="text-secondary">{{ p.summary }}</p>
      </div>
    </article>
  </div>
</template>
```
