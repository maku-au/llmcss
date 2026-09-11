export class AiDrawerElement extends HTMLElement {
  get isOpen(): boolean {
    return this.classList.contains('is-open') || this.hasAttribute('open');
  }

  set isOpen(value: boolean) {
    if (value) {
      this.classList.add('is-open');
      this.setAttribute('open', '');
    } else {
      this.classList.remove('is-open');
      this.removeAttribute('open');
    }
  }

  open() {
    this.isOpen = true;
    this.dispatchEvent(new CustomEvent('ai:drawer:open', { bubbles: true }));
  }

  close() {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('ai:drawer:close', { bubbles: true }));
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
      const target = e.target as HTMLElement;
      if (target && target.classList.contains('ai-drawer-backdrop')) {
        this.close();
      }
    });
  }
}
