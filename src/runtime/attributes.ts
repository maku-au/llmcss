/**
 * LLMCSS Data-Attribute Event Delegation Engine
 *
 * Enables fully functional interactive components using pure standard HTML attributes:
 * - data-ai-toggle="modal" data-ai-target="#modal-id"
 * - data-ai-dismiss="modal" | "drawer" | "toast"
 * - data-ai-tab="#panel-id"
 * - data-ai-toggle="dropdown"
 * - data-ai-toggle="accordion"
 */

export function initDataAttributes(prefix = 'ai') {
  const toggleAttr = `data-${prefix}-toggle`;
  const targetAttr = `data-${prefix}-target`;
  const dismissAttr = `data-${prefix}-dismiss`;
  const tabAttr = `data-${prefix}-tab`;

  // Global Click Delegator
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    // 1. Dismiss Actions (Modal, Drawer, Toast)
    const dismissBtn = target.closest(`[${dismissAttr}]`);
    if (dismissBtn) {
      const dismissType = dismissBtn.getAttribute(dismissAttr);
      if (dismissType === 'modal') {
        const modal = dismissBtn.closest(`.${prefix}-modal, ${prefix}-modal`);
        if (modal) {
          modal.removeAttribute('open');
          modal.classList.remove('is-open');
        }
      } else if (dismissType === 'drawer') {
        const drawer = dismissBtn.closest(`.${prefix}-drawer, ${prefix}-drawer`);
        if (drawer) {
          drawer.removeAttribute('open');
          drawer.classList.remove('is-open');
        }
      } else if (dismissType === 'toast') {
        const toast = dismissBtn.closest(`.${prefix}-toast, ${prefix}-toast`);
        if (toast) {
          toast.remove();
        }
      }
      return;
    }

    // 2. Toggle Actions
    const toggleEl = target.closest(`[${toggleAttr}]`);
    if (toggleEl) {
      const action = toggleEl.getAttribute(toggleAttr);
      const targetSelector = toggleEl.getAttribute(targetAttr);

      if (action === 'modal' && targetSelector) {
        const modal = document.querySelector(targetSelector);
        if (modal) {
          const isOpen = modal.hasAttribute('open') || modal.classList.contains('is-open');
          if (isOpen) {
            modal.removeAttribute('open');
            modal.classList.remove('is-open');
          } else {
            modal.setAttribute('open', '');
            modal.classList.add('is-open');
          }
        }
      } else if (action === 'drawer' && targetSelector) {
        const drawer = document.querySelector(targetSelector);
        if (drawer) {
          const isOpen = drawer.hasAttribute('open') || drawer.classList.contains('is-open');
          if (isOpen) {
            drawer.removeAttribute('open');
            drawer.classList.remove('is-open');
          } else {
            drawer.setAttribute('open', '');
            drawer.classList.add('is-open');
          }
        }
      } else if (action === 'dropdown') {
        const dropdown = toggleEl.closest(`.${prefix}-dropdown, ${prefix}-dropdown`);
        if (dropdown) {
          const isOpen = dropdown.classList.contains('is-open') || dropdown.hasAttribute('open');
          // Close other open dropdowns
          document.querySelectorAll(`.${prefix}-dropdown.is-open, ${prefix}-dropdown[open]`).forEach((d) => {
            if (d !== dropdown) {
              d.classList.remove('is-open');
              d.removeAttribute('open');
            }
          });
          if (isOpen) {
            dropdown.classList.remove('is-open');
            dropdown.removeAttribute('open');
          } else {
            dropdown.classList.add('is-open');
            dropdown.setAttribute('open', '');
          }
        }
      } else if (action === 'accordion') {
        const item = toggleEl.closest(`.${prefix}-accordion-item`);
        if (item) {
          const isOpen = item.classList.contains('is-open') || item.hasAttribute('open');
          if (isOpen) {
            item.classList.remove('is-open');
            item.removeAttribute('open');
          } else {
            item.classList.add('is-open');
            item.setAttribute('open', '');
          }
        }
      }
      return;
    }

    // 3. Tab Switching
    const tabEl = target.closest(`[${tabAttr}]`);
    if (tabEl) {
      const panelSelector = tabEl.getAttribute(tabAttr);
      const tabsContainer = tabEl.closest(`.${prefix}-tabs, ${prefix}-tabs`);
      if (tabsContainer && panelSelector) {
        // Deactivate siblings
        tabsContainer.querySelectorAll(`[${tabAttr}]`).forEach((t) => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tabsContainer.querySelectorAll(`.${prefix}-tab-panel`).forEach((p) => {
          p.classList.remove('is-active');
          p.removeAttribute('data-active');
        });

        // Activate clicked
        tabEl.classList.add('is-active');
        tabEl.setAttribute('aria-selected', 'true');
        const panel = tabsContainer.querySelector(panelSelector);
        if (panel) {
          panel.classList.add('is-active');
          panel.setAttribute('data-active', 'true');
        }
      }
      return;
    }

    // 4. Click-outside to close dropdowns
    if (!target.closest(`.${prefix}-dropdown, ${prefix}-dropdown`)) {
      document.querySelectorAll(`.${prefix}-dropdown.is-open, ${prefix}-dropdown[open]`).forEach((d) => {
        d.classList.remove('is-open');
        d.removeAttribute('open');
      });
    }

    // 5. Backdrop click to close modals & drawers
    if (target.classList.contains(`${prefix}-modal-backdrop`)) {
      const modal = target.closest(`.${prefix}-modal, ${prefix}-modal`);
      if (modal) {
        modal.removeAttribute('open');
        modal.classList.remove('is-open');
      }
    }
    if (target.classList.contains(`${prefix}-drawer-backdrop`)) {
      const drawer = target.closest(`.${prefix}-drawer, ${prefix}-drawer`);
      if (drawer) {
        drawer.removeAttribute('open');
        drawer.classList.remove('is-open');
      }
    }
  });

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      // Close open modals
      document.querySelectorAll(`.${prefix}-modal[open], .${prefix}-modal.is-open, ${prefix}-modal[open]`).forEach((m) => {
        m.removeAttribute('open');
        m.classList.remove('is-open');
      });
      // Close open drawers
      document.querySelectorAll(`.${prefix}-drawer[open], .${prefix}-drawer.is-open, ${prefix}-drawer[open]`).forEach((d) => {
        d.removeAttribute('open');
        d.classList.remove('is-open');
      });
      // Close open command palettes
      document.querySelectorAll(`.${prefix}-command-palette[open], .${prefix}-command-palette.is-open, ${prefix}-command-palette[open]`).forEach((cp) => {
        cp.removeAttribute('open');
        cp.classList.remove('is-open');
      });
    }

    // Cmd+K or Ctrl+K to open Command Palette
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      const palette = document.querySelector(`.${prefix}-command-palette, ${prefix}-command-palette`);
      if (palette) {
        event.preventDefault();
        const isOpen = palette.hasAttribute('open') || palette.classList.contains('is-open');
        if (isOpen) {
          palette.removeAttribute('open');
          palette.classList.remove('is-open');
        } else {
          palette.setAttribute('open', '');
          palette.classList.add('is-open');
          const input = palette.querySelector<HTMLInputElement>(`.${prefix}-command-input`);
          if (input) setTimeout(() => input.focus(), 50);
        }
      }
    }
  });
}
