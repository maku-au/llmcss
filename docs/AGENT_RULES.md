# LLMCSS agent rules, exhaustive reference

[AGENTS.md](../AGENTS.md) is the entry point and is enough to write correct markup. This file is the lookup table: every state class, every attribute, every interactive contract, the patterns AGENTS.md does not carry, and what the tooling actually checks. Do not load both into the same system prompt; load AGENTS.md, and consult this when a rule is not in it.

Source of truth, in this order: [classes.json](https://llmcss.io/classes.json) for classes, [tokens.json](https://llmcss.io/tokens.json) for `--ai-*` variables, [states.json](https://llmcss.io/states.json) for `is-*` and `data-ai-*`, `src/registry/data.mjs` for component markup. MCP tools `list_classes`, `list_tokens`, `list_states` return the same data. A class that is in none of these does not exist.

## Where classes live

<!-- stats:start -->
- **Classes:** 2305 classes across 40 families, listed in [classes.json](https://llmcss.io/classes.json).
- **Tokens:** 107 `--ai-*` custom properties, listed in [tokens.json](https://llmcss.io/tokens.json).
- **States:** 38 `is-*` classes, listed in [states.json](https://llmcss.io/states.json).
- **Components:** 122, all MIT: 54 primitive, 42 application, 21 marketing, 5 ecommerce.
- **Motion demos:** 8, in the optional addon.
- **Layout variants:** 150 across 52 components, addressed `component:variant`.
- **Section templates:** 55 (44 free wireframe, 11 themed Pro).
- **Page blueprints:** 6 (4 free, 2 Pro).
- **Motion addon:** 64 classes, 2.0KB gzipped, listed in [classes.motion.json](https://llmcss.io/classes.motion.json).
<!-- stats:end -->

The family a class belongs to tells you which stylesheet file defines it and roughly what it does.

<!-- families:start -->
| Family | Classes | Defined in |
|---|---:|---|
| `spacing` | 688 | `utilities.css` |
| `interaction` | 184 | `utilities.css` |
| `sizing` | 175 | `utilities.css` |
| `agent-extra` | 120 | `components/agent-extra.css` |
| `position` | 114 | `utilities.css` |
| `typography` | 108 | `utilities.css` |
| `grid` | 107 | `utilities.css` |
| `flex` | 81 | `utilities.css` |
| `marketing` | 75 | `components/marketing.css` |
| `borders` | 70 | `utilities.css` |
| `layout` | 63 | `utilities.css` |
| `effects` | 55 | `utilities.css` |
| `dashboard` | 43 | `components/dashboard.css` |
| `extras` | 40 | `components/extras.css` |
| `animations` | 33 | `animations.css` |
| `forms-extra` | 31 | `components/forms-extra.css` |
| `application` | 30 | `components/application.css` |
| `badges` | 28 | `components/badges.css` |
| `commerce-extra` | 28 | `components/commerce-extra.css` |
| `navigation` | 24 | `components/navigation.css` |
| `chat` | 19 | `components/chat.css` |
| `display` | 19 | `utilities.css` |
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
| `utilities` | 9 | `utilities.extra.css` |
| `themes` | 7 | `themes.css` |
| `accordions` | 6 | `components/accordions.css` |
| `alerts` | 6 | `components/alerts.css` |
| `cart` | 6 | `components/cart.css` |
| `dropdowns` | 6 | `components/dropdowns.css` |
| `tabs` | 5 | `components/tabs.css` |
<!-- families:end -->

Utility names follow the shape you expect from a utility framework, no prefix: `p-6`, `mt-4`, `gap-3`, `w-full`, `max-w-sm`, `text-sm`, `font-semibold`, `rounded-lg`, `items-center`. Component names are `<component>-<part>`: `card-header`, `modal-box`, `drawer-panel`, `toast-message`. Confirm every one in classes.json before you emit it.

Variants are written `<variant>:<name>`, for example `md:grid-cols-2`, `cq-md:grid-cols-3` or `hover:surface-1`.

| Variant | Fires when |
|---|---|
| `sm:` `md:` `lg:` `xl:` `2xl:` | viewport is at least 640, 768, 1024, 1280, 1536px |
| `cq-sm:` `cq-md:` `cq-lg:` | nearest `cq` or `cq-inline` ancestor is at least 380, 600, 900px |
| `hover:` `focus:` `focus-visible:` `active:` `disabled:` | the element is in that interaction state |
| `group-hover:` | an ancestor carrying `group` is hovered |
| `dark:` `print:` `motion-safe:` `motion-reduce:` | `data-ai-theme="dark"`, print media, or the motion preference |
| `first:` `last:` `odd:` `even:` | position among siblings |

A variant exists only if classes.json lists it in that class's `variants` array.

Spacing and sizing steps: `0`, `px`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `14`, `16`, `20`, `24`, `28`, `32`, `36`, `40`, `48`, `56`, `64`, `72`, `80`, `96`.

## Every state class

The author writes these in static markup; the runtime sets the same classes at runtime. `usedBy` is the set of classes the library styles alongside each state, so `is-open` on a `.card` does nothing.

<!-- states:start -->
| State | Styled on |
|---|---|
| `is-active` | `.btn`, `.btn-ghost`, `.btn-primary`, `.combobox-option`, `.filter-tag`, `.list-group-item`, `.nav-link`, `.pagination-link`, `.scrollspy-link`, `.segmented-btn`, `.sidebar-badge`, `.sidebar-item`, `.step-circle`, `.step-item`, `.step-label`, `.tab`, `.tab-panel`, `.tabs-pills`, `.tree-leaf` |
| `is-added` | `.diff-gutter`, `.diff-marker`, `.diff-row` |
| `is-auto` | `.marquee`, `.marquee-track` |
| `is-centered` | `.hero`, `.hero-actions`, `.hero-lead` |
| `is-collapsed` | `.sidebar`, `.sidebar-badge`, `.sidebar-icon`, `.sidebar-item`, `.sidebar-section-title` |
| `is-completed` | `.checklist-item`, `.checklist-label`, `.checklist-mark`, `.orderline-pip`, `.orderline-step`, `.step-circle`, `.step-item` |
| `is-credit` | `.checkout-value` |
| `is-current` | `.breadcrumb-item`, `.orderline-label`, `.orderline-pip`, `.orderline-step` |
| `is-danger` | `.cost-mark`, `.dropdown-item` |
| `is-disabled` | `.list-group-item`, `.pagination-link` |
| `is-done` | `.approval`, `.approval-status`, `.run-header`, `.run-timer`, `.status-pip`, `.trace-row`, `.trace-status` |
| `is-down` | `.kpi-trend` |
| `is-error` | `.empty-state`, `.empty-state-icon`, `.input`, `.select`, `.textarea`, `.trace-row`, `.trace-status` |
| `is-focused` | `.input`, `.select`, `.textarea` |
| `is-increment` | `.stepper-btn` |
| `is-leaving` | `.toast` |
| `is-loading` | `.btn`, `.kpi-card`, `.kpi-trend`, `.kpi-value` |
| `is-muted` | `.calendar-day` |
| `is-nested` | `.scrollspy-link` |
| `is-open` | `.accordion-chevron`, `.accordion-content`, `.accordion-item`, `.accordion-trigger`, `.combobox`, `.combobox-list`, `.command-palette`, `.drawer`, `.drawer-no-lock`, `.dropdown`, `.dropdown-menu`, `.modal`, `.modeless`, `.popover`, `.popover-toggle` |
| `is-primary` | `.kpi-card`, `.stat`, `.stat-value`, `.stats-band` |
| `is-read` | `.notification-dot` |
| `is-ready` | `.combobox`, `.combobox-list` |
| `is-removed` | `.diff-code`, `.diff-gutter`, `.diff-marker`, `.diff-row` |
| `is-required` | `.form-label` |
| `is-reversed` | `.hero-split` |
| `is-selected` | `.calendar-day`, `.command-item` |
| `is-sold-out` | `.btn`, `.product-card`, `.product-img`, `.product-media` |
| `is-streaming` | `.chat-body`, `.chat-msg`, `.pulse-dot`, `.pulse-dot-streaming`, `.status-pip`, `.trace-row`, `.trace-status` |
| `is-today` | `.calendar-day` |
| `is-total` | `.checkout-label`, `.checkout-row`, `.checkout-value` |
| `is-trailing` | `.input`, `.input-icon`, `.input-icon-wrap` |
| `is-unread` | `.inbox-item`, `.inbox-title`, `.notification-item` |
| `is-up` | `.kpi-trend` |
| `is-upcoming` | `.orderline-label`, `.orderline-pip`, `.orderline-step` |
| `is-vertical` | `.orderline-label`, `.orderline-pip`, `.orderline-step`, `.orderline-track`, `.step-item`, `.step-label`, `.stepper` |
| `is-visible` | `.password`, `.password-toggle` |
| `is-warn` | `.cost-mark` |
<!-- states:end -->

Anything else beginning `is-` fails `npx llmcss validate`.

## Attribute reference

Beyond the `data-ai-*` attributes tabled in AGENTS.md, these matter.

| Attribute | On | Values | Who sets it |
|---|---|---|---|
| `aria-expanded` | every toggle pointing at an overlay, dropdown, or accordion item | `true`, `false` | Runtime after load. Write the correct initial value yourself. |
| `aria-selected` | `button.tab`, `tr` inside `.table` | `true` | Runtime on tabs, author on table rows. Interchangeable with `is-active` on tabs. |
| `aria-sort` | `th` inside `.table` | `ascending`, `descending` | Author. Renders the sort indicator. |
| `aria-current` | `.nav-link`, `.sidebar-item`, `.pagination-link`, `.breadcrumb-item` | `page`, `step`, `true` | Author. The selectors match on presence, so delete the attribute instead of setting it to `false`. |
| `aria-controls` | stepper buttons, combobox input, dropdown trigger | an element id | Author. Required for `data-ai-step` to find its input. |
| `data-ai-value` | `[role="option"]` inside `.combobox-list` | any string | Author. The value written into the input when the option is chosen; falls back to the option's text. |

The runtime stamps `js` on `<html>` when it loads, so CSS can show controls that need JavaScript. Do not write that class yourself.

## Interactive contracts

Emit either the attribute form or the custom-element form. Both render from CSS alone; the runtime adds behavior.

```html
<button data-ai-toggle="modal" data-ai-target="#contact">Contact us</button>
<div id="contact" class="modal">...</div>
```

```html
<ai-modal id="contact">...</ai-modal>
```

Registered elements: `<ai-modal>`, `<ai-tabs>`, `<ai-dropdown>`, `<ai-accordion>`, `<ai-drawer>`, `<ai-toast>`, `<ai-command-palette>`. They are light DOM, so the same classes apply inside them.

Required nesting, one line each:

- Modal: trigger has `data-ai-toggle="modal"` and `data-ai-target="#id"`. Target is `.modal` containing `.modal-backdrop` and `.modal-box`. Size with `modal-box-sm` or `modal-box-lg`.
- Drawer: same, with `.drawer` plus `drawer-left`, `drawer-top`, or `drawer-bottom` (right is the default), containing `.drawer-backdrop` and `.drawer-panel`. `drawer-sm` narrows it. `--ai-drawer-offset` on a top or bottom drawer clears a fixed navbar.
- Dropdown: trigger with `data-ai-toggle="dropdown"` must sit inside `.dropdown`, beside `.dropdown-menu`. Align with `dropdown-right`.
- Accordion: trigger with `data-ai-toggle="accordion"` must sit inside `.accordion-item`, beside `.accordion-content`.
- Tabs: `button.tab` with `data-ai-tab="#panel"` inside `.tabs-list` inside `.tabs`, panels are `.tab-panel`.
- Toast: `.toast` inside `.toast-container`; the close button carries `data-ai-dismiss="toast"`.

What the runtime guarantees for modal, drawer, and command palette: focus moves into the panel on open and back to the trigger on close, Tab is trapped inside the topmost overlay, Escape closes only that overlay, the rest of the page is set `inert`, and `aria-expanded` stays synced on every trigger. Add `.drawer-no-lock` to opt an overlay out of inert and scroll lock, for a panel the user works alongside. `.modeless` does the same for a modal. Tabs follow the WAI-ARIA tabs pattern: arrow keys, Home, End, and `aria-selected` sync.

Without the runtime the markup still renders and themes correctly; only the toggling is missing.

## Patterns not in AGENTS.md

All verified against `src/registry/data.mjs`.

Navbar with a mobile drawer:

```html
<header class="navbar">
  <div class="container">
    <div class="navbar-inner">
      <a href="/" class="brand"><span>LLMCSS</span></a>
      <nav class="nav-links">
        <a href="#components" class="nav-link is-active" aria-current="page">Components</a>
        <a href="#docs" class="nav-link">Documentation</a>
      </nav>
      <div class="flex items-center gap-2">
        <a href="#start" class="btn btn-primary btn-xs">Get Started</a>
        <button class="btn btn-outline btn-xs md:hidden" data-ai-toggle="drawer" data-ai-target="#nav-drawer" aria-controls="nav-drawer" aria-expanded="false" aria-label="Open menu">Menu</button>
      </div>
    </div>
  </div>
</header>

<div id="nav-drawer" class="drawer drawer-left">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel drawer-sm">
    <div class="drawer-header">
      <a href="/" class="brand"><span>LLMCSS</span></a>
      <button class="modal-close" data-ai-dismiss="drawer" aria-label="Close">&times;</button>
    </div>
    <div class="drawer-body">
      <nav class="flex flex-col gap-2">
        <a href="#components" class="sidebar-item">Components</a>
        <a href="#docs" class="sidebar-item">Documentation</a>
      </nav>
    </div>
    <div class="drawer-footer">
      <button class="btn btn-primary w-full btn-sm" data-ai-dismiss="drawer">Sign In</button>
    </div>
  </div>
</div>
```

Toast stack:

```html
<div class="toast-container" data-ai-toast-position="top-right">
  <div class="toast toast-success toast-countdown" role="status">
    <span class="toast-message">Deployment completed.</span>
    <button class="toast-close" data-ai-dismiss="toast" aria-label="Dismiss">&times;</button>
    <div class="toast-progress"></div>
  </div>
</div>
```

Variants: `toast-info`, `toast-success`, `toast-warning`, `toast-danger`, `toast-error`.

Combobox:

```html
<div class="combobox">
  <input id="cb-region" class="input" type="text" role="combobox" aria-expanded="false" aria-controls="cb-region-list" aria-autocomplete="list" autocomplete="off" placeholder="Start typing" />
  <ul class="combobox-list" id="cb-region-list" role="listbox" aria-label="Region">
    <li class="combobox-option" role="option" aria-selected="false">Sydney <span class="combobox-hint">ap-southeast-2</span></li>
    <li class="combobox-option" role="option" aria-disabled="true">Osaka <span class="combobox-hint">at capacity</span></li>
    <li class="combobox-empty" hidden>No match</li>
  </ul>
</div>
```

Number stepper and password toggle:

```html
<div class="stepper-input">
  <button type="button" class="stepper-btn" data-ai-step="-1" aria-controls="seats" aria-label="Decrease"></button>
  <input id="seats" class="input" type="number" inputmode="numeric" value="12" min="1" max="250" step="1" />
  <button type="button" class="stepper-btn is-increment" data-ai-step="1" aria-controls="seats" aria-label="Increase"></button>
</div>

<div class="password">
  <input id="pw" class="input" type="password" autocomplete="current-password" />
  <button type="button" class="password-toggle" data-ai-password-toggle="#pw" aria-pressed="false" aria-label="Show password"></button>
</div>
```

Split pane: `.split` (add `split-vertical` to stack) containing two `.split-pane` sections with an `.split-handle` between them. The handle carries `role="separator"`, `tabindex="0"`, `aria-orientation`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. Layout is CSS through the `--ai-split-a` variable; the runtime adds pointer drag and arrow keys.

Scrollspy: `nav.scrollspy` with an optional `data-ai-scrollspy-root="#pane"`, containing `.scrollspy-title` and `.scrollspy-list` of `a.scrollspy-link[href="#section"]`. The runtime moves `is-active` as the matching `.scrollspy-section` scrolls into view.

## Container queries over breakpoints

When a component sits inside a sidebar, drawer, or dashboard widget of variable width, make the wrapper a container and use the `cq-sm:`, `cq-md:` and `cq-lg:` variants instead of viewport breakpoints. They fire at 380px, 600px and 900px of the nearest `cq` or `cq-inline` ancestor.

```html
<div class="cq grid cq-sm:grid-cols-2 cq-sm:gap-4">
  <div class="kpi-card">...</div>
  <div class="kpi-card">...</div>
</div>
```

For breakpoint-free intrinsic wrapping use `grid-auto-fit` with one of `grid-min-xs`, `grid-min-sm`, `grid-min-md`, `grid-min-lg`.

## Motion and loading

| Situation | Classes |
|---|---|
| Network or streaming in progress | `progress` with `progress-indeterminate` |
| Async action on a control | `spinner`, `spinner-sm`, `spinner-lg`, or `is-loading` on `.btn` |
| Content placeholder | `skeleton`, `skeleton-text`, `skeleton-title`, `skeleton-avatar`, `skeleton-rect` |
| Live status indicator | `status-pip` or `pulse-dot`, animated only with `is-streaming` |
| Range input | `input[type=range].range` inside `.slider-wrapper` |

All motion respects `prefers-reduced-motion: reduce`.

## Theming beyond the attributes

Every token is a CSS variable in `@layer tokens`. Layer order is `reset, tokens, base, components, utilities`. Override a token on a scope rather than writing a rule:

- Focus ring: `--ai-focus-color`, `--ai-focus-width`, `--ai-focus-offset`, or the `data-ai-focus` preset. `--ai-tap-highlight` controls the mobile tap flash and is transparent by default.
- Per-instance component variables, for example `--ai-drawer-offset` on a top or bottom drawer, or `--ai-split-a` on a split pane.
- `data-ai-skin` values `emerald`, `violet` and `rose` are deprecated aliases of `data-ai-accent` of the same name and will be removed in 1.0. Write `data-ai-accent` instead.

## What the tooling checks

`npx llmcss validate <file>` and MCP `validate_markup` tokenize every `class` and `className` attribute, including JSX template literals, and report three issue types. Substring matching is never used, so `flex` cannot trip the `flex` rule.

| Issue | Trigger |
|---|---|
| `unknown-class` | A class token absent from classes.json. The message suggests the nearest known class within an edit distance of 3. A warning by default; add `--strict` to fail the file on it. |
| `unknown-state` | An `is-*` token absent from states.json. Always fails the file. |
| `stray-prefix` | A class token still carrying the removed `ai-` prefix, for example `ai-btn` or `ai-flex`. Always fails the file; `lint --fix` rewrites it to the unprefixed name. |

`is-*` state classes, `js-*` hook classes, and the custom element tags (`<ai-modal>` and friends) are exempt from the `unknown-class` check. Five existing classes are JavaScript hooks with no CSS of their own and pass validation the same way without appearing in classes.json: `dropdown-trigger`, `tab`, `tab-panel`, `segmented-input`, `carousel-controls`. New hook classes should use a `js-` prefix instead, for example `js-scrollspy-link`; the five above predate that convention and are exempted by name.

`npx llmcss lint --fix <file>` strips a stray `ai-` prefix in place. It cannot fix a hallucinated class; only you can.

`npx llmcss audit <file>` and MCP `llmcss_slop_audit` check eight patterns against the laws below: nested `.card`, `.panel` or `.kpi-card` (counted with a real tag stack, not a line heuristic), a pulsing or breathing animation anywhere in a document that contains no `is-streaming`, colored left-stripe borders, saturated purple or cyan gradients, marquees, a stray `ai-` prefix (via `legacyFix`), a badge or pill directly above a heading, and square grid or graph paper backgrounds. It does not check for hallucinated classes; `npx llmcss validate` reports those, as a warning unless `--strict` is passed, in which case it errors. It exits 1 on any finding, like `validate`. Laws 6, 7, 8 and 10 have no automated check; they are on you.

## Variants of a component

A component variant is a structural alternative to a component's default layout, stored in the component's `variants` array and addressed flat as `component:variant`. `npx llmcss variants <id>` says what each one does, `npx llmcss add hero-split:centered` writes it (the colon flattens to a hyphen in the filename), `npx llmcss info <id>` adds a `variantRefs` list, and `npx llmcss search` matches variant names as well as component names. Over MCP, `get_component_markup` takes `{ "id": "hero-split:centered" }` or `{ "id": "hero-split", "variant": "centered" }`, and its response, like every `search_components` row, carries a `variants` array of `{ id, name, description }`. No `variants` array means one layout. Do not confuse it with a class variant: `md:grid-cols-2` has a class name on the left, `hero-split:centered` has a component id.

The authoring rule, for whoever adds the next variant: a variant changes structure, never colour. Split versus centered, media left versus media top, sidebar versus topbar, dense versus comfortable, one column versus two. If the change can be made by setting `data-ai-skin`, `data-ai-accent` or `data-ai-density`, it is not a variant and it does not go in the registry. Every variant is held to the same gates as a component demo, plus three of its own: strict validation with zero warnings, no `style` attribute at all, and no `id` attribute reused from its parent.

## Prohibitions

The full list is in [AGENTS.md](../AGENTS.md). The two that agents break most often, restated: never write a `style` attribute or a `<style>` block, and never emit a class you have not confirmed in classes.json.

## Pro

Ids carrying `tier: "pro"` in `templates.json`, shown as `[PRO]` by `npx llmcss templates`, need a token: `npx llmcss login <token>`, then `npx llmcss template get <id>` or `npx llmcss template blueprint <id>`. Pro covers themed section templates (`themed-*`) and page kits (`kit-*`) only. `registry.json` carries no Pro ids: every component is MIT, including the command palette, cart drawer, agent chrome, bento heroes, and pricing matrix, so `npx llmcss add` and `npx llmcss list` never need a token. Never write Pro markup from memory; fetch it.

## Anti-slop laws

Enforced by `npx llmcss audit`. Generated from `src/registry/laws.mjs` by `node src/registry/build-docs.mjs`. Edit the laws there, never here.

<!-- laws:start -->
1. **Never nest containers.** Do not put a bordered container inside another bordered container. The audit walks the tag stack and flags every `.card`, `.panel` or `.kpi-card` that sits inside another `.card`, `.panel` or `.kpi-card`. Nested boxes waste screen real estate and create dizzying visual layers. Instead: Use generous whitespace (`--ai-space-6`), subtle hairline rules (`<hr class="divider">`), or distinct background shifts (`var(--ai-surface-1)`).
2. **Never pulse static status pips.** Never attach continuous breathing or pulsing animations to steady states like "System Normal", "Online", or "Completed". The audit flags the class tokens `animate-pulse`, `pulse`, `animate-ping`, `ping`, `breathe`, `blink` and `animate-bounce`, and any inline `animation:` value containing `pulse`, `ping`, `breathe`, `blink` or `glow`, unless the document also carries `is-streaming`. Flashing elements demand attention when nothing has changed. Instead: Render a calm, static jewel pip with `.status-pip` and `box-shadow: 0 0 0 2px color-mix(...)`. Reserve `.status-pip.is-streaming` strictly for ongoing inference or active data transmission.
3. **Never use colored left-stripe borders.** Do not place thick 3px to 5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention. Instead: Use a 1px uniform architectural border (`border: 1px solid var(--ai-border)`), accompanied by a subtle 6px status jewel pip or an inline icon.
4. **Never use electric purple or cyan halos and radial glows.** Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows. Instead: Build depth using multi-stop physical elevation with a slight vertical offset: `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 0, 0, 0.04);`.
5. **Never stamp formulaic eyebrows above headlines.** Do not stamp a badge or a pill above a heading as an eyebrow, and do not repeat an uppercase monospace overline (`01 // FEATURES`, `OVERVIEW`) over every section. The audit flags a `span` or `div` carrying `.badge` or `.hero-badge` that is followed by an `h1` to `h4` within the next few lines, with `.product-badge-float` the only exemption. Repeated eyebrows become visual noise that delays reading the headline. Instead: Lead directly with a confident, well-typeset headline (`h1` or `h2`). If context is needed, fold it into the heading or the supporting sentence.
6. **Never crush letter-spacing below -0.04em or justify body text.** Do not apply extreme negative letter-spacing that makes characters collide, and never use `text-align: justify`, which causes distracting typographic rivers. Instead: Keep body text at tracking `0` with `line-height: 1.6`. Restrict negative tracking to large display headings (`-0.02em` to `-0.035em`).
7. **Never place low-contrast gray text on colored backgrounds.** Never render neutral `#71717a` gray text over an accent surface or a tinted banner. Instead: Ensure WCAG AA compliance (minimum 4.5:1 for body copy, 3:1 for large display). When the background is tinted, tint the secondary text from the same hue.
8. **Never create flat, identical metric grids.** Do not display 4 identical KPI cards with identical weights and icons. Instead: Establish clear hierarchy. Make the primary metric anchor dominant in size (`font-size: 2.5rem; font-weight: 700;`), with supporting secondary metrics grouped in tighter rows or tables below.
9. **Never auto-scroll copy.** Do not force readers to wait for auto-scrolling tickers or animated marquee loops to read supported integrations or technologies. Instead: Render a clean, static, responsive badge rail (`.badge-neutral`) or a balanced grid that users can scan at their own speed.
10. **Always theme native browser surfaces.** An interface is incomplete if native browser affordances revert to un-themed system defaults. Instead: Verify text selection (`::selection`), caret color (`caret-color: var(--ai-accent)`), custom scrollbars (`scrollbar-color`), link underline offset (`text-underline-offset: 0.2em`), and tabular numerals (`font-variant-numeric: tabular-nums`).
11. **Never use square grid backgrounds.** Avoid covering backgrounds in repeating 20px to 40px square grid lines, dot grids, or mesh graph paper patterns built from intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits. Instead: Lead with clean, distraction-free solid surfaces (`var(--ai-surface-0)`, `var(--ai-bg)`, `var(--ai-surface-1)`) structured with subtle 1px hairline architectural borders (`var(--ai-border)`).
12. **Never paint state without announcing it.** Do not mark a control as active, open, selected or pressed with a class and a colour alone. A segmented control whose current view carries only `is-active`, an accordion trigger with no `aria-expanded`, a toast that arrives outside any live region: each one looks correct and says nothing. A screen reader reads an undifferentiated list of buttons. Instead: Mirror every `is-*` state on an interactive element with the ARIA attribute that carries it: `aria-pressed` on segmented and filter buttons wrapped in a labelled `role="group"`, `aria-expanded` plus `aria-controls` on disclosure and accordion triggers, `aria-selected` on tabs, `aria-current` on the active nav link, and `role="status" aria-live="polite"` (or `role="alert"` for a failure) on anything that appears unprompted.
<!-- laws:end -->

Why these eleven and not more: each names a pattern that is recognisable in static HTML and CSS, and seven of them (1, 2, 3, 4, 5, 9, 11) are detected by `llmcss audit`, so the tool can fail a file rather than merely advise. Laws 1, 3, 8 and 11 are structural: what is nested, what is bordered, what repeats. Laws 2 and 9 are motion applied to states that never change. Laws 5, 6 and 7 are typographic. Law 4 is color physics: a glow with no offset reads as a screen artefact, not as elevation. Law 10 is the one positive obligation: an interface that leaves `::selection`, the caret, and scrollbars at system defaults looks unfinished next to its own themed components.

The four archetypes (Executive Slate, Fintech Titanium, Obsidian Minimal, Editorial Atelier) and their token blocks are in [DESIGN_HARNESS.md](../DESIGN_HARNESS.md), generated from the same source. Fetch them at runtime with `npx llmcss harness` or MCP `llmcss_get_harness`.

## Contributing

Do not open a PR that adds themed Pro markup, Pro CSS sources, or `.env` files to this repository.
