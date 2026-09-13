# LLMCSS agent rules, exhaustive reference

[AGENTS.md](../AGENTS.md) is the entry point and is enough to write correct markup. This file is the lookup table: every state class, every attribute, every interactive contract, the patterns AGENTS.md does not carry, and what the tooling actually checks. Do not load both into the same system prompt; load AGENTS.md, and consult this when a rule is not in it.

Source of truth, in this order: [classes.json](https://llmcss.io/classes.json) for classes, [tokens.json](https://llmcss.io/tokens.json) for `--ai-*` variables, [states.json](https://llmcss.io/states.json) for `is-*` and `data-ai-*`, `src/registry/data.mjs` for component markup. MCP tools `list_classes`, `list_tokens`, `list_states` return the same data. A class that is in none of these does not exist.

## Where classes live

<!-- stats:start -->
- **Classes:** 1407 `ai-*` classes across 40 families, listed in [classes.json](https://llmcss.io/classes.json).
- **Tokens:** 82 `--ai-*` custom properties, listed in [tokens.json](https://llmcss.io/tokens.json).
- **States:** 36 `is-*` classes, listed in [states.json](https://llmcss.io/states.json).
- **Components:** 125 (122 free, 3 themed Pro): 54 primitive, 44 application, 22 marketing, 5 ecommerce.
- **Section templates:** 26 (18 free wireframe, 8 themed Pro).
- **Page blueprints:** 6 (4 free, 2 Pro).
<!-- stats:end -->

The family a class belongs to tells you which stylesheet file defines it and roughly what it does.

<!-- families:start -->
| Family | Classes | Defined in |
|---|---:|---|
| `spacing` | 240 | `utilities.css` |
| `agent-extra` | 120 | `components/agent-extra.css` |
| `interaction` | 102 | `utilities.css` |
| `sizing` | 94 | `utilities.css` |
| `grid` | 87 | `utilities.css` |
| `marketing` | 75 | `components/marketing.css` |
| `flex` | 65 | `utilities.css` |
| `typography` | 50 | `utilities.css` |
| `utilities` | 44 | `utilities.css` |
| `dashboard` | 43 | `components/dashboard.css` |
| `extras` | 40 | `components/extras.css` |
| `animations` | 33 | `animations.css` |
| `forms-extra` | 31 | `components/forms-extra.css` |
| `application` | 29 | `components/application.css` |
| `badges` | 28 | `components/badges.css` |
| `commerce-extra` | 28 | `components/commerce-extra.css` |
| `position` | 26 | `utilities.css` |
| `navigation` | 24 | `components/navigation.css` |
| `borders` | 22 | `utilities.css` |
| `effects` | 22 | `utilities.css` |
| `chat` | 19 | `components/chat.css` |
| `layout` | 16 | `utilities.css` |
| `cards` | 13 | `components/cards.css` |
| `drawers` | 13 | `components/drawers.css` |
| `inputs` | 13 | `components/inputs.css` |
| `base` | 12 | `base.css` |
| `tables` | 12 | `components/tables.css` |
| `toasts` | 12 | `components/toasts.css` |
| `buttons` | 11 | `components/buttons.css` |
| `modals` | 11 | `components/modals.css` |
| `ecommerce` | 10 | `components/ecommerce.css` |
| `command` | 9 | `components/command.css` |
| `scrollspy` | 9 | `components/scrollspy.css` |
| `display` | 8 | `utilities.css` |
| `themes` | 7 | `themes.css` |
| `accordions` | 6 | `components/accordions.css` |
| `alerts` | 6 | `components/alerts.css` |
| `cart` | 6 | `components/cart.css` |
| `dropdowns` | 6 | `components/dropdowns.css` |
| `tabs` | 5 | `components/tabs.css` |
<!-- families:end -->

Utility names follow the shape you expect from a utility framework, with the prefix: `ai-p-6`, `ai-mt-4`, `ai-gap-3`, `ai-w-full`, `ai-max-w-sm`, `ai-text-sm`, `ai-font-semibold`, `ai-rounded-lg`, `ai-items-center`. Component names are `ai-<component>-<part>`: `ai-card-header`, `ai-modal-box`, `ai-drawer-panel`, `ai-toast-message`. Confirm every one in classes.json before you emit it.

Responsive variants are written `ai-<bp>:<name>`, for example `ai-md:grid-cols-2` or `ai-lg:hidden`. Breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `cq` container query. A variant exists only if classes.json lists it in that class's `variants` array. `ai-flex` has all five. `ai-grid-cols-2` has `sm`, `md`, `lg`, `cq` but not `xl`.

## Every state class

The author writes these in static markup; the runtime sets the same classes at runtime. `usedBy` is the set of classes the library styles alongside each state, so `is-open` on a `.ai-card` does nothing.

| State | Styled on |
|---|---|
| `is-active` | `.ai-combobox-option`, `.ai-filter-tag`, `.ai-list-group-item`, `.ai-nav-link`, `.ai-pagination-link`, `.ai-scrollspy-link`, `.ai-segmented-btn`, `.ai-sidebar-badge`, `.ai-sidebar-item`, `.ai-step-circle`, `.ai-step-item`, `.ai-step-label`, `.ai-tab`, `.ai-tab-panel`, `.ai-tabs-pills`, `.ai-tree-leaf` |
| `is-added` | `.ai-diff-gutter`, `.ai-diff-marker`, `.ai-diff-row` |
| `is-auto` | `.ai-marquee`, `.ai-marquee-track` |
| `is-centered` | `.ai-hero`, `.ai-hero-actions`, `.ai-hero-lead` |
| `is-collapsed` | `.ai-sidebar`, `.ai-sidebar-badge`, `.ai-sidebar-icon`, `.ai-sidebar-item`, `.ai-sidebar-section-title` |
| `is-completed` | `.ai-checklist-item`, `.ai-checklist-label`, `.ai-checklist-mark`, `.ai-order-pip`, `.ai-order-step`, `.ai-step-circle`, `.ai-step-item` |
| `is-credit` | `.ai-checkout-value` |
| `is-current` | `.ai-breadcrumb-item`, `.ai-order-label`, `.ai-order-pip`, `.ai-order-step` |
| `is-danger` | `.ai-cost-mark`, `.ai-dropdown-item` |
| `is-disabled` | `.ai-list-group-item`, `.ai-pagination-link` |
| `is-done` | `.ai-run-header`, `.ai-run-timer`, `.ai-status-pip` |
| `is-down` | `.ai-kpi-trend` |
| `is-error` | `.ai-empty-state`, `.ai-empty-state-icon`, `.ai-input`, `.ai-select`, `.ai-textarea` |
| `is-focused` | `.ai-input`, `.ai-select`, `.ai-textarea` |
| `is-increment` | `.ai-stepper-btn` |
| `is-loading` | `.ai-btn`, `.ai-kpi-card`, `.ai-kpi-trend`, `.ai-kpi-value` |
| `is-muted` | `.ai-calendar-day` |
| `is-nested` | `.ai-scrollspy-link` |
| `is-open` | `.ai-accordion-chevron`, `.ai-accordion-content`, `.ai-accordion-item`, `.ai-accordion-trigger`, `.ai-combobox`, `.ai-combobox-list`, `.ai-command-palette`, `.ai-drawer`, `.ai-drawer-no-lock`, `.ai-dropdown`, `.ai-dropdown-menu`, `.ai-modal`, `.ai-modeless`, `.ai-popover`, `.ai-popover-toggle` |
| `is-primary` | `.ai-kpi-card`, `.ai-stat`, `.ai-stat-value` |
| `is-read` | `.ai-notification-dot` |
| `is-ready` | `.ai-combobox`, `.ai-combobox-list` |
| `is-removed` | `.ai-diff-code`, `.ai-diff-gutter`, `.ai-diff-marker`, `.ai-diff-row` |
| `is-required` | `.ai-form-label` |
| `is-reversed` | `.ai-hero-split` |
| `is-selected` | `.ai-calendar-day`, `.ai-command-item` |
| `is-sold-out` | `.ai-btn`, `.ai-product-card`, `.ai-product-img`, `.ai-product-media` |
| `is-streaming` | `.ai-pulse-dot`, `.ai-pulse-dot-streaming`, `.ai-status-pip` |
| `is-today` | `.ai-calendar-day` |
| `is-total` | `.ai-checkout-label`, `.ai-checkout-row`, `.ai-checkout-value` |
| `is-trailing` | `.ai-input`, `.ai-input-icon`, `.ai-input-icon-wrap` |
| `is-unread` | `.ai-inbox-item`, `.ai-inbox-title`, `.ai-notification-item` |
| `is-up` | `.ai-kpi-trend` |
| `is-upcoming` | `.ai-order-label`, `.ai-order-pip`, `.ai-order-step` |
| `is-visible` | `.ai-password`, `.ai-password-toggle` |
| `is-warn` | `.ai-cost-mark` |

Anything else beginning `is-` fails `npx llmcss validate`.

## Attribute reference

Beyond the `data-ai-*` attributes tabled in AGENTS.md, these matter.

| Attribute | On | Values | Who sets it |
|---|---|---|---|
| `aria-expanded` | every toggle pointing at an overlay, dropdown, or accordion item | `true`, `false` | Runtime after load. Write the correct initial value yourself. |
| `aria-selected` | `button.ai-tab`, `tr` inside `.ai-table` | `true` | Runtime on tabs, author on table rows. Interchangeable with `is-active` on tabs. |
| `aria-sort` | `th` inside `.ai-table` | `ascending`, `descending` | Author. Renders the sort indicator. |
| `aria-current` | `.ai-nav-link`, `.ai-sidebar-item`, `.ai-pagination-link`, `.ai-breadcrumb-item` | `page`, `step`, `true` | Author. The selectors match on presence, so delete the attribute instead of setting it to `false`. |
| `aria-controls` | stepper buttons, combobox input, dropdown trigger | an element id | Author. Required for `data-ai-step` to find its input. |
| `data-ai-value` | `[role="option"]` inside `.ai-combobox-list` | any string | Author. The value written into the input when the option is chosen; falls back to the option's text. |

The runtime stamps `ai-js` on `<html>` when it loads, so CSS can show controls that need JavaScript. Do not write that class yourself.

## Interactive contracts

Emit either the attribute form or the custom-element form. Both render from CSS alone; the runtime adds behavior.

```html
<button data-ai-toggle="modal" data-ai-target="#contact">Contact us</button>
<div id="contact" class="ai-modal">...</div>
```

```html
<ai-modal id="contact">...</ai-modal>
```

Registered elements: `<ai-modal>`, `<ai-tabs>`, `<ai-dropdown>`, `<ai-accordion>`, `<ai-drawer>`, `<ai-toast>`, `<ai-command-palette>`. They are light DOM, so the same `ai-*` classes apply inside them.

Required nesting, one line each:

- Modal: trigger has `data-ai-toggle="modal"` and `data-ai-target="#id"`. Target is `.ai-modal` containing `.ai-modal-backdrop` and `.ai-modal-box`. Size with `ai-modal-box-sm` or `ai-modal-box-lg`.
- Drawer: same, with `.ai-drawer` plus `ai-drawer-left`, `ai-drawer-top`, or `ai-drawer-bottom` (right is the default), containing `.ai-drawer-backdrop` and `.ai-drawer-panel`. `ai-drawer-sm` narrows it. `--ai-drawer-offset` on a top or bottom drawer clears a fixed navbar.
- Dropdown: trigger with `data-ai-toggle="dropdown"` must sit inside `.ai-dropdown`, beside `.ai-dropdown-menu`. Align with `ai-dropdown-right`.
- Accordion: trigger with `data-ai-toggle="accordion"` must sit inside `.ai-accordion-item`, beside `.ai-accordion-content`.
- Tabs: `button.ai-tab` with `data-ai-tab="#panel"` inside `.ai-tabs-list` inside `.ai-tabs`, panels are `.ai-tab-panel`.
- Toast: `.ai-toast` inside `.ai-toast-container`; the close button carries `data-ai-dismiss="toast"`.

What the runtime guarantees for modal, drawer, and command palette: focus moves into the panel on open and back to the trigger on close, Tab is trapped inside the topmost overlay, Escape closes only that overlay, the rest of the page is set `inert`, and `aria-expanded` stays synced on every trigger. Add `.ai-drawer-no-lock` to opt an overlay out of inert and scroll lock, for a panel the user works alongside. `.ai-modeless` does the same for a modal. Tabs follow the WAI-ARIA tabs pattern: arrow keys, Home, End, and `aria-selected` sync.

Without the runtime the markup still renders and themes correctly; only the toggling is missing.

## Patterns not in AGENTS.md

All verified against `src/registry/data.mjs`.

Navbar with a mobile drawer:

```html
<header class="ai-navbar">
  <div class="ai-container">
    <div class="ai-navbar-inner">
      <a href="/" class="ai-brand"><span>LLMCSS</span></a>
      <nav class="ai-nav-links">
        <a href="#components" class="ai-nav-link is-active" aria-current="page">Components</a>
        <a href="#docs" class="ai-nav-link">Documentation</a>
      </nav>
      <div class="ai-flex ai-items-center ai-gap-2">
        <a href="#start" class="ai-btn ai-btn-primary ai-btn-xs">Get Started</a>
        <button class="ai-btn ai-btn-outline ai-btn-xs ai-md:hidden" data-ai-toggle="drawer" data-ai-target="#nav-drawer" aria-controls="nav-drawer" aria-expanded="false" aria-label="Open menu">Menu</button>
      </div>
    </div>
  </div>
</header>

<div id="nav-drawer" class="ai-drawer ai-drawer-left">
  <div class="ai-drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="ai-drawer-panel ai-drawer-sm">
    <div class="ai-drawer-header">
      <a href="/" class="ai-brand"><span>LLMCSS</span></a>
      <button class="ai-modal-close" data-ai-dismiss="drawer" aria-label="Close">&times;</button>
    </div>
    <div class="ai-drawer-body">
      <nav class="ai-flex ai-flex-col ai-gap-2">
        <a href="#components" class="ai-sidebar-item">Components</a>
        <a href="#docs" class="ai-sidebar-item">Documentation</a>
      </nav>
    </div>
    <div class="ai-drawer-footer">
      <button class="ai-btn ai-btn-primary ai-w-full ai-btn-sm" data-ai-dismiss="drawer">Sign In</button>
    </div>
  </div>
</div>
```

Toast stack:

```html
<div class="ai-toast-container" data-ai-toast-position="top-right">
  <div class="ai-toast ai-toast-success ai-toast-countdown" role="status">
    <span class="ai-toast-message">Deployment completed.</span>
    <button class="ai-toast-close" data-ai-dismiss="toast" aria-label="Dismiss">&times;</button>
    <div class="ai-toast-progress"></div>
  </div>
</div>
```

Variants: `ai-toast-info`, `ai-toast-success`, `ai-toast-warning`, `ai-toast-danger`, `ai-toast-error`.

Combobox:

```html
<div class="ai-combobox">
  <input id="cb-region" class="ai-input" type="text" role="combobox" aria-expanded="false" aria-controls="cb-region-list" aria-autocomplete="list" autocomplete="off" placeholder="Start typing" />
  <ul class="ai-combobox-list" id="cb-region-list" role="listbox" aria-label="Region">
    <li class="ai-combobox-option" role="option" aria-selected="false">Sydney <span class="ai-combobox-hint">ap-southeast-2</span></li>
    <li class="ai-combobox-option" role="option" aria-disabled="true">Osaka <span class="ai-combobox-hint">at capacity</span></li>
    <li class="ai-combobox-empty" hidden>No match</li>
  </ul>
</div>
```

Number stepper and password toggle:

```html
<div class="ai-stepper-input">
  <button type="button" class="ai-stepper-btn" data-ai-step="-1" aria-controls="seats" aria-label="Decrease"></button>
  <input id="seats" class="ai-input" type="number" inputmode="numeric" value="12" min="1" max="250" step="1" />
  <button type="button" class="ai-stepper-btn is-increment" data-ai-step="1" aria-controls="seats" aria-label="Increase"></button>
</div>

<div class="ai-password">
  <input id="pw" class="ai-input" type="password" autocomplete="current-password" />
  <button type="button" class="ai-password-toggle" data-ai-password-toggle="#pw" aria-pressed="false" aria-label="Show password"></button>
</div>
```

Split pane: `.ai-split` (add `ai-split-vertical` to stack) containing two `.ai-split-pane` sections with an `.ai-split-handle` between them. The handle carries `role="separator"`, `tabindex="0"`, `aria-orientation`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. Layout is CSS through the `--ai-split-a` variable; the runtime adds pointer drag and arrow keys.

Scrollspy: `nav.ai-scrollspy` with an optional `data-ai-scrollspy-root="#pane"`, containing `.ai-scrollspy-title` and `.ai-scrollspy-list` of `a.ai-scrollspy-link[href="#section"]`. The runtime moves `is-active` as the matching `.ai-scrollspy-section` scrolls into view.

## Container queries over breakpoints

When a component sits inside a sidebar, drawer, or dashboard widget of variable width, make the wrapper a container and use `ai-cq:` variants instead of viewport breakpoints.

```html
<div class="ai-cq ai-grid ai-cq:grid-cols-2 ai-cq:gap-4">
  <div class="ai-kpi-card">...</div>
  <div class="ai-kpi-card">...</div>
</div>
```

For breakpoint-free intrinsic wrapping use `ai-grid-auto-fit` with one of `ai-grid-min-xs`, `ai-grid-min-sm`, `ai-grid-min-md`, `ai-grid-min-lg`.

## Motion and loading

| Situation | Classes |
|---|---|
| Network or streaming in progress | `ai-progress` with `ai-progress-indeterminate` |
| Async action on a control | `ai-spinner`, `ai-spinner-sm`, `ai-spinner-lg`, or `is-loading` on `.ai-btn` |
| Content placeholder | `ai-skeleton`, `ai-skeleton-text`, `ai-skeleton-title`, `ai-skeleton-avatar`, `ai-skeleton-rect` |
| Live status indicator | `ai-status-pip` or `ai-pulse-dot`, animated only with `is-streaming` |
| Range input | `input[type=range].ai-range` inside `.ai-slider-wrapper` |

All motion respects `prefers-reduced-motion: reduce`.

## Theming beyond the attributes

Every token is a CSS variable in `@layer tokens`. Layer order is `reset, tokens, base, components, utilities`. Override a token on a scope rather than writing a rule:

- Focus ring: `--ai-focus-color`, `--ai-focus-width`, `--ai-focus-offset`, or the `data-ai-focus` preset. `--ai-tap-highlight` controls the mobile tap flash and is transparent by default.
- Per-instance component variables, for example `--ai-drawer-offset` on a top or bottom drawer, or `--ai-split-a` on a split pane.
- `data-ai-skin` values `emerald`, `violet` and `rose` are deprecated aliases of `data-ai-accent` of the same name and will be removed in 1.0. Write `data-ai-accent` instead.

## What the tooling checks

`npx llmcss validate <file>` and MCP `validate_markup` tokenize every `class` and `className` attribute, including JSX template literals, and report three issue types. Substring matching is never used, so `ai-flex` cannot trip the `flex` rule.

| Issue | Trigger |
|---|---|
| `unknown-class` | An `ai-*` token absent from classes.json. The message suggests the nearest known class within an edit distance of 3. |
| `unknown-state` | An `is-*` token absent from states.json. |
| `legacy-class` | An unprefixed token in the legacy map: `btn`, `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, `btn-danger`, `flex`, `flex-col`, `flex-row`, `flex-wrap`, `items-center`, `items-start`, `justify-between`, `justify-center`, `grid`, `card`, `badge`, `spinner`, `progress`, `rounded-md`, `rounded-lg`, `container`, `hidden`, `sr-only`, `text-center`, `font-bold`, `w-full`, `input`, `table`, `modal`, `alert`, `tooltip`, `dropdown`, `accordion`, `tabs`, `navbar`, `footer`, `gap-2`, `gap-4`, `p-4`, `p-6`, `mt-4`, `mb-4`. |

Five classes are JavaScript hooks with no CSS of their own and pass validation without appearing in classes.json: `ai-dropdown-trigger`, `ai-tab`, `ai-tab-panel`, `ai-segmented-input`, `ai-carousel-controls`. Any other token not in a manifest is an error, and the command exits 1.

`npx llmcss lint --fix <file>` rewrites the legacy map entries in place. It cannot fix a hallucinated `ai-*` class; only you can.

`npx llmcss audit <file>` and MCP `llmcss_slop_audit` check eight patterns against the laws below: nested `.ai-card`, `.ai-panel` or `.ai-kpi-card` (counted with a real tag stack, not a line heuristic), a pulsing or breathing animation anywhere in a document that contains no `is-streaming`, colored left-stripe borders, saturated purple or cyan gradients, marquees, unprefixed classes, a badge or pill directly above a heading, and square grid or graph paper backgrounds. It exits 1 on any finding, like `validate`. Laws 6, 7, 8 and 10 have no automated check; they are on you.

## Prohibitions

The full list is in [AGENTS.md](../AGENTS.md). The two that agents break most often, restated: never write a `style` attribute or a `<style>` block, and never emit a class you have not confirmed in classes.json.

## Pro

Ids carrying `tier: "pro"` in `registry.json` or `templates.json`, shown as `[PRO]` by `npx llmcss list` and `npx llmcss templates`, need a token: `npx llmcss login <token>`, then `npx llmcss add <id>` or `npx llmcss template get <id>`. Pro covers themed section templates (`themed-*`), page kits (`kit-*`), and three themed composed blocks. Everything else is MIT, including the command palette, cart drawer, agent chrome, bento heroes, and pricing matrix. Never write Pro markup from memory; fetch it.

## Anti-slop laws

Enforced by `npx llmcss audit`. Generated from `src/registry/laws.mjs` by `node src/registry/build-docs.mjs`. Edit the laws there, never here.

<!-- laws:start -->
1. **Never nest containers.** Do not put a bordered container inside another bordered container. The audit walks the tag stack and flags every `.ai-card`, `.ai-panel` or `.ai-kpi-card` that sits inside another `.ai-card`, `.ai-panel` or `.ai-kpi-card`. Nested boxes waste screen real estate and create dizzying visual layers. Instead: Use generous whitespace (`--ai-space-6`), subtle hairline rules (`<hr class="ai-divider">`), or distinct background shifts (`var(--ai-surface-1)`).
2. **Never pulse static status pips.** Never attach continuous breathing or pulsing animations to steady states like "System Normal", "Online", or "Completed". The audit flags the class tokens `animate-pulse`, `pulse`, `animate-ping`, `ping`, `breathe`, `blink` and `animate-bounce`, and any inline `animation:` value containing `pulse`, `ping`, `breathe`, `blink` or `glow`, unless the document also carries `is-streaming`. Flashing elements demand attention when nothing has changed. Instead: Render a calm, static jewel pip with `.ai-status-pip` and `box-shadow: 0 0 0 2px color-mix(...)`. Reserve `.ai-status-pip.is-streaming` strictly for ongoing inference or active data transmission.
3. **Never use colored left-stripe borders.** Do not place thick 3px to 5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention. Instead: Use a 1px uniform architectural border (`border: 1px solid var(--ai-border)`), accompanied by a subtle 6px status jewel pip or an inline icon.
4. **Never use electric purple or cyan halos and radial glows.** Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows. Instead: Build depth using multi-stop physical elevation with a slight vertical offset: `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 0, 0, 0.04);`.
5. **Never stamp formulaic eyebrows above headlines.** Do not stamp a badge or a pill above a heading as an eyebrow, and do not repeat an uppercase monospace overline (`01 // FEATURES`, `OVERVIEW`) over every section. The audit flags a `span` or `div` carrying `.ai-badge` or `.ai-hero-badge` that is followed by an `h1` to `h4` within the next few lines, with `.ai-product-badge-float` the only exemption. Repeated eyebrows become visual noise that delays reading the headline. Instead: Lead directly with a confident, well-typeset headline (`h1` or `h2`). If context is needed, fold it into the heading or the supporting sentence.
6. **Never crush letter-spacing below -0.04em or justify body text.** Do not apply extreme negative letter-spacing that makes characters collide, and never use `text-align: justify`, which causes distracting typographic rivers. Instead: Keep body text at tracking `0` with `line-height: 1.6`. Restrict negative tracking to large display headings (`-0.02em` to `-0.035em`).
7. **Never place low-contrast gray text on colored backgrounds.** Never render neutral `#71717a` gray text over an accent surface or a tinted banner. Instead: Ensure WCAG AA compliance (minimum 4.5:1 for body copy, 3:1 for large display). When the background is tinted, tint the secondary text from the same hue.
8. **Never create flat, identical metric grids.** Do not display 4 identical KPI cards with identical weights and icons. Instead: Establish clear hierarchy. Make the primary metric anchor dominant in size (`font-size: 2.5rem; font-weight: 700;`), with supporting secondary metrics grouped in tighter rows or tables below.
9. **Never auto-scroll copy.** Do not force readers to wait for auto-scrolling tickers or animated marquee loops to read supported integrations or technologies. Instead: Render a clean, static, responsive badge rail (`.ai-badge-neutral`) or a balanced grid that users can scan at their own speed.
10. **Always theme native browser surfaces.** An interface is incomplete if native browser affordances revert to un-themed system defaults. Instead: Verify text selection (`::selection`), caret color (`caret-color: var(--ai-accent)`), custom scrollbars (`scrollbar-color`), link underline offset (`text-underline-offset: 0.2em`), and tabular numerals (`font-variant-numeric: tabular-nums`).
11. **Never use square grid backgrounds.** Avoid covering backgrounds in repeating 20px to 40px square grid lines, dot grids, or mesh graph paper patterns built from intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits. Instead: Lead with clean, distraction-free solid surfaces (`var(--ai-surface-0)`, `var(--ai-bg)`, `var(--ai-surface-1)`) structured with subtle 1px hairline architectural borders (`var(--ai-border)`).
<!-- laws:end -->

Why these eleven and not more: each names a pattern that is recognisable in static HTML and CSS, and seven of them (1, 2, 3, 4, 5, 9, 11) are detected by `llmcss audit`, so the tool can fail a file rather than merely advise. Laws 1, 3, 8 and 11 are structural: what is nested, what is bordered, what repeats. Laws 2 and 9 are motion applied to states that never change. Laws 5, 6 and 7 are typographic. Law 4 is color physics: a glow with no offset reads as a screen artefact, not as elevation. Law 10 is the one positive obligation: an interface that leaves `::selection`, the caret, and scrollbars at system defaults looks unfinished next to its own themed components.

The four archetypes (Executive Slate, Fintech Titanium, Obsidian Minimal, Editorial Atelier) and their token blocks are in [DESIGN_HARNESS.md](../DESIGN_HARNESS.md), generated from the same source. Fetch them at runtime with `npx llmcss harness` or MCP `llmcss_get_harness`.

## Contributing

Do not open a PR that adds themed Pro markup, Pro CSS sources, or `.env` files to this repository.
