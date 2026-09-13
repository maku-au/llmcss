import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { components } from './data.mjs';
import { wireframeTemplates, pageBlueprints } from './templates-data.mjs';
import { lockedPreview } from './locked.mjs';
import { countVariants } from './resolve.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Registry files carry the package version so a consumer can tell which release they describe.
const PKG_VERSION = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')).version;

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
  // Layout variants ride along inside their parent, so they never inflate the
  // component count. Counted here, never typed anywhere.
  const variantCount = countVariants(publicComponents);

  const categories = {
    primitive: publicComponents.filter((c) => c.category === 'primitive').length,
    marketing: publicComponents.filter((c) => c.category === 'marketing').length,
    application: publicComponents.filter((c) => c.category === 'application').length,
    ecommerce: publicComponents.filter((c) => c.category === 'ecommerce').length,
  };

  const registryData = {
    version: PKG_VERSION,
    generatedAt: new Date().toISOString(),
    stats: {
      total: publicComponents.length,
      free: freeCount,
      pro: proCount,
      variants: variantCount,
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
  console.log(`  - Layout variants:  ${variantCount}`);
  console.log(`  - Categories:`, categories);

  const publicTemplates = wireframeTemplates.map(toPublicTemplate);
  const templatesData = {
    version: PKG_VERSION,
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

  // Site chrome needs the counts, not the catalog. Emitting them as a tiny JSON
  // module keeps the whole registry out of every page bundle, and keeps the
  // numbers generated rather than typed. Committed because it is small.
  const isKit = (b) => b.kind === 'themed' || b.tier === 'pro';
  const stats = {
    total: publicComponents.length,
    free: freeCount,
    pro: proCount,
    variants: variantCount,
    ...categories,
    themedSections: publicTemplates.filter((t) => t.kind === 'themed').length,
    wireframeSections: publicTemplates.filter((t) => t.kind !== 'themed').length,
    kits: pageBlueprints.filter(isKit).length,
    freeBlueprints: pageBlueprints.filter((b) => !isKit(b)).length,
    blueprints: pageBlueprints.length,
  };
  const statsOutputPath = path.join(__dirname, 'stats.json');
  fs.writeFileSync(statsOutputPath, `${JSON.stringify(stats, null, 2)}\n`, 'utf-8');
  console.log(`[build-registry] Successfully generated src/registry/stats.json:`, stats);
}

buildRegistry();
