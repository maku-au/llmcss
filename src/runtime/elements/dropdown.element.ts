export class AiDropdownElement extends HTMLElement {
  get isOpen(): boolean {
    return this.classList.contains('is-open') || this.hasAttribute('open');
  }

  open() {
    this.classList.add('is-open');
    this.setAttribute('open', '');
    this.dispatchEvent(new CustomEvent('ai:dropdown:open', { bubbles: true }));
  }

  close() {
    this.classList.remove('is-open');
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('ai:dropdown:close', { bubbles: true }));
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  connectedCallback() {
    this.addEventListener('click', (e) => {
      const trigger = (e.target as HTMLElement).closest('.ai-dropdown-trigger, button');
      if (trigger && this.contains(trigger)) {
        this.toggle();
      }
    });
  }
}
