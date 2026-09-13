# Migrating from Tailwind CSS

## Quick reference

- Install: `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Runtime (optional, for modal/drawer/dropdown/accordion/tabs/toast/command palette): `<script src="https://llmcss.io/llmcss.js" defer></script>`
- Sample: `<button class="ai-btn ai-btn-primary">Save</button>`
- Validate: `npx llmcss lint --fix <file>` then `npx llmcss validate <file>`

Tailwind and LLMCSS agree on one thing: you style in markup. They disagree on where
the vocabulary comes from. Tailwind generates classes from a config at build time.
LLMCSS ships a fixed, hand-written stylesheet, so every class in the table below is a
real selector in `dist/llmcss.css` and is listed in `public/classes.json`.

The practical consequence is that roughly 70 percent of a Tailwind file translates one
for one (add the `ai-` prefix), about 20 percent collapses into a semantic component,
and the last 10 percent (arbitrary values and numeric color scales) has no equivalent
on purpose. This guide is honest about which rows are which.

## Class mapping

| Tailwind | LLMCSS | Note |
| --- | --- | --- |
| `flex` | `ai-flex` | Responsive forms exist, for example `ai-md:flex`. `ai-inline-flex` and `ai-inline-grid` too. |
| `grid` | `ai-grid` | |
| `grid-cols-3` | `ai-grid-cols-3` | 1 through 12, plus `ai-grid-cols-none`. |
| `md:grid-cols-2` | `ai-md:grid-cols-2` | The breakpoint goes inside the prefix. Available prefixes are sm, md, lg, xl and cq (container query). |
| `col-span-6` | `ai-col-span-6` | `ai-col-start-3`, `ai-col-end-9` and `ai-col-span-full` round it out. |
| `flex-col` | `ai-flex-col` | |
| `items-center` | `ai-items-center` | |
| `justify-between` | `ai-justify-between` | |
| `justify-center` | `ai-justify-center` | |
| `gap-4` | `ai-gap-4` | Fixed scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32. There is no `gap-[13px]`. |
| `p-6` | `ai-p-6` | Same steps as gap through 24; there is no `ai-p-32` (gap alone continues to 32). |
| `px-4`, `py-2` | `ai-px-4`, `ai-py-2` | Logical forms `ai-ps-4` and `ai-pe-4` are the RTL-safe ones. |
| `mx-auto` | `ai-mx-auto` | `ai-m-4`, `ai-mt-4`, `ai-mb-4` and friends behave as expected. |
| `space-y-4` | no direct equivalent | There is no owl-selector utility. Put `ai-flex ai-flex-col ai-gap-4` on the parent instead, which is what you usually meant. |
| `w-full` | `ai-w-full` | Fractions ship as well: `ai-w-1/2`, thirds, quarters, fifths, sixths and twelfths. |
| `h-full` | `ai-h-full` | `ai-h-screen` and `ai-min-h-screen` too. |
| `max-w-6xl` | `ai-max-w-6xl` | `ai-max-w-prose` is the reading-measure one. |
| `container` | `ai-container` | Not the same default. The LLMCSS container is centred and padded out of the box. Width variants are `ai-container-sm` through `ai-container-xl`, plus `ai-container-fluid`. |
| `text-center` | `ai-text-center` | |
| `text-sm`, `text-lg`, `text-xl` | `ai-text-sm`, `ai-text-lg`, `ai-text-xl` | The ramp runs `ai-text-xs` to `ai-text-7xl`. |
| `font-bold` | `ai-font-bold` | Also light, normal, medium and semibold. `ai-font-display` is the headline face, which Tailwind has no notion of. |
| `uppercase` | no direct equivalent | No text-transform utility ships. Write the one rule yourself, or reach for a component that already has that treatment. |
| `truncate` | `ai-truncate` | `ai-line-clamp-2` is the multi-line version. `ai-leading-tight` and `ai-tracking-tight` cover the rest of the text metrics. |
| `rounded-lg`, `rounded-full` | `ai-rounded-lg`, `ai-rounded-full` | Each radius reads a token, so one token override restyles every corner in the app at once. |
| `border` | `ai-border` | Colour comes from the border token, so there is no `border-gray-200` to carry over. |
| `border-t` | `ai-border-t` | `ai-border-is` and `ai-border-ie` are the logical equivalents. |
| `shadow-sm`, `shadow-md`, `shadow-lg` | `ai-shadow-sm`, `ai-shadow-md`, `ai-shadow-lg` | Bare Tailwind `shadow` lands closest to `ai-shadow-md`. `ai-shadow-inner` and `ai-shadow-none` exist. |
| `bg-blue-500` | no direct equivalent | LLMCSS has no numeric colour scales at all. Use `var(--ai-accent)` (override the token on `:root` or on any container) or a component that already paints itself. |
| `text-gray-600` | no direct equivalent | Use `ai-text-muted` or `ai-text-secondary`. They track the active theme, which a frozen grey does not. |
| `bg-white` | no direct equivalent | Surfaces are tokens, not classes. Put the content in `ai-card` or `ai-panel`, which already sit on the right surface in light and dark. |
| `text-blue-600` (link accent) | `ai-text-accent` | The one accent-coloured text utility. Everything else is a token override. |
| `hidden` | `ai-hidden` | `ai-md:hidden` for the responsive form. |
| `block` | `ai-block` | |
| `opacity-50` | `ai-opacity-50` | Only 0, 10, 25, 50, 75, 90, 100. |
| `overflow-hidden` | `ai-overflow-hidden` | Axis forms like `ai-overflow-y-auto` ship too. |
| `z-10` | `ai-z-10` | Only 0, 10, 20, 30, 40, 50 and `ai-z-auto`. Overlay stacking is handled by the runtime, not by you. |
| `absolute`, `relative`, `fixed` | `ai-absolute`, `ai-relative`, `ai-fixed` | Plus `ai-sticky`, `ai-static`, `ai-inset-0`. |
| `sr-only` | `ai-sr-only` | `ai-cursor-pointer` and `ai-transition` survive the rename unchanged too. |
| `divide-y` | no direct equivalent | Use the `ai-divider` element between items, or `ai-border-t` on each child after the first. |
| `p-6 rounded-lg shadow border bg-white` | no direct equivalent | This is the composition LLMCSS refuses to make you retype. Use `ai-card` with `ai-card-header`, `ai-card-body` and `ai-card-footer`. |

## What changes conceptually

### Semantic components vs utility soup

Tailwind has no opinion about what a card is, so every card in your codebase is a
different pile of a dozen utilities, and they drift. LLMCSS ships `ai-card`, `ai-btn`,
`ai-modal`, `ai-table`, `ai-alert` and the rest as real components with real internal
structure. A card is one class plus its parts, not twelve utilities you hope someone
copied correctly.

Utilities still exist, and you will use `ai-flex`, `ai-gap-4` and `ai-p-6` constantly.
The shift is that they are the seasoning rather than the meal. If you find yourself
composing five utilities to rebuild something that has a name, check
`npx llmcss search <name>` first.

### Tokens vs color scales

There are 82 custom properties in `public/tokens.json` covering type, spacing, radius,
easing, duration, surfaces, text, borders, focus, status colours and chart colours.
There is no `bg-blue-500`, and there never will be, because a numeric scale hard-codes
a decision that a token defers.

You restyle by overriding tokens, on `:root` for the whole app or on any container for
one region:

```css
:root {
  --ai-accent: #7c3aed;
  --ai-font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --ai-surface-1: #0f172a;
  --ai-border: #1e293b;
  --ai-radius-base: 8px;
}
```

One line replaces what would be a find-and-replace across every `bg-blue-*`,
`text-blue-*`, `border-blue-*` and `ring-blue-*` in a Tailwind codebase.

For whole-look changes you do not touch CSS at all. `data-ai-theme` takes `light` or
`dark`, and `data-ai-skin` takes one of obsidian, editorial, executive, fintech,
enterprise, emerald, violet or rose. Both are plain attributes, so they work on the
`html` element or on a single subtree.

### Runtime vs JS bundle

Tailwind ships no JavaScript, which is why every Tailwind project ends up with Headless
UI, Radix or a hand-rolled dropdown. LLMCSS ships one optional script,
`dist/llmcss.js`, about 21KB minified (about 6KB gzipped). It does document-level event delegation for
`data-ai-toggle`, `data-ai-dismiss` and `data-ai-tab`, and registers the custom
elements (`ai-modal`, `ai-drawer`, `ai-dropdown`, `ai-accordion`, `ai-tabs`,
`ai-toast`, `ai-command-palette`). Focus trapping, inert backgrounds, Escape handling
and `aria-expanded` syncing come with it.

Omit the script and everything except modal, drawer, dropdown, accordion, tabs, toast
and command palette is still pure CSS with no behaviour lost.

## Mechanical first pass

Run the linter before you start hand-editing:

```
npx llmcss lint --fix src/components/Header.tsx
```

It rewrites unprefixed legacy tokens (`btn`, `card`, `flex`, `grid`, `badge`,
`items-center`, `justify-between`, `rounded-lg` and similar) to their `ai-` form. The
match is token-exact, so a correct `ai-btn` is never touched and running it twice
changes nothing the second time.

Know its limits before you trust it:

- The fix map in the CLI is small, about 16 entries. It is a starting nudge, not a codemod.
- It only rewrites whole tokens inside `class` and `className` attributes with quoted values.
- It knows nothing about Tailwind's numeric scales. `p-6`, `gap-4`, `text-sm` and `bg-blue-500` all pass through untouched, so most of a Tailwind file is left for you.
- It will not restructure markup. It cannot turn `p-6 rounded-lg shadow border` into `ai-card`, which is the change that actually matters.
- Classes built by string concatenation, `clsx` calls or template interpolation are invisible to it.

Afterwards, list what is left:

```
npx llmcss validate src/components/Header.tsx
```

`validate` recognises a wider legacy map (43 entries) than `lint --fix` can rewrite, and
it also flags `ai-` classes that do not exist, which is the fastest way to catch a
hallucinated class name. Then run `npx llmcss audit <file>` for design-quality findings
such as nested cards and decorative motion.
