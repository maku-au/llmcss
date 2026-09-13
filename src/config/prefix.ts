/**
 * LLMCSS Namespace Configuration
 *
 * Central definition of all prefixes for custom elements, data attributes and
 * CSS variables.
 *
 * Classes lost their namespace in 0.4.0: `ai-btn` is now `btn`. Custom
 * elements (`<ai-modal>`), data attributes (`data-ai-toggle`), custom
 * properties (`--ai-accent`) and keyframes (`ai-spin`) keep the `ai` prefix,
 * so `DEFAULT_PREFIX` still drives those. `DEFAULT_CLASS_PREFIX` is the
 * separate, now-empty knob for class names.
 */

export const DEFAULT_PREFIX = 'ai';

/** Class names are unprefixed. Set a value here only to re-namespace a fork. */
export const DEFAULT_CLASS_PREFIX = '';

export interface PrefixConfig {
  prefix: string;
  cssVarPrefix: string;
  classPrefix: string;
  elementPrefix: string;
  dataPrefix: string;
}

export function getPrefixConfig(prefix = DEFAULT_PREFIX, classPrefix = DEFAULT_CLASS_PREFIX): PrefixConfig {
  return {
    prefix,
    cssVarPrefix: `--${prefix}-`,
    classPrefix,
    elementPrefix: `${prefix}-`,
    dataPrefix: `data-${prefix}-`,
  };
}

export const activeConfig = getPrefixConfig(DEFAULT_PREFIX, DEFAULT_CLASS_PREFIX);

/** The class prefix every runtime selector is built from. Empty by default. */
export const CLASS_PREFIX = activeConfig.classPrefix;

/**
 * Utility helper to generate class names
 * e.g. cls('btn') -> 'btn'
 *      cls('btn', 'btn-primary') -> 'btn btn-primary'
 */
export function cls(...names: (string | false | null | undefined)[]): string {
  return names
    .filter(Boolean)
    .map((name) => `${activeConfig.classPrefix}${name}`)
    .join(' ');
}

/**
 * Utility helper for custom element names, which keep the prefix
 * e.g. tag('modal') -> 'ai-modal'
 */
export function tag(name: string): string {
  return `${activeConfig.elementPrefix}${name}`;
}
