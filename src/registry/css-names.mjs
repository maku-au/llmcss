/**
 * The one place that knows how a class name becomes a CSS selector and back.
 *
 * Three tools used to carry their own copy of this: build-utilities.mjs wrote
 * the escapes, build-manifests.mjs read them back, and `llmcss trim` read them
 * back with a regex that understood single-character escapes only. The trim
 * copy therefore decoded `.\000032xl\:flex` as `000032xl:flex`, matched nothing
 * in the used-class set, and dropped every 2xl: rule from a trimmed sheet.
 * One module, imported by all three, so a round trip cannot disagree with
 * itself again.
 *
 * The escaping rules, in full:
 *   - an ASCII letter, an underscore and a hyphen are written as themselves
 *   - a digit is written as itself unless it is the FIRST character, where an
 *     ident may not begin with one: it becomes the six-hex-digit escape
 *     (`2xl:flex` -> `\000032xl\:flex`)
 *   - everything else (`:`, `.`, `/`, `%`, `[`, ...) takes a backslash
 *
 * The padded six-digit form is deliberate. CSS also allows `\32 ` with a
 * terminating space, but a space inside a selector is a descendant combinator
 * to anything that splits on whitespace, so the padded form is the only one
 * that survives a naive selector parser. Six digits also means the escape can
 * never absorb a following hex digit, so `\000032` + `2` is unambiguous.
 */

/** The escaped ident for a class name, with no leading dot. */
export function escapeClass(name) {
  let out = '';
  for (let i = 0; i < name.length; i++) {
    const ch = name[i];
    if (/[A-Za-z_-]/.test(ch)) out += ch;
    else if (/[0-9]/.test(ch)) out += i === 0 ? `\\${ch.codePointAt(0).toString(16).padStart(6, '0')}` : ch;
    else out += `\\${ch}`;
  }
  return out;
}

/** The full class selector for a class name: `md:flex` -> `.md\:flex`. */
export function selectorFor(name) {
  return `.${escapeClass(name)}`;
}

/**
 * The class name behind an escaped ident, the inverse of escapeClass.
 * Takes the ident text without the leading dot: `\000032xl\:flex` -> `2xl:flex`.
 *
 * Reads the general CSS numeric escape, not just the padded form this file
 * writes: a backslash, one to six hex digits, and an optional single
 * whitespace terminator. That matters downstream. The minifier in the dist
 * build re-writes `\000032xl` to the shorter, equally legal `\32xl`, and a
 * reader that only knew the six-digit form decoded it one character at a time
 * as the literal text `32xl` and matched nothing.
 *
 * Numeric escapes are decoded first; the single-character rule would otherwise
 * eat the backslash and leave the digits looking like ident characters.
 */
export function unescapeSelectorClass(text) {
  return text
    .replace(/\\([0-9a-fA-F]{1,6})[ \t\n]?/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/\\(.)/g, '$1');
}

/**
 * Matches one class selector inside a selector list. The numeric-escape
 * alternative has to come first: `\\.` would otherwise consume the backslash
 * and leave the hex digits looking like ordinary ident characters.
 *
 * The hex run is greedy up to six digits and may swallow one trailing space,
 * which is exactly how a CSS parser ends a numeric escape. So `.\32xl\:flex`,
 * `.\32 xl\:flex` and `.\000032xl\:flex` all match as one class, and the space
 * in the middle form is read as a terminator rather than as a descendant
 * combinator.
 *
 * A fresh RegExp per call, because a /g regex carries lastIndex and sharing one
 * across callers is how a scanner starts skipping matches.
 */
export function classSelectorRe() {
  return /\.((?:\\[0-9a-fA-F]{1,6}[ \t\n]?|\\.|[A-Za-z0-9_-])+)/g;
}

/** Every class name in a selector list, unescaped, in source order. */
export function selectorClasses(selector) {
  const out = [];
  for (const m of selector.matchAll(classSelectorRe())) out.push(unescapeSelectorClass(m[1]));
  return out;
}

/**
 * The variant prefixes a class name may carry, as one anchored pattern:
 * `md:flex` -> ['md', 'flex']. Five breakpoints, three container tiers and the
 * fourteen state prefixes in utilities.spec.mjs's stateVariants, which is the
 * list this has to stay in step with.
 *
 * Longest-first inside each group matters. `focus-visible` must precede
 * `focus`, or `focus-visible:ring` splits as focus + `visible:ring`. `2xl` has
 * to be present at all: without it `2xl:flexx` was not recognised as a variant
 * of anything and the validator offered no suggestion for the typo.
 */
export const VARIANT_RE =
  /^(sm|md|lg|xl|2xl|cq-sm|cq-md|cq-lg|hover|focus-visible|focus|active|disabled|group-hover|dark|print|motion-safe|motion-reduce|first|last|odd|even):(.+)$/;

/** The variant prefix and base name of a class, or null when it has none. */
export function splitVariant(cls) {
  const m = VARIANT_RE.exec(cls);
  return m ? { variant: m[1], base: m[2] } : null;
}
