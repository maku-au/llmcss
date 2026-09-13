# Publishing llmcss to npm

## Quick reference

- Install (what consumers run): `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Publish (what you run): `npm run build && npm publish`
- Sample: `<button class="ai-btn ai-btn-primary">Save</button>`
- Validate before tagging: `npm pack --dry-run` and `npx llmcss list`

The package is `llmcss`, currently version `0.3.0`, MIT, public.

## Before you publish

`dist/` is in `.gitignore`, so a fresh clone has no build output and the tarball
would ship a package whose two headline files are missing. Always build first:

```bash
npm ci
npm run build
```

That runs `tsc`, both Vite builds (stylesheet and runtime), the registry build,
the manifest build, and the editor-data build. Confirm the two files exist and
look current:

```bash
ls -l dist/llmcss.css dist/llmcss.js
```

## Check the tarball

```bash
npm pack --dry-run
```

This writes nothing. The `files` allowlist in `package.json` ships 82 files
once both `dist/llmcss.css` and `dist/llmcss.js` exist:

- `dist/llmcss.css` and `dist/llmcss.js`
- `bin/` (2 files: `cssai.mjs`, `cssai-mcp.mjs`)
- `src/registry/` (18), `src/css/` (33), `src/runtime/` (12)
- `AGENTS.md`, `DESIGN_HARNESS.md`, `QUICKSTART.md`, `LICENSE`, `CHANGELOG.md`, `package.json`
- `public/llms.txt`, `public/llms-full.txt`, `public/classes.json`,
  `public/tokens.json`, `public/states.json`, `public/css-custom-data.json`,
  `public/html-custom-data.json`, `public/llmcss.code-snippets`

Verified absent: `sites`, `.env`, `public/registry.json`, `public/og.png`,
`node_modules`, the marketing HTML pages, `api/`, `tests/`, `scripts/`, and
`.vscode/`. The `files` allowlist in `package.json` is what keeps them out, so
if you add a top level directory, re-run the dry run.

`bin/` ships only `cssai.mjs` and `cssai-mcp.mjs`. `issue-token.php`,
`license-cron.php` and `revoke-token.php` are not in the `files` allowlist and
never reach the tarball.

## Publish

```bash
npm login
npm publish
```

`publishConfig.access` is `public`, so no `--access` flag is needed. Then tag
the commit that produced the tarball:

```bash
git tag v0.3.0
git push origin v0.3.0
```

Tag after publishing succeeds, not before, so a failed publish does not leave a
tag pointing at a version that does not exist on the registry.

To rehearse without touching the registry, `npm publish --dry-run`.

## What jsdelivr serves

jsdelivr mirrors npm automatically, with no configuration. Within a few minutes
of the publish:

```
https://cdn.jsdelivr.net/npm/llmcss@0.3.0/dist/llmcss.css
https://cdn.jsdelivr.net/npm/llmcss@0.3.0/dist/llmcss.js
```

Pin the exact version in production. These other forms exist and are useful in a
sandbox, but they change under you:

```
https://cdn.jsdelivr.net/npm/llmcss/dist/llmcss.css        latest
https://cdn.jsdelivr.net/npm/llmcss@0.3/dist/llmcss.css    latest 0.3.x
https://cdn.jsdelivr.net/npm/llmcss@0.3.0/dist/llmcss.min.css   see note
```

That last one is a trap worth knowing: jsdelivr will minify on the fly for a
`.min.css` path that does not exist in the package. The build already minifies,
so ask for `dist/llmcss.css` and skip the round trip.

`package.json` sets `"style": "dist/llmcss.css"`, and jsdelivr honours it, so
`https://cdn.jsdelivr.net/npm/llmcss@0.3.0` alone resolves to the stylesheet.
Being explicit is still better.

## How llmcss.io maps to the same files

The site serves the build output from its web root, so the two are the same
bytes from the same `npm run build`:

| Site URL | Package path | jsdelivr equivalent |
| --- | --- | --- |
| `https://llmcss.io/llmcss.css` | `dist/llmcss.css` | `.../npm/llmcss@0.3.0/dist/llmcss.css` |
| `https://llmcss.io/llmcss.js` | `dist/llmcss.js` | `.../npm/llmcss@0.3.0/dist/llmcss.js` |
| `https://llmcss.io/classes.json` | `public/classes.json` | `.../npm/llmcss@0.3.0/public/classes.json` |
| `https://llmcss.io/registry.json` | `public/registry.json` | not published to npm |

The site URL is unversioned and always the current release, which is what the
quickstart uses because it keeps the copy and paste snippet short. The jsdelivr
URL is versioned and immutable, which is what an application should use. Both
are served with long cache lifetimes (`public.htaccess` marks `/llmcss.css` as
cache stable), so switching a site URL to a pinned jsdelivr URL is the one
change that makes a deployment reproducible.

The CLI uses the site, not the CDN: `llmcss add` / `llmcss template get` for a
themed Pro id and `llmcss trim` without a local `dist/` both hit
`https://llmcss.io`. Override the host with `LLMCSS_ORIGIN` if you mirror it.

## Release checklist

1. `npm ci && npm run build`
2. `npm run test` and `npx llmcss list` both clean
3. `npm pack --dry-run` matches the expectations above
4. Bump `version` in `package.json` if this is not a re-run, and update `CHANGELOG.md`
5. `npm login && npm publish`
6. `git tag v0.3.0 && git push origin v0.3.0`
7. Deploy the same `dist/` and `public/` to llmcss.io so the site and the
   registry agree with the tarball
8. Confirm `https://cdn.jsdelivr.net/npm/llmcss@0.3.0/dist/llmcss.css` returns 200
