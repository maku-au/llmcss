# LLMCSS agent rules

Entry point. Load this as a system prompt to generate LLMCSS markup. Exhaustive reference: [docs/AGENT_RULES.md](docs/AGENT_RULES.md).

```html
<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />
<script src="https://llmcss.io/llmcss.js" defer></script>
```

<!-- stats:start -->
- **Classes:** 1407 `ai-*` classes across 40 families, listed in [classes.json](https://llmcss.io/classes.json).
- **Tokens:** 82 `--ai-*` custom properties, listed in [tokens.json](https://llmcss.io/tokens.json).
- **States:** 36 `is-*` classes, listed in [states.json](https://llmcss.io/states.json).
- **Components:** 125 (122 free, 3 themed Pro): 54 primitive, 44 application, 22 marketing, 5 ecommerce.
- **Section templates:** 26 (18 free wireframe, 8 themed Pro).
- **Page blueprints:** 6 (4 free, 2 Pro).
<!-- stats:end -->

| Fact | Value |
|---|---|
| Class prefix | `ai-` on every class. Write `ai-btn`, never `btn`. |
| Class universe | Every class is listed in [classes.json](https://llmcss.io/classes.json). Not in that list means it does not exist. |
| Tokens | The `--ai-*` custom properties are listed in [tokens.json](https://llmcss.io/tokens.json). |
| State classes | `is-*`, listed in [states.json](https://llmcss.io/states.json). `is-active`, `is-open`, `is-loading`, `is-selected`, `is-disabled`, `is-error`, `is-streaming` and more. |
| Responsive | Variant prefixes `ai-sm:` 640px, `ai-md:` 768px, `ai-lg:` 1024px, `ai-xl:` 1280px, `ai-cq:` container query. Written `ai-md:grid-cols-2`. Only the variants classes.json lists for that class exist. |
| Theme | `data-ai-theme="light"` or `"dark"` on `<html>` or any container. Dark never activates from the OS setting. |
| Skin | `data-ai-skin="obsidian\|editorial\|executive\|fintech\|enterprise"` on `<html>` or any container. Changes surfaces, radius and type. |
| Accent | `data-ai-accent="emerald\|violet\|rose\|teal\|steel\|amber"`. Composes with any skin and outranks it. Absent means the blue default. |
| Density | `data-ai-density="compact"` or `"spacious"`. Absent means standard. |
| Focus ring | `data-ai-focus="neutral\|thin\|none"` on `<html>`. Absent means the accent ring. |
| Runtime needed for | `data-ai-toggle`, `data-ai-dismiss`, `data-ai-tab`, `data-ai-step`, `data-ai-password-toggle`, combobox, scrollspy, split pane, and the `<ai-*>` custom elements. Everything else is CSS-only. |
| The one validation rule | Every token in a `class` attribute must be an `ai-*` class in classes.json or an `is-*` class in states.json. Nothing else passes. |

## Runtime attributes

| Attribute | Goes on | Values | Contract |
|---|---|---|---|
| `data-ai-toggle` | `button` | `modal`, `drawer`, `dropdown`, `accordion` | `modal` and `drawer` also need `data-ai-target`. `dropdown` needs a `.ai-dropdown` ancestor. `accordion` needs an `.ai-accordion-item` ancestor. |
| `data-ai-target` | the toggle button | `#id` | Id of the `.ai-modal` or `.ai-drawer` to open. |
| `data-ai-dismiss` | a button or the backdrop inside the overlay | `modal`, `drawer`, `toast` | Closes the nearest overlay of that kind. |
| `data-ai-tab` | `button.ai-tab` inside `.ai-tabs` | `#panel-id` | Activates that `.ai-tab-panel`. |
| `data-ai-toast-position` | `.ai-toast-container` | `top-right`, `top-center`, `top-left`, `bottom-left`, `bottom-center` | Absent means bottom-right. |
| `data-ai-step` | `button.ai-stepper-btn` | `-1`, `1` | Also needs `aria-controls="#numberInputId"`. |
| `data-ai-password-toggle` | `button.ai-password-toggle` | `#inputId` | Inside `.ai-password`. |
| `data-ai-scrollspy-root` | `nav.ai-scrollspy` | `#selector` | Optional scroll container. |
| `open` | `.ai-modal`, `.ai-drawer`, `.ai-accordion-item`, `.ai-dropdown` | present or absent | Interchangeable with `.is-open`. The runtime sets both. |

The runtime also syncs `aria-expanded` on every trigger and `aria-selected` on tabs. Do not hand-maintain those after load; do set them in the static markup you emit.

## Static state, and the aria attribute that mirrors it

| Write this class | On | Mirror attribute you also write |
|---|---|---|
| `is-open` | `.ai-modal`, `.ai-drawer`, `.ai-dropdown`, `.ai-accordion-item`, `.ai-popover`, `.ai-combobox`, `.ai-command-palette` | `open` on the container, `aria-expanded="true"` on the trigger |
| `is-active` | `.ai-tab`, `.ai-tab-panel`, `.ai-nav-link`, `.ai-sidebar-item`, `.ai-pagination-link`, `.ai-step-item`, `.ai-scrollspy-link` | `aria-selected="true"` on a tab, `aria-current="page"` on a nav or sidebar link |
| `is-current` | `.ai-breadcrumb-item`, `.ai-order-step` | `aria-current="page"` |
| `is-disabled` | `.ai-list-group-item`, `.ai-pagination-link` | `aria-disabled="true"` |
| `is-error` | `.ai-input`, `.ai-select`, `.ai-textarea`, `.ai-empty-state` | `aria-invalid="true"` |
| `is-loading` | `.ai-btn`, `.ai-kpi-card`, `.ai-kpi-value` | `aria-busy="true"` |
| `is-streaming` | `.ai-status-pip`, `.ai-pulse-dot` | none. This is the only class allowed to animate a status indicator. |

`aria-current` selectors match the attribute's presence, so remove the attribute rather than writing `aria-current="false"`.

## Copy-paste patterns

Each block below is the shipped markup from `src/registry/data.mjs`. Classes are exact.

Card:

```html
<div class="ai-card ai-max-w-sm">
  <div class="ai-card-header">
    <h3 class="ai-card-title">Project Deployment</h3>
    <p class="ai-card-description">Production deployment configured for edge nodes.</p>
  </div>
  <div class="ai-card-body">
    <p class="ai-text-sm">Last deployed 14 minutes ago.</p>
  </div>
  <div class="ai-card-footer">
    <span class="ai-badge ai-badge-success ai-badge-dot">Online</span>
    <button class="ai-btn ai-btn-outline ai-btn-xs">View Logs</button>
  </div>
</div>
```

Modal:

```html
<button class="ai-btn ai-btn-primary" data-ai-toggle="modal" data-ai-target="#demo-modal" aria-haspopup="dialog" aria-expanded="false">Open</button>

<div id="demo-modal" class="ai-modal">
  <div class="ai-modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="ai-modal-box" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
    <div class="ai-modal-header">
      <h3 class="ai-modal-title" id="demo-modal-title">Confirm Database Reset</h3>
      <button class="ai-modal-close" data-ai-dismiss="modal" aria-label="Close">&times;</button>
    </div>
    <div class="ai-modal-body"><p>All mock records revert to initial seed.</p></div>
    <div class="ai-modal-footer">
      <button class="ai-btn ai-btn-outline" data-ai-dismiss="modal">Cancel</button>
      <button class="ai-btn ai-btn-danger" data-ai-dismiss="modal">Reset</button>
    </div>
  </div>
</div>
```

Drawer: identical shape with `.ai-drawer` plus a side class (`ai-drawer-left`, `ai-drawer-top`, `ai-drawer-bottom`), `.ai-drawer-backdrop`, `.ai-drawer-panel`, `.ai-drawer-header`, `.ai-drawer-body`, `.ai-drawer-footer`, and `data-ai-toggle="drawer"`.

Tabs:

```html
<div class="ai-tabs">
  <div class="ai-tabs-list" role="tablist" aria-label="Workspace">
    <button class="ai-tab is-active" role="tab" id="tab-a-tab" aria-controls="tab-a" aria-selected="true" data-ai-tab="#tab-a">Overview</button>
    <button class="ai-tab" role="tab" id="tab-b-tab" aria-controls="tab-b" aria-selected="false" tabindex="-1" data-ai-tab="#tab-b">Analytics</button>
  </div>
  <div id="tab-a" class="ai-tab-panel is-active" role="tabpanel" aria-labelledby="tab-a-tab">
    <p class="ai-text-secondary">Overview content.</p>
  </div>
  <div id="tab-b" class="ai-tab-panel" role="tabpanel" aria-labelledby="tab-b-tab">
    <p class="ai-text-secondary">Analytics content.</p>
  </div>
</div>
```

Dropdown:

```html
<div class="ai-dropdown">
  <button class="ai-btn ai-btn-outline ai-dropdown-trigger" data-ai-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="menu-1">Options</button>
  <ul class="ai-dropdown-menu" id="menu-1">
    <li class="ai-dropdown-header">Workspace</li>
    <li><button class="ai-dropdown-item">View Team</button></li>
    <li class="ai-dropdown-divider"></li>
    <li><button class="ai-dropdown-item is-danger">Sign Out</button></li>
  </ul>
</div>
```

Accordion:

```html
<div class="ai-accordion">
  <div class="ai-accordion-item is-open" open>
    <button type="button" class="ai-accordion-trigger" data-ai-toggle="accordion" aria-expanded="true" aria-controls="faq-1">
      <span>First question</span>
      <svg class="ai-accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="ai-accordion-content" id="faq-1">Answer body.</div>
  </div>
</div>
```

Flush by default. Add `ai-accordion-boxed` on the root for the bordered card variant.

Form field:

```html
<div class="ai-form-group">
  <label class="ai-form-label" for="user-email">Email Address</label>
  <input type="email" id="user-email" class="ai-input" placeholder="name@company.com" />
  <span class="ai-form-hint">We will send your workspace invite here.</span>
</div>
```

Use `.ai-form-error` in place of `.ai-form-hint` and add `is-error` to the input for the invalid state. `.ai-textarea` and `.ai-select` take the same wrapper.

Alert:

```html
<div class="ai-alert ai-alert-info" role="status">
  <svg class="ai-alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  <div><strong class="ai-font-semibold">Maintenance scheduled:</strong> Edge servers restart at 02:00 UTC.</div>
</div>
```

Variants: `ai-alert-info`, `ai-alert-success`, `ai-alert-warning`, `ai-alert-danger`.

Table:

```html
<div class="ai-table-container">
  <table class="ai-table ai-table-hover ai-table-sticky">
    <thead><tr><th aria-sort="ascending">Repository</th><th>Status</th></tr></thead>
    <tbody>
      <tr>
        <td class="ai-font-semibold">llmcss-core</td>
        <td><span class="ai-badge ai-badge-success ai-badge-dot">Active</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

Buttons: `ai-btn` plus one of `ai-btn-primary`, `ai-btn-secondary`, `ai-btn-outline`, `ai-btn-ghost`, `ai-btn-accent`, `ai-btn-danger`, plus an optional size `ai-btn-xs`, `ai-btn-sm`, `ai-btn-lg`, `ai-btn-xl`, or `ai-btn-icon`.

Layout: `ai-container` or `ai-container-sm|md|lg|xl` for page width, `ai-grid` with `ai-grid-cols-2|3|4` or `ai-grid-auto-fit` plus `ai-grid-min-xs|sm|md|lg`, `ai-flex` with `ai-flex-col`, `ai-items-center`, `ai-justify-between`, and `ai-gap-1` through `ai-gap-12`.

## Never do this

Flat prohibitions. Each one fails `validate` or `audit`, or breaks theming.

- Never write an unprefixed class. No `btn`, `flex`, `grid`, `card`, `badge`, `container`, `hidden`, `input`, `table`, `modal`, `p-4`, `gap-4`, `rounded-lg`.
- Never invent an `ai-*` class. If it is not in classes.json it does not exist, and the validator fails the file.
- Never invent an `is-*` class. Only the ones in states.json are styled.
- Never write a `style` attribute. Use a class, or a `--ai-*` variable on a class-bearing element if you truly need a one-off.
- Never write a `<style>` block, a page-level stylesheet, or a bespoke class of your own.
- Never import a Tailwind, Bootstrap, or shadcn class alongside LLMCSS.
- Never nest an `.ai-card`, `.ai-panel`, or `.ai-kpi-card` inside another one. The audit counts these.
- Never put an uppercase badge or pill eyebrow above a heading.
- Never animate a status dot. `.ai-pulse-dot` and `.ai-status-pip` only animate with `is-streaming`.
- Never apply a colored 3px to 5px left-stripe border to a card, toast, or dialog.
- Never emit a square grid, dot grid, or graph paper background.
- Never rely on `prefers-color-scheme` for dark mode. Set `data-ai-theme` yourself.
- Never write markup for a Pro id from memory.
- Never use an em-dash or an emoji in generated copy.

## Self-check before you return markup

```bash
npx llmcss validate <file>     # unknown ai-* class, unknown is-* state, unprefixed legacy class. Exits 1 on any issue.
npx llmcss lint --fix <file>   # rewrites the legacy unprefixed classes it knows
npx llmcss audit <file>        # the anti-slop laws below
```

MCP equivalents: `validate_markup` and `llmcss_slop_audit`. Class, token and state lists: `list_classes`, `list_tokens`, `list_states`.

`audit` flags eight patterns: nested cards, pulsing static dots, colored left-stripe borders, electric purple or cyan gradients, auto-scrolling marquees, unprefixed or hallucinated classes, badge eyebrows directly above a heading, and square grid backgrounds. Both commands exit 1 on any finding, so both fail a build.

## Anti-slop laws

Generated from `src/registry/laws.mjs`. Do not edit this list by hand.

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

Rationale per law, and the four archetype token blocks: [docs/AGENT_RULES.md](docs/AGENT_RULES.md) and [DESIGN_HARNESS.md](DESIGN_HARNESS.md).

## Pro

Pro is themed section templates, page kits, and three themed composed blocks. Everything else, including the command palette, cart drawer, agent chrome, bento heroes, and pricing matrix, is MIT with full HTML in `registry.json`. Pro ids carry `tier: "pro"` with `locked: true` and `html: null`. `npx llmcss add <pro-id>` and `npx llmcss template get <pro-id>` exit 1 with a login hint until `npx llmcss login <token>`; the CLI then fetches `GET /r/pro/{id}.json` with `Authorization: Bearer <token>`. MCP `get_component_markup` and `get_wireframe_template` return `{ locked: true, html: null, message }` for a Pro id without a token. Never write Pro markup from memory.
