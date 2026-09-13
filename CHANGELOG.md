# Changelog

All notable changes to the public LLMCSS package. Dates are UTC.

## 0.4.0 (2026-09-13)

### Breaking
- Removed the `ai-` class prefix everywhere it styled markup: `ai-btn` is `btn`, `ai-flex` is `flex`, `ai-modal-box` is `modal-box`. Custom properties (`--ai-*`), `data-ai-*` attributes, and custom element tags (`<ai-modal>` and friends) keep it. No migration shim; nobody was using the library yet.
- Hook classes with no styling of their own now use a `js-` prefix, for example `js-carousel-controls`; existing hooks (`dropdown-trigger`, `tab`, `tab-panel`, `segmented-input`, `carousel-controls`) are grandfathered.
- Validator rule change: `npx llmcss validate` checks every class token against classes.json, with `is-*` states, `js-*` hooks, and custom element tags exempt; an unknown class is a warning unless `--strict`, and a stray `ai-` prefix always fails, with a fix from `lint --fix`.

### Added
- Icon button sizes `xs` and `xl` for `btn-icon`.
- Text-transform utilities: `uppercase`, `lowercase`, `capitalize`.
- `pb-20` and `pb-24` padding utilities.
- `accordion-boxed` for a bordered, card-style accordion.
- Footer type scale classes (`footer-heading`, `footer-blurb`, `footer-stat`, `footer-cmd`).
- Generated stats markers in the docs so class, token, state, component and template counts render from the manifests and cannot drift.

### Changed
- Accordion is flush by default (hairline rules, no outer box); `accordion-boxed` opts back into the bordered card.
- Footer moved to a responsive grid (`footer-grid`).
- Templates page layout rebuilt for consistent headers and sidebars.
- Loading button state refined (`btn.is-loading`).

### Fixed
- Order tracker and stepper alignment.
- CLI `audit` token matching now compares exact class tokens instead of substrings.
- Archetype token data regenerated from the real theme skins, no longer hand-copied.

## 0.3.0 (2026-09-13)

### Changed
- Pro is themed section templates, page kits, and a few skin-specific composed blocks. The previous 20 Pro components (command palette, cart drawer, agent chrome, bento heroes, pricing matrix, and related surfaces) are MIT. Their CSS now ships in `llmcss.css`.
- Relicensed those 20 components from the commercial Pro catalog into this MIT repository. Existing Pro subscribers keep the same Polar token and now unlock the themed catalog instead.
- `npx llmcss add` on former Pro ids no longer requires a token. `npx llmcss template get` on themed ids does.
- Split pane drag/keyboard resize moved from an inline script into the public runtime (`llmcss.js`).

### Added
- First themed Pro kit: eight production sections, two page kits, three composed blocks (`themed-*`, `kit-*`).

## 0.2.0 (2026-09-12)

### Added
- Generated manifests for agents: `/classes.json`, `/tokens.json`, `/states.json`, plus MCP tools `list_classes`, `list_tokens` (all token groups), `list_states`.
- Utilities: numeric `ai-w-*`/`ai-h-*`/`ai-size-*` scale, more fractions, CSS-variable escape hatches (`w-var`, `p-var`, `gap-var`, `grid-cols-var`, `transform-var`, `bg-var`, `text-var`), shadow, opacity, ring, cursor, overflow-x/y, scroll snap and margins, transforms and transitions, filters and backdrop, place-*, columns, leading and tracking, larger display sizes, print utilities, logical-property mirrors (`ai-ps-*`, `ai-ms-*`, `start-0`, `text-start`).
- Primitives: collapse (native details), carousel (scroll snap), floating labels, list group, button group, shared close button, level, media object, panel, notification, styled file input, title and subtitle.
- Sections: `section` and `section-shift`, `section-title`, feature grid and list, static logo rail, stats band with one dominant number, CTA band, editorial callout, team grid, announcement bar, consent bar.
- Drawer variants: `drawer-top`, `drawer-bottom`, `drawer-sm`, `drawer-nav`, `--ai-drawer-offset`, `--ai-drawer-width`; footer accordion columns (`footer-col`); navbar search slot.
- Tables: `table-sticky`, `table-compact`, row selection via `aria-selected`, sort indicators via `aria-sort`, scroll-aware edge fade (`scroll-x`), cell marks `mark-yes|warn|no`.
- Focus ring tokens `--ai-focus-color|width|offset` with `data-ai-focus="neutral|thin|none"` presets; `--ai-tap-highlight`.
- On-color tokens `--ai-accent-text`, `--ai-success-text`, `--ai-danger-text`; per-instance tokens `--ai-card-padding`, `--ai-modal-width`, `--ai-sidebar-width`.
- `data-ai-density="compact|spacious"`, `prefers-contrast` support, `text-wrap: balance` on headings.
- Sidebar rail (`.sidebar.is-collapsed`), KPI dominant tile (`.kpi-card.is-primary`), badge sizes and counter and removable variants, checkbox `:indeterminate`, toast positions and hover pause, segmented control as a CSS-only radio group.
- Components: mobile-nav-drawer, mobile-nav-dropdown.

### Changed
- Runtime: modal and drawer trap focus, return focus to the trigger, set the rest of the page inert, close only the topmost overlay on Escape, and keep `aria-expanded` in sync; tabs get arrow keys and roving tabindex; dropdown closes on outside click and Escape.
- Responsive display utilities use `!important` so `hidden md:flex` works.
- Muted text meets AA in both themes and in the obsidian dark skin.
- Alert borders, notification highlights, and status pips follow the theme via `color-mix`.
- Pro-only CSS (command palette, chat thread, cart drawer, matrix header) ships in the Pro registry, not in `llmcss.css`.

### Removed
- `ai-text-justify` (contradicted the anti-slop laws).

## 0.1.0

Initial public release.
