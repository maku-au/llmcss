import assert from 'assert';
import { components } from '../src/registry/data.mjs';
import { wireframeTemplates, pageBlueprints, assembleBlueprintHtml } from '../src/registry/templates-data.mjs';
import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

console.log('🧪 Starting LLMCSS Comprehensive Test Suite...\n');

// Test 1: Registry Integrity & Component Expansion
console.log('1. Verifying Registry Schema & Component Integrity (37 components)...');
assert(components.length >= 35, `Expected at least 35 components, found ${components.length}`);

const ids = new Set();
for (const comp of components) {
  assert(!ids.has(comp.id), `Duplicate component ID: ${comp.id}`);
  ids.add(comp.id);

  assert(comp.name && comp.name.length > 0, `Missing name for ${comp.id}`);
  assert(comp.description, `Missing description for ${comp.id}`);
  assert(['primitive', 'marketing', 'application', 'ecommerce'].includes(comp.category), `Invalid category for ${comp.id}`);
  assert(['free', 'pro'].includes(comp.tier), `Invalid tier for ${comp.id}`);
  assert(Array.isArray(comp.tags) && comp.tags.length > 0, `Missing tags for ${comp.id}`);
  assert(comp.html && comp.html.length > 10, `Missing HTML for ${comp.id}`);
}

// Check newly added motion & competitive components
const expectedNew = [
  'animated-loaders',
  'progress-bars',
  'interactive-slider',
  'skeleton-card',
  'stepper-flow',
  'segmented-toggle',
  'popover-anchor',
  'toast-stack',
  'marquee-ticker',
  'filter-toolbar',
  'mobile-nav-drawer',
  'mobile-nav-dropdown',
  'bento-editorial-pro',
  'pricing-matrix-pro',
  'chat-thread',
];
for (const id of expectedNew) {
  assert(ids.has(id), `Missing expected new component: ${id}`);
}
console.log(`✓ Verified ${components.length} components integrity, including all 13 motion & competitive components.`);

// Test 2: CLI Functionality & Search
console.log('\n2. Testing CLI Commands (list, search, info)...');
const listOut = execSync('node bin/cssai.mjs list', { encoding: 'utf-8' });
assert(listOut.includes('LLMCSS Component Catalog'), 'CLI list failed');
assert(listOut.includes('[FREE]'), 'CLI missing FREE tags');
assert(listOut.includes('[PRO]'), 'CLI missing PRO tags');
assert(listOut.includes('animated-loaders'), 'CLI missing animated-loaders');
assert(listOut.includes('bento-editorial-pro'), 'CLI missing bento-editorial-pro');
console.log('✓ CLI `llmcss list` passed.');

const searchOut = execSync('node bin/cssai.mjs search spinner', { encoding: 'utf-8' });
assert(searchOut.includes('animated-loaders'), 'CLI search failed to find spinner');
console.log('✓ CLI `llmcss search spinner` passed.');

const infoOut = execSync('node bin/cssai.mjs info progress-bars', { encoding: 'utf-8' });
const parsedInfo = JSON.parse(infoOut);
assert(parsedInfo.id === 'progress-bars', 'CLI info failed');
console.log('✓ CLI `llmcss info progress-bars` passed.');

// Test 3: CLI Validate and Lint --fix
console.log('\n3. Testing CLI Validation and Auto-Fix Linter...');
const tempTestFile = path.resolve('test-sample.html');
fs.writeFileSync(
  tempTestFile,
  `<div class="ai-flex ai-items-center ai-justify-between ai-card">\n  <button class="ai-btn ai-btn-primary">Submit</button>\n  <div class="my-own-widget"></div>\n</div>`,
  'utf-8'
);

try {
  // Validate should fail on classes still carrying the removed ai- prefix
  execSync(`node bin/cssai.mjs validate ${tempTestFile}`, { encoding: 'utf-8', stdio: 'pipe' });
  assert.fail('Expected validate to fail on legacy classes');
} catch (err) {
  assert(err.status === 1, 'Validate correctly caught legacy/hallucinated classes');
  console.log('✓ `llmcss validate` detected stale ai- prefixed classes.');
}

// Lint with --fix should upgrade classes to LLMCSS library names
const lintOut = execSync(`node bin/cssai.mjs lint --fix ${tempTestFile}`, { encoding: 'utf-8' });
assert(lintOut.includes('Fixed'), 'Lint fix failed');
const fixedContent = fs.readFileSync(tempTestFile, 'utf-8');
assert(!fixedContent.includes('ai-'), 'Stale prefix survived lint --fix');
assert(fixedContent.includes('class="flex items-center justify-between card"'), 'Missing migrated layout classes in fixed output');
assert(fixedContent.includes('btn btn-primary'), 'Missing btn-primary in fixed output');
assert(fixedContent.includes('my-own-widget'), 'Own class must survive lint --fix');
// A file with only unknown classes is a warning, not a failure, unless --strict
execSync(`node bin/cssai.mjs validate ${tempTestFile}`, { encoding: 'utf-8', stdio: 'pipe' });
try {
  execSync(`node bin/cssai.mjs validate --strict ${tempTestFile}`, { encoding: 'utf-8', stdio: 'pipe' });
  assert.fail('Expected --strict to fail on an unknown class');
} catch (err) {
  assert(err.status === 1, '--strict correctly rejects unknown classes');
}
console.log('✓ `llmcss lint --fix` successfully migrated hallucinated classes to LLMCSS standard.');

// Clean up temp test file
fs.unlinkSync(tempTestFile);

// Test 4: Stdio MCP Server Protocol
console.log('\n4. Testing Stdio MCP Server (JSON-RPC 2.0)...');
const mcpInitReq = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} }) + '\n';
const mcpToolsReq = JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }) + '\n';
const mcpHarnessReq = JSON.stringify({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'cssai_get_harness', arguments: { archetype: 'fintech' } } }) + '\n';
const mcpAuditReq = JSON.stringify({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'cssai_slop_audit', arguments: { code: '<span class="pulse-dot"></span>' } } }) + '\n';
const mcpInput = mcpInitReq + mcpToolsReq + mcpHarnessReq + mcpAuditReq;
const mcpOutput = execSync('node bin/cssai-mcp.mjs', { input: mcpInput, encoding: 'utf-8' });

assert(mcpOutput.includes('llmcss-mcp-server'), 'MCP server failed initialize');
assert(mcpOutput.includes('search_components'), 'MCP server missing search_components tool');
assert(mcpOutput.includes('get_component_markup'), 'MCP server missing get_component_markup tool');
assert(mcpOutput.includes('validate_markup'), 'MCP server missing validate_markup tool');
assert(mcpOutput.includes('list_tokens'), 'MCP server missing list_tokens tool');
assert(mcpOutput.includes('cssai_get_harness'), 'MCP server missing cssai_get_harness tool');
assert(mcpOutput.includes('cssai_slop_audit'), 'MCP server missing cssai_slop_audit tool');
assert(mcpOutput.includes('Fintech Titanium'), 'MCP cssai_get_harness failed to return Fintech Titanium');
assert(mcpOutput.includes('Pulsing Status Dots'), 'MCP cssai_slop_audit failed to detect pulsing dot');
console.log('✓ Stdio MCP server passed JSON-RPC initialization, tool discovery, harness retrieval, and slop audit.');

// Test 5: Pro Gate Verification
console.log('\n5. Testing Monetization Pro Gate in CLI...');
const tmpAdd = fs.mkdtempSync(path.join(os.tmpdir(), 'llmcss-add-'));
try {
  execSync(`node ${path.resolve('bin/cssai.mjs')} add bento-editorial-pro`, {
    encoding: 'utf-8',
    stdio: 'pipe',
    cwd: tmpAdd,
  });
  const outFile = path.join(tmpAdd, 'components', 'marketing', 'bento-editorial-pro.html');
  assert(fs.existsSync(outFile), 'Expected former Pro component to install without a token');
  const html = fs.readFileSync(outFile, 'utf-8');
  assert(!html.includes('Unlock Pro'), 'Former Pro markup should not be the locked card');
  console.log('✓ CLI installs former Pro components without a license.');
} finally {
  fs.rmSync(tmpAdd, { recursive: true, force: true });
}
try {
  execSync('node bin/cssai.mjs add themed-editorial-article-header', { encoding: 'utf-8', stdio: 'pipe' });
  assert.fail('Expected themed Pro installation without license to fail');
} catch (err) {
  assert(err.status === 1, 'Expected exit code 1 on unlicensed themed Pro install');
  const msg = String(err.stderr || err.stdout || '');
  assert(/PRO/i.test(msg), 'Unlicensed themed add should mention Pro');
  console.log('✓ CLI correctly blocked unlicensed themed Pro installation.');
}

// Test 6: CSS Engine Modern Capabilities (Container Queries & Animations)
console.log('\n6. Testing CSS Architecture (Container Queries & Motion Tokens)...');
const utilitiesCss = fs.readFileSync('src/css/utilities.css', 'utf-8');
assert(utilitiesCss.includes('.cq'), 'Missing .cq in utilities.css');
assert(utilitiesCss.includes('@container'), 'Missing @container in utilities.css');
assert(utilitiesCss.includes('.grid-auto-fit'), 'Missing .grid-auto-fit in utilities.css');
assert(utilitiesCss.includes('.subgrid-rows'), 'Missing .subgrid-rows in utilities.css');

const animationsCss = fs.readFileSync('src/css/animations.css', 'utf-8');
assert(animationsCss.includes('.spinner'), 'Missing .spinner in animations.css');
assert(animationsCss.includes('.progress-indeterminate'), 'Missing .progress-indeterminate in animations.css');
assert(animationsCss.includes('.slider'), 'Missing .slider in animations.css');
assert(animationsCss.includes('.skeleton'), 'Missing .skeleton in animations.css');
assert(animationsCss.includes('.marquee'), 'Missing .marquee in animations.css');
assert(animationsCss.includes('prefers-reduced-motion'), 'Missing prefers-reduced-motion in animations.css');
console.log('✓ Verified Container Queries, Intrinsic Auto-Fit Grids, and Motion Engine.');

// Test 7: Registry JSON Build Output
console.log('\n7. Testing public/registry.json build artifact...');
assert(fs.existsSync('public/registry.json'), 'Missing public/registry.json');
const registryJson = JSON.parse(fs.readFileSync('public/registry.json', 'utf-8'));
assert(registryJson.stats.total === components.length, 'Registry JSON total mismatch');
assert(registryJson.stats.pro === components.filter((c) => c.tier === 'pro').length, 'Registry JSON pro count mismatch');
assert(registryJson.stats.pro >= 3, 'Registry JSON should list themed Pro components');
const bento = components.find((c) => c.id === 'bento-editorial-pro');
assert(bento && bento.tier === 'free', 'bento-editorial-pro should be free');
const split = components.find((c) => c.id === 'split-pane');
assert(split && !/<script/i.test(split.html), 'split-pane HTML must not include an inline script');
const commandCss = fs.readFileSync('src/css/components/command.css', 'utf-8');
assert(commandCss.includes('.command-palette'), 'Missing .command-palette in command.css');
const chatCss = fs.readFileSync('src/css/components/chat.css', 'utf-8');
assert(chatCss.includes('.chat-container'), 'Missing .chat-container in chat.css');
const cartCss = fs.readFileSync('src/css/components/cart.css', 'utf-8');
assert(cartCss.includes('.cart-item'), 'Missing .cart-item in cart.css');
const agentCss = fs.readFileSync('src/css/components/agent-extra.css', 'utf-8');
assert(agentCss.includes('.split'), 'Missing .split in agent-extra.css');
console.log(`✓ Verified public/registry.json (${registryJson.stats.total} components, ${registryJson.stats.pro} pro) and former Pro CSS.`);

// Test 8: llms.txt & Agent Rules
console.log('\n8. Testing Agent Context Artifacts...');
assert(fs.existsSync('public/llms.txt'), 'Missing public/llms.txt');
assert(fs.existsSync('public/llms-full.txt'), 'Missing public/llms-full.txt');
assert(fs.existsSync('docs/AGENT_RULES.md'), 'Missing docs/AGENT_RULES.md');
console.log('✓ Verified agent guidelines & context files.');

// Test 9: Corporate Themes & AI Skin Purge
console.log('\n9. Testing Corporate Themes & AI Skin Purge...');
const themesCss = fs.readFileSync('src/css/themes.css', 'utf-8');
assert(!themesCss.includes('[data-ai-skin="brutalist"]'), 'Neo-Brutalist theme should be purged');
assert(!themesCss.includes('[data-ai-skin="cyber"]'), 'Cyber Mono theme should be purged');
assert(themesCss.includes('[data-ai-skin="executive"]'), 'Missing Executive Slate theme');
assert(themesCss.includes('[data-ai-skin="fintech"]'), 'Missing Fintech Titanium theme');
assert(themesCss.includes('.skin-executive'), 'Missing .skin-executive class');
assert(themesCss.includes('.skin-fintech'), 'Missing .skin-fintech class');
console.log('✓ Verified Neo-Brutalist & Cyber skins purged; Executive Slate & Fintech Titanium active.');

// Test 10: CSS Tokens & Contrast Specification
console.log('\n10. Testing Essential CSS Tokens & Hover Variables...');
const tokensCss = fs.readFileSync('src/css/tokens.css', 'utf-8');
assert(tokensCss.includes('--ai-border-hover:'), 'Missing --ai-border-hover in tokens.css');
assert(tokensCss.includes('--ai-accent-rgb:'), 'Missing --ai-accent-rgb in tokens.css');
console.log('✓ Verified essential token definitions (--ai-border-hover, --ai-accent-rgb).');

// Test 11: CLI Design Direction Harness & Automated Design Quality Audit
console.log('\n11. Testing CLI Design Direction Harness & Automated Design Quality Audit...');
const harnessOut = execSync('node bin/cssai.mjs harness executive', { encoding: 'utf-8' });
assert(harnessOut.includes('Executive Slate'), 'CLI harness missing Executive Slate');
assert(harnessOut.includes('--ai-radius-base: 4px;'), 'CLI harness missing tokens');
assert(harnessOut.includes('Strict Anti-Slop Rules:'), 'CLI harness missing anti-slop rules');

const fullHarnessOut = execSync('node bin/cssai.mjs harness', { encoding: 'utf-8' });
assert(fullHarnessOut.includes('The 10 Non-Negotiable Anti-Slop Laws'), 'CLI full harness missing 10 laws');

// Audit index.html (must be 0 design quality issues)
const auditCleanOut = execSync('node bin/cssai.mjs audit index.html', { encoding: 'utf-8' });
assert(auditCleanOut.includes('0 design quality issues detected'), 'index.html failed design quality audit');

// Audit synthetic slop file
const slopSampleFile = path.resolve('test-slop-sample.html');
fs.writeFileSync(
  slopSampleFile,
  `<div class="card">\n  <div class="card">Nested</div>\n  <span class="pulse-dot"></span>\n  <div style="border-left: 4px solid blue;">Stripe</div>\n</div>`,
  'utf-8'
);
try {
  execSync(`node bin/cssai.mjs audit ${slopSampleFile}`, { encoding: 'utf-8', stdio: 'pipe' });
  assert.fail('Expected audit to fail on synthetic slop file');
} catch (err) {
  assert(err.status === 1, 'Audit correctly exited with status 1 on slop file');
  const errOutput = err.stdout?.toString() || err.message;
  assert(errOutput.includes('Cardocalypse'), 'Audit failed to detect Cardocalypse');
  assert(errOutput.includes('Pulsing Status Dots'), 'Audit failed to detect Pulsing Status Dots');
  assert(errOutput.includes('Side-Tab Cards'), 'Audit failed to detect Side-Tab Cards');
  console.log('✓ `llmcss audit` successfully caught Cardocalypse, Pulsing Dots, and Side-Tab Borders.');
}
fs.unlinkSync(slopSampleFile);

// Test 12: Design System Alias Resolution (40+ synonym mappings)
console.log('\n12. Testing Design System Alias Resolution (CLI & Search)...');
const searchSheet = execSync('node bin/cssai.mjs search sheet', { encoding: 'utf-8' });
assert(searchSheet.includes('cart-drawer-pro'), 'Alias "sheet" did not resolve to cart-drawer-pro');

const searchStat = execSync('node bin/cssai.mjs search stat', { encoding: 'utf-8' });
assert(searchStat.includes('kpi-metric-cards'), 'Alias "stat" did not resolve to kpi-metric-cards');

const searchPopup = execSync('node bin/cssai.mjs search popup', { encoding: 'utf-8' });
assert(searchPopup.includes('modal-dialog'), 'Alias "popup" did not resolve to modal-dialog');

const searchCmdk = execSync('node bin/cssai.mjs search cmdk', { encoding: 'utf-8' });
assert(searchCmdk.includes('command-palette-pro'), 'Alias "cmdk" did not resolve to command-palette-pro');
console.log('✓ Verified alias search dictionary correctly maps UI design synonyms to canonical components.');

// Test 13: Strict Em-Dash Purge Verification
console.log('\n13. Testing Strict Em-Dash Purge across Project Files...');
function scanForEmDashes(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      scanForEmDashes(full);
    } else if (/\.(html|css|js|mjs|ts|md|txt|json)$/.test(e.name)) {
      if (e.name === 'verify.mjs') continue;
      const content = fs.readFileSync(full, 'utf-8');
      assert(!content.includes('\u2014'), `Found em-dash in ${full}`);
      assert(!content.includes('&mdash;'), `Found &mdash; in ${full}`);
    }
  }
}
scanForEmDashes('.');
console.log('✓ Verified 0 em-dashes across all HTML, CSS, JS, MJS, TS, MD, TXT, and JSON files.');

// Test 14: Strict Banned AI Font Purge Verification
console.log('\n14. Testing Banned AI Cliché Fonts Purge...');
const bannedFontsList = [
  'Inter',
  'Space Grotesk',
  'Manrope',
  'Playfair Display',
  'Lora',
  'Poppins',
  'Montserrat',
  'Archivo',
  'JetBrains Mono',
  'Fira Code',
  'Cabinet Grotesk'
];
function escapeRegexForFont(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function scanForBannedFonts(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      scanForBannedFonts(full);
    } else if (/\.(html|css|js|mjs|ts|md|txt|json)$/.test(e.name)) {
      if (e.name === 'verify.mjs') continue;
      const content = fs.readFileSync(full, 'utf-8');
      for (const font of bannedFontsList) {
        const urlFont = font.replace(/ /g, '+');
        const pattern = `\\b(${escapeRegexForFont(font)}|${escapeRegexForFont(urlFont)})\\b`;
        const regex = new RegExp(pattern, 'i');
        assert(!regex.test(content), `Found banned font "${font}" in ${full}`);
      }
    }
  }
}
scanForBannedFonts('.');
console.log('✓ Verified 0 occurrences of banned fonts (Inter, Space Grotesk, Manrope, Playfair Display, Lora, Poppins, Montserrat, Archivo, JetBrains Mono, Fira Code, Cabinet Grotesk).');

// Test 15: Wireframe Section Templates & Blueprints Integrity
console.log('\n15. Testing Wireframe Templates & Page Blueprints Schema Integrity...');
assert(wireframeTemplates.length >= 14, `Expected at least 14 wireframe templates, found ${wireframeTemplates.length}`);
const templateIds = new Set();
const validSections = ['header', 'hero', 'features', 'social-proof', 'comparison', 'pricing', 'faq', 'cta', 'footer', 'app-shell'];

for (const tmpl of wireframeTemplates) {
  assert(!templateIds.has(tmpl.id), `Duplicate template ID: ${tmpl.id}`);
  templateIds.add(tmpl.id);
  assert(tmpl.name && tmpl.name.length > 0, `Missing name for ${tmpl.id}`);
  assert(validSections.includes(tmpl.section), `Invalid section category "${tmpl.section}" for ${tmpl.id}`);
  assert(['free', 'pro'].includes(tmpl.tier), `Invalid tier for ${tmpl.id}`);
  assert(Array.isArray(tmpl.tags) && tmpl.tags.length > 0, `Missing tags for ${tmpl.id}`);
  assert(tmpl.placement && tmpl.placement.length > 0, `Missing placement for ${tmpl.id}`);
  assert(tmpl.guidance, `Missing guidance object for ${tmpl.id}`);
  assert(tmpl.guidance.placement, `Missing guidance.placement for ${tmpl.id}`);
  assert(tmpl.guidance.bestUsedFor, `Missing guidance.bestUsedFor for ${tmpl.id}`);
  assert(tmpl.guidance.avoidWhen, `Missing guidance.avoidWhen for ${tmpl.id}`);
  assert(Array.isArray(tmpl.guidance.pairsWith), `Missing guidance.pairsWith array for ${tmpl.id}`);
  assert(tmpl.html && tmpl.html.length > 20, `Missing HTML for ${tmpl.id}`);
}

assert(pageBlueprints.length === 6, `Expected 6 page blueprints, found ${pageBlueprints.length}`);
for (const bp of pageBlueprints) {
  assert(bp.id && bp.name && bp.description && bp.recommendedFor, `Missing metadata on blueprint ${bp.id}`);
  assert(Array.isArray(bp.sections) && bp.sections.length > 0, `Missing sections array on blueprint ${bp.id}`);
  for (const secId of bp.sections) {
    assert(templateIds.has(secId), `Blueprint ${bp.id} references non-existent section: ${secId}`);
  }
}

const saasAssembled = assembleBlueprintHtml('saas-landing');
assert(saasAssembled && saasAssembled.includes('wireframe-nav-minimal') && saasAssembled.includes('wireframe-hero-split'), 'Failed to assemble saas-landing blueprint');

const templatesJsonPath = path.resolve('public/templates.json');
assert(fs.existsSync(templatesJsonPath), 'Missing public/templates.json');
const templatesJson = JSON.parse(fs.readFileSync(templatesJsonPath, 'utf-8'));
assert(templatesJson.wireframeTemplates.length === wireframeTemplates.length, 'templates.json has wrong template count');
assert(templatesJson.pageBlueprints.length === pageBlueprints.length, 'templates.json has wrong blueprint count');
assert(templatesJson.stats.proTemplates === 8, 'templates.json should list 8 themed Pro sections');
const lockedTpl = templatesJson.wireframeTemplates.find((t) => t.id === 'themed-hero-obsidian');
assert(lockedTpl && lockedTpl.locked === true && lockedTpl.html === null, 'Themed templates must be locked in templates.json');
console.log(`✓ Verified ${wireframeTemplates.length} section templates, ${pageBlueprints.length} blueprints, placement guidance schema, and public/templates.json.`);

// Test 16: CLI & MCP Wireframe Template Extraction
console.log('\n16. Testing CLI & MCP Wireframe Template Tooling...');
const cliTemplatesOut = execSync('node bin/cssai.mjs templates', { encoding: 'utf-8' });
assert(cliTemplatesOut.includes('LLMCSS Wireframe Section Templates Catalog'), 'CLI templates list failed');
assert(cliTemplatesOut.includes('wireframe-nav-minimal'), 'CLI templates missing wireframe-nav-minimal');
assert(cliTemplatesOut.includes('wireframe-hero-split'), 'CLI templates missing wireframe-hero-split');
assert(cliTemplatesOut.includes('wireframe-app-shell'), 'CLI templates missing wireframe-app-shell');

const cliGetOut = execSync('node bin/cssai.mjs template get hero-split', { encoding: 'utf-8' });
assert(cliGetOut.includes('class="hero"'), 'CLI template get hero-split failed');

const cliBlueprintsOut = execSync('node bin/cssai.mjs template blueprints', { encoding: 'utf-8' });
assert(cliBlueprintsOut.includes('High-Conversion SaaS Landing Page'), 'CLI template blueprints failed');
assert(cliBlueprintsOut.includes('Developer Tool & CLI Launchpad'), 'CLI template blueprints missing developer-tool');

const cliBlueprintAssembly = execSync('node bin/cssai.mjs template blueprint developer-tool', { encoding: 'utf-8' });
assert(cliBlueprintAssembly.includes('Section: Banner Announcement Navigation'), 'CLI blueprint assembly failed');
assert(cliBlueprintAssembly.includes('Section: Centered Terminal Hero'), 'CLI blueprint assembly missing centered hero');

// MCP Tooling Check for Templates
const mcpTmplReq1 = JSON.stringify({ jsonrpc: '2.0', id: 10, method: 'tools/call', params: { name: 'list_wireframe_templates', arguments: { section: 'hero' } } }) + '\n';
const mcpTmplReq2 = JSON.stringify({ jsonrpc: '2.0', id: 11, method: 'tools/call', params: { name: 'get_wireframe_template', arguments: { id: 'wireframe-nav-minimal' } } }) + '\n';
const mcpTmplReq3 = JSON.stringify({ jsonrpc: '2.0', id: 12, method: 'tools/call', params: { name: 'get_page_blueprint', arguments: { blueprint: 'dashboard-shell' } } }) + '\n';
const mcpTmplOut = execSync('node bin/cssai-mcp.mjs', { input: mcpTmplReq1 + mcpTmplReq2 + mcpTmplReq3, encoding: 'utf-8' });
assert(mcpTmplOut.includes('Split High-Conversion Hero'), 'MCP list_wireframe_templates failed');
assert(mcpTmplOut.includes('Minimal Navigation Bar'), 'MCP get_wireframe_template failed');
assert(mcpTmplOut.includes('Full Application Dashboard Shell'), 'MCP get_page_blueprint failed');
console.log('✓ CLI `llmcss templates`, `template get`, `template blueprint`, and MCP template tools passed.');

// Test 17: Zero Badge Eyebrows Above Titles & Headings Verification
console.log('\n17. Testing Zero Badge Eyebrows Above Titles & Headings...');
function scanForBadgeEyebrows(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist' || e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      scanForBadgeEyebrows(full);
    } else if (/\.(html|mjs|ts|js)$/.test(e.name)) {
      if (e.name === 'verify.mjs' || full.includes('scratch') || full.includes('bin')) continue;
      const content = fs.readFileSync(full, 'utf-8');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/<(?:span|div)[^>]*class=["'][^"']*\b(?:badge|hero-badge)\b[^"']*["'][^>]*>/i.test(line) && !line.includes('product-badge-float')) {
          for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
            const next = lines[j];
            if (/<h[1-4]\b/i.test(next)) {
              assert(false, `Found badge eyebrow directly preceding heading in ${full} at line ${i + 1} -> ${j + 1}:\n  Badge: ${line.trim()}\n  Heading: ${next.trim()}`);
            }
          }
        }
      }
    }
  }
}
scanForBadgeEyebrows('.');

// Verify that cssai audit detects a badge eyebrow on synthetic markup
const badSnippetFile = path.resolve('scratch_bad_badge_test.html');
fs.writeFileSync(badSnippetFile, '<div class="card">\n<span class="badge badge-primary">Eyebrow</span>\n<h2>Test Title</h2>\n</div>', 'utf-8');
try {
  let auditFailed = false;
  try {
    execSync(`node bin/cssai.mjs audit ${badSnippetFile}`, { stdio: 'pipe' });
  } catch (err) {
    auditFailed = true;
    const stdout = err.stdout ? err.stdout.toString() : '';
    assert(stdout.includes('Badge Eyebrow Over Heading'), 'Audit output missing Badge Eyebrow Over Heading finding');
  }
  assert(auditFailed, 'cssai audit should have failed on badge eyebrow preceding heading');
} finally {
  if (fs.existsSync(badSnippetFile)) fs.unlinkSync(badSnippetFile);
}
console.log('✓ Verified 0 badge eyebrows above headings across codebase and verified audit detection.');

// Test 18: Zero Square Grid Backgrounds Verification (Anti-Slop Law 11)
console.log('\n18. Testing Zero Square Grid Backgrounds...');
function scanForSquareGridPatterns(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist' || e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      scanForSquareGridPatterns(full);
    } else if (/\.(html|css|mjs|ts|js)$/.test(e.name)) {
      if (e.name === 'verify.mjs' || full.includes('scratch') || full.includes('bin')) continue;
      const content = fs.readFileSync(full, 'utf-8');
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/background-size:\s*\d+px\s+\d+px/i.test(line) ||
            /linear-gradient\([^)]*(?:to right|90deg)[^)]*1px/i.test(line)) {
          const surrounding = lines.slice(Math.max(0, i - 4), Math.min(lines.length, i + 5)).join(' ');
          if (/linear-gradient\([^)]*(?:to right|90deg)/i.test(surrounding) &&
              /linear-gradient\([^)]*(?:to bottom|0deg|180deg)/i.test(surrounding)) {
            assert(false, `Found square grid background pattern in ${full} at line ${i + 1}`);
          }
        }
        if (/class=["'][^"']*\b(?:bg-grid|grid-pattern|hero-grid)\b[^"']*["']/i.test(line)) {
          assert(false, `Found square grid background class in ${full} at line ${i + 1}`);
        }
      }
    }
  }
}
scanForSquareGridPatterns('.');

// Verify that cssai audit detects a square grid pattern on synthetic markup
const badGridSnippetFile = path.resolve('scratch_bad_grid_test.html');
fs.writeFileSync(
  badGridSnippetFile,
  '<div class="hero" style="background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px); background-size: 20px 20px;"><h1>Hero</h1></div>',
  'utf-8'
);
try {
  let auditFailed = false;
  try {
    execSync(`node bin/cssai.mjs audit ${badGridSnippetFile}`, { stdio: 'pipe' });
  } catch (err) {
    auditFailed = true;
    const stdout = err.stdout ? err.stdout.toString() : '';
    assert(stdout.includes('Square Grid Background'), 'Audit output missing Square Grid Background finding');
  }
  assert(auditFailed, 'cssai audit should have failed on square grid background');
} finally {
  if (fs.existsSync(badGridSnippetFile)) fs.unlinkSync(badGridSnippetFile);
}
console.log('✓ Verified 0 square grid background patterns across codebase and verified audit detection.');

// Test 19: Layout Utilities & Bootstrap / Tailwind Parity Verification
console.log('\n19. Testing Layout Utilities, Helpers & Ecosystem Rail...');
{
  const utilitiesCss = fs.readFileSync(path.resolve('src/css/utilities.css'), 'utf-8');
  const tokensCss = fs.readFileSync(path.resolve('src/css/tokens.css'), 'utf-8');
  const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8');

  // 1. Spacing token
  assert(tokensCss.includes('--ai-space-0: 0px;'), 'Missing --ai-space-0: 0px in tokens.css');

  // 2. Grid Column & Row Spans
  for (let i = 1; i <= 12; i++) {
    assert(utilitiesCss.includes(`.col-span-${i}`), `Missing .col-span-${i} in utilities.css`);
    assert(utilitiesCss.includes(`.col-start-${i}`), `Missing .col-start-${i} in utilities.css`);
    assert(utilitiesCss.includes(`.col-end-${i}`), `Missing .col-end-${i} in utilities.css`);
  }
  assert(utilitiesCss.includes('.col-span-full'), 'Missing .col-span-full in utilities.css');
  assert(utilitiesCss.includes('.col-auto'), 'Missing .col-auto in utilities.css');
  assert(utilitiesCss.includes('.row-span-full'), 'Missing .row-span-full in utilities.css');

  // 3. Spacing Utilities
  ['p', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr'].forEach((prefix) => {
    assert(utilitiesCss.includes(`.${prefix}-0`), `Missing .${prefix}-0 in utilities.css`);
    assert(utilitiesCss.includes(`.${prefix}-4`), `Missing .${prefix}-4 in utilities.css`);
    assert(utilitiesCss.includes(`.${prefix}-8`), `Missing .${prefix}-8 in utilities.css`);
  });
  assert(utilitiesCss.includes('.mx-auto'), 'Missing .mx-auto in utilities.css');
  assert(utilitiesCss.includes('.my-auto'), 'Missing .my-auto in utilities.css');
  assert(utilitiesCss.includes('.-m-1'), 'Missing .-m-1 in utilities.css');

  // 4. Flexbox Helpers
  assert(utilitiesCss.includes('.items-stretch'), 'Missing .items-stretch in utilities.css');
  assert(utilitiesCss.includes('.justify-around'), 'Missing .justify-around in utilities.css');
  assert(utilitiesCss.includes('.justify-evenly'), 'Missing .justify-evenly in utilities.css');
  assert(utilitiesCss.includes('.grow'), 'Missing .grow in utilities.css');
  assert(utilitiesCss.includes('.shrink-0'), 'Missing .shrink-0 in utilities.css');
  assert(utilitiesCss.includes('.self-stretch'), 'Missing .self-stretch in utilities.css');
  assert(utilitiesCss.includes('.order-first'), 'Missing .order-first in utilities.css');

  // 5. Sizing & Positioning
  assert(utilitiesCss.includes('.w-screen'), 'Missing .w-screen in utilities.css');
  assert(utilitiesCss.includes('.min-w-0'), 'Missing .min-w-0 in utilities.css');
  assert(utilitiesCss.includes('.max-w-prose'), 'Missing .max-w-prose in utilities.css');
  assert(utilitiesCss.includes('.max-w-6xl'), 'Missing .max-w-6xl in utilities.css');
  assert(utilitiesCss.includes('.min-h-screen'), 'Missing .min-h-screen in utilities.css');
  assert(utilitiesCss.includes('.top-0'), 'Missing .top-0 in utilities.css');
  assert(utilitiesCss.includes('.bottom-0'), 'Missing .bottom-0 in utilities.css');
  assert(utilitiesCss.includes('.inset-x-0'), 'Missing .inset-x-0 in utilities.css');
  assert(utilitiesCss.includes('.translate-center'), 'Missing .translate-center in utilities.css');
  assert(utilitiesCss.includes('.z-50'), 'Missing .z-50 in utilities.css');

  // 6. Content & Modern Helpers
  assert(utilitiesCss.includes('.aspect-square'), 'Missing .aspect-square in utilities.css');
  assert(utilitiesCss.includes('.aspect-video'), 'Missing .aspect-video in utilities.css');
  assert(utilitiesCss.includes('.object-cover'), 'Missing .object-cover in utilities.css');
  assert(utilitiesCss.includes('.truncate'), 'Missing .truncate in utilities.css');
  assert(utilitiesCss.includes('.line-clamp-2'), 'Missing .line-clamp-2 in utilities.css');
  assert(utilitiesCss.includes('.pointer-events-none'), 'Missing .pointer-events-none in utilities.css');
  assert(utilitiesCss.includes('.select-none'), 'Missing .select-none in utilities.css');
  assert(utilitiesCss.includes('.contents'), 'Missing .contents in utilities.css');

  // 7. Responsive & Container Query column spans
  assert(utilitiesCss.includes('.sm\\:col-span-6'), 'Missing .sm:col-span-6 in utilities.css');
  assert(utilitiesCss.includes('.md\\:col-span-6'), 'Missing .md:col-span-6 in utilities.css');
  assert(utilitiesCss.includes('.lg\\:col-span-4'), 'Missing .lg:col-span-4 in utilities.css');
  assert(utilitiesCss.includes('.cq\\:col-span-2'), 'Missing .cq:col-span-2 in utilities.css');

  // 8. Ecosystem rail in index.html is unboxed
  assert(indexHtml.includes('class="docs-ecosystem-item"'), 'Missing .docs-ecosystem-item in index.html');
  assert(!indexHtml.includes('Compatible Ecosystem</span>\n        <div class="flex flex-wrap items-center gap-2">\n          <span class="badge'), 'Ecosystem rail still contains boxed badges');

  console.log('✓ Verified 100+ layout utilities (grid spans, spacing, flex, sizing, insets, clamps) and unboxed ecosystem rail.');
}

console.log('\n🎉 ALL 19 TESTS PASSED SUCCESSFULLY!\n');




