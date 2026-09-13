import { mountChrome } from './chrome';
import { downloadProZip, getBrowserToken, setBrowserToken, validateToken } from './license';

const params = new URLSearchParams(location.search);
const checkoutId = params.get('checkout_id');
const revealBox = document.getElementById('reveal-box');
const statusBox = document.getElementById('status-box');
const form = document.getElementById('validate-form') as HTMLFormElement | null;
const input = document.getElementById('token-input') as HTMLInputElement | null;
const out = document.getElementById('validate-out');
const validateBtn = document.getElementById('validate-btn') as HTMLButtonElement | null;

function show(el: HTMLElement | null, html: string) {
  if (!el) return;
  el.style.display = 'block';
  el.innerHTML = html;
}

function hide(el: HTMLElement | null) {
  if (el) el.style.display = 'none';
}

function maskToken(token: string): string {
  if (token.length < 16) return token;
  return token.slice(0, 14) + '…' + token.slice(-4);
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
      if (btn) btn.textContent = 'Copy failed';
    }
  });
  document.getElementById('download-zip-btn')?.addEventListener('click', async () => {
    const ok = await downloadProZip(token);
    const zipOut = document.getElementById('zip-status');
    if (zipOut) zipOut.textContent = ok ? 'Download started.' : 'Zip download failed.';
  });
}

function renderFreshToken(token: string) {
  if (!revealBox) return;
  show(
    revealBox,
    `<h2 class="card-title">License token (shown once)</h2>
     <p class="text-sm text-secondary" style="margin-top: var(--ai-space-2);">Save it now. We will not display the full key again.</p>
     <pre style="margin-top: var(--ai-space-4); overflow-x: auto;"><code id="token-once">${token}</code></pre>
     <div class="flex gap-2" style="margin-top: var(--ai-space-3); flex-wrap: wrap;">
       <button class="btn btn-outline btn-sm" type="button" id="copy-token">Copy token</button>
       <button class="btn btn-primary btn-sm" type="button" id="download-zip-btn">Download zip</button>
       <a href="/components" class="btn btn-ghost btn-sm">Open gallery</a>
     </div>
     <p id="zip-status" class="text-xs text-muted" style="margin-top: var(--ai-space-3);"></p>`
  );
  setBrowserToken(token);
  bindCopy(token);
}

async function showActive(token: string) {
  const data = await validateToken(token);
  if (!statusBox) return;
  if (!data.valid) {
    hide(statusBox);
    return;
  }
  const created = data.created_at ? new Date(data.created_at) : null;
  const when = created && !Number.isNaN(created.getTime())
    ? created.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : '';
  show(
    statusBox,
    `<div class="flex justify-between items-center flex-wrap gap-3">
      <div>
        <span class="badge badge-success">Active</span>
        <span class="text-sm" style="margin-left: 0.5rem;">${data.plan || 'Pro'} ${data.prefix || ''}${when ? ' · issued ' + when : ''}</span>
        <p class="text-xs text-muted" style="margin-top: 0.35rem;">Saved key ${maskToken(token)}</p>
      </div>
      <button type="button" class="btn btn-outline btn-sm" id="download-zip-btn">Download zip</button>
    </div>
    <p id="zip-status" class="text-xs text-muted" style="margin-top: var(--ai-space-3);"></p>`
  );
  document.getElementById('download-zip-btn')?.addEventListener('click', async () => {
    const ok = await downloadProZip(token);
    const zipOut = document.getElementById('zip-status');
    if (zipOut) zipOut.textContent = ok ? 'Download started.' : 'Zip download failed.';
  });
}

async function pollOnce(): Promise<'ok' | 'wait' | 'done'> {
  if (!revealBox || !checkoutId) return 'done';
  const res = await fetch('/api/reveal.php?checkout_id=' + encodeURIComponent(checkoutId), { cache: 'no-store' });
  const data = await res.json().catch(() => ({}));
  if (res.status === 404) return 'wait';
  if (res.status === 403) {
    show(revealBox, `<p class="text-sm">This checkout is revoked or refunded.</p>`);
    return 'ok';
  }
  if (data.token) {
    renderFreshToken(data.token);
    await showActive(data.token);
    return 'ok';
  }
  if (data.shown_once === false) {
    show(revealBox, `<p class="text-sm">Token already revealed for this checkout. Paste the saved key below, or email webmaster@llmcss.io.</p>`);
    return 'ok';
  }
  return 'done';
}

async function startPoll() {
  if (!checkoutId || !revealBox) return;
  show(revealBox, `<p class="text-sm text-secondary">Confirming payment...</p>
    <div class="progress progress-indeterminate" style="margin-top: var(--ai-space-3);"><div class="progress-bar"></div></div>`);
  const delays = [1000, 1000, 1500, 1500, 2000, 2000, 2500, 3000, 4000, 5000, 6000, 8000, 8000];
  for (const d of delays) {
    const state = await pollOnce();
    if (state === 'ok') return;
    if (state === 'wait') {
      await new Promise((r) => setTimeout(r, d));
      continue;
    }
    break;
  }
  show(
    revealBox,
    `<p class="text-sm">Payment may still be settling. Retry, open your Polar receipt, or email webmaster@llmcss.io.</p>
     <div class="flex gap-2" style="margin-top: var(--ai-space-3); flex-wrap: wrap;">
       <button type="button" class="btn btn-outline btn-sm" id="retry-reveal">Check again</button>
       <a class="btn btn-ghost btn-sm" href="https://polar.sh">Polar</a>
     </div>`
  );
  document.getElementById('retry-reveal')?.addEventListener('click', () => startPoll());
}

function paintValidate(data: Awaited<ReturnType<typeof validateToken>>) {
  if (!out) return;
  if (data.error === 'empty') {
    out.innerHTML = '<span class="badge badge-neutral">Enter a token</span>';
    return;
  }
  if (data.error === 'offline') {
    out.innerHTML = '<span class="badge badge-warning">Offline</span>';
    return;
  }
  if (data.error === 'rate_limited') {
    out.innerHTML = '<span class="badge badge-warning">Too many tries</span>';
    return;
  }
  if (data.valid) {
    const created = data.created_at ? new Date(data.created_at) : null;
    const when = created && !Number.isNaN(created.getTime())
      ? created.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
      : '';
    out.innerHTML = `<span class="badge badge-success">Active</span>
      <span class="text-sm" style="margin-left: 0.5rem;">${data.plan || 'Pro'} ${data.prefix || ''}${when ? ' · issued ' + when : ''}</span>`;
  } else {
    out.innerHTML = '<span class="badge badge-danger">Not valid</span>';
  }
}

async function boot() {
  await mountChrome();
  const saved = getBrowserToken();
  if (saved && input) input.value = saved;
  if (saved) {
    const data = await validateToken(saved);
    paintValidate(data);
    if (data.valid) await showActive(saved);
  }
  if (checkoutId) await startPoll();
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = (input?.value || '').trim();
  if (!out) return;
  if (!token) {
    paintValidate({ valid: false, error: 'empty' });
    return;
  }
  if (validateBtn) validateBtn.disabled = true;
  out.innerHTML = '<span class="spinner spinner-sm" aria-hidden="true"></span> Checking...';
  const data = await validateToken(token);
  if (data.valid) setBrowserToken(token);
  paintValidate(data);
  if (data.valid) await showActive(token);
  if (validateBtn) validateBtn.disabled = false;
});

boot();
