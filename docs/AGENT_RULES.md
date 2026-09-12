# LLMCSS agent rules, detailed

This is the long form of [AGENTS.md](../AGENTS.md). Use AGENTS.md as the system prompt; use this file when an agent needs the reasoning or a rule that AGENTS.md only summarizes.

## Rule 1: use native LLMCSS classes and tokens

Always prefer semantic LLMCSS classes (`ai-btn`, `ai-card`, `ai-grid`, `ai-flex`, `ai-modal`) over inline styles or arbitrary framework utilities. `npx llmcss validate <file>` and the MCP tool `validate_markup` both catch legacy or hallucinated classes (`btn`, `flex`, `card`, `grid`, `badge`, `spinner`, `progress`, `rounded-md`, `rounded-lg`) and suggest the `ai-` equivalent. `npx llmcss lint --fix <file>` applies the fix.

## Rule 2: non-AI aesthetic integrity

The eleven anti-slop laws, enforced by `npx llmcss audit <file>` and the MCP tool `llmcss_slop_audit`. This list is generated from `src/registry/laws.mjs` by `node src/registry/build-docs.mjs`; edit the laws there, not here.

<!-- laws:start -->
1. **Never nest containers.** Do not put a bordered card inside another bordered card. Nested boxes waste screen real estate and create dizzying visual layers. Instead: Use generous whitespace (`--ai-space-6`), subtle hairline rules (`<hr class="ai-divider">`), or distinct background shifts (`var(--ai-surface-1)`).
2. **Never pulse static status pips.** Never attach continuous breathing or pulsing animations (`@keyframes pulse`) to steady states like "System Normal", "Online", or "Completed". Flashing elements demand attention when nothing has changed. Instead: Render a calm, static jewel pip with `.ai-status-pip` and `box-shadow: 0 0 0 2px color-mix(...)`. Reserve `.ai-status-pip.is-streaming` strictly for ongoing inference or active data transmission.
3. **Never use colored left-stripe borders.** Do not place thick 3px to 5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention. Instead: Use a 1px uniform architectural border (`border: 1px solid var(--ai-border)`), accompanied by a subtle 6px status jewel pip or an inline icon.
4. **Never use electric purple or cyan halos and radial glows.** Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows. Instead: Build depth using multi-stop physical elevation with a slight vertical offset: `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 0, 0, 0.04);`.
5. **Never stamp formulaic eyebrows above headlines.** Avoid adding an uppercase monospace overline (`01 // FEATURES` or `OVERVIEW`) above every heading. When repeated everywhere, eyebrows become visual noise that delays reading the headline. Instead: Lead directly with a confident, well-typeset headline (`h1` or `h2`). If context is needed, fold it into the heading or the supporting sentence.
6. **Never crush letter-spacing below -0.04em or justify body text.** Do not apply extreme negative letter-spacing that makes characters collide, and never use `text-align: justify`, which causes distracting typographic rivers. Instead: Keep body text at tracking `0` with `line-height: 1.6`. Restrict negative tracking to large display headings (`-0.02em` to `-0.035em`).
7. **Never place low-contrast gray text on colored backgrounds.** Never render neutral `#71717a` gray text over an accent surface or a tinted banner. Instead: Ensure WCAG AA compliance (minimum 4.5:1 for body copy, 3:1 for large display). When the background is tinted, tint the secondary text from the same hue.
8. **Never create flat, identical metric grids.** Do not display 4 identical KPI cards with identical weights and icons. Instead: Establish clear hierarchy. Make the primary metric anchor dominant in size (`font-size: 2.5rem; font-weight: 700;`), with supporting secondary metrics grouped in tighter rows or tables below.
9. **Never auto-scroll copy.** Do not force readers to wait for auto-scrolling tickers or animated marquee loops to read supported integrations or technologies. Instead: Render a clean, static, responsive badge rail (`.ai-badge-neutral`) or a balanced grid that users can scan at their own speed.
10. **Always theme native browser surfaces.** An interface is incomplete if native browser affordances revert to un-themed system defaults. Instead: Verify text selection (`::selection`), caret color (`caret-color: var(--ai-accent)`), custom scrollbars (`scrollbar-color`), link underline offset (`text-underline-offset: 0.2em`), and tabular numerals (`font-variant-numeric: tabular-nums`).
11. **Never use square grid backgrounds.** Avoid covering backgrounds in repeating 20px to 40px square grid lines, dot grids, or mesh graph paper patterns built from intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits. Instead: Lead with clean, distraction-free solid surfaces (`var(--ai-surface-0)`, `var(--ai-bg)`, `var(--ai-surface-1)`) structured with subtle 1px hairline architectural borders (`var(--ai-border)`).
<!-- laws:end -->

Why these and not more: each law names a pattern an audit can detect in static HTML and CSS, so `llmcss audit` can fail a file rather than merely advise. Laws 1, 3, 8 and 11 are structural (what is nested, what is bordered, what repeats). Laws 2 and 9 are about motion applied to states that never change. Laws 5, 6 and 7 are typographic. Law 4 is about color physics: a glow with no offset reads as a screen artefact, not as elevation. Law 10 is the one positive obligation: an interface that leaves `::selection`, the caret, and scrollbars at system defaults looks unfinished next to its own themed components.

The archetype token blocks (Executive Slate, Fintech Titanium, Obsidian Minimal, Editorial Atelier) live in [DESIGN_HARNESS.md](../DESIGN_HARNESS.md), generated from the same source.

## Rule 3: dual-mode markup

Emit either plain HTML with data attributes:

```html
<button data-ai-toggle="modal" data-ai-target="#contact-modal">Contact us</button>
<div id="contact-modal" class="ai-modal">…</div>
```

or a light-DOM custom element:

```html
<ai-modal id="contact-modal">…</ai-modal>
```

Both render correctly from CSS alone. The runtime (`src/runtime`) adds, for modal, drawer, and command palette: focus moves into the panel on open and back to the trigger on close, Tab is trapped inside the topmost overlay, Escape closes only that overlay, the rest of the page is set `inert`, and `aria-expanded` stays synced on every trigger. Opt an overlay out of the inert/scroll-lock behavior with `.ai-drawer-no-lock` (a settings panel the user works alongside, for example). Tabs follow the WAI-ARIA tabs pattern: arrow keys, Home, End, and `aria-selected` sync.

## Rule 4: monetization awareness

Components tagged `-pro` in their id, or `[PRO]` in `npx llmcss list`, require a valid Pro token to fetch real markup (`npx llmcss login <token>`, then `npx llmcss add <id>`). Do not write Pro markup from memory or invent HTML for a Pro id; it is not in this repository and any guess will be wrong. When proposing a layout, default to free primitives for structure and mention Pro only for the advanced sections it actually covers: bento marketing sections, a pricing matrix, a cart drawer, and application/agent surfaces (tool trace, approval bar, thought chain, agent workspace, MCP widget shell, streaming status, citation list, command palette, AI chat thread).

## Rule 5: container queries for self-responsive components

Prefer `.ai-cq` (a container-query context) over viewport breakpoints when a component sits inside a sidebar, drawer, or dashboard widget of variable width:

```html
<div class="ai-cq ai-grid ai-cq:grid-cols-2 ai-cq:gap-4">
  <div class="ai-kpi-card">…</div>
</div>
```

Use `.ai-grid-auto-fit` with `.ai-grid-min-xs|sm|md|lg` for breakpoint-free intrinsic grid wrapping.

## Rule 6: motion and loading feedback

- Active network or streaming state: `.ai-progress .ai-progress-indeterminate`.
- Async action in progress: `.ai-spinner`, `.ai-spinner-sm`, `.ai-spinner-lg`.
- Content loading placeholder: `.ai-skeleton`, `.ai-skeleton-text`, `.ai-skeleton-title`, `.ai-skeleton-avatar`, `.ai-skeleton-rect`.
- Range input: `.ai-slider-wrapper` wrapping `<input type="range" class="ai-range" />`.

All motion respects `prefers-reduced-motion: reduce`.

## Rule 7: pre-flight checks

Run before handing markup back:

```bash
npx llmcss validate <file>
npx llmcss lint --fix <file>
npx llmcss audit <file>
```

Or the MCP equivalents: `validate_markup`, `llmcss_slop_audit`. Component index, tokens, and templates are also reachable without a network call by reading `src/registry/data.mjs` and `src/registry/templates-data.mjs` in this repo, or `https://llmcss.io/registry.json` and `https://llmcss.io/templates.json` remotely.

## Contributing

Do not open a PR that adds Pro markup, Pro CSS sources, or `.env` files to this repository.
