/**
 * LLMCSS Data-Attribute Event Delegation Engine
 *
 * Enables fully functional interactive components using pure standard HTML attributes:
 * - data-ai-toggle="modal" data-ai-target="#modal-id"
 * - data-ai-dismiss="modal" | "drawer" | "toast"
 * - data-ai-tab="#panel-id"
 * - data-ai-toggle="dropdown"
 * - data-ai-toggle="accordion"
 *
 * Overlays (modal, drawer, command palette) get dialog behaviour for free:
 * focus moves into the panel on open and back to the trigger on close, Tab is
 * trapped inside, Escape closes only the topmost one, the rest of the page is
 * made inert, and every trigger pointing at the overlay keeps aria-expanded in
 * sync. Add the class `drawer-no-lock` (or `modeless`) to an overlay
 * that should stay modeless, like a settings panel the user works alongside.
 */

import { CLASS_PREFIX as c } from '../config/prefix';

const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

export function initDataAttributes(prefix = 'ai') {
  const toggleAttr = `data-${prefix}-toggle`;
  const targetAttr = `data-${prefix}-target`;
  const dismissAttr = `data-${prefix}-dismiss`;
  const tabAttr = `data-${prefix}-tab`;

  const overlaySelector = ['modal', 'drawer', 'command-palette']
    .map((k) => `.${c}${k}, ${prefix}-${k}`)
    .join(', ');
  const panelSelector = `.${c}modal-box, .${c}drawer-panel, .${c}command-box`;
  const modelessClass = [`${c}drawer-no-lock`, `${c}modeless`];

  const isOpen = (el: Element) => el.hasAttribute('open') || el.classList.contains('is-open');
  const isModeless = (el: Element) => modelessClass.some((c) => el.classList.contains(c));
  const panelOf = (el: Element) => (el.querySelector(panelSelector) as HTMLElement | null) || (el as HTMLElement);

  // Stack of open modal overlays, topmost last. Modeless overlays are tracked
  // only so their aria state and trigger focus stay correct.
  const stack: Array<{ el: Element; trigger: HTMLElement | null }> = [];

  function syncExpanded(el: Element, open: boolean) {
    if (!el.id) return;
    const sel = `[${targetAttr}="#${CSS.escape(el.id)}"]`;
    document.querySelectorAll(sel).forEach((t) => t.setAttribute('aria-expanded', open ? 'true' : 'false'));
  }

  function prune() {
    for (let i = stack.length - 1; i >= 0; i--) {
      if (!stack[i].el.isConnected || !isOpen(stack[i].el)) stack.splice(i, 1);
    }
  }

  function applyInert() {
    prune();
    const modal = stack.filter((s) => !isModeless(s.el)).map((s) => s.el);
    Array.from(document.body.children).forEach((child) => {
      if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE') return;
      const holdsOverlay = modal.some((m) => child === m || child.contains(m));
      (child as HTMLElement).inert = modal.length > 0 && !holdsOverlay;
    });
  }

  function openOverlay(el: Element, trigger: HTMLElement | null) {
    if (isOpen(el)) return;
    el.setAttribute('open', '');
    el.classList.add('is-open');
    stack.push({ el, trigger: trigger || (document.activeElement as HTMLElement | null) });
    syncExpanded(el, true);
    applyInert();
    const panel = panelOf(el);
    const first =
      (el.querySelector('[autofocus]') as HTMLElement | null) ||
      (el.querySelector(`.${c}command-input`) as HTMLElement | null);
    if (first) {
      setTimeout(() => first.focus(), 30);
    } else if (!isModeless(el)) {
      if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '-1');
      panel.focus({ preventScroll: true });
    }
  }

  function closeOverlay(el: Element) {
    el.removeAttribute('open');
    el.classList.remove('is-open');
    const idx = stack.findIndex((s) => s.el === el);
    const entry = idx >= 0 ? stack.splice(idx, 1)[0] : null;
    syncExpanded(el, false);
    applyInert();
    const active = document.activeElement;
    const focusInside = active && el.contains(active);
    if (entry?.trigger && entry.trigger.isConnected && (focusInside || active === document.body)) {
      entry.trigger.focus({ preventScroll: true });
    }
  }

  // Topmost modal overlay; with includeModeless, the most recent open overlay
  // of any kind (Escape should still dismiss a modeless panel).
  function topOverlay(includeModeless = false): Element | null {
    prune();
    for (let i = stack.length - 1; i >= 0; i--) {
      if (includeModeless || !isModeless(stack[i].el)) return stack[i].el;
    }
    // Overlays opened by other code (custom elements, scripts) are not on the
    // stack; fall back to the last open one in DOM order.
    const open = Array.from(document.querySelectorAll(overlaySelector)).filter((o) => isOpen(o) && (includeModeless || !isModeless(o)));
    return open.length ? open[open.length - 1] : null;
  }

  function closeDropdowns(except?: Element | null) {
    document.querySelectorAll(`.${c}dropdown.is-open, ${prefix}-dropdown[open]`).forEach((d) => {
      if (d === except) return;
      d.classList.remove('is-open');
      d.removeAttribute('open');
      d.querySelectorAll(`[${toggleAttr}="dropdown"]`).forEach((t) => t.setAttribute('aria-expanded', 'false'));
    });
  }

  // Public API for scripts that open or close overlays themselves
  (window as any).LLMCSS = Object.assign((window as any).LLMCSS || {}, {
    open: (el: Element | string) => { const t = typeof el === 'string' ? document.querySelector(el) : el; if (t) openOverlay(t, null); },
    close: (el: Element | string) => { const t = typeof el === 'string' ? document.querySelector(el) : el; if (t) closeOverlay(t); },
  });

  // Global Click Delegator
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    // 1. Dismiss Actions (Modal, Drawer, Toast)
    const dismissBtn = target.closest(`[${dismissAttr}]`);
    if (dismissBtn) {
      const dismissType = dismissBtn.getAttribute(dismissAttr);
      if (dismissType === 'modal' || dismissType === 'drawer') {
        const overlay = dismissBtn.closest(`.${c}${dismissType}, ${prefix}-${dismissType}`);
        if (overlay) closeOverlay(overlay);
      } else if (dismissType === 'toast') {
        const toast = dismissBtn.closest(`.${c}toast, ${prefix}-toast`);
        if (toast) toast.remove();
      }
      return;
    }

    // 2. Toggle Actions
    const toggleEl = target.closest(`[${toggleAttr}]`) as HTMLElement | null;
    if (toggleEl) {
      const action = toggleEl.getAttribute(toggleAttr);
      const targetSelector = toggleEl.getAttribute(targetAttr);

      if ((action === 'modal' || action === 'drawer') && targetSelector) {
        const overlay = document.querySelector(targetSelector);
        if (overlay) {
          if (isOpen(overlay)) closeOverlay(overlay);
          else openOverlay(overlay, toggleEl);
        }
      } else if (action === 'dropdown') {
        const dropdown = toggleEl.closest(`.${c}dropdown, ${prefix}-dropdown`);
        if (dropdown) {
          const open = dropdown.classList.contains('is-open') || dropdown.hasAttribute('open');
          closeDropdowns(dropdown);
          if (open) {
            dropdown.classList.remove('is-open');
            dropdown.removeAttribute('open');
          } else {
            dropdown.classList.add('is-open');
            dropdown.setAttribute('open', '');
          }
          toggleEl.setAttribute('aria-expanded', open ? 'false' : 'true');
        }
      } else if (action === 'accordion') {
        const item = toggleEl.closest(`.${c}accordion-item`);
        if (item) {
          const open = item.classList.contains('is-open') || item.hasAttribute('open');
          if (open) {
            item.classList.remove('is-open');
            item.removeAttribute('open');
          } else {
            item.classList.add('is-open');
            item.setAttribute('open', '');
          }
          toggleEl.setAttribute('aria-expanded', open ? 'false' : 'true');
        }
      }
      return;
    }

    // 3. Tab Switching
    const tabEl = target.closest(`[${tabAttr}]`) as HTMLElement | null;
    if (tabEl) {
      selectTab(tabEl);
      return;
    }

    // 4. Click-outside to close dropdowns
    if (!target.closest(`.${c}dropdown, ${prefix}-dropdown`)) {
      closeDropdowns();
    }

    // 5. Backdrop click to close modals & drawers
    if (target.classList.contains(`${c}modal-backdrop`) || target.classList.contains(`${c}drawer-backdrop`)) {
      const overlay = target.closest(overlaySelector);
      if (overlay) closeOverlay(overlay);
    }
  });

  function selectTab(tabEl: HTMLElement) {
    const panelSel = tabEl.getAttribute(tabAttr);
    const tabsContainer = tabEl.closest(`.${c}tabs, ${prefix}-tabs`);
    if (!tabsContainer || !panelSel) return;
    tabsContainer.querySelectorAll(`[${tabAttr}]`).forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    tabsContainer.querySelectorAll(`.${c}tab-panel`).forEach((p) => {
      p.classList.remove('is-active');
      p.removeAttribute('data-active');
    });
    tabEl.classList.add('is-active');
    tabEl.setAttribute('aria-selected', 'true');
    tabEl.setAttribute('tabindex', '0');
    const panel = tabsContainer.querySelector(panelSel);
    if (panel) {
      panel.classList.add('is-active');
      panel.setAttribute('data-active', 'true');
    }
  }

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (event) => {
    // Escape: close the topmost overlay, otherwise any open dropdown
    if (event.key === 'Escape') {
      const top = topOverlay(true);
      if (top) {
        event.preventDefault();
        closeOverlay(top);
        return;
      }
      closeDropdowns();
      return;
    }

    // Tab: keep focus inside the topmost modal overlay
    if (event.key === 'Tab') {
      const top = topOverlay();
      if (!top) return;
      const panel = panelOf(top);
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );
      if (!items.length) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active && panel.contains(active);
      if (event.shiftKey && (!inside || active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!inside || active === last)) {
        event.preventDefault();
        first.focus();
      }
      return;
    }

    // Arrow keys move between tabs (WAI-ARIA tabs pattern)
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Home' || event.key === 'End') {
      const active = document.activeElement as HTMLElement | null;
      if (!active || !active.hasAttribute(tabAttr)) return;
      const container = active.closest(`.${c}tabs, ${prefix}-tabs`);
      if (!container) return;
      const tabs = Array.from(container.querySelectorAll<HTMLElement>(`[${tabAttr}]`));
      const i = tabs.indexOf(active);
      if (i < 0) return;
      let next = i;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      event.preventDefault();
      tabs[next].focus();
      selectTab(tabs[next]);
      return;
    }

    // Cmd+K or Ctrl+K to open Command Palette
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      const palette = document.querySelector(`.${c}command-palette, ${prefix}-command-palette`);
      if (palette) {
        event.preventDefault();
        if (isOpen(palette)) closeOverlay(palette);
        else openOverlay(palette, document.activeElement as HTMLElement | null);
      }
    }
  });
}
