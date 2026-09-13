/**
 * LLMCSS Wireframe Templates: FAQ and CTA sections.
 *
 * Eight free wireframe sections that extend the catalogue in
 * templates-data.mjs. The shape of every object matches WireframeTemplate in
 * schema.ts exactly: id, name, section, tier, tags, placement, guidance
 * (placement, bestUsedFor, avoidWhen, pairsWith) and html.
 *
 * House rules applied here:
 *   - accordions are flush, hairline separated, never boxed inside a box
 *   - every accordion trigger is a real button with aria-expanded and
 *     aria-controls pointing at a unique id, and exactly one item per
 *     template starts open
 *   - the only chevron is the m6 9 6 6 6-6 path as inline SVG; details based
 *     disclosure uses .collapse and the marker the library already draws
 *   - labels are always present, sr-only where the layout hides them
 *   - images carry alt, width and height
 *
 * Consumed by templates-data.mjs, which concatenates this array into
 * wireframeTemplates. This module imports nothing.
 */

export const faqCtaTemplates = [
  {
    id: 'wireframe-faq-sticky-intro',
    name: 'Two Column FAQ With Sticky Intro',
    section: 'faq',
    tier: 'free',
    tags: ['faq', 'accordion', 'two-column', 'sticky', 'support', 'objections'],
    placement: 'Pre-Footer Validation (Directly below Pricing)',
    guidance: {
      placement: 'Use where the FAQ is long enough to scroll past one viewport. The left column pins with sticky-top inside its grid area, so the heading and the support link stay visible while the reader works down the answers.',
      bestUsedFor: 'Long technical FAQs of six or more questions where the reader needs a permanent escape hatch to human support. Choose this over wireframe-faq-inline when the answers are paragraphs rather than single sentences.',
      avoidWhen: 'You have three or fewer questions, or the page is already two columns at this width. A sticky column with nothing below it to scroll simply looks misaligned.',
      pairsWith: ['wireframe-pricing-tiers', 'wireframe-cta-dual-path', 'wireframe-footer-columns']
    },
    html: `<section id="faq" class="section py-20 border-t surface-0" aria-labelledby="faq-sticky-heading">
  <div class="container">
    <div class="grid-auto-fit grid-min-lg gap-12 items-start">
      <div class="sticky-top self-start">
        <h2 id="faq-sticky-heading" class="section-title mb-4">Questions from the install step</h2>
        <p class="text-secondary leading-relaxed mb-6">
          These are the questions the support inbox actually receives in the first week of a migration: bundle size, cascade order, and what happens to the classes you already ship.
        </p>
        <a href="mailto:support@llmcss.io" class="btn btn-outline btn-sm">Email the maintainers</a>
      </div>
      <div class="accordion">
        <div class="accordion-item is-open" open>
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="true" aria-controls="faq-sticky-a1">
            <span>Does LLMCSS add anything to my JavaScript bundle?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-sticky-a1">No. The stylesheet is the whole product. The optional runtime that opens accordions and drawers is a separate file you link only if you use those components, and it registers no framework and no build step.</div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-sticky-a2">
            <span>Will it fight with the Tailwind classes already in my templates?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-sticky-a2">Everything ships inside @layer components and @layer utilities, so any unlayered rule in your own stylesheet wins regardless of specificity. Migrate page by page; the two can coexist for as long as you need.</div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-sticky-a3">
            <span>How do I change the accent colour and the radius?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-sticky-a3">Redeclare the custom properties. Set --ai-accent and --ai-radius-base on :root for the whole document, or on any container to rescope a single region. There is no config file and nothing to recompile.</div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-sticky-a4">
            <span>Which browsers does the grid based accordion animation need?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-sticky-a4">The 0fr to 1fr transition needs Chrome 107, Safari 16 or Firefox 127. Older engines resolve both track sizes correctly and snap the panel open instead of easing it, so nothing breaks and no fallback is required.</div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-sticky-a5">
            <span>Can I run the validator in CI?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-sticky-a5">Yes. Run npx llmcss validate --strict on your built HTML and it exits non zero on any class the manifest does not know. Pair it with npx llmcss audit to fail the build on nested cards and animated status pips.</div>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-faq-categories',
    name: 'Categorised FAQ Groups',
    section: 'faq',
    tier: 'free',
    tags: ['faq', 'accordion', 'categories', 'grouped', 'documentation', 'support'],
    placement: 'Support Page Body or Pre-Footer Validation',
    guidance: {
      placement: 'Works as the entire body of a dedicated support page, or below pricing on a long marketing page. The three groups sit in a grid-auto-fit, so they reflow to two columns and then one without a breakpoint.',
      bestUsedFor: 'FAQs where the questions split cleanly by audience or topic, such as install versus licensing versus agent integration. The labelled groups let a reader skip two thirds of the page immediately.',
      avoidWhen: 'Your questions do not form obvious groups. Three headings over one question each reads as padding. Use wireframe-faq-sticky-intro for an ungrouped list.',
      pairsWith: ['wireframe-faq-search', 'wireframe-cta-newsletter', 'wireframe-footer-columns']
    },
    html: `<section id="faq-topics" class="section py-20 border-t surface-0" aria-labelledby="faq-categories-heading">
  <div class="container">
    <h2 id="faq-categories-heading" class="section-title text-center mb-4">Answers by topic</h2>
    <p class="section-lead mx-auto text-center mb-10">
      Installation, licensing and agent integration. Every answer links to the page in the handbook it was taken from.
    </p>
    <div class="grid-auto-fit grid-min-md gap-10 items-start">
      <div>
        <h3 class="text-lg font-semibold mb-2">Installation</h3>
        <div class="accordion">
          <div class="accordion-item is-open" open>
            <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="true" aria-controls="faq-cat-install-1">
              <span>npm package or CDN link?</span>
              <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="accordion-content" id="faq-cat-install-1">Both resolve to the same build. Install llmcss from npm when you want the CLI and the class manifest locally; link the CDN build when you are prototyping in a single HTML file.</div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-cat-install-2">
              <span>Do I need PostCSS or a bundler?</span>
              <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="accordion-content" id="faq-cat-install-2">Neither. The shipped file is plain CSS with custom properties and cascade layers. Import it from your entry stylesheet or add one link tag; there is no plugin to register.</div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-cat-install-3">
              <span>How do I load only the components I use?</span>
              <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="accordion-content" id="faq-cat-install-3">Import tokens.css and base.css, then the individual files under components that you need. The full build stays under the stylesheet budget, so most teams ship it whole and skip the bookkeeping.</div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-2">Licensing</h3>
        <div class="accordion">
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-cat-licence-1">
              <span>What does the free tier cover?</span>
              <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="accordion-content" id="faq-cat-licence-1">The stylesheet, the CLI, the wireframe section templates and the page blueprints, under MIT, for commercial work included. Pro adds the themed section kits and the skinned blueprints.</div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-cat-licence-2">
              <span>Can I ship Pro templates inside a client site?</span>
              <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="accordion-content" id="faq-cat-licence-2">Yes, on any plan that includes agency seats. You may deliver the rendered markup to the client. You may not redistribute the Pro template source as a template library of your own.</div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-cat-licence-3">
              <span>What happens to my pages if I cancel?</span>
              <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="accordion-content" id="faq-cat-licence-3">Nothing. Markup you have already generated is yours permanently and keeps working. You lose access to new Pro templates and to the private registry endpoint at the end of the billing period.</div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-2">AI agents</h3>
        <div class="accordion">
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-cat-agents-1">
              <span>How does an agent discover the class names?</span>
              <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="accordion-content" id="faq-cat-agents-1">From llms.txt and the generated classes.json manifest. Both are published at the site root, so a model fetches the exact contract instead of guessing at utility permutations it has seen elsewhere.</div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-cat-agents-2">
              <span>Is there an MCP server?</span>
              <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="accordion-content" id="faq-cat-agents-2">Yes, over stdio. It exposes get_component, get_template and validate_markup, so the agent can look a component up and check what it wrote in the same turn without leaving the editor.</div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-cat-agents-3">
              <span>What stops a model inventing a class that does not exist?</span>
              <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="accordion-content" id="faq-cat-agents-3">The validator. Run it in strict mode and any token outside the manifest is an error with the nearest real class named as the fix, which is a correction the model can apply without another round trip.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-faq-inline',
    name: 'Compact Inline FAQ',
    section: 'faq',
    tier: 'free',
    tags: ['faq', 'collapse', 'details', 'compact', 'no-javascript', 'narrow'],
    placement: 'Inline Within Documentation or Directly Above the Footer',
    guidance: {
      placement: 'Drop inside a prose column or between two content sections. One narrow measure, hairline rules between rows, no outer box, so it reads as part of the page rather than as a widget bolted onto it.',
      bestUsedFor: 'Short answers of one or two sentences, and any page that must work with the runtime script absent. Native details and summary open and close with zero JavaScript, which also makes the answers findable by the browser find-in-page.',
      avoidWhen: 'Answers run to several paragraphs or contain code blocks, and when you need the open state mirrored in ARIA for a custom controller. Use wireframe-faq-sticky-intro for those.',
      pairsWith: ['wireframe-features-bento', 'wireframe-cta-stats', 'wireframe-footer-columns']
    },
    html: `<section id="faq-quick" class="section py-16" aria-labelledby="faq-inline-heading">
  <div class="container">
    <div class="max-w-2xl mx-auto">
      <h2 id="faq-inline-heading" class="section-title mb-2">Quick answers</h2>
      <p class="text-secondary leading-relaxed mb-8">
        The short version. Longer write ups live in the handbook under Getting started.
      </p>
      <details class="collapse py-4 border-b" open>
        <summary><span>How big is the stylesheet?</span></summary>
        <p class="collapse-body text-sm">The full build is held to a 50 KB gzipped budget, checked on every commit. Import only the component files you use and a typical marketing page lands well under half of that.</p>
      </details>
      <details class="collapse py-4 border-b">
        <summary><span>Does it support dark mode?</span></summary>
        <p class="collapse-body text-sm">Set data-ai-theme="dark" on the html element. Every colour in the library resolves through a token, so nothing needs a dark variant class and no component has to be duplicated.</p>
      </details>
      <details class="collapse py-4 border-b">
        <summary><span>Is right to left supported?</span></summary>
        <p class="collapse-body text-sm">Yes. Spacing and border utilities use logical properties, so dir="rtl" flips padding, margins and borders without a mirrored stylesheet.</p>
      </details>
      <details class="collapse py-4 border-b">
        <summary><span>Can I use it with React or Svelte?</span></summary>
        <p class="collapse-body text-sm">It is a stylesheet and a set of class names, so any framework that renders HTML can use it. Write className instead of class in JSX and nothing else changes.</p>
      </details>
      <details class="collapse py-4 border-b">
        <summary><span>How are new versions released?</span></summary>
        <p class="collapse-body text-sm">Semver on npm, with a codemod shipped alongside any release that renames a class. Run npx llmcss lint --fix to migrate a repository in one pass.</p>
      </details>
      <details class="collapse py-4 border-b">
        <summary><span>Where do I report a bug?</span></summary>
        <p class="collapse-body text-sm">Open an issue on the GitHub repository with the markup that reproduces it. A failing snippet pasted into npx llmcss validate is usually enough to identify the cause.</p>
      </details>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-faq-search',
    name: 'Searchable FAQ Index',
    section: 'faq',
    tier: 'free',
    tags: ['faq', 'search', 'filter', 'accordion', 'help-centre', 'index'],
    placement: 'Top of a Help Centre or Support Landing Page',
    guidance: {
      placement: 'Use as the first section of a support page, above any category listing. The search field is the page entry point, so give it the full measure and keep the answer list directly beneath it.',
      bestUsedFor: 'Help centres with more questions than a reader will scan. The input carries id="faq-search" and the class js-faq-filter as the only hook a script needs: wire keyup to hide any .accordion-item whose trigger text does not match, and set hidden on the item so the library [hidden] rule removes it from the grid. The markup ships working and unfiltered if that script never loads.',
      avoidWhen: 'You have fewer than about eight questions, where a search field is slower than reading the list, or you cannot ship the filter script and the empty field would mislead.',
      pairsWith: ['wireframe-faq-categories', 'wireframe-cta-split', 'wireframe-footer-columns']
    },
    html: `<section id="faq-search-section" class="section py-20 border-t surface-0" aria-labelledby="faq-search-heading">
  <div class="container">
    <div class="max-w-2xl mx-auto">
      <h2 id="faq-search-heading" class="section-title mb-4">Search the handbook</h2>
      <p class="text-secondary leading-relaxed mb-6">
        Type a class name, a CLI flag or a token to narrow the list. Nothing here needs an account.
      </p>
      <form class="mb-8" action="/search" method="get" role="search">
        <label class="form-label sr-only" for="faq-search">Search the FAQ</label>
        <div class="input-group">
          <input type="search" id="faq-search" name="q" class="input js-faq-filter" placeholder="cascade layers, --ai-accent, validate --strict" autocomplete="off">
          <button type="submit" class="btn btn-outline">Search</button>
        </div>
        <span class="form-hint">Matches question text. Clearing the field restores every answer.</span>
      </form>
      <div class="accordion">
        <div class="accordion-item is-open" open>
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="true" aria-controls="faq-search-a1">
            <span>Why is my override losing to a component rule?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-search-a1">Your rule is probably inside a layer declared before components. An unlayered rule beats every layer, so move the override out of @layer, or declare your own layer after the library import.</div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-search-a2">
            <span>What does validate --strict change?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-search-a2">Without it, a class the manifest does not recognise is a warning, because real projects mix their own names into the same attribute. Strict mode promotes those to errors so a typo fails the build.</div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-search-a3">
            <span>Which tokens control spacing?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-search-a3">The --ai-space-1 through --ai-space-24 ramp in tokens.css. Every padding, margin and gap utility reads from it, so rescaling the ramp rescales the whole interface consistently.</div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-search-a4">
            <span>How do I make a table usable on a phone?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-search-a4">Wrap it in a div with overflow-x-auto and leave the columns at their natural width. Squeezing six columns into 390 px produces a table nobody can read; a horizontal scroll keeps the data intact.</div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-search-a5">
            <span>Can I use the components without the runtime script?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-search-a5">Most of them, yes. Only the toggled components need it: accordion, drawer, modal, dropdown and toast. Everything else is static CSS, and .collapse gives you disclosure with no script at all.</div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-search-a6">
            <span>Does the audit command check accessibility?</span>
            <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion-content" id="faq-search-a6">Partly. It flags the design laws it can detect mechanically, such as nested cards and animated status pips. Run it alongside a dedicated accessibility checker; it is not a replacement for one.</div>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-cta-split',
    name: 'Split CTA With Product Shot',
    section: 'cta',
    tier: 'free',
    tags: ['cta', 'split', 'screenshot', 'conversion', 'product', 'image'],
    placement: 'Pre-Footer Conversion Anchor, or mid page after a features section',
    guidance: {
      placement: 'Sits full width with the copy in one column and the product shot in the other. The pair is a grid-auto-fit, so the image drops below the copy on a phone with no breakpoint class involved.',
      bestUsedFor: 'Products where seeing the interface is the argument: editors, dashboards, CLIs with real output. Replace the image src with an actual screenshot at twice the displayed width and keep the width and height attributes accurate so the row never shifts as it loads.',
      avoidWhen: 'You have no real screenshot. A stock photograph standing in for the product reads as a placeholder and costs more trust than the section wins. Use wireframe-cta-stats instead.',
      pairsWith: ['wireframe-faq-search', 'wireframe-pricing-tiers', 'wireframe-footer-columns']
    },
    html: `<section class="section py-20 border-t" aria-labelledby="cta-split-heading">
  <div class="container">
    <div class="grid-auto-fit grid-min-lg gap-12 items-center">
      <div>
        <h2 id="cta-split-heading" class="section-title mb-4">See the classes your agent is allowed to use</h2>
        <p class="text-secondary leading-relaxed mb-6">
          Run llmcss serve and the local registry opens next to your editor: every component, its exact markup, and the validator watching the file you have open. Paste a snippet and it tells you which token is wrong before the page renders.
        </p>
        <div class="flex flex-wrap gap-3 mb-6">
          <a href="/quickstart" class="btn btn-primary">Install the CLI</a>
          <a href="/components" class="btn btn-outline">Browse components</a>
        </div>
        <span class="flex items-center gap-2 text-sm text-muted">
          <span class="status-pip status-pip-success" aria-hidden="true"></span>
          Registry and docs build from the same manifest
        </span>
      </div>
      <img class="w-full rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&auto=format&fit=crop&q=80" alt="The LLMCSS component registry open beside a code editor, with validator output listing two unknown class tokens" width="1200" height="800" loading="lazy">
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-cta-stats',
    name: 'Stats Backed CTA',
    section: 'cta',
    tier: 'free',
    tags: ['cta', 'stats', 'metrics', 'proof', 'single-action', 'conversion'],
    placement: 'Pre-Footer Conversion Anchor (Directly above Footer)',
    guidance: {
      placement: 'Put the three figures above the headline so the evidence is read before the ask. One button only; a second link here competes with the number you just made the reader believe.',
      bestUsedFor: 'Closing a page whose argument is measurable, where the numbers come from a dated source in the repository. The first stat carries is-primary and is deliberately the largest, which is what stops the row reading as a flat metric grid.',
      avoidWhen: 'You cannot cite the figures, or you need the reader to choose between two paths. Use wireframe-cta-dual-path when there is a real fork.',
      pairsWith: ['wireframe-faq-inline', 'wireframe-comparison-matrix', 'wireframe-footer-columns']
    },
    html: `<section class="section py-20 border-t surface-0" aria-labelledby="cta-stats-heading">
  <div class="container">
    <div class="max-w-2xl mx-auto text-center">
      <div class="stats-band mb-10">
        <div class="stat is-primary">
          <div class="stat-value font-mono">0 kb</div>
          <div class="stat-label">JavaScript shipped for a static page</div>
        </div>
        <div class="stat">
          <div class="stat-value font-mono">50 kb</div>
          <div class="stat-label">Gzipped budget for the whole stylesheet</div>
        </div>
        <div class="stat">
          <div class="stat-value font-mono">12</div>
          <div class="stat-label">Design laws the audit enforces</div>
        </div>
      </div>
      <h2 id="cta-stats-heading" class="section-title mb-4">Ship the interface, not the framework</h2>
      <p class="section-lead mx-auto mb-8">
        One stylesheet, a class manifest your agent can read, and a validator that fails the build when the markup drifts. Install it in the time it takes to read this paragraph.
      </p>
      <a href="/quickstart" class="btn btn-primary btn-lg">Read the quickstart</a>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-cta-newsletter',
    name: 'Newsletter Signup CTA',
    section: 'cta',
    tier: 'free',
    tags: ['cta', 'newsletter', 'email', 'subscribe', 'input-group', 'privacy'],
    placement: 'Pre-Footer Capture, or the end of an article template',
    guidance: {
      placement: 'A single band with the pitch on the left and the form on the right, so the field is never the first thing read. Never open this as a modal or a scroll triggered overlay; the band is the whole pattern.',
      bestUsedFor: 'Release notes and changelog subscriptions where the reader is not ready to install anything yet. The input and submit button are joined in an input-group, which keeps them on one line at every width and makes the pair read as one control.',
      avoidWhen: 'The page already ends with a signup form, or you cannot state a real sending cadence and a real unsubscribe route. An unqualified email field converts badly and ages worse.',
      pairsWith: ['wireframe-faq-categories', 'wireframe-features-bento', 'wireframe-footer-columns']
    },
    html: `<section class="section py-16" aria-labelledby="cta-newsletter-heading">
  <div class="container">
    <div class="cta-band">
      <div class="grid-auto-fit grid-min-md gap-8 items-center text-left">
        <div>
          <h2 id="cta-newsletter-heading" class="section-title mb-2">Release notes, once a month</h2>
          <p class="text-secondary leading-relaxed">
            New components, renamed classes and the codemod that migrates them. Written by the maintainers, sent the first Tuesday of the month, never more often.
          </p>
        </div>
        <form action="/subscribe" method="post">
          <label class="form-label sr-only" for="cta-newsletter-email">Work email address</label>
          <div class="input-group">
            <input type="email" id="cta-newsletter-email" name="email" class="input" placeholder="you@yourdomain.dev" autocomplete="email" required>
            <button type="submit" class="btn btn-primary whitespace-nowrap">Subscribe</button>
          </div>
          <p class="text-xs text-muted mt-3">
            Release notes only. We do not sell or share the list, and every message carries a one click unsubscribe link. Read the <a href="/privacy" class="link">privacy policy</a>.
          </p>
        </form>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-cta-dual-path',
    name: 'Dual Path CTA',
    section: 'cta',
    tier: 'free',
    tags: ['cta', 'dual', 'pricing', 'fork', 'free-vs-pro', 'cards'],
    placement: 'Pre-Footer Conversion Anchor, or immediately below a pricing table',
    guidance: {
      placement: 'Two cards side by side in a grid-auto-fit with nothing wrapping them, so the section never becomes a box containing boxes. They stack in source order on a phone, which is why the free path is written first.',
      bestUsedFor: 'Pages where the reader genuinely has two next steps, typically start free or buy the paid tier. Give each card a different button weight so the recommended path is obvious without a highlight band around it.',
      avoidWhen: 'One path is clearly better for every reader. A fake choice slows the decision down. Use wireframe-cta-stats for a single action, or wireframe-cta-split when the product shot does the persuading.',
      pairsWith: ['wireframe-pricing-tiers', 'wireframe-faq-sticky-intro', 'wireframe-footer-columns']
    },
    html: `<section class="section py-20 border-t surface-0" aria-labelledby="cta-dual-heading">
  <div class="container">
    <h2 id="cta-dual-heading" class="section-title text-center mb-4">Two ways to start</h2>
    <p class="section-lead mx-auto text-center mb-10">
      The library and the CLI are free forever. Pro adds the themed section kits and the skinned page blueprints.
    </p>
    <div class="grid-auto-fit grid-min-md gap-6 items-start">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Build with the free library</h3>
          <p class="card-description">Everything you need to ship a production marketing site or an app shell.</p>
        </div>
        <div class="card-body">
          <ul class="feature-list">
            <li><span class="mark mark-yes" role="img" aria-label="Included"></span> The full stylesheet under MIT</li>
            <li><span class="mark mark-yes" role="img" aria-label="Included"></span> CLI with validate, audit and lint --fix</li>
            <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Wireframe sections and page blueprints</li>
          </ul>
        </div>
        <div class="card-footer">
          <a href="/quickstart" class="btn btn-outline">Install from npm</a>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Upgrade to Pro</h3>
          <p class="card-description">For teams shipping several branded surfaces from one system.</p>
        </div>
        <div class="card-body">
          <ul class="feature-list">
            <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Themed section kits in four skins</li>
            <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Skinned page blueprints, assembled</li>
            <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Private registry endpoint for your agents</li>
          </ul>
        </div>
        <div class="card-footer">
          <a href="/pricing" class="btn btn-primary">See Pro pricing</a>
        </div>
      </div>
    </div>
  </div>
</section>`
  }
];
