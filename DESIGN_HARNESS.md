# LLMCSS Design Direction Harness
*A Human-Craft Design Operating System for Autonomous AI Coding Agents*

The LLMCSS Design Direction Harness eliminates the generic "AI look" (puffy gradients, nested card bento bloat, continuous pulsing dots, and formulaic uppercase eyebrows). It equips AI agents with opinionated, production-grade design directions and eleven deterministic quality laws.

- The class universe: [AGENTS.md](AGENTS.md). Classes carry no prefix (`btn`, not `ai-btn`); a class that is not in [classes.json](https://llmcss.io/classes.json) does not exist.
- Theming attributes (`data-ai-theme`, `data-ai-skin`, `data-ai-density`, `data-ai-focus`) are tabled in [AGENTS.md](AGENTS.md). Accent is a separate axis: `data-ai-accent="emerald|violet|rose|teal|steel|amber"` sets only the accent tokens and composes with any skin, while `data-ai-skin="emerald|violet|rose"` is a deprecated alias of the accent of the same name and goes away in 1.0.
- Self-check commands: `npx llmcss validate <file>` and `npx llmcss audit <file>`, both documented in [AGENTS.md](AGENTS.md). Each exits 1 on any finding.

Library totals, generated from the manifests in public/:

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

---

## 1. The eleven non-negotiable anti-slop laws

Every AI coding agent generating interfaces with LLMCSS must comply with all eleven laws. This section is generated from `src/registry/laws.mjs` by `node src/registry/build-docs.mjs`. Edit the laws there, not here.

<!-- laws:start -->
### Law 1: Never nest containers
Do not put a bordered container inside another bordered container. The audit walks the tag stack and flags every `.card`, `.panel` or `.kpi-card` that sits inside another `.card`, `.panel` or `.kpi-card`. Nested boxes waste screen real estate and create dizzying visual layers.
- Instead: Use generous whitespace (`--ai-space-6`), subtle hairline rules (`<hr class="divider">`), or distinct background shifts (`var(--ai-surface-1)`).

### Law 2: Never pulse static status pips
Never attach continuous breathing or pulsing animations to steady states like "System Normal", "Online", or "Completed". The audit flags the class tokens `animate-pulse`, `pulse`, `animate-ping`, `ping`, `breathe`, `blink` and `animate-bounce`, and any inline `animation:` value containing `pulse`, `ping`, `breathe`, `blink` or `glow`, unless the document also carries `is-streaming`. Flashing elements demand attention when nothing has changed.
- Instead: Render a calm, static jewel pip with `.status-pip` and `box-shadow: 0 0 0 2px color-mix(...)`. Reserve `.status-pip.is-streaming` strictly for ongoing inference or active data transmission.

### Law 3: Never use colored left-stripe borders
Do not place thick 3px to 5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention.
- Instead: Use a 1px uniform architectural border (`border: 1px solid var(--ai-border)`), accompanied by a subtle 6px status jewel pip or an inline icon.

### Law 4: Never use electric purple or cyan halos and radial glows
Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows.
- Instead: Build depth using multi-stop physical elevation with a slight vertical offset: `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 0, 0, 0.04);`.

### Law 5: Never stamp formulaic eyebrows above headlines
Do not stamp a badge or a pill above a heading as an eyebrow, and do not repeat an uppercase monospace overline (`01 // FEATURES`, `OVERVIEW`) over every section. The audit flags a `span` or `div` carrying `.badge` or `.hero-badge` that is followed by an `h1` to `h4` within the next few lines, with `.product-badge-float` the only exemption. Repeated eyebrows become visual noise that delays reading the headline.
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
- Instead: Render a clean, static, responsive badge rail (`.badge-neutral`) or a balanced grid that users can scan at their own speed.

### Law 10: Always theme native browser surfaces
An interface is incomplete if native browser affordances revert to un-themed system defaults.
- Instead: Verify text selection (`::selection`), caret color (`caret-color: var(--ai-accent)`), custom scrollbars (`scrollbar-color`), link underline offset (`text-underline-offset: 0.2em`), and tabular numerals (`font-variant-numeric: tabular-nums`).

### Law 11: Never use square grid backgrounds
Avoid covering backgrounds in repeating 20px to 40px square grid lines, dot grids, or mesh graph paper patterns built from intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits.
- Instead: Lead with clean, distraction-free solid surfaces (`var(--ai-surface-0)`, `var(--ai-bg)`, `var(--ai-surface-1)`) structured with subtle 1px hairline architectural borders (`var(--ai-border)`).

### Law 12: Never paint state without announcing it
Do not mark a control as active, open, selected or pressed with a class and a colour alone. A segmented control whose current view carries only `is-active`, an accordion trigger with no `aria-expanded`, a toast that arrives outside any live region: each one looks correct and says nothing. A screen reader reads an undifferentiated list of buttons.
- Instead: Mirror every `is-*` state on an interactive element with the ARIA attribute that carries it: `aria-pressed` on segmented and filter buttons wrapped in a labelled `role="group"`, `aria-expanded` plus `aria-controls` on disclosure and accordion triggers, `aria-selected` on tabs, `aria-current` on the active nav link, and `role="status" aria-live="polite"` (or `role="alert"` for a failure) on anything that appears unprompted.
<!-- laws:end -->

---

## 2. The four design direction archetypes

When starting a project or generating new UI, select one of these four curated archetypes rather than defaulting to generic dark SaaS templates. A fifth full skin, `enterprise`, ships in the CSS but is not an archetype. This section is generated from `src/registry/laws.mjs`.

<!-- archetypes:start -->
### Archetype A: Executive Slate
- **Vibe:** High-density, disciplined engineering workspace, precision data tools.
- **Attributes:** Cool slate grays, 3px architectural radius (`--ai-radius-sm`, the only skin that is not 2px), razor-sharp hairline borders, blue #2563eb accent in light mode and sky #38bdf8 in dark.
- **Attribute selector:** `[data-ai-skin="executive"]`
- **CSS root variables:**
```css
[data-ai-skin="executive"] {
  --ai-radius-base: var(--ai-radius-sm);
}
:root[data-ai-theme="light"][data-ai-skin="executive"] {
  --ai-bg: #f8fafc;
  --ai-surface-0: #ffffff;
  --ai-surface-1: #f1f5f9;
  --ai-surface-2: #e2e8f0;
  --ai-surface-3: #cbd5e1;
  --ai-text-primary: #0f172a;
  --ai-text-secondary: #475569;
  --ai-text-muted: #64748b;
  --ai-border: rgba(15, 23, 42, 0.1);
  --ai-border-subtle: rgba(15, 23, 42, 0.05);
  --ai-border-hover: rgba(15, 23, 42, 0.2);
  --ai-border-strong: rgba(15, 23, 42, 0.25);
  --ai-primary: #0f172a;
  --ai-primary-hover: #1e293b;
  --ai-primary-text: #ffffff;
  --ai-accent: #2563eb;
  --ai-accent-hover: #1d4ed8;
  --ai-accent-subtle: rgba(37, 99, 235, 0.08);
  --ai-accent-rgb: 37, 99, 235;
}
:root[data-ai-theme="dark"][data-ai-skin="executive"] {
  --ai-bg: #090d16;
  --ai-surface-0: #0f172a;
  --ai-surface-1: #172033;
  --ai-surface-2: #1e293b;
  --ai-surface-3: #334155;
  --ai-text-primary: #f8fafc;
  --ai-text-secondary: #94a3b8;
  --ai-text-muted: #64748b;
  --ai-border: rgba(255, 255, 255, 0.09);
  --ai-border-subtle: rgba(255, 255, 255, 0.04);
  --ai-border-hover: rgba(255, 255, 255, 0.18);
  --ai-border-strong: rgba(255, 255, 255, 0.22);
  --ai-primary: #f8fafc;
  --ai-primary-hover: #ffffff;
  --ai-primary-text: #090d16;
  --ai-accent: #38bdf8;
  --ai-accent-text: #082f49;
  --ai-accent-hover: #7dd3fc;
  --ai-accent-subtle: rgba(56, 189, 248, 0.12);
  --ai-accent-rgb: 56, 189, 248;
}
```

### Archetype B: Fintech Titanium
- **Vibe:** Regulated financial intelligence, institutional security, high clarity.
- **Attributes:** Warm stone neutrals, 2px radius (`--ai-radius-xs`), deep teal #0f766e accent in light mode and #2dd4bf in dark, generous white space. Status colors are the library defaults, not per-skin overrides.
- **Attribute selector:** `[data-ai-skin="fintech"]`
- **CSS root variables:**
```css
[data-ai-skin="fintech"] {
  --ai-radius-base: var(--ai-radius-xs);
}
:root[data-ai-theme="light"][data-ai-skin="fintech"] {
  --ai-bg: #f8f8f6;
  --ai-surface-0: #ffffff;
  --ai-surface-1: #f2f1ee;
  --ai-surface-2: #e7e5e1;
  --ai-surface-3: #d6d3cd;
  --ai-text-primary: #1c1917;
  --ai-text-secondary: #57534e;
  --ai-text-muted: #78716c;
  --ai-border: rgba(28, 25, 23, 0.1);
  --ai-border-subtle: rgba(28, 25, 23, 0.05);
  --ai-border-hover: rgba(28, 25, 23, 0.2);
  --ai-border-strong: rgba(28, 25, 23, 0.25);
  --ai-primary: #1c1917;
  --ai-primary-hover: #292524;
  --ai-primary-text: #fbfaf8;
  --ai-accent: #0f766e;
  --ai-accent-hover: #115e59;
  --ai-accent-subtle: rgba(15, 118, 110, 0.09);
  --ai-accent-rgb: 15, 118, 110;
}
:root[data-ai-theme="dark"][data-ai-skin="fintech"] {
  --ai-bg: #0c0a09;
  --ai-surface-0: #141210;
  --ai-surface-1: #1c1917;
  --ai-surface-2: #292524;
  --ai-surface-3: #44403c;
  --ai-text-primary: #fafaf9;
  --ai-text-secondary: #a8a29e;
  --ai-text-muted: #78716c;
  --ai-border: rgba(250, 250, 249, 0.09);
  --ai-border-subtle: rgba(250, 250, 249, 0.04);
  --ai-border-hover: rgba(250, 250, 249, 0.18);
  --ai-border-strong: rgba(250, 250, 249, 0.22);
  --ai-primary: #fafaf9;
  --ai-primary-hover: #ffffff;
  --ai-primary-text: #0c0a09;
  --ai-accent: #2dd4bf;
  --ai-accent-text: #042f2e;
  --ai-accent-hover: #5eead4;
  --ai-accent-subtle: rgba(45, 212, 191, 0.14);
  --ai-accent-rgb: 45, 212, 191;
}
```

### Archetype C: Obsidian Minimal
- **Vibe:** Monochrome minimalist console, brutalist restraint, developer-first, in both light and dark.
- **Attributes:** Alabaster #fbfbfb in light mode and pitch black #000000 in dark, monochrome near-black or near-white accents (`#18181b` light, `#f5f5f5` dark), 2px sharp radius (`--ai-radius-xs`).
- **Attribute selector:** `[data-ai-skin="obsidian"]`
- **CSS root variables:**
```css
[data-ai-skin="obsidian"] {
  --ai-radius-base: var(--ai-radius-xs);
}
:root[data-ai-theme="light"][data-ai-skin="obsidian"] {
  --ai-bg: #fbfbfb;
  --ai-surface-0: #ffffff;
  --ai-surface-1: #f4f4f5;
  --ai-surface-2: #e4e4e7;
  --ai-surface-3: #d4d4d8;
  --ai-text-primary: #09090b;
  --ai-text-secondary: #52525b;
  --ai-text-muted: #71717a;
  --ai-border: rgba(9, 9, 11, 0.08);
  --ai-border-subtle: rgba(9, 9, 11, 0.04);
  --ai-border-strong: rgba(9, 9, 11, 0.16);
  --ai-primary: #09090b;
  --ai-primary-hover: #27272a;
  --ai-primary-text: #ffffff;
  --ai-accent: #18181b;
  --ai-accent-hover: #09090b;
}
:root[data-ai-theme="dark"][data-ai-skin="obsidian"] {
  --ai-bg: #000000;
  --ai-surface-0: #0a0a0a;
  --ai-surface-1: #141414;
  --ai-surface-2: #1e1e1e;
  --ai-surface-3: #2d2d2d;
  --ai-text-primary: #ededed;
  --ai-text-secondary: #9a9a9a;
  --ai-text-muted: #7a7a7a;
  --ai-border: rgba(255, 255, 255, 0.12);
  --ai-border-subtle: rgba(255, 255, 255, 0.06);
  --ai-border-strong: rgba(255, 255, 255, 0.22);
  --ai-primary: #ffffff;
  --ai-primary-hover: #e5e5e5;
  --ai-primary-text: #000000;
  --ai-accent: #f5f5f5;
  --ai-accent-text: #09090b;
  --ai-accent-hover: #ffffff;
}
```

### Archetype D: Editorial Atelier
- **Vibe:** High-craft publication, thoughtful essay, luxury studio, timeless typography.
- **Attributes:** Warm ivory paper substrate, terracotta #8c4a27 accent in light mode and #c48259 in dark, crisp hairline borders, 2px radius (`--ai-radius-xs`), asymmetric rhythm, zero bento card clutter. Serif display type is a page choice, not a token this skin sets.
- **Attribute selector:** `[data-ai-skin="editorial"]`
- **CSS root variables:**
```css
[data-ai-skin="editorial"] {
  --ai-radius-base: var(--ai-radius-xs);
}
:root[data-ai-theme="light"][data-ai-skin="editorial"] {
  --ai-bg: #faf7f2;
  --ai-surface-0: #ffffff;
  --ai-surface-1: #f3efe6;
  --ai-surface-2: #e8e2d5;
  --ai-surface-3: #d9d1c0;
  --ai-text-primary: #26211c;
  --ai-text-secondary: #574f46;
  --ai-text-muted: #877d71;
  --ai-border: rgba(38, 33, 28, 0.12);
  --ai-border-subtle: rgba(38, 33, 28, 0.06);
  --ai-border-strong: rgba(38, 33, 28, 0.22);
  --ai-primary: #26211c;
  --ai-primary-hover: #3b342c;
  --ai-primary-text: #faf7f2;
  --ai-accent: #8c4a27;
  --ai-accent-hover: #733c1f;
  --ai-accent-subtle: rgba(140, 74, 39, 0.1);
}
:root[data-ai-theme="dark"][data-ai-skin="editorial"] {
  --ai-bg: #161412;
  --ai-surface-0: #1d1a17;
  --ai-surface-1: #282420;
  --ai-surface-2: #38322c;
  --ai-surface-3: #4a433b;
  --ai-text-primary: #f2ede4;
  --ai-text-secondary: #b8aea0;
  --ai-text-muted: #857b6e;
  --ai-border: rgba(242, 237, 228, 0.1);
  --ai-border-strong: rgba(242, 237, 228, 0.2);
  --ai-primary: #f2ede4;
  --ai-primary-hover: #ffffff;
  --ai-primary-text: #161412;
  --ai-accent: #c48259;
  --ai-accent-hover: #d4956d;
}
```
<!-- archetypes:end -->

---

## 3. Agent prompt directives

Use [AGENTS.md](AGENTS.md) as the drop-in system prompt. It carries the same eleven laws, generated from the same source, plus the manifest links, the runtime rules, and the pre-flight commands. Do not paste a hand-shortened law list into a prompt: partial lists have drifted before.

One rule only matters at prompt time: choose a deliberate archetype before writing markup, rather than defaulting to generic dark SaaS styling.

---

## 4. Component composition guidelines

- **Buttons:** Use `.btn .btn-primary` for the single primary call to action. Use `.btn .btn-outline` or `.btn .btn-ghost` for secondary actions. Use decisive action verbs ("Export Telemetry", "Deploy Service", not "Continue" or "Click here").
- **Metrics:** Always wrap numbers in `<span class="kpi-value">` with `font-variant-numeric: tabular-nums`.
