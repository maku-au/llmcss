/**
 * LLMCSS Namespace Configuration
 *
 * Central definition of all prefixes for classes, custom elements, and CSS variables.
 * To change the brand prefix, modify `DEFAULT_PREFIX` here or run the rebrand utility.
 */

export const DEFAULT_PREFIX = 'ai';

export interface PrefixConfig {
  prefix: string;
  cssVarPrefix: string;
  classPrefix: string;
  elementPrefix: string;
  dataPrefix: string;
}

export function getPrefixConfig(prefix = DEFAULT_PREFIX): PrefixConfig {
  return {
    prefix,
    cssVarPrefix: `--${prefix}-`,
    classPrefix: `${prefix}-`,
    elementPrefix: `${prefix}-`,
    dataPrefix: `data-${prefix}-`,
  };
}

export const activeConfig = getPrefixConfig(DEFAULT_PREFIX);

/**
 * Utility helper to generate prefixed class names
 * e.g. cls('btn') -> 'ai-btn'
 *      cls('btn', 'primary') -> 'ai-btn ai-btn-primary'
 */
export function cls(...names: (string | false | null | undefined)[]): string {
  return names
    .filter(Boolean)
    .map((name) => `${activeConfig.classPrefix}${name}`)
    .join(' ');
}

/**
 * Utility helper for custom element names
 * e.g. tag('modal') -> 'ai-modal'
 */
export function tag(name: string): string {
  return `${activeConfig.elementPrefix}${name}`;
}
