# LLMCSS

Native CSS for agents and humans. MIT core on [llmcss.io](https://llmcss.io). Pro is a paid catalog  -  not in this repo.

Class prefix is `ai-*` (CSS variables `--ai-*`). That is the token layer, not the product name.

## What is free (MIT)

- Token layer, reset, themes, utilities
- Free primitives: button, input, card, badge, dialog, tabs, dropdown, stack/layout, list, and the rest of the public gallery
- Docs, gallery, `llms.txt`, `AGENTS.md`
- `GET https://llmcss.io/registry.json`
- `GET https://llmcss.io/r/{name}.json` (per-component, free only)
- Local MCP: `npx llmcss-mcp` (talks to llmcss.io; nothing long-running on the origin)

```bash
npm install
npm run dev          # http://localhost:3000
npx llmcss list
npx llmcss add btn-variants
```

Copy CSS from the docs if you do not want the CLI. This is a CSS library.

**[Quickstart](QUICKSTART.md)** (also [llmcss.io/quickstart](https://llmcss.io/quickstart)): one stylesheet, first component, CLI, MCP, Pro.

## What is Pro ($9/mo)

Advanced agent/app sections (tool traces, approval bars, thought chains, workspace shells, and the current Pro gallery items). Sold at [llmcss.io](https://llmcss.io). After payment you get a license token and a zip. Source lives in a **private** sibling repo. It is never committed here.

```bash
npx llmcss login <token>
npx llmcss add tool-trace          # token-gated, not in this tree
```

## Agent files

- [`public/llms.txt`](public/llms.txt)  -  short facts
- [`public/llms-full.txt`](public/llms-full.txt)  -  harness + anti-slop laws
- [`AGENTS.md`](AGENTS.md)  -  drop-in agent rules

## License

- This repository: MIT (`LICENSE`)
- Pro catalog: commercial subscription, separate private repository
- Digital goods: refunds follow Polar’s policy plus a short note on the site

Do not open a PR that adds Pro markup, Pro CSS sources, or env files. Origin deploy config stays on the server, not in this repository.
