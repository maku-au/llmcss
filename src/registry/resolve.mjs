/**
 * One place that knows what `hero-split:centered` means.
 *
 * Shared by bin/cssai.mjs, bin/cssai-mcp.mjs and src/showcase/main.ts so the
 * CLI, the MCP server and the catalog can never disagree about a reference.
 *
 * A variant is a structural alternative to a component's default layout. It
 * lives in the parent's `variants` array and is addressed flat, because a
 * colon appears in no component id and in no variant id, and because it is the
 * separator the library already teaches for class variants (md:grid-cols-2).
 */

/**
 * Resolve a component reference to a component and, when the reference names
 * one, a variant.
 *
 * Accepts, in order of precedence:
 *   "hero-split"           exact component id, default layout
 *   "hero-split:centered"  canonical variant reference
 *   "hero-split-centered"  hyphen fallback, only when exactly one variant matches
 *
 * Returns { component, variant } with variant null for a default, or null when
 * nothing resolves. Naming a real component and an unknown variant is null, not
 * the component: silently handing back the default would hide the typo.
 *
 * @param {Array<object>} components
 * @param {string} ref
 * @returns {{ component: object, variant: object | null } | null}
 */
export function resolveRef(components, ref) {
  if (!ref || typeof ref !== 'string') return null;

  const exact = components.find((c) => c.id === ref);
  if (exact) return { component: exact, variant: null };

  const cut = ref.lastIndexOf(':');
  if (cut > 0) {
    const parent = components.find((c) => c.id === ref.slice(0, cut));
    if (parent) {
      const variant = (parent.variants || []).find((v) => v.id === ref.slice(cut + 1));
      if (variant) return { component: parent, variant };
      return null;
    }
    return null;
  }

  // Hyphen fallback. The hyphen is inside both halves of a reference, so it can
  // only be trusted when the whole catalog offers exactly one reading.
  const hits = [];
  for (const c of components) {
    for (const v of c.variants || []) {
      if (`${c.id}-${v.id}` === ref) hits.push({ component: c, variant: v });
    }
  }
  return hits.length === 1 ? hits[0] : null;
}

/** The markup a resolved reference asked for. */
export function refHtml(hit) {
  if (!hit) return '';
  return hit.variant ? hit.variant.html : hit.component.html;
}

/** Canonical reference string, for messages, filenames and the Copy CLI button. */
export function refId(hit) {
  if (!hit) return '';
  return hit.variant ? `${hit.component.id}:${hit.variant.id}` : hit.component.id;
}

/** Safe on every filesystem: a colon is hostile on Windows and awkward in a shell. */
export function refSlug(hit) {
  if (!hit) return '';
  return hit.variant ? `${hit.component.id}-${hit.variant.id}` : hit.component.id;
}

/** The compact sibling list an agent needs to recover from a wrong variant name. */
export function variantSummary(component) {
  return (component.variants || []).map((v) => ({
    id: v.id,
    name: v.name,
    description: v.description,
  }));
}

/**
 * Every reference in the catalog, each component's default first, then its
 * variants in declaration order. Used by list, by docs and by the tests.
 */
export function listRefs(components) {
  const out = [];
  for (const c of components) {
    out.push(c.id);
    for (const v of c.variants || []) out.push(`${c.id}:${v.id}`);
  }
  return out;
}

/** Total variants across the catalog. Counted, never typed. */
export function countVariants(components) {
  return components.reduce((n, c) => n + (c.variants ? c.variants.length : 0), 0);
}
