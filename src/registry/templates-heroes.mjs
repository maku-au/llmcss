/**
 * Free wireframe hero sections.
 *
 * Six additional `section: 'hero'` entries for the wireframe catalog, kept in
 * their own file so one builder owns one file. `templates-data.mjs` imports
 * `heroTemplates` and concatenates it into `wireframeTemplates`; nothing here
 * imports anything, so the module stays safe to read from the CLI, the MCP
 * server and the docs builder alike.
 *
 * Entry shape matches the existing wireframe entries exactly:
 *   id, name, description, section, tier, tags, placement,
 *   guidance { placement, bestUsedFor, avoidWhen, pairsWith }, html
 *
 * Every layout here is structurally different from the three heroes already in
 * templates-data.mjs (hero-split, hero-centered, hero-editorial) and from each
 * other: a two-column product shot, a stacked video poster, a bare typographic
 * statement, an inline signup row, a centered block over a logo rail, and an
 * asymmetric twelve-column dashboard preview. They all reuse the same component
 * classes, so a page can swap one hero for another without touching CSS.
 *
 * Note for the CSS owner, not actionable from this file: `.hero-split.is-reversed`
 * in src/css/components/marketing.css sets `grid-template-columns: 0.9fr 1.1fr`
 * outside any media query, so a reversed split hero is two columns even on a
 * phone. None of these templates use it; they reverse with `lg:order-*` instead.
 */

export const heroTemplates = [
  {
    id: 'wireframe-hero-product-shot',
    name: 'Product Shot Hero',
    description: 'Two-column hero: value proposition and actions on the left, a real interface screenshot on the right, and a hairline proof line of three monospaced facts under the buttons.',
    section: 'hero',
    tier: 'free',
    tags: ['hero', 'product-shot', 'screenshot', 'two-column', 'proof', 'conversion'],
    placement: 'Hero Section (Above Fold, immediately after Nav)',
    guidance: {
      placement: 'First content block under the header. Equal-width columns at 1024px and up; the copy stacks above the image below that.',
      bestUsedFor: 'A product whose interface is the argument. Choose this over the split hero when you have a real screenshot to show rather than a wireframe dock, and you want three hard facts sitting directly under the call to action.',
      avoidWhen: 'You have no shippable screenshot yet, or the product is a CLI with nothing to look at. Use the centered terminal hero or the typographic statement hero instead.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-social-proof-bar', 'wireframe-features-bento']
    },
    html: `<section class="hero" aria-labelledby="hero-product-shot-heading">
  <div class="container">
    <div class="grid gap-12 items-center lg:grid-cols-2">
      <div>
        <h1 id="hero-product-shot-heading" class="hero-title">
          Read the markup and you already know the layout
        </h1>
        <p class="hero-lead">
          LLMCSS ships one stylesheet, a token layer you can theme, and section templates an agent can paste without inventing a class name. No build step sits between the editor and the browser.
        </p>
        <div class="hero-actions">
          <a href="#quickstart" class="btn btn-primary btn-lg">Link the stylesheet</a>
          <a href="#templates" class="btn btn-outline btn-lg">Browse sections</a>
        </div>
        <div class="flex flex-wrap gap-6 md:gap-8 mt-10 pt-6 border-t">
          <div>
            <div class="font-mono text-lg font-semibold tabular">0 kb</div>
            <div class="text-xs text-muted mt-1">Runtime JavaScript</div>
          </div>
          <div>
            <div class="font-mono text-lg font-semibold tabular">1 file</div>
            <div class="text-xs text-muted mt-1">Stylesheet to link</div>
          </div>
          <div>
            <div class="font-mono text-lg font-semibold tabular">AA</div>
            <div class="text-xs text-muted mt-1">Contrast floor, both themes</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1280&h=800&auto=format&fit=crop&q=80" alt="An editor showing a section template made of plain HTML elements and unprefixed LLMCSS class names" width="1280" height="800" class="block w-full h-auto">
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-hero-video',
    name: 'Video Poster Hero',
    description: 'Stacked hero: a narrow copy block over a full-width poster frame, four by three on phones and sixteen by nine from 768px up, with a labelled play control and a running time under it.',
    section: 'hero',
    tier: 'free',
    tags: ['hero', 'video', 'poster', 'aspect-video', 'demo', 'stacked'],
    placement: 'Hero Section (Above Fold, immediately after Nav)',
    guidance: {
      placement: 'First content block under the header. Copy sits in a narrow measure on the left; the poster frame runs the full container width beneath it and relaxes from four by three to sixteen by nine at 768px.',
      bestUsedFor: 'Products that are faster to show than to describe, such as a migration walkthrough or an editor workflow. Pick this hero when a recorded demo is the strongest asset you own.',
      avoidWhen: 'There is no finished recording, the page must stay under a tight performance budget, or the product sells on a single number rather than a sequence of steps.',
      pairsWith: ['wireframe-nav-banner', 'wireframe-social-proof-bar', 'wireframe-features-alternating']
    },
    html: `<section class="hero" aria-labelledby="hero-video-heading">
  <div class="container">
    <div class="max-w-3xl">
      <h1 id="hero-video-heading" class="hero-title">
        Watch a Tailwind page become plain semantic HTML
      </h1>
      <p class="hero-lead">
        Three minutes, one real repository, no cuts. The codemod rewrites the utility strings, the audit reports what it could not resolve, and the diff stays reviewable.
      </p>
      <div class="hero-actions">
        <a href="#quickstart" class="btn btn-primary btn-lg">Run the migration</a>
        <a href="#transcript" class="btn btn-outline btn-lg">Read the transcript</a>
      </div>
    </div>
    <div class="hero-visual aspect-4/3 md:aspect-video mt-12">
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1280&h=720&auto=format&fit=crop&q=80" alt="Two engineers reviewing a migration diff together on a laptop" width="1280" height="720" class="block w-full h-full object-cover">
      <span class="absolute inset-0 flex items-center justify-center">
        <button type="button" class="btn btn-primary btn-lg btn-icon rounded-full" aria-label="Play the migration walkthrough, three minutes twelve seconds">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </span>
    </div>
    <p class="text-sm text-muted mt-4">3 min 12 sec. English captions and a full transcript.</p>
  </div>
</section>`
  },
  {
    id: 'wireframe-hero-typographic',
    name: 'Typographic Statement Hero',
    description: 'One display line, one sentence, one button. No media, no grid, no supporting rail: the shortest hero in the catalog.',
    section: 'hero',
    tier: 'free',
    tags: ['hero', 'typographic', 'minimal', 'statement', 'display', 'no-media'],
    placement: 'Hero Section (Above Fold, immediately after Nav)',
    guidance: {
      placement: 'First content block under the header, left aligned in a single column. Let the section padding carry the whitespace and add nothing else to the band.',
      bestUsedFor: 'Launch pages, docs landings and any page whose next section does the explaining. Choose this over the editorial hero when you want the statement alone, with no stat band and no second column.',
      avoidWhen: 'The page has to prove something above the fold, or the product needs a screenshot, a price or a form before a visitor will act.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-features-alternating', 'wireframe-changelog']
    },
    html: `<section class="hero" aria-labelledby="hero-typographic-heading">
  <div class="container">
    <h1 id="hero-typographic-heading" class="hero-title max-w-5xl">
      Stop shipping a design system in your class attribute.
    </h1>
    <p class="hero-lead text-lg md:text-xl">
      LLMCSS puts the cascade back in the stylesheet, so the markup you hand to a reviewer, a screen reader or a model reads as structure rather than as configuration.
    </p>
    <div class="hero-actions">
      <a href="#quickstart" class="btn btn-primary btn-lg">Start with one stylesheet</a>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-hero-signup',
    name: 'Inline Signup Hero',
    description: 'Hero with the signup on the page: an email field and submit button joined in one input group, a plain privacy sentence beneath, and a sign in link for returning users.',
    section: 'hero',
    tier: 'free',
    tags: ['hero', 'signup', 'form', 'email', 'input-group', 'conversion'],
    placement: 'Hero Section (Above Fold, immediately after Nav)',
    guidance: {
      placement: 'First content block under the header, single column in a reading measure. The form sits directly under the lead so the field is the first interactive element on the page.',
      bestUsedFor: 'Self-serve products where the account is free and the first step is an email address. Choose this over a hero with two buttons when the signup itself is the call to action and you want no modal in the way.',
      avoidWhen: 'Signup needs a sales conversation, a plan choice or a payment method first. Send those visitors to a pricing section or a contact form instead.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-social-proof-bar', 'wireframe-pricing-tiers']
    },
    html: `<section class="hero" aria-labelledby="hero-signup-heading">
  <div class="container">
    <div class="max-w-2xl lg:max-w-3xl">
      <h1 id="hero-signup-heading" class="hero-title">
        A workspace for your tokens in about a minute
      </h1>
      <p class="hero-lead">
        Point the CLI at a repository and LLMCSS reads the colours, spacing and type already in use, writes them as a token file, and opens a preview you can share with the rest of the team.
      </p>
      <form class="max-w-md" action="#create-workspace" method="post">
        <label for="hero-signup-email" class="sr-only">Work email address</label>
        <div class="input-group">
          <input id="hero-signup-email" class="input" type="email" name="email" autocomplete="email" placeholder="you@company.com" required>
          <button type="submit" class="btn btn-primary">Create workspace</button>
        </div>
        <p class="form-hint mt-3">One setup email, nothing else. Delete the workspace from its settings page whenever you like and the data goes with it.</p>
      </form>
      <p class="text-sm text-muted mt-6">Already have a workspace? <a href="#sign-in" class="link">Sign in</a>.</p>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-hero-logo-rail',
    name: 'Logo Rail Hero',
    description: 'Centered hero over a static wordmark rail: six customer names set as muted text under a hairline, with no images and no scrolling.',
    section: 'hero',
    tier: 'free',
    tags: ['hero', 'logo-rail', 'social-proof', 'centered', 'customers', 'wordmarks'],
    placement: 'Hero Section (Above Fold, immediately after Nav)',
    guidance: {
      placement: 'First content block under the header. Centered copy and actions, then a hairline rule and the wordmark rail, all inside the same band so the proof is above the fold.',
      bestUsedFor: 'Pages that need credibility in the first screen and would otherwise repeat a separate logo band immediately below the hero. Choose this when you have recognisable customers but no screenshot worth the width.',
      avoidWhen: 'You have fewer than four names to show, the names are under embargo, or the page already carries a social proof rail in the next section. Two rails in one screen read as filler.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-features-bento', 'wireframe-pricing-tiers']
    },
    html: `<section class="hero is-centered" aria-labelledby="hero-logo-rail-heading">
  <div class="container">
    <div class="max-w-2xl md:max-w-3xl mx-auto">
      <h1 id="hero-logo-rail-heading" class="hero-title">
        The stylesheet behind interfaces people actually ship
      </h1>
      <p class="hero-lead">
        Platform teams use LLMCSS as the shared layer under their product surfaces: one token file, one set of components, and section templates their agents are allowed to paste.
      </p>
      <div class="hero-actions">
        <a href="#quickstart" class="btn btn-primary btn-lg">Get started</a>
        <a href="#case-studies" class="btn btn-outline btn-lg">See how teams use it</a>
      </div>
    </div>
    <div class="mt-16 pt-10 border-t">
      <p class="text-sm text-muted mb-6">Building on the token layer today</p>
      <ul class="logo-rail list-none">
        <li>Northwind Labs</li>
        <li>Halden Systems</li>
        <li>Meridian Health</li>
        <li>Caldera Logistics</li>
        <li>Portside Analytics</li>
        <li>Ardent Foundry</li>
      </ul>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-hero-dashboard',
    name: 'Dashboard Preview Hero',
    description: 'Asymmetric twelve-column hero whose visual is a working console fragment: a status header, three flat metrics sized by container query, and a short results table.',
    section: 'hero',
    tier: 'free',
    tags: ['hero', 'dashboard', 'preview', 'kpi', 'table', 'container-query'],
    placement: 'Hero Section (Above Fold, immediately after Nav)',
    guidance: {
      placement: 'First content block under the header. At 1024px and up the preview takes seven of twelve columns on the left and the copy takes five on the right; below that the heading leads and the preview follows.',
      bestUsedFor: 'Tools that produce a report, a run or a score. Choose this over the product shot hero when the output is structured data you can render in real markup rather than photograph, so the numbers stay selectable and legible in both themes.',
      avoidWhen: 'The product has no dashboard, or the real console is too dense to read at a third of the page width. Do not reprint the same metrics again in the section below it.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-features-alternating', 'wireframe-comparison-matrix']
    },
    html: `<section class="hero" aria-labelledby="hero-dashboard-heading">
  <div class="container">
    <div class="grid gap-12 items-center lg:grid-cols-12">
      <div class="lg:col-span-5 lg:order-2">
        <h1 id="hero-dashboard-heading" class="hero-title">
          Every section audited before it reaches review
        </h1>
        <p class="hero-lead">
          The audit walks your built pages, checks each section against the twelve anti-slop laws, and tells you which rule failed and where. It runs in the same command your continuous integration already calls.
        </p>
        <div class="hero-actions">
          <a href="#quickstart" class="btn btn-primary btn-lg">Add the audit step</a>
          <a href="#laws" class="btn btn-outline btn-lg">Read the laws</a>
        </div>
      </div>
      <div class="cq lg:col-span-7 lg:order-1">
        <div class="hero-visual">
          <div class="flex flex-wrap items-center justify-between gap-3 py-3 px-4 surface-0 border-b">
            <span class="font-mono text-xs text-muted">llmcss audit dist/**/*.html</span>
            <span class="flex items-center gap-2 text-xs text-secondary">
              <span class="status-pip status-pip-success" aria-hidden="true"></span>
              Last run passed
            </span>
          </div>
          <div class="grid gap-6 p-6 surface-1 cq-md:grid-cols-3">
            <div>
              <div class="kpi-label">Pages audited</div>
              <div class="kpi-value text-2xl tabular">128</div>
            </div>
            <div>
              <div class="kpi-label">Laws checked</div>
              <div class="kpi-value text-2xl tabular">12</div>
            </div>
            <div>
              <div class="kpi-label">Run time</div>
              <div class="kpi-value text-2xl tabular">1.4s</div>
            </div>
          </div>
          <div class="overflow-x-auto border-t">
            <table class="table table-compact">
              <caption class="sr-only">Most recent audit results by section</caption>
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col">Result</th>
                  <th scope="col">Checked</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" class="font-mono text-xs normal-case">hero-product-shot</th>
                  <td><span class="flex items-center gap-2"><span class="status-pip status-pip-success" aria-hidden="true"></span>Clean</span></td>
                  <td class="tabular">2 min ago</td>
                </tr>
                <tr>
                  <th scope="row" class="font-mono text-xs normal-case">pricing-tiers</th>
                  <td><span class="flex items-center gap-2"><span class="status-pip status-pip-warning" aria-hidden="true"></span>Law 8, flat metric grid</span></td>
                  <td class="tabular">2 min ago</td>
                </tr>
                <tr>
                  <th scope="row" class="font-mono text-xs normal-case">footer-columns</th>
                  <td><span class="flex items-center gap-2"><span class="status-pip status-pip-success" aria-hidden="true"></span>Clean</span></td>
                  <td class="tabular">2 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`
  }
];
