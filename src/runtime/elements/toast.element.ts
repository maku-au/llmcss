export class AiToastElement extends HTMLElement {
  private timeoutId?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    this.announce();

    const duration = parseInt(this.getAttribute('duration') || '4000', 10);
    if (duration > 0) {
      this.timeoutId = setTimeout(() => {
        this.dismiss();
      }, duration);
    }

    this.addEventListener('click', (e) => {
      const closeBtn = (e.target as HTMLElement).closest('.toast-close');
      if (closeBtn) {
        this.dismiss();
      }
    });
  }

  /**
   * A toast appears without the user asking, so it has to be spoken as well as
   * painted. Ordinary notices are a polite status region; a failure is an
   * assertive alert. aria-atomic keeps the message and its countdown from being
   * read as two separate updates. An author-set role or aria-live always wins.
   */
  private announce() {
    const cls = this.className;
    const isError = cls.includes('toast-danger') || cls.includes('toast-error');
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', isError ? 'alert' : 'status');
    }
    if (!this.hasAttribute('aria-live')) {
      this.setAttribute('aria-live', this.getAttribute('role') === 'alert' ? 'assertive' : 'polite');
    }
    if (!this.hasAttribute('aria-atomic')) {
      this.setAttribute('aria-atomic', 'true');
    }
  }

  disconnectedCallback() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  dismiss() {
    this.style.opacity = '0';
    this.style.transform = 'translateY(10px)';
    this.style.transition = 'all 200ms ease';
    setTimeout(() => {
      this.remove();
    }, 200);
  }
}
