// Shared clipboard helpers for the showcase pages.
// Both the catalog (main.ts) and the docs (docs.ts) use these so every code
// block on the site gets the same copy affordance and the same feedback.

type ToastType = 'success' | 'info' | 'error';

export function showToast(message: string, type: ToastType = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-message">${message}</span>
    <button class="toast-close" type="button" aria-label="Dismiss">&times;</button>
  `;
  toast.querySelector('.toast-close')?.addEventListener('click', () => toast.remove());
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

export function copyToClipboard(text: string, label: string, triggerBtn?: HTMLElement) {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast(`Copied ${label} to clipboard`);
      if (triggerBtn) {
        const originalText = triggerBtn.textContent;
        triggerBtn.textContent = 'Copied';
        triggerBtn.classList.add('is-active');
        setTimeout(() => {
          triggerBtn.textContent = originalText;
          triggerBtn.classList.remove('is-active');
        }, 1500);
      }
    })
    .catch(() => {
      showToast(`Could not copy ${label} to the clipboard`, 'error');
      if (triggerBtn) {
        const originalText = triggerBtn.textContent;
        triggerBtn.textContent = 'Copy failed';
        setTimeout(() => {
          triggerBtn.textContent = originalText;
        }, 1600);
      }
    });
}

// Wraps every <pre> under root in a positioned box and drops a Copy button in
// the corner. Safe to call again after a re-render: wrapped blocks are skipped.
export function addCopyButtons(root: ParentNode = document) {
  root.querySelectorAll<HTMLPreElement>('pre').forEach((pre) => {
    if (pre.parentElement?.querySelector('.copy-pre-btn')) return;
    const wrap = document.createElement('div');
    wrap.className = 'relative';
    pre.parentNode?.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    // The button is laid over the block, so the block reserves a lane for it.
    // This class is the hook showcase.css hangs that padding on.
    pre.classList.add('docs-pre-copy');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-ghost btn-xs copy-pre-btn absolute right-2 top-2';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
      copyToClipboard(pre.innerText, 'code', btn);
    });
    wrap.appendChild(btn);
  });
}
