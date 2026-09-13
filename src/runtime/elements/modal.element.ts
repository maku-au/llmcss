import { openOverlay, closeOverlay } from '../attributes';

export class AiModalElement extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }

  get isOpen(): boolean {
    return this.hasAttribute('open');
  }

  set isOpen(value: boolean) {
    if (value) {
      this.setAttribute('open', '');
      this.classList.add('is-open');
    } else {
      this.removeAttribute('open');
      this.classList.remove('is-open');
    }
  }

  connectedCallback() {
    // Ensure backdrop click closes modal
    this.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.classList.contains('modal-backdrop')) {
        this.close();
      }
    });
  }

  /**
   * Opens through the shared overlay stack, so focus moves into the panel, the
   * rest of the page goes inert and Escape closes this modal first. Pass the
   * button that opened it to get focus back there on close; otherwise whatever
   * had focus at open time is used.
   */
  open(trigger?: HTMLElement | null) {
    openOverlay(this, trigger);
    this.dispatchEvent(new CustomEvent('ai:modal:open', { bubbles: true }));
  }

  close() {
    closeOverlay(this);
    this.dispatchEvent(new CustomEvent('ai:modal:close', { bubbles: true }));
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
