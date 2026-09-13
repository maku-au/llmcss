# Editor setup

## Quick reference

- Install: `npm install llmcss`
- Include: `<link rel="stylesheet" href="https://llmcss.io/llmcss.css" />`
- Regenerate editor data: `npm run build:vscode`
- Sample completion: type `--ai-` inside a `:root` block, or `btn-variants` to expand a component
- Validate: `npx llmcss validate <file>`

LLMCSS generates three editor artifacts from the manifests, so completions can
never drift from the stylesheet. Regenerate them with:

```bash
npm run build:vscode
```

`npm run build` already runs it as the last step.

| File | Format | What it gives you |
| --- | --- | --- |
| `public/css-custom-data.json` | VS Code CSS custom data 1.1 | Every `--ai-*` token, with its value in light, dark, each skin and each focus preset on hover |
| `public/html-custom-data.json` | VS Code HTML custom data 1.1 | The `data-ai-*` attributes with their value sets, and the seven `ai-*` custom elements |
| `public/llmcss.code-snippets` | VS Code snippets | One snippet per component id, plus a class picker per family |

## VS Code, in this repo

`.vscode/settings.json` is already committed and points at
`public/css-custom-data.json` and `public/html-custom-data.json`, so a fresh
checkout gets token and attribute completions with no setup. Snippet completions
still need `public/llmcss.code-snippets` copied or symlinked into `.vscode/`,
since VS Code only reads `*.code-snippets` files from that folder, not from
`public/`.

`.vscode/` is listed in `.gitignore` except for `settings.json`
(`!.vscode/settings.json`), so the settings file itself already reaches other
contributors.

## VS Code, in your own project

`package.json`'s `files` list now ships `public/classes.json`,
`public/tokens.json`, `public/states.json`, `public/css-custom-data.json`,
`public/html-custom-data.json` and `public/llmcss.code-snippets`, so if you
installed the npm package they are already on disk at
`node_modules/llmcss/public/`. Point `.vscode/settings.json` at them directly,
or copy what you need:

```bash
mkdir -p .llmcss
cp node_modules/llmcss/public/css-custom-data.json  .llmcss/
cp node_modules/llmcss/public/html-custom-data.json .llmcss/
cp node_modules/llmcss/public/llmcss.code-snippets  .vscode/
```

Without the npm package, download the same files from the site instead:

```bash
mkdir -p .llmcss
curl -o .llmcss/css-custom-data.json  https://llmcss.io/css-custom-data.json
curl -o .llmcss/html-custom-data.json https://llmcss.io/html-custom-data.json
curl -o .vscode/llmcss.code-snippets  https://llmcss.io/llmcss.code-snippets
```

Then add to `.vscode/settings.json`:

```json
{
  "html.customData": ["./.llmcss/html-custom-data.json"],
  "css.customData": ["./.llmcss/css-custom-data.json"],
  "scss.customData": ["./.llmcss/css-custom-data.json"],
  "less.customData": ["./.llmcss/css-custom-data.json"]
}
```

Paths are resolved relative to the workspace folder. Reload the window after the
first edit; VS Code reads custom data at startup.

Snippets are picked up automatically from any `*.code-snippets` file inside
`.vscode/`. Nothing to configure.

## What you actually get

Typing `--ai-` inside a `:root` block lists all 82 tokens, and hovering one
shows its value per theme and skin. Typing `data-ai-` on an element offers the
nine attributes, and the value sets mean `data-ai-skin="` offers the eight real
skins rather than free text. Typing `btn-variants` expands the full component
markup from the registry. Typing `ai-family-flex` inserts a picker you can
arrow through to choose any flex utility.

Families with more than 60 classes are split into numbered snippets, because a
TextMate choice placeholder gets unusable past that. `spacing` has 238 classes,
so it becomes `ai-family-spacing-1` through `ai-family-spacing-4`.

## Class name completion

Custom data has no section for class names, so none of this completes `class="ai-`
for you. Two options that do:

- The **CSS Peek** or **IntelliSense for CSS class names in HTML** extension,
  pointed at your built `dist/llmcss.css`. Both index real selectors, so they
  stay correct automatically.
- `npx llmcss validate <file>` in a save hook or in CI, which checks every
  `ai-*` token against `public/classes.json` and suggests the nearest real class
  for a typo. That catches what completion would have prevented, one step later.

## JetBrains

Not covered. JetBrains IDEs do not read VS Code custom data; the equivalent is a
`web-types` JSON file, and it is only loaded when it is declared through a
`web-types` field in the `package.json` of an installed dependency, or registered
by a plugin. Generating the file is not hard, but wiring it up means changing
what the published package declares, so it is deliberately out of scope here.

If you want it locally, the shape is:

```json
{
  "$schema": "https://json.schemastore.org/web-types",
  "name": "llmcss",
  "version": "0.4.0",
  "contributions": {
    "html": {
      "elements": [{ "name": "modal", "description": "..." }],
      "attributes": [{ "name": "data-ai-toggle", "value": { "kind": "plain" } }]
    }
  }
}
```

The same `tags` and `globalAttributes` arrays in `public/html-custom-data.json`
map onto `elements` and `attributes` almost one to one.

## Other editors

Neovim and Helix via an LSP get the same completions if you run
`vscode-css-language-server` and `vscode-html-language-server`, which accept the
identical `customData` settings through their initialization options. Zed reads
VS Code snippet files but not custom data.
