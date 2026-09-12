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

function navLink(href: string, id: string, label: string, cls = 'ai-nav-link', extra = ''): string {
  const active = pageId() === id ? ' is-active' : '';
  return `<a href="${href}" class="${cls}${active}"${extra}>${label}</a>`;
}

function proCtaHtml(licensed: boolean): string {
  if (licensed) {
    return `<a href="/account" class="ai-btn ai-btn-outline ai-btn-xs" id="pro-cta" style="height: 2rem;">Licensed</a>`;
  }
  return `<a href="/api/checkout.php" class="ai-btn ai-btn-primary ai-btn-xs" id="pro-cta" style="height: 2rem;">Get Pro · $9/mo</a>`;
}

export function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-ai-theme', theme);
  localStorage.setItem('cssai-theme', theme);
  document.querySelectorAll('#theme-mode-toggle').forEach((btn) => {
    btn.innerHTML = theme === 'dark' ? SUN : MOON;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
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
    `<div class="ai-input-group">
      <span class="ai-input-addon">${SEARCH_ICON}</span>
      <input type="search" id="${inputId}" class="ai-input" placeholder="${placeholder}" aria-label="${label}" />
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
  return `<button type="button" id="${id}" class="ai-btn ai-btn-outline ai-btn-xs ${extraClass}" data-ai-toggle="drawer" data-ai-target="#core-styler-drawer">Styler</button>`;
}

const NAV: Array<[string, string, string]> = [
  ['/components.html', 'components', 'Components'],
  ['/templates.html', 'templates', 'Templates'],
  ['/quickstart', 'docs', 'Docs'],
  ['/#pricing', 'pricing', 'Pricing'],
  ['/account', 'account', 'Account'],
];

const BRAND = `<a href="/" class="ai-brand">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0;"><rect x="3" y="3" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="9" y="9" width="12" height="12" rx="2.5" fill="currentColor"/></svg>
      <span>LLMCSS</span>
    </a>`;

// Header: ai-navbar from the catalog. Links and the Pro CTA show from lg;
// below that a burger opens the ai-drawer menu. Catalog search drops to its
// own row under md.
function headerHtml(licensed: boolean): string {
  const search = searchHtml();
  return `<div class="ai-container ai-navbar-inner">
    ${BRAND}
    <nav class="ai-hidden ai-lg:flex ai-items-center ai-gap-1" id="desktop-nav" aria-label="Primary">
      ${NAV.map(([href, id, label]) => navLink(href, id, label)).join('\n      ')}
    </nav>
    ${search ? `<div class="site-search ai-w-full ai-order-last ai-md:w-auto ai-md:order-none ai-md:ml-auto">${search}</div>` : ''}
    <div class="ai-flex ai-items-center ai-gap-2 ${search ? 'ai-ml-auto ai-md:ml-0' : 'ai-ml-auto'}">
      ${stylerBtn('open-styler-btn', 'ai-hidden ai-lg:inline-flex')}
      <button type="button" id="theme-mode-toggle" class="ai-btn ai-btn-outline ai-btn-xs ai-btn-icon">${currentTheme() === 'dark' ? SUN : MOON}</button>
      <span class="ai-hidden ai-lg:inline-flex">${proCtaHtml(licensed)}</span>
      <button type="button" class="ai-btn ai-btn-outline ai-btn-xs ai-btn-icon ai-lg:hidden" id="site-menu-btn" data-ai-toggle="drawer" data-ai-target="#site-menu" aria-controls="site-menu" aria-expanded="false" aria-label="Open menu">${BURGER}</button>
    </div>
  </div>`;
}

// Mobile menu: the catalog's mobile-nav-drawer component.
function menuHtml(licensed: boolean): string {
  const cta = licensed
    ? `<a href="/account" class="ai-btn ai-btn-outline ai-w-full">Licensed</a>`
    : `<a href="/api/checkout.php" class="ai-btn ai-btn-primary ai-w-full">Get Pro · $9/mo</a>`;
  const styler = hasStyler()
    ? `<button type="button" id="site-menu-styler-btn" class="ai-btn ai-btn-outline ai-w-full" data-ai-toggle="drawer" data-ai-target="#core-styler-drawer">Styler</button>`
    : '';
  return `<div class="ai-drawer-backdrop" data-ai-dismiss="drawer"></div>
    <div class="ai-drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="ai-drawer-header">
        ${BRAND}
        <button type="button" class="ai-btn ai-btn-ghost ai-btn-icon ai-btn-xs" data-ai-dismiss="drawer" aria-label="Close menu">${CLOSE}</button>
      </div>
      <nav class="ai-drawer-body ai-drawer-nav" aria-label="Primary">
        ${NAV.map(([href, id, label]) => navLink(href, id, label, 'ai-sidebar-item', ' data-ai-dismiss="drawer"')).join('\n        ')}
      </nav>
      <div class="ai-drawer-footer ai-flex ai-gap-2">
        ${styler}
        ${cta}
      </div>
    </div>`;
}

export function footerHtml(): string {
  const s = catalogStats;
  const col = (title: string, items: string[]) => `<div>
        <h4 class="ai-text-xs ai-font-semibold ai-text-muted" style="margin-bottom: var(--ai-space-3);">${title}</h4>
        <ul class="ai-footer-list">
          ${items.map((i) => `<li>${i}</li>`).join('\n          ')}
        </ul>
      </div>`;
  const link = (href: string, label: string) => `<a href="${href}" class="ai-text-secondary">${label}</a>`;
  return `<div class="ai-container ai-footer-grid">
      <div>
        ${BRAND}
        <p class="ai-text-secondary ai-text-xs" style="margin-top: var(--ai-space-3); max-width: 20rem; line-height: 1.6;">Native CSS for agents and humans. MIT core. Pro catalog $9/mo.</p>
        <div class="ai-text-xs ai-text-muted" style="margin-top: var(--ai-space-4);">&copy; 2026 LLMCSS. MIT core.</div>
      </div>
      ${col('Catalog', [
        link('/components.html', `Components (${s.total})`),
        link('/components.html', `Free ${s.free} · Pro ${s.pro}`),
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
        link('/quickstart', '<code class="ai-text-xs">npx llmcss add btn-variants</code>'),
        link('/quickstart', '<code class="ai-text-xs">npx llmcss-mcp</code>'),
      ])}
  </div>`;
}

export function proOfferHtml(): string {
  return `<div class="ai-grid ai-grid-cols-1 ai-md:grid-cols-2 ai-gap-6">
    <div class="ai-card" style="padding: var(--ai-space-8);">
      <div class="ai-flex ai-justify-between ai-items-center">
        <h3 class="ai-card-title">Community</h3>
        <span class="ai-badge ai-badge-neutral">MIT</span>
      </div>
      <div class="ai-pricing-amount" style="margin: var(--ai-space-4) 0;">
        <span class="ai-pricing-price" style="font-size: 2.5rem; font-weight: 700;">$0</span>
        <span class="ai-pricing-period">/ forever</span>
      </div>
      <ul class="ai-pricing-features" style="list-style: none; display: flex; flex-direction: column; gap: var(--ai-space-3); font-size: 0.875rem;">
        <li>Token layer, primitives, docs, gallery</li>
        <li>Free registry and local MCP</li>
        <li><code class="ai-text-xs">npx llmcss add btn-variants</code></li>
      </ul>
      <a href="/components.html" class="ai-btn ai-btn-outline ai-w-full" style="margin-top: var(--ai-space-6);">Browse free components</a>
    </div>
    <div class="ai-card ai-card-pro" style="padding: var(--ai-space-8); border: 1px solid var(--ai-border-strong); box-shadow: var(--ai-shadow-md);">
      <div class="ai-flex ai-justify-between ai-items-center">
        <h3 class="ai-card-title">Pro</h3>
        <span class="ai-badge ai-badge-solid">$9/mo</span>
      </div>
      <div class="ai-pricing-amount" style="margin: var(--ai-space-4) 0;">
        <span class="ai-pricing-price" style="font-size: 2.5rem; font-weight: 700;">$9</span>
        <span class="ai-pricing-period">/ month</span>
      </div>
      <ul class="ai-pricing-features" style="list-style: none; display: flex; flex-direction: column; gap: var(--ai-space-3); font-size: 0.875rem;">
        <li>Token-gated Pro registry</li>
        <li>Zip backup of the Pro catalog</li>
        <li>Monthly Polar subscription. Token is revoked at period end.</li>
      </ul>
      <a href="/api/checkout.php" class="ai-btn ai-btn-primary ai-w-full" style="margin-top: var(--ai-space-6);">Get Pro · $9/mo</a>
    </div>
  </div>
  <p class="ai-text-xs ai-text-muted" style="margin-top: var(--ai-space-8); text-align: center; max-width: 36rem; margin-left: auto; margin-right: auto;">
    Digital goods. Refunds follow Polar policy. MIT core stays free. Checkout via Polar.
  </p>`;
}

export async function mountChrome() {
  const licensed = !!getBrowserToken() && (await validateToken(getBrowserToken())).valid;

  const header = document.getElementById('site-header');
  if (header) {
    header.classList.add('ai-navbar');
    header.innerHTML = headerHtml(licensed);
  }

  let menu = document.getElementById('site-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'site-menu';
    menu.className = 'ai-drawer ai-drawer-sm ai-lg:hidden';
    header?.after(menu);
  }
  menu.innerHTML = menuHtml(licensed);

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.classList.add('ai-footer');
    footer.innerHTML = footerHtml();
  }

  const offer = document.getElementById('pro-offer');
  if (offer) offer.innerHTML = proOfferHtml();

  applyTheme(currentTheme());

  document.getElementById('theme-mode-toggle')?.addEventListener('click', () => {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  // The drawer runtime handles open, close, backdrop, and Escape. Opening the
  // Styler from inside the menu should close the menu first.
  document.getElementById('site-menu-styler-btn')?.addEventListener('click', () => {
    menu?.classList.remove('is-open');
    menu?.removeAttribute('open');
  });
}
