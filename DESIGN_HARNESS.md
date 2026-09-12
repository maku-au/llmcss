# LLMCSS Design Direction Harness
*A Human-Craft Design Operating System for Autonomous AI Coding Agents*

The LLMCSS Design Direction Harness eliminates the generic "AI look" (puffy gradients, nested card bento bloat, continuous pulsing dots, and formulaic uppercase eyebrows). It equips AI agents with opinionated, production-grade design directions and eleven deterministic quality laws.

---

## 1. The eleven non-negotiable anti-slop laws

Every AI coding agent generating interfaces with LLMCSS must comply with all eleven laws. This section is generated from `src/registry/laws.mjs` by `node src/registry/build-docs.mjs`. Edit the laws there, not here.

<!-- laws:start -->
### Law 1: Never nest containers
Do not put a bordered card inside another bordered card. Nested boxes waste screen real estate and create dizzying visual layers.
- Instead: Use generous whitespace (`--ai-space-6`), subtle hairline rules (`<hr class="ai-divider">`), or distinct background shifts (`var(--ai-surface-1)`).

### Law 2: Never pulse static status pips
Never attach continuous breathing or pulsing animations (`@keyframes pulse`) to steady states like "System Normal", "Online", or "Completed". Flashing elements demand attention when nothing has changed.
- Instead: Render a calm, static jewel pip with `.ai-status-pip` and `box-shadow: 0 0 0 2px color-mix(...)`. Reserve `.ai-status-pip.is-streaming` strictly for ongoing inference or active data transmission.

### Law 3: Never use colored left-stripe borders
Do not place thick 3px to 5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention.
- Instead: Use a 1px uniform architectural border (`border: 1px solid var(--ai-border)`), accompanied by a subtle 6px status jewel pip or an inline icon.

### Law 4: Never use electric purple or cyan halos and radial glows
Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows.
- Instead: Build depth using multi-stop physical elevation with a slight vertical offset: `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 0, 0, 0.04);`.

### Law 5: Never stamp formulaic eyebrows above headlines
Avoid adding an uppercase monospace overline (`01 // FEATURES` or `OVERVIEW`) above every heading. When repeated everywhere, eyebrows become visual noise that delays reading the headline.
- Instead: Lead directly with a confident, well-typeset headline (`h1` or `h2`). If context is needed, fold it into the heading or the supporting sentence.

### Law 6: Never crush letter-spacing below -0.04em or justify body text
Do not apply extreme negative letter-spacing that makes characters collide, and never use `text-align: justify`, which causes distracting typographic rivers.
- Instead: Keep body text at tracking `0` with `line-height: 1.6`. Restrict negative tracking to large display headings (`-0.02em` to `-0.035em`).

### Law 7: Never place low-contrast gray text on colored backgrounds
Never render neutral `#71717a` gray text over an accent surface or a tinted banner.
- Instead: Ensure WCAG AA compliance (minimum 4.5:1 for body copy, 3:1 for large display). When the background is tinted, tint the secondary text from the same hue.

### Law 8: Never create flat, identical metric grids
Do not display 4 identical KPI cards with identical weights and icons.
- Instead: Establish clear hierarchy. Make the primary metric anchor dominant in size (`font-size: 2.5rem; font-weight: 700;`), with supporting secondary metrics grouped in tighter rows or tables below.

### Law 9: Never auto-scroll copy
Do not force readers to wait for auto-scrolling tickers or animated marquee loops to read supported integrations or technologies.
- Instead: Render a clean, static, responsive badge rail (`.ai-badge-neutral`) or a balanced grid that users can scan at their own speed.

### Law 10: Always theme native browser surfaces
An interface is incomplete if native browser affordances revert to un-themed system defaults.
- Instead: Verify text selection (`::selection`), caret color (`caret-color: var(--ai-accent)`), custom scrollbars (`scrollbar-color`), link underline offset (`text-underline-offset: 0.2em`), and tabular numerals (`font-variant-numeric: tabular-nums`).

### Law 11: Never use square grid backgrounds
Avoid covering backgrounds in repeating 20px to 40px square grid lines, dot grids, or mesh graph paper patterns built from intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits.
- Instead: Lead with clean, distraction-free solid surfaces (`var(--ai-surface-0)`, `var(--ai-bg)`, `var(--ai-surface-1)`) structured with subtle 1px hairline architectural borders (`var(--ai-border)`).
<!-- laws:end -->

---

## 2. The four design direction archetypes

When starting a project or generating new UI, select one of these four curated archetypes rather than defaulting to generic dark SaaS templates. A fifth full skin, `enterprise`, ships in the CSS but is not an archetype. This section is generated from `src/registry/laws.mjs`.

<!-- archetypes:start -->
### Archetype A: Executive Slate
- **Vibe:** High-density, disciplined engineering workspace, precision data tools.
- **Attributes:** Cool slate grays, 4px architectural radius, razor-sharp 1px borders, tabular numerals.
- **Attribute selector:** `[data-ai-skin="executive"]`
- **CSS root variables:**
```css
:root[data-ai-skin="executive"] {
  --ai-font-sans: 'IBM Plex Sans', system-ui, sans-serif;
  --ai-font-display: 'Sora', 'IBM Plex Sans', sans-serif;
  --ai-font-mono: 'IBM Plex Mono', monospace;
  --ai-radius-base: 4px;
  --ai-radius-md: 4px;
  --ai-radius-lg: 6px;
  --ai-accent: #2563eb;
  --ai-accent-rgb: 37, 99, 235;
  --ai-bg: #f8fafc;
  --ai-surface-0: #ffffff;
  --ai-surface-1: #f1f5f9;
  --ai-border: rgba(15, 23, 42, 0.08);
  --ai-border-strong: rgba(15, 23, 42, 0.18);
}
:root[data-ai-skin="executive"][data-ai-theme="dark"] {
  --ai-bg: #09090b;
  --ai-surface-0: #0f172a;
  --ai-surface-1: #1e293b;
  --ai-border: rgba(248, 250, 252, 0.08);
  --ai-border-strong: rgba(248, 250, 252, 0.18);
}
```

### Archetype B: Fintech Titanium
- **Vibe:** Regulated financial intelligence, institutional security, high clarity.
- **Attributes:** Warm stone neutrals, 6px radius, emerald and teal accents, generous white space, high-legibility sans.
- **Attribute selector:** `[data-ai-skin="fintech"]`
- **CSS root variables:**
```css
:root[data-ai-skin="fintech"] {
  --ai-font-sans: 'DM Sans', system-ui, sans-serif;
  --ai-font-display: 'DM Sans', system-ui, sans-serif;
  --ai-radius-base: 6px;
  --ai-radius-md: 6px;
  --ai-radius-lg: 8px;
  --ai-accent: #0f766e;
  --ai-accent-rgb: 15, 118, 110;
  --ai-success: #059669;
  --ai-bg: #f8f8f6;
  --ai-surface-0: #ffffff;
  --ai-surface-1: #f3f3f0;
  --ai-border: rgba(28, 25, 23, 0.08);
  --ai-border-strong: rgba(28, 25, 23, 0.16);
}
:root[data-ai-skin="fintech"][data-ai-theme="dark"] {
  --ai-bg: #0c0d0e;
  --ai-surface-0: #141618;
  --ai-surface-1: #1c1e22;
  --ai-border: rgba(245, 245, 244, 0.08);
  --ai-border-strong: rgba(245, 245, 244, 0.16);
}
```

### Archetype C: Obsidian Minimal
- **Vibe:** Pure dark-mode minimalist console, brutalist restraint, developer-first.
- **Attributes:** Pitch-black background (`#000000`), stark white accents (`#ffffff`), 0px to 2px sharp radii, monospace accents.
- **Attribute selector:** `[data-ai-skin="obsidian"]`
- **CSS root variables:**
```css
:root[data-ai-skin="obsidian"] {
  --ai-font-display: 'Sora', sans-serif;
  --ai-font-sans: 'DM Sans', system-ui, sans-serif;
  --ai-font-mono: 'IBM Plex Mono', monospace;
  --ai-radius-base: 2px;
  --ai-radius-md: 2px;
  --ai-radius-lg: 4px;
  --ai-accent: #ededed;
  --ai-accent-rgb: 237, 237, 237;
  --ai-bg: #000000;
  --ai-surface-0: #0a0a0a;
  --ai-surface-1: #141414;
  --ai-border: #27272a;
  --ai-border-strong: #3f3f46;
}
```

### Archetype D: Editorial Atelier
- **Vibe:** High-craft publication, thoughtful essay, luxury studio, timeless typography.
- **Attributes:** Warm paper substrate, Newsreader serif display headlines, crisp hairline borders, asymmetric rhythm, zero bento card clutter.
- **Attribute selector:** `[data-ai-skin="editorial"]`
- **CSS root variables:**
```css
:root[data-ai-skin="editorial"] {
  --ai-font-serif: 'Newsreader', Georgia, serif;
  --ai-font-display: 'Newsreader', Georgia, serif;
  --ai-font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --ai-radius-base: 3px;
  --ai-radius-md: 4px;
  --ai-radius-lg: 6px;
  --ai-accent: #8c4a27;
  --ai-accent-rgb: 140, 74, 39;
  --ai-bg: #faf8f5;
  --ai-surface-0: #ffffff;
  --ai-surface-1: #f4eee6;
  --ai-border: rgba(41, 37, 36, 0.1);
  --ai-border-strong: rgba(41, 37, 36, 0.2);
}
:root[data-ai-skin="editorial"][data-ai-theme="dark"] {
  --ai-bg: #141210;
  --ai-surface-0: #1a1715;
  --ai-surface-1: #24201c;
  --ai-border: rgba(244, 238, 230, 0.08);
  --ai-border-strong: rgba(244, 238, 230, 0.18);
}
```
<!-- archetypes:end -->

---

## 3. Agent prompt directives

Use [AGENTS.md](AGENTS.md) as the drop-in system prompt. It carries the same eleven laws, generated from the same source, plus the manifest links, the runtime rules, and the pre-flight commands. Do not paste a hand-shortened law list into a prompt: partial lists have drifted before.

Two rules that only matter at prompt time:

- Build UI from LLMCSS semantic classes (`.ai-btn`, `.ai-input`, `.ai-card`, `.ai-table`, `.ai-cq`, `.ai-badge`). Never emit an unprefixed or Tailwind-style utility when LLMCSS provides the primitive.
- Choose a deliberate archetype before writing markup, rather than defaulting to generic dark SaaS styling.

---

## 4. Component composition guidelines

- **Buttons:** Use `.ai-btn .ai-btn-primary` for the single primary call to action. Use `.ai-btn .ai-btn-outline` or `.ai-btn .ai-btn-ghost` for secondary actions. Use decisive action verbs ("Export Telemetry", "Deploy Service", not "Continue" or "Click here").
- **Metrics:** Always wrap numbers in `<span class="ai-kpi-value">` with `font-variant-numeric: tabular-nums`.
- **Responsive Layouts:** Wrap adaptable panels in `<div class="ai-cq">` to use container queries instead of media queries.
- **Modal Dialogs:** Ensure `<ai-modal>` or `.ai-modal` includes clear close affordances (backdrop dismiss, `ai-modal-close` button, and Escape key handling).
