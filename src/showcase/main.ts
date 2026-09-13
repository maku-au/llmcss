import '../css/index.css';
import '../runtime/index';
import { components } from '../registry/components';
import { applyDisplayFont, bindFontSwitchers, getActiveFontId, DISPLAY_FONTS } from './fonts';
import { mountChrome, applyTheme, currentTheme, readPref, writePref, catalogStats } from './chrome';
import { addCopyButtons, copyToClipboard, showToast } from './copy';

// ============================================================================
// STATE DEFINITIONS
// ============================================================================
let activeCategory = 'all';
let searchQuery = '';
let currentViewport = '100%';

// Core Styler State. readPref and writePref live in chrome.ts and speak the
// llmcss-* keys, falling back once to the legacy cssai-* name.
let activeSkin = readPref('skin') || 'modern';
let activeTheme = readPref('theme') || document.documentElement.getAttribute('data-ai-theme') || 'light';
let activeRadius = readPref('radius') || 'balanced';
let activeDensity = readPref('density') || 'standard';
let activeAccent = readPref('accent') || 'default';

// Per-Component Customization State
interface ComponentCustomization {
  variant?: string;
  size?: string;
  state?: string;
  density?: string;
  accent?: string;
  elevation?: string;
}

const componentCustomizations: Record<string, ComponentCustomization> = {};

// Selected layout variant per component id. '' means the default layout.
// Kept in its own map, not inside ComponentCustomization, so resetting the
// customizer can never silently reset the layout: the two controls have
// different contracts. The customizer is preview only; a variant is a registry
// snippet, so it changes what Copy HTML, the Code panel and the CLI hand back.
const componentVariants: Record<string, string> = {};

type CatalogComponent = (typeof components)[number];
type CatalogVariant = NonNullable<CatalogComponent['variants']>[number];

function selectedVariant(comp: CatalogComponent): CatalogVariant | null {
  const id = componentVariants[comp.id];
  if (!id) return null;
  return (comp.variants || []).find((v) => v.id === id) || null;
}

/** The registry snippet the card is currently showing, before customization. */
function baseHtmlFor(comp: CatalogComponent): string {
  return selectedVariant(comp)?.html ?? comp.html;
}

/** Canonical reference for the CLI snippet and the permalink: id or id:variant. */
function refFor(comp: CatalogComponent): string {
  const v = selectedVariant(comp);
  return v ? `${comp.id}:${v.id}` : comp.id;
}

// DOM Elements
const streamEl = document.getElementById('components-stream');
let searchInput = document.getElementById('catalog-search') as HTMLInputElement | null;
let themeToggle = document.getElementById('theme-mode-toggle');

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================================
// GLOBAL CORE STYLER CONTROLLER
// ============================================================================
function applyGlobalTokens() {
  const root = document.documentElement;

  // 1. Theme Skin (Palette)
  if (activeSkin === 'modern') {
    root.removeAttribute('data-ai-skin');
  } else {
    root.setAttribute('data-ai-skin', activeSkin);
  }
  writePref('skin', activeSkin);

  // 2. Light / Dark Theme Mode
  activeTheme = currentTheme();
  root.setAttribute('data-ai-theme', activeTheme);
  writePref('theme', activeTheme);
  updateThemeToggleIcon(activeTheme);

  // 3. Corner Geometry (Radius Scale). The library ships the four archetypes
  // as a [data-ai-radius] block in tokens.css, so this is an attribute, not a
  // pile of inline custom properties. "precision" is the stock :root scale and
  // is expressed by removing the attribute, the same way "standard" density is.
  if (activeRadius === 'precision') {
    root.removeAttribute('data-ai-radius');
  } else {
    root.setAttribute('data-ai-radius', activeRadius);
  }
  writePref('radius', activeRadius);

  // 4. Spacing Density
  if (activeDensity === 'compact') {
    root.style.setProperty('--ai-space-1', '0.2rem');
    root.style.setProperty('--ai-space-2', '0.375rem');
    root.style.setProperty('--ai-space-3', '0.5rem');
    root.style.setProperty('--ai-space-4', '0.75rem');
    root.style.setProperty('--ai-space-5', '1rem');
    root.style.setProperty('--ai-space-6', '1.125rem');
    root.style.setProperty('--ai-space-8', '1.5rem');
  } else if (activeDensity === 'spacious') {
    root.style.setProperty('--ai-space-1', '0.3rem');
    root.style.setProperty('--ai-space-2', '0.625rem');
    root.style.setProperty('--ai-space-3', '0.875rem');
    root.style.setProperty('--ai-space-4', '1.25rem');
    root.style.setProperty('--ai-space-5', '1.5rem');
    root.style.setProperty('--ai-space-6', '1.75rem');
    root.style.setProperty('--ai-space-8', '2.25rem');
  } else {
    // Standard
    [
      '--ai-space-1',
      '--ai-space-2',
      '--ai-space-3',
      '--ai-space-4',
      '--ai-space-5',
      '--ai-space-6',
      '--ai-space-8',
    ].forEach((p) => root.style.removeProperty(p));
  }
  writePref('density', activeDensity);

  // 5. Accent Override.
  // Accents live in the stylesheet as data-ai-accent, so the Styler only sets
  // the attribute: no inline variables, and the exported CSS stays one line.
  // Every swatch id in the Styler markup (steel, teal, emerald, violet, rose,
  // amber) maps to an accent in themes.css; 'default' is the stock blue and is
  // expressed by removing the attribute.
  const ACCENTS = ['steel', 'teal', 'emerald', 'violet', 'rose', 'amber'];
  if (ACCENTS.includes(activeAccent)) {
    root.setAttribute('data-ai-accent', activeAccent);
  } else {
    root.removeAttribute('data-ai-accent');
  }
  // Clear any inline accent left by an older build of the Styler.
  ['--ai-accent', '--ai-accent-hover', '--ai-accent-subtle', '--ai-accent-rgb'].forEach((p) => root.style.removeProperty(p));
  writePref('accent', activeAccent);

  applyDisplayFont(getActiveFontId());

  // Update Core Styler UI Controls State
  updateCoreStylerUI();
}

// Every Styler control is a toggle button in a named group, so is-active and
// aria-pressed always move together. setPressed is the single place that pairs
// them, and nothing sets is-active without it.
function setPressed(el: Element, on: boolean) {
  el.classList.toggle('is-active', on);
  el.setAttribute('aria-pressed', on ? 'true' : 'false');
}

function updateCoreStylerUI() {
  // Theme Grid
  document.querySelectorAll('#styler-theme-grid .styler-theme-btn').forEach((btn) => {
    setPressed(btn, btn.getAttribute('data-skin') === activeSkin);
  });

  // The header reads out the literal data-ai-skin value. modern is the stock
  // theme and sets no attribute at all, so it reads "unset".
  const activeThemeLabel = document.getElementById('styler-active-theme-label');
  if (activeThemeLabel) {
    activeThemeLabel.textContent = activeSkin === 'modern' ? 'unset' : activeSkin;
  }

  // Radius Pills
  document.querySelectorAll('.js-styler-radius-btn').forEach((btn) => {
    setPressed(btn, btn.getAttribute('data-radius') === activeRadius);
  });
  const radiusLabel = document.getElementById('styler-radius-label');
  if (radiusLabel) {
    radiusLabel.textContent =
      activeRadius === 'sharp'
        ? 'Sharp (0px)'
        : activeRadius === 'precision'
        ? 'Precision (2-4px)'
        : activeRadius === 'smooth'
        ? 'Smooth (8-14px)'
        : 'Balanced (4-8px)';
  }

  // Density Pills
  document.querySelectorAll('.js-styler-density-btn').forEach((btn) => {
    setPressed(btn, btn.getAttribute('data-density') === activeDensity);
  });
  const densityLabel = document.getElementById('styler-density-label');
  if (densityLabel) {
    densityLabel.textContent =
      activeDensity === 'compact'
        ? 'Compact (0.85x)'
        : activeDensity === 'spacious'
        ? 'Spacious (1.2x)'
        : 'Standard (1.0x)';
  }

  // Accent Swatches
  document.querySelectorAll('.styler-accent-swatch').forEach((btn) => {
    setPressed(btn, btn.getAttribute('data-accent') === activeAccent);
  });

  // Exported CSS Blueprint in Styler Drawer
  const outputEl = document.getElementById('styler-css-output');
  if (outputEl) {
    const lines: string[] = [':root {'];
    if (activeSkin !== 'modern') lines.push(`  /* Archetype: ${activeSkin} */`);
    if (activeRadius === 'sharp') {
      lines.push('  --ai-radius-base: 0px;');
      lines.push('  --ai-radius-xs: 0px; --ai-radius-sm: 0px; --ai-radius-md: 0px;');
    } else if (activeRadius === 'precision') {
      lines.push('  --ai-radius-base: 2px;');
      lines.push('  --ai-radius-xs: 2px; --ai-radius-sm: 3px; --ai-radius-md: 4px;');
    } else if (activeRadius === 'smooth') {
      lines.push('  --ai-radius-base: 6px;');
      lines.push('  --ai-radius-xs: 4px; --ai-radius-sm: 6px; --ai-radius-md: 8px; --ai-radius-lg: 12px;');
    }
    if (activeDensity === 'compact') {
      lines.push('  --ai-space-2: 0.375rem; --ai-space-4: 0.75rem; --ai-space-6: 1.125rem;');
    } else if (activeDensity === 'spacious') {
      lines.push('  --ai-space-2: 0.625rem; --ai-space-4: 1.25rem; --ai-space-6: 1.75rem;');
    }
    if (activeAccent !== 'default') {
      lines.push(`  /* Accent: <html data-ai-accent="${activeAccent}">, or set the token directly: */`);
      const acc = getComputedStyle(document.documentElement).getPropertyValue('--ai-accent').trim();
      if (acc) lines.push(`  --ai-accent: ${acc};`);
    }
    const font = DISPLAY_FONTS.find((f) => f.id === getActiveFontId());
    if (font && font.id !== 'sora') {
      lines.push(`  --ai-font-display: ${font.family};`);
    }
    if (lines.length === 1) {
      lines.push('  /* Default LLMCSS tokens active */');
    }
    lines.push('}');
    outputEl.textContent = lines.join('\n');
  }
}

// ============================================================================
// PER-COMPONENT CUSTOMIZATION ENGINE
// ============================================================================

interface CustomizerGroup {
  name: string;
  prop: keyof ComponentCustomization;
  options: { label: string; value: string }[];
}

function getCustomizerGroupsForComponent(comp: (typeof components)[0]): CustomizerGroup[] {
  const id = comp.id;

  if (id === 'btn-variants' || id === 'btn-sizes') {
    return [
      {
        name: 'Variant',
        prop: 'variant',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Outline', value: 'outline' },
          { label: 'Ghost', value: 'ghost' },
          { label: 'Accent', value: 'accent' },
          { label: 'Destructive', value: 'danger' },
        ],
      },
      {
        name: 'Size',
        prop: 'size',
        options: [
          { label: 'XS', value: 'xs' },
          { label: 'SM', value: 'sm' },
          { label: 'Base', value: 'base' },
          { label: 'LG', value: 'lg' },
        ],
      },
      {
        name: 'State',
        prop: 'state',
        options: [
          { label: 'Normal', value: 'normal' },
          { label: 'Loading', value: 'loading' },
          { label: 'Disabled', value: 'disabled' },
        ],
      },
    ];
  }

  if (id === 'input-text' || id === 'input-addon' || id === 'switch-toggle') {
    return [
      {
        name: 'State',
        prop: 'state',
        options: [
          { label: 'Normal', value: 'normal' },
          { label: 'Focused', value: 'focused' },
          { label: 'Error', value: 'error' },
          { label: 'Disabled', value: 'disabled' },
        ],
      },
    ];
  }

  if (id === 'card-stat' || id === 'bento-grid' || id === 'bento-editorial-pro' || id === 'skeleton-card') {
    return [
      {
        name: 'Elevation',
        prop: 'elevation',
        options: [
          { label: 'Flat', value: 'flat' },
          { label: 'shadow-lg', value: 'elevated' },
          { label: 'shadow-xl', value: 'specular' },
        ],
      },
      {
        name: 'Density',
        prop: 'density',
        options: [
          { label: 'Compact', value: 'compact' },
          { label: 'Standard', value: 'standard' },
          { label: 'Spacious', value: 'spacious' },
        ],
      },
    ];
  }

  if (id === 'animated-loaders') {
    return [
      {
        name: 'Loader Style',
        prop: 'variant',
        options: [
          { label: 'Arc Spinner', value: 'spinner' },
          { label: 'Dual Orbit Ring', value: 'ring' },
          { label: 'Pulse Radar Dot', value: 'pulse' },
        ],
      },
      // Loader speed is fixed in animations.css and has no class or attribute
      // to drive it, so the customizer does not pretend to offer one.
      {
        name: 'Accent',
        prop: 'accent',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'teal', value: 'teal' },
          { label: 'emerald', value: 'emerald' },
          { label: 'rose', value: 'rose' },
        ],
      },
    ];
  }

  if (id === 'progress-bars') {
    return [
      {
        name: 'Mode',
        prop: 'variant',
        options: [
          { label: 'Determinate', value: 'determinate' },
          { label: 'Indeterminate', value: 'indeterminate' },
          { label: 'Striped', value: 'striped' },
        ],
      },
      {
        name: 'Tone',
        prop: 'accent',
        options: [
          { label: 'Accent', value: 'default' },
          { label: 'progress-bar-success', value: 'success' },
          { label: 'progress-bar-warning', value: 'warning' },
        ],
      },
    ];
  }

  if (id === 'interactive-slider') {
    return [
      {
        name: 'Accent',
        prop: 'accent',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'teal', value: 'teal' },
          { label: 'emerald', value: 'emerald' },
        ],
      },
      {
        name: 'Density',
        prop: 'density',
        options: [
          { label: 'Standard', value: 'standard' },
          { label: 'Compact', value: 'compact' },
        ],
      },
    ];
  }

  if (id === 'pricing-matrix-pro' || id === 'table-matrix') {
    return [
      {
        name: 'Billing Cycle',
        prop: 'variant',
        options: [
          { label: 'Monthly ($9/mo)', value: 'monthly' },
          { label: 'Annual (custom)', value: 'annual' },
        ],
      },
      {
        name: 'Density',
        prop: 'density',
        options: [
          { label: 'Standard', value: 'standard' },
          { label: 'Compact Table', value: 'compact' },
        ],
      },
    ];
  }

  // Generic fallback customizer. Every option here maps to a documented
  // data-ai-* attribute or a published utility class, so the markup the card
  // copies out is markup you can paste anywhere. Corner radius is deliberately
  // absent: the library has no radius attribute, and setting --ai-radius-* on a
  // wrapper would mean shipping an inline style in the copied snippet.
  return [
    {
      name: 'Skin',
      prop: 'variant',
      options: [
        { label: 'Inherit', value: 'inherit' },
        { label: 'obsidian', value: 'obsidian' },
        { label: 'editorial', value: 'editorial' },
        { label: 'executive', value: 'executive' },
        { label: 'fintech', value: 'fintech' },
        { label: 'enterprise', value: 'enterprise' },
      ],
    },
    {
      name: 'Density',
      prop: 'density',
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Standard', value: 'standard' },
        { label: 'Spacious', value: 'spacious' },
      ],
    },
  ];
}

function renderCustomizerBar(comp: (typeof components)[0]): string {
  const groups = getCustomizerGroupsForComponent(comp);
  const current = componentCustomizations[comp.id] || {};

  return `
    <div class="demo-toolbar hidden" id="customize-${comp.id}" hidden>
      <span class="badge badge-neutral font-mono text-xs">Customizer</span>
      ${groups
        .map((g) => {
          const activeVal = current[g.prop] || g.options[0].value;
          return `
          <div class="demo-toolbar-group">
            <span class="demo-toolbar-label">${g.name}:</span>
            <div class="demo-pills" role="group" aria-label="${g.name} for ${comp.name}">
              ${g.options
                .map(
                  (opt) => `
                <button type="button" class="demo-pill ${opt.value === activeVal ? 'is-active' : ''}"
                        aria-pressed="${opt.value === activeVal}"
                        data-id="${comp.id}"
                        data-prop="${g.prop}"
                        data-val="${opt.value}">
                  ${opt.label}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        })
        .join('')}
      <button type="button" class="btn btn-ghost btn-xs reset-customizer-btn ml-auto" data-id="${comp.id}">Reset</button>
    </div>
  `;
}

function generateCustomizedHtml(comp: (typeof components)[0]): string {
  const custom = componentCustomizations[comp.id];
  // The base is whatever layout the card is showing. None of the components
  // with a bespoke rewrite below ships variants, so the rewrites never collide
  // with a selection, and the generic wrapper at the end works on any variant.
  if (!custom) return baseHtmlFor(comp);

  let html = baseHtmlFor(comp);

  // 1. Button modifications
  if (comp.id === 'btn-variants' || comp.id === 'btn-sizes') {
    const variantClass = custom.variant ? `btn-${custom.variant}` : 'btn-primary';
    const sizeClass = custom.size && custom.size !== 'base' ? `btn-${custom.size}` : '';
    const stateClass = custom.state === 'loading' ? 'is-loading' : '';
    const disabledAttr = custom.state === 'disabled' ? 'disabled' : '';

    return `<div class="flex flex-wrap gap-3 items-center">
  <button class="btn ${variantClass} ${sizeClass} ${stateClass}" ${disabledAttr} ${custom.state === 'loading' ? 'aria-busy="true"' : ''}>
    ${custom.variant ? custom.variant.toUpperCase() : 'CUSTOMIZED'} BUTTON
  </button>
  <button class="btn btn-outline ${sizeClass}">Secondary Action</button>
  <button class="btn btn-ghost ${sizeClass}">Ghost Subtle</button>
</div>`;
  }

  // 1b. Input states (Focused, Error, Disabled)
  if (comp.id === 'input-text') {
    const stateClass = custom.state === 'focused' ? 'is-focused' : custom.state === 'error' ? 'is-error' : '';
    const disabledAttr = custom.state === 'disabled' ? 'disabled' : '';
    const errorMarkup =
      custom.state === 'error'
        ? '<span class="form-error mt-1">Please enter a valid engineering email.</span>'
        : '<span class="form-hint">We\'ll send your workspace invite here.</span>';

    return `<div class="grid gap-4 max-w-sm">
  <div class="form-group">
    <label class="form-label" for="user-email">Email Address</label>
    <input type="email" id="user-email" class="input ${stateClass}" placeholder="name@company.com" value="${custom.state === 'focused' ? 'alex.chen@acme.dev' : ''}" ${disabledAttr} />
    ${errorMarkup}
  </div>
  <div class="form-group">
    <label class="form-label" for="user-bio">Description</label>
    <textarea id="user-bio" class="textarea ${stateClass}" placeholder="Tell us about your project..." ${disabledAttr}></textarea>
  </div>
</div>`;
  }

  if (comp.id === 'input-addon') {
    const stateClass = custom.state === 'focused' ? 'is-focused' : custom.state === 'error' ? 'is-error' : '';
    const disabledAttr = custom.state === 'disabled' ? 'disabled' : '';

    return `<div class="form-group max-w-md">
  <label class="form-label">Project URL</label>
  <div class="input-group">
    <span class="input-addon">https://</span>
    <input type="text" class="input ${stateClass}" placeholder="your-domain" value="${custom.state === 'focused' ? 'llmcss-preview' : ''}" ${disabledAttr} />
    <span class="input-addon">.dev</span>
  </div>
  <span class="form-hint">Production DNS routing will point to this hostname.</span>
</div>`;
  }

  if (comp.id === 'switch-toggle') {
    const checkedAttr = custom.state === 'focused' ? 'checked' : '';
    const disabledAttr = custom.state === 'disabled' ? 'disabled' : '';

    return `<div class="flex flex-col gap-4">
  <label class="switch">
    <input type="checkbox" class="switch-input" checked ${disabledAttr} />
    <span class="switch-track"><span class="switch-thumb"></span></span>
    <span class="text-sm font-medium">Strict Type Checking</span>
  </label>
  <label class="switch">
    <input type="checkbox" class="switch-input" ${checkedAttr} ${disabledAttr} />
    <span class="switch-track"><span class="switch-thumb"></span></span>
    <span class="text-sm font-medium">Automated Rollback on Error</span>
  </label>
</div>`;
  }

  // 2. Loaders modification. Every loader colour in the library comes from
  // --ai-accent, so the accent is a documented data-ai-accent attribute on the
  // row rather than a hand-mixed hex.
  if (comp.id === 'animated-loaders') {
    const v = custom.variant || 'spinner';
    const accent = custom.accent && custom.accent !== 'default' ? ` data-ai-accent="${custom.accent}"` : '';

    if (v === 'ring') {
      return `<div class="flex items-center gap-4"${accent}>
  <div class="spinner-ring"></div>
  <span class="text-xs font-mono text-secondary">Dual orbit loader</span>
</div>`;
    }
    if (v === 'pulse') {
      return `<div class="flex items-center gap-3"${accent}>
  <span class="status-pip is-streaming"></span>
  <span class="text-xs font-mono text-secondary">Status pip, streaming</span>
</div>`;
    }
    return `<div class="flex items-center gap-4"${accent}>
  <span class="spinner"></span>
  <span class="text-xs font-mono text-secondary">Arc motion spinner</span>
</div>`;
  }

  // 3. Progress bar modification. progress-indeterminate and progress-striped
  // are parent modifiers, and the fill tone has its own published classes.
  if (comp.id === 'progress-bars') {
    const v = custom.variant || 'determinate';
    const tone =
      custom.accent === 'success' ? ' progress-bar-success' : custom.accent === 'warning' ? ' progress-bar-warning' : '';

    if (v === 'indeterminate') {
      return `<div class="progress progress-indeterminate max-w-sm">
  <div class="progress-bar${tone}"></div>
</div>`;
    }
    if (v === 'striped') {
      return `<div class="progress progress-striped max-w-sm">
  <div class="progress-bar w-3/4${tone}"></div>
</div>`;
    }
    return `<div class="progress max-w-sm">
  <div class="progress-bar w-2/3${tone}"></div>
</div>`;
  }

  // 4. Wrapper knobs. Everything here is either a documented data-ai-*
  // attribute (states.json) or a published utility class (classes.json), so the
  // snippet the card copies out is markup you can paste into your own page.
  const SKINS = ['obsidian', 'editorial', 'executive', 'fintech', 'enterprise'];
  const ACCENT_VALUES = ['emerald', 'violet', 'rose', 'teal', 'steel', 'amber'];

  const attrs: string[] = [];
  if (custom.variant && SKINS.includes(custom.variant)) attrs.push(`data-ai-skin="${custom.variant}"`);
  if (custom.accent && ACCENT_VALUES.includes(custom.accent)) attrs.push(`data-ai-accent="${custom.accent}"`);
  if (custom.density === 'compact' || custom.density === 'spacious') {
    attrs.push(`data-ai-density="${custom.density}"`);
  }

  const classes = ['w-full', 'max-w-full'];
  if (custom.elevation === 'elevated') classes.push('shadow-lg');
  if (custom.elevation === 'specular') classes.push('shadow-xl');

  if (attrs.length === 0 && classes.length === 2) return html;

  const openTag = ['<div', ...attrs, `class="${classes.join(' ')}">`].join(' ');
  return `${openTag}
  ${html}
</div>`;
}

function applyComponentCustomization(id: string) {
  const comp = components.find((c) => c.id === id);
  if (!comp) return;

  const customizedHtml = generateCustomizedHtml(comp);

  // Update Preview DOM
  const previewContainer = document.querySelector(`#comp-${id} .demo-canvas > div`);
  if (previewContainer) {
    previewContainer.innerHTML = customizedHtml;
  }

  // The code panel and the Copy HTML button both show the customised markup,
  // so what you read is what lands on your clipboard.
  const panel = document.getElementById(`code-${id}`);
  if (panel) {
    panel.innerHTML = `<div class="flex justify-between items-center mb-2">
            <span class="text-xs font-mono text-muted">HTML</span>
          </div>
          <pre><code>${escapeHtml(customizedHtml)}</code></pre>`;
    addCopyButtons(panel);
  }

  // Re-bind events inside preview if slider or controls
  rebindPreviewControls(id);
}

function rebindPreviewControls(id: string) {
  const preview = document.querySelector(`#comp-${id} .demo-canvas`);
  if (!preview) return;

  preview.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach((slider) => {
    slider.addEventListener('input', () => {
      const wrapper = slider.closest('.slider-wrapper');
      if (wrapper) {
        const valEl = wrapper.querySelector('.slider-value');
        if (valEl) valEl.textContent = slider.value;
      }
    });
  });
}

// ============================================================================
// COMPONENT RENDERING & SIDEBAR
// ============================================================================
function updateSidebarCounts() {
  const total = components.length;
  const primitives = components.filter((c) => c.category === 'primitive').length;
  const marketing = components.filter((c) => c.category === 'marketing').length;
  const application = components.filter((c) => c.category === 'application').length;
  const ecommerce = components.filter((c) => c.category === 'ecommerce').length;

  const countAll = document.getElementById('count-all');
  if (countAll) countAll.textContent = String(total);

  const countPrim = document.getElementById('count-primitive');
  if (countPrim) countPrim.textContent = String(primitives);

  const countMkt = document.getElementById('count-marketing');
  if (countMkt) countMkt.textContent = String(marketing);

  const countApp = document.getElementById('count-application');
  if (countApp) countApp.textContent = String(application);

  const countEcom = document.getElementById('count-ecommerce');
  if (countEcom) countEcom.textContent = String(ecommerce);

  // Category and tier counts are component counts and stay that way: a variant
  // is not a component. The layout total gets one muted line of its own, and
  // the number comes from stats.json through the same data-ai-stat hook the
  // rest of the site uses, so it is never typed here.
  const stack = countAll?.closest('.docs-nav-stack');
  if (stack && !document.getElementById('catalog-variant-note')) {
    const note = document.createElement('p');
    note.className = 'docs-nav-note';
    note.id = 'catalog-variant-note';
    note.innerHTML = `<span data-ai-stat="variants">${catalogStats.variants}</span> layout variants, addressed <span class="font-mono">id:variant</span>.`;
    stack.insertAdjacentElement('afterend', note);
  }
}

// Keeps the address bar in step with the catalog so a filtered view can be
// pasted to someone else. replaceState, not pushState: filtering is not a
// navigation, and the back button should still leave the page.
function syncUrlToFilters() {
  const url = new URL(window.location.href);
  const q = searchQuery.trim();
  if (q) url.searchParams.set('q', q);
  else url.searchParams.delete('q');
  if (activeCategory && activeCategory !== 'all') url.searchParams.set('cat', activeCategory);
  else url.searchParams.delete('cat');
  history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}

function readFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) searchQuery = q;
  const cat = params.get('cat');
  const known = ['all', 'primitive', 'marketing', 'application', 'ecommerce'];
  if (cat && known.includes(cat)) activeCategory = cat;
}

// A segmented control in the card header, Default first. It sits in the same
// row as the action buttons because that row already owns "controls that change
// the preview", and a closed select would hide the one thing worth saying at
// rest: how many layouts there are. The header wraps at 400px, which is why the
// control comes first in source order and the buttons follow it.
function renderVariantControl(comp: CatalogComponent): string {
  const list = comp.variants || [];
  if (list.length === 0) return '';
  const active = componentVariants[comp.id] || '';
  const button = (value: string, label: string) => {
    const on = value === active;
    return `<button type="button" class="segmented-btn js-variant-btn${on ? ' is-active' : ''}"
                    aria-pressed="${on}" data-id="${comp.id}" data-variant="${value}">${label}</button>`;
  };
  return `<div class="segmented docs-variant-group" role="group" aria-label="Layout for ${escapeHtml(comp.name)}">
              ${button('', 'Default')}
              ${list.map((v) => button(v.id, escapeHtml(v.name))).join('\n              ')}
            </div>`;
}

// The variant's own line lives under the demo, not in the header: it changes on
// every click, and a changing line inside a fixed header reads as a glitch.
function renderVariantNote(comp: CatalogComponent): string {
  if (!(comp.variants || []).length) return '';
  const v = selectedVariant(comp);
  return `<p class="docs-variant-note" id="variant-note-${comp.id}">${v ? escapeHtml(v.description) : ''}</p>`;
}

// Swap one card to another layout in place. A full re-render would lose the
// scroll position and the open customizer, and would rebuild 122 cards to
// change one, so this touches only the card that was clicked.
function selectVariant(id: string, variantId: string) {
  const comp = components.find((c) => c.id === id);
  if (!comp || !(comp.variants || []).length) return;
  if (variantId && !(comp.variants || []).some((v) => v.id === variantId)) return;

  componentVariants[id] = variantId;
  const card = document.getElementById(`comp-${id}`);
  if (!card) return;

  card.querySelectorAll('.js-variant-btn').forEach((b) => {
    setPressed(b, (b.getAttribute('data-variant') || '') === variantId);
  });

  const html = generateCustomizedHtml(comp);

  const preview = card.querySelector('.demo-canvas > div');
  if (preview) preview.innerHTML = html;

  const panel = document.getElementById(`code-${id}`);
  if (panel) {
    panel.innerHTML = `<div class="flex justify-between items-center mb-2">
            <span class="text-xs font-mono text-muted">HTML</span>
          </div>
          <pre><code>${escapeHtml(html)}</code></pre>`;
    addCopyButtons(panel);
  }

  const note = document.getElementById(`variant-note-${id}`);
  if (note) note.textContent = selectedVariant(comp)?.description || '';

  const permalink = card.querySelector<HTMLAnchorElement>('.js-permalink');
  if (permalink) permalink.setAttribute('href', `#comp-${refFor(comp)}`);

  rebindPreviewControls(id);

  // A copied URL always reproduces what is on screen. replaceState, not
  // pushState: the back button should leave the page, not walk back through
  // eight variant clicks.
  const url = new URL(window.location.href);
  history.replaceState(null, '', `${url.pathname}${url.search}#comp-${refFor(comp)}`);
}

function renderComponents() {
  if (!streamEl) return;
  const filtered = components.filter((comp) => {
    const matchCat = activeCategory === 'all' || comp.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    // Typing "topbar" has to land on the app shell card already showing the
    // topbar layout, not on the card showing a sidebar with a control the
    // reader has not noticed yet. So a variant match also opens that variant.
    const variantHit = (comp.variants || []).find(
      (v) =>
        v.id.includes(q) ||
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    );
    const matchSearch =
      !q ||
      comp.id.includes(q) ||
      comp.name.toLowerCase().includes(q) ||
      comp.description.toLowerCase().includes(q) ||
      comp.tags.some((t) => t.toLowerCase().includes(q)) ||
      // Class names are what people actually search for: btn-outline,
      // card-footer, is-loading. Match the snippet itself.
      comp.html.toLowerCase().includes(q) ||
      Boolean(variantHit);

    if (q && matchCat && variantHit && !componentVariants[comp.id]) {
      componentVariants[comp.id] = variantHit.id;
    }

    return matchCat && matchSearch;
  });

  const resultEl = document.getElementById('catalog-result-count');
  if (resultEl) {
    // Component counts only. A variant is not a component, so the figure that
    // people trust in the page header keeps its shape.
    resultEl.textContent = `${filtered.length} of ${components.length}`;
  }

  syncUrlToFilters();

  if (filtered.length === 0) {
    streamEl.innerHTML = `<div class="empty-state border border-dashed rounded-md">
      <p class="empty-state-title">No matches${searchQuery ? ` for “${escapeHtml(searchQuery)}”` : ''}</p>
      <p class="empty-state-description">Try another query, or search a class name such as btn-outline.</p>
      <button type="button" class="btn btn-outline btn-sm" id="reset-catalog-btn">Reset</button>
    </div>`;
    document.getElementById('reset-catalog-btn')?.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.js-filter-category').forEach((b) => setPressed(b, b.getAttribute('data-cat') === 'all'));
      renderComponents();
    });
    return;
  }

  streamEl.innerHTML = filtered
    .map((comp) => {
      const currentHtml = generateCustomizedHtml(comp);

      return `
      <article class="demo-card scroll-mt-24" id="comp-${comp.id}">
        <div class="demo-header">
          <div class="flex items-center gap-3">
            <div>
              <h3 class="text-sm font-semibold">${comp.name}</h3>
              <p class="text-xs text-secondary mt-1">${comp.description}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            ${renderVariantControl(comp)}
            <button type="button" class="btn btn-outline btn-xs toggle-customize-btn" data-id="${comp.id}" aria-expanded="false" aria-controls="customize-${comp.id}" title="Toggle Component Styling Options">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span>Customize</span>
            </button>
            <button type="button" class="btn btn-outline btn-xs template-code-toggle" data-id="${comp.id}" aria-expanded="false" aria-controls="code-${comp.id}">
              Code
            </button>
            <button type="button" class="btn btn-outline btn-xs copy-cli-btn" data-id="${comp.id}">
              CLI
            </button>
            <a class="btn btn-ghost btn-xs js-permalink" data-id="${comp.id}" href="#comp-${refFor(comp)}" aria-label="Link to ${comp.name}">#</a>
            <button type="button" class="btn btn-primary btn-xs copy-html-btn" data-id="${comp.id}">
              Copy HTML
            </button>
          </div>
        </div>
        ${renderCustomizerBar(comp)}
        <div class="demo-canvas ${comp.id === 'dropdown-menu' ? 'preview-has-dropdown' : ''}">
          <div class="w-full max-w-full">
            ${currentHtml}
          </div>
        </div>
        ${renderVariantNote(comp)}
        <div class="demo-code" id="code-${comp.id}">
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-mono text-muted">HTML</span>
          </div>
          <pre><code>${escapeHtml(currentHtml)}</code></pre>
        </div>
      </article>
      `;
    })
    .join('');

  applyViewportWidth();
  addCopyButtons(streamEl);
  bindComponentEvents();
}

// The preview width control is a live measurement, not a style choice, so it
// is applied as a DOM property after render rather than baked into the markup.
function applyViewportWidth() {
  document.querySelectorAll<HTMLElement>('.demo-canvas').forEach((canvas) => {
    canvas.style.width = currentViewport;
  });
}

function bindComponentEvents() {
  // Layout variant segmented control
  document.querySelectorAll('.js-variant-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectVariant(btn.getAttribute('data-id') || '', btn.getAttribute('data-variant') || '');
    });
  });

  // Toggle Customizer bar
  document.querySelectorAll('.toggle-customize-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const bar = document.getElementById(`customize-${id}`);
      if (bar) {
        const show = bar.hidden;
        bar.hidden = !show;
        bar.classList.toggle('hidden', !show);
        btn.classList.toggle('is-active', show);
        btn.setAttribute('aria-expanded', String(show));
      }
    });
  });

  // Customizer Pill Options
  document.querySelectorAll('.demo-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id')!;
      const prop = btn.getAttribute('data-prop') as keyof ComponentCustomization;
      const val = btn.getAttribute('data-val')!;

      if (!componentCustomizations[id]) {
        componentCustomizations[id] = {};
      }
      componentCustomizations[id][prop] = val;

      // Update active state among siblings
      const parentGroup = btn.closest('.demo-pills');
      if (parentGroup) {
        parentGroup.querySelectorAll('.demo-pill').forEach((b) => setPressed(b, b === btn));
      }

      applyComponentCustomization(id);
    });
  });

  // Reset Customizer for a component
  document.querySelectorAll('.reset-customizer-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id')!;
      delete componentCustomizations[id];
      applyComponentCustomization(id);

      const bar = document.getElementById(`customize-${id}`);
      if (bar) {
        bar.querySelectorAll('.demo-toolbar-group').forEach((g) => {
          const firstPill = g.querySelector('.demo-pill');
          g.querySelectorAll('.demo-pill').forEach((b) => setPressed(b, b === firstPill));
        });
      }
      showToast(`Reset ${id} to defaults`, 'info');
    });
  });

  // Toggle code visibility
  document.querySelectorAll('.template-code-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const panel = document.getElementById(`code-${id}`);
      if (panel) {
        const open = panel.classList.toggle('is-expanded');
        btn.classList.toggle('is-active', open);
        btn.setAttribute('aria-expanded', String(open));
      }
    });
  });

  // Copy HTML
  document.querySelectorAll<HTMLElement>('.copy-html-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const comp = components.find((c) => c.id === id);
      if (!comp) return;
      // Copy what the card is actually showing: the selected layout, with any
      // customizer wrapper, not the registry default.
      const html = generateCustomizedHtml(comp);
      const v = selectedVariant(comp);
      const label = v ? `${comp.name}, ${v.name.toLowerCase()} layout` : comp.name;
      if (comp.css) {
        copyToClipboard(`<style>\n${comp.css}</style>\n${html}`, `${label} HTML + CSS`, btn);
        return;
      }
      copyToClipboard(html, `${label} HTML`, btn);
    });
  });

  // Copy CLI command
  document.querySelectorAll<HTMLElement>('.copy-cli-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const comp = components.find((c) => c.id === id);
      // The snippet names the layout on screen: `npx llmcss add parent:variant`.
      copyToClipboard(`npx llmcss add ${comp ? refFor(comp) : id}`, 'CLI command', btn);
    });
  });

  // Range sliders inside previews
  document.querySelectorAll<HTMLInputElement>('.demo-canvas input[type="range"]').forEach((slider) => {
    slider.addEventListener('input', () => {
      const wrapper = slider.closest('.slider-wrapper');
      if (wrapper) {
        const valEl = wrapper.querySelector('.slider-value');
        if (valEl) valEl.textContent = slider.value;
      }
    });
  });
}

// ============================================================================
// EVENT LISTENERS & WIRING
// ============================================================================

// Category filter handlers
document.querySelectorAll('.js-filter-category').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.js-filter-category').forEach((b) => setPressed(b, b === btn));
    activeCategory = btn.getAttribute('data-cat') || 'all';
    renderComponents();
  });
});

// The catalog search field is injected by mountChrome, so its handler is bound
// in boot() once the chrome exists. Binding here would attach to nothing.

// Theme toggle line icons
const SUN_LINE_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
const MOON_LINE_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

function updateThemeToggleIcon(theme: string) {
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? SUN_LINE_ICON : MOON_LINE_ICON;
    themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }

  const stylerToggle = document.getElementById('styler-theme-toggle');
  if (stylerToggle) {
    stylerToggle.innerHTML = theme === 'dark' ? SUN_LINE_ICON : MOON_LINE_ICON;
    stylerToggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    stylerToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }
}

// chrome.ts owns the theme: applyTheme writes the attribute, persists the
// preference and repaints the header button. Both toggles go through it, then
// re-read the stored value, so neither can be undone by the other.
function syncThemeFromStorage() {
  activeTheme = currentTheme();
  updateThemeToggleIcon(activeTheme);
  updateCoreStylerUI();
}

// The Styler drawer's own toggle. Persist first: applyGlobalTokens re-reads the
// stored theme, so flipping a local variable before it would be overwritten.
function toggleLightDarkMode() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  syncThemeFromStorage();
  showToast(`Switched to ${next} mode`, 'info');
}

// The header toggle is injected by mountChrome, so it is bound in boot() once
// the chrome exists. The Styler toggle is static markup and binds here.
document.getElementById('styler-theme-toggle')?.addEventListener('click', toggleLightDarkMode);

// Global shortcut '/' to focus search (guards against input field hijacking)
window.addEventListener('keydown', (e) => {
  if (e.key === '/') {
    const activeEl = document.activeElement as HTMLElement | null;
    const isInput =
      activeEl &&
      (activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT' ||
        activeEl.isContentEditable);

    if (isInput) return; // Do not intercept typing inside form inputs

    e.preventDefault();
    const collectionEl = document.getElementById('collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' });
    }
    searchInput?.focus();
  }
});

// Viewport width switcher
document.querySelectorAll('.js-viewport-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.js-viewport-btn').forEach((b) => setPressed(b, b === btn));
    currentViewport = btn.getAttribute('data-width') || '100%';
    applyViewportWidth();
  });
});

// Core Styler Drawer Event Handlers
document.querySelectorAll('#styler-theme-grid .styler-theme-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeSkin = btn.getAttribute('data-skin') || 'modern';
    applyGlobalTokens();
    showToast(activeSkin === 'modern' ? 'Cleared data-ai-skin' : `Applied data-ai-skin="${activeSkin}"`, 'info');
  });
});

document.querySelectorAll('.js-styler-radius-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeRadius = btn.getAttribute('data-radius') || 'balanced';
    applyGlobalTokens();
    showToast(`Applied ${btn.textContent?.trim()} corner geometry`, 'info');
  });
});

document.querySelectorAll('.js-styler-density-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeDensity = btn.getAttribute('data-density') || 'standard';
    applyGlobalTokens();
    showToast(`Applied ${btn.textContent?.trim()} spacing density`, 'info');
  });
});

document.querySelectorAll('.styler-accent-swatch').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeAccent = btn.getAttribute('data-accent') || 'default';
    applyGlobalTokens();
    showToast(`Updated accent tint override`, 'info');
  });
});

document.getElementById('reset-styler-btn')?.addEventListener('click', () => {
  activeSkin = 'modern';
  activeRadius = 'balanced';
  activeDensity = 'standard';
  activeAccent = 'default';
  applyDisplayFont('sora');
  applyGlobalTokens();
  showToast('Reset design system tokens to defaults', 'info');
});

document.getElementById('copy-styler-css-btn')?.addEventListener('click', () => {
  const outputEl = document.getElementById('styler-css-output');
  if (outputEl) {
    copyToClipboard(outputEl.textContent || '', 'Design Tokens CSS');
  }
});

// Hero Copy Pill
document.getElementById('hero-copy-pill')?.addEventListener('click', () => {
  copyToClipboard('npx llmcss init', 'Init command');
});

// Hero Interactive Slider
const heroSlider = document.querySelector<HTMLInputElement>('.docs-hero-dock input[type="range"]');
if (heroSlider) {
  heroSlider.addEventListener('input', () => {
    const valEl = document.querySelector('.docs-hero-dock .slider-value');
    if (valEl) valEl.textContent = heroSlider.value;
  });
}

// Hero Segmented Switcher
document.querySelectorAll('.docs-hero-dock .segmented-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.docs-hero-dock .segmented-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
});

// A deep link such as /components?cat=primitive#comp-btn-variants only works
// once the catalog has rendered, so the jump happens after the first render.
// The cards carry scroll-mt-24, which keeps the target clear of the header.
//
// #comp-hero-split:centered opens that layout. The hash is parsed, never used
// as a fragment target: the card id stays comp-hero-split, because a colon is
// legal in an id attribute and a nightmare in querySelector.
function readHashRef(): { id: string; variant: string } | null {
  const raw = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  if (!raw.startsWith('comp-')) return null;
  const ref = raw.slice('comp-'.length);
  const cut = ref.lastIndexOf(':');
  if (cut < 0) return { id: ref, variant: '' };
  return { id: ref.slice(0, cut), variant: ref.slice(cut + 1) };
}

// Runs before the first render so the card is built showing the right layout
// rather than swapping under the reader a frame later.
function applyHashVariant() {
  const hit = readHashRef();
  if (!hit || !hit.variant) return;
  const comp = components.find((c) => c.id === hit.id);
  if (!comp || !(comp.variants || []).some((v) => v.id === hit.variant)) return;
  componentVariants[hit.id] = hit.variant;
}

function scrollToHashedCard() {
  const hit = readHashRef();
  if (!hit) return;
  const target = document.getElementById(`comp-${hit.id}`);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function boot() {
  await mountChrome();
  searchInput = document.getElementById('catalog-search') as HTMLInputElement | null;
  themeToggle = document.getElementById('theme-mode-toggle');
  // chrome.ts flips and persists the theme on this button; this listener runs
  // after it and re-syncs the Styler icon, labels and exported CSS. It must not
  // flip again, or the two handlers would cancel each other out.
  themeToggle?.addEventListener('click', () => {
    syncThemeFromStorage();
    showToast(`Switched to ${activeTheme} mode`, 'info');
  });
  bindFontSwitchers(() => applyGlobalTokens());
  applyGlobalTokens();
  updateSidebarCounts();

  readFiltersFromUrl();
  if (searchInput && searchQuery) searchInput.value = searchQuery;
  document
    .querySelectorAll('.js-filter-category')
    .forEach((b) => setPressed(b, b.getAttribute('data-cat') === activeCategory));

  applyHashVariant();
  renderComponents();
  scrollToHashedCard();

  let searchTimer: number | undefined;
  searchInput?.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      searchQuery = searchInput?.value || '';
      renderComponents();
    }, 150);
  });
  console.log(`[LLMCSS Showcase] Initialized successfully with ${components.length} components.`);
}
boot();

