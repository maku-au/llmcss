/**
 * LLMCSS split pane runtime.
 *
 * Progressive enhancement only. Layout is CSS: `--{prefix}-split-a` sizes the
 * first pane and `--{prefix}-split-b` is the flexible remainder. Without this
 * script the handle is still a separator; drag and arrow keys do nothing.
 *
 * Idempotent via `data-split-ready` on each root. Safe to call repeatedly.
 */

function setupSplit(root: HTMLElement, prefix: string): void {
  if (root.hasAttribute('data-split-ready')) return;

  const found = root.querySelector<HTMLElement>(`.${prefix}-split-handle`);
  if (!found) return;
  const handle: HTMLElement = found;

  root.setAttribute('data-split-ready', '');

  const down = root.classList.contains(`${prefix}-split-vertical`);
  const min = Number(handle.getAttribute('aria-valuemin')) || 20;
  const max = Number(handle.getAttribute('aria-valuemax')) || 80;

  function set(pct: number): void {
    pct = Math.min(max, Math.max(min, pct));
    root.style.setProperty(`--${prefix}-split-a`, `${pct.toFixed(1)}%`);
    handle.setAttribute('aria-valuenow', String(Math.round(pct)));
  }

  function track(event: PointerEvent): void {
    const box = root.getBoundingClientRect();
    set(
      down
        ? ((event.clientY - box.top) / box.height) * 100
        : ((event.clientX - box.left) / box.width) * 100
    );
  }

  handle.addEventListener('pointerdown', (event: PointerEvent) => {
    event.preventDefault();
    handle.setPointerCapture(event.pointerId);
    handle.addEventListener('pointermove', track);
    handle.addEventListener('pointerup', function stop() {
      handle.removeEventListener('pointermove', track);
      handle.removeEventListener('pointerup', stop);
    });
  });

  handle.addEventListener('keydown', (event: KeyboardEvent) => {
    const back = down ? 'ArrowUp' : 'ArrowLeft';
    const fwd = down ? 'ArrowDown' : 'ArrowRight';
    if (event.key !== back && event.key !== fwd) return;
    event.preventDefault();
    set((Number(handle.getAttribute('aria-valuenow')) || 50) + (event.key === fwd ? 2 : -2));
  });
}

/**
 * Wire every `.{prefix}-split` on the page. Safe to call repeatedly: each
 * root is marked `data-split-ready` so listeners are never doubled.
 */
export function initSplit(prefix = 'ai'): void {
  if (typeof document === 'undefined') return;

  const scan = () =>
    document
      .querySelectorAll<HTMLElement>(`.${prefix}-split:not([data-split-ready])`)
      .forEach((root) => setupSplit(root, prefix));

  scan();

  // Splits rendered after load (galleries, SPAs) are wired as they appear.
  if (
    typeof MutationObserver !== 'undefined' &&
    document.body &&
    !(document.documentElement as HTMLElement).hasAttribute(`data-${prefix}-split-watch`)
  ) {
    (document.documentElement as HTMLElement).setAttribute(`data-${prefix}-split-watch`, '');
    let pending = 0;
    new MutationObserver(() => {
      if (pending) return;
      pending = window.setTimeout(() => {
        pending = 0;
        scan();
      }, 50);
    }).observe(document.body, { childList: true, subtree: true });
  }
}
