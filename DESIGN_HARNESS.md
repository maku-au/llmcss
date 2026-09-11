# LLMCSS Design Direction Harness
*A Human-Craft Design Operating System for Autonomous AI Coding Agents*

The LLMCSS Design Direction Harness eliminates the generic "AI look" (puffy gradients, nested card bento bloat, continuous pulsing dots, and formulaic uppercase eyebrows). It equips AI agents with opinionated, production-grade design directions and deterministic quality laws.

---

## 1. The 10 Non-Negotiable Anti-Slop Laws

Every AI coding agent generating interfaces with LLMCSS must strictly comply with these ten laws:

### Law 1: Never Nest Containers (Eliminate "Cardocalypse")
Do not put a bordered card inside another bordered card. Nested boxes waste screen real estate and create dizzying visual layers.
- **Instead:** Use generous whitespace (`--ai-space-6`), subtle hairline rules (`<hr class="ai-divider">`), or distinct background shifts (`var(--ai-surface-1)`).

### Law 2: Never Pulse Static Status Pips
Never attach continuous breathing or pulsing animations (`@keyframes pulse`) to steady states like "System Normal", "Online", or "Completed". Flashing elements demand attention when nothing has changed.
- **Instead:** Render a calm, static jewel pip with `.ai-status-pip` and `box-shadow: 0 0 0 2px color-mix(...)`. Reserve `.ai-status-pip.is-streaming` strictly for ongoing inference or active data transmission.

### Law 3: Never Use Colored Left-Stripe Borders (Side-Tab Cards)
Do not place thick 3px-5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention.
- **Instead:** Use a 1px uniform architectural border (`border: 1px solid var(--ai-border)`), accompanied by a subtle 6px status jewel pip or an inline icon.

### Law 4: Never Use Electric Purple/Cyan Halos or Radial Glows
Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows.
- **Instead:** Build depth using multi-stop physical elevation with slight vertical offset:
  `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 0, 0, 0.04);`

### Law 5: Never Stamp Formulaic Eyebrows Above Headlines
Avoid adding an uppercase monospace overline (`01 // FEATURES` or `OVERVIEW`) above every heading. When repeated everywhere, eyebrows become visual noise that delays reading the headline.
- **Instead:** Lead directly with a confident, well-typeset headline (`h1` or `h2`). If context is needed, fold it into the heading or supporting sentence.

### Law 6: Never Crush Letter-Spacing Below -0.04em or Justify Body Text
Do not apply extreme negative letter-spacing that makes characters collide, and never use `text-align: justify` which causes distracting typographic rivers.
- **Instead:** Keep body text at tracking `0` with `line-height: 1.6`. Restrict negative tracking to large display headings (`-0.02em` to `-0.035em`).

### Law 7: Never Place Low-Contrast Gray Text on Colored Backgrounds
Never render neutral `#71717a` gray text over an accent surface or tinted banner.
- **Instead:** Ensure WCAG AA compliance (minimum 4.5:1 for body copy, 3:1 for large display). When the background is tinted, tint the secondary text from the same hue.

### Law 8: Never Create Flat, Identical Metric Grids
Do not display 4 identical KPI cards with identical weights and icons.
- **Instead:** Establish clear hierarchy. Make the primary metric anchor dominant in size (`font-size: 2.5rem; font-weight: 700;`), with supporting secondary metrics grouped in tighter rows or tables below.

### Law 9: Never Auto-Scroll Copy (Marquees)
Do not force readers to wait for auto-scrolling tickers or animated marquee loops to read supported integrations or technologies.
- **Instead:** Render a clean, static, responsive badge rail (`.ai-badge-neutral`) or a balanced grid that users can scan at their own speed.

### Law 10: Always Theme Native Browser Surfaces
An interface is incomplete if native browser affordances revert to un-themed system defaults.
- **Always Verify:** Text selection (`::selection`), caret color (`caret-color: var(--ai-accent)`), custom scrollbars (`scrollbar-color`), link underline offset (`text-underline-offset: 0.2em`), and tabular numerals (`font-variant-numeric: tabular-nums`).

### Law 11: Never Use Square Grid Backgrounds (AI Graph Paper / Blueprint Patterns)
Avoid covering backgrounds in repeating 20px-40px square grid lines, dot grids, or mesh graph paper patterns via intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits.
- **Instead:** Lead with clean, distraction-free solid surfaces (`var(--ai-surface-0)`, `var(--ai-bg)`, `var(--ai-surface-1)`) structured with subtle 1px hairline architectural borders (`var(--ai-border)`).

---

## 2. The 4 Design Direction Archetypes

When starting a project or generating new UI, select one of these four curated archetypes rather than defaulting to generic dark SaaS templates:

### Archetype A: Executive Slate
- **Vibe:** High-density, disciplined engineering workspace, precision data tools.
- **Attributes:** Cool slate grays, 4px architectural radius, razor-sharp 1px borders, tabular numerals.
- **CSS Root Variables:**
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
- **CSS Root Variables:**
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
- **Attributes:** Pitch-black background (`#000000`), stark white accents (`#ffffff`), 0px-2px sharp radii, monospace accents.
- **CSS Root Variables:**
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
- **CSS Root Variables:**
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

---

## 3. Agent Prompt Directives (Copy-Paste for AI Coding Tools)

Add this block to your system prompt or project rule file to instruct any AI coding assistant to build with LLMCSS standards:

```markdown
### LLMCSS Human-Craft Design Directives:
- Build UI using LLMCSS semantic classes (.ai-btn, .ai-input, .ai-card, .ai-table, .ai-cq, .ai-badge).
- Strictly adhere to LLMCSS Anti-Slop Laws:
  1. No cards nested inside cards (use dividers, whitespace, or flat hierarchy).
  2. No pulsing or breathing animations on static status pips.
  3. No colored left-border stripes on cards or alerts (use subtle jewel pips).
  4. No electric purple/cyan gradients on dark backgrounds.
  5. No decorative uppercase monospace eyebrows above headlines.
  6. No auto-scrolling marquees (render static scannable badge rails).
  7. Theme browser surfaces (selection, caret-color, custom scrollbars, tabular-nums).
- Choose a deliberate archetype (Executive Slate, Fintech Titanium, Obsidian Minimal, Editorial Atelier).
- Never hallucinate non-existent Tailwind utility strings when LLMCSS provides semantic primitives.
```

---

## 4. Component Composition Guidelines

- **Buttons:** Use `.ai-btn .ai-btn-primary` for the single primary call to action. Use `.ai-btn .ai-btn-outline` or `.ai-btn .ai-btn-ghost` for secondary actions. Use decisive action verbs ("Export Telemetry", "Deploy Service", not "Continue" or "Click here").
- **Metrics:** Always wrap numbers in `<span class="ai-kpi-value">` with `font-variant-numeric: tabular-nums`.
- **Responsive Layouts:** Wrap adaptable panels in `<div class="ai-cq">` to use container queries instead of media queries.
- **Modal Dialogs:** Ensure `<ai-modal>` or `.ai-modal` includes clear close affordances (backdrop dismiss, `ai-modal-close` button, and Escape key handling).
