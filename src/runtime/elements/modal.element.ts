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
      if (target && target.classList.contains('ai-modal-backdrop')) {
        this.close();
      }
    });
  }

  open() {
    this.isOpen = true;
    this.dispatchEvent(new CustomEvent('ai:modal:open', { bubbles: true }));
  }

  close() {
    this.isOpen = false;
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
