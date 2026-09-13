export class AiToastElement extends HTMLElement {
  private timeoutId: any;

  connectedCallback() {
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
