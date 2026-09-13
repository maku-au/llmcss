# LLMCSS with Rails

## Quick reference

- Install: `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Runtime (optional, for modal/drawer/dropdown/accordion/tabs/toast/command palette): `<script src="https://llmcss.io/llmcss.js" defer></script>`
- Sample: `<button class="btn btn-primary">Save</button>`
- Validate: `npx llmcss validate <file>`

## 1. Add the tags

In `app/views/layouts/application.html.erb`, inside `<head>`:

```erb
<html lang="en" data-ai-theme="light" data-ai-skin="editorial">
  <head>
    <link rel="stylesheet" href="https://llmcss.io/llmcss.css">
    <script src="https://llmcss.io/llmcss.js" defer></script>
```

The `<script>` is optional and only powers modal, drawer, dropdown, accordion,
tabs, toast and command palette behavior. For npm, install `llmcss` and serve
`dist/llmcss.css` and `dist/llmcss.js`, or pin
`https://cdn.jsdelivr.net/npm/llmcss@0.4.0/dist/llmcss.css`. On `<html>` set
`data-ai-theme="light|dark"`, `data-ai-skin="obsidian|editorial|executive|fintech|enterprise|emerald|violet|rose"`,
`data-ai-density="compact|spacious"`.

## 2. Turbo and re-renders

Never re-initialize LLMCSS after a render. The runtime attaches one `click` and
one `keydown` listener to `document`, matching `data-ai-toggle`,
`data-ai-dismiss` and `data-ai-tab` with `closest()` at event time. Markup that
arrives later (a Turbo Frame swap, a Turbo Stream append, a re-rendered partial)
is handled by those same listeners, and `<ai-modal>` style custom elements
upgrade through the CustomElementRegistry on insertion. A full Turbo Drive visit
replaces `<body>`, not `document`, so the listeners survive it and there is no
`turbo:load` hook to write. `window.LLMCSS` is not a re-init API; it exposes only
`open(elOrSelector)` and `close(elOrSelector)` for a Stimulus controller that
wants to drive an overlay itself.

## 3. Staying CSS-only

Omit the `<script>` tag. Everything except those seven interactive components is
pure CSS, so buttons, cards, tables, badges, inputs, themes and skins render with
zero JavaScript on the page.

## 4. Example partial

`app/views/shared/_card.html.erb`, rendered with
`<%= render "shared/card", project: project %>`:

```erb
<article class="card">
  <div class="card-header flex items-center justify-between">
    <h3 class="card-title"><%= project.name %></h3>
    <span class="badge badge-success"><%= project.status %></span>
  </div>
  <div class="card-body">
    <p class="text-secondary"><%= project.summary %></p>
  </div>
  <div class="card-footer flex gap-2">
    <%= link_to "Open", project_path(project), class: "btn btn-primary" %>
    <%= link_to "Archive", archive_project_path(project), class: "btn btn-outline" %>
  </div>
</article>
```
