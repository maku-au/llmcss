# LLMCSS with Next.js

## Quick reference

- Install: `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Runtime (optional, for modal/drawer/dropdown/accordion/tabs/toast/command palette): `<script src="https://llmcss.io/llmcss.js" defer></script>`
- Sample: `<button class="btn btn-primary">Save</button>`
- Validate: `npx llmcss validate <file>`

## 1. Add the tags

App Router, in `app/layout.tsx`:

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-ai-theme="light" data-ai-skin="fintech">
      <head>
        <link rel="stylesheet" href="https://llmcss.io/llmcss.css" />
        <script src="https://llmcss.io/llmcss.js" defer />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

The script is optional and only powers modal, drawer, dropdown, accordion, tabs,
toast and command palette behavior; `<Script src="..." strategy="beforeInteractive" />`
from `next/script` is an equivalent way to load it. For npm, `npm install llmcss`
and `import "llmcss/dist/llmcss.css"` in the layout (pinned CDN copy:
`https://cdn.jsdelivr.net/npm/llmcss@0.4.0/dist/llmcss.css`). In JSX write
`className`, not `class`; `data-ai-*` attributes pass through unchanged.

## 2. React re-renders

React re-renders do not break anything, and you must not call `initLLMCSS()` after
one. The runtime attaches one `click` and one `keydown` listener to `document` and
resolves `data-ai-toggle`, `data-ai-dismiss` and `data-ai-tab` with `closest()`
when the event fires, so nodes React mounts later, including whole route segments
swapped by the App Router, keep working. Custom elements like `<ai-modal>` upgrade
through the CustomElementRegistry on insertion. `window.LLMCSS` is not a re-init
API; it exposes only `open(elOrSelector)` and `close(elOrSelector)`.

## 3. Staying CSS-only

Drop the script and keep the `<link>`. Everything except those seven interactive components is pure CSS, which suits a server component tree with no client JS.

## 4. Example server component

```tsx
export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="card-title">{project.name}</h3>
        <span className="badge badge-success">{project.status}</span>
      </div>
      <div className="card-body">
        <p className="text-secondary">{project.summary}</p>
        <a className="btn btn-primary" href={`/projects/${project.id}`}>Open</a>
      </div>
    </article>
  );
}
```
