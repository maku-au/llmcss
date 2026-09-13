#!/usr/bin/env node

/**
 * LLMCSS Model Context Protocol (MCP) Server
 * Stdio-based JSON-RPC 2.0 interface for AI assistants and autonomous agents
 */

import readline from 'readline';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { components } from '../src/registry/data.mjs';
import { wireframeTemplates, pageBlueprints, assembleBlueprintHtml } from '../src/registry/templates-data.mjs';
import { validateMarkup, structuralAudit } from '../src/registry/validate.mjs';
import { resolveRef, refHtml, variantSummary } from '../src/registry/resolve.mjs';

// The server reports the package version, never a hand-typed one.
const PKG_VERSION = JSON.parse(
  fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../package.json'), 'utf8')
).version;

// Manifests generated at build time from the CSS (public/*.json). When running
// from a checkout they are read from disk; otherwise fetched from the origin.
function readManifest(name) {
  try {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const local = path.resolve(here, '../public', name);
    if (fs.existsSync(local)) return JSON.parse(fs.readFileSync(local, 'utf8'));
  } catch { /* fall through */ }
  try {
    const origin = (process.env.LLMCSS_ORIGIN || 'https://llmcss.io').replace(/\/$/, '');
    const out = execFileSync('curl', ['-sS', '-L', '--max-time', '15', origin + '/' + name], { encoding: 'utf8' });
    return JSON.parse(out);
  } catch {
    return null;
  }
}
function manifestMissing(name) {
  return { isError: true, content: [{ type: 'text', text: 'Manifest ' + name + ' is not available locally or at the origin.' }] };
}

function mcpFetchPro(id) {
  const token = mcpToken();
  if (!token) return null;
  try {
    const origin = (process.env.LLMCSS_ORIGIN || 'https://llmcss.io').replace(/\/$/, '');
    const out = execFileSync('curl', [
      '-sS', '-L', '--max-time', '20',
      '-H', 'Accept: application/json',
      '-H', 'Authorization: Bearer ' + token,
      origin + '/r/pro/' + id + '.json',
    ], { encoding: 'utf8' });
    return out;
  } catch {
    return null;
  }
}

function mcpLockedPayload(id, extra = {}) {
  return JSON.stringify({
    id,
    tier: 'pro',
    locked: true,
    html: null,
    message: 'Pro source is not in the public catalog. Subscribe at https://llmcss.io then GET /r/pro/' + id + '.json with Authorization: Bearer <token>.',
    ...extra,
  }, null, 2);
}

function mcpToken() {
  if (process.env.LLMCSS_TOKEN) return process.env.LLMCSS_TOKEN;
  if (process.env.CSSAI_API_KEY) return process.env.CSSAI_API_KEY;
  for (const p of [
    path.join(os.homedir(), '.llmcss', 'config.json'),
    path.join(os.homedir(), '.cssai', 'config.json'),
  ]) {
    if (!fs.existsSync(p)) continue;
    try {
      const cfg = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (cfg.token) return cfg.token;
    } catch {
      /* ignore */
    }
  }
  return '';
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const TOOLS = [
  {
    name: 'search_components',
    description: 'Search the LLMCSS component catalog by keyword, tag, category, or layout variant name. Every row carries a compact variants array of the layout alternatives that component ships, each addressable as "id:variant" in get_component_markup, so discovery needs no second call. Every catalog component is free and MIT; Pro is themed section templates and page kits, searched with list_wireframe_templates.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keyword to match against name, tags, description, or a layout variant name' },
        category: { type: 'string', enum: ['primitive', 'marketing', 'application', 'ecommerce'], description: 'Optional category filter' },
      },
    },
  },
  {
    name: 'get_component_markup',
    description: 'Retrieve the semantic HTML markup, metadata, and CSS dependencies for a component. Components with more than one layout expose them as variants: pass id "hero-split:centered", or id "hero-split" with variant "centered". Omit variant for the default layout. The response always lists the sibling variants. Every component is free and MIT, so no license token is ever needed here.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Component ID (e.g. btn-variants, animated-loaders, stepper-flow) or a variant reference (hero-split:centered)' },
        variant: { type: 'string', description: 'Layout variant id, for example centered. Alternative to writing id as "hero-split:centered".' },
      },
      required: ['id'],
    },
  },
  {
    name: 'validate_markup',
    description: 'Validate HTML markup to verify it conforms to LLMCSS standards and catch hallucinated classes. Class names carry no prefix, so a class the library does not define is reported as a warning (it may be the project\'s own); renamed classes still carrying the removed ai- prefix are errors.',
    inputSchema: {
      type: 'object',
      properties: {
        html: { type: 'string', description: 'HTML code snippet to validate' },
        strict: { type: 'boolean', description: 'Treat unknown class names as errors instead of warnings (default false)' },
      },
      required: ['html'],
    },
  },
  {
    name: 'list_tokens',
    description: 'List every --ai-* design token with its value per context (light, dark, each skin, focus presets). Generated from tokens.css at build time. Filter by group: color, space, radius, shadow, typography, motion, focus, all.',
    inputSchema: {
      type: 'object',
      properties: {
        group: { type: 'string', enum: ['color', 'space', 'radius', 'shadow', 'typography', 'motion', 'focus', 'all'], description: 'Token group (default all)' },
        context: { type: 'string', description: 'Return only this context value, e.g. light, dark, obsidian, executive:dark (default: all contexts)' },
      },
    },
  },
  {
    name: 'list_classes',
    description: 'List every class that exists in llmcss.css, with its family (spacing, sizing, typography, flex, grid, buttons, cards, ...) and which responsive (sm/md/lg/xl) and container-query (cq) prefixes exist for it. Use this instead of guessing class names.',
    inputSchema: {
      type: 'object',
      properties: {
        family: { type: 'string', description: 'Filter by family, e.g. spacing, sizing, typography, flex, grid, display, position, borders, effects, interaction, layout, buttons, inputs, cards, badges, tables, marketing, dashboard' },
        prefix: { type: 'string', description: 'Filter classes starting with this text, e.g. btn or text-' },
      },
    },
  },
  {
    name: 'list_states',
    description: 'List every is-* state class (and which components use it) plus every data-ai-* attribute the library and runtime understand, with allowed values and what they do.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'llmcss_get_harness',
    description: 'Retrieve the LLMCSS Design Direction Harness, 11 Anti-Slop laws, and specific archetype tokens for agents.',
    inputSchema: {
      type: 'object',
      properties: {
        archetype: { type: 'string', enum: ['executive', 'fintech', 'obsidian', 'editorial', 'all'], description: 'Design archetype' },
      },
    },
  },
  {
    name: 'cssai_get_harness',
    description: 'Alias of llmcss_get_harness.',
    inputSchema: {
      type: 'object',
      properties: {
        archetype: { type: 'string', enum: ['executive', 'fintech', 'obsidian', 'editorial', 'all'], description: 'Design archetype' },
      },
    },
  },
  {
    name: 'llmcss_slop_audit',
    description: 'Audit HTML and CSS code against design quality anti-patterns (nested cards, pulsing dots, colored left borders, purple gradients, etc.).',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'HTML/CSS code snippet to analyze for AI design slop' },
      },
      required: ['code'],
    },
  },
  {
    name: 'cssai_slop_audit',
    description: 'Alias of llmcss_slop_audit.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'HTML/CSS code snippet to analyze for AI design slop' },
      },
      required: ['code'],
    },
  },
  {
    name: 'list_wireframe_templates',
    description: 'List available wireframe section templates with structured layout and placement guidance.',
    inputSchema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          enum: ['header', 'hero', 'features', 'social-proof', 'comparison', 'pricing', 'faq', 'cta', 'footer', 'app-shell', 'all'],
          description: 'Filter by page section category'
        },
      },
    },
  },
  {
    name: 'get_wireframe_template',
    description: 'Retrieve clean semantic HTML markup and placement guidance for a section template. Themed Pro ids (themed-*) need a license token; this is the only path to themed markup, including themed-editorial-article-header, themed-fintech-ledger-row and themed-obsidian-status-rail.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Wireframe section template ID (e.g. wireframe-hero-split, wireframe-pricing-tiers)' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_page_blueprint',
    description: 'Retrieve a complete, assembled multi-section page blueprint (saas-landing, developer-tool, editorial-manifesto, dashboard-shell).',
    inputSchema: {
      type: 'object',
      properties: {
        blueprint: {
          type: 'string',
          description: 'Blueprint recipe ID (free: saas-landing, developer-tool, editorial-manifesto, dashboard-shell; Pro kits: kit-obsidian-saas, kit-fintech-dashboard)'
        },
      },
      required: ['blueprint'],
    },
  },
];

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

function handleToolCall(name, args = {}) {
  switch (name) {
    case 'search_components': {
      const q = (args.query || '').toLowerCase();
      const aliasTargets = ALIAS_MAP[q] || [];
      // A query can name a layout rather than a component, so variants match
      // too, and every row carries its variants: discovery costs no extra call.
      const variantMatch = (c) =>
        (c.variants || []).some(
          (v) => v.id.includes(q) || v.name.toLowerCase().includes(q) || v.description.toLowerCase().includes(q)
        );
      const results = components.filter((c) => {
        const matchesQ = !q || aliasTargets.includes(c.id) || c.id.includes(q) || c.name.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q)) || variantMatch(c);
        const matchesCat = !args.category || c.category === args.category;
        return matchesQ && matchesCat;
      }).map(c => ({
        id: c.id,
        name: c.name,
        category: c.category,
        tier: c.tier,
        description: c.description,
        tags: c.tags,
        variants: variantSummary(c),
      }));
      return {
        content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
      };
    }

    case 'get_component_markup': {
      // "hero-split:centered" and id "hero-split" plus variant "centered" are
      // the same request. One resolver, shared with the CLI and the catalog.
      const ref = args.variant ? `${args.id}:${args.variant}` : args.id;
      const hit = resolveRef(components, ref);
      if (!hit) {
        const cut = typeof ref === 'string' ? ref.lastIndexOf(':') : -1;
        const parent = cut > 0 ? components.find((c) => c.id === ref.slice(0, cut)) : null;
        if (parent) {
          // A model recovers from a list and does not recover from "not found".
          const list = (parent.variants || []).map((v) => v.id);
          return {
            isError: true,
            content: [{
              type: 'text',
              text: list.length
                ? `Component "${parent.id}" has no variant "${ref.slice(cut + 1)}". Variants: ${list.join(', ')}.`
                : `Component "${parent.id}" has one layout, so omit the variant argument.`,
            }],
          };
        }
        // Themed ids are section templates, not components. Point the caller
        // at the tool that can actually resolve them.
        const asTemplate = wireframeTemplates.find((t) => t.id === args.id);
        if (asTemplate) {
          return {
            isError: true,
            content: [{ type: 'text', text: `"${args.id}" is a section template, not a component. Call get_wireframe_template with that id.` }],
          };
        }
        return {
          isError: true,
          content: [{ type: 'text', text: `Component "${args.id}" not found in the LLMCSS registry.` }],
        };
      }
      const comp = hit.component;
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              id: comp.id,
              variant: hit.variant ? hit.variant.id : null,
              name: comp.name,
              category: comp.category,
              tier: comp.tier,
              description: hit.variant ? hit.variant.description : comp.description,
              guidance: hit.variant ? hit.variant.guidance : undefined,
              html: refHtml(hit),
              webComponentHtml: (hit.variant ? hit.variant.webComponentHtml : comp.webComponentHtml) || null,
              variants: variantSummary(comp),
            }, null, 2),
          },
        ],
      };
    }

    case 'validate_markup': {
      const html = args.html || '';
      const strict = args.strict === true;
      // Token-exact checks: every class token against classes.json, is-* states
      // against states.json, and any stale ai- prefix on a renamed class.
      const result = validateMarkup(html, { strict });
      const issues = result.issues.map((i) => ({
        ...i,
        legacyClass: i.type === 'legacy-class' || i.type === 'legacy-prefix' ? i.class : undefined,
        suggestedClass: i.suggestion,
      }));
      if (/<(?:span|div)[^>]*\bclass=["'][^"']*\b(?:badge|hero-badge)\b[^"']*["'][^>]*>[\s\S]{0,250}<h[1-4]\b/i.test(html) && !html.includes('product-badge-float')) {
        issues.push({
          rule: 'Anti-Eyebrow Law',
          message: 'Pill or badge eyebrow positioned directly above a title or heading. Remove the badge eyebrow and lead directly with confident typography.',
        });
      }
      if (/(?:linear-gradient\([^)]*(?:to right|90deg)[^)]*1px[\s\S]{0,100}linear-gradient\([^)]*(?:to bottom|0deg|180deg)[^)]*1px|\b(?:bg-grid|grid-pattern|hero-grid)\b)/i.test(html)) {
        issues.push({
          rule: 'Anti-Grid-Pattern Law',
          message: 'Square grid background pattern or class detected. Eliminate graph paper grids; use clean solid surfaces.',
        });
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              valid: issues.every((i) => i.severity !== 'error'),
              issuesCount: issues.length,
              errors: issues.filter((i) => i.severity === 'error').length,
              warnings: issues.filter((i) => i.severity === 'warning').length,
              issues,
            }, null, 2),
          },
        ],
      };
    }

    case 'list_tokens': {
      const data = readManifest('tokens.json');
      if (!data) return manifestMissing('tokens.json');
      const group = (args.group || 'all').toLowerCase();
      const groupOf = (t) => {
        if (/^--ai-(space|touch)/.test(t)) return 'space';
        if (/^--ai-radius/.test(t)) return 'radius';
        if (/^--ai-shadow/.test(t)) return 'shadow';
        if (/^--ai-(font|text-(xs|sm|base|lg|xl))/.test(t)) return 'typography';
        if (/^--ai-(ease|duration)/.test(t)) return 'motion';
        if (/^--ai-(focus|tap)/.test(t)) return 'focus';
        return 'color';
      };
      let tokens = data.tokens.filter((t) => group === 'all' || groupOf(t.token) === group);
      if (args.context) tokens = tokens.map((t) => ({ token: t.token, value: t.values[args.context] })).filter((t) => t.value !== undefined);
      return { content: [{ type: 'text', text: JSON.stringify({ generatedAt: data.generatedAt, note: data.note, count: tokens.length, tokens }, null, 2) }] };
    }

    case 'list_classes': {
      const data = readManifest('classes.json');
      if (!data) return manifestMissing('classes.json');
      let list = data.classes;
      if (args.family) list = list.filter((c) => c.family === String(args.family).toLowerCase());
      if (args.prefix) list = list.filter((c) => c.class.startsWith(String(args.prefix)));
      return { content: [{ type: 'text', text: JSON.stringify({ generatedAt: data.generatedAt, note: data.note, families: data.stats.families, count: list.length, classes: list }, null, 2) }] };
    }

    case 'list_states': {
      const data = readManifest('states.json');
      if (!data) return manifestMissing('states.json');
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }

    case 'llmcss_get_harness':
    case 'cssai_get_harness': {
      const archKey = (args.archetype || 'all').toLowerCase();
      const HARNESS_DATA = {
        laws: [
          'Law 1: Never nest containers (eliminate Cardocalypse). Use whitespace or subtle dividers.',
          'Law 2: Never pulse static status dots. Reserve motion exclusively for active telemetry.',
          'Law 3: Never use thick colored left-border stripes (side-tabs). Use 1px borders with jewel pips.',
          'Law 4: Never use electric purple/cyan halos or radial glows. Use physical multi-stop shadow offsets.',
          'Law 5: Never stamp formulaic uppercase monospace eyebrows above headlines.',
          'Law 6: Never crush letter-spacing below -0.04em or justify body text.',
          'Law 7: Never place low-contrast gray text on colored backgrounds (WCAG AA 4.5:1 min).',
          'Law 8: Never create flat, identical 4-card metric grids. Establish a dominant primary anchor.',
          'Law 9: Never auto-scroll text or marquees. Render static, responsive badge rails.',
          'Law 10: Always theme native browser surfaces (caret-color, selection, custom scrollbars, tabular-nums).',
          'Law 11: Never use square graph paper or blueprint grid backgrounds. Lead with solid surfaces and disciplined physical borders.',
        ],
        archetypes: {
          executive: {
            name: 'Executive Slate',
            tokens: {
              '--ai-font-sans': "'IBM Plex Sans', system-ui, sans-serif",
              '--ai-font-display': "'Sora', 'IBM Plex Sans', sans-serif",
              '--ai-radius-base': '4px',
              '--ai-accent': '#2563eb',
              '--ai-bg': '#f8fafc',
              '--ai-surface-0': '#ffffff',
              '--ai-surface-1': '#f1f5f9',
            },
          },
          fintech: {
            name: 'Fintech Titanium',
            tokens: {
              '--ai-font-sans': "'DM Sans', system-ui, sans-serif",
              '--ai-radius-base': '6px',
              '--ai-accent': '#0f766e',
              '--ai-success': '#059669',
              '--ai-bg': '#f8f8f6',
              '--ai-surface-0': '#ffffff',
            },
          },
          obsidian: {
            name: 'Obsidian Minimal',
            tokens: {
              '--ai-font-display': "'Sora', sans-serif",
              '--ai-font-sans': "'DM Sans', system-ui, sans-serif",
              '--ai-font-mono': "'IBM Plex Mono', monospace",
              '--ai-radius-base': '2px',
              '--ai-accent': '#ededed',
              '--ai-bg': '#000000',
              '--ai-surface-0': '#0a0a0a',
            },
          },
          editorial: {
            name: 'Editorial Atelier',
            tokens: {
              '--ai-font-serif': "'Newsreader', Georgia, serif",
              '--ai-font-display': "'Newsreader', Georgia, serif",
              '--ai-radius-base': '3px',
              '--ai-accent': '#8c4a27',
              '--ai-bg': '#faf8f5',
              '--ai-surface-0': '#ffffff',
            },
          },
        },
      };

      if (archKey !== 'all' && HARNESS_DATA.archetypes[archKey]) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              archetype: HARNESS_DATA.archetypes[archKey],
              antiSlopLaws: HARNESS_DATA.laws,
            }, null, 2),
          }],
        };
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(HARNESS_DATA, null, 2) }],
      };
    }

    case 'llmcss_slop_audit':
    case 'cssai_slop_audit': {
      const code = args.code || args.html || '';
      const lines = code.split('\n');
      const issues = structuralAudit(code).map((i) => ({ line: 0, category: i.category, tell: i.message, fix: i.category === 'Cardocalypse' ? 'Flatten hierarchy: use whitespace (--ai-space-6) or hairline rules instead of nesting cards.' : 'Use calm, steady status pips (.status-pip). Reserve motion for .is-streaming.' }));

      lines.forEach((line, idx) => {
        const lineNum = idx + 1;
        if (/(?<![\w-])pulse-dot(?![\w-])/.test(line) && !/is-streaming|pulse-dot-streaming/.test(line)) {
          issues.push({
            line: lineNum,
            category: 'Pulsing Status Dots',
            tell: 'Pulsing dot on static element',
            fix: 'Use calm, steady status pips (.status-pip). Reserve motion for active streaming.',
          });
        }
        if (/border-left:\s*[2-9]px\s+solid/i.test(line)) {
          issues.push({
            line: lineNum,
            category: 'Side-Tab Cards',
            tell: 'Colored vertical left-stripe detected',
            fix: 'Use a uniform 1px architectural border and a 6px status jewel pip.',
          });
        }
        if (/linear-gradient.*(#8b5cf6|#a855f7|#06b6d4|#3b82f6)/i.test(line)) {
          issues.push({
            line: lineNum,
            category: 'AI Purple Gradients',
            tell: 'Saturated purple/cyan gradient detected',
            fix: 'Use a solid neutral surface with multi-stop elevation shadows.',
          });
        }
        if (/(?<![\w-])marquee(?![\w-])/.test(line)) {
          issues.push({
            line: lineNum,
            category: 'Auto-Scrolling Marquee',
            tell: 'Marquee text forces users to wait and read at the page pace',
            fix: 'Replace marquee with a clean, static, responsive framework badge rail.',
          });
        }
        if (/<(?:span|div)[^>]*class=["'][^"']*\b(?:badge|hero-badge)\b[^"']*["'][^>]*>/i.test(line) && !line.includes('product-badge-float')) {
          const nextLines = lines.slice(idx + 1, idx + 5).join(' ');
          if (/<h[1-4]\b/i.test(nextLines)) {
            issues.push({
              line: lineNum,
              category: 'Badge Eyebrow Over Heading',
              tell: 'Pill/badge eyebrow positioned directly above a title or heading',
              fix: 'Remove the badge eyebrow container. Lead directly with confident, human-crafted typography.',
            });
          }
        }
        if (/background-size:\s*\d+px\s+\d+px/i.test(line) ||
            /linear-gradient\([^)]*(?:to right|90deg)[^)]*1px/i.test(line)) {
          const surrounding = lines.slice(Math.max(0, idx - 4), Math.min(lines.length, idx + 5)).join(' ');
          if (/linear-gradient\([^)]*(?:to right|90deg)/i.test(surrounding) &&
              /linear-gradient\([^)]*(?:to bottom|0deg|180deg)/i.test(surrounding)) {
            issues.push({
              line: lineNum,
              category: 'Square Grid Background',
              tell: 'Synthetic square grid / graph paper background pattern detected',
              fix: 'Eliminate square grid patterns. Lead with clean solid surfaces (var(--ai-surface-0), var(--ai-bg)) and subtle 1px hairline borders.',
            });
          }
        }
        if (/class=["'][^"']*\b(?:bg-grid|grid-pattern|hero-grid)\b[^"']*["']/i.test(line)) {
          issues.push({
            line: lineNum,
            category: 'Square Grid Background Class',
            tell: 'Square grid background utility class detected',
            fix: 'Remove grid pattern class. Use solid surfaces.',
          });
        }
      });

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            clean: issues.length === 0,
            issuesCount: issues.length,
            issues,
          }, null, 2),
        }],
      };
    }

    case 'list_wireframe_templates': {
      const sec = args.section || 'all';
      const list = wireframeTemplates.filter((t) => sec === 'all' || t.section === sec).map((t) => ({
        id: t.id,
        name: t.name,
        section: t.section,
        tier: t.tier,
        placement: t.placement,
        guidance: t.guidance,
      }));
      return {
        content: [{ type: 'text', text: JSON.stringify(list, null, 2) }],
      };
    }

    case 'get_wireframe_template': {
      const id = args.id;
      const found = wireframeTemplates.find(
        (t) => t.id === id || t.id === `wireframe-${id}` || t.id.replace('wireframe-', '') === id
      );
      if (!found) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Wireframe template "${id}" not found.` }],
        };
      }
      if (found.tier === 'pro') {
        const out = mcpFetchPro(found.id);
        if (out) return { content: [{ type: 'text', text: out }] };
        return {
          content: [{
            type: 'text',
            text: mcpLockedPayload(found.id, { name: found.name, section: found.section, placement: found.placement }),
          }],
        };
      }
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            id: found.id,
            name: found.name,
            section: found.section,
            placement: found.placement,
            guidance: found.guidance,
            html: found.html,
          }, null, 2),
        }],
      };
    }

    case 'get_page_blueprint': {
      const bpId = args.blueprint;
      const bp = pageBlueprints.find((b) => b.id === bpId);
      if (!bp) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Blueprint "${bpId}" not found. Available: ${pageBlueprints.map((b) => b.id).join(', ')}` }],
        };
      }
      if (bp.tier === 'pro') {
        const out = mcpFetchPro(bp.id);
        if (out) return { content: [{ type: 'text', text: out }] };
        return {
          content: [{
            type: 'text',
            text: mcpLockedPayload(bp.id, { name: bp.name, description: bp.description, sections: bp.sections }),
          }],
        };
      }
      const html = assembleBlueprintHtml(bpId);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            id: bp.id,
            name: bp.name,
            description: bp.description,
            recommendedFor: bp.recommendedFor,
            sections: bp.sections,
            html,
          }, null, 2),
        }],
      };
    }

    default:
      return {
        isError: true,
        content: [{ type: 'text', text: `Unknown tool: ${name}` }],
      };
  }
}

function sendResponse(id, result, error) {
  const response = { jsonrpc: '2.0', id };
  if (error) {
    response.error = error;
  } else {
    response.result = result;
  }
  process.stdout.write(JSON.stringify(response) + '\n');
}

rl.on('line', (line) => {
  if (!line.trim()) return;
  try {
    const message = JSON.parse(line);
    const { id, method, params } = message;
    if (id === undefined || id === null) return; // JSON-RPC notification: never respond

    if (method === 'initialize') {
      sendResponse(id, {
        protocolVersion: '2024-11-05',
        serverInfo: {
          name: 'llmcss-mcp-server',
          version: PKG_VERSION,
        },
        capabilities: {
          tools: {},
        },
      });
    } else if (method === 'tools/list') {
      sendResponse(id, { tools: TOOLS });
    } else if (method === 'tools/call') {
      const result = handleToolCall(params?.name, params?.arguments);
      sendResponse(id, result);
    } else if (method === 'ping') {
      sendResponse(id, {});
    } else {
      sendResponse(id, null, { code: -32601, message: `Method not found: ${method}` });
    }
  } catch (err) {
    sendResponse(null, null, { code: -32700, message: `Parse error: ${err.message}` });
  }
});
