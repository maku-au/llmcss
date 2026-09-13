import '../runtime/index';
import { components } from '../registry/components';
import { getBrowserToken, validateToken } from './license';

const MOON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
const BURGER = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>`;
const CLOSE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>`;
const SUN = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

export const catalogStats = (() => {
  const free = components.filter((c) => c.tier === 'free').length;
  const pro = components.filter((c) => c.tier === 'pro').length;
  return {
    total: components.length,
    free,
    pro,
    primitive: components.filter((c) => c.category === 'primitive').length,
    marketing: components.filter((c) => c.category === 'marketing').length,
    application: components.filter((c) => c.category === 'application').length,
    ecommerce: components.filter((c) => c.category === 'ecommerce').length,
  };
})();

function pageId(): string {
  const p = location.pathname;
  if (p.includes('components')) return 'components';
  if (p.includes('templates')) return 'templates';
  if (p.includes('quickstart')) return 'docs';
  if (p.includes('account')) return 'account';
  return 'home';
}

function navLink(href: string, id: string, label: string, cls = 'nav-link', extra = ''): string {
  const active = pageId() === id ? ' is-active' : '';
  return `<a href="${href}" class="${cls}${active}"${extra}>${label}</a>`;
}

function proCtaHtml(licensed: boolean): string {
  if (licensed) {
    return `<a href="/account" class="btn btn-outline btn-sm" id="pro-cta">Licensed</a>`;
  }
  return `<a href="/api/checkout.php" class="btn btn-primary btn-sm" id="pro-cta">Get Pro · $9/mo</a>`;
}

export function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-ai-theme', theme);
  localStorage.setItem('cssai-theme', theme);
  document.querySelectorAll('#theme-mode-toggle').forEach((btn) => {
    btn.innerHTML = theme === 'dark' ? SUN : MOON;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
  document.dispatchEvent(new CustomEvent('ai-theme-change', { detail: { theme } }));
}

export function currentTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem('cssai-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return (document.documentElement.getAttribute('data-ai-theme') as 'light' | 'dark') || 'light';
}

const SEARCH_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;

function searchHtml(): string {
  const id = pageId();
  const field = (inputId: string, placeholder: string, label: string) =>
    `<div class="input-group">
      <span class="input-addon">${SEARCH_ICON}</span>
      <input type="search" id="${inputId}" class="input" placeholder="${placeholder}" aria-label="${label}" />
    </div>`;
  if (id === 'components') return field('catalog-search', `Search ${catalogStats.total} components`, 'Search components');
  if (id === 'templates') return field('template-search', 'Search templates', 'Search templates');
  return '';
}

function hasStyler(): boolean {
  return !!document.getElementById('core-styler-drawer');
}

function stylerBtn(id: string, extraClass = ''): string {
  if (!hasStyler()) return '';
  return `<button type="button" id="${id}" class="btn btn-outline btn-sm ${extraClass}" data-ai-toggle="drawer" data-ai-target="#core-styler-drawer">Styler</button>`;
}

const NAV: Array<[string, string, string]> = [
  ['/components.html', 'components', 'Components'],
  ['/templates.html', 'templates', 'Templates'],
  ['/quickstart', 'docs', 'Docs'],
  ['/#pricing', 'pricing', 'Pricing'],
  ['/account', 'account', 'Account'],
];

const VERSION = typeof __LLMCSS_VERSION__ === 'string' ? __LLMCSS_VERSION__ : '';
const CHANGELOG = 'https://github.com/maku-au/llmcss/blob/main/CHANGELOG.md';
// Version sits between two vertical dividers as plain mono text, not a badge.
const VERSION_BADGE = VERSION
  ? `<span class="hidden md:inline-flex items-center gap-2">
      <span class="divider-vertical"></span>
      <a href="${CHANGELOG}" class="font-mono text-xs text-muted tabular" title="Changelog">v${VERSION}</a>
    </span>`
  : '';

const BRAND = `<a href="/" class="brand">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="9" y="9" width="12" height="12" rx="2.5" fill="currentColor"/></svg>
      <span>LLMCSS</span>
    </a>`;

// Header: navbar from the catalog. Links and the Pro CTA show from lg;
// below that a burger opens the drawer menu. Catalog search drops to its
// own row under md.
function headerHtml(licensed: boolean): string {
  const search = searchHtml();
  return `<div class="container container-w-lg navbar-inner">
    ${BRAND}
    ${VERSION_BADGE}
    <nav class="nav-links hidden lg:flex lg:mx-auto" id="desktop-nav" aria-label="Primary">
      ${NAV.map(([href, id, label]) => navLink(href, id, label)).join('\n      ')}
    </nav>
    ${search ? `<div class="navbar-search w-full order-last md:w-auto md:order-none md:ml-auto lg:ml-0">${search}</div>` : ''}
    <div class="flex items-center gap-2 ${search ? 'ml-auto md:ml-0' : 'ml-auto lg:ml-0'}">
      ${stylerBtn('open-styler-btn', 'hidden lg:inline-flex')}
      <button type="button" id="theme-mode-toggle" class="btn btn-outline btn-sm btn-icon">${currentTheme() === 'dark' ? SUN : MOON}</button>
      <span class="hidden lg:inline-flex">${proCtaHtml(licensed)}</span>
      <button type="button" class="btn btn-outline btn-sm btn-icon lg:hidden" id="site-menu-btn" data-ai-toggle="drawer" data-ai-target="#site-menu" aria-controls="site-menu" aria-expanded="false" aria-label="Open menu">${BURGER}</button>
    </div>
  </div>`;
}

// Mobile menu: the catalog's mobile-nav-drawer component.
function menuHtml(licensed: boolean): string {
  const cta = licensed
    ? `<a href="/account" class="btn btn-outline w-full">Licensed</a>`
    : `<a href="/api/checkout.php" class="btn btn-primary w-full">Get Pro · $9/mo</a>`;
  const styler = hasStyler()
    ? `<button type="button" id="site-menu-styler-btn" class="btn btn-outline w-full" data-ai-toggle="drawer" data-ai-target="#core-styler-drawer">Styler</button>`
    : '';
  return `<div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
    <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="drawer-header">
        ${BRAND}
        <button type="button" class="btn btn-ghost btn-icon btn-sm" data-ai-dismiss="drawer" aria-label="Close menu">${CLOSE}</button>
      </div>
      <nav class="drawer-body drawer-nav" aria-label="Primary">
        ${NAV.map(([href, id, label]) => navLink(href, id, label, 'sidebar-item', ' data-ai-dismiss="drawer"')).join('\n        ')}
      </nav>
      <div class="drawer-footer flex gap-2">
        ${styler}
        ${cta}
      </div>
    </div>`;
}

export function footerHtml(): string {
  const s = catalogStats;
  // Columns collapse into an accordion below 768px (library footer-col pattern).
  const chevron = `<svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
  const col = (title: string, items: string[]) => `<div class="footer-col accordion-item">
          <h4 class="footer-heading"><button type="button" class="footer-col-toggle" data-ai-toggle="accordion" aria-expanded="false">${title} ${chevron}</button></h4>
          <ul class="footer-list accordion-content">
            ${items.map((i) => `<li>${i}</li>`).join('\n            ')}
          </ul>
        </div>`;
  // No colour utility on these links: utilities outrank the components layer,
  // so text-secondary would freeze the hover state. .footer-list a owns both.
  const link = (href: string, label: string) => `<a href="${href}">${label}</a>`;
  const cmd = (href: string, label: string) => `<a href="${href}" class="footer-cmd">${label}</a>`;
  return `<div class="container container-w-lg">
      <div class="footer-grid">
        <div class="footer-brand">
          ${BRAND}
          <p class="footer-blurb">Native CSS for agents and humans. Pro themed kits are $9 a month.</p>
        </div>
        ${col('Catalog', [
          `${link('/components.html', `Components (<span data-ai-stat="total">${s.total}</span>)`)}<span class="footer-stat">Free <span data-ai-stat="free">${s.free}</span> &middot; Pro <span data-ai-stat="pro">${s.pro}</span></span>`,
          link('/templates.html', 'Templates'),
          link('/#pricing', 'Pricing'),
        ])}
        ${col('Docs', [
          link('/quickstart', 'Quickstart'),
          link('/account', 'Account'),
          link('/llms.txt', 'llms.txt'),
          link('https://github.com/maku-au/llmcss', 'GitHub'),
        ])}
        ${col('CLI', [
          cmd('/quickstart', 'npx llmcss add &lt;id&gt;'),
          cmd('/quickstart', 'npx llmcss-mcp'),
          `<span class="footer-stat">Add any component, or run the MCP server.</span>`,
        ])}
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 LLMCSS. Core released under the MIT License.</p>
        ${VERSION ? `<a href="${CHANGELOG}" class="font-mono tabular" title="Changelog">v${VERSION}</a>` : ''}
      </div>
  </div>`;
}

export function proOfferHtml(): string {
  return `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="card p-8">
      <div class="flex justify-between items-center">
        <h3 class="card-title">Community</h3>
        <span class="badge badge-neutral">MIT</span>
      </div>
      <div class="pricing-amount">
        <span class="pricing-price">$0</span>
        <span class="pricing-period">/ forever</span>
      </div>
      <ul class="pricing-features">
        <li>Full component catalog, wireframes, skins</li>
        <li>Free registry and local MCP</li>
        <li><code class="text-xs">npx llmcss add btn-variants</code></li>
      </ul>
      <a href="/components" class="btn btn-outline w-full mt-6">Browse free components</a>
    </div>
    <div class="card card-pro p-8 shadow-md">
      <div class="flex justify-between items-center">
        <h3 class="card-title">Pro</h3>
        <span class="badge badge-solid">$9/mo</span>
      </div>
      <div class="pricing-amount">
        <span class="pricing-price">$9</span>
        <span class="pricing-period">/ month</span>
      </div>
      <ul class="pricing-features">
        <li>Themed section templates and page kits</li>
        <li>Themed composed blocks (editorial, fintech, obsidian)</li>
        <li>Token-gated registry, MCP, and zip backup</li>
      </ul>
      <a href="/api/checkout.php" class="btn btn-primary w-full mt-6">Get Pro · $9/mo</a>
    </div>
  </div>
  <p class="text-xs text-muted mt-8 text-center max-w-xl mx-auto">
    Digital goods. Refunds follow Polar policy. MIT core stays free. Checkout via Polar.
  </p>`;
}

// Focus ring preference: data-ai-focus="accent|neutral|thin|none" on <html>,
// persisted so it survives navigation. The head script applies it before paint.
const FOCUS_LABELS: Record<string, string> = { accent: 'Accent', neutral: 'Neutral', thin: 'Thin', none: 'Off' };

export function applyFocusPreference(value: string) {
  const v = FOCUS_LABELS[value] ? value : 'accent';
  if (v === 'accent') document.documentElement.removeAttribute('data-ai-focus');
  else document.documentElement.setAttribute('data-ai-focus', v);
  localStorage.setItem('cssai-focus', v);
  document.querySelectorAll('.js-styler-focus-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-focus') === v);
  });
  const label = document.getElementById('styler-focus-label');
  if (label) label.textContent = FOCUS_LABELS[v];
}

function bindFocusPreference() {
  applyFocusPreference(localStorage.getItem('cssai-focus') || 'accent');
  document.querySelectorAll('.js-styler-focus-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyFocusPreference(btn.getAttribute('data-focus') || 'accent'));
  });
}

export async function mountChrome() {
  const licensed = !!getBrowserToken() && (await validateToken(getBrowserToken())).valid;

  const header = document.getElementById('site-header');
  if (header) {
    header.classList.add('navbar');
    header.innerHTML = headerHtml(licensed);
  }

  let menu = document.getElementById('site-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'site-menu';
    menu.className = 'drawer drawer-sm lg:hidden';
    header?.after(menu);
  }
  menu.innerHTML = menuHtml(licensed);

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.classList.add('footer');
    footer.innerHTML = footerHtml();
  }

  bindFocusPreference();

  // Catalog numbers in page copy come from the registry, never typed by hand
  document.querySelectorAll<HTMLElement>('[data-ai-stat]').forEach((el) => {
    const key = el.getAttribute('data-ai-stat') as keyof typeof catalogStats;
    if (key in catalogStats) el.textContent = String(catalogStats[key]);
  });

  const offer = document.getElementById('pro-offer');
  if (offer) offer.innerHTML = proOfferHtml();

  applyTheme(currentTheme());

  document.getElementById('theme-mode-toggle')?.addEventListener('click', () => {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  // The drawer runtime handles open, close, backdrop, and Escape. Opening the
  // Styler from inside the menu should close the menu first.
  document.getElementById('site-menu-styler-btn')?.addEventListener('click', () => {
    const api = (window as any).LLMCSS;
    if (api?.close && menu) api.close(menu);
    else { menu?.classList.remove('is-open'); menu?.removeAttribute('open'); }
  });
}
