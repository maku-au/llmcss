# Changelog

All notable changes to the public LLMCSS package. Dates are UTC.

## 0.2.0 (2026-09-12)

### Added
- Generated manifests for agents: `/classes.json`, `/tokens.json`, `/states.json`, plus MCP tools `list_classes`, `list_tokens` (all token groups), `list_states`.
- Utilities: numeric `ai-w-*`/`ai-h-*`/`ai-size-*` scale, more fractions, CSS-variable escape hatches (`ai-w-var`, `ai-p-var`, `ai-gap-var`, `ai-grid-cols-var`, `ai-transform-var`, `ai-bg-var`, `ai-text-var`), shadow, opacity, ring, cursor, overflow-x/y, scroll snap and margins, transforms and transitions, filters and backdrop, place-*, columns, leading and tracking, larger display sizes, print utilities, logical-property mirrors (`ai-ps-*`, `ai-ms-*`, `ai-start-0`, `ai-text-start`).
- Primitives: collapse (native details), carousel (scroll snap), floating labels, list group, button group, shared close button, level, media object, panel, notification, styled file input, title and subtitle.
- Sections: `ai-section` and `ai-section-shift`, `ai-section-title`, feature grid and list, static logo rail, stats band with one dominant number, CTA band, editorial callout, team grid, announcement bar, consent bar.
- Drawer variants: `ai-drawer-top`, `ai-drawer-bottom`, `ai-drawer-sm`, `ai-drawer-nav`, `--ai-drawer-offset`, `--ai-drawer-width`; footer accordion columns (`ai-footer-col`); navbar search slot.
- Tables: `ai-table-sticky`, `ai-table-compact`, row selection via `aria-selected`, sort indicators via `aria-sort`, scroll-aware edge fade (`ai-scroll-x`), cell marks `ai-mark-yes|warn|no`.
- Focus ring tokens `--ai-focus-color|width|offset` with `data-ai-focus="neutral|thin|none"` presets; `--ai-tap-highlight`.
- On-color tokens `--ai-accent-text`, `--ai-success-text`, `--ai-danger-text`; per-instance tokens `--ai-card-padding`, `--ai-modal-width`, `--ai-sidebar-width`.
- `data-ai-density="compact|spacious"`, `prefers-contrast` support, `text-wrap: balance` on headings.
- Sidebar rail (`.ai-sidebar.is-collapsed`), KPI dominant tile (`.ai-kpi-card.is-primary`), badge sizes and counter and removable variants, checkbox `:indeterminate`, toast positions and hover pause, segmented control as a CSS-only radio group.
- Components: mobile-nav-drawer, mobile-nav-dropdown.

### Changed
- Runtime: modal and drawer trap focus, return focus to the trigger, set the rest of the page inert, close only the topmost overlay on Escape, and keep `aria-expanded` in sync; tabs get arrow keys and roving tabindex; dropdown closes on outside click and Escape.
- Responsive display utilities use `!important` so `ai-hidden ai-md:flex` works.
- Muted text meets AA in both themes and in the obsidian dark skin.
- Alert borders, notification highlights, and status pips follow the theme via `color-mix`.
- Pro-only CSS (command palette, chat thread, cart drawer, matrix header) ships in the Pro registry, not in `llmcss.css`.

### Removed
- `ai-text-justify` (contradicted the anti-slop laws).

## 0.1.0

Initial public release.
