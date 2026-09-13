import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { components } from './data.mjs';
import { wireframeTemplates, pageBlueprints } from './templates-data.mjs';
import { lockedPreview } from './locked.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The component catalog is entirely MIT. Pro lives in themed section
// templates and page kits, which go through toPublicTemplate below.
function toPublicComponent(c) {
  const { ts, css, ...rest } = c;
  return rest;
}

function toPublicTemplate(t) {
  if (t.tier !== 'pro') return t;
  const { html, ...rest } = t;
  return {
    ...rest,
    locked: true,
    html: null,
    previewHtml: lockedPreview(t.name),
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

  const publicTemplates = wireframeTemplates.map(toPublicTemplate);
  const templatesData = {
    version: '0.1.0',
    generatedAt: new Date().toISOString(),
    stats: {
      totalTemplates: publicTemplates.length,
      freeTemplates: publicTemplates.filter((t) => t.tier !== 'pro').length,
      proTemplates: publicTemplates.filter((t) => t.tier === 'pro').length,
      totalBlueprints: pageBlueprints.length,
      sections: {
        header: publicTemplates.filter((t) => t.section === 'header').length,
        hero: publicTemplates.filter((t) => t.section === 'hero').length,
        features: publicTemplates.filter((t) => t.section === 'features').length,
        'social-proof': publicTemplates.filter((t) => t.section === 'social-proof').length,
        comparison: publicTemplates.filter((t) => t.section === 'comparison').length,
        pricing: publicTemplates.filter((t) => t.section === 'pricing').length,
        faq: publicTemplates.filter((t) => t.section === 'faq').length,
        cta: publicTemplates.filter((t) => t.section === 'cta').length,
        footer: publicTemplates.filter((t) => t.section === 'footer').length,
        'app-shell': publicTemplates.filter((t) => t.section === 'app-shell').length,
      },
    },
    wireframeTemplates: publicTemplates,
    pageBlueprints,
  };

  const templatesOutputPath = path.join(publicDir, 'templates.json');
  fs.writeFileSync(templatesOutputPath, JSON.stringify(templatesData, null, 2), 'utf-8');
  console.log(`[build-registry] Successfully generated public/templates.json:`);
  console.log(`  - Total templates:  ${wireframeTemplates.length}`);
  console.log(`  - Total blueprints: ${pageBlueprints.length}`);
}

buildRegistry();
