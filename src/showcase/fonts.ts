export interface DisplayFont {
  id: string;
  name: string;
  family: string;
  google: string | null;
  kind: 'sans' | 'serif';
}

export const DISPLAY_FONTS: DisplayFont[] = [
  { id: 'sora', name: 'Sora', family: "'Sora', sans-serif", google: null, kind: 'sans' },
  { id: 'outfit', name: 'Outfit', family: "'Outfit', sans-serif", google: 'Outfit:wght@400;500;600;700;800', kind: 'sans' },
  { id: 'jakarta', name: 'Plus Jakarta', family: "'Plus Jakarta Sans', sans-serif", google: null, kind: 'sans' },
  { id: 'dm-sans', name: 'DM Sans', family: "'DM Sans', sans-serif", google: 'DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700', kind: 'sans' },
  { id: 'plex-sans', name: 'IBM Plex Sans', family: "'IBM Plex Sans', sans-serif", google: 'IBM+Plex+Sans:wght@400;500;600;700', kind: 'sans' },
  { id: 'figtree', name: 'Figtree', family: "'Figtree', sans-serif", google: 'Figtree:ital,wght@0,400..700;1,400..700', kind: 'sans' },
  { id: 'albert', name: 'Albert Sans', family: "'Albert Sans', sans-serif", google: 'Albert+Sans:ital,wght@0,400..700;1,400..700', kind: 'sans' },
  { id: 'bricolage', name: 'Bricolage', family: "'Bricolage Grotesque', sans-serif", google: 'Bricolage+Grotesque:opsz,wght@12..96,400..800', kind: 'sans' },
  { id: 'schibsted', name: 'Schibsted Grotesk', family: "'Schibsted Grotesk', sans-serif", google: 'Schibsted+Grotesk:ital,wght@0,400..900;1,400..900', kind: 'sans' },
  { id: 'instrument-sans', name: 'Instrument Sans', family: "'Instrument Sans', sans-serif", google: 'Instrument+Sans:ital,wght@0,400..700;1,400..700', kind: 'sans' },
  { id: 'karla', name: 'Karla', family: "'Karla', sans-serif", google: 'Karla:ital,wght@0,400..700;1,400..700', kind: 'sans' },
  { id: 'source-sans', name: 'Source Sans 3', family: "'Source Sans 3', sans-serif", google: 'Source+Sans+3:ital,wght@0,400..700;1,400..700', kind: 'sans' },
  { id: 'newsreader', name: 'Newsreader', family: "'Newsreader', Georgia, serif", google: 'Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700', kind: 'serif' },
  { id: 'fraunces', name: 'Fraunces', family: "'Fraunces', Georgia, serif", google: 'Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700', kind: 'serif' },
  { id: 'instrument-serif', name: 'Instrument Serif', family: "'Instrument Serif', Georgia, serif", google: 'Instrument+Serif:ital@0;1', kind: 'serif' },
  { id: 'source-serif', name: 'Source Serif 4', family: "'Source Serif 4', Georgia, serif", google: 'Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700', kind: 'serif' },
  { id: 'literata', name: 'Literata', family: "'Literata', Georgia, serif", google: 'Literata:ital,opsz,wght@0,7..72,400..700;1,7..72,400..700', kind: 'serif' },
  { id: 'plex-serif', name: 'IBM Plex Serif', family: "'IBM Plex Serif', Georgia, serif", google: 'IBM+Plex+Serif:ital,wght@0,400;0,600;0,700;1,400', kind: 'serif' },
];

const STORAGE_KEY = 'llmcss-font';
const LINK_ID = 'llmcss-display-font';
const PREVIEW_LINK_ID = 'llmcss-font-preview';
const PICKER_SELECTOR = '#font-switcher, #styler-font-switcher';

const CHEVRON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
const CHECK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

export function getActiveFontId(): string {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && DISPLAY_FONTS.some((f) => f.id === saved)) return saved;
  return 'sora';
}

export function loadDisplayFont(font: DisplayFont) {
  const existing = document.getElementById(LINK_ID);
  if (!font.google) {
    existing?.remove();
    return;
  }
  const href = `https://fonts.googleapis.com/css2?family=${font.google}&display=swap`;
  if (existing instanceof HTMLLinkElement) {
    if (existing.href !== href) existing.href = href;
    return;
  }
  const link = document.createElement('link');
  link.id = LINK_ID;
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Every face at one weight, in one request, so the picker can show each name
// in its own font. Loaded the first time a picker opens, never on page load.
function loadPreviewFaces() {
  if (document.getElementById(PREVIEW_LINK_ID)) return;
  const families = DISPLAY_FONTS.filter((f) => f.google)
    .map((f) => (f.google as string).split(':')[0] + ':wght@600')
    .join('&family=');
  const link = document.createElement('link');
  link.id = PREVIEW_LINK_ID;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
  document.head.appendChild(link);
}

// Each option renders in its own face through a font-preview-<id> class in
// showcase.css, never an inline style attribute. The site ships none of those.
function pickerHtml(currentId: string): string {
  const current = DISPLAY_FONTS.find((f) => f.id === currentId) || DISPLAY_FONTS[0];
  const group = (kind: 'sans' | 'serif', label: string) =>
    `<li class="dropdown-header">${label}</li>` +
    DISPLAY_FONTS.filter((f) => f.kind === kind)
      .map(
        (f) => `<li><button type="button" class="dropdown-item font-option font-preview-${f.id}${f.id === currentId ? ' is-active' : ''}" role="option" aria-selected="${f.id === currentId}" data-font="${f.id}">${f.name}<span class="font-option-check">${CHECK}</span></button></li>`
      )
      .join('');
  return `<button type="button" class="btn btn-outline btn-sm w-full justify-between dropdown-trigger font-trigger" data-ai-toggle="dropdown" aria-haspopup="listbox" aria-expanded="false" aria-label="Title font: ${current.name}">
      <span class="font-trigger-label font-preview-${current.id}">${current.name}</span>${CHEVRON}
    </button>
    <ul class="dropdown-menu font-menu" role="listbox" aria-label="Title font">
      ${group('sans', 'Sans')}
      ${group('serif', 'Serif')}
    </ul>`;
}

function syncPickers(fontId: string) {
  const font = DISPLAY_FONTS.find((f) => f.id === fontId) || DISPLAY_FONTS[0];
  document.querySelectorAll<HTMLElement>(PICKER_SELECTOR).forEach((picker) => {
    const label = picker.querySelector<HTMLElement>('.font-trigger-label');
    if (label) {
      label.textContent = font.name;
      // Swap the preview class rather than writing an inline font-family.
      DISPLAY_FONTS.forEach((f) => label.classList.toggle(`font-preview-${f.id}`, f.id === font.id));
    }
    picker.querySelector('.font-trigger')?.setAttribute('aria-label', `Title font: ${font.name}`);
    picker.querySelectorAll<HTMLElement>('.font-option').forEach((opt) => {
      const on = opt.getAttribute('data-font') === font.id;
      opt.classList.toggle('is-active', on);
      opt.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  });
}

export function applyDisplayFont(fontId: string) {
  const font = DISPLAY_FONTS.find((f) => f.id === fontId) || DISPLAY_FONTS[0];
  const root = document.documentElement;
  root.style.setProperty('--ai-font-display', font.family);
  if (font.kind === 'serif') {
    root.style.setProperty('--ai-font-serif', font.family);
  } else {
    root.style.removeProperty('--ai-font-serif');
  }
  root.setAttribute('data-ai-font', font.id);
  localStorage.setItem(STORAGE_KEY, font.id);
  loadDisplayFont(font);
  syncPickers(font.id);
}

export function fillFontSwitchers() {
  const current = getActiveFontId();
  document.querySelectorAll<HTMLElement>(PICKER_SELECTOR).forEach((el) => {
    if (!el.querySelector('.font-menu')) {
      el.classList.add('dropdown', 'font-picker');
      el.innerHTML = pickerHtml(current);
    }
  });
}

export function bindFontSwitchers(onChange?: () => void) {
  fillFontSwitchers();
  const current = getActiveFontId();
  document.querySelectorAll<HTMLElement>(PICKER_SELECTOR).forEach((picker) => {
    // Faces load the first time the menu is opened, not before
    picker.querySelector('.font-trigger')?.addEventListener('click', loadPreviewFaces, { once: true });
    picker.addEventListener('click', (e) => {
      const opt = (e.target as HTMLElement).closest<HTMLElement>('.font-option');
      if (!opt) return;
      applyDisplayFont(opt.getAttribute('data-font') || 'sora');
      picker.classList.remove('is-open');
      picker.removeAttribute('open');
      picker.querySelector('.font-trigger')?.setAttribute('aria-expanded', 'false');
      onChange?.();
    });
  });
  applyDisplayFont(current);
}
