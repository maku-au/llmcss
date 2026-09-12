import '../css/index.css';
import '../runtime/index';
import { components } from '../registry/components';
import { applyDisplayFont, bindFontSwitchers, getActiveFontId, DISPLAY_FONTS } from './fonts';
import { mountChrome, catalogStats, currentTheme } from './chrome';
import { getBrowserToken, setBrowserToken, validateToken } from './license';

// ============================================================================
// STATE DEFINITIONS
// ============================================================================
let activeCategory = 'all';
let activeTier = 'all';
let searchQuery = '';
let currentViewport = '100%';

// Core Styler State (persisted in localStorage)
let activeSkin = localStorage.getItem('cssai-skin') || 'modern';
let activeTheme = localStorage.getItem('cssai-theme') || document.documentElement.getAttribute('data-ai-theme') || 'light';
let activeRadius = localStorage.getItem('cssai-radius') || 'balanced';
let activeDensity = localStorage.getItem('cssai-density') || 'standard';
let activeAccent = localStorage.getItem('cssai-accent') || 'default';

// Per-Component Customization State
interface ComponentCustomization {
  variant?: string;
  size?: string;
  state?: string;
  radius?: string;
  density?: string;
  accent?: string;
  speed?: string;
  elevation?: string;
}

const componentCustomizations: Record<string, ComponentCustomization> = {};

// DOM Elements
const streamEl = document.getElementById('components-stream');
let searchInput = document.getElementById('catalog-search') as HTMLInputElement | null;
const skinSwitcher = document.getElementById('skin-switcher') as HTMLSelectElement | null;
let themeToggle = document.getElementById('theme-mode-toggle');
const proHtmlCache = new Map<string, string>();
const proCssCache = new Map<string, string>();
const toastContainer = document.getElementById('toast-container');

// ============================================================================
// TOAST NOTIFICATIONS & MICRO-FEEDBACK
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
  localStorage.setItem('cssai-skin', activeSkin);

  if (skinSwitcher) {
    skinSwitcher.value = activeSkin;
  }

  // 2. Light / Dark Theme Mode
  activeTheme = currentTheme();
  root.setAttribute('data-ai-theme', activeTheme);
  localStorage.setItem('cssai-theme', activeTheme);
  updateThemeToggleIcon(activeTheme);

  // 3. Corner Geometry (Radius Scale)
  const radiusMap: Record<string, Record<string, string>> = {
    sharp: {
      '--ai-radius-none': '0px',
      '--ai-radius-xs': '0px',
      '--ai-radius-sm': '0px',
      '--ai-radius-md': '0px',
      '--ai-radius-lg': '0px',
      '--ai-radius-xl': '0px',
      '--ai-radius-2xl': '0px',
      '--ai-radius-base': '0px',
    },
    precision: {
      '--ai-radius-none': '0px',
      '--ai-radius-xs': '2px',
      '--ai-radius-sm': '3px',
      '--ai-radius-md': '4px',
      '--ai-radius-lg': '6px',
      '--ai-radius-xl': '8px',
      '--ai-radius-2xl': '10px',
      '--ai-radius-base': '2px',
    },
    balanced: {
      '--ai-radius-none': '0px',
      '--ai-radius-xs': '3px',
      '--ai-radius-sm': '4px',
      '--ai-radius-md': '6px',
      '--ai-radius-lg': '8px',
      '--ai-radius-xl': '10px',
      '--ai-radius-2xl': '12px',
      '--ai-radius-base': '4px',
    },
    smooth: {
      '--ai-radius-none': '0px',
      '--ai-radius-xs': '4px',
      '--ai-radius-sm': '6px',
      '--ai-radius-md': '8px',
      '--ai-radius-lg': '12px',
      '--ai-radius-xl': '16px',
      '--ai-radius-2xl': '20px',
      '--ai-radius-base': '6px',
    },
  };

  const currentRadiusTokens = radiusMap[activeRadius] || radiusMap.balanced;
  Object.entries(currentRadiusTokens).forEach(([prop, val]) => {
    root.style.setProperty(prop, val);
  });
  localStorage.setItem('cssai-radius', activeRadius);

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
  localStorage.setItem('cssai-density', activeDensity);

  // 5. Accent Override
  const accentMap: Record<string, { accent: string; hover: string; subtle: string; rgb: string } | null> = {
    default: null,
    steel: { accent: '#475569', hover: '#334155', subtle: 'rgba(71, 85, 105, 0.12)', rgb: '71, 85, 105' },
    teal: { accent: '#0f766e', hover: '#115e59', subtle: 'rgba(15, 118, 110, 0.12)', rgb: '15, 118, 110' },
    emerald: { accent: '#059669', hover: '#047857', subtle: 'rgba(5, 150, 105, 0.12)', rgb: '5, 150, 105' },
    violet: { accent: '#7c3aed', hover: '#6d28d9', subtle: 'rgba(124, 58, 237, 0.12)', rgb: '124, 58, 237' },
    rose: { accent: '#e11d48', hover: '#be123c', subtle: 'rgba(225, 29, 72, 0.12)', rgb: '225, 29, 72' },
    amber: { accent: '#d97706', hover: '#b45309', subtle: 'rgba(217, 119, 6, 0.12)', rgb: '217, 119, 6' },
  };

  const accentOverride = accentMap[activeAccent];
  if (accentOverride) {
    root.style.setProperty('--ai-accent', accentOverride.accent);
    root.style.setProperty('--ai-accent-hover', accentOverride.hover);
    root.style.setProperty('--ai-accent-subtle', accentOverride.subtle);
    root.style.setProperty('--ai-accent-rgb', accentOverride.rgb);
  } else {
    ['--ai-accent', '--ai-accent-hover', '--ai-accent-subtle', '--ai-accent-rgb'].forEach((p) => root.style.removeProperty(p));
  }
  localStorage.setItem('cssai-accent', activeAccent);

  applyDisplayFont(getActiveFontId());

  // Update Core Styler UI Controls State
  updateCoreStylerUI();
}

function updateCoreStylerUI() {
  // Theme Grid
  document.querySelectorAll('#styler-theme-grid .ai-styler-theme-btn').forEach((btn) => {
    const skin = btn.getAttribute('data-skin');
    btn.classList.toggle('is-active', skin === activeSkin);
  });

  const activeThemeLabel = document.getElementById('styler-active-theme-label');
  if (activeThemeLabel) {
    const skinNames: Record<string, string> = {
      modern: 'Minimal',
      executive: 'Slate',
      fintech: 'Titanium',
      obsidian: 'Obsidian',
      editorial: 'Editorial',
      enterprise: 'Enterprise',
      emerald: 'Emerald',
      violet: 'Violet',
      rose: 'Rose',
    };
    activeThemeLabel.textContent = skinNames[activeSkin] || activeSkin;
  }

  // Radius Pills
  document.querySelectorAll('.ai-styler-radius-btn').forEach((btn) => {
    const rad = btn.getAttribute('data-radius');
    btn.classList.toggle('is-active', rad === activeRadius);
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
  document.querySelectorAll('.ai-styler-density-btn').forEach((btn) => {
    const den = btn.getAttribute('data-density');
    btn.classList.toggle('is-active', den === activeDensity);
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
  document.querySelectorAll('.ai-styler-accent-swatch').forEach((btn) => {
    const acc = btn.getAttribute('data-accent');
    btn.classList.toggle('is-active', acc === activeAccent);
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
      const rootStyle = document.documentElement.style;
      const acc = rootStyle.getPropertyValue('--ai-accent');
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
      {
        name: 'Corner',
        prop: 'radius',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Sharp 0px', value: 'sharp' },
          { label: 'Smooth', value: 'smooth' },
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
          { label: 'Flat Border', value: 'flat' },
          { label: 'Shadow MD', value: 'elevated' },
          { label: 'Specular Pro', value: 'specular' },
        ],
      },
      {
        name: 'Padding',
        prop: 'density',
        options: [
          { label: 'Compact', value: 'compact' },
          { label: 'Standard', value: 'standard' },
          { label: 'Spacious', value: 'spacious' },
        ],
      },
      {
        name: 'Corner',
        prop: 'radius',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Sharp 0px', value: 'sharp' },
          { label: 'Round 12px', value: 'smooth' },
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
      {
        name: 'Speed',
        prop: 'speed',
        options: [
          { label: 'Fast (0.4s)', value: 'fast' },
          { label: 'Normal (0.8s)', value: 'normal' },
          { label: 'Relaxed (1.5s)', value: 'slow' },
        ],
      },
      {
        name: 'Accent',
        prop: 'accent',
        options: [
          { label: 'Blue', value: 'blue' },
          { label: 'Teal', value: 'teal' },
          { label: 'Emerald', value: 'emerald' },
          { label: 'Rose', value: 'rose' },
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
          { label: 'Determinate (68%)', value: 'determinate' },
          { label: 'AI Shimmer Stream', value: 'indeterminate' },
          { label: 'Striped Bar', value: 'striped' },
        ],
      },
      {
        name: 'Accent',
        prop: 'accent',
        options: [
          { label: 'Blue', value: 'blue' },
          { label: 'Success Green', value: 'emerald' },
          { label: 'Destructive Red', value: 'rose' },
        ],
      },
    ];
  }

  if (id === 'interactive-slider') {
    return [
      {
        name: 'Accent Color',
        prop: 'accent',
        options: [
          { label: 'Accent Blue', value: 'blue' },
          { label: 'Fintech Teal', value: 'teal' },
          { label: 'Forest Emerald', value: 'emerald' },
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

  // Generic fallback customizer for all other components
  return [
    {
      name: 'Corner Radius',
      prop: 'radius',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Sharp 0px', value: 'sharp' },
        { label: 'Precision 3px', value: 'precision' },
        { label: 'Smooth 10px', value: 'smooth' },
      ],
    },
    {
      name: 'Local Skin',
      prop: 'variant',
      options: [
        { label: 'Inherit Theme', value: 'inherit' },
        { label: 'Slate', value: 'executive' },
        { label: 'Titanium', value: 'fintech' },
        { label: 'Obsidian', value: 'obsidian' },
      ],
    },
  ];
}

function renderCustomizerBar(comp: (typeof components)[0]): string {
  const groups = getCustomizerGroupsForComponent(comp);
  const current = componentCustomizations[comp.id] || {};

  return `
    <div class="ai-demo-toolbar" id="customize-${comp.id}" style="display: none;">
      <div class="ai-flex ai-items-center ai-gap-2" style="margin-right: var(--ai-space-2);">
        <span class="ai-badge ai-badge-neutral ai-font-mono" style="font-size: 0.625rem;">Customizer</span>
      </div>
      ${groups
        .map((g) => {
          const activeVal = current[g.prop] || g.options[0].value;
          return `
          <div class="ai-demo-toolbar-group">
            <span class="ai-demo-toolbar-label">${g.name}:</span>
            <div class="ai-demo-pills">
              ${g.options
                .map(
                  (opt) => `
                <button class="ai-demo-pill ${opt.value === activeVal ? 'is-active' : ''}" 
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
      <button class="ai-btn ai-btn-ghost ai-btn-xs reset-customizer-btn" data-id="${comp.id}" style="margin-left: auto; font-size: 0.6875rem;">Reset</button>
    </div>
  `;
}

function generateCustomizedHtml(comp: (typeof components)[0]): string {
  const custom = componentCustomizations[comp.id];
  if (!custom) return comp.html;

  let html = comp.html;

  // 1. Button modifications
  if (comp.id === 'btn-variants' || comp.id === 'btn-sizes') {
    const variantClass = custom.variant ? `ai-btn-${custom.variant}` : 'ai-btn-primary';
    const sizeClass = custom.size && custom.size !== 'base' ? `ai-btn-${custom.size}` : '';
    const stateClass = custom.state === 'loading' ? 'is-loading' : '';
    const disabledAttr = custom.state === 'disabled' ? 'disabled' : '';

    return `<div class="ai-flex ai-flex-wrap ai-gap-3 ai-items-center">
  <button class="ai-btn ${variantClass} ${sizeClass} ${stateClass}" ${disabledAttr}>
    ${custom.variant ? custom.variant.toUpperCase() : 'CUSTOMIZED'} BUTTON
  </button>
  <button class="ai-btn ai-btn-outline ${sizeClass}">Secondary Action</button>
  <button class="ai-btn ai-btn-ghost ${sizeClass}">Ghost Subtle</button>
</div>`;
  }

  // 1b. Input states (Focused, Error, Disabled)
  if (comp.id === 'input-text') {
    const stateClass = custom.state === 'focused' ? 'is-focused' : custom.state === 'error' ? 'is-error' : '';
    const disabledAttr = custom.state === 'disabled' ? 'disabled' : '';
    const errorMarkup =
      custom.state === 'error'
        ? '<span class="ai-form-error" style="margin-top: 0.25rem;">Please enter a valid engineering email.</span>'
        : '<span class="ai-form-hint">We\'ll send your workspace invite here.</span>';

    return `<div class="ai-grid ai-gap-4" style="max-width: 24rem;">
  <div class="ai-form-group">
    <label class="ai-form-label" for="user-email">Email Address</label>
    <input type="email" id="user-email" class="ai-input ${stateClass}" placeholder="name@company.com" value="${custom.state === 'focused' ? 'alex.chen@acme.dev' : ''}" ${disabledAttr} />
    ${errorMarkup}
  </div>
  <div class="ai-form-group">
    <label class="ai-form-label" for="user-bio">Description</label>
    <textarea id="user-bio" class="ai-textarea ${stateClass}" placeholder="Tell us about your project..." ${disabledAttr}></textarea>
  </div>
</div>`;
  }

  if (comp.id === 'input-addon') {
    const stateClass = custom.state === 'focused' ? 'is-focused' : custom.state === 'error' ? 'is-error' : '';
    const disabledAttr = custom.state === 'disabled' ? 'disabled' : '';

    return `<div class="ai-form-group" style="max-width: 28rem;">
  <label class="ai-form-label">Project URL</label>
  <div class="ai-input-group">
    <span class="ai-input-addon">https://</span>
    <input type="text" class="ai-input ${stateClass}" placeholder="your-domain" value="${custom.state === 'focused' ? 'llmcss-preview' : ''}" ${disabledAttr} />
    <span class="ai-input-addon">.dev</span>
  </div>
  <span class="ai-form-hint">Production DNS routing will point to this hostname.</span>
</div>`;
  }

  if (comp.id === 'switch-toggle') {
    const checkedAttr = custom.state === 'focused' ? 'checked' : '';
    const disabledAttr = custom.state === 'disabled' ? 'disabled' : '';

    return `<div class="ai-flex ai-flex-col ai-gap-4">
  <label class="ai-switch">
    <input type="checkbox" class="ai-switch-input" checked ${disabledAttr} />
    <span class="ai-switch-track"><span class="ai-switch-thumb"></span></span>
    <span class="ai-text-sm ai-font-medium">Strict Type Checking</span>
  </label>
  <label class="ai-switch">
    <input type="checkbox" class="ai-switch-input" ${checkedAttr} ${disabledAttr} />
    <span class="ai-switch-track"><span class="ai-switch-thumb"></span></span>
    <span class="ai-text-sm ai-font-medium">Automated Rollback on Error</span>
  </label>
</div>`;
  }

  // 2. Loaders modification
  if (comp.id === 'animated-loaders') {
    const v = custom.variant || 'spinner';
    const speedStyle = custom.speed === 'fast' ? 'animation-duration: 0.4s;' : custom.speed === 'slow' ? 'animation-duration: 1.6s;' : '';
    const colorMap: Record<string, string> = {
      blue: 'var(--ai-accent)',
      teal: '#0f766e',
      emerald: 'var(--ai-success)',
      rose: 'var(--ai-danger)',
    };
    const accentColor = colorMap[custom.accent || 'blue'] || 'var(--ai-accent)';

    if (v === 'ring') {
      return `<div class="ai-flex ai-items-center ai-gap-4">
  <div class="ai-spinner-ring" style="border-top-color: ${accentColor}; ${speedStyle}"></div>
  <span class="ai-text-xs ai-font-mono ai-text-secondary">Dual Orbit Loader (${custom.speed || 'normal'})</span>
</div>`;
    }
    if (v === 'pulse') {
      return `<div class="ai-flex ai-items-center ai-gap-3">
  <span class="ai-pulse-dot ai-status-pip is-streaming" style="background-color: ${accentColor}; ${speedStyle}"></span>
  <span class="ai-text-xs ai-font-mono ai-text-secondary">Status Pip (Breathing LED)</span>
</div>`;
    }
    return `<div class="ai-flex ai-items-center ai-gap-4">
  <span class="ai-spinner" style="border-color: ${accentColor}; border-top-color: transparent; ${speedStyle}"></span>
  <span class="ai-text-xs ai-font-mono ai-text-secondary">Arc Motion Spinner</span>
</div>`;
  }

  // 3. Progress bar modification
  if (comp.id === 'progress-bars') {
    const v = custom.variant || 'determinate';
    const colorMap: Record<string, string> = {
      blue: 'var(--ai-accent)',
      emerald: 'var(--ai-success)',
      rose: 'var(--ai-danger)',
    };
    const barBg = colorMap[custom.accent || 'blue'] || 'var(--ai-accent)';

    if (v === 'indeterminate') {
      return `<div class="ai-progress ai-progress-indeterminate" style="max-width: 24rem;">
  <div class="ai-progress-bar" style="background-color: ${barBg};"></div>
</div>`;
    }
    if (v === 'striped') {
      return `<div class="ai-progress ai-progress-striped" style="max-width: 24rem;">
  <div class="ai-progress-bar" style="width: 75%; background-color: ${barBg};"></div>
</div>`;
    }
    return `<div class="ai-progress" style="max-width: 24rem;">
  <div class="ai-progress-bar" style="width: 68%; background-color: ${barBg};"></div>
</div>`;
  }

  // 4. Container / Elevation / Radius wrapper injection
  let styleOverrides = '';
  if (custom.radius === 'sharp') styleOverrides += '--ai-radius-base: 0px; --ai-radius-md: 0px; --ai-radius-lg: 0px; ';
  if (custom.radius === 'smooth') styleOverrides += '--ai-radius-base: 8px; --ai-radius-md: 12px; --ai-radius-lg: 16px; ';
  if (custom.elevation === 'elevated') styleOverrides += 'box-shadow: var(--ai-shadow-lg); ';
  if (custom.elevation === 'specular') styleOverrides += 'box-shadow: 0 0 0 1px var(--ai-border-strong), 0 8px 24px rgba(0,0,0,0.12); ';
  if (custom.density === 'compact') styleOverrides += 'padding: var(--ai-space-3) !important; ';
  if (custom.density === 'spacious') styleOverrides += 'padding: var(--ai-space-8) !important; ';

  const localSkinAttr = custom.variant && custom.variant !== 'inherit' ? `data-ai-skin="${custom.variant}"` : '';

  if (styleOverrides || localSkinAttr) {
    return `<div ${localSkinAttr} style="${styleOverrides}width: 100%; transition: all var(--ai-duration-fast);">
  ${html}
</div>`;
  }

  return html;
}

function applyComponentCustomization(id: string) {
  const comp = components.find((c) => c.id === id);
  if (!comp) return;

  const customizedHtml = generateCustomizedHtml(comp);

  // Update Preview DOM
  const previewContainer = document.querySelector(`#comp-${id} .ai-demo-canvas > div`);
  if (previewContainer) {
    previewContainer.innerHTML = customizedHtml;
  }

  // Preview only. Copy HTML stays the registry snippet.

  // Re-bind events inside preview if slider or controls
  rebindPreviewControls(id);
}

function rebindPreviewControls(id: string) {
  const preview = document.querySelector(`#comp-${id} .ai-demo-canvas`);
  if (!preview) return;

  preview.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach((slider) => {
    slider.addEventListener('input', () => {
      const wrapper = slider.closest('.ai-slider-wrapper');
      if (wrapper) {
        const valEl = wrapper.querySelector('.ai-slider-value');
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
  const freeCount = components.filter((c) => c.tier === 'free').length;

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

  const countTierAll = document.getElementById('count-tier-all');
  if (countTierAll) countTierAll.textContent = String(total);

  const countTierFree = document.getElementById('count-tier-free');
  if (countTierFree) countTierFree.textContent = String(freeCount);
  const countTierPro = document.getElementById('count-tier-pro');
  if (countTierPro) countTierPro.textContent = String(components.filter((c) => c.tier === 'pro').length);
}

function renderComponents() {
  if (!streamEl) return;
  const filtered = components.filter((comp) => {
    const matchCat = activeCategory === 'all' || comp.category === activeCategory;
    const matchTier = activeTier === 'all' || comp.tier === activeTier;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      comp.id.includes(q) ||
      comp.name.toLowerCase().includes(q) ||
      comp.description.toLowerCase().includes(q) ||
      comp.tags.some((t) => t.toLowerCase().includes(q));

    return matchCat && matchTier && matchSearch;
  });

  const resultEl = document.getElementById('catalog-result-count');
  if (resultEl) {
    resultEl.textContent = `${filtered.length} of ${components.length}`;
  }

  if (filtered.length === 0) {
    streamEl.innerHTML = `<div class="ai-empty-state" style="padding: 3rem 1rem; text-align: center; border: 1px dashed var(--ai-border); border-radius: var(--ai-radius-md);">
      <h3 class="ai-font-display" style="font-size: 1.125rem;">No matches${searchQuery ? ` for “${escapeHtml(searchQuery)}”` : ''}</h3>
      <p class="ai-text-sm ai-text-secondary" style="margin-top: 0.35rem;">Try another query or reset filters.</p>
      <button type="button" class="ai-btn ai-btn-outline ai-btn-sm" id="reset-catalog-btn" style="margin-top: 1rem;">Reset</button>
    </div>`;
    document.getElementById('reset-catalog-btn')?.addEventListener('click', () => {
      activeCategory = 'all';
      activeTier = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.filter-category').forEach((b) => b.classList.toggle('is-active', b.getAttribute('data-cat') === 'all'));
      document.querySelectorAll('.filter-tier').forEach((b) => b.classList.toggle('is-active', b.getAttribute('data-tier') === 'all'));
      renderComponents();
    });
    return;
  }

  streamEl.innerHTML = filtered
    .map((comp) => {
      const isPro = comp.tier === 'pro';
      const tierBadge = isPro ? `<span class="ai-docs-pro-tag">PRO</span>` : ``;
      const currentHtml = generateCustomizedHtml(comp);

      return `
      <article class="ai-demo-card" id="comp-${comp.id}">
        <div class="ai-demo-header">
          <div class="ai-flex ai-items-center ai-gap-3">
            <div>
              <div class="ai-flex ai-items-center ai-gap-2">
                <h3 class="ai-font-semibold" style="font-size: 0.9375rem; color: var(--ai-text-primary);">${comp.name}</h3>
                ${tierBadge}
              </div>
              <p class="ai-text-xs ai-text-secondary" style="margin-top: 0.15rem;">${comp.description}</p>
            </div>
          </div>
          <div class="ai-flex ai-items-center ai-gap-2">
            <button class="ai-btn ai-btn-outline ai-btn-xs toggle-customize-btn" data-id="${comp.id}" title="Toggle Component Styling Options">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span>Customize</span>
            </button>
            <button class="ai-btn ai-btn-outline ai-btn-xs ai-template-code-toggle" data-id="${comp.id}">
              Code
            </button>
            <button class="ai-btn ai-btn-outline ai-btn-xs copy-cli-btn" data-id="${comp.id}">
              CLI
            </button>
            ${
              isPro
                ? `<button class="ai-btn ai-btn-primary ai-btn-xs unlock-pro-btn" data-id="${comp.id}">
                     Unlock Pro
                   </button>`
                : `<button class="ai-btn ai-btn-primary ai-btn-xs copy-html-btn" data-id="${comp.id}">
                     Copy HTML
                   </button>`
            }
          </div>
        </div>
        ${isPro ? '' : renderCustomizerBar(comp)}
        <div class="ai-demo-canvas ${comp.id === 'dropdown-menu' ? 'preview-has-dropdown' : ''}" style="width: ${currentViewport};">
          <div style="width: 100%; max-width: 100%;">
            ${currentHtml}
          </div>
        </div>
        <div class="ai-demo-code" id="code-${comp.id}">
          ${
            isPro
              ? `<div class="ai-flex ai-justify-between ai-items-center" style="margin-bottom: var(--ai-space-2);">
            <span class="ai-text-xs ai-font-mono ai-text-muted">Pro source is not public</span>
          </div>
          <pre><code>Subscribe at https://llmcss.io then:
npx llmcss login &lt;token&gt;
npx llmcss add ${comp.id}</code></pre>`
              : `<div class="ai-flex ai-justify-between ai-items-center" style="margin-bottom: var(--ai-space-2);">
            <span class="ai-text-xs ai-font-mono ai-text-muted">HTML</span>
          </div>
          <pre><code>${escapeHtml(comp.html)}</code></pre>`
          }
        </div>
      </article>
      `;
    })
    .join('');

  bindComponentEvents();
}

function bindComponentEvents() {
  // Toggle Customizer bar
  document.querySelectorAll('.toggle-customize-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const bar = document.getElementById(`customize-${id}`);
      if (bar) {
        const isHidden = bar.style.display === 'none' || !bar.style.display;
        bar.style.display = isHidden ? 'flex' : 'none';
        btn.classList.toggle('is-active', isHidden);
      }
    });
  });

  // Customizer Pill Options
  document.querySelectorAll('.ai-demo-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id')!;
      const prop = btn.getAttribute('data-prop') as keyof ComponentCustomization;
      const val = btn.getAttribute('data-val')!;

      if (!componentCustomizations[id]) {
        componentCustomizations[id] = {};
      }
      componentCustomizations[id][prop] = val;

      // Update active state among siblings
      const parentGroup = btn.closest('.ai-demo-pills');
      if (parentGroup) {
        parentGroup.querySelectorAll('.ai-demo-pill').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      }

      applyComponentCustomization(id);
      showToast(`Updated ${id} styling`, 'info');
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
        bar.querySelectorAll('.ai-demo-toolbar-group').forEach((g) => {
          const firstPill = g.querySelector('.ai-demo-pill');
          g.querySelectorAll('.ai-demo-pill').forEach((b) => b.classList.remove('is-active'));
          firstPill?.classList.add('is-active');
        });
      }
      showToast(`Reset ${id} to defaults`, 'info');
    });
  });

  // Toggle code visibility
  document.querySelectorAll('.ai-template-code-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const panel = document.getElementById(`code-${id}`);
      if (panel) {
        panel.classList.toggle('is-expanded');
        btn.classList.toggle('is-active', panel.classList.contains('is-expanded'));
      }
    });
  });

  // Copy HTML
  document.querySelectorAll<HTMLElement>('.copy-html-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const comp = components.find((c) => c.id === id);
      if (!comp) return;
      if (comp.tier === 'pro' && !getBrowserToken()) {
        showToast('Pro source is not public. Subscribe to unlock.', 'error');
        return;
      }
      if (comp.css) {
        copyToClipboard(`<style>\n${comp.css}</style>\n${comp.html}`, `${comp.name} HTML + CSS`, btn);
        return;
      }
      copyToClipboard(comp.html, `${comp.name} HTML`, btn);
    });
  });

  document.querySelectorAll<HTMLElement>('.unlock-pro-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (getBrowserToken()) {
        await hydrateProCards();
        return;
      }
      const modal = document.getElementById('license-modal');
      modal?.classList.add('is-open');
    });
  });

  // Copy CLI command
  document.querySelectorAll<HTMLElement>('.copy-cli-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const comp = components.find((c) => c.id === id);
      const cmd = comp?.tier === 'pro' ? `npx llmcss login <token>\nnpx llmcss add ${id}` : `npx llmcss add ${id}`;
      copyToClipboard(cmd, 'CLI command', btn);
    });
  });

  // Range sliders inside previews
  document.querySelectorAll<HTMLInputElement>('.ai-demo-canvas input[type="range"]').forEach((slider) => {
    slider.addEventListener('input', () => {
      const wrapper = slider.closest('.ai-slider-wrapper');
      if (wrapper) {
        const valEl = wrapper.querySelector('.ai-slider-value');
        if (valEl) valEl.textContent = slider.value;
      }
    });
  });
}

// ============================================================================
// EVENT LISTENERS & WIRING
// ============================================================================

// Category filter handlers
document.querySelectorAll('.filter-category').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-category').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    activeCategory = btn.getAttribute('data-cat') || 'all';
    renderComponents();
    hydrateProCards();
  });
});

// Tier filter handlers
document.querySelectorAll('.filter-tier').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-tier').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    activeTier = btn.getAttribute('data-tier') || 'all';
    renderComponents();
    hydrateProCards();
  });
});

// Search input handler
if (searchInput) {
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput?.value || '';
    renderComponents();
    hydrateProCards();
  });
}

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
  }
}

// Dark/Light mode toggle
function toggleLightDarkMode() {
  activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
  applyGlobalTokens();
  showToast(`Switched to ${activeTheme} mode`, 'info');
}

themeToggle?.addEventListener('click', toggleLightDarkMode);
document.getElementById('styler-theme-toggle')?.addEventListener('click', toggleLightDarkMode);

// Skin switcher handler (Synchronized with Core Styler)
skinSwitcher?.addEventListener('change', () => {
  activeSkin = skinSwitcher.value;
  applyGlobalTokens();
  showToast(`Applied "${activeSkin}" theme`, 'info');
});

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
document.querySelectorAll('.viewport-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.viewport-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    currentViewport = btn.getAttribute('data-width') || '100%';
    document.querySelectorAll<HTMLElement>('.ai-demo-canvas').forEach((canvas) => {
      canvas.style.width = currentViewport;
    });
  });
});

// Core Styler Drawer Event Handlers
document.querySelectorAll('#styler-theme-grid .ai-styler-theme-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeSkin = btn.getAttribute('data-skin') || 'modern';
    applyGlobalTokens();
    showToast(`Switched to ${btn.textContent?.trim()} theme`, 'info');
  });
});

document.querySelectorAll('.ai-styler-radius-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeRadius = btn.getAttribute('data-radius') || 'balanced';
    applyGlobalTokens();
    showToast(`Applied ${btn.textContent?.trim()} corner geometry`, 'info');
  });
});

document.querySelectorAll('.ai-styler-density-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    activeDensity = btn.getAttribute('data-density') || 'standard';
    applyGlobalTokens();
    showToast(`Applied ${btn.textContent?.trim()} spacing density`, 'info');
  });
});

document.querySelectorAll('.ai-styler-accent-swatch').forEach((btn) => {
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
const heroSlider = document.querySelector<HTMLInputElement>('.ai-docs-hero-dock input[type="range"]');
if (heroSlider) {
  heroSlider.addEventListener('input', () => {
    const valEl = document.querySelector('.ai-docs-hero-dock .ai-slider-value');
    if (valEl) valEl.textContent = heroSlider.value;
  });
}

// Hero Segmented Switcher
document.querySelectorAll('.ai-docs-hero-dock .ai-segmented-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ai-docs-hero-dock .ai-segmented-btn').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
  });
});

// Validate a token once per page load, not on every render
const tokenChecks = new Map<string, Promise<boolean>>();
function tokenIsValid(token: string): Promise<boolean> {
  let p = tokenChecks.get(token);
  if (!p) {
    p = validateToken(token).then((r) => r.valid).catch(() => false);
    tokenChecks.set(token, p);
  }
  return p;
}

async function hydrateProCards() {
  const token = getBrowserToken();
  if (!token || !streamEl) return;
  if (!(await tokenIsValid(token))) return;

  for (const comp of components) {
    if (comp.tier !== 'pro') continue;
    const card = document.getElementById(`comp-${comp.id}`);
    if (!card) continue;
    let html = proHtmlCache.get(comp.id);
    if (!html) {
      const res = await fetch(`/r/pro/${comp.id}.json`, {
        headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
        cache: 'no-store',
      });
      if (!res.ok) continue;
      const data = await res.json().catch(() => ({}));
      if (!data.html) continue;
      html = data.html as string;
      proHtmlCache.set(comp.id, html);
      if (data.css) proCssCache.set(comp.id, data.css as string);
    }
    comp.html = html;
    const css = proCssCache.get(comp.id) || '';
    comp.css = css || undefined;
    // Pro CSS is not in the public stylesheet; inject it once per component
    if (css && !document.getElementById(`pro-css-${comp.id}`)) {
      const style = document.createElement('style');
      style.id = `pro-css-${comp.id}`;
      style.textContent = css;
      document.head.appendChild(style);
    }
    const canvas = card.querySelector('.ai-demo-canvas > div');
    if (canvas) canvas.innerHTML = html;
    const panel = card.querySelector(`#code-${comp.id}`);
    if (panel) {
      panel.innerHTML = `<div class="ai-flex ai-justify-between ai-items-center" style="margin-bottom: var(--ai-space-2);">
            <span class="ai-text-xs ai-font-mono ai-text-muted">HTML</span>
          </div>
          <pre><code>${escapeHtml(html)}</code></pre>${
            css
              ? `<div class="ai-flex ai-justify-between ai-items-center" style="margin: var(--ai-space-3) 0 var(--ai-space-2);">
            <span class="ai-text-xs ai-font-mono ai-text-muted">CSS</span>
          </div>
          <pre><code>${escapeHtml(css)}</code></pre>`
              : ''
          }`;
    }
    const unlock = card.querySelector('.unlock-pro-btn') as HTMLElement | null;
    if (unlock) {
      unlock.textContent = 'Copy HTML';
      unlock.classList.remove('unlock-pro-btn');
      unlock.classList.add('copy-html-btn');
      unlock.removeAttribute('data-ai-toggle');
      unlock.removeAttribute('data-ai-target');
      unlock.setAttribute('data-id', comp.id);
    }
  }
  bindComponentEvents();
}

async function activateBrowserLicense(token: string): Promise<boolean> {
  const data = await validateToken(token);
  if (!data.valid) return false;
  setBrowserToken(token);
  return true;
}

document.getElementById('license-activate-btn')?.addEventListener('click', async () => {
  const input = document.getElementById('license-token-input') as HTMLInputElement | null;
  const status = document.getElementById('license-status');
  const token = (input?.value || '').trim();
  if (status) status.textContent = 'Checking...';
  const ok = await activateBrowserLicense(token);
  if (status) {
    status.innerHTML = ok
      ? '<span class="ai-badge ai-badge-success">Active</span>'
      : '<span class="ai-badge ai-badge-danger">Not valid</span>';
  }
  if (ok) {
    await hydrateProCards();
    showToast('Pro catalog unlocked in this browser', 'success');
  }
});

async function boot() {
  await mountChrome();
  searchInput = document.getElementById('catalog-search') as HTMLInputElement | null;
  themeToggle = document.getElementById('theme-mode-toggle');
  bindFontSwitchers(() => applyGlobalTokens());
  applyGlobalTokens();
  updateSidebarCounts();
  renderComponents();
  await hydrateProCards();
  let searchTimer: number | undefined;
  searchInput?.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      searchQuery = searchInput?.value || '';
      renderComponents();
      hydrateProCards();
    }, 150);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      e.preventDefault();
      searchInput?.focus();
    }
  });
  console.log(`[LLMCSS Showcase] Initialized successfully with ${components.length} components.`);
}
boot();

