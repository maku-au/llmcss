import { openOverlay, closeOverlay } from '../attributes';

export class AiCommandPaletteElement extends HTMLElement {
  get isOpen(): boolean {
    return this.classList.contains('is-open') || this.hasAttribute('open');
  }

  set isOpen(value: boolean) {
    if (value) {
      this.classList.add('is-open');
      this.setAttribute('open', '');
      const input = this.querySelector<HTMLInputElement>('.command-input');
      if (input) setTimeout(() => input.focus(), 50);
    } else {
      this.classList.remove('is-open');
      this.removeAttribute('open');
    }
  }

  /**
   * Opens through the shared overlay stack, which also moves focus to the
   * command input, makes the page behind inert and lets Escape close this
   * palette before anything underneath it.
   */
  open(trigger?: HTMLElement | null) {
    openOverlay(this, trigger);
    this.dispatchEvent(new CustomEvent('ai:command:open', { bubbles: true }));
  }

  close() {
    closeOverlay(this);
    this.dispatchEvent(new CustomEvent('ai:command:close', { bubbles: true }));
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  connectedCallback() {
    // Backdrop click
    this.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target === this || target.classList.contains('modal-backdrop')) {
        this.close();
      }
    });

    // Real-time item filtering
    const input = this.querySelector<HTMLInputElement>('.command-input');
    if (input) {
      input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        const items = this.querySelectorAll<HTMLElement>('.command-item');
        items.forEach((item) => {
          const text = item.textContent?.toLowerCase() || '';
          if (text.includes(query)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  }
}
