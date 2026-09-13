#!/usr/bin/env node
/**
 * Generates src/css/utilities.css from src/css/utilities.spec.mjs.
 *
 *   node src/registry/build-utilities.mjs            write the stylesheet
 *   node src/registry/build-utilities.mjs --check    report only, write nothing
 *
 * Runs before build-manifests in the npm build script, because build-manifests
 * reads both the generated stylesheet and the utilities.families.json this
 * script writes next to it.
 *
 * Deterministic: same spec in, byte-identical CSS out. Families are emitted in
 * spec order, not alphabetically, because cascade order inside the utilities
 * layer is semantic (`hidden` must follow `flex` so `class="flex hidden"`
 * hides). Alphabetical sorting would be deterministic and wrong. Value order
 * within a family is JavaScript object key order unless the family declares
 * `valueOrder`; see orderedKeys below.
 *
 * Writes nothing inside the repo except src/css/utilities.css and
 * src/css/utilities.families.json. Reads src/css/tokens.css to validate every
 * var(--ai-*) the spec references.
 *
 * Never emits !important: index.css declares
 * `@layer reset, tokens, base, components, utilities;`, so every rule in this
 * file already outranks every component rule whatever its specificity.
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath, pathToFileURL } from 'url';
import { selectorFor } from './css-names.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* This script lives in src/registry/; everything it touches is in src/css/. */
const cssDir = path.resolve(__dirname, '../css');
const SPEC_PATH = path.join(cssDir, 'utilities.spec.mjs');
const OUT_CSS = path.join(cssDir, 'utilities.css');
const OUT_FAMILIES = path.join(cssDir, 'utilities.families.json');
const TOKENS_CSS = path.join(cssDir, 'tokens.css');
/* The hand-written half of the same sheet. Not generated, but it ships in the
   same layer under the same no-!important rule, so --check scans it too. */
const EXTRA_CSS = path.join(cssDir, 'utilities.extra.css');

const spec = await import(pathToFileURL(SPEC_PATH).href);
const { families, breakpoints, containerTiers, stateVariants, stateSets, tokensToAdd, tokensToAddZ, keepList } = spec;

const CHECK = process.argv.includes('--check');

/* -------------------------------------------------------------------------
   Selector escaping

   Lives in ./css-names.mjs, shared with build-manifests.mjs and the CLI's
   `trim`, so the writer and both readers cannot disagree about what
   `.\000032xl\:flex` means. Re-exported here for the scripts that used to
   import it from this file.
   ------------------------------------------------------------------------- */

export { escapeClass, selectorFor, unescapeSelectorClass } from './css-names.mjs';

/* -------------------------------------------------------------------------
   State variant selectors
   ------------------------------------------------------------------------- */

/* Exported so build-motion.mjs emits its motion-safe: and motion-reduce:
   copies through the same wrappers the core uses, rather than keeping a second
   copy of the selector shapes that would drift. */
export const STATE_DEFS = {
  hover: { wrap: (s) => `${s}:hover`, at: '@media (hover: hover)' },
  focus: { wrap: (s) => `${s}:focus` },
  'focus-visible': { wrap: (s) => `${s}:focus-visible` },
  active: { wrap: (s) => `${s}:active` },
  disabled: { wrap: (s) => `${s}:disabled, ${s}[aria-disabled="true"]` },
  'group-hover': { wrap: (s) => `.group:hover ${s}`, at: '@media (hover: hover)' },
  /* Dark is the one state with no pseudo-class: it matches on an ancestor, or
     on the element itself when the theme marker and the utility share a node.
     Both markers count. tokens.css flips the core palette for `.theme-dark` as
     well as `[data-ai-theme="dark"]`, and the 0.4.0 rename made `.theme-dark`
     the documented class form, so a dark: utility that knew only the attribute
     was dead inside a `.theme-dark` subtree: the palette went dark around it
     and the utility did not fire.

     Written with :is() rather than as four full selectors. Same match set and
     the same specificity, because :is() takes the specificity of its most
     specific argument and both arguments here are (0,1,0), so each of the two
     selectors stays (0,2,0) exactly as before. It is 354 bytes smaller gzipped
     across the 63 dark: classes, which on a 50KB budget is worth the paren. */
  dark: { wrap: (s) => `:is([data-ai-theme="dark"], .theme-dark) ${s}, :is([data-ai-theme="dark"], .theme-dark)${s}` },
  print: { wrap: (s) => s, at: '@media print' },
  'motion-safe': { wrap: (s) => s, at: '@media (prefers-reduced-motion: no-preference)' },
  'motion-reduce': { wrap: (s) => s, at: '@media (prefers-reduced-motion: reduce)' },
  first: { wrap: (s) => `${s}:first-child` },
  last: { wrap: (s) => `${s}:last-child` },
  odd: { wrap: (s) => `${s}:nth-child(odd)` },
  even: { wrap: (s) => `${s}:nth-child(even)` },
};

for (const s of stateVariants) {
  if (!STATE_DEFS[s]) throw new Error(`spec lists state "${s}" with no selector definition`);
}

/** Expand a family's `states` (set names or bare state names) to state names. */
function statesOf(family) {
  const out = [];
  for (const name of family.states || []) {
    for (const s of stateSets[name] || [name]) if (!out.includes(s)) out.push(s);
  }
  return stateVariants.filter((s) => out.includes(s));
}

/* -------------------------------------------------------------------------
   Rule construction
   ------------------------------------------------------------------------- */

export function className(family, key) {
  if (family.prefix === null || family.prefix === undefined) return key;
  return key === '' ? family.prefix : `${family.prefix}-${key}`;
}

/** key -> [[property, value], ...] */
export function declsFor(family, key) {
  const v = family.values[key];
  if (v && typeof v === 'object') return Object.entries(v);
  return (family.props || []).map((p) => [p, v]);
}

/**
 * Emission order for a family's values.
 *
 * JavaScript orders object keys as integer-like keys ascending, then string
 * keys in insertion order. For most families the two coincide; for the spacing
 * scales it means `p-0 p-1 p-2 ... p-96 p-px p-0.5 p-1.5` rather than the
 * declared `p-0 p-px p-0.5 p-1 ...`. Harmless where every value writes the same
 * property, since no author applies two steps of one family at once.
 *
 * Where order is load-bearing it is not left to chance: a family declares
 * `valueOrder` and that wins. `display` does not need it, because all of its
 * keys are non-integer strings, so `hidden` stays last on insertion order and
 * `class="flex hidden"` hides.
 */
export function orderedKeys(family) {
  if (!family.valueOrder) return Object.keys(family.values);
  const declared = family.valueOrder.filter((k) => k in family.values);
  const rest = Object.keys(family.values).filter((k) => !declared.includes(k));
  return [...declared, ...rest];
}

export function variantKeys(family) {
  const all = orderedKeys(family);
  if (!family.variantValues || family.variantValues === 'all') return all;
  return family.variantValues.filter((k) => {
    if (!(k in family.values)) throw new Error(`${family.id}: variantValues names "${k}" which is not in values`);
    return true;
  });
}

const IND = '  ';

function ruleText(selector, decls, indent) {
  const body = decls.map(([p, v]) => `${p}: ${v};`).join(' ');
  return `${indent}${selector} { ${body} }\n`;
}

/* -------------------------------------------------------------------------
   Emit
   ------------------------------------------------------------------------- */

const emitted = []; // { class, family, id, variant, priority }

function emitFamilyBlock(family, keys, prefixName, indent, wrapSelector) {
  let css = '';
  for (const key of keys) {
    const base = className(family, key);
    const cls = prefixName ? `${prefixName}:${base}` : base;
    const sel = selectorFor(cls) + (family.selectorSuffix || '');
    css += ruleText(wrapSelector ? wrapSelector(sel) : sel, declsFor(family, key), indent);
    emitted.push({ class: cls, family: family.family, id: family.id, variant: prefixName || '', priority: family.priority });
  }
  return css;
}

function build() {
  const stamp = [
    '/* ==========================================================================',
    '   GENERATED FILE. Do not edit.',
    '',
    '   Source of truth:  src/css/utilities.spec.mjs',
    '   Regenerate with:  node src/registry/build-utilities.mjs',
    '   Runs before build-manifests in `npm run build`.',
    '',
    '   Hand-written utilities that the matrix cannot express live in',
    '   src/css/utilities.extra.css, which this script never touches.',
    '',
    '   No rule here carries !important. index.css declares',
    '   `@layer reset, tokens, base, components, utilities;` so every utility',
    '   already beats every component regardless of specificity.',
    '   ========================================================================== */',
    '',
  ].join('\n');

  let css = stamp + '@layer utilities {\n';

  /* 1. Base. */
  for (const f of families) {
    css += `${IND}/* ${f.id} (${f.family}, tier ${f.tier}, ${f.priority}) */\n`;
    css += emitFamilyBlock(f, orderedKeys(f), '', IND, null);
    css += '\n';
  }

  /* 2. Breakpoints, ascending, so a wider one wins at equal specificity.
        Each breakpoint declares the tiers it serves; 2xl serves tier A only. */
  for (const [name, bp] of Object.entries(breakpoints)) {
    const { px, tiers: served } = bp;
    const tierFamilies = families.filter((f) => served.includes(f.tier));
    if (!tierFamilies.length) continue;
    css += `${IND}/* ${name}: viewport >= ${px}px, tier ${served.join(' and ')} */\n`;
    css += `${IND}@media (min-width: ${px}px) {\n`;
    for (const f of tierFamilies) css += emitFamilyBlock(f, variantKeys(f), name, IND + IND, null);
    css += `${IND}}\n\n`;
  }

  /* 3. Container tiers, after the breakpoints so the nearer query wins. */
  for (const [name, px] of Object.entries(containerTiers)) {
    const tierFamilies = families.filter((f) => f.tier === 'A');
    if (!tierFamilies.length) continue;
    css += `${IND}/* ${name}: nearest .cq or .cq-inline ancestor >= ${px}px */\n`;
    css += `${IND}@container (min-width: ${px}px) {\n`;
    for (const f of tierFamilies) css += emitFamilyBlock(f, variantKeys(f), name, IND + IND, null);
    css += `${IND}}\n\n`;
  }

  /* 4. States. Every one adds a pseudo-class or an ancestor, so specificity
        carries them past the base and breakpoint copies on its own. */
  for (const state of stateVariants) {
    const def = STATE_DEFS[state];
    const tierFamilies = families.filter((f) => statesOf(f).includes(state));
    if (!tierFamilies.length) continue;
    const indent = def.at ? IND + IND : IND;
    css += `${IND}/* ${state}: */\n`;
    if (def.at) css += `${IND}${def.at} {\n`;
    for (const f of tierFamilies) css += emitFamilyBlock(f, variantKeys(f), state, indent, def.wrap);
    if (def.at) css += `${IND}}\n`;
    css += '\n';
  }

  css = css.replace(/\n{3,}/g, '\n\n');
  css += '}\n';
  return css;
}

/* -------------------------------------------------------------------------
   Validation
   ------------------------------------------------------------------------- */

/** Count !important outside comments, so the file header may still name it. */
function importantCount(css) {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, String());
  return (noComments.match(/!important/g) || []).length;
}

function validate(css) {
  const problems = [];

  if (importantCount(css)) problems.push('emitted CSS contains !important');

  /* The hand-written half of the utilities layer answers to the same rule:
     index.css orders `@layer reset, tokens, base, components, utilities;`, so
     nothing in either file needs !important to beat a component. This script
     does not write utilities.extra.css, but it is the only check that runs
     over the layer, so it reports on both. */
  if (fs.existsSync(EXTRA_CSS)) {
    const n = importantCount(fs.readFileSync(EXTRA_CSS, 'utf8'));
    if (n) problems.push(`utilities.extra.css contains ${n} !important`);
  } else {
    problems.push(`utilities.extra.css not readable at ${EXTRA_CSS}; !important scan skipped`);
  }

  /* Token names. */
  const declared = new Set();
  if (fs.existsSync(TOKENS_CSS)) {
    const tk = fs.readFileSync(TOKENS_CSS, 'utf8');
    for (const m of tk.matchAll(/(--ai-[\w-]+)\s*:/g)) declared.add(m[1]);
  } else {
    problems.push(`tokens.css not readable at ${TOKENS_CSS}; token validation skipped`);
  }
  const planned = new Set([...Object.keys(tokensToAdd), ...Object.keys(tokensToAddZ)]);
  const used = new Set();
  for (const m of css.matchAll(/var\((--ai-[\w-]+)/g)) used.add(m[1]);
  const missing = [...used].filter((t) => !declared.has(t) && !planned.has(t)).sort();
  const pending = [...used].filter((t) => !declared.has(t) && planned.has(t)).sort();

  /* Duplicate class names. */
  const seen = new Map();
  for (const e of emitted) {
    if (seen.has(e.class)) problems.push(`duplicate class ${e.class} from ${seen.get(e.class)} and ${e.id}`);
    else seen.set(e.class, e.id);
  }

  /* Overlap with the hand-written sheet. */
  const keep = new Set(keepList.map((k) => k.class));
  for (const e of emitted) if (keep.has(e.class)) problems.push(`${e.class} is both generated and on the keep list`);

  return { problems, missing, pending, used: used.size };
}

/* -------------------------------------------------------------------------
   Report
   ------------------------------------------------------------------------- */

function bytes(n) {
  return `${(n / 1024).toFixed(1)}KB`;
}

/** Rough stand-in for the vite minifier: drop indentation and blank lines.
    Exported so build-motion.mjs measures its sheet the same way, and the two
    gzip numbers are comparable. */
export function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*\n\s*/g, '')
    .replace(/\s*([{};:,])\s*/g, '$1')
    .replace(/;}/g, '}');
}

function report(css) {
  const gz = zlib.gzipSync(Buffer.from(css), { level: 9 }).length;
  const min = minify(css);
  const minGz = zlib.gzipSync(Buffer.from(min), { level: 9 }).length;

  const byPriority = {};
  const byVariant = {};
  const byFamily = {};
  for (const e of emitted) {
    byPriority[e.priority] = (byPriority[e.priority] || 0) + 1;
    byVariant[e.variant || 'base'] = (byVariant[e.variant || 'base'] || 0) + 1;
    byFamily[e.family] = (byFamily[e.family] || 0) + 1;
  }

  const unique = new Set(emitted.map((e) => e.class.replace(/^[a-z0-9-]+:/, ''))).size;
  const v = validate(css);

  const lines = [];
  lines.push('build-utilities --check');
  lines.push('');
  lines.push(`  spec families        ${families.length}`);
  lines.push(`  rules emitted        ${emitted.length}`);
  lines.push(`  distinct base names  ${unique}`);
  lines.push(`  raw                  ${bytes(css.length)}  (${css.length} bytes)`);
  lines.push(`  gzip, as authored    ${bytes(gz)}  (${gz} bytes)`);
  lines.push(`  minified             ${bytes(min.length)}  (${min.length} bytes)`);
  lines.push(`  gzip, minified       ${bytes(minGz)}  (${minGz} bytes)   <- the number that counts`);
  lines.push(`  bytes/class gzipped  ${(minGz / emitted.length).toFixed(2)}`);
  lines.push('');
  lines.push('  batch          classes');
  for (const p of ['P0', 'P1', 'P2']) lines.push(`  ${p.padEnd(14)} ${String(byPriority[p] || 0).padStart(6)}`);
  lines.push('');
  lines.push('  variant        classes');
  for (const [k, n] of Object.entries(byVariant)) lines.push(`  ${k.padEnd(14)} ${String(n).padStart(6)}`);
  lines.push('');
  lines.push('  manifest family        classes');
  for (const [k, n] of Object.entries(byFamily).sort((a, b) => b[1] - a[1])) {
    lines.push(`  ${k.padEnd(22)} ${String(n).padStart(6)}`);
  }
  lines.push('');
  lines.push(`  tokens referenced    ${v.used}`);
  lines.push(`  tokens pending       ${v.pending.length}${v.pending.length ? ' (in tokensToAdd, not yet in tokens.css)' : ''}`);
  if (v.missing.length) lines.push(`  TOKENS MISSING       ${v.missing.join(', ')}`);
  lines.push(`  no !important        ${v.problems.some((p) => p.includes(String.fromCharCode(33) + 'important')) ? 'FAIL' : 'ok'}   (utilities.css + utilities.extra.css)`);
  lines.push(`  keep-list overlap    ${v.problems.filter((p) => p.includes('keep list')).length ? 'FAIL' : 'ok'}`);
  lines.push(`  duplicate classes    ${v.problems.filter((p) => p.startsWith('duplicate')).length ? 'FAIL' : 'ok'}`);
  if (v.problems.length) {
    lines.push('');
    lines.push('  problems');
    for (const p of v.problems) lines.push(`    - ${p}`);
  }
  return lines.join('\n');
}

/* -------------------------------------------------------------------------
   Main

   Guarded, because this module is now imported: build-motion.mjs reuses
   STATE_DEFS and minify, and an unguarded main would have rebuilt and
   rewritten utilities.css as a side effect of that import. The guard accepts
   both the resolved path and the bare file name, so a symlinked or
   relatively-invoked `node src/registry/build-utilities.mjs` still writes.
   ------------------------------------------------------------------------- */

const selfPath = fileURLToPath(import.meta.url);
const invoked = process.argv[1] ? path.resolve(process.argv[1]) : '';
const isMain = invoked === selfPath || path.basename(invoked) === path.basename(selfPath);

if (!isMain) {
  /* imported: nothing runs, nothing is written */
} else if (CHECK) {
  const css = build();
  /* --check is a gate, not a readout: it used to print FAIL and exit 0, so a
     CI step or a pre-deploy `&&` chain ran on regardless. Same report, and a
     non-zero status whenever it has something to report. */
  console.log(report(css));
  const v = validate(css);
  if (v.problems.length || v.missing.length) process.exit(1);
} else {
  const css = build();
  const v = validate(css);
  if (v.problems.length || v.missing.length) {
    console.error(report(css));
    process.exit(1);
  }
  fs.writeFileSync(OUT_CSS, css);

  /* Family attribution for build-manifests. Written as JSON rather than
     imported, so build-manifests stays a CSS reader with one extra
     readFileSync and no coupling to the spec module. */
  const classes = {};
  const variants = {};
  for (const e of emitted) {
    const base = e.variant ? e.class.slice(e.variant.length + 1) : e.class;
    classes[base] = e.family;
    if (e.variant) (variants[base] = variants[base] || []).push(e.variant);
  }
  fs.writeFileSync(
    OUT_FAMILIES,
    JSON.stringify(
      {
        note: 'Generated by build-utilities.mjs alongside utilities.css. build-manifests reads this instead of guessing a family from the file name, because the whole matrix lives in one file.',
        generator: 'src/registry/build-utilities.mjs',
        classes,
        variants: Object.fromEntries(Object.entries(variants).map(([k, list]) => [k, [...new Set(list)].sort()])),
      },
      null,
      1
    ) + '\n'
  );
  console.log(`[build-utilities] ${emitted.length} rules -> ${path.relative(process.cwd(), OUT_CSS)}`);
}
