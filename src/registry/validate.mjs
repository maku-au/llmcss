/**
 * Markup validation shared by the CLI (`llmcss validate`) and the MCP tool
 * `validate_markup`.
 *
 * Class names lost the ai- prefix in 0.4.0, so there is no longer a namespace
 * that says "this token is ours". Every class token is therefore checked
 * against the generated manifest (public/classes.json), with these rules:
 *   - a token in classes.json passes, variants (md:flex) included
 *   - an is-* token is a state: checked against public/states.json, never an
 *     error against classes.json
 *   - a js-* token, a HOOK_CLASSES entry and a custom element tag name are
 *     exempt: they are runtime hooks with no CSS of their own
 *   - a token that is a known class with a stray ai- prefix (ai-btn), or a
 *     legacy-map name that no longer resolves, is an ERROR with the fix
 *   - anything else is unknown. Real projects mix their own classes into the
 *     same attribute, so an unknown token is a WARNING by default and only
 *     becomes an error under strict mode (`--strict` / `{ strict: true }`).
 * Substring matches are never used, so `flex` cannot trip the `flex` check.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, '../../public');

// Names that used to need the ai- prefix. Since 0.4.0 the target is the name
// itself, so the map is read the other way round: it is the near-miss list
// used to turn a stale "ai-btn" back into "btn".
export const LEGACY_MAP = {
  btn: 'btn',
  'btn-primary': 'btn-primary',
  'btn-secondary': 'btn-secondary',
  'btn-outline': 'btn-outline',
  'btn-ghost': 'btn-ghost',
  'btn-danger': 'btn-danger',
  flex: 'flex',
  'flex-col': 'flex-col',
  'flex-row': 'flex-row',
  'flex-wrap': 'flex-wrap',
  'items-center': 'items-center',
  'items-start': 'items-start',
  'justify-between': 'justify-between',
  'justify-center': 'justify-center',
  grid: 'grid',
  card: 'card',
  badge: 'badge',
  spinner: 'spinner',
  progress: 'progress',
  'rounded-md': 'rounded-md',
  'rounded-lg': 'rounded-lg',
  container: 'container',
  hidden: 'hidden',
  'sr-only': 'sr-only',
  'text-center': 'text-center',
  'font-bold': 'font-bold',
  'w-full': 'w-full',
  input: 'input',
  table: 'table',
  modal: 'modal',
  alert: 'alert',
  tooltip: 'tooltip',
  dropdown: 'dropdown',
  accordion: 'accordion',
  tabs: 'tabs',
  navbar: 'navbar',
  footer: 'footer',
  'gap-2': 'gap-2',
  'gap-4': 'gap-4',
  'p-4': 'p-4',
  'p-6': 'p-6',
  'mt-4': 'mt-4',
  'mb-4': 'mb-4',
};

// Classes that are JavaScript hooks or runtime targets with no CSS of their own
const HOOK_CLASSES = new Set(['dropdown-trigger', 'tab', 'tab-panel', 'segmented-input', 'carousel-controls']);

// Custom element tag names keep the ai- prefix. They are legal class tokens
// too (the element and the class share a rule), so never flag them as a stale
// prefix on a known class.
export const CUSTOM_ELEMENT_TAGS = new Set([
  'ai-modal', 'ai-tabs', 'ai-dropdown', 'ai-accordion', 'ai-drawer', 'ai-toast', 'ai-command-palette',
]);

// A project's own hook classes: never styled by the library, never flagged.
const HOOK_PREFIX = /^js-/;

let cache = null;
function knownSets() {
  if (cache) return cache;
  const classes = new Set();
  const states = new Set();
  try {
    const c = JSON.parse(fs.readFileSync(path.join(publicDir, 'classes.json'), 'utf8'));
    for (const entry of c.classes) {
      classes.add(entry.class);
      for (const v of entry.variants) classes.add(`${v}:${entry.class}`);
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

// The class this stale ai-* token was renamed to in 0.4.0, or null.
function strippedTarget(token, classes) {
  if (!token.startsWith('ai-')) return null;
  const bare = token.slice(3);
  if (!bare) return null;
  if (classes.has(bare)) return bare;
  if (Object.prototype.hasOwnProperty.call(LEGACY_MAP, bare)) return LEGACY_MAP[bare];
  // ai-md:flex -> md:flex, even when only the base class is in the manifest.
  const vm = bare.match(/^(sm|md|lg|xl|cq):(.+)$/);
  if (vm && classes.has(vm[2])) return bare;
  return null;
}

/**
 * @param {string} html
 * @param {{ strict?: boolean }} [options] strict upgrades unknown classes from warning to error.
 * @returns {{ issues: Array<{type:string, severity:'error'|'warning', class:string, suggestion?:string, message:string}>, tokens: number, errors: number, warnings: number }}
 */
export function validateMarkup(html, options = {}) {
  const strict = options === true || options.strict === true;
  const { classes, states } = knownSets();
  const tokens = classTokens(html);
  const seen = new Set();
  const issues = [];
  for (const t of tokens) {
    if (seen.has(t)) continue;
    seen.add(t);

    // Exempt: runtime hooks and custom element tag names.
    if (HOOK_CLASSES.has(t) || CUSTOM_ELEMENT_TAGS.has(t) || HOOK_PREFIX.test(t)) continue;

    // State classes are checked against states.json, never against classes.json.
    if (t.startsWith('is-')) {
      if (states.size && !states.has(t)) {
        issues.push({
          type: 'unknown-state',
          severity: strict ? 'error' : 'warning',
          class: t,
          message: `"${t}" is not a state the library styles. Known states are in https://llmcss.io/states.json.`,
        });
      }
      continue;
    }

    // No manifest on disk: skip the unknown-class checks entirely.
    if (!classes.size) continue;
    if (classes.has(t)) continue;

    // Near miss 1: a known class still carrying the removed ai- prefix.
    const stripped = strippedTarget(t, classes);
    if (stripped) {
      issues.push({
        type: 'legacy-prefix',
        severity: 'error',
        class: t,
        suggestion: stripped,
        message: `"${t}" no longer exists: the ai- class prefix was removed in 0.4.0. Use "${stripped}".`,
      });
      continue;
    }

    // Near miss 2: a legacy name that maps somewhere else.
    if (Object.prototype.hasOwnProperty.call(LEGACY_MAP, t) && LEGACY_MAP[t] !== t) {
      issues.push({
        type: 'legacy-class',
        severity: 'error',
        class: t,
        suggestion: LEGACY_MAP[t],
        message: `Replace legacy "${t}" with "${LEGACY_MAP[t]}".`,
      });
      continue;
    }

    // Everything else: not ours as far as the manifest knows.
    const near = nearest(t, classes);
    issues.push({
      type: 'unknown-class',
      severity: strict ? 'error' : 'warning',
      class: t,
      suggestion: near || undefined,
      message: near
        ? `"${t}" is not a class in llmcss.css. Did you mean "${near}"? If it is your own class, ignore this.`
        : `"${t}" is not a class in llmcss.css. If it is your own class, ignore this; otherwise check https://llmcss.io/classes.json.`,
    });
  }
  const errors = issues.filter((i) => i.severity === 'error').length;
  return { issues, tokens: tokens.length, errors, warnings: issues.length - errors };
}

// Closest known class by a cheap edit-distance on the part after the last hyphen group
function nearest(token, classes) {
  let best = null;
  let bestScore = 4;
  const base = token.replace(/^(?:sm|md|lg|xl|cq):/, '');
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
    const isCard = cls.some((c) => c === 'card' || c === 'panel' || c === 'kpi-card');
    if (isCard && stack.some((s) => s.card)) nested++;
    stack.push({ name: lower, card: isCard });
  }
  if (nested) {
    issues.push({ category: 'Cardocalypse', law: 1, count: nested, message: `${nested} card${nested > 1 ? 's are' : ' is'} nested inside another card. Use whitespace, divider, or a surface shift instead.` });
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

/**
 * The 0.4.0 replacement for a single stale class token, or null when the token
 * is already correct (or is not ours to touch). Used by `llmcss lint --fix`.
 */
export function legacyFix(token) {
  if (!token || HOOK_CLASSES.has(token) || CUSTOM_ELEMENT_TAGS.has(token) || HOOK_PREFIX.test(token)) return null;
  if (token.startsWith('is-')) return null;
  const { classes } = knownSets();
  if (classes.has(token)) return null;
  const stripped = strippedTarget(token, classes);
  if (stripped) return stripped;
  if (Object.prototype.hasOwnProperty.call(LEGACY_MAP, token) && LEGACY_MAP[token] !== token) return LEGACY_MAP[token];
  return null;
}
