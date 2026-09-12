export const TOKEN_KEY = 'llmcss_token';

export function getBrowserToken(): string {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function setBrowserToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearBrowserToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function validateToken(token: string): Promise<{
  valid: boolean;
  prefix?: string;
  plan?: string;
  created_at?: string;
  error?: string;
  status?: number;
}> {
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
    return { valid: true, prefix: data.prefix, plan: data.plan, created_at: data.created_at, status: res.status };
  } catch {
    return { valid: false, error: 'offline' };
  }
}

export async function downloadProZip(token: string): Promise<boolean> {
  try {
    const res = await fetch('/api/download-zip.php', {
      headers: { Authorization: 'Bearer ' + token },
      cache: 'no-store',
    });
    if (!res.ok) return false;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llmcss-pro-catalog.zip';
    a.click();
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}
