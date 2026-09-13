/**
 * Motion addon catalog entries.
 *
 * Eight demos for the opt-in motion addon. They render correctly with the core
 * stylesheet alone: without the second link tag every element is simply in its
 * final state, which is the fallback the addon is designed around and is worth
 * showing. With `dist/llmcss-motion.css` linked after `llmcss.css` they animate.
 *
 * Spread into the catalog the same way extraComponents is:
 *
 *   import { motionComponents } from './data-motion.mjs';
 *   export const components = [...baseComponents, ...extraComponents, ...motionComponents];
 *
 * Filing: `category: 'primitive'` with `'motion'` and `'addon'` in `tags`.
 * ComponentCategory is a closed union of four ids re-listed literally in six
 * more places, so a fifth category would be seven files of churn for eight
 * demos. The components page filters on the tag instead.
 *
 * Every entry carries `addon: 'motion'`, the optional key the showcase reads to
 * inject the addon link into the preview frame and to print the one-line "needs
 * the motion addon" note above the snippet. schema.ts needs the matching
 * optional field; that file is not in this write set.
 *
 * Constraints every snippet below is written to:
 *   Law 1  no card, panel or kpi-card inside another one; these are sibling grids
 *   Law 2  no token in {animate-pulse, pulse, animate-ping, ping, breathe,
 *          blink, animate-bounce}. animate-sweep appears once, inside .skeleton,
 *          which is the gate that makes it animate at all
 *   Law 5  no badge or eyebrow pill above a heading
 *   Law 9  no marquee, no auto-scroll, no .is-auto
 *   No `style` attribute anywhere. validate.mjs reads style attributes looking
 *   for animation values, and the motion demos are the last markup that should
 *   put an animation next to an inline style.
 */

export const motionComponents = [
  {
    id: 'motion-entrances',
    name: 'Entrance Animation Set',
    description:
      'The six one-shot entrance animations, each replaying on load with its own duration and easing modifier.',
    category: 'primitive',
    tier: 'free',
    addon: 'motion',
    tags: ['motion', 'addon', 'animation', 'entrance', 'fade', 'slide', 'scale'],
    html: `<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
  <div class="panel p-4 animate-fade-in">
    <p class="font-semibold">Fade in</p>
    <code class="text-xs">animate-fade-in</code>
  </div>
  <div class="panel p-4 animate-slide-up duration-slow">
    <p class="font-semibold">Slide up</p>
    <code class="text-xs">animate-slide-up duration-slow</code>
  </div>
  <div class="panel p-4 animate-scale-in ease-overshoot">
    <p class="font-semibold">Scale in</p>
    <code class="text-xs">animate-scale-in ease-overshoot</code>
  </div>
  <div class="panel p-4 animate-rise delay-75">
    <p class="font-semibold">Rise</p>
    <code class="text-xs">animate-rise delay-75</code>
  </div>
  <div class="panel p-4 animate-slide-right slide-lg">
    <p class="font-semibold">Slide right</p>
    <code class="text-xs">animate-slide-right slide-lg</code>
  </div>
  <div class="panel p-4 animate-fade-in duration-instant">
    <p class="font-semibold">Fade, instant</p>
    <code class="text-xs">animate-fade-in duration-instant</code>
  </div>
</div>`,
  },

  {
    id: 'motion-stagger-list',
    name: 'Staggered List Entrance',
    description:
      'A settings list whose rows arrive one after another, with the per-child delay handled entirely by nth-child.',
    category: 'primitive',
    tier: 'free',
    addon: 'motion',
    tags: ['motion', 'addon', 'stagger', 'list', 'entrance'],
    html: `<div class="panel p-5">
  <h3 class="font-semibold mb-4">Workspace members</h3>
  <ul class="stagger flex flex-col gap-3">
    <li class="animate-rise flex items-center justify-between">
      <span>Dana Whitfield</span>
      <span class="badge badge-neutral">Owner</span>
    </li>
    <li class="animate-rise flex items-center justify-between">
      <span>Priya Raman</span>
      <span class="badge badge-neutral">Admin</span>
    </li>
    <li class="animate-rise flex items-center justify-between">
      <span>Tomas Eriksen</span>
      <span class="badge badge-neutral">Editor</span>
    </li>
    <li class="animate-rise flex items-center justify-between">
      <span>Aiko Nakamura</span>
      <span class="badge badge-neutral">Viewer</span>
    </li>
  </ul>
</div>`,
  },

  {
    id: 'motion-stagger-fast-grid',
    name: 'Staggered Metric Grid',
    description:
      'Four metrics that fade up in a tight 35ms cascade, with the primary figure weighted heavier than the rest.',
    category: 'primitive',
    tier: 'free',
    addon: 'motion',
    tags: ['motion', 'addon', 'stagger', 'metrics', 'dashboard'],
    html: `<div class="stagger stagger-fast grid grid-cols-2 md:grid-cols-4 gap-4">
  <div class="animate-slide-up">
    <p class="text-sm">Monthly recurring revenue</p>
    <p class="text-3xl font-bold">$412,900</p>
  </div>
  <div class="animate-slide-up">
    <p class="text-sm">Active seats</p>
    <p class="text-xl font-semibold">3,184</p>
  </div>
  <div class="animate-slide-up">
    <p class="text-sm">Net retention</p>
    <p class="text-xl font-semibold">114%</p>
  </div>
  <div class="animate-slide-up">
    <p class="text-sm">Open incidents</p>
    <p class="text-xl font-semibold">2</p>
  </div>
</div>`,
  },

  {
    id: 'motion-scroll-reveal',
    name: 'Scroll Reveal Section',
    description:
      'Three blocks that reveal on scroll using a pure CSS view() timeline, and render plainly visible wherever scroll-driven animations are unsupported.',
    category: 'primitive',
    tier: 'free',
    addon: 'motion',
    tags: ['motion', 'addon', 'reveal', 'scroll', 'scroll-driven'],
    html: `<section class="flex flex-col gap-6">
  <h2 class="reveal-up">Built to be read, not watched</h2>
  <p class="reveal-up prose">Each block below is revealed by a scroll-driven animation. There is no
    observer, no script and no layout thrash. On a browser without scroll-driven animations every
    block simply renders in place, fully visible.</p>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="panel p-5 reveal-up">
      <h3 class="font-semibold">Progress linked</h3>
      <p class="text-sm">The animation is driven by the element's own entry range, so it stops the
        instant the reader stops scrolling.</p>
    </div>
    <div class="panel p-5 reveal-up delay-75">
      <h3 class="font-semibold">Reversible</h3>
      <p class="text-sm">Scrolling back up runs it backwards. That is how a progress timeline
        works, and it is why the addon documents it rather than faking a once-only.</p>
    </div>
    <div class="panel p-5 reveal-scale delay-150">
      <h3 class="font-semibold">Degrades to visible</h3>
      <p class="text-sm">No rule outside the support query sets opacity to zero, so a blocked
        stylesheet cannot hide this paragraph.</p>
    </div>
  </div>
</section>`,
  },

  {
    id: 'motion-disclosure',
    name: 'Animated Disclosure',
    description:
      'A details and summary disclosure that animates its own height from zero, using the grid-rows technique rather than a fixed max-height guess.',
    category: 'primitive',
    tier: 'free',
    addon: 'motion',
    tags: ['motion', 'addon', 'disclosure', 'collapse', 'accordion', 'details'],
    html: `<details class="collapse panel p-5">
  <summary class="font-semibold">What happens to my data when a run is cancelled?</summary>
  <div class="animate-collapse-in duration-fast">
    <div class="prose mt-3">
      <p class="text-sm">Partial output is retained for twenty four hours so you can resume, then
        deleted. Billing stops at the last completed step, not at the point of cancellation.</p>
    </div>
  </div>
</details>`,
  },

  {
    id: 'motion-press-cards',
    name: 'Press and Lift Cards',
    description:
      'Link cards with a two pixel hover lift and a press compression, both transitions with a completely still idle state.',
    category: 'primitive',
    tier: 'free',
    addon: 'motion',
    tags: ['motion', 'addon', 'hover', 'press', 'micro-interaction', 'card'],
    html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <a class="card p-5 lift press flex flex-col gap-2" href="#deployments">
    <span class="font-semibold">Deployments</span>
    <span class="text-sm">Eleven builds shipped this week.</span>
  </a>
  <a class="card p-5 lift press flex flex-col gap-2" href="#incidents">
    <span class="font-semibold">Incidents</span>
    <span class="text-sm">No open incidents across four regions.</span>
  </a>
  <a class="card p-5 lift-lg press-firm flex flex-col gap-2" href="#audit">
    <span class="font-semibold">Audit log</span>
    <span class="text-sm">Two thousand events retained for ninety days.</span>
  </a>
</div>`,
  },

  {
    id: 'motion-loading-sweep',
    name: 'Skeleton Sweep',
    description:
      'A placeholder card whose sweep highlight runs only because the sweep sits inside a skeleton, which is the addon rule that keeps Law 2 unbreakable.',
    category: 'primitive',
    tier: 'free',
    addon: 'motion',
    tags: ['motion', 'addon', 'skeleton', 'loading', 'progress', 'placeholder'],
    html: `<div class="card p-5 flex flex-col gap-3" aria-busy="true">
  <div class="flex items-center gap-3">
    <div class="skeleton skeleton-avatar overflow-hidden">
      <div class="animate-sweep w-full h-full"></div>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text"></div>
    </div>
  </div>
  <div class="skeleton skeleton-rect"></div>
  <div class="flex items-center gap-2">
    <span class="spinner spinner-sm"></span>
    <span class="text-sm">Loading workspace activity</span>
  </div>
</div>`,
  },

  {
    id: 'motion-view-transition',
    name: 'View Transition Pair',
    description:
      'A gallery tile and its detail panel sharing view transition names, so the browser morphs one into the other across a navigation.',
    category: 'primitive',
    tier: 'free',
    addon: 'motion',
    tags: ['motion', 'addon', 'view-transition', 'navigation', 'gallery'],
    html: `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <a class="card p-5 lift flex flex-col gap-3" href="#release-notes">
    <div class="vt-media skeleton skeleton-rect rounded-md"></div>
    <h3 class="vt-title font-semibold">Release 0.4.0</h3>
    <p class="text-sm">The class prefix is gone and every name is listed in classes.json.</p>
  </a>
  <div class="panel p-5 flex flex-col gap-3 animate-fade-in" id="release-notes">
    <div class="vt-media skeleton skeleton-rect rounded-md"></div>
    <h3 class="vt-title font-semibold">Release 0.4.0</h3>
    <p class="prose text-sm">Opening the tile hands the browser two matching names, so the image and
      the heading travel to their new positions instead of cutting. Add
      <code>@view-transition { navigation: auto; }</code> to your own stylesheet to switch this on
      across page loads; the addon does not ship that at-rule, because it is document scoped and
      would change behaviour for every site that merely linked the file.</p>
  </div>
</div>`,
  },
];

export default motionComponents;
