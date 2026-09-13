/**
 * LLMCSS Wireframe Footer Sections
 *
 * Six free footer layouts that sit alongside `wireframe-footer-columns` in
 * templates-data.mjs. Every entry uses the same shape as `wireframeTemplates`:
 * id, name, section, tier, tags, placement, guidance and html.
 *
 * Shared contracts these templates hold to:
 *   - Link colour belongs to `.footer-list a`. No footer link carries a text
 *     colour utility, so a theme swap recolours every footer at once.
 *   - A column that collapses on mobile is `.footer-col.accordion-item` with a
 *     `.footer-col-toggle` button carrying aria-expanded plus aria-controls,
 *     and a `.footer-list.accordion-content` whose id the button names.
 *   - The chevron is the one library shape (`m6 9 6 6 6-6`) as inline SVG.
 *   - Status is a pip plus plain text, never a chip.
 *
 * This module imports nothing on purpose: it is data, and templates-data.mjs
 * concatenates it.
 */

export const footerTemplates = [
  {
    id: 'wireframe-footer-minimal',
    name: 'Single Line Minimal Footer',
    section: 'footer',
    tier: 'free',
    tags: ['footer', 'minimal', 'one-line', 'compact', 'legal'],
    placement: 'Bottom of Page (Terminal element)',
    guidance: {
      placement:
        'Last element in the document. One horizontal band: wordmark on the left, a short link row in the middle, copyright on the right, wrapping to stacked rows below 640px.',
      bestUsedFor:
        'Landing pages, single-purpose marketing sites, launch pages and auth screens where the footer must confirm ownership and offer the four obligatory links without opening a sitemap.',
      avoidWhen:
        'The site has more than about six destinations worth listing. Once a footer needs headings, reach for wireframe-footer-columns or wireframe-footer-mega instead of stretching this row.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-hero-centered', 'wireframe-cta-card'],
    },
    html: `<footer class="footer footer-compact" role="contentinfo">
  <div class="container flex flex-wrap items-center justify-between gap-4">
    <a href="#" class="brand" aria-label="LLMCSS Home">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
      </svg>
      <span>LLMCSS</span>
    </a>
    <nav aria-label="Footer">
      <ul class="footer-list flex-row flex-wrap justify-center gap-x-6 gap-y-2">
        <li><a href="#docs">Documentation</a></li>
        <li><a href="#changelog">Changelog</a></li>
        <li><a href="#status">Status</a></li>
        <li><a href="#privacy">Privacy</a></li>
      </ul>
    </nav>
    <p class="text-xs text-muted">&copy; 2026 LLMCSS</p>
  </div>
</footer>`,
  },
  {
    id: 'wireframe-footer-newsletter',
    name: 'Newsletter Signup Footer',
    section: 'footer',
    tier: 'free',
    tags: ['footer', 'newsletter', 'signup', 'email', 'capture'],
    placement: 'Bottom of Page (Terminal element)',
    guidance: {
      placement:
        'Bottom of the document. The brand column spans the full grid width on tablet and the first two tracks on desktop, so the email field keeps a comfortable measure next to two link columns.',
      bestUsedFor:
        'Products with a release cadence worth subscribing to: developer tools, changelog-driven SaaS, open source projects and publications that send one digest a month.',
      avoidWhen:
        'The page already ends in a dedicated newsletter or trial call to action. Two email fields in the last screenful compete, and the footer loses. Use wireframe-footer-columns underneath wireframe-cta-card instead.',
      pairsWith: ['wireframe-changelog', 'wireframe-features-alternating', 'wireframe-pricing-tiers'],
    },
    html: `<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand md:col-span-2">
        <a href="#" class="brand" aria-label="LLMCSS Home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M9 3v18"/>
            <path d="M14 9h7"/>
          </svg>
          <span>LLMCSS</span>
        </a>
        <p class="footer-blurb">
          Release notes for the class manifest, the validator and the MCP server. Written for the people and the agents that build with them.
        </p>
        <form class="w-full max-w-sm mt-6" action="#subscribe" method="post">
          <label class="form-label" for="wf-fnews-email">Monthly release digest</label>
          <div class="input-group mt-2">
            <input class="input" id="wf-fnews-email" type="email" name="email" autocomplete="email" placeholder="you@company.com" required>
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </div>
          <span class="footer-stat mt-3">One email a month. Unsubscribe from any of them.</span>
        </form>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="wf-fnews-product">Product <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="wf-fnews-product">
          <li><a href="#components">Components</a></li>
          <li><a href="#templates">Templates</a></li>
          <li><a href="#themes">Themes</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="wf-fnews-company">Company <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="wf-fnews-company">
          <li><a href="#about">About</a></li>
          <li><a href="#changelog">Changelog</a></li>
          <li><a href="#privacy">Privacy</a></li>
          <li><a href="#terms">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LLMCSS (llmcss.io). All rights reserved.</p>
      <a href="#preferences">Email preferences</a>
    </div>
  </div>
</footer>`,
  },
  {
    id: 'wireframe-footer-mega',
    name: 'Five Column Mega Footer',
    section: 'footer',
    tier: 'free',
    tags: ['footer', 'mega', 'sitemap', 'status', 'five-columns'],
    placement: 'Bottom of Page (Terminal element)',
    guidance: {
      placement:
        'Bottom of the document. A brand band sits above five equal link columns (three columns at tablet, five from 1024px) and the service status line lives in the bottom bar next to the copyright.',
      bestUsedFor:
        'Platforms with real breadth: multi-product suites, developer clouds, documentation portals and anything whose sitemap genuinely needs five headings.',
      avoidWhen:
        'You have fewer than about four links per heading. Five sparse columns read as padding. Drop to wireframe-footer-columns, which gives the brand column double width and three link columns.',
      pairsWith: ['wireframe-app-shell', 'wireframe-comparison-matrix', 'wireframe-pricing-tiers'],
    },
    html: `<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="flex flex-wrap items-center justify-between gap-4 mb-10">
      <a href="#" class="brand" aria-label="LLMCSS Home">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M9 3v18"/>
          <path d="M14 9h7"/>
          <path d="M14 15h7"/>
        </svg>
        <span>LLMCSS</span>
      </a>
      <span class="footer-cmd">npm install llmcss</span>
    </div>
    <div class="footer-grid md:grid-cols-3 lg:grid-cols-5">
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="wf-fmega-product">Product <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="wf-fmega-product">
          <li><a href="#components">Components</a></li>
          <li><a href="#templates">Section templates</a></li>
          <li><a href="#blueprints">Page blueprints</a></li>
          <li><a href="#themes">Themes and skins</a></li>
          <li><a href="#tokens">Design tokens</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="wf-fmega-agents">For agents <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="wf-fmega-agents">
          <li><a href="#mcp">MCP server</a></li>
          <li><a href="#llms-txt">llms.txt</a></li>
          <li><a href="#classes-json">classes.json</a></li>
          <li><a href="#agent-rules">Agent rules</a></li>
          <li><a href="#validator">Validator and audit</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="wf-fmega-learn">Learn <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="wf-fmega-learn">
          <li><a href="#quickstart">Quickstart</a></li>
          <li><a href="#layout">Layout and containers</a></li>
          <li><a href="#accessibility">Accessibility guide</a></li>
          <li><a href="#migration">Migration to 0.4</a></li>
          <li><a href="#recipes">Recipes</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="wf-fmega-community">Community <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="wf-fmega-community">
          <li><a href="#github">GitHub</a></li>
          <li><a href="#discussions">Discussions</a></li>
          <li><a href="#contributing">Contributing</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
          <li><a href="#showcase">Showcase</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="wf-fmega-company">Company <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="wf-fmega-company">
          <li><a href="#about">About</a></li>
          <li><a href="#licence">Licence</a></li>
          <li><a href="#security">Security</a></li>
          <li><a href="#privacy">Privacy</a></li>
          <li><a href="#terms">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LLMCSS (llmcss.io). All rights reserved.</p>
      <a href="#status"><span class="status-pip status-pip-success" aria-hidden="true"></span> All systems operational</a>
    </div>
  </div>
</footer>`,
  },
  {
    id: 'wireframe-footer-centered',
    name: 'Centered Stacked Footer',
    section: 'footer',
    tier: 'free',
    tags: ['footer', 'centered', 'social', 'stacked', 'editorial'],
    placement: 'Bottom of Page (Terminal element)',
    guidance: {
      placement:
        'Bottom of the document, centered on the page axis. Wordmark, one sentence, a single wrapping row of destinations, a social row rendered as plain words, then the bottom bar.',
      bestUsedFor:
        'Editorial sites, personal and studio portfolios, conference pages and launch microsites where the footer should close the page symmetrically rather than open a directory.',
      avoidWhen:
        'Navigation is the point. A centered wrapping row gives every link the same weight and no grouping, so a sitemap of fifteen destinations becomes an unscannable ribbon.',
      pairsWith: ['wireframe-hero-editorial', 'wireframe-quote-band', 'wireframe-social-proof-bar'],
    },
    html: `<footer class="footer footer-compact" role="contentinfo">
  <div class="container text-center">
    <a href="#" class="brand justify-center" aria-label="LLMCSS Home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
      </svg>
      <span>LLMCSS</span>
    </a>
    <p class="footer-blurb mx-auto">
      A native CSS design system written to be read by people and by the agents working alongside them.
    </p>
    <nav aria-label="Footer">
      <ul class="footer-list flex-row flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
        <li><a href="#components">Components</a></li>
        <li><a href="#templates">Templates</a></li>
        <li><a href="#docs">Documentation</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#changelog">Changelog</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
    <nav aria-label="Social">
      <ul class="footer-list flex-row flex-wrap justify-center gap-x-4 gap-y-2 mt-6">
        <li><a href="#github" rel="me">GitHub</a></li>
        <li><a href="#mastodon" rel="me">Mastodon</a></li>
        <li><a href="#bluesky" rel="me">Bluesky</a></li>
        <li><a href="#youtube" rel="me">YouTube</a></li>
      </ul>
    </nav>
    <div class="footer-bottom justify-center">
      <p>&copy; 2026 LLMCSS. Published in Melbourne.</p>
    </div>
  </div>
</footer>`,
  },
  {
    id: 'wireframe-footer-locale',
    name: 'Locale and Theme Footer',
    section: 'footer',
    tier: 'free',
    tags: ['footer', 'locale', 'language', 'select', 'theme'],
    placement: 'Bottom of Page (Terminal element)',
    guidance: {
      placement:
        'Bottom of the document. Two collapsing link columns sit beside the brand, and the bottom bar carries the language select, a note about how the theme is chosen, and the copyright.',
      bestUsedFor:
        'Localised products and any site that respects prefers-color-scheme. The footer is where people already look for a language switch, so it belongs here rather than in a crowded header.',
      avoidWhen:
        'Only one locale ships. A select with a single option is a dead control. Use wireframe-footer-columns and keep the theme note out of the bar entirely if the site has no theme choice to explain.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-pricing-tiers', 'wireframe-faq-accordion'],
    },
    html: `<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid lg:grid-cols-3">
      <div class="footer-brand">
        <a href="#" class="brand" aria-label="LLMCSS Home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M9 3v18"/>
            <path d="M14 9h7"/>
          </svg>
          <span>LLMCSS</span>
        </a>
        <p class="footer-blurb">
          Shipped in nine languages. Every string in the library is authored once and translated from the same source.
        </p>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="wf-floc-product">Product <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="wf-floc-product">
          <li><a href="#components">Components</a></li>
          <li><a href="#templates">Templates</a></li>
          <li><a href="#themes">Themes</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false" aria-controls="wf-floc-legal">Legal <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content" id="wf-floc-legal">
          <li><a href="#privacy">Privacy notice</a></li>
          <li><a href="#terms">Terms of service</a></li>
          <li><a href="#dpa">Data processing</a></li>
          <li><a href="#accessibility">Accessibility statement</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LLMCSS (llmcss.io). All rights reserved.</p>
      <div class="flex flex-wrap items-center gap-4">
        <span class="footer-stat mt-0">Theme follows your system setting.</span>
        <form action="#locale" method="get">
          <label class="sr-only" for="wf-floc-language">Language</label>
          <select class="select w-auto" id="wf-floc-language" name="lang">
            <option value="en" selected>English</option>
            <option value="de">Deutsch</option>
            <option value="es">Espa&ntilde;ol</option>
            <option value="fr">Fran&ccedil;ais</option>
            <option value="ja">&#26085;&#26412;&#35486;</option>
            <option value="pt">Portugu&ecirc;s</option>
          </select>
        </form>
      </div>
    </div>
  </div>
</footer>`,
  },
  {
    id: 'wireframe-footer-docs',
    name: 'Documentation Page Footer',
    section: 'footer',
    tier: 'free',
    tags: ['footer', 'docs', 'feedback', 'github', 'helpful'],
    placement: 'Bottom of Page (Terminal element)',
    guidance: {
      placement:
        'Bottom of a documentation page, aligned to the article column rather than the full viewport. The feedback row and the edit link share one line and stack below 640px, then a hairline separates them from the link row and the bottom bar.',
      bestUsedFor:
        'Documentation, API references, knowledge bases and runbooks: anywhere a reader can answer whether the page worked and a contributor can fix it in the same breath.',
      avoidWhen:
        'Marketing pages. A helpfulness prompt on a pricing page reads as a survey, and the answer tells you nothing. There is also no point shipping the buttons without somewhere to record the answer.',
      pairsWith: ['wireframe-docs-header', 'wireframe-app-shell', 'wireframe-changelog'],
    },
    html: `<footer class="footer footer-compact" role="contentinfo">
  <div class="container">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-3">
        <span class="text-sm font-semibold" id="wf-fdocs-helpful">Was this page helpful?</span>
        <div class="btn-group" role="group" aria-labelledby="wf-fdocs-helpful">
          <button type="button" class="btn btn-outline btn-sm" aria-pressed="false">Yes</button>
          <button type="button" class="btn btn-outline btn-sm" aria-pressed="false">No</button>
        </div>
      </div>
      <a href="#edit-on-github" class="link text-sm">Edit this page on GitHub</a>
    </div>
    <hr class="divider my-8">
    <nav aria-label="Documentation">
      <ul class="footer-list flex-row flex-wrap gap-x-6 gap-y-2">
        <li><a href="#quickstart">Quickstart</a></li>
        <li><a href="#classes">Class reference</a></li>
        <li><a href="#cli">CLI</a></li>
        <li><a href="#mcp">MCP server</a></li>
        <li><a href="#support">Support</a></li>
      </ul>
    </nav>
    <div class="footer-bottom">
      <p>&copy; 2026 LLMCSS (llmcss.io). Documentation is CC BY 4.0.</p>
      <span class="footer-cmd">llmcss validate --strict page.html</span>
    </div>
  </div>
</footer>`,
  },
];
