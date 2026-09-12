/**
 * Render the anti-slop laws and the design archetypes from src/registry/laws.mjs
 * into every file that publishes them, between marker pairs.
 *
 * Markers:
 *   markdown   <!-- laws:start --> ... <!-- laws:end -->
 *              <!-- archetypes:start --> ... <!-- archetypes:end -->
 *   plain text [laws:start] ... [laws:end]
 *              [archetypes:start] ... [archetypes:end]
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

/* ------------------------------------------------------------------- targets */

const targets = [
  { file: 'AGENTS.md', syntax: 'md', laws: 'list' },
  { file: 'docs/AGENT_RULES.md', syntax: 'md', laws: 'list' },
  { file: 'DESIGN_HARNESS.md', syntax: 'md', laws: 'headings', archetypes: 'headings' },
  { file: 'README.md', syntax: 'md', laws: 'compact' },
  { file: 'public/llms.txt', syntax: 'txt', laws: 'text' },
  { file: 'public/llms-full.txt', syntax: 'txt', laws: 'text', archetypes: 'text' },
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
    let after = replaceBlock(before, t.file, t.syntax, 'laws', lawRenderers[t.laws]());
    if (t.archetypes) {
      after = replaceBlock(after, t.file, t.syntax, 'archetypes', archetypeRenderers[t.archetypes]());
    }
    if (after !== before) {
      fs.writeFileSync(abs, after);
      changed++;
    }
    console.log(`[build-docs] ${t.file}: ${after === before ? 'up to date' : 'updated'}`);
  }
  console.log(`[build-docs] ${laws.length} laws, ${archetypes.length} archetypes, ${changed} file(s) rewritten`);
}

build();
