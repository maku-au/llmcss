#!/usr/bin/env node

/**
 * LLMCSS Command Line Interface (CLI)
 * For Developers & Agentic Coding Assistants
 *
 * Usage:
 *   npx llmcss list
 *   npx llmcss search <query>
 *   npx llmcss add <component-id>
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
import { validateMarkup, structuralAudit, classTokens } from '../src/registry/validate.mjs';

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
    console.log('\n\x1b[33m⚠️  This is an LLMCSS PRO item.\x1b[0m');
    console.log('Themed templates and components are not in the public repo. Subscribe, then login.\n');
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
  'chat': ['ai-chat-thread'],
  'prompt': ['ai-chat-thread'],
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
      }
      console.log('');
    }
    console.log('Run `npx llmcss add <id>` to install a component.\n');
    break;
  }

  case 'search': {
    const query = args[1]?.toLowerCase();
    if (!query) {
      console.error('Please specify a search query: `llmcss search <query>`');
      process.exit(1);
    }
    const aliasTargets = ALIAS_MAP[query] || [];
    const hit = (c) =>
      aliasTargets.includes(c.id) ||
      c.id.includes(query) ||
      c.name.toLowerCase().includes(query) ||
      (c.tags || []).some((t) => t.toLowerCase().includes(query)) ||
      (typeof c.description === 'string' ? c.description : JSON.stringify(c.guidance || '')).toLowerCase().includes(query) ||
      (c.section || '').includes(query.replace(/\s+/g, '-'));
    const matches = components.filter(hit);
    const tplMatches = wireframeTemplates.filter(hit);
    console.log(`\nFound ${matches.length + tplMatches.length} matches for "${query}":\n`);
    for (const comp of matches) {
      const tierBadge = comp.tier === 'pro' ? '\x1b[33m[PRO]\x1b[0m' : '\x1b[32m[FREE]\x1b[0m';
      console.log(`  ${tierBadge} \x1b[36m${comp.id.padEnd(22)}\x1b[0m ${comp.name}`);
    }
    for (const t of tplMatches) {
      console.log(`  \x1b[35m[TPL]\x1b[0m  \x1b[36m${t.id.padEnd(22)}\x1b[0m ${t.name}  (npx llmcss template get ${t.id})`);
    }
    console.log('');
    break;
  }

  case 'add': {
    const compId = args[1];
    if (!compId) {
      console.error('Please specify a component id: `llmcss add <component-id>`');
      process.exit(1);
    }
    const comp = components.find((c) => c.id === compId);
    if (!comp) {
      console.error(`Component "${compId}" not found in registry. Run \`llmcss list\` to see available components.`);
      process.exit(1);
    }

    let html = comp.html;
    let extraCss = comp.css || '';
    if (comp.tier === 'pro') {
      const fetched = fetchProJson(compId);
      html = fetched.html;
      extraCss = fetched.css || '';
    }

    // Target Output
    const targetDir = path.resolve(process.cwd(), 'components', comp.category);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    const htmlFile = path.join(targetDir, `${comp.id}.html`);
    fs.writeFileSync(htmlFile, html, 'utf-8');
    let cssFile = '';
    if (extraCss) {
      cssFile = path.join(targetDir, `${comp.id}.css`);
      fs.writeFileSync(cssFile, extraCss, 'utf-8');
    }

    console.log(`\x1b[32m✓ Installed ${comp.name}\x1b[0m`);
    console.log(`  File: ${path.relative(process.cwd(), htmlFile)}`);
    if (cssFile) {
      console.log(`  CSS:  ${path.relative(process.cwd(), cssFile)} (link it after llmcss.css)`);
    }
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
    const comp = components.find((c) => c.id === compId);
    if (!comp) {
      console.error(`Component "${compId}" not found.`);
      process.exit(1);
    }
    if (comp.tier === 'pro') {
      const { html, ...rest } = comp;
      console.log(JSON.stringify({ ...rest, html: null, locked: true, message: 'Pro source is not in the public catalog. Run `npx llmcss login <token>` then `npx llmcss add ' + comp.id + '`.' }, null, 2));
      break;
    }
    console.log(JSON.stringify(comp, null, 2));
    break;
  }

  case 'validate': {
    const file = args[1];
    if (!file) {
      console.error('Please specify a file: `llmcss validate <file>`');
      process.exit(1);
    }
    if (!fs.existsSync(file)) {
      console.error(`File not found: ${file}`);
      process.exit(1);
    }
    const LEGACY_MAP = {
      'btn': 'ai-btn',
      'btn-primary': 'ai-btn-primary',
      'btn-secondary': 'ai-btn-secondary',
      'btn-outline': 'ai-btn-outline',
      'flex': 'ai-flex',
      'flex-col': 'ai-flex-col',
      'flex-row': 'ai-flex-row',
      'items-center': 'ai-items-center',
      'justify-between': 'ai-justify-between',
      'grid': 'ai-grid',
      'card': 'ai-card',
      'badge': 'ai-badge',
      'spinner': 'ai-spinner',
      'progress': 'ai-progress',
      'rounded-md': 'ai-rounded-md',
      'rounded-lg': 'ai-rounded-lg',
    };
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    let issues = 0;
    console.log(`\n✦ Validating ${file} for LLMCSS standards...\n`);
    lines.forEach((line, idx) => {
      for (const issue of validateMarkup(line).issues) {
        const label = issue.type === 'unknown-class' ? 'Unknown class' : issue.type === 'unknown-state' ? 'Unknown state' : 'Legacy class';
        const hint = issue.suggestion ? ` Suggested: "\x1b[32m${issue.suggestion}\x1b[0m"` : ' See https://llmcss.io/classes.json';
        console.log(`  \x1b[33mLine ${idx + 1}:\x1b[0m ${label} "\x1b[31m${issue.class}\x1b[0m".${hint}`);
        issues++;
      }
    });
    if (issues === 0) {
      console.log('\x1b[32m✓ 0 issues found! File conforms to LLMCSS standards.\x1b[0m\n');
    } else {
      console.log(`\n\x1b[31m✗ Found ${issues} issues.\x1b[0m Run \`npx llmcss lint --fix ${file}\` to automatically fix.\n`);
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
    const LEGACY_MAP = {
      'btn': 'ai-btn',
      'btn-primary': 'ai-btn-primary',
      'btn-secondary': 'ai-btn-secondary',
      'btn-outline': 'ai-btn-outline',
      'flex': 'ai-flex',
      'flex-col': 'ai-flex-col',
      'flex-row': 'ai-flex-row',
      'items-center': 'ai-items-center',
      'justify-between': 'ai-justify-between',
      'grid': 'ai-grid',
      'card': 'ai-card',
      'badge': 'ai-badge',
      'spinner': 'ai-spinner',
      'progress': 'ai-progress',
      'rounded-md': 'ai-rounded-md',
      'rounded-lg': 'ai-rounded-lg',
    };
    let content = fs.readFileSync(file, 'utf-8');
    let replacedCount = 0;
    // Token-exact: only whole, unprefixed class names are rewritten, so a
    // correct ai-btn is never touched and the command is idempotent.
    content = content.replace(/\b(class(?:Name)?\s*=\s*)(["'])([^"']*)\2/g, (match, attr, quote, value) => {
      const tokens = value.split(/(\s+)/).map((t) => {
        if (/^\s*$/.test(t)) return t;
        if (Object.prototype.hasOwnProperty.call(LEGACY_MAP, t)) { replacedCount++; return LEGACY_MAP[t]; }
        return t;
      });
      return `${attr}${quote}${tokens.join('')}${quote}`;
    });
    if (isFix) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`\x1b[32m✓ Fixed ${replacedCount} legacy/hallucinated classes in ${file}\x1b[0m\n`);
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
      console.log('\x1b[33m--- The 10 Non-Negotiable Anti-Slop Laws ---\x1b[0m');
      console.log('1. Never Nest Containers (Eliminate Cardocalypse: use whitespace or hairline rules)');
      console.log('2. Never Pulse Static Status Pips (Reserve motion for active streaming)');
      console.log('3. Never Use Colored Left-Stripe Borders (Use 1px architectural borders and status jewels)');
      console.log('4. Never Use Electric Purple/Cyan Halos (Use multi-stop physical elevation shadows)');
      console.log('5. Never Stamp Formulaic Eyebrows (Lead directly with confident headlines)');
      console.log('6. Never Crush Letter-Spacing Below -0.04em or Justify Body Text');
      console.log('7. Never Place Low-Contrast Gray Text on Colored Backgrounds');
      console.log('8. Never Create Flat, Identical Metric Grids (Anchor dominant metric)');
      console.log('9. Never Auto-Scroll Copy (Marquees: render static scannable rails)');
      console.log('10. Always Theme Native Browser Surfaces (Caret, scrollbars, selection, tabular numerals)');
      console.log('11. Never Use Square Grid Backgrounds (Graph paper and blueprint grids are robotic AI clichés: lead with solid surfaces and hairline borders)\n');
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
      slopFindings.push({ line: 0, category: issue.category, tell: issue.message, fix: issue.category === 'Cardocalypse' ? 'Flatten hierarchy: use whitespace or hairline rules instead of nesting cards.' : 'Reserve motion for .is-streaming only.' });
    }

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;

      // Class tokens for every class/className attribute on this line, used by
      // the checks below so a hyphenated sibling class (ai-card-header,
      // ai-marquee-track, ai-pulse-dot-danger, ...) can never match a check
      // meant for its exact base class.
      const lineClassTokens = Array.from(line.matchAll(/\bclass(?:Name)?=["']([^"']+)["']/g))
        .flatMap((m) => m[1].split(/\s+/).filter(Boolean));

      // 1. Continuous pulsing dots
      if (lineClassTokens.includes('ai-pulse-dot') && !lineClassTokens.includes('ai-pulse-dot-streaming') && !/is-streaming/.test(line)) {
        slopFindings.push({
          line: lineNum,
          category: 'Pulsing Status Dots',
          tell: 'Continuous pulsing dot applied to static element',
          fix: 'Use calm, steady status pips (.ai-status-pip). Reserve motion exclusively for active data transmission.',
        });
      }

      // 2. Colored left-border stripes
      if (/border-left:\s*[2-9]px\s+solid/i.test(line)) {
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
      if (lineClassTokens.includes('ai-marquee')) {
        slopFindings.push({
          line: lineNum,
          category: 'Auto-Scrolling Marquee',
          tell: 'Marquee text forces users to wait and read at the page pace',
          fix: 'Replace marquee with a clean, static, responsive framework badge rail.',
        });
      }

      // 5. Hallucinated legacy classes
      const legacyClasses = ['btn', 'btn-primary', 'flex', 'grid', 'card', 'badge', 'spinner'];
      for (const legacy of legacyClasses) {
        if (lineClassTokens.includes(legacy)) {
          slopFindings.push({
            line: lineNum,
            category: 'Unprefixed / Hallucinated Class',
            tell: `Class "${legacy}" without "ai-" prefix`,
            fix: `Use LLMCSS standard ".ai-${legacy}".`,
          });
        }
      }

      // 6. Badge eyebrows directly above headings
      if (/<(?:span|div)[^>]*\bclass=["'][^"']*["'][^>]*>/i.test(line) &&
          (lineClassTokens.includes('ai-badge') || lineClassTokens.includes('ai-hero-badge')) &&
          !lineClassTokens.includes('ai-product-badge-float')) {
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
      if (/class=["'][^"']*\b(?:ai-bg-grid|bg-grid|grid-pattern|hero-grid)\b[^"']*["']/i.test(line)) {
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

Scans the matched markup for ai-* class tokens, then writes a stylesheet that
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

    // --- Collect used ai-* tokens ---
    const used = new Set();
    const CE_TAGS = ['ai-modal', 'ai-tabs', 'ai-dropdown', 'ai-accordion', 'ai-drawer', 'ai-toast', 'ai-command-palette'];
    for (const f of files) {
      const src = fs.readFileSync(f, 'utf-8');
      for (const t of classTokens(src)) {
        if (t.startsWith('ai-')) used.add(t);
      }
      // A custom element used as a tag styles itself through the same rules as
      // its class, so <ai-modal> must count as ai-modal being in play.
      for (const tag of CE_TAGS) {
        if (new RegExp('<' + tag + '[\\s/>]', 'i').test(src)) used.add(tag);
      }
    }
    // Responsive and container prefixes are written ai-md:gap-4 in markup and
    // .ai-md\:gap-4 in CSS; both forms end up in the set unescaped.
    const overlayUsed = [...used].some((c) => /^ai-(modal|drawer)\b/.test(c));

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

    // .ai-md\:gap-4 -> ai-md:gap-4 ; .ai-w-1\/2 -> ai-w-1/2
    function selectorClasses(selector) {
      const out = [];
      for (const m of selector.matchAll(/\.(ai-(?:\\.|[\w-])*)/g)) {
        out.push(m[1].replace(/\\(.)/g, '$1'));
      }
      return out;
    }

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
          // No ai-* class in the selector at all: an element or :has() rule such
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
    console.log(`  Scanned:     ${files.length} file${files.length === 1 ? '' : 's'}, ${used.size} distinct ai-* classes in use`);
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
  llmcss list                    List all available components (Free & Pro)
  llmcss search <query>          Search components by keyword or tag
  llmcss add <component-id>      Install component markup into your project
  llmcss info <component-id>     Output raw component metadata & schema
  llmcss templates               List all wireframe section templates
  llmcss template get <id>       Output clean semantic HTML for a wireframe section
  llmcss template blueprints     List full-page composition blueprints
  llmcss template blueprint <id> Generate full assembled HTML for a page blueprint
  llmcss harness [archetype]     Output Design Direction Harness & agent prompt directives
  llmcss audit <file>            Run automated design quality audit on HTML/CSS file
  llmcss validate <file>         Check file for non-standard or hallucinated classes
  llmcss lint --fix <file>       Auto-migrate legacy or hallucinated classes to LLMCSS
  llmcss trim <glob...>          Optional: subset llmcss.css to the classes your markup uses
  llmcss init                    Initialize LLMCSS configuration in project
  llmcss login <key>             Authenticate with your Pro license key
`);
    break;
  }
}
