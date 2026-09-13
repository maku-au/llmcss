/**
 * LLMCSS Rebranding Utility
 *
 * Rewrites the namespace knobs in src/config/prefix.ts.
 *
 * Since 0.4.0 there are two of them and they are independent:
 *   DEFAULT_PREFIX        custom elements (<ai-modal>), data attributes
 *                         (data-ai-toggle) and custom properties (--ai-*)
 *   DEFAULT_CLASS_PREFIX  class names, empty by default (`btn`, not `ai-btn`)
 *
 * Usage:
 *   node scripts/rebrand.mjs <element-prefix> [class-prefix]
 * Example:
 *   node scripts/rebrand.mjs craft            # <craft-modal>, classes stay bare
 *   node scripts/rebrand.mjs craft craft-     # <craft-modal>, .craft-btn
 *
 * This only moves the runtime's idea of the namespace. The stylesheet, the
 * generated manifests and the registry markup are static text, so a rebrand is
 * only complete once those are regenerated to match.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const newPrefix = process.argv[2];
const newClassPrefix = process.argv[3] ?? '';
if (!newPrefix) {
  console.log('Usage: node scripts/rebrand.mjs <element-prefix> [class-prefix]');
  console.log('Example: node scripts/rebrand.mjs craft');
  console.log('The class prefix defaults to empty: class names carry no namespace.');
  process.exit(1);
}

console.log(`✦ Rebranding LLMCSS: element/data prefix "${newPrefix}", class prefix "${newClassPrefix}"...`);

const prefixConfigPath = path.join(rootDir, 'src', 'config', 'prefix.ts');
if (fs.existsSync(prefixConfigPath)) {
  let content = fs.readFileSync(prefixConfigPath, 'utf-8');
  content = content.replace(
    /export const DEFAULT_PREFIX = ['"][^'"]*['"];/,
    `export const DEFAULT_PREFIX = '${newPrefix}';`
  );
  content = content.replace(
    /export const DEFAULT_CLASS_PREFIX = ['"][^'"]*['"];/,
    `export const DEFAULT_CLASS_PREFIX = '${newClassPrefix}';`
  );
  fs.writeFileSync(prefixConfigPath, content, 'utf-8');
  console.log('✓ Updated src/config/prefix.ts');
} else {
  console.error(`✗ ${prefixConfigPath} is missing; nothing was rewritten.`);
  process.exit(1);
}

console.log(`\nRebrand configuration updated.`);
console.log('The stylesheet in src/css is static text: rename the selectors there');
console.log('and rerun the registry build scripts before the change is real.\n');
