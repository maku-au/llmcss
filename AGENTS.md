# LLMCSS agent rules

Entry point. Load this as a system prompt to generate LLMCSS markup. Exhaustive reference: [docs/AGENT_RULES.md](docs/AGENT_RULES.md).

```html
<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />
<script src="https://llmcss.io/llmcss.js" defer></script>
```

<!-- stats:start -->
- **Classes:** 2301 classes across 40 families, listed in [classes.json](https://llmcss.io/classes.json).
- **Tokens:** 108 `--ai-*` custom properties, listed in [tokens.json](https://llmcss.io/tokens.json).
- **States:** 38 `is-*` classes, listed in [states.json](https://llmcss.io/states.json).
- **Components:** 125, all MIT: 54 primitive, 42 application, 23 marketing, 6 ecommerce.
- **Motion demos:** 8, in the optional addon.
- **Layout variants:** 188 across 66 components, addressed `component:variant`.
- **Section templates:** 55 (44 free wireframe, 11 themed Pro).
- **Page blueprints:** 6 (4 free, 2 Pro).
- **Motion addon:** 64 classes, 2.0KB gzipped, listed in [classes.motion.json](https://llmcss.io/classes.motion.json).
<!-- stats:end -->

| Fact | Value |
|---|---|
| Class prefix | None. Removed in 0.4.0. Every class name is listed in [classes.json](https://llmcss.io/classes.json); write `btn`, never `ai-btn`. |
| Class universe | Every class is listed in [classes.json](https://llmcss.io/classes.json). Not in that list means it does not exist. |
| Tokens | The `--ai-*` custom properties are listed in [tokens.json](https://llmcss.io/tokens.json). |
| State classes | `is-*`, listed in [states.json](https://llmcss.io/states.json). `is-active`, `is-open`, `is-loading`, `is-selected`, `is-disabled`, `is-error`, `is-streaming` and more. |
| Variants | Written `<variant>:<class>`, for example `md:grid-cols-2`. Breakpoints, container tiers and states are in the Variants section below. Only the variants classes.json lists for that class exist. |
| Variants of a component | Some components ship more than one layout. Ask for one by reference: `hero-split:centered`. The list is in the component's registry entry and in every `search_components` row. No `variants` array means one layout. |
| Theme | `data-ai-theme="light"` or `"dark"` on `<html>` or any container. Dark never activates from the OS setting. |
| Skin | `data-ai-skin="obsidian\|editorial\|executive\|fintech\|enterprise"` on `<html>` or any container. Changes surfaces, radius and type. |
| Accent | `data-ai-accent="emerald\|violet\|rose\|teal\|steel\|amber"`. Composes with any skin and outranks it. Absent means the blue default. |
| Density | `data-ai-density="compact"` or `"spacious"`. Absent means standard. |
| Focus ring | `data-ai-focus="neutral\|thin\|none"` on `<html>`. Absent means the accent ring. |
| Runtime needed for | `data-ai-toggle`, `data-ai-dismiss`, `data-ai-tab`, `data-ai-step`, `data-ai-password-toggle`, combobox, scrollspy, split pane, and the `<ai-*>` custom elements. Everything else is CSS-only. |
| The one validation rule | Every token in a `class` attribute is checked against classes.json. `is-*` states, `js-*` hook classes, and custom element tags (`<ai-modal>` and friends) are exempt. An unknown class is a warning unless you pass `--strict`; a stray `ai-` prefix is always flagged, with a fix. |

## Variants

Written `<variant>:<class>`, for example `md:grid-cols-2`, `cq-md:grid-cols-3`, `hover:surface-1`.

| Variant | Fires when |
|---|---|
| `sm:` `md:` `lg:` `xl:` `2xl:` | viewport is at least 640, 768, 1024, 1280, 1536px |
| `cq-sm:` `cq-md:` `cq-lg:` | nearest `cq` or `cq-inline` ancestor is at least 380, 600, 900px |
| `hover:` `focus:` `focus-visible:` `active:` `disabled:` | the element is in that interaction state |
| `group-hover:` | an ancestor carrying `group` is hovered |
| `dark:` `print:` `motion-safe:` `motion-reduce:` | `data-ai-theme="dark"`, print media, or the motion preference |
| `first:` `last:` `odd:` `even:` | position among siblings |

A variant exists for a class only when classes.json lists it in that class's `variants` array.

## Motion addon

**Motion addon.** Animation classes are not in `llmcss.css`. They ship in a separate opt-in stylesheet, `https://llmcss.io/llmcss-motion.css`, listed in [classes.motion.json](https://llmcss.io/classes.motion.json); do not emit `animate-*`, `reveal*`, `stagger*`, `vt-*`, `press`, `lift` or the extra `duration-instant|slower`, `delay-500|700` and `ease-standard|emphasized|decelerate|accelerate|overshoot` steps unless the page loads that second link tag. Every animation in the addon is one shot and fires because something changed: an element arrived, left, opened, closed, or the user acted. There is no `repeat-infinite`, and the one looping class, `animate-sweep`, stays inert unless its element sits in `.progress` or `.skeleton` or carries `is-loading`, `is-streaming` or `aria-busy`, so Law 2 cannot be broken with addon classes. Tune an animation with the same `duration-*`, `delay-*` and `ease-*` words that already tune a transition. Reveals (`reveal`, `reveal-up`, `reveal-scale`) are pure CSS scroll-driven animations and degrade to plainly visible content wherever `animation-timeline: view()` is missing, so never pair them with a class or style that hides the element first.

## Variants of a component

`md:grid-cols-2` is a **class** variant, a responsive copy of a class. `hero-split:centered` is a **component** variant, a different layout for the same component. Same separator, different left hand side: a class name on the left means the first, a component id means the second.

A component variant is structural. The boxes move: split versus centered, media left versus media top, sidebar versus topbar, one column versus two, dense versus comfortable. It is never a recolour, a radius change or a density change, because those are `data-ai-skin`, `data-ai-accent` and `data-ai-density` on an ancestor.

Ask for one by reference, `component:variant`, on every surface that takes a component id:

```
npx llmcss variants hero-split          # what each layout does
npx llmcss add hero-split:centered      # writes components/marketing/hero-split-centered.html
npx llmcss info hero-split              # metadata plus variantRefs
```

Over MCP the same reference goes to the tool you already use. `get_component_markup` takes `{ "id": "hero-split:centered" }`, or `{ "id": "hero-split", "variant": "centered" }`; omit the variant for the default layout. Its response and every `search_components` row carry a `variants` array of `{ id, name, description }`, so discovering the alternatives costs no extra call. A component with no `variants` array has one layout.

Spacing and sizing steps: `0`, `px`, `0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `14`, `16`, `20`, `24`, `28`, `32`, `36`, `40`, `48`, `56`, `64`, `72`, `80`, `96`.

## Runtime attributes

| Attribute | Goes on | Values | Contract |
|---|---|---|---|
| `data-ai-toggle` | `button` | `modal`, `drawer`, `dropdown`, `accordion`, `segmented` | `modal` and `drawer` also need `data-ai-target`. `dropdown` needs a `.dropdown` ancestor. `accordion` needs an `.accordion-item` ancestor. `segmented` sets `is-active` and `aria-pressed` across its `role="group"` (or parent) and fires `ai-segmented-change`. |
| `data-ai-target` | the toggle button | `#id` | Id of the `.modal` or `.drawer` to open. |
| `data-ai-dismiss` | a button or the backdrop inside the overlay | `modal`, `drawer`, `toast` | Closes the nearest overlay of that kind. |
| `data-ai-tab` | `button.tab` inside `.tabs` | `#panel-id` | Activates that `.tab-panel`. |
| `data-ai-toast-position` | `.toast-container` | `top-right`, `top-center`, `top-left`, `bottom-left`, `bottom-center` | Absent means bottom-right. |
| `data-ai-step` | `button.stepper-btn` | `-1`, `1` | Also needs `aria-controls="#numberInputId"`. |
| `data-ai-password-toggle` | `button.password-toggle` | `#inputId` | Inside `.password`. |
| `data-ai-scrollspy-root` | `nav.scrollspy` | `#selector` | Optional scroll container. |
| `open` | `.modal`, `.drawer`, `.accordion-item`, `.dropdown` | present or absent | Interchangeable with `.is-open`. The runtime sets both. |

The runtime also syncs `aria-expanded` on every trigger and `aria-selected` on tabs. Do not hand-maintain those after load; do set them in the static markup you emit.

## Static state, and the aria attribute that mirrors it

| Write this class | On | Mirror attribute you also write |
|---|---|---|
| `is-open` | `.modal`, `.drawer`, `.dropdown`, `.accordion-item`, `.popover`, `.combobox`, `.command-palette` | `open` on the container, `aria-expanded="true"` on the trigger |
| `is-active` | `.tab`, `.tab-panel`, `.nav-link`, `.sidebar-item`, `.pagination-link`, `.step-item`, `.scrollspy-link` | `aria-selected="true"` on a tab, `aria-current="page"` on a nav or sidebar link |
| `is-current` | `.breadcrumb-item`, `.orderline-step` | `aria-current="page"` |
| `is-disabled` | `.list-group-item`, `.pagination-link` | `aria-disabled="true"` |
| `is-error` | `.input`, `.select`, `.textarea`, `.empty-state` | `aria-invalid="true"` |
| `is-loading` | `.btn`, `.kpi-card`, `.kpi-value` | `aria-busy="true"` |
| `is-streaming` | `.status-pip`, `.pulse-dot` | none. This is the only class allowed to animate a status indicator. |

`aria-current` selectors match the attribute's presence, so remove the attribute rather than writing `aria-current="false"`.

## Copy-paste patterns

Each block below is the shipped markup from `src/registry/data.mjs`. Classes are exact.

Card:

```html
<div class="card max-w-sm">
  <div class="card-header">
    <h3 class="card-title">Project Deployment</h3>
    <p class="card-description">Production deployment configured for edge nodes.</p>
  </div>
  <div class="card-body">
    <p class="text-sm">Last deployed 14 minutes ago.</p>
  </div>
  <div class="card-footer">
    <span class="badge badge-success badge-dot">Online</span>
    <button class="btn btn-outline btn-xs">View Logs</button>
  </div>
</div>
```

Modal:

```html
<button class="btn btn-primary" data-ai-toggle="modal" data-ai-target="#demo-modal" aria-haspopup="dialog" aria-expanded="false">Open</button>

<div id="demo-modal" class="modal">
  <div class="modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
    <div class="modal-header">
      <h3 class="modal-title" id="demo-modal-title">Confirm Database Reset</h3>
      <button class="modal-close" data-ai-dismiss="modal" aria-label="Close">&times;</button>
    </div>
    <div class="modal-body"><p>All mock records revert to initial seed.</p></div>
    <div class="modal-footer">
      <button class="btn btn-outline" data-ai-dismiss="modal">Cancel</button>
      <button class="btn btn-danger" data-ai-dismiss="modal">Reset</button>
    </div>
  </div>
</div>
```

Drawer: identical shape with `.drawer` plus a side class (`drawer-left`, `drawer-top`, `drawer-bottom`), `.drawer-backdrop`, `.drawer-panel`, `.drawer-header`, `.drawer-body`, `.drawer-footer`, and `data-ai-toggle="drawer"`.

Tabs:

```html
<div class="tabs">
  <div class="tabs-list" role="tablist" aria-label="Workspace">
    <button class="tab is-active" role="tab" id="tab-a-tab" aria-controls="tab-a" aria-selected="true" data-ai-tab="#tab-a">Overview</button>
    <button class="tab" role="tab" id="tab-b-tab" aria-controls="tab-b" aria-selected="false" tabindex="-1" data-ai-tab="#tab-b">Analytics</button>
  </div>
  <div id="tab-a" class="tab-panel is-active" role="tabpanel" aria-labelledby="tab-a-tab">
    <p class="text-secondary">Overview content.</p>
  </div>
  <div id="tab-b" class="tab-panel" role="tabpanel" aria-labelledby="tab-b-tab">
    <p class="text-secondary">Analytics content.</p>
  </div>
</div>
```

Dropdown:

```html
<div class="dropdown">
  <button class="btn btn-outline dropdown-trigger" data-ai-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="menu-1">Options</button>
  <ul class="dropdown-menu" id="menu-1">
    <li class="dropdown-header">Workspace</li>
    <li><button class="dropdown-item">View Team</button></li>
    <li class="dropdown-divider"></li>
    <li><button class="dropdown-item is-danger">Sign Out</button></li>
  </ul>
</div>
```

Accordion:

```html
<div class="accordion">
  <div class="accordion-item is-open" open>
    <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="true" aria-controls="faq-1">
      <span>First question</span>
      <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content" id="faq-1">Answer body.</div>
  </div>
</div>
```

Flush by default. Add `accordion-boxed` on the root for the bordered card variant.

Form field:

```html
<div class="form-group">
  <label class="form-label" for="user-email">Email Address</label>
  <input type="email" id="user-email" class="input" placeholder="name@company.com" />
  <span class="form-hint">We will send your workspace invite here.</span>
</div>
```

Use `.form-error` in place of `.form-hint` and add `is-error` to the input for the invalid state. `.textarea` and `.select` take the same wrapper.

Alert:

```html
<div class="alert alert-info" role="status">
  <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  <div><strong class="font-semibold">Maintenance scheduled:</strong> Edge servers restart at 02:00 UTC.</div>
</div>
```

Variants: `alert-info`, `alert-success`, `alert-warning`, `alert-danger`.

Table:

```html
<div class="table-container">
  <table class="table table-hover table-sticky">
    <thead><tr><th aria-sort="ascending">Repository</th><th>Status</th></tr></thead>
    <tbody>
      <tr>
        <td class="font-semibold">llmcss-core</td>
        <td><span class="badge badge-success badge-dot">Active</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

Buttons: `btn` plus one of `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, `btn-accent`, `btn-danger`, plus an optional size `btn-xs`, `btn-sm`, `btn-lg`, `btn-xl`, or `btn-icon`.

Layout: `container` for page width, `container-sm|md|lg|xl|2xl` for a fluid-then-capped wrapper, `container-w-sm|md|lg|xl|full` for a hard max-width cap, `grid` with `grid-cols-2|3|4` or `grid-auto-fit` plus `grid-min-xs|sm|md|lg`, `flex` with `flex-col`, `items-center`, `justify-between`, and `gap-1` through `gap-12`.

## Never do this

Flat prohibitions. Each one fails `validate` or `audit`, or breaks theming.

- Never prefix a class with `ai-`. Classes carry no prefix; write `btn`, `flex`, `grid`, `card`, not `ai-btn`, `ai-flex`, `ai-grid`, `ai-card`. The validator flags a stray `ai-` prefix and fixes it.
- Never invent a class. If it is not in classes.json it does not exist. Unknown classes are a warning by default and a failure under `--strict`.
- Never invent an `is-*` class. Only the ones in states.json are styled.
- Never write a `style` attribute. Use a class, or a `--ai-*` variable on a class-bearing element if you truly need a one-off.
- Never write a `<style>` block, a page-level stylesheet, or a bespoke class of your own.
- Never import a Tailwind, Bootstrap, or shadcn class alongside LLMCSS.
- Never nest an `.card`, `.panel`, or `.kpi-card` inside another one. The audit counts these.
- Never put an uppercase badge or pill eyebrow above a heading.
- Never animate a status dot. `.pulse-dot` and `.status-pip` only animate with `is-streaming`.
- Never apply a colored 3px to 5px left-stripe border to a card, toast, or dialog.
- Never emit a square grid, dot grid, or graph paper background.
- Never rely on `prefers-color-scheme` for dark mode. Set `data-ai-theme` yourself.
- Never write markup for a Pro id from memory.
- Never use an em-dash or an emoji in generated copy.

## Self-check before you return markup

```bash
npx llmcss validate <file>     # unknown class (warning, or fail with --strict), unknown is-* state, stray ai- prefix. Exits 1 on a state issue, a stray prefix, or any warning under --strict.
npx llmcss lint --fix <file>   # strips a stray ai- prefix in place
npx llmcss audit <file>        # the anti-slop laws below
```

MCP equivalents: `validate_markup` and `llmcss_slop_audit`. Class, token and state lists: `list_classes`, `list_tokens`, `list_states`.

`audit` flags eight patterns: nested cards, pulsing static dots, colored left-stripe borders, electric purple or cyan gradients, auto-scrolling marquees, a stray `ai-` prefix (via `legacyFix`), badge eyebrows directly above a heading, and square grid backgrounds. It does not check for hallucinated classes; `validate` does that, as a warning unless `--strict` is passed. Both commands exit 1 on any finding, so both fail a build.

## Anti-slop laws

Generated from `src/registry/laws.mjs`. Do not edit this list by hand.

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

Rationale per law, and the four archetype token blocks: [docs/AGENT_RULES.md](docs/AGENT_RULES.md) and [DESIGN_HARNESS.md](DESIGN_HARNESS.md).

## Pro

Pro is themed section templates and page kits. There are no Pro components: the whole component catalog, including the command palette, cart drawer, agent chrome, bento heroes, and pricing matrix, is MIT with full HTML in `registry.json`. Pro ids live in `templates.json` only, carrying `tier: "pro"` with `locked: true` and `html: null`. `npx llmcss template get <pro-id>` and `npx llmcss template blueprint <pro-kit>` exit 1 with a login hint until `npx llmcss login <token>`; the CLI then fetches `GET /r/pro/{id}.json` with `Authorization: Bearer <token>`. `npx llmcss add` never needs a token. MCP `get_wireframe_template` and `get_page_blueprint` return `{ locked: true, html: null, message }` for a Pro id without a token. Never write Pro markup from memory.
