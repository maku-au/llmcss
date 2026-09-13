#!/usr/bin/env node
/**
 * Generates src/css/motion.css from src/css/motion.spec.mjs.
 *
 *   node src/registry/build-motion.mjs            write the stylesheet
 *   node src/registry/build-motion.mjs --check    report only, write nothing
 *
 * The motion addon is a second stylesheet, not part of dist/llmcss.css. This
 * script is the exact analogue of build-utilities.mjs for it, and reuses that
 * script's helpers rather than keeping a second copy of them: STATE_DEFS,
 * className, declsFor, orderedKeys, variantKeys and minify all come from
 * build-utilities.mjs, and selectorFor comes from css-names.mjs, so the writer
 * and the manifest readers cannot disagree about what a class name escapes to.
 *
 * Deterministic and idempotent: same spec in, byte-identical CSS out. No
 * timestamp is written into any output. Families are emitted in spec order,
 * values in orderedKeys order, raw blocks in the fixed order below, never in
 * object key order.
 *
 * Emission order inside @layer motion:
 *   rawBlocks.tokens -> keyframes -> rawBlocks.defaults -> family base rules
 *   -> motion-safe: / motion-reduce: copies -> collapse -> stagger -> gated
 *   -> reveal -> micro
 *
 * Writes three files, all new, none of them a core artefact:
 *   src/css/motion.css            the addon sheet, imported by site.css
 *   src/css/motion.families.json  family attribution, for build-manifests
 *   public/classes.motion.json    the addon manifest validate.mjs can read
 *
 * --check is a gate, not a readout. It exits 1 when the minified sheet gzips
 * over meta.budgetGzipBytes (6144), when any keyframe name matches the audit's
 * banned list (pulse, ping, breathe, blink, glow), when any rule carries
 * !important, and on any other validation problem.
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { selectorFor } from './css-names.mjs';
import { STATE_DEFS, className, declsFor, orderedKeys, variantKeys, minify } from './build-utilities.mjs';
import * as spec from '../css/motion.spec.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

const {
  meta,
  families,
  stateVariants,
  stateSets,
  tokensToAdd,
  keyframes,
  rawBlocks,
  expectedOverlap,
} = spec;

const OUT_CSS = path.join(root, meta.outCss);
const OUT_FAMILIES = path.join(root, meta.outFamilies);
const OUT_MANIFEST = path.join(root, meta.outManifest);
const TOKENS_CSS = path.join(root, 'src/css/tokens.css');
const CORE_MANIFEST = path.join(root, 'public/classes.json');
/* The generated half of the core sheet, for the overlap check below. */
const CORE_FAMILIES = path.join(root, 'src/css/utilities.families.json');
const PKG = path.join(root, 'package.json');

const CHECK = process.argv.includes('--check');

/* The audit's two literals. validate.mjs:357 owns PULSE and validate.mjs:359
   owns the keyframe-name pattern; neither is exported yet, so they are
   restated here with that reference. Exporting PULSE from validate.mjs is a
   one-line change in another builder's file, reported rather than made. */
const PULSE = new Set(['animate-pulse', 'pulse', 'animate-ping', 'ping', 'breathe', 'blink', 'animate-bounce']);
const BANNED_KEYFRAME = /pulse|ping|breathe|blink|glow/i;

/* -------------------------------------------------------------------------
   Emit
   ------------------------------------------------------------------------- */

const IND = '  ';
const emitted = []; // { class, family, id, variant, priority }

function statesOf(family) {
  const out = [];
  for (const name of family.states || []) {
    for (const s of stateSets[name] || [name]) if (!out.includes(s)) out.push(s);
  }
  return stateVariants.filter((s) => out.includes(s));
}

function ruleText(selector, decls, indent) {
  const body = decls.map(([p, v]) => `${p}: ${v};`).join(' ');
  return `${indent}${selector} { ${body} }\n`;
}

/** A raw block, every line pushed in by one level, blank lines left blank. */
function indentBlock(text, indent = IND) {
  return (
    text
      .split('\n')
      .map((line) => (line.trim() ? indent + line : line))
      .join('\n') + '\n'
  );
}

function emitFamilyBlock(family, keys, prefixName, indent, wrapSelector) {
  let css = '';
  for (const key of keys) {
    const base = className(family, key);
    const cls = prefixName ? `${prefixName}:${base}` : base;
    const sel = selectorFor(cls) + (family.selectorSuffix || '');
    css += ruleText(wrapSelector ? wrapSelector(sel) : sel, declsFor(family, key), indent);
    emitted.push({
      class: cls,
      family: family.family,
      id: family.id,
      variant: prefixName || '',
      priority: family.priority,
    });
  }
  return css;
}

const BANNER = [
  '/* ==========================================================================',
  '   GENERATED FILE. Do not edit.',
  '',
  '   LLMCSS motion addon. Opt in with a second link tag, after the core sheet:',
  '     <link rel="stylesheet" href="/llmcss.css">',
  '     <link rel="stylesheet" href="/llmcss-motion.css">',
  '',
  '   Source of truth:  src/css/motion.spec.mjs',
  '   Regenerate with:  node src/registry/build-motion.mjs',
  '   Budget check:     node src/registry/build-motion.mjs --check',
  '   Minified to dist/llmcss-motion.css by `npm run build:motion`.',
  '',
  '   Everything here is inside @layer motion, the slot src/css/index.css',
  '   already reserves between components and utilities, so every utility still',
  '   outranks every rule in this file and nothing here needs !important.',
  '   Nothing here carries !important.',
  '',
  '   Durations, delays and easings are the core tokens. This file does not',
  '   redefine --ai-duration-*, --ai-delay-* or --ai-ease-*, it reads them, so',
  '   retuning a core token retunes the addon.',
  '',
  '   Reduced motion: the core kill switch stays in charge. animations.css sets',
  '   `animation-duration: 0.01ms !important` on everything inside',
  '   @layer components, and an important declaration in an earlier layer wins,',
  '   so every animation in this file is instant for a reduced-motion user.',
  '   With animation-fill-mode: both that lands the element on its final frame:',
  '   entrances appear, exits disappear, nothing travels, nothing is left',
  '   hidden. The reveal family is the exception: both of its paths sit inside',
  '   prefers-reduced-motion: no-preference, so a reduced-motion user gets the',
  '   plain, visible element and no transition at all.',
  '   ========================================================================== */',
  '',
].join('\n');

/** Fixed, not read from object key order, so the sheet stays byte-stable. */
const TRAILING_BLOCKS = ['collapse', 'stagger', 'gated', 'reveal', 'micro'];

function build() {
  let css = BANNER + `@layer ${meta.layer} {\n`;

  /* 1. The addon's own tokens. src/css/tokens.css is not touched. */
  css += indentBlock(rawBlocks.tokens);
  css += '\n';

  /* 2. Keyframes, every name ai-m-*, so the core's ai-fade-in and ai-scale-up
        keep their meaning for the modal, dropdown, tabs and accordion. */
  css += `${IND}/* keyframes: all ai-m-*, so no core keyframe is shadowed */\n`;
  for (const [name, body] of Object.entries(keyframes)) {
    css += `${IND}@keyframes ${name} { ${body} }\n`;
  }
  css += '\n';

  /* 3. Shared defaults, specificity zero. */
  css += indentBlock(rawBlocks.defaults);
  css += '\n';

  /* 4. Family base rules, in spec order. */
  for (const f of families) {
    css += `${IND}/* ${f.id} (${f.family}, tier ${f.tier}, ${f.priority}) */\n`;
    css += emitFamilyBlock(f, orderedKeys(f), '', IND, null);
    css += '\n';
  }

  /* 5. State copies. Only motion-safe and motion-reduce: an entrance does not
        change at 768px, so there are no breakpoint or container copies. */
  for (const state of stateVariants) {
    const def = STATE_DEFS[state];
    const stateFamilies = families.filter((f) => statesOf(f).includes(state));
    if (!stateFamilies.length) continue;
    const indent = def.at ? IND + IND : IND;
    css += `${IND}/* ${state}: */\n`;
    if (def.at) css += `${IND}${def.at} {\n`;
    for (const f of stateFamilies) css += emitFamilyBlock(f, variantKeys(f), state, indent, def.wrap);
    if (def.at) css += `${IND}}\n`;
    css += '\n';
  }

  /* 6. The rule shapes the value map cannot express. */
  for (const key of TRAILING_BLOCKS) {
    if (!rawBlocks[key]) continue;
    css += indentBlock(rawBlocks[key]);
    css += '\n';
  }

  css = css.replace(/\n{3,}/g, '\n\n');
  css += '}\n';
  return css;
}

/* -------------------------------------------------------------------------
   Validation
   ------------------------------------------------------------------------- */

/** Count !important outside comments, so the banner may still name it. */
function importantCount(css) {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, String());
  return (noComments.match(/!important/g) || []).length;
}

/**
 * The classes the CORE sheet ships.
 *
 * Two sources, unioned, because neither alone is reliable here:
 *
 *   public/classes.json, minus every entry the manifest itself attributes to
 *   motion.css. The design gives the addon its own manifest, but a
 *   build-manifests run that folds motion.css into classes.json makes every
 *   addon class read back as a core class, and the assertion below would then
 *   compare the addon against itself. Filtering on the entry's own `file`
 *   makes the check work under either arrangement.
 *
 *   src/css/utilities.families.json, the list build-utilities writes for the
 *   generated half of the core sheet. It is needed because a folded manifest
 *   also re-attributes the 13 names the addon shares with the core, so
 *   duration-fast stops reading as a core utility in classes.json even though
 *   utilities.css still defines it.
 */
function coreClasses() {
  const out = new Set();
  let ok = false;
  try {
    const c = JSON.parse(fs.readFileSync(CORE_MANIFEST, 'utf8'));
    for (const e of c.classes) {
      if (/(^|\/)(llmcss-)?motion\.css$/.test(e.file || '')) continue;
      out.add(e.class);
    }
    ok = true;
  } catch { /* manifest absent */ }
  try {
    const u = JSON.parse(fs.readFileSync(CORE_FAMILIES, 'utf8'));
    for (const cls of Object.keys(u.classes)) out.add(cls);
    ok = true;
  } catch { /* families file absent */ }
  return ok ? out : null;
}

function validate(css, gzipMinified) {
  const problems = [];

  if (importantCount(css)) problems.push('emitted CSS contains !important');

  /* Law 2, at the only place it can be enforced mechanically here: a keyframe
     name that reads as an attention loop. Same pattern as validate.mjs:359. */
  for (const name of Object.keys(keyframes)) {
    if (BANNED_KEYFRAME.test(name)) problems.push(`keyframe ${name} matches the banned attention-loop pattern`);
    if (!name.startsWith('ai-m-')) problems.push(`keyframe ${name} is not prefixed ai-m-, so it can shadow a core keyframe`);
  }

  /* No addon class may be one of the tokens the audit flags. */
  for (const e of emitted) {
    if (PULSE.has(e.class.toLowerCase())) problems.push(`class ${e.class} is in the audit's Law 2 class list`);
  }

  /* Token names. The addon declares its own tokens in this sheet, so the sheet
     itself counts as a declaration site alongside tokens.css. */
  const declared = new Set();
  if (fs.existsSync(TOKENS_CSS)) {
    const tk = fs.readFileSync(TOKENS_CSS, 'utf8');
    for (const m of tk.matchAll(/(--ai-[\w-]+)\s*:/g)) declared.add(m[1]);
  } else {
    problems.push(`tokens.css not readable at ${TOKENS_CSS}; token validation skipped`);
  }
  for (const m of css.matchAll(/(--ai-[\w-]+)\s*:/g)) declared.add(m[1]);
  const planned = new Set(Object.keys(tokensToAdd));
  const used = new Set();
  for (const m of css.matchAll(/var\((--ai-[\w-]+)/g)) used.add(m[1]);
  const missing = [...used].filter((t) => !declared.has(t) && !planned.has(t)).sort();

  /* Duplicate class names. */
  const seen = new Map();
  for (const e of emitted) {
    if (seen.has(e.class)) problems.push(`duplicate class ${e.class} from ${seen.get(e.class)} and ${e.id}`);
    else seen.set(e.class, e.id);
  }

  /* A manifestOnly family is a marker: exactly one declaration, and it has to
     be a custom property, so a marker cannot quietly grow real behaviour that
     belongs in a raw block. */
  for (const f of families) {
    if (!f.manifestOnly) continue;
    for (const key of orderedKeys(f)) {
      const decls = declsFor(f, key);
      const bad = decls.length !== 1 || !decls[0][0].startsWith('--');
      if (bad) {
        problems.push(`${f.id}.${key} is manifestOnly (${f.manifestOnly}) but emits ${decls.map((d) => d[0]).join(', ')}`);
      }
    }
  }

  /* Overlap with the core sheet. Exactly the 13 names in expectedOverlap, all
     of them custom-property-only rules; a fourteenth means a family has
     started shadowing a core utility. */
  const core = coreClasses();
  let overlap = [];
  if (core) {
    overlap = [...new Set(emitted.filter((e) => !e.variant).map((e) => e.class))].filter((c) => core.has(c)).sort();
    const want = [...expectedOverlap].sort();
    if (overlap.join(',') !== want.join(',')) {
      const extra = overlap.filter((c) => !want.includes(c));
      const gone = want.filter((c) => !overlap.includes(c));
      if (extra.length) problems.push(`unexpected overlap with classes.json: ${extra.join(', ')}`);
      if (gone.length) problems.push(`expectedOverlap names classes the addon no longer emits: ${gone.join(', ')}`);
    }
    for (const c of overlap) {
      for (const e of emitted.filter((x) => x.class === c)) {
        const f = families.find((y) => y.id === e.id);
        const key = orderedKeys(f).find((k) => className(f, k) === c);
        if (declsFor(f, key).some(([p]) => !p.startsWith('--'))) {
          problems.push(`${c} overlaps a core class and writes a real property, not just a custom property`);
        }
      }
    }
  } else {
    problems.push(`neither ${CORE_MANIFEST} nor ${CORE_FAMILIES} is readable; overlap check skipped`);
  }

  if (gzipMinified > meta.budgetGzipBytes) {
    problems.push(`gzip minified ${gzipMinified} bytes is over the ${meta.budgetGzipBytes} byte budget`);
  }

  return { problems, missing, used: used.size, overlap };
}

/* -------------------------------------------------------------------------
   Report
   ------------------------------------------------------------------------- */

function bytes(n) {
  return `${(n / 1024).toFixed(1)}KB`;
}

function measure(css) {
  const min = minify(css);
  return {
    raw: css.length,
    gz: zlib.gzipSync(Buffer.from(css), { level: 9 }).length,
    min: min.length,
    minGz: zlib.gzipSync(Buffer.from(min), { level: 9 }).length,
  };
}

function report(css, m, v) {
  const byPriority = {};
  const byId = {};
  for (const e of emitted) {
    byPriority[e.priority] = (byPriority[e.priority] || 0) + 1;
    byId[e.id] = (byId[e.id] || 0) + 1;
  }
  const base = emitted.filter((e) => !e.variant).length;
  const variants = emitted.length - base;
  const headroom = meta.budgetGzipBytes - m.minGz;

  const lines = [];
  lines.push('build-motion --check');
  lines.push('');
  lines.push(`  spec families        ${families.length}`);
  lines.push(`  keyframes            ${Object.keys(keyframes).length}`);
  lines.push(`  classes, base        ${base}`);
  lines.push(`  classes, variants    ${variants}   (motion-safe:, motion-reduce:)`);
  lines.push(`  classes, total       ${emitted.length}`);
  lines.push(`  raw                  ${bytes(m.raw)}  (${m.raw} bytes)`);
  lines.push(`  gzip, as authored    ${bytes(m.gz)}  (${m.gz} bytes)`);
  lines.push(`  minified             ${bytes(m.min)}  (${m.min} bytes)`);
  lines.push(`  gzip, minified       ${bytes(m.minGz)}  (${m.minGz} bytes)   <- the number that counts`);
  lines.push(`  budget               ${meta.budgetGzipBytes} bytes   ${m.minGz > meta.budgetGzipBytes ? 'OVER by ' + -headroom : 'ok, ' + headroom + ' bytes spare'}`);
  lines.push(`  bytes/class gzipped  ${(m.minGz / emitted.length).toFixed(2)}`);
  lines.push('');
  lines.push('  batch          classes');
  for (const p of ['P0', 'P1', 'P2']) lines.push(`  ${p.padEnd(14)} ${String(byPriority[p] || 0).padStart(6)}`);
  lines.push('');
  lines.push('  spec family              classes');
  for (const f of families) lines.push(`  ${f.id.padEnd(24)} ${String(byId[f.id] || 0).padStart(6)}`);
  lines.push('');
  lines.push(`  tokens referenced    ${v.used}`);
  if (v.missing.length) lines.push(`  TOKENS MISSING       ${v.missing.join(', ')}`);
  lines.push(`  core overlap         ${v.overlap.length} (expected ${expectedOverlap.length})`);
  lines.push(`  banned keyframes     ${Object.keys(keyframes).filter((n) => BANNED_KEYFRAME.test(n)).length ? 'FAIL' : 'ok'}   (pulse, ping, breathe, blink, glow)`);
  lines.push(`  no ${String.fromCharCode(33)}important        ${importantCount(css) ? 'FAIL' : 'ok'}`);
  lines.push(`  duplicate classes    ${v.problems.filter((p) => p.startsWith('duplicate')).length ? 'FAIL' : 'ok'}`);
  lines.push(`  budget               ${m.minGz > meta.budgetGzipBytes ? 'FAIL' : 'ok'}`);
  if (v.problems.length) {
    lines.push('');
    lines.push('  problems');
    for (const p of v.problems) lines.push(`    - ${p}`);
  }
  return lines.join('\n');
}

/* -------------------------------------------------------------------------
   Manifests
   ------------------------------------------------------------------------- */

function manifests() {
  const version = JSON.parse(fs.readFileSync(PKG, 'utf8')).version;

  /* Family attribution for build-manifests, the same shape and the same job as
     utilities.families.json. */
  const classes = {};
  const variants = {};
  const groups = {};
  for (const e of emitted) {
    const base = e.variant ? e.class.slice(e.variant.length + 1) : e.class;
    classes[base] = e.family;
    groups[base] = e.id;
    if (e.variant) (variants[base] = variants[base] || []).push(e.variant);
  }
  const variantsSorted = Object.fromEntries(
    Object.entries(variants).map(([k, list]) => [k, [...new Set(list)].sort()])
  );

  const familiesJson =
    JSON.stringify(
      {
        note: 'Generated by build-motion.mjs alongside motion.css. build-manifests reads this to render public/classes.motion.json, the same path utilities.families.json takes for classes.json.',
        generator: 'src/registry/build-motion.mjs',
        addon: 'motion',
        file: 'llmcss-motion.css',
        classes,
        groups,
        variants: variantsSorted,
      },
      null,
      1
    ) + '\n';

  /* The addon manifest itself, in the shape validate.mjs reads: entry.class
     and entry.variants, exactly like classes.json. Written here so the
     validator change stays one line; when build-manifests learns to render it
     from motion.families.json this file is the thing it renders. */
  const order = [...new Set(emitted.filter((e) => !e.variant).map((e) => e.class))].sort();
  const byGroup = {};
  for (const c of order) byGroup[groups[c]] = (byGroup[groups[c]] || 0) + 1;

  const manifestJson =
    JSON.stringify(
      {
        version,
        addon: 'motion',
        note:
          'The motion addon. These classes exist only on pages that load https://llmcss.io/llmcss-motion.css in a second link tag after llmcss.css. Every animation here is one shot and fires because something changed. There is no repeat-infinite, and animate-sweep stays inert unless its element sits in .progress or .skeleton or carries is-loading, is-streaming or aria-busy. variants lists the prefixes that exist for the class: motion-safe and motion-reduce only, because an entrance does not change at 768px.',
        stylesheet: 'https://llmcss.io/llmcss-motion.css',
        stats: { total: order.length, rules: emitted.length, families: byGroup },
        classes: order.map((c) => ({
          class: c,
          family: classes[c],
          group: groups[c],
          file: 'llmcss-motion.css',
          variants: variantsSorted[c] || [],
        })),
      },
      null,
      1
    ) + '\n';

  return { familiesJson, manifestJson };
}

/* -------------------------------------------------------------------------
   Main
   ------------------------------------------------------------------------- */

const css = build();
const m = measure(css);
const v = validate(css, m.minGz);

if (CHECK) {
  console.log(report(css, m, v));
  if (v.problems.length || v.missing.length) process.exit(1);
} else {
  if (v.problems.length || v.missing.length) {
    console.error(report(css, m, v));
    process.exit(1);
  }
  const { familiesJson, manifestJson } = manifests();
  fs.writeFileSync(OUT_CSS, css);
  fs.writeFileSync(OUT_FAMILIES, familiesJson);
  fs.mkdirSync(path.dirname(OUT_MANIFEST), { recursive: true });
  fs.writeFileSync(OUT_MANIFEST, manifestJson);
  const rel = (p) => path.relative(process.cwd(), p);
  console.log(
    `[build-motion] ${emitted.length} rules, ${m.minGz} bytes gzipped of ${meta.budgetGzipBytes} -> ${rel(OUT_CSS)}, ${rel(OUT_FAMILIES)}, ${rel(OUT_MANIFEST)}`
  );
}
