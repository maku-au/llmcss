/**
 * LLMCSS Rebranding Utility
 *
 * Usage:
 *   node scripts/rebrand.mjs <new-prefix>
 * Example:
 *   node scripts/rebrand.mjs craftui
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const newPrefix = process.argv[2];
if (!newPrefix) {
  console.log('Usage: node scripts/rebrand.mjs <new-prefix>');
  console.log('Example: node scripts/rebrand.mjs craft');
  process.exit(1);
}

console.log(`✦ Rebranding LLMCSS prefix to: "${newPrefix}"...`);

// Update src/config/prefix.ts
const prefixConfigPath = path.join(rootDir, 'src', 'config', 'prefix.ts');
if (fs.existsSync(prefixConfigPath)) {
  let content = fs.readFileSync(prefixConfigPath, 'utf-8');
  content = content.replace(/export const DEFAULT_PREFIX = ['"][^'"]+['"];/, `export const DEFAULT_PREFIX = '${newPrefix}';`);
  fs.writeFileSync(prefixConfigPath, content, 'utf-8');
  console.log(`✓ Updated src/config/prefix.ts`);
}

console.log(`\n🎉 Rebrand configuration updated to "${newPrefix}".`);
console.log(`Run \`npm run build\` to recompile.\n`);
