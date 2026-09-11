export class AiAccordionElement extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (e) => {
      const trigger = (e.target as HTMLElement).closest('.ai-accordion-trigger');
      if (!trigger || !this.contains(trigger)) return;

      const item = trigger.closest('.ai-accordion-item');
      if (!item) return;

      const isOpen = item.classList.contains('is-open') || item.hasAttribute('open');

      // If single-open mode, close other items
      if (this.hasAttribute('single')) {
        this.querySelectorAll('.ai-accordion-item').forEach((i) => {
          if (i !== item) {
            i.classList.remove('is-open');
            i.removeAttribute('open');
          }
        });
      }

      if (isOpen) {
        item.classList.remove('is-open');
        item.removeAttribute('open');
      } else {
        item.classList.add('is-open');
        item.setAttribute('open', '');
      }

      this.dispatchEvent(new CustomEvent('ai:accordion:toggle', {
        detail: { item, isOpen: !isOpen },
        bubbles: true,
      }));
    });
  }
}
