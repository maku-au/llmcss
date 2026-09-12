# LLMCSS with Django

## 1. Add the tags

In the `<head>` of `templates/base.html`, above your own head block:

```html
  <head>
    <link rel="stylesheet" href="https://llmcss.io/llmcss.css">
    <script src="https://llmcss.io/llmcss.js" defer></script>
    {% block extra_head %}{% endblock %}
  </head>
```

The `<script>` is optional and only powers modal, drawer, dropdown, accordion,
tabs, toast and command palette behavior. To self-host, `npm install llmcss`,
copy `dist/llmcss.css` and `dist/llmcss.js` into your static files, then use
`{% load static %}` and `{% static 'llmcss/llmcss.css' %}` (pinned CDN copy:
`https://cdn.jsdelivr.net/npm/llmcss@0.2.0/dist/llmcss.css`). On `<html>` set `data-ai-theme="light|dark"`,
`data-ai-skin="obsidian|editorial|executive|fintech|enterprise|emerald|violet|rose"`,
`data-ai-density="compact|spacious"`.

## 2. Re-renders and partial swaps

There is nothing to re-initialize. The runtime binds one `click` listener and one
`keydown` listener to `document` and resolves `data-ai-toggle`,
`data-ai-dismiss` and `data-ai-tab` with `closest()` at event time, so HTML that
lands later (an htmx swap, a fragment fetched from a view, a form re-rendered
with validation errors) is handled by listeners that are already installed.
Custom elements like `<ai-modal>` upgrade automatically through the
CustomElementRegistry when inserted. `window.LLMCSS` is not a re-init API; it
offers only `open(elOrSelector)` and `close(elOrSelector)`.

## 3. Staying CSS-only

Leave the `<script>` tag out. Everything except modal, drawer, dropdown,
accordion, tabs, toast and command palette behavior is pure CSS and needs no
JavaScript at all.

## 4. Example template

```html
<div class="ai-grid ai-gap-4">
  {% for invoice in invoices %}
    <article class="ai-card">
      <div class="ai-card-header ai-flex ai-items-center ai-justify-between">
        <h3 class="ai-card-title">{{ invoice.number }}</h3>
        <span class="ai-badge ai-badge-success">{{ invoice.get_status_display }}</span>
      </div>
      <div class="ai-card-body">
        <p class="ai-text-secondary">{{ invoice.customer.name }}</p>
      </div>
      <a class="ai-btn ai-btn-primary" href="{% url 'invoice_detail' invoice.pk %}">View</a>
    </article>
  {% empty %}
    <p class="ai-text-secondary">No invoices yet.</p>
  {% endfor %}
</div>
```
