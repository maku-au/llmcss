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
  document.querySelectorAll<HTMLSelectElement>('#font-switcher, #styler-font-switcher').forEach((el) => {
    el.value = font.id;
  });
}

export function fillFontSwitchers() {
  const html = DISPLAY_FONTS.map((f) => `<option value="${f.id}">${f.name}</option>`).join('');
  document.querySelectorAll<HTMLSelectElement>('#font-switcher, #styler-font-switcher').forEach((el) => {
    if (!el.options.length) el.innerHTML = html;
  });
}

export function bindFontSwitchers(onChange?: () => void) {
  fillFontSwitchers();
  const current = getActiveFontId();
  document.querySelectorAll<HTMLSelectElement>('#font-switcher, #styler-font-switcher').forEach((el) => {
    el.value = current;
    el.addEventListener('change', () => {
      applyDisplayFont(el.value);
      onChange?.();
    });
  });
  applyDisplayFont(current);
}
