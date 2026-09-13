import '../css/index.css';
import '../runtime/index';
import {
  wireframeTemplates,
  pageBlueprints,
  assembleBlueprintHtml
} from '../registry/templates';
import type { WireframeTemplate, PageBlueprint } from '../registry/schema';
import { applyDisplayFont, bindFontSwitchers, getActiveFontId } from './fonts';
import { mountChrome, currentTheme, readPref, writePref } from './chrome';
import { getBrowserToken, setBrowserToken, validateToken } from './license';

// ============================================================================
// STATE DEFINITIONS
// ============================================================================
let activeCategory = 'all';
let activeBlueprintId: string | null = null;
let searchQuery = '';
let currentViewport = 'full';

// Gallery mode. Wireframe lists the free structural sections, Themed lists the
// Pro styled ones. A first visit opens on Themed, which is what is for sale; a
// returning visitor keeps whichever mode they last chose. readPref and
// writePref in chrome.ts prefix the key and migrate the old cssai-* one.
const MODE_PREF_KEY = 'template-mode';
let previewMode: 'wireframe' | 'themed' =
  readPref(MODE_PREF_KEY) === 'wireframe' ? 'wireframe' : 'themed';

// Theme state persisted in localStorage. skin, radius and density share their
// keys with the Styler on the components page (main.ts), so a choice made in
// one drawer survives the jump to the other.
let activeSkin = readPref('skin') || 'modern';
let activeTheme = readPref('theme') || document.documentElement.getAttribute('data-ai-theme') || 'light';
let activeRadius = readPref('radius') || 'balanced';
let activeDensity = readPref('density') || 'standard';

// DOM Elements
const templatesStream = document.getElementById('templates-stream');
const blueprintNav = document.getElementById('blueprint-nav');
const blueprintBanner = document.getElementById('blueprint-banner');
const categoryNav = document.getElementById('category-nav');
const upsellStrip = document.getElementById('template-upsell');
const upsellLine = document.getElementById('template-upsell-line');
// The header search field is rendered by chrome.ts, so it only exists after
// mountChrome resolves. Looked up once there, not here.
let searchInput: HTMLInputElement | null = null;
const toastContainer = document.getElementById('toast-container');
const fullPreviewModal = document.getElementById('blueprint-preview-modal');
const fullPreviewContent = document.getElementById('blueprint-preview-content');
const fullPreviewTitle = document.getElementById('blueprint-preview-title');
const proHtmlCache = new Map<string, string>();
const proCssCache = new Map<string, string>();

// ============================================================================
// RUNTIME OVERLAY BRIDGE
// src/runtime/attributes.ts owns every .modal and .drawer on the page: it keeps
// the open stack, traps Tab inside the panel, makes the rest of the body inert,
// closes the topmost overlay on Escape and returns focus to the trigger. A
// script that opens one with a raw classList write gets none of that, so every
// open and close here goes through the published API.
// ============================================================================
interface OverlayApi {
  open(el: Element | string): void;
  close(el: Element | string): void;
}

function overlayApi(): OverlayApi | null {
  const api = (window as unknown as { LLMCSS?: Partial<OverlayApi> }).LLMCSS;
  return api && typeof api.open === 'function' && typeof api.close === 'function'
    ? (api as OverlayApi)
    : null;
}

function openOverlay(el: Element | null, trigger?: HTMLElement | null) {
  if (!el) return;
  // The runtime remembers whatever holds focus at open time and restores it on
  // close, so put focus on the control the visitor actually pressed first.
  if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
  const api = overlayApi();
  if (api) api.open(el);
  else el.classList.add('is-open');
}

function closeOverlay(el: Element | null) {
  if (!el) return;
  const api = overlayApi();
  if (api) api.close(el);
  else el.classList.remove('is-open');
}

// Selection state on a toggle row: the class paints it, aria-pressed announces it.
function setPressed(btn: Element, on: boolean) {
  btn.classList.toggle('is-active', on);
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
}

// ============================================================================
// PRO PREVIEW IMAGES
// Pro markup never reaches an unlicensed browser, so the gallery shows a
// screenshot rendered server side by shoot-pro-previews.mjs. The manifest
// carries the pixel size of every image so a card reserves its space and the
// stream does not jump while the images load.
// ============================================================================
interface PreviewImage {
  src: string;
  width: number;
  height: number;
}

interface PreviewRecord {
  id: string;
  name: string;
  kind: 'section' | 'kit';
  skin: string;
  src: string;
  width: number;
  height: number;
  src390: string;
  width390: number;
  height390: number;
  // Only present when the shoot ran in both themes. Keys are light, light390,
  // dark and dark390; the light pair duplicates the flat fields above.
  images?: Partial<Record<'light' | 'light390' | 'dark' | 'dark390', PreviewImage>>;
}

const previewManifest = new Map<string, PreviewRecord>();

async function loadPreviewManifest() {
  try {
    const res = await fetch('/previews/index.json', { cache: 'no-cache' });
    if (!res.ok) return;
    const data = await res.json();
    for (const rec of (data.previews || []) as PreviewRecord[]) {
      if (rec && rec.id && rec.src) previewManifest.set(rec.id, rec);
    }
  } catch {
    // Previews are optional chrome. Without them the locked stub still renders.
  }
}

// A locked Pro entry only gets an image while the browser has no license.
function previewFor(id: string, tier: string | undefined): PreviewRecord | undefined {
  if (tier !== 'pro' || getBrowserToken()) return undefined;
  return previewManifest.get(id);
}

// The phone render is used when the canvas switcher is on 375, and also when the
// browser itself is at phone width, where the 1280 shot would be unreadable.
function narrowPreview(): boolean {
  return currentViewport === '375' || window.matchMedia('(max-width: 700px)').matches;
}

// The gallery is a wall of screenshots, so a light shot on a dark page reads as
// a bug. Dark renders are optional in the manifest; every lookup falls back to
// the light image rather than leaving the card empty.
function darkPreviewActive(): boolean {
  return document.documentElement.getAttribute('data-ai-theme') === 'dark';
}

function darkImage(rec: PreviewRecord, narrow: boolean): PreviewImage | undefined {
  const img = rec.images && rec.images[narrow ? 'dark390' : 'dark'];
  return img && img.src ? img : undefined;
}

// Attribute stem for one combination. The dark stems are only written when the
// manifest has that render, so a missing attribute is the fallback signal.
function previewStem(narrow: boolean, dark: boolean): string {
  const base = narrow ? 'data-preview-narrow' : 'data-preview-wide';
  return dark ? `${base}-dark` : base;
}

function previewImageTag(rec: PreviewRecord, alt: string): string {
  const narrow = narrowPreview();
  const chosen = darkPreviewActive() ? darkImage(rec, narrow) : undefined;
  const src = chosen ? chosen.src : narrow ? rec.src390 : rec.src;
  const w = chosen ? chosen.width : narrow ? rec.width390 : rec.width;
  const h = chosen ? chosen.height : narrow ? rec.height390 : rec.height;
  const wideDark = darkImage(rec, false);
  const narrowDark = darkImage(rec, true);
  const darkAttrs =
    (wideDark
      ? ` data-preview-wide-dark="${wideDark.src}" data-preview-wide-dark-w="${wideDark.width}" data-preview-wide-dark-h="${wideDark.height}"`
      : '') +
    (narrowDark
      ? ` data-preview-narrow-dark="${narrowDark.src}" data-preview-narrow-dark-w="${narrowDark.width}" data-preview-narrow-dark-h="${narrowDark.height}"`
      : '');
  return `<img class="template-preview" src="${src}" alt="${alt}" loading="lazy" width="${w}" height="${h}"` +
    ` data-preview-wide="${rec.src}" data-preview-wide-w="${rec.width}" data-preview-wide-h="${rec.height}"` +
    ` data-preview-narrow="${rec.src390}" data-preview-narrow-w="${rec.width390}" data-preview-narrow-h="${rec.height390}"` +
    `${darkAttrs}>`;
}

// The 375 viewport button swaps in the phone width render rather than scaling
// the desktop one down, and the theme toggle swaps in the dark render.
function syncPreviewViewport() {
  const narrow = narrowPreview();
  const dark = darkPreviewActive();
  document.querySelectorAll<HTMLImageElement>('.template-preview').forEach((img) => {
    let stem = previewStem(narrow, dark);
    if (dark && !img.getAttribute(stem)) stem = previewStem(narrow, false);
    const src = img.getAttribute(stem);
    const w = img.getAttribute(`${stem}-w`);
    const h = img.getAttribute(`${stem}-h`);
    if (!src) return;
    if (img.getAttribute('src') !== src) img.setAttribute('src', src);
    if (w) img.setAttribute('width', w);
    if (h) img.setAttribute('height', h);
  });
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================
// The container carries role="status" aria-live="polite", so a toast appended
// to it is read out without stealing focus. An error is the one case worth
// interrupting for, so that toast is a role="alert" of its own.
function showToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  if (type === 'error') toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast-message">${message}</span>
    <button type="button" class="toast-close" aria-label="Dismiss"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg></button>
  `;
  toast.querySelector('.toast-close')?.addEventListener('click', () => toast.remove());
  toastContainer.appendChild(toast);
  setTimeout(() => {
    // The exit fade is a class in toasts.css, not an inline style write
    toast.classList.add('is-leaving');
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

function copyToClipboard(text: string, label: string, triggerBtn?: HTMLElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied ${label} to clipboard!`);
    if (triggerBtn) {
      const originalText = triggerBtn.textContent;
      triggerBtn.textContent = 'Copied';
      setTimeout(() => {
        triggerBtn.textContent = originalText;
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

function blueprintsInMode(mode: 'wireframe' | 'themed'): PageBlueprint[] {
  return pageBlueprints.filter((bp) => blueprintKind(bp) === mode);
}

// Wireframe mode hides everything that is for sale, so the strip above the
// stream shows two page kit renders and counts what a license adds. The counts
// come from the catalog, never typed.
function syncUpsellStrip() {
  if (!upsellStrip) return;
  if (upsellLine) {
    const sections = templatesInMode('themed').length;
    const kits = blueprintsInMode('themed').length;
    upsellLine.textContent =
      `${sections} themed section${sections === 1 ? '' : 's'}, ${kits} page kit${kits === 1 ? '' : 's'}`;
  }
  upsellStrip.hidden = previewMode !== 'wireframe';
}

// One entry point for a mode change so the sidebar rows and the upsell button
// leave the page in the same state.
function setPreviewMode(mode: 'wireframe' | 'themed') {
  if (mode === previewMode) return;
  previewMode = mode;
  writePref(MODE_PREF_KEY, mode);
  // Drop a category that has no sections in the mode we are moving to
  if (activeCategory !== 'all' && !templatesInMode().some((t) => t.section === activeCategory)) {
    activeCategory = 'all';
  }
  syncModeButtons();
  renderBlueprintNav();
  updateCategoryButtons();
  renderTemplates();
}

// Reflect the current mode on the segmented toggle. The toggle is locked while a
// blueprint is active because the blueprint already decides the mode.
function syncModeButtons() {
  const wireframeCount = document.getElementById('count-mode-wireframe');
  const themedCount = document.getElementById('count-mode-themed');
  if (wireframeCount) wireframeCount.textContent = String(templatesInMode('wireframe').length);
  if (themedCount) themedCount.textContent = String(templatesInMode('themed').length);
  document.querySelectorAll('.js-preview-mode-btn').forEach((btn) => {
    setPressed(btn, btn.getAttribute('data-mode') === previewMode);
    btn.toggleAttribute('disabled', !!activeBlueprintId);
  });
  syncUpsellStrip();
}

// ============================================================================
// GLOBAL THEME & TOKEN ENGINE
// The Styler drawer on this page drives the same three globals as the one on
// the components page and applies them the same way main.ts does.
// ============================================================================

const RADIUS_LABELS: Record<string, string> = {
  sharp: 'Sharp (0px)',
  precision: 'Precision (2-4px)',
  balanced: 'Balanced (4-8px)',
  smooth: 'Smooth (8-14px)',
};

const DENSITY_LABELS: Record<string, string> = {
  compact: 'Compact (0.85x)',
  standard: 'Standard (1.0x)',
  spacious: 'Spacious (1.2x)',
};

function applyThemeSettings() {
  const root = document.documentElement;

  // Palette Skin
  if (activeSkin === 'modern') {
    root.removeAttribute('data-ai-skin');
  } else {
    root.setAttribute('data-ai-skin', activeSkin);
  }
  writePref('skin', activeSkin);

  // Light / Dark Mode. chrome.ts owns the header toggle and is the source of
  // truth; this page mirrors it so the head bootstrap reads the same value.
  activeTheme = currentTheme();
  root.setAttribute('data-ai-theme', activeTheme);
  writePref('theme', activeTheme);

  // Corner geometry is a documented library attribute now: the four archetypes
  // are a [data-ai-radius] block in tokens.css. "precision" is the stock :root
  // scale, so it is expressed by removing the attribute.
  if (activeRadius === 'precision') {
    root.removeAttribute('data-ai-radius');
  } else {
    root.setAttribute('data-ai-radius', activeRadius);
  }
  writePref('radius', activeRadius);

  // Spacing density is a documented library attribute. Standard is the stock
  // scale and is expressed by removing the attribute.
  if (activeDensity === 'compact' || activeDensity === 'spacious') {
    root.setAttribute('data-ai-density', activeDensity);
  } else {
    root.removeAttribute('data-ai-density');
  }
  writePref('density', activeDensity);

  applyDisplayFont(getActiveFontId());
  syncStylerControls();
  syncPreviewViewport();
}

// Reflect skin, geometry and density on the drawer controls and their readouts.
function syncStylerControls() {
  document.querySelectorAll('.styler-theme-grid .styler-theme-btn').forEach((btn) => {
    setPressed(btn, btn.getAttribute('data-skin') === activeSkin);
  });
  const skinLabel = document.getElementById('styler-skin-label');
  // The readout is the literal attribute value; modern sets none at all.
  if (skinLabel) skinLabel.textContent = activeSkin === 'modern' ? 'none' : activeSkin;

  document.querySelectorAll('.js-styler-radius-btn').forEach((btn) => {
    setPressed(btn, btn.getAttribute('data-radius') === activeRadius);
  });
  const radiusLabel = document.getElementById('styler-radius-label');
  if (radiusLabel) radiusLabel.textContent = RADIUS_LABELS[activeRadius] || RADIUS_LABELS.balanced;

  document.querySelectorAll('.js-styler-density-btn').forEach((btn) => {
    setPressed(btn, btn.getAttribute('data-density') === activeDensity);
  });
  const densityLabel = document.getElementById('styler-density-label');
  if (densityLabel) densityLabel.textContent = DENSITY_LABELS[activeDensity] || DENSITY_LABELS.standard;
}

// The focus ring row is bound by chrome.ts, which owns that preference.
function bindStylerControls() {
  document.querySelectorAll('.styler-theme-grid .styler-theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeSkin = btn.getAttribute('data-skin') || 'modern';
      applyThemeSettings();
      showToast(
        activeSkin === 'modern' ? 'Cleared data-ai-skin' : `Applied data-ai-skin="${activeSkin}"`,
        'info'
      );
    });
  });

  document.querySelectorAll('.js-styler-radius-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeRadius = btn.getAttribute('data-radius') || 'balanced';
      applyThemeSettings();
      showToast(`Applied ${btn.textContent?.trim()} corner geometry`, 'info');
    });
  });

  document.querySelectorAll('.js-styler-density-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeDensity = btn.getAttribute('data-density') || 'standard';
      applyThemeSettings();
      showToast(`Applied ${btn.textContent?.trim()} spacing density`, 'info');
    });
  });
}

// ============================================================================
// PAGE KIT CONTROLLER
// blueprint stays the internal id, data attribute and CLI verb; a reader sees
// "kit" for a whole page and "section" for a single template.
// ============================================================================
// One sidebar row per page kit, free kits first then the Pro ones, with an
// All sections row at the top that clears the kit filter.
function renderBlueprintNav() {
  if (!blueprintNav) return;
  const free = blueprintsInMode('wireframe');
  const pro = blueprintsInMode('themed');
  const row = (bp: PageBlueprint) => {
    const on = activeBlueprintId === bp.id;
    return `
    <button type="button" class="docs-nav-btn blueprint-nav-btn${on ? ' is-active' : ''}" data-blueprint="${bp.id}" aria-pressed="${on}">
      <span>${bp.name}</span>
      <span class="docs-count">${bp.sections.length}</span>
      ${bp.tier === 'pro' ? '<span class="docs-pro-tag">PRO</span>' : ''}
    </button>`;
  };
  blueprintNav.innerHTML = `
    <button type="button" class="docs-nav-btn blueprint-nav-btn${activeBlueprintId ? '' : ' is-active'}" data-blueprint="all" aria-pressed="${!activeBlueprintId}">
      <span>All sections</span>
      <span class="docs-count">${templatesInMode().length}</span>
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
    <div class="blueprint-strip">
      <div class="blueprint-strip-main">
        <h2 class="blueprint-strip-title">${bp.name}</h2>
        <p class="blueprint-strip-desc">${bp.recommendedFor} ${bp.sections.length} section${bp.sections.length === 1 ? '' : 's'}, in order.</p>
        <ol class="blueprint-flow">
          ${bp.sections.map((secId, idx) => {
            const sec = wireframeTemplates.find((t) => t.id === secId);
            return `<li><button type="button" class="blueprint-flow-step jump-to-pair" data-jump="${secId}"><span class="blueprint-flow-num">${idx + 1}</span>${sec ? sec.name : secId}</button></li>`;
          }).join('')}
        </ol>
      </div>
      <div class="btn-group blueprint-strip-actions">
        <button type="button" class="btn btn-primary btn-sm" id="preview-blueprint-full-btn">Preview page</button>
        <button type="button" class="btn btn-outline btn-sm" id="copy-blueprint-html-btn">${locked ? 'Unlock Pro kit' : 'Copy HTML'}</button>
        <button type="button" class="btn btn-outline btn-sm" id="copy-blueprint-cli-btn" title="${cli}">Copy CLI</button>
      </div>
    </div>
  `;

  document.getElementById('copy-blueprint-html-btn')?.addEventListener('click', async (e) => {
    const trigger = e.currentTarget as HTMLElement;
    if (bp.tier === 'pro' && !getBrowserToken()) {
      openOverlay(document.getElementById('license-modal'), trigger);
      return;
    }
    const fullHtml = await blueprintHtml(bp);
    if (fullHtml) {
      copyToClipboard(fullHtml, `${bp.name} (Full Page HTML)`, trigger);
    }
  });

  document.getElementById('copy-blueprint-cli-btn')?.addEventListener('click', (e) => {
    copyToClipboard(cli, 'CLI Command', e.currentTarget as HTMLElement);
  });

  document.getElementById('preview-blueprint-full-btn')?.addEventListener('click', (e) => {
    void openFullPreview(bp, e.currentTarget as HTMLElement);
  });
}

async function blueprintHtml(bp: PageBlueprint): Promise<string | null> {
  if (bp.tier !== 'pro') return assembleBlueprintHtml(bp.id);
  const cached = proHtmlCache.get(bp.id);
  if (cached) return cached;
  const token = getBrowserToken();
  if (!token) return assembleBlueprintHtml(bp.id);
  // Offline or a rejected request falls back to the public assembly rather than
  // rejecting into the caller, which would leave the preview modal empty.
  try {
    const res = await fetch(`/r/pro/${bp.id}.json`, {
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return assembleBlueprintHtml(bp.id);
    const data = await res.json().catch(() => ({}));
    if (!data.html) return assembleBlueprintHtml(bp.id);
    proHtmlCache.set(bp.id, data.html as string);
    return data.html as string;
  } catch {
    return assembleBlueprintHtml(bp.id);
  }
}

// Full size image preview. Used for a locked Pro section card and for the
// Preview page button on a locked Pro kit, where the assembled blueprint would
// otherwise be a column of stubs.
function openImagePreview(title: string, rec: PreviewRecord, trigger?: HTMLElement | null) {
  if (!fullPreviewModal || !fullPreviewContent || !fullPreviewTitle) return;

  fullPreviewTitle.textContent = `${title} - Preview`;
  const copyBtn = document.getElementById('copy-preview-html');
  if (copyBtn) copyBtn.hidden = true;
  fullPreviewModal.querySelector('.blueprint-modal-dialog')?.classList.add('is-image');

  fullPreviewContent.innerHTML = `
    <div class="preview-modal-image">
      <img class="preview-modal-img" src="${rec.src}" alt="${title} full preview" width="${rec.width}" height="${rec.height}">
    </div>
  `;

  openOverlay(fullPreviewModal, trigger);
}

async function openFullPreview(bp: PageBlueprint, trigger?: HTMLElement | null) {
  if (!fullPreviewModal || !fullPreviewContent || !fullPreviewTitle) return;

  const rec = previewFor(bp.id, bp.tier);
  if (rec) {
    openImagePreview(bp.name, rec, trigger);
    return;
  }

  const copyBtn = document.getElementById('copy-preview-html');
  if (copyBtn) copyBtn.hidden = false;
  fullPreviewModal.querySelector('.blueprint-modal-dialog')?.classList.remove('is-image');
  fullPreviewTitle.textContent = `${bp.name} - full page kit`;
  const fullHtml = await blueprintHtml(bp);

  fullPreviewContent.innerHTML = fullHtml
    ? `<div class="template-assembled ${blueprintKind(bp) === 'wireframe' ? 'is-wireframe-mode' : ''}">
      ${fullHtml}
    </div>`
    : '<p class="p-6 text-sm text-muted">This page kit could not be assembled. Try again, or copy it from the CLI.</p>';

  openOverlay(fullPreviewModal, trigger);
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
      ? `${items.length} sections in order`
      : `${items.length} of ${templatesInMode().length} ${previewMode} sections`;
  }

  if (items.length === 0) {
    templatesStream.innerHTML = `
      <div class="empty-state">
        <h3 class="empty-state-title">No sections match</h3>
        <p class="empty-state-description">Clear the search, or choose All.</p>
        <button class="btn btn-outline btn-sm" id="reset-filter-btn">Reset filters</button>
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
    const tierBadge = isPro ? `<span class="docs-pro-tag">PRO</span>` : '';
    // With a preview image the Unlock Pro control moves into the overlay bar at
    // the bottom of the frame, so the header keeps only the neutral toggles.
    const preview = previewFor(template.id, template.tier);
    const copyBtn = isPro
      ? (preview ? '' : `<button class="btn btn-primary btn-xs unlock-pro-btn" data-id="${template.id}">Unlock Pro</button>`)
      : `<button class="btn btn-outline btn-xs copy-html-btn" data-id="${template.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span>Copy HTML</span>
          </button>`;
    const codeBlock = isPro
      ? `<pre><code>Subscribe at https://llmcss.io then:
npx llmcss login &lt;token&gt;
npx llmcss template get ${template.id}</code></pre>`
      : `<pre><code>${escapeHtml(template.html)}</code></pre>`;
    return `
    <article class="template-card" id="card-${template.id}">
      <div class="template-header">
        <div class="flex items-center gap-2">
          ${recipeIndex ? `<span class="text-xs text-muted">${recipeIndex} of ${recipeTotal}</span>` : ''}
          <h3 class="template-title">${template.name}</h3>
          ${tierBadge}
        </div>
        <div class="flex items-center gap-2 template-actions">
          <button type="button" class="btn btn-ghost btn-xs template-guidance-toggle" data-target="guidance-${template.id}" aria-expanded="false" aria-controls="guidance-${template.id}">
            <span>Guidance</span>
          </button>
          ${copyBtn}
          <button type="button" class="btn btn-ghost btn-xs template-code-toggle" data-target="code-${template.id}" aria-expanded="false" aria-controls="code-${template.id}" aria-label="Markup">
            <span>&lt;/&gt;</span>
          </button>
        </div>
      </div>

      <!-- Architectural Placement & Usage Guidance Box -->
      <div class="template-guidance" id="guidance-${template.id}">
        <div class="guidance-grid">
          <div class="guidance-col">
            <div class="guidance-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              <span>Placement</span>
            </div>
            <div class="guidance-text">${template.placement ? template.placement + '. ' : ''}${template.guidance.placement}</div>
          </div>
          <div class="guidance-col">
            <div class="guidance-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Use for</span>
            </div>
            <div class="guidance-text">${template.guidance.bestUsedFor}</div>
          </div>
          <div class="guidance-col">
            <div class="guidance-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              <span>Avoid</span>
            </div>
            <div class="guidance-text">${template.guidance.avoidWhen}</div>
          </div>
          ${template.guidance.pairsWith.length > 0 ? `
            <div class="guidance-col">
              <div class="guidance-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                <span>Pairs with</span>
              </div>
              <div class="guidance-pairs">
                ${template.guidance.pairsWith.map((pairId) => {
                  const pair = wireframeTemplates.find((t) => t.id === pairId);
                  return `<button class="guidance-pair-tag jump-to-pair" data-jump="${pairId}">${pair ? pair.name : pairId}</button>`;
                }).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Live Preview Canvas -->
      <div class="template-canvas" data-vw="${currentViewport}">
        <div class="template-frame ${templateKind(template) === 'wireframe' ? 'is-wireframe-mode' : ''}${preview ? ' has-preview' : ''}">
          ${preview ? `${previewImageTag(preview, `${template.name} preview`)}
          <div class="template-preview-bar">
            <button class="btn btn-ghost btn-xs preview-full-btn" data-id="${template.id}">Preview full size</button>
            <button class="btn btn-primary btn-xs unlock-pro-btn" data-id="${template.id}">Unlock Pro</button>
          </div>` : template.html}
        </div>
      </div>

      <!-- Expandable Code Panel -->
      <div class="template-code" id="code-${template.id}">
        <div class="flex justify-between items-center mb-2">
          <span class="font-mono text-xs text-muted">
            npx llmcss template get ${template.id}
          </span>
          <button class="btn btn-ghost btn-xs copy-snippet-btn" data-id="${template.id}">Copy</button>
        </div>
        ${codeBlock}
      </div>
    </article>
  `;
  }).join('');

  // Wire event handlers
  attachTemplateCardHandlers();
  syncPreviewViewport();
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
      // One section that fails to load leaves its locked card in place; the
      // rest of the catalog still hydrates.
      try {
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
      } catch {
        continue;
      }
    }
    t.html = html;
    const css = proCssCache.get(t.id) || '';
    if (css && !document.getElementById(`pro-css-${t.id}`)) {
      const style = document.createElement('style');
      style.id = `pro-css-${t.id}`;
      style.textContent = css;
      document.head.appendChild(style);
    }
    const frame = card.querySelector('.template-frame');
    if (frame) frame.innerHTML = html;
    const panel = card.querySelector(`#code-${t.id}`);
    if (panel) {
      panel.innerHTML = `<div class="flex justify-between items-center mb-2">
          <span class="font-mono text-xs text-muted">
            npx llmcss template get ${t.id}
          </span>
          <button class="btn btn-ghost btn-xs copy-snippet-btn" data-id="${t.id}">Copy</button>
        </div>
        <pre><code>${escapeHtml(html)}</code></pre>`;
    }
    const copyHtmlBtn = () => {
      const copy = document.createElement('button');
      copy.type = 'button';
      copy.className = 'btn btn-outline btn-xs copy-html-btn';
      copy.setAttribute('data-id', t.id);
      copy.textContent = 'Copy HTML';
      return copy;
    };
    const unlock = card.querySelector('.unlock-pro-btn') as HTMLElement | null;
    if (unlock) {
      // Replace the node rather than re-labelling it. The old element is already
      // in the bound set with the Unlock handler on it, and a bound element is
      // never bound again, so re-labelling would leave a dead control.
      unlock.replaceWith(copyHtmlBtn());
    } else {
      // The Unlock Pro control lived in the preview overlay, which the real
      // markup has just replaced, so put a Copy HTML back in the header.
      const actions = card.querySelector('.template-actions');
      if (actions && !actions.querySelector('.copy-html-btn')) {
        actions.insertBefore(copyHtmlBtn(), actions.querySelector('.template-code-toggle'));
      }
    }
  }
  attachTemplateCardHandlers();
}

// attachTemplateCardHandlers runs after every render and again after Pro
// hydration, which swaps some controls in place and leaves others alone. A
// second addEventListener on a surviving button would fire its action twice, so
// every element is bound once and skipped after that, the way the combobox
// runtime tracks wired elements.
const boundCardControls = new WeakSet<Element>();

function bindOnce(selector: string, bind: (el: Element) => void) {
  document.querySelectorAll(selector).forEach((el) => {
    if (boundCardControls.has(el)) return;
    boundCardControls.add(el);
    bind(el);
  });
}

// One disclosure toggle: flip the panel, then report the new state on the
// button. aria-controls points at the panel id, which the card markup carries.
function bindDisclosure(btn: Element) {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    const open = el.classList.toggle('is-open');
    btn.classList.toggle('is-active', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

function attachTemplateCardHandlers() {
  // Guidance toggles
  bindOnce('.template-guidance-toggle', bindDisclosure);

  // Code toggles
  bindOnce('.template-code-toggle', bindDisclosure);

  // Copy HTML
  bindOnce('.copy-html-btn', (btn) => {
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

  // Open the rendered screenshot at full size in the blueprint preview modal
  bindOnce('.preview-full-btn', (btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const t = wireframeTemplates.find((x) => x.id === id);
      const rec = id ? previewFor(id, t?.tier) : undefined;
      if (rec) openImagePreview(t ? t.name : rec.name, rec, btn as HTMLElement);
    });
  });

  bindOnce('.unlock-pro-btn', (btn) => {
    btn.addEventListener('click', async () => {
      if (getBrowserToken()) {
        await hydrateProTemplates();
        return;
      }
      openOverlay(document.getElementById('license-modal'), btn as HTMLElement);
    });
  });

  // Copy Code snippet
  bindOnce('.copy-snippet-btn', (btn) => {
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
  bindOnce('.copy-cli-btn', (btn) => {
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
  bindOnce('.jump-to-pair', (btn) => {
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
  categoryNav?.querySelectorAll('.docs-nav-btn').forEach((btn) => {
    const cat = btn.getAttribute('data-category');
    const count = cat === 'all' ? pool.length : pool.filter((t) => t.section === cat).length;
    const countEl = btn.querySelector('.docs-count');
    if (countEl) countEl.textContent = String(count);
    // A category with nothing in this mode is dropped rather than shown as a dead row
    (btn as HTMLElement).hidden = count === 0;
    btn.toggleAttribute('disabled', !!activeBlueprintId);
    setPressed(btn, !activeBlueprintId && cat === activeCategory);
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================
// A plain line in the stream when the catalog itself cannot be drawn. No box,
// no icon: the page keeps its header, sidebar and Styler either way.
function renderStreamFailure() {
  if (!templatesStream) return;
  templatesStream.innerHTML =
    '<p class="text-sm text-muted">The template gallery could not be loaded. Reload the page, or run npx llmcss template list.</p>';
}

async function init() {
  // The header, footer and preview manifest are all network work. Either one
  // failing used to abort init and leave a blank gallery, so each is contained
  // and the render below runs regardless.
  try {
    await mountChrome();
  } catch {
    // Header and footer are progressive chrome; the gallery works without them.
  }
  // chrome.ts has just rendered the header, so the search field exists now
  searchInput = document.getElementById('template-search') as HTMLInputElement | null;
  bindFontSwitchers(() => applyThemeSettings());
  bindStylerControls();
  applyThemeSettings();
  // Loaded before the first render so locked Pro cards reserve the image height
  await loadPreviewManifest();

  try {
    syncModeButtons();
    updateCategoryButtons();

    // 1. Render Blueprints
    renderBlueprintNav();
    renderBlueprintBanner();

    // 2. Render Initial Templates
    renderTemplates();
  } catch {
    renderStreamFailure();
  }

  document.getElementById('license-activate-btn')?.addEventListener('click', async () => {
    const input = document.getElementById('license-token-input') as HTMLInputElement | null;
    const status = document.getElementById('license-status');
    const token = (input?.value || '').trim();
    if (status) status.textContent = 'Checking...';
    const data = await validateToken(token);
    if (status) {
      status.innerHTML = data.valid
        ? '<span class="badge badge-success">Active</span>'
        : '<span class="badge badge-danger">Not valid</span>';
    }
    if (data.valid) {
      setBrowserToken(token);
      try {
        await hydrateProTemplates();
        showToast('Pro catalog unlocked in this browser', 'success');
      } catch {
        showToast('License accepted, but the Pro catalog did not load. Reload the page.', 'error');
      }
    }
  });

  // 3. Category Nav Handlers
  categoryNav?.querySelectorAll('.docs-nav-btn').forEach((btn) => {
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
    // Free kits are built from wireframe sections and Pro kits from themed ones,
    // so the mode follows the kit while one is active
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
  const modeButtons = document.querySelectorAll('.js-preview-mode-btn');
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (activeBlueprintId) return;
      const mode = btn.getAttribute('data-mode') as 'wireframe' | 'themed';
      if (mode === 'wireframe' || mode === 'themed') setPreviewMode(mode);
    });
  });

  // The same flip from the wireframe upsell strip, which also drops any kit
  // filter so the themed sections are what lands on screen.
  document.getElementById('show-themed-btn')?.addEventListener('click', () => {
    activeBlueprintId = null;
    renderBlueprintBanner();
    setPreviewMode('themed');
  });

  // The header toggle lives in chrome.ts, which announces the change so this
  // page can mirror the value and swap the locked Pro previews to their dark
  // renders. applyThemeSettings ends in syncPreviewViewport.
  document.addEventListener('ai-theme-change', () => applyThemeSettings());

  // 6. Viewport Controls
  const viewportButtons = document.querySelectorAll('.js-viewport-btn');
  viewportButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentViewport = btn.getAttribute('data-viewport') || 'full';
      viewportButtons.forEach((b) => setPressed(b, b === btn));
      document.querySelectorAll('.template-canvas').forEach((c) => {
        c.setAttribute('data-vw', currentViewport);
      });
      syncPreviewViewport();
    });
  });

  // 7. Light/Dark Mode. chrome.ts owns #theme-mode-toggle and persists the
  // choice; a second handler here only set activeTheme, which applyThemeSettings
  // then read back from storage, so it did nothing. The ai-theme-change listener
  // above is the page's hook into that toggle.

  // 8. Preview modal. The Close button carries data-ai-dismiss="modal" and
  // Escape is the runtime's, so the only thing left here is the scrim: the
  // preview modal paints its own backdrop instead of holding a .modal-backdrop
  // child, so a click on the overlay itself is routed to the runtime close.
  fullPreviewModal?.addEventListener('click', (e) => {
    if (e.target === fullPreviewModal) closeOverlay(fullPreviewModal);
  });
  const copyPreview = document.getElementById('copy-preview-html');
  copyPreview?.addEventListener('click', async (e) => {
    if (!activeBlueprintId) return;
    const bp = pageBlueprints.find((b) => b.id === activeBlueprintId);
    if (!bp) return;
    const trigger = e.currentTarget as HTMLElement;
    const html = await blueprintHtml(bp);
    if (html) copyToClipboard(html, 'Page HTML', trigger);
    else showToast('That page kit could not be assembled to copy', 'error');
  });

  // 10. Copy All Blueprint CLI
  document.getElementById('header-copy-cli-btn')?.addEventListener('click', (e) => {
    copyToClipboard('npx llmcss template list', 'CLI Template Command', e.currentTarget as HTMLElement);
  });
}

document.addEventListener('DOMContentLoaded', init);
