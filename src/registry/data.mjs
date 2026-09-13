import { extraComponents } from './data-extra.mjs';
import { ungatedById } from './data-ungated.mjs';
import { themedComponents } from './themed-data.mjs';

const baseComponents = [
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
    html: `<div class="flex flex-wrap gap-3 items-center">
  <button class="btn btn-primary">Primary Action</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-outline">Outline</button>
  <button class="btn btn-ghost">Ghost</button>
  <button class="btn btn-accent">Accent Blue</button>
  <button class="btn btn-danger">Destructive</button>
  <button class="btn btn-primary is-loading" aria-busy="true">Loading</button>
</div>`,
  },
  {
    id: 'btn-sizes',
    name: 'Button Sizes & Icons',
    description: 'Modular button sizing scale from extra-small (xs) to extra-large (xl) plus icon buttons.',
    category: 'primitive',
    tier: 'free',
    tags: ['button', 'size', 'icon'],
    html: `<div class="flex flex-wrap gap-3 items-center">
  <button class="btn btn-primary btn-xs">Extra Small</button>
  <button class="btn btn-primary btn-sm">Small</button>
  <button class="btn btn-primary">Standard</button>
  <button class="btn btn-primary btn-lg">Large</button>
  <button class="btn btn-outline btn-icon" aria-label="Settings">
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
    html: `<div class="grid gap-4" style="max-width: 24rem;">
  <div class="form-group">
    <label class="form-label" for="user-email">Email Address</label>
    <input type="email" id="user-email" class="input" placeholder="name@company.com" />
    <span class="form-hint">We'll send your workspace invite here.</span>
  </div>
  <div class="form-group">
    <label class="form-label" for="user-bio">Description</label>
    <textarea id="user-bio" class="textarea" placeholder="Tell us about your project..."></textarea>
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
    html: `<div class="form-group" style="max-width: 28rem;">
  <label class="form-label">Project URL</label>
  <div class="input-group">
    <span class="input-addon">https://</span>
    <input type="text" class="input" placeholder="my-app" />
    <span class="input-addon">.llmcss.io</span>
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
    html: `<div class="flex flex-col gap-4">
  <label class="switch">
    <input type="checkbox" class="switch-input" checked />
    <span class="switch-track"><span class="switch-thumb"></span></span>
    <span class="text-sm font-medium">Automatic Backups</span>
  </label>
  <label class="checkbox">
    <input type="checkbox" class="checkbox-input" checked />
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
    html: `<div class="card" style="max-width: 24rem;">
  <div class="card-header">
    <h3 class="card-title">Project Deployment</h3>
    <p class="card-description">Production deployment configured for edge nodes.</p>
  </div>
  <div class="card-body">
    <p class="text-sm">Last deployed 14 minutes ago via commit <code>8f42d19</code> to <strong>production-syd</strong>.</p>
  </div>
  <div class="card-footer">
    <span class="badge badge-success badge-dot">Online</span>
    <button class="btn btn-outline btn-xs">View Logs</button>
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
    html: `<div class="flex flex-wrap gap-2 items-center">
  <span class="badge badge-solid">RECOMMENDED</span>
  <span class="badge badge-neutral">Default</span>
  <span class="badge badge-pro">PRO ACCESS</span>
  <span class="badge badge-success badge-dot">Operational</span>
  <span class="badge badge-warning badge-dot">Degraded</span>
  <span class="badge badge-danger badge-dot">Offline</span>
  <span class="badge badge-outline">Outline Tag</span>
  <span class="badge badge-mono">128 tok/s</span>
</div>`,
  },
  {
    id: 'avatar-group',
    name: 'Avatars & Avatar Group',
    description: 'User avatar icons, initials, and overlapping team member piles.',
    category: 'primitive',
    tier: 'free',
    tags: ['avatar', 'user', 'team'],
    html: `<div class="flex items-center gap-6">
  <div class="avatar-group">
    <div class="avatar avatar-sm" style="background-color: var(--ai-surface-3);">+4</div>
    <div class="avatar avatar-sm" style="background-color: #3b82f6; color: white;">JD</div>
    <div class="avatar avatar-sm" style="background-color: #10b981; color: white;">SK</div>
    <div class="avatar avatar-sm" style="background-color: #f59e0b; color: white;">AL</div>
  </div>
  <div class="avatar">
    <span class="font-bold">EA</span>
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
    html: `<button class="btn btn-primary" data-ai-toggle="modal" data-ai-target="#demo-modal" aria-haspopup="dialog" aria-expanded="false">
  Open Modal Dialog
</button>

<div id="demo-modal" class="modal">
  <div class="modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
    <div class="modal-header">
      <h3 class="modal-title" id="demo-modal-title">Confirm Database Reset</h3>
      <button class="modal-close" data-ai-dismiss="modal" aria-label="Close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to reset the staging database? All mock records and schema migrations will revert to initial seed.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" data-ai-dismiss="modal">Cancel</button>
      <button class="btn btn-danger" data-ai-dismiss="modal">Reset Database</button>
    </div>
  </div>
</div>`,
    webComponentHtml: `<ai-modal id="demo-modal">
  <div class="modal-backdrop"></div>
  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="demo-modal-wc-title">
    <div class="modal-header">
      <h3 class="modal-title" id="demo-modal-wc-title">Web Component Dialog</h3>
      <button class="modal-close" data-ai-dismiss="modal" aria-label="Close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Rendered natively via &lt;modal&gt; custom element with Light DOM styling.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" data-ai-dismiss="modal">Got it</button>
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
    html: `<div class="tabs">
  <div class="tabs-list" role="tablist" aria-label="Workspace">
    <button class="tab is-active" role="tab" id="tab-overview-tab" aria-controls="tab-overview" aria-selected="true" data-ai-tab="#tab-overview">Overview</button>
    <button class="tab" role="tab" id="tab-analytics-tab" aria-controls="tab-analytics" aria-selected="false" tabindex="-1" data-ai-tab="#tab-analytics">Analytics</button>
    <button class="tab" role="tab" id="tab-settings-tab" aria-controls="tab-settings" aria-selected="false" tabindex="-1" data-ai-tab="#tab-settings">Settings</button>
  </div>
  <div id="tab-overview" class="tab-panel is-active" role="tabpanel" aria-labelledby="tab-overview-tab">
    <p class="text-secondary">Overview tab content displaying system health and recent build outputs.</p>
  </div>
  <div id="tab-analytics" class="tab-panel" role="tabpanel" aria-labelledby="tab-analytics-tab">
    <p class="text-secondary">Analytics tab content displaying traffic and user engagement charts.</p>
  </div>
  <div id="tab-settings" class="tab-panel" role="tabpanel" aria-labelledby="tab-settings-tab">
    <p class="text-secondary">Workspace preferences and security configurations.</p>
  </div>
</div>`,
    webComponentHtml: `<ai-tabs>
  <div class="tabs-list" role="tablist">
    <button class="tab is-active" role="tab" id="tab-1-tab" aria-controls="tab-1" aria-selected="true" data-ai-tab="#tab-1">Account</button>
    <button class="tab" role="tab" id="tab-2-tab" aria-controls="tab-2" aria-selected="false" tabindex="-1" data-ai-tab="#tab-2">Security</button>
  </div>
  <div id="tab-1" class="tab-panel is-active" role="tabpanel" aria-labelledby="tab-1-tab"><p>Manage your account settings.</p></div>
  <div id="tab-2" class="tab-panel" role="tabpanel" aria-labelledby="tab-2-tab"><p>Configure 2FA and sessions.</p></div>
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
  <div class="dropdown">
    <button class="btn btn-outline dropdown-trigger" data-ai-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="demo-dropdown-menu">
      Options
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <ul class="dropdown-menu" id="demo-dropdown-menu">
      <li class="dropdown-header">Workspace</li>
      <li><button class="dropdown-item">View Team</button></li>
      <li><button class="dropdown-item">Billing & Plans</button></li>
      <li class="dropdown-divider"></li>
      <li><button class="dropdown-item is-danger">Sign Out</button></li>
    </ul>
  </div>
</div>`,
  },
  {
    id: 'accordion-faq',
    name: 'Collapsible Accordion',
    description: 'Disclosure list with hairline rules, a rotating hairline chevron, and an animated expand.',
    category: 'primitive',
    tier: 'free',
    tags: ['accordion', 'collapse', 'faq'],
    html: `<div class="accordion">
  <div class="accordion-item is-open" open>
    <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="true" aria-controls="faq-1">
      <span>How does LLMCSS eliminate the 'AI look'?</span>
      <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content" id="faq-1">
      LLMCSS uses high-craft typography pairings, subtle physical borders, calibrated surfaces, and asymmetric bento layouts rather than cookie-cutter purple gradients and over-rounded cards.
    </div>
  </div>
  <div class="accordion-item">
    <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="faq-2">
      <span>Can I use this without a build tool or Vite?</span>
      <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <div class="accordion-content" id="faq-2">
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
    html: `<div class="table-container" style="max-height: 20rem;">
  <table class="table table-hover table-sticky">
    <thead>
      <tr>
        <th aria-sort="ascending">Repository</th>
        <th>Environment</th>
        <th>Branch</th>
        <th>Status</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-semibold">llmcss-core</td>
        <td>Production</td>
        <td><code>main</code></td>
        <td><span class="badge badge-success badge-dot">Active</span></td>
        <td>2m ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-docs</td>
        <td>Staging</td>
        <td><code>preview/v1</code></td>
        <td><span class="badge badge-accent badge-dot">Building</span></td>
        <td>15m ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-mcp</td>
        <td>Edge</td>
        <td><code>feat/tools</code></td>
        <td><span class="badge badge-warning badge-dot">Queued</span></td>
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
    html: `<div class="flex flex-col gap-3">
  <div class="alert alert-info" role="status">
    <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    <div>
      <strong class="font-semibold">Maintenance scheduled:</strong> Edge servers will undergo routine maintenance at 02:00 UTC.
    </div>
  </div>
  <div class="alert alert-success" role="status">
    <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01 9 11.01"/></svg>
    <div>
      <strong class="font-semibold">Success:</strong> Your new API license key has been verified and applied to your workspace.
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
    html: `<header class="navbar">
  <div class="container">
    <div class="navbar-inner">
      <a href="#" class="brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        <span>LLMCSS</span>
      </a>
      <nav class="nav-links">
        <a href="#components" class="nav-link">Components</a>
        <a href="#templates" class="nav-link">Templates</a>
        <a href="#pricing" class="nav-link">Pricing</a>
        <a href="#docs" class="nav-link">Documentation</a>
      </nav>
      <div class="flex items-center gap-2">
        <a href="#login" class="btn btn-ghost btn-xs sm:inline-flex hidden">Log in</a>
        <a href="#start" class="btn btn-primary btn-xs">Get Started</a>
        <button class="btn btn-outline btn-xs md:hidden" data-ai-toggle="drawer" data-ai-target="#mobile-nav-drawer" aria-controls="mobile-nav-drawer" aria-expanded="false" aria-label="Open menu">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile Navigation Drawer -->
<div id="mobile-nav-drawer" class="drawer drawer-left">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" style="max-width: 18rem;">
    <div class="drawer-header">
      <a href="#" class="brand" style="font-size: 1rem;">
        <span>LLMCSS</span>
      </a>
      <button class="modal-close" data-ai-dismiss="drawer">&times;</button>
    </div>
    <div class="drawer-body">
      <nav class="flex flex-col gap-2">
        <a href="#components" class="sidebar-item">Components</a>
        <a href="#templates" class="sidebar-item">Templates</a>
        <a href="#pricing" class="sidebar-item">Pricing</a>
        <a href="#docs" class="sidebar-item">Documentation</a>
      </nav>
    </div>
    <div class="drawer-footer">
      <button class="btn btn-primary w-full btn-sm" data-ai-dismiss="drawer">Sign In</button>
    </div>
  </div>
</div>`,
  },
  {
    id: 'mobile-nav-drawer',
    name: 'Mobile Nav Drawer',
    description: 'Header with an off-canvas menu. The panel slides in from the right on small screens; links show inline from md up. Runs on data-ai-toggle, no JS to write.',
    category: 'marketing',
    tier: 'free',
    tags: ['navbar', 'mobile', 'menu', 'drawer', 'off-canvas', 'navigation', 'responsive'],
    html: `<header class="navbar">
  <div class="container navbar-inner">
    <a href="#" class="brand">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="2"/><rect x="9" y="9" width="12" height="12" rx="2.5" fill="currentColor"/></svg>
      <span>Northwind</span>
    </a>
    <nav class="hidden md:flex items-center gap-1" aria-label="Primary">
      <a href="#" class="nav-link is-active">Product</a>
      <a href="#" class="nav-link">Pricing</a>
      <a href="#" class="nav-link">Docs</a>
      <a href="#" class="nav-link">Changelog</a>
    </nav>
    <div class="flex items-center gap-2">
      <a href="#" class="btn btn-primary btn-xs hidden md:inline-flex">Start free</a>
      <button type="button" class="btn btn-outline btn-xs btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#nav-drawer" aria-controls="nav-drawer" aria-expanded="false" aria-label="Open menu">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>

<div id="nav-drawer" class="drawer drawer-sm md:hidden">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer-header">
      <span class="drawer-title">Menu</span>
      <button type="button" class="btn btn-ghost btn-icon btn-xs" data-ai-dismiss="drawer" aria-label="Close menu"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>
    </div>
    <nav class="drawer-body drawer-nav" aria-label="Primary">
      <a href="#" class="sidebar-item is-active" data-ai-dismiss="drawer">Product</a>
      <a href="#" class="sidebar-item" data-ai-dismiss="drawer">Pricing</a>
      <a href="#" class="sidebar-item" data-ai-dismiss="drawer">Docs</a>
      <a href="#" class="sidebar-item" data-ai-dismiss="drawer">Changelog</a>
    </nav>
    <div class="drawer-footer">
      <a href="#" class="btn btn-primary w-full">Start free</a>
    </div>
  </div>
</div>`,
  },
  {
    id: 'mobile-nav-dropdown',
    name: 'Mobile Nav Dropdown',
    description: 'Header with a menu sheet that drops down under the bar. Uses drawer-top with --ai-drawer-offset set to the header height so the bar stays put.',
    category: 'marketing',
    tier: 'free',
    tags: ['navbar', 'mobile', 'menu', 'dropdown', 'sheet', 'navigation', 'responsive'],
    html: `<header class="navbar">
  <div class="container navbar-inner">
    <a href="#" class="brand">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="2"/><rect x="9" y="9" width="12" height="12" rx="2.5" fill="currentColor"/></svg>
      <span>Northwind</span>
    </a>
    <nav class="hidden md:flex items-center gap-1" aria-label="Primary">
      <a href="#" class="nav-link is-active">Product</a>
      <a href="#" class="nav-link">Pricing</a>
      <a href="#" class="nav-link">Docs</a>
      <a href="#" class="nav-link">Changelog</a>
    </nav>
    <div class="flex items-center gap-2">
      <a href="#" class="btn btn-primary btn-xs hidden md:inline-flex">Start free</a>
      <button type="button" class="btn btn-outline btn-xs btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#nav-sheet" aria-controls="nav-sheet" aria-expanded="false" aria-label="Open menu">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>

<div id="nav-sheet" class="drawer drawer-top md:hidden" style="--ai-drawer-offset: 4.25rem;">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <nav class="drawer-body drawer-nav" aria-label="Primary">
      <a href="#" class="sidebar-item is-active" data-ai-dismiss="drawer">Product</a>
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
    id: 'hero-split',
    name: 'Split Screen Marketing Hero',
    description: 'High-converting hero section with badge, strong typographic lead, CTA buttons, and UI preview.',
    category: 'marketing',
    tier: 'free',
    tags: ['hero', 'landing', 'headline'],
    html: `<section class="hero">
  <div class="container">
    <div class="hero-split">
      <div>
        <h1 class="hero-title">
          Build software that looks human, not generated.
        </h1>
        <p class="hero-lead">
          The open UI library built for AI agents and design engineers. Pure native CSS, tokenized skinning, and zero cookie-cutter templates.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary btn-lg">Browse 100+ Components</button>
          <button class="btn btn-outline btn-lg">Documentation</button>
        </div>
      </div>
      <div class="hero-visual">
        <div style="background-color: var(--ai-surface-0); padding: var(--ai-space-8); border-radius: inherit;">
          <div class="flex justify-between items-center" style="margin-bottom: var(--ai-space-6);">
            <span class="text-xs font-mono text-muted">app.analytics.ts</span>
            <span class="badge badge-success badge-dot">Live Stream</span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="kpi-card" style="padding: var(--ai-space-4);">
              <span class="kpi-label">Weekly Active Users</span>
              <span class="kpi-value" style="font-size: 1.5rem;">48,290</span>
              <span class="kpi-trend is-up">↑ +24.8%</span>
            </div>
            <div class="kpi-card" style="padding: var(--ai-space-4);">
              <span class="kpi-label">Conversion Rate</span>
              <span class="kpi-value" style="font-size: 1.5rem;">4.12%</span>
              <span class="kpi-trend is-up">↑ +1.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
  },
  ungatedById['hero-bento-pro'],
  {
    id: 'pricing-tier-cards',
    name: '3-Tier Pricing Table',
    description: 'Clear pricing tiers with popular plan highlight, feature lists, and monthly/annual toggles.',
    category: 'marketing',
    tier: 'free',
    tags: ['pricing', 'plans', 'conversion'],
    html: `<section style="padding: var(--ai-space-16) 0;">
  <div class="container">
    <div class="text-center" style="max-width: 36rem; margin: 0 auto;">
      <h2 style="font-size: 2.25rem;">Predictable, Transparent Pricing</h2>
      <p style="margin-top: var(--ai-space-2);">Start building for free. Upgrade to Pro when you need advanced marketing and SaaS templates.</p>
    </div>
    <div class="pricing-grid">
      <!-- Free Plan -->
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
          <li class="pricing-feature-item">✓ 40+ Core UI Primitives</li>
          <li class="pricing-feature-item">✓ Pure Modern CSS Token Engine</li>
          <li class="pricing-feature-item">✓ Light-DOM Custom Elements</li>
          <li class="pricing-feature-item">✓ Public llms.txt & Docs</li>
        </ul>
        <button class="btn btn-outline w-full">Get Started Free</button>
      </div>

      <!-- Pro Plan (Featured) -->
      <div class="pricing-card pricing-featured card-pro">
        <div class="pricing-header">
          <div class="flex justify-between items-center">
            <h3 class="pricing-plan">LLMCSS Pro</h3>
            <span class="badge badge-solid">POPULAR</span>
          </div>
          <p class="text-sm text-secondary">For agencies, AI builders, and fast-moving teams.</p>
          <div class="pricing-amount">
            <span class="pricing-price">$9</span>
            <span class="pricing-period">/ month</span>
          </div>
        </div>
        <ul class="pricing-features">
          <li class="pricing-feature-item">✓ Everything in Starter</li>
          <li class="pricing-feature-item">✓ Themed section templates and page kits</li>
          <li class="pricing-feature-item">✓ Skin-specific composed blocks</li>
          <li class="pricing-feature-item">✓ Dedicated MCP Server Integration</li>
          <li class="pricing-feature-item">✓ Private CLI Token Access</li>
        </ul>
        <button class="btn btn-primary w-full">Upgrade to Pro</button>
      </div>

      <!-- Enterprise Plan -->
      <div class="pricing-card">
        <div class="pricing-header">
          <h3 class="pricing-plan">Team / Enterprise</h3>
          <p class="text-sm text-secondary">For high-scale organizations building agent fleets.</p>
          <div class="pricing-amount">
            <span class="pricing-price">Custom</span>
          </div>
        </div>
        <ul class="pricing-features">
          <li class="pricing-feature-item">✓ Unlimited Team Seats</li>
          <li class="pricing-feature-item">✓ Custom Theme Archetype Design</li>
          <li class="pricing-feature-item">✓ Dedicated SLA & Support</li>
          <li class="pricing-feature-item">✓ Figma Tokens Sync</li>
        </ul>
        <button class="btn btn-outline w-full">Contact Sales</button>
      </div>
    </div>
  </div>
</section>`,
  },
  {
    id: 'footer-multi-col',
    name: 'Multi-Column Modern Footer',
    description: 'Brand statement, navigation columns, and copyright. Columns collapse into an accordion below 768px.',
    category: 'marketing',
    tier: 'free',
    tags: ['footer', 'navigation', 'legal'],
    html: `<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#" class="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          <span>LLMCSS</span>
        </a>
        <p class="footer-blurb">
          High-craft UI library engineered for human developers and autonomous AI agents.
        </p>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false">Product <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content">
          <li><a href="#">Components</a></li>
          <li><a href="#">Marketing Sections</a></li>
          <li><a href="#">SaaS Dashboard</a></li>
          <li><a href="#">Themes</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false">Agentic Tools <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content">
          <li><a href="#">MCP Server</a></li>
          <li><a href="#">CLI Reference</a></li>
          <li><a href="#">llms.txt Specification</a></li>
          <li><a href="#">Agent Rules</a></li>
        </ul>
      </div>
      <div class="footer-col accordion-item">
        <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false">Company <svg class="accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button></h4>
        <ul class="footer-list accordion-content">
          <li><a href="#">About</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 LLMCSS Inc. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="#">GitHub</a>
        <a href="#">Discord</a>
        <a href="#">X (Twitter)</a>
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
    html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="kpi-card is-primary">
    <span class="kpi-label">Monthly Recurring Revenue</span>
    <span class="kpi-value">$124,500</span>
    <span class="kpi-trend is-up">↑ +14.2% from last month</span>
  </div>
  <div class="kpi-card">
    <span class="kpi-label">Active Subscriptions</span>
    <span class="kpi-value">1,482</span>
    <span class="kpi-trend is-up">↑ +8.4%</span>
  </div>
  <div class="kpi-card">
    <span class="kpi-label">Churn Rate</span>
    <span class="kpi-value">1.18%</span>
    <span class="kpi-trend is-down">↓ -0.3% improvement</span>
  </div>
  <div class="kpi-card">
    <span class="kpi-label">Agent Queries / Day</span>
    <span class="kpi-value">4.8M</span>
    <span class="kpi-trend is-up">↑ +42% spike</span>
  </div>
</div>`,
  },
  ungatedById['command-palette-pro'],
  {
    id: 'auth-login-card',
    name: 'Authentication Login Card',
    description: 'Focused login card with email and password fields, forgot password link, and a single primary action.',
    category: 'application',
    tier: 'free',
    tags: ['auth', 'login', 'signup', 'form'],
    html: `<div class="auth-card" style="margin: 0 auto;">
  <div class="text-center" style="margin-bottom: var(--ai-space-6);">
    <h3 class="card-title" style="font-size: 1.5rem;">Welcome back</h3>
    <p class="text-sm text-secondary" style="margin-top: 0.25rem;">Enter your credentials to access your agent workspace.</p>
  </div>
  <form class="flex flex-col gap-4">
    <div class="form-group" style="margin-bottom: 0;">
      <label class="form-label" for="auth-email">Email</label>
      <input type="email" id="auth-email" class="input" placeholder="you@domain.com" required />
    </div>
    <div class="form-group" style="margin-bottom: 0;">
      <div class="flex justify-between items-center">
        <label class="form-label" for="auth-pass">Password</label>
        <a href="#forgot" class="text-xs text-accent">Forgot password?</a>
      </div>
      <input type="password" id="auth-pass" class="input" placeholder="••••••••" required />
    </div>
    <button type="submit" class="btn btn-primary w-full" style="margin-top: var(--ai-space-2);">Sign In</button>
  </form>
  <div class="text-center" style="margin-top: var(--ai-space-6); border-top: 1px solid var(--ai-border); padding-top: var(--ai-space-4);">
    <p class="text-xs text-secondary">Don't have an account? <a href="#signup" class="text-accent font-semibold">Sign up</a></p>
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
    html: `<div class="product-card" style="max-width: 20rem;">
  <div class="product-media">
    <span class="badge badge-solid product-badge-float">NEW ARRIVAL</span>
    <img class="product-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" />
  </div>
  <div class="product-body">
    <h4 class="product-title">Aether Precision Wireless Studio Headphones</h4>
    <span class="product-category">Audio & Acoustics</span>
    <div class="product-price-row">
      <span class="product-price">$349.00</span>
      <span class="product-compare-price">$420.00</span>
    </div>
    <button class="btn btn-primary btn-sm w-full" style="margin-top: var(--ai-space-3);">
      Add to Cart
    </button>
  </div>
</div>`,
  },
  ungatedById['cart-drawer-pro'],
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
    html: `<div class="flex flex-wrap gap-6 items-center" style="padding: var(--ai-space-4);">
  <div class="flex items-center gap-3">
    <span class="spinner spinner-sm"></span>
    <span class="spinner"></span>
    <span class="spinner spinner-lg"></span>
  </div>
  <div class="flex items-center gap-3">
    <div class="spinner-ring"></div>
    <span class="text-xs text-secondary font-mono">Orbital</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="pulse-dot"></span>
    <span class="text-xs font-medium">Connecting</span>
  </div>
  <div class="flex items-center gap-2">
    <span class="pulse-dot pulse-dot-success"></span>
    <span class="text-xs font-medium" style="color: var(--ai-success);">Operational</span>
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
    html: `<div class="grid gap-5" style="max-width: 28rem;">
  <div>
    <div class="flex justify-between text-xs font-medium" style="margin-bottom: 0.375rem;">
      <span>Indeterminate (Network Stream)</span>
      <span class="font-mono text-secondary">Syncing...</span>
    </div>
    <div class="progress progress-indeterminate" role="progressbar" aria-label="Loading" aria-busy="true">
      <div class="progress-bar"></div>
    </div>
  </div>
  <div>
    <div class="flex justify-between text-xs font-medium" style="margin-bottom: 0.375rem;">
      <span>Model Weights Downloaded</span>
      <span class="font-mono">68%</span>
    </div>
    <div class="progress" role="progressbar" aria-label="Upload" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar" style="width: 68%;"></div>
    </div>
  </div>
  <div>
    <div class="flex justify-between text-xs font-medium" style="margin-bottom: 0.375rem;">
      <span>Dataset Chunk Upload</span>
      <span class="font-mono" style="color: var(--ai-success);">Active</span>
    </div>
    <div class="progress progress-striped" role="progressbar" aria-label="Sync" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar progress-bar-success" style="width: 85%;"></div>
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
    html: `<div class="grid gap-4" style="max-width: 24rem;">
  <div class="slider-wrapper">
    <div class="slider-header">
      <label for="temp-slider">Temperature</label>
      <span class="slider-value">0.72</span>
    </div>
    <input type="range" id="temp-slider" class="range" min="0" max="1" step="0.01" value="0.72" />
  </div>
  <div class="slider-wrapper">
    <div class="slider-header">
      <label for="token-slider">Max Output Tokens</label>
      <span class="slider-value">4,096</span>
    </div>
    <input type="range" id="token-slider" class="slider" min="256" max="8192" step="256" value="4096" />
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
    html: `<div class="card" style="max-width: 24rem; padding: var(--ai-space-5);">
  <div class="flex items-center gap-3" style="margin-bottom: var(--ai-space-4);">
    <div class="skeleton skeleton-avatar"></div>
    <div style="flex: 1;">
      <div class="skeleton skeleton-title" style="width: 50%;"></div>
      <div class="skeleton skeleton-text" style="width: 75%; margin-bottom: 0;"></div>
    </div>
  </div>
  <div class="skeleton skeleton-rect" style="height: 7rem; margin-bottom: var(--ai-space-3);"></div>
  <div class="skeleton skeleton-text" style="width: 90%;"></div>
  <div class="skeleton skeleton-text" style="width: 65%;"></div>
</div>`,
  },
  {
    id: 'stepper-flow',
    name: 'Stepper Progress Flow',
    description: 'Multi-step wizard and checkout flow indicator with completed, active, and upcoming stages.',
    category: 'primitive',
    tier: 'free',
    tags: ['stepper', 'wizard', 'navigation', 'progress', 'flow'],
    html: `<div class="stepper" style="max-width: 32rem;">
  <div class="step-item is-completed">
    <div class="step-circle">✓</div>
    <span class="step-label">Account</span>
  </div>
  <div class="step-item is-active">
    <div class="step-circle">2</div>
    <span class="step-label">Workspace</span>
  </div>
  <div class="step-item">
    <div class="step-circle">3</div>
    <span class="step-label">Billing</span>
  </div>
  <div class="step-item">
    <div class="step-circle">4</div>
    <span class="step-label">Complete</span>
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
    html: `<div class="flex flex-wrap gap-4 items-center">
  <fieldset class="segmented" aria-label="Billing period">
    <label class="segmented-btn"><input type="radio" name="billing" class="segmented-input" checked /> Monthly</label>
    <label class="segmented-btn"><input type="radio" name="billing" class="segmented-input" /> Annual (save 20%)</label>
  </fieldset>
  <fieldset class="segmented" aria-label="View">
    <label class="segmented-btn"><input type="radio" name="view" class="segmented-input" checked /> Code</label>
    <label class="segmented-btn"><input type="radio" name="view" class="segmented-input" /> Preview</label>
    <label class="segmented-btn"><input type="radio" name="view" class="segmented-input" /> Docs</label>
  </fieldset>
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
  <div class="popover-anchor popover-toggle">
    <div class="popover">
      <div class="flex items-center gap-2" style="margin-bottom: 0.375rem;">
        <span class="pulse-dot pulse-dot-success"></span>
        <span class="font-semibold text-xs">Agent Worker #4 Active</span>
      </div>
      <p class="text-xs text-secondary" style="margin-bottom: 0.5rem; line-height: 1.4;">Running automated test suite across 34 components.</p>
      <div class="flex justify-between items-center">
        <a href="#" class="text-xs font-medium text-accent">View Stream &rarr;</a>
        <span class="font-mono text-xs text-muted">450ms</span>
      </div>
      <div class="popover-arrow"></div>
    </div>
    <button class="btn btn-outline btn-sm" aria-haspopup="true">Cluster status</button>
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
    html: `<div class="grid gap-3" style="max-width: 24rem;">
  <div class="toast toast-success toast-countdown">
    <span class="toast-message">Deployment completed to edge servers.</span>
    <button class="toast-close">&times;</button>
    <div class="toast-progress"></div>
  </div>
  <div class="toast toast-info toast-countdown">
    <span class="toast-message">New API Key created: <code>llmcss_live_8f...</code></span>
    <button class="toast-close">&times;</button>
    <div class="toast-progress"></div>
  </div>
</div>`,
  },
  {
    id: 'marquee-ticker',
    name: 'Logo Rail',
    description: 'Static, scannable trust rail of customer names or marks. Wraps on small screens. No auto-scroll (Law 9).',
    category: 'marketing',
    tier: 'free',
    tags: ['logo', 'trust', 'social-proof', 'marketing', 'rail', 'marquee'],
    html: `<div class="logo-rail" aria-label="Teams using LLMCSS">
  <span>Northwind</span>
  <span>Harbor Ops</span>
  <span>Lattice Labs</span>
  <span>Quill</span>
  <span>Meridian</span>
  <span>Fieldnote</span>
</div>`,
  },
  {
    id: 'filter-toolbar',
    name: 'Filter Toolbar & Pill Tags',
    description: 'Application filter header with quick-select pill tags, search field, and sort control.',
    category: 'application',
    tier: 'free',
    tags: ['filter', 'toolbar', 'tags', 'search', 'application'],
    html: `<div class="filter-toolbar">
  <div class="filter-tags">
    <span class="text-xs font-medium text-muted" style="margin-right: 0.25rem;">Filter:</span>
    <button class="filter-tag is-active">All (48)</button>
    <button class="filter-tag">Production</button>
    <button class="filter-tag">Staging</button>
    <button class="filter-tag">Failed</button>
  </div>
  <div class="flex items-center gap-2">
    <input type="text" class="input" placeholder="Filter jobs..." style="height: 1.875rem; font-size: 0.75rem; width: 10rem;" />
    <select class="select" style="height: 1.875rem; font-size: 0.75rem; padding: 0 1.5rem 0 0.5rem;">
      <option>Latest</option>
      <option>Oldest</option>
      <option>Duration</option>
    </select>
  </div>
</div>`,
  },
  ungatedById['bento-editorial-pro'],
  ungatedById['pricing-matrix-pro'],
  ungatedById['chat-thread'],
  ungatedById['tool-trace'],
  ungatedById['approval-bar'],
  ungatedById['thought-chain'],
  ungatedById['agent-workspace'],
  ungatedById['mcp-widget-shell'],
  ungatedById['streaming-status'],
  ungatedById['citation-list'],
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
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
    <li class="breadcrumb-item"><a href="#">Projects</a></li>
    <li class="breadcrumb-item"><a href="#">Design System</a></li>
    <li class="breadcrumb-item is-current" aria-current="page">Components</li>
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
    html: `<div class="flex gap-6 items-center">
  <span class="tooltip" data-tooltip="Edit this item">
    <button class="btn btn-outline btn-sm" aria-describedby="tip-edit">Hover me (top)</button>
    <span class="sr-only" id="tip-edit" role="tooltip">Edit this item</span>
  </span>
  <span class="tooltip tooltip-bottom" data-tooltip="Save changes">
    <button class="btn btn-secondary btn-sm" aria-describedby="tip-save">Hover me (bottom)</button>
    <span class="sr-only" id="tip-save" role="tooltip">Save changes</span>
  </span>
  <span class="tooltip" data-tooltip="Keyboard accessible too">
    <button class="btn btn-ghost btn-sm" aria-describedby="tip-focus">Focus me</button>
    <span class="sr-only" id="tip-focus" role="tooltip">Keyboard accessible too</span>
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
  <ul class="pagination">
    <li class="pagination-item">
      <a href="#" class="pagination-link is-disabled" aria-disabled="true" tabindex="-1">&larr; Prev</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-link is-active" aria-current="page">1</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-link">2</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-link">3</a>
    </li>
    <li class="pagination-item">
      <span class="pagination-ellipsis">...</span>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-link">12</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-link">Next &rarr;</a>
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
  <p class="text-sm text-secondary">Content above the divider.</p>
  <div class="divider"></div>
  <p class="text-sm text-secondary">Content below the plain divider.</p>
  <div class="divider">or continue with</div>
  <p class="text-sm text-secondary">Content below the labeled divider.</p>
  <div class="flex items-center gap-4" style="margin-top: var(--ai-space-6);">
    <span class="text-sm">Item A</span>
    <span class="divider-vertical"></span>
    <span class="text-sm">Item B</span>
    <span class="divider-vertical"></span>
    <span class="text-sm">Item C</span>
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
  <div class="form-group">
    <label class="form-label" for="bio-field">Bio</label>
    <div class="textarea-group">
      <textarea id="bio-field" class="textarea" placeholder="Write a short bio..." rows="4" maxlength="280">Design engineer building component systems for autonomous agents.</textarea>
      <div class="textarea-footer">
        <span class="form-hint">Keep it concise and direct.</span>
        <span class="font-mono" style="font-size: 0.6875rem;">63 / 280</span>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label class="form-label is-required" for="feedback-field">Feedback</label>
    <textarea id="feedback-field" class="textarea is-error" placeholder="Describe the issue..." rows="3" aria-invalid="true">Too short</textarea>
    <span class="form-error">Feedback must be at least 20 characters.</span>
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
    html: `<div class="flex gap-12" style="max-width: 32rem;">
  <div>
    <span class="form-label" style="margin-bottom: var(--ai-space-3); display: block;">Notifications</span>
    <div style="display: flex; flex-direction: column; gap: var(--ai-space-3);">
      <label class="checkbox">
        <input type="checkbox" class="checkbox-input" checked />
        Email notifications
      </label>
      <label class="checkbox">
        <input type="checkbox" class="checkbox-input" checked />
        Push notifications
      </label>
      <label class="checkbox">
        <input type="checkbox" class="checkbox-input" />
        SMS alerts
      </label>
    </div>
  </div>
  <div>
    <span class="form-label" style="margin-bottom: var(--ai-space-3); display: block;">Plan</span>
    <div class="radio-group">
      <label class="radio">
        <input type="radio" name="plan" class="radio-input" checked />
        Community (Free)
      </label>
      <label class="radio">
        <input type="radio" name="plan" class="radio-input" />
        Pro ($9/mo)
      </label>
      <label class="radio">
        <input type="radio" name="plan" class="radio-input" />
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
    html: `<div class="empty-state" style="border: 1px dashed var(--ai-border); border-radius: var(--ai-radius-lg);">
  <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
  <h3 class="empty-state-title">No documents yet</h3>
  <p class="empty-state-description">
    Create your first document to get started. Documents are automatically saved and synced across your workspace.
  </p>
  <button class="btn btn-primary btn-sm">Create Document</button>
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
  <nav class="sidebar" style="height: auto; border: 1px solid var(--ai-border); border-radius: var(--ai-radius-lg); overflow: hidden;">
    <div class="sidebar-header">
      <span class="font-semibold" style="font-size: 0.9375rem;">Workspace</span>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-section">
        <span class="sidebar-section-title">Main</span>
        <a href="#" class="sidebar-item is-active" aria-current="page">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
          <span class="sidebar-badge">12</span>
        </a>
        <a href="#" class="sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Documents
        </a>
        <a href="#" class="sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Activity
          <span class="sidebar-badge">3</span>
        </a>
      </li>
      <li class="sidebar-section">
        <span class="sidebar-section-title">Account</span>
        <a href="#" class="sidebar-item">
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
    html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="kpi-card is-primary">
    <span class="kpi-label">Total Revenue</span>
    <span class="kpi-value">$48,290</span>
    <span class="kpi-trend is-up">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      +12.3% vs last month
    </span>
  </div>
  <div class="kpi-card">
    <span class="kpi-label">Active Users</span>
    <span class="kpi-value">2,847</span>
    <span class="kpi-trend is-up">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      +8.1% vs last month
    </span>
  </div>
  <div class="kpi-card">
    <span class="kpi-label">Bounce Rate</span>
    <span class="kpi-value">24.6%</span>
    <span class="kpi-trend is-down">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
      -3.2% vs last month
    </span>
  </div>
  <div class="kpi-card">
    <span class="kpi-label">Avg. Session</span>
    <span class="kpi-value">4m 32s</span>
    <span class="kpi-trend is-up">
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
    html: `<div class="notification-list" style="max-width: 28rem;">
  <div class="notification-item is-unread">
    <span class="notification-dot"></span>
    <div class="notification-content">
      <p class="notification-title">Deployment completed successfully</p>
      <p class="notification-meta">Production environment - 2 minutes ago</p>
    </div>
  </div>
  <div class="notification-item is-unread">
    <span class="notification-dot"></span>
    <div class="notification-content">
      <p class="notification-title">New team member joined the workspace</p>
      <p class="notification-meta">Sarah Chen accepted the invite - 15 minutes ago</p>
    </div>
  </div>
  <div class="notification-item">
    <span class="notification-dot is-read"></span>
    <div class="notification-content">
      <p class="notification-title">Weekly usage report ready</p>
      <p class="notification-meta">Analytics - 2 hours ago</p>
    </div>
  </div>
  <div class="notification-item">
    <span class="notification-dot is-read"></span>
    <div class="notification-content">
      <p class="notification-title">SSL certificate renewed</p>
      <p class="notification-meta">Infrastructure - Yesterday at 11:42 AM</p>
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
    html: `<div class="flex flex-wrap gap-4 items-center">
  <span class="flex items-center gap-1"><kbd class="kbd">⌘</kbd><kbd class="kbd">K</kbd><span class="text-xs text-muted">Command palette</span></span>
  <span class="flex items-center gap-1"><kbd class="kbd">⌘</kbd><kbd class="kbd">Enter</kbd><span class="text-xs text-muted">Submit</span></span>
  <span class="flex items-center gap-1"><kbd class="kbd">Esc</kbd><span class="text-xs text-muted">Dismiss</span></span>
</div>`,
  },
  {
    id: 'quote-pull',
    name: 'Pull Quote',
    description: 'Editorial quote with a single left rule. Title face comes from the font switcher, not the theme.',
    category: 'primitive',
    tier: 'free',
    tags: ['quote', 'blockquote', 'editorial', 'testimonial'],
    html: `<blockquote class="quote">
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
    html: `<pre class="code-block"><code>npx llmcss add quote-pull
npx llmcss add kbd-shortcuts</code></pre>`,
  },
  {
    id: 'file-dropzone',
    name: 'File Dropzone',
    description: 'Dashed upload well for attachments and dataset drops.',
    category: 'primitive',
    tier: 'free',
    tags: ['upload', 'file', 'dropzone', 'form'],
    html: `<label class="dropzone" for="dropzone-file">
  <strong style="color: var(--ai-text-primary);">Drop a file</strong>
  <span class="text-xs">PNG, JSON, or CSV up to 8MB</span>
  <span class="btn btn-outline btn-sm" style="margin-top: var(--ai-space-2);">Browse</span>
  <input id="dropzone-file" type="file" class="sr-only" multiple />
</label>`,
  },
  {
    id: 'timeline-log',
    name: 'Timeline Log',
    description: 'Vertical event log with pips. For deploys, agent steps, and audit trails.',
    category: 'application',
    tier: 'free',
    tags: ['timeline', 'log', 'history', 'activity'],
    html: `<ol class="timeline">
  <li class="timeline-item">
    <div class="timeline-title">Registry published</div>
    <div class="timeline-meta">origin · 2m ago</div>
  </li>
  <li class="timeline-item">
    <div class="timeline-title">Token issued</div>
    <div class="timeline-meta">polar webhook · 18m ago</div>
  </li>
  <li class="timeline-item">
    <div class="timeline-title">Pro component added</div>
    <div class="timeline-meta">tool-trace · yesterday</div>
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
    html: `<div class="btn-group">
  <button class="btn btn-primary" type="button">Deploy</button>
  <button class="btn btn-primary btn-icon" type="button" aria-label="More deploy options" aria-haspopup="true" aria-expanded="false">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
  </button>
</div>`,
  },
  {
    id: 'page-header',
    name: 'Dashboard Page Header',
    description: 'Title, short meta, and a pair of actions for app pages.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'header', 'page', 'toolbar', 'app'],
    html: `<div class="page-header">
  <div>
    <h1>Overview</h1>
    <p class="page-header-meta">Workspace production · last deploy 14m ago</p>
  </div>
  <div class="flex gap-2">
    <button class="btn btn-outline btn-sm" type="button">Export</button>
    <button class="btn btn-primary btn-sm" type="button">New report</button>
  </div>
</div>`,
  },
  {
    id: 'app-topbar',
    name: 'App Top Bar',
    description: 'Search field, muted count, and avatar for the dashboard chrome.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'topbar', 'search', 'header', 'app'],
    html: `<div class="topbar">
  <input class="input" type="search" placeholder="Search resources..." aria-label="Search" />
  <span class="text-xs text-muted" style="white-space: nowrap;">12 unread</span>
  <span class="avatar avatar-sm" aria-hidden="true">AC</span>
</div>`,
  },
  {
    id: 'quota-meter',
    name: 'Quota Meter',
    description: 'Used vs limit with a determinate bar. One metric, tabular numbers.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'quota', 'usage', 'progress', 'storage'],
    html: `<div class="quota" style="max-width: 24rem;">
  <div class="quota-head">
    <span>Build minutes</span>
    <strong>1,240 / 2,000</strong>
  </div>
  <div class="progress"><div class="progress-bar" style="width: 62%;"></div></div>
  <span class="text-xs text-muted">Resets on the 1st</span>
</div>`,
  },
  {
    id: 'spark-stat',
    name: 'Sparkline Stat',
    description: 'One dominant KPI with a 7-day sparkline. Do not stamp four identical tiles.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'kpi', 'sparkline', 'chart', 'metric'],
    html: `<div class="spark-stat" style="max-width: 28rem;">
  <div>
    <span class="kpi-label">Requests</span>
    <div class="kpi-value">128k</div>
    <span class="kpi-trend is-up">+9.4% vs last week</span>
  </div>
  <svg class="spark" viewBox="0 0 120 40" fill="none" aria-hidden="true">
    <polyline points="0,28 17,24 34,26 51,18 68,20 85,12 102,14 120,8" stroke="currentColor" stroke-width="1.75" />
  </svg>
</div>`,
  },
  {
    id: 'donut-stat',
    name: 'Donut Stat',
    description: 'Single completion ring using a conic gradient. Center is the number.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'donut', 'chart', 'progress', 'metric'],
    html: `<div class="donut-wrap">
  <div class="donut" aria-hidden="true"><div class="donut-hole">68%</div></div>
  <div>
    <div class="font-semibold">Job success</div>
    <p class="text-sm text-secondary" style="margin: 0.25rem 0 0;">1,024 of 1,504 runs finished clean this week.</p>
  </div>
</div>`,
  },
  {
    id: 'settings-list',
    name: 'Settings List',
    description: 'Stacked preference rows: title, hint, and a switch. No nested cards.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'settings', 'form', 'switch', 'list'],
    html: `<div class="settings-list" style="max-width: 32rem;">
  <div class="settings-row">
    <div>
      <div class="font-medium">Deploy previews</div>
      <p class="text-secondary">Open a preview URL on every push to main.</p>
    </div>
    <label class="switch"><input type="checkbox" class="switch-input" checked /><span class="switch-track"><span class="switch-thumb"></span></span></label>
  </div>
  <div class="settings-row">
    <div>
      <div class="font-medium">Failure mail</div>
      <p class="text-secondary">Email the owner when a run exits non-zero.</p>
    </div>
    <label class="switch"><input type="checkbox" class="switch-input" /><span class="switch-track"><span class="switch-thumb"></span></span></label>
  </div>
  <div class="settings-row">
    <div>
      <div class="font-medium">Public registry</div>
      <p class="text-secondary">Allow anonymous reads of free components.</p>
    </div>
    <label class="switch"><input type="checkbox" class="switch-input" checked /><span class="switch-track"><span class="switch-thumb"></span></span></label>
  </div>
</div>`,
  },
  {
    id: 'log-console',
    name: 'Log Console',
    description: 'Dense monospace run log with level color and tabular timestamps.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'log', 'console', 'terminal', 'ops'],
    html: `<pre class="log" style="max-width: 36rem;"><code><span class="log-line"><span class="log-ts">14:02:11</span> <span class="log-ok">ok</span> registry built 60 components</span>
<span class="log-line"><span class="log-ts">14:02:18</span> <span class="log-ok">ok</span> origin sync public_html</span>
<span class="log-line"><span class="log-ts">14:03:02</span> <span class="log-warn">warn</span> cf cache still hot on /r/*</span>
<span class="log-line"><span class="log-ts">14:03:41</span> <span class="log-err">fail</span> polar webhook 403 (bot fight)</span></code></pre>`,
  },
  {
    id: 'health-grid',
    name: 'Service Health',
    description: 'Mixed service statuses with 6px pips. Not four identical KPI tiles.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'health', 'status', 'ops', 'monitor'],
    html: `<div class="health" style="max-width: 28rem;">
  <div class="health-row">
    <span class="health-name"><span class="pip pip-ok"></span> Origin</span>
    <span class="text-xs text-muted">200 · 41ms</span>
  </div>
  <div class="health-row">
    <span class="health-name"><span class="pip pip-ok"></span> Registry</span>
    <span class="text-xs text-muted">200 · 18ms</span>
  </div>
  <div class="health-row">
    <span class="health-name"><span class="pip pip-warn"></span> Webhook</span>
    <span class="text-xs text-muted">retry in 12s</span>
  </div>
  <div class="health-row">
    <span class="health-name"><span class="pip pip-err"></span> Object store</span>
    <span class="text-xs text-muted">timeout</span>
  </div>
</div>`,
  },
  {
    id: 'kanban-column',
    name: 'Kanban Column',
    description: 'One board column with compact work items. Items are rows, not nested cards.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'kanban', 'board', 'tasks', 'workflow'],
    html: `<div class="kanban">
  <div class="kanban-head"><span>In review</span><span class="text-muted">3</span></div>
  <div class="kanban-item">Quota meter CSS <span class="text-xs text-muted">#184</span></div>
  <div class="kanban-item">Polar zip download <span class="text-xs text-muted">#191</span></div>
  <div class="kanban-item">Account dark flash <span class="text-xs text-muted">#203</span></div>
</div>`,
  },
  {
    id: 'inbox-list',
    name: 'Inbox List',
    description: 'Ticket or message rows with unread weight and timestamps.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'inbox', 'list', 'tickets', 'support'],
    html: `<div style="max-width: 32rem;">
  <div class="inbox-item is-unread">
    <span class="pip pip-ok"></span>
    <div>
      <div class="inbox-title">Build failed on main</div>
      <div class="text-xs text-muted">origin · php -l api/lib.php</div>
    </div>
    <span class="text-xs text-muted">2m</span>
  </div>
  <div class="inbox-item is-unread">
    <span class="pip"></span>
    <div>
      <div class="inbox-title">Seat request from acme</div>
      <div class="text-xs text-muted">billing</div>
    </div>
    <span class="text-xs text-muted">1h</span>
  </div>
  <div class="inbox-item">
    <span class="pip pip-ok"></span>
    <div>
      <div class="inbox-title">Certificate renewed</div>
      <div class="text-xs text-muted">infra</div>
    </div>
    <span class="text-xs text-muted">1d</span>
  </div>
</div>`,
  },
  {
    id: 'bar-chart',
    name: 'Distribution Bars',
    description: 'Horizontal bars for a breakdown. Labels plus tabular percents.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'chart', 'bars', 'analytics'],
    html: `<div class="bars" style="max-width: 28rem;">
  <div class="bar-row"><span>Free CLI</span><div class="bar-track"><div class="bar-fill" style="width: 62%;"></div></div><span>62%</span></div>
  <div class="bar-row"><span>Gallery</span><div class="bar-track"><div class="bar-fill" style="width: 24%;"></div></div><span>24%</span></div>
  <div class="bar-row"><span>MCP</span><div class="bar-track"><div class="bar-fill" style="width: 14%;"></div></div><span>14%</span></div>
</div>`,
  },
  {
    id: 'detail-list',
    name: 'Resource Detail',
    description: 'Definition list for an entity: id, region, owner, updated.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'detail', 'definition', 'meta'],
    html: `<dl class="detail" style="max-width: 28rem;">
  <dt>ID</dt><dd>prj_8f2c1a</dd>
  <dt>Region</dt><dd>syd-1</dd>
  <dt>Owner</dt><dd>ops@llmcss.io</dd>
  <dt>Updated</dt><dd>2026-09-12 14:03</dd>
</dl>`,
  },
  {
    id: 'date-range',
    name: 'Date Range Fields',
    description: 'From and to inputs for dashboard filters.',
    category: 'application',
    tier: 'free',
    tags: ['dashboard', 'date', 'filter', 'form', 'range'],
    html: `<div class="flex gap-3 flex-wrap" style="max-width: 28rem;">
  <label class="form-group" style="flex: 1;">
    <span class="form-label">From</span>
    <input class="input" type="date" value="2026-09-01" />
  </label>
  <label class="form-group" style="flex: 1;">
    <span class="form-label">To</span>
    <input class="input" type="date" value="2026-09-12" />
  </label>
</div>`,
  },
  {
    id: 'collapse-details',
    name: 'Collapse',
    description: 'Single collapsible section on native details and summary. Opens and closes with no JavaScript; the chevron rotates on [open].',
    category: 'primitive',
    tier: 'free',
    tags: ['collapse', 'details', 'disclosure', 'toggle', 'css-only'],
    html: `<details class="collapse" style="max-width: 32rem;">
  <summary>Advanced deployment options</summary>
  <div class="collapse-body">
    Region pinning, canary percentage, and rollback window. These apply to this service only and do not change organisation defaults.
  </div>
</details>`,
  },
  {
    id: 'carousel-snap',
    name: 'Carousel',
    description: 'Scroll-snap carousel: swipe on touch, scroll wheel or arrow keys on desktop. Set --ai-carousel-item to show a peek of the next slide.',
    category: 'primitive',
    tier: 'free',
    tags: ['carousel', 'slider', 'scroll-snap', 'gallery', 'css-only'],
    html: `<div class="carousel carousel-peek" tabindex="0" aria-label="Release highlights" style="--ai-carousel-item: 72%; max-width: 40rem;">
  <article class="card" style="padding: var(--ai-space-6);">
    <h3 class="card-title">Edge caching</h3>
    <p class="text-sm text-secondary" style="margin-top: var(--ai-space-2);">Static assets served from 34 regions. Median time to first byte dropped to 38 ms.</p>
  </article>
  <article class="card" style="padding: var(--ai-space-6);">
    <h3 class="card-title">Preview environments</h3>
    <p class="text-sm text-secondary" style="margin-top: var(--ai-space-2);">Every pull request gets a URL. Expires seven days after merge.</p>
  </article>
  <article class="card" style="padding: var(--ai-space-6);">
    <h3 class="card-title">Audit log export</h3>
    <p class="text-sm text-secondary" style="margin-top: var(--ai-space-2);">Stream events to your SIEM. JSON lines, hourly rotation.</p>
  </article>
</div>`,
  },
  {
    id: 'floating-label',
    name: 'Floating Label Field',
    description: 'Label sits inside the field and floats up on focus or when a value is present. Pure CSS via :placeholder-shown; the placeholder must be a single space.',
    category: 'primitive',
    tier: 'free',
    tags: ['form', 'input', 'label', 'floating', 'css-only'],
    html: `<form class="flex flex-col gap-4" style="max-width: 24rem;">
  <div class="form-float">
    <input id="fl-email" class="input" type="email" placeholder=" " autocomplete="email" />
    <label for="fl-email">Work email</label>
  </div>
  <div class="form-float">
    <input id="fl-org" class="input" type="text" placeholder=" " value="Northwind" />
    <label for="fl-org">Organisation</label>
  </div>
  <div class="form-float">
    <select id="fl-region" class="select">
      <option>Sydney</option>
      <option>Singapore</option>
      <option>Frankfurt</option>
    </select>
    <label for="fl-region">Region</label>
  </div>
</form>`,
  },
  {
    id: 'list-group',
    name: 'List Group',
    description: 'Bordered list of rows with hover, active, and disabled states. Rows can be links or buttons.',
    category: 'primitive',
    tier: 'free',
    tags: ['list', 'group', 'rows', 'navigation'],
    html: `<ul class="list-group" style="max-width: 24rem;">
  <li><a href="#" class="list-group-item is-active">Overview <span class="badge badge-counter ml-auto">3</span></a></li>
  <li><a href="#" class="list-group-item">Deployments</a></li>
  <li><a href="#" class="list-group-item">Environment variables</a></li>
  <li><a href="#" class="list-group-item is-disabled" aria-disabled="true">Billing (owner only)</a></li>
</ul>`,
  },
  {
    id: 'btn-group',
    name: 'Button Group',
    description: 'Joined buttons that share one border and radius. Works for view switches and paired actions.',
    category: 'primitive',
    tier: 'free',
    tags: ['button', 'group', 'toolbar', 'segmented'],
    html: `<div class="flex flex-wrap gap-6 items-center">
  <div class="btn-group" role="group" aria-label="View">
    <button type="button" class="btn btn-outline btn-sm">Day</button>
    <button type="button" class="btn btn-outline btn-sm">Week</button>
    <button type="button" class="btn btn-outline btn-sm">Month</button>
  </div>
  <div class="btn-group" role="group" aria-label="Deploy">
    <button type="button" class="btn btn-primary">Deploy</button>
    <button type="button" class="btn btn-primary btn-icon" aria-label="Deploy options" aria-haspopup="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
  </div>
</div>`,
  },
  {
    id: 'level-bar',
    name: 'Level',
    description: 'One row with a left cluster and a right cluster, vertically centred. The workhorse for page and card headers.',
    category: 'primitive',
    tier: 'free',
    tags: ['level', 'layout', 'header', 'row', 'flex'],
    html: `<div class="level" style="padding: var(--ai-space-4) 0; border-bottom: 1px solid var(--ai-border);">
  <div class="level-left">
    <strong>Invoices</strong>
    <span class="badge badge-neutral">June 2026</span>
  </div>
  <div class="level-right">
    <button type="button" class="btn btn-outline btn-sm">Export</button>
    <button type="button" class="btn btn-primary btn-sm">New invoice</button>
  </div>
</div>`,
  },
  {
    id: 'media-object',
    name: 'Media Object',
    description: 'A figure beside a block of content: avatar and comment, icon and text, thumbnail and summary.',
    category: 'primitive',
    tier: 'free',
    tags: ['media', 'comment', 'avatar', 'layout'],
    html: `<div class="media" style="max-width: 36rem;">
  <div class="media-figure">
    <div class="avatar" style="background-color: var(--ai-surface-3);">MR</div>
  </div>
  <div class="media-body">
    <div class="level">
      <div class="level-left"><strong>Mia Rahman</strong><span class="text-xs text-muted">2 hours ago</span></div>
    </div>
    <p class="text-sm text-secondary" style="margin-top: var(--ai-space-1);">Rolled back the pricing page to build 412. The variant with the annual toggle was posting the wrong plan id.</p>
  </div>
</div>`,
  },
  {
    id: 'panel-list',
    name: 'Panel',
    description: 'Titled surface with a list body. Header carries an action; the list group inside loses its own border.',
    category: 'primitive',
    tier: 'free',
    tags: ['panel', 'card', 'list', 'container'],
    html: `<div class="panel" style="max-width: 24rem;">
  <div class="panel-header">
    Recent branches
    <button type="button" class="btn btn-ghost btn-xs">View all</button>
  </div>
  <ul class="list-group">
    <li><a href="#" class="list-group-item"><code class="text-xs">fix/session-expiry</code><span class="text-xs text-muted ml-auto">3m</span></a></li>
    <li><a href="#" class="list-group-item"><code class="text-xs">feat/usage-export</code><span class="text-xs text-muted ml-auto">1h</span></a></li>
    <li><a href="#" class="list-group-item"><code class="text-xs">main</code><span class="text-xs text-muted ml-auto">2d</span></a></li>
  </ul>
</div>`,
  },
  {
    id: 'notification-block',
    name: 'Notification',
    description: 'Page-level closable message, larger than an inline alert. Semantic variants tint the surface, never a left stripe.',
    category: 'primitive',
    tier: 'free',
    tags: ['notification', 'message', 'banner', 'dismiss'],
    html: `<div class="flex flex-col gap-4" style="max-width: 36rem;">
  <div class="notification notification-info" role="status">
    <strong>Scheduled maintenance.</strong> The API will be read-only on Saturday 20 September from 02:00 to 02:30 UTC.
    <button type="button" class="close" data-ai-dismiss="toast" aria-label="Dismiss"></button>
  </div>
  <div class="notification notification-success" role="status">
    Your workspace was upgraded. Seats renew on the 1st of each month.
    <button type="button" class="close" aria-label="Dismiss"></button>
  </div>
</div>`,
  },
  {
    id: 'file-input',
    name: 'File Input',
    description: 'Native file input with a styled selector button. Nothing to script; the browser handles the picker.',
    category: 'primitive',
    tier: 'free',
    tags: ['file', 'upload', 'input', 'form', 'css-only'],
    html: `<div class="form-group" style="max-width: 24rem;">
  <label class="form-label" for="report-file">Import CSV</label>
  <input id="report-file" type="file" class="file-input" accept=".csv" />
  <p class="form-hint">Up to 25 MB. First row is treated as the header.</p>
</div>`,
  },
  {
    id: 'title-subtitle',
    name: 'Title and Subtitle',
    description: 'Heading pair for pages and sections: display title with balanced wrapping and a muted subtitle.',
    category: 'primitive',
    tier: 'free',
    tags: ['title', 'heading', 'typography', 'subtitle'],
    html: `<div style="max-width: 36rem;">
  <h2 class="title">Usage and billing</h2>
  <p class="subtitle">Meter reads are final at midnight UTC. Overages are billed with the next invoice.</p>
</div>`,
  },
  {
    id: 'chip-removable',
    name: 'Removable Chips',
    description: 'Filter chips with a remove control. The remove button carries the accessible name; removal itself is your form or script.',
    category: 'primitive',
    tier: 'free',
    tags: ['chip', 'tag', 'badge', 'filter', 'remove'],
    html: `<div class="flex flex-wrap gap-2">
  <span class="badge badge-neutral badge-removable">Region: Sydney <button type="button" class="badge-remove" aria-label="Remove Region: Sydney">&times;</button></span>
  <span class="badge badge-neutral badge-removable">Status: Active <button type="button" class="badge-remove" aria-label="Remove Status: Active">&times;</button></span>
  <span class="badge badge-accent badge-removable">Owner: me <button type="button" class="badge-remove" aria-label="Remove Owner: me">&times;</button></span>
</div>`,
  },
  {
    id: 'select-native',
    name: 'Select',
    description: 'Styled native select with label, hint, and an error state. Multi-select uses the size attribute.',
    category: 'primitive',
    tier: 'free',
    tags: ['select', 'form', 'dropdown', 'input'],
    html: `<div class="flex flex-col gap-4" style="max-width: 24rem;">
  <div class="form-group">
    <label class="form-label" for="sel-plan">Plan</label>
    <select id="sel-plan" class="select">
      <option>Starter</option>
      <option selected>Team</option>
      <option>Enterprise</option>
    </select>
  </div>
  <div class="form-group">
    <label class="form-label" for="sel-region">Data region</label>
    <select id="sel-region" class="select" aria-invalid="true" aria-describedby="sel-region-err">
      <option value="">Choose a region</option>
      <option>Sydney</option>
      <option>Frankfurt</option>
    </select>
    <p class="form-hint" id="sel-region-err" style="color: var(--ai-danger);">A region is required before the first deploy.</p>
  </div>
</div>`,
  },
  {
    id: 'input-icon',
    name: 'Input With Inset Icon',
    description: 'Leading or trailing icon inside the field. The icon is decorative; the label still names the control.',
    category: 'primitive',
    tier: 'free',
    tags: ['input', 'icon', 'search', 'form'],
    html: `<div class="flex flex-col gap-4" style="max-width: 24rem;">
  <div class="input-icon-wrap">
    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    <input class="input" type="search" placeholder="Search deployments" aria-label="Search deployments" />
  </div>
  <div class="input-icon-wrap is-trailing">
    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
    <input class="input" type="date" aria-label="Start date" />
  </div>
</div>`,
  },
  {
    id: 'section-shift',
    name: 'Section',
    description: 'Page section wrapper: consistent vertical rhythm, hairline between sections, optional surface shift. The Law 1 answer to cards inside cards.',
    category: 'marketing',
    tier: 'free',
    tags: ['section', 'layout', 'wrapper', 'spacing'],
    html: `<section class="section" style="--ai-section-padding: var(--ai-space-12);">
  <div class="container">
    <h2 class="section-title">Built for the tools your team already runs</h2>
    <p class="section-lead">One stylesheet, no build step. Works the same in a Rails view, an Astro page, or a plain HTML file an agent wrote this morning.</p>
  </div>
</section>
<section class="section section-shift" style="--ai-section-padding: var(--ai-space-12);">
  <div class="container">
    <h2 class="section-title">Then ship it</h2>
    <p class="section-lead">Every section after the first gets a hairline. Alternate surfaces with section-shift instead of boxing content.</p>
  </div>
</section>`,
  },
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    description: 'Uniform grid of icon, title, and one sentence. Auto-fits columns; no colored icon tiles, no bento spans.',
    category: 'marketing',
    tier: 'free',
    tags: ['features', 'grid', 'icons', 'marketing'],
    html: `<div class="feature-grid">
  <div class="feature-item">
    <span class="feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg></span>
    <h3 class="feature-title">Layered CSS</h3>
    <p class="feature-text">Reset, tokens, base, components, utilities. Override anything without a specificity fight.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg></span>
    <h3 class="feature-title">Container queries</h3>
    <p class="feature-text">Widgets adapt to the panel they sit in, not the viewport.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span>
    <h3 class="feature-title">Validated by the CLI</h3>
    <p class="feature-text">Every class you emit is checked against the real stylesheet before you ship.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></span>
    <h3 class="feature-title">Zero runtime by default</h3>
    <p class="feature-text">Add the 12 KB runtime only when you need modals, drawers, or tabs.</p>
  </div>
</div>`,
  },
  {
    id: 'feature-list',
    name: 'Feature List',
    description: 'Plain checklist of capabilities with a mark. Reads faster than a grid when there are more than six items.',
    category: 'marketing',
    tier: 'free',
    tags: ['features', 'list', 'checklist', 'pricing'],
    html: `<ul class="feature-list" style="max-width: 28rem;">
  <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Unlimited environments per project</li>
  <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Preview URL for every pull request</li>
  <li><span class="mark mark-yes" role="img" aria-label="Included"></span> Audit log with 90 day retention</li>
  <li><span class="mark mark-warn" role="img" aria-label="Limited"></span> SSO on Team and above</li>
  <li><span class="mark mark-no" role="img" aria-label="Not included"></span> Dedicated IP addresses</li>
</ul>`,
  },
  {
    id: 'stats-band',
    name: 'Stats Band',
    description: 'Public-facing numbers with one dominant figure and smaller supporting stats (Law 8). Tabular numerals throughout.',
    category: 'marketing',
    tier: 'free',
    tags: ['stats', 'numbers', 'social-proof', 'metrics', 'band'],
    html: `<div class="stats-band">
  <div class="stat is-primary">
    <div class="stat-value">99.98%</div>
    <div class="stat-label">Uptime over the last 12 months</div>
  </div>
  <div class="stat">
    <div class="stat-value">38 ms</div>
    <div class="stat-label">Median time to first byte</div>
  </div>
  <div class="stat">
    <div class="stat-value">34</div>
    <div class="stat-label">Edge regions</div>
  </div>
</div>`,
  },
  {
    id: 'cta-band',
    name: 'CTA Band',
    description: 'Pre-footer conversion block: one heading, one sentence, primary and secondary actions.',
    category: 'marketing',
    tier: 'free',
    tags: ['cta', 'conversion', 'band', 'signup'],
    html: `<div class="cta-band">
  <h2 class="section-title">Start with the free tier</h2>
  <p class="section-lead" style="margin-inline: auto;">No card required. Upgrade when you need SSO, audit export, or more than three projects.</p>
  <div class="cta-actions">
    <a href="#" class="btn btn-primary btn-lg">Create account</a>
    <a href="#" class="btn btn-outline btn-lg">Talk to sales</a>
  </div>
</div>`,
  },
  {
    id: 'callout-editorial',
    name: 'Editorial Callout',
    description: 'Emphasis block for long-form content: hairlines above and below, a short label, no stripe, no icon (Law 3).',
    category: 'marketing',
    tier: 'free',
    tags: ['callout', 'note', 'editorial', 'aside'],
    html: `<aside class="callout" style="max-width: 40rem;">
  <span class="callout-label">Worth knowing</span>
  Rollbacks restore the previous build and its environment variables together. Secrets rotated after that build are not reverted.
</aside>`,
  },
  {
    id: 'testimonial-grid',
    name: 'Testimonial Grid',
    description: 'Three quotes with name and role. Cards sit on the page surface, one hairline border each, nothing nested.',
    category: 'marketing',
    tier: 'free',
    tags: ['testimonial', 'quote', 'social-proof', 'customers'],
    html: `<div class="testimonial-grid">
  <figure class="testimonial-card">
    <blockquote class="testimonial-quote">We replaced 4,000 lines of utility soup with the registry components and our agent stopped inventing class names.</blockquote>
    <figcaption class="testimonial-author"><strong>Priya Natarajan</strong><span class="text-xs text-muted">Platform lead, Lattice Labs</span></figcaption>
  </figure>
  <figure class="testimonial-card">
    <blockquote class="testimonial-quote">The anti-slop audit caught a pulsing status dot in a PR before a human ever looked at it.</blockquote>
    <figcaption class="testimonial-author"><strong>Tom Okafor</strong><span class="text-xs text-muted">Design engineer, Meridian</span></figcaption>
  </figure>
  <figure class="testimonial-card">
    <blockquote class="testimonial-quote">One link tag in a Rails layout. That was the whole migration.</blockquote>
    <figcaption class="testimonial-author"><strong>Sofia Lindqvist</strong><span class="text-xs text-muted">CTO, Fieldnote</span></figcaption>
  </figure>
</div>`,
  },
  {
    id: 'team-grid',
    name: 'Team Grid',
    description: 'People grid for an about page: photo, name, role. Photos keep a square ratio at every width.',
    category: 'marketing',
    tier: 'free',
    tags: ['team', 'people', 'about', 'grid'],
    html: `<div class="team-grid max-w-3xl">
  <div class="team-member">
    <img class="team-photo" src="https://images.unsplash.com/photo-1770396529113-ba031cbf0cfa?w=480&h=480&auto=format&fit=crop&q=80" alt="Amara Osei" />
    <div class="team-name">Amara Osei</div>
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
    id: 'announcement-bar',
    name: 'Announcement Bar',
    description: 'Single-line bar above the header for a release or notice, with a link and a dismiss control.',
    category: 'marketing',
    tier: 'free',
    tags: ['announcement', 'banner', 'top-bar', 'notice'],
    html: `<div class="announcement" role="region" aria-label="Announcement">
  <span>LLMCSS 0.2 ships the runtime as one script tag.</span>
  <a href="#">Read the changelog</a>
  <button type="button" class="close ml-auto" aria-label="Dismiss announcement" style="color: inherit;"></button>
</div>`,
  },
  {
    id: 'consent-bar',
    name: 'Consent Bar',
    description: 'Fixed bottom bar for cookie consent with accept, reject, and manage actions. Sits above content; not a modal.',
    category: 'marketing',
    tier: 'free',
    tags: ['cookie', 'consent', 'privacy', 'bar'],
    html: `<div class="consent-bar static max-w-2xl" role="region" aria-label="Cookie preferences">
  <span>We use one analytics cookie to count visits. No advertising, no cross-site tracking.</span>
  <div class="consent-actions">
    <button type="button" class="btn btn-ghost btn-sm">Manage</button>
    <button type="button" class="btn btn-outline btn-sm">Reject</button>
    <button type="button" class="btn btn-primary btn-sm">Accept</button>
  </div>
</div>`,
  },
  {
    id: 'faq-section',
    name: 'FAQ Section',
    description: 'Question list on native details. Zero JavaScript; each answer is real copy, not filler.',
    category: 'marketing',
    tier: 'free',
    tags: ['faq', 'questions', 'collapse', 'details', 'css-only'],
    html: `<div style="max-width: 40rem;">
  <h2 class="section-title">Questions</h2>
  <div style="margin-top: var(--ai-space-6);">
    <details class="collapse" style="padding: var(--ai-space-4) 0; border-top: 1px solid var(--ai-border);">
      <summary>Do I need a build step?</summary>
      <div class="collapse-body">No. Link the stylesheet and start writing classes. The CLI and MCP server are optional.</div>
    </details>
    <details class="collapse" style="padding: var(--ai-space-4) 0; border-top: 1px solid var(--ai-border);">
      <summary>What happens when I cancel Pro?</summary>
      <div class="collapse-body">The token stops working at the end of the period. CSS and HTML you already copied stay yours.</div>
    </details>
    <details class="collapse" style="padding: var(--ai-space-4) 0; border-top: 1px solid var(--ai-border); border-bottom: 1px solid var(--ai-border);">
      <summary>Which browsers?</summary>
      <div class="collapse-body">Current Chrome, Edge, Firefox, and Safari. Features like :has() and container queries have been stable in all four since 2023.</div>
    </details>
  </div>
</div>`,
  },
  {
    id: 'product-grid',
    name: 'Product Grid',
    description: 'Listing grid of product cards with a sale badge and a sold-out state. Columns fill by available width.',
    category: 'ecommerce',
    tier: 'free',
    tags: ['product', 'grid', 'listing', 'shop', 'ecommerce'],
    html: `<div class="product-grid">
  <article class="product-card">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=600&auto=format&fit=crop&q=80" alt="Field Notebook" /></div>
    <div class="product-body">
      <div class="level"><h3 class="product-title">Field Notebook</h3><span class="badge badge-sale badge-sm">Sale</span></div>
      <p class="product-price"><span>$18</span> <s class="product-compare-price">$24</s></p>
      <button type="button" class="btn btn-primary btn-sm w-full">Add to cart</button>
    </div>
  </article>
  <article class="product-card">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1502043150060-b01aa3030556?w=600&auto=format&fit=crop&q=80" alt="Wooden Ruler" /></div>
    <div class="product-body">
      <h3 class="product-title">Wooden Ruler</h3>
      <p class="product-price">$32</p>
      <button type="button" class="btn btn-primary btn-sm w-full">Add to cart</button>
    </div>
  </article>
  <article class="product-card is-sold-out">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1629317297639-9201108cca3c?w=600&auto=format&fit=crop&q=80" alt="Desk Mat" /></div>
    <div class="product-body">
      <h3 class="product-title">Desk Mat</h3>
      <p class="product-price">$48</p>
      <button type="button" class="btn btn-outline btn-sm w-full" disabled>Sold out</button>
    </div>
  </article>
</div>`,
  },
  {
    id: 'data-grid',
    name: 'Data Grid',
    description: 'Table with sticky header, sortable column indicators via aria-sort, a select-all checkbox with an indeterminate state, and selected rows via aria-selected.',
    category: 'application',
    tier: 'free',
    tags: ['table', 'grid', 'sort', 'select', 'sticky', 'data'],
    html: `<div class="table-container" style="max-height: 18rem;">
  <table class="table table-hover table-sticky table-compact">
    <thead>
      <tr>
        <th style="width: 2.5rem;"><input type="checkbox" class="checkbox-input" aria-label="Select all" /></th>
        <th aria-sort="descending">Service</th>
        <th aria-sort="none">Region</th>
        <th class="cell-num" aria-sort="none">p95 ms</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr aria-selected="true">
        <td><input type="checkbox" class="checkbox-input" checked aria-label="Select api-gateway" /></td>
        <td>api-gateway</td><td>syd-1</td><td class="cell-num">142</td><td><span class="badge badge-success">Healthy</span></td>
      </tr>
      <tr>
        <td><input type="checkbox" class="checkbox-input" aria-label="Select auth" /></td>
        <td>auth</td><td>syd-1</td><td class="cell-num">88</td><td><span class="badge badge-success">Healthy</span></td>
      </tr>
      <tr>
        <td><input type="checkbox" class="checkbox-input" aria-label="Select billing-worker" /></td>
        <td>billing-worker</td><td>fra-2</td><td class="cell-num">1,204</td><td><span class="badge badge-warning">Degraded</span></td>
      </tr>
      <tr>
        <td><input type="checkbox" class="checkbox-input" aria-label="Select search" /></td>
        <td>search</td><td>sin-1</td><td class="cell-num">210</td><td><span class="badge badge-success">Healthy</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
  },
  {
    id: 'bulk-action-bar',
    name: 'Bulk Action Bar',
    description: 'Sticky bar that appears once rows are selected: count, actions, and a clear control. Uniform border, no colored stripe.',
    category: 'application',
    tier: 'free',
    tags: ['bulk', 'selection', 'actions', 'toolbar', 'table'],
    html: `<div class="bulk-bar" style="position: static; max-width: 40rem;">
  <span class="bulk-bar-count">3 selected</span>
  <button type="button" class="btn btn-ghost btn-xs">Clear</button>
  <div class="bulk-bar-actions">
    <button type="button" class="btn btn-outline btn-sm">Restart</button>
    <button type="button" class="btn btn-outline btn-sm">Scale</button>
    <button type="button" class="btn btn-danger btn-sm">Delete</button>
  </div>
</div>`,
  },
  {
    id: 'tree-view',
    name: 'Tree View',
    description: 'Nested, collapsible tree on native details for files, folders, or resources. Arbitrary depth, no JavaScript.',
    category: 'application',
    tier: 'free',
    tags: ['tree', 'files', 'folders', 'nested', 'details', 'css-only'],
    html: `<ul class="tree" style="max-width: 20rem;">
  <li>
    <details open>
      <summary>src</summary>
      <ul>
        <li>
          <details open>
            <summary>components</summary>
            <ul>
              <li><a href="#" class="tree-leaf is-active">navbar.html</a></li>
              <li><a href="#" class="tree-leaf">footer.html</a></li>
            </ul>
          </details>
        </li>
        <li><a href="#" class="tree-leaf">index.html</a></li>
      </ul>
    </details>
  </li>
  <li>
    <details>
      <summary>public</summary>
      <ul><li><a href="#" class="tree-leaf">llmcss.css</a></li></ul>
    </details>
  </li>
  <li><a href="#" class="tree-leaf">README.md</a></li>
</ul>`,
  },
  {
    id: 'onboarding-checklist',
    name: 'Onboarding Checklist',
    description: 'Setup progress: ordered tasks, a completion bar, and one action per open task.',
    category: 'application',
    tier: 'free',
    tags: ['onboarding', 'checklist', 'setup', 'progress', 'tasks'],
    html: `<div style="max-width: 28rem;">
  <div class="level">
    <strong>Get set up</strong>
    <span class="text-sm text-secondary" data-tabular>2 of 4</span>
  </div>
  <div class="progress progress-sm" role="progressbar" aria-label="Setup progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="margin-top: var(--ai-space-3);"><div class="progress-bar" style="width: 50%;"></div></div>
  <ul class="checklist" style="margin-top: var(--ai-space-4);">
    <li class="checklist-item is-completed"><span class="checklist-mark">1</span><span class="checklist-label">Create your first project</span></li>
    <li class="checklist-item is-completed"><span class="checklist-mark">2</span><span class="checklist-label">Connect a repository</span></li>
    <li class="checklist-item"><span class="checklist-mark">3</span><span class="checklist-label">Add a custom domain</span><button type="button" class="btn btn-outline btn-xs">Add</button></li>
    <li class="checklist-item"><span class="checklist-mark">4</span><span class="checklist-label">Invite a teammate</span><button type="button" class="btn btn-outline btn-xs">Invite</button></li>
  </ul>
</div>`,
  },
  {
    id: 'error-state',
    name: 'Error State',
    description: 'Section-level failure with retry and report actions. Same shape as the empty state, danger tone, no alarm styling.',
    category: 'application',
    tier: 'free',
    tags: ['error', 'failure', 'retry', 'empty-state'],
    html: `<div class="empty-state is-error" style="max-width: 28rem;">
  <div class="empty-state-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
  <h3 class="empty-state-title">Could not load deployments</h3>
  <p class="empty-state-description">The API returned 503 twice. Nothing was changed. Try again, or send the request id to support.</p>
  <div class="flex gap-2 justify-center" style="margin-top: var(--ai-space-4);">
    <button type="button" class="btn btn-primary btn-sm">Retry</button>
    <button type="button" class="btn btn-outline btn-sm">Copy request id</button>
  </div>
</div>`,
  },
  ungatedById['permission-dialog'],
  ungatedById['diff-view'],
  ungatedById['split-pane'],
  ungatedById['prompt-composer'],
  ungatedById['cost-meter'],
  ungatedById['model-picker'],
  ungatedById['run-status-header'],
];

export const components = [...baseComponents, ...extraComponents, ...themedComponents];
