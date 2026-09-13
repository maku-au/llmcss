/**
 * Public stub shown for Pro ids until a license token hydrates real markup.
 * Shared by themed component stubs, themed template stubs, and build-registry.
 * Library classes only, no inline styles: the public registry JSON ships this
 * markup and it has to validate like any other snippet.
 */
export function lockedPreview(name) {
  return `<div class="card card-pro p-8 text-center max-w-md mx-auto">
  <h3 class="card-title flex items-center justify-center gap-2">${name} <span class="badge badge-solid badge-sm">Pro</span></h3>
  <p class="text-sm text-secondary mt-2">Themed source is not in the public catalog. Subscribe to copy this.</p>
  <p class="text-sm text-secondary mt-2">Preview available in the gallery.</p>
  <a class="btn btn-primary btn-sm mt-4" href="/api/checkout.php">Unlock Pro ($9/mo)</a>
</div>`;
}
