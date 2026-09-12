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
    const matches = components.filter(
      (c) =>
        aliasTargets.includes(c.id) ||
        c.id.includes(query) ||
        c.name.toLowerCase().includes(query) ||
        c.tags.some((t) => t.toLowerCase().includes(query)) ||
        c.description.toLowerCase().includes(query)
    );
    console.log(`\nFound ${matches.length} matches for "${query}":\n`);
    for (const comp of matches) {
      const tierBadge = comp.tier === 'pro' ? '\x1b[33m[PRO]\x1b[0m' : '\x1b[32m[FREE]\x1b[0m';
      console.log(`  ${tierBadge} \x1b[36m${comp.id.padEnd(22)}\x1b[0m ${comp.name}`);
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

    // License Check for Pro Components
    let html = comp.html;
    let extraCss = comp.css || '';
    if (comp.tier === 'pro') {
      const token = getStoredToken();
      if (!token) {
        console.log('\n\x1b[33m⚠️  This is an LLMCSS PRO component.\x1b[0m');
        console.log('Source is not in the public repo. Subscribe, then login.\n');
        console.log('1. Get a license at: \x1b[36mhttps://llmcss.io/#pricing\x1b[0m');
        console.log('2. Run: \x1b[32mnpx llmcss login <token>\x1b[0m\n');
        process.exit(1);
      }
      const { code, json } = httpJson(`${originBase()}/r/pro/${compId}.json`, {
        Authorization: `Bearer ${token}`,
      });
      if (code !== 200 || !json || !json.html) {
        console.error('Pro registry rejected this token (HTTP ' + code + ').');
        process.exit(1);
      }
      html = json.html;
      extraCss = json.css || '';
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
      const classAttrMatches = Array.from(line.matchAll(/\bclass(?:Name)?=["']([^"']+)["']/g));
      for (const m of classAttrMatches) {
        const tokens = m[1].split(/\s+/).filter(Boolean);
        for (const [legacy, modern] of Object.entries(LEGACY_MAP)) {
          if (tokens.includes(legacy)) {
            console.log(`  \x1b[33mLine ${idx + 1}:\x1b[0m Hallucinated/Legacy class "\x1b[31m${legacy}\x1b[0m". Suggested: "\x1b[32m${modern}\x1b[0m"`);
            issues++;
          }
        }
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
    for (const [legacy, modern] of Object.entries(LEGACY_MAP)) {
      const classAttrRegex = new RegExp(`(class(?:Name)?=["'][^"']*?)\\b${legacy}\\b([^"']*?["'])`, 'g');
      if (classAttrRegex.test(content)) {
        content = content.replace(classAttrRegex, (match, prefix, suffix) => {
          replacedCount++;
          return `${prefix}${modern}${suffix}`;
        });
      }
    }
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

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;

      // 1. Nested cards
      if (/<(?:div|section|article)[^>]*\bclass=["'][^"']*\bai-card\b[^"']*["'][^>]*>/i.test(line)) {
        let depth = 1;
        for (let j = idx + 1; j < Math.min(idx + 50, lines.length); j++) {
          if (/<(?:div|section|article)[^>]*\bclass=["'][^"']*\bai-card\b/i.test(lines[j])) {
            slopFindings.push({
              line: j + 1,
              category: 'Cardocalypse',
              tell: 'Nested card container detected inside parent .ai-card',
              fix: 'Flatten hierarchy: use whitespace (--ai-space-6) or hairline dividers instead of nesting cards.',
            });
            break;
          }
          if (/<\/(?:div|section|article)>/i.test(lines[j])) {
            depth--;
            if (depth <= 0) break;
          }
        }
      }

      // 2. Continuous pulsing dots
      if (/ai-pulse-dot\b/.test(line) && !/is-streaming|ai-pulse-dot-streaming/.test(line)) {
        slopFindings.push({
          line: lineNum,
          category: 'Pulsing Status Dots',
          tell: 'Continuous pulsing dot applied to static element',
          fix: 'Use calm, steady status pips (.ai-status-pip). Reserve motion exclusively for active data transmission.',
        });
      }

      // 3. Colored left-border stripes
      if (/border-left:\s*[2-9]px\s+solid/i.test(line)) {
        slopFindings.push({
          line: lineNum,
          category: 'Side-Tab Cards',
          tell: 'Thick colored vertical left-stripe detected',
          fix: 'Use a uniform 1px architectural border and a 6px status jewel pip.',
        });
      }

      // 4. Electric purple/cyan gradients
      if (/linear-gradient.*(#8b5cf6|#a855f7|#06b6d4|#3b82f6)/i.test(line)) {
        slopFindings.push({
          line: lineNum,
          category: 'AI Purple Gradients',
          tell: 'Saturated electric purple/cyan gradient detected',
          fix: 'Use a disciplined solid neutral background with tactile multi-stop elevation shadows.',
        });
      }

      // 5. Auto-scrolling marquees
      if (/ai-marquee\b/.test(line)) {
        slopFindings.push({
          line: lineNum,
          category: 'Auto-Scrolling Marquee',
          tell: 'Marquee text forces users to wait and read at the page pace',
          fix: 'Replace marquee with a clean, static, responsive framework badge rail.',
        });
      }

      // 6. Hallucinated legacy classes
      const legacyClasses = ['btn', 'btn-primary', 'flex', 'grid', 'card', 'badge', 'spinner'];
      const classAttrMatches = Array.from(line.matchAll(/\bclass(?:Name)?=["']([^"']+)["']/g));
      for (const m of classAttrMatches) {
        const tokens = m[1].split(/\s+/).filter(Boolean);
        for (const legacy of legacyClasses) {
          if (tokens.includes(legacy)) {
            slopFindings.push({
              line: lineNum,
              category: 'Unprefixed / Hallucinated Class',
              tell: `Class "${legacy}" without "ai-" prefix`,
              fix: `Use LLMCSS standard ".ai-${legacy}".`,
            });
          }
        }
      }

      // 7. Badge eyebrows directly above headings
      if (/<(?:span|div)[^>]*\bclass=["'][^"']*\b(?:ai-badge|ai-hero-badge)\b[^"']*["'][^>]*>/i.test(line) && !line.includes('ai-product-badge-float')) {
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

      // 8. Square grid backgrounds / AI graph paper patterns
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
      console.log('     Run `llmcss template blueprints` to inspect full-page recipes.\n');
      break;
    }

    if (sub === 'blueprints' || sub === 'blueprint-list') {
      console.log('\n✦ LLMCSS Page Composition Blueprints (4 Recipes)\n');
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
      console.log(found.html);
      break;
    }

    console.error(`Unknown template subcommand: "${sub}". Use \`llmcss template list\`, \`llmcss template get <id>\`, or \`llmcss template blueprint <name>\`.`);
    process.exit(1);
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
  llmcss template blueprints     List full-page composition blueprints / recipes
  llmcss template blueprint <id> Generate full assembled HTML for a page blueprint
  llmcss harness [archetype]     Output Design Direction Harness & agent prompt directives
  llmcss audit <file>            Run automated design quality audit on HTML/CSS file
  llmcss validate <file>         Check file for non-standard or hallucinated classes
  llmcss lint --fix <file>       Auto-migrate legacy or hallucinated classes to LLMCSS
  llmcss init                    Initialize LLMCSS configuration in project
  llmcss login <key>             Authenticate with your Pro license key
`);
    break;
  }
}
