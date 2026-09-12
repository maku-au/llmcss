import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { components } from './data.mjs';
import { wireframeTemplates, pageBlueprints } from './templates-data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function lockedPreview(name) {
  return `<div class="ai-card ai-card-pro" style="padding: var(--ai-space-8); text-align: center; max-width: 28rem; margin: 0 auto;">
  <h3 class="ai-card-title ai-flex ai-items-center ai-justify-center ai-gap-2">${name} <span class="ai-badge ai-badge-solid ai-badge-sm">Pro</span></h3>
  <p class="ai-text-sm ai-text-secondary" style="margin-top: var(--ai-space-2);">Source is not in the public catalog. Subscribe to copy this component.</p>
  <a class="ai-btn ai-btn-primary ai-btn-sm" style="margin-top: var(--ai-space-4);" href="/api/checkout.php">Unlock Pro ($9/mo)</a>
</div>`;
}

function toPublicComponent(c) {
  if (c.tier !== 'pro') {
    const { ts, css, ...rest } = c;
    return rest;
  }
  return {
    id: c.id,
    name: c.name,
    description: c.description,
    category: c.category,
    tier: 'pro',
    tags: c.tags,
    locked: true,
    html: null,
    previewHtml: lockedPreview(c.name.replace(/\s*\(PRO\)\s*$/i, '').replace(/\s*\(Pro\)\s*$/i, '')),
  };
}

function buildRegistry() {
  const publicDir = path.resolve(__dirname, '../../public');
  const rDir = path.join(publicDir, 'r');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (!fs.existsSync(rDir)) {
    fs.mkdirSync(rDir, { recursive: true });
  }

  const publicComponents = components.map(toPublicComponent);
  const freeCount = publicComponents.filter((c) => c.tier === 'free').length;
  const proCount = publicComponents.filter((c) => c.tier === 'pro').length;

  const categories = {
    primitive: publicComponents.filter((c) => c.category === 'primitive').length,
    marketing: publicComponents.filter((c) => c.category === 'marketing').length,
    application: publicComponents.filter((c) => c.category === 'application').length,
    ecommerce: publicComponents.filter((c) => c.category === 'ecommerce').length,
  };

  const registryData = {
    version: '0.1.0',
    generatedAt: new Date().toISOString(),
    stats: {
      total: publicComponents.length,
      free: freeCount,
      pro: proCount,
      categories,
    },
    components: publicComponents,
  };

  const outputPath = path.join(publicDir, 'registry.json');
  fs.writeFileSync(outputPath, JSON.stringify(registryData, null, 2), 'utf-8');

  for (const file of fs.readdirSync(rDir)) {
    if (file.endsWith('.json')) fs.unlinkSync(path.join(rDir, file));
  }
  for (const c of publicComponents) {
    if (c.tier !== 'free') continue;
    fs.writeFileSync(path.join(rDir, `${c.id}.json`), JSON.stringify(c, null, 2), 'utf-8');
  }

  console.log(`[build-registry] Successfully generated public/registry.json:`);
  console.log(`  - Total components: ${components.length}`);
  console.log(`  - Free components:  ${freeCount}`);
  console.log(`  - Pro components:   ${proCount}`);
  console.log(`  - Categories:`, categories);

  const templatesData = {
    version: '0.1.0',
    generatedAt: new Date().toISOString(),
    stats: {
      totalTemplates: wireframeTemplates.length,
      totalBlueprints: pageBlueprints.length,
      sections: {
        header: wireframeTemplates.filter((t) => t.section === 'header').length,
        hero: wireframeTemplates.filter((t) => t.section === 'hero').length,
        features: wireframeTemplates.filter((t) => t.section === 'features').length,
        'social-proof': wireframeTemplates.filter((t) => t.section === 'social-proof').length,
        comparison: wireframeTemplates.filter((t) => t.section === 'comparison').length,
        pricing: wireframeTemplates.filter((t) => t.section === 'pricing').length,
        faq: wireframeTemplates.filter((t) => t.section === 'faq').length,
        cta: wireframeTemplates.filter((t) => t.section === 'cta').length,
        footer: wireframeTemplates.filter((t) => t.section === 'footer').length,
        'app-shell': wireframeTemplates.filter((t) => t.section === 'app-shell').length,
      },
    },
    wireframeTemplates,
    pageBlueprints,
  };

  const templatesOutputPath = path.join(publicDir, 'templates.json');
  fs.writeFileSync(templatesOutputPath, JSON.stringify(templatesData, null, 2), 'utf-8');
  console.log(`[build-registry] Successfully generated public/templates.json:`);
  console.log(`  - Total templates:  ${wireframeTemplates.length}`);
  console.log(`  - Total blueprints: ${pageBlueprints.length}`);
}

buildRegistry();
