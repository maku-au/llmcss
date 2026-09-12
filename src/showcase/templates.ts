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

// ============================================================================
// STATE DEFINITIONS
// ============================================================================
let activeCategory = 'all';
let activeBlueprintId: string | null = null;
let searchQuery = '';
let currentViewport = '100%';
let previewMode: 'wireframe' | 'themed' = 'wireframe';

// Theme state persisted in localStorage
let activeSkin = localStorage.getItem('cssai-skin') || 'modern';
let activeTheme = localStorage.getItem('cssai-theme') || document.documentElement.getAttribute('data-ai-theme') || 'light';

// DOM Elements
const templatesStream = document.getElementById('templates-stream');
const blueprintBar = document.getElementById('blueprint-bar');
const blueprintBanner = document.getElementById('blueprint-banner');
const categoryNav = document.getElementById('category-nav');
let searchInput = document.getElementById('template-search') as HTMLInputElement | null;
const skinSwitcher = document.getElementById('skin-switcher') as HTMLSelectElement | null;
let themeToggle = document.getElementById('theme-mode-toggle');
const toastContainer = document.getElementById('toast-container');
const fullPreviewModal = document.getElementById('blueprint-preview-modal');
const fullPreviewContent = document.getElementById('blueprint-preview-content');
const fullPreviewTitle = document.getElementById('blueprint-preview-title');

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
function renderBlueprintBar() {
  if (!blueprintBar) return;

  blueprintBar.innerHTML = `
    <button class="ai-blueprint-tab-btn ${activeBlueprintId === null ? 'is-active' : ''}" data-bp="all">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <rect width="7" height="7" x="3" y="3" rx="1"/>
        <rect width="7" height="7" x="14" y="3" rx="1"/>
        <rect width="7" height="7" x="14" y="14" rx="1"/>
        <rect width="7" height="7" x="3" y="14" rx="1"/>
      </svg>
      <span>All sections</span>
    </button>
    ${pageBlueprints.map((bp) => `
      <button class="ai-blueprint-tab-btn ${activeBlueprintId === bp.id ? 'is-active' : ''}" data-bp="${bp.id}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
          <path d="M6 6h10"/>
          <path d="M6 10h10"/>
        </svg>
        <span>${({
          'saas-landing': 'SaaS landing',
          'developer-tool': 'Developer tool',
          'editorial-manifesto': 'Editorial',
          'dashboard-shell': 'Dashboard',
        } as Record<string, string>)[bp.id] || bp.name}</span>
      </button>
    `).join('')}
  `;

  blueprintBar.querySelectorAll('.ai-blueprint-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const bpId = btn.getAttribute('data-bp');
      if (bpId === 'all') {
        activeBlueprintId = null;
      } else {
        activeBlueprintId = bpId;
      }
      renderBlueprintBar();
      renderBlueprintBanner();
      renderTemplates();
    });
  });
}

function renderBlueprintBanner() {
  if (!blueprintBanner) return;

  if (!activeBlueprintId) {
    blueprintBanner.style.display = 'none';
    blueprintBanner.innerHTML = '';
    return;
  }

  const bp = pageBlueprints.find((b) => b.id === activeBlueprintId);
  if (!bp) return;

  blueprintBanner.style.display = 'block';
  blueprintBanner.innerHTML = `
    <div class="ai-blueprint-banner-card">
      <div class="ai-flex ai-justify-between ai-items-start ai-gap-4" style="flex-wrap: wrap;">
        <div style="max-width: 48rem;">
          <h2 class="ai-font-display" style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.35rem;">
            ${bp.name}
          </h2>
          <p class="ai-text-sm ai-text-secondary" style="margin-bottom: 0.75rem;">
            ${bp.description} ${bp.sections.length} section${bp.sections.length === 1 ? '' : 's'}.
          </p>
          <div class="ai-blueprint-flow-pills">
            ${bp.sections.map((secId, idx) => {
              const sec = wireframeTemplates.find((t) => t.id === secId);
              return `
                <button type="button" class="ai-blueprint-flow-pill jump-to-pair" data-jump="${secId}">
                  <span class="flow-num">${idx + 1}</span>
                  <span>${sec ? sec.name : secId}</span>
                </button>
                ${idx < bp.sections.length - 1 ? '<span class="flow-arrow">&rarr;</span>' : ''}
              `;
            }).join('')}
          </div>
        </div>
        <div class="ai-flex ai-flex-col ai-gap-2" style="min-width: 220px;">
          <button class="ai-btn ai-btn-primary ai-btn-sm ai-w-full ai-justify-center" id="copy-blueprint-html-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span>Copy Full Page HTML</span>
          </button>
          <button class="ai-btn ai-btn-outline ai-btn-sm ai-w-full ai-justify-center" id="copy-blueprint-cli-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
            <span>npx llmcss template blueprint ${bp.id}</span>
          </button>
          <button class="ai-btn ai-btn-ghost ai-btn-sm ai-w-full ai-justify-center" id="preview-blueprint-full-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Preview full page</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('copy-blueprint-html-btn')?.addEventListener('click', (e) => {
    const fullHtml = assembleBlueprintHtml(bp.id);
    if (fullHtml) {
      copyToClipboard(fullHtml, `${bp.name} (Full Page HTML)`, e.currentTarget as HTMLElement);
    }
  });

  document.getElementById('copy-blueprint-cli-btn')?.addEventListener('click', (e) => {
    const cmd = `npx llmcss template blueprint ${bp.id}`;
    copyToClipboard(cmd, 'CLI Command', e.currentTarget as HTMLElement);
  });

  document.getElementById('preview-blueprint-full-btn')?.addEventListener('click', () => {
    openFullPreview(bp);
  });
}

function openFullPreview(bp: PageBlueprint) {
  if (!fullPreviewModal || !fullPreviewContent || !fullPreviewTitle) return;

  fullPreviewTitle.textContent = `${bp.name} - Live Assembled Blueprint`;
  const fullHtml = assembleBlueprintHtml(bp.id);

  fullPreviewContent.innerHTML = `
    <div class="ai-template-assembled ${previewMode === 'wireframe' ? 'is-wireframe-mode' : ''}">
      ${fullHtml}
    </div>
  `;

  fullPreviewModal.classList.add('is-open');
}

// ============================================================================
// TEMPLATES RENDERING ENGINE
// ============================================================================
function getFilteredTemplates(): { template: WireframeTemplate; recipeIndex?: number }[] {
  let list = wireframeTemplates;

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
      renderBlueprintBar();
      renderBlueprintBanner();
      updateCategoryButtons();
      renderTemplates();
    });
    return;
  }

  const recipeTotal = items.filter((i) => i.recipeIndex).length;
  templatesStream.innerHTML = items.map(({ template, recipeIndex }) => `
    <article class="ai-template-card" id="card-${template.id}">
      <div class="ai-template-header">
        <div class="ai-flex ai-items-center ai-gap-2">
          ${recipeIndex ? `<span class="ai-text-xs ai-text-muted">${recipeIndex} of ${recipeTotal}</span>` : ''}
          <h3 class="ai-template-title">${template.name}</h3>
        </div>
        <div class="ai-flex ai-items-center ai-gap-2">
          <button class="ai-btn ai-btn-ghost ai-btn-xs ai-template-guidance-toggle" data-target="guidance-${template.id}" aria-expanded="false">
            <span>Guidance</span>
          </button>
          <button class="ai-btn ai-btn-outline ai-btn-xs copy-html-btn" data-id="${template.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span>Copy HTML</span>
          </button>
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
      <div class="ai-template-canvas" style="width: ${currentViewport}; max-width: 100%;">
        <div class="ai-template-frame ${previewMode === 'wireframe' ? 'is-wireframe-mode' : ''}">
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
        <pre><code>${escapeHtml(template.html)}</code></pre>
      </div>
    </article>
  `).join('');

  // Wire event handlers
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
      if (t) {
        copyToClipboard(t.html, `${t.name} HTML`, e.currentTarget as HTMLElement);
      }
    });
  });

  // Copy Code snippet
  document.querySelectorAll('.copy-snippet-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      const t = wireframeTemplates.find((x) => x.id === id);
      if (t) {
        copyToClipboard(t.html, `${t.name} HTML`, e.currentTarget as HTMLElement);
      }
    });
  });

  // Copy CLI command
  document.querySelectorAll('.copy-cli-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      if (id) {
        copyToClipboard(`npx llmcss template get ${id}`, `CLI Command`, e.currentTarget as HTMLElement);
      }
    });
  });

  // Jump to pair
  document.querySelectorAll('.jump-to-pair').forEach((btn) => {
    btn.addEventListener('click', () => {
      const jumpId = btn.getAttribute('data-jump');
      if (jumpId) {
        // Clear blueprint filter if active so target can be viewed
        if (activeBlueprintId) {
          activeBlueprintId = null;
          renderBlueprintBar();
          renderBlueprintBanner();
          renderTemplates();
        }
        const targetEl = document.getElementById(`card-${jumpId}`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          targetEl.classList.add('is-highlighted');
          setTimeout(() => targetEl.classList.remove('is-highlighted'), 2000);
        } else {
          // Reset category filter if it was hidden
          activeCategory = 'all';
          updateCategoryButtons();
          renderTemplates();
          const el = document.getElementById(`card-${jumpId}`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

function updateCategoryButtons() {
  categoryNav?.querySelectorAll('.ai-docs-filter-btn').forEach((btn) => {
    const cat = btn.getAttribute('data-category');
    const count = cat === 'all' ? wireframeTemplates.length : wireframeTemplates.filter((t) => t.section === cat).length;
    const label = (btn.getAttribute('data-label') || btn.textContent || '').replace(/\s*\d+$/, '').trim();
    if (!btn.getAttribute('data-label')) btn.setAttribute('data-label', label);
    btn.textContent = `${btn.getAttribute('data-label')} ${count}`;
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
  updateCategoryButtons();

  // 1. Render Blueprints
  renderBlueprintBar();
  renderBlueprintBanner();

  // 2. Render Initial Templates
  renderTemplates();

  // 3. Category Nav Handlers
  categoryNav?.querySelectorAll('.ai-docs-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (cat) {
        activeCategory = cat;
        // Reset blueprint selection when clicking category
        activeBlueprintId = null;
        renderBlueprintBar();
        renderBlueprintBanner();
        updateCategoryButtons();
        renderTemplates();
      }
    });
  });

  // 4. Search Handler
  searchInput?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    renderTemplates();
  });

  // 5. Preview Mode Toggle (Wireframe vs Themed)
  const modeButtons = document.querySelectorAll('.preview-mode-btn');
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode') as 'wireframe' | 'themed';
      if (mode) {
        previewMode = mode;
        modeButtons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        document.querySelectorAll('.ai-template-frame').forEach((frame) => {
          if (previewMode === 'wireframe') {
            frame.classList.add('is-wireframe-mode');
          } else {
            frame.classList.remove('is-wireframe-mode');
          }
        });
      }
    });
  });

  // 6. Viewport Controls
  const viewportButtons = document.querySelectorAll('.viewport-btn');
  viewportButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const width = btn.getAttribute('data-viewport') || '100%';
      currentViewport = width;
      viewportButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      document.querySelectorAll('.ai-template-canvas').forEach((c) => {
        (c as HTMLElement).style.width = width;
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
  copyPreview?.addEventListener('click', (e) => {
    if (!activeBlueprintId) return;
    const html = assembleBlueprintHtml(activeBlueprintId);
    if (html) copyToClipboard(html, 'Page HTML', e.currentTarget as HTMLElement);
  });

  // 10. Copy All Blueprint CLI
  document.getElementById('header-copy-cli-btn')?.addEventListener('click', (e) => {
    copyToClipboard('npx llmcss template list', 'CLI Template Command', e.currentTarget as HTMLElement);
  });
}

document.addEventListener('DOMContentLoaded', init);
