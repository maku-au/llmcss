/**
 * LLMCSS Scrollspy runtime.
 *
 * Marks the one `.scrollspy-link` whose section is currently in view with
 * `.is-active` and `aria-current="location"`.
 *
 * Progressive enhancement only: a link cannot match `:target`, so with this
 * script absent the outline keeps whichever link the author marked active and
 * every link still jumps to its section. Nothing here is required to render.
 *
 * Optional attribute on the nav: `data-{prefix}-scrollspy-root="#selector"`
 * names the scrolling element to observe inside, for an outline beside a
 * scrolling pane rather than the page itself.
 */

import { CLASS_PREFIX as c } from '../config/prefix';


interface SpyEntry {
  link: HTMLAnchorElement;
  target: Element;
}

/** One observer per nav, so re-running rebuilds instead of stacking. */
const observers = new WeakMap<HTMLElement, IntersectionObserver>();

function resolveRoot(nav: HTMLElement, prefix: string): Element | null {
  const selector = (nav.getAttribute(`data-${prefix}-scrollspy-root`) || '').trim();
  if (!selector) return null;
  try {
    return document.querySelector(selector);
  } catch {
    // An author typo in the selector must not break the page.
    return null;
  }
}

function collect(nav: HTMLElement, prefix: string): SpyEntry[] {
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>(`a.${c}scrollspy-link[href*="#"]`));
  const entries: SpyEntry[] = [];

  for (const link of links) {
    const href = link.getAttribute('href') || '';
    const hash = href.slice(href.indexOf('#') + 1);
    if (!hash) continue;
    let id = hash;
    try {
      id = decodeURIComponent(hash);
    } catch {
      // Leave a malformed escape sequence as written.
    }
    const target = document.getElementById(id);
    if (target) entries.push({ link, target });
  }

  return entries;
}

function setupSpy(nav: HTMLElement, prefix: string): void {
  const previous = observers.get(nav);
  if (previous) {
    previous.disconnect();
    observers.delete(nav);
  }

  const entries = collect(nav, prefix);
  if (!entries.length) return;

  const ratio = new Map<Element, number>();

  function mark(target: Element): void {
    for (const entry of entries) {
      const on = entry.target === target;
      entry.link.classList.toggle('is-active', on);
      if (on) entry.link.setAttribute('aria-current', 'location');
      else entry.link.removeAttribute('aria-current');
    }
  }

  function update(): void {
    // Exactly one link is active: the intersecting section with the largest
    // visible share; on a tie the later one wins so scrolling down advances.
    // If nothing intersects, the last choice stands.
    let best: Element | null = null;
    let bestRatio = 0;
    for (const entry of entries) {
      const r = ratio.get(entry.target) || 0;
      if (r > 0 && r >= bestRatio) {
        best = entry.target;
        bestRatio = r;
      }
    }
    if (best) mark(best);
  }

  const root = resolveRoot(nav, prefix);
  const observer = new IntersectionObserver(
    (records) => {
      for (const record of records) {
        ratio.set(record.target, record.isIntersecting ? Math.max(record.intersectionRatio, 0.001) : 0);
      }
      update();
    },
    {
      root,
      // Bias towards the section occupying the top of the viewport or pane.
      rootMargin: '0px 0px -40% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }
  );

  for (const entry of entries) observer.observe(entry.target);
  observers.set(nav, observer);
}

/**
 * Wire every `.scrollspy` outline on the page. Safe to call
 * repeatedly: each call rebuilds that nav's observer rather than adding one.
 */
export function initScrollspy(prefix = 'ai'): void {
  if (typeof document === 'undefined') return;
  if (typeof IntersectionObserver === 'undefined') return;

  document.querySelectorAll<HTMLElement>(`.${c}scrollspy`).forEach((nav) => setupSpy(nav, prefix));

  // Navs rendered after load (galleries, SPAs) are picked up as they appear.
  const scan = () => document.querySelectorAll<HTMLElement>(`.${c}scrollspy`).forEach((nav) => { if (!observers.has(nav)) setupSpy(nav, prefix); });
  if (typeof MutationObserver !== 'undefined' && !(document.documentElement as HTMLElement).hasAttribute(`data-${prefix}-scrollspy-watch`)) {
    (document.documentElement as HTMLElement).setAttribute(`data-${prefix}-scrollspy-watch`, '');
    let pending = 0;
    new MutationObserver(() => {
      if (pending) return;
      pending = window.setTimeout(() => { pending = 0; scan(); }, 50);
    }).observe(document.body, { childList: true, subtree: true });
  }
}
