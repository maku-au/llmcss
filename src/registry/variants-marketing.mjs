/**
 * Structural layout variants for the marketing components (catalog batch 1).
 *
 * A variant moves the boxes: split versus centered, media top versus media
 * left, one column versus two, table versus cards. A recolour, a radius change
 * or a density change is not a variant; those are data-ai-skin, data-ai-accent
 * and data-ai-density on the html element.
 *
 * Every entry reuses its parent's copy, people, prices and component classes
 * from data.mjs or data-ungated.mjs, so a reader comparing two layouts is
 * comparing layouts and nothing else. Tokens only, no hard-coded colour, no
 * style attribute, so both themes and all five skins work by construction.
 *
 * Keys are parent component ids. Addressed flat as parent:variant.
 *
 * The six logo rail wordmarks come from logo-marks.mjs so the marquee-ticker
 * demo, its variants and the templates all show the same set of companies.
 */

import { LOGO_MARKS, logoRailItem, logoRailItems } from './logo-marks.mjs';

export const marketingVariants = {
  'hero-split': [
    {
      id: 'centered',
      name: 'Centered',
      description:
        'One column. Headline, lead and actions centre on the page and the media column is gone at every width.',
      guidance:
        'Sits at the top of the page, above the logo rail. Best for a launch, a manifesto or a developer tool whose proof is the install line rather than a screenshot. Avoid it when you have a real interface to show, because a centered hero with no media leaves the fold empty and the split layout exists for that. Pairs with marquee-ticker and stats-band directly beneath it.',
      html: `<section class="hero is-centered">
  <div class="container">
    <h1 class="hero-title max-w-4xl mx-auto text-balance">Build software that looks human, not generated.</h1>
    <p class="hero-lead max-w-2xl">The open UI library built for AI agents and design engineers. Pure native CSS, tokenized skinning, and zero cookie-cutter templates.</p>
    <div class="hero-actions">
      <a class="btn btn-primary btn-lg" href="#components">Browse 100+ Components</a>
      <a class="btn btn-outline btn-lg" href="#docs">Documentation</a>
    </div>
  </div>
</section>`,
    },
    {
      id: 'media-top',
      name: 'Media top',
      description:
        'The product panel moves above the copy at every width and the copy underneath is capped to a prose measure instead of sharing a row.',
      guidance:
        'Sits at the top of the page. Best when the screenshot is the argument and the headline is the caption, which is the usual shape for an analytics or observability product. Avoid it when the panel needs more than about 16:9 of height, because the fold then holds media and nothing else. Pairs with feature-grid:three-up below, which carries the detail the hero no longer has room for.',
      html: `<section class="hero">
  <div class="container">
    <div class="flex flex-col gap-10">
      <div class="hero-visual p-6 md:p-8">
        <div class="flex justify-between items-center mb-6">
          <span class="text-xs font-mono text-muted">app.analytics.ts</span>
          <span class="text-xs text-muted flex items-center gap-2"><span class="pip pip-ok"></span>Live stream</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="kpi-card">
            <span class="kpi-label">Weekly Active Users</span>
            <span class="kpi-value">48,290</span>
            <span class="kpi-trend is-up">Up 24.8 percent on last week</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Conversion Rate</span>
            <span class="kpi-value">4.12%</span>
            <span class="kpi-trend is-up">Up 1.2 points on last week</span>
          </div>
        </div>
      </div>
      <div class="max-w-prose">
        <h1 class="hero-title">Build software that looks human, not generated.</h1>
        <p class="hero-lead">The open UI library built for AI agents and design engineers. Pure native CSS, tokenized skinning, and zero cookie-cutter templates.</p>
        <div class="hero-actions mt-8">
          <a class="btn btn-primary btn-lg" href="#components">Browse 100+ Components</a>
          <a class="btn btn-outline btn-lg" href="#docs">Documentation</a>
        </div>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      id: 'terminal',
      name: 'Terminal',
      description:
        'Keeps the split but replaces the product panel with the install sequence, so the right column is code rather than an interface.',
      guidance:
        'Sits at the top of the page for a developer tool. Best when the fastest proof is that the thing installs in one line and there is no dashboard worth showing yet. Avoid it on a page aimed at buyers rather than builders, because a shell prompt reads as documentation to everyone else. Pairs with marquee-ticker beneath and feature-grid:numbered-steps further down.',
      html: `<section class="hero">
  <div class="container">
    <div class="hero-split">
      <div>
        <h1 class="hero-title">Build software that looks human, not generated.</h1>
        <p class="hero-lead">The open UI library built for AI agents and design engineers. Pure native CSS, tokenized skinning, and zero cookie-cutter templates.</p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" href="#components">Browse 100+ Components</a>
          <a class="btn btn-outline btn-lg" href="#docs">Documentation</a>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-mono text-muted">install.sh</span>
          <span class="badge badge-mono">npm</span>
        </div>
        <pre class="code-block"><code>npm i llmcss

# one link tag, no build step
&lt;link rel="stylesheet" href="/llmcss.css"&gt;

npx llmcss add hero-split
npx llmcss audit index.html</code></pre>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      id: 'editorial',
      name: 'Editorial',
      description:
        'Headline runs across the full measure in the serif face, a hairline closes it, and the lead breaks into two text columns underneath instead of sitting beside a visual.',
      guidance:
        'Sits at the top of a long-form or announcement page. Best when the argument is written rather than shown, such as a release essay or a positioning page. Avoid it when the lead is shorter than about forty words, because two columns of one sentence each read as a mistake. Pairs with callout-editorial and the editorial skin, and reads best at the default tracking, never tighter than -0.035em.',
      html: `<section class="hero">
  <div class="container">
    <h1 class="hero-title font-serif max-w-4xl text-balance">Build software that looks human, not generated.</h1>
    <hr class="divider mt-8" />
    <div class="md:columns-2 gap-x-10 max-w-5xl">
      <p class="hero-lead break-inside-avoid">The open UI library built for AI agents and design engineers. Pure native CSS, tokenized skinning, and zero cookie-cutter templates.</p>
      <p class="text-secondary break-inside-avoid">Every class an agent emits is checked against the real stylesheet before it ships, so a name that does not exist never reaches a pull request. Reset, tokens, base, components and utilities are separate layers, which means you can override any of it without a specificity fight.</p>
    </div>
    <div class="hero-actions mt-10">
      <a class="btn btn-primary btn-lg" href="#components">Browse 100+ Components</a>
      <a class="btn btn-outline btn-lg" href="#docs">Documentation</a>
    </div>
  </div>
</section>`,
    },
  ],

  'hero-bento-pro': [
    {
      id: 'two-cell',
      name: 'Two cell',
      description:
        'Two cells instead of five: one wide and tall on the left, one narrow and tall on the right, both running the full height of the grid.',
      guidance:
        'Sits at the top of the page when there are exactly two things to say. Best when one claim needs a paragraph and a code line and the other needs a sentence and a status. Avoid it when you have three or more equal claims, because two cells force you to bury the third. Pairs with hero-bento-pro:feature-rail further down the page for the detail the two cells leave out.',
      html: `<section class="hero">
  <div class="container">
    <div class="text-center max-w-3xl mx-auto mb-10">
      <h1 class="hero-title">Architected for deep intelligence</h1>
      <p class="hero-lead mx-auto">Give your agentic coding workflows the aesthetic craft of top-tier product studios.</p>
    </div>
    <div class="bento-grid">
      <div class="bento-cell bento-span-2 bento-row-2">
        <div>
          <h2 class="card-title text-xl">Infinite Skinning Architecture</h2>
          <p class="text-secondary mt-3">Switch between Minimalist Obsidian, Warm Editorial, Neo-Brutalist and Swiss Modern with a single data attribute. Nothing in the markup changes.</p>
        </div>
        <p class="font-mono text-xs text-muted mt-6">&lt;html data-ai-skin="editorial"&gt;</p>
      </div>
      <div class="bento-cell bento-row-2">
        <div>
          <h2 class="card-title">MCP Server Ready</h2>
          <p class="text-secondary mt-3">Native Model Context Protocol integration lets autonomous agents query the catalog and assemble sections without a screenshot.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3 mt-6">
          <span class="badge badge-neutral">Port 8080</span>
          <span class="text-xs text-muted flex items-center gap-2"><span class="pip pip-ok"></span>Connected</span>
        </div>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      id: 'feature-rail',
      name: 'Feature rail',
      description:
        'Headline block on its own above one row of four equal cells, two up on a phone and four up from md, with the first figure set larger than the rest.',
      guidance:
        'Sits at the top of the page when the proof is four numbers rather than a screenshot. Best for a performance or cost claim where the figures are the product. Avoid it when all four numbers carry the same weight, because a flat rail of identical figures is exactly what law 8 is about; size one of them. Pairs with stats-band lower on the page for the fuller set.',
      html: `<section class="hero">
  <div class="container">
    <div class="max-w-3xl">
      <h1 class="hero-title">Architected for deep intelligence</h1>
      <p class="hero-lead">Give your agentic coding workflows the aesthetic craft of top-tier product studios.</p>
    </div>
    <div class="bento-grid grid-cols-2 md:grid-cols-4 mt-12">
      <div class="bento-cell">
        <div>
          <span class="text-xs font-mono text-muted">Runtime overhead</span>
          <p class="font-display font-bold text-4xl mt-2 tabular">0 ms</p>
        </div>
        <p class="text-xs text-secondary mt-4">No CSS-in-JS. The browser does the cascading.</p>
      </div>
      <div class="bento-cell">
        <div>
          <span class="text-xs font-mono text-muted">Bundle</span>
          <p class="font-display font-bold text-2xl mt-2 tabular">2.5 KB</p>
        </div>
        <p class="text-xs text-secondary mt-4">Optional runtime, loaded only for modals, drawers and tabs.</p>
      </div>
      <div class="bento-cell">
        <div>
          <span class="text-xs font-mono text-muted">Token savings</span>
          <p class="font-display font-bold text-2xl mt-2 tabular">68%</p>
        </div>
        <p class="text-xs text-secondary mt-4">Named classes instead of utility soup in the prompt.</p>
      </div>
      <div class="bento-cell">
        <div>
          <span class="text-xs font-mono text-muted">Skin switch</span>
          <p class="font-display font-bold text-2xl mt-2 tabular">1 attribute</p>
        </div>
        <p class="text-xs text-secondary mt-4">Obsidian, Editorial, Neo-Brutalist and Swiss Modern.</p>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      id: 'stat-anchor',
      name: 'Stat anchor',
      description:
        'One dominant stat cell holds two thirds of the row and three supporting cells stack beside it at roughly half its height.',
      guidance:
        'Sits at the top of the page when one number carries the argument and three qualify it. Best when the headline figure is unusual enough to stop a reader on its own. Avoid it when the supporting figures are more interesting than the anchor, because the layout permanently subordinates them. Pairs with pricing-tier-cards further down, where the anchor number becomes the reason the price is fair.',
      html: `<section class="hero">
  <div class="container">
    <div class="max-w-3xl mb-12">
      <h1 class="hero-title">Architected for deep intelligence</h1>
      <p class="hero-lead">Give your agentic coding workflows the aesthetic craft of top-tier product studios.</p>
    </div>
    <div class="bento-grid md:grid-cols-3">
      <div class="bento-cell bento-span-2">
        <div class="stat is-primary">
          <div class="stat-value">0 ms</div>
          <div class="stat-label">CSS-in-JS runtime overhead. Native browser layers do the cascading, so there is nothing to hydrate.</div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="bento-cell">
          <div class="stat">
            <div class="stat-value">2.5 KB</div>
            <div class="stat-label">Optional runtime, loaded only for modals, drawers and tabs</div>
          </div>
        </div>
        <div class="bento-cell">
          <div class="stat">
            <div class="stat-value">68%</div>
            <div class="stat-label">Fewer tokens in the prompt than hand-written utility soup</div>
          </div>
        </div>
        <div class="bento-cell">
          <div class="stat">
            <div class="stat-value">1</div>
            <div class="stat-label">Data attribute to switch the whole skin</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    },
  ],

  'navbar-modern': [
    {
      id: 'centered-brand',
      name: 'Centered brand',
      description:
        'The brand moves to the middle of the bar and the link list splits into two groups, one either side of it.',
      guidance:
        'Sits at the top of every page, above the announcement bar only if there is one. Best when the brand is the thing people are looking for and there are four or fewer destinations to balance either side. Avoid it with an odd number of links or with any group longer than three, because the brand stops looking centered. Pairs with mobile-nav-drawer below md, where both groups collapse and only the brand and one action remain.',
      html: `<header class="navbar">
  <div class="container">
    <div class="navbar-inner">
      <nav class="nav-links flex-1" aria-label="Primary">
        <a href="#components" class="nav-link is-active" aria-current="page">Components</a>
        <a href="#templates" class="nav-link">Templates</a>
      </nav>
      <a href="#" class="brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <span>LLMCSS</span>
      </a>
      <nav class="nav-links flex-1 justify-end" aria-label="Secondary">
        <a href="#pricing" class="nav-link">Pricing</a>
        <a href="#docs" class="nav-link">Documentation</a>
      </nav>
      <a href="#start" class="btn btn-primary btn-xs md:hidden">Get Started</a>
    </div>
  </div>
</header>`,
    },
    {
      id: 'split-search',
      name: 'Split search',
      description:
        'Search takes the middle of the bar and the actions hold the right edge; below md the field wraps onto a second row of its own.',
      guidance:
        'Sits at the top of a catalog, docs or dashboard site where finding beats browsing. Best when the corpus is large enough that a visitor arrives knowing the name of what they want. Avoid it on a marketing page with five pages of content, because an empty search field advertises that there is a lot to wade through. Pairs with filter-toolbar on the results page and keeps the caret themed through the input class.',
      html: `<header class="navbar">
  <div class="container">
    <div class="navbar-inner">
      <a href="#" class="brand md:order-1">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <span>LLMCSS</span>
      </a>
      <nav class="nav-links md:order-3" aria-label="Primary">
        <a href="#components" class="nav-link is-active" aria-current="page">Components</a>
        <a href="#templates" class="nav-link">Templates</a>
      </nav>
      <div class="flex items-center gap-2 md:order-4">
        <a href="#login" class="btn btn-ghost btn-xs hidden sm:inline-flex">Log in</a>
        <a href="#start" class="btn btn-primary btn-xs">Get Started</a>
      </div>
      <div class="navbar-search basis-full md:basis-auto md:flex-1 md:order-2">
        <div class="input-group">
          <span class="input-addon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></span>
          <input type="search" class="input" placeholder="Search components, tokens and templates" aria-label="Search the catalog" />
        </div>
      </div>
    </div>
  </div>
</header>`,
    },
    {
      id: 'two-row',
      name: 'Two row',
      description:
        'A quiet utility row carrying status, region and sign in sits above the bar, and the primary navigation keeps the row below to itself.',
      guidance:
        'Sits at the very top of the page, above the header, and scrolls away while the bar stays. Best when status or region genuinely changes what a visitor does next, which is true for infrastructure and false for most other products. Avoid it when the top row would only repeat links already in the bar, because it doubles the chrome for nothing. Pairs with announcement-bar only if you drop one of the two, never both.',
      html: `<div class="section-banner text-xs">
  <span class="flex items-center gap-2"><span class="pip pip-ok"></span>All systems normal</span>
  <span class="divider-vertical hidden sm:inline-flex" aria-hidden="true"></span>
  <span class="hidden sm:inline-flex">Region: Sydney</span>
  <span class="divider-vertical" aria-hidden="true"></span>
  <a href="#login">Log in</a>
</div>
<header class="navbar">
  <div class="container">
    <div class="navbar-inner">
      <a href="#" class="brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <span>LLMCSS</span>
      </a>
      <nav class="nav-links" aria-label="Primary">
        <a href="#components" class="nav-link is-active" aria-current="page">Components</a>
        <a href="#templates" class="nav-link">Templates</a>
        <a href="#pricing" class="nav-link">Pricing</a>
        <a href="#docs" class="nav-link">Documentation</a>
      </nav>
      <a href="#start" class="btn btn-primary btn-xs">Get Started</a>
    </div>
  </div>
</header>`,
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description:
        'Brand on the left, one action on the right, and nothing else: no link list, no search, no second tier.',
      guidance:
        'Sits at the top of a single purpose page such as a launch page, a checkout or a signup flow. Best when every link you could add is a way to leave before converting. Avoid it on any page a visitor might arrive at from search, because there is then no way to reach the rest of the site. Pairs with footer-multi-col:sitemap-wide, which carries the navigation the bar gave up.',
      html: `<header class="navbar">
  <div class="container">
    <div class="navbar-inner">
      <a href="#" class="brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <span>LLMCSS</span>
      </a>
      <a href="#start" class="btn btn-primary btn-sm">Get Started</a>
    </div>
  </div>
</header>`,
    },
  ],

  'mobile-nav-drawer': [
    {
      id: 'full-sheet',
      name: 'Full sheet',
      description:
        'The panel fills the viewport instead of covering part of it, the links are set at list scale, and the two actions pin to the footer.',
      guidance:
        'Sits behind the menu button and only below md. Best when the menu is the whole task, which is true on a phone where a visible sliver of page behind the panel is a distraction rather than context. Avoid it when the visitor is mid-task, such as in a checkout, because a full sheet hides the thing they were doing. Pairs with navbar-modern:minimal, which has nowhere else to put its navigation.',
      html: `<header class="navbar">
  <div class="container navbar-inner">
    <a href="#" class="brand">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="2"/><rect x="9" y="9" width="12" height="12" rx="2.5" fill="currentColor"/></svg>
      <span>Northwind</span>
    </a>
    <nav class="hidden md:flex items-center gap-1" aria-label="Primary">
      <a href="#" class="nav-link is-active" aria-current="page">Product</a>
      <a href="#" class="nav-link">Pricing</a>
      <a href="#" class="nav-link">Docs</a>
      <a href="#" class="nav-link">Changelog</a>
    </nav>
    <div class="flex items-center gap-2">
      <a href="#" class="btn btn-primary btn-xs hidden md:inline-flex">Start free</a>
      <button type="button" class="btn btn-outline btn-xs btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#nav-full-sheet" aria-controls="nav-full-sheet" aria-expanded="false" aria-label="Open menu">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>

<div id="nav-full-sheet" class="drawer md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel max-w-none min-h-screen" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer-header">
      <span class="drawer-title">Northwind</span>
      <button type="button" class="close" data-ai-dismiss="drawer" aria-label="Close menu"></button>
    </div>
    <nav class="drawer-body drawer-nav text-lg" aria-label="Primary">
      <a href="#" class="sidebar-item is-active" data-ai-dismiss="drawer" aria-current="page">Product</a>
      <a href="#" class="sidebar-item" data-ai-dismiss="drawer">Pricing</a>
      <a href="#" class="sidebar-item" data-ai-dismiss="drawer">Docs</a>
      <a href="#" class="sidebar-item" data-ai-dismiss="drawer">Changelog</a>
    </nav>
    <div class="drawer-footer flex gap-2">
      <a href="#" class="btn btn-outline flex-1" data-ai-dismiss="drawer">Sign in</a>
      <a href="#" class="btn btn-primary flex-1">Start free</a>
    </div>
  </div>
</div>`,
    },
    {
      id: 'bottom-sheet',
      name: 'Bottom sheet',
      description:
        'The panel rises from the bottom edge rather than sliding in from the side, and the links sit in a two column grid instead of a stack.',
      guidance:
        'Sits behind the menu button and only below md. Best when the destinations are short labels and the thumb is at the bottom of a tall phone, which is where a bottom sheet opens under the hand. Avoid it for more than about eight destinations, because a bottom sheet that scrolls fights the swipe that opened it. Pairs with a sticky bottom action bar, which it covers cleanly rather than overlapping.',
      html: `<header class="navbar">
  <div class="container navbar-inner">
    <a href="#" class="brand">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="2"/><rect x="9" y="9" width="12" height="12" rx="2.5" fill="currentColor"/></svg>
      <span>Northwind</span>
    </a>
    <nav class="hidden md:flex items-center gap-1" aria-label="Primary">
      <a href="#" class="nav-link is-active" aria-current="page">Product</a>
      <a href="#" class="nav-link">Pricing</a>
      <a href="#" class="nav-link">Docs</a>
      <a href="#" class="nav-link">Changelog</a>
    </nav>
    <div class="flex items-center gap-2">
      <a href="#" class="btn btn-primary btn-xs hidden md:inline-flex">Start free</a>
      <button type="button" class="btn btn-outline btn-xs btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#nav-bottom-sheet" aria-controls="nav-bottom-sheet" aria-expanded="false" aria-label="Open menu">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>

<div id="nav-bottom-sheet" class="drawer drawer-bottom md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer-header">
      <span class="drawer-title">Menu</span>
      <button type="button" class="close" data-ai-dismiss="drawer" aria-label="Close menu"></button>
    </div>
    <div class="drawer-body">
      <nav class="grid grid-cols-2 gap-2" aria-label="Primary">
        <a href="#" class="sidebar-item is-active" data-ai-dismiss="drawer" aria-current="page">Product</a>
        <a href="#" class="sidebar-item" data-ai-dismiss="drawer">Pricing</a>
        <a href="#" class="sidebar-item" data-ai-dismiss="drawer">Docs</a>
        <a href="#" class="sidebar-item" data-ai-dismiss="drawer">Changelog</a>
      </nav>
    </div>
    <div class="drawer-footer">
      <a href="#" class="btn btn-primary w-full">Start free</a>
    </div>
  </div>
</div>`,
    },
  ],

  'footer-multi-col': [
    {
      id: 'compact',
      name: 'Compact',
      description:
        'One row instead of a grid: brand on the left, the links inline on the right, and no column headings at all.',
      guidance:
        'Sits at the foot of a page that is already short, such as a landing page or a single article. Best when there are fewer than about eight links in total and none of them need grouping. Avoid it on a site with real depth, because an undifferentiated row of twelve links is harder to scan than four labelled columns. Pairs with navbar-modern:minimal, and with cta-band directly above so the page still ends on an action.',
      html: `<footer class="footer footer-compact">
  <div class="container">
    <div class="flex flex-wrap items-center justify-between gap-8">
      <a href="#" class="brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <span>LLMCSS</span>
      </a>
      <nav class="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Footer">
        <a href="#components">Components</a>
        <a href="#templates">Marketing Sections</a>
        <a href="#mcp">MCP Server</a>
        <a href="#pricing">Pricing</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
      </nav>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LLMCSS Inc. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="#">GitHub</a>
        <a href="#">Discord</a>
        <a href="#">X (Twitter)</a>
      </div>
    </div>
  </div>
</footer>`,
    },
    {
      id: 'brand-heavy',
      name: 'Brand heavy',
      description:
        'The brand column runs double width and carries the blurb and the install line, leaving two link columns rather than three.',
      guidance:
        'Sits at the foot of a developer facing site. Best when the last thing on the page should be the one command that gets someone started, which is a stronger close than a list of legal links. Avoid it when the footer is doing real navigation work, because two columns will not hold a sitemap. Pairs with hero-split:terminal at the top, so the page opens and closes on the same command.',
      html: `<footer class="footer">
  <div class="container">
    <div class="footer-grid md:grid-cols-2 lg:grid-cols-4">
      <div class="footer-brand lg:col-span-2">
        <a href="#" class="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          <span>LLMCSS</span>
        </a>
        <p class="footer-blurb">High-craft UI library engineered for human developers and autonomous AI agents.</p>
        <span class="footer-cmd mt-4">npx llmcss add footer-multi-col</span>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="footer-brand-heavy-product">Product <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="footer-brand-heavy-product">
          <li><a href="#">Components</a></li>
          <li><a href="#">Marketing Sections</a></li>
          <li><a href="#">SaaS Dashboard</a></li>
          <li><a href="#">Themes</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="footer-brand-heavy-tools">Agentic Tools <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="footer-brand-heavy-tools">
          <li><a href="#">MCP Server</a></li>
          <li><a href="#">CLI Reference</a></li>
          <li><a href="#">llms.txt Specification</a></li>
          <li><a href="#">Agent Rules</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LLMCSS Inc. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="#">GitHub</a>
        <a href="#">Discord</a>
        <a href="#">X (Twitter)</a>
      </div>
    </div>
  </div>
</footer>`,
    },
    {
      id: 'two-column',
      name: 'Two column',
      description:
        'Two link columns on the left and a newsletter field taking the remaining half, so the footer ends on a field rather than a list.',
      guidance:
        'Sits at the foot of a page where the release notes are the reason to come back. Best when there is something genuinely worth mailing, such as a changelog, and the cadence is predictable. Avoid it when the list is a lead capture in disguise, because a footer field that asks for an email and gives nothing back is read that way. Pairs with announcement-bar at the top pointing at the same changelog.',
      html: `<footer class="footer">
  <div class="container">
    <div class="footer-grid md:grid-cols-2 lg:grid-cols-4">
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="footer-two-col-product">Product <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="footer-two-col-product">
          <li><a href="#">Components</a></li>
          <li><a href="#">Marketing Sections</a></li>
          <li><a href="#">SaaS Dashboard</a></li>
          <li><a href="#">Themes</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="footer-two-col-company">Company <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="footer-two-col-company">
          <li><a href="#">About</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
        </ul>
      </div>
      <div class="lg:col-span-2">
        <h4 class="footer-heading">Changelog by email</h4>
        <form class="mt-4 max-w-sm">
          <div class="input-group">
            <input type="email" class="input" placeholder="you@company.com" aria-label="Email address" />
            <button type="submit" class="btn btn-primary btn-sm">Subscribe</button>
          </div>
          <p class="form-hint mt-2">One message per release. No marketing, and one click to stop.</p>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LLMCSS Inc. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="#">GitHub</a>
        <a href="#">Discord</a>
        <a href="#">X (Twitter)</a>
      </div>
    </div>
  </div>
</footer>`,
    },
    {
      id: 'sitemap-wide',
      name: 'Sitemap wide',
      description:
        'Five equal link columns and no brand block, so the footer is navigation and the legal row is all that follows it.',
      guidance:
        'Sits at the foot of a large site where the footer is a real index rather than an afterthought. Best when every column has at least three entries and the groupings match how people actually ask for things. Avoid it on a site with fewer than about fifteen destinations, because five thin columns look padded. Pairs with navbar-modern:minimal, which deliberately leaves all the navigation to this.',
      html: `<footer class="footer">
  <div class="container">
    <div class="footer-grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="footer-sitemap-product">Product <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="footer-sitemap-product">
          <li><a href="#">Components</a></li>
          <li><a href="#">Marketing Sections</a></li>
          <li><a href="#">SaaS Dashboard</a></li>
          <li><a href="#">Themes</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="footer-sitemap-tools">Agentic Tools <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="footer-sitemap-tools">
          <li><a href="#">MCP Server</a></li>
          <li><a href="#">CLI Reference</a></li>
          <li><a href="#">llms.txt Specification</a></li>
          <li><a href="#">Agent Rules</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="footer-sitemap-learn">Learn <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="footer-sitemap-learn">
          <li><a href="#">Quickstart</a></li>
          <li><a href="#">Design Harness</a></li>
          <li><a href="#">Anti-slop Laws</a></li>
          <li><a href="#">Changelog</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="footer-sitemap-company">Company <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="footer-sitemap-company">
          <li><a href="#">About</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="footer-sitemap-legal">Legal <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="footer-sitemap-legal">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Licence</a></li>
          <li><a href="#">Security</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LLMCSS Inc. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="#">GitHub</a>
        <a href="#">Discord</a>
        <a href="#">X (Twitter)</a>
      </div>
    </div>
  </div>
</footer>`,
    },
  ],

  'pricing-tier-cards': [
    {
      id: 'two-tier',
      name: 'Two tier',
      description:
        'Two plans side by side instead of three, free on the left and paid on the right, with the paid tier carrying the ribbon.',
      guidance:
        'Sits in the middle of a landing page, after the features and before the FAQ. Best when the product is open core or freemium and the real decision is binary. Avoid it when a third tier is doing genuine work for a different buyer, because folding enterprise into Pro loses both. Pairs with faq-section directly beneath, which is where the questions a missing third column would have answered belong.',
      html: `<section class="section">
  <div class="container">
    <div class="text-center max-w-2xl mx-auto">
      <h2 class="section-title">Predictable, transparent pricing</h2>
      <p class="section-lead mx-auto">Start building for free. Upgrade to Pro when you need advanced marketing and SaaS templates.</p>
    </div>
    <div class="pricing-grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
      <div class="pricing-card">
        <div class="pricing-header">
          <h3 class="pricing-plan">Starter (Free)</h3>
          <p class="text-sm text-secondary">For individual developers and open source projects.</p>
          <div class="pricing-amount">
            <span class="pricing-price">$0</span>
            <span class="pricing-period">/ month</span>
          </div>
        </div>
        <ul class="pricing-features">
          <li>40+ Core UI Primitives</li>
          <li>Pure Modern CSS Token Engine</li>
          <li>Light-DOM Custom Elements</li>
          <li>Public llms.txt and docs</li>
        </ul>
        <a class="btn btn-outline w-full" href="#start">Get Started Free</a>
      </div>
      <div class="pricing-card pricing-featured">
        <span class="pricing-ribbon">Most popular</span>
        <div class="pricing-header">
          <h3 class="pricing-plan">LLMCSS Pro</h3>
          <p class="text-sm text-secondary">For agencies, AI builders, and fast-moving teams.</p>
          <div class="pricing-amount">
            <span class="pricing-price">$9</span>
            <span class="pricing-period">/ month</span>
          </div>
        </div>
        <ul class="pricing-features">
          <li>Everything in Starter</li>
          <li>Themed section templates and page kits</li>
          <li>Skin-specific composed blocks</li>
          <li>Dedicated MCP Server Integration</li>
          <li>Private CLI Token Access</li>
        </ul>
        <a class="btn btn-primary w-full" href="#pricing">Upgrade to Pro</a>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      id: 'single-plan',
      name: 'Single plan',
      description:
        'One plan, opened out into two halves of a single card: price and action on the left, the full feature list on the right, with no grid around it.',
      guidance:
        'Sits in the middle of a page for a product with exactly one price. Best when there is nothing to compare and a three column grid would invent a decision the visitor does not have. Avoid it when you intend to add tiers later, because moving from one card to three changes the whole section. Pairs with faq-section:inline-answers beneath, which handles the objections a comparison table would otherwise absorb.',
      html: `<section class="section">
  <div class="container">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <h2 class="section-title">Predictable, transparent pricing</h2>
      <p class="section-lead mx-auto">One plan, billed monthly. Everything in the catalog, every skin, every tool.</p>
    </div>
    <div class="pricing-card grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
      <div class="pricing-header mb-0">
        <h3 class="pricing-plan">LLMCSS Pro</h3>
        <p class="text-sm text-secondary">For agencies, AI builders, and fast-moving teams.</p>
        <div class="pricing-amount">
          <span class="pricing-price">$9</span>
          <span class="pricing-period">/ month</span>
        </div>
        <a class="btn btn-primary w-full mt-6" href="#pricing">Upgrade to Pro</a>
        <p class="form-hint mt-3">Cancel any time. The CSS and HTML you already copied stay yours.</p>
      </div>
      <ul class="pricing-features mt-0 mb-0">
        <li>Everything in Starter</li>
        <li>Themed section templates and page kits</li>
        <li>Skin-specific composed blocks</li>
        <li>Dedicated MCP Server Integration</li>
        <li>Private CLI Token Access</li>
      </ul>
    </div>
  </div>
</section>`,
    },
    {
      id: 'feature-table',
      name: 'Feature table',
      description:
        'The three plans become table columns and the features become rows, with each price sitting in its column header instead of on a card.',
      guidance:
        'Sits below the plan cards on a long pricing page, or replaces them when the buyer is a committee. Best when the decision turns on which specific capabilities each tier includes rather than on the price. Avoid it as the only pricing block on a phone-heavy page, since a four column table there is a horizontal scroll. Pairs with pricing-tier-cards above it, so a visitor can read the summary first and the detail second.',
      html: `<section class="section">
  <div class="container">
    <div class="max-w-2xl">
      <h2 class="section-title">What each plan includes</h2>
      <p class="section-lead">The same capabilities as the cards above, read down a column instead of across three.</p>
    </div>
    <div class="matrix-container mt-8">
      <table class="matrix-table">
        <caption class="sr-only">Capabilities included in Starter, Pro and Team</caption>
        <thead>
          <tr>
            <th class="matrix-feature-col">Included</th>
            <th>Starter <span class="block text-xs font-normal text-muted">$0 / month</span></th>
            <th>LLMCSS Pro <span class="block text-xs font-normal text-muted">$9 / month</span></th>
            <th>Team <span class="block text-xs font-normal text-muted">Custom</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="matrix-feature-col">40+ Core UI Primitives</td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
          </tr>
          <tr>
            <td class="matrix-feature-col">Pure Modern CSS Token Engine</td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
          </tr>
          <tr>
            <td class="matrix-feature-col">Themed section templates and page kits</td>
            <td><span class="mark mark-no" role="img" aria-label="Not included"></span></td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
          </tr>
          <tr>
            <td class="matrix-feature-col">Dedicated MCP Server Integration</td>
            <td><span class="mark mark-no" role="img" aria-label="Not included"></span></td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
          </tr>
          <tr>
            <td class="matrix-feature-col">Unlimited team seats</td>
            <td><span class="mark mark-no" role="img" aria-label="Not included"></span></td>
            <td><span class="mark mark-warn" role="img" aria-label="Limited"></span> Per seat</td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
          </tr>
          <tr>
            <td class="matrix-feature-col">Dedicated SLA and support</td>
            <td><span class="mark mark-no" role="img" aria-label="Not included"></span></td>
            <td><span class="mark mark-no" role="img" aria-label="Not included"></span></td>
            <td><span class="mark mark-yes" role="img" aria-label="Included"></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>`,
    },
    {
      id: 'horizontal-rows',
      name: 'Horizontal rows',
      description:
        'Each plan becomes a full width row from md: name and summary on the left, price in the middle, action on the right.',
      guidance:
        'Sits in the middle of a narrow page, or in an account screen where the current plan has to be obvious. Best when the plans differ mostly by price and seat count rather than by a long feature list. Avoid it when each plan needs five or more bullets, because a row has nowhere to put them. Pairs with pricing-tier-cards:feature-table beneath for the detail the rows compress out.',
      html: `<section class="section">
  <div class="container max-w-4xl">
    <h2 class="section-title">Predictable, transparent pricing</h2>
    <p class="section-lead">Start building for free. Upgrade to Pro when you need advanced marketing and SaaS templates.</p>
    <div class="flex flex-col gap-4 mt-8">
      <div class="pricing-card md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 class="pricing-plan">Starter (Free)</h3>
          <p class="text-sm text-secondary mt-1">40+ core primitives, the token engine and the public docs.</p>
        </div>
        <div class="pricing-amount mb-0">
          <span class="pricing-price text-3xl">$0</span>
          <span class="pricing-period">/ month</span>
        </div>
        <a class="btn btn-outline" href="#start">Get Started Free</a>
      </div>
      <div class="pricing-card pricing-featured md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 class="pricing-plan">LLMCSS Pro</h3>
          <p class="text-sm text-secondary mt-1">Themed page kits, skin-specific blocks and the private CLI token.</p>
        </div>
        <div class="pricing-amount mb-0">
          <span class="pricing-price text-3xl">$9</span>
          <span class="pricing-period">/ month</span>
        </div>
        <a class="btn btn-primary" href="#pricing">Upgrade to Pro</a>
      </div>
      <div class="pricing-card md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 class="pricing-plan">Team / Enterprise</h3>
          <p class="text-sm text-secondary mt-1">Unlimited seats, a custom archetype and a dedicated SLA.</p>
        </div>
        <div class="pricing-amount mb-0">
          <span class="pricing-price text-3xl">Custom</span>
        </div>
        <a class="btn btn-outline" href="#sales">Contact Sales</a>
      </div>
    </div>
  </div>
</section>`,
    },
  ],

  'pricing-matrix-pro': [
    {
      id: 'grouped-rows',
      name: 'Grouped rows',
      description:
        'Each capability group becomes its own table body opened by a category header row, so the matrix reads as three short tables rather than one long one.',
      guidance:
        'Sits on a dedicated pricing page below the plan cards. Best when there are more than about ten feature rows and a reader needs to jump to the group they care about. Avoid it for fewer than six rows, because three headings over six rows is more structure than content. Pairs with pricing-tier-cards above, and the category rows give a screen reader something to announce between sections.',
      html: `<div class="matrix-container">
  <table class="matrix-table">
    <caption class="sr-only">Capabilities by plan, grouped by category</caption>
    <thead>
      <tr>
        <th class="matrix-feature-col">Core Capabilities</th>
        <th>Free</th>
        <th>Pro ($9/mo)</th>
        <th>Enterprise</th>
      </tr>
    </thead>
    <tbody>
      <tr><th colspan="4" scope="colgroup" class="matrix-category-header">Engine and architecture</th></tr>
      <tr>
        <td class="matrix-feature-col">Native CSS Layers</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Light-DOM Web Components</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Container Query Layouts</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
    </tbody>
    <tbody>
      <tr><th colspan="4" scope="colgroup" class="matrix-category-header">Component library</th></tr>
      <tr>
        <td class="matrix-feature-col">Core UI Primitives</td>
        <td>20+ Primitives</td>
        <td>All 40+ Primitives</td>
        <td>All plus custom</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">High-Craft Bento Heroes</td>
        <td class="text-muted">Not included</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Pro Bento Kit</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Bespoke</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Conversational AI Threads</td>
        <td class="text-muted">Not included</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Full App Kits</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Full App Kits</td>
      </tr>
    </tbody>
    <tbody>
      <tr><th colspan="4" scope="colgroup" class="matrix-category-header">Tooling and agent integration</th></tr>
      <tr>
        <td class="matrix-feature-col">CLI Tooling (llmcss add)</td>
        <td>Free Registry</td>
        <td>Full Pro Access</td>
        <td>Private Registry</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Stdio MCP Server for AI Agents</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Standard</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Priority API</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Dedicated Instance</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    {
      id: 'two-plan-compact',
      name: 'Two plan compact',
      description:
        'Two plan columns instead of four, on the compact table density, with the capability column pinned to the left edge while the rest scrolls.',
      guidance:
        'Sits on a pricing page for an open core product, or inside an upgrade modal where vertical space is short. Best when the only question is what the paid tier adds to the free one. Avoid it when enterprise terms are part of the decision, because there is no column left to put them in. Pairs with pricing-tier-cards:two-tier above it, whose two cards this table expands.',
      html: `<div class="scroll-x">
  <table class="table table-compact">
    <caption class="sr-only">Free and Pro compared</caption>
    <thead>
      <tr>
        <th class="matrix-feature-col">Core capability</th>
        <th>Free</th>
        <th>Pro ($9/mo)</th>
      </tr>
    </thead>
    <tbody>
      <tr><th colspan="3" scope="colgroup" class="matrix-category-header">Engine and architecture</th></tr>
      <tr>
        <td class="matrix-feature-col">Native CSS Layers</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Container Query Layouts</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr><th colspan="3" scope="colgroup" class="matrix-category-header">Component library</th></tr>
      <tr>
        <td class="matrix-feature-col">Core UI Primitives</td>
        <td>20+ Primitives</td>
        <td>All 40+ Primitives</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">High-Craft Bento Heroes</td>
        <td><span class="mark mark-no" role="img" aria-label="No"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Pro Bento Kit</td>
      </tr>
      <tr><th colspan="3" scope="colgroup" class="matrix-category-header">Tooling and agent integration</th></tr>
      <tr>
        <td class="matrix-feature-col">CLI Tooling (llmcss add)</td>
        <td>Free Registry</td>
        <td>Full Pro Access</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Stdio MCP Server for AI Agents</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Standard</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Priority API</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
  ],

  'feature-grid': [
    {
      id: 'three-up',
      name: 'Three up',
      description:
        'Three equal columns under a section heading and lead, with the icon tiles dropped so the titles start the row.',
      guidance:
        'Sits after the hero and before the pricing. Best when there are exactly three things worth saying and each needs a sentence rather than a word. Avoid it with four or more features, because a three column grid then leaves one orphan on a second row. Pairs with hero-split:media-top above, which shows the product while this explains it.',
      html: `<section class="section">
  <div class="container">
    <div class="max-w-2xl">
      <h2 class="section-title">Built on the parts of CSS that already work</h2>
      <p class="section-lead">Layers, container queries and custom properties do the work. The library names them so an agent can compose without guessing.</p>
    </div>
    <div class="feature-grid grid-cols-1 md:grid-cols-3 mt-10">
      <div class="feature-item">
        <h3 class="feature-title">Layered CSS</h3>
        <p class="feature-text">Reset, tokens, base, components, utilities. Override anything without a specificity fight.</p>
      </div>
      <div class="feature-item">
        <h3 class="feature-title">Container queries</h3>
        <p class="feature-text">Widgets adapt to the panel they sit in, not the viewport.</p>
      </div>
      <div class="feature-item">
        <h3 class="feature-title">Validated by the CLI</h3>
        <p class="feature-text">Every class you emit is checked against the real stylesheet before you ship.</p>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      id: 'media-left-rows',
      name: 'Media left rows',
      description:
        'Each feature becomes a full width row with its media on the left and the copy on the right, and the sides swap on alternate rows from lg.',
      guidance:
        'Sits in the middle of a long page where each feature deserves its own stripe. Best when the media genuinely differs per feature, such as a different screen or a different snippet each time. Avoid it when the media would be the same picture four times, because the alternation then reads as filler. Pairs with feature-grid:two-column-dense further down for the capabilities that do not need a picture.',
      html: `<section class="section">
  <div class="container">
    <div class="max-w-2xl">
      <h2 class="section-title">Built on the parts of CSS that already work</h2>
      <p class="section-lead">Layers, container queries and custom properties do the work. The library names them so an agent can compose without guessing.</p>
    </div>
    <div class="flex flex-col gap-12 mt-12">
      <div class="feature-item md:flex-row md:items-center gap-8">
        <pre class="code-block md:flex-1"><code>@layer reset, tokens, base, components, utilities;</code></pre>
        <div class="md:flex-1">
          <h3 class="feature-title text-xl">Layered CSS</h3>
          <p class="feature-text mt-2">Reset, tokens, base, components, utilities. Override anything without a specificity fight.</p>
        </div>
      </div>
      <div class="feature-item md:flex-row md:items-center gap-8 lg:flex-row-reverse">
        <pre class="code-block md:flex-1"><code>&lt;div class="cq"&gt;
  &lt;div class="cq-md:grid-cols-2"&gt;...&lt;/div&gt;
&lt;/div&gt;</code></pre>
        <div class="md:flex-1">
          <h3 class="feature-title text-xl">Container queries</h3>
          <p class="feature-text mt-2">Widgets adapt to the panel they sit in, not the viewport.</p>
        </div>
      </div>
      <div class="feature-item md:flex-row md:items-center gap-8">
        <pre class="code-block md:flex-1"><code>$ npx llmcss validate --strict index.html
0 issues found</code></pre>
        <div class="md:flex-1">
          <h3 class="feature-title text-xl">Validated by the CLI</h3>
          <p class="feature-text mt-2">Every class you emit is checked against the real stylesheet before you ship.</p>
        </div>
      </div>
      <div class="feature-item md:flex-row md:items-center gap-8 lg:flex-row-reverse">
        <pre class="code-block md:flex-1"><code>&lt;script src="/llmcss-runtime.js" defer&gt;&lt;/script&gt;</code></pre>
        <div class="md:flex-1">
          <h3 class="feature-title text-xl">Zero runtime by default</h3>
          <p class="feature-text mt-2">Add the runtime only when you need modals, drawers, or tabs.</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      id: 'numbered-steps',
      name: 'Numbered steps',
      description:
        'The features stack into one numbered column, 01 to 04, with a hairline between each row and the number sitting inside the row beside the copy.',
      guidance:
        'Sits after the hero on a page that explains a sequence rather than a set. Best when the order genuinely matters and a reader should follow it top to bottom. Avoid it when the items are independent, because numbering unrelated things invents a dependency. Pairs with hero-split:terminal above, whose install line is step zero, and the numbers stay inside the row rather than becoming pills over each heading.',
      html: `<section class="section">
  <div class="container max-w-2xl">
    <h2 class="section-title">The four things the library does</h2>
    <ol class="feature-list list-none mt-8">
      <li class="border-t pt-6">
        <span class="font-mono text-sm text-muted tabular">01</span>
        <div>
          <h3 class="feature-title">Layered CSS</h3>
          <p class="feature-text mt-1">Reset, tokens, base, components, utilities. Override anything without a specificity fight.</p>
        </div>
      </li>
      <li class="border-t pt-6">
        <span class="font-mono text-sm text-muted tabular">02</span>
        <div>
          <h3 class="feature-title">Container queries</h3>
          <p class="feature-text mt-1">Widgets adapt to the panel they sit in, not the viewport.</p>
        </div>
      </li>
      <li class="border-t pt-6">
        <span class="font-mono text-sm text-muted tabular">03</span>
        <div>
          <h3 class="feature-title">Validated by the CLI</h3>
          <p class="feature-text mt-1">Every class you emit is checked against the real stylesheet before you ship.</p>
        </div>
      </li>
      <li class="border-t pt-6">
        <span class="font-mono text-sm text-muted tabular">04</span>
        <div>
          <h3 class="feature-title">Zero runtime by default</h3>
          <p class="feature-text mt-1">Add the runtime only when you need modals, drawers, or tabs.</p>
        </div>
      </li>
    </ol>
  </div>
</section>`,
    },
    {
      id: 'two-column-dense',
      name: 'Two column dense',
      description:
        'Two columns on a tighter gap, with the icon and the title sharing one line so each cell is a heading row and a sentence.',
      guidance:
        'Sits low on a page, or inside a panel, where the features are supporting detail rather than the headline argument. Best for six to ten short capabilities that a reader scans rather than reads. Avoid it as the first feature block on a page, because dense pairs at the top look like a specification sheet. Pairs with feature-grid:three-up above it, which carries the three that matter most.',
      html: `<div class="feature-grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="feature-item">
    <div class="flex items-center gap-3">
      <span class="feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg></span>
      <h3 class="feature-title">Layered CSS</h3>
    </div>
    <p class="feature-text">Reset, tokens, base, components, utilities. Override anything without a specificity fight.</p>
  </div>
  <div class="feature-item">
    <div class="flex items-center gap-3">
      <span class="feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg></span>
      <h3 class="feature-title">Container queries</h3>
    </div>
    <p class="feature-text">Widgets adapt to the panel they sit in, not the viewport.</p>
  </div>
  <div class="feature-item">
    <div class="flex items-center gap-3">
      <span class="feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
      <h3 class="feature-title">Validated by the CLI</h3>
    </div>
    <p class="feature-text">Every class you emit is checked against the real stylesheet before you ship.</p>
  </div>
  <div class="feature-item">
    <div class="flex items-center gap-3">
      <span class="feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></span>
      <h3 class="feature-title">Zero runtime by default</h3>
    </div>
    <p class="feature-text">Add the runtime only when you need modals, drawers, or tabs.</p>
  </div>
</div>`,
    },
  ],

  'feature-list': [
    {
      id: 'two-column',
      name: 'Two column',
      description:
        'The single checklist splits into two text columns from md, each item kept whole so no row breaks across the gutter.',
      guidance:
        'Sits inside a plan card or beneath a pricing table where a tall single column would push the action off the fold. Best for eight to fourteen short items that read as a set. Avoid it for fewer than six items, because two columns of three look like a mistake. Pairs with pricing-tier-cards:single-plan, whose one card has the width two columns need.',
      html: `<ul class="feature-list block md:columns-2 gap-x-8 max-w-3xl">
  <li class="break-inside-avoid mb-3"><span class="mark mark-yes" role="img" aria-label="Included"></span> Unlimited environments per project</li>
  <li class="break-inside-avoid mb-3"><span class="mark mark-yes" role="img" aria-label="Included"></span> Preview URL for every pull request</li>
  <li class="break-inside-avoid mb-3"><span class="mark mark-yes" role="img" aria-label="Included"></span> Audit log with 90 day retention</li>
  <li class="break-inside-avoid mb-3"><span class="mark mark-yes" role="img" aria-label="Included"></span> Instant rollback to any previous build</li>
  <li class="break-inside-avoid mb-3"><span class="mark mark-yes" role="img" aria-label="Included"></span> Custom domains with automatic certificates</li>
  <li class="break-inside-avoid mb-3"><span class="mark mark-warn" role="img" aria-label="Limited"></span> SSO on Team and above</li>
  <li class="break-inside-avoid mb-3"><span class="mark mark-warn" role="img" aria-label="Limited"></span> Log export on Team and above</li>
  <li class="break-inside-avoid mb-3"><span class="mark mark-no" role="img" aria-label="Not included"></span> Dedicated IP addresses</li>
</ul>`,
    },
    {
      id: 'checklist-inline',
      name: 'Checklist inline',
      description:
        'Items wrap along the line as a static rail instead of stacking, so the whole list occupies two or three lines rather than a column.',
      guidance:
        'Sits directly under a hero or a price as a one glance summary. Best for short items of three or four words each, where the point is coverage rather than detail. Avoid it for anything longer than about five words per item, because a wrapping rail of sentences loses its rhythm. Pairs with hero-split:centered above it, and it stays a static rail rather than a scrolling ticker, which is law 9.',
      html: `<ul class="feature-list flex-row flex-wrap gap-x-6 gap-y-3 max-w-4xl">
  <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Unlimited environments</li>
  <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Preview URLs</li>
  <li><span class="mark mark-yes" role="img" aria-label="Included"></span> 90 day audit log</li>
  <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Instant rollback</li>
  <li><span class="mark mark-warn" role="img" aria-label="Limited"></span> SSO on Team</li>
  <li><span class="mark mark-no" role="img" aria-label="Not included"></span> Dedicated IPs</li>
</ul>`,
    },
  ],

  'cta-band': [
    {
      id: 'split',
      name: 'Split',
      description:
        'Copy on the left and the actions on the right in one row from md, instead of a centered stack.',
      guidance:
        'Sits immediately above the footer, or between two long sections as a mid-page break. Best when the band is wide and the copy is one heading and one sentence, because a centered stack there wastes both edges. Avoid it when the heading runs past two lines, since the actions then float beside a wall of text. Pairs with footer-multi-col:compact beneath, which repeats the same row shape.',
      html: `<div class="cta-band flex flex-col md:flex-row md:items-center justify-between gap-6 text-start">
  <div>
    <h2 class="section-title">Start with the free tier</h2>
    <p class="section-lead">No card required. Upgrade when you need SSO, audit export, or more than three projects.</p>
  </div>
  <div class="cta-actions justify-start md:justify-end md:mt-0 flex-none">
    <a href="#" class="btn btn-primary btn-lg">Create account</a>
    <a href="#" class="btn btn-outline btn-lg">Talk to sales</a>
  </div>
</div>`,
    },
    {
      id: 'inline-form',
      name: 'Inline form',
      description:
        'The two buttons become one email field with a submit button under the copy, so the conversion happens in the band rather than on the next page.',
      guidance:
        'Sits above the footer on a page whose next step is an account or a waitlist. Best when the only thing you need from a visitor is an address and the signup genuinely takes one field. Avoid it when the real form asks for six more fields, because the band then promises a shortcut that does not exist. Pairs with faq-section above it, which answers what happens after the address is given.',
      html: `<div class="cta-band">
  <h2 class="section-title">Start with the free tier</h2>
  <p class="section-lead mx-auto">No card required. Upgrade when you need SSO, audit export, or more than three projects.</p>
  <form class="max-w-md mx-auto mt-6">
    <div class="input-group">
      <input type="email" class="input" placeholder="you@company.com" aria-label="Work email" />
      <button type="submit" class="btn btn-primary">Create account</button>
    </div>
    <p class="form-hint mt-2">One confirmation email. No card, and no sales call.</p>
  </form>
</div>`,
    },
    {
      id: 'hairline',
      name: 'Hairline',
      description:
        'The tinted band is gone entirely: rules above and below, page background between, and the copy centred in the gap.',
      guidance:
        'Sits between sections on a page that already carries several surfaces, or at the end of an article. Best when a tinted block would be the fourth distinct background a reader has passed. Avoid it as the only call to action on a busy page, because a hairline block is easy to scroll past. Pairs with callout-editorial and the editorial skin, where the whole page is made of rules rather than boxes.',
      html: `<section class="section border-t border-b py-12 text-center">
  <div class="container">
    <h2 class="section-title">Start with the free tier</h2>
    <p class="section-lead mx-auto">No card required. Upgrade when you need SSO, audit export, or more than three projects.</p>
    <div class="cta-actions flex flex-wrap justify-center gap-3 mt-6">
      <a href="#" class="btn btn-primary btn-lg">Create account</a>
      <a href="#" class="btn btn-outline btn-lg">Talk to sales</a>
    </div>
  </div>
</section>`,
    },
  ],

  'testimonial-grid': [
    {
      id: 'single-feature',
      name: 'Single feature',
      description:
        'One quote set at display size across a centred measure, author underneath, with the grid and the other two cards gone.',
      guidance:
        'Sits between the hero and the pricing as a single beat of proof. Best when one customer sentence is genuinely better than the other two and repeating them dilutes it. Avoid it when the buyer needs to see breadth of adoption, because one name proves one deployment. Pairs with marquee-ticker directly beneath, which supplies the breadth this gives up.',
      html: `<section class="section">
  <div class="container">
    <figure class="testimonial-card max-w-3xl mx-auto text-center">
      <blockquote class="testimonial-quote text-2xl">We replaced 4,000 lines of utility soup with the registry components and our agent stopped inventing class names.</blockquote>
      <figcaption class="testimonial-author items-center mt-6"><strong>Priya Natarajan</strong><span class="text-xs text-muted">Platform lead, Lattice Labs</span></figcaption>
    </figure>
  </div>
</section>`,
    },
    {
      id: 'two-column-quotes',
      name: 'Two column quotes',
      description:
        'The cards lose their borders and the quotes flow down two text columns, each hung from its own hairline.',
      guidance:
        'Sits mid-page on an editorial or long-form layout. Best when you have four or more quotes and a row of bordered cards would add four more boxes to a page that already has plenty. Avoid it when the quotes vary wildly in length, because uneven columns read as a layout bug. Pairs with callout-editorial and hero-split:editorial, which share the same hairline vocabulary.',
      html: `<section class="section">
  <div class="container">
    <div class="md:columns-2 gap-x-10 max-w-4xl mx-auto">
      <figure class="break-inside-avoid border-t pt-6 mb-8">
        <blockquote class="testimonial-quote">We replaced 4,000 lines of utility soup with the registry components and our agent stopped inventing class names.</blockquote>
        <figcaption class="testimonial-author mt-4"><strong>Priya Natarajan</strong><span class="text-xs text-muted">Platform lead, Lattice Labs</span></figcaption>
      </figure>
      <figure class="break-inside-avoid border-t pt-6 mb-8">
        <blockquote class="testimonial-quote">The anti-slop audit caught a pulsing status dot in a PR before a human ever looked at it.</blockquote>
        <figcaption class="testimonial-author mt-4"><strong>Tom Okafor</strong><span class="text-xs text-muted">Design engineer, Meridian</span></figcaption>
      </figure>
      <figure class="break-inside-avoid border-t pt-6 mb-8">
        <blockquote class="testimonial-quote">One link tag in a Rails layout. That was the whole migration.</blockquote>
        <figcaption class="testimonial-author mt-4"><strong>Sofia Lindqvist</strong><span class="text-xs text-muted">CTO, Fieldnote</span></figcaption>
      </figure>
      <figure class="break-inside-avoid border-t pt-6 mb-8">
        <blockquote class="testimonial-quote">Our dashboard and our marketing site finally share one set of tokens instead of two that drifted.</blockquote>
        <figcaption class="testimonial-author mt-4"><strong>Ravi Menon</strong><span class="text-xs text-muted">Staff engineer, Harbor Ops</span></figcaption>
      </figure>
    </div>
  </div>
</section>`,
    },
    {
      id: 'logo-attributed',
      name: 'Logo attributed',
      description:
        'The same three cards, but each quote is attributed by the customer wordmark instead of a person, name and role.',
      guidance:
        'Sits mid-page when the company recognition is worth more than the individual title. Best when the logos are names a visitor already trusts and the quotes are approved at company level. Avoid it when the reader is a practitioner, because a peer with a job title is more persuasive to them than a brand. Pairs with team-grid lower on the page, which puts faces back on the site.',
      html: `<section class="section">
  <div class="container">
    <div class="testimonial-grid">
      <figure class="testimonial-card">
        <blockquote class="testimonial-quote">We replaced 4,000 lines of utility soup with the registry components and our agent stopped inventing class names.</blockquote>
        <figcaption class="testimonial-author mt-4">
          <span class="logo-rail justify-start">${logoRailItem('lattice')}</span>
        </figcaption>
      </figure>
      <figure class="testimonial-card">
        <blockquote class="testimonial-quote">The anti-slop audit caught a pulsing status dot in a PR before a human ever looked at it.</blockquote>
        <figcaption class="testimonial-author mt-4">
          <span class="logo-rail justify-start">${logoRailItem('meridian')}</span>
        </figcaption>
      </figure>
      <figure class="testimonial-card">
        <blockquote class="testimonial-quote">One link tag in a Rails layout. That was the whole migration.</blockquote>
        <figcaption class="testimonial-author mt-4">
          <span class="logo-rail justify-start">${logoRailItem('fieldnote')}</span>
        </figcaption>
      </figure>
    </div>
  </div>
</section>`,
    },
  ],

  'faq-section': [
    {
      id: 'two-column',
      name: 'Two column',
      description:
        'Heading and the ask-a-question link hold a sticky left column while the questions become an accordion in the right.',
      guidance:
        'Sits low on a pricing or docs page where the list of questions is long. Best when there are more than about six questions and the contact route should stay visible the whole way down. Avoid it on a page narrower than about 900px in practice, because the left column then steals width the answers need. Pairs with pricing-tier-cards above, and every trigger carries aria-expanded and aria-controls so the state is announced, not just painted.',
      html: `<section class="section">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="sticky-top self-start">
        <h2 class="section-title">Questions</h2>
        <p class="section-lead">Everything here is in the docs too. If something is missing, ask and it gets added.</p>
        <a class="btn btn-outline btn-sm mt-6" href="#contact">Ask a question</a>
      </div>
      <div class="accordion">
        <div class="accordion-item">
          <h3><button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-2col-build">Do I need a build step?<svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h3>
          <div class="accordion-content" id="faq-2col-build">No. Link the stylesheet and start writing classes. The CLI and MCP server are optional.</div>
        </div>
        <div class="accordion-item">
          <h3><button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-2col-cancel">What happens when I cancel Pro?<svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h3>
          <div class="accordion-content" id="faq-2col-cancel">The token stops working at the end of the period. CSS and HTML you already copied stay yours.</div>
        </div>
        <div class="accordion-item">
          <h3><button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-2col-browsers">Which browsers?<svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h3>
          <div class="accordion-content" id="faq-2col-browsers">Current Chrome, Edge, Firefox, and Safari. Features like :has() and container queries have been stable in all four since 2023.</div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      id: 'grouped-categories',
      name: 'Grouped categories',
      description:
        'The one list becomes three shorter accordions under their own category headings, separated by a rule.',
      guidance:
        'Sits on a dedicated support or pricing page carrying eight or more questions. Best when the questions fall into obviously different jobs, such as getting started, billing and support. Avoid it with fewer than six questions, because three headings over six rows is more structure than content. Pairs with cta-band:hairline beneath, since the page is already built from rules rather than boxes.',
      html: `<section class="section">
  <div class="container max-w-2xl">
    <h2 class="section-title">Questions</h2>
    <h3 class="text-sm font-semibold mt-10 mb-2">Getting started</h3>
    <div class="accordion">
      <div class="accordion-item">
        <h4><button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-grp-build">Do I need a build step?<svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <div class="accordion-content" id="faq-grp-build">No. Link the stylesheet and start writing classes. The CLI and MCP server are optional.</div>
      </div>
      <div class="accordion-item">
        <h4><button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-grp-browsers">Which browsers?<svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <div class="accordion-content" id="faq-grp-browsers">Current Chrome, Edge, Firefox, and Safari. Features like :has() and container queries have been stable in all four since 2023.</div>
      </div>
    </div>
    <hr class="divider" />
    <h3 class="text-sm font-semibold mb-2">Billing</h3>
    <div class="accordion">
      <div class="accordion-item">
        <h4><button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-grp-cancel">What happens when I cancel Pro?<svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <div class="accordion-content" id="faq-grp-cancel">The token stops working at the end of the period. CSS and HTML you already copied stay yours.</div>
      </div>
      <div class="accordion-item">
        <h4><button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-grp-seats">Is the licence per seat?<svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <div class="accordion-content" id="faq-grp-seats">Pro is one token per developer. Team and Enterprise cover unlimited seats under one organisation.</div>
      </div>
    </div>
    <hr class="divider" />
    <h3 class="text-sm font-semibold mb-2">Licensing and support</h3>
    <div class="accordion">
      <div class="accordion-item">
        <h4><button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-grp-licence">Can I ship the free components commercially?<svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <div class="accordion-content" id="faq-grp-licence">Yes. Everything in the public catalog is MIT, with no attribution requirement and no account.</div>
      </div>
      <div class="accordion-item">
        <h4><button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-grp-support">How do I report a defect?<svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <div class="accordion-content" id="faq-grp-support">Open an issue on GitHub. Pro licences also get a direct address, answered on the next working day.</div>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      id: 'inline-answers',
      name: 'Inline answers',
      description:
        'No accordion at all: question and answer sit side by side as a definition list, every answer visible without a click.',
      guidance:
        'Sits at the foot of a pricing page, or anywhere the answers are short enough to read at a glance. Best when there are six or fewer questions and hiding them saves nothing. Avoid it with long answers, because an open wall of prose is worse than a closed list. Pairs with pricing-tier-cards:single-plan above, and it needs no runtime script since there is nothing to toggle.',
      html: `<section class="section">
  <div class="container max-w-4xl">
    <h2 class="section-title">Questions</h2>
    <dl class="detail grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-8">
      <dt class="font-semibold text-primary">Do I need a build step?</dt>
      <dd class="text-secondary">No. Link the stylesheet and start writing classes. The CLI and MCP server are optional.</dd>
      <dt class="font-semibold text-primary">What happens when I cancel Pro?</dt>
      <dd class="text-secondary">The token stops working at the end of the period. CSS and HTML you already copied stay yours.</dd>
      <dt class="font-semibold text-primary">Which browsers?</dt>
      <dd class="text-secondary">Current Chrome, Edge, Firefox, and Safari. Features like :has() and container queries have been stable in all four since 2023.</dd>
      <dt class="font-semibold text-primary">Can I ship the free components commercially?</dt>
      <dd class="text-secondary">Yes. Everything in the public catalog is MIT, with no attribution requirement and no account.</dd>
    </dl>
  </div>
</section>`,
    },
  ],

  'stats-band': [
    {
      id: 'anchored',
      name: 'Anchored',
      description:
        'Four figures instead of three, with the anchor set at display size across the full row on a phone and the other three kept at half its scale.',
      guidance:
        'Sits under the hero or above the footer as the proof line. Best when one number is the headline claim and the rest qualify it. Avoid flattening it back to four identical figures, because a row of equal numbers with equal weight is the flat metric grid law 8 exists to prevent. Pairs with hero-split:centered above, which has no media and needs the numbers to fill the fold.',
      html: `<div class="stats-band grid-cols-2 md:grid-cols-4">
  <div class="stat is-primary col-span-2 md:col-span-1">
    <div class="stat-value">99.98%</div>
    <div class="stat-label">Uptime over the last 12 months</div>
  </div>
  <div class="stat">
    <div class="stat-value">38 ms</div>
    <div class="stat-label">Median time to first byte</div>
  </div>
  <div class="stat">
    <div class="stat-value">61 ms</div>
    <div class="stat-label">99th percentile time to first byte</div>
  </div>
  <div class="stat">
    <div class="stat-value">34</div>
    <div class="stat-label">Edge regions</div>
  </div>
</div>`,
    },
    {
      id: 'table-rows',
      name: 'Table rows',
      description:
        'The band becomes a two column table, label on the left and the figure right aligned on tabular numerals, in a scroll container.',
      guidance:
        'Sits on a status, trust or documentation page where the numbers are reference data rather than a claim. Best when there are more than about six figures, which is where a band stops reading as a band. Avoid it on a landing page fold, because a table asks to be read and a band asks to be glanced at. Pairs with faq-section beneath, and the figures line up because every cell uses tabular numerals.',
      html: `<div class="scroll-x">
  <table class="table table-compact max-w-xl">
    <caption class="sr-only">Service numbers for the last 12 months</caption>
    <tbody>
      <tr>
        <td>Uptime over the last 12 months</td>
        <td class="cell-num tabular">99.98%</td>
      </tr>
      <tr>
        <td>Median time to first byte</td>
        <td class="cell-num tabular">38 ms</td>
      </tr>
      <tr>
        <td>99th percentile time to first byte</td>
        <td class="cell-num tabular">61 ms</td>
      </tr>
      <tr>
        <td>Edge regions</td>
        <td class="cell-num tabular">34</td>
      </tr>
      <tr>
        <td>Requests served per minute at peak</td>
        <td class="cell-num tabular">3,100,000</td>
      </tr>
      <tr>
        <td>First response on a Pro support ticket</td>
        <td class="cell-num tabular">4 h</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    {
      id: 'two-row',
      name: 'Two row',
      description:
        'Six figures in two rows of three, each figure hanging from its own hairline so the rows are separated by rule rather than by gap alone.',
      guidance:
        'Sits mid-page when six numbers all earn their place. Best when the figures pair naturally into two groups, such as availability above and volume below. Avoid it when only two or three numbers are real and the rest are padding, because a second row of filler devalues the first. Pairs with pricing-tier-cards beneath, where the numbers become the reason the price is fair.',
      html: `<div class="stats-band grid-cols-1 md:grid-cols-3">
  <div class="stat is-primary">
    <div class="stat-value">99.98%</div>
    <div class="stat-label">Uptime over the last 12 months</div>
  </div>
  <div class="stat">
    <div class="stat-value">38 ms</div>
    <div class="stat-label">Median time to first byte</div>
  </div>
  <div class="stat">
    <div class="stat-value">61 ms</div>
    <div class="stat-label">99th percentile time to first byte</div>
  </div>
  <div class="stat border-t pt-6">
    <div class="stat-value">34</div>
    <div class="stat-label">Edge regions</div>
  </div>
  <div class="stat border-t pt-6">
    <div class="stat-value">3.1 M</div>
    <div class="stat-label">Requests served per minute at peak</div>
  </div>
  <div class="stat border-t pt-6">
    <div class="stat-value">4 h</div>
    <div class="stat-label">First response on a Pro support ticket</div>
  </div>
</div>`,
    },
  ],

  'marquee-ticker': [
    {
      id: 'grid-rail',
      name: 'Grid rail',
      description:
        'The wrapping rail becomes a fixed grid, two up on a phone, three up from md and six up from lg, with every mark on the same baseline.',
      guidance:
        'Sits directly under the hero as the trust line. Best when the number of names divides evenly into the column count, which is what makes a grid look deliberate rather than ragged. Avoid it with a number that leaves one orphan on the last row; use the wrapping rail instead. Pairs with hero-split:media-top above, and it never scrolls on its own, which is law 9.',
      html: `<ul class="logo-rail list-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-items-center gap-6" aria-label="Teams using LLMCSS">
${logoRailItems('li')}
</ul>`,
    },
    {
      id: 'captioned-rail',
      name: 'Captioned rail',
      description:
        'Each name gains a one line caption stacked beneath it, so the rail carries what each company does as well as who they are.',
      guidance:
        'Sits under the hero on a page aimed at a buyer who will not recognise the names. Best when the customers are known in their own sector but not generally, which is most of them. Avoid it when the logos are household names, because captioning them is condescending. Pairs with testimonial-grid:logo-attributed lower down, which reuses the same names with a quote attached.',
      html: `<ul class="logo-rail list-none" aria-label="Teams using LLMCSS">
  <li class="flex flex-col items-center gap-1">
    <span class="inline-flex items-center gap-2">${LOGO_MARKS.northwind}Northwind</span>
    <span class="text-xs text-muted font-sans font-normal">Freight and logistics</span>
  </li>
  <li class="flex flex-col items-center gap-1">
    <span class="inline-flex items-center gap-2">${LOGO_MARKS.harbor}Harbor Ops</span>
    <span class="text-xs text-muted font-sans font-normal">Fleet telemetry</span>
  </li>
  <li class="flex flex-col items-center gap-1">
    <span class="inline-flex items-center gap-2">${LOGO_MARKS.lattice}Lattice Labs</span>
    <span class="text-xs text-muted font-sans font-normal">Machine learning platform</span>
  </li>
  <li class="flex flex-col items-center gap-1">
    <span class="inline-flex items-center gap-2">${LOGO_MARKS.quill}Quill</span>
    <span class="text-xs text-muted font-sans font-normal">Editorial publishing</span>
  </li>
  <li class="flex flex-col items-center gap-1">
    <span class="inline-flex items-center gap-2">${LOGO_MARKS.meridian}Meridian</span>
    <span class="text-xs text-muted font-sans font-normal">Deploy and rollback</span>
  </li>
  <li class="flex flex-col items-center gap-1">
    <span class="inline-flex items-center gap-2">${LOGO_MARKS.fieldnote}Fieldnote</span>
    <span class="text-xs text-muted font-sans font-normal">Field service scheduling</span>
  </li>
</ul>`,
    },
  ],

  'team-grid': [
    {
      id: 'list-rows',
      name: 'List rows',
      description:
        'One person per row rather than a photo grid: round portrait, name and role in the middle, a link on the right, hairline between rows.',
      guidance:
        'Sits on an about or contact page where the roles matter more than the faces. Best for a team of more than about eight, where a photo grid becomes a wall. Avoid it on a founding team page, because small round portraits carry far less than a full square photo. Pairs with callout-editorial beneath for the paragraph about how the team works.',
      html: `<div class="max-w-2xl">
  <div class="team-member flex-row items-center gap-4 border-t pt-4 pb-4">
    <span class="avatar avatar-lg"><img src="https://images.unsplash.com/photo-1770396529113-ba031cbf0cfa?w=480&h=480&auto=format&fit=crop&q=80" alt="Amara Osei" /></span>
    <div class="flex-1 min-w-0">
      <div class="team-name mt-0">Amara Osei</div>
      <div class="team-role">Founder</div>
    </div>
    <a class="btn btn-ghost btn-sm" href="#amara">Profile</a>
  </div>
  <div class="team-member flex-row items-center gap-4 border-t pt-4 pb-4">
    <span class="avatar avatar-lg"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=480&h=480&auto=format&fit=crop&q=80" alt="Jonas Berg" /></span>
    <div class="flex-1 min-w-0">
      <div class="team-name mt-0">Jonas Berg</div>
      <div class="team-role">Engineering</div>
    </div>
    <a class="btn btn-ghost btn-sm" href="#jonas">Profile</a>
  </div>
  <div class="team-member flex-row items-center gap-4 border-t pt-4 pb-4">
    <span class="avatar avatar-lg"><img src="https://images.unsplash.com/photo-1582639849680-e2e89674e57b?w=480&h=480&auto=format&fit=crop&q=80" alt="Hana Sato" /></span>
    <div class="flex-1 min-w-0">
      <div class="team-name mt-0">Hana Sato</div>
      <div class="team-role">Design</div>
    </div>
    <a class="btn btn-ghost btn-sm" href="#hana">Profile</a>
  </div>
</div>`,
    },
    {
      id: 'lead-anchored',
      name: 'Lead anchored',
      description:
        'The founder takes a cell twice as wide as the rest and the others fill a four column grid beside her.',
      guidance:
        'Sits on an about page for a company where one person is the public face. Best when the founder is the reason people are on the page, such as a studio or a solo-led product. Avoid it on a team page meant to read as flat, because size is hierarchy and a reader will assume the ranking is deliberate. Pairs with callout-editorial, which can carry the founder quote the grid has no room for.',
      html: `<div class="team-grid grid-cols-2 md:grid-cols-4">
  <div class="team-member col-span-2">
    <img class="team-photo" src="https://images.unsplash.com/photo-1770396529113-ba031cbf0cfa?w=480&h=480&auto=format&fit=crop&q=80" alt="Amara Osei" />
    <div class="team-name text-xl">Amara Osei</div>
    <div class="team-role">Founder</div>
  </div>
  <div class="team-member">
    <img class="team-photo" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=480&h=480&auto=format&fit=crop&q=80" alt="Jonas Berg" />
    <div class="team-name">Jonas Berg</div>
    <div class="team-role">Engineering</div>
  </div>
  <div class="team-member">
    <img class="team-photo" src="https://images.unsplash.com/photo-1582639849680-e2e89674e57b?w=480&h=480&auto=format&fit=crop&q=80" alt="Hana Sato" />
    <div class="team-name">Hana Sato</div>
    <div class="team-role">Design</div>
  </div>
</div>`,
    },
    {
      id: 'compact-avatars',
      name: 'Compact avatars',
      description:
        'Round avatars and names only, three up on a phone and six up from md, with the roles dropped and the square photos gone.',
      guidance:
        'Sits at the foot of an about page, or in a changelog entry crediting the people who shipped it. Best when the point is how many people there are rather than who each one is. Avoid it as the only team block on an about page, because names without roles tell a visitor nothing. Pairs with team-grid:list-rows above it, which carries the roles this leaves out.',
      html: `<ul class="grid grid-cols-3 md:grid-cols-6 gap-6 list-none">
  <li class="flex flex-col items-center gap-2 text-center">
    <span class="avatar avatar-lg"><img src="https://images.unsplash.com/photo-1770396529113-ba031cbf0cfa?w=480&h=480&auto=format&fit=crop&q=80" alt="Amara Osei" /></span>
    <span class="team-name mt-0 text-sm">Amara Osei</span>
  </li>
  <li class="flex flex-col items-center gap-2 text-center">
    <span class="avatar avatar-lg"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=480&h=480&auto=format&fit=crop&q=80" alt="Jonas Berg" /></span>
    <span class="team-name mt-0 text-sm">Jonas Berg</span>
  </li>
  <li class="flex flex-col items-center gap-2 text-center">
    <span class="avatar avatar-lg"><img src="https://images.unsplash.com/photo-1582639849680-e2e89674e57b?w=480&h=480&auto=format&fit=crop&q=80" alt="Hana Sato" /></span>
    <span class="team-name mt-0 text-sm">Hana Sato</span>
  </li>
  <li class="flex flex-col items-center gap-2 text-center">
    <span class="avatar avatar-lg">RM</span>
    <span class="team-name mt-0 text-sm">Ravi Menon</span>
  </li>
  <li class="flex flex-col items-center gap-2 text-center">
    <span class="avatar avatar-lg">SL</span>
    <span class="team-name mt-0 text-sm">Sofia Lindqvist</span>
  </li>
  <li class="flex flex-col items-center gap-2 text-center">
    <span class="avatar avatar-lg">TO</span>
    <span class="team-name mt-0 text-sm">Tom Okafor</span>
  </li>
</ul>`,
    },
  ],

  'callout-editorial': [
    {
      id: 'pull-quote',
      name: 'Pull quote',
      description:
        'The callout moves out of the text flow into a third column beside the body, set larger, so it reads as a pulled line rather than an interruption.',
      guidance:
        'Sits beside the paragraph it belongs to in a long-form article or a docs page. Best when the sentence is worth repeating and the surrounding text is long enough that a reader needs a handhold. Avoid it in a two paragraph page, because there is nothing to pull it out of. Pairs with hero-split:editorial above, and it keeps hairlines top and bottom rather than a coloured edge, which is law 3.',
      html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
  <div class="md:col-span-2">
    <p>Rollbacks restore the previous build and its environment variables together. The build artefact, the variable set and the routing table are versioned as one record, so restoring any of them restores all three and there is no partial state to reason about.</p>
    <p class="mt-4">Secrets are the exception. A secret rotated after the build you are rolling back to was never part of that record, so the restored build receives the current value rather than the historical one. That is deliberate: rolling back code should not roll back a credential you revoked on purpose.</p>
  </div>
  <aside class="callout text-xl self-start">
    <span class="callout-label">Worth knowing</span>
    Secrets rotated after that build are not reverted.
  </aside>
</div>`,
    },
    {
      id: 'sidenote',
      name: 'Sidenote',
      description:
        'The callout narrows into a right rail in the fourth column, set at small size and aligned to the top of the paragraph it annotates.',
      guidance:
        'Sits in the margin of a documentation page next to the exact paragraph it qualifies. Best for a caveat that a reader needs only if they hit it, such as an edge case or a version note. Avoid it for anything a reader must not miss, because margin notes are skipped. Pairs with callout-editorial:pull-quote in the same article, one for emphasis and one for caveats, never both on the same paragraph.',
      html: `<div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl">
  <div class="md:col-span-3">
    <p>Rollbacks restore the previous build and its environment variables together. The build artefact, the variable set and the routing table are versioned as one record, so restoring any of them restores all three and there is no partial state to reason about.</p>
    <p class="mt-4">A rollback is itself a deployment. It gets its own entry in the audit log, its own preview URL and its own identifier, so the history stays linear and nothing is overwritten in place.</p>
  </div>
  <aside class="callout text-sm md:col-start-4 self-start">
    <span class="callout-label">Worth knowing</span>
    Secrets rotated after that build are not reverted.
  </aside>
</div>`,
    },
  ],

  'announcement-bar': [
    {
      id: 'dismissible',
      name: 'Dismissible',
      description:
        'Message and link group at the start of the bar and a close control takes the end, so the row is a pair rather than a centred line.',
      guidance:
        'Sits above the header on every page until a visitor closes it. Best for a notice with a real end date, such as a release or an outage, where a reader who has seen it should not see it again. Avoid it for permanent copy, because a dismiss control on something that is always true trains people to close the bar unread. Pairs with navbar-modern below it, never with navbar-modern:two-row, which already spends a row on utility text.',
      html: `<div class="announcement flex-wrap justify-between" role="region" aria-label="Announcement">
  <div class="flex flex-wrap items-center gap-3">
    <span>LLMCSS 0.2 ships the runtime as one script tag.</span>
    <a href="#changelog">Read the changelog</a>
  </div>
  <button type="button" class="close text-inherit" aria-label="Dismiss announcement"></button>
</div>`,
    },
    {
      id: 'two-action',
      name: 'Two action',
      description:
        'Message at the start and two small links at the end, wrapping onto a second line rather than truncating on a narrow screen.',
      guidance:
        'Sits above the header when a notice has two genuinely different next steps, such as reading the change and applying it. Best when both routes are short and neither is obviously primary. Avoid a third action, because a bar with three links stops being a notice and becomes navigation. Pairs with footer-multi-col:two-column, whose newsletter field points at the same changelog.',
      html: `<div class="announcement flex-wrap justify-between" role="region" aria-label="Announcement">
  <span>LLMCSS 0.2 ships the runtime as one script tag.</span>
  <div class="flex items-center gap-4 text-xs">
    <a href="#changelog">Read the changelog</a>
    <a href="#upgrade">Upgrade guide</a>
  </div>
</div>`,
    },
  ],

  'bento-editorial-pro': [
    {
      id: 'three-col',
      name: 'Three column',
      description:
        'Every cell is the same size: three equal cells per row across two rows, with no spans and no asymmetry.',
      guidance:
        'Sits mid-page when six claims carry equal weight and none should be read first. Best for a capability overview where ranking the items would be misleading. Avoid it as a hero, because a hero needs a focal point and six equal cells deliberately have none. Pairs with hero-bento-pro:stat-anchor above, which supplies the hierarchy this grid refuses.',
      html: `<div class="bento-grid md:grid-cols-3">
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Zero token dark mode</h3>
      <p class="text-secondary text-sm mt-2">Native cascading variables, no build step and no class name hallucination.</p>
    </div>
    <p class="font-mono text-xs text-muted mt-6">llmcss init --theme=obsidian</p>
  </div>
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Zero runtime overhead</h3>
      <p class="text-secondary text-sm mt-2">No CSS-in-JS. The browser layers do the cascading, so there is nothing to hydrate.</p>
    </div>
    <p class="font-display font-bold text-2xl mt-6 tabular">0 ms</p>
  </div>
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Universal standard</h3>
      <p class="text-secondary text-sm mt-2">Vanilla HTML, Astro, Svelte, Vue, React and Next.js. One stylesheet each time.</p>
    </div>
  </div>
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Model Context Protocol ready</h3>
      <p class="text-secondary text-sm mt-2">Native stdio MCP server for autonomous coding agents.</p>
    </div>
    <span class="text-xs text-muted flex items-center gap-2 mt-6"><span class="pip pip-ok"></span>Connected on port 8080</span>
  </div>
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Container query layouts</h3>
      <p class="text-secondary text-sm mt-2">Widgets adapt to the panel they sit in rather than to the viewport.</p>
    </div>
    <p class="font-mono text-xs text-muted mt-6">cq-md:grid-cols-2</p>
  </div>
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Anti-slop audit</h3>
      <p class="text-secondary text-sm mt-2">Twelve laws checked on the file before it reaches review.</p>
    </div>
    <p class="font-mono text-xs text-muted mt-6">npx llmcss audit index.html</p>
  </div>
</div>`,
    },
    {
      id: 'feature-left',
      name: 'Feature left',
      description:
        'One tall cell holds the left column across both rows and four small cells fill the two columns beside it.',
      guidance:
        'Sits mid-page when one claim needs room to explain itself and four others need a line each. Best when the tall cell has something to show, such as a snippet or a short sequence. Avoid it when all five items need the same amount of copy, because the tall cell then sits half empty. Pairs with bento-editorial-pro:three-col further down, for the claims that do not fit beside the feature.',
      html: `<div class="bento-grid md:grid-cols-3">
  <div class="bento-cell bento-row-2">
    <div>
      <h3 class="card-title text-xl">Zero token dark mode</h3>
      <p class="text-secondary text-sm mt-3">Native cascading variables carry every surface, border and ink. Switch the whole palette with one attribute on the html element and nothing in the markup changes.</p>
    </div>
    <p class="font-mono text-xs text-muted mt-6">llmcss init --theme=obsidian</p>
  </div>
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Zero runtime overhead</h3>
      <p class="text-secondary text-sm mt-2">No CSS-in-JS. Native browser layers only.</p>
    </div>
    <p class="font-display font-bold text-2xl mt-4 tabular">0 ms</p>
  </div>
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Universal standard</h3>
      <p class="text-secondary text-sm mt-2">Vanilla HTML, Astro, Svelte, Vue, React and Next.js.</p>
    </div>
  </div>
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Model Context Protocol ready</h3>
      <p class="text-secondary text-sm mt-2">Native stdio MCP server for autonomous coding agents.</p>
    </div>
    <span class="text-xs text-muted flex items-center gap-2 mt-4"><span class="pip pip-ok"></span>Connected on port 8080</span>
  </div>
  <div class="bento-cell">
    <div>
      <h3 class="card-title">Anti-slop audit</h3>
      <p class="text-secondary text-sm mt-2">Twelve laws checked before the file reaches review.</p>
    </div>
    <p class="font-mono text-xs text-muted mt-4">npx llmcss audit index.html</p>
  </div>
</div>`,
    },
  ],
};
