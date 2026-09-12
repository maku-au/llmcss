/**
 * Markup validation shared by the CLI (`llmcss validate`) and the MCP tool
 * `validate_markup`. Tokenizes every class attribute and checks each token:
 *   - an ai-* token must exist in the generated manifest (public/classes.json)
 *   - an is-* token must exist in public/states.json
 *   - an unprefixed token from the legacy map gets the ai-* suggestion
 * Substring matches are never used, so `ai-flex` cannot trip the `flex` check.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, '../../public');

export const LEGACY_MAP = {
  btn: 'ai-btn',
  'btn-primary': 'ai-btn-primary',
  'btn-secondary': 'ai-btn-secondary',
  'btn-outline': 'ai-btn-outline',
  'btn-ghost': 'ai-btn-ghost',
  'btn-danger': 'ai-btn-danger',
  flex: 'ai-flex',
  'flex-col': 'ai-flex-col',
  'flex-row': 'ai-flex-row',
  'flex-wrap': 'ai-flex-wrap',
  'items-center': 'ai-items-center',
  'items-start': 'ai-items-start',
  'justify-between': 'ai-justify-between',
  'justify-center': 'ai-justify-center',
  grid: 'ai-grid',
  card: 'ai-card',
  badge: 'ai-badge',
  spinner: 'ai-spinner',
  progress: 'ai-progress',
  'rounded-md': 'ai-rounded-md',
  'rounded-lg': 'ai-rounded-lg',
  container: 'ai-container',
  hidden: 'ai-hidden',
  'sr-only': 'ai-sr-only',
  'text-center': 'ai-text-center',
  'font-bold': 'ai-font-bold',
  'w-full': 'ai-w-full',
  input: 'ai-input',
  table: 'ai-table',
  modal: 'ai-modal',
  alert: 'ai-alert',
  tooltip: 'ai-tooltip',
  dropdown: 'ai-dropdown',
  accordion: 'ai-accordion',
  tabs: 'ai-tabs',
  navbar: 'ai-navbar',
  footer: 'ai-footer',
  'gap-2': 'ai-gap-2',
  'gap-4': 'ai-gap-4',
  'p-4': 'ai-p-4',
  'p-6': 'ai-p-6',
  'mt-4': 'ai-mt-4',
  'mb-4': 'ai-mb-4',
};

// Classes that are JavaScript hooks or runtime targets with no CSS of their own
const HOOK_CLASSES = new Set(['ai-dropdown-trigger', 'ai-tab', 'ai-tab-panel', 'ai-segmented-input', 'ai-carousel-controls']);

let cache = null;
function knownSets() {
  if (cache) return cache;
  const classes = new Set();
  const states = new Set();
  try {
    const c = JSON.parse(fs.readFileSync(path.join(publicDir, 'classes.json'), 'utf8'));
    for (const entry of c.classes) {
      classes.add(entry.class);
      for (const v of entry.variants) classes.add(`ai-${v}:${entry.class.slice(3)}`);
    }
  } catch { /* manifest missing: skip unknown-class checks */ }
  try {
    const s = JSON.parse(fs.readFileSync(path.join(publicDir, 'states.json'), 'utf8'));
    for (const entry of s.states) states.add(entry.class);
  } catch { /* ignore */ }
  cache = { classes, states };
  return cache;
}

export function classTokens(html) {
  const out = [];
  const re = /\bclass(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g;
  let m;
  while ((m = re.exec(html))) {
    const value = m[1] ?? m[2] ?? m[3] ?? '';
    for (const t of value.split(/\s+/)) {
      if (t && !t.includes('${')) out.push(t);
    }
  }
  return out;
}

/**
 * @returns {{ issues: Array<{type:string, class:string, suggestion?:string, message:string}>, tokens: number }}
 */
export function validateMarkup(html) {
  const { classes, states } = knownSets();
  const tokens = classTokens(html);
  const seen = new Set();
  const issues = [];
  for (const t of tokens) {
    if (seen.has(t)) continue;
    seen.add(t);
    if (t.startsWith('ai-')) {
      if (classes.size && !classes.has(t) && !HOOK_CLASSES.has(t)) {
        const near = nearest(t, classes);
        issues.push({
          type: 'unknown-class',
          class: t,
          suggestion: near || undefined,
          message: near ? `"${t}" does not exist in llmcss.css. Did you mean "${near}"?` : `"${t}" does not exist in llmcss.css. Check https://llmcss.io/classes.json.`,
        });
      }
      continue;
    }
    if (t.startsWith('is-')) {
      if (states.size && !states.has(t)) {
        issues.push({ type: 'unknown-state', class: t, message: `"${t}" is not a state the library styles. Known states are in https://llmcss.io/states.json.` });
      }
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(LEGACY_MAP, t)) {
      issues.push({ type: 'legacy-class', class: t, suggestion: LEGACY_MAP[t], message: `Replace unprefixed "${t}" with "${LEGACY_MAP[t]}".` });
    }
  }
  return { issues, tokens: tokens.length };
}

// Closest known class by a cheap edit-distance on the part after the last hyphen group
function nearest(token, classes) {
  let best = null;
  let bestScore = 4;
  const base = token.replace(/^ai-(?:sm|md|lg|xl|cq):/, 'ai-');
  for (const c of classes) {
    if (c.includes(':')) continue;
    const d = distance(base, c);
    if (d < bestScore) {
      bestScore = d;
      best = c;
    }
  }
  return best;
}

function distance(a, b) {
  if (Math.abs(a.length - b.length) > 3) return 99;
  const prev = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = tmp;
    }
  }
  return prev[b.length];
}

/**
 * Structural anti-slop checks that work on the whole document, not per line.
 */
export function structuralAudit(html) {
  const issues = [];
  // Nested cards: walk tags with a stack of "is a card" flags
  const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
  const tagRe = /<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
  const stack = [];
  let m;
  let nested = 0;
  while ((m = tagRe.exec(html))) {
    const [, closing, name, attrs, selfClose] = m;
    const lower = name.toLowerCase();
    if (closing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name === lower) { stack.splice(i); break; }
      }
      continue;
    }
    if (VOID.has(lower) || selfClose) continue;
    const cls = (attrs.match(/\bclass\s*=\s*["']([^"']*)["']/) || [, ''])[1].split(/\s+/);
    const isCard = cls.some((c) => c === 'ai-card' || c === 'ai-panel' || c === 'ai-kpi-card');
    if (isCard && stack.some((s) => s.card)) nested++;
    stack.push({ name: lower, card: isCard });
  }
  if (nested) {
    issues.push({ category: 'Cardocalypse', law: 1, count: nested, message: `${nested} card${nested > 1 ? 's are' : ' is'} nested inside another card. Use whitespace, ai-divider, or a surface shift instead.` });
  }
  // Pulsing static indicators: animation by class or inline style on a non-streaming element
  const PULSE = new Set(['animate-pulse', 'pulse', 'animate-ping', 'ping', 'breathe', 'blink', 'animate-bounce']);
  const pulseClass = { test: (h) => classTokens(h).some((t) => PULSE.has(t.toLowerCase())) };
  const pulseInline = /style\s*=\s*["'][^"']*animation\s*:[^"';]*(pulse|ping|breathe|blink|glow)[^"']*["']/i;
  const hasStreaming = /\bis-streaming\b/.test(html);
  if ((pulseClass.test(html) || pulseInline.test(html)) && !hasStreaming) {
    issues.push({ category: 'Pulsing Status Dots', law: 2, message: 'A pulsing or breathing animation is applied without a live-data context. Reserve motion for .is-streaming only.' });
  }
  return issues;
}
