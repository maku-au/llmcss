export class AiTabsElement extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.ai-tab') as HTMLElement | null;
      if (!target || !this.contains(target)) return;

      const targetId = target.getAttribute('data-ai-tab') || target.getAttribute('href');
      if (!targetId) return;

      e.preventDefault();
      this.selectTab(target, targetId);
    });
  }

  selectTab(tabBtn: HTMLElement, panelSelector: string) {
    // Unset all tabs
    this.querySelectorAll('.ai-tab').forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });

    // Hide all panels
    this.querySelectorAll('.ai-tab-panel').forEach((p) => {
      p.classList.remove('is-active');
      p.removeAttribute('data-active');
    });

    // Activate selected
    tabBtn.classList.add('is-active');
    tabBtn.setAttribute('aria-selected', 'true');
    tabBtn.setAttribute('tabindex', '0');

    const panel = this.querySelector(panelSelector) || document.querySelector(panelSelector);
    if (panel) {
      panel.classList.add('is-active');
      panel.setAttribute('data-active', 'true');
    }

    this.dispatchEvent(new CustomEvent('ai:tab:change', {
      detail: { tab: tabBtn, targetId: panelSelector },
      bubbles: true,
    }));
  }
}
