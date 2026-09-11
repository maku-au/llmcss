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
import { components } from '../src/registry/data.mjs';
import { wireframeTemplates, pageBlueprints, assembleBlueprintHtml } from '../src/registry/templates-data.mjs';

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
    description: 'Search the LLMCSS component catalog by keyword, tag, or category.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keyword to match against name, tags, or description' },
        category: { type: 'string', enum: ['primitive', 'marketing', 'application', 'ecommerce'], description: 'Optional category filter' },
        tier: { type: 'string', enum: ['free', 'pro'], description: 'Filter by free or pro tier' },
      },
    },
  },
  {
    name: 'get_component_markup',
    description: 'Retrieve the semantic HTML markup, metadata, and CSS dependencies for a component.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Component ID (e.g. btn-variants, animated-loaders, stepper-flow)' },
      },
      required: ['id'],
    },
  },
  {
    name: 'validate_markup',
    description: 'Validate HTML markup to verify it conforms to LLMCSS standards and catch hallucinated classes.',
    inputSchema: {
      type: 'object',
      properties: {
        html: { type: 'string', description: 'HTML code snippet to validate' },
      },
      required: ['html'],
    },
  },
  {
    name: 'list_tokens',
    description: 'List LLMCSS design tokens including color variables, surface levels, radii scales, and spacing.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', enum: ['radii', 'surfaces', 'typography', 'motion', 'all'], description: 'Token group' },
      },
    },
  },
  {
    name: 'llmcss_get_harness',
    description: 'Retrieve the LLMCSS Design Direction Harness, 10 Anti-Slop laws, and specific archetype tokens for agents.',
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
    description: 'Retrieve clean semantic HTML markup and placement guidance for a specific wireframe section template.',
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
          enum: ['saas-landing', 'developer-tool', 'editorial-manifesto', 'dashboard-shell'],
          description: 'Blueprint recipe ID'
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
  'kpi': ['kpi-metric-cards'],
  'stat': ['kpi-metric-cards'],
  'stats': ['kpi-metric-cards'],
  'metric': ['kpi-metric-cards'],
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

const LEGACY_MAP = {
  'btn': 'ai-btn',
  'btn-primary': 'ai-btn-primary',
  'flex': 'ai-flex',
  'grid': 'ai-grid',
  'card': 'ai-card',
  'badge': 'ai-badge',
  'spinner': 'ai-spinner',
  'progress': 'ai-progress',
  'rounded-md': 'ai-rounded-md',
};

function handleToolCall(name, args = {}) {
  switch (name) {
    case 'search_components': {
      const q = (args.query || '').toLowerCase();
      const aliasTargets = ALIAS_MAP[q] || [];
      const results = components.filter((c) => {
        const matchesQ = !q || aliasTargets.includes(c.id) || c.id.includes(q) || c.name.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q));
        const matchesCat = !args.category || c.category === args.category;
        const matchesTier = !args.tier || c.tier === args.tier;
        return matchesQ && matchesCat && matchesTier;
      }).map(c => ({
        id: c.id,
        name: c.name,
        category: c.category,
        tier: c.tier,
        description: c.description,
        tags: c.tags,
      }));
      return {
        content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
      };
    }

    case 'get_component_markup': {
      const comp = components.find((c) => c.id === args.id);
      if (!comp) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Component "${args.id}" not found in the LLMCSS registry.` }],
        };
      }
      if (comp.tier === 'pro') {
        const token = mcpToken();
        if (token) {
          try {
            const origin = (process.env.LLMCSS_ORIGIN || 'https://llmcss.io').replace(/\/$/, '');
            const out = execFileSync('curl', [
              '-sS', '-L', '--max-time', '20',
              '-H', 'Accept: application/json',
              '-H', 'Authorization: Bearer ' + token,
              origin + '/r/pro/' + comp.id + '.json',
            ], { encoding: 'utf8' });
            return { content: [{ type: 'text', text: out }] };
          } catch {
            /* fall through to locked payload */
          }
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                id: comp.id,
                name: comp.name,
                category: comp.category,
                tier: 'pro',
                locked: true,
                description: comp.description,
                html: null,
                message: 'Pro source is not in the public catalog. Subscribe at https://llmcss.io then GET /r/pro/' + comp.id + '.json with Authorization: Bearer <token>.',
              }, null, 2),
            },
          ],
        };
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              id: comp.id,
              name: comp.name,
              category: comp.category,
              tier: comp.tier,
              description: comp.description,
              html: comp.html,
              webComponentHtml: comp.webComponentHtml || null,
            }, null, 2),
          },
        ],
      };
    }

    case 'validate_markup': {
      const html = args.html || '';
      const issues = [];
      for (const [legacy, modern] of Object.entries(LEGACY_MAP)) {
        const regex = new RegExp(`\\bclass(Name)?=["'][^"']*\\b${legacy}\\b[^"']*["']`);
        if (regex.test(html)) {
          issues.push({
            legacyClass: legacy,
            suggestedClass: modern,
            message: `Replace legacy/unprefixed class "${legacy}" with "${modern}".`,
          });
        }
      }
      if (/<(?:span|div)[^>]*\bclass=["'][^"']*\b(?:ai-badge|ai-hero-badge)\b[^"']*["'][^>]*>[\s\S]{0,250}<h[1-4]\b/i.test(html) && !html.includes('ai-product-badge-float')) {
        issues.push({
          rule: 'Anti-Eyebrow Law',
          message: 'Pill or badge eyebrow positioned directly above a title or heading. Remove the badge eyebrow and lead directly with confident typography.',
        });
      }
      if (/(?:linear-gradient\([^)]*(?:to right|90deg)[^)]*1px[\s\S]{0,100}linear-gradient\([^)]*(?:to bottom|0deg|180deg)[^)]*1px|\b(?:ai-bg-grid|bg-grid|grid-pattern|hero-grid)\b)/i.test(html)) {
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
              valid: issues.length === 0,
              issuesCount: issues.length,
              issues,
            }, null, 2),
          },
        ],
      };
    }

    case 'list_tokens': {
      const tokens = {
        radii: {
          '--ai-radius-xs': '2px',
          '--ai-radius-sm': '4px',
          '--ai-radius-md': '6px',
          '--ai-radius-lg': '8px',
          '--ai-radius-xl': '10px',
        },
        surfaces: {
          '--ai-surface-0': 'Base background',
          '--ai-surface-1': 'Recessed / Header surface',
          '--ai-surface-2': 'Subtle border / chip surface',
        },
        motion: {
          '--ai-ease-smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
          '--ai-ease-spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
          '--ai-duration-fast': '150ms',
          '--ai-duration-normal': '250ms',
        },
      };
      return {
        content: [{ type: 'text', text: JSON.stringify(tokens, null, 2) }],
      };
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
      const code = args.code || '';
      const lines = code.split('\n');
      const issues = [];

      lines.forEach((line, idx) => {
        const lineNum = idx + 1;
        if (/class=["'][^"']*\bai-card\b[^"']*["']/.test(line)) {
          const nextLines = lines.slice(idx + 1, idx + 15).join(' ');
          if (/class=["'][^"']*\bai-card\b[^"']*["']/.test(nextLines)) {
            issues.push({
              line: lineNum,
              category: 'Cardocalypse',
              tell: 'Nested card containers detected',
              fix: 'Flatten hierarchy: use whitespace (--ai-space-6) or hairline rules instead of nesting cards.',
            });
          }
        }
        if (/ai-pulse-dot\b/.test(line) && !/is-streaming|ai-pulse-dot-streaming/.test(line)) {
          issues.push({
            line: lineNum,
            category: 'Pulsing Status Dots',
            tell: 'Pulsing dot on static element',
            fix: 'Use calm, steady status pips (.ai-status-pip). Reserve motion for active streaming.',
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
        if (/ai-marquee\b/.test(line)) {
          issues.push({
            line: lineNum,
            category: 'Auto-Scrolling Marquee',
            tell: 'Marquee text forces users to wait and read at the page pace',
            fix: 'Replace marquee with a clean, static, responsive framework badge rail.',
          });
        }
        if (/<(?:span|div)[^>]*class=["'][^"']*\b(?:ai-badge|ai-hero-badge)\b[^"']*["'][^>]*>/i.test(line) && !line.includes('ai-product-badge-float')) {
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
        if (/class=["'][^"']*\b(?:ai-bg-grid|bg-grid|grid-pattern|hero-grid)\b[^"']*["']/i.test(line)) {
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

    if (method === 'initialize') {
      sendResponse(id, {
        protocolVersion: '2024-11-05',
        serverInfo: {
          name: 'llmcss-mcp-server',
          version: '0.1.0',
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
