export class AiDropdownElement extends HTMLElement {
  private onDocClick = (e: Event) => {
    if (this.isOpen && !this.contains(e.target as Node)) this.close();
  };

  private onDocKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.isOpen) this.close();
  };

  get isOpen(): boolean {
    return this.classList.contains('is-open') || this.hasAttribute('open');
  }

  private syncTrigger(open: boolean) {
    this.querySelectorAll('.dropdown-trigger, [data-ai-toggle="dropdown"]').forEach((t) =>
      t.setAttribute('aria-expanded', open ? 'true' : 'false')
    );
  }

  open() {
    this.classList.add('is-open');
    this.setAttribute('open', '');
    this.syncTrigger(true);
    this.dispatchEvent(new CustomEvent('ai:dropdown:open', { bubbles: true }));
  }

  close() {
    this.classList.remove('is-open');
    this.removeAttribute('open');
    this.syncTrigger(false);
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
    // Only the trigger toggles; item buttons keep their own click behaviour.
    this.addEventListener('click', (e) => {
      const trigger = (e.target as HTMLElement).closest('.dropdown-trigger');
      if (trigger && this.contains(trigger)) {
        this.toggle();
        return;
      }
      if ((e.target as HTMLElement).closest('.dropdown-item')) this.close();
    });
    document.addEventListener('click', this.onDocClick);
    document.addEventListener('keydown', this.onDocKey);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.onDocClick);
    document.removeEventListener('keydown', this.onDocKey);
  }
}
