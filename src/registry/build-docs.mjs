/**
 * Render the generated sections of the published docs between marker pairs.
 *
 * Marker names, all of them handled by this script:
 *   laws            the eleven anti-slop laws, from src/registry/laws.mjs
 *   archetypes      the design archetypes, from src/registry/laws.mjs
 *   stats           library totals: classes, tokens, states, components, templates
 *   families        the per-family class table, from public/classes.json
 *   templates       section template and page blueprint totals only
 *   states          state class total plus the most widely used ones
 *   classes-json    sample of public/classes.json, real stats
 *   tokens-json     sample of public/tokens.json, real stats
 *   registry-json   sample of public/registry.json, real stats
 *   templates-json  sample of public/templates.json, real stats
 *
 * Marker syntax:
 *   markdown   <!-- name:start --> ... <!-- name:end -->
 *   plain text [name:start] ... [name:end]
 *
 * Every number in those blocks comes from the manifests in public/, which
 * build-registry.mjs and build-manifests.mjs write earlier in `npm run build`.
 * Nothing here is hand-typed, so a CSS or registry change cannot leave a
 * stale count in a doc.
 *
 * The script is idempotent: running it twice produces a byte-identical tree.
 * A missing marker pair is a hard error, so a doc cannot silently drift.
 *
 * Usage: node src/registry/build-docs.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { laws, archetypes } from './laws.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

/* ----------------------------------------------------------------- manifests */

/** Read a generated manifest. Missing or malformed is a hard error: the
 *  manifest builders run before this script in the build script, so an absent
 *  file means the pipeline broke and the docs must not be written from guesses. */
function readManifest(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    throw new Error(
      `[build-docs] missing manifest: ${rel}. Run build-registry.mjs and build-manifests.mjs first.`
    );
  }
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(abs, 'utf8'));
  } catch (err) {
    throw new Error(`[build-docs] ${rel} is not valid JSON: ${err.message}`);
  }
  return parsed;
}

function require$(value, rel, what) {
  if (value === undefined || value === null) {
    throw new Error(`[build-docs] ${rel}: expected ${what}`);
  }
  return value;
}

const classesManifest = readManifest('public/classes.json');
const tokensManifest = readManifest('public/tokens.json');
const statesManifest = readManifest('public/states.json');
const registryManifest = readManifest('public/registry.json');
const templatesManifest = readManifest('public/templates.json');

const classList = require$(classesManifest.classes, 'public/classes.json', 'a classes array');
const familyCounts = require$(
  classesManifest.stats && classesManifest.stats.families,
  'public/classes.json',
  'stats.families'
);
const tokenList = require$(tokensManifest.tokens, 'public/tokens.json', 'a tokens array');
const stateList = require$(statesManifest.states, 'public/states.json', 'a states array');
const componentList = require$(
  registryManifest.components,
  'public/registry.json',
  'a components array'
);
const sectionList = require$(
  templatesManifest.wireframeTemplates,
  'public/templates.json',
  'a wireframeTemplates array'
);
const blueprintList = require$(
  templatesManifest.pageBlueprints,
  'public/templates.json',
  'a pageBlueprints array'
);

/* --------------------------------------------------------------- derived data */

const classTotal = classList.length;

/** family -> the stylesheet that defines it, taken from the class entries. */
const familyFile = new Map();
for (const entry of classList) {
  if (entry.file && !familyFile.has(entry.family)) familyFile.set(entry.family, entry.file);
}

/** All families, largest first, ties broken by name so the order is stable. */
const familyRows = Object.entries(familyCounts)
  .map(([family, count]) => ({ family, count, file: familyFile.get(family) || '' }))
  .sort((a, b) => b.count - a.count || a.family.localeCompare(b.family));

const tokenTotal = tokenList.length;
const stateTotal = stateList.length;

const componentTotal = componentList.length;
const componentPro = componentList.filter((c) => c.tier === 'pro').length;
const componentFree = componentTotal - componentPro;
const categoryRows = (() => {
  const counts = new Map();
  for (const c of componentList) counts.set(c.category, (counts.get(c.category) || 0) + 1);
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
})();
const categorySplit = categoryRows.map((r) => `${r.count} ${r.category}`).join(', ');

const sectionTotal = sectionList.length;
const sectionPro = sectionList.filter((t) => t.tier === 'pro').length;
const sectionFree = sectionTotal - sectionPro;
const blueprintTotal = blueprintList.length;
const blueprintPro = blueprintList.filter((b) => b.tier === 'pro').length;
const blueprintFree = blueprintTotal - blueprintPro;

/** The states that the most classes opt into, largest first. */
const topStates = [...stateList]
  .sort((a, b) => b.usedBy.length - a.usedBy.length || a.class.localeCompare(b.class))
  .slice(0, 3);

/* ---------------------------------------------------------------- renderers */

const lawRenderers = {
  // DESIGN_HARNESS.md: one sub-heading per law.
  headings: () =>
    laws
      .map((l) => `### Law ${l.n}: ${l.title}\n${l.rule}\n- Instead: ${l.instead}`)
      .join('\n\n'),

  // AGENTS.md and docs/AGENT_RULES.md: numbered list, rule plus remedy.
  list: () => laws.map((l) => `${l.n}. **${l.title}.** ${l.rule} Instead: ${l.instead}`).join('\n'),

  // README.md: compact, one line per law, no remedy.
  compact: () => laws.map((l) => `${l.n}. **${l.title}**: ${l.rule}`).join('\n'),

  // llms.txt and llms-full.txt: plain text, no markdown list semantics needed.
  text: () => laws.map((l) => `${l.n}. ${l.title}: ${l.rule} Instead: ${l.instead}`).join('\n'),
};

const archetypeRenderers = {
  // DESIGN_HARNESS.md: sub-heading, vibe, attributes, token block.
  headings: () =>
    archetypes
      .map(
        (a) =>
          `### Archetype ${a.letter}: ${a.name}\n` +
          `- **Vibe:** ${a.vibe}\n` +
          `- **Attributes:** ${a.attributes}\n` +
          `- **Attribute selector:** \`[data-ai-skin="${a.id}"]\`\n` +
          `- **CSS root variables:**\n\`\`\`css\n${a.css}\n\`\`\``
      )
      .join('\n\n'),

  // llms-full.txt: same declarations, one line per rule, to stay inside the
  // file's line budget without dropping a single token.
  text: () =>
    archetypes
      .map(
        (a) =>
          `Archetype ${a.letter}: ${a.name}, data-ai-skin="${a.id}"\n` +
          `Vibe: ${a.vibe}\n` +
          `Attributes: ${a.attributes}\n` +
          `\`\`\`css\n${collapseRules(a.css)}\n\`\`\``
      )
      .join('\n\n'),
};

const statsRenderers = {
  // AGENTS.md, docs/AGENT_RULES.md, README.md, DESIGN_HARNESS.md.
  md: () =>
    [
      `- **Classes:** ${classTotal} \`ai-*\` classes across ${familyRows.length} families, listed in [classes.json](https://llmcss.io/classes.json).`,
      `- **Tokens:** ${tokenTotal} \`--ai-*\` custom properties, listed in [tokens.json](https://llmcss.io/tokens.json).`,
      `- **States:** ${stateTotal} \`is-*\` classes, listed in [states.json](https://llmcss.io/states.json).`,
      `- **Components:** ${componentTotal} (${componentFree} free, ${componentPro} themed Pro): ${categorySplit}.`,
      `- **Section templates:** ${sectionTotal} (${sectionFree} free wireframe, ${sectionPro} themed Pro).`,
      `- **Page blueprints:** ${blueprintTotal} (${blueprintFree} free, ${blueprintPro} Pro).`,
    ].join('\n'),

  // public/llms.txt and public/llms-full.txt.
  text: () =>
    [
      `Classes: ${classTotal} ai-* classes across ${familyRows.length} families, https://llmcss.io/classes.json.`,
      `Tokens: ${tokenTotal} --ai-* custom properties, https://llmcss.io/tokens.json.`,
      `States: ${stateTotal} is-* classes, https://llmcss.io/states.json.`,
      `Components: ${componentTotal} (${componentFree} free, ${componentPro} themed Pro): ${categorySplit}.`,
      `Section templates: ${sectionTotal} (${sectionFree} free wireframe, ${sectionPro} themed Pro).`,
      `Page blueprints: ${blueprintTotal} (${blueprintFree} free, ${blueprintPro} Pro).`,
    ].join('\n'),
};

const familyRenderers = {
  // docs/AGENT_RULES.md: one row per family, largest first.
  table: () =>
    [
      '| Family | Classes | Defined in |',
      '|---|---:|---|',
      ...familyRows.map((r) => `| \`${r.family}\` | ${r.count} | \`${r.file}\` |`),
    ].join('\n'),

  // llms-full.txt: one line, largest first, to stay inside the line budget.
  text: () =>
    `Family sizes, largest first: ${familyRows.map((r) => `${r.family} ${r.count}`).join(', ')}.`,
};

const templateRenderers = {
  // QUICKSTART.md: template totals only, the rest of the library is not the topic.
  md: () =>
    [
      `- ${sectionTotal} section templates: ${sectionFree} free wireframe, ${sectionPro} themed Pro.`,
      `- ${blueprintTotal} page blueprints: ${blueprintFree} free, ${blueprintPro} Pro.`,
    ].join('\n'),
};

const stateRenderers = {
  // llms-full.txt: the total plus the states the most classes opt into.
  text: () =>
    `${stateTotal} \`is-*\` state classes exist across the library; the full list, with the classes each one applies to, is in states.json. ` +
    `The three most widely used: ${topStates
      .map(
        (s) =>
          `\`.${s.class}\` (${s.usedBy.length} classes, including ${s.usedBy
            .slice(0, 3)
            .join(', ')})`
      )
      .join(', ')}.`,
};

/* ------------------------------------------------- generated manifest samples */

/** JSON on one line, with the spacing the surrounding samples use. */
const inline = (value) => JSON.stringify(value, null, 1).replace(/\n\s*/g, ' ');

/** Shorten a long string field so a sample stays one readable line. */
const clip = (text, n) => (text.length > n ? `${text.slice(0, n)}...` : text);

const sampleRenderers = {
  'classes-json': () => {
    const top = familyRows.slice(0, 4);
    const sample = classList.find((c) => c.class === 'ai-gap-4') || classList[0];
    return [
      '```json',
      `{ "version": ${JSON.stringify(classesManifest.version)}, "generatedAt": ${JSON.stringify(classesManifest.generatedAt)},`,
      `  "note": ${JSON.stringify(classesManifest.note)},`,
      `  "stats": { "total": ${classTotal}, "families": { ${top
        .map((f) => `${JSON.stringify(f.family)}: ${f.count}`)
        .join(', ')} } },`,
      `  "classes": [ ${inline(sample)} ] }`,
      '```',
    ].join('\n');
  },

  'tokens-json': () => {
    const sample = tokenList.find((t) => t.token === '--ai-accent') || tokenList[0];
    const keys = Object.keys(sample.values).slice(0, 6);
    const values = Object.fromEntries(keys.map((k) => [k, sample.values[k]]));
    return [
      '```json',
      `{ "stats": { "total": ${tokenTotal}, "componentTokens": ${(tokensManifest.componentTokens || []).length} },`,
      `  "tokens": [ { "token": ${JSON.stringify(sample.token)},`,
      `    "values": ${inline(values)} } ] }`,
      '```',
    ].join('\n');
  },

  'registry-json': () => {
    const sample = componentList.find((c) => c.tier !== 'pro') || componentList[0];
    const trimmed = {
      id: sample.id,
      name: sample.name,
      description: clip(sample.description, 40),
      category: sample.category,
      tier: sample.tier,
      tags: sample.tags.slice(0, 2),
      html: `${clip(sample.html, 24)}`,
    };
    return [
      '```json',
      `{ "stats": { "total": ${componentTotal}, "free": ${componentFree}, "pro": ${componentPro},`,
      `    "categories": ${inline(Object.fromEntries(categoryRows.map((r) => [r.category, r.count])))} },`,
      `  "components": [ ${inline(trimmed)} ] }`,
      '```',
    ].join('\n');
  },

  'templates-json': () => {
    const section = sectionList.find((t) => t.tier !== 'pro') || sectionList[0];
    const blueprint = blueprintList.find((b) => b.tier !== 'pro') || blueprintList[0];
    const sectionCounts = {};
    for (const t of sectionList) sectionCounts[t.section] = (sectionCounts[t.section] || 0) + 1;
    const trimmedSection = {
      id: section.id,
      name: section.name,
      section: section.section,
      tier: section.tier,
      tags: section.tags.slice(0, 1),
      placement: section.placement,
      guidance: { placement: '...', bestUsedFor: '...', avoidWhen: '...', pairsWith: ['...'] },
      html: `${clip(section.html, 24)}`,
    };
    const trimmedBlueprint = {
      id: blueprint.id,
      name: blueprint.name,
      description: '...',
      recommendedFor: '...',
      sections: blueprint.sections.slice(0, 2),
    };
    return [
      '```json',
      `{ "stats": { "totalTemplates": ${sectionTotal}, "freeTemplates": ${sectionFree}, "proTemplates": ${sectionPro}, "totalBlueprints": ${blueprintTotal},`,
      `    "sections": ${inline(sectionCounts)} },`,
      `  "wireframeTemplates": [ ${inline(trimmedSection)} ],`,
      `  "pageBlueprints": [ ${inline(trimmedBlueprint)} ] }`,
      '```',
    ].join('\n');
  },
};

/** Collapse a multi-line CSS rule set to one line per rule. */
function collapseRules(css) {
  return css
    .split('}')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const brace = chunk.indexOf('{');
      const head = chunk.slice(0, brace).trim();
      const decls = chunk
        .slice(brace + 1)
        .split(';')
        .map((d) => d.trim())
        .filter(Boolean)
        .join('; ');
      return `${head} { ${decls}; }`;
    })
    .join('\n');
}

/* --------------------------------------------------------- renderer registry */

const renderers = {
  laws: lawRenderers,
  archetypes: archetypeRenderers,
  stats: statsRenderers,
  families: familyRenderers,
  templates: templateRenderers,
  states: stateRenderers,
  'classes-json': { text: sampleRenderers['classes-json'] },
  'tokens-json': { text: sampleRenderers['tokens-json'] },
  'registry-json': { text: sampleRenderers['registry-json'] },
  'templates-json': { text: sampleRenderers['templates-json'] },
};

/* ------------------------------------------------------------------- targets */

const targets = [
  { file: 'AGENTS.md', syntax: 'md', blocks: { stats: 'md', laws: 'list' } },
  {
    file: 'docs/AGENT_RULES.md',
    syntax: 'md',
    blocks: { stats: 'md', families: 'table', laws: 'list' },
  },
  {
    file: 'DESIGN_HARNESS.md',
    syntax: 'md',
    blocks: { stats: 'md', laws: 'headings', archetypes: 'headings' },
  },
  { file: 'README.md', syntax: 'md', blocks: { stats: 'md', laws: 'compact' } },
  { file: 'QUICKSTART.md', syntax: 'md', blocks: { templates: 'md' } },
  { file: 'public/llms.txt', syntax: 'txt', blocks: { stats: 'text', laws: 'text' } },
  {
    file: 'public/llms-full.txt',
    syntax: 'txt',
    blocks: {
      stats: 'text',
      'classes-json': 'text',
      'tokens-json': 'text',
      'registry-json': 'text',
      'templates-json': 'text',
      states: 'text',
      families: 'text',
      laws: 'text',
      archetypes: 'text',
    },
  },
];

const marker = (syntax, name, side) =>
  syntax === 'md' ? `<!-- ${name}:${side} -->` : `[${name}:${side}]`;

function replaceBlock(source, file, syntax, name, body) {
  const start = marker(syntax, name, 'start');
  const end = marker(syntax, name, 'end');
  const si = source.indexOf(start);
  const ei = source.indexOf(end);
  if (si < 0 || ei < 0) {
    throw new Error(`[build-docs] ${file}: missing marker pair ${start} ... ${end}`);
  }
  if (ei < si) {
    throw new Error(`[build-docs] ${file}: ${end} appears before ${start}`);
  }
  if (source.indexOf(start, si + 1) >= 0 || source.indexOf(end, ei + 1) >= 0) {
    throw new Error(`[build-docs] ${file}: marker ${name} appears more than once`);
  }
  return source.slice(0, si + start.length) + '\n' + body + '\n' + source.slice(ei);
}

function build() {
  let changed = 0;
  for (const t of targets) {
    const abs = path.join(root, t.file);
    if (!fs.existsSync(abs)) throw new Error(`[build-docs] missing file: ${t.file}`);
    const before = fs.readFileSync(abs, 'utf8');
    let after = before;
    for (const [name, variant] of Object.entries(t.blocks)) {
      const render = renderers[name] && renderers[name][variant];
      if (!render) throw new Error(`[build-docs] ${t.file}: no renderer ${name}.${variant}`);
      after = replaceBlock(after, t.file, t.syntax, name, render());
    }
    if (after !== before) {
      fs.writeFileSync(abs, after);
      changed++;
    }
    console.log(`[build-docs] ${t.file}: ${after === before ? 'up to date' : 'updated'}`);
  }
  console.log(
    `[build-docs] ${laws.length} laws, ${archetypes.length} archetypes, ` +
      `${classTotal} classes, ${tokenTotal} tokens, ${stateTotal} states, ` +
      `${componentTotal} components, ${sectionTotal} sections, ${blueprintTotal} blueprints, ` +
      `${changed} file(s) rewritten`
  );
}

build();
