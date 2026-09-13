/**
 * Former Pro components, now MIT. Generated from sites/llmcss-pro/registry.
 * Ids are unchanged so CLI/MCP bookmarks keep working.
 */
export const ungatedById = {
  'agent-workspace': {
    id: 'agent-workspace',
    name: "Agent Workspace",
    description: "Three pane workspace on one shared surface: transcript with step pips, a staged diff on the canvas, and a mono context file rail.",
    category: 'application',
    tier: 'free',
    tags: ["agent","workspace","layout"],
    html: `<div class="ai-workspace">
  <section class="ai-workspace-pane">
    <div class="ai-workspace-head">
      <span class="ai-workspace-label">Thread</span>
      <span class="ai-workspace-count">2 turns</span>
    </div>
    <div class="ai-workspace-body">
      <div class="ai-workspace-turn ai-workspace-turn-user">
        <span class="ai-workspace-turn-role">You</span>
        <p class="ai-workspace-turn-body">List the failing specs, then patch the tax rounding.</p>
      </div>
      <div class="ai-workspace-turn">
        <span class="ai-workspace-turn-role">Agent</span>
        <p class="ai-workspace-turn-body">Two specs fail on the same helper. The patch is staged on the canvas.</p>
        <ul class="ai-workspace-steps">
          <li class="ai-workspace-step">
            <span class="ai-status-pip ai-status-pip-success" aria-hidden="true"></span>
            <span>Ran the billing suite</span>
          </li>
          <li class="ai-workspace-step">
            <span class="ai-status-pip ai-status-pip-success" aria-hidden="true"></span>
            <span>Traced rounding to roundOnce</span>
          </li>
          <li class="ai-workspace-step">
            <span class="ai-status-pip is-streaming" aria-hidden="true"></span>
            <span>Drafting the patch</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section class="ai-workspace-pane">
    <div class="ai-workspace-head">
      <span class="ai-workspace-label">Canvas</span>
      <span class="ai-workspace-count">1 staged patch</span>
    </div>
    <div class="ai-workspace-body">
      <div class="ai-diff">
        <div class="ai-diff-header">
          <span class="ai-diff-path">src/tax.ts</span>
          <span class="ai-badge ai-badge-neutral ai-diff-stat">
            <span class="ai-diff-stat-add" data-tabular>+2</span>
            <span class="ai-diff-stat-del" data-tabular>-1</span>
          </span>
        </div>
        <div class="ai-diff-body">
          <div class="ai-diff-row">
            <span class="ai-diff-gutter" aria-hidden="true">41</span>
            <span class="ai-diff-gutter" aria-hidden="true">41</span>
            <span class="ai-diff-marker" aria-hidden="true"></span>
            <code class="ai-diff-code">function roundOnce(line: TaxLine) {</code>
          </div>
          <div class="ai-diff-row is-removed">
            <span class="ai-diff-gutter" aria-hidden="true">42</span>
            <span class="ai-diff-gutter" aria-hidden="true"></span>
            <span class="ai-diff-marker" aria-hidden="true">-</span>
            <code class="ai-diff-code"><span class="ai-sr-only">Removed line. </span>  return line.gross * rate / 100;</code>
          </div>
          <div class="ai-diff-row is-added">
            <span class="ai-diff-gutter" aria-hidden="true"></span>
            <span class="ai-diff-gutter" aria-hidden="true">42</span>
            <span class="ai-diff-marker" aria-hidden="true">+</span>
            <code class="ai-diff-code"><span class="ai-sr-only">Added line. </span>  const cents = Math.round(line.gross * rate);</code>
          </div>
          <div class="ai-diff-row is-added">
            <span class="ai-diff-gutter" aria-hidden="true"></span>
            <span class="ai-diff-gutter" aria-hidden="true">43</span>
            <span class="ai-diff-marker" aria-hidden="true">+</span>
            <code class="ai-diff-code"><span class="ai-sr-only">Added line. </span>  return cents / 100;</code>
          </div>
          <div class="ai-diff-row">
            <span class="ai-diff-gutter" aria-hidden="true">43</span>
            <span class="ai-diff-gutter" aria-hidden="true">44</span>
            <span class="ai-diff-marker" aria-hidden="true"></span>
            <code class="ai-diff-code">}</code>
          </div>
        </div>
      </div>
    </div>
  </section>
  <aside class="ai-workspace-pane">
    <div class="ai-workspace-head">
      <span class="ai-workspace-label">Context</span>
      <span class="ai-workspace-count">4 files</span>
    </div>
    <div class="ai-workspace-body">
      <ul class="ai-workspace-files">
        <li class="ai-workspace-file">
          <span class="ai-workspace-file-name">src/tax.ts</span>
          <span class="ai-workspace-label">Edit</span>
        </li>
        <li class="ai-workspace-file">
          <span class="ai-workspace-file-name">billing/invoice-total.spec.ts</span>
          <span class="ai-workspace-label">Spec</span>
        </li>
        <li class="ai-workspace-file">
          <span class="ai-workspace-file-name">src/money.ts</span>
          <span class="ai-workspace-label">Read</span>
        </li>
        <li class="ai-workspace-file">
          <span class="ai-workspace-file-name">docs/rounding.md</span>
          <span class="ai-workspace-label">Read</span>
        </li>
      </ul>
    </div>
  </aside>
</div>`,
  },
  'ai-chat-thread': {
    id: 'ai-chat-thread',
    name: "AI Conversational Thread",
    description: "Chat transcript with avatar rows, role labels and mono timestamps, an inline tool call, a streaming turn, and a prompt composer.",
    category: 'application',
    tier: 'free',
    tags: ["chat","conversation","ai","thread","assistant"],
    html: `<div class="ai-chat-container">
  <div class="ai-chat-header">
    <div class="ai-flex ai-items-center ai-gap-2">
      <span class="ai-font-semibold ai-text-sm">Agentic Pair Programmer</span>
      <span class="ai-status-pip ai-status-pip-success" aria-hidden="true"></span>
      <span class="ai-text-xs ai-text-muted">Ready</span>
    </div>
    <div class="ai-flex ai-items-center ai-gap-2">
      <span class="ai-text-xs ai-font-mono ai-text-muted">claude-sonnet-5</span>
      <button class="ai-btn ai-btn-ghost ai-btn-xs" type="button" aria-label="Thread options">&bull;&bull;&bull;</button>
    </div>
  </div>
  <div class="ai-chat-messages">
    <div class="ai-chat-msg ai-chat-msg-user">
      <span class="ai-chat-avatar" aria-hidden="true">JD</span>
      <div class="ai-chat-meta">
        <span class="ai-chat-role">You</span>
        <span class="ai-chat-time">09:41</span>
      </div>
      <div class="ai-chat-body">
        <p>Can you build a self-responsive card using LLMCSS container queries?</p>
      </div>
    </div>
    <div class="ai-chat-msg">
      <span class="ai-chat-avatar ai-chat-avatar-assistant" aria-hidden="true">AP</span>
      <div class="ai-chat-meta">
        <span class="ai-chat-role">Agent</span>
        <span class="ai-chat-time">09:41</span>
      </div>
      <div class="ai-chat-body">
        <p>Yes. Wrap the card in <code>.ai-cq</code> and let the container query variants size it, with no breakpoint media queries.</p>
        <pre class="ai-code-block"><code>&lt;div class="ai-cq ai-grid ai-cq:grid-cols-2 ai-cq:gap-4"&gt;
  &lt;div class="ai-kpi-card"&gt;...&lt;/div&gt;
&lt;/div&gt;</code></pre>
        <p class="ai-chat-note">One column in a narrow rail, two in the main canvas, measured against the card's own width.</p>
      </div>
    </div>
    <div class="ai-chat-msg ai-chat-msg-user">
      <span class="ai-chat-avatar" aria-hidden="true">JD</span>
      <div class="ai-chat-meta">
        <span class="ai-chat-role">You</span>
        <span class="ai-chat-time">09:43</span>
      </div>
      <div class="ai-chat-body">
        <p>Ship it. Does it hold up inside the 14rem context rail?</p>
      </div>
    </div>
    <div class="ai-chat-msg is-streaming">
      <span class="ai-chat-avatar ai-chat-avatar-assistant" aria-hidden="true">AP</span>
      <div class="ai-chat-meta">
        <span class="ai-chat-role">Agent</span>
        <span class="ai-chat-time">09:43</span>
      </div>
      <div class="ai-chat-body">
        <div class="ai-chat-tool">
          <span>read_file src/css/utilities.css</span>
          <span class="ai-badge ai-badge-success">ok 38ms</span>
        </div>
        <p>Below 20rem the grid folds to a single column, so the rail keeps one readable card per row</p>
      </div>
    </div>
  </div>
  <div class="ai-chat-input-bar">
    <div class="ai-input-group ai-chat-composer">
      <input type="text" class="ai-input" placeholder="Send prompt to agent..." aria-label="Prompt" />
      <button class="ai-btn ai-btn-primary ai-btn-sm" type="button">Send</button>
    </div>
  </div>
</div>`,
  },
  'approval-bar': {
    id: 'approval-bar',
    name: "Approval Bar",
    description: "Pending action bar with a warning accent and pip, the tool call in mono, and quiet deny, outline edit and primary allow once actions.",
    category: 'application',
    tier: 'free',
    tags: ["agent","approval","bar"],
    html: `<div class="ai-approval">
  <div class="ai-approval-main">
    <span class="ai-approval-status">
      <span class="ai-status-pip ai-status-pip-warning" aria-hidden="true"></span>
      Needs approval
    </span>
    <span class="ai-approval-action">write_file <span class="ai-approval-target">src/auth.ts</span></span>
    <p class="ai-approval-note">Replaces the session helper and rewrites two call sites. Review the diff before allowing.</p>
  </div>
  <div class="ai-approval-actions">
    <button class="ai-btn ai-btn-ghost ai-btn-sm ai-approval-deny" type="button">Deny</button>
    <button class="ai-btn ai-btn-outline ai-btn-sm" type="button">Edit</button>
    <button class="ai-btn ai-btn-primary ai-btn-sm" type="button">Allow once</button>
  </div>
</div>`,
  },
  'bento-editorial-pro': {
    id: 'bento-editorial-pro',
    name: "Asymmetric Editorial Bento",
    description: "High-craft 3-column asymmetric bento layout with live terminal code pill, telemetry stats, and architectural surface accents.",
    category: 'marketing',
    tier: 'free',
    tags: ["bento","grid","editorial","hero","marketing"],
    html: `<div class="ai-bento-grid">
  <div class="ai-bento-cell ai-bento-span-2">
    <div>
      <span class="ai-bento-code-pill" style="margin-bottom: var(--ai-space-4);">
        <span class="ai-text-muted ai-font-mono" style="font-weight: 600; opacity: 0.6; margin-right: 0.15rem;">$</span>
        <span>llmcss init --theme=obsidian</span>
      </span>
      <h3 class="ai-font-display ai-font-bold" style="font-size: 1.5rem; margin-top: var(--ai-space-2);">
        Zero-token dark mode with pure native cascading variables
      </h3>
      <p class="ai-text-secondary ai-text-sm" style="margin-top: var(--ai-space-2); max-width: 28rem;">
        No arbitrary class name hallucination. Full Light-DOM Web Components and zero external dependencies.
      </p>
    </div>
    <div class="ai-flex ai-gap-4 ai-items-center" style="margin-top: var(--ai-space-6);">
      <span class="ai-badge ai-badge-mono">&lt; 2.5KB Bundle</span>
      <span class="ai-badge ai-badge-neutral">68% Token Savings</span>
    </div>
  </div>
  <div class="ai-bento-cell">
    <div>
      <span class="ai-text-xs ai-font-mono ai-text-muted">BENCHMARK</span>
      <div class="ai-font-display ai-font-bold" style="font-size: 2.25rem; margin-top: var(--ai-space-2);">
        0ms
      </div>
      <p class="ai-text-secondary ai-text-xs" style="margin-top: 0.25rem;">
        CSS-in-JS runtime overhead. 100% native browser layers.
      </p>
    </div>
    <div class="ai-progress" style="margin-top: var(--ai-space-4);">
      <div class="ai-progress-bar" style="width: 100%;"></div>
    </div>
  </div>
  <div class="ai-bento-cell">
    <div>
      <span class="ai-text-xs ai-font-mono ai-text-muted">COMPATIBILITY</span>
      <h4 class="ai-font-semibold" style="margin-top: var(--ai-space-2);">Universal Standard</h4>
      <p class="ai-text-secondary ai-text-xs" style="margin-top: 0.25rem;">Vanilla HTML, Astro, Svelte, Vue, React, Next.js.</p>
    </div>
  </div>
  <div class="ai-bento-cell ai-bento-span-2">
    <div class="ai-flex ai-justify-between ai-items-start">
      <div>
        <span class="ai-text-xs ai-font-mono ai-text-muted">AGENT CO-PILOT</span>
        <h4 class="ai-font-semibold" style="margin-top: var(--ai-space-1);">Model Context Protocol Ready</h4>
        <p class="ai-text-secondary ai-text-xs" style="margin-top: 0.25rem;">Native stdio MCP server for autonomous coding agents.</p>
      </div>
      <button class="ai-btn ai-btn-outline ai-btn-xs">Docs &rarr;</button>
    </div>
  </div>
</div>`,
  },
  'cart-drawer-pro': {
    id: 'cart-drawer-pro',
    name: "Slide-Out Cart Drawer",
    description: "Full slide-out shopping bag drawer with line items, quantity steppers, subtotal, and checkout CTA.",
    category: 'ecommerce',
    tier: 'free',
    tags: ["cart","drawer","checkout","ecommerce"],
    html: `<button class="ai-btn ai-btn-primary" data-ai-toggle="drawer" data-ai-target="#cart-demo">
  Open Cart Drawer
</button>

<div id="cart-demo" class="ai-drawer">
  <div class="ai-drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="ai-drawer-panel">
    <div class="ai-drawer-header">
      <div class="ai-flex ai-items-center ai-gap-2">
        <h3 class="ai-drawer-title">Shopping Bag</h3>
        <span class="ai-badge ai-badge-default">2 items</span>
      </div>
      <button class="ai-modal-close" data-ai-dismiss="drawer">&times;</button>
    </div>
    <div class="ai-drawer-body">
      <div class="ai-cart-item">
        <img class="ai-cart-thumb" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80" alt="Headphones" />
        <div class="ai-cart-details">
          <span class="ai-cart-name">Aether Precision Studio</span>
          <span class="ai-cart-subtext">Matte Obsidian / Bluetooth 5.4</span>
          <div class="ai-flex ai-justify-between ai-items-center" style="margin-top: 0.5rem;">
            <div class="ai-cart-stepper">
              <button>-</button>
              <span style="padding: 0 0.5rem; font-size: 0.8125rem;">1</span>
              <button>+</button>
            </div>
            <span class="ai-font-bold">$349.00</span>
          </div>
        </div>
      </div>
    </div>
    <div class="ai-drawer-footer">
      <div class="ai-flex ai-justify-between ai-items-center" style="margin-bottom: var(--ai-space-4);">
        <span class="ai-text-sm ai-text-secondary">Subtotal</span>
        <span class="ai-font-display ai-font-bold" style="font-size: 1.25rem;">$349.00</span>
      </div>
      <button class="ai-btn ai-btn-primary ai-w-full ai-btn-lg">Checkout Now</button>
    </div>
  </div>
</div>`,
    webComponentHtml: `<ai-drawer id="cart-demo">
  <div class="ai-drawer-backdrop"></div>
  <div class="ai-drawer-panel">
    <div class="ai-drawer-header">
      <h3 class="ai-drawer-title">Shopping Bag</h3>
      <button class="ai-modal-close" data-ai-dismiss="drawer">&times;</button>
    </div>
    <div class="ai-drawer-body">
      <p>Cart contents here</p>
    </div>
  </div>
</ai-drawer>`,
  },
  'citation-list': {
    id: 'citation-list',
    name: "Citation List",
    description: "Numbered source list with domain, snippet, and open action.",
    category: 'application',
    tier: 'free',
    tags: ["citations","sources","rag"],
    html: `<ol style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--ai-space-3);">
  <li class="ai-card" style="padding: var(--ai-space-4);">
    <div class="ai-flex ai-justify-between ai-items-center">
      <span class="ai-font-mono ai-text-xs ai-text-muted">[1] polar.sh</span>
      <a class="ai-btn ai-btn-ghost ai-btn-xs" href="https://polar.sh/docs">Open</a>
    </div>
    <p class="ai-text-sm" style="margin-top: 0.35rem;">Webhook signatures use Standard Webhooks headers.</p>
  </li>
  <li class="ai-card" style="padding: var(--ai-space-4);">
    <div class="ai-flex ai-justify-between ai-items-center">
      <span class="ai-font-mono ai-text-xs ai-text-muted">[2] llmcss.io</span>
      <a class="ai-btn ai-btn-ghost ai-btn-xs" href="https://llmcss.io/llms.txt">Open</a>
    </div>
    <p class="ai-text-sm" style="margin-top: 0.35rem;">Free registry is MIT. Pro is token-gated.</p>
  </li>
</ol>`,
  },
  'command-palette-pro': {
    id: 'command-palette-pro',
    name: "Command Palette",
    description: "Keyboard-driven search & quick command dialog with group headers, shortcut badges, and live filter.",
    category: 'application',
    tier: 'free',
    tags: ["command","search","palette","keyboard"],
    html: `<button class="ai-btn ai-btn-outline" data-ai-toggle="modal" data-ai-target="#command-demo">
  Open ⌘K Command Palette <span class="ai-command-kbd" style="margin-left: 0.5rem;">⌘K</span>
</button>

<div id="command-demo" class="ai-command-palette">
  <div class="ai-modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="ai-command-box">
    <div class="ai-command-input-wrapper">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" class="ai-command-input" placeholder="Type a command or search components..." autofocus />
      <span class="ai-command-kbd">ESC</span>
    </div>
    <ul class="ai-command-list">
      <li class="ai-command-group-heading">Suggestions</li>
      <li class="ai-command-item is-selected">
        <div class="ai-command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          <span>Create New Component</span>
        </div>
        <span class="ai-command-kbd">⌘N</span>
      </li>
      <li class="ai-command-item">
        <div class="ai-command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/></svg>
          <span>Switch Theme to Minimalist Obsidian</span>
        </div>
        <span class="ai-command-kbd">⌘T</span>
      </li>
      <li class="ai-command-group-heading">Navigation</li>
      <li class="ai-command-item">
        <div class="ai-command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 8-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>
          <span>Go to Registry Catalog</span>
        </div>
        <span class="ai-command-kbd">G R</span>
      </li>
      <li class="ai-command-item">
        <div class="ai-command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.9 4.9 2.1 2.1"/><path d="m17 17 2.1 2.1"/><path d="m4.9 19.1 2.1-2.1"/><path d="m17 7 2.1-2.1"/></svg>
          <span>Workspace Settings</span>
        </div>
        <span class="ai-command-kbd">G S</span>
      </li>
    </ul>
  </div>
</div>`,
    webComponentHtml: `<ai-command-palette id="command-demo">
  <div class="ai-modal-backdrop"></div>
  <div class="ai-command-box">
    <div class="ai-command-input-wrapper">
      <input type="text" class="ai-command-input" placeholder="Search..." />
    </div>
    <ul class="ai-command-list">
      <li class="ai-command-item"><span>Command 1</span></li>
    </ul>
  </div>
</ai-command-palette>`,
  },
  'cost-meter': {
    id: 'cost-meter',
    name: "Cost Meter",
    description: "Spend and token meter with warn and hard stop notches on the bar, a period label, and a projection at the current rate.",
    category: 'application',
    tier: 'free',
    tags: ["cost","budget","meter","usage","billing"],
    html: `<div class="ai-cost">
  <div class="ai-cost-head">
    <div>
      <h3 class="ai-cost-title" id="ai-cost-label">Agent spend</h3>
      <p class="ai-cost-period">Billing period 1 Sep to 30 Sep 2026, 18 days left</p>
    </div>
    <span class="ai-badge ai-badge-warning">Warn threshold passed</span>
  </div>

  <p class="ai-cost-value" data-tabular>
    $184.20
    <span class="ai-cost-limit">of a $250.00 limit</span>
  </p>

  <div class="ai-cost-track" role="meter" aria-labelledby="ai-cost-label" aria-valuenow="184.2" aria-valuemin="0" aria-valuemax="250" aria-valuetext="184.20 US dollars of a 250.00 dollar limit" style="--ai-cost-pct: 73.7%; --ai-threshold-warn: 70%; --ai-threshold-danger: 90%;">
    <span class="ai-cost-fill"></span>
    <span class="ai-cost-mark is-warn" aria-hidden="true"></span>
    <span class="ai-cost-mark is-danger" aria-hidden="true"></span>
  </div>

  <ul class="ai-cost-legend">
    <li>
      <span class="ai-status-pip ai-status-pip-warning"></span>
      Warn at <span data-tabular>$175.00</span>
    </li>
    <li>
      <span class="ai-status-pip ai-status-pip-danger"></span>
      Hard stop at <span data-tabular>$225.00</span>
    </li>
  </ul>

  <hr class="ai-divider">

  <dl class="ai-cost-rows">
    <div class="ai-cost-row">
      <dt>Tokens</dt>
      <dd data-tabular>12.4M of 20.0M</dd>
    </div>
    <div class="ai-cost-row">
      <dt>Runs</dt>
      <dd data-tabular>318</dd>
    </div>
    <div class="ai-cost-row">
      <dt>Median cost per run</dt>
      <dd data-tabular>$0.58</dd>
    </div>
    <div class="ai-cost-row">
      <dt>Projected at this rate</dt>
      <dd data-tabular>$307.00</dd>
    </div>
  </dl>

  <p class="ai-cost-note">Runs are queued rather than dropped once the hard stop is reached. Raise the limit in workspace billing.</p>
</div>`,
  },
  'diff-view': {
    id: 'diff-view',
    name: "Diff View",
    description: "Line level before and after diff with paired gutters, tinted added and removed rows, and a collapsed run of unchanged lines.",
    category: 'application',
    tier: 'free',
    tags: ["diff","code","review","agent"],
    html: `<div class="ai-diff">
  <div class="ai-diff-header">
    <span class="ai-diff-path">src/billing/invoice-total.ts</span>
    <span class="ai-badge ai-badge-neutral ai-diff-stat">
      <span class="ai-diff-stat-add" data-tabular>+3</span>
      <span class="ai-diff-stat-del" data-tabular>-2</span>
    </span>
  </div>
  <div class="ai-diff-body">
    <div class="ai-diff-row">
      <span class="ai-diff-gutter" aria-hidden="true">41</span>
      <span class="ai-diff-gutter" aria-hidden="true">41</span>
      <span class="ai-diff-marker" aria-hidden="true"></span>
      <code class="ai-diff-code">export function invoiceTotal(lines: Line[], tax: TaxInput) {</code>
    </div>
    <div class="ai-diff-fold">12 unchanged lines</div>
    <div class="ai-diff-row">
      <span class="ai-diff-gutter" aria-hidden="true">54</span>
      <span class="ai-diff-gutter" aria-hidden="true">54</span>
      <span class="ai-diff-marker" aria-hidden="true"></span>
      <code class="ai-diff-code">  const subtotal = lines.reduce((sum, l) =&gt; sum + l.amount, 0);</code>
    </div>
    <div class="ai-diff-row is-removed">
      <span class="ai-diff-gutter" aria-hidden="true">55</span>
      <span class="ai-diff-gutter" aria-hidden="true"></span>
      <span class="ai-diff-marker" aria-hidden="true">-</span>
      <code class="ai-diff-code"><span class="ai-sr-only">Removed line. </span>  const taxDue = subtotal * 0.2;</code>
    </div>
    <div class="ai-diff-row is-removed">
      <span class="ai-diff-gutter" aria-hidden="true">56</span>
      <span class="ai-diff-gutter" aria-hidden="true"></span>
      <span class="ai-diff-marker" aria-hidden="true">-</span>
      <code class="ai-diff-code"><span class="ai-sr-only">Removed line. </span>  return subtotal + taxDue;</code>
    </div>
    <div class="ai-diff-row is-added">
      <span class="ai-diff-gutter" aria-hidden="true"></span>
      <span class="ai-diff-gutter" aria-hidden="true">55</span>
      <span class="ai-diff-marker" aria-hidden="true">+</span>
      <code class="ai-diff-code"><span class="ai-sr-only">Added line. </span>  const rate = taxRateFor(tax.region, tax.asOf);</code>
    </div>
    <div class="ai-diff-row is-added">
      <span class="ai-diff-gutter" aria-hidden="true"></span>
      <span class="ai-diff-gutter" aria-hidden="true">56</span>
      <span class="ai-diff-marker" aria-hidden="true">+</span>
      <code class="ai-diff-code"><span class="ai-sr-only">Added line. </span>  const taxDue = roundCents(subtotal * rate);</code>
    </div>
    <div class="ai-diff-row is-added">
      <span class="ai-diff-gutter" aria-hidden="true"></span>
      <span class="ai-diff-gutter" aria-hidden="true">57</span>
      <span class="ai-diff-marker" aria-hidden="true">+</span>
      <code class="ai-diff-code"><span class="ai-sr-only">Added line. </span>  return { subtotal, taxDue, total: subtotal + taxDue };</code>
    </div>
    <div class="ai-diff-row">
      <span class="ai-diff-gutter" aria-hidden="true">57</span>
      <span class="ai-diff-gutter" aria-hidden="true">58</span>
      <span class="ai-diff-marker" aria-hidden="true"></span>
      <code class="ai-diff-code">}</code>
    </div>
  </div>
  <div class="ai-diff-footer">
    <span class="ai-diff-note">Rounding now happens once, on the tax line only.</span>
    <span class="ai-diff-hunk" data-tabular>Hunk 2 of 3</span>
  </div>
</div>`,
  },
  'hero-bento-pro': {
    id: 'hero-bento-pro',
    name: "Asymmetric Bento Hero",
    description: "Flagship bento grid hero with tactile borders, live interactive code previews, and luxury surface physics.",
    category: 'marketing',
    tier: 'free',
    tags: ["hero","bento","luxury"],
    html: `<section class="ai-hero">
  <div class="ai-container">
    <div class="ai-text-center" style="max-width: 48rem; margin: 0 auto var(--ai-space-12);">
      <h1 class="ai-hero-title">Architected for deep intelligence</h1>
      <p class="ai-hero-lead" style="margin: 0 auto;">
        Give your agentic coding workflows the aesthetic craft of top-tier product studios.
      </p>
    </div>
    <div class="ai-bento-grid">
      <div class="ai-card-bento ai-bento-col-2">
        <div>
          <h3 class="ai-card-title" style="font-size: 1.5rem;">Infinite Skinning Architecture</h3>
          <p class="ai-text-secondary" style="margin-top: var(--ai-space-2);">Switch between Minimalist Obsidian, Warm Editorial, Neo-Brutalist, and Swiss Modern with a single data-attribute.</p>
        </div>
        <div style="background-color: var(--ai-surface-1); padding: var(--ai-space-4); border-radius: var(--ai-radius-md); margin-top: var(--ai-space-6); border: 1px solid var(--ai-border);">
          <pre><code>&lt;html data-ai-skin="editorial"&gt;
  &lt;!-- Instant warm ivory surfaces &amp; serif display --&gt;
&lt;/html&gt;</code></pre>
        </div>
      </div>
      <div class="ai-card-bento">
        <div>
          <h3 class="ai-card-title">MCP Server Ready</h3>
          <p class="ai-text-secondary" style="margin-top: var(--ai-space-2);">Native Model Context Protocol integration allows autonomous AI agents to query and assemble sections dynamically.</p>
        </div>
        <div class="ai-flex ai-items-center ai-gap-2" style="margin-top: var(--ai-space-6);">
          <span class="ai-badge ai-badge-success ai-badge-dot">MCP Connected</span>
          <span class="ai-badge ai-badge-outline">Port 8080</span>
        </div>
      </div>
    </div>
  </div>
</section>`,
  },
  'mcp-widget-shell': {
    id: 'mcp-widget-shell',
    name: "MCP Widget Shell",
    description: "Card shell for an MCP tool result with schema badge and copy.",
    category: 'application',
    tier: 'free',
    tags: ["mcp","widget","agent"],
    html: `<div class="ai-card" style="padding: var(--ai-space-4);">
  <div class="ai-flex ai-justify-between ai-items-center">
    <div class="ai-flex ai-items-center ai-gap-2">
      <span class="ai-badge ai-badge-mono">MCP</span>
      <span class="ai-font-semibold ai-text-sm">get_component_markup</span>
    </div>
    <button class="ai-btn ai-btn-ghost ai-btn-xs" type="button">Copy JSON</button>
  </div>
  <p class="ai-text-xs ai-text-secondary" style="margin-top: var(--ai-space-3);">id=btn-variants · tier=free · 489 bytes html</p>
  <pre style="margin-top: var(--ai-space-3); font-size: 0.75rem; background: var(--ai-surface-1); padding: var(--ai-space-3); border-radius: var(--ai-radius-sm);"><code>{ "id": "btn-variants", "tier": "free" }</code></pre>
</div>`,
  },
  'model-picker': {
    id: 'model-picker',
    name: "Model Picker",
    description: "Single choice model list showing provider, context window and price per million tokens, with the selected state driven entirely by CSS.",
    category: 'application',
    tier: 'free',
    tags: ["model","picker","radio","settings","agent"],
    html: `<div class="ai-cq">
  <fieldset class="ai-model-picker">
    <legend class="ai-model-legend">Model for this workspace</legend>
    <p class="ai-model-note">Applies to new runs. Agents already running keep the model they started with.</p>
    <div class="ai-model-list">
      <label class="ai-model-row">
        <input class="ai-radio-input ai-model-radio" type="radio" name="workspace-model" value="sonnet-4-6" checked>
        <span class="ai-model-body">
          <span class="ai-model-head">
            <span class="ai-model-name">Sonnet 4.6</span>
            <span class="ai-badge ai-badge-neutral ai-model-tag">Default</span>
          </span>
          <span class="ai-model-provider">Anthropic, balanced latency and depth</span>
        </span>
        <span class="ai-model-meta">
          <span class="ai-model-context" data-tabular>200K context</span>
          <span class="ai-model-price" data-tabular>$3.00 in / $15.00 out per 1M</span>
        </span>
      </label>

      <label class="ai-model-row">
        <input class="ai-radio-input ai-model-radio" type="radio" name="workspace-model" value="opus-4-6">
        <span class="ai-model-body">
          <span class="ai-model-head">
            <span class="ai-model-name">Opus 4.6</span>
          </span>
          <span class="ai-model-provider">Anthropic, deepest reasoning, slowest</span>
        </span>
        <span class="ai-model-meta">
          <span class="ai-model-context" data-tabular>200K context</span>
          <span class="ai-model-price" data-tabular>$15.00 in / $75.00 out per 1M</span>
        </span>
      </label>

      <label class="ai-model-row">
        <input class="ai-radio-input ai-model-radio" type="radio" name="workspace-model" value="haiku-4-5">
        <span class="ai-model-body">
          <span class="ai-model-head">
            <span class="ai-model-name">Haiku 4.5</span>
          </span>
          <span class="ai-model-provider">Anthropic, fast edits and short tool loops</span>
        </span>
        <span class="ai-model-meta">
          <span class="ai-model-context" data-tabular>200K context</span>
          <span class="ai-model-price" data-tabular>$1.00 in / $5.00 out per 1M</span>
        </span>
      </label>

      <label class="ai-model-row">
        <input class="ai-radio-input ai-model-radio" type="radio" name="workspace-model" value="self-hosted-70b">
        <span class="ai-model-body">
          <span class="ai-model-head">
            <span class="ai-model-name">Llama 3.3 70B</span>
            <span class="ai-badge ai-badge-neutral ai-model-tag">Self hosted</span>
          </span>
          <span class="ai-model-provider">Runs on your own GPU pool, no data leaves the VPC</span>
        </span>
        <span class="ai-model-meta">
          <span class="ai-model-context" data-tabular>128K context</span>
          <span class="ai-model-price" data-tabular>$0.40 in / $0.40 out per 1M</span>
        </span>
      </label>
    </div>
  </fieldset>
</div>`,
  },
  'permission-dialog': {
    id: 'permission-dialog',
    name: "Permission Dialog",
    description: "Modal that asks the user to allow or deny a scoped agent action, with a per capability risk read and a remember for this session option.",
    category: 'application',
    tier: 'free',
    tags: ["agent","permission","modal","approval","security"],
    html: `<button class="ai-btn ai-btn-outline" type="button" aria-haspopup="dialog" aria-expanded="false" data-ai-toggle="modal" data-ai-target="#ai-permission-dialog">
  Review requested access
</button>

<div class="ai-modal" id="ai-permission-dialog">
  <div class="ai-modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="ai-modal-box ai-permission-box" role="dialog" aria-modal="true" aria-labelledby="ai-permission-title" aria-describedby="ai-permission-lead">
    <div class="ai-modal-header">
      <h2 class="ai-modal-title" id="ai-permission-title">Allow the billing migration?</h2>
      <button class="ai-modal-close" type="button" data-ai-dismiss="modal" aria-label="Close dialog">&times;</button>
    </div>
    <div class="ai-modal-body">
      <p class="ai-permission-lead" id="ai-permission-lead">
        Release Agent is asking for four capabilities scoped to the billing service. Nothing outside
        this list is granted, and the grant ends the moment you sign out.
      </p>
      <table class="ai-table ai-permission-scope">
        <thead>
          <tr>
            <th scope="col">Capability</th>
            <th scope="col">Resource</th>
            <th scope="col">Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code class="ai-permission-cap">db.migrate</code></td>
            <td class="ai-permission-resource">billing-prod / invoices</td>
            <td><span class="ai-permission-risk"><span class="ai-status-pip ai-status-pip-danger"></span>High</span></td>
          </tr>
          <tr>
            <td><code class="ai-permission-cap">files.write</code></td>
            <td class="ai-permission-resource">repo / migrations/2026_09_fees.sql</td>
            <td><span class="ai-permission-risk"><span class="ai-status-pip ai-status-pip-warning"></span>Medium</span></td>
          </tr>
          <tr>
            <td><code class="ai-permission-cap">db.read</code></td>
            <td class="ai-permission-resource">billing-prod / customers</td>
            <td><span class="ai-permission-risk"><span class="ai-status-pip ai-status-pip-warning"></span>Medium</span></td>
          </tr>
          <tr>
            <td><code class="ai-permission-cap">metrics.read</code></td>
            <td class="ai-permission-resource">grafana / billing-latency</td>
            <td><span class="ai-permission-risk"><span class="ai-status-pip ai-status-pip-success"></span>Low</span></td>
          </tr>
        </tbody>
      </table>
      <label class="ai-checkbox ai-permission-remember">
        <input class="ai-checkbox-input" type="checkbox" name="permission-remember" value="session">
        <span>
          Remember for this session
          <span class="ai-permission-remember-hint">Skips this dialog for these four capabilities until you sign out.</span>
        </span>
      </label>
    </div>
    <div class="ai-modal-footer">
      <span class="ai-permission-expiry">Grant expires in <span data-tabular>42</span> min</span>
      <button class="ai-btn ai-btn-outline" type="button" data-ai-dismiss="modal">Deny</button>
      <button class="ai-btn ai-btn-primary" type="button" data-ai-dismiss="modal">Allow</button>
    </div>
  </div>
</div>`,
  },
  'pricing-matrix-pro': {
    id: 'pricing-matrix-pro',
    name: "Enterprise Pricing Matrix",
    description: "Full enterprise feature comparison matrix with sticky left column, tier breakdowns, and tiered action buttons.",
    category: 'marketing',
    tier: 'free',
    tags: ["pricing","matrix","comparison","table","marketing"],
    html: `<div class="ai-matrix-container">
  <table class="ai-matrix-table">
    <thead>
      <tr>
        <th class="ai-matrix-feature-col" style="width: 40%;">Core Capabilities</th>
        <th style="width: 20%;">Free</th>
        <th style="width: 20%; background-color: var(--ai-surface-1);">Pro ($9/mo)</th>
        <th style="width: 20%;">Enterprise</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="4" class="ai-matrix-category-header">Engine & Architecture</td>
      </tr>
      <tr>
        <td class="ai-matrix-feature-col">Native CSS Layers (@layer)</td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span></td>
        <td style="background-color: var(--ai-surface-1);"><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr>
        <td class="ai-matrix-feature-col">Light-DOM Web Components</td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span></td>
        <td style="background-color: var(--ai-surface-1);"><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr>
        <td class="ai-matrix-feature-col">Container Query Layouts</td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span></td>
        <td style="background-color: var(--ai-surface-1);"><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr>
        <td colspan="4" class="ai-matrix-category-header">Component Library</td>
      </tr>
      <tr>
        <td class="ai-matrix-feature-col">Core UI Primitives</td>
        <td>20+ Primitives</td>
        <td style="background-color: var(--ai-surface-1); font-weight: 600;">All 40+ Primitives</td>
        <td>All + Custom</td>
      </tr>
      <tr>
        <td class="ai-matrix-feature-col">High-Craft Bento Heroes</td>
        <td class="ai-text-muted">-</td>
        <td style="background-color: var(--ai-surface-1); color: var(--ai-accent); font-weight: 600;"><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span>Pro Bento Kit</td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span>Bespoke</td>
      </tr>
      <tr>
        <td class="ai-matrix-feature-col">Conversational AI Threads</td>
        <td class="ai-text-muted">-</td>
        <td style="background-color: var(--ai-surface-1); color: var(--ai-accent); font-weight: 600;"><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span>Full App Kits</td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span>Full App Kits</td>
      </tr>
      <tr>
        <td colspan="4" class="ai-matrix-category-header">Tooling & Agent Integration</td>
      </tr>
      <tr>
        <td class="ai-matrix-feature-col">CLI Tooling (llmcss add)</td>
        <td>Free Registry</td>
        <td style="background-color: var(--ai-surface-1); font-weight: 600;">Full Pro Access</td>
        <td>Private Registry</td>
      </tr>
      <tr>
        <td class="ai-matrix-feature-col">Stdio MCP Server for AI Agents</td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span>Standard</td>
        <td style="background-color: var(--ai-surface-1);"><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span>Priority API</td>
        <td><span class="ai-mark ai-mark-yes" role="img" aria-label="Yes"></span>Dedicated Instance</td>
      </tr>
    </tbody>
  </table>
</div>`,
  },
  'prompt-composer': {
    id: 'prompt-composer',
    name: "Prompt Composer",
    description: "Auto growing prompt textarea with a model chip, attachment chips, a token counter with a quota hint, and a send action.",
    category: 'application',
    tier: 'free',
    tags: ["prompt","composer","input","chat","agent"],
    html: `<div class="ai-cq">
  <form class="ai-composer" action="#" method="post">
    <label class="ai-sr-only" for="ai-composer-input">Message the agent</label>
    <textarea class="ai-textarea ai-composer-input" id="ai-composer-input" name="prompt" rows="2" placeholder="Describe the change you want, or paste a stack trace.">Rounding is off by a cent on EU invoices. Find where the tax is rounded twice and fix it.</textarea>
    <ul class="ai-composer-files">
      <li class="ai-composer-file">
        <span class="ai-composer-file-name">invoice-total.ts</span>
        <span class="ai-composer-file-size" data-tabular>4.1 kB</span>
      </li>
      <li class="ai-composer-file">
        <span class="ai-composer-file-name">failing-run.log</span>
        <span class="ai-composer-file-size" data-tabular>19.7 kB</span>
      </li>
    </ul>
    <div class="ai-composer-toolbar">
      <div class="ai-composer-tools">
        <span class="ai-composer-model">
          <span class="ai-status-pip ai-status-pip-success"></span>
          Sonnet 5
        </span>
        <button class="ai-btn ai-btn-ghost ai-btn-sm ai-btn-icon" type="button" aria-label="Attach a file">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21.44 11.05l-8.49 8.49a5 5 0 0 1-7.07-7.07l8.49-8.49a3.5 3.5 0 0 1 4.95 4.95l-8.49 8.49a2 2 0 0 1-2.83-2.83l7.78-7.78"/>
          </svg>
        </button>
        <button class="ai-btn ai-btn-ghost ai-btn-sm ai-btn-icon" type="button" aria-label="Attach the current selection">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M16 18l4-6-4-6"/>
            <path d="M8 6l-4 6 4 6"/>
          </svg>
        </button>
      </div>
      <div class="ai-composer-send">
        <span class="ai-composer-count">
          <span class="ai-composer-tokens" data-tabular>1,284 / 8,000 tokens</span>
          <span class="ai-composer-quota" data-tabular>84% of today's request budget left</span>
        </span>
        <button class="ai-btn ai-btn-primary ai-btn-sm" type="submit">Send</button>
      </div>
    </div>
  </form>
  <p class="ai-composer-hint">Enter to send, Shift+Enter for newline</p>
</div>`,
  },
  'run-status-header': {
    id: 'run-status-header',
    name: "Run Status Header",
    description: "Page header for a live agent run: title, run id, status pip, elapsed timer, step count and the run controls, plus a finished variant.",
    category: 'application',
    tier: 'free',
    tags: ["agent","run","status","header","telemetry"],
    html: `<header class="ai-page-header ai-run-header">
  <div class="ai-run-main">
    <h1 class="ai-run-title">Migrate billing to the Stripe adapter</h1>
    <div class="ai-page-header-meta ai-run-meta">
      <span class="ai-run-id">run_8f31c04e</span>
      <span class="ai-run-state" aria-live="polite">
        <span class="ai-status-pip is-streaming"></span>
        Running
      </span>
      <span class="ai-run-timer" data-tabular>
        <span class="ai-sr-only">Elapsed</span>
        00:04:19
      </span>
      <span class="ai-run-steps">Step <span data-tabular>7</span> of <span data-tabular>12</span></span>
    </div>
  </div>
  <div class="ai-run-actions">
    <button class="ai-btn ai-btn-ghost ai-btn-sm" type="button">View log</button>
    <button class="ai-btn ai-btn-outline ai-btn-sm ai-run-cancel" type="button">Cancel run</button>
  </div>
</header>

<header class="ai-page-header ai-run-header is-done">
  <div class="ai-run-main">
    <h1 class="ai-run-title">Backfill invoice tax rates</h1>
    <div class="ai-page-header-meta ai-run-meta">
      <span class="ai-run-id">run_5b7a91d2</span>
      <span class="ai-run-state">
        <span class="ai-status-pip ai-status-pip-success"></span>
        Finished
      </span>
      <span class="ai-run-timer" data-tabular>
        <span class="ai-sr-only">Elapsed</span>
        00:06:02
      </span>
      <span class="ai-run-steps">Step <span data-tabular>12</span> of <span data-tabular>12</span></span>
    </div>
  </div>
  <div class="ai-run-actions">
    <button class="ai-btn ai-btn-ghost ai-btn-sm" type="button">View log</button>
    <button class="ai-btn ai-btn-outline ai-btn-sm ai-run-cancel" type="button" disabled>Cancel run</button>
  </div>
</header>`,
  },
  'split-pane': {
    id: 'split-pane',
    name: "Split Pane",
    description: "Two resizable panes joined by a keyboard adjustable separator, horizontal by default and stacked on the vertical variant.",
    category: 'application',
    tier: 'free',
    tags: ["layout","split","resize","panes","workspace"],
    html: `<div class="ai-split" style="--ai-split-a: 58%;">
  <section class="ai-split-pane" aria-label="Plan">
    <h3 class="ai-split-title">Plan</h3>
    <ol class="ai-split-steps">
      <li>Read the failing spec in billing/invoice-total.spec.ts</li>
      <li>Extract the tax rate lookup into taxRateFor()</li>
      <li>Round once, on the tax line only</li>
      <li>Re-run the billing suite</li>
    </ol>
  </section>
  <div class="ai-split-handle" role="separator" tabindex="0" aria-orientation="vertical" aria-label="Resize plan and output panes" aria-valuenow="58" aria-valuemin="20" aria-valuemax="80"></div>
  <section class="ai-split-pane" aria-label="Output">
    <h3 class="ai-split-title">Output</h3>
    <pre class="ai-split-output"><code>PASS  billing/invoice-total.spec.ts
  rounds tax once (4 ms)
  keeps subtotal unrounded (2 ms)

Tests: 24 passed, 24 total</code></pre>
  </section>
</div>

<div class="ai-split ai-split-vertical" style="--ai-split-a: 45%; margin-top: var(--ai-space-4);">
  <section class="ai-split-pane" aria-label="Request">
    <h3 class="ai-split-title">Request</h3>
    <p class="ai-split-note">Drag the divider, or focus it and use the arrow keys. Without the script the panes still render at their declared ratio.</p>
  </section>
  <div class="ai-split-handle" role="separator" tabindex="0" aria-orientation="horizontal" aria-label="Resize request and response panes" aria-valuenow="45" aria-valuemin="20" aria-valuemax="80"></div>
  <section class="ai-split-pane" aria-label="Response">
    <h3 class="ai-split-title">Response</h3>
    <p class="ai-split-note">Set the ratio in CSS with --ai-split-a and leave --ai-split-b as the flexible remainder.</p>
  </section>
</div>`,
  },
  'streaming-status': {
    id: 'streaming-status',
    name: "Streaming Status",
    description: "Indeterminate progress plus token/sec readout for live generation.",
    category: 'application',
    tier: 'free',
    tags: ["streaming","status","agent"],
    html: `<div class="ai-card" style="padding: var(--ai-space-4);">
  <div class="ai-flex ai-justify-between ai-items-center">
    <div class="ai-flex ai-items-center ai-gap-2">
      <span class="ai-spinner ai-spinner-sm"></span>
      <span class="ai-text-sm ai-font-medium">Generating</span>
    </div>
    <span class="ai-font-mono ai-text-xs ai-text-muted">42 tok/s</span>
  </div>
  <div class="ai-progress ai-progress-indeterminate" style="margin-top: var(--ai-space-3);"><div class="ai-progress-bar"></div></div>
  <p class="ai-text-xs ai-text-muted" style="margin-top: var(--ai-space-2);">Stream only. Do not pulse static dots.</p>
</div>`,
  },
  'thought-chain': {
    id: 'thought-chain',
    name: "Thought Chain",
    description: "Collapsible reasoning steps with a live streaming state.",
    category: 'application',
    tier: 'free',
    tags: ["agent","reasoning","chain"],
    html: `<div class="ai-accordion">
  <div class="ai-accordion-item is-open" open>
    <button class="ai-accordion-trigger" type="button">
      <span class="ai-flex ai-items-center ai-gap-2">
        <span class="ai-spinner ai-spinner-sm"></span>
        <span>Reasoning</span>
        <span class="ai-badge ai-badge-outline">3 steps</span>
      </span>
    </button>
    <div class="ai-accordion-content">
      <ol style="margin: var(--ai-space-3) 0 0; padding-left: 1.1rem; font-size: 0.8125rem; color: var(--ai-text-secondary); display:flex; flex-direction:column; gap: 0.5rem;">
        <li>Locate the token layer in <code>src/css/tokens.css</code>.</li>
        <li>Check gallery copy path does not leak Pro markup.</li>
        <li class="is-streaming">Draft the PHP gate using SQLite outside the docroot.</li>
      </ol>
    </div>
  </div>
</div>`,
  },
  'tool-trace': {
    id: 'tool-trace',
    name: "Tool Trace",
    description: "Tool call log on a fixed grid: mono name and argument, a status pip with plain text, right aligned duration, and an indeterminate bar on the running row.",
    category: 'application',
    tier: 'free',
    tags: ["agent","trace","tools","mcp"],
    html: `<div class="ai-trace">
  <div class="ai-trace-header">
    <span class="ai-status-pip is-streaming" aria-hidden="true"></span>
    <span class="ai-trace-title">Tool trace</span>
    <span class="ai-trace-meta">
      <span>4 calls</span>
      <span class="ai-trace-sep" aria-hidden="true">/</span>
      <span>1.8s elapsed</span>
    </span>
  </div>
  <ol class="ai-trace-list">
    <li class="ai-trace-row is-done">
      <span class="ai-trace-name">read_file</span>
      <span class="ai-trace-args">src/tax.ts</span>
      <span class="ai-trace-status"><span class="ai-status-pip ai-status-pip-success" aria-hidden="true"></span>ok</span>
      <span class="ai-trace-time" data-tabular>42ms</span>
    </li>
    <li class="ai-trace-row is-done">
      <span class="ai-trace-name">grep</span>
      <span class="ai-trace-args">roundOnce</span>
      <span class="ai-trace-status"><span class="ai-status-pip ai-status-pip-success" aria-hidden="true"></span>ok</span>
      <span class="ai-trace-time" data-tabular>110ms</span>
    </li>
    <li class="ai-trace-row is-error">
      <span class="ai-trace-name">apply_patch</span>
      <span class="ai-trace-args">src/tax.ts</span>
      <span class="ai-trace-status"><span class="ai-status-pip ai-status-pip-danger" aria-hidden="true"></span>failed</span>
      <span class="ai-trace-time" data-tabular>96ms</span>
    </li>
    <li class="ai-trace-row is-streaming">
      <span class="ai-trace-name">run_terminal</span>
      <span class="ai-trace-args">npm test billing</span>
      <span class="ai-trace-status"><span class="ai-status-pip ai-status-pip-warning is-streaming" aria-hidden="true"></span>running</span>
      <span class="ai-trace-time" data-tabular>1.5s</span>
      <div class="ai-progress ai-progress-indeterminate ai-trace-bar" aria-hidden="true"><div class="ai-progress-bar"></div></div>
    </li>
  </ol>
</div>`,
  },
};
