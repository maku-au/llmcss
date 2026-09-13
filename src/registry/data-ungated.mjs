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
    html: `<div class="workspace">
  <section class="workspace-pane">
    <div class="workspace-head">
      <span class="workspace-label">Thread</span>
      <span class="workspace-count">2 turns</span>
    </div>
    <div class="workspace-body">
      <div class="workspace-turn workspace-turn-user">
        <span class="workspace-turn-role">You</span>
        <p class="workspace-turn-body">List the failing specs, then patch the tax rounding.</p>
      </div>
      <div class="workspace-turn">
        <span class="workspace-turn-role">Agent</span>
        <p class="workspace-turn-body">Two specs fail on the same helper. The patch is staged on the canvas.</p>
        <ul class="workspace-steps">
          <li class="workspace-step">
            <span class="status-pip status-pip-success" aria-hidden="true"></span>
            <span>Ran the billing suite</span>
          </li>
          <li class="workspace-step">
            <span class="status-pip status-pip-success" aria-hidden="true"></span>
            <span>Traced rounding to roundOnce</span>
          </li>
          <li class="workspace-step">
            <span class="status-pip is-streaming" aria-hidden="true"></span>
            <span>Drafting the patch</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section class="workspace-pane">
    <div class="workspace-head">
      <span class="workspace-label">Canvas</span>
      <span class="workspace-count">1 staged patch</span>
    </div>
    <div class="workspace-body">
      <div class="diff">
        <div class="diff-header">
          <span class="diff-path">src/tax.ts</span>
          <span class="badge badge-neutral diff-stat">
            <span class="diff-stat-add" data-tabular>+2</span>
            <span class="diff-stat-del" data-tabular>-1</span>
          </span>
        </div>
        <div class="diff-body">
          <div class="diff-row">
            <span class="diff-gutter" aria-hidden="true">41</span>
            <span class="diff-gutter" aria-hidden="true">41</span>
            <span class="diff-marker" aria-hidden="true"></span>
            <code class="diff-code">function roundOnce(line: TaxLine) {</code>
          </div>
          <div class="diff-row is-removed">
            <span class="diff-gutter" aria-hidden="true">42</span>
            <span class="diff-gutter" aria-hidden="true"></span>
            <span class="diff-marker" aria-hidden="true">-</span>
            <code class="diff-code"><span class="sr-only">Removed line. </span>  return line.gross * rate / 100;</code>
          </div>
          <div class="diff-row is-added">
            <span class="diff-gutter" aria-hidden="true"></span>
            <span class="diff-gutter" aria-hidden="true">42</span>
            <span class="diff-marker" aria-hidden="true">+</span>
            <code class="diff-code"><span class="sr-only">Added line. </span>  const cents = Math.round(line.gross * rate);</code>
          </div>
          <div class="diff-row is-added">
            <span class="diff-gutter" aria-hidden="true"></span>
            <span class="diff-gutter" aria-hidden="true">43</span>
            <span class="diff-marker" aria-hidden="true">+</span>
            <code class="diff-code"><span class="sr-only">Added line. </span>  return cents / 100;</code>
          </div>
          <div class="diff-row">
            <span class="diff-gutter" aria-hidden="true">43</span>
            <span class="diff-gutter" aria-hidden="true">44</span>
            <span class="diff-marker" aria-hidden="true"></span>
            <code class="diff-code">}</code>
          </div>
        </div>
      </div>
    </div>
  </section>
  <aside class="workspace-pane">
    <div class="workspace-head">
      <span class="workspace-label">Context</span>
      <span class="workspace-count">4 files</span>
    </div>
    <div class="workspace-body">
      <ul class="workspace-files">
        <li class="workspace-file">
          <span class="workspace-file-name">src/tax.ts</span>
          <span class="workspace-label">Edit</span>
        </li>
        <li class="workspace-file">
          <span class="workspace-file-name">billing/invoice-total.spec.ts</span>
          <span class="workspace-label">Spec</span>
        </li>
        <li class="workspace-file">
          <span class="workspace-file-name">src/money.ts</span>
          <span class="workspace-label">Read</span>
        </li>
        <li class="workspace-file">
          <span class="workspace-file-name">docs/rounding.md</span>
          <span class="workspace-label">Read</span>
        </li>
      </ul>
    </div>
  </aside>
</div>`,
  },
  'chat-thread': {
    id: 'chat-thread',
    name: "AI Conversational Thread",
    description: "Chat transcript with avatar rows, role labels and mono timestamps, an inline tool call, a streaming turn, and a prompt composer.",
    category: 'application',
    tier: 'free',
    tags: ["chat","conversation","ai","thread","assistant"],
    html: `<div class="chat-container">
  <div class="chat-header">
    <div class="flex items-center gap-2">
      <span class="font-semibold text-sm">Agentic Pair Programmer</span>
      <span class="status-pip status-pip-success" aria-hidden="true"></span>
      <span class="text-xs text-muted">Ready</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs font-mono text-muted">claude-sonnet-5</span>
      <button class="btn btn-ghost btn-xs" type="button" aria-label="Thread options">&bull;&bull;&bull;</button>
    </div>
  </div>
  <div class="chat-messages">
    <div class="chat-msg chat-msg-user">
      <span class="chat-avatar" aria-hidden="true">JD</span>
      <div class="chat-meta">
        <span class="chat-role">You</span>
        <span class="chat-time">09:41</span>
      </div>
      <div class="chat-body">
        <p>Can you build a self-responsive card using LLMCSS container queries?</p>
      </div>
    </div>
    <div class="chat-msg">
      <span class="chat-avatar chat-avatar-assistant" aria-hidden="true">AP</span>
      <div class="chat-meta">
        <span class="chat-role">Agent</span>
        <span class="chat-time">09:41</span>
      </div>
      <div class="chat-body">
        <p>Yes. Wrap the card in <code>.cq</code> and let the container query variants size it, with no breakpoint media queries.</p>
        <pre class="code-block"><code>&lt;div class="cq grid cq-sm:grid-cols-2 cq-sm:gap-4"&gt;
  &lt;div class="kpi-card"&gt;...&lt;/div&gt;
&lt;/div&gt;</code></pre>
        <p class="chat-note">One column in a narrow rail, two in the main canvas, measured against the card's own width.</p>
      </div>
    </div>
    <div class="chat-msg chat-msg-user">
      <span class="chat-avatar" aria-hidden="true">JD</span>
      <div class="chat-meta">
        <span class="chat-role">You</span>
        <span class="chat-time">09:43</span>
      </div>
      <div class="chat-body">
        <p>Ship it. Does it hold up inside the 14rem context rail?</p>
      </div>
    </div>
    <div class="chat-msg is-streaming">
      <span class="chat-avatar chat-avatar-assistant" aria-hidden="true">AP</span>
      <div class="chat-meta">
        <span class="chat-role">Agent</span>
        <span class="chat-time">09:43</span>
      </div>
      <div class="chat-body">
        <div class="chat-tool">
          <span>read_file src/css/utilities.css</span>
          <span class="badge badge-success">ok 38ms</span>
        </div>
        <p>Below 20rem the grid folds to a single column, so the rail keeps one readable card per row</p>
      </div>
    </div>
  </div>
  <div class="chat-input-bar">
    <div class="input-group chat-composer">
      <input type="text" class="input" placeholder="Send prompt to agent..." aria-label="Prompt" />
      <button class="btn btn-primary btn-sm" type="button">Send</button>
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
    html: `<div class="approval">
  <div class="approval-main">
    <span class="approval-status">
      <span class="status-pip status-pip-warning" aria-hidden="true"></span>
      Needs approval
    </span>
    <span class="approval-action">write_file <span class="approval-target">src/auth.ts</span></span>
    <p class="approval-note">Replaces the session helper and rewrites two call sites. Review the diff before allowing.</p>
  </div>
  <div class="approval-actions">
    <button class="btn btn-ghost btn-sm approval-deny" type="button">Deny</button>
    <button class="btn btn-outline btn-sm" type="button">Edit</button>
    <button class="btn btn-primary btn-sm" type="button">Allow once</button>
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
    html: `<div class="bento-grid">
  <div class="bento-cell bento-span-2">
    <div>
      <span class="bento-code-pill" style="margin-bottom: var(--ai-space-4);">
        <span class="text-muted font-mono" style="font-weight: 600; opacity: 0.6; margin-right: 0.15rem;">$</span>
        <span>llmcss init --theme=obsidian</span>
      </span>
      <h3 class="font-display font-bold" style="font-size: 1.5rem; margin-top: var(--ai-space-2);">
        Zero-token dark mode with pure native cascading variables
      </h3>
      <p class="text-secondary text-sm" style="margin-top: var(--ai-space-2); max-width: 28rem;">
        No arbitrary class name hallucination. Full Light-DOM Web Components and zero external dependencies.
      </p>
    </div>
    <div class="flex gap-4 items-center" style="margin-top: var(--ai-space-6);">
      <span class="badge badge-mono">&lt; 2.5KB Bundle</span>
      <span class="badge badge-neutral">68% Token Savings</span>
    </div>
  </div>
  <div class="bento-cell">
    <div>
      <span class="text-xs font-mono text-muted">BENCHMARK</span>
      <div class="font-display font-bold" style="font-size: 2.25rem; margin-top: var(--ai-space-2);">
        0ms
      </div>
      <p class="text-secondary text-xs" style="margin-top: 0.25rem;">
        CSS-in-JS runtime overhead. 100% native browser layers.
      </p>
    </div>
    <div class="progress" style="margin-top: var(--ai-space-4);">
      <div class="progress-bar" style="width: 100%;"></div>
    </div>
  </div>
  <div class="bento-cell">
    <div>
      <span class="text-xs font-mono text-muted">COMPATIBILITY</span>
      <h4 class="font-semibold" style="margin-top: var(--ai-space-2);">Universal Standard</h4>
      <p class="text-secondary text-xs" style="margin-top: 0.25rem;">Vanilla HTML, Astro, Svelte, Vue, React, Next.js.</p>
    </div>
  </div>
  <div class="bento-cell bento-span-2">
    <div class="flex justify-between items-start">
      <div>
        <span class="text-xs font-mono text-muted">AGENT CO-PILOT</span>
        <h4 class="font-semibold" style="margin-top: var(--ai-space-1);">Model Context Protocol Ready</h4>
        <p class="text-secondary text-xs" style="margin-top: 0.25rem;">Native stdio MCP server for autonomous coding agents.</p>
      </div>
      <button class="btn btn-outline btn-xs">Docs &rarr;</button>
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
    html: `<button class="btn btn-primary" data-ai-toggle="drawer" data-ai-target="#cart-demo">
  Open Cart Drawer
</button>

<div id="cart-demo" class="drawer">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel">
    <div class="drawer-header">
      <div class="flex items-center gap-2">
        <h3 class="drawer-title">Shopping Bag</h3>
        <span class="badge badge-default">2 items</span>
      </div>
      <button type="button" class="modal-close" data-ai-dismiss="drawer" aria-label="Close shopping bag">&times;</button>
    </div>
    <div class="drawer-body">
      <div class="cart-item">
        <img class="cart-thumb" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80" alt="Headphones" />
        <div class="cart-details">
          <span class="cart-name">Aether Precision Studio</span>
          <span class="cart-subtext">Matte Obsidian / Bluetooth 5.4</span>
          <div class="flex justify-between items-center" style="margin-top: 0.5rem;">
            <div class="cart-stepper">
              <button type="button" aria-label="Decrease quantity">-</button>
              <span style="padding: 0 0.5rem; font-size: 0.8125rem;">1</span>
              <button type="button" aria-label="Increase quantity">+</button>
            </div>
            <span class="font-bold">$349.00</span>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-footer">
      <div class="flex justify-between items-center" style="margin-bottom: var(--ai-space-4);">
        <span class="text-sm text-secondary">Subtotal</span>
        <span class="font-display font-bold" style="font-size: 1.25rem;">$349.00</span>
      </div>
      <button class="btn btn-primary w-full btn-lg">Checkout Now</button>
    </div>
  </div>
</div>`,
    webComponentHtml: `<ai-drawer id="cart-demo">
  <div class="drawer-backdrop"></div>
  <div class="drawer-panel">
    <div class="drawer-header">
      <h3 class="drawer-title">Shopping Bag</h3>
      <button type="button" class="modal-close" data-ai-dismiss="drawer" aria-label="Close shopping bag">&times;</button>
    </div>
    <div class="drawer-body">
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
  <li class="card" style="padding: var(--ai-space-4);">
    <div class="flex justify-between items-center">
      <span class="font-mono text-xs text-muted">[1] polar.sh</span>
      <a class="btn btn-ghost btn-xs" href="https://polar.sh/docs">Open</a>
    </div>
    <p class="text-sm" style="margin-top: 0.35rem;">Webhook signatures use Standard Webhooks headers.</p>
  </li>
  <li class="card" style="padding: var(--ai-space-4);">
    <div class="flex justify-between items-center">
      <span class="font-mono text-xs text-muted">[2] llmcss.io</span>
      <a class="btn btn-ghost btn-xs" href="https://llmcss.io/llms.txt">Open</a>
    </div>
    <p class="text-sm" style="margin-top: 0.35rem;">Free registry is MIT. Pro is token-gated.</p>
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
    html: `<button class="btn btn-outline" data-ai-toggle="modal" data-ai-target="#command-demo">
  Open ⌘K Command Palette <span class="command-kbd" style="margin-left: 0.5rem;">⌘K</span>
</button>

<div id="command-demo" class="command-palette">
  <div class="modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="command-box">
    <div class="command-input-wrapper">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" class="command-input" placeholder="Type a command or search components..." autofocus />
      <span class="command-kbd">ESC</span>
    </div>
    <ul class="command-list">
      <li class="command-group-heading">Suggestions</li>
      <li class="command-item is-selected">
        <div class="command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          <span>Create New Component</span>
        </div>
        <span class="command-kbd">⌘N</span>
      </li>
      <li class="command-item">
        <div class="command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/></svg>
          <span>Switch Theme to Minimalist Obsidian</span>
        </div>
        <span class="command-kbd">⌘T</span>
      </li>
      <li class="command-group-heading">Navigation</li>
      <li class="command-item">
        <div class="command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21 8-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>
          <span>Go to Registry Catalog</span>
        </div>
        <span class="command-kbd">G R</span>
      </li>
      <li class="command-item">
        <div class="command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="m4.9 4.9 2.1 2.1"/><path d="m17 17 2.1 2.1"/><path d="m4.9 19.1 2.1-2.1"/><path d="m17 7 2.1-2.1"/></svg>
          <span>Workspace Settings</span>
        </div>
        <span class="command-kbd">G S</span>
      </li>
    </ul>
  </div>
</div>`,
    webComponentHtml: `<ai-command-palette id="command-demo">
  <div class="modal-backdrop"></div>
  <div class="command-box">
    <div class="command-input-wrapper">
      <input type="text" class="command-input" placeholder="Search..." />
    </div>
    <ul class="command-list">
      <li class="command-item"><span>Command 1</span></li>
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
    html: `<div class="cost">
  <div class="cost-head">
    <div>
      <h3 class="cost-title" id="cost-label">Agent spend</h3>
      <p class="cost-period">Billing period 1 Sep to 30 Sep 2026, 18 days left</p>
    </div>
    <span class="badge badge-warning">Warn threshold passed</span>
  </div>

  <p class="cost-value" data-tabular>
    $184.20
    <span class="cost-limit">of a $250.00 limit</span>
  </p>

  <div class="cost-track" role="meter" aria-labelledby="cost-label" aria-valuenow="184.2" aria-valuemin="0" aria-valuemax="250" aria-valuetext="184.20 US dollars of a 250.00 dollar limit" style="--ai-cost-pct: 73.7%; --ai-threshold-warn: 70%; --ai-threshold-danger: 90%;">
    <span class="cost-fill"></span>
    <span class="cost-mark is-warn" aria-hidden="true"></span>
    <span class="cost-mark is-danger" aria-hidden="true"></span>
  </div>

  <ul class="cost-legend">
    <li>
      <span class="status-pip status-pip-warning"></span>
      Warn at <span data-tabular>$175.00</span>
    </li>
    <li>
      <span class="status-pip status-pip-danger"></span>
      Hard stop at <span data-tabular>$225.00</span>
    </li>
  </ul>

  <hr class="divider">

  <dl class="cost-rows">
    <div class="cost-row">
      <dt>Tokens</dt>
      <dd data-tabular>12.4M of 20.0M</dd>
    </div>
    <div class="cost-row">
      <dt>Runs</dt>
      <dd data-tabular>318</dd>
    </div>
    <div class="cost-row">
      <dt>Median cost per run</dt>
      <dd data-tabular>$0.58</dd>
    </div>
    <div class="cost-row">
      <dt>Projected at this rate</dt>
      <dd data-tabular>$307.00</dd>
    </div>
  </dl>

  <p class="cost-note">Runs are queued rather than dropped once the hard stop is reached. Raise the limit in workspace billing.</p>
</div>`,
  },
  'diff-view': {
    id: 'diff-view',
    name: "Diff View",
    description: "Line level before and after diff with paired gutters, tinted added and removed rows, and a collapsed run of unchanged lines.",
    category: 'application',
    tier: 'free',
    tags: ["diff","code","review","agent"],
    html: `<div class="diff">
  <div class="diff-header">
    <span class="diff-path">src/billing/invoice-total.ts</span>
    <span class="badge badge-neutral diff-stat">
      <span class="diff-stat-add" data-tabular>+3</span>
      <span class="diff-stat-del" data-tabular>-2</span>
    </span>
  </div>
  <div class="diff-body">
    <div class="diff-row">
      <span class="diff-gutter" aria-hidden="true">41</span>
      <span class="diff-gutter" aria-hidden="true">41</span>
      <span class="diff-marker" aria-hidden="true"></span>
      <code class="diff-code">export function invoiceTotal(lines: Line[], tax: TaxInput) {</code>
    </div>
    <div class="diff-fold">12 unchanged lines</div>
    <div class="diff-row">
      <span class="diff-gutter" aria-hidden="true">54</span>
      <span class="diff-gutter" aria-hidden="true">54</span>
      <span class="diff-marker" aria-hidden="true"></span>
      <code class="diff-code">  const subtotal = lines.reduce((sum, l) =&gt; sum + l.amount, 0);</code>
    </div>
    <div class="diff-row is-removed">
      <span class="diff-gutter" aria-hidden="true">55</span>
      <span class="diff-gutter" aria-hidden="true"></span>
      <span class="diff-marker" aria-hidden="true">-</span>
      <code class="diff-code"><span class="sr-only">Removed line. </span>  const taxDue = subtotal * 0.2;</code>
    </div>
    <div class="diff-row is-removed">
      <span class="diff-gutter" aria-hidden="true">56</span>
      <span class="diff-gutter" aria-hidden="true"></span>
      <span class="diff-marker" aria-hidden="true">-</span>
      <code class="diff-code"><span class="sr-only">Removed line. </span>  return subtotal + taxDue;</code>
    </div>
    <div class="diff-row is-added">
      <span class="diff-gutter" aria-hidden="true"></span>
      <span class="diff-gutter" aria-hidden="true">55</span>
      <span class="diff-marker" aria-hidden="true">+</span>
      <code class="diff-code"><span class="sr-only">Added line. </span>  const rate = taxRateFor(tax.region, tax.asOf);</code>
    </div>
    <div class="diff-row is-added">
      <span class="diff-gutter" aria-hidden="true"></span>
      <span class="diff-gutter" aria-hidden="true">56</span>
      <span class="diff-marker" aria-hidden="true">+</span>
      <code class="diff-code"><span class="sr-only">Added line. </span>  const taxDue = roundCents(subtotal * rate);</code>
    </div>
    <div class="diff-row is-added">
      <span class="diff-gutter" aria-hidden="true"></span>
      <span class="diff-gutter" aria-hidden="true">57</span>
      <span class="diff-marker" aria-hidden="true">+</span>
      <code class="diff-code"><span class="sr-only">Added line. </span>  return { subtotal, taxDue, total: subtotal + taxDue };</code>
    </div>
    <div class="diff-row">
      <span class="diff-gutter" aria-hidden="true">57</span>
      <span class="diff-gutter" aria-hidden="true">58</span>
      <span class="diff-marker" aria-hidden="true"></span>
      <code class="diff-code">}</code>
    </div>
  </div>
  <div class="diff-footer">
    <span class="diff-note">Rounding now happens once, on the tax line only.</span>
    <span class="diff-hunk" data-tabular>Hunk 2 of 3</span>
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
    html: `<section class="hero">
  <div class="container">
    <div class="text-center" style="max-width: 48rem; margin: 0 auto var(--ai-space-12);">
      <h1 class="hero-title">Architected for deep intelligence</h1>
      <p class="hero-lead" style="margin: 0 auto;">
        Give your agentic coding workflows the aesthetic craft of top-tier product studios.
      </p>
    </div>
    <div class="bento-grid">
      <div class="card-bento bento-col-2">
        <div>
          <h3 class="card-title" style="font-size: 1.5rem;">Infinite Skinning Architecture</h3>
          <p class="text-secondary" style="margin-top: var(--ai-space-2);">Switch between Minimalist Obsidian, Warm Editorial, Neo-Brutalist, and Swiss Modern with a single data-attribute.</p>
        </div>
        <div style="background-color: var(--ai-surface-1); padding: var(--ai-space-4); border-radius: var(--ai-radius-md); margin-top: var(--ai-space-6); border: 1px solid var(--ai-border);">
          <pre><code>&lt;html data-ai-skin="editorial"&gt;
  &lt;!-- Instant warm ivory surfaces &amp; serif display --&gt;
&lt;/html&gt;</code></pre>
        </div>
      </div>
      <div class="card-bento">
        <div>
          <h3 class="card-title">MCP Server Ready</h3>
          <p class="text-secondary" style="margin-top: var(--ai-space-2);">Native Model Context Protocol integration allows autonomous AI agents to query and assemble sections dynamically.</p>
        </div>
        <div class="flex items-center gap-2" style="margin-top: var(--ai-space-6);">
          <span class="badge badge-success badge-dot">MCP Connected</span>
          <span class="badge badge-outline">Port 8080</span>
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
    html: `<div class="card" style="padding: var(--ai-space-4);">
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <span class="badge badge-mono">MCP</span>
      <span class="font-semibold text-sm">get_component_markup</span>
    </div>
    <button class="btn btn-ghost btn-xs" type="button">Copy JSON</button>
  </div>
  <p class="text-xs text-secondary" style="margin-top: var(--ai-space-3);">id=btn-variants · tier=free · 489 bytes html</p>
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
    html: `<div class="cq">
  <fieldset class="model-picker">
    <legend class="model-legend">Model for this workspace</legend>
    <p class="model-note">Applies to new runs. Agents already running keep the model they started with.</p>
    <div class="model-list">
      <label class="model-row">
        <input class="radio-input model-radio" type="radio" name="workspace-model" value="sonnet-4-6" checked>
        <span class="model-body">
          <span class="model-head">
            <span class="model-name">Sonnet 4.6</span>
            <span class="badge badge-neutral model-tag">Default</span>
          </span>
          <span class="model-provider">Anthropic, balanced latency and depth</span>
        </span>
        <span class="model-meta">
          <span class="model-context" data-tabular>200K context</span>
          <span class="model-price" data-tabular>$3.00 in / $15.00 out per 1M</span>
        </span>
      </label>

      <label class="model-row">
        <input class="radio-input model-radio" type="radio" name="workspace-model" value="opus-4-6">
        <span class="model-body">
          <span class="model-head">
            <span class="model-name">Opus 4.6</span>
          </span>
          <span class="model-provider">Anthropic, deepest reasoning, slowest</span>
        </span>
        <span class="model-meta">
          <span class="model-context" data-tabular>200K context</span>
          <span class="model-price" data-tabular>$15.00 in / $75.00 out per 1M</span>
        </span>
      </label>

      <label class="model-row">
        <input class="radio-input model-radio" type="radio" name="workspace-model" value="haiku-4-5">
        <span class="model-body">
          <span class="model-head">
            <span class="model-name">Haiku 4.5</span>
          </span>
          <span class="model-provider">Anthropic, fast edits and short tool loops</span>
        </span>
        <span class="model-meta">
          <span class="model-context" data-tabular>200K context</span>
          <span class="model-price" data-tabular>$1.00 in / $5.00 out per 1M</span>
        </span>
      </label>

      <label class="model-row">
        <input class="radio-input model-radio" type="radio" name="workspace-model" value="self-hosted-70b">
        <span class="model-body">
          <span class="model-head">
            <span class="model-name">Llama 3.3 70B</span>
            <span class="badge badge-neutral model-tag">Self hosted</span>
          </span>
          <span class="model-provider">Runs on your own GPU pool, no data leaves the VPC</span>
        </span>
        <span class="model-meta">
          <span class="model-context" data-tabular>128K context</span>
          <span class="model-price" data-tabular>$0.40 in / $0.40 out per 1M</span>
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
    html: `<button class="btn btn-outline" type="button" aria-haspopup="dialog" aria-expanded="false" data-ai-toggle="modal" data-ai-target="#permission-dialog">
  Review requested access
</button>

<div class="modal" id="permission-dialog">
  <div class="modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="modal-box permission-box" role="dialog" aria-modal="true" aria-labelledby="permission-title" aria-describedby="permission-lead">
    <div class="modal-header">
      <h2 class="modal-title" id="permission-title">Allow the billing migration?</h2>
      <button class="modal-close" type="button" data-ai-dismiss="modal" aria-label="Close dialog">&times;</button>
    </div>
    <div class="modal-body">
      <p class="permission-lead" id="permission-lead">
        Release Agent is asking for four capabilities scoped to the billing service. Nothing outside
        this list is granted, and the grant ends the moment you sign out.
      </p>
      <table class="table permission-scope">
        <thead>
          <tr>
            <th scope="col">Capability</th>
            <th scope="col">Resource</th>
            <th scope="col">Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code class="permission-cap">db.migrate</code></td>
            <td class="permission-resource">billing-prod / invoices</td>
            <td><span class="permission-risk"><span class="status-pip status-pip-danger"></span>High</span></td>
          </tr>
          <tr>
            <td><code class="permission-cap">files.write</code></td>
            <td class="permission-resource">repo / migrations/2026_09_fees.sql</td>
            <td><span class="permission-risk"><span class="status-pip status-pip-warning"></span>Medium</span></td>
          </tr>
          <tr>
            <td><code class="permission-cap">db.read</code></td>
            <td class="permission-resource">billing-prod / customers</td>
            <td><span class="permission-risk"><span class="status-pip status-pip-warning"></span>Medium</span></td>
          </tr>
          <tr>
            <td><code class="permission-cap">metrics.read</code></td>
            <td class="permission-resource">grafana / billing-latency</td>
            <td><span class="permission-risk"><span class="status-pip status-pip-success"></span>Low</span></td>
          </tr>
        </tbody>
      </table>
      <label class="checkbox permission-remember">
        <input class="checkbox-input" type="checkbox" name="permission-remember" value="session">
        <span>
          Remember for this session
          <span class="permission-remember-hint">Skips this dialog for these four capabilities until you sign out.</span>
        </span>
      </label>
    </div>
    <div class="modal-footer">
      <span class="permission-expiry">Grant expires in <span data-tabular>42</span> min</span>
      <button class="btn btn-outline" type="button" data-ai-dismiss="modal">Deny</button>
      <button class="btn btn-primary" type="button" data-ai-dismiss="modal">Allow</button>
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
    html: `<div class="matrix-container">
  <table class="matrix-table">
    <thead>
      <tr>
        <th class="matrix-feature-col" style="width: 40%;">Core Capabilities</th>
        <th style="width: 20%;">Free</th>
        <th style="width: 20%; background-color: var(--ai-surface-1);">Pro ($9/mo)</th>
        <th style="width: 20%;">Enterprise</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="4" class="matrix-category-header">Engine & Architecture</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Native CSS Layers (@layer)</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td style="background-color: var(--ai-surface-1);"><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Light-DOM Web Components</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td style="background-color: var(--ai-surface-1);"><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Container Query Layouts</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td style="background-color: var(--ai-surface-1);"><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span></td>
      </tr>
      <tr>
        <td colspan="4" class="matrix-category-header">Component Library</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Core UI Primitives</td>
        <td>20+ Primitives</td>
        <td style="background-color: var(--ai-surface-1); font-weight: 600;">All 40+ Primitives</td>
        <td>All + Custom</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">High-Craft Bento Heroes</td>
        <td class="text-muted">-</td>
        <td style="background-color: var(--ai-surface-1); color: var(--ai-accent); font-weight: 600;"><span class="mark mark-yes" role="img" aria-label="Yes"></span>Pro Bento Kit</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Bespoke</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Conversational AI Threads</td>
        <td class="text-muted">-</td>
        <td style="background-color: var(--ai-surface-1); color: var(--ai-accent); font-weight: 600;"><span class="mark mark-yes" role="img" aria-label="Yes"></span>Full App Kits</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Full App Kits</td>
      </tr>
      <tr>
        <td colspan="4" class="matrix-category-header">Tooling & Agent Integration</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">CLI Tooling (llmcss add)</td>
        <td>Free Registry</td>
        <td style="background-color: var(--ai-surface-1); font-weight: 600;">Full Pro Access</td>
        <td>Private Registry</td>
      </tr>
      <tr>
        <td class="matrix-feature-col">Stdio MCP Server for AI Agents</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Standard</td>
        <td style="background-color: var(--ai-surface-1);"><span class="mark mark-yes" role="img" aria-label="Yes"></span>Priority API</td>
        <td><span class="mark mark-yes" role="img" aria-label="Yes"></span>Dedicated Instance</td>
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
    html: `<div class="cq">
  <form class="composer" action="#" method="post">
    <label class="sr-only" for="composer-input">Message the agent</label>
    <textarea class="textarea composer-input" id="composer-input" name="prompt" rows="2" placeholder="Describe the change you want, or paste a stack trace.">Rounding is off by a cent on EU invoices. Find where the tax is rounded twice and fix it.</textarea>
    <ul class="composer-files">
      <li class="composer-file">
        <span class="composer-file-name">invoice-total.ts</span>
        <span class="composer-file-size" data-tabular>4.1 kB</span>
      </li>
      <li class="composer-file">
        <span class="composer-file-name">failing-run.log</span>
        <span class="composer-file-size" data-tabular>19.7 kB</span>
      </li>
    </ul>
    <div class="composer-toolbar">
      <div class="composer-tools">
        <span class="composer-model">
          <span class="status-pip status-pip-success"></span>
          Sonnet 5
        </span>
        <button class="btn btn-ghost btn-sm btn-icon" type="button" aria-label="Attach a file">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21.44 11.05l-8.49 8.49a5 5 0 0 1-7.07-7.07l8.49-8.49a3.5 3.5 0 0 1 4.95 4.95l-8.49 8.49a2 2 0 0 1-2.83-2.83l7.78-7.78"/>
          </svg>
        </button>
        <button class="btn btn-ghost btn-sm btn-icon" type="button" aria-label="Attach the current selection">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M16 18l4-6-4-6"/>
            <path d="M8 6l-4 6 4 6"/>
          </svg>
        </button>
      </div>
      <div class="composer-send">
        <span class="composer-count">
          <span class="composer-tokens" data-tabular>1,284 / 8,000 tokens</span>
          <span class="composer-quota" data-tabular>84% of today's request budget left</span>
        </span>
        <button class="btn btn-primary btn-sm" type="submit">Send</button>
      </div>
    </div>
  </form>
  <p class="composer-hint">Enter to send, Shift+Enter for newline</p>
</div>`,
  },
  'run-status-header': {
    id: 'run-status-header',
    name: "Run Status Header",
    description: "Page header for a live agent run: title, run id, status pip, elapsed timer, step count and the run controls, plus a finished variant.",
    category: 'application',
    tier: 'free',
    tags: ["agent","run","status","header","telemetry"],
    html: `<header class="page-header run-header">
  <div class="run-main">
    <h1 class="run-title">Migrate billing to the Stripe adapter</h1>
    <div class="page-header-meta run-meta">
      <span class="run-id">run_8f31c04e</span>
      <span class="run-state" aria-live="polite">
        <span class="status-pip is-streaming"></span>
        Running
      </span>
      <span class="run-timer" data-tabular>
        <span class="sr-only">Elapsed</span>
        00:04:19
      </span>
      <span class="run-steps">Step <span data-tabular>7</span> of <span data-tabular>12</span></span>
    </div>
  </div>
  <div class="run-actions">
    <button class="btn btn-ghost btn-sm" type="button">View log</button>
    <button class="btn btn-outline btn-sm run-cancel" type="button">Cancel run</button>
  </div>
</header>

<header class="page-header run-header is-done">
  <div class="run-main">
    <h1 class="run-title">Backfill invoice tax rates</h1>
    <div class="page-header-meta run-meta">
      <span class="run-id">run_5b7a91d2</span>
      <span class="run-state">
        <span class="status-pip status-pip-success"></span>
        Finished
      </span>
      <span class="run-timer" data-tabular>
        <span class="sr-only">Elapsed</span>
        00:06:02
      </span>
      <span class="run-steps">Step <span data-tabular>12</span> of <span data-tabular>12</span></span>
    </div>
  </div>
  <div class="run-actions">
    <button class="btn btn-ghost btn-sm" type="button">View log</button>
    <button class="btn btn-outline btn-sm run-cancel" type="button" disabled>Cancel run</button>
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
    html: `<div class="split" style="--ai-split-a: 58%;">
  <section class="split-pane" aria-label="Plan">
    <h3 class="split-title">Plan</h3>
    <ol class="split-steps">
      <li>Read the failing spec in billing/invoice-total.spec.ts</li>
      <li>Extract the tax rate lookup into taxRateFor()</li>
      <li>Round once, on the tax line only</li>
      <li>Re-run the billing suite</li>
    </ol>
  </section>
  <div class="split-handle" role="separator" tabindex="0" aria-orientation="vertical" aria-label="Resize plan and output panes" aria-valuenow="58" aria-valuemin="20" aria-valuemax="80"></div>
  <section class="split-pane" aria-label="Output">
    <h3 class="split-title">Output</h3>
    <pre class="split-output"><code>PASS  billing/invoice-total.spec.ts
  rounds tax once (4 ms)
  keeps subtotal unrounded (2 ms)

Tests: 24 passed, 24 total</code></pre>
  </section>
</div>

<div class="split split-vertical" style="--ai-split-a: 45%; margin-top: var(--ai-space-4);">
  <section class="split-pane" aria-label="Request">
    <h3 class="split-title">Request</h3>
    <p class="split-note">Drag the divider, or focus it and use the arrow keys. Without the script the panes still render at their declared ratio.</p>
  </section>
  <div class="split-handle" role="separator" tabindex="0" aria-orientation="horizontal" aria-label="Resize request and response panes" aria-valuenow="45" aria-valuemin="20" aria-valuemax="80"></div>
  <section class="split-pane" aria-label="Response">
    <h3 class="split-title">Response</h3>
    <p class="split-note">Set the ratio in CSS with --ai-split-a and leave --ai-split-b as the flexible remainder.</p>
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
    html: `<div class="card" role="status" aria-live="polite" style="padding: var(--ai-space-4);">
  <div class="flex justify-between items-center">
    <div class="flex items-center gap-2">
      <span class="spinner spinner-sm"></span>
      <span class="text-sm font-medium">Generating</span>
    </div>
    <span class="font-mono text-xs text-muted">42 tok/s</span>
  </div>
  <div class="progress progress-indeterminate" style="margin-top: var(--ai-space-3);"><div class="progress-bar"></div></div>
  <p class="text-xs text-muted" style="margin-top: var(--ai-space-2);">Stream only. Do not pulse static dots.</p>
</div>`,
  },
  'thought-chain': {
    id: 'thought-chain',
    name: "Thought Chain",
    description: "Collapsible reasoning steps with a live streaming state.",
    category: 'application',
    tier: 'free',
    tags: ["agent","reasoning","chain"],
    html: `<div class="accordion">
  <div class="accordion-item is-open" open>
    <button class="accordion-trigger" type="button" data-ai-toggle="accordion" aria-expanded="true" aria-controls="thought-chain-steps">
      <span class="flex items-center gap-2">
        <span class="spinner spinner-sm"></span>
        <span>Reasoning</span>
        <span class="badge badge-outline">3 steps</span>
      </span>
    </button>
    <div class="accordion-content" id="thought-chain-steps">
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
    html: `<div class="trace">
  <div class="trace-header">
    <span class="status-pip is-streaming" aria-hidden="true"></span>
    <span class="trace-title">Tool trace</span>
    <span class="trace-meta">
      <span>4 calls</span>
      <span class="trace-sep" aria-hidden="true">/</span>
      <span>1.8s elapsed</span>
    </span>
  </div>
  <ol class="trace-list">
    <li class="trace-row is-done">
      <span class="trace-name">read_file</span>
      <span class="trace-args">src/tax.ts</span>
      <span class="trace-status"><span class="status-pip status-pip-success" aria-hidden="true"></span>ok</span>
      <span class="trace-time" data-tabular>42ms</span>
    </li>
    <li class="trace-row is-done">
      <span class="trace-name">grep</span>
      <span class="trace-args">roundOnce</span>
      <span class="trace-status"><span class="status-pip status-pip-success" aria-hidden="true"></span>ok</span>
      <span class="trace-time" data-tabular>110ms</span>
    </li>
    <li class="trace-row is-error">
      <span class="trace-name">apply_patch</span>
      <span class="trace-args">src/tax.ts</span>
      <span class="trace-status"><span class="status-pip status-pip-danger" aria-hidden="true"></span>failed</span>
      <span class="trace-time" data-tabular>96ms</span>
    </li>
    <li class="trace-row is-streaming">
      <span class="trace-name">run_terminal</span>
      <span class="trace-args">npm test billing</span>
      <span class="trace-status"><span class="status-pip status-pip-warning is-streaming" aria-hidden="true"></span>running</span>
      <span class="trace-time" data-tabular>1.5s</span>
      <div class="progress progress-indeterminate trace-bar" aria-hidden="true"><div class="progress-bar"></div></div>
    </li>
  </ol>
</div>`,
  },
};
