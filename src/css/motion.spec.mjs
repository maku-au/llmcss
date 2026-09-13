/**
 * LLMCSS motion addon specification.
 *
 * Same shape, same contract and the same reviewer-facing fields as
 * src/css/utilities.spec.mjs. Plain ESM data module, no dependencies, no side
 * effects, JSON-serialisable once the helpers at the top have run, so
 * build-motion.mjs, build-manifests.mjs, the CLI and the MCP server can all
 * import it without a compile step.
 *
 * Destination: src/css/motion.css -> dist/llmcss-motion.css. The core
 * stylesheet is not touched. src/css/tokens.css is not touched. Everything the
 * addon needs that the core does not already declare is declared in this file's
 * own :root block (see `rawBlocks.tokens`).
 *
 * Family fields are identical to utilities.spec.mjs, with two additions:
 *
 *   manifestOnly  true when the family exists so its class names reach
 *                 classes.motion.json, while the CSS that gives them behaviour
 *                 lives in rawBlocks because it needs an @supports wrapper, a
 *                 :where() wrapper or a descendant selector the generator
 *                 cannot express. The emitted declaration is a marker custom
 *                 property, exactly as the `group` family in
 *                 utilities.spec.mjs does. Eight classes are marker-only and
 *                 each one names the rawBlock that implements it.
 *   overlapsCore  true when the family re-declares class names that also exist
 *                 in utilities.css. The addon rules write only --ai-motion-*
 *                 custom properties, so both rules apply and neither loses.
 *                 --check asserts the overlap set is exactly the 13 names in
 *                 `expectedOverlap` below.
 *
 * Three exports have no counterpart in utilities.spec.mjs and need generator
 * support; see GENERATOR CHANGES at the bottom of this file.
 *
 *   keyframes     name -> body. Emitted as @keyframes inside the layer.
 *   rawBlocks     ordered raw CSS the generator concatenates unmodified.
 *   meta          layer name and output paths.
 */

/* -------------------------------------------------------------------------
   Helpers. These run once at import; the exported data is plain.
   ------------------------------------------------------------------------- */

const dur = (k) => ({ '--ai-motion-duration': `var(--ai-motion-${k})` });
const ease = (k) => ({ '--ai-motion-ease': `var(--ai-motion-ease-${k})` });
const easeCore = (k) => ({ '--ai-motion-ease': `var(--ai-ease-${k})` });
const map = (keys, fn) => Object.fromEntries(keys.map((k) => [String(k), fn(k)]));

/* -------------------------------------------------------------------------
   Output target
   ------------------------------------------------------------------------- */

export const meta = {
  layer: 'motion',
  spec: 'src/css/motion.spec.mjs',
  outCss: 'src/css/motion.css',
  outFamilies: 'src/css/motion.families.json',
  outManifest: 'public/classes.motion.json',
  dist: 'dist/llmcss-motion.css',
  budgetGzipBytes: 6144,
};

/* -------------------------------------------------------------------------
   Variant model

   Deliberately narrow. An entrance animation does not change at 768px and it
   does not change inside a 600px container, so there are no breakpoint and no
   container copies at all: every family is tier C. Both exports are present
   and empty so build-utilities' loops over them are no-ops and the two
   generators stay one codebase.
   ------------------------------------------------------------------------- */

export const breakpoints = {};
export const containerTiers = {};

/** Only the two the addon actually uses. Names and selectors are the core's. */
export const stateVariants = ['motion-safe', 'motion-reduce'];

/** Same bundle name the core uses, so a family opts in with `states: ['motion']`. */
export const stateSets = {
  motion: ['motion-safe', 'motion-reduce'],
};

export const tiers = {
  C: { breakpoints: false, containers: false, note: 'base only: motion does not vary by viewport or container' },
};

/* -------------------------------------------------------------------------
   Tokens the addon declares for itself.

   Listed here so --check can validate every var(--ai-motion-*) the families
   reference, and emitted verbatim by rawBlocks.tokens. Values that already
   exist in the core read the core token rather than restating a number, so
   retuning --ai-duration-normal retunes the addon.

   Not added to src/css/tokens.css. That file is core and stays at its current
   size; the 50KB ceiling does not move because of this addon.
   ------------------------------------------------------------------------- */

export const tokensToAdd = {
  '--ai-motion-instant': '90ms',
  '--ai-motion-fast': 'var(--ai-duration-fast)',
  '--ai-motion-normal': 'var(--ai-duration-normal)',
  '--ai-motion-slow': 'var(--ai-duration-slow)',
  '--ai-motion-slower': '700ms',

  '--ai-motion-ease-standard': 'var(--ai-ease-in-out)',
  '--ai-motion-ease-emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
  '--ai-motion-ease-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
  '--ai-motion-ease-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
  '--ai-motion-ease-overshoot': 'cubic-bezier(0.22, 1.12, 0.36, 1)',

  '--ai-motion-distance-sm': '4px',
  '--ai-motion-distance-md': '10px',
  '--ai-motion-distance-lg': '24px',
  '--ai-motion-distance': 'var(--ai-motion-distance-md)',

  '--ai-motion-scale-in': '0.97',
  '--ai-motion-scale-out': '1.02',

  '--ai-motion-stagger': '60ms',
  '--ai-motion-i': '0',

  '--ai-motion-duration': 'var(--ai-motion-normal)',
  '--ai-motion-ease': 'var(--ai-motion-ease-decelerate)',
  '--ai-motion-delay': '0ms',
  '--ai-motion-repeat': '1',

  '--ai-vt': 'none',
};

/**
 * The exact class names this addon shares with utilities.css. --check asserts
 * that the intersection of the addon's emitted classes with classes.json is
 * this set and nothing else, so a future family cannot silently shadow a core
 * utility. Every one of them is a custom-property-only rule; see the
 * overlapsCore note on the three families concerned.
 */
export const expectedOverlap = [
  'duration-0', 'duration-fast', 'duration-normal', 'duration-slow',
  'delay-0', 'delay-75', 'delay-150', 'delay-300',
  'ease-out', 'ease-in-out', 'ease-smooth', 'ease-spring', 'ease-linear',
];

/* -------------------------------------------------------------------------
   Keyframes

   NEW EXPORT. The generator emits only rules today; see GENERATOR CHANGES.

   Every name is prefixed `ai-m-`. Two reasons, both load-bearing:
     1. @keyframes obey layer order. The core declares `ai-fade-in` and
        `ai-scale-up` in @layer components (animations.css:397-404) and the
        modal, dropdown, tabs and accordion components animate with them. A
        redefinition in the later `motion` layer would silently retime four
        core components.
     2. Law 2. validate.mjs:275 matches /pulse|ping|breathe|blink|glow/ against
        inline animation values. No name here can ever match it, and a test
        asserts that against the same regex literal the audit uses.
   ------------------------------------------------------------------------- */

export const keyframes = {
  'ai-m-fade-in': 'from { opacity: 0; } to { opacity: 1; }',
  'ai-m-fade-out': 'from { opacity: 1; } to { opacity: 0; }',

  'ai-m-slide-up':
    'from { opacity: 0; translate: 0 var(--ai-motion-distance); } to { opacity: 1; translate: 0 0; }',
  'ai-m-slide-down':
    'from { opacity: 0; translate: 0 calc(-1 * var(--ai-motion-distance)); } to { opacity: 1; translate: 0 0; }',
  'ai-m-slide-left':
    'from { opacity: 0; translate: var(--ai-motion-distance) 0; } to { opacity: 1; translate: 0 0; }',
  'ai-m-slide-right':
    'from { opacity: 0; translate: calc(-1 * var(--ai-motion-distance)) 0; } to { opacity: 1; translate: 0 0; }',

  'ai-m-scale-in': 'from { opacity: 0; scale: var(--ai-motion-scale-in); } to { opacity: 1; scale: 1; }',
  'ai-m-scale-out': 'from { opacity: 1; scale: 1; } to { opacity: 0; scale: var(--ai-motion-scale-out); }',

  'ai-m-rise':
    'from { opacity: 0; translate: 0 var(--ai-motion-distance-sm); scale: var(--ai-motion-scale-in); } to { opacity: 1; translate: 0 0; scale: 1; }',
  'ai-m-sink':
    'from { opacity: 1; translate: 0 0; scale: 1; } to { opacity: 0; translate: 0 var(--ai-motion-distance-sm); scale: var(--ai-motion-scale-in); }',

  'ai-m-collapse-in': 'from { grid-template-rows: 0fr; opacity: 0; } to { grid-template-rows: 1fr; opacity: 1; }',
  'ai-m-collapse-out': 'from { grid-template-rows: 1fr; opacity: 1; } to { grid-template-rows: 0fr; opacity: 0; }',

  // Triggered attention. Three small steps over one run, never a loop.
  'ai-m-nudge': '0%, 100% { translate: 0 0; } 33% { translate: -3px 0; } 66% { translate: 3px 0; }',

  // The only infinite animation in the addon. Inert unless the gate in
  // rawBlocks.gated matches; see DESIGN.md section 8.1.
  'ai-m-sweep': 'from { transform: translateX(-100%); } to { transform: translateX(100%); }',

  // Scroll-driven. Same shape as the entrance pair, separate names because the
  // reveal rules live inside @supports and must not inherit entrance defaults.
  'ai-m-reveal': 'from { opacity: 0; } to { opacity: 1; }',
  'ai-m-reveal-up':
    'from { opacity: 0; translate: 0 var(--ai-motion-distance); } to { opacity: 1; translate: 0 0; }',
  'ai-m-reveal-scale':
    'from { opacity: 0; scale: var(--ai-motion-scale-in); } to { opacity: 1; scale: 1; }',
};

/* -------------------------------------------------------------------------
   Families
   ------------------------------------------------------------------------- */

export const families = [
  /* ===== P0 entrances, exits and state transitions ======================== */
  {
    id: 'motion-animation',
    family: 'motion',
    priority: 'P0',
    tier: 'C',
    states: ['motion'],
    prefix: 'animate',
    props: ['animation-name'],
    values: {
      'fade-in': 'ai-m-fade-in',
      'fade-out': 'ai-m-fade-out',
      'slide-up': 'ai-m-slide-up',
      'slide-down': 'ai-m-slide-down',
      'slide-left': 'ai-m-slide-left',
      'slide-right': 'ai-m-slide-right',
      'scale-in': 'ai-m-scale-in',
      'scale-out': 'ai-m-scale-out',
      rise: 'ai-m-rise',
      sink: 'ai-m-sink',
      'collapse-in': 'ai-m-collapse-in',
      'collapse-out': 'ai-m-collapse-out',
      nudge: 'ai-m-nudge',
    },
    variantValues: 'all',
    notes:
      'animation-name only. Duration, easing, delay, iteration count and fill mode come from the single :where() rule in rawBlocks.defaults, which contributes zero specificity so every duration-*, delay-* and ease-* modifier and every consumer rule outranks it. Same construction as the transition defaults rule at utilities.extra.css:230. No infinite value exists in this family: the direction names are one-shot by definition and nudge is a triggered cue, not a loop. animate-collapse-in and animate-collapse-out additionally need the two structural declarations in rawBlocks.collapse; the technique is worthless without them and no author will guess them.',
  },
  {
    id: 'motion-animation-gated',
    family: 'motion',
    priority: 'P1',
    tier: 'C',
    prefix: 'animate',
    props: [],
    manifestOnly: 'rawBlocks.gated',
    values: { sweep: { '--ai-motion-sweep': '1' } },
    notes:
      'Marker only, exactly like the `group` family in utilities.spec.mjs: it declares a custom property so the rule survives minification and so build-manifests sees the class. class="animate-sweep" on its own animates nothing. The real rule is in rawBlocks.gated and matches only inside .progress or .skeleton, or on an element carrying is-loading, is-streaming or aria-busy. This is how Law 2 is enforced: the banned shape is not constructible with addon classes, so structuralAudit needs no allowlist and no new check.',
  },

  /* ===== P0 modifiers ===================================================== */
  {
    id: 'motion-duration',
    family: 'motion',
    priority: 'P0',
    tier: 'C',
    prefix: 'duration',
    props: [],
    overlapsCore: true,
    values: {
      instant: dur('instant'),
      fast: dur('fast'),
      normal: dur('normal'),
      slow: dur('slow'),
      slower: dur('slower'),
      0: { '--ai-motion-duration': '0ms' },
    },
    notes:
      'duration-0, duration-fast, duration-normal and duration-slow already exist in utilities.css writing transition-duration (utilities.spec.mjs:1795-1803). These rules write a custom property and nothing else, so both rules apply to the same element, neither overrides the other, and class="transition-colors duration-fast" behaves identically with and without the addon. duration-instant and duration-slower are new names. See DESIGN.md section 11 decision 2 for the case against reusing the names.',
  },
  {
    id: 'motion-delay',
    family: 'motion',
    priority: 'P1',
    tier: 'C',
    prefix: 'delay',
    props: [],
    overlapsCore: true,
    values: {
      0: { '--ai-motion-delay': '0ms' },
      75: { '--ai-motion-delay': '75ms' },
      150: { '--ai-motion-delay': '150ms' },
      300: { '--ai-motion-delay': '300ms' },
      500: { '--ai-motion-delay': '500ms' },
      700: { '--ai-motion-delay': '700ms' },
    },
    notes:
      'delay-0 through delay-300 overlap utilities.spec.mjs:1814-1821 and are custom-property-only for the same reason as motion-duration. On a .stagger container the value feeds the child calc() rather than being overwritten by it.',
  },
  {
    id: 'motion-ease',
    family: 'motion',
    priority: 'P1',
    tier: 'C',
    prefix: 'ease',
    props: [],
    overlapsCore: true,
    values: {
      standard: ease('standard'),
      emphasized: ease('emphasized'),
      decelerate: ease('decelerate'),
      accelerate: ease('accelerate'),
      overshoot: ease('overshoot'),
      out: easeCore('out'),
      'in-out': easeCore('in-out'),
      smooth: easeCore('smooth'),
      spring: easeCore('spring'),
      linear: { '--ai-motion-ease': 'linear' },
    },
    notes:
      'ease-out, ease-in-out, ease-smooth, ease-spring and ease-linear overlap utilities.spec.mjs:1805-1812 and read the SAME core token, so the word means one curve everywhere. The core --ai-ease-spring is cubic-bezier(0.16, 1, 0.3, 1), a decelerate curve with no overshoot; the addon does not redefine it, because ease-spring already means that curve for every transition-* user today. The genuine overshoot curve is ease-overshoot. If the core ever fixes --ai-ease-spring, the addon inherits the fix and ease-overshoot becomes a deprecated alias.',
  },
  {
    id: 'motion-repeat',
    family: 'motion',
    priority: 'P1',
    tier: 'C',
    prefix: 'repeat',
    props: [],
    values: map([1, 2, 3], (n) => ({ '--ai-motion-repeat': String(n) })),
    notes:
      'There is no repeat-infinite and there will not be one. A forever loop on a steady state is Law 2; an author who wants one has to write their own CSS, at which point the audit catches them. Three is the highest count that reads as emphasis rather than as a bug.',
  },
  {
    id: 'motion-control',
    family: 'motion',
    priority: 'P2',
    tier: 'C',
    prefix: null,
    props: [],
    values: {
      once: { 'animation-iteration-count': '1' },
      'motion-paused': { 'animation-play-state': 'paused' },
      'motion-running': { 'animation-play-state': 'running' },
    },
    notes:
      '`once` writes animation-iteration-count directly rather than the custom property, so it beats a repeat-* modifier whatever the source order. motion-paused and motion-running are for a component that drives its own timing, for example a carousel that pauses on hover; they are prefixed because bare `paused` and `running` are words a consumer is likely to have already used.',
  },
  {
    id: 'motion-distance',
    family: 'motion',
    priority: 'P1',
    tier: 'C',
    prefix: 'slide',
    props: [],
    values: {
      sm: { '--ai-motion-distance': 'var(--ai-motion-distance-sm)' },
      md: { '--ai-motion-distance': 'var(--ai-motion-distance-md)' },
      lg: { '--ai-motion-distance': 'var(--ai-motion-distance-lg)' },
    },
    notes:
      'Travel distance for the four animate-slide-* classes and for reveal-up. 4px, 10px and 24px. Deliberately small: this library does not throw elements across the screen. Named slide-* so it reads next to animate-slide-up rather than inventing a travel-* or distance-* vocabulary nobody would guess.',
  },

  /* ===== P1 stagger ======================================================= */
  {
    id: 'motion-stagger',
    family: 'motion',
    priority: 'P1',
    tier: 'C',
    prefix: 'stagger',
    props: ['animation-delay'],
    selectorSuffix: ' > *',
    values: {
      '': 'calc(var(--ai-motion-delay) + var(--ai-motion-i) * var(--ai-motion-stagger))',
    },
    notes:
      'Emits `.stagger > * { animation-delay: calc(...) }` via selectorSuffix, the same mechanism space-y uses. A real declaration, not :where(), so it beats the animation defaults rule. The twelve --ai-motion-i index rules it depends on are in rawBlocks.stagger, because :nth-child() is a selector shape the value map cannot express.',
  },
  {
    id: 'motion-stagger-step',
    family: 'motion',
    priority: 'P2',
    tier: 'C',
    prefix: 'stagger',
    props: [],
    values: {
      fast: { '--ai-motion-stagger': '35ms' },
      slow: { '--ai-motion-stagger': '90ms' },
    },
    notes:
      'Separate family from motion-stagger because these go on the container and carry no ` > *` suffix. Split rather than fought: one family cannot emit two selector shapes.',
  },

  /* ===== P1 scroll-driven reveal ========================================== */
  {
    id: 'motion-reveal',
    family: 'motion',
    priority: 'P1',
    tier: 'C',
    prefix: 'reveal',
    props: [],
    manifestOnly: 'rawBlocks.reveal',
    values: {
      '': { '--ai-motion-reveal': 'ai-m-reveal' },
      up: { '--ai-motion-reveal': 'ai-m-reveal-up' },
      scale: { '--ai-motion-reveal': 'ai-m-reveal-scale' },
    },
    variantValues: 'all',
    notes:
      'Marker family. The custom property is not decorative: rawBlocks.reveal reads it, so all three classes share one @supports block and one fallback block instead of three copies each. The behaviour has three paths, in this order of preference: native animation-timeline: view(); the optional IntersectionObserver runtime, armed only by the data-ai-motion-observer attribute it sets on <html> after the observer exists; and plain visible content, which is what happens when neither is available. No rule outside those guards ever sets opacity: 0 as a resting state, so the addon cannot leave content hidden. Known limitation, documented not hidden: a view() timeline is bidirectional and re-runs in reverse when the user scrolls back up. There is no pure-CSS once; once-only needs the runtime.',
  },

  /* ===== P1 state transition composites =================================== */
  {
    id: 'motion-transition',
    family: 'motion',
    priority: 'P1',
    tier: 'C',
    prefix: 'transition',
    props: [],
    values: {
      discrete: { 'transition-behavior': 'allow-discrete' },
      size: { 'transition-property': 'grid-template-rows, block-size', 'interpolate-size': 'allow-keywords' },
      filter: { 'transition-property': 'filter, backdrop-filter' },
    },
    notes:
      'The three composites the core transition-property family (utilities.spec.mjs:1775-1793) cannot express. transition-discrete is what makes display and overlay animatable on a popover or an [open] element, which is the single most-asked-for piece of modern CSS the library does not ship. transition-size pairs the property list with interpolate-size on the same element, because height: auto does not animate without it. These write transition-property, so rawBlocks.defaults extends the core :where() duration and easing rule to cover them; the core rule at utilities.extra.css:230 lists only its own six class names.',
  },

  /* ===== P2 view transition names ========================================= */
  {
    id: 'motion-vt',
    family: 'motion',
    priority: 'P2',
    tier: 'C',
    prefix: 'vt',
    props: ['view-transition-name'],
    values: {
      hero: 'ai-hero',
      title: 'ai-title',
      media: 'ai-media',
      panel: 'ai-panel',
      name: 'var(--ai-vt)',
      none: 'none',
    },
    notes:
      'Names only. The addon deliberately ships NO `@view-transition { navigation: auto; }` at-rule: it is document-scoped and cannot be opted into per element, so shipping it would switch on cross-document view transitions for every site that merely added a stylesheet. The three-line opt-in is documented on the docs page instead. view-transition-name must be unique per document per snapshot, so four fixed names cover the usual hero/title/media/panel pairing, vt-name reads --ai-vt for anything else, and vt-none switches a name off inside a list where it would otherwise be duplicated.',
  },

  /* ===== P2 hover and press micro-interactions ============================ */
  {
    id: 'motion-micro',
    family: 'motion',
    priority: 'P2',
    tier: 'C',
    prefix: null,
    props: [],
    manifestOnly: 'rawBlocks.micro',
    values: {
      press: { '--ai-motion-press': '0.985' },
      'press-firm': { '--ai-motion-press': '0.96' },
      lift: { '--ai-motion-lift': '2px' },
      'lift-lg': { '--ai-motion-lift': '4px' },
    },
    variantValues: 'all',
    notes:
      'Marker family whose custom property is the actual knob: rawBlocks.micro reads --ai-motion-press and --ai-motion-lift, so press and press-firm share one rule rather than duplicating it. The rules there are wrapped in :where() so the whole selector is specificity 0,1,0 (the pseudo-class alone) and the core hover:translate-y-0 utility, at 0,2,0, still wins. The hover half sits in @media (hover: hover), matching STATE_DEFS.hover in build-utilities.mjs:81, so a touch device never sticks in the lifted state. These are transitions, not animations: the idle state is completely still, which is the whole point.',
  },
];

/* -------------------------------------------------------------------------
   Raw blocks

   NEW EXPORT. Ordered raw CSS the generator concatenates unmodified inside the
   layer. Everything here is a rule shape the class-to-declarations value map
   genuinely cannot express: a :root block, a :where() list, an @supports
   wrapper, a descendant selector, or an :nth-child() ladder. Nothing is here
   for convenience.

   Emission order inside @layer motion:
     tokens -> (keyframes) -> defaults -> (families) -> collapse -> stagger
     -> gated -> reveal -> micro
   ------------------------------------------------------------------------- */

export const rawBlocks = {
  /** The addon's own token block. tokens.css is untouched. */
  tokens: `:root {
${Object.entries(tokensToAdd).map(([k, v]) => `  ${k}: ${v};`).join('\n')}
}`,

  /**
   * Shared defaults for every animate-* class, and the duration and easing the
   * three transition composites need. :where() so specificity is zero and any
   * modifier or consumer rule wins outright, whatever the source order. Same
   * construction and the same reason as utilities.extra.css:230.
   */
  defaults: `:where(.animate-fade-in, .animate-fade-out, .animate-slide-up, .animate-slide-down,
       .animate-slide-left, .animate-slide-right, .animate-scale-in, .animate-scale-out,
       .animate-rise, .animate-sink, .animate-collapse-in, .animate-collapse-out,
       .animate-nudge, .animate-sweep) {
  animation-duration: var(--ai-motion-duration);
  animation-timing-function: var(--ai-motion-ease);
  animation-delay: var(--ai-motion-delay);
  animation-iteration-count: var(--ai-motion-repeat);
  animation-fill-mode: both;
}
:where(.transition-discrete, .transition-size, .transition-filter) {
  transition-duration: var(--ai-motion-fast);
  transition-timing-function: var(--ai-motion-ease-standard);
}
:where(.animate-nudge) {
  animation-duration: 320ms;
  animation-timing-function: var(--ai-motion-ease-standard);
}`,

  /**
   * The two structural declarations the grid-rows collapse technique needs.
   * Without them animate-collapse-in animates a property that has no effect.
   */
  collapse: `.animate-collapse-in,
.animate-collapse-out {
  display: grid;
}
.animate-collapse-in > *,
.animate-collapse-out > * {
  min-height: 0;
  overflow: hidden;
}`,

  /**
   * Stagger index ladder. Capped at twelve so a thirteenth child shares the
   * last step rather than arriving a second and a half late, and so no author
   * ever needs an inline style="--ai-motion-i:14" next to an animation, which
   * is the exact attribute shape validate.mjs:275 inspects.
   */
  stagger: `.stagger > :nth-child(1) { --ai-motion-i: 0; }
.stagger > :nth-child(2) { --ai-motion-i: 1; }
.stagger > :nth-child(3) { --ai-motion-i: 2; }
.stagger > :nth-child(4) { --ai-motion-i: 3; }
.stagger > :nth-child(5) { --ai-motion-i: 4; }
.stagger > :nth-child(6) { --ai-motion-i: 5; }
.stagger > :nth-child(7) { --ai-motion-i: 6; }
.stagger > :nth-child(8) { --ai-motion-i: 7; }
.stagger > :nth-child(9) { --ai-motion-i: 8; }
.stagger > :nth-child(10) { --ai-motion-i: 9; }
.stagger > :nth-child(11) { --ai-motion-i: 10; }
.stagger > :nth-child(12) { --ai-motion-i: 11; }
.stagger > :nth-child(n+13) { --ai-motion-i: 12; }`,

  /**
   * The Law 2 gate. animate-sweep is inert until the element declares that
   * something is actually in progress. See DESIGN.md section 8.1.
   */
  gated: `.progress .animate-sweep,
.skeleton .animate-sweep,
.animate-sweep.is-loading,
.animate-sweep.is-streaming,
[aria-busy="true"] .animate-sweep {
  animation-name: ai-m-sweep;
  animation-iteration-count: infinite;
  animation-duration: var(--ai-motion-slower);
  animation-timing-function: var(--ai-motion-ease-standard);
  will-change: transform;
}`,

  /**
   * Scroll reveal, three paths. Path C is the absence of the other two: no
   * rule matches and the element renders normally, visible, in place.
   *
   * The animation-duration: 1ms on the native path is ignored on a progress
   * timeline and is there because Firefox requires a non-auto duration.
   */
  reveal: `@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal, .reveal-up, .reveal-scale {
      animation-name: var(--ai-motion-reveal);
      animation-fill-mode: both;
      animation-timeline: view();
      animation-range: entry 8% cover 30%;
      animation-duration: 1ms;
    }
  }
}
@supports not (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    [data-ai-motion-observer] :where(.reveal, .reveal-up, .reveal-scale) {
      opacity: 0;
      transition: opacity var(--ai-motion-duration) var(--ai-motion-ease),
                  translate var(--ai-motion-duration) var(--ai-motion-ease),
                  scale var(--ai-motion-duration) var(--ai-motion-ease);
    }
    [data-ai-motion-observer] :where(.reveal-up) { translate: 0 var(--ai-motion-distance); }
    [data-ai-motion-observer] :where(.reveal-scale) { scale: var(--ai-motion-scale-in); }
    [data-ai-motion-observer] :where(.reveal, .reveal-up, .reveal-scale).is-visible {
      opacity: 1;
      translate: 0 0;
      scale: 1;
    }
  }
}`,

  /**
   * Hover and press. :where() keeps the whole thing at the specificity of the
   * pseudo-class alone, so a core hover:* utility outranks it.
   */
  micro: `:where(.press, .press-firm, .lift, .lift-lg) {
  transition-property: scale, translate, box-shadow;
  transition-duration: var(--ai-motion-fast);
  transition-timing-function: var(--ai-motion-ease-standard);
}
:where(.press, .press-firm):active {
  scale: var(--ai-motion-press);
}
@media (hover: hover) {
  :where(.lift, .lift-lg):hover {
    translate: 0 calc(-1 * var(--ai-motion-lift));
    box-shadow: var(--ai-shadow-md);
  }
}
:where(.lift, .lift-lg):active {
  translate: 0 0;
  box-shadow: var(--ai-shadow-sm);
}`,
};

/** Nothing is hand-written outside the generator for this sheet. */
export const keepList = [];

export default {
  meta, families, breakpoints, containerTiers, stateVariants, stateSets, tiers,
  tokensToAdd, tokensToAddZ: {}, keepList, keyframes, rawBlocks, expectedOverlap,
};

/* =========================================================================
   GENERATOR CHANGES

   build-utilities.mjs can emit this sheet with five edits. None of them
   changes a byte of the CSS it emits for utilities.spec.mjs today, which the
   build-motion test asserts by byte-comparing utilities.css before and after.

   1. Paths and layer name become arguments.
      L37-40, today three constants pointing at utilities.*. Read
      `--spec=<path>` (default src/css/utilities.spec.mjs) and derive OUT_CSS
      and OUT_FAMILIES from the spec's `meta` export when it has one, falling
      back to today's constants. Read `--layer=<name>` (default `utilities`).

   2. L43, destructure two new optional exports:
        const { ..., keyframes = {}, rawBlocks = {} } = spec;

   3. L200, the hardcoded layer open becomes:
        let css = stamp + `@layer ${LAYER} {\n`;
      and immediately after it, before the family loop:
        if (rawBlocks.tokens) css += indent(rawBlocks.tokens);
        for (const [name, body] of Object.entries(keyframes))
          css += `${IND}@keyframes ${name} { ${body} }\n`;
        if (rawBlocks.defaults) css += indent(rawBlocks.defaults);
      and before the closing brace at L246:
        for (const k of ['collapse','stagger','gated','reveal','micro'])
          if (rawBlocks[k]) css += indent(rawBlocks[k]);
      `indent` is four lines: split on newline, prefix IND, rejoin. Emission
      order is fixed in code, not read from object key order, so the sheet is
      byte-deterministic exactly as the header of build-utilities promises.

   4. L262-272, token validation. Today a var(--ai-*) is valid only if
      tokens.css declares it or tokensToAdd plans it, and a planned-but-absent
      token is reported as `pending`, which would be wrong for every addon
      token since the addon sheet declares them itself. One line: before the
      missing/pending split, also add every `(--ai-[\w-]+)\s*:` the generated
      css itself declares to `declared`. The core run is unaffected because
      utilities.css declares no tokens of its own.

   5. Two new assertions in validate(), both no-ops for the core spec:
      - a family carrying `manifestOnly` must emit exactly one declaration and
        that declaration must be a custom property, so a marker cannot quietly
        grow real behaviour that belongs in a rawBlock;
      - when `expectedOverlap` is exported, the intersection of the emitted
        class names with public/classes.json must equal it exactly.

   A thin src/registry/build-motion.mjs then reduces to:
      node src/registry/build-utilities.mjs --spec=src/css/motion.spec.mjs --layer=motion
   plus the gzip budget assertion from meta.budgetGzipBytes. If the lead would
   rather not touch build-utilities at all, the fallback is a standalone
   ~130-line build-motion.mjs that imports `selectorFor` (already exported at
   build-utilities.mjs:65) and duplicates emitFamilyBlock. That needs one edit
   to build-utilities regardless: the Main section at L363-399 runs at import
   and WRITES utilities.css, so it has to be put behind a
   `import.meta.url === pathToFileURL(process.argv[1]).href` guard before
   anything can import the module safely.
   ========================================================================= */
