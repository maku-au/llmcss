import '../css/index.css';
import '../runtime/index';
import {
  wireframeTemplates,
  pageBlueprints,
  assembleBlueprintHtml
} from '../registry/templates';
import type { WireframeTemplate, PageBlueprint } from '../registry/schema';
import { applyDisplayFont, bindFontSwitchers, getActiveFontId } from './fonts';
import { mountChrome, currentTheme } from './chrome';
import { getBrowserToken, setBrowserToken, validateToken } from './license';

// ============================================================================
// STATE DEFINITIONS
// ============================================================================
let activeCategory = 'all';
let activeBlueprintId: string | null = null;
let searchQuery = '';
let currentViewport = 'full';

// Gallery mode. Wireframe lists the free structural sections, Themed lists the Pro styled ones.
const MODE_STORAGE_KEY = 'cssai-template-mode';
let previewMode: 'wireframe' | 'themed' =
  localStorage.getItem(MODE_STORAGE_KEY) === 'themed' ? 'themed' : 'wireframe';

// Theme state persisted in localStorage
let activeSkin = localStorage.getItem('cssai-skin') || 'modern';
let activeTheme = localStorage.getItem('cssai-theme') || document.documentElement.getAttribute('data-ai-theme') || 'light';

// DOM Elements
const templatesStream = document.getElementById('templates-stream');
const blueprintNav = document.getElementById('blueprint-nav');
const blueprintBanner = document.getElementById('blueprint-banner');
const categoryNav = document.getElementById('category-nav');
let searchInput = document.getElementById('template-search') as HTMLInputElement | null;
const skinSwitcher = document.getElementById('skin-switcher') as HTMLSelectElement | null;
let themeToggle = document.getElementById('theme-mode-toggle');
const toastContainer = document.getElementById('toast-container');
const fullPreviewModal = document.getElementById('blueprint-preview-modal');
const fullPreviewContent = document.getElementById('blueprint-preview-content');
const fullPreviewTitle = document.getElementById('blueprint-preview-title');
const proHtmlCache = new Map<string, string>();
const proCssCache = new Map<string, string>();

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================
function showToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
  const toast = document.createElement('div');
  toast.className = `ai-toast ai-toast-${type}`;
  toast.innerHTML = `
    <span class="ai-toast-message">${message}</span>
    <button class="ai-toast-close">&times;</button>
  `;
  toastContainer?.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

function copyToClipboard(text: string, label: string, triggerBtn?: HTMLElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label} to clipboard!`);
    if (triggerBtn) {
      const originalText = triggerBtn.textContent;
      triggerBtn.textContent = '✓ Copied!';
      triggerBtn.style.borderColor = 'var(--ai-accent)';
      setTimeout(() => {
        triggerBtn.textContent = originalText;
        triggerBtn.style.borderColor = '';
      }, 1500);
    }
  }).catch(() => {
    showToast(`Failed to copy to clipboard`, 'error');
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================================
// MODE HELPERS
// Sections and blueprints carry kind: 'themed'. Anything without it is a wireframe.
// ============================================================================
function templateKind(t: WireframeTemplate): 'wireframe' | 'themed' {
  return t.kind === 'themed' ? 'themed' : 'wireframe';
}

function blueprintKind(bp: PageBlueprint): 'wireframe' | 'themed' {
  return bp.kind === 'themed' ? 'themed' : 'wireframe';
}

function templatesInMode(mode: 'wireframe' | 'themed' = previewMode): WireframeTemplate[] {
  return wireframeTemplates.filter((t) => templateKind(t) === mode);
}

// Reflect the current mode on the segmented toggle. The toggle is locked while a
// blueprint is active because the blueprint already decides the mode.
function syncModeButtons() {
  const wireframeCount = document.getElementById('count-mode-wireframe');
  const themedCount = document.getElementById('count-mode-themed');
  if (wireframeCount) wireframeCount.textContent = String(templatesInMode('wireframe').length);
  if (themedCount) themedCount.textContent = String(templatesInMode('themed').length);
  document.querySelectorAll('.preview-mode-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-mode') === previewMode);
    btn.toggleAttribute('disabled', !!activeBlueprintId);
  });
}

// ============================================================================
// GLOBAL THEME & TOKEN ENGINE
// ============================================================================
function applyThemeSettings() {
  const root = document.documentElement;

  // Palette Skin
  if (activeSkin === 'modern') {
    root.removeAttribute('data-ai-skin');
  } else {
    root.setAttribute('data-ai-skin', activeSkin);
  }
  localStorage.setItem('cssai-skin', activeSkin);
  if (skinSwitcher) skinSwitcher.value = activeSkin;

  // Light / Dark Mode
  activeTheme = currentTheme();
  root.setAttribute('data-ai-theme', activeTheme);
  localStorage.setItem('cssai-theme', activeTheme);
  applyDisplayFont(getActiveFontId());
}

// ============================================================================
// BLUEPRINT RECIPES CONTROLLER
// ============================================================================
// One sidebar row per page recipe, free recipes first then the Pro kits, with an
// All sections row at the top that clears the recipe filter.
function renderBlueprintNav() {
  if (!blueprintNav) return;
  const free = pageBlueprints.filter((bp) => blueprintKind(bp) === 'wireframe');
  const pro = pageBlueprints.filter((bp) => blueprintKind(bp) === 'themed');
  const row = (bp: PageBlueprint) => `
    <button type="button" class="ai-docs-nav-btn blueprint-nav-btn${activeBlueprintId === bp.id ? ' is-active' : ''}" data-blueprint="${bp.id}">
      <span>${bp.name}</span>
      <span class="ai-docs-count">${bp.sections.length}</span>
      ${bp.tier === 'pro' ? '<span class="ai-docs-pro-tag">PRO</span>' : ''}
    </button>`;
  blueprintNav.innerHTML = `
    <button type="button" class="ai-docs-nav-btn blueprint-nav-btn${activeBlueprintId ? '' : ' is-active'}" data-blueprint="all">
      <span>All sections</span>
      <span class="ai-docs-count">${templatesInMode().length}</span>
    </button>
    ${free.map(row).join('')}
    ${pro.map(row).join('')}
  `;
}

function renderBlueprintBanner() {
  if (!blueprintBanner) return;

  if (!activeBlueprintId) {
    blueprintBanner.hidden = true;
    blueprintBanner.innerHTML = '';
    return;
  }

  const bp = pageBlueprints.find((b) => b.id === activeBlueprintId);
  if (!bp) return;

  blueprintBanner.hidden = false;
  const locked = bp.tier === 'pro' && !getBrowserToken();
  const cli = `npx llmcss template blueprint ${bp.id}`;
  blueprintBanner.innerHTML = `
    <div class="ai-blueprint-strip">
      <div class="ai-blueprint-strip-main">
        <h2 class="ai-blueprint-strip-title">${bp.name}</h2>
        <p class="ai-blueprint-strip-desc">${bp.recommendedFor} ${bp.sections.length} section${bp.sections.length === 1 ? '' : 's'}, in order.</p>
        <ol class="ai-blueprint-flow">
          ${bp.sections.map((secId, idx) => {
            const sec = wireframeTemplates.find((t) => t.id === secId);
            return `<li><button type="button" class="ai-blueprint-flow-step jump-to-pair" data-jump="${secId}"><span class="ai-blueprint-flow-num">${idx + 1}</span>${sec ? sec.name : secId}</button></li>`;
          }).join('')}
        </ol>
      </div>
      <div class="ai-btn-group ai-blueprint-strip-actions">
        <button type="button" class="ai-btn ai-btn-primary ai-btn-sm" id="preview-blueprint-full-btn">Preview page</button>
        <button type="button" class="ai-btn ai-btn-outline ai-btn-sm" id="copy-blueprint-html-btn">${locked ? 'Unlock Pro kit' : 'Copy HTML'}</button>
        <button type="button" class="ai-btn ai-btn-outline ai-btn-sm" id="copy-blueprint-cli-btn" title="${cli}">Copy CLI</button>
      </div>
    </div>
  `;

  document.getElementById('copy-blueprint-html-btn')?.addEventListener('click', async (e) => {
    if (bp.tier === 'pro' && !getBrowserToken()) {
      document.getElementById('license-modal')?.classList.add('is-open');
      return;
    }
    const fullHtml = await blueprintHtml(bp);
    if (fullHtml) {
      copyToClipboard(fullHtml, `${bp.name} (Full Page HTML)`, e.currentTarget as HTMLElement);
    }
  });

  document.getElementById('copy-blueprint-cli-btn')?.addEventListener('click', (e) => {
    copyToClipboard(cli, 'CLI Command', e.currentTarget as HTMLElement);
  });

  document.getElementById('preview-blueprint-full-btn')?.addEventListener('click', () => {
    void openFullPreview(bp);
  });
}

async function blueprintHtml(bp: PageBlueprint): Promise<string | null> {
  if (bp.tier !== 'pro') return assembleBlueprintHtml(bp.id);
  const cached = proHtmlCache.get(bp.id);
  if (cached) return cached;
  const token = getBrowserToken();
  if (!token) return assembleBlueprintHtml(bp.id);
  const res = await fetch(`/r/pro/${bp.id}.json`, {
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) return assembleBlueprintHtml(bp.id);
  const data = await res.json().catch(() => ({}));
  if (!data.html) return assembleBlueprintHtml(bp.id);
  proHtmlCache.set(bp.id, data.html as string);
  return data.html as string;
}

async function openFullPreview(bp: PageBlueprint) {
  if (!fullPreviewModal || !fullPreviewContent || !fullPreviewTitle) return;

  fullPreviewTitle.textContent = `${bp.name} - Live Assembled Blueprint`;
  const fullHtml = await blueprintHtml(bp);

  fullPreviewContent.innerHTML = `
    <div class="ai-template-assembled ${blueprintKind(bp) === 'wireframe' ? 'is-wireframe-mode' : ''}">
      ${fullHtml}
    </div>
  `;

  fullPreviewModal.classList.add('is-open');
}

// ============================================================================
// TEMPLATES RENDERING ENGINE
// ============================================================================
function getFilteredTemplates(): { template: WireframeTemplate; recipeIndex?: number }[] {
  // Only the sections belonging to the current mode are ever listed
  let list = templatesInMode();

  // Filter by active blueprint if selected
  if (activeBlueprintId) {
    const bp = pageBlueprints.find((b) => b.id === activeBlueprintId);
    if (bp) {
      return bp.sections.map((secId, idx) => {
        const found = wireframeTemplates.find((t) => t.id === secId);
        return {
          template: found || {
            id: secId,
            name: secId,
            section: 'features' as const,
            tier: 'free' as const,
            tags: [],
            placement: 'Section',
            guidance: { placement: '', bestUsedFor: '', avoidWhen: '', pairsWith: [] },
            html: `<div>Section ${secId}</div>`
          },
          recipeIndex: idx + 1
        };
      });
    }
  }

  // Filter by category
  if (activeCategory !== 'all') {
    list = list.filter((t) => t.section === activeCategory);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter((t) =>
      t.name.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.placement.toLowerCase().includes(q) ||
      t.guidance.bestUsedFor.toLowerCase().includes(q)
    );
  }

  return list.map((template) => ({ template }));
}

function renderTemplates() {
  if (!templatesStream) return;

  const items = getFilteredTemplates();
  const countEl = document.getElementById('templates-result-count');
  if (countEl) {
    countEl.textContent = activeBlueprintId
      ? `${items.length} in order`
      : `${items.length} of ${templatesInMode().length} ${previewMode}`;
  }

  if (items.length === 0) {
    templatesStream.innerHTML = `
      <div class="ai-empty-state" style="padding: 4rem 1rem; text-align: center; background: var(--ai-surface-0); border: 1px dashed var(--ai-border); border-radius: var(--ai-radius-lg);">
        <h3 style="font-family: var(--ai-font-display); font-size: 1.125rem; font-weight: 700;">No templates match</h3>
        <p style="font-size: 0.875rem; color: var(--ai-text-secondary); margin-top: 0.25rem;">Clear search or choose All.</p>
        <button class="ai-btn ai-btn-outline ai-btn-sm ai-mt-4" id="reset-filter-btn">Reset Filters</button>
      </div>
    `;
    document.getElementById('reset-filter-btn')?.addEventListener('click', () => {
      activeCategory = 'all';
      activeBlueprintId = null;
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      syncModeButtons();
      renderBlueprintNav();
      renderBlueprintBanner();
      updateCategoryButtons();
      renderTemplates();
    });
    return;
  }

  const recipeTotal = items.filter((i) => i.recipeIndex).length;
  templatesStream.innerHTML = items.map(({ template, recipeIndex }) => {
    const isPro = template.tier === 'pro';
    const tierBadge = isPro ? `<span class="ai-docs-pro-tag">PRO</span>` : '';
    const copyBtn = isPro
      ? `<button class="ai-btn ai-btn-primary ai-btn-xs unlock-pro-btn" data-id="${template.id}">Unlock Pro</button>`
      : `<button class="ai-btn ai-btn-outline ai-btn-xs copy-html-btn" data-id="${template.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span>Copy HTML</span>
          </button>`;
    const codeBlock = isPro
      ? `<pre><code>Subscribe at https://llmcss.io then:
npx llmcss login &lt;token&gt;
npx llmcss template get ${template.id}</code></pre>`
      : `<pre><code>${escapeHtml(template.html)}</code></pre>`;
    return `
    <article class="ai-template-card" id="card-${template.id}">
      <div class="ai-template-header">
        <div class="ai-flex ai-items-center ai-gap-2">
          ${recipeIndex ? `<span class="ai-text-xs ai-text-muted">${recipeIndex} of ${recipeTotal}</span>` : ''}
          <h3 class="ai-template-title">${template.name}</h3>
          ${tierBadge}
        </div>
        <div class="ai-flex ai-items-center ai-gap-2">
          <button class="ai-btn ai-btn-ghost ai-btn-xs ai-template-guidance-toggle" data-target="guidance-${template.id}" aria-expanded="false">
            <span>Guidance</span>
          </button>
          ${copyBtn}
          <button class="ai-btn ai-btn-ghost ai-btn-xs ai-template-code-toggle" data-target="code-${template.id}">
            <span>&lt;/&gt;</span>
          </button>
        </div>
      </div>

      <!-- Architectural Placement & Usage Guidance Box -->
      <div class="ai-template-guidance" id="guidance-${template.id}">
        <div class="ai-guidance-grid">
          <div class="ai-guidance-col">
            <div class="ai-guidance-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              <span>Placement</span>
            </div>
            <div class="ai-guidance-text">${template.placement ? template.placement + '. ' : ''}${template.guidance.placement}</div>
          </div>
          <div class="ai-guidance-col">
            <div class="ai-guidance-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Use for</span>
            </div>
            <div class="ai-guidance-text">${template.guidance.bestUsedFor}</div>
          </div>
          <div class="ai-guidance-col">
            <div class="ai-guidance-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              <span>Avoid</span>
            </div>
            <div class="ai-guidance-text">${template.guidance.avoidWhen}</div>
          </div>
          ${template.guidance.pairsWith.length > 0 ? `
            <div class="ai-guidance-col">
              <div class="ai-guidance-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <span>Pairs with</span>
              </div>
              <div class="ai-guidance-pairs">
                ${template.guidance.pairsWith.map((pairId) => {
                  const pair = wireframeTemplates.find((t) => t.id === pairId);
                  return `<button class="ai-guidance-pair-tag jump-to-pair" data-jump="${pairId}">${pair ? pair.name : pairId}</button>`;
                }).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Live Preview Canvas -->
      <div class="ai-template-canvas" data-vw="${currentViewport}">
        <div class="ai-template-frame ${templateKind(template) === 'wireframe' ? 'is-wireframe-mode' : ''}">
          ${template.html}
        </div>
      </div>

      <!-- Expandable Code Panel -->
      <div class="ai-template-code" id="code-${template.id}">
        <div class="ai-flex ai-justify-between ai-items-center ai-mb-2">
          <span style="font-family: var(--ai-font-mono); font-size: 0.75rem; color: var(--ai-text-muted);">
            npx llmcss template get ${template.id}
          </span>
          <button class="ai-btn ai-btn-ghost ai-btn-xs copy-snippet-btn" data-id="${template.id}">Copy</button>
        </div>
        ${codeBlock}
      </div>
    </article>
  `;
  }).join('');

  // Wire event handlers
  attachTemplateCardHandlers();
  void hydrateProTemplates();
}

async function hydrateProTemplates() {
  const token = getBrowserToken();
  if (!token || !templatesStream) return;
  const check = await validateToken(token);
  if (!check.valid) return;

  for (const t of wireframeTemplates) {
    if (t.tier !== 'pro') continue;
    const card = document.getElementById(`card-${t.id}`);
    if (!card) continue;
    let html = proHtmlCache.get(t.id);
    if (!html) {
      const res = await fetch(`/r/pro/${t.id}.json`, {
        headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
        cache: 'no-store',
      });
      if (!res.ok) continue;
      const data = await res.json().catch(() => ({}));
      if (!data.html) continue;
      html = data.html as string;
      proHtmlCache.set(t.id, html);
      if (data.css) proCssCache.set(t.id, data.css as string);
    }
    t.html = html;
    const css = proCssCache.get(t.id) || '';
    if (css && !document.getElementById(`pro-css-${t.id}`)) {
      const style = document.createElement('style');
      style.id = `pro-css-${t.id}`;
      style.textContent = css;
      document.head.appendChild(style);
    }
    const frame = card.querySelector('.ai-template-frame');
    if (frame) frame.innerHTML = html;
    const panel = card.querySelector(`#code-${t.id}`);
    if (panel) {
      panel.innerHTML = `<div class="ai-flex ai-justify-between ai-items-center ai-mb-2">
          <span style="font-family: var(--ai-font-mono); font-size: 0.75rem; color: var(--ai-text-muted);">
            npx llmcss template get ${t.id}
          </span>
          <button class="ai-btn ai-btn-ghost ai-btn-xs copy-snippet-btn" data-id="${t.id}">Copy</button>
        </div>
        <pre><code>${escapeHtml(html)}</code></pre>`;
    }
    const unlock = card.querySelector('.unlock-pro-btn') as HTMLElement | null;
    if (unlock) {
      unlock.textContent = 'Copy HTML';
      unlock.classList.remove('unlock-pro-btn');
      unlock.classList.add('copy-html-btn');
      unlock.setAttribute('data-id', t.id);
    }
  }
  attachTemplateCardHandlers();
}

function attachTemplateCardHandlers() {
  // Guidance toggles
  document.querySelectorAll('.ai-template-guidance-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        const el = document.getElementById(targetId);
        el?.classList.toggle('is-open');
        btn.classList.toggle('is-active', el?.classList.contains('is-open'));
      }
    });
  });

  // Code toggles
  document.querySelectorAll('.ai-template-code-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        const el = document.getElementById(targetId);
        el?.classList.toggle('is-open');
        btn.classList.toggle('is-active', el?.classList.contains('is-open'));
      }
    });
  });

  // Copy HTML
  document.querySelectorAll('.copy-html-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      const t = wireframeTemplates.find((x) => x.id === id);
      if (!t) return;
      if (t.tier === 'pro' && !getBrowserToken()) {
        showToast('Pro source is not public. Subscribe to unlock.', 'error');
        return;
      }
      copyToClipboard(t.html, `${t.name} HTML`, e.currentTarget as HTMLElement);
    });
  });

  document.querySelectorAll('.unlock-pro-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (getBrowserToken()) {
        await hydrateProTemplates();
        return;
      }
      document.getElementById('license-modal')?.classList.add('is-open');
    });
  });

  // Copy Code snippet
  document.querySelectorAll('.copy-snippet-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      const t = wireframeTemplates.find((x) => x.id === id);
      if (!t) return;
      if (t.tier === 'pro' && !getBrowserToken()) {
        showToast('Pro source is not public. Subscribe to unlock.', 'error');
        return;
      }
      copyToClipboard(t.html, `${t.name} HTML`, e.currentTarget as HTMLElement);
    });
  });

  // Copy CLI command
  document.querySelectorAll('.copy-cli-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      if (id) {
        const t = wireframeTemplates.find((x) => x.id === id);
        const cmd = t?.tier === 'pro'
          ? `npx llmcss login <token>\nnpx llmcss template get ${id}`
          : `npx llmcss template get ${id}`;
        copyToClipboard(cmd, `CLI Command`, e.currentTarget as HTMLElement);
      }
    });
  });

  // Jump to pair
  document.querySelectorAll('.jump-to-pair').forEach((btn) => {
    btn.addEventListener('click', () => {
      const jumpId = btn.getAttribute('data-jump');
      if (jumpId) {
        const target = wireframeTemplates.find((t) => t.id === jumpId);
        const targetMode = target ? templateKind(target) : previewMode;
        // Clear blueprint filter and match the target's mode so the card can exist
        if (activeBlueprintId || targetMode !== previewMode) {
          activeBlueprintId = null;
          previewMode = targetMode;
          syncModeButtons();
          renderBlueprintNav();
          renderBlueprintBanner();
          updateCategoryButtons();
          renderTemplates();
        }
        let targetEl = document.getElementById(`card-${jumpId}`);
        if (!targetEl) {
          // Reset category filter if it was hiding the target
          activeCategory = 'all';
          updateCategoryButtons();
          renderTemplates();
          targetEl = document.getElementById(`card-${jumpId}`);
        }
        if (targetEl) {
          const el = targetEl;
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.classList.add('is-highlighted');
          setTimeout(() => el.classList.remove('is-highlighted'), 2000);
        }
      }
    });
  });
}

function updateCategoryButtons() {
  const pool = templatesInMode();
  categoryNav?.querySelectorAll('.ai-docs-nav-btn').forEach((btn) => {
    const cat = btn.getAttribute('data-category');
    const count = cat === 'all' ? pool.length : pool.filter((t) => t.section === cat).length;
    const countEl = btn.querySelector('.ai-docs-count');
    if (countEl) countEl.textContent = String(count);
    // A category with nothing in this mode is dropped rather than shown as a dead row
    (btn as HTMLElement).hidden = count === 0;
    btn.toggleAttribute('disabled', !!activeBlueprintId);
    if (activeBlueprintId) {
      btn.classList.remove('is-active');
    } else if (cat === activeCategory) {
      btn.classList.add('is-active');
    } else {
      btn.classList.remove('is-active');
    }
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================
async function init() {
  await mountChrome();
  searchInput = document.getElementById('template-search') as HTMLInputElement | null;
  themeToggle = document.getElementById('theme-mode-toggle');
  bindFontSwitchers(() => applyThemeSettings());
  applyThemeSettings();
  syncModeButtons();
  updateCategoryButtons();

  // 1. Render Blueprints
  renderBlueprintNav();
  renderBlueprintBanner();

  // 2. Render Initial Templates
  renderTemplates();

  document.getElementById('license-activate-btn')?.addEventListener('click', async () => {
    const input = document.getElementById('license-token-input') as HTMLInputElement | null;
    const status = document.getElementById('license-status');
    const token = (input?.value || '').trim();
    if (status) status.textContent = 'Checking...';
    const data = await validateToken(token);
    if (status) {
      status.innerHTML = data.valid
        ? '<span class="ai-badge ai-badge-success">Active</span>'
        : '<span class="ai-badge ai-badge-danger">Not valid</span>';
    }
    if (data.valid) {
      setBrowserToken(token);
      await hydrateProTemplates();
      showToast('Pro catalog unlocked in this browser', 'success');
    }
  });

  // 3. Category Nav Handlers
  categoryNav?.querySelectorAll('.ai-docs-nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (cat) {
        activeCategory = cat;
        // Reset blueprint selection when clicking category
        activeBlueprintId = null;
        syncModeButtons();
        renderBlueprintNav();
        renderBlueprintBanner();
        updateCategoryButtons();
        renderTemplates();
      }
    });
  });

  blueprintNav?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement | null)?.closest('.blueprint-nav-btn');
    if (!btn) return;
    const id = btn.getAttribute('data-blueprint');
    activeBlueprintId = !id || id === 'all' ? null : id;
    // Free recipes are built from wireframe sections and Pro kits from themed ones,
    // so the mode follows the blueprint while one is active
    const bp = activeBlueprintId ? pageBlueprints.find((b) => b.id === activeBlueprintId) : null;
    if (bp) previewMode = blueprintKind(bp);
    syncModeButtons();
    renderBlueprintNav();
    renderBlueprintBanner();
    updateCategoryButtons();
    renderTemplates();
  });

  // 4. Search Handler
  searchInput?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    renderTemplates();
  });

  // 5. Gallery Mode Toggle (Wireframe sections vs Themed sections)
  const modeButtons = document.querySelectorAll('.preview-mode-btn');
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (activeBlueprintId) return;
      const mode = btn.getAttribute('data-mode') as 'wireframe' | 'themed';
      if (!mode || mode === previewMode) return;
      previewMode = mode;
      localStorage.setItem(MODE_STORAGE_KEY, mode);
      // Drop a category that has no sections in the mode we are moving to
      if (activeCategory !== 'all' && !templatesInMode().some((t) => t.section === activeCategory)) {
        activeCategory = 'all';
      }
      syncModeButtons();
      renderBlueprintNav();
      updateCategoryButtons();
      renderTemplates();
    });
  });

  // 6. Viewport Controls
  const viewportButtons = document.querySelectorAll('.viewport-btn');
  viewportButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentViewport = btn.getAttribute('data-viewport') || 'full';
      viewportButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.querySelectorAll('.ai-template-canvas').forEach((c) => {
        c.setAttribute('data-vw', currentViewport);
      });
    });
  });

  // 7. Light/Dark Mode Toggle
  themeToggle?.addEventListener('click', () => {
    activeTheme = activeTheme === 'light' ? 'dark' : 'light';
    applyThemeSettings();
  });

  // 8. Skin Switcher Dropdown
  skinSwitcher?.addEventListener('change', (e) => {
    activeSkin = (e.target as HTMLSelectElement).value;
    applyThemeSettings();
  });

  const closePreview = () => fullPreviewModal?.classList.remove('is-open');
  document.querySelectorAll('[data-dismiss="modal"]').forEach((btn) => {
    btn.addEventListener('click', closePreview);
  });
  fullPreviewModal?.addEventListener('click', (e) => {
    if (e.target === fullPreviewModal) closePreview();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePreview();
  });
  const copyPreview = document.getElementById('copy-preview-html');
  copyPreview?.addEventListener('click', async (e) => {
    if (!activeBlueprintId) return;
    const bp = pageBlueprints.find((b) => b.id === activeBlueprintId);
    if (!bp) return;
    const trigger = e.currentTarget as HTMLElement;
    const html = await blueprintHtml(bp);
    if (html) copyToClipboard(html, 'Page HTML', trigger);
  });

  // 10. Copy All Blueprint CLI
  document.getElementById('header-copy-cli-btn')?.addEventListener('click', (e) => {
    copyToClipboard('npx llmcss template list', 'CLI Template Command', e.currentTarget as HTMLElement);
  });
}

document.addEventListener('DOMContentLoaded', init);
