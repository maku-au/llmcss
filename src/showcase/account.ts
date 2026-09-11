const params = new URLSearchParams(location.search);
const checkoutId = params.get('checkout_id');
const revealBox = document.getElementById('reveal-box');
const form = document.getElementById('validate-form') as HTMLFormElement | null;
const input = document.getElementById('token-input') as HTMLInputElement | null;
const out = document.getElementById('validate-out');
const themeToggle = document.getElementById('theme-mode-toggle');

function applyAccountTheme() {
  const saved = localStorage.getItem('cssai-theme');
  const theme = saved === 'dark' || saved === 'light' ? saved : 'light';
  document.documentElement.setAttribute('data-ai-theme', theme);
}

function show(el: HTMLElement | null, html: string) {
  if (!el) return;
  el.style.display = 'block';
  el.innerHTML = html;
}

function waitingMarkup(extra = ''): string {
  return `<p class="ai-text-sm ai-text-secondary">Waiting for Polar webhook...</p>
    <div class="ai-progress ai-progress-indeterminate" style="margin-top: var(--ai-space-3);"><div class="ai-progress-bar"></div></div>
    ${extra}`;
}

function bindCopy(token: string) {
  const btn = document.getElementById('copy-token');
  btn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(token);
      if (btn) {
        const prev = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = prev;
        }, 2000);
      }
    } catch {
      /* ignore */
    }
  });
}

function renderToken(token: string) {
  if (!revealBox) return;
  show(
    revealBox,
    `
        <h2 class="ai-card-title">License token (shown once)</h2>
        <p class="ai-text-sm ai-text-secondary" style="margin-top: var(--ai-space-2);">Copy it now. We will not display it again.</p>
        <pre style="margin-top: var(--ai-space-4); overflow-x: auto;"><code id="token-once">${token}</code></pre>
        <button class="ai-btn ai-btn-outline ai-btn-sm" type="button" id="copy-token" style="margin-top: var(--ai-space-3);">Copy token</button>
        <p class="ai-text-xs ai-text-muted" style="margin-top: var(--ai-space-4);">Zip backup: send this token as Bearer to /api/download-zip.php</p>
      `
  );
  localStorage.setItem('llmcss_token', token);
  bindCopy(token);
}

async function pollOnce(): Promise<'ok' | 'wait' | 'done'> {
  if (!revealBox || !checkoutId) return 'done';
  const res = await fetch('/api/reveal.php?checkout_id=' + encodeURIComponent(checkoutId), { cache: 'no-store' });
  const data = await res.json().catch(() => ({}));
  if (res.status === 404) return 'wait';
  if (data.token) {
    renderToken(data.token);
    return 'ok';
  }
  if (data.shown_once === false) {
    show(revealBox, `<p class="ai-text-sm">Token already revealed for this checkout. Use the paste box below or ask the operator to re-issue.</p>`);
    return 'ok';
  }
  return 'done';
}

async function startPoll() {
  if (!checkoutId || !revealBox) return;
  revealBox.style.display = 'block';
  show(revealBox, waitingMarkup());
  const delays = [1000, 1000, 1500, 1500, 2000, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 8000];
  for (let i = 0; i < delays.length; i++) {
    const state = await pollOnce();
    if (state === 'ok') return;
    if (state === 'wait') {
      await new Promise((r) => setTimeout(r, delays[i]));
      continue;
    }
    break;
  }
  show(
    revealBox,
    `<p class="ai-text-sm">Still waiting on Polar. You can retry without reloading.</p>
     <button type="button" class="ai-btn ai-btn-outline ai-btn-sm" id="retry-reveal" style="margin-top: var(--ai-space-3);">Check again</button>`
  );
  document.getElementById('retry-reveal')?.addEventListener('click', () => {
    startPoll();
  });
}

applyAccountTheme();
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-ai-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('cssai-theme', next);
  applyAccountTheme();
});

if (checkoutId) startPoll();

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = (input?.value || '').trim();
  if (!out) return;
  out.innerHTML = '<span class="ai-spinner ai-spinner-sm" aria-hidden="true"></span> Checking...';
  const res = await fetch('/api/validate.php', {
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
  });
  const data = await res.json().catch(() => ({}));
  if (data.valid) {
    localStorage.setItem('llmcss_token', token);
    const created = data.created_at ? new Date(data.created_at) : null;
    const when =
      created && !Number.isNaN(created.getTime())
        ? created.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
        : '';
    out.innerHTML = `<span class="ai-badge ai-badge-success">Active</span>
      <span class="ai-text-sm" style="margin-left: 0.5rem;">Pro ${data.prefix || ''}${when ? ' · issued ' + when : ''}</span>`;
  } else {
    out.innerHTML = '<span class="ai-badge ai-badge-danger">Not valid</span>';
  }
});
