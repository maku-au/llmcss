/**
 * Public stub shown for Pro ids until a license token hydrates real markup.
 * Shared by themed component stubs, themed template stubs, and build-registry.
 */
export function lockedPreview(name) {
  return `<div class="card card-pro" style="padding: var(--ai-space-8); text-align: center; max-width: 28rem; margin: 0 auto;">
  <h3 class="card-title flex items-center justify-center gap-2">${name} <span class="badge badge-solid badge-sm">Pro</span></h3>
  <p class="text-sm text-secondary" style="margin-top: var(--ai-space-2);">Themed source is not in the public catalog. Subscribe to copy this.</p>
  <a class="btn btn-primary btn-sm" style="margin-top: var(--ai-space-4);" href="/api/checkout.php">Unlock Pro ($9/mo)</a>
</div>`;
}
