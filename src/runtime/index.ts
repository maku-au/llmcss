import { activeConfig } from '../config/prefix';
import { initDataAttributes, openOverlay, closeOverlay } from './attributes';
import { AiModalElement } from './elements/modal.element';
import { AiTabsElement } from './elements/tabs.element';
import { AiDropdownElement } from './elements/dropdown.element';
import { AiAccordionElement } from './elements/accordion.element';
import { AiDrawerElement } from './elements/drawer.element';
import { AiToastElement } from './elements/toast.element';
import { AiCommandPaletteElement } from './elements/command-palette.element';
import { initCombobox } from './combobox';
import { initScrollspy } from './scrollspy';
import { initSplit } from './split';

export {
  AiModalElement,
  AiTabsElement,
  AiDropdownElement,
  AiAccordionElement,
  AiDrawerElement,
  AiToastElement,
  AiCommandPaletteElement,
  initDataAttributes,
  openOverlay,
  closeOverlay,
};

/**
 * The public surface the runtime publishes on window. Both entries drive the
 * same overlay stack the data attributes and the custom elements use, so an
 * overlay opened this way still gets its focus trap, inert background and
 * Escape handling.
 */
export interface LLMCSSWindowApi {
  /** Open a modal, drawer or command palette by element or CSS selector. */
  open(el: Element | string): void;
  /** Close a modal, drawer or command palette by element or CSS selector. */
  close(el: Element | string): void;
}

declare global {
  interface Window {
    LLMCSS?: LLMCSSWindowApi;
  }
}

/**
 * Register all Custom Elements in the browser CustomElementRegistry
 */
export function registerElements(prefix = activeConfig.prefix) {
  if (typeof window === 'undefined' || !window.customElements) return;

  const elements: Record<string, CustomElementConstructor> = {
    [`${prefix}-modal`]: AiModalElement,
    [`${prefix}-tabs`]: AiTabsElement,
    [`${prefix}-dropdown`]: AiDropdownElement,
    [`${prefix}-accordion`]: AiAccordionElement,
    [`${prefix}-drawer`]: AiDrawerElement,
    [`${prefix}-toast`]: AiToastElement,
    [`${prefix}-command-palette`]: AiCommandPaletteElement,
  };

  for (const [tag, elementClass] of Object.entries(elements)) {
    if (!customElements.get(tag)) {
      customElements.define(tag, elementClass);
    }
  }
}

/**
 * Auto-initialize runtime when loaded in browser
 */
export function initLLMCSS() {
  if (typeof window === 'undefined') return;

  // Lets CSS know the runtime is present (e.g. show controls that need JS)
  document.documentElement.classList.add(`${activeConfig.classPrefix}js`);
  registerElements();
  initDataAttributes(activeConfig.prefix);
  initCombobox(activeConfig.prefix);
  initScrollspy(activeConfig.prefix);
  initSplit(activeConfig.prefix);
}

// Auto-run if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initLLMCSS());
  } else {
    initLLMCSS();
  }
}

export const initCSSai = initLLMCSS;
