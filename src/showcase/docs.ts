import { mountChrome } from './chrome';

function addCopyButtons() {
  document.querySelectorAll('pre').forEach((pre) => {
    if (pre.parentElement?.querySelector('.copy-pre-btn')) return;
    const wrap = document.createElement('div');
    wrap.style.position = 'relative';
    pre.parentNode?.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-ghost btn-xs copy-pre-btn';
    btn.textContent = 'Copy';
    btn.style.position = 'absolute';
    btn.style.top = '0.5rem';
    btn.style.right = '0.5rem';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText);
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 1600);
      } catch {
        btn.textContent = 'Copy failed';
      }
    });
    wrap.appendChild(btn);
  });
}

mountChrome().then(addCopyButtons);
