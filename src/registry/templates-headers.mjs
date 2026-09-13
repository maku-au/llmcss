/**
 * LLMCSS Wireframe Header Sections
 *
 * Six free header layouts that differ structurally, not just in copy. Every
 * entry uses the same section template shape as src/registry/templates-data.mjs
 * (id, name, section, tier, tags, placement, guidance, html) and is imported
 * there so the catalog stays one list.
 *
 * House rules these follow, so an agent can copy any of them verbatim:
 *   - library classes only, no prefix, no inline style attributes
 *   - every header ships a working mobile drawer: the toggle carries
 *     data-ai-toggle="drawer", data-ai-target, aria-controls and
 *     aria-expanded; the panel carries role="dialog", aria-modal="true", a
 *     label, and a close button with an aria-label
 *   - the current page link carries aria-current="page", which the library
 *     styles through .nav-link[aria-current]
 *   - one chevron shape everywhere, the m6 9 6 6 6-6 path as inline SVG
 *   - status reads as a pip plus plain text, never a boxed chip
 *   - icon-only controls carry an aria-label, the select carries a label
 */

export const headerTemplates = [
  {
    id: 'wireframe-header-centered-brand',
    name: 'Centered Brand Header',
    section: 'header',
    tier: 'free',
    tags: ['header', 'nav', 'centered', 'symmetrical', 'brand', 'drawer'],
    placement: 'Top of Page (Above Fold)',
    guidance: {
      placement: 'Very top of the DOM, sticky by default. The brand sits in the optical centre because the two nav groups are flex-1 and therefore equal width; keep three links on each side or the centre drifts.',
      bestUsedFor: 'Brand-led sites where the wordmark is the strongest asset: studios, type foundries, editorial publications, and product pages with a short flat navigation.',
      avoidWhen: 'You have more than seven top-level links, a search field, or any nav item that needs a dropdown. Split navigation gives an agent nowhere to put a panel.',
      pairsWith: ['wireframe-hero-editorial', 'wireframe-hero-centered', 'wireframe-footer-columns']
    },
    html: `<header class="navbar" role="banner">
  <div class="container navbar-inner">
    <nav class="nav-links flex-1" aria-label="Primary navigation, left">
      <a href="#templates" class="nav-link" aria-current="page">Templates</a>
      <a href="#components" class="nav-link">Components</a>
      <a href="#blueprints" class="nav-link">Blueprints</a>
    </nav>
    <a href="#home" class="brand" aria-label="LLMCSS home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
        <path d="M14 15h7"/>
      </svg>
      <span>LLMCSS</span>
    </a>
    <div class="flex flex-1 items-center justify-end gap-3">
      <nav class="nav-links" aria-label="Primary navigation, right">
        <a href="#docs" class="nav-link">Docs</a>
        <a href="#pricing" class="nav-link">Pricing</a>
        <a href="#changelog" class="nav-link">Changelog</a>
      </nav>
      <a href="#install" class="btn btn-primary btn-sm hidden md:inline-flex">Install</a>
      <button type="button" class="btn btn-outline btn-sm btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#header-centered-brand-menu" aria-controls="header-centered-brand-menu" aria-expanded="false" aria-label="Open menu"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg></button>
    </div>
  </div>
</header>
<div id="header-centered-brand-menu" class="drawer drawer-sm md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="header-centered-brand-menu-title">
    <div class="drawer-header">
      <span class="drawer-title" id="header-centered-brand-menu-title">Menu</span>
      <button type="button" class="btn btn-ghost btn-icon btn-xs" data-ai-dismiss="drawer" aria-label="Close menu"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>
    </div>
    <nav class="drawer-body drawer-nav" aria-label="Primary navigation">
      <a href="#templates" class="sidebar-item" aria-current="page" data-ai-dismiss="drawer">Templates</a>
      <a href="#components" class="sidebar-item" data-ai-dismiss="drawer">Components</a>
      <a href="#blueprints" class="sidebar-item" data-ai-dismiss="drawer">Blueprints</a>
      <a href="#docs" class="sidebar-item" data-ai-dismiss="drawer">Docs</a>
      <a href="#pricing" class="sidebar-item" data-ai-dismiss="drawer">Pricing</a>
      <a href="#changelog" class="sidebar-item" data-ai-dismiss="drawer">Changelog</a>
    </nav>
    <div class="drawer-footer">
      <a href="#install" class="btn btn-primary w-full">Install</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'wireframe-header-search',
    name: 'Search Header with Account Actions',
    section: 'header',
    tier: 'free',
    tags: ['header', 'nav', 'search', 'account', 'catalog', 'drawer'],
    placement: 'Top of Page (Above Fold)',
    guidance: {
      placement: 'Very top of the DOM. The search block carries navbar-search, so it wraps onto its own full width row below the brand on phones and settles into the middle column from 768px up. Do not wrap it in an extra grid.',
      bestUsedFor: 'Catalogs, storefronts, component galleries, and support centres where search is the primary navigation and the account actions are secondary.',
      avoidWhen: 'Marketing landing pages with a single conversion goal. A search field invites browsing and pulls attention away from the hero call to action.',
      pairsWith: ['wireframe-features-bento', 'wireframe-pricing-tiers', 'wireframe-footer-columns']
    },
    html: `<header class="navbar" role="banner">
  <div class="container navbar-inner">
    <a href="#home" class="brand order-1" aria-label="LLMCSS home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
        <path d="M14 15h7"/>
      </svg>
      <span>LLMCSS</span>
    </a>
    <div class="navbar-search w-full order-3 md:order-2 md:flex-1 md:px-6">
      <form action="#search" role="search">
        <div class="input-group md:mx-auto">
          <span class="input-addon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></span>
          <input type="search" id="header-search-field" class="input" name="q" placeholder="Search components and templates" aria-label="Search components and templates" />
        </div>
      </form>
    </div>
    <div class="flex items-center gap-2 order-2 md:order-3">
      <a href="#saved" class="btn btn-ghost btn-sm hidden lg:inline-flex">Saved</a>
      <button type="button" class="btn btn-ghost btn-sm btn-icon hidden md:inline-flex" aria-label="Notifications, 3 unread"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></button>
      <a href="#account" class="btn btn-primary btn-sm">Sign in</a>
      <button type="button" class="btn btn-outline btn-sm btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#header-search-menu" aria-controls="header-search-menu" aria-expanded="false" aria-label="Open menu"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg></button>
    </div>
  </div>
</header>
<div id="header-search-menu" class="drawer drawer-sm md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="header-search-menu-title">
    <div class="drawer-header">
      <span class="drawer-title" id="header-search-menu-title">Menu</span>
      <button type="button" class="btn btn-ghost btn-icon btn-xs" data-ai-dismiss="drawer" aria-label="Close menu"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>
    </div>
    <nav class="drawer-body drawer-nav" aria-label="Primary navigation">
      <a href="#catalog" class="sidebar-item" aria-current="page" data-ai-dismiss="drawer">Catalog</a>
      <a href="#templates" class="sidebar-item" data-ai-dismiss="drawer">Templates</a>
      <a href="#saved" class="sidebar-item" data-ai-dismiss="drawer">Saved</a>
      <a href="#notifications" class="sidebar-item" data-ai-dismiss="drawer">Notifications</a>
      <a href="#orders" class="sidebar-item" data-ai-dismiss="drawer">Order history</a>
    </nav>
    <div class="drawer-footer">
      <a href="#account" class="btn btn-primary w-full">Sign in</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'wireframe-header-utility-bar',
    name: 'Two Tier Header with Utility Bar',
    section: 'header',
    tier: 'free',
    tags: ['header', 'nav', 'utility', 'status', 'locale', 'two-tier'],
    placement: 'Top of Page (Above Fold)',
    guidance: {
      placement: 'The thin utility strip is the first element in the DOM and scrolls away; the navbar below it is sticky and stays. Keep the strip to one line of 12px text on each side so the page does not lose 80px of fold to chrome.',
      bestUsedFor: 'Infrastructure and platform sites that owe visitors an operational signal, plus a locale or region choice, without spending a row of the main navigation on either.',
      avoidWhen: 'The status is not genuinely live, or the page already carries an announcement banner. Two stacked strips above a navbar read as clutter, and a hard-coded green pip that never changes is a lie.',
      pairsWith: ['wireframe-hero-split', 'wireframe-comparison-matrix', 'wireframe-footer-columns']
    },
    html: `<div class="surface-1 border-b" role="region" aria-label="Site utilities">
  <div class="container flex flex-wrap items-center justify-between gap-3 py-2 text-xs">
    <p class="flex items-center gap-2 text-secondary">
      <span class="status-pip status-pip-success" aria-hidden="true"></span>
      All regions operational
    </p>
    <div class="flex items-center gap-4">
      <a href="#status" class="link-muted">Status history</a>
      <a href="#locale" class="link-muted flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"/></svg>Australia, English</a>
      <a href="#support" class="link-muted">Support</a>
    </div>
  </div>
</div>
<header class="navbar" role="banner">
  <div class="container navbar-inner">
    <a href="#home" class="brand" aria-label="LLMCSS home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
        <path d="M14 15h7"/>
      </svg>
      <span>LLMCSS</span>
    </a>
    <nav class="nav-links" aria-label="Primary navigation">
      <a href="#platform" class="nav-link" aria-current="page">Platform</a>
      <a href="#regions" class="nav-link">Regions</a>
      <a href="#pricing" class="nav-link">Pricing</a>
      <a href="#docs" class="nav-link">Docs</a>
    </nav>
    <div class="flex items-center gap-3">
      <a href="#console" class="btn btn-ghost btn-sm hidden md:inline-flex">Console</a>
      <a href="#start" class="btn btn-primary btn-sm">Start free</a>
      <button type="button" class="btn btn-outline btn-sm btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#header-utility-menu" aria-controls="header-utility-menu" aria-expanded="false" aria-label="Open menu"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg></button>
    </div>
  </div>
</header>
<div id="header-utility-menu" class="drawer drawer-sm md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="header-utility-menu-title">
    <div class="drawer-header">
      <span class="drawer-title" id="header-utility-menu-title">Menu</span>
      <button type="button" class="btn btn-ghost btn-icon btn-xs" data-ai-dismiss="drawer" aria-label="Close menu"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>
    </div>
    <nav class="drawer-body drawer-nav" aria-label="Primary navigation">
      <a href="#platform" class="sidebar-item" aria-current="page" data-ai-dismiss="drawer">Platform</a>
      <a href="#regions" class="sidebar-item" data-ai-dismiss="drawer">Regions</a>
      <a href="#pricing" class="sidebar-item" data-ai-dismiss="drawer">Pricing</a>
      <a href="#docs" class="sidebar-item" data-ai-dismiss="drawer">Docs</a>
      <a href="#console" class="sidebar-item" data-ai-dismiss="drawer">Console</a>
      <a href="#locale" class="sidebar-item" data-ai-dismiss="drawer">Australia, English</a>
    </nav>
    <div class="drawer-footer">
      <p class="flex items-center gap-2 text-xs text-secondary">
        <span class="status-pip status-pip-success" aria-hidden="true"></span>
        All regions operational
      </p>
    </div>
  </div>
</div>`
  },
  {
    id: 'wireframe-header-mega-menu',
    name: 'Mega Menu Header',
    section: 'header',
    tier: 'free',
    tags: ['header', 'nav', 'mega-menu', 'dropdown', 'panel', 'drawer'],
    placement: 'Top of Page (Above Fold)',
    guidance: {
      placement: 'Very top of the DOM, sticky. Exactly one nav item opens a panel; the rest stay plain links. The runtime handles data-ai-toggle="dropdown": it toggles is-open on the .dropdown wrapper, rewrites aria-expanded, closes on outside click and on Escape.',
      bestUsedFor: 'Platforms with two genuine groupings behind one word, such as solutions by team and by stage, or products by surface and by integration. Two columns of six links each is the ceiling.',
      avoidWhen: 'You have fewer than six destinations to group, or more than two groups. One group belongs in a plain dropdown, three or more belong in a dedicated navigation page.',
      pairsWith: ['wireframe-hero-split', 'wireframe-features-alternating', 'wireframe-footer-columns']
    },
    html: `<header class="navbar" role="banner">
  <div class="container navbar-inner">
    <a href="#home" class="brand" aria-label="LLMCSS home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
        <path d="M14 15h7"/>
      </svg>
      <span>LLMCSS</span>
    </a>
    <nav class="nav-links" aria-label="Primary navigation">
      <a href="#platform" class="nav-link">Platform</a>
      <div class="dropdown">
        <button type="button" class="btn btn-ghost btn-sm" data-ai-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="header-mega-solutions">
          Solutions
          <svg class="accordion-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="dropdown-menu" id="header-mega-solutions">
          <div class="grid grid-cols-2 gap-x-4">
            <div>
              <p class="dropdown-header">By team</p>
              <a href="#design-systems" class="dropdown-item">Design systems</a>
              <a href="#front-end" class="dropdown-item">Front end</a>
              <a href="#marketing" class="dropdown-item">Marketing sites</a>
              <a href="#agents" class="dropdown-item">Agent tooling</a>
            </div>
            <div>
              <p class="dropdown-header">By stage</p>
              <a href="#prototype" class="dropdown-item">Prototype</a>
              <a href="#migrate" class="dropdown-item">Migrate a theme</a>
              <a href="#audit" class="dropdown-item">Audit an interface</a>
              <a href="#scale" class="dropdown-item">Scale a catalog</a>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <a href="#solutions" class="dropdown-item">See every solution</a>
        </div>
      </div>
      <a href="#pricing" class="nav-link">Pricing</a>
      <a href="#docs" class="nav-link" aria-current="page">Docs</a>
    </nav>
    <div class="flex items-center gap-3">
      <a href="#login" class="btn btn-ghost btn-sm hidden md:inline-flex">Sign in</a>
      <a href="#demo" class="btn btn-primary btn-sm">Book a demo</a>
      <button type="button" class="btn btn-outline btn-sm btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#header-mega-menu" aria-controls="header-mega-menu" aria-expanded="false" aria-label="Open menu"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg></button>
    </div>
  </div>
</header>
<div id="header-mega-menu" class="drawer drawer-sm md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="header-mega-menu-title">
    <div class="drawer-header">
      <span class="drawer-title" id="header-mega-menu-title">Menu</span>
      <button type="button" class="btn btn-ghost btn-icon btn-xs" data-ai-dismiss="drawer" aria-label="Close menu"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>
    </div>
    <nav class="drawer-body drawer-nav" aria-label="Primary navigation">
      <a href="#platform" class="sidebar-item" data-ai-dismiss="drawer">Platform</a>
      <p class="sidebar-section-title">Solutions by team</p>
      <a href="#design-systems" class="sidebar-item" data-ai-dismiss="drawer">Design systems</a>
      <a href="#front-end" class="sidebar-item" data-ai-dismiss="drawer">Front end</a>
      <a href="#marketing" class="sidebar-item" data-ai-dismiss="drawer">Marketing sites</a>
      <a href="#agents" class="sidebar-item" data-ai-dismiss="drawer">Agent tooling</a>
      <p class="sidebar-section-title">Solutions by stage</p>
      <a href="#prototype" class="sidebar-item" data-ai-dismiss="drawer">Prototype</a>
      <a href="#migrate" class="sidebar-item" data-ai-dismiss="drawer">Migrate a theme</a>
      <a href="#audit" class="sidebar-item" data-ai-dismiss="drawer">Audit an interface</a>
      <a href="#scale" class="sidebar-item" data-ai-dismiss="drawer">Scale a catalog</a>
      <p class="sidebar-section-title">More</p>
      <a href="#pricing" class="sidebar-item" data-ai-dismiss="drawer">Pricing</a>
      <a href="#docs" class="sidebar-item" aria-current="page" data-ai-dismiss="drawer">Docs</a>
    </nav>
    <div class="drawer-footer">
      <a href="#demo" class="btn btn-primary w-full">Book a demo</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'wireframe-header-transparent',
    name: 'Transparent Header Over Hero',
    section: 'header',
    tier: 'free',
    tags: ['header', 'nav', 'transparent', 'overlay', 'hero', 'drawer'],
    placement: 'Top of Page (Above Fold), overlapping the hero',
    guidance: {
      placement: 'This header is lifted out of flow: the navbar carries absolute, inset-x-0, top-0 and z-40, so it paints over whatever follows it instead of pushing it down. With no positioned ancestor it pins to the top of the document, which is what you want when the hero is the first section; inside a hero, .hero already sets position relative, so dropping this header in as the hero first child pins it to the hero instead. bg-transparent, border-0, backdrop-none and shadow-none strip the navbar surface, blur, hairline and elevation.',
      bestUsedFor: 'Full bleed heroes where the top edge of the image or surface should run to the browser chrome: campaign pages, launch pages, and single product sites.',
      avoidWhen: 'The hero is a photograph with unpredictable luminance, or the header must stay visible while scrolling. There is no colour hack here, so the nav tokens must already pass 4.5:1 on whatever sits behind them; over a busy image, use the standard sticky navbar instead.',
      pairsWith: ['wireframe-hero-centered', 'wireframe-hero-split', 'wireframe-cta-card']
    },
    html: `<header class="navbar bg-transparent border-0 backdrop-none shadow-none absolute inset-x-0 top-0 z-40" role="banner">
  <div class="container navbar-inner">
    <a href="#home" class="brand" aria-label="LLMCSS home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
        <path d="M14 15h7"/>
      </svg>
      <span>LLMCSS</span>
    </a>
    <nav class="nav-links" aria-label="Primary navigation">
      <a href="#overview" class="nav-link" aria-current="page">Overview</a>
      <a href="#gallery" class="nav-link">Gallery</a>
      <a href="#specs" class="nav-link">Specs</a>
      <a href="#stockists" class="nav-link">Stockists</a>
    </nav>
    <div class="flex items-center gap-3">
      <a href="#preorder" class="btn btn-primary btn-sm">Pre-order</a>
      <button type="button" class="btn btn-outline btn-sm btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#header-transparent-menu" aria-controls="header-transparent-menu" aria-expanded="false" aria-label="Open menu"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg></button>
    </div>
  </div>
</header>
<div id="header-transparent-menu" class="drawer drawer-sm md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="header-transparent-menu-title">
    <div class="drawer-header">
      <span class="drawer-title" id="header-transparent-menu-title">Menu</span>
      <button type="button" class="btn btn-ghost btn-icon btn-xs" data-ai-dismiss="drawer" aria-label="Close menu"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>
    </div>
    <nav class="drawer-body drawer-nav" aria-label="Primary navigation">
      <a href="#overview" class="sidebar-item" aria-current="page" data-ai-dismiss="drawer">Overview</a>
      <a href="#gallery" class="sidebar-item" data-ai-dismiss="drawer">Gallery</a>
      <a href="#specs" class="sidebar-item" data-ai-dismiss="drawer">Specs</a>
      <a href="#stockists" class="sidebar-item" data-ai-dismiss="drawer">Stockists</a>
    </nav>
    <div class="drawer-footer">
      <a href="#preorder" class="btn btn-primary w-full">Pre-order</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'wireframe-header-docs-version',
    name: 'Docs Header with Version Selector',
    section: 'header',
    tier: 'free',
    tags: ['header', 'nav', 'docs', 'version', 'select', 'github', 'drawer'],
    placement: 'Top of documentation, API reference and SDK pages',
    guidance: {
      placement: 'Sticky at the top of every documentation page, above the sidebar and content columns. The select is the version switcher and needs a real label; sr-only keeps it out of the layout without hiding it from a screen reader. The drawer repeats the switcher with its own id, because the desktop copy is hidden below 768px.',
      bestUsedFor: 'Versioned documentation, API references, SDK guides, and changelogs where readers land on the wrong version from search and need to jump without losing the page.',
      avoidWhen: 'The product ships one rolling version. A selector with a single option is furniture; use wireframe-docs-header instead.',
      pairsWith: ['wireframe-changelog', 'wireframe-faq-accordion', 'wireframe-footer-columns']
    },
    html: `<header class="navbar" role="banner">
  <div class="container navbar-inner">
    <a href="#docs" class="brand" aria-label="LLMCSS documentation home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
        <path d="M14 15h7"/>
      </svg>
      <span>LLMCSS Docs</span>
    </a>
    <nav class="nav-links" aria-label="Documentation sections">
      <a href="#guides" class="nav-link" aria-current="page">Guides</a>
      <a href="#reference" class="nav-link">Reference</a>
      <a href="#sdks" class="nav-link">SDKs</a>
      <a href="#changelog" class="nav-link">Changelog</a>
    </nav>
    <div class="flex items-center gap-2">
      <div class="hidden md:block">
        <label class="sr-only" for="header-docs-version">Documentation version</label>
        <select class="select" id="header-docs-version" name="version">
          <option value="0.4" selected>v0.4 (latest)</option>
          <option value="0.3">v0.3</option>
          <option value="0.2">v0.2</option>
        </select>
      </div>
      <a href="#github" class="btn btn-ghost btn-sm btn-icon" aria-label="LLMCSS on GitHub"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
      <button type="button" class="btn btn-outline btn-sm btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#header-docs-menu" aria-controls="header-docs-menu" aria-expanded="false" aria-label="Open menu"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg></button>
    </div>
  </div>
</header>
<div id="header-docs-menu" class="drawer drawer-sm md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="header-docs-menu-title">
    <div class="drawer-header">
      <span class="drawer-title" id="header-docs-menu-title">Documentation</span>
      <button type="button" class="btn btn-ghost btn-icon btn-xs" data-ai-dismiss="drawer" aria-label="Close menu"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>
    </div>
    <nav class="drawer-body drawer-nav" aria-label="Documentation sections">
      <a href="#guides" class="sidebar-item" aria-current="page" data-ai-dismiss="drawer">Guides</a>
      <a href="#reference" class="sidebar-item" data-ai-dismiss="drawer">Reference</a>
      <a href="#sdks" class="sidebar-item" data-ai-dismiss="drawer">SDKs</a>
      <a href="#changelog" class="sidebar-item" data-ai-dismiss="drawer">Changelog</a>
      <a href="#github" class="sidebar-item" data-ai-dismiss="drawer">GitHub repository</a>
    </nav>
    <div class="drawer-footer">
      <label class="sr-only" for="header-docs-version-mobile">Documentation version</label>
      <select class="select" id="header-docs-version-mobile" name="version">
        <option value="0.4" selected>v0.4 (latest)</option>
        <option value="0.3">v0.3</option>
        <option value="0.2">v0.2</option>
      </select>
    </div>
  </div>
</div>`
  }
];
