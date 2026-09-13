# Migrating from Tailwind CSS

## Quick reference

- Install: `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Runtime (optional, for modal/drawer/dropdown/accordion/tabs/toast/command palette): `<script src="https://llmcss.io/llmcss.js" defer></script>`
- Sample: `<button class="btn btn-primary">Save</button>`
- Validate: `npx llmcss lint --fix <file>` then `npx llmcss validate <file>`

Tailwind and LLMCSS agree on one thing: you style in markup. They disagree on where
the vocabulary comes from. Tailwind generates classes from a config at build time.
LLMCSS ships a fixed, hand-written stylesheet, so every class in the table below is a
real selector in `dist/llmcss.css` and is listed in `public/classes.json`.

LLMCSS classes carry no prefix, so roughly 70 percent of a Tailwind file is now
**name-identical** to LLMCSS: `flex`, `p-4`, `gap-4`, `md:grid-cols-2` and the rest of
the table's matching rows are the exact same string in both frameworks. About 20 percent
collapses into a semantic component (`card`, `btn`, `modal`), and the last 10 percent
(arbitrary values and numeric color scales) has no equivalent on purpose. This guide is
honest about which rows are which.

**Never load Tailwind and LLMCSS on the same page.** Because so many names now collide
(`flex`, `container`, `hidden`, `block`, `sr-only`, `rounded-lg`, `border`, and more),
whichever stylesheet loads last silently wins for every shared class, and a few of those,
`container` most notably, resolve to genuinely different CSS under an identical name. Pick
one framework per page; there is no safe way to mix them.

## Class mapping

| Tailwind | LLMCSS | Note |
| --- | --- | --- |
| `flex` | `flex` | Responsive forms exist, for example `md:flex`. `inline-flex` and `inline-grid` too. |
| `grid` | `grid` | |
| `grid-cols-3` | `grid-cols-3` | 1 through 12, plus `grid-cols-none`. |
| `md:grid-cols-2` | `md:grid-cols-2` | The breakpoint goes inside the prefix. Available prefixes are sm, md, lg, xl and cq (container query). |
| `col-span-6` | `col-span-6` | `col-start-3`, `col-end-9` and `col-span-full` round it out. |
| `flex-col` | `flex-col` | |
| `items-center` | `items-center` | |
| `justify-between` | `justify-between` | |
| `justify-center` | `justify-center` | |
| `gap-4` | `gap-4` | Fixed scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32. There is no `gap-[13px]`. |
| `p-6` | `p-6` | Same steps as gap through 24; there is no `p-32` (gap alone continues to 32). |
| `px-4`, `py-2` | `px-4`, `py-2` | Logical forms `ps-4` and `pe-4` are the RTL-safe ones. |
| `mx-auto` | `mx-auto` | `m-4`, `mt-4`, `mb-4` and friends behave as expected. |
| `space-y-4` | no direct equivalent | There is no owl-selector utility. Put `flex flex-col gap-4` on the parent instead, which is what you usually meant. |
| `w-full` | `w-full` | Fractions ship as well: `w-1/2`, thirds, quarters, fifths, sixths and twelfths. |
| `h-full` | `h-full` | `h-screen` and `min-h-screen` too. |
| `max-w-6xl` | `max-w-6xl` | `max-w-prose` is the reading-measure one. |
| `container` | `container` | Not the same default. The LLMCSS container is centred and padded out of the box. Width variants are `container-sm` through `container-xl`, plus `container-fluid`. |
| `text-center` | `text-center` | |
| `text-sm`, `text-lg`, `text-xl` | `text-sm`, `text-lg`, `text-xl` | The ramp runs `text-xs` to `text-7xl`. |
| `font-bold` | `font-bold` | Also light, normal, medium and semibold. `font-display` is the headline face, which Tailwind has no notion of. |
| `uppercase` | no direct equivalent | No text-transform utility ships. Write the one rule yourself, or reach for a component that already has that treatment. |
| `truncate` | `truncate` | `line-clamp-2` is the multi-line version. `leading-tight` and `tracking-tight` cover the rest of the text metrics. |
| `rounded-lg`, `rounded-full` | `rounded-lg`, `rounded-full` | Each radius reads a token, so one token override restyles every corner in the app at once. |
| `border` | `border` | Colour comes from the border token, so there is no `border-gray-200` to carry over. |
| `border-t` | `border-t` | `border-is` and `border-ie` are the logical equivalents. |
| `shadow-sm`, `shadow-md`, `shadow-lg` | `shadow-sm`, `shadow-md`, `shadow-lg` | Bare Tailwind `shadow` lands closest to `shadow-md`. `shadow-inner` and `shadow-none` exist. |
| `bg-blue-500` | no direct equivalent | LLMCSS has no numeric colour scales at all. Use `var(--ai-accent)` (override the token on `:root` or on any container) or a component that already paints itself. |
| `text-gray-600` | no direct equivalent | Use `text-muted` or `text-secondary`. They track the active theme, which a frozen grey does not. |
| `bg-white` | no direct equivalent | Surfaces are tokens, not classes. Put the content in `card` or `panel`, which already sit on the right surface in light and dark. |
| `text-blue-600` (link accent) | `text-accent` | The one accent-coloured text utility. Everything else is a token override. |
| `hidden` | `hidden` | `md:hidden` for the responsive form. |
| `block` | `block` | |
| `opacity-50` | `opacity-50` | Only 0, 10, 25, 50, 75, 90, 100. |
| `overflow-hidden` | `overflow-hidden` | Axis forms like `overflow-y-auto` ship too. |
| `z-10` | `z-10` | Only 0, 10, 20, 30, 40, 50 and `z-auto`. Overlay stacking is handled by the runtime, not by you. |
| `absolute`, `relative`, `fixed` | `absolute`, `relative`, `fixed` | Plus `sticky`, `static`, `inset-0`. |
| `sr-only` | `sr-only` | `cursor-pointer` and `transition` survive the rename unchanged too. |
| `divide-y` | no direct equivalent | Use the `divider` element between items, or `border-t` on each child after the first. |
| `p-6 rounded-lg shadow border bg-white` | no direct equivalent | This is the composition LLMCSS refuses to make you retype. Use `card` with `card-header`, `card-body` and `card-footer`. |

## What changes conceptually

### Semantic components vs utility soup

Tailwind has no opinion about what a card is, so every card in your codebase is a
different pile of a dozen utilities, and they drift. LLMCSS ships `card`, `btn`,
`modal`, `table`, `alert` and the rest as real components with real internal
structure. A card is one class plus its parts, not twelve utilities you hope someone
copied correctly.

Utilities still exist, and you will use `flex`, `gap-4` and `p-6` constantly.
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
elements (`modal`, `drawer`, `dropdown`, `accordion`, `tabs`,
`toast`, `command-palette`). Focus trapping, inert backgrounds, Escape handling
and `aria-expanded` syncing come with it.

Omit the script and everything except modal, drawer, dropdown, accordion, tabs, toast
and command palette is still pure CSS with no behaviour lost.

## Mechanical first pass

Swap the stylesheet first (remove Tailwind's, add LLMCSS's), never both at once. Because
so many utility names are name-identical, most of a Tailwind file needs no rewriting at
all, which is exactly the risk: nothing errors when a class merely looks right.

Run the validator to see what actually needs attention:

```
npx llmcss validate src/components/Header.tsx
```

`validate` warns on any class not in `public/classes.json` (fails the file only under
`--strict`) and always fails on a hallucinated class or a stray `ai-` prefix. Because most
Tailwind utilities are now valid LLMCSS names too, a clean `validate` run is not proof the
page looks right, only that every token exists somewhere. Cross-check the mapping table
above for the rows that share a name but not a meaning: `container`, any numeric color
scale, and any spacing step past 12.

```
npx llmcss lint --fix src/components/Header.tsx
```

`lint --fix` strips a stray `ai-` prefix back to the bare name, which matters if old
notes, a stale snippet, or muscle memory from the 0.3 docs left one behind. It does
nothing for genuine Tailwind classes; the mapping table, not the linter, is what tells
you which ones to replace by hand.

Then run `npx llmcss audit <file>` for design-quality findings such as nested cards and
decorative motion. None of these three commands restructure markup: turning
`p-6 rounded-lg shadow border bg-white` into `card` is a manual read of the table above,
which is the change that actually matters.
