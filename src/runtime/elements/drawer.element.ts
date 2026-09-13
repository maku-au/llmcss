import { openOverlay, closeOverlay } from '../attributes';

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

  /**
   * Opens through the shared overlay stack: focus trap, inert background,
   * focus restore and Escape all apply. Pass the invoking element to control
   * where focus returns; a drawer carrying `drawer-no-lock` or `modeless`
   * stays modeless as usual.
   */
  open(trigger?: HTMLElement | null) {
    openOverlay(this, trigger);
    this.dispatchEvent(new CustomEvent('ai:drawer:open', { bubbles: true }));
  }

  close() {
    closeOverlay(this);
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
      if (target && target.classList.contains('drawer-backdrop')) {
        this.close();
      }
    });
  }
}
