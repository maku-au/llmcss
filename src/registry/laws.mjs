/**
 * Single source of truth for the LLMCSS anti-slop laws and the four design
 * direction archetypes.
 *
 * Nothing here is hand-copied into documentation. `src/registry/build-docs.mjs`
 * renders this data between marker comments in AGENTS.md, docs/AGENT_RULES.md,
 * DESIGN_HARNESS.md, README.md, public/llms.txt and public/llms-full.txt.
 * Edit the law text here, then run `node src/registry/build-docs.mjs`.
 *
 * Law shape:
 *   n        law number, 1 to 11
 *   title    sentence-case short name
 *   rule     what not to do, and why
 *   instead  what to do in its place
 *   classes  ai-* classes the law names (all verified in public/classes.json)
 */

export const laws = [
  {
    n: 1,
    title: 'Never nest containers',
    rule: 'Do not put a bordered card inside another bordered card. Nested boxes waste screen real estate and create dizzying visual layers.',
    instead:
      'Use generous whitespace (`--ai-space-6`), subtle hairline rules (`<hr class="ai-divider">`), or distinct background shifts (`var(--ai-surface-1)`).',
    classes: ['ai-card', 'ai-divider'],
  },
  {
    n: 2,
    title: 'Never pulse static status pips',
    rule: 'Never attach continuous breathing or pulsing animations (`@keyframes pulse`) to steady states like "System Normal", "Online", or "Completed". Flashing elements demand attention when nothing has changed.',
    instead:
      'Render a calm, static jewel pip with `.ai-status-pip` and `box-shadow: 0 0 0 2px color-mix(...)`. Reserve `.ai-status-pip.is-streaming` strictly for ongoing inference or active data transmission.',
    classes: ['ai-status-pip'],
  },
  {
    n: 3,
    title: 'Never use colored left-stripe borders',
    rule: 'Do not place thick 3px to 5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention.',
    instead:
      'Use a 1px uniform architectural border (`border: 1px solid var(--ai-border)`), accompanied by a subtle 6px status jewel pip or an inline icon.',
    classes: ['ai-status-pip'],
  },
  {
    n: 4,
    title: 'Never use electric purple or cyan halos and radial glows',
    rule: 'Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows.',
    instead:
      'Build depth using multi-stop physical elevation with a slight vertical offset: `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 0, 0, 0.04);`.',
    classes: [],
  },
  {
    n: 5,
    title: 'Never stamp formulaic eyebrows above headlines',
    rule: 'Avoid adding an uppercase monospace overline (`01 // FEATURES` or `OVERVIEW`) above every heading. When repeated everywhere, eyebrows become visual noise that delays reading the headline.',
    instead:
      'Lead directly with a confident, well-typeset headline (`h1` or `h2`). If context is needed, fold it into the heading or the supporting sentence.',
    classes: [],
  },
  {
    n: 6,
    title: 'Never crush letter-spacing below -0.04em or justify body text',
    rule: 'Do not apply extreme negative letter-spacing that makes characters collide, and never use `text-align: justify`, which causes distracting typographic rivers.',
    instead:
      'Keep body text at tracking `0` with `line-height: 1.6`. Restrict negative tracking to large display headings (`-0.02em` to `-0.035em`).',
    classes: [],
  },
  {
    n: 7,
    title: 'Never place low-contrast gray text on colored backgrounds',
    rule: 'Never render neutral `#71717a` gray text over an accent surface or a tinted banner.',
    instead:
      'Ensure WCAG AA compliance (minimum 4.5:1 for body copy, 3:1 for large display). When the background is tinted, tint the secondary text from the same hue.',
    classes: [],
  },
  {
    n: 8,
    title: 'Never create flat, identical metric grids',
    rule: 'Do not display 4 identical KPI cards with identical weights and icons.',
    instead:
      'Establish clear hierarchy. Make the primary metric anchor dominant in size (`font-size: 2.5rem; font-weight: 700;`), with supporting secondary metrics grouped in tighter rows or tables below.',
    classes: ['ai-kpi-card'],
  },
  {
    n: 9,
    title: 'Never auto-scroll copy',
    rule: 'Do not force readers to wait for auto-scrolling tickers or animated marquee loops to read supported integrations or technologies.',
    instead:
      'Render a clean, static, responsive badge rail (`.ai-badge-neutral`) or a balanced grid that users can scan at their own speed.',
    classes: ['ai-badge-neutral'],
  },
  {
    n: 10,
    title: 'Always theme native browser surfaces',
    rule: 'An interface is incomplete if native browser affordances revert to un-themed system defaults.',
    instead:
      'Verify text selection (`::selection`), caret color (`caret-color: var(--ai-accent)`), custom scrollbars (`scrollbar-color`), link underline offset (`text-underline-offset: 0.2em`), and tabular numerals (`font-variant-numeric: tabular-nums`).',
    classes: [],
  },
  {
    n: 11,
    title: 'Never use square grid backgrounds',
    rule: 'Avoid covering backgrounds in repeating 20px to 40px square grid lines, dot grids, or mesh graph paper patterns built from intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits.',
    instead:
      'Lead with clean, distraction-free solid surfaces (`var(--ai-surface-0)`, `var(--ai-bg)`, `var(--ai-surface-1)`) structured with subtle 1px hairline architectural borders (`var(--ai-border)`).',
    classes: [],
  },
];

/**
 * The four design direction archetypes. `css` is the root variable block a page
 * may paste to pin the look; the same values already ship inside llmcss.css
 * under the matching `data-ai-skin` attribute.
 */
export const archetypes = [
  {
    letter: 'A',
    id: 'executive',
    name: 'Executive Slate',
    vibe: 'High-density, disciplined engineering workspace, precision data tools.',
    attributes:
      'Cool slate grays, 4px architectural radius, razor-sharp 1px borders, tabular numerals.',
    css: `:root[data-ai-skin="executive"] {
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
}`,
  },
  {
    letter: 'B',
    id: 'fintech',
    name: 'Fintech Titanium',
    vibe: 'Regulated financial intelligence, institutional security, high clarity.',
    attributes:
      'Warm stone neutrals, 6px radius, emerald and teal accents, generous white space, high-legibility sans.',
    css: `:root[data-ai-skin="fintech"] {
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
}`,
  },
  {
    letter: 'C',
    id: 'obsidian',
    name: 'Obsidian Minimal',
    vibe: 'Pure dark-mode minimalist console, brutalist restraint, developer-first.',
    attributes:
      'Pitch-black background (`#000000`), stark white accents (`#ffffff`), 0px to 2px sharp radii, monospace accents.',
    css: `:root[data-ai-skin="obsidian"] {
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
}`,
  },
  {
    letter: 'D',
    id: 'editorial',
    name: 'Editorial Atelier',
    vibe: 'High-craft publication, thoughtful essay, luxury studio, timeless typography.',
    attributes:
      'Warm paper substrate, Newsreader serif display headlines, crisp hairline borders, asymmetric rhythm, zero bento card clutter.',
    css: `:root[data-ai-skin="editorial"] {
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
}`,
  },
];
