/**
 * LLMCSS Combobox, Number Stepper and Password Toggle runtime.
 *
 * Progressive enhancement only. Every component in this file renders and stays
 * usable with the script absent:
 *   - `.combobox` opens its listbox on :focus-within and filters nothing.
 *   - `.stepper-input` wraps a native number input, so the arrow keys and
 *     the form still work; only the two buttons need wiring.
 *   - `.password` is a plain password field; the toggle button stays hidden
 *     until this script marks the wrapper `.is-ready`.
 *
 * Every exported function is idempotent: calling it twice never doubles a
 * listener, and calling it on a page with no matching element does nothing.
 */

import { CLASS_PREFIX as c } from '../config/prefix';


/** Comboboxes already wired, so a second init pass skips them. */
const wiredComboboxes = new WeakSet<HTMLElement>();

/** Delegated document listeners already bound, keyed by feature and prefix. */
const boundListeners = new Set<string>();

let optionSeq = 0;

function bindOnce(key: string): boolean {
  if (boundListeners.has(key)) return false;
  boundListeners.add(key);
  return true;
}

function elementFromEvent(event: Event): Element | null {
  const target = event.target;
  return target instanceof Element ? target : null;
}

function fire(input: HTMLInputElement): void {
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

/* ==========================================================================
   Combobox
   ========================================================================== */

interface ComboboxParts {
  input: HTMLInputElement;
  list: HTMLElement;
}

function findParts(box: HTMLElement, prefix: string): ComboboxParts | null {
  const input =
    box.querySelector<HTMLInputElement>('input[role="combobox"]') ||
    box.querySelector<HTMLInputElement>(`input.${c}input`);
  if (!input) return null;

  // Native fallback: the author wired a <datalist>, so leave the field alone.
  if (input.hasAttribute('list')) return null;

  let list: HTMLElement | null = null;
  const controls = input.getAttribute('aria-controls');
  if (controls) {
    const byId = document.getElementById(controls);
    if (byId instanceof HTMLElement) list = byId;
  }
  if (!list) list = box.querySelector<HTMLElement>(`.${c}combobox-list`);
  if (!list) return null;

  return { input, list };
}

function setupCombobox(box: HTMLElement, prefix: string): void {
  if (wiredComboboxes.has(box)) return;
  const parts = findParts(box, prefix);
  if (!parts) return;
  wiredComboboxes.add(box);

  const { input, list } = parts;
  const empty = list.querySelector<HTMLElement>(`.${c}combobox-empty`);

  if (!list.id) list.id = `${prefix}-combobox-list-${++optionSeq}`;
  if (!input.getAttribute('aria-controls')) input.setAttribute('aria-controls', list.id);
  if (!input.getAttribute('aria-autocomplete')) input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('autocomplete', input.getAttribute('autocomplete') || 'off');

  // The wrapper now owns its open state instead of :focus-within.
  box.classList.add('is-ready');
  box.classList.remove('is-open');

  let activeIndex = -1;

  const allOptions = (): HTMLElement[] =>
    Array.from(list.querySelectorAll<HTMLElement>('[role="option"]'));

  const shownOptions = (): HTMLElement[] =>
    allOptions().filter((option) => !option.hasAttribute('hidden') && option.getAttribute('aria-disabled') !== 'true');

  const labelOf = (option: HTMLElement): string =>
    option.getAttribute(`data-${prefix}-value`) || (option.textContent || '').trim();

  const isOpen = (): boolean => box.classList.contains('is-open');

  function clearActive(): void {
    activeIndex = -1;
    input.removeAttribute('aria-activedescendant');
    allOptions().forEach((option) => option.classList.remove('is-active'));
  }

  function setActive(index: number): void {
    const options = shownOptions();
    if (!options.length) {
      clearActive();
      return;
    }
    const next = ((index % options.length) + options.length) % options.length;
    activeIndex = next;
    allOptions().forEach((option) => option.classList.remove('is-active'));
    const option = options[next];
    if (!option.id) option.id = `${prefix}-combobox-option-${++optionSeq}`;
    option.classList.add('is-active');
    input.setAttribute('aria-activedescendant', option.id);
    option.scrollIntoView({ block: 'nearest' });
  }

  function open(): void {
    if (isOpen()) return;
    box.classList.add('is-open');
    input.setAttribute('aria-expanded', 'true');
  }

  function close(): void {
    if (!isOpen()) {
      clearActive();
      return;
    }
    box.classList.remove('is-open');
    input.setAttribute('aria-expanded', 'false');
    clearActive();
  }

  function filter(): void {
    const query = input.value.trim().toLowerCase();
    let matches = 0;
    allOptions().forEach((option) => {
      const hit = query === '' || labelOf(option).toLowerCase().includes(query);
      if (hit) {
        option.removeAttribute('hidden');
        matches++;
      } else {
        option.setAttribute('hidden', '');
      }
    });
    if (empty) {
      if (matches === 0) empty.removeAttribute('hidden');
      else empty.setAttribute('hidden', '');
    }
    clearActive();
  }

  let silent = false; // true while select() dispatches its own input event

  function select(option: HTMLElement): void {
    input.value = labelOf(option);
    allOptions().forEach((other) => other.setAttribute('aria-selected', other === option ? 'true' : 'false'));
    filter();
    close();
    silent = true;
    fire(input);
    silent = false;
    if (document.activeElement !== input) input.focus();
  }

  input.addEventListener('input', () => {
    if (silent) return;
    filter();
    open();
  });

  input.addEventListener('keydown', (event: KeyboardEvent) => {
    const key = event.key;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen()) {
        open();
        setActive(key === 'ArrowDown' ? 0 : shownOptions().length - 1);
        return;
      }
      setActive(activeIndex + (key === 'ArrowDown' ? 1 : -1));
      return;
    }

    if (key === 'Enter') {
      if (!isOpen()) return;
      const options = shownOptions();
      const option = activeIndex >= 0 ? options[activeIndex] : options.length === 1 ? options[0] : null;
      if (!option) return;
      event.preventDefault();
      select(option);
      return;
    }

    if (key === 'Escape') {
      if (!isOpen()) return;
      event.preventDefault();
      // Do not let a shared Escape handler close the surrounding dialog too.
      event.stopPropagation();
      close();
      return;
    }

    if (key === 'Tab') close();
  });

  input.addEventListener('focus', () => {
    if (input.value.trim() !== '') filter();
  });

  // Keep focus in the field while the pointer lands on an option.
  list.addEventListener('mousedown', (event: MouseEvent) => {
    const origin = elementFromEvent(event);
    if (origin && origin.closest('[role="option"]')) event.preventDefault();
  });

  list.addEventListener('click', (event: MouseEvent) => {
    const origin = elementFromEvent(event);
    const option = origin ? origin.closest<HTMLElement>('[role="option"]') : null;
    if (!option || option.getAttribute('aria-disabled') === 'true') return;
    select(option);
  });

  box.addEventListener('focusout', (event: FocusEvent) => {
    const next = event.relatedTarget;
    if (next instanceof Node && box.contains(next)) return;
    close();
  });
}

/**
 * Wire every `.combobox` on the page, plus the number steppers and
 * password toggles that share this module. Safe to call repeatedly.
 */
export function initCombobox(prefix = 'ai'): void {
  if (typeof document === 'undefined') return;

  document
    .querySelectorAll<HTMLElement>(`.${c}combobox`)
    .forEach((box) => setupCombobox(box, prefix));

  // Markup rendered after load (galleries, SPAs) is wired the first time it
  // receives focus, so nothing needs to re-run init.
  if (bindOnce(`combobox-lazy:${prefix}`)) {
    document.addEventListener('focusin', (event) => {
      const origin = elementFromEvent(event);
      const box = origin ? origin.closest<HTMLElement>(`.${c}combobox`) : null;
      if (box && !box.classList.contains('is-ready')) {
        setupCombobox(box, prefix);
        box.classList.add('is-open');
        const input = box.querySelector<HTMLInputElement>('input[role="combobox"]');
        if (input) input.setAttribute('aria-expanded', 'true');
      }
    });
  }

  if (bindOnce(`combobox:${prefix}`)) {
    document.addEventListener('click', (event) => {
      const origin = elementFromEvent(event);
      document.querySelectorAll<HTMLElement>(`.${c}combobox.is-open`).forEach((box) => {
        if (origin && box.contains(origin)) return;
        box.classList.remove('is-open');
        const input = box.querySelector<HTMLInputElement>('input[role="combobox"]');
        if (input) {
          input.setAttribute('aria-expanded', 'false');
          input.removeAttribute('aria-activedescendant');
        }
        box.querySelectorAll<HTMLElement>('[role="option"]').forEach((option) => option.classList.remove('is-active'));
      });
    });
  }

  initSteppers(prefix);
  initPasswordToggles(prefix);
}

/* ==========================================================================
   Number stepper: [data-ai-step="-1"] and [data-ai-step="1"]
   ========================================================================== */

function stepperInput(button: HTMLElement, prefix: string): HTMLInputElement | null {
  const controls = button.getAttribute('aria-controls');
  if (controls) {
    const byId = document.getElementById(controls);
    if (byId instanceof HTMLInputElement) return byId;
  }
  const group = button.closest(`.${c}stepper-input`);
  const found = group ? group.querySelector('input') : null;
  return found instanceof HTMLInputElement ? found : null;
}

function manualStep(input: HTMLInputElement, direction: number): void {
  const step = Number(input.step) > 0 ? Number(input.step) : 1;
  const current = Number(input.value);
  const base = Number.isFinite(current) ? current : Number(input.min) || 0;
  let next = base + step * direction;
  const min = Number(input.min);
  const max = Number(input.max);
  if (input.min !== '' && Number.isFinite(min)) next = Math.max(min, next);
  if (input.max !== '' && Number.isFinite(max)) next = Math.min(max, next);
  // Trim binary float noise such as 0.30000000000000004.
  input.value = String(Number(next.toFixed(6)));
}

/**
 * Wire `[data-{prefix}-step]` buttons to the number input they sit beside.
 * The native input keeps working on its own, so this only serves the pointer.
 */
export function initSteppers(prefix = 'ai'): void {
  if (typeof document === 'undefined') return;
  if (!bindOnce(`stepper:${prefix}`)) return;

  const attribute = `data-${prefix}-step`;

  document.addEventListener('click', (event) => {
    const origin = elementFromEvent(event);
    const button = origin ? origin.closest<HTMLElement>(`[${attribute}]`) : null;
    if (!button) return;

    const direction = Number(button.getAttribute(attribute));
    if (!Number.isFinite(direction) || direction === 0) return;

    const input = stepperInput(button, prefix);
    if (!input || input.disabled || input.readOnly) return;

    event.preventDefault();
    const count = Math.max(1, Math.round(Math.abs(direction)));
    try {
      if (direction > 0) input.stepUp(count);
      else input.stepDown(count);
    } catch {
      manualStep(input, direction > 0 ? count : -count);
    }
    fire(input);
  });
}

/* ==========================================================================
   Password toggle: [data-ai-password-toggle]
   ========================================================================== */

function passwordField(button: HTMLElement, prefix: string, attribute: string): HTMLInputElement | null {
  const selector = (button.getAttribute(attribute) || '').trim();
  if (selector) {
    try {
      const bySelector = document.querySelector(selector);
      if (bySelector instanceof HTMLInputElement) return bySelector;
    } catch {
      // An author typo in the selector must not break the page.
    }
  }
  const wrapper = button.closest(`.${c}password`);
  const found = wrapper ? wrapper.querySelector('input') : null;
  return found instanceof HTMLInputElement ? found : null;
}

/**
 * Wire `[data-{prefix}-password-toggle]` buttons. CSS cannot change an input
 * type, so the button stays hidden until this function marks its wrapper
 * `.is-ready`; the field is a normal password input without it.
 */
export function initPasswordToggles(prefix = 'ai'): void {
  if (typeof document === 'undefined') return;

  const attribute = `data-${prefix}-password-toggle`;

  // Runs on every call so wrappers added later are revealed too.
  document.querySelectorAll<HTMLElement>(`.${c}password`).forEach((wrapper) => {
    if (wrapper.querySelector(`[${attribute}]`)) wrapper.classList.add('is-ready');
  });

  if (!bindOnce(`password:${prefix}`)) return;

  document.addEventListener('click', (event) => {
    const origin = elementFromEvent(event);
    const button = origin ? origin.closest<HTMLElement>(`[${attribute}]`) : null;
    if (!button) return;

    const input = passwordField(button, prefix, attribute);
    if (!input) return;

    event.preventDefault();
    const reveal = input.type === 'password';
    const start = input.selectionStart;
    const end = input.selectionEnd;

    input.type = reveal ? 'text' : 'password';
    button.setAttribute('aria-pressed', reveal ? 'true' : 'false');
    button.setAttribute('aria-label', reveal ? 'Hide password' : 'Show password');

    const wrapper = button.closest(`.${c}password`);
    if (wrapper) wrapper.classList.toggle('is-visible', reveal);

    input.focus();
    if (start !== null && end !== null) {
      try {
        input.setSelectionRange(start, end);
      } catch {
        // Some engines reject a range right after a type change; harmless.
      }
    }
  });
}
