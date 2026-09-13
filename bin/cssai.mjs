#!/usr/bin/env node

/**
 * LLMCSS Command Line Interface (CLI)
 * For Developers & Agentic Coding Assistants
 *
 * Usage:
 *   npx llmcss list
 *   npx llmcss search <query>
 *   npx llmcss add <component-id>
 *   npx llmcss add <component-id>:<variant>
 *   npx llmcss variants <component-id>
 *   npx llmcss login
 *   npx llmcss init
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { components } from '../src/registry/data.mjs';
import { wireframeTemplates, pageBlueprints, assembleBlueprintHtml } from '../src/registry/templates-data.mjs';
import { validateMarkup, structuralAudit, classTokens, legacyFix } from '../src/registry/validate.mjs';
import { resolveRef, refHtml, refId, refSlug } from '../src/registry/resolve.mjs';
import { selectorClasses } from '../src/registry/css-names.mjs';
import { laws } from '../src/registry/laws.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(os.homedir(), '.llmcss', 'config.json');
const LEGACY_CONFIG_PATH = path.join(os.homedir(), '.cssai', 'config.json');

function getStoredToken() {
  if (process.env.LLMCSS_TOKEN || process.env.CSSAI_API_KEY) {
    return process.env.LLMCSS_TOKEN || process.env.CSSAI_API_KEY;
  }
  for (const p of [CONFIG_PATH, LEGACY_CONFIG_PATH]) {
    if (!fs.existsSync(p)) continue;
    try {
      const config = JSON.parse(fs.readFileSync(p, 'utf-8'));
      if (config.token) return config.token;
    } catch {
      /* ignore */
    }
  }
  return null;
}

function saveToken(token) {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ token }, null, 2), 'utf-8');
}

function originBase() {
  return (process.env.LLMCSS_ORIGIN || 'https://llmcss.io').replace(/\/$/, '');
}

function requireProToken() {
  const token = getStoredToken();
  if (!token) {
    console.log('\n\x1b[33mThis is an LLMCSS Pro item.\x1b[0m');
    console.log('Themed templates and page kits are not in the public repo. Subscribe, then login.\n');
    console.log('1. Get a license at: \x1b[36mhttps://llmcss.io/#pricing\x1b[0m');
    console.log('2. Run: \x1b[32mnpx llmcss login <token>\x1b[0m\n');
    process.exit(1);
  }
  return token;
}

function fetchProJson(id) {
  const token = requireProToken();
  const { code, json } = httpJson(`${originBase()}/r/pro/${id}.json`, {
    Authorization: `Bearer ${token}`,
  });
  if (code !== 200 || !json || !json.html) {
    console.error('Pro registry rejected this token (HTTP ' + code + ').');
    process.exit(1);
  }
  return json;
}

function httpJson(url, headers = {}) {
  const args = ['-sS', '-L', '--max-time', '20', '-w', '\n%{http_code}', '-H', 'Accept: application/json'];
  for (const [k, v] of Object.entries(headers)) args.push('-H', `${k}: ${v}`);
  args.push(url);
  const out = execFileSync('curl', args, { encoding: 'utf8' });
  const nl = out.lastIndexOf('\n');
  const body = nl === -1 ? out : out.slice(0, nl);
  const code = nl === -1 ? 0 : parseInt(out.slice(nl + 1), 10);
  let json = null;
  try { json = JSON.parse(body); } catch { /* ignore */ }
  return { code, json, body };
}

const ALIAS_MAP = {
  'navbar': ['navbar-modern'],
  'header': ['navbar-modern'],
  'nav': ['navbar-modern'],
  'topbar': ['navbar-modern'],
  'sheet': ['cart-drawer-pro', 'navbar-modern'],
  'offcanvas': ['cart-drawer-pro', 'navbar-modern'],
  'drawer': ['cart-drawer-pro'],
  'dropdown': ['dropdown-menu'],
  'menu': ['dropdown-menu'],
  'toggle': ['switch-toggle', 'segmented-toggle'],
  'switch': ['switch-toggle'],
  'accordion': ['accordion-faq'],
  'faq': ['accordion-faq'],
  'collapse': ['accordion-faq'],
  'popover': ['popover-anchor'],
  'tooltip': ['popover-anchor'],
  'modal': ['modal-dialog'],
  'dialog': ['modal-dialog'],
  'popup': ['modal-dialog'],
  'toast': ['toast-stack'],
  'snackbar': ['toast-stack'],
  'alert': ['alert-callouts'],
  'callout': ['alert-callouts'],
  'kpi': ['kpi-metric-cards', 'spark-stat', 'donut-stat'],
  'stat': ['kpi-metric-cards', 'spark-stat'],
  'stats': ['kpi-metric-cards', 'spark-stat', 'stats-dashboard'],
  'metric': ['kpi-metric-cards', 'spark-stat'],
  'dashboard': ['page-header', 'app-topbar', 'spark-stat', 'health-grid'],
  'kanban': ['kanban-column'],
  'quota': ['quota-meter'],
  'inbox': ['inbox-list'],
  'log': ['log-console', 'timeline-log'],
  'command': ['command-palette-pro'],
  'cmdk': ['command-palette-pro'],
  'palette': ['command-palette-pro'],
  'tabs': ['tabs-system', 'segmented-toggle'],
  'segmented': ['segmented-toggle'],
  'table': ['table-data', 'pricing-matrix-pro'],
  'grid-list': ['table-data'],
  'badge': ['badge-status'],
  'chip': ['badge-status'],
  'tag': ['badge-status'],
  'avatar': ['avatar-group'],
  'stepper': ['stepper-flow'],
  'wizard': ['stepper-flow'],
  'skeleton': ['skeleton-card'],
  'shimmer': ['skeleton-card'],
  'spinner': ['animated-loaders', 'progress-bars'],
  'loader': ['animated-loaders', 'progress-bars'],
  'slider': ['interactive-slider'],
  'range': ['interactive-slider'],
  'bento': ['bento-editorial-pro', 'hero-bento-pro'],
  'marquee': ['marquee-ticker'],
  'chat': ['chat-thread'],
  'prompt': ['chat-thread'],
};

const args = process.argv.slice(2);
const command = args[0] || 'help';

switch (command) {
  case 'list': {
    console.log('\n✦ LLMCSS Component Catalog\n');
    const categories = ['primitive', 'marketing', 'application', 'ecommerce'];
    for (const cat of categories) {
      console.log(`\x1b[1m=== ${cat.toUpperCase()} ===\x1b[0m`);
      const catComps = components.filter((c) => c.category === cat);
      for (const comp of catComps) {
        const tierBadge = comp.tier === 'pro' ? '\x1b[33m[PRO]\x1b[0m' : '\x1b[32m[FREE]\x1b[0m';
        console.log(`  ${tierBadge} \x1b[36m${comp.id.padEnd(22)}\x1b[0m ${comp.name} - ${comp.description}`);
        // One indented line per component that ships more than one layout, so
        // the command stays a single screen per category.
        if (comp.variants && comp.variants.length > 0) {
          console.log(`         \x1b[2mvariants: ${comp.variants.map((v) => v.id).join(', ')}\x1b[0m`);
        }
      }
      console.log('');
    }
    console.log('Run `npx llmcss add <id>` to install a component.');
    console.log('Ask for a layout alternative with `npx llmcss add <id>:<variant>`.\n');
    break;
  }

  case 'search': {
    const query = args[1]?.toLowerCase();
    if (!query) {
      console.error('Please specify a search query: `llmcss search <query>`');
      process.exit(1);
    }
    const aliasTargets = ALIAS_MAP[query] || [];
    // A query can name a layout rather than a component: "topbar" has to find
    // the app shell whose topbar variant it is.
    const variantHits = (c) =>
      (c.variants || []).filter(
        (v) =>
          v.id.includes(query) ||
          v.name.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query)
      );
    const hit = (c) =>
      aliasTargets.includes(c.id) ||
      c.id.includes(query) ||
      c.name.toLowerCase().includes(query) ||
      (c.tags || []).some((t) => t.toLowerCase().includes(query)) ||
      (typeof c.description === 'string' ? c.description : JSON.stringify(c.guidance || '')).toLowerCase().includes(query) ||
      (c.section || '').includes(query.replace(/\s+/g, '-')) ||
      variantHits(c).length > 0;
    const matches = components.filter(hit);
    const tplMatches = wireframeTemplates.filter(hit);
    console.log(`\nFound ${matches.length + tplMatches.length} matches for "${query}":\n`);
    for (const comp of matches) {
      const tierBadge = comp.tier === 'pro' ? '\x1b[33m[PRO]\x1b[0m' : '\x1b[32m[FREE]\x1b[0m';
      console.log(`  ${tierBadge} \x1b[36m${comp.id.padEnd(22)}\x1b[0m ${comp.name}`);
      const vh = variantHits(comp);
      for (const v of vh) {
        console.log(`         \x1b[36m${`${comp.id}:${v.id}`.padEnd(30)}\x1b[0m \x1b[2m${v.name}\x1b[0m`);
      }
    }
    for (const t of tplMatches) {
      console.log(`  \x1b[35m[TPL]\x1b[0m  \x1b[36m${t.id.padEnd(22)}\x1b[0m ${t.name}  (npx llmcss template get ${t.id})`);
    }
    console.log('');
    break;
  }

  case 'add': {
    const positional = args.slice(1).filter((a) => !a.startsWith('-'));
    const flagIdx = args.indexOf('--variant');
    // `add hero-split --variant centered` and `add hero-split:centered` are the
    // same request, so neither spelling is a trap.
    const flagVariant = flagIdx > -1 ? args[flagIdx + 1] : '';
    let compId = positional[0];
    if (flagVariant && compId) compId = `${compId}:${flagVariant}`;
    if (!compId) {
      console.error('Please specify a component id: `llmcss add <component-id>` or `llmcss add <component-id>:<variant>`');
      process.exit(1);
    }
    const hit = resolveRef(components, compId);
    if (!hit) {
      // Naming a real component and an unknown variant is the one moment the
      // caller is definitely confused, so it is the one place to spend words.
      const cut = compId.lastIndexOf(':');
      const parent = cut > 0 ? components.find((c) => c.id === compId.slice(0, cut)) : null;
      if (parent) {
        const list = (parent.variants || []).map((v) => v.id);
        console.error(`Component "${parent.id}" has no variant "${compId.slice(cut + 1)}".`);
        console.error(list.length ? `Variants: ${list.join(', ')}.` : 'It has one layout, so drop the colon.');
        if (list.length) console.error(`Run \`npx llmcss variants ${parent.id}\` for what each one does.`);
        process.exit(1);
      }
      // Every catalog component is MIT. Themed ids are section templates now,
      // so send the caller to the command that can actually fetch them.
      const asTemplate = wireframeTemplates.find((t) => t.id === compId);
      if (asTemplate) {
        console.error(`"${compId}" is a section template, not a component. Run \`llmcss template get ${compId}\`.`);
        process.exit(1);
      }
      console.error(`Component "${compId}" not found in registry. Run \`llmcss list\` to see available components.`);
      process.exit(1);
    }

    const comp = hit.component;
    const html = refHtml(hit);
    const extraCss = comp.css || '';

    // Target Output. The colon is flattened to a hyphen: it is hostile in a
    // Windows filename and awkward in a shell.
    const slug = refSlug(hit);
    const targetDir = path.resolve(process.cwd(), 'components', comp.category);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    const htmlFile = path.join(targetDir, `${slug}.html`);
    fs.writeFileSync(htmlFile, html, 'utf-8');
    let cssFile = '';
    if (extraCss) {
      cssFile = path.join(targetDir, `${slug}.css`);
      fs.writeFileSync(cssFile, extraCss, 'utf-8');
    }

    const label = hit.variant ? `${comp.name}, ${hit.variant.name.toLowerCase()} layout` : comp.name;
    console.log(`\x1b[32m✓ Installed ${label}\x1b[0m`);
    console.log(`  File: ${path.relative(process.cwd(), htmlFile)}`);
    if (cssFile) {
      console.log(`  CSS:  ${path.relative(process.cwd(), cssFile)} (link it after llmcss.css)`);
    }
    if (!hit.variant && comp.variants && comp.variants.length > 0) {
      console.log(`  \x1b[2mOther layouts: ${comp.variants.map((v) => `${comp.id}:${v.id}`).join(', ')}\x1b[0m`);
    }
    break;
  }

  case 'variants': {
    const compId = args[1];
    if (!compId) {
      console.error('Please specify a component id: `llmcss variants <component-id>`');
      process.exit(1);
    }
    const hit = resolveRef(components, compId);
    if (!hit) {
      console.error(`Component "${compId}" not found. Run \`llmcss list\` to see available components.`);
      process.exit(1);
    }
    const comp = hit.component;
    const list = comp.variants || [];
    if (list.length === 0) {
      console.log(`\n✦ ${comp.name} has one layout. Run \`npx llmcss add ${comp.id}\`.\n`);
      break;
    }
    console.log(`\n✦ ${comp.name}: ${list.length} layout variants\n`);
    const width = Math.max(...list.map((v) => `${comp.id}:${v.id}`.length)) + 2;
    for (const v of list) {
      console.log(`  \x1b[36m${`${comp.id}:${v.id}`.padEnd(width)}\x1b[0m${v.name}`);
      console.log(`  ${' '.repeat(width)}\x1b[2m${v.description}\x1b[0m`);
    }
    console.log(`\nAdd one with \`npx llmcss add ${comp.id}:${list[0].id}\`.\n`);
    break;
  }

  case 'login': {
    const token = args[1];
    if (!token) {
      console.log('Usage: npx llmcss login <license-token>');
      break;
    }
    const { code, json } = httpJson(`${originBase()}/api/validate.php`, {
      Authorization: `Bearer ${token}`,
    });
    if (code !== 200 || !json || json.valid !== true) {
      console.error('Token is not valid. Nothing saved.');
      process.exit(1);
    }
    saveToken(token);
    const plan = json.plan || 'Pro';
    console.log('\x1b[32m✓ Saved LLMCSS Pro license token.\x1b[0m');
    console.log('  Plan: ' + plan);
    if (json.prefix) console.log('  Prefix: ' + json.prefix);
    break;
  }

  case 'init': {
    console.log('✦ Initializing LLMCSS in current workspace...');
    const config = {
      prefix: 'ai',
      theme: 'obsidian',
      componentsDir: './components',
    };
    fs.writeFileSync('llmcss.config.json', JSON.stringify(config, null, 2), 'utf-8');
    console.log('\x1b[32m✓ Created llmcss.config.json\x1b[0m');
    console.log('To add your first component, run: `npx llmcss add btn-variants`\n');
    break;
  }

  case 'info': {
    const compId = args[1];
    const hit = resolveRef(components, compId);
    if (!hit) {
      const cut = compId ? compId.lastIndexOf(':') : -1;
      const parent = cut > 0 ? components.find((c) => c.id === compId.slice(0, cut)) : null;
      if (parent) {
        const list = (parent.variants || []).map((v) => v.id);
        console.error(`Component "${parent.id}" has no variant "${compId.slice(cut + 1)}".`);
        console.error(list.length ? `Variants: ${list.join(', ')}.` : 'It has one layout, so drop the colon.');
        process.exit(1);
      }
      const asTemplate = wireframeTemplates.find((t) => t.id === compId);
      if (asTemplate) {
        console.error(`"${compId}" is a section template, not a component. Run \`llmcss template get ${compId}\`.`);
        process.exit(1);
      }
      console.error(`Component "${compId}" not found.`);
      process.exit(1);
    }
    const comp = hit.component;
    // Output stays one JSON document so it can be piped. variantRefs is the
    // flat address list, so a reader never has to assemble the colon itself.
    const variantRefs = (comp.variants || []).map((v) => `${comp.id}:${v.id}`);
    if (hit.variant) {
      console.log(
        JSON.stringify(
          {
            ref: refId(hit),
            parent: comp.id,
            category: comp.category,
            tier: comp.tier,
            ...hit.variant,
            variantRefs,
          },
          null,
          2
        )
      );
      break;
    }
    console.log(JSON.stringify({ ...comp, variantRefs }, null, 2));
    break;
  }

  case 'validate': {
    // Class names carry no prefix, so an unknown token may simply be the
    // project's own class. Unknowns are warnings unless --strict is passed.
    const strict = args.includes('--strict');
    const file = args.slice(1).find((a) => !a.startsWith('-'));
    if (!file) {
      console.error('Usage: llmcss validate [--strict] <file>');
      process.exit(1);
    }
    if (!fs.existsSync(file)) {
      console.error(`File not found: ${file}`);
      process.exit(1);
    }
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    let errors = 0;
    let warnings = 0;
    const LABELS = {
      'unknown-class': 'Unknown class',
      'unknown-state': 'Unknown state',
      'legacy-prefix': 'Removed ai- prefix',
      'legacy-class': 'Legacy class',
    };
    console.log(`\n✦ Validating ${file} for LLMCSS standards${strict ? ' (strict)' : ''}...\n`);
    lines.forEach((line, idx) => {
      for (const issue of validateMarkup(line, { strict }).issues) {
        const isError = issue.severity === 'error';
        const tone = isError ? '\x1b[31merror\x1b[0m' : '\x1b[33mwarning\x1b[0m';
        const label = LABELS[issue.type] || issue.type;
        const hint = issue.suggestion ? ` Use "\x1b[32m${issue.suggestion}\x1b[0m".` : '';
        console.log(`  \x1b[2mLine ${idx + 1}:\x1b[0m ${tone} ${label} "\x1b[31m${issue.class}\x1b[0m".${hint}`);
        if (isError) errors++;
        else warnings++;
      }
    });
    if (errors === 0 && warnings === 0) {
      console.log('\x1b[32m✓ 0 issues found! File conforms to LLMCSS standards.\x1b[0m\n');
    } else if (errors === 0) {
      console.log(`\n\x1b[33m${warnings} warning${warnings === 1 ? '' : 's'}.\x1b[0m No errors: unknown names are assumed to be your own classes. Pass --strict to fail on them.\n`);
    } else {
      console.log(`\n\x1b[31m✗ ${errors} error${errors === 1 ? '' : 's'}\x1b[0m, ${warnings} warning${warnings === 1 ? '' : 's'}. Run \`npx llmcss lint --fix ${file}\` to migrate the renamed classes.\n`);
      process.exit(1);
    }
    break;
  }

  case 'lint': {
    const isFix = args[1] === '--fix';
    const file = isFix ? args[2] : args[1];
    if (!file) {
      console.error('Usage: llmcss lint [--fix] <file>');
      process.exit(1);
    }
    if (!fs.existsSync(file)) {
      console.error(`File not found: ${file}`);
      process.exit(1);
    }
    let content = fs.readFileSync(file, 'utf-8');
    let replacedCount = 0;
    // Token-exact: only a whole class name is rewritten, and legacyFix() only
    // answers for a token that is stale (a removed ai- prefix on a class that
    // still exists), so a correct `btn` is never touched, an `<ai-modal>` tag
    // is never touched, and the command is idempotent.
    content = content.replace(/\b(class(?:Name)?\s*=\s*)(["'])([^"']*)\2/g, (match, attr, quote, value) => {
      const tokens = value.split(/(\s+)/).map((t) => {
        if (/^\s*$/.test(t)) return t;
        const fixed = legacyFix(t);
        if (fixed) { replacedCount++; return fixed; }
        return t;
      });
      return `${attr}${quote}${tokens.join('')}${quote}`;
    });
    if (isFix) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`\x1b[32m✓ Fixed ${replacedCount} renamed/legacy classes in ${file}\x1b[0m\n`);
    } else {
      console.log(`Found ${replacedCount} potential fixes. Run \`llmcss lint --fix ${file}\` to apply.\n`);
    }
    break;
  }

  case 'harness': {
    const archetype = (args[1] || 'all').toLowerCase();
    const ARCHETYPES = {
      executive: {
        name: 'Executive Slate',
        description: 'High-density engineering workspace, cool slate neutrals, 4px architectural radius, razor-sharp 1px borders, tabular numerals.',
        tokens: {
          '--ai-font-sans': "'IBM Plex Sans', system-ui, sans-serif",
          '--ai-font-display': "'Sora', 'IBM Plex Sans', sans-serif",
          '--ai-font-mono': "'IBM Plex Mono', monospace",
          '--ai-radius-base': '4px',
          '--ai-radius-md': '4px',
          '--ai-radius-lg': '6px',
          '--ai-accent': '#2563eb',
          '--ai-bg': '#f8fafc',
          '--ai-surface-0': '#ffffff',
          '--ai-surface-1': '#f1f5f9',
          '--ai-border': 'rgba(15, 23, 42, 0.08)',
          '--ai-border-strong': 'rgba(15, 23, 42, 0.18)',
        },
      },
      fintech: {
        name: 'Fintech Titanium',
        description: 'Regulated financial intelligence, institutional security, warm stone neutrals, 6px radius, emerald and teal accents.',
        tokens: {
          '--ai-font-sans': "'DM Sans', system-ui, sans-serif",
          '--ai-font-display': "'DM Sans', system-ui, sans-serif",
          '--ai-radius-base': '6px',
          '--ai-radius-md': '6px',
          '--ai-radius-lg': '8px',
          '--ai-accent': '#0f766e',
          '--ai-success': '#059669',
          '--ai-bg': '#f8f8f6',
          '--ai-surface-0': '#ffffff',
          '--ai-surface-1': '#f3f3f0',
          '--ai-border': 'rgba(28, 25, 23, 0.08)',
          '--ai-border-strong': 'rgba(28, 25, 23, 0.16)',
        },
      },
      obsidian: {
        name: 'Obsidian Minimal',
        description: 'Pure pitch-black minimalist console, stark monochrome contrast, 0px-2px sharp radii, monospace accents.',
        tokens: {
          '--ai-font-display': "'Sora', sans-serif",
          '--ai-font-sans': "'DM Sans', system-ui, sans-serif",
          '--ai-font-mono': "'IBM Plex Mono', monospace",
          '--ai-radius-base': '2px',
          '--ai-radius-md': '2px',
          '--ai-radius-lg': '4px',
          '--ai-accent': '#ededed',
          '--ai-bg': '#000000',
          '--ai-surface-0': '#0a0a0a',
          '--ai-surface-1': '#141414',
          '--ai-border': '#27272a',
          '--ai-border-strong': '#3f3f46',
        },
      },
      editorial: {
        name: 'Editorial Atelier',
        description: 'Humanist publishing, warm paper substrate, Newsreader serif display headlines, crisp hairline borders, zero card bloat.',
        tokens: {
          '--ai-font-serif': "'Newsreader', Georgia, serif",
          '--ai-font-display': "'Newsreader', Georgia, serif",
          '--ai-font-sans': "'Plus Jakarta Sans', system-ui, sans-serif",
          '--ai-radius-base': '3px',
          '--ai-radius-md': '4px',
          '--ai-radius-lg': '6px',
          '--ai-accent': '#8c4a27',
          '--ai-bg': '#faf8f5',
          '--ai-surface-0': '#ffffff',
          '--ai-surface-1': '#f4eee6',
          '--ai-border': 'rgba(41, 37, 36, 0.1)',
          '--ai-border-strong': 'rgba(41, 37, 36, 0.2)',
        },
      },
    };

    if (archetype === 'all' || archetype === 'list') {
      console.log('\n✦ LLMCSS Design Direction Harness: A Human-Craft Design OS for AI Agents\n');
      // The laws, their count and their order come from src/registry/laws.mjs,
      // the same source build-docs.mjs renders into AGENTS.md, README.md and
      // llms.txt. Typing them here is how the CLI ended up printing "10" over
      // a list of eleven.
      console.log(`\x1b[33m--- The ${laws.length} Non-Negotiable Anti-Slop Laws ---\x1b[0m`);
      for (const law of laws) console.log(`${law.n}. ${law.title}`);
      console.log('');
      console.log('\x1b[33m--- Available Archetypes ---\x1b[0m');
      for (const [key, arch] of Object.entries(ARCHETYPES)) {
        console.log(`  \x1b[36m${key.padEnd(12)}\x1b[0m \x1b[1m${arch.name}\x1b[0m`);
        console.log(`               ${arch.description}\n`);
      }
      console.log('Run `npx llmcss harness <archetype>` to output tokens and agent prompt directives.\n');
    } else if (ARCHETYPES[archetype]) {
      const arch = ARCHETYPES[archetype];
      console.log(`\n✦ Design Archetype: \x1b[1m${arch.name}\x1b[0m`);
      console.log(`${arch.description}\n`);
      console.log('\x1b[33m--- CSS TOKENS ---\x1b[0m');
      console.log(':root {');
      for (const [prop, val] of Object.entries(arch.tokens)) {
        console.log(`  ${prop}: ${val};`);
      }
      console.log('}\n');
      console.log('\x1b[33m--- AGENT PROMPT DIRECTIVE ---\x1b[0m');
      console.log(`You are adhering to the LLMCSS "${arch.name}" design direction.`);
      console.log('Strict Anti-Slop Rules:');
      console.log('- Never nest cards inside cards (use whitespace or subtle dividers).');
      console.log('- Never pulse static status dots (reserve motion for active streaming).');
      console.log('- Never use thick colored left-border stripes.');
      console.log('- Theme all native browser surfaces (caret-color, selection, scrollbars).\n');
    } else {
      console.error(`Unknown archetype "${archetype}". Available: executive, fintech, obsidian, editorial`);
      process.exit(1);
    }
    break;
  }

  case 'audit': {
    const file = args[1];
    if (!file) {
      console.error('Usage: llmcss audit <file>');
      process.exit(1);
    }
    if (!fs.existsSync(file)) {
      console.error(`File not found: ${file}`);
      process.exit(1);
    }

    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    const slopFindings = [];
    for (const issue of structuralAudit(content)) {
      // structuralAudit carries the fix for every finding it raises, including
      // the Law 13 tile checks. A ternary here can only ever know two of them,
      // so the issue's own fix wins and the fallback is the last resort.
      const fix = issue.fix || 'Flatten hierarchy: use whitespace or hairline rules instead of nesting cards.';
      slopFindings.push({ line: 0, category: issue.category, tell: issue.message, fix });
    }

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;

      // Class tokens for every class/className attribute on this line, used by
      // the checks below so a hyphenated sibling class (card-header,
      // marquee-track, pulse-dot-danger, ...) can never match a check
      // meant for its exact base class.
      const lineClassTokens = Array.from(line.matchAll(/\bclass(?:Name)?=["']([^"']+)["']/g))
        .flatMap((m) => m[1].split(/\s+/).filter(Boolean));

      // 1. Continuous pulsing dots
      if (lineClassTokens.includes('pulse-dot') && !lineClassTokens.includes('pulse-dot-streaming') && !/is-streaming/.test(line)) {
        slopFindings.push({
          line: lineNum,
          category: 'Pulsing Status Dots',
          tell: 'Continuous pulsing dot applied to static element',
          fix: 'Use calm, steady status pips (.status-pip). Reserve motion exclusively for active data transmission.',
        });
      }

      // 2. Colored left-border stripes. The logical property is the same tell
      // as the physical one, the `solid` keyword is optional in the shorthand,
      // and an `inset Npx 0` shadow paints the identical bar without ever
      // writing the word border.
      if (/border-(?:left|inline-start)\s*:\s*[2-9]px/i.test(line) ||
          /box-shadow\s*:\s*inset\s+[2-9]px\s+0/i.test(line)) {
        slopFindings.push({
          line: lineNum,
          category: 'Side-Tab Cards',
          tell: 'Thick colored vertical left-stripe detected',
          fix: 'Use a uniform 1px architectural border and a 6px status jewel pip.',
        });
      }

      // 3. Electric purple/cyan gradients
      if (/linear-gradient.*(#8b5cf6|#a855f7|#06b6d4|#3b82f6)/i.test(line)) {
        slopFindings.push({
          line: lineNum,
          category: 'AI Purple Gradients',
          tell: 'Saturated electric purple/cyan gradient detected',
          fix: 'Use a disciplined solid neutral background with tactile multi-stop elevation shadows.',
        });
      }

      // 4. Auto-scrolling marquees
      if (lineClassTokens.includes('marquee')) {
        slopFindings.push({
          line: lineNum,
          category: 'Auto-Scrolling Marquee',
          tell: 'Marquee text forces users to wait and read at the page pace',
          fix: 'Replace marquee with a clean, static, responsive framework badge rail.',
        });
      }

      // 5. Class names still carrying the ai- prefix removed in 0.4.0. Custom
      // element tags (<ai-modal>) keep theirs, so only class tokens are read.
      for (const token of lineClassTokens) {
        const fixed = legacyFix(token);
        if (!fixed) continue;
        slopFindings.push({
          line: lineNum,
          category: 'Removed ai- Class Prefix',
          tell: `Class "${token}" uses the ai- prefix removed in 0.4.0`,
          fix: `Use ".${fixed}". Run \`llmcss lint --fix\` to migrate the file.`,
        });
      }

      // 6. Badge eyebrows directly above headings
      if (/<(?:span|div)[^>]*\bclass=["'][^"']*["'][^>]*>/i.test(line) &&
          (lineClassTokens.includes('badge') || lineClassTokens.includes('hero-badge')) &&
          !lineClassTokens.includes('product-badge-float')) {
        for (let j = idx + 1; j < Math.min(idx + 5, lines.length); j++) {
          if (/<h[1-4]\b/i.test(lines[j])) {
            slopFindings.push({
              line: lineNum,
              category: 'Badge Eyebrow Over Heading',
              tell: 'Pill/badge eyebrow positioned directly above a title or heading',
              fix: 'Remove the badge eyebrow container. Lead directly with confident, human-crafted typography.',
            });
            break;
          }
        }
      }

      // 7. Square grid backgrounds / AI graph paper patterns
      if (/background-size:\s*\d+px\s+\d+px/i.test(line) ||
          /linear-gradient\([^)]*(?:to right|90deg)[^)]*1px/i.test(line)) {
        const surrounding = lines.slice(Math.max(0, idx - 4), Math.min(lines.length, idx + 5)).join(' ');
        if (/linear-gradient\([^)]*(?:to right|90deg)/i.test(surrounding) &&
            /linear-gradient\([^)]*(?:to bottom|0deg|180deg)/i.test(surrounding)) {
          slopFindings.push({
            line: lineNum,
            category: 'Square Grid Background',
            tell: 'Synthetic square grid / graph paper background pattern detected',
            fix: 'Eliminate square grid patterns. Lead with clean solid surfaces (var(--ai-surface-0), var(--ai-bg)) and subtle 1px hairline borders.',
          });
        }
      }
      if (/class=["'][^"']*\b(?:bg-grid|grid-pattern|hero-grid)\b[^"']*["']/i.test(line)) {
        slopFindings.push({
          line: lineNum,
          category: 'Square Grid Background Class',
          tell: 'Square grid background utility class detected',
          fix: 'Remove grid pattern class. Use solid surfaces.',
        });
      }
    });

    console.log(`\n✦ LLMCSS Design Quality Audit: ${file}\n`);
    if (slopFindings.length === 0) {
      console.log('\x1b[32m✓ 0 design quality issues detected! Interface adheres to human-craft standards.\x1b[0m\n');
    } else {
      console.log(`\x1b[33mFound ${slopFindings.length} design quality issues:\x1b[0m\n`);
      for (const f of slopFindings) {
        console.log(`  \x1b[31mLine ${f.line}\x1b[0m [\x1b[1m${f.category}\x1b[0m]: ${f.tell}`);
        console.log(`    \x1b[32mFix:\x1b[0m ${f.fix}\n`);
      }
      process.exit(1);
    }
    break;
  }

  case 'templates':
  case 'template': {
    const sub = args[1] || 'list';
    if (sub === 'list') {
      console.log(`\n✦ LLMCSS Wireframe Section Templates Catalog (${wireframeTemplates.length} Sections)\n`);
      const sections = ['header', 'hero', 'features', 'social-proof', 'comparison', 'pricing', 'faq', 'cta', 'footer', 'app-shell'];
      for (const sec of sections) {
        const matching = wireframeTemplates.filter((t) => t.section === sec);
        if (matching.length === 0) continue;
        console.log(`\x1b[1m=== ${sec.toUpperCase()} ===\x1b[0m`);
        for (const t of matching) {
          const tierBadge = t.tier === 'pro' ? '\x1b[33m[PRO]\x1b[0m' : '\x1b[32m[FREE]\x1b[0m';
          console.log(`  ${tierBadge} \x1b[36m${t.id.padEnd(30)}\x1b[0m ${t.name}`);
          console.log(`         \x1b[90mPlacement: ${t.placement}\x1b[0m`);
        }
      }
      console.log('\nTip: Run `llmcss template get <id>` to retrieve clean markup.');
      console.log('     Run `llmcss template blueprints` to inspect full-page blueprints.\n');
      break;
    }

    if (sub === 'blueprints' || sub === 'blueprint-list') {
      console.log(`\n✦ LLMCSS Page Composition Blueprints (${pageBlueprints.length})\n`);
      for (const bp of pageBlueprints) {
        console.log(`\x1b[1;36m${bp.name}\x1b[0m (\x1b[33m${bp.id}\x1b[0m)`);
        console.log(`  ${bp.description}`);
        console.log(`  \x1b[90mRecommended For: ${bp.recommendedFor}\x1b[0m`);
        console.log(`  \x1b[90mStack: ${bp.sections.join(' -> ')}\x1b[0m\n`);
      }
      console.log('Run `llmcss template blueprint <id>` to generate full assembled HTML.\n');
      break;
    }

    if (sub === 'blueprint') {
      const bpId = args[2];
      if (!bpId) {
        console.error('Please specify a blueprint id: `llmcss template blueprint <name>`');
        console.error('Available: ' + pageBlueprints.map((b) => b.id).join(', '));
        process.exit(1);
      }
      const bp = pageBlueprints.find((b) => b.id === bpId);
      if (!bp) {
        console.error(`Blueprint "${bpId}" not found. Available: ${pageBlueprints.map((b) => b.id).join(', ')}`);
        process.exit(1);
      }
      if (bp.tier === 'pro') {
        console.log(fetchProJson(bpId).html);
        break;
      }
      const html = assembleBlueprintHtml(bpId);
      if (!html) {
        console.error(`Blueprint "${bpId}" not found. Available: ${pageBlueprints.map((b) => b.id).join(', ')}`);
        process.exit(1);
      }
      console.log(html);
      break;
    }

    if (sub === 'get') {
      const templateId = args[2];
      if (!templateId) {
        console.error('Please specify a template id: `llmcss template get <id>`');
        process.exit(1);
      }
      const found = wireframeTemplates.find(
        (t) => t.id === templateId || t.id === `wireframe-${templateId}` || t.id.replace('wireframe-', '') === templateId
      );
      if (!found) {
        console.error(`Template "${templateId}" not found. Run \`llmcss template list\` to see available templates.`);
        process.exit(1);
      }
      if (found.tier === 'pro') {
        console.log(fetchProJson(found.id).html);
        break;
      }
      console.log(found.html);
      break;
    }

    console.error(`Unknown template subcommand: "${sub}". Use \`llmcss template list\`, \`llmcss template get <id>\`, or \`llmcss template blueprint <name>\`.`);
    process.exit(1);
  }

  case 'trim': {
    const TRIM_HELP = `
✦ llmcss trim - optional stylesheet subsetting

Usage:
  npx llmcss trim <glob...> [--out <file>]

  npx llmcss trim "src/**/*.html" "app/views/**/*.erb"
  npx llmcss trim "index.html" "components.html" --out public/llmcss.min.css

Scans the matched markup for class tokens, then writes a stylesheet that
keeps the reset, tokens and base layers verbatim and keeps only the rules in
the components and utilities layers whose selector names a class you use.

THIS IS OPTIONAL. The full stylesheet is the supported default: it is one
cached file, it costs nothing per page, and it never breaks when you paste new
markup from the gallery or from an agent. Reach for trim only when you have a
fixed, fully static set of pages and you have measured that the stylesheet is
actually your bottleneck. A trimmed file goes stale the moment your markup
changes, so regenerate it in the same step that builds your pages.

Known limits: classes assembled at runtime (string concatenation, template
interpolation, a CMS field, a class map in JS) are invisible to the scanner and
their rules get dropped. Keep the full stylesheet if any of that applies.

Options:
  --out <file>   Output path. Default: llmcss.trim.css in the current directory.
  --help         Show this text.

Source stylesheet: dist/llmcss.css if it exists, otherwise it is fetched from
https://llmcss.io/llmcss.css with curl.

Glob syntax: ** matches any number of directories, * matches within one path
segment, ? matches one character. Quote your globs so the shell does not expand
them first.
`;
    const trimArgs = args.slice(1);
    if (trimArgs.length === 0 || trimArgs.includes('--help') || trimArgs.includes('-h')) {
      console.log(TRIM_HELP);
      break;
    }

    const patterns = [];
    let outPath = 'llmcss.trim.css';
    for (let i = 0; i < trimArgs.length; i++) {
      if (trimArgs[i] === '--out' || trimArgs[i] === '-o') {
        outPath = trimArgs[++i];
        if (!outPath) {
          console.error('--out needs a file path.');
          process.exit(1);
        }
      } else {
        patterns.push(trimArgs[i]);
      }
    }
    if (patterns.length === 0) {
      console.error('Please give at least one glob: `llmcss trim "src/**/*.html"`');
      process.exit(1);
    }

    // --- Minimal glob: ** across segments, * within a segment, ? one char ---
    const SCANNABLE = new Set(['.html', '.htm', '.xhtml', '.jsx', '.tsx', '.js', '.mjs', '.ts', '.vue', '.svelte', '.php', '.erb', '.astro', '.twig', '.hbs', '.blade']);
    const SKIP_DIRS = new Set(['node_modules', '.git', '.svn', 'dist', 'build', '.next', '.svelte-kit', 'vendor', 'coverage']);

    function globToRegExp(pattern) {
      let re = '';
      for (let i = 0; i < pattern.length; i++) {
        const ch = pattern[i];
        if (ch === '*') {
          if (pattern[i + 1] === '*') {
            // ** : any number of segments. Swallow a following slash so that
            // "src/**/*.html" also matches "src/a.html".
            i++;
            if (pattern[i + 1] === '/') {
              i++;
              re += '(?:[^/]*\\/)*';
            } else {
              re += '.*';
            }
          } else {
            re += '[^/]*';
          }
        } else if (ch === '?') {
          re += '[^/]';
        } else if ('\\^$.|+()[]{}'.includes(ch)) {
          re += '\\' + ch;
        } else {
          re += ch;
        }
      }
      return new RegExp('^' + re + '$');
    }

    function walk(dir, acc) {
      let entries;
      try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
      } catch {
        return acc;
      }
      for (const e of entries) {
        if (e.name.startsWith('.') && e.name !== '.') continue;
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          if (SKIP_DIRS.has(e.name)) continue;
          walk(full, acc);
        } else if (e.isFile()) {
          acc.push(full);
        }
      }
      return acc;
    }

    function expand(pattern) {
      const norm = pattern.replace(/\\/g, '/');
      if (!/[*?]/.test(norm)) {
        return fs.existsSync(norm) && fs.statSync(norm).isFile() ? [norm] : [];
      }
      const segs = norm.split('/');
      const baseSegs = [];
      for (const s of segs) {
        if (/[*?]/.test(s)) break;
        baseSegs.push(s);
      }
      const base = baseSegs.length ? baseSegs.join('/') : '.';
      const re = globToRegExp(norm);
      const all = walk(base, []);
      return all
        .map((f) => f.replace(/\\/g, '/').replace(/^\.\//, ''))
        .filter((f) => re.test(f) || re.test('./' + f));
    }

    const files = [];
    const seenFiles = new Set();
    for (const p of patterns) {
      for (const f of expand(p)) {
        if (seenFiles.has(f)) continue;
        if (!SCANNABLE.has(path.extname(f).toLowerCase())) continue;
        seenFiles.add(f);
        files.push(f);
      }
    }
    if (files.length === 0) {
      console.error(`No markup files matched. Patterns: ${patterns.join(' ')}`);
      console.error('Quote your globs, and check the extension is one of: ' + [...SCANNABLE].join(' '));
      process.exit(1);
    }

    // --- Collect used class tokens ---
    // Class names carry no prefix, so there is nothing to filter on: every
    // token in a class attribute is kept, and a token the stylesheet never
    // names simply matches no rule.
    const used = new Set();
    // Custom element tags keep the ai- prefix; the class they share the rules
    // with does not. <ai-modal> therefore counts as .modal being in play.
    const CE_TAGS = {
      'ai-modal': 'modal',
      'ai-tabs': 'tabs',
      'ai-dropdown': 'dropdown',
      'ai-accordion': 'accordion',
      'ai-drawer': 'drawer',
      'ai-toast': 'toast',
      'ai-command-palette': 'command-palette',
    };
    for (const f of files) {
      const src = fs.readFileSync(f, 'utf-8');
      for (const t of classTokens(src)) used.add(t);
      for (const [tagName, className] of Object.entries(CE_TAGS)) {
        if (new RegExp('<' + tagName + '[\\s/>]', 'i').test(src)) used.add(className);
      }
    }
    // Responsive and container prefixes are written md:gap-4 in markup and
    // .md\:gap-4 in CSS; both forms end up in the set unescaped.
    const overlayUsed = [...used].some((c) => /^(modal|drawer)\b/.test(c));

    // --- Load the stylesheet ---
    let css = '';
    let source = '';
    // A dist/llmcss.css in the working directory is the more specific intent
    // (someone built it here); the copy inside the installed package is the
    // fallback for `npx llmcss trim` in a project that never builds the CSS.
    const localDist = path.resolve(process.cwd(), 'dist', 'llmcss.css');
    const pkgDist = path.resolve(__dirname, '..', 'dist', 'llmcss.css');
    if (fs.existsSync(localDist)) {
      css = fs.readFileSync(localDist, 'utf-8');
      source = path.relative(process.cwd(), localDist) || localDist;
    } else if (fs.existsSync(pkgDist)) {
      css = fs.readFileSync(pkgDist, 'utf-8');
      source = pkgDist;
    } else {
      const url = `${originBase()}/llmcss.css`;
      try {
        css = execFileSync('curl', ['-sS', '-L', '--max-time', '30', url], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
      } catch (err) {
        console.error(`Could not read dist/llmcss.css and could not fetch ${url}.`);
        console.error('Run `npm run build` first, or check your network.');
        process.exit(1);
      }
      if (!css || !css.includes('@layer')) {
        console.error(`Fetched ${url} but it does not look like the LLMCSS stylesheet.`);
        process.exit(1);
      }
      source = url;
    }

    // --- Tolerant brace walker: split a stylesheet into top-level blocks ---
    // Same approach as rules() in src/registry/build-manifests.mjs: find the
    // next "{", count braces to its match, and treat what came before as the
    // head. Strings and comments are not tracked, which is fine for the built
    // stylesheet because it contains no brace inside a string.
    function blocks(text) {
      const out = [];
      let i = 0;
      while (i < text.length) {
        const open = text.indexOf('{', i);
        if (open < 0) {
          const tail = text.slice(i).trim();
          if (tail) out.push({ head: tail, body: null, atRuleOnly: true });
          break;
        }
        const head = text.slice(i, open).trim();
        let depth = 1;
        let j = open + 1;
        while (j < text.length && depth > 0) {
          if (text[j] === '{') depth++;
          else if (text[j] === '}') depth--;
          j++;
        }
        out.push({ head, body: text.slice(open + 1, j - 1), atRuleOnly: false });
        i = j;
      }
      return out;
    }

    // Class names out of a selector: .md\:gap-4 -> md:gap-4, .w-1\/2 -> w-1/2,
    // .-m-1 -> -m-1, .\000032xl\:flex -> 2xl:flex.
    //
    // selectorClasses is imported from src/registry/css-names.mjs, the same
    // module build-utilities.mjs escapes with and build-manifests.mjs reads
    // with. This used to be a local copy that knew single-character escapes
    // only, so `\000032` was decoded a character at a time into the literal
    // text "000032" and every 2xl: class came back as `000032xl:flex`. Nothing
    // in the used-class set ever matched it, so `llmcss trim` silently dropped
    // the whole 2xl breakpoint from the sheet it produced.

    const KEEP_AT = /^@(keyframes|-webkit-keyframes|property|font-face|counter-style|charset|namespace|font-feature-values)\b/;
    const NEST_AT = /^@(media|supports|container|layer|scope)\b/;

    let keptRules = 0;
    let droppedRules = 0;

    function filterBody(text) {
      const parts = [];
      for (const b of blocks(text)) {
        if (b.atRuleOnly) {
          // A statement at-rule such as `@layer a,b,c;`
          parts.push(b.head.endsWith(';') ? b.head : b.head + ';');
          continue;
        }
        const head = b.head;
        if (KEEP_AT.test(head)) {
          // Keyframes, @property and @font-face are cheap and are referenced by
          // rules we may keep, so dropping one would silently break animation.
          parts.push(`${head}{${b.body}}`);
          continue;
        }
        if (NEST_AT.test(head)) {
          const inner = filterBody(b.body);
          if (inner.trim()) parts.push(`${head}{${inner}}`);
          continue;
        }
        if (head.startsWith('@')) {
          // Unknown at-rule: keep it rather than guess.
          parts.push(`${head}{${b.body}}`);
          continue;
        }
        const classes = selectorClasses(head);
        let keep;
        if (classes.length === 0) {
          // No class in the selector at all: an element or :has() rule such
          // as the scroll lock. Keep it only when an overlay is in play.
          keep = overlayUsed;
        } else {
          keep = classes.some((c) => used.has(c));
        }
        if (keep) {
          keptRules++;
          parts.push(`${head}{${b.body}}`);
        } else {
          droppedRules++;
        }
      }
      return parts.join('');
    }

    const VERBATIM_LAYERS = /^@layer\s+(reset|tokens|base)\s*$/;
    const outParts = [];
    let verbatimBlocks = 0;
    for (const b of blocks(css)) {
      if (b.atRuleOnly) {
        outParts.push(b.head.endsWith(';') ? b.head : b.head + ';');
        continue;
      }
      // The first block's head carries the layer order statement plus `@layer reset`.
      const stmt = b.head.match(/^([\s\S]*;)\s*(@layer[\s\S]*)$/);
      const lead = stmt ? stmt[1] : '';
      const head = stmt ? stmt[2].trim() : b.head;
      if (lead) outParts.push(lead);

      if (VERBATIM_LAYERS.test(head)) {
        verbatimBlocks++;
        outParts.push(`${head}{${b.body}}`);
        continue;
      }
      if (KEEP_AT.test(head)) {
        outParts.push(`${head}{${b.body}}`);
        continue;
      }
      if (NEST_AT.test(head) || head.startsWith('@')) {
        const inner = filterBody(b.body);
        if (inner.trim()) outParts.push(`${head}{${inner}}`);
        continue;
      }
      const classes = selectorClasses(head);
      const keep = classes.length === 0 ? overlayUsed : classes.some((c) => used.has(c));
      if (keep) {
        keptRules++;
        outParts.push(`${head}{${b.body}}`);
      } else {
        droppedRules++;
      }
    }

    const result = outParts.join('');
    const outDir = path.dirname(path.resolve(outPath));
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, result, 'utf-8');

    const before = Buffer.byteLength(css, 'utf8');
    const after = Buffer.byteLength(result, 'utf8');
    const pct = before ? ((1 - after / before) * 100).toFixed(1) : '0.0';
    console.log(`\n✦ llmcss trim`);
    console.log(`  Source:      ${source}`);
    console.log(`  Scanned:     ${files.length} file${files.length === 1 ? '' : 's'}, ${used.size} distinct classes in use`);
    console.log(`  Verbatim:    ${verbatimBlocks} reset/tokens/base blocks kept whole`);
    console.log(`  Rules:       ${keptRules} kept, ${droppedRules} dropped`);
    console.log(`  Bytes:       ${before} before -> ${after} after (${pct}% smaller)`);
    console.log(`  Output:      ${outPath}`);
    console.log(`\n  Reminder: the full stylesheet is the supported default. A trimmed`);
    console.log(`  file is only valid for the markup scanned above.\n`);
    break;
  }

  case 'help':
  default: {
    console.log(`
✦ LLMCSS CLI - The AI-First Modern UI Framework

Commands:
  llmcss list                    List all available components (every one is MIT)
  llmcss search <query>          Search components by keyword, tag, or variant name
  llmcss add <component-id>      Install component markup into your project
                                 Accepts hero-split, hero-split:centered,
                                 or hero-split --variant centered
  llmcss variants <component-id> List the layout variants of a component
  llmcss info <component-id>     Output raw component metadata & schema
                                 Accepts a variant reference; lists variantRefs
  llmcss templates               List all wireframe section templates
  llmcss template get <id>       Output HTML for a wireframe or themed Pro section
  llmcss template blueprints     List full-page composition blueprints
  llmcss template blueprint <id> Generate full assembled HTML for a page blueprint
  llmcss harness [archetype]     Output Design Direction Harness & agent prompt directives
  llmcss audit <file>            Run automated design quality audit on HTML/CSS file
  llmcss validate [--strict] <file>
                                 Check file for non-standard or hallucinated classes
                                 (--strict: unknown class names fail instead of warn)
  llmcss lint --fix <file>       Auto-migrate renamed classes (the ai- prefix removed in 0.4.0)
  llmcss trim <glob...>          Optional: subset llmcss.css to the classes your markup uses
  llmcss init                    Initialize LLMCSS configuration in project
  llmcss login <key>             Authenticate with your Pro license key
`);
    break;
  }
}
