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
 *   n          law number, 1 to 11
 *   title      sentence-case short name
 *   rule       what not to do, and why
 *   instead    what to do in its place
 *   classes    class names the law names (no prefix; all verified in public/classes.json)
 *   automated  true when `llmcss validate` or `llmcss audit` checks the law in
 *              code (src/registry/validate.mjs structuralAudit, or the `audit`
 *              case in bin/cssai.mjs), false when the law is guidance a human
 *              or a model has to apply. Renderers do not read this field yet.
 */

export const laws = [
  {
    n: 1,
    title: 'Never nest containers',
    rule: 'Do not put a bordered container inside another bordered container. The audit walks the tag stack and flags every `.card`, `.panel` or `.kpi-card` that sits inside another `.card`, `.panel` or `.kpi-card`. Nested boxes waste screen real estate and create dizzying visual layers.',
    instead:
      'Use generous whitespace (`--ai-space-6`), subtle hairline rules (`<hr class="divider">`), or distinct background shifts (`var(--ai-surface-1)`).',
    classes: ['card', 'panel', 'kpi-card', 'divider'],
    automated: true,
  },
  {
    n: 2,
    title: 'Never pulse static status pips',
    rule: 'Never attach continuous breathing or pulsing animations to steady states like "System Normal", "Online", or "Completed". The audit flags the class tokens `animate-pulse`, `pulse`, `animate-ping`, `ping`, `breathe`, `blink` and `animate-bounce`, and any inline `animation:` value containing `pulse`, `ping`, `breathe`, `blink` or `glow`, unless the document also carries `is-streaming`. Flashing elements demand attention when nothing has changed.',
    instead:
      'Render a calm, static jewel pip with `.status-pip` and `box-shadow: 0 0 0 2px color-mix(...)`. Reserve `.status-pip.is-streaming` strictly for ongoing inference or active data transmission.',
    classes: ['status-pip'],
    automated: true,
  },
  {
    n: 3,
    title: 'Never use colored left-stripe borders',
    rule: 'Do not place thick 3px to 5px colored vertical stripes on the left edge of cards, toasts, or dialogs. This 2012-era alert tell makes every element scream for attention.',
    instead:
      'Use a 1px uniform architectural border (`border: 1px solid var(--ai-border)`), accompanied by a subtle 6px status jewel pip or an inline icon.',
    classes: ['status-pip'],
    automated: true,
  },
  {
    n: 4,
    title: 'Never use electric purple or cyan halos and radial glows',
    rule: 'Avoid murky dark backgrounds flooded with saturated purple-to-blue gradients or zero-offset neon drop shadows.',
    instead:
      'Build depth using multi-stop physical elevation with a slight vertical offset: `box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 8px 16px -4px rgba(0, 0, 0, 0.04);`.',
    classes: [],
    automated: true,
  },
  {
    n: 5,
    title: 'Never stamp formulaic eyebrows above headlines',
    rule: 'Do not stamp a badge or a pill above a heading as an eyebrow, and do not repeat an uppercase monospace overline (`01 // FEATURES`, `OVERVIEW`) over every section. The audit flags a `span` or `div` carrying `.badge` or `.hero-badge` that is followed by an `h1` to `h4` within the next few lines, with `.product-badge-float` the only exemption. Repeated eyebrows become visual noise that delays reading the headline.',
    instead:
      'Lead directly with a confident, well-typeset headline (`h1` or `h2`). If context is needed, fold it into the heading or the supporting sentence.',
    classes: ['badge', 'hero-badge', 'product-badge-float'],
    automated: true,
  },
  {
    n: 6,
    title: 'Never crush letter-spacing below -0.04em or justify body text',
    rule: 'Do not apply extreme negative letter-spacing that makes characters collide, and never use `text-align: justify`, which causes distracting typographic rivers.',
    instead:
      'Keep body text at tracking `0` with `line-height: 1.6`. Restrict negative tracking to large display headings (`-0.02em` to `-0.035em`).',
    classes: [],
    automated: false,
  },
  {
    n: 7,
    title: 'Never place low-contrast gray text on colored backgrounds',
    rule: 'Never render neutral `#71717a` gray text over an accent surface or a tinted banner.',
    instead:
      'Ensure WCAG AA compliance (minimum 4.5:1 for body copy, 3:1 for large display). When the background is tinted, tint the secondary text from the same hue.',
    classes: [],
    automated: false,
  },
  {
    n: 8,
    title: 'Never create flat, identical metric grids',
    rule: 'Do not display 4 identical KPI cards with identical weights and icons.',
    instead:
      'Establish clear hierarchy. Make the primary metric anchor dominant in size (`font-size: 2.5rem; font-weight: 700;`), with supporting secondary metrics grouped in tighter rows or tables below.',
    classes: ['kpi-card'],
    automated: false,
  },
  {
    n: 9,
    title: 'Never auto-scroll copy',
    rule: 'Do not force readers to wait for auto-scrolling tickers or animated marquee loops to read supported integrations or technologies.',
    instead:
      'Render a clean, static, responsive badge rail (`.badge-neutral`) or a balanced grid that users can scan at their own speed.',
    classes: ['badge-neutral'],
    automated: true,
  },
  {
    n: 10,
    title: 'Always theme native browser surfaces',
    rule: 'An interface is incomplete if native browser affordances revert to un-themed system defaults.',
    instead:
      'Verify text selection (`::selection`), caret color (`caret-color: var(--ai-accent)`), custom scrollbars (`scrollbar-color`), link underline offset (`text-underline-offset: 0.2em`), and tabular numerals (`font-variant-numeric: tabular-nums`).',
    classes: [],
    automated: false,
  },
  {
    n: 11,
    title: 'Never use square grid backgrounds',
    rule: 'Avoid covering backgrounds in repeating 20px to 40px square grid lines, dot grids, or mesh graph paper patterns built from intersecting linear-gradient declarations. This is one of the most overused, robotic hallmarks of AI-generated template kits.',
    instead:
      'Lead with clean, distraction-free solid surfaces (`var(--ai-surface-0)`, `var(--ai-bg)`, `var(--ai-surface-1)`) structured with subtle 1px hairline architectural borders (`var(--ai-border)`).',
    classes: [],
    automated: true,
  },
];

/**
 * The four design direction archetypes.
 *
 * `css` is a transcript of what `src/css/themes.css` already ships for that
 * skin, not a suggested override block: the same declarations, in the same
 * order, with the same values. A skin sets `--ai-radius-base` on the bare
 * attribute selector, then a light block and, where one exists, a dark block.
 * themes.css qualifies each theme block with a longer selector list (it also
 * matches `:root:not([data-ai-theme="dark"])` and a `[data-ai-theme] [data-ai-skin]`
 * descendant form); the single representative selector is shown here so each
 * rule stays on one line in the plain-text renderer. Nothing else is set per
 * skin: no font tokens, no per-skin `--ai-radius-md` or `--ai-radius-lg`, no
 * per-skin status colors.
 */
export const archetypes = [
  {
    letter: 'A',
    id: 'executive',
    name: 'Executive Slate',
    vibe: 'High-density, disciplined engineering workspace, precision data tools.',
    attributes:
      'Cool slate grays, 3px architectural radius (`--ai-radius-sm`, the only skin that is not 2px), razor-sharp hairline borders, blue #2563eb accent in light mode and sky #38bdf8 in dark.',
    css: `[data-ai-skin="executive"] {
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
}`,
  },
  {
    letter: 'B',
    id: 'fintech',
    name: 'Fintech Titanium',
    vibe: 'Regulated financial intelligence, institutional security, high clarity.',
    attributes:
      'Warm stone neutrals, 2px radius (`--ai-radius-xs`), deep teal #0f766e accent in light mode and #2dd4bf in dark, generous white space. Status colors are the library defaults, not per-skin overrides.',
    css: `[data-ai-skin="fintech"] {
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
}`,
  },
  {
    letter: 'C',
    id: 'obsidian',
    name: 'Obsidian Minimal',
    vibe: 'Monochrome minimalist console, brutalist restraint, developer-first, in both light and dark.',
    attributes:
      'Alabaster #fbfbfb in light mode and pitch black #000000 in dark, monochrome near-black or near-white accents (`#18181b` light, `#f5f5f5` dark), 2px sharp radius (`--ai-radius-xs`).',
    css: `[data-ai-skin="obsidian"] {
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
}`,
  },
  {
    letter: 'D',
    id: 'editorial',
    name: 'Editorial Atelier',
    vibe: 'High-craft publication, thoughtful essay, luxury studio, timeless typography.',
    attributes:
      'Warm ivory paper substrate, terracotta #8c4a27 accent in light mode and #c48259 in dark, crisp hairline borders, 2px radius (`--ai-radius-xs`), asymmetric rhythm, zero bento card clutter. Serif display type is a page choice, not a token this skin sets.',
    css: `[data-ai-skin="editorial"] {
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
}`,
  },
];
