/**
 * Public locked stubs for themed Pro components.
 * Real HTML lives in ~/sites/llmcss-pro/registry/{id}.json.
 */
import { lockedPreview } from './locked.mjs';

export const themedComponents = [
  {
    id: 'themed-editorial-article-header',
    name: 'Editorial Article Header',
    description: 'Magazine article header: display title, byline, date, and a hairline rule. Pin data-ai-skin="editorial".',
    category: 'marketing',
    tier: 'pro',
    tags: ['themed', 'editorial', 'article', 'header', 'byline'],
    html: lockedPreview('Editorial Article Header'),
  },
  {
    id: 'themed-fintech-ledger-row',
    name: 'Fintech Ledger Row',
    description: 'Single ledger line with counterparty, tabular amount, and a status pip. Pin data-ai-skin="fintech".',
    category: 'application',
    tier: 'pro',
    tags: ['themed', 'fintech', 'ledger', 'transaction', 'row'],
    html: lockedPreview('Fintech Ledger Row'),
  },
  {
    id: 'themed-obsidian-status-rail',
    name: 'Obsidian Status Rail',
    description: 'Vertical service rail with static status pips, monospace ids, and timestamps. Pin data-ai-skin="obsidian".',
    category: 'application',
    tier: 'pro',
    tags: ['themed', 'obsidian', 'status', 'rail', 'ops'],
    html: lockedPreview('Obsidian Status Rail'),
  },
];
