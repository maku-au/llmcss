import { components } from '../registry/components';
import { getBrowserToken, validateToken } from './license';

const MOON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
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

function navLink(href: string, id: string, label: string): string {
  const active = pageId() === id ? ' is-active' : '';
  return `<a href="${href}" class="site-nav-link${active}">${label}</a>`;
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

function searchHtml(): string {
  const id = pageId();
  if (id === 'components') {
    return `<div class="search-bar-wrap">
      <span class="search-icon"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></span>
      <input type="search" id="catalog-search" class="search-input" placeholder="Search ${catalogStats.total} components..." aria-label="Search components" />
    </div>`;
  }
  if (id === 'templates') {
    return `<div class="search-bar-wrap">
      <span class="search-icon"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></span>
      <input type="search" id="template-search" class="search-input" placeholder="Search templates..." aria-label="Search templates" />
    </div>`;
  }
  return '';
}

function stylerBtn(): string {
  if (!document.getElementById('core-styler-drawer')) return '';
  return `<button type="button" id="open-styler-btn" class="ai-btn ai-btn-outline ai-btn-xs" style="height: 2rem;" data-ai-toggle="drawer" data-ai-target="#core-styler-drawer">Styler</button>`;
}

function headerHtml(licensed: boolean): string {
  return `<div class="ai-container site-header-inner">
    <a href="/" class="ai-brand" style="font-size: 1.125rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0;"><rect x="3" y="3" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="9" y="9" width="12" height="12" rx="2.5" fill="currentColor"/></svg>
      <span style="font-family: var(--ai-font-display); font-weight: 800; letter-spacing: -0.03em;">LLMCSS</span>
    </a>
    <nav class="site-nav" id="desktop-nav" aria-label="Primary">
      ${navLink('/components.html', 'components', 'Components')}
      ${navLink('/templates.html', 'templates', 'Templates')}
      ${navLink('/quickstart', 'docs', 'Docs')}
      ${navLink('/#pricing', 'pricing', 'Pricing')}
      ${navLink('/account', 'account', 'Account')}
    </nav>
    <div class="site-header-actions">
      ${searchHtml()}
      ${stylerBtn()}
      <button type="button" id="theme-mode-toggle" class="ai-btn ai-btn-outline ai-btn-xs ai-btn-icon" style="width: 2rem; height: 2rem; padding: 0; display: inline-flex; align-items: center; justify-content: center;">${currentTheme() === 'dark' ? SUN : MOON}</button>
      ${proCtaHtml(licensed)}
      <button type="button" class="ai-btn ai-btn-outline ai-btn-xs site-menu-btn" id="site-menu-btn" aria-label="Open menu" aria-expanded="false">Menu</button>
    </div>
  </div>`;
}

function menuHtml(licensed: boolean): string {
  return `${navLink('/components.html', 'components', 'Components')}
    ${navLink('/templates.html', 'templates', 'Templates')}
    ${navLink('/quickstart', 'docs', 'Docs')}
    ${navLink('/#pricing', 'pricing', 'Pricing')}
    ${navLink('/account', 'account', 'Account')}
    ${licensed ? `<a href="/account" class="ai-btn ai-btn-outline">Licensed</a>` : `<a href="/api/checkout.php" class="ai-btn ai-btn-primary">Get Pro · $9/mo</a>`}`;
}

export function footerHtml(): string {
  const s = catalogStats;
  return `<div class="ai-container" style="max-width: 1440px;">
    <div class="ai-footer-grid">
      <div>
        <a href="/" class="ai-brand" style="font-size: 1.25rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="2"/><rect x="9" y="9" width="12" height="12" rx="2.5" fill="currentColor"/></svg>
          <span style="font-family: var(--ai-font-display); font-weight: 800; letter-spacing: -0.03em;">LLMCSS</span>
        </a>
        <p class="ai-text-secondary ai-text-xs" style="margin-top: var(--ai-space-3); max-width: 20rem; line-height: 1.6;">Native CSS for agents and humans. MIT core. Pro catalog $9/mo.</p>
        <div class="ai-text-xs ai-text-muted" style="margin-top: var(--ai-space-4);">&copy; 2026 LLMCSS. MIT core.</div>
      </div>
      <div>
        <span class="ai-font-semibold ai-text-xs ai-text-muted">Catalog</span>
        <ul>
          <li><a href="/components.html" class="site-nav-link" style="padding: 0;">Components (${s.total})</a></li>
          <li><a href="/components.html" class="site-nav-link" style="padding: 0;">Free ${s.free} · Pro ${s.pro}</a></li>
          <li><a href="/templates.html" class="site-nav-link" style="padding: 0;">Templates</a></li>
          <li><a href="/#pricing" class="site-nav-link" style="padding: 0;">Pricing</a></li>
        </ul>
      </div>
      <div>
        <span class="ai-font-semibold ai-text-xs ai-text-muted">Docs</span>
        <ul>
          <li><a href="/quickstart" class="site-nav-link" style="padding: 0;">Quickstart</a></li>
          <li><a href="/account" class="site-nav-link" style="padding: 0;">Account</a></li>
          <li><a href="/llms.txt" class="site-nav-link" style="padding: 0;">llms.txt</a></li>
          <li><a href="https://github.com/maku-au/llmcss" class="site-nav-link" style="padding: 0;">GitHub</a></li>
        </ul>
      </div>
      <div>
        <span class="ai-font-semibold ai-text-xs ai-text-muted">CLI</span>
        <ul>
          <li><a href="/quickstart" class="site-nav-link" style="padding: 0;"><code class="ai-text-xs">npx llmcss add btn-variants</code></a></li>
          <li><a href="/quickstart" class="site-nav-link" style="padding: 0;"><code class="ai-text-xs">npx llmcss-mcp</code></a></li>
        </ul>
      </div>
    </div>
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
  if (header) header.innerHTML = headerHtml(licensed);

  let menu = document.getElementById('site-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'site-menu';
    menu.className = 'site-menu';
    header?.after(menu);
  }
  menu.innerHTML = menuHtml(licensed);

  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = footerHtml();

  const offer = document.getElementById('pro-offer');
  if (offer) offer.innerHTML = proOfferHtml();

  applyTheme(currentTheme());

  document.getElementById('theme-mode-toggle')?.addEventListener('click', () => {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  const menuBtn = document.getElementById('site-menu-btn');
  menuBtn?.addEventListener('click', () => {
    const open = menu?.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
