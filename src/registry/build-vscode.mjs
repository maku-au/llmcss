/**
 * Editor intellisense artifacts, generated from the manifests so they cannot
 * drift from the stylesheet:
 *   public/css-custom-data.json   VS Code CSS custom data (version 1.1)
 *   public/llmcss.code-snippets   VS Code snippets: one per component, one per class family
 *   public/html-custom-data.json  VS Code HTML custom data (version 1.1)
 *
 * Run `node src/registry/build-vscode.mjs` after build-manifests.mjs and
 * build-registry.mjs, or via `npm run build:vscode`.
 *
 * Note on custom properties: the CSS custom data format has sections for
 * properties, atDirectives, pseudoClasses and pseudoElements. There is no
 * native section for custom properties, so every --ai-* token is emitted as a
 * `properties` entry. VS Code then offers it wherever a property name is
 * expected, which is what an author wants inside a :root block. The token
 * values per theme, skin and focus preset go in the description so hovering a
 * token shows what it resolves to.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../../public');

const MAX_CHOICES = 60;

// Custom element tag names keep the ai- prefix; only class names lost it.
const CUSTOM_ELEMENTS = [
  ['ai-modal', 'Dialog overlay. Open it with a button carrying data-ai-toggle="modal" data-ai-target="#id", or with window.LLMCSS.open(). Add the open attribute for the initial state.'],
  ['ai-tabs', 'Tab set. Each button.tab inside carries data-ai-tab="#panel-id"; the runtime syncs aria-selected and tabindex.'],
  ['ai-dropdown', 'Menu anchored to a trigger. The trigger carries data-ai-toggle="dropdown". Closes on outside click and on Escape.'],
  ['ai-accordion', 'Disclosure group. Each item is an .accordion-item whose trigger carries data-ai-toggle="accordion".'],
  ['ai-drawer', 'Edge panel. Open it with data-ai-toggle="drawer" data-ai-target="#id". Locks page scroll unless .drawer-no-lock is present.'],
  ['ai-toast', 'Transient notification. A child with data-ai-dismiss="toast" removes it.'],
  ['ai-command-palette', 'Filterable command list. Typing in the inner input filters the items.'],
];

const GLOBAL_ATTRIBUTES = [
  'data-ai-toggle',
  'data-ai-target',
  'data-ai-dismiss',
  'data-ai-tab',
  'data-ai-theme',
  'data-ai-skin',
  'data-ai-focus',
  'data-ai-density',
  'data-ai-toast-position',
];

function readJson(file, { required = true } = {}) {
  const p = path.join(publicDir, file);
  if (!fs.existsSync(p)) {
    if (!required) return null;
    console.error(`[build-vscode] ${p} is missing. Run \`npm run build:manifests\` first, then retry.`);
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (err) {
    console.error(`[build-vscode] ${p} is not valid JSON: ${err.message}`);
    process.exit(1);
  }
}

/** Escape the characters the TextMate snippet syntax treats as special. */
function snippetEscape(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/\$/g, '\\$').replace(/\}/g, '\\}');
}

/** A snippet body is an array of lines with no trailing newline. */
function bodyLines(html) {
  return snippetEscape(html.replace(/\r\n/g, '\n').replace(/\s+$/, '')).split('\n');
}

function buildCssCustomData(tokens) {
  const properties = tokens.map((t) => {
    const values = t.values || {};
    const light = values.light !== undefined ? values.light : Object.values(values)[0];
    const lines = Object.entries(values).map(([ctx, v]) => `- \`${ctx}\`: \`${v}\``);
    return {
      name: t.token,
      description: {
        kind: 'markdown',
        value: [
          `LLMCSS design token. Override it on \`:root\` or on any container.`,
          '',
          ...lines,
        ].join('\n'),
      },
      values: light !== undefined ? [{ name: String(light) }] : undefined,
      references: [{ name: 'tokens.json', url: 'https://llmcss.io/tokens.json' }],
    };
  });
  return {
    version: 1.1,
    properties,
    atDirectives: [
      {
        name: '@layer',
        description: {
          kind: 'markdown',
          value: 'LLMCSS declares `@layer reset, tokens, base, components, utilities;` once at the top of the stylesheet. Put your own overrides in a later layer, or outside every layer, so they win without `!important`.',
        },
      },
    ],
    pseudoClasses: [],
    pseudoElements: [],
  };
}

function buildHtmlCustomData(states) {
  const byName = new Map();
  for (const a of states.attributes || []) byName.set(a.attribute, a);

  const globalAttributes = [];
  for (const name of GLOBAL_ATTRIBUTES) {
    const spec = byName.get(name);
    if (!spec) {
      console.warn(`[build-vscode] states.json has no attribute "${name}"; skipping it.`);
      continue;
    }
    const values = (spec.values || []).filter((v) => v !== '' && !v.startsWith('#'));
    globalAttributes.push({
      name,
      description: {
        kind: 'markdown',
        value: `${spec.purpose}\n\nGoes on: ${spec.on}. Set by: ${spec.appliedBy}.`,
      },
      values: values.length ? values.map((v) => ({ name: v })) : undefined,
      references: [{ name: 'states.json', url: 'https://llmcss.io/states.json' }],
    });
  }

  const tags = CUSTOM_ELEMENTS.map(([name, description]) => ({
    name,
    description: { kind: 'markdown', value: description },
    attributes: [
      {
        name: 'open',
        description: { kind: 'markdown', value: 'Open state. Interchangeable with the is-open class; the runtime sets both.' },
        valueSet: 'v',
      },
    ],
    references: [{ name: 'LLMCSS components', url: 'https://llmcss.io/components' }],
  }));

  return { version: 1.1, tags, globalAttributes, valueSets: [] };
}

function buildSnippets(classes, components) {
  const snippets = {};

  // One snippet per component id. The snippet trigger keeps the ai- prefix on
  // purpose: it namespaces the completion list, and typing a bare class name
  // like `card` must not expand a whole component.
  for (const comp of components) {
    if (!comp.html || comp.tier === 'pro') continue; // Themed Pro markup is not in this repo
    const key = `LLMCSS ${comp.name}`;
    snippets[key] = {
      prefix: `ai-${comp.id}`,
      scope: 'html,javascriptreact,typescriptreact,vue,svelte,php,erb,twig,django-html,handlebars,astro',
      body: bodyLines(comp.html),
      description: `${comp.description || comp.name} (${comp.category}, ${comp.tier})`,
    };
  }

  // One snippet per class family, with the family's classes as a choice.
  const families = new Map();
  for (const entry of classes) {
    if (!families.has(entry.family)) families.set(entry.family, []);
    families.get(entry.family).push(entry.class);
  }
  for (const [family, listRaw] of [...families.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const list = [...new Set(listRaw)].sort();
    const chunks = [];
    for (let i = 0; i < list.length; i += MAX_CHOICES) chunks.push(list.slice(i, i + MAX_CHOICES));
    chunks.forEach((chunk, idx) => {
      const suffix = chunks.length > 1 ? `-${idx + 1}` : '';
      const key = `LLMCSS ${family} classes${suffix}`;
      // A choice placeholder must not contain a bare comma or pipe, and class
      // names never do, so the list can go in verbatim.
      const choice = `\${1|${chunk.join(',')}|}`;
      snippets[key] = {
        prefix: `ai-family-${family}${suffix}`,
        scope: 'html,javascriptreact,typescriptreact,vue,svelte,php,erb,twig,django-html,handlebars,astro',
        body: [choice],
        description:
          chunks.length > 1
            ? `${family} utilities, part ${idx + 1} of ${chunks.length} (${chunk.length} of ${list.length} classes)`
            : `${family} classes (${chunk.length})`,
      };
    });
  }

  return snippets;
}

function main() {
  const classesManifest = readJson('classes.json');
  const tokensManifest = readJson('tokens.json');
  const statesManifest = readJson('states.json', { required: false });
  const registry = readJson('registry.json', { required: false });

  if (!Array.isArray(classesManifest.classes)) {
    console.error('[build-vscode] public/classes.json has no `classes` array. Run `npm run build:manifests` first.');
    process.exit(1);
  }

  const tokens = Array.isArray(tokensManifest?.tokens) ? tokensManifest.tokens : [];
  const components = Array.isArray(registry?.components) ? registry.components : [];
  if (!registry) {
    console.warn('[build-vscode] public/registry.json is missing; component snippets are skipped. Run `npm run build:registry` for the full set.');
  }

  const cssData = buildCssCustomData(tokens);
  const snippets = buildSnippets(classesManifest.classes, components);
  const htmlData = statesManifest
    ? buildHtmlCustomData(statesManifest)
    : (console.warn('[build-vscode] public/states.json is missing; html-custom-data.json gets tags but no attributes.'),
      { version: 1.1, tags: CUSTOM_ELEMENTS.map(([name, description]) => ({ name, description: { kind: 'markdown', value: description } })), globalAttributes: [], valueSets: [] });

  const write = (file, data) => {
    fs.writeFileSync(path.join(publicDir, file), JSON.stringify(data, null, 1) + '\n');
  };
  write('css-custom-data.json', cssData);
  write('html-custom-data.json', htmlData);
  write('llmcss.code-snippets', snippets);

  const familyCount = new Set(classesManifest.classes.map((c) => c.family)).size;
  console.log(
    `[build-vscode] css-custom-data.json: ${cssData.properties.length} tokens, ` +
      `html-custom-data.json: ${htmlData.tags.length} tags / ${htmlData.globalAttributes.length} attributes, ` +
      `llmcss.code-snippets: ${Object.keys(snippets).length} snippets (${components.filter((c) => c.html).length} components, ${familyCount} families)`
  );
}

main();
