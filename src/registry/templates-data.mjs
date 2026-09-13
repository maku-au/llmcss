/**
 * LLMCSS Wireframe Templates & Page Blueprints Registry
 * Pure Semantic HTML layouts with structured design guidance for developers & AI agents.
 * Themed Pro sections are concatenated from templates-themed.mjs.
 */

import { themedSectionTemplates, themedPageKits } from './templates-themed.mjs';

export const wireframeTemplates = [
  {
    id: 'wireframe-nav-minimal',
    name: 'Minimal Navigation Bar',
    section: 'header',
    tier: 'free',
    tags: ['nav', 'header', 'navbar', 'wireframe', 'topbar'],
    placement: 'Top of Page (Above Fold)',
    guidance: {
      placement: 'Position at the very top of the DOM as a sticky or static header. Precedes any hero section.',
      bestUsedFor: 'Clean SaaS homepages, focused documentation hubs, and portfolio sites where navigation should stay minimal, tactile, and non-distracting.',
      avoidWhen: 'Complex mega-menu portals with multi-level nested hierarchies or dense eCommerce category trees.',
      pairsWith: ['wireframe-hero-split', 'wireframe-hero-centered', 'wireframe-hero-editorial']
    },
    html: `<header class="navbar" role="banner">
  <div class="container navbar-inner">
    <a href="#" class="brand" aria-label="LLMCSS Home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
        <path d="M14 15h7"/>
      </svg>
      <span>LLMCSS</span>
    </a>
    <nav class="nav-links" aria-label="Primary Navigation">
      <a href="#features" class="nav-link">Features</a>
      <a href="#blueprints" class="nav-link">Blueprints</a>
      <a href="#pricing" class="nav-link">Pricing</a>
      <a href="#faq" class="nav-link">FAQ</a>
    </nav>
    <div class="flex items-center gap-3">
      <a href="#login" class="btn btn-ghost btn-sm hidden md:inline-flex">Sign In</a>
      <a href="#get-started" class="btn btn-primary btn-sm">Get Started</a>
      <button type="button" class="btn btn-outline btn-sm btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#nav-minimal-menu" aria-controls="nav-minimal-menu" aria-expanded="false" aria-label="Open menu"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg></button>
    </div>
  </div>
</header>
<div id="nav-minimal-menu" class="drawer drawer-sm md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer-header">
      <span class="drawer-title">Menu</span>
      <button type="button" class="btn btn-ghost btn-icon btn-xs" data-ai-dismiss="drawer" aria-label="Close menu"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>
    </div>
    <nav class="drawer-body drawer-nav" aria-label="Primary">
      <a href="#features" class="sidebar-item" data-ai-dismiss="drawer">Features</a>
      <a href="#blueprints" class="sidebar-item" data-ai-dismiss="drawer">Blueprints</a>
      <a href="#pricing" class="sidebar-item" data-ai-dismiss="drawer">Pricing</a>
      <a href="#faq" class="sidebar-item" data-ai-dismiss="drawer">FAQ</a>
    </nav>
    <div class="drawer-footer">
      <a href="#login" class="btn btn-outline w-full">Sign In</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'wireframe-nav-banner',
    name: 'Banner Announcement Navigation',
    section: 'header',
    tier: 'free',
    tags: ['nav', 'header', 'banner', 'announcement', 'topbar'],
    placement: 'Top of Page (Above Fold)',
    guidance: {
      placement: 'Mount above primary navigation bar. Can be dismissed or kept persistent for major product announcements.',
      bestUsedFor: 'Developer tool launches, release updates, conference announcements, and security advisories.',
      avoidWhen: 'Minimal single-page landing pages where screen real estate above the fold is constrained.',
      pairsWith: ['wireframe-hero-centered', 'wireframe-hero-split']
    },
    html: `<div class="section-banner" role="region" aria-label="Announcement">
  <div class="container flex items-center justify-between py-2" style="font-size: 0.8125rem;">
    <div class="flex items-center gap-2">
      <span class="badge badge-solid badge-sm">NEW</span>
      <span>LLMCSS v2.4 is released: Zero runtime JS, pure semantic CSS wireframes.</span>
    </div>
    <a href="#release-notes" class="link" style="font-size: 0.8125rem; font-weight: 600;">Read Notes &rarr;</a>
  </div>
</div>
<header class="navbar" role="banner">
  <div class="container navbar-inner">
    <a href="#" class="brand" aria-label="LLMCSS Home">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M14 9h7"/>
      </svg>
      <span>LLMCSS</span>
    </a>
    <nav class="nav-links" aria-label="Primary Navigation">
      <a href="#architecture" class="nav-link">Architecture</a>
      <a href="#templates" class="nav-link">Templates</a>
      <a href="#docs" class="nav-link">Documentation</a>
    </nav>
    <div class="flex items-center gap-3">
      <a href="#docs" class="btn btn-outline btn-sm">Docs</a>
      <a href="#install" class="btn btn-primary btn-sm">Install CLI</a>
    </div>
  </div>
</header>`
  },
  {
    id: 'wireframe-hero-split',
    name: 'Split High-Conversion Hero',
    section: 'hero',
    tier: 'free',
    tags: ['hero', 'split', 'conversion', 'headline', 'landing'],
    placement: 'Hero Section (Above Fold, immediately after Nav)',
    guidance: {
      placement: 'First major content section below the header. Occupies the primary viewport height.',
      bestUsedFor: 'B2B SaaS homepages, interactive developer products, or apps with an interactive preview or dock to showcase alongside the value proposition.',
      avoidWhen: 'Text-only editorial essays or minimal sign-in portals.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-social-proof-bar', 'wireframe-features-bento']
    },
    html: `<section class="hero" aria-labelledby="hero-split-heading">
  <div class="container">
    <div class="hero-split">
      <div>
        <h1 id="hero-split-heading" class="hero-title">
          Build Interfaces at the Speed of Thought
        </h1>
        <p class="hero-lead">
          Pure native CSS layout primitives and semantic design tokens for human developers and autonomous AI agents. Zero runtime JavaScript overhead.
        </p>
        <div class="hero-actions">
          <a href="#get-started" class="btn btn-primary btn-lg">Start Building Free</a>
          <a href="#templates" class="btn btn-outline btn-lg">Explore Templates</a>
        </div>
        <div class="flex items-center gap-6 mt-8" style="font-size: 0.8125rem; color: var(--ai-text-muted);">
          <span>&bull; Pure Native CSS</span>
          <span>&bull; Zero Dependencies</span>
          <span>&bull; Agent-Optimized</span>
        </div>
      </div>
      <div class="hero-visual">
        <div style="padding: 1.5rem; border-bottom: 1px solid var(--ai-border); background: var(--ai-surface-0); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; gap: 0.5rem;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--ai-border);"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--ai-border);"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--ai-border);"></div>
          </div>
          <span style="font-family: var(--ai-font-mono); font-size: 0.75rem; color: var(--ai-text-muted);">preview-dock.css</span>
        </div>
        <div style="padding: 2rem; background: var(--ai-surface-1); min-height: 280px; display: flex; flex-direction: column; justify-content: center; gap: 1rem;">
          <div style="height: 14px; width: 45%; background: var(--ai-border); border-radius: var(--ai-radius-xs);"></div>
          <div style="height: 36px; width: 85%; background: var(--ai-border-hover); border-radius: var(--ai-radius-sm);"></div>
          <div style="height: 12px; width: 70%; background: var(--ai-border); border-radius: var(--ai-radius-xs);"></div>
          <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <div style="height: 36px; width: 110px; background: var(--ai-primary); border-radius: var(--ai-radius-md); opacity: 0.85;"></div>
            <div style="height: 36px; width: 110px; background: var(--ai-surface-2); border: 1px solid var(--ai-border); border-radius: var(--ai-radius-md);"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-hero-centered',
    name: 'Centered Terminal Hero',
    section: 'hero',
    tier: 'free',
    tags: ['hero', 'centered', 'terminal', 'developer', 'cli'],
    placement: 'Hero Section (Above Fold, immediately after Nav)',
    guidance: {
      placement: 'First major content section below the header. Symmetrical layout with centered focal point.',
      bestUsedFor: 'Developer tools, open-source libraries, CLI utilities, and infrastructure platforms where a quick command snippet drives direct adoption.',
      avoidWhen: 'Multi-persona enterprise portals requiring complex segment navigation.',
      pairsWith: ['wireframe-nav-banner', 'wireframe-social-proof-bar', 'wireframe-features-alternating']
    },
    html: `<section class="hero" style="text-align: center;" aria-labelledby="hero-centered-heading">
  <div class="container" style="max-width: 52rem;">
    <h1 id="hero-centered-heading" class="hero-title">
      The Layout Engine for Deterministic Interfaces
    </h1>
    <p class="hero-lead" style="margin-left: auto; margin-right: auto;">
      Extract and insert production-grade wireframe sections in seconds. Drop semantic layout blocks directly into your codebase with zero CSS friction.
    </p>
    <div class="hero-actions" style="justify-content: center; margin-bottom: 2.5rem;">
      <a href="#quickstart" class="btn btn-primary btn-lg">Get Started</a>
      <a href="#docs" class="btn btn-outline btn-lg">View Components</a>
    </div>
    <div style="background: var(--ai-surface-0); border: 1px solid var(--ai-border); border-radius: var(--ai-radius-lg); padding: 1rem 1.5rem; display: inline-flex; align-items: center; gap: 1rem; box-shadow: var(--ai-shadow-md);">
      <span style="color: var(--ai-text-muted); font-family: var(--ai-font-mono); font-size: 0.8125rem;">$</span>
      <code style="font-family: var(--ai-font-mono); font-size: 0.875rem; color: var(--ai-text-primary);">npx llmcss template get hero-split</code>
      <button class="btn btn-ghost btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" aria-label="Copy CLI command">Copy</button>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-hero-editorial',
    name: 'Editorial Manifesto Hero',
    section: 'hero',
    tier: 'free',
    tags: ['hero', 'editorial', 'manifesto', 'typography', 'branding'],
    placement: 'Hero Section (Above Fold, immediately after Nav)',
    guidance: {
      placement: 'First content section below minimal navigation. Uses asymmetric grid with strong typographic hierarchy.',
      bestUsedFor: 'Design studios, editorial publications, AI research labs, and opinionated high-craft software products.',
      avoidWhen: 'Data-dense SaaS utilities that need instant dashboard access above the fold.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-social-proof-bar', 'wireframe-features-bento']
    },
    html: `<section class="hero" aria-labelledby="hero-editorial-heading">
  <div class="container">
    <div style="border-bottom: 1px solid var(--ai-border); padding-bottom: 3.5rem;">
      <h1 id="hero-editorial-heading" style="font-family: var(--ai-font-display); font-size: clamp(2.75rem, 6vw, 4.75rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.035em; max-width: 56rem; margin-bottom: 2rem;">
        Pure Structure. Zero Bloat. The Anti-Framework.
      </h1>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem; align-items: start;">
        <p style="font-size: 1.125rem; line-height: 1.6; color: var(--ai-text-secondary); margin: 0;">
          Modern web applications do not require thousands of unmaintainable utility strings or heavy JavaScript runtimes just to paint a button. We return to semantic HTML and native cascade layers.
        </p>
        <div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
            <div>
              <div style="font-family: var(--ai-font-display); font-size: 2rem; font-weight: 700;">0 kb</div>
              <div style="font-size: 0.8125rem; color: var(--ai-text-muted);">Runtime JavaScript</div>
            </div>
            <div>
              <div style="font-family: var(--ai-font-display); font-size: 2rem; font-weight: 700;">100%</div>
              <div style="font-size: 0.8125rem; color: var(--ai-text-muted);">Native Cascade</div>
            </div>
          </div>
          <a href="#manifesto" class="btn btn-primary">Read the Manifesto</a>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-social-proof-bar',
    name: 'Social Proof & Telemetry Rail',
    section: 'social-proof',
    tier: 'free',
    tags: ['social-proof', 'logos', 'trust', 'metrics', 'stats'],
    placement: 'Mid-Funnel Anchor (Directly below Hero section)',
    guidance: {
      placement: 'Place directly beneath the hero section to immediately validate credibility and conversion intent.',
      bestUsedFor: 'Establishing trust via key metrics, partner logos, or adoption telemetry right before introducing feature deep-dives.',
      avoidWhen: 'Internal tools or private enterprise dashboards with no external public visitors.',
      pairsWith: ['wireframe-hero-split', 'wireframe-hero-centered', 'wireframe-features-bento']
    },
    html: `<section class="section" style="padding: 3rem 0; border-top: 1px solid var(--ai-border); border-bottom: 1px solid var(--ai-border); background: var(--ai-surface-0);" aria-label="Social Proof and Trust Telemetry">
  <div class="container">
    <div style="text-align: center; margin-bottom: 2rem;">
      <p style="font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; color: var(--ai-text-muted); margin: 0;">
        Powering production interfaces across modern engineering teams
      </p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 2rem; align-items: center; justify-items: center; opacity: 0.75; margin-bottom: 2.5rem;">
      <span style="font-family: var(--ai-font-mono); font-size: 0.9375rem; font-weight: 700; letter-spacing: 0.05em;">SYNAPSE</span>
      <span style="font-family: var(--ai-font-mono); font-size: 0.9375rem; font-weight: 700; letter-spacing: 0.05em;">HEXA.CORP</span>
      <span style="font-family: var(--ai-font-mono); font-size: 0.9375rem; font-weight: 700; letter-spacing: 0.05em;">KINETIC.UI</span>
      <span style="font-family: var(--ai-font-mono); font-size: 0.9375rem; font-weight: 700; letter-spacing: 0.05em;">POLARIS</span>
      <span style="font-family: var(--ai-font-mono); font-size: 0.9375rem; font-weight: 700; letter-spacing: 0.05em;">VECTOR.AI</span>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; padding-top: 1.5rem; border-top: 1px dashed var(--ai-border); text-align: center;">
      <div>
        <div style="font-family: var(--ai-font-display); font-size: 1.5rem; font-weight: 700; color: var(--ai-text-primary);">99.9%</div>
        <div style="font-size: 0.75rem; color: var(--ai-text-muted);">AI Prompt Accuracy</div>
      </div>
      <div>
        <div style="font-family: var(--ai-font-display); font-size: 1.5rem; font-weight: 700; color: var(--ai-text-primary);">&lt; 0.4kb</div>
        <div style="font-size: 0.75rem; color: var(--ai-text-muted);">Median Element Size</div>
      </div>
      <div>
        <div style="font-family: var(--ai-font-display); font-size: 1.5rem; font-weight: 700; color: var(--ai-text-primary);">100%</div>
        <div style="font-size: 0.75rem; color: var(--ai-text-muted);">Standard Web APIs</div>
      </div>
      <div>
        <div style="font-family: var(--ai-font-display); font-size: 1.5rem; font-weight: 700; color: var(--ai-text-primary);">0 ms</div>
        <div style="font-size: 0.75rem; color: var(--ai-text-muted);">JS Hydration Latency</div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-features-bento',
    name: 'Asymmetric Bento Grid Features',
    section: 'features',
    tier: 'free',
    tags: ['features', 'bento', 'grid', 'cards', 'capabilities'],
    placement: 'Core Content (Mid-Funnel, below Social Proof)',
    guidance: {
      placement: 'Center of page layout after initial social proof or hero context. Acts as the primary feature capability overview.',
      bestUsedFor: 'Showcasing product pillars, technical architecture highlights, and multi-faceted product capabilities with visual hierarchy.',
      avoidWhen: 'Simple step-by-step onboarding sequences that require sequential, linear flow.',
      pairsWith: ['wireframe-social-proof-bar', 'wireframe-pricing-tiers', 'wireframe-comparison-matrix']
    },
    html: `<section id="features" class="section" style="padding: 5rem 0;" aria-labelledby="features-bento-heading">
  <div class="container">
    <div style="max-width: 38rem; margin-bottom: 3.5rem;">
      <h2 id="features-bento-heading" style="font-family: var(--ai-font-display); font-size: clamp(2rem, 3.5vw, 2.75rem); font-weight: 700; line-height: 1.15; margin-bottom: 1rem;">
        Architecture Without Compromise
      </h2>
      <p style="font-size: 1.0625rem; color: var(--ai-text-secondary); line-height: 1.6; margin: 0;">
        Built on native web platform capabilities to deliver maximum developer ergonomics and zero runtime penalty.
      </p>
    </div>
    <div class="bento-grid">
      <div class="bento-cell bento-span-2">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5rem;">Native Cascade Layer Isolation</h3>
          <span class="bento-code-pill">@layer reset, tokens, base, components, utilities</span>
          <p style="font-size: 0.875rem; color: var(--ai-text-secondary); line-height: 1.5; margin: 0;">
            Never fight specificity wars again. LLMCSS registers its styles across explicit CSS cascade layers so your application styles always override primitives cleanly without important hacks.
          </p>
        </div>
        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--ai-surface-1); border: 1px solid var(--ai-border); border-radius: var(--ai-radius-md); font-family: var(--ai-font-mono); font-size: 0.75rem; color: var(--ai-text-muted);">
          /* Deterministic specificity cascade */<br>
          @layer components { .card { border-radius: var(--ai-radius-lg); } }
        </div>
      </div>
      <div class="bento-cell">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5rem;">Semantic Token System</h3>
          <span class="bento-code-pill">Tokens &bull; HSL Scales</span>
          <p style="font-size: 0.875rem; color: var(--ai-text-secondary); line-height: 1.5; margin: 0;">
            Comprehensive color scales, tactile multi-stop elevation, and harmonious typography variables.
          </p>
        </div>
        <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem;">
          <div style="flex:1; height: 32px; border-radius: var(--ai-radius-xs); background: var(--ai-surface-2); border: 1px solid var(--ai-border);"></div>
          <div style="flex:1; height: 32px; border-radius: var(--ai-radius-xs); background: var(--ai-primary);"></div>
          <div style="flex:1; height: 32px; border-radius: var(--ai-radius-xs); background: var(--ai-surface-3); border: 1px solid var(--ai-border);"></div>
        </div>
      </div>
      <div class="bento-cell">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5rem;">Zero JS Hydration</h3>
          <span class="bento-code-pill">0kb Runtime</span>
          <p style="font-size: 0.875rem; color: var(--ai-text-secondary); line-height: 1.5; margin: 0;">
            Pure CSS eliminates cumulative layout shift, client hydration delays, and bundle bloat entirely.
          </p>
        </div>
        <div style="margin-top: 1.5rem; display: flex; align-items: baseline; gap: 0.5rem;">
          <span style="font-family: var(--ai-font-display); font-size: 2rem; font-weight: 800;">100</span>
          <span style="font-size: 0.75rem; color: var(--ai-text-muted);">Lighthouse Performance Score</span>
        </div>
      </div>
      <div class="bento-cell bento-span-2">
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5rem;">Autonomous Agent Protocol Ready</h3>
          <span class="bento-code-pill">MCP Protocol &bull; CLI</span>
          <p style="font-size: 0.875rem; color: var(--ai-text-secondary); line-height: 1.5; margin: 0;">
            Built from day one with structured schemas, llms.txt specifications, and MCP tools so autonomous AI models generate pixel-perfect markup on the first prompt without hallucinating classes.
          </p>
        </div>
        <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <span class="badge badge-outline badge-sm">llmcss search &lt;query&gt;</span>
          <span class="badge badge-outline badge-sm">llmcss template blueprint</span>
          <span class="badge badge-outline badge-sm">llmcss validate &lt;file&gt;</span>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-features-alternating',
    name: 'Alternating Deep-Dive Features',
    section: 'features',
    tier: 'free',
    tags: ['features', 'alternating', 'deep-dive', 'details', 'showcase'],
    placement: 'Core Content (Mid-Funnel, below Overview or Bento Grid)',
    guidance: {
      placement: 'Follows an overview or bento grid to walk through detailed workflows in alternating two-column rows.',
      bestUsedFor: 'Explaining 2 to 3 core workflows with dedicated visual previews, code blocks, or screenshot mockups.',
      avoidWhen: 'Quick summary lists where readers need to scan 10+ items quickly.',
      pairsWith: ['wireframe-features-bento', 'wireframe-comparison-matrix', 'wireframe-pricing-tiers']
    },
    html: `<section class="section" style="padding: 5rem 0; border-top: 1px solid var(--ai-border);" aria-labelledby="features-alt-heading">
  <div class="container">
    <div style="text-align: center; max-width: 36rem; margin: 0 auto 4rem;">
      <h2 id="features-alt-heading" class="section-title">
        Deep-Dive Engineering
      </h2>
      <p style="color: var(--ai-text-secondary); font-size: 1rem; margin-top: 0.5rem;">
        Inspect how LLMCSS separates concerns cleanly between layout, tokens, and behavior.
      </p>
    </div>
    <div style="display: flex; flex-direction: column; gap: 5rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; align-items: center;">
        <div>
          <h3 style="font-family: var(--ai-font-display); font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem;">
            Deterministic Code Generation
          </h3>
          <p style="color: var(--ai-text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            Autonomous AI coding assistants frequently hallucinate arbitrary utility strings. LLMCSS provides a finite, predictable component dictionary that eliminates hallucinated classes.
          </p>
          <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; color: var(--ai-text-secondary);">
            <li class="flex items-center gap-2">&bull; Complete llms.txt and llms-full.txt catalogs</li>
            <li class="flex items-center gap-2">&bull; Built-in AST and RegExp markup validation CLI</li>
            <li class="flex items-center gap-2">&bull; Standardized HTML tags and aria roles</li>
          </ul>
          <a href="#validation" class="btn btn-outline btn-sm">Learn About Validation</a>
        </div>
        <div style="background: var(--ai-surface-0); border: 1px solid var(--ai-border); border-radius: var(--ai-radius-lg); padding: 2rem; box-shadow: var(--ai-shadow-md);">
          <div style="font-family: var(--ai-font-mono); font-size: 0.8125rem; color: var(--ai-text-muted); margin-bottom: 1rem;">// Validation Output</div>
          <div style="font-family: var(--ai-font-mono); font-size: 0.8125rem; line-height: 1.6;">
            <div style="color: var(--ai-success);">✓ 0 hallucinated utility classes found</div>
            <div style="color: var(--ai-success);">✓ All buttons conform to 44px min tap target</div>
            <div style="color: var(--ai-success);">✓ Verified WCAG 2.1 AA color contrast</div>
            <div style="color: var(--ai-text-primary); margin-top: 0.5rem;">Status: Production Ready</div>
          </div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; align-items: center;">
        <div class="order-2 md:order-1">
          <div style="background: var(--ai-surface-0); border: 1px solid var(--ai-border); border-radius: var(--ai-radius-lg); padding: 2rem; box-shadow: var(--ai-shadow-md);">
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
              <span class="badge badge-sm">Obsidian</span>
              <span class="badge badge-sm">Executive</span>
              <span class="badge badge-sm">Fintech</span>
              <span class="badge badge-sm">Editorial</span>
            </div>
            <div style="font-family: var(--ai-font-mono); font-size: 0.8125rem; color: var(--ai-text-secondary); line-height: 1.6;">
              &lt;html data-theme="obsidian"&gt;<br>
              &nbsp;&nbsp;/* Instant theme flip via pure CSS variables */<br>
              &lt;/html&gt;
            </div>
          </div>
        </div>
        <div class="order-1 md:order-2">
          <h3 style="font-family: var(--ai-font-display); font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem;">
            Instant Multi-Theme Switching
          </h3>
          <p style="color: var(--ai-text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
            Switch effortlessly between dark engineering modes and executive boardroom styling. Themes are scoped cleanly in CSS tokens with zero JavaScript re-rendering.
          </p>
          <a href="#themes" class="btn btn-outline btn-sm">Explore Themes</a>
        </div>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-comparison-matrix',
    name: 'Feature Comparison Matrix',
    section: 'comparison',
    tier: 'free',
    tags: ['comparison', 'matrix', 'table', 'benchmarks', 'evaluation'],
    placement: 'Pre-Pricing Proof (Mid to Bottom of Page)',
    guidance: {
      placement: 'Place immediately prior to the pricing section to dismantle competitor objections before showing monetary costs.',
      bestUsedFor: 'Differentiating against incumbent technologies, heavy frameworks, or runtime JavaScript libraries.',
      avoidWhen: 'Simple consumer landing pages where feature parity is already obvious.',
      pairsWith: ['wireframe-features-bento', 'wireframe-pricing-tiers', 'wireframe-cta-card']
    },
    html: `<section id="comparison" class="section" style="padding: 5rem 0; background: var(--ai-surface-0); border-top: 1px solid var(--ai-border);" aria-labelledby="comparison-heading">
  <div class="container">
    <div style="text-align: center; max-width: 36rem; margin: 0 auto 3rem;">
      <h2 id="comparison-heading" class="section-title">
        How LLMCSS Compares
      </h2>
      <p style="color: var(--ai-text-secondary); font-size: 1rem; margin-top: 0.5rem;">
        A technical evaluation across bundle performance, agent reliability, and architectural cleanliness.
      </p>
    </div>
    <div class="matrix-container">
      <table class="matrix-table" aria-label="Feature Comparison Table">
        <thead>
          <tr>
            <th class="matrix-feature-col" style="width: 38%;">Architectural Criteria</th>
            <th style="width: 20%; color: var(--ai-primary); font-weight: 700;">LLMCSS</th>
            <th style="width: 21%; color: var(--ai-text-secondary);">Utility Frameworks</th>
            <th style="width: 21%; color: var(--ai-text-secondary);">Runtime JS Kits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="matrix-feature-col">Runtime JS Bundle Size</td>
            <td style="color: var(--ai-success); font-weight: 700;">0 kb (Zero JS)</td>
            <td>0 kb - 15 kb</td>
            <td>45 kb - 120 kb</td>
          </tr>
          <tr>
            <td class="matrix-feature-col">AI Prompt Hallucination Rate</td>
            <td style="color: var(--ai-success); font-weight: 700;">&lt; 0.1% Deterministic</td>
            <td>12% - 24% Flaky</td>
            <td>18% - 32% High</td>
          </tr>
          <tr>
            <td class="matrix-feature-col">Theme Switch Latency</td>
            <td style="color: var(--ai-success); font-weight: 700;">0 ms (CSS Vars)</td>
            <td>0 ms</td>
            <td>12 ms - 45 ms (Re-render)</td>
          </tr>
          <tr>
            <td class="matrix-feature-col">Cascade Isolation</td>
            <td style="color: var(--ai-success); font-weight: 700;">Native @layer</td>
            <td>Ad-hoc specificity</td>
            <td>CSS-in-JS injection</td>
          </tr>
          <tr>
            <td class="matrix-feature-col">Framework Lock-in</td>
            <td style="color: var(--ai-success); font-weight: 700;">None (100% Vanilla)</td>
            <td>Build-tool dependency</td>
            <td>React / Vue / Svelte locked</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-pricing-tiers',
    name: 'Three-Tier Pricing Grid',
    section: 'pricing',
    tier: 'free',
    tags: ['pricing', 'tiers', 'subscription', 'plans', 'conversion'],
    placement: 'Conversion Stage (Lower Funnel, above FAQ)',
    guidance: {
      placement: 'Position near the bottom of the page after features and comparison proof have been established.',
      bestUsedFor: 'SaaS monetization, developer licensing, and tiered service offerings with distinct feature boundaries.',
      avoidWhen: 'Completely free open-source projects with no commercial tiers or paid licenses.',
      pairsWith: ['wireframe-comparison-matrix', 'wireframe-faq-accordion', 'wireframe-cta-card']
    },
    html: `<section id="pricing" class="section" style="padding: 5rem 0;" aria-labelledby="pricing-heading">
  <div class="container">
    <div style="text-align: center; max-width: 36rem; margin: 0 auto 3.5rem;">
      <h2 id="pricing-heading" class="section-title">
        Simple, Predictable Plans
      </h2>
      <p style="color: var(--ai-text-secondary); font-size: 1rem; margin-top: 0.5rem;">
        Start building immediately with open-source primitives or upgrade for complete enterprise capabilities.
      </p>
    </div>
    <div class="pricing-grid">
      <div class="pricing-card">
        <div class="pricing-header">
          <div class="pricing-plan">Community</div>
          <p style="font-size: 0.8125rem; color: var(--ai-text-secondary); margin-top: 0.25rem;">Ideal for independent developers and experiments.</p>
          <div class="pricing-amount">
            <span class="pricing-price">$0</span>
            <span class="pricing-period">/ forever</span>
          </div>
        </div>
        <ul class="pricing-features">
          <li class="pricing-feature-item">&bull; 30+ Core Primitive Components</li>
          <li class="pricing-feature-item">&bull; Native Cascade Layer Engine</li>
          <li class="pricing-feature-item">&bull; Obsidian & Executive Themes</li>
          <li class="pricing-feature-item">&bull; CLI Component Scaffolding</li>
        </ul>
        <a href="#download" class="btn btn-outline" style="width: 100%;">Install Free</a>
      </div>
      <div class="pricing-card pricing-featured">
        <div class="pricing-ribbon">
          Recommended
        </div>
        <div class="pricing-header">
          <div class="pricing-plan">Pro Engineer</div>
          <p style="font-size: 0.8125rem; color: var(--ai-text-secondary); margin-top: 0.25rem;">For founders, startups, and high-velocity teams.</p>
          <div class="pricing-amount">
            <span class="pricing-price">$19</span>
            <span class="pricing-period">/ month</span>
          </div>
        </div>
        <ul class="pricing-features">
          <li class="pricing-feature-item">&bull; Everything in Community</li>
          <li class="pricing-feature-item">&bull; Every wireframe section template</li>
          <li class="pricing-feature-item">&bull; Stdio MCP Server Protocol Tools</li>
          <li class="pricing-feature-item">&bull; Commercial Production License</li>
          <li class="pricing-feature-item">&bull; Every design system skin</li>
        </ul>
        <a href="#checkout" class="btn btn-primary" style="width: 100%;">Get Pro Access</a>
      </div>
      <div class="pricing-card">
        <div class="pricing-header">
          <div class="pricing-plan">Enterprise</div>
          <p style="font-size: 0.8125rem; color: var(--ai-text-secondary); margin-top: 0.25rem;">Custom token architecture and security guarantees.</p>
          <div class="pricing-amount">
            <span class="pricing-price">$99</span>
            <span class="pricing-period">/ month</span>
          </div>
        </div>
        <ul class="pricing-features">
          <li class="pricing-feature-item">&bull; Everything in Pro</li>
          <li class="pricing-feature-item">&bull; Custom Brand Token Generation</li>
          <li class="pricing-feature-item">&bull; Unlimited Team Seats</li>
          <li class="pricing-feature-item">&bull; Priority Support & SLA</li>
        </ul>
        <a href="#contact" class="btn btn-outline" style="width: 100%;">Talk to Sales</a>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-faq-accordion',
    name: 'FAQ Accordion Matrix',
    section: 'faq',
    tier: 'free',
    tags: ['faq', 'accordion', 'questions', 'support', 'objections'],
    placement: 'Pre-Footer Validation (Directly below Pricing)',
    guidance: {
      placement: 'Directly below pricing to systematically resolve last-minute buyer hesitation and technical questions.',
      bestUsedFor: 'Answering common integration, licensing, browser support, and AI agent compatibility questions.',
      avoidWhen: 'Simple announcement pages where no complex questions exist.',
      pairsWith: ['wireframe-pricing-tiers', 'wireframe-cta-card', 'wireframe-footer-columns']
    },
    html: `<section id="faq" class="section" style="padding: 5rem 0; border-top: 1px solid var(--ai-border); background: var(--ai-surface-0);" aria-labelledby="faq-heading">
  <div class="container">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3.5rem; align-items: start;">
      <div>
        <h2 id="faq-heading" style="font-family: var(--ai-font-display); font-size: 2.25rem; font-weight: 700; line-height: 1.2; margin-bottom: 1rem;">
          Frequently Asked Questions
        </h2>
        <p style="color: var(--ai-text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
          Everything you need to know about LLMCSS architecture, AI model integration, and license terms.
        </p>
        <a href="mailto:support@llmcss.io" class="btn btn-outline btn-sm">Contact Architecture Team</a>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <details class="collapse py-4 border-b">
          <summary>
            <span>Why pure CSS instead of a JavaScript UI component library?</span>
          </summary>
          <p class="collapse-body text-sm">
            Pure CSS eliminates the JavaScript runtime bundle entirely. It means 0 ms hydration lag, perfect SEO crawlability, and total framework freedom: use it with React, Vue, Svelte, Rails, Django, or plain static HTML.
          </p>
        </details>
        <details class="collapse py-4 border-b">
          <summary>
            <span>How does LLMCSS prevent AI models from hallucinating classes?</span>
          </summary>
          <p class="collapse-body text-sm">
            By providing clean llms.txt specifications, standard semantic naming conventions, and an official Stdio MCP server. LLMs look up exact component contracts rather than guessing utility permutations.
          </p>
        </details>
        <details class="collapse py-4 border-b">
          <summary>
            <span>Can I customize the design tokens and typography?</span>
          </summary>
          <p class="collapse-body text-sm">
            Yes. Every color, border radius, spacing increment, and font stack is exposed through standard CSS custom properties in tokens.css and themes.css. Override them globally or per-container.
          </p>
        </details>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-cta-card',
    name: 'High-Contrast Conversion Anchor',
    section: 'cta',
    tier: 'free',
    tags: ['cta', 'conversion', 'anchor', 'pre-footer', 'newsletter'],
    placement: 'Pre-Footer Conversion Anchor (Directly above Footer)',
    guidance: {
      placement: 'Position directly before the global footer. Serves as the primary final call-to-action for the page.',
      bestUsedFor: 'Capturing leads, driving immediate app installs, or encouraging final signups.',
      avoidWhen: 'Pages that already conclude with a transactional checkout form.',
      pairsWith: ['wireframe-pricing-tiers', 'wireframe-faq-accordion', 'wireframe-footer-columns']
    },
    html: `<section class="section" style="padding: 5rem 0;" aria-labelledby="cta-heading">
  <div class="container">
    <div class="card" style="background: var(--ai-surface-1); border: 1px solid var(--ai-border); border-radius: var(--ai-radius-xl); padding: 4rem 2rem; text-align: center; box-shadow: var(--ai-shadow-lg);">
      <div style="max-width: 36rem; margin: 0 auto;">
        <h2 id="cta-heading" style="font-family: var(--ai-font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.15; margin-bottom: 1rem;">
          Start Assembling Your Next Interface
        </h2>
        <p style="font-size: 1.0625rem; color: var(--ai-text-secondary); line-height: 1.6; margin-bottom: 2rem;">
          No complex build configurations. No runtime JavaScript. Pure semantic CSS layout primitives ready for humans and AI agents.
        </p>
        <form class="flex gap-3 justify-center" style="max-width: 28rem; margin: 0 auto;" action="#" method="post">
          <input type="email" class="input" placeholder="Enter your email" aria-label="Work Email" required style="background: var(--ai-surface-0);">
          <button type="submit" class="btn btn-primary" style="white-space: nowrap;">Get Instant Access</button>
        </form>
        <p style="font-size: 0.75rem; color: var(--ai-text-muted); margin-top: 1rem;">
          No credit card required &bull; MIT Licensed core primitives &bull; 100% Native
        </p>
      </div>
    </div>
  </div>
</section>`
  },
  {
    id: 'wireframe-footer-columns',
    name: 'Architectural Sitemap Footer',
    section: 'footer',
    tier: 'free',
    tags: ['footer', 'sitemap', 'navigation', 'legal', 'columns'],
    placement: 'Bottom of Page (Terminal element)',
    guidance: {
      placement: 'Very bottom of the HTML document. Serves as the authoritative sitemap, legal repository, and status indicator.',
      bestUsedFor: 'Complete marketing websites, multi-page web applications, and documentation sites.',
      avoidWhen: 'Modal dialogs, embedded widget iframes, or focused single-action checkout funnels.',
      pairsWith: ['wireframe-cta-card']
    },
    html: `<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
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
          The native CSS layout and design system engineered for humans and autonomous AI coding agents.
        </p>
        <span class="footer-stat mt-4"><span class="status-pip status-pip-success" aria-hidden="true"></span> All systems operational</span>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false">Product <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content">
          <li><a href="#components">Components</a></li>
          <li><a href="#templates">Templates</a></li>
          <li><a href="#themes">Themes</a></li>
          <li><a href="#cli">CLI Tooling</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false">Resources <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content">
          <li><a href="#docs">Documentation</a></li>
          <li><a href="#llms-txt">llms.txt Specification</a></li>
          <li><a href="#mcp">MCP Server Protocol</a></li>
          <li><a href="#validation">Linter & Validator</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false">Company <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content">
          <li><a href="#about">About LLMCSS</a></li>
          <li><a href="#changelog">Changelog</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 LLMCSS (llmcss.io). All rights reserved.</p>
      <span class="footer-cmd">Pure Native CSS &bull; Zero JavaScript Runtime</span>
    </div>
  </div>
</footer>`
  },
  {
    id: 'wireframe-app-shell',
    name: 'Full Application Dashboard Shell',
    section: 'app-shell',
    tier: 'free',
    tags: ['app-shell', 'dashboard', 'sidebar', 'admin', 'saas-app'],
    placement: 'Application Viewport (Full Screen Root Layout)',
    guidance: {
      placement: 'Mounts as the root layout element for authenticated web applications. Replaces traditional marketing headers and footers.',
      bestUsedFor: 'SaaS product dashboards, internal admin panels, CRM systems, and developer consoles.',
      avoidWhen: 'Public marketing landing pages or SEO blogs.',
      pairsWith: []
    },
    html: `<div class="app-shell" style="min-height: 520px; border: 1px solid var(--ai-border); border-radius: var(--ai-radius-lg); overflow: hidden;">
  <aside class="sidebar" role="navigation" aria-label="Sidebar Navigation">
    <div class="sidebar-header">
      <a href="#" class="brand" style="font-size: 1.125rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M9 3v18"/>
        </svg>
        <span>LLMCSS App</span>
      </a>
    </div>
    <ul class="sidebar-nav">
      <li><a href="#dashboard" class="sidebar-item is-active">Overview</a></li>
      <li><a href="#analytics" class="sidebar-item">Analytics</a></li>
      <li><a href="#deployments" class="sidebar-item">Deployments</a></li>
      <li><a href="#components" class="sidebar-item">Components</a></li>
      <li><a href="#settings" class="sidebar-item">Settings</a></li>
    </ul>
  </aside>
  <main class="app-main" style="flex: 1; display: flex; flex-direction: column; background: var(--ai-surface-0);" role="main">
    <header class="topbar" style="height: 4rem; border-bottom: 1px solid var(--ai-border); padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between;">
      <div style="font-weight: 600; font-size: 0.9375rem;">Workspace Console</div>
      <div class="flex items-center gap-3">
        <input type="search" class="input" placeholder="Search resources..." style="height: 32px; font-size: 0.8125rem; width: 180px;" aria-label="Search Console">
        <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--ai-surface-2); border: 1px solid var(--ai-border); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">JD</div>
      </div>
    </header>
    <div class="app-content" style="padding: 1.5rem; flex: 1;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card" style="padding: 1rem;">
          <div style="font-size: 0.75rem; color: var(--ai-text-muted);">Active Requests</div>
          <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">142.8k</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div style="font-size: 0.75rem; color: var(--ai-text-muted);">Median Latency</div>
          <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">18 ms</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div style="font-size: 0.75rem; color: var(--ai-text-muted);">Error Rate</div>
          <div style="font-size: 1.5rem; font-weight: 700; margin-top: 0.25rem;">0.002%</div>
        </div>
      </div>
      <div class="card" style="padding: 1rem;">
        <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Recent Service Events</div>
        <div style="font-size: 0.8125rem; color: var(--ai-text-secondary); line-height: 1.6;">
          <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--ai-border-subtle);">
            <span>Worker cluster deployed &bull; revision #841</span>
            <span style="color: var(--ai-text-muted);">2m ago</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 0.5rem 0;">
            <span>Automated token optimization cycle completed</span>
            <span style="color: var(--ai-text-muted);">14m ago</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>`
  },
  {
    id: 'wireframe-quote-band',
    name: 'Pull Quote Band',
    section: 'social-proof',
    tier: 'free',
    tags: ['quote', 'testimonial', 'editorial', 'social-proof'],
    placement: 'After a feature grid or before a pricing block.',
    guidance: {
      placement: 'Full-width band. One quote, one attribution. Do not stack competing display faces.',
      bestUsedFor: 'Editorial landings, case studies, and manifesto pages.',
      avoidWhen: 'Dense dashboards or when you already have a logo wall in the same viewport.',
      pairsWith: ['wireframe-hero-editorial', 'wireframe-footer-columns']
    },
    html: `<section class="section" style="padding: 4rem 0;">
  <div class="container" style="max-width: 44rem;">
    <blockquote class="quote">
      <p>Ship the token layer once. Let agents copy CSS, not invent another type ramp.</p>
      <footer>LLMCSS &middot; Typesetting</footer>
    </blockquote>
  </div>
</section>`
  },
  {
    id: 'wireframe-changelog',
    name: 'Changelog Strip',
    section: 'features',
    tier: 'free',
    tags: ['changelog', 'timeline', 'docs', 'updates'],
    placement: 'Docs or product updates page, below the hero.',
    guidance: {
      placement: 'Single column, left-ruled events. Keep dates tabular.',
      bestUsedFor: 'Release notes, agent activity, and status history.',
      avoidWhen: 'Marketing feature grids that need icons and columns.',
      pairsWith: ['wireframe-nav-minimal', 'wireframe-footer-columns']
    },
    html: `<section class="section" style="padding: 4rem 0;">
  <div class="container" style="max-width: 40rem;">
    <h2 style="margin-bottom: 1.5rem;">Recent changes</h2>
    <ol class="timeline">
      <li class="timeline-item">
        <div class="timeline-title">Title font switcher</div>
        <div class="timeline-meta">16 faces &middot; themes no longer swap type</div>
      </li>
      <li class="timeline-item">
        <div class="timeline-title">Former Pro components are MIT</div>
        <div class="timeline-meta">Command palette, cart, agent chrome</div>
      </li>
      <li class="timeline-item">
        <div class="timeline-title">Pro is themed kits</div>
        <div class="timeline-meta">$9/mo Polar · token shown once</div>
      </li>
    </ol>
  </div>
</section>`
  },
  {
    id: 'wireframe-docs-header',
    name: 'Docs Header',
    section: 'header',
    tier: 'free',
    tags: ['docs', 'header', 'nav', 'search'],
    placement: 'Top of documentation and API reference pages.',
    guidance: {
      placement: 'Sticky header. Search is optional. Keep links to four or fewer.',
      bestUsedFor: 'Component docs, llms.txt companions, and agent manuals.',
      avoidWhen: 'Marketing homepages that already have a fat nav.',
      pairsWith: ['wireframe-changelog', 'wireframe-faq-accordion']
    },
    html: `<header class="navbar" role="banner">
  <div class="container navbar-inner">
    <a href="#" class="brand" aria-label="Docs home">
      <span>LLMCSS Docs</span>
    </a>
    <nav class="nav-links" aria-label="Docs">
      <a href="#primitives" class="nav-link">Primitives</a>
      <a href="#templates" class="nav-link">Templates</a>
      <a href="#tokens" class="nav-link">Tokens</a>
    </nav>
    <a href="#llms" class="btn btn-outline btn-sm">llms.txt</a>
  </div>
</header>`
  },
  {
    id: 'wireframe-dash-header',
    name: 'Dashboard Header',
    section: 'app-shell',
    tier: 'free',
    tags: ['dashboard', 'header', 'app-shell', 'page'],
    placement: 'Top of an authenticated app page, under the product top bar.',
    guidance: {
      placement: 'Below the app chrome. Title plus one primary action. Do not restamp four KPI tiles here.',
      bestUsedFor: 'Overview, reports, billing, and resource list pages.',
      avoidWhen: 'Marketing heroes or docs nav.',
      pairsWith: ['wireframe-app-shell']
    },
    html: `<div class="app-content">
  <div class="page-header">
    <div>
      <h1>Overview</h1>
      <p class="page-header-meta">Production workspace</p>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-outline btn-sm" type="button">Export</button>
      <button class="btn btn-primary btn-sm" type="button">New report</button>
    </div>
  </div>
</div>`
  }
];

export const pageBlueprints = [
  {
    id: 'saas-landing',
    name: 'High-Conversion SaaS Landing Page',
    description: 'Battle-tested 8-stage conversion funnel: Header, Split Hero with interactive preview dock, Social Proof metric rail, Bento Grid feature highlights, 3-Tier Pricing, Native FAQ accordion, Conversion Anchor CTA, and 4-Column Footer.',
    recommendedFor: 'B2B SaaS products, developer platforms, and cloud services needing immediate clarity, proof, and high signup conversion.',
    sections: [
      'wireframe-nav-minimal',
      'wireframe-hero-split',
      'wireframe-social-proof-bar',
      'wireframe-features-bento',
      'wireframe-pricing-tiers',
      'wireframe-faq-accordion',
      'wireframe-cta-card',
      'wireframe-footer-columns'
    ]
  },
  {
    id: 'developer-tool',
    name: 'Developer Tool & CLI Launchpad',
    description: 'Technical marketing layout: Announcement Banner Nav, Centered Terminal Hero, Metric Telemetry Rail, Alternating Deep-Dive Features, Enterprise Comparison Matrix, High-Contrast Pre-Footer CTA, and Architectural Footer.',
    recommendedFor: 'Open-source frameworks, CLI tools, infrastructure APIs, and developer-first developer tooling.',
    sections: [
      'wireframe-nav-banner',
      'wireframe-hero-centered',
      'wireframe-social-proof-bar',
      'wireframe-features-alternating',
      'wireframe-comparison-matrix',
      'wireframe-cta-card',
      'wireframe-footer-columns'
    ]
  },
  {
    id: 'editorial-manifesto',
    name: 'Editorial Brand & Design Manifesto',
    description: 'High-craft narrative layout: Minimal Brand Nav, Expressive Editorial Hero, Asymmetric Bento Grid, FAQ Accordion, Minimal Conversion Anchor, and Architectural Footer.',
    recommendedFor: 'Design agencies, boutique studios, AI research labs, and opinionated high-craft software products.',
    sections: [
      'wireframe-nav-minimal',
      'wireframe-hero-editorial',
      'wireframe-social-proof-bar',
      'wireframe-features-bento',
      'wireframe-faq-accordion',
      'wireframe-cta-card',
      'wireframe-footer-columns'
    ]
  },
  {
    id: 'dashboard-shell',
    name: 'Full Application Dashboard Shell',
    description: 'Complete web application scaffold: Responsive Collapsible Sidebar, Header with Search and Profile, Key Metric Stat Row, and Tabular Data Canvas.',
    recommendedFor: 'Internal tools, SaaS app dashboards, analytics consoles, and workflow admin panels.',
    sections: [
      'wireframe-app-shell'
    ]
  }
];

wireframeTemplates.push(...themedSectionTemplates);
pageBlueprints.push(...themedPageKits);

export function assembleBlueprintHtml(blueprintId) {
  const bp = pageBlueprints.find((b) => b.id === blueprintId);
  if (!bp) return null;
  return bp.sections
    .map((secId) => {
      const template = wireframeTemplates.find((t) => t.id === secId);
      if (!template) return `<!-- Section ${secId} not found -->`;
      return `<!-- Section: ${template.name} (${template.id}) -->\n${template.html}`;
    })
    .join('\n\n');
}
