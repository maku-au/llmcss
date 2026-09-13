# Migrating from Bootstrap

## Quick reference

- Install: `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Runtime (optional, for modal/drawer/dropdown/accordion/tabs/toast/command palette): `<script src="https://llmcss.io/llmcss.js" defer></script>`
- Sample: `<button class="btn btn-primary">Save</button>`
- Validate: `npx llmcss lint --fix <file>` then `npx llmcss validate <file>`

Bootstrap and LLMCSS are the same kind of library: a stylesheet of named components
with a thin utility layer, not a class generator. LLMCSS classes carry no prefix, so for
most of the table below the move is not a rename at all: `card` is `card`, `alert-danger`
is `alert-danger`, `modal-header` is `modal-header`, the identical string in both
frameworks, and the markup structure survives almost intact.

**Never load Bootstrap and LLMCSS on the same page.** Because so many class names are now
identical (`btn`, `card`, `container`, `modal`, `alert`, `table`, `badge`, `accordion`,
`dropdown`, `navbar`, and more), whichever stylesheet loads last silently wins for every
shared name, and `container` in particular resolves to different CSS under either
framework despite the identical name. Bootstrap's grid classes, `row` most of all, have
no LLMCSS counterpart at all, so mixing the two leaves you with no way to reason about
which rule applies where. Pick one framework per page.

Two things do not translate cleanly, and this guide says so plainly. The 12-column
`row` and `col-*` grid is a different mental model from CSS grid, and Bootstrap's
JavaScript bundle plus Popper is replaced by a much smaller delegation runtime. Every
class below exists in `public/classes.json`.

## Class mapping

| Bootstrap | LLMCSS | Note |
| --- | --- | --- |
| `btn` | `btn` | Same base-plus-modifier pattern. Sizes are `btn-xs` through `btn-xl`. |
| `btn-primary` | `btn-primary` | Colour comes from `var(--ai-accent)`, not a `$primary` Sass variable. |
| `btn-secondary` | `btn-secondary` | `btn-ghost` covers what you used `btn-link` for. |
| `btn-outline-primary`, `btn-outline-secondary` | `btn-outline` | One outline variant, not one per colour. Danger is `btn-danger`. |
| `btn-close` | `close` | Shared by modals, drawers and alerts, not modal-only. |
| `card` | `card` | `card-interactive` adds the hover treatment. |
| `card-body` | `card-body` | `card-footer` and `card-title` complete the set. |
| `card-header` | `card-header` | |
| `container` | `container` | Width variants `container-sm` through `container-xl`, plus `container-fluid`. |
| `row` | no direct equivalent | The real conceptual gap. Delete the wrapper and put `grid grid-cols-12 gap-4` on the parent. See the grid note below. |
| `col-6`, `col-md-4` | `col-span-6`, `md:col-span-4` | Only meaningful inside an `grid` parent that declares its tracks. The breakpoint moves to the front, inside the prefix: sm, md, lg, xl and cq (container query). |
| `d-flex` | `flex` | `grid`, `block` and `inline-flex` follow the same rename. |
| `d-none` | `hidden` | `md:hidden` replaces `d-md-none`. |
| `justify-content-between` | `justify-between` | Shorter, same meaning. `justify-center` likewise. |
| `align-items-center` | `items-center` | |
| `form-control` | `input` | `textarea` for multi-line, `select` for selects. |
| `form-label` | `form-label` | `form-group` wraps label, control, `form-hint` and `form-error` with the spacing decided once. |
| `table` | `table` | `table-container` is the `table-responsive` scroll wrapper. |
| `table-striped` | `table-striped` | `table-hover`, `table-compact` and `table-sticky` are extras Bootstrap has no equivalent for. |
| `badge`, `badge bg-primary` | `badge`, `badge-primary` | Bootstrap 5 reuses background utilities for badge colour. LLMCSS keeps dedicated modifiers such as `badge-danger`, `badge-dot` and `badge-outline`. |
| `alert` | `alert` | `alert-icon` styles the leading glyph. |
| `alert-success`, `alert-danger`, `alert-warning`, `alert-info` | `alert-success`, `alert-danger`, `alert-warning`, `alert-info` | A straight rename. |
| `modal` | `modal` | Also available as the `<ai-modal>` custom element. |
| `modal-dialog`, `modal-content` | `modal-box` | Two wrappers collapse into one. Sizes are `modal-box-sm` and `modal-box-lg`. |
| `modal-header`, `modal-body`, `modal-footer` | `modal-header`, `modal-body`, `modal-footer` | With `modal-title` and `modal-close`. The runtime manages `modal-backdrop`. |
| `nav`, `navbar-nav` | `nav-links` | `tabs-list` is the `nav-tabs` case, inside an `tabs` container. `offcanvas` becomes `drawer` with `drawer-panel`. |
| `nav-link` | `nav-link` | |
| `navbar` | `navbar` | `navbar-inner` is the width-constrained row inside it. |
| `dropdown` | `dropdown` | |
| `dropdown-menu` | `dropdown-menu` | `dropdown-right` aligns to the far edge. |
| `dropdown-item` | `dropdown-item` | `dropdown-divider` and `dropdown-header` too. |
| `accordion` | `accordion` | With `accordion-item`, `accordion-trigger` and `accordion-content`. |
| `spinner-border` | `spinner` | `spinner-ring` is the ring style. Sizes `spinner-sm` and `spinner-lg`. |
| `progress`, `progress-bar` | `progress`, `progress-bar` | `progress-indeterminate` and `progress-striped` are built in. |
| `list-group`, `list-group-item` | `list-group`, `list-group-item` | `list-group-flush` drops the outer border. |
| `text-center` | `text-center` | `text-muted` replaces `text-muted` and tracks the theme. |
| `fw-bold` | `font-bold` | Naming follows the CSS property, not Bootstrap's abbreviation. |
| `p-3`, `mb-3` | `p-3`, `mb-3` | Bootstrap's 0 to 5 spacer scale does not line up with the LLMCSS steps. Every spacing utility shares 0, 1, 2, 3, 4, 5, 6, 8, 10, 12; padding continues to 16, 20, 24, and `gap-*` alone continues to 32. Check the rendered value rather than assuming `p-3` matches `p-3` visually, since the identical class name is exactly the trap: same string, different scale. |
| `w-100`, `h-100` | `w-full`, `h-full` | `sr-only` covers `visually-hidden`. |
| `bg-light`, `bg-dark`, `text-bg-primary` | no direct equivalent | Surfaces are tokens, not classes. Use `card` or `panel`, or override the surface tokens on the container. |

## What changes conceptually

### Semantic components vs utility soup

This is the part you already agree with, since Bootstrap works the same way. LLMCSS
ships `card`, `btn`, `modal`, `table` and `alert` as real components
with real internal structure, so a card is one class plus its parts rather than twelve
utilities pasted between files.

The difference in degree is that LLMCSS covers more application chrome out of the box.
Command palettes, drawers, skeletons, KPI tiles, toasts and dashboards are components
rather than things you build on top of a starter theme. Utilities like `flex`,
`gap-4` and `p-6` exist and you will use them constantly, but they are the
seasoning, not the meal. Run `npx llmcss search <name>` before composing one by hand.

### Tokens vs color scales

Restyling Bootstrap means Sass variables and a rebuild. LLMCSS has 82 custom properties
in `public/tokens.json` covering type, spacing, radius, easing, duration, surfaces,
text, borders, focus, status colours and chart colours. There is no `bg-blue-500` and no
`$primary` to recompile. You override tokens at runtime, on `:root` for the whole app or
on any container for one region:

```css
:root {
  --ai-accent: #0f766e;
  --ai-font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --ai-surface-1: #f5f5f4;
  --ai-radius-base: 8px;
}
```

For whole-look changes you touch no CSS at all. `data-ai-theme` takes `light` or `dark`,
and `data-ai-skin` takes one of obsidian, editorial, executive, fintech, enterprise,
emerald, violet or rose. Both are plain attributes, so they work on the `html` element
or on a single subtree, which is how you preview a skin without a build step.

### Runtime vs JS bundle

Bootstrap ships `bootstrap.bundle.min.js` plus Popper, and every interactive component
is a JavaScript class you either instantiate or drive through `data-bs-*` attributes.

LLMCSS ships one optional script, `dist/llmcss.js`, about 21KB minified (about 6KB gzipped). It does document-level
event delegation for `data-ai-toggle`, `data-ai-dismiss` and `data-ai-tab`, and
registers the `modal` style custom elements (`modal`, `drawer`, `dropdown`,
`accordion`, `tabs`, `toast`, `command-palette`). Focus trapping, inert
backgrounds, Escape closing only the topmost overlay and `aria-expanded` syncing are
included, so the accessibility work Bootstrap's JS did for you is not lost.

The attribute rename is direct. `data-bs-toggle="modal"` becomes
`data-ai-toggle="modal"`, `data-bs-target` becomes `data-ai-target`, and
`data-bs-dismiss` becomes `data-ai-dismiss`. Open state is the `is-open` class or the
`open` attribute, either of which you can set server-side.

Omit the script and everything except modal, drawer, dropdown, accordion, tabs, toast
and command palette is still pure CSS.

### The grid, honestly

`row` and `col-*` are a 12-column system built on flex with negative margins and
per-column padding. LLMCSS has no `row`. You declare the track count on the parent with
`grid grid-cols-12`, set the gutter with `gap-4`, and children claim tracks
with `col-span-6` or `md:col-span-4`. There is no gutter-cancelling wrapper, so
delete the `row` element rather than renaming it.

Two shortcuts remove most of the 12-column arithmetic: `grid-cols-3` for an even
split, and `grid-auto-fit` (with `grid-min-xs` through `grid-min-lg`) for a
responsive card wall that needs no breakpoint classes at all.

## Mechanical first pass

Swap the stylesheet first (remove Bootstrap's, add LLMCSS's, drop `bootstrap.bundle.min.js`
and Popper) and never run the two side by side. Because so many class names are now
identical strings, a page can look almost right immediately, which hides the rows above
that share a name but not a meaning (`container`, the spacing scale, `btn-outline-*`).

Run the validator to see what needs attention:

```
npx llmcss validate app/views/dashboard.html
```

`validate` warns on any class not in `public/classes.json` (fails the file only under
`--strict`) and always fails on a hallucinated class or a stray `ai-` prefix. It cannot
tell you that `row` and `col-6` render as nothing under LLMCSS, since they simply are not
LLMCSS classes to begin with, nor that a same-named class carries a different scale; that
is what the mapping table above is for.

```
npx llmcss lint --fix app/views/dashboard.html
```

`lint --fix` strips a stray `ai-` prefix back to the bare name. It does not understand
Bootstrap's grid, so `row`, `col-6` and `col-md-4` pass through untouched, and it will not
restructure markup into semantic components, so `modal-dialog` plus `modal-content` will
not collapse into `modal-box` on its own; both are a human read of the table above, which
is the part of the migration that actually needs one.

Then run `npx llmcss audit <file>` for design-quality findings such as nested cards and
decorative motion.
