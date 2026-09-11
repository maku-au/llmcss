function lockedPreview(name) {
  return `<div class="ai-card ai-card-pro" style="padding: var(--ai-space-8); text-align: center; max-width: 28rem; margin: 0 auto;">
  <span class="tag-pro-pill">PRO</span>
  <h3 class="ai-card-title" style="margin-top: var(--ai-space-3);">${name}</h3>
  <p class="ai-text-sm ai-text-secondary" style="margin-top: var(--ai-space-2);">Source is not in the public catalog. Subscribe to copy this component.</p>
  <a class="ai-btn ai-btn-primary ai-btn-sm" style="margin-top: var(--ai-space-4);" href="/api/checkout.php">Unlock Pro ($9/mo)</a>
</div>`;
}

export const components = [
  /* ==========================================================================
     PRIMITIVES - BUTTONS & CONTROLS
     ========================================================================== */
  {
    id: 'btn-variants',
    name: 'Button Variants',
    description: 'High-craft buttons across solid primary, secondary, outline, ghost, and accent variants.',
    category: 'primitive',
    tier: 'free',
    tags: ['button', 'action', 'cta', 'input'],
    html: `<div class="ai-flex ai-flex-wrap ai-gap-3 ai-items-center">
  <button class="ai-btn ai-btn-primary">Primary Action</button>
  <button class="ai-btn ai-btn-secondary">Secondary</button>
  <button class="ai-btn ai-btn-outline">Outline</button>
  <button class="ai-btn ai-btn-ghost">Ghost</button>
  <button class="ai-btn ai-btn-accent">Accent Blue</button>
  <button class="ai-btn ai-btn-danger">Destructive</button>
  <button class="ai-btn ai-btn-primary is-loading">Loading</button>
</div>`,
  },
  {
    id: 'btn-sizes',
    name: 'Button Sizes & Icons',
    description: 'Modular button sizing scale from extra-small (xs) to extra-large (xl) plus icon buttons.',
    category: 'primitive',
    tier: 'free',
    tags: ['button', 'size', 'icon'],
    html: `<div class="ai-flex ai-flex-wrap ai-gap-3 ai-items-center">
  <button class="ai-btn ai-btn-primary ai-btn-xs">Extra Small</button>
  <button class="ai-btn ai-btn-primary ai-btn-sm">Small</button>
  <button class="ai-btn ai-btn-primary">Standard</button>
  <button class="ai-btn ai-btn-primary ai-btn-lg">Large</button>
  <button class="ai-btn ai-btn-outline ai-btn-icon" aria-label="Settings">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
  </button>
</div>`,
  },
  {
    id: 'input-text',
    name: 'Form Inputs & Groups',
    description: 'Clean form fields with label hierarchy, subtle focus states, and helper messaging.',
    category: 'primitive',
    tier: 'free',
    tags: ['form', 'input', 'field'],
    html: `<div class="ai-grid ai-gap-4" style="max-width: 24rem;">
  <div class="ai-form-group">
    <label class="ai-form-label" for="user-email">Email Address</label>
    <input type="email" id="user-email" class="ai-input" placeholder="name@company.com" />
    <span class="ai-form-hint">We'll send your workspace invite here.</span>
  </div>
  <div class="ai-form-group">
    <label class="ai-form-label" for="user-bio">Description</label>
    <textarea id="user-bio" class="ai-textarea" placeholder="Tell us about your project..."></textarea>
  </div>
</div>`,
  },
  {
    id: 'input-addon',
    name: 'Input Addons & Domain Prefix',
    description: 'Segmented input groups with prefix labels and integrated action buttons.',
    category: 'primitive',
    tier: 'free',
    tags: ['input', 'addon', 'domain'],
    html: `<div class="ai-form-group" style="max-width: 28rem;">
  <label class="ai-form-label">Project URL</label>
  <div class="ai-input-group">
    <span class="ai-input-addon">https://</span>
    <input type="text" class="ai-input" placeholder="my-app" />
    <span class="ai-input-addon">.llmcss.io</span>
  </div>
</div>`,
  },
  {
    id: 'switch-toggle',
    name: 'Tactile Switch & Checkbox',
    description: 'Accessible toggle switches and checkboxes with physical spring transitions.',
    category: 'primitive',
    tier: 'free',
    tags: ['switch', 'toggle', 'checkbox'],
    html: `<div class="ai-flex ai-flex-col ai-gap-4">
  <label class="ai-switch">
    <input type="checkbox" class="ai-switch-input" checked />
    <span class="ai-switch-track"><span class="ai-switch-thumb"></span></span>
    <span class="ai-text-sm ai-font-medium">Automatic Backups</span>
  </label>
  <label class="ai-checkbox">
    <input type="checkbox" class="ai-checkbox-input" checked />
    <span>Notify me when teammates comment</span>
  </label>
</div>`,
  },
  {
    id: 'card-standard',
    name: 'Standard Card Container',
    description: 'Structured card layout with header, body content, and action footer.',
    category: 'primitive',
    tier: 'free',
    tags: ['card', 'surface', 'container'],
    html: `<div class="ai-card" style="max-width: 24rem;">
  <div class="ai-card-header">
    <h3 class="ai-card-title">Project Deployment</h3>
    <p class="ai-card-description">Production deployment configured for edge nodes.</p>
  </div>
  <div class="ai-card-body">
    <p class="ai-text-sm">Last deployed 14 minutes ago via commit <code>8f42d19</code> to <strong>production-syd</strong>.</p>
  </div>
  <div class="ai-card-footer">
    <span class="ai-badge ai-badge-success ai-badge-dot">Online</span>
    <button class="ai-btn ai-btn-outline ai-btn-xs">View Logs</button>
  </div>
</div>`,
  },
  {
    id: 'badge-status',
    name: 'Status & Craft Badges',
    description: 'Precision architectural badges, high-contrast inverted tags, and jewel hardware status pips without cartoonish pastel washes.',
    category: 'primitive',
    tier: 'free',
    tags: ['badge', 'pill', 'status', 'tag'],
    html: `<div class="ai-flex ai-flex-wrap ai-gap-2 ai-items-center">
  <span class="ai-badge ai-badge-solid">RECOMMENDED</span>
  <span class="ai-badge ai-badge-default">Default</span>
  <span class="ai-badge ai-badge-pro">PRO ACCESS</span>
  <span class="ai-badge ai-badge-success ai-badge-dot">Operational</span>
  <span class="ai-badge ai-badge-warning ai-badge-dot">Degraded</span>
  <span class="ai-badge ai-badge-danger ai-badge-dot">Offline</span>
  <span class="ai-badge ai-badge-outline">Outline Tag</span>
  <span class="ai-badge ai-badge-mono">128 tok/s</span>
</div>`,
  },
  {
    id: 'avatar-group',
    name: 'Avatars & Avatar Group',
    description: 'User avatar icons, initials, and overlapping team member piles.',
    category: 'primitive',
    tier: 'free',
    tags: ['avatar', 'user', 'team'],
    html: `<div class="ai-flex ai-items-center ai-gap-6">
  <div class="ai-avatar-group">
    <div class="ai-avatar ai-avatar-sm" style="background-color: var(--ai-surface-3);">+4</div>
    <div class="ai-avatar ai-avatar-sm" style="background-color: #3b82f6; color: white;">JD</div>
    <div class="ai-avatar ai-avatar-sm" style="background-color: #10b981; color: white;">SK</div>
    <div class="ai-avatar ai-avatar-sm" style="background-color: #f59e0b; color: white;">AL</div>
  </div>
  <div class="ai-avatar">
    <span class="ai-font-bold">EA</span>
  </div>
</div>`,
  },
  {
    id: 'modal-dialog',
    name: 'Modal Dialog Box',
    description: 'Accessible modal dialog with frosted backdrop, header, body, and action buttons.',
    category: 'primitive',
    tier: 'free',
    tags: ['modal', 'dialog', 'overlay', 'popup'],
    html: `<button class="ai-btn ai-btn-primary" data-ai-toggle="modal" data-ai-target="#demo-modal">
  Open Modal Dialog
</button>

<div id="demo-modal" class="ai-modal">
  <div class="ai-modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="ai-modal-box">
    <div class="ai-modal-header">
      <h3 class="ai-modal-title">Confirm Database Reset</h3>
      <button class="ai-modal-close" data-ai-dismiss="modal">&times;</button>
    </div>
    <div class="ai-modal-body">
      <p>Are you sure you want to reset the staging database? All mock records and schema migrations will revert to initial seed.</p>
    </div>
    <div class="ai-modal-footer">
      <button class="ai-btn ai-btn-outline" data-ai-dismiss="modal">Cancel</button>
      <button class="ai-btn ai-btn-danger" data-ai-dismiss="modal">Reset Database</button>
    </div>
  </div>
</div>`,
    webComponentHtml: `<ai-modal id="demo-modal">
  <div class="ai-modal-backdrop"></div>
  <div class="ai-modal-box">
    <div class="ai-modal-header">
      <h3 class="ai-modal-title">Web Component Dialog</h3>
      <button class="ai-modal-close" data-ai-dismiss="modal">&times;</button>
    </div>
    <div class="ai-modal-body">
      <p>Rendered natively via &lt;ai-modal&gt; custom element with Light DOM styling.</p>
    </div>
    <div class="ai-modal-footer">
      <button class="ai-btn ai-btn-primary" data-ai-dismiss="modal">Got it</button>
    </div>
  </div>
</ai-modal>`,
  },
  {
    id: 'tabs-system',
    name: 'Interactive Tabs',
    description: 'Underline and segmented pill tab bars with keyboard and click delegation.',
    category: 'primitive',
    tier: 'free',
    tags: ['tabs', 'navigation', 'panel'],
    html: `<div class="ai-tabs">
  <div class="ai-tabs-list">
    <button class="ai-tab is-active" data-ai-tab="#tab-overview">Overview</button>
    <button class="ai-tab" data-ai-tab="#tab-analytics">Analytics</button>
    <button class="ai-tab" data-ai-tab="#tab-settings">Settings</button>
  </div>
  <div id="tab-overview" class="ai-tab-panel is-active">
    <p class="ai-text-secondary">Overview tab content displaying system health and recent build outputs.</p>
  </div>
  <div id="tab-analytics" class="ai-tab-panel">
    <p class="ai-text-secondary">Analytics tab content displaying traffic and user engagement charts.</p>
  </div>
  <div id="tab-settings" class="ai-tab-panel">
    <p class="ai-text-secondary">Workspace preferences and security configurations.</p>
  </div>
</div>`,
    webComponentHtml: `<ai-tabs>
  <div class="ai-tabs-list">
    <button class="ai-tab is-active" data-ai-tab="#tab-1">Account</button>
    <button class="ai-tab" data-ai-tab="#tab-2">Security</button>
  </div>
  <div id="tab-1" class="ai-tab-panel is-active"><p>Manage your account settings.</p></div>
  <div id="tab-2" class="ai-tab-panel"><p>Configure 2FA and sessions.</p></div>
</ai-tabs>`,
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Action Menu',
    description: 'Contextual popup dropdown with item icons, dividers, and click-outside dismissal.',
    category: 'primitive',
    tier: 'free',
    tags: ['dropdown', 'menu', 'actions'],
    html: `<div style="min-height: 14rem; padding-bottom: 11rem; display: flex; justify-content: center; align-items: flex-start; padding-top: var(--ai-space-2);">
  <div class="ai-dropdown">
    <button class="ai-btn ai-btn-outline" data-ai-toggle="dropdown">
      Options
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <ul class="ai-dropdown-menu">
      <li class="ai-dropdown-header">Workspace</li>
      <li><button class="ai-dropdown-item">View Team</button></li>
      <li><button class="ai-dropdown-item">Billing & Plans</button></li>
      <li class="ai-dropdown-divider"></li>
      <li><button class="ai-dropdown-item is-danger">Sign Out</button></li>
    </ul>
  </div>
</div>`,
  },
  {
    id: 'accordion-faq',
    name: 'Collapsible Accordion',
    description: 'Smooth expanding accordion items with animated chevron rotation.',
    category: 'primitive',
    tier: 'free',
    tags: ['accordion', 'collapse', 'faq'],
    html: `<div class="ai-accordion">
  <div class="ai-accordion-item is-open" open>
    <button class="ai-accordion-trigger" data-ai-toggle="accordion">
      How does LLMCSS eliminate the 'AI look'?
      <span class="ai-accordion-chevron">▼</span>
    </button>
    <div class="ai-accordion-content">
      LLMCSS uses high-craft typography pairings, subtle physical borders, calibrated surfaces, and asymmetric bento layouts rather than cookie-cutter purple gradients and over-rounded cards.
    </div>
  </div>
  <div class="ai-accordion-item">
    <button class="ai-accordion-trigger" data-ai-toggle="accordion">
      Can I use this without a build tool or Vite?
      <span class="ai-accordion-chevron">▼</span>
    </button>
    <div class="ai-accordion-content">
      Yes! LLMCSS is written in 100% pure modern native CSS with CSS layers and variables. You can load it via a single &lt;link&gt; tag.
    </div>
  </div>
</div>`,
  },
  {
    id: 'table-data',
    name: 'Data Table with Striping',
    description: 'Clean responsive data table with sticky headers, hover highlights, and badges.',
    category: 'primitive',
    tier: 'free',
    tags: ['table', 'data', 'grid', 'list'],
    html: `<div class="ai-table-container">
  <table class="ai-table ai-table-hover">
    <thead>
      <tr>
        <th>Repository</th>
        <th>Environment</th>
        <th>Branch</th>
        <th>Status</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="ai-font-semibold">llmcss-core</td>
        <td>Production</td>
        <td><code>main</code></td>
        <td><span class="ai-badge ai-badge-success ai-badge-dot">Active</span></td>
        <td>2m ago</td>
      </tr>
      <tr>
        <td class="ai-font-semibold">llmcss-docs</td>
        <td>Staging</td>
        <td><code>preview/v1</code></td>
        <td><span class="ai-badge ai-badge-accent ai-badge-dot">Building</span></td>
        <td>15m ago</td>
      </tr>
      <tr>
        <td class="ai-font-semibold">llmcss-mcp</td>
        <td>Edge</td>
        <td><code>feat/tools</code></td>
        <td><span class="ai-badge ai-badge-warning ai-badge-dot">Queued</span></td>
        <td>1h ago</td>
      </tr>
    </tbody>
  </table>
</div>`,
  },
  {
    id: 'alert-callouts',
    name: 'Contextual Alert Banners',
    description: 'Informative alert cards for success, warning, danger, and informational messages.',
    category: 'primitive',
    tier: 'free',
    tags: ['alert', 'notice', 'banner'],
    html: `<div class="ai-flex ai-flex-col ai-gap-3">
  <div class="ai-alert ai-alert-info">
    <svg class="ai-alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    <div>
      <strong class="ai-font-semibold">Maintenance scheduled:</strong> Edge servers will undergo routine maintenance at 02:00 UTC.
    </div>
  </div>
  <div class="ai-alert ai-alert-success">
    <svg class="ai-alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="22 4 12 14.01 9 11.01"/></svg>
    <div>
      <strong class="ai-font-semibold">Success:</strong> Your new API license key has been verified and applied to your workspace.
    </div>
  </div>
</div>`,
  },

  /* ==========================================================================
     MARKETING SECTIONS & WEBSITE LAYOUTS
     ========================================================================== */
  {
    id: 'navbar-modern',
    name: 'Responsive Navigation Header',
    description: 'Modern glassmorphism navigation header with desktop links, CTA, and slide-out mobile drawer.',
    category: 'marketing',
    tier: 'free',
    tags: ['navbar', 'header', 'navigation', 'responsive', 'mobile'],
    html: `<header class="ai-navbar">
  <div class="ai-container">
    <div class="ai-navbar-inner">
      <a href="#" class="ai-brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <span>LLMCSS</span>
      </a>
      <nav class="ai-nav-links">
        <a href="#components" class="ai-nav-link">Components</a>
        <a href="#templates" class="ai-nav-link">Templates</a>
        <a href="#pricing" class="ai-nav-link">Pricing</a>
        <a href="#docs" class="ai-nav-link">Documentation</a>
      </nav>
      <div class="ai-flex ai-items-center ai-gap-2">
        <a href="#login" class="ai-btn ai-btn-ghost ai-btn-xs ai-sm:inline-flex ai-hidden">Log in</a>
        <a href="#start" class="ai-btn ai-btn-primary ai-btn-xs">Get Started</a>
        <button class="ai-btn ai-btn-outline ai-btn-xs ai-md:hidden" data-ai-toggle="drawer" data-ai-target="#mobile-nav-drawer" aria-label="Toggle Menu">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile Navigation Drawer -->
<div id="mobile-nav-drawer" class="ai-drawer ai-drawer-left">
  <div class="ai-drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="ai-drawer-panel" style="max-width: 18rem;">
    <div class="ai-drawer-header">
      <a href="#" class="ai-brand" style="font-size: 1rem;">
        <span>LLMCSS</span>
      </a>
      <button class="ai-modal-close" data-ai-dismiss="drawer">&times;</button>
    </div>
    <div class="ai-drawer-body">
      <nav class="ai-flex ai-flex-col ai-gap-2">
        <a href="#components" class="ai-sidebar-item">Components</a>
        <a href="#templates" class="ai-sidebar-item">Templates</a>
        <a href="#pricing" class="ai-sidebar-item">Pricing</a>
        <a href="#docs" class="ai-sidebar-item">Documentation</a>
      </nav>
    </div>
    <div class="ai-drawer-footer">
      <button class="ai-btn ai-btn-primary ai-w-full ai-btn-sm" data-ai-dismiss="drawer">Sign In</button>
    </div>
  </div>
</div>`,
  },
  {
    id: 'hero-split',
    name: 'Split Screen Marketing Hero',
    description: 'High-converting hero section with badge, strong typographic lead, CTA buttons, and UI preview.',
    category: 'marketing',
    tier: 'free',
    tags: ['hero', 'landing', 'headline'],
    html: `<section class="ai-hero">
  <div class="ai-container">
    <div class="ai-hero-split">
      <div>
        <h1 class="ai-hero-title">
          Build software that looks human, not generated.
        </h1>
        <p class="ai-hero-lead">
          The open UI library built for AI agents and design engineers. Pure native CSS, tokenized skinning, and zero cookie-cutter templates.
        </p>
        <div class="ai-hero-actions">
          <button class="ai-btn ai-btn-primary ai-btn-lg">Browse 100+ Components</button>
          <button class="ai-btn ai-btn-outline ai-btn-lg">Documentation</button>
        </div>
      </div>
      <div class="ai-hero-visual">
        <div style="background-color: var(--ai-surface-0); padding: var(--ai-space-8); border-radius: inherit;">
          <div class="ai-flex ai-justify-between ai-items-center" style="margin-bottom: var(--ai-space-6);">
            <span class="ai-text-xs ai-font-mono ai-text-muted">app.analytics.ts</span>
            <span class="ai-badge ai-badge-success ai-badge-dot">Live Stream</span>
          </div>
          <div class="ai-grid ai-grid-cols-2 ai-gap-4">
            <div class="ai-kpi-card" style="padding: var(--ai-space-4);">
              <span class="ai-kpi-label">Weekly Active Users</span>
              <span class="ai-kpi-value" style="font-size: 1.5rem;">48,290</span>
              <span class="ai-kpi-trend is-up">↑ +24.8%</span>
            </div>
            <div class="ai-kpi-card" style="padding: var(--ai-space-4);">
              <span class="ai-kpi-label">Conversion Rate</span>
              <span class="ai-kpi-value" style="font-size: 1.5rem;">4.12%</span>
              <span class="ai-kpi-trend is-up">↑ +1.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  },
  {
    id: 'hero-bento-pro',
    name: 'Asymmetric Bento Hero (PRO)',
    description: 'Flagship bento grid hero with tactile borders, live interactive code previews, and luxury surface physics.',
    category: 'marketing',
    tier: 'pro',
    tags: ['hero', 'bento', 'pro', 'luxury'],
    html: lockedPreview('Asymmetric Bento Hero'),
  },
  {
    id: 'pricing-tier-cards',
    name: '3-Tier Pricing Table',
    description: 'Clear pricing tiers with popular plan highlight, feature lists, and monthly/annual toggles.',
    category: 'marketing',
    tier: 'free',
    tags: ['pricing', 'plans', 'conversion'],
    html: `<section style="padding: var(--ai-space-16) 0;">
  <div class="ai-container">
    <div class="ai-text-center" style="max-width: 36rem; margin: 0 auto;">
      <h2 style="font-size: 2.25rem;">Predictable, Transparent Pricing</h2>
      <p style="margin-top: var(--ai-space-2);">Start building for free. Upgrade to Pro when you need advanced marketing and SaaS templates.</p>
    </div>
    <div class="ai-pricing-grid">
      <!-- Free Plan -->
      <div class="ai-pricing-card">
        <div class="ai-pricing-header">
          <h3 class="ai-pricing-plan">Starter (Free)</h3>
          <p class="ai-text-sm ai-text-secondary">For individual developers and open source projects.</p>
          <div class="ai-pricing-amount">
            <span class="ai-pricing-price">$0</span>
            <span class="ai-pricing-period">/ month</span>
          </div>
        </div>
        <ul class="ai-pricing-features">
          <li class="ai-pricing-feature-item">✓ 40+ Core UI Primitives</li>
          <li class="ai-pricing-feature-item">✓ Pure Modern CSS Token Engine</li>
          <li class="ai-pricing-feature-item">✓ Light-DOM Custom Elements</li>
          <li class="ai-pricing-feature-item">✓ Public llms.txt & Docs</li>
        </ul>
        <button class="ai-btn ai-btn-outline ai-w-full">Get Started Free</button>
      </div>

      <!-- Pro Plan (Featured) -->
      <div class="ai-pricing-card ai-pricing-featured ai-card-pro">
        <div class="ai-pricing-header">
          <div class="ai-flex ai-justify-between ai-items-center">
            <h3 class="ai-pricing-plan">LLMCSS Pro</h3>
            <span class="ai-badge ai-badge-solid">POPULAR</span>
          </div>
          <p class="ai-text-sm ai-text-secondary">For agencies, AI builders, and fast-moving teams.</p>
          <div class="ai-pricing-amount">
            <span class="ai-pricing-price">$9</span>
            <span class="ai-pricing-period">/ month</span>
          </div>
        </div>
        <ul class="ai-pricing-features">
          <li class="ai-pricing-feature-item">✓ Everything in Starter</li>
          <li class="ai-pricing-feature-item">✓ 150+ Pro Marketing & Bento Sections</li>
          <li class="ai-pricing-feature-item">✓ Complete SaaS & App Layout Templates</li>
          <li class="ai-pricing-feature-item">✓ Dedicated MCP Server Integration</li>
          <li class="ai-pricing-feature-item">✓ Private CLI Token Access</li>
        </ul>
        <button class="ai-btn ai-btn-primary ai-w-full">Upgrade to Pro</button>
      </div>

      <!-- Enterprise Plan -->
      <div class="ai-pricing-card">
        <div class="ai-pricing-header">
          <h3 class="ai-pricing-plan">Team / Enterprise</h3>
          <p class="ai-text-sm ai-text-secondary">For high-scale organizations building agent fleets.</p>
          <div class="ai-pricing-amount">
            <span class="ai-pricing-price">Custom</span>
          </div>
        </div>
        <ul class="ai-pricing-features">
          <li class="ai-pricing-feature-item">✓ Unlimited Team Seats</li>
          <li class="ai-pricing-feature-item">✓ Custom Theme Archetype Design</li>
          <li class="ai-pricing-feature-item">✓ Dedicated SLA & Support</li>
          <li class="ai-pricing-feature-item">✓ Figma Tokens Sync</li>
        </ul>
        <button class="ai-btn ai-btn-outline ai-w-full">Contact Sales</button>
      </div>
    </div>
  </div>
</section>`,
  },
  {
    id: 'footer-multi-col',
    name: 'Multi-Column Modern Footer',
    description: 'Comprehensive footer with brand statement, navigation columns, and copyright.',
    category: 'marketing',
    tier: 'free',
    tags: ['footer', 'navigation', 'legal'],
    html: `<footer class="ai-footer">
  <div class="ai-container">
    <div class="ai-footer-grid">
      <div>
        <a href="#" class="ai-brand" style="margin-bottom: var(--ai-space-4);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          <span>LLMCSS</span>
        </a>
        <p class="ai-text-sm" style="max-width: 20rem;">
          High-craft UI library engineered for human developers and autonomous AI agents.
        </p>
      </div>
      <div>
        <h4 class="ai-text-xs ai-font-sans ai-font-semibold ai-text-muted" style="text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--ai-space-4);">Product</h4>
        <ul class="ai-footer-list">
          <li><a href="#" class="ai-text-secondary">Components</a></li>
          <li><a href="#" class="ai-text-secondary">Marketing Sections</a></li>
          <li><a href="#" class="ai-text-secondary">SaaS Dashboard</a></li>
          <li><a href="#" class="ai-text-secondary">Themes</a></li>
        </ul>
      </div>
      <div>
        <h4 class="ai-text-xs ai-font-sans ai-font-semibold ai-text-muted" style="text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--ai-space-4);">Agentic Tools</h4>
        <ul class="ai-footer-list">
          <li><a href="#" class="ai-text-secondary">MCP Server</a></li>
          <li><a href="#" class="ai-text-secondary">CLI Reference</a></li>
          <li><a href="#" class="ai-text-secondary">llms.txt Specification</a></li>
          <li><a href="#" class="ai-text-secondary">Agent Rules</a></li>
        </ul>
      </div>
      <div>
        <h4 class="ai-text-xs ai-font-sans ai-font-semibold ai-text-muted" style="text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--ai-space-4);">Company</h4>
        <ul class="ai-footer-list">
          <li><a href="#" class="ai-text-secondary">About</a></li>
          <li><a href="#" class="ai-text-secondary">Pricing</a></li>
          <li><a href="#" class="ai-text-secondary">Privacy</a></li>
          <li><a href="#" class="ai-text-secondary">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="ai-flex ai-justify-between ai-items-center ai-border-t" style="padding-top: var(--ai-space-6);">
      <p class="ai-text-xs ai-text-muted">© 2026 LLMCSS Inc. All rights reserved.</p>
      <div class="ai-flex ai-gap-4">
        <a href="#" class="ai-text-xs ai-text-muted">GitHub</a>
        <a href="#" class="ai-text-xs ai-text-muted">Discord</a>
        <a href="#" class="ai-text-xs ai-text-muted">X (Twitter)</a>
      </div>
    </div>
  </div>
</footer>`,
  },

  /* ==========================================================================
     APPLICATION & SAAS DASHBOARD UI
     ========================================================================== */
  {
    id: 'kpi-metric-cards',
    name: 'SaaS Metric & KPI Summary',
    description: '4-card dashboard metric summary with percentage change trends and clean numbers.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'kpi', 'metrics', 'stats'],
    html: `<div class="ai-grid ai-grid-cols-1 ai-md:grid-cols-2 ai-lg:grid-cols-4 ai-gap-4">
  <div class="ai-kpi-card">
    <span class="ai-kpi-label">Monthly Recurring Revenue</span>
    <span class="ai-kpi-value">$124,500</span>
    <span class="ai-kpi-trend is-up">↑ +14.2% from last month</span>
  </div>
  <div class="ai-kpi-card">
    <span class="ai-kpi-label">Active Subscriptions</span>
    <span class="ai-kpi-value">1,482</span>
    <span class="ai-kpi-trend is-up">↑ +8.4%</span>
  </div>
  <div class="ai-kpi-card">
    <span class="ai-kpi-label">Churn Rate</span>
    <span class="ai-kpi-value">1.18%</span>
    <span class="ai-kpi-trend is-down">↓ -0.3% improvement</span>
  </div>
  <div class="ai-kpi-card">
    <span class="ai-kpi-label">Agent Queries / Day</span>
    <span class="ai-kpi-value">4.8M</span>
    <span class="ai-kpi-trend is-up">↑ +42% spike</span>
  </div>
</div>`,
  },
  {
    id: 'command-palette-pro',
    name: 'Command Palette ⌘K (PRO)',
    description: 'Keyboard-driven search & quick command dialog with group headers, shortcut badges, and live filter.',
    category: 'application',
    tier: 'pro',
    tags: ['command', 'search', 'palette', 'pro', 'keyboard'],
    html: lockedPreview('Command Palette'),
  },
  {
    id: 'auth-login-card',
    name: 'Authentication Login Card',
    description: 'Focused login card with social provider buttons, email/password form, and forgot password link.',
    category: 'application',
    tier: 'free',
    tags: ['auth', 'login', 'signup', 'form'],
    html: `<div class="ai-auth-card" style="margin: 0 auto;">
  <div class="ai-text-center" style="margin-bottom: var(--ai-space-6);">
    <h3 class="ai-card-title" style="font-size: 1.5rem;">Welcome back</h3>
    <p class="ai-text-sm ai-text-secondary" style="margin-top: 0.25rem;">Enter your credentials to access your agent workspace.</p>
  </div>
  <form class="ai-flex ai-flex-col ai-gap-4">
    <div class="ai-form-group" style="margin-bottom: 0;">
      <label class="ai-form-label" for="auth-email">Email</label>
      <input type="email" id="auth-email" class="ai-input" placeholder="you@domain.com" required />
    </div>
    <div class="ai-form-group" style="margin-bottom: 0;">
      <div class="ai-flex ai-justify-between ai-items-center">
        <label class="ai-form-label" for="auth-pass">Password</label>
        <a href="#forgot" class="ai-text-xs ai-text-accent">Forgot password?</a>
      </div>
      <input type="password" id="auth-pass" class="ai-input" placeholder="••••••••" required />
    </div>
    <button type="submit" class="ai-btn ai-btn-primary ai-w-full" style="margin-top: var(--ai-space-2);">Sign In</button>
  </form>
  <div class="ai-text-center" style="margin-top: var(--ai-space-6); border-top: 1px solid var(--ai-border); padding-top: var(--ai-space-4);">
    <p class="ai-text-xs ai-text-secondary">Don't have an account? <a href="#signup" class="ai-text-accent ai-font-semibold">Sign up</a></p>
  </div>
</div>`,
  },

  /* ==========================================================================
     E-COMMERCE UI
     ========================================================================== */
  {
    id: 'product-card',
    name: 'Modern E-Commerce Product Card',
    description: 'Clean product card with hover zoom, discount pill badge, title, price, and Quick Add action.',
    category: 'ecommerce',
    tier: 'free',
    tags: ['ecommerce', 'product', 'shop', 'card'],
    html: `<div class="ai-product-card" style="max-width: 20rem;">
  <div class="ai-product-media">
    <span class="ai-badge ai-badge-solid ai-product-badge-float">NEW ARRIVAL</span>
    <img class="ai-product-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" />
  </div>
  <div class="ai-product-body">
    <h4 class="ai-product-title">Aether Precision Wireless Studio Headphones</h4>
    <span class="ai-product-category">Audio & Acoustics</span>
    <div class="ai-product-price-row">
      <span class="ai-product-price">$349.00</span>
      <span class="ai-product-compare-price">$420.00</span>
    </div>
    <button class="ai-btn ai-btn-primary ai-btn-sm ai-w-full" style="margin-top: var(--ai-space-3);">
      Add to Cart
    </button>
  </div>
</div>`,
  },
  {
    id: 'cart-drawer-pro',
    name: 'Slide-Out Cart Drawer (PRO)',
    description: 'Full slide-out shopping bag drawer with line items, quantity steppers, subtotal, and checkout CTA.',
    category: 'ecommerce',
    tier: 'pro',
    tags: ['cart', 'drawer', 'checkout', 'pro', 'ecommerce'],
    html: lockedPreview('Slide-Out Cart Drawer'),
  },
  /* ==========================================================================
     ANIMATED MOTION & INTERACTIVE PRIMITIVES
     ========================================================================== */
  {
    id: 'animated-loaders',
    name: 'Animated Spinners & Pulse Radars',
    description: 'Pure CSS architectural circular arc spinners, dual orbital rings, and real-time live pulse radar dots.',
    category: 'primitive',
    tier: 'free',
    tags: ['animation', 'spinner', 'loader', 'pulse', 'motion'],
    html: `<div class="ai-flex ai-flex-wrap ai-gap-6 ai-items-center" style="padding: var(--ai-space-4);">
  <div class="ai-flex ai-items-center ai-gap-3">
    <span class="ai-spinner ai-spinner-sm"></span>
    <span class="ai-spinner"></span>
    <span class="ai-spinner ai-spinner-lg"></span>
  </div>
  <div class="ai-flex ai-items-center ai-gap-3">
    <div class="ai-spinner-ring"></div>
    <span class="ai-text-xs ai-text-secondary ai-font-mono">Orbital</span>
  </div>
  <div class="ai-flex ai-items-center ai-gap-2">
    <span class="ai-pulse-dot"></span>
    <span class="ai-text-xs ai-font-medium">Connecting</span>
  </div>
  <div class="ai-flex ai-items-center ai-gap-2">
    <span class="ai-pulse-dot ai-pulse-dot-success"></span>
    <span class="ai-text-xs ai-font-medium" style="color: var(--ai-success);">Operational</span>
  </div>
</div>`,
  },
  {
    id: 'progress-bars',
    name: 'Animated Progress & Loading Bars',
    description: 'Determinate progress meters, indeterminate sliding shimmer bars for network/AI streams, and striped upload bars.',
    category: 'primitive',
    tier: 'free',
    tags: ['progress', 'loading', 'animation', 'meter', 'bar'],
    html: `<div class="ai-grid ai-gap-5" style="max-width: 28rem;">
  <div>
    <div class="ai-flex ai-justify-between ai-text-xs ai-font-medium" style="margin-bottom: 0.375rem;">
      <span>Indeterminate (Network Stream)</span>
      <span class="ai-font-mono ai-text-secondary">Syncing...</span>
    </div>
    <div class="ai-progress ai-progress-indeterminate">
      <div class="ai-progress-bar"></div>
    </div>
  </div>
  <div>
    <div class="ai-flex ai-justify-between ai-text-xs ai-font-medium" style="margin-bottom: 0.375rem;">
      <span>Model Weights Downloaded</span>
      <span class="ai-font-mono">68%</span>
    </div>
    <div class="ai-progress">
      <div class="ai-progress-bar" style="width: 68%;"></div>
    </div>
  </div>
  <div>
    <div class="ai-flex ai-justify-between ai-text-xs ai-font-medium" style="margin-bottom: 0.375rem;">
      <span>Dataset Chunk Upload</span>
      <span class="ai-font-mono" style="color: var(--ai-success);">Active</span>
    </div>
    <div class="ai-progress ai-progress-striped">
      <div class="ai-progress-bar ai-progress-bar-success" style="width: 85%;"></div>
    </div>
  </div>
</div>`,
  },
  {
    id: 'interactive-slider',
    name: 'Tactile Range Sliders',
    description: 'Custom-styled range sliders with responsive track fill, hover glow thumb, and mono value readout.',
    category: 'primitive',
    tier: 'free',
    tags: ['slider', 'range', 'input', 'control', 'form'],
    html: `<div class="ai-grid ai-gap-4" style="max-width: 24rem;">
  <div class="ai-slider-wrapper">
    <div class="ai-slider-header">
      <label for="temp-slider">Temperature</label>
      <span class="ai-slider-value">0.72</span>
    </div>
    <input type="range" id="temp-slider" class="ai-range" min="0" max="1" step="0.01" value="0.72" />
  </div>
  <div class="ai-slider-wrapper">
    <div class="ai-slider-header">
      <label for="token-slider">Max Output Tokens</label>
      <span class="ai-slider-value">4,096</span>
    </div>
    <input type="range" id="token-slider" class="ai-slider" min="256" max="8192" step="256" value="4096" />
  </div>
</div>`,
  },
  {
    id: 'skeleton-card',
    name: 'Shimmer Skeleton Loader',
    description: 'Hardware-accelerated content placeholder shimmer skeletons for cards, avatars, and text blocks.',
    category: 'primitive',
    tier: 'free',
    tags: ['skeleton', 'shimmer', 'loading', 'placeholder', 'animation'],
    html: `<div class="ai-card" style="max-width: 24rem; padding: var(--ai-space-5);">
  <div class="ai-flex ai-items-center ai-gap-3" style="margin-bottom: var(--ai-space-4);">
    <div class="ai-skeleton ai-skeleton-avatar"></div>
    <div style="flex: 1;">
      <div class="ai-skeleton ai-skeleton-title" style="width: 50%;"></div>
      <div class="ai-skeleton ai-skeleton-text" style="width: 75%; margin-bottom: 0;"></div>
    </div>
  </div>
  <div class="ai-skeleton ai-skeleton-rect" style="height: 7rem; margin-bottom: var(--ai-space-3);"></div>
  <div class="ai-skeleton ai-skeleton-text" style="width: 90%;"></div>
  <div class="ai-skeleton ai-skeleton-text" style="width: 65%;"></div>
</div>`,
  },
  {
    id: 'stepper-flow',
    name: 'Stepper Progress Flow',
    description: 'Multi-step wizard and checkout flow indicator with completed, active, and upcoming stages.',
    category: 'primitive',
    tier: 'free',
    tags: ['stepper', 'wizard', 'navigation', 'progress', 'flow'],
    html: `<div class="ai-stepper" style="max-width: 32rem;">
  <div class="ai-step-item is-completed">
    <div class="ai-step-circle">✓</div>
    <span class="ai-step-label">Account</span>
  </div>
  <div class="ai-step-item is-active">
    <div class="ai-step-circle">2</div>
    <span class="ai-step-label">Workspace</span>
  </div>
  <div class="ai-step-item">
    <div class="ai-step-circle">3</div>
    <span class="ai-step-label">Billing</span>
  </div>
  <div class="ai-step-item">
    <div class="ai-step-circle">4</div>
    <span class="ai-step-label">Complete</span>
  </div>
</div>`,
  },
  {
    id: 'segmented-toggle',
    name: 'Segmented Control Switch',
    description: 'Tactile multi-option segmented toggle bar with sliding active pill state.',
    category: 'primitive',
    tier: 'free',
    tags: ['segmented', 'toggle', 'switch', 'tab', 'control'],
    html: `<div class="ai-flex ai-flex-wrap ai-gap-4 ai-items-center">
  <div class="ai-segmented" role="tablist">
    <button class="ai-segmented-btn is-active" role="tab" aria-selected="true">Monthly</button>
    <button class="ai-segmented-btn" role="tab" aria-selected="false">Annual (Save 20%)</button>
  </div>
  <div class="ai-segmented" role="tablist">
    <button class="ai-segmented-btn is-active" role="tab" aria-selected="true">Code</button>
    <button class="ai-segmented-btn" role="tab" aria-selected="false">Preview</button>
    <button class="ai-segmented-btn" role="tab" aria-selected="false">Docs</button>
  </div>
</div>`,
  },
  {
    id: 'popover-anchor',
    name: 'Popover Anchor Card',
    description: 'Contextual popover tooltip card with precise directional pointer arrow and action links.',
    category: 'primitive',
    tier: 'free',
    tags: ['popover', 'tooltip', 'anchor', 'floating', 'overlay'],
    html: `<div style="padding-top: 6.5rem; display: flex; justify-content: center;">
  <div class="ai-popover-anchor">
    <div class="ai-popover">
      <div class="ai-flex ai-items-center ai-gap-2" style="margin-bottom: 0.375rem;">
        <span class="ai-pulse-dot ai-pulse-dot-success"></span>
        <span class="ai-font-semibold ai-text-xs">Agent Worker #4 Active</span>
      </div>
      <p class="ai-text-xs ai-text-secondary" style="margin-bottom: 0.5rem; line-height: 1.4;">Running automated test suite across 34 components.</p>
      <div class="ai-flex ai-justify-between ai-items-center">
        <a href="#" class="ai-text-xs ai-font-medium ai-text-accent">View Stream &rarr;</a>
        <span class="ai-font-mono ai-text-xs ai-text-muted">450ms</span>
      </div>
      <div class="ai-popover-arrow"></div>
    </div>
    <button class="ai-btn ai-btn-outline ai-btn-sm">Cluster Status [Live]</button>
  </div>
</div>`,
  },
  {
    id: 'toast-stack',
    name: 'Stacked Toast with Countdown',
    description: 'Multi-toast notification stack featuring auto-dismiss animated countdown progress indicators.',
    category: 'primitive',
    tier: 'free',
    tags: ['toast', 'notification', 'alert', 'stack', 'animation'],
    html: `<div class="ai-grid ai-gap-3" style="max-width: 24rem;">
  <div class="ai-toast ai-toast-success ai-toast-countdown">
    <span class="ai-toast-message">Deployment completed to edge servers.</span>
    <button class="ai-toast-close">&times;</button>
    <div class="ai-toast-progress"></div>
  </div>
  <div class="ai-toast ai-toast-info ai-toast-countdown">
    <span class="ai-toast-message">New API Key created: <code>llmcss_live_8f...</code></span>
    <button class="ai-toast-close">&times;</button>
    <div class="ai-toast-progress"></div>
  </div>
</div>`,
  },
  {
    id: 'marquee-ticker',
    name: 'Infinite Marquee Logo Ticker',
    description: 'Pure native CSS smooth infinite horizontal logo & trust badge ticker with pause-on-hover.',
    category: 'marketing',
    tier: 'free',
    tags: ['marquee', 'ticker', 'logo', 'carousel', 'marketing', 'animation'],
    html: `<div class="ai-marquee" style="background: var(--ai-surface-1); border: 1px solid var(--ai-border); border-radius: var(--ai-radius-lg); padding: var(--ai-space-4) 0;">
  <div class="ai-marquee-track">
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">ALPHA NET</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">VECTOR SYS</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">QUANTUM LABS</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">NEXUS DATA</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">KINETIC CORE</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">SYNAPSE AI</span>
  </div>
  <div class="ai-marquee-track" aria-hidden="true">
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">ALPHA NET</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">VECTOR SYS</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">QUANTUM LABS</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">NEXUS DATA</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">KINETIC CORE</span>
    <span class="ai-font-mono ai-text-xs ai-text-muted" style="letter-spacing: 0.1em; font-weight: 600;">SYNAPSE AI</span>
  </div>
</div>`,
  },
  {
    id: 'filter-toolbar',
    name: 'Filter Toolbar & Pill Tags',
    description: 'Application filter header with quick-select pill tags, search field, and sort control.',
    category: 'application',
    tier: 'free',
    tags: ['filter', 'toolbar', 'tags', 'search', 'application'],
    html: `<div class="ai-filter-toolbar">
  <div class="ai-filter-tags">
    <span class="ai-text-xs ai-font-medium ai-text-muted" style="margin-right: 0.25rem;">Filter:</span>
    <button class="ai-filter-tag is-active">All (48)</button>
    <button class="ai-filter-tag">Production</button>
    <button class="ai-filter-tag">Staging</button>
    <button class="ai-filter-tag">Failed</button>
  </div>
  <div class="ai-flex ai-items-center ai-gap-2">
    <input type="text" class="ai-input" placeholder="Filter jobs..." style="height: 1.875rem; font-size: 0.75rem; width: 10rem;" />
    <select class="ai-select" style="height: 1.875rem; font-size: 0.75rem; padding: 0 1.5rem 0 0.5rem;">
      <option>Latest</option>
      <option>Oldest</option>
      <option>Duration</option>
    </select>
  </div>
</div>`,
  },
  {
    id: 'bento-editorial-pro',
    name: 'Asymmetric Editorial Bento (Pro)',
    description: 'High-craft 3-column asymmetric bento layout with live terminal code pill, telemetry stats, and architectural surface accents.',
    category: 'marketing',
    tier: 'pro',
    tags: ['bento', 'grid', 'editorial', 'hero', 'marketing', 'pro'],
    html: lockedPreview('Asymmetric Editorial Bento'),
  },
  {
    id: 'pricing-matrix-pro',
    name: 'Enterprise Pricing Matrix (Pro)',
    description: 'Full enterprise feature comparison matrix with sticky left column, tier breakdowns, and tiered action buttons.',
    category: 'marketing',
    tier: 'pro',
    tags: ['pricing', 'matrix', 'comparison', 'table', 'marketing', 'pro'],
    html: lockedPreview('Enterprise Pricing Matrix'),
  },
  {
    id: 'ai-chat-thread',
    name: 'AI Conversational Thread (Pro)',
    description: 'Full interactive conversational AI chat thread with streaming status, code snippet preview, and prompt input dock.',
    category: 'application',
    tier: 'pro',
    tags: ['chat', 'conversation', 'ai', 'thread', 'assistant', 'pro'],
    html: lockedPreview('AI Conversational Thread'),
  },
  {
    id: 'tool-trace',
    name: 'Tool Trace (Pro)',
    description: 'Step list for tool calls: name, status pip, duration, and expandable I/O.',
    category: 'application',
    tier: 'pro',
    tags: ['agent', 'trace', 'tools', 'mcp', 'pro'],
    html: lockedPreview('Tool Trace'),
  },
  {
    id: 'approval-bar',
    name: 'Approval Bar (Pro)',
    description: 'Sticky action bar for allow / deny / edit on a pending agent action.',
    category: 'application',
    tier: 'pro',
    tags: ['agent', 'approval', 'bar', 'pro'],
    html: lockedPreview('Approval Bar'),
  },
  {
    id: 'thought-chain',
    name: 'Thought Chain (Pro)',
    description: 'Collapsible reasoning steps with a live streaming state.',
    category: 'application',
    tier: 'pro',
    tags: ['agent', 'reasoning', 'chain', 'pro'],
    html: lockedPreview('Thought Chain'),
  },
  {
    id: 'agent-workspace',
    name: 'Agent Workspace (Pro)',
    description: 'Three-pane workspace: thread, canvas, and context rail.',
    category: 'application',
    tier: 'pro',
    tags: ['agent', 'workspace', 'layout', 'pro'],
    html: lockedPreview('Agent Workspace'),
  },
  {
    id: 'mcp-widget-shell',
    name: 'MCP Widget Shell (Pro)',
    description: 'Card shell for an MCP tool result with schema badge and copy.',
    category: 'application',
    tier: 'pro',
    tags: ['mcp', 'widget', 'agent', 'pro'],
    html: lockedPreview('MCP Widget Shell'),
  },
  {
    id: 'streaming-status',
    name: 'Streaming Status (Pro)',
    description: 'Indeterminate progress plus token/sec readout for live generation.',
    category: 'application',
    tier: 'pro',
    tags: ['streaming', 'status', 'agent', 'pro'],
    html: lockedPreview('Streaming Status'),
  },
  {
    id: 'citation-list',
    name: 'Citation List (Pro)',
    description: 'Numbered source list with domain, snippet, and open action.',
    category: 'application',
    tier: 'pro',
    tags: ['citations', 'sources', 'rag', 'pro'],
    html: lockedPreview('Citation List'),
  },
  /* ==========================================================================
     NEW PRIMITIVES - BREADCRUMBS, TOOLTIPS, PAGINATION, DIVIDERS, ETC.
     ========================================================================== */
  {
    id: 'breadcrumb-nav',
    name: 'Breadcrumb Navigation',
    description: 'Accessible breadcrumb trail with slash separators, linked ancestors, and a current page indicator.',
    category: 'primitive',
    tier: 'free',
    tags: ['breadcrumb', 'navigation', 'trail', 'path'],
    html: `<nav aria-label="Breadcrumb">
  <ol class="ai-breadcrumb">
    <li class="ai-breadcrumb-item"><a href="#">Dashboard</a></li>
    <li class="ai-breadcrumb-item"><a href="#">Projects</a></li>
    <li class="ai-breadcrumb-item"><a href="#">Design System</a></li>
    <li class="ai-breadcrumb-item is-current" aria-current="page">Components</li>
  </ol>
</nav>`,
  },
  {
    id: 'tooltip-hover',
    name: 'CSS Tooltip',
    description: 'Pure CSS tooltip on hover and focus. No JavaScript required. Supports top and bottom placement.',
    category: 'primitive',
    tier: 'free',
    tags: ['tooltip', 'hover', 'popover', 'hint'],
    html: `<div class="ai-flex ai-gap-6 ai-items-center">
  <span class="ai-tooltip" data-tooltip="Edit this item">
    <button class="ai-btn ai-btn-outline ai-btn-sm">Hover me (top)</button>
  </span>
  <span class="ai-tooltip ai-tooltip-bottom" data-tooltip="Save changes">
    <button class="ai-btn ai-btn-secondary ai-btn-sm">Hover me (bottom)</button>
  </span>
  <span class="ai-tooltip" data-tooltip="Keyboard accessible too">
    <button class="ai-btn ai-btn-ghost ai-btn-sm">Focus me</button>
  </span>
</div>`,
  },
  {
    id: 'pagination-controls',
    name: 'Pagination',
    description: 'Page navigation with previous/next arrows, active page highlight, and ellipsis for large sets.',
    category: 'primitive',
    tier: 'free',
    tags: ['pagination', 'paging', 'navigation', 'list'],
    html: `<nav aria-label="Pagination">
  <ul class="ai-pagination">
    <li class="ai-pagination-item">
      <a href="#" class="ai-pagination-link is-disabled" aria-disabled="true">&larr; Prev</a>
    </li>
    <li class="ai-pagination-item">
      <a href="#" class="ai-pagination-link is-active" aria-current="page">1</a>
    </li>
    <li class="ai-pagination-item">
      <a href="#" class="ai-pagination-link">2</a>
    </li>
    <li class="ai-pagination-item">
      <a href="#" class="ai-pagination-link">3</a>
    </li>
    <li class="ai-pagination-item">
      <span class="ai-pagination-ellipsis">...</span>
    </li>
    <li class="ai-pagination-item">
      <a href="#" class="ai-pagination-link">12</a>
    </li>
    <li class="ai-pagination-item">
      <a href="#" class="ai-pagination-link">Next &rarr;</a>
    </li>
  </ul>
</nav>`,
  },
  {
    id: 'divider-separator',
    name: 'Divider / Separator',
    description: 'Horizontal and vertical dividers with optional centered label text. Useful for sectioning content.',
    category: 'primitive',
    tier: 'free',
    tags: ['divider', 'separator', 'hr', 'line', 'rule'],
    html: `<div style="max-width: 28rem;">
  <p class="ai-text-sm ai-text-secondary">Content above the divider.</p>
  <div class="ai-divider"></div>
  <p class="ai-text-sm ai-text-secondary">Content below the plain divider.</p>
  <div class="ai-divider">or continue with</div>
  <p class="ai-text-sm ai-text-secondary">Content below the labeled divider.</p>
  <div class="ai-flex ai-items-center ai-gap-4" style="margin-top: var(--ai-space-6);">
    <span class="ai-text-sm">Item A</span>
    <span class="ai-divider-vertical"></span>
    <span class="ai-text-sm">Item B</span>
    <span class="ai-divider-vertical"></span>
    <span class="ai-text-sm">Item C</span>
  </div>
</div>`,
  },
  {
    id: 'textarea-counter',
    name: 'Textarea with Character Counter',
    description: 'Multi-line text input with label, helper text, and a live character count footer.',
    category: 'primitive',
    tier: 'free',
    tags: ['textarea', 'form', 'input', 'counter', 'multiline'],
    html: `<div style="max-width: 28rem;">
  <div class="ai-form-group">
    <label class="ai-form-label" for="bio-field">Bio</label>
    <div class="ai-textarea-group">
      <textarea id="bio-field" class="ai-textarea" placeholder="Write a short bio..." rows="4" maxlength="280">Design engineer building component systems for autonomous agents.</textarea>
      <div class="ai-textarea-footer">
        <span class="ai-form-hint">Keep it concise and direct.</span>
        <span class="ai-font-mono" style="font-size: 0.6875rem;">63 / 280</span>
      </div>
    </div>
  </div>
  <div class="ai-form-group">
    <label class="ai-form-label is-required" for="feedback-field">Feedback</label>
    <textarea id="feedback-field" class="ai-textarea is-error" placeholder="Describe the issue..." rows="3" aria-invalid="true">Too short</textarea>
    <span class="ai-form-error">Feedback must be at least 20 characters.</span>
  </div>
</div>`,
  },
  {
    id: 'checkbox-radio-group',
    name: 'Checkbox & Radio Controls',
    description: 'Styled checkbox and radio button groups with labels, keyboard focus states, and accessible markup.',
    category: 'primitive',
    tier: 'free',
    tags: ['checkbox', 'radio', 'form', 'input', 'toggle', 'select'],
    html: `<div class="ai-flex ai-gap-12" style="max-width: 32rem;">
  <div>
    <span class="ai-form-label" style="margin-bottom: var(--ai-space-3); display: block;">Notifications</span>
    <div style="display: flex; flex-direction: column; gap: var(--ai-space-3);">
      <label class="ai-checkbox">
        <input type="checkbox" class="ai-checkbox-input" checked />
        Email notifications
      </label>
      <label class="ai-checkbox">
        <input type="checkbox" class="ai-checkbox-input" checked />
        Push notifications
      </label>
      <label class="ai-checkbox">
        <input type="checkbox" class="ai-checkbox-input" />
        SMS alerts
      </label>
    </div>
  </div>
  <div>
    <span class="ai-form-label" style="margin-bottom: var(--ai-space-3); display: block;">Plan</span>
    <div class="ai-radio-group">
      <label class="ai-radio">
        <input type="radio" name="plan" class="ai-radio-input" checked />
        Community (Free)
      </label>
      <label class="ai-radio">
        <input type="radio" name="plan" class="ai-radio-input" />
        Pro ($9/mo)
      </label>
      <label class="ai-radio">
        <input type="radio" name="plan" class="ai-radio-input" />
        Enterprise (Custom)
      </label>
    </div>
  </div>
</div>`,
  },
  {
    id: 'empty-state',
    name: 'Empty State',
    description: 'Placeholder component for no-data views with icon, title, description, and call-to-action button.',
    category: 'primitive',
    tier: 'free',
    tags: ['empty', 'placeholder', 'no-data', 'blank', 'zero-state'],
    html: `<div class="ai-empty-state" style="border: 1px dashed var(--ai-border); border-radius: var(--ai-radius-lg);">
  <svg class="ai-empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
  <h3 class="ai-empty-state-title">No documents yet</h3>
  <p class="ai-empty-state-description">
    Create your first document to get started. Documents are automatically saved and synced across your workspace.
  </p>
  <button class="ai-btn ai-btn-primary ai-btn-sm">Create Document</button>
</div>`,
  },
  /* ==========================================================================
     NEW APPLICATION COMPONENTS
     ========================================================================== */
  {
    id: 'sidebar-nav',
    name: 'Sidebar Navigation',
    description: 'Collapsible sidebar with grouped sections, section titles, nav items with icons, count badges, and active state.',
    category: 'application',
    tier: 'free',
    tags: ['sidebar', 'navigation', 'menu', 'drawer', 'app'],
    html: `<div style="width: 16rem;">
  <nav class="ai-sidebar" style="height: auto; border: 1px solid var(--ai-border); border-radius: var(--ai-radius-lg); overflow: hidden;">
    <div class="ai-sidebar-header">
      <span class="ai-font-semibold" style="font-size: 0.9375rem;">Workspace</span>
    </div>
    <ul class="ai-sidebar-nav">
      <li class="ai-sidebar-section">
        <span class="ai-sidebar-section-title">Main</span>
        <a href="#" class="ai-sidebar-item is-active">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
          <span class="ai-sidebar-badge">12</span>
        </a>
        <a href="#" class="ai-sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Documents
        </a>
        <a href="#" class="ai-sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Activity
          <span class="ai-sidebar-badge">3</span>
        </a>
      </li>
      <li class="ai-sidebar-section">
        <span class="ai-sidebar-section-title">Account</span>
        <a href="#" class="ai-sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Settings
        </a>
      </li>
    </ul>
  </nav>
</div>`,
  },
  {
    id: 'stats-dashboard',
    name: 'Stats Dashboard Row',
    description: 'Horizontal row of key stat KPI cards with large metrics, trend indicators, and comparison labels.',
    category: 'application',
    tier: 'free',
    tags: ['stats', 'dashboard', 'kpi', 'metrics', 'analytics'],
    html: `<div class="ai-grid ai-grid-cols-1 ai-md:grid-cols-4 ai-gap-4">
  <div class="ai-kpi-card">
    <span class="ai-kpi-label">Total Revenue</span>
    <span class="ai-kpi-value">$48,290</span>
    <span class="ai-kpi-trend is-up">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      +12.3% vs last month
    </span>
  </div>
  <div class="ai-kpi-card">
    <span class="ai-kpi-label">Active Users</span>
    <span class="ai-kpi-value">2,847</span>
    <span class="ai-kpi-trend is-up">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      +8.1% vs last month
    </span>
  </div>
  <div class="ai-kpi-card">
    <span class="ai-kpi-label">Bounce Rate</span>
    <span class="ai-kpi-value">24.6%</span>
    <span class="ai-kpi-trend is-down">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
      -3.2% vs last month
    </span>
  </div>
  <div class="ai-kpi-card">
    <span class="ai-kpi-label">Avg. Session</span>
    <span class="ai-kpi-value">4m 32s</span>
    <span class="ai-kpi-trend is-up">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      +18.7% vs last month
    </span>
  </div>
</div>`,
  },
  {
    id: 'notification-list',
    name: 'Notification List',
    description: 'Grouped notification items with unread indicators, timestamps, and hover states.',
    category: 'application',
    tier: 'free',
    tags: ['notification', 'alert', 'inbox', 'message', 'feed'],
    html: `<div class="ai-notification-list" style="max-width: 28rem;">
  <div class="ai-notification-item is-unread">
    <span class="ai-notification-dot"></span>
    <div class="ai-notification-content">
      <p class="ai-notification-title">Deployment completed successfully</p>
      <p class="ai-notification-meta">Production environment - 2 minutes ago</p>
    </div>
  </div>
  <div class="ai-notification-item is-unread">
    <span class="ai-notification-dot"></span>
    <div class="ai-notification-content">
      <p class="ai-notification-title">New team member joined the workspace</p>
      <p class="ai-notification-meta">Sarah Chen accepted the invite - 15 minutes ago</p>
    </div>
  </div>
  <div class="ai-notification-item">
    <span class="ai-notification-dot" style="background-color: transparent;"></span>
    <div class="ai-notification-content">
      <p class="ai-notification-title">Weekly usage report ready</p>
      <p class="ai-notification-meta">Analytics - 2 hours ago</p>
    </div>
  </div>
  <div class="ai-notification-item">
    <span class="ai-notification-dot" style="background-color: transparent;"></span>
    <div class="ai-notification-content">
      <p class="ai-notification-title">SSL certificate renewed</p>
      <p class="ai-notification-meta">Infrastructure - Yesterday at 11:42 AM</p>
    </div>
  </div>
</div>`,
  },
  {
    id: 'kbd-shortcuts',
    name: 'Keyboard Shortcuts',
    description: 'Inline kbd keys for command palettes, docs, and shortcut legends.',
    category: 'primitive',
    tier: 'free',
    tags: ['kbd', 'keyboard', 'shortcut', 'docs'],
    html: `<div class="ai-flex ai-flex-wrap ai-gap-4 ai-items-center">
  <span class="ai-flex ai-items-center ai-gap-1"><kbd class="ai-kbd">⌘</kbd><kbd class="ai-kbd">K</kbd><span class="ai-text-xs ai-text-muted">Command palette</span></span>
  <span class="ai-flex ai-items-center ai-gap-1"><kbd class="ai-kbd">⌘</kbd><kbd class="ai-kbd">Enter</kbd><span class="ai-text-xs ai-text-muted">Submit</span></span>
  <span class="ai-flex ai-items-center ai-gap-1"><kbd class="ai-kbd">Esc</kbd><span class="ai-text-xs ai-text-muted">Dismiss</span></span>
</div>`,
  },
  {
    id: 'quote-pull',
    name: 'Pull Quote',
    description: 'Editorial quote with a single left rule. Title face comes from the font switcher, not the theme.',
    category: 'primitive',
    tier: 'free',
    tags: ['quote', 'blockquote', 'editorial', 'testimonial'],
    html: `<blockquote class="ai-quote">
  <p>One title face. Themes change color, not the alphabet.</p>
  <footer>LLMCSS typesetting note</footer>
</blockquote>`,
  },
  {
    id: 'code-block',
    name: 'Code Block',
    description: 'Monospace snippet well for CLI, tokens, and agent output.',
    category: 'primitive',
    tier: 'free',
    tags: ['code', 'pre', 'snippet', 'docs'],
    html: `<pre class="ai-code-block"><code>npx llmcss add quote-pull
npx llmcss add kbd-shortcuts</code></pre>`,
  },
  {
    id: 'file-dropzone',
    name: 'File Dropzone',
    description: 'Dashed upload well for attachments and dataset drops.',
    category: 'primitive',
    tier: 'free',
    tags: ['upload', 'file', 'dropzone', 'form'],
    html: `<div class="ai-dropzone" role="button" tabindex="0">
  <strong style="color: var(--ai-text-primary);">Drop a file</strong>
  <span class="ai-text-xs">PNG, JSON, or CSV up to 8MB</span>
  <button class="ai-btn ai-btn-outline ai-btn-sm" type="button" style="margin-top: var(--ai-space-2);">Browse</button>
</div>`,
  },
  {
    id: 'timeline-log',
    name: 'Timeline Log',
    description: 'Vertical event log with pips. For deploys, agent steps, and audit trails.',
    category: 'application',
    tier: 'free',
    tags: ['timeline', 'log', 'history', 'activity'],
    html: `<ol class="ai-timeline">
  <li class="ai-timeline-item">
    <div class="ai-timeline-title">Registry published</div>
    <div class="ai-timeline-meta">origin · 2m ago</div>
  </li>
  <li class="ai-timeline-item">
    <div class="ai-timeline-title">Token issued</div>
    <div class="ai-timeline-meta">polar webhook · 18m ago</div>
  </li>
  <li class="ai-timeline-item">
    <div class="ai-timeline-title">Pro component added</div>
    <div class="ai-timeline-meta">tool-trace · yesterday</div>
  </li>
</ol>`,
  },
  {
    id: 'split-button',
    name: 'Split Button',
    description: 'Primary action plus a menu chevron for secondary variants.',
    category: 'primitive',
    tier: 'free',
    tags: ['button', 'split', 'menu', 'action'],
    html: `<div class="ai-flex">
  <button class="ai-btn ai-btn-primary" type="button" style="border-top-right-radius: 0; border-bottom-right-radius: 0;">Deploy</button>
  <button class="ai-btn ai-btn-primary" type="button" aria-label="More deploy options" style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 0.55rem; padding-right: 0.55rem;">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
  </button>
</div>`,
  },
];
