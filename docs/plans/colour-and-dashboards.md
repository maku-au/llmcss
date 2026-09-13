# Colour system and dashboard components: implementation plan

Written 13 September 2026 from three reviews: a colour-system plan (Opus), a dashboard component proposal (Opus) and a contrast audit (Sonnet). Where they disagreed, the decision and the reason are recorded here. Every byte figure below was measured by appending minified CSS to the built `dist/llmcss.css` and re-running `gzip -9`; the library sits at 50,901 bytes against a 51,200 ceiling.

## Findings that shape the work

1. `--ai-chart-1` to `--ai-chart-6` already exist in `src/css/tokens.css` and are dead: declared once in `:root`, never read by any rule, no dark values. `tokens.json` and the VS Code data already advertise them. Two of the six fail the 3:1 non-text floor in the light theme (amber `#f59e0b` at 2.15 against surface-1, pink `#ec4899` at 2.99).
2. `--ai-chart-4: #8b5cf6` is on the audit's own Law 4 banned-hex list in `bin/cssai.mjs`.
3. `data-ai-accent="steel"` has no dark value and measures 1.94:1 on the enterprise dark surface. It fails for buttons and links today, not only for charts.
4. There is no law about icon tiles. The "no coloured icon tiles" rule lives only in feature-grid demo prose.
5. Five dashboard parents ship zero variants: `quota-meter`, `spark-stat`, `donut-stat`, `bar-chart`, `health-grid`.
6. `w-var`, `h-var` and `bg-var` already exist, so bar heights and segment widths come from an inline custom property with no new CSS.

## Decisions where the reviews disagreed

| Question | Decision | Why |
|---|---|---|
| Chart token values | Slot 1 is `var(--ai-accent)`; slots 2 to 6 are literal hex per theme, ordered blue, teal, amber, pink, violet, neutral grey | Slot 1 recolours with every skin and accent for free. Literal hex on the fixed slots keeps the contrast test offline. The neutral slot is achromatic so it never competes with slot 1 on hue, and amber is no longer beside violet (a tritanopia pair). |
| Light amber | `#b45309`, not `#d97706` | `#d97706` measures about 2.6 against surface-1. `#b45309` measures about 4.2. |
| Per-skin overrides | Two only: fintech slot 2 (its accent is teal) and editorial slot 3 (its accent sits 11 degrees from amber) | Everything else passes the 40 degree hue distance and the 3:1 floor by measurement. Test 29 guards the rest. |
| Labels inside segments | Never | No single ink clears 4.5:1 across four arbitrary tones; at 360px they do not fit. The list or legend under the bar carries every number. |
| Icon tiles on metric rows | Allowed as `.metric-tile`, only where the tint is the series key that also paints that series' bar or meter; wash background, ink glyph, no border, radius from the token | A legend swatch with a glyph in it is data. Six tinted tiles in a feature grid are decoration, and that becomes Law 13 with an audit check. |
| The "+4.2%" pill | `kpi-trend` text or `badge-success` (hairline plus coloured text) | Pastel filled pills are the most generic kit tell in the reference set and the library already commits against them. |
| Sequential tints | Ramp of 100, 72, 48, 28 percent toward `--ai-surface-0`, with a 2px surface gap between segments and a legend that names every slice | Steps 3 and 4 fall under 3:1 against the background, which is unavoidable for a ramp. The gaps and the legend carry the accessibility contract. Standalone tinted data (the non-peak bars in a week chart) never goes below 75 percent tone, which keeps 3:1 on both surfaces. |
| Area sparkline fade | An SVG `linearGradient` with `stop-color="currentColor"`, alpha only, id unique per demo | Masks are banned after painting black under software rendering. A one-hue alpha ramp inside SVG is a data encoding, not the Law 4 gradient flood. |
| Combo bar-and-line chart | Optional last batch, zero CSS, shipped as an inline SVG recipe with a table for screen readers | Two encodings on one axis need a y scale that CSS cannot know. It is useful as a pattern to copy but it is the hardest for an agent to adapt, so it goes last. |
| Chart header with a period select | Not a component | It is a flex row plus `.select`. It ships as the header of the column and combo charts and is described in their guidance. |
| Budget | Cut `odd`/`even` structural variants (433 bytes) and the `2xl` breakpoint (388 bytes) from the utility spec | Zero usages of either anywhere in the repo. Lands the library near 50,800 with about 400 bytes of headroom after every batch below. Both cuts go in CHANGELOG.md. |

## The colour system

### Tokens (`src/css/tokens.css`)

Light, in `:root` and again in the explicit light block (the `.theme-light` island bug is documented in the file):

```
--ai-chart-1: var(--ai-accent);
--ai-chart-2: #0d9488;   /* teal */
--ai-chart-3: #b45309;   /* amber */
--ai-chart-4: #db2777;   /* pink */
--ai-chart-5: #7c3aed;   /* violet */
--ai-chart-6: #71717a;   /* neutral, achromatic */
```

Dark block:

```
--ai-chart-2: #2dd4bf;
--ai-chart-3: #f59e0b;
--ai-chart-4: #f472b6;
--ai-chart-5: #a78bfa;
--ai-chart-6: #a1a1aa;
```

Skin overrides in `src/css/themes.css`: fintech `--ai-chart-2: #4f46e5` light, `#818cf8` dark; editorial `--ai-chart-3: #0369a1` light, `#38bdf8` dark. Steel accent gains a dark block (`#94a3b8` accent, `#cbd5e1` hover, `#09090b` accent text).

### Tone attribute (`@layer tokens`)

One presentational attribute, `data-ai-tone`, resolving to an inherited `--ai-tone` plus three derived values:

```
[data-ai-tone] {
  --ai-tone-ink:   color-mix(in srgb, var(--ai-tone) 60%, var(--ai-text-primary));
  --ai-tone-wash:  color-mix(in srgb, var(--ai-tone) 12%, transparent);
  --ai-tone-track: color-mix(in srgb, var(--ai-tone) 18%, var(--ai-surface-2));
}
[data-ai-tone="1"] … "6" map to the chart slots; "accent", "success", "warning", "danger", "info", "neutral" map to the existing tokens.
```

The 60 percent ink is the only single value that clears 4.5:1 on surface-0 and surface-1 in every skin, both themes, every accent and every chart slot, including over its own 12 percent wash. Measured floors: 4.52 (light amber), 4.58 (dark violet). The comment in the file says not to move the number.

Attribute rather than class because `classes.json` is a closed world, the variant matrix would otherwise generate `md:tone-3`, and `data-ai-toast-position` is the precedent. One line in `build-manifests.mjs` maps the selector to a `tone:` context so the derived properties do not leak into the component tunables; one hand-written entry documents the attribute in `states.json`.

Takes a tone: `bar-fill`, `bar-track`, bare `pip`, `donut`, and the new `split-bar`, `metric-tile`, `bar-col`. Never takes a tone: `kpi-trend`, `status-pip` and its semantic variants, `card`, `panel`, `alert`, `toast`, `btn`, `badge`, `avatar`. Test 30 greps for that.

## Components

| Rank | Item | Kind | New CSS | File |
|---|---|---|---|---|
| 1 | `distribution-bar` parent, `.split-bar` segments | new | 82 bytes | dashboard.css, data-extra.mjs |
| 2 | `kpi-metric-cards:comparison` | variant | 0 | variants-application.mjs |
| 3 | `column-chart` parent, `.bar-col` | new | 93 bytes | dashboard.css, data-extra.mjs |
| 4 | `bar-chart:meter-trio` with `.metric-tile` | variant | about 110 bytes for the tile; meter and value from utilities | dashboard.css, variants-application.mjs |
| 5 | `donut-stat:breakdown`, `--ai-donut-stops` on `.donut` | variant | about 80 bytes | dashboard.css, variants-application.mjs |
| 6 | `spark-stat:area` | variant | 0 | variants-application.mjs, data.mjs |
| 7 | `combo-chart` parent (optional) | new | 0 | data-extra.mjs |

Accessibility contract for every chart: the drawing carries `aria-hidden="true"` or `role="img"` with a full `aria-label`; the numbers live in a visible list or legend in series order; a column or combo chart carries an `sr-only` table with a caption and column headers; a highlighted bar also carries `aria-current` and its value in text; nothing under 12px; every demo fits a 360px card through container queries.

Demo data (adds up, real names): installs by surface 12,480 (CLI 5,741, MCP 3,370, gallery 2,246, zip 1,123); registry requests 42,500 this week, 26,350 component reads against 16,150 searches; Pro revenue $1,134 for the week at $9 a seat with Friday the peak at $234; failed installs 1,300 in four causes; average daily requests 11.4k, 342k month to date.

## Batches

Each batch is shippable and revertible on its own. One builder per file; batches 1 and 2 both touch `tokens.css`, so they run in sequence.

1. **Palette and steel.** `tokens.css`, `themes.css`, `build-manifests.mjs` (tone context line). Adds Test 29: parse both files, compute the 60 percent ink for every tone against every surface in every skin and theme, assert 4.5:1, assert every fixed chart slot clears 3:1 as a fill against surface-0 and surface-1, assert adjacent slots differ by 1.25:1 and 40 degrees of hue, assert no chart hex is on the Law 4 list. About 205 bytes.
2. **Tone mechanism and the free hooks.** `tokens.css` tone block, `dashboard.css` hooks on `bar-fill`, `bar-track`, `pip`, `states.json` entry, utility cut of `odd`/`even` and `2xl` with CHANGELOG lines. Adds Test 30 (tone never on the forbidden components). Existing bar and pip demos must render pixel-identical. About 220 bytes minus 821.
3. **Distribution bar and the KPI comparison.** `split-bar` with a 2px gap (an inset separator would brush the Law 3 stripe audit), `role="img"` and a full label on the wrapper, numbers in the list beneath. Extends Test 24 to assert global id uniqueness across parents and variants. Verify the smallest segment is at least 2px at 360px.
4. **Metric tiles and Law 13.** `.metric-tile` (2rem, wash background, ink glyph, radius token, no border), `bar-chart:meter-trio`, Law 13 "Never tint an icon tile that keys nothing" in `laws.mjs` with a `structuralAudit` check (a `feature-icon` with a non-surface background, a `metric-tile` with no toned sibling). Build-docs propagates the law to the six doc surfaces.
5. **Column chart and donut ramp.** `.bar-col` with `is-active` for the peak (plus `aria-current`), non-peak bars at 75 percent tone; `.donut` reads `--ai-donut-stops` with the untoned rule unchanged; verify the track on obsidian dark.
6. **Sparkline fade, Styler and docs.** SVG gradient with `currentColor` stops and a unique id per demo on every `.spark`; a toned element in the Styler live preview so an accent swap visibly recolours a chart; a "Chart tokens and tones" section on the docs page rendered from the manifests; `llms.txt` follows from build-docs. Zero library bytes.
7. **Combo chart (optional).** Inline SVG bars plus line with `vector-effect="non-scaling-stroke"`, a labelled period select, two-swatch legend, `sr-only` two-column table.

Verification for every batch: `npm run build`, the 28-plus test suite, the strict validator sweep, and screenshots at 1280, 768 and 390 in both themes on every touched demo, with the gzip figure reported in the commit.

## Out of scope

A chart-palette picker in the Styler (its only honest setting is the default), per-chart subtle tokens, a `badge-tone`, tones on `kpi-trend`, and any CSS mask.
