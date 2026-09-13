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
import { VARIANT_RE } from './css-names.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, '../../public');

/**
 * Old class name -> the 0.4.0 name, for the renames the generated-utilities
 * migration made. Read two ways:
 *   - strippedTarget uses it to resolve a stale "ai-<old>" to the new name
 *   - the legacy-class check below reports a bare <old> as an error with the
 *     new name as the fix, and `llmcss lint --fix` applies it
 *
 * Source of truth is the codemod's rename map (the `flat` object in
 * scratchpad/utilities-spec/rename-map.json); this is that map minus the two
 * entries a validator cannot act on. It used to hold forty-odd identity pairs
 * ("btn": "btn"), which made both branches that read it dead code: the
 * legacy-class check is guarded on LEGACY_MAP[t] !== t, and it never was.
 *
 * Deliberately NOT here:
 *   sticky -> sticky-top   `sticky` still exists and now means position-only.
 *                          A validator cannot tell the two meanings apart, and
 *                          guessing would rewrite correct markup.
 *   table, collapse        removed with no replacement; they fall through to
 *                          the unknown-class warning, which is the right shape.
 *
 * container-sm, container-md, container-lg and container-xl are renames AND
 * live class names with a new meaning (the Bootstrap-shaped fluid-then-capped
 * containers). They used to be checked ahead of the manifest so a stale one
 * was caught, which also made the new, correct spelling an error. The
 * migration has landed, so the manifest now answers first: writing
 * container-lg is simply correct. The entries stay only to resolve the
 * ai-prefixed spelling of the old cap.
 */
export const LEGACY_MAP = {
  // Ecommerce order tracker: the component gave up the order-* prefix to the
  // flexbox/grid order-* utilities. Names from components/commerce-extra.css.
  'order-head': 'orderline-head',
  'order-title': 'orderline-title',
  'order-eta': 'orderline-eta',
  'order-track': 'orderline-track',
  'order-step': 'orderline-step',
  'order-pip': 'orderline-pip',
  'order-label': 'orderline-label',
  'order-date': 'orderline-date',
  'order-meta': 'orderline-meta',
  'order-id': 'orderline-id',

  // Hard max-width caps kept their behaviour under container-w-*; the old
  // names now mean the fluid-then-capped containers. See the note above.
  'container-sm': 'container-w-sm',
  'container-md': 'container-w-md',
  'container-lg': 'container-w-lg',
  'container-xl': 'container-w-xl',
  'container-inline': 'cq-inline',

  // print-* was a parallel naming scheme for what is a variant everywhere else.
  'print-hidden': 'print:hidden',
  'print-block': 'print:block',
  'print-break-before': 'break-before-page',
  'print-break-after': 'break-after-page',

  // Folded into the grid-template-* value maps, so they get variants for free.
  'subgrid-cols': 'grid-cols-subgrid',
  'subgrid-rows': 'grid-rows-subgrid',

  // The property is user-select; select-* read as a <select> element style.
  'select-none': 'user-select-none',
  'select-text': 'user-select-text',
  'select-all': 'user-select-all',
  'select-auto': 'user-select-auto',

  // .border is width-and-style only now, so "none" had to say which.
  'border-none': 'border-style-none',

  // A theme switch, not a utility. Unrelated to the dark: variant prefix.
  dark: 'theme-dark',

  // Bare cq: was two variants sharing a name: nine classes fired at 380px and
  // five at 600px. Per-class, so the thresholds are preserved exactly; a
  // blanket cq: -> cq-md: would move the first nine from 380px to 600px.
  'cq:block': 'cq-sm:block',
  'cq:flex': 'cq-sm:flex',
  'cq:grid': 'cq-sm:grid',
  'cq:hidden': 'cq-sm:hidden',
  'cq:flex-row': 'cq-sm:flex-row',
  'cq:grid-cols-2': 'cq-sm:grid-cols-2',
  'cq:col-span-1': 'cq-sm:col-span-1',
  'cq:col-span-2': 'cq-sm:col-span-2',
  'cq:gap-4': 'cq-sm:gap-4',
  'cq:grid-cols-3': 'cq-md:grid-cols-3',
  'cq:grid-cols-4': 'cq-md:grid-cols-4',
  'cq:col-span-3': 'cq-md:col-span-3',
  'cq:gap-6': 'cq-md:gap-6',
  'cq:items-center': 'cq-md:items-center',
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
  // The motion addon is opt-in and ships its own manifest. When it is present
  // its classes validate; when it is absent they stay unknown, which is right
  // for a page that never loads llmcss-motion.css.
  try {
    const m = JSON.parse(fs.readFileSync(path.join(publicDir, 'classes.motion.json'), 'utf8'));
    for (const entry of m.classes) {
      classes.add(entry.class);
      for (const v of entry.variants || []) classes.add(`${v}:${entry.class}`);
    }
  } catch { /* addon manifest absent */ }
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
  // VARIANT_RE is the build-manifests list: five breakpoints, three container
  // tiers, fourteen states. The old pattern here knew sm|md|lg|xl|cq, so it
  // missed 2xl and every state and container tier that shipped in 0.4.0.
  const vm = bare.match(VARIANT_RE);
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

    // Near miss 2: a name the 0.4.0 rename retired outright. Reached only for
    // tokens the manifest does not know, so a LEGACY_MAP key that is also a
    // live class (container-sm and friends) never gets here: it resolved.
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

// Closest known class by a cheap edit-distance on the base name. The variant
// prefix is stripped first and compared against the unprefixed names, so
// `2xl:flexx` is scored as `flexx` and finds `flex`. The pattern used to be
// sm|md|lg|xl|cq, which knew neither 2xl nor the container tiers nor any
// state: `2xl:flexx` kept its prefix, no base name came within three edits of
// it, and the validator reported the typo with no suggestion at all.
function nearest(token, classes) {
  let best = null;
  let bestScore = 4;
  const vm = token.match(VARIANT_RE);
  const base = vm ? vm[2] : token;
  for (const c of classes) {
    if (c.includes(':')) continue;
    const d = distance(base, c);
    if (d < bestScore) {
      bestScore = d;
      best = c;
    }
  }
  if (!best) return null;
  // Hand the prefix back, so the suggestion is a class the author can paste.
  // Only when that variant of it exists: not every family takes every prefix,
  // and `2xl:` in particular serves tier A only.
  if (vm && classes.has(`${vm[1]}:${best}`)) return `${vm[1]}:${best}`;
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
  // Same order as validateMarkup: the manifest answers first, so a name the
  // library still ships is never rewritten.
  if (classes.has(token)) return null;
  const stripped = strippedTarget(token, classes);
  if (stripped) return stripped;
  if (Object.prototype.hasOwnProperty.call(LEGACY_MAP, token) && LEGACY_MAP[token] !== token) return LEGACY_MAP[token];
  return null;
}
