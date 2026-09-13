# LLMCSS with SvelteKit

## Quick reference

- Install: `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Runtime (optional, for modal/drawer/dropdown/accordion/tabs/toast/command palette): `<script src="https://llmcss.io/llmcss.js" defer></script>`
- Sample: `<button class="btn btn-primary">Save</button>`
- Validate: `npx llmcss validate <file>`

## 1. Add the tags

`src/app.html` is the shell for every page. Put the tags next to the
`%sveltekit.head%` placeholder:

```html
<html lang="en" data-ai-theme="light" data-ai-skin="executive">
  <head>
    <link rel="stylesheet" href="https://llmcss.io/llmcss.css" />
    <script src="https://llmcss.io/llmcss.js" defer></script>
    %sveltekit.head%
  </head>
```

The `<script>` is optional and only powers modal, drawer, dropdown, accordion,
tabs, toast and command palette behavior. For npm, `npm install llmcss` and
`import "llmcss/dist/llmcss.css"` in `src/routes/+layout.svelte` (pinned CDN copy:
`https://cdn.jsdelivr.net/npm/llmcss@0.4.0/dist/llmcss.css`). On `<html>` set
`data-ai-theme="light|dark"`,
`data-ai-skin="obsidian|editorial|executive|fintech|enterprise|emerald|violet|rose"`,
`data-ai-density="compact|spacious"`.

## 2. Re-renders and navigation

You never re-initialize after a render. The runtime binds one `click` and one
`keydown` listener to `document` and matches `data-ai-toggle`, `data-ai-dismiss`
and `data-ai-tab` with `closest()` at event time, so nodes an `{#each}` block
creates on a store update, an `{#if}` branch that flips, or a client-side route
navigation all keep working with no extra call. Custom elements such as
`<ai-modal>` upgrade through the CustomElementRegistry on insertion.
`window.LLMCSS` is not a re-init API; it exposes only `open(elOrSelector)` and `close(elOrSelector)`, safe to call inside `onMount` or a handler.

## 3. Staying CSS-only

Omit the `<script>` tag. Everything except those seven interactive components is pure CSS and works with no JavaScript on the page.

## 4. Example component, `src/lib/ProjectList.svelte`

```svelte
<script>
  export let projects = [];
</script>

<div class="grid gap-4">
  {#each projects as project (project.id)}
    <article class="card">
      <div class="card-header flex items-center justify-between">
        <h3 class="card-title">{project.name}</h3>
        <span class="badge badge-success">{project.status}</span>
      </div>
      <div class="card-body">
        <p class="text-secondary">{project.summary}</p>
      </div>
    </article>
  {/each}
</div>
```
