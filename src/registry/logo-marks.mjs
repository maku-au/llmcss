/**
 * Shared example wordmarks for the logo rail.
 *
 * Six fictional customers, each drawn as one inline SVG device plus the company
 * name as text. The mark is 24x24, stroke or fill currentColor, so the rail's
 * own muted colour and hover state carry it in both themes and all five skins.
 * No named colour, no gradient, no emoji, no unicode glyph.
 *
 * Every mark is aria-hidden and unfocusable: the name text next to it is the
 * accessible label, so a screen reader announces "Harbor Ops", not "image".
 *
 * The rail's layout comes from `.logo-rail > *` and `.logo-rail svg` in
 * src/css/components/marketing.css. Nothing here sets a size, a font or a
 * colour inline.
 *
 * Used by the marquee-ticker demo (data.mjs), its variants
 * (variants-marketing.mjs), the logo rail hero (templates-heroes.mjs) and the
 * social proof rail (templates-data.mjs), so the same six companies appear
 * everywhere in the catalog.
 */

const SVG_OPEN =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';

/** Key to inline SVG mark. One simple geometric device per company. */
export const LOGO_MARKS = {
  // North-pointing chevron inside a ring
  northwind: `${SVG_OPEN}<circle cx="12" cy="12" r="8.5"/><path d="m8 14.5 4-6.5 4 6.5"/></svg>`,
  // A pair of waves
  harbor: `${SVG_OPEN}<path d="M3 8.5c2-2.2 4-2.2 6 0s4 2.2 6 0 4-2.2 6 0"/><path d="M3 15.5c2-2.2 4-2.2 6 0s4 2.2 6 0 4-2.2 6 0"/></svg>`,
  // A lattice of four squares
  lattice: `${SVG_OPEN}<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/></svg>`,
  // A feather nib with its vent hole and slit
  quill: `${SVG_OPEN}<path d="M12 21.5 7.5 10.2a6.5 6.5 0 0 1 9 0Z"/><path d="M12 21.5v-7.8"/><circle cx="12" cy="10.8" r="1.1"/></svg>`,
  // A compass rose
  meridian: `${SVG_OPEN}<circle cx="12" cy="12" r="8.5"/><path d="M12 5.5 13.6 10.4 18.5 12 13.6 13.6 12 18.5 10.4 13.6 5.5 12 10.4 10.4Z"/></svg>`,
  // A page with a folded corner and two ruled lines
  fieldnote: `${SVG_OPEN}<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8Z"/><path d="M14 3v3.5A1.5 1.5 0 0 0 15.5 8H19"/><path d="M8.5 13h7M8.5 16.5h4.5"/></svg>`,
};

/** Key to company name. These six names are the catalog-wide set. */
export const LOGO_NAMES = {
  northwind: 'Northwind',
  harbor: 'Harbor Ops',
  lattice: 'Lattice Labs',
  quill: 'Quill',
  meridian: 'Meridian',
  fieldnote: 'Fieldnote',
};

/** Rail order, shared by every consumer so the set reads the same everywhere. */
export const LOGO_KEYS = ['northwind', 'harbor', 'lattice', 'quill', 'meridian', 'fieldnote'];

/** One rail item: the mark then the name, as a text node the rail can label. */
export function logoRailItem(key, tag = 'span') {
  return `<${tag}>${LOGO_MARKS[key]}${LOGO_NAMES[key]}</${tag}>`;
}

/** All six rail items, newline separated and indented to sit inside the rail. */
export function logoRailItems(tag = 'span', indent = '  ') {
  return LOGO_KEYS.map((key) => `${indent}${logoRailItem(key, tag)}`).join('\n');
}
