# Migrating from Bootstrap

Bootstrap and LLMCSS are the same kind of library: a stylesheet of named components
with a thin utility layer, not a class generator. That makes most of the move a rename.
`card` becomes `ai-card`, `alert-danger` becomes `ai-alert-danger`, `modal-header`
becomes `ai-modal-header`, and the markup structure survives almost intact.

Two things do not translate cleanly, and this guide says so plainly. The 12-column
`row` and `col-*` grid is a different mental model from CSS grid, and Bootstrap's
JavaScript bundle plus Popper is replaced by a much smaller delegation runtime. Every
`ai-` class below exists in `public/classes.json`.

## Class mapping

| Bootstrap | LLMCSS | Note |
| --- | --- | --- |
| `btn` | `ai-btn` | Same base-plus-modifier pattern. Sizes are `ai-btn-xs` through `ai-btn-xl`. |
| `btn-primary` | `ai-btn-primary` | Colour comes from `var(--ai-accent)`, not a `$primary` Sass variable. |
| `btn-secondary` | `ai-btn-secondary` | `ai-btn-ghost` covers what you used `btn-link` for. |
| `btn-outline-primary`, `btn-outline-secondary` | `ai-btn-outline` | One outline variant, not one per colour. Danger is `ai-btn-danger`. |
| `btn-close` | `ai-close` | Shared by modals, drawers and alerts, not modal-only. |
| `card` | `ai-card` | `ai-card-interactive` adds the hover treatment. |
| `card-body` | `ai-card-body` | `ai-card-footer` and `ai-card-title` complete the set. |
| `card-header` | `ai-card-header` | |
| `container` | `ai-container` | Width variants `ai-container-sm` through `ai-container-xl`, plus `ai-container-fluid`. |
| `row` | no direct equivalent | The real conceptual gap. Delete the wrapper and put `ai-grid ai-grid-cols-12 ai-gap-4` on the parent. See the grid note below. |
| `col-6`, `col-md-4` | `ai-col-span-6`, `ai-md:col-span-4` | Only meaningful inside an `ai-grid` parent that declares its tracks. The breakpoint moves to the front, inside the prefix: sm, md, lg, xl and cq (container query). |
| `d-flex` | `ai-flex` | `ai-grid`, `ai-block` and `ai-inline-flex` follow the same rename. |
| `d-none` | `ai-hidden` | `ai-md:hidden` replaces `d-md-none`. |
| `justify-content-between` | `ai-justify-between` | Shorter, same meaning. `ai-justify-center` likewise. |
| `align-items-center` | `ai-items-center` | |
| `form-control` | `ai-input` | `ai-textarea` for multi-line, `ai-select` for selects. |
| `form-label` | `ai-form-label` | `ai-form-group` wraps label, control, `ai-form-hint` and `ai-form-error` with the spacing decided once. |
| `table` | `ai-table` | `ai-table-container` is the `table-responsive` scroll wrapper. |
| `table-striped` | `ai-table-striped` | `ai-table-hover`, `ai-table-compact` and `ai-table-sticky` are extras Bootstrap has no equivalent for. |
| `badge`, `badge bg-primary` | `ai-badge`, `ai-badge-primary` | Bootstrap 5 reuses background utilities for badge colour. LLMCSS keeps dedicated modifiers such as `ai-badge-danger`, `ai-badge-dot` and `ai-badge-outline`. |
| `alert` | `ai-alert` | `ai-alert-icon` styles the leading glyph. |
| `alert-success`, `alert-danger`, `alert-warning`, `alert-info` | `ai-alert-success`, `ai-alert-danger`, `ai-alert-warning`, `ai-alert-info` | A straight rename. |
| `modal` | `ai-modal` | Also available as the `<ai-modal>` custom element. |
| `modal-dialog`, `modal-content` | `ai-modal-box` | Two wrappers collapse into one. Sizes are `ai-modal-box-sm` and `ai-modal-box-lg`. |
| `modal-header`, `modal-body`, `modal-footer` | `ai-modal-header`, `ai-modal-body`, `ai-modal-footer` | With `ai-modal-title` and `ai-modal-close`. The runtime manages `ai-modal-backdrop`. |
| `nav`, `navbar-nav` | `ai-nav-links` | `ai-tabs-list` is the `nav-tabs` case, inside an `ai-tabs` container. `offcanvas` becomes `ai-drawer` with `ai-drawer-panel`. |
| `nav-link` | `ai-nav-link` | |
| `navbar` | `ai-navbar` | `ai-navbar-inner` is the width-constrained row inside it. |
| `dropdown` | `ai-dropdown` | |
| `dropdown-menu` | `ai-dropdown-menu` | `ai-dropdown-right` aligns to the far edge. |
| `dropdown-item` | `ai-dropdown-item` | `ai-dropdown-divider` and `ai-dropdown-header` too. |
| `accordion` | `ai-accordion` | With `ai-accordion-item`, `ai-accordion-trigger` and `ai-accordion-content`. |
| `spinner-border` | `ai-spinner` | `ai-spinner-ring` is the ring style. Sizes `ai-spinner-sm` and `ai-spinner-lg`. |
| `progress`, `progress-bar` | `ai-progress`, `ai-progress-bar` | `ai-progress-indeterminate` and `ai-progress-striped` are built in. |
| `list-group`, `list-group-item` | `ai-list-group`, `ai-list-group-item` | `ai-list-group-flush` drops the outer border. |
| `text-center` | `ai-text-center` | `ai-text-muted` replaces `text-muted` and tracks the theme. |
| `fw-bold` | `ai-font-bold` | Naming follows the CSS property, not Bootstrap's abbreviation. |
| `p-3`, `mb-3` | `ai-p-3`, `ai-mb-3` | Bootstrap's 0 to 5 spacer scale does not line up with the LLMCSS scale (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32). Check the rendered value rather than assuming `p-3` matches `ai-p-3` visually. |
| `w-100`, `h-100` | `ai-w-full`, `ai-h-full` | `ai-sr-only` covers `visually-hidden`. |
| `bg-light`, `bg-dark`, `text-bg-primary` | no direct equivalent | Surfaces are tokens, not classes. Use `ai-card` or `ai-panel`, or override the surface tokens on the container. |

## What changes conceptually

### Semantic components vs utility soup

This is the part you already agree with, since Bootstrap works the same way. LLMCSS
ships `ai-card`, `ai-btn`, `ai-modal`, `ai-table` and `ai-alert` as real components
with real internal structure, so a card is one class plus its parts rather than twelve
utilities pasted between files.

The difference in degree is that LLMCSS covers more application chrome out of the box.
Command palettes, drawers, skeletons, KPI tiles, toasts and dashboards are components
rather than things you build on top of a starter theme. Utilities like `ai-flex`,
`ai-gap-4` and `ai-p-6` exist and you will use them constantly, but they are the
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

LLMCSS ships one optional script, `dist/llmcss.js`, about 12KB. It does document-level
event delegation for `data-ai-toggle`, `data-ai-dismiss` and `data-ai-tab`, and
registers the `ai-modal` style custom elements (`ai-modal`, `ai-drawer`, `ai-dropdown`,
`ai-accordion`, `ai-tabs`, `ai-toast`, `ai-command-palette`). Focus trapping, inert
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
`ai-grid ai-grid-cols-12`, set the gutter with `ai-gap-4`, and children claim tracks
with `ai-col-span-6` or `ai-md:col-span-4`. There is no gutter-cancelling wrapper, so
delete the `row` element rather than renaming it.

Two shortcuts remove most of the 12-column arithmetic: `ai-grid-cols-3` for an even
split, and `ai-grid-auto-fit` (with `ai-grid-min-sm` through `ai-grid-min-lg`) for a
responsive card wall that needs no breakpoint classes at all.

## Mechanical first pass

Run the linter before hand-editing:

```
npx llmcss lint --fix app/views/dashboard.html
```

It rewrites unprefixed legacy tokens (`btn`, `card`, `flex`, `grid`, `badge`,
`items-center`, `justify-between`, `rounded-lg` and similar) to their `ai-` form. The
match is token-exact, so a correct `ai-btn` is never touched and a second run changes
nothing.

Know its limits before you trust it:

- The fix map in the CLI is small, about 16 entries. It is a starting nudge, not a codemod.
- It only rewrites whole tokens inside `class` and `className` attributes with quoted values.
- It does not understand Bootstrap's grid. `row`, `col-6` and `col-md-4` pass through untouched, and that is exactly the part of the migration that needs a human.
- It will not restructure markup into semantic components, so `modal-dialog` plus `modal-content` will not collapse into `ai-modal-box` on its own.
- Classes built by string concatenation or template interpolation, which is most of a Rails or Django template helper, are invisible to it.

Afterwards, list what is left:

```
npx llmcss validate app/views/dashboard.html
```

`validate` recognises a wider legacy map (43 entries) than `lint --fix` can rewrite, and
it also flags `ai-` classes that do not exist, which is the fastest way to catch a class
name someone invented. Then run `npx llmcss audit <file>` for design-quality findings
such as nested cards and decorative motion.
