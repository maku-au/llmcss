# Publishing llmcss to npm

The package is `llmcss`, currently version `0.2.0`, MIT, public.

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

This writes nothing. As of this checkout it reports 61 files, 154.4 kB packed
and 736.8 kB unpacked, and the contents are correct:

- `dist/llmcss.css` and `dist/llmcss.js` present
- `bin/` (5 files), `src/registry/` (11), `src/css/` (26), `src/runtime/` (9)
- `AGENTS.md`, `DESIGN_HARNESS.md`, `QUICKSTART.md`, `LICENSE`
- `public/llms.txt` and `public/llms-full.txt` only

Verified absent: `sites`, `.env`, `public/registry.json`, `public/classes.json`,
`node_modules`, the marketing HTML pages, `api/`, `tests/`, `scripts/`,
`.vscode/`, and `public/og.png`. The `files` allowlist in `package.json` is what
keeps them out, so if you add a top level directory, re-run the dry run.

Two things worth a decision before the next release:

- `bin/` ships `issue-token.php`, `license-cron.php` and `revoke-token.php`.
  They contain no secrets, but they `require api/lib.php`, which is not in the
  tarball, so they are inert files that only describe the license server to
  anyone who installs the package. Narrowing `files` to `bin/cssai.mjs` and
  `bin/cssai-mcp.mjs` would drop them.
- The three editor data files in `public/` are not shipped, so npm consumers
  have to fetch them from the site. See `editor-setup.md`.

## Publish

```bash
npm login
npm publish
```

`publishConfig.access` is `public`, so no `--access` flag is needed. Then tag
the commit that produced the tarball:

```bash
git tag v0.2.0
git push origin v0.2.0
```

Tag after publishing succeeds, not before, so a failed publish does not leave a
tag pointing at a version that does not exist on the registry.

To rehearse without touching the registry, `npm publish --dry-run`.

## What jsdelivr serves

jsdelivr mirrors npm automatically, with no configuration. Within a few minutes
of the publish:

```
https://cdn.jsdelivr.net/npm/llmcss@0.2.0/dist/llmcss.css
https://cdn.jsdelivr.net/npm/llmcss@0.2.0/dist/llmcss.js
```

Pin the exact version in production. These other forms exist and are useful in a
sandbox, but they change under you:

```
https://cdn.jsdelivr.net/npm/llmcss/dist/llmcss.css        latest
https://cdn.jsdelivr.net/npm/llmcss@0.2/dist/llmcss.css    latest 0.2.x
https://cdn.jsdelivr.net/npm/llmcss@0.2.0/dist/llmcss.min.css   see note
```

That last one is a trap worth knowing: jsdelivr will minify on the fly for a
`.min.css` path that does not exist in the package. The build already minifies,
so ask for `dist/llmcss.css` and skip the round trip.

`package.json` sets `"style": "dist/llmcss.css"`, and jsdelivr honours it, so
`https://cdn.jsdelivr.net/npm/llmcss@0.2.0` alone resolves to the stylesheet.
Being explicit is still better.

## How llmcss.io maps to the same files

The site serves the build output from its web root, so the two are the same
bytes from the same `npm run build`:

| Site URL | Package path | jsdelivr equivalent |
| --- | --- | --- |
| `https://llmcss.io/llmcss.css` | `dist/llmcss.css` | `.../npm/llmcss@0.2.0/dist/llmcss.css` |
| `https://llmcss.io/llmcss.js` | `dist/llmcss.js` | `.../npm/llmcss@0.2.0/dist/llmcss.js` |
| `https://llmcss.io/classes.json` | `public/classes.json` | not published to npm |
| `https://llmcss.io/registry.json` | `public/registry.json` | not published to npm |

The site URL is unversioned and always the current release, which is what the
quickstart uses because it keeps the copy and paste snippet short. The jsdelivr
URL is versioned and immutable, which is what an application should use. Both
are served with long cache lifetimes (`public.htaccess` marks `/llmcss.css` as
cache stable), so switching a site URL to a pinned jsdelivr URL is the one
change that makes a deployment reproducible.

The CLI uses the site, not the CDN: `llmcss add` for a Pro component and
`llmcss trim` without a local `dist/` both hit `https://llmcss.io`. Override the
host with `LLMCSS_ORIGIN` if you mirror it.

## Release checklist

1. `npm ci && npm run build`
2. `npm run test` and `npx llmcss list` both clean
3. `npm pack --dry-run` matches the expectations above
4. Bump `version` in `package.json` if this is not a re-run, and update `CHANGELOG.md`
5. `npm login && npm publish`
6. `git tag v0.2.0 && git push origin v0.2.0`
7. Deploy the same `dist/` and `public/` to llmcss.io so the site and the
   registry agree with the tarball
8. Confirm `https://cdn.jsdelivr.net/npm/llmcss@0.2.0/dist/llmcss.css` returns 200
