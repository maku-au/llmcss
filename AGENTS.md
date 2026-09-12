# LLMCSS agent rules

Drop this file into a system prompt or editor rule when generating UI with LLMCSS.

## Stack

- Pure native CSS, no build step, layers `reset, tokens, base, components, utilities`. Every class is prefixed `ai-` (`ai-btn`, `ai-card`, `ai-grid`, `ai-modal`). Never emit an unprefixed utility (`flex`, `btn`, `card`).
- 1176 classes and 82 `--ai-*` tokens exist. If a class is not in `classes.json`, it does not exist: do not invent one.
- Theme `data-ai-theme="light|dark"` and skin `data-ai-skin="obsidian|editorial|executive|fintech|enterprise|emerald|violet|rose"` on `<html>` or any container. Dark mode never activates from the OS setting; set the attribute yourself.
- 106 components (93 free, 13 Pro), 18 wireframe section templates, 4 page blueprints.

## Manifests, generated from the CSS

- `https://llmcss.io/classes.json`: every `ai-*` class, its family, and which `ai-sm:`, `ai-md:`, `ai-lg:`, `ai-xl:`, `ai-cq:` prefixes exist for it.
- `https://llmcss.io/tokens.json`: every `--ai-*` token with its value per light, dark, skin, and focus preset.
- `https://llmcss.io/states.json`: every `is-*` state class and every `data-ai-*` attribute with allowed values.
- `https://llmcss.io/registry.json` and `https://llmcss.io/r/{id}.json`: component catalog and free component HTML.
- `https://llmcss.io/templates.json`: wireframe sections and page blueprints. MCP tools `list_classes`, `list_tokens`, `list_states` return the same data.

## Runtime

- Add `<script src="https://llmcss.io/llmcss.js" defer></script>` once per page only for `data-ai-toggle`, `data-ai-dismiss`, `data-ai-tab`, or the `<ai-*>` custom elements. Everything else is CSS-only.
- Modal and drawer: the toggle carries `data-ai-target="#id"`; the target holds an `.ai-modal-backdrop` or `.ai-drawer-backdrop` plus an `.ai-modal-box` or `.ai-drawer-panel`.
- Dropdown toggle sits inside `.ai-dropdown`; accordion toggle inside `.ai-accordion-item`; tabs are `button.ai-tab[data-ai-tab="#panel"]` inside `.ai-tabs`.
- Open state is the `open` attribute and the `.is-open` class interchangeably (tabs use `.is-active` plus `aria-selected`); write either one in static markup.

## Anti-slop laws

Generated from `src/registry/laws.mjs`. Do not edit this list by hand.

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

Full rationale: [docs/AGENT_RULES.md](docs/AGENT_RULES.md). Archetype token blocks: [DESIGN_HARNESS.md](DESIGN_HARNESS.md).

## Before you emit code

```bash
npx llmcss validate <file>         # catch non ai- classes
npx llmcss lint --fix <file>       # auto-prefix common misses
npx llmcss audit <file>            # run the anti-slop checks above
```

MCP equivalents: `validate_markup`, `llmcss_slop_audit`.

## Pro

Pro ids carry `tier: "pro"` in `registry.json` with `locked: true` and `html: null`. Never write Pro markup from memory; it is not in this repository and any guess will be wrong. `npx llmcss add <pro-id>` exits 1 with a login hint until the user runs `npx llmcss login <token>`; the CLI then fetches `GET /r/pro/{id}.json` with `Authorization: Bearer <token>`. The MCP tool `get_component_markup` returns `{ locked: true, html: null, message }` for a Pro id without a token.
