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

  open() {
    this.isOpen = true;
    this.dispatchEvent(new CustomEvent('ai:command:open', { bubbles: true }));
  }

  close() {
    this.isOpen = false;
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
