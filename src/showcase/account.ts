import { mountChrome } from './chrome';
import {
  downloadProZip,
  getBrowserToken,
  setBrowserToken,
  validateToken,
  type LicenseStatus,
} from './license';
// Entitlement counts and the kit list are read from the registry, never typed.
import { themedPageKits, themedSectionTemplates } from '../registry/templates-themed.mjs';

// Polar has no public per-customer portal URL we can build offline, so the
// billing link goes to the signed-in purchases page. See the note in
// api/validate.php for what a per-customer portal link would cost.
const POLAR_BILLING_URL = 'https://polar.sh/purchases';

const params = new URLSearchParams(location.search);
const checkoutId = params.get('checkout_id');
const revealBox = document.getElementById('reveal-box');
const revealBody = document.getElementById('reveal-body');
const statusBox = document.getElementById('status-box');
const licenseStatus = document.getElementById('license-status');
const entitlement = document.getElementById('entitlement');
const form = document.getElementById('validate-form') as HTMLFormElement | null;
const input = document.getElementById('token-input') as HTMLInputElement | null;
const out = document.getElementById('validate-out');
const validateBtn = document.getElementById('validate-btn') as HTMLButtonElement | null;

function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;'
  );
}

function showReveal(html: string) {
  if (!revealBox || !revealBody) return;
  revealBody.innerHTML = html;
  revealBox.hidden = false;
}

function setText(id: string, text: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function maskToken(token: string): string {
  if (token.length < 16) return token;
  return token.slice(0, 14) + '…' + token.slice(-4);
}

function formatDate(value?: string): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function plural(n: number, one: string, many: string): string {
  return n + ' ' + (n === 1 ? one : many);
}

// Active line: renewal date when the API supplies one, issue date otherwise.
function activeLine(data: LicenseStatus): string {
  const renews = formatDate(data.renews_at);
  const issued = formatDate(data.created_at);
  const when = renews ? ' · renews ' + renews : issued ? ' · issued ' + issued : '';
  return `<span class="badge badge-success">Active</span>
    <span class="text-sm ml-2">${esc(data.plan || 'Pro')} ${esc(data.prefix || '')}${esc(when)}</span>`;
}

function entitlementHtml(): string {
  const kitButtons = themedPageKits
    .map(
      (kit) =>
        `<button type="button" class="btn btn-outline btn-sm" id="zip-${esc(kit.id)}">${esc(kit.name)} (zip)</button>`
    )
    .join('\n       ');
  return `<h2 class="card-title">What your license includes</h2>
     <ul class="pricing-features">
       <li class="pricing-feature-item">✓ ${plural(themedSectionTemplates.length, 'themed section', 'themed sections')}, ${plural(themedPageKits.length, 'page kit', 'page kits')}</li>
       <li class="pricing-feature-item">✓ HTML per id via <code>npx llmcss template get &lt;id&gt;</code></li>
     </ul>
     <div class="flex flex-wrap gap-2">
       <button type="button" class="btn btn-primary btn-sm" id="download-all-zip">Download all (zip)</button>
       ${kitButtons}
       <a class="btn btn-ghost btn-sm" href="${POLAR_BILLING_URL}">Manage billing</a>
     </div>`;
}

async function runZip(token: string, statusId: string, kitId?: string, label?: string) {
  setText(statusId, 'Preparing ' + (label || 'the full catalog') + '...');
  try {
    const ok = await downloadProZip(token, kitId);
    setText(
      statusId,
      ok ? 'Download started.' : 'Zip download failed. Try again, or email webmaster@llmcss.io'
    );
  } catch {
    setText(statusId, 'Zip download failed. Try again, or email webmaster@llmcss.io');
  }
}

function bindEntitlement(token: string) {
  document
    .getElementById('download-all-zip')
    ?.addEventListener('click', () => runZip(token, 'zip-status'));
  for (const kit of themedPageKits) {
    document
      .getElementById('zip-' + kit.id)
      ?.addEventListener('click', () => runZip(token, 'zip-status', kit.id, kit.name));
  }
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
  document
    .getElementById('reveal-zip-btn')
    ?.addEventListener('click', () => runZip(token, 'reveal-zip-status'));
}

function renderFreshToken(token: string) {
  showReveal(
    `<h2 class="card-title">License token (shown once)</h2>
     <p class="text-sm text-secondary mt-2">Save it now. We will not display the full key again.</p>
     <pre class="mt-4 overflow-x-auto"><code id="token-once">${esc(token)}</code></pre>
     <div class="flex flex-wrap gap-2 mt-3">
       <button class="btn btn-outline btn-sm" type="button" id="copy-token">Copy token</button>
       <button class="btn btn-primary btn-sm" type="button" id="reveal-zip-btn">Download zip</button>
       <a href="/components" class="btn btn-ghost btn-sm">Open gallery</a>
     </div>`
  );
  setBrowserToken(token);
  bindCopy(token);
}

async function showActive(token: string) {
  const data = await validateToken(token);
  if (!statusBox || !licenseStatus || !entitlement) return;
  if (!data.valid) {
    statusBox.hidden = true;
    return;
  }
  licenseStatus.innerHTML = `${activeLine(data)}
    <p class="text-xs text-muted mt-1.5">Saved key ${esc(maskToken(token))}</p>`;
  entitlement.innerHTML = entitlementHtml();
  setText('zip-status', '');
  statusBox.hidden = false;
  bindEntitlement(token);
}

async function pollOnce(): Promise<'ok' | 'wait' | 'done'> {
  if (!revealBox || !checkoutId) return 'done';
  let res: Response;
  try {
    res = await fetch('/api/reveal.php?checkout_id=' + encodeURIComponent(checkoutId), {
      cache: 'no-store',
    });
  } catch {
    // Network dropped mid-poll. Treat it as "not ready yet" so the caller keeps
    // its backoff and still lands on the retry panel instead of hanging.
    return 'wait';
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 404) return 'wait';
  if (res.status === 403) {
    showReveal(`<p class="text-sm">This checkout is revoked or refunded.</p>`);
    return 'ok';
  }
  if (data.token) {
    renderFreshToken(data.token);
    await showActive(data.token);
    return 'ok';
  }
  if (data.shown_once === false) {
    showReveal(
      `<p class="text-sm">Token already revealed for this checkout. Paste the saved key below, or email webmaster@llmcss.io.</p>`
    );
    return 'ok';
  }
  return 'done';
}

async function startPoll() {
  if (!checkoutId || !revealBox) return;
  showReveal(`<p class="text-sm text-secondary">Confirming payment...</p>
    <div class="progress progress-indeterminate mt-3"><div class="progress-bar"></div></div>`);
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
  showReveal(
    `<p class="text-sm">Payment may still be settling. Retry, open your Polar receipt, or email webmaster@llmcss.io.</p>
     <div class="flex flex-wrap gap-2 mt-3">
       <button type="button" class="btn btn-outline btn-sm" id="retry-reveal">Check again</button>
       <a class="btn btn-ghost btn-sm" href="${POLAR_BILLING_URL}">Polar</a>
     </div>`
  );
  document.getElementById('retry-reveal')?.addEventListener('click', () => {
    startPoll().catch(() => {
      showReveal(`<p class="text-sm">Could not reach the license service. Try again in a moment.</p>`);
    });
  });
}

function paintValidate(data: LicenseStatus) {
  if (!out) return;
  if (data.error === 'empty') {
    out.innerHTML = '<span class="badge badge-neutral">Enter a token</span>';
    return;
  }
  // Offline, rate limited and not valid carry their meaning in the label, so
  // they use the solid badge: it is the one variant guaranteed to clear AA on
  // both themes.
  if (data.error === 'offline') {
    out.innerHTML = '<span class="badge badge-solid">Offline</span>';
    return;
  }
  if (data.error === 'rate_limited') {
    out.innerHTML = '<span class="badge badge-solid">Too many tries</span>';
    return;
  }
  if (data.valid) {
    out.innerHTML = activeLine(data);
  } else {
    out.innerHTML = '<span class="badge badge-solid">Not valid</span>';
  }
}

async function boot() {
  try {
    await mountChrome();
  } catch {
    // Chrome is decoration here; the license panels still have to work.
  }
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
  try {
    const data = await validateToken(token);
    if (data.valid) setBrowserToken(token);
    paintValidate(data);
    if (data.valid) await showActive(token);
  } catch {
    out.textContent = 'Could not check that token. Try again in a moment.';
  } finally {
    if (validateBtn) validateBtn.disabled = false;
  }
});

boot().catch(() => {
  if (out) out.textContent = 'Could not load your license details. Reload the page to try again.';
});
