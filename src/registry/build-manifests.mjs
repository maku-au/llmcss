/**
 * Machine-readable manifests for agents, generated from the CSS itself so they
 * cannot drift from the stylesheet:
 *   public/classes.json  every class, its family, and which variants exist
 *   public/tokens.json   every --ai-* token with base, dark, and per-skin values
 *   public/states.json   every is-* state class and data-ai-* attribute
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { classSelectorRe, unescapeSelectorClass, VARIANT_RE } from './css-names.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssDir = path.resolve(__dirname, '../css');
const publicDir = path.resolve(__dirname, '../../public');
// Manifests carry the package version so a consumer can tell which release they describe.
const PKG_VERSION = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')).version;

function cssFiles(dir) {
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out.push(...cssFiles(p));
    // showcase.css is site chrome; motion.css is the opt-in addon with its own
    // manifest (public/classes.motion.json), so neither belongs in classes.json.
    else if (p.endsWith('.css') && !p.endsWith('showcase.css') && !p.endsWith('motion.css')) out.push(p);
  }
  return out;
}

// Split a stylesheet into { selector, body } pairs, descending into @layer/@media/@supports.
function rules(css, ctx = '') {
  const out = [];
  let i = 0;
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open < 0) break;
    const head = css.slice(i, open).trim();
    let depth = 1;
    let j = open + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    const body = css.slice(open + 1, j - 1);
    if (head.startsWith('@layer') || head.startsWith('@supports') || head.startsWith('@container')) {
      out.push(...rules(body, ctx));
    } else if (head.startsWith('@media')) {
      out.push(...rules(body, head.replace(/^@media\s*/, '')));
    } else if (!head.startsWith('@')) {
      out.push({ selector: head, body, media: ctx });
    }
    i = j;
  }
  return out;
}

/**
 * Family attribution for the generated matrix, written by build-utilities.mjs
 * next to utilities.css. Keyed by the base class name with the variant prefix
 * stripped, so familyFor is a lookup rather than a prefix guess.
 */
const UTIL_FAMILIES = JSON.parse(
  fs.readFileSync(path.join(cssDir, 'utilities.families.json'), 'utf8')
).classes;

const FAMILY_BY_PREFIX = [
  ['-(m|mx|my|mt|mr|mb|ml|ms|me)-', 'spacing'],
  ['(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me)-', 'spacing'],
  ['(gap|gap-x|gap-y)-', 'spacing'],
  ['(w|h|min-w|max-w|min-h|max-h|size)-', 'sizing'],
  ['(text|font|leading|tracking|truncate|line-clamp|uppercase|lowercase|capitalize|italic|underline|whitespace|break)', 'typography'],
  ['(flex|items|justify|self|content|place|order|grow|shrink|basis)', 'flex'],
  ['(grid|col|row|auto-cols|auto-rows)', 'grid'],
  ['(block|inline|hidden|table|contents|sr-only|not-sr-only)', 'display'],
  ['(static|fixed|absolute|relative|sticky|inset|top|right|bottom|left|start|end|z)-?', 'position'],
  ['(border|rounded|ring|outline|divide)', 'borders'],
  ['(bg|shadow|opacity|backdrop|blur|filter|mix)', 'effects'],
  ['(overflow|scroll|snap|touch|select|pointer|cursor|resize|will-change|transition|duration|ease|delay|animate|transform|rotate|scale|translate|skew|origin)', 'interaction'],
  ['(container|cq|section|aspect|columns|object)', 'layout'],
];

function familyFor(cls, file) {
  const base = path.basename(file, '.css');
  // utilities.extra.css is the hand-written half of the same sheet, so it takes
  // the same attribution path rather than becoming a family of its own.
  if (base !== 'utilities' && base !== 'utilities.extra') {
    return base === 'animations' ? 'animations' : base;
  }
  if (UTIL_FAMILIES[cls]) return UTIL_FAMILIES[cls];
  for (const [re, fam] of FAMILY_BY_PREFIX) if (new RegExp('^' + re).test(cls)) return fam;
  return 'utilities';
}

// Every class selector in the stylesheet, prefix-free since 0.4.0. The pattern
// and its inverse live in ./css-names.mjs, shared with build-utilities.mjs
// (which writes the escapes) and the CLI's `trim` (which reads them), so the
// three cannot disagree about what .\000032xl\:flex means.
const CLASS_RE = classSelectorRe();
const unescape = unescapeSelectorClass;

// Variant prefixes: four breakpoints, three container tiers and all twelve
// state prefixes the spec emits. Every one of the twelve is reached by at
// least one family, motion-safe included (utilities.spec.mjs puts it in the
// `motion` state set alongside motion-reduce). It lives in ./css-names.mjs
// because validate.mjs needs the same list to suggest a fix for `2xl:flexx`.
//
// VARIANT_RE is deliberately longer than stateVariants now: 2xl, odd and even
// were cut from the spec on 2026-09-13, and the regex keeps reading them so a
// stale `2xl:flexx` still parses as a variant of `flexx` and the validator can
// still suggest `flex` instead of reporting an unrecognised token with no fix.

function buildClasses(files) {
  const classes = new Map();
  const states = new Map();
  for (const file of files) {
    const css = fs.readFileSync(file, 'utf8');
    for (const r of rules(css)) {
      const sel = r.selector;
      for (const m of sel.matchAll(CLASS_RE)) {
        const raw = unescape(m[1]);
        if (raw.startsWith('is-')) {
          const entry = states.get(raw) || { class: raw, components: new Set() };
          for (const c of sel.matchAll(CLASS_RE)) {
            const name = unescape(c[1]);
            if (!name.startsWith('is-')) entry.components.add(name);
          }
          states.set(raw, entry);
          continue;
        }
        const pm = raw.match(VARIANT_RE);
        if (pm) {
          const key = pm[2];
          const entry = classes.get(key) || { class: key, family: familyFor(key, file), file: path.relative(cssDir, file), variants: new Set() };
          entry.variants.add(pm[1]);
          classes.set(key, entry);
          continue;
        }
        const entry = classes.get(raw) || { class: raw, family: familyFor(raw, file), file: path.relative(cssDir, file), variants: new Set() };
        if (!entry.file) entry.file = path.relative(cssDir, file);
        classes.set(raw, entry);
      }
    }
  }
  const list = [...classes.values()]
    .map((c) => ({ class: c.class, family: c.family, file: c.file, variants: [...c.variants].sort() }))
    .sort((a, b) => a.class.localeCompare(b.class));
  const stateList = [...states.values()]
    .map((s) => ({ class: s.class, usedBy: [...s.components].sort() }))
    .sort((a, b) => a.class.localeCompare(b.class));
  return { list, stateList };
}

function parseTokens(file, into, labelFor) {
  const css = fs.readFileSync(file, 'utf8');
  for (const r of rules(css)) {
    const labels = [labelFor(r.selector)].flat().filter(Boolean);
    if (!labels.length) continue;
    for (const m of r.body.matchAll(/(--ai-[\w-]+)\s*:\s*([^;]+);/g)) {
      const name = m[1];
      const entry = into.get(name) || { token: name, values: {} };
      for (const label of labels) {
        if (!(label in entry.values)) entry.values[label] = m[2].trim();
      }
      into.set(name, entry);
    }
  }
}

// Per-component tunables: every var(--ai-x, <default>) read inside a component
// stylesheet whose token is not already declared in tokens.css. The fallback is
// read with paren balancing so nested var() defaults survive intact.
function buildComponentTokens(declaredInTokens) {
  const out = new Map();
  const dir = path.join(cssDir, 'components');
  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.css') || file === 'showcase.css') continue;
    const component = path.basename(file, '.css');
    const css = fs.readFileSync(path.join(dir, file), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const r of rules(css)) {
      for (const v of r.body.matchAll(/var\(\s*(--ai-[\w-]+)\s*,/g)) {
        const token = v[1];
        if (declaredInTokens.has(token) || out.has(token)) continue;
        // The property this fallback is read under: last "name:" before the var().
        const before = r.body.slice(0, v.index);
        const property = (before.match(/([-a-zA-Z]+)\s*:[^:;{}]*$/) || [])[1];
        // Fallback text, closing at the var()'s own paren.
        let depth = 1;
        let i = v.index + v[0].length;
        for (; i < r.body.length && depth > 0; i++) {
          if (r.body[i] === '(') depth++;
          else if (r.body[i] === ')') depth--;
        }
        out.set(token, {
          token,
          default: r.body.slice(v.index + v[0].length, i - 1).trim(),
          component,
          property: property || '',
        });
      }
    }
  }
  return [...out.values()].sort((a, b) => a.token.localeCompare(b.token));
}

function buildTokens() {
  const tokens = new Map();
  const skinOf = (sel) => (sel.match(/data-ai-skin="([\w-]+)"/) || [])[1];
  const dark = (sel) => /(?<!:not\()\[data-ai-theme="dark"\]/.test(sel);
  parseTokens(path.join(cssDir, 'tokens.css'), tokens, (sel) => {
    if (/^:root\s*$/.test(sel) || sel === ':root, .light' || /^:root(,|$)/.test(sel)) return dark(sel) ? 'dark' : 'light';
    if (dark(sel)) return 'dark';
    if (/data-ai-focus="([\w-]+)"/.test(sel)) return 'focus:' + sel.match(/data-ai-focus="([\w-]+)"/)[1];
    // data-ai-tone gets its own context. Without it the bare [data-ai-tone]
    // rule falls through as undeclared, and buildComponentTokens then reads
    // var(--ai-tone, ...) out of dashboard.css and files --ai-tone as a
    // per-component tunable, which it is not: it is a theming attribute.
    if (/data-ai-tone/.test(sel)) {
      const v = (sel.match(/data-ai-tone="([\w-]+)"/) || [])[1];
      return v ? 'tone:' + v : 'tone';
    }
    return null;
  });
  parseTokens(path.join(cssDir, 'themes.css'), tokens, (sel) => {
    const labels = [];
    // data-ai-accent contexts; a rule may carry both (the deprecated skin alias).
    // An accent may also carry a dark block (steel does, and only steel today),
    // so the dark form takes its own label: parseTokens keeps the first value
    // it sees per label, and the light block is always first in the file, which
    // would otherwise have swallowed the dark values silently.
    for (const m of sel.matchAll(/data-ai-accent="([\w-]+)"/g)) {
      const label = 'accent:' + m[1] + (dark(sel) ? ':dark' : '');
      if (!labels.includes(label)) labels.push(label);
    }
    const skin = skinOf(sel);
    if (skin) labels.push(dark(sel) ? `${skin}:dark` : skin);
    return labels;
  });
  return [...tokens.values()].sort((a, b) => a.token.localeCompare(b.token));
}

function buildManifests() {
  const files = cssFiles(cssDir);
  const { list, stateList } = buildClasses(files);
  const now = new Date().toISOString();
  const families = {};
  for (const c of list) families[c.family] = (families[c.family] || 0) + 1;

  fs.writeFileSync(
    path.join(publicDir, 'classes.json'),
    JSON.stringify(
      {
        version: PKG_VERSION,
        generatedAt: now,
        note: 'Every class in llmcss.css. Class names carry no namespace prefix as of 0.4.0. variants lists the prefixes that exist for the class, written as md:name: responsive (sm 640px, md 768px, lg 1024px, xl 1280px), container-query against the nearest cq or cq-inline ancestor (cq-sm 380px, cq-md 600px, cq-lg 900px), and state (hover, focus, focus-visible, active, disabled, group-hover, dark, print, motion-safe, motion-reduce, first, last). A bare cq: prefix no longer exists. Nothing outside this list exists; do not invent classes.',
        stats: { total: list.length, families },
        classes: list,
      },
      null,
      1
    ) + '\n'
  );

  const tokens = buildTokens();
  const componentTokens = buildComponentTokens(new Set(tokens.map((t) => t.token)));
  fs.writeFileSync(
    path.join(publicDir, 'tokens.json'),
    JSON.stringify(
      {
        version: PKG_VERSION,
        generatedAt: now,
        note: 'Every --ai-* custom property with its value per context: light (default), dark (data-ai-theme="dark"), <skin> and <skin>:dark (data-ai-skin), accent:<name> and accent:<name>:dark (data-ai-accent), focus:<preset> (data-ai-focus), tone and tone:<slot> (data-ai-tone). Override any of them on :root or a container. componentTokens lists the per-component tunables that are not declared anywhere by default: each is read as var(<token>, <default>) by that component, so setting it on the component, a container, or :root changes only that property.',
        stats: { total: tokens.length, componentTokens: componentTokens.length },
        tokens,
        componentTokens,
      },
      null,
      1
    ) + '\n'
  );

  const attributes = [
    { attribute: 'data-ai-theme', values: ['light', 'dark'], on: 'html or any container', appliedBy: 'author', purpose: 'Color mode. Dark is never applied from the OS setting; set it yourself.' },
    { attribute: 'data-ai-skin', values: ['obsidian', 'editorial', 'executive', 'fintech', 'enterprise', 'emerald', 'violet', 'rose'], on: 'html or any container', appliedBy: 'author', purpose: 'Archetype: surfaces, radius and type. emerald, violet and rose are deprecated aliases of data-ai-accent of the same name and will be removed in 1.0; use data-ai-accent instead.' },
    { attribute: 'data-ai-accent', values: ['emerald', 'violet', 'rose', 'teal', 'steel', 'amber'], on: 'html or any container', appliedBy: 'author', purpose: 'Accent only: sets --ai-accent, --ai-accent-hover, --ai-accent-subtle, --ai-accent-rgb and a contrast-checked --ai-accent-text. Composes with any data-ai-skin and outranks the skin accent. Absent means the blue default.' },
    { attribute: 'data-ai-density', values: ['compact', 'spacious'], on: 'html or any container', appliedBy: 'author', purpose: 'Scales the spacing steps components use for padding. Absent means standard.' },
    { attribute: 'data-ai-radius', values: ['sharp', 'precision', 'balanced', 'smooth'], on: 'html or any container', appliedBy: 'author', purpose: 'Corner geometry preset: sets --ai-radius-xs through --ai-radius-2xl and --ai-radius-base. Absent means the stock scale, which is what precision sets. --ai-radius-none and --ai-radius-full never move.' },
    { attribute: 'data-ai-focus', values: ['neutral', 'thin', 'none'], on: 'html', appliedBy: 'author', purpose: 'Focus ring preset. Absent means the accent ring.' },
    { attribute: 'data-ai-tone', values: ['1', '2', '3', '4', '5', '6', 'accent', 'success', 'warning', 'danger', 'info', 'neutral'], on: 'a dashboard data element or any ancestor of one', appliedBy: 'author', purpose: 'Series colour. Sets --ai-tone plus the three values derived from it: --ai-tone-ink (60% of the tone toward the text colour, the only one that carries text), --ai-tone-wash (12%, a fill) and --ai-tone-track (18% over surface-2, a rail). 1 to 6 are the chart slots and slot 1 is the accent, so an accent swap recolours the first series. Accepted by bar-fill, bar-track, pip, donut, split-bar, metric-tile and bar-col; ignored everywhere else, and never put on a card, panel, alert, toast, btn, kpi-trend, status-pip, badge or avatar.' },
    { attribute: 'data-ai-toggle', values: ['modal', 'drawer', 'dropdown', 'accordion', 'segmented'], on: 'button', appliedBy: 'author', purpose: 'Runtime toggle. modal and drawer need data-ai-target="#id"; dropdown needs a .dropdown ancestor; accordion needs a .accordion-item ancestor. segmented marks the clicked button inside its role=group (or its parent) with is-active and aria-pressed, and fires ai-segmented-change.' },
    { attribute: 'data-ai-target', values: ['#id'], on: 'the toggle button', appliedBy: 'author', purpose: 'Selector of the modal or drawer to open.' },
    { attribute: 'data-ai-dismiss', values: ['modal', 'drawer', 'toast'], on: 'button or backdrop inside the overlay', appliedBy: 'author', purpose: 'Closes the nearest overlay of that kind.' },
    { attribute: 'data-ai-tab', values: ['#panel-id'], on: 'button.tab inside .tabs', appliedBy: 'author', purpose: 'Activates the panel; the runtime syncs aria-selected and tabindex.' },
    { attribute: 'data-ai-toast-position', values: ['top-right', 'top-center', 'top-left', 'bottom-left', 'bottom-center'], on: '.toast-container', appliedBy: 'author', purpose: 'Where the toast stack sits. Absent means bottom-right.' },
    { attribute: 'open', values: [''], on: '.modal, .drawer, .accordion-item, .dropdown', appliedBy: 'runtime or author', purpose: 'Open state. Interchangeable with the is-open class; the runtime sets both.' },
    { attribute: 'aria-expanded', values: ['true', 'false'], on: 'toggle buttons', appliedBy: 'runtime', purpose: 'Kept in sync for every trigger that points at an overlay, dropdown, or accordion item.' },
    { attribute: 'aria-sort', values: ['ascending', 'descending'], on: 'th inside .table', appliedBy: 'author', purpose: 'Shows the sort indicator.' },
    { attribute: 'aria-selected', values: ['true'], on: 'tr inside .table, button.tab', appliedBy: 'runtime or author', purpose: 'Selected row or active tab. Interchangeable with the is-active class on tabs; the runtime sets both.' },
    { attribute: 'aria-current', values: ['page', 'step', 'true'], on: '.nav-link, .sidebar-item, .pagination-link, .breadcrumb-item', appliedBy: 'author', purpose: 'Marks the current item. Interchangeable with is-active (is-current on breadcrumbs); the selectors match the attribute\'s presence, so remove it rather than setting aria-current="false".' },
  ];
  fs.writeFileSync(
    path.join(publicDir, 'states.json'),
    JSON.stringify(
      {
        version: PKG_VERSION,
        generatedAt: now,
        note: 'State classes are set by the author for static markup or by the runtime for interactive components. usedBy lists the classes that appear in the same selector.',
        states: stateList,
        attributes,
      },
      null,
      1
    ) + '\n'
  );

  console.log(`[build-manifests] classes.json: ${list.length} classes, tokens.json: ${tokens.length} tokens, states.json: ${stateList.length} states`);
}

buildManifests();
