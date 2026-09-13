// The saved license token. This key has never carried the cssai- prefix, so it
// is kept exactly as it is: renaming it would sign every licensed browser out.
export const TOKEN_KEY = 'llmcss_token';

export function getBrowserToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export function setBrowserToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // storage blocked
  }
}

export function clearBrowserToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage blocked
  }
}

export interface LicenseStatus {
  valid: boolean;
  prefix?: string;
  plan?: string;
  created_at?: string;
  // Set only when the licence row carries a subscription period end. See the
  // note in api/validate.php: today it is always absent and the UI falls back
  // to the issue date.
  renews_at?: string;
  error?: string;
  status?: number;
}

export async function validateToken(token: string): Promise<LicenseStatus> {
  if (!token.trim()) return { valid: false, error: 'empty' };
  try {
    const res = await fetch('/api/validate.php', {
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
      cache: 'no-store',
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 429) return { valid: false, error: 'rate_limited', status: 429 };
    if (!res.ok || !data.valid) {
      return { valid: false, error: data.error || 'invalid', status: res.status, prefix: data.prefix };
    }
    return {
      valid: true,
      prefix: data.prefix,
      plan: data.plan,
      created_at: data.created_at,
      renews_at: typeof data.renews_at === 'string' && data.renews_at ? data.renews_at : undefined,
      status: res.status,
    };
  } catch {
    return { valid: false, error: 'offline' };
  }
}

// Downloads the whole Pro catalog, or one page kit when kitId is given. The id
// is validated server side against the Pro registry; the query string only ever
// selects from that list.
export async function downloadProZip(token: string, kitId?: string): Promise<boolean> {
  const url = kitId
    ? '/api/download-zip.php?kit=' + encodeURIComponent(kitId)
    : '/api/download-zip.php';
  const filename = kitId ? 'llmcss-pro-' + kitId + '.zip' : 'llmcss-pro-catalog.zip';
  try {
    const res = await fetch(url, {
      headers: { Authorization: 'Bearer ' + token },
      cache: 'no-store',
    });
    if (!res.ok) return false;
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    // Firefox ignores click() on a detached anchor, so the link has to be in
    // the document for the length of the click.
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    return true;
  } catch {
    return false;
  }
}
