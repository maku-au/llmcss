import { activeConfig } from '../config/prefix';
import { initDataAttributes } from './attributes';
import { AiModalElement } from './elements/modal.element';
import { AiTabsElement } from './elements/tabs.element';
import { AiDropdownElement } from './elements/dropdown.element';
import { AiAccordionElement } from './elements/accordion.element';
import { AiDrawerElement } from './elements/drawer.element';
import { AiToastElement } from './elements/toast.element';
import { AiCommandPaletteElement } from './elements/command-palette.element';

export {
  AiModalElement,
  AiTabsElement,
  AiDropdownElement,
  AiAccordionElement,
  AiDrawerElement,
  AiToastElement,
  AiCommandPaletteElement,
  initDataAttributes,
};

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

  registerElements();
  initDataAttributes(activeConfig.prefix);
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
