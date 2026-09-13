/**
 * Layout variants for the agent UI components (catalog batch 4).
 *
 * Keyed by parent component id. Each variant is addressed as `parent:variant`
 * and is a STRUCTURAL alternative to the parent's default layout: where the
 * boxes are, not what colour they are. Copy, ids, timestamps, tool names and
 * file paths are reused from the parent demo in `data-ungated.mjs` so a page
 * can render the parent and any variant side by side and read as one product.
 *
 * Rules every entry obeys:
 *   - only classes in public/classes.json and states in public/states.json
 *   - no style attribute, no --ai-* token set in markup, no literal colour
 *   - responsive through md:, lg: and cq-* only; the agent components declare
 *     container-type themselves, so a cq-* class is always paired with a cq
 *     ancestor inside the same snippet
 *   - motion only on a row that is actually streaming (law 2)
 *   - ids inside a variant carry a variant suffix, so parent and variant can
 *     share one page without colliding
 */

export const agentVariants = {
  'chat-thread': [
    {
      id: 'compact',
      name: 'Compact',
      description:
        'Avatars are gone and the role plus timestamp collapse into one mono label above each turn, so the thread reads as a log rather than a conversation.',
      guidance:
        'Use where vertical space is the constraint and the reader already knows who is speaking: a review pane, an embedded side panel, a run replay. Do not use it in a multi participant thread, because the avatar gutter is the only thing that makes three speakers scannable and a mono label alone will not carry it. The 1.5rem avatar column is removed with grid-cols-1 on .chat-msg rather than by leaving an empty gutter, so the body starts at the container padding. Motion stays on the one turn that carries is-streaming.',
      html: `<div class="chat-container">
  <div class="chat-header">
    <div class="flex items-center gap-2">
      <span class="font-semibold text-sm">Agentic Pair Programmer</span>
      <span class="status-pip status-pip-success" aria-hidden="true"></span>
      <span class="text-xs text-muted">Ready</span>
    </div>
    <span class="text-xs font-mono text-muted">claude-sonnet-5</span>
  </div>
  <div class="chat-messages">
    <div class="chat-msg chat-msg-user grid-cols-1">
      <span class="chat-role font-mono text-xs">You <span class="chat-time">09:41</span></span>
      <div class="chat-body">
        <p>Can you build a self-responsive card using LLMCSS container queries?</p>
      </div>
    </div>
    <div class="chat-msg grid-cols-1">
      <span class="chat-role font-mono text-xs">Agent <span class="chat-time">09:41</span></span>
      <div class="chat-body">
        <p>Yes. Wrap the card in <code>.cq</code> and let the container query variants size it, with no breakpoint media queries.</p>
        <pre class="code-block"><code>&lt;div class="cq grid cq-sm:grid-cols-2 cq-sm:gap-4"&gt;
  &lt;div class="kpi-card"&gt;...&lt;/div&gt;
&lt;/div&gt;</code></pre>
        <p class="chat-note">One column in a narrow rail, two in the main canvas, measured against the card's own width.</p>
      </div>
    </div>
    <div class="chat-msg chat-msg-user grid-cols-1">
      <span class="chat-role font-mono text-xs">You <span class="chat-time">09:43</span></span>
      <div class="chat-body">
        <p>Ship it. Does it hold up inside the 14rem context rail?</p>
      </div>
    </div>
    <div class="chat-msg is-streaming grid-cols-1">
      <span class="chat-role font-mono text-xs">Agent <span class="chat-time">09:43</span></span>
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
    {
      id: 'split-tools',
      name: 'Split tools',
      description:
        'Messages keep the left two thirds and every tool call moves into a trace rail on the right, so the prose is never interrupted by a tool receipt.',
      guidance:
        'Use when the run makes more tool calls than it makes sentences, and a reader wants to follow the argument without stepping over four receipts. Do not use it below about 900px of real estate: the rail drops under the thread and the alignment between a turn and its calls, which is the whole point, is lost. The two columns are siblings rather than a rail nested inside the chat frame, so there is no bordered box inside a bordered box. Only the call that is genuinely still running carries is-streaming.',
      html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="chat-container md:col-span-2">
    <div class="chat-header">
      <div class="flex items-center gap-2">
        <span class="font-semibold text-sm">Agentic Pair Programmer</span>
        <span class="status-pip status-pip-success" aria-hidden="true"></span>
        <span class="text-xs text-muted">Ready</span>
      </div>
      <span class="text-xs font-mono text-muted">claude-sonnet-5</span>
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
  </div>
  <aside class="trace" aria-label="Tool calls in this thread">
    <div class="trace-header">
      <span class="status-pip is-streaming" aria-hidden="true"></span>
      <span class="trace-title">Tool calls</span>
      <span class="trace-meta">
        <span>3 calls</span>
        <span class="trace-sep" aria-hidden="true">/</span>
        <span>09:41 to 09:43</span>
      </span>
    </div>
    <ol class="trace-list">
      <li class="trace-row is-done flex items-center gap-3">
        <span class="trace-name flex-1 min-w-0">read_file</span>
        <span class="trace-status"><span class="status-pip status-pip-success" aria-hidden="true"></span>ok</span>
        <span class="trace-time" data-tabular>38ms</span>
      </li>
      <li class="trace-row is-done flex items-center gap-3">
        <span class="trace-name flex-1 min-w-0">grep</span>
        <span class="trace-status"><span class="status-pip status-pip-success" aria-hidden="true"></span>ok</span>
        <span class="trace-time" data-tabular>110ms</span>
      </li>
      <li class="trace-row is-streaming flex items-center gap-3">
        <span class="trace-name flex-1 min-w-0">run_terminal</span>
        <span class="trace-status"><span class="status-pip status-pip-warning is-streaming" aria-hidden="true"></span>running</span>
        <span class="trace-time" data-tabular>1.5s</span>
      </li>
    </ol>
  </aside>
</div>`,
    },
    {
      id: 'transcript',
      name: 'Transcript',
      description:
        'No fills and no bubbles: every turn is a flush block separated by a hairline, with the timestamp held in a fixed left gutter.',
      guidance:
        'Use for a record rather than a conversation: an audit trail, a shared permalink, a printed handover. The fixed 3rem time gutter is what makes it a transcript, so keep the times to one format and let tabular numerals hold the column. Do not use it for a live thread, because dropping the user fill removes the fastest signal for who is speaking and a reader scanning a running conversation needs that more than they need the clock.',
      html: `<div class="chat-container">
  <div class="chat-header">
    <div class="flex items-center gap-2">
      <span class="font-semibold text-sm">Agentic Pair Programmer</span>
      <span class="status-pip status-pip-success" aria-hidden="true"></span>
      <span class="text-xs text-muted">Ready</span>
    </div>
    <span class="text-xs font-mono text-muted">claude-sonnet-5</span>
  </div>
  <div class="chat-messages gap-0">
    <div class="chat-msg flex gap-4 py-3">
      <span class="chat-time tabular w-12 shrink-0">09:41</span>
      <div class="flex-1 min-w-0">
        <span class="chat-role">You</span>
        <div class="chat-body">
          <p>Can you build a self-responsive card using LLMCSS container queries?</p>
        </div>
      </div>
    </div>
    <hr class="divider">
    <div class="chat-msg flex gap-4 py-3">
      <span class="chat-time tabular w-12 shrink-0">09:41</span>
      <div class="flex-1 min-w-0">
        <span class="chat-role">Agent</span>
        <div class="chat-body">
          <p>Yes. Wrap the card in <code>.cq</code> and let the container query variants size it, with no breakpoint media queries.</p>
          <p class="chat-note">One column in a narrow rail, two in the main canvas, measured against the card's own width.</p>
        </div>
      </div>
    </div>
    <hr class="divider">
    <div class="chat-msg flex gap-4 py-3">
      <span class="chat-time tabular w-12 shrink-0">09:43</span>
      <div class="flex-1 min-w-0">
        <span class="chat-role">You</span>
        <div class="chat-body">
          <p>Ship it. Does it hold up inside the 14rem context rail?</p>
        </div>
      </div>
    </div>
    <hr class="divider">
    <div class="chat-msg is-streaming flex gap-4 py-3">
      <span class="chat-time tabular w-12 shrink-0">09:43</span>
      <div class="flex-1 min-w-0">
        <span class="chat-role">Agent</span>
        <div class="chat-body">
          <div class="chat-tool">
            <span>read_file src/css/utilities.css</span>
            <span class="badge badge-success">ok 38ms</span>
          </div>
          <p>Below 20rem the grid folds to a single column, so the rail keeps one readable card per row</p>
        </div>
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
    {
      id: 'sidebar-context',
      name: 'Sidebar context',
      description:
        'The thread moves onto the workspace board and gains a context file rail on the right, so the reader can see which files the answer is about.',
      guidance:
        'Use when the thread is about a specific set of files and the reader keeps asking which ones. The workspace board is one surface with hairline dividers, so the thread and the rail never read as two stacked cards. The outer cq is required: the cq-lg column switch is measured against the host container, and it is set at lg rather than md so the board is already past its own 48rem divider threshold when the second column appears. Nothing here streams, so no pip moves.',
      html: `<div class="cq">
  <div class="workspace grid-cols-1 cq-lg:grid-cols-3">
    <section class="workspace-pane cq-lg:col-span-2">
      <div class="workspace-head">
        <span class="workspace-label">Thread</span>
        <span class="workspace-count">4 turns</span>
      </div>
      <div class="workspace-body">
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
        <div class="chat-msg">
          <span class="chat-avatar chat-avatar-assistant" aria-hidden="true">AP</span>
          <div class="chat-meta">
            <span class="chat-role">Agent</span>
            <span class="chat-time">09:43</span>
          </div>
          <div class="chat-body">
            <p>Below 20rem the grid folds to a single column, so the rail keeps one readable card per row.</p>
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
            <span class="workspace-file-name">src/css/utilities.css</span>
            <span class="workspace-label">Read</span>
          </li>
          <li class="workspace-file">
            <span class="workspace-file-name">src/css/components/cards.css</span>
            <span class="workspace-label">Read</span>
          </li>
          <li class="workspace-file">
            <span class="workspace-file-name">src/css/tokens.css</span>
            <span class="workspace-label">Read</span>
          </li>
          <li class="workspace-file">
            <span class="workspace-file-name">docs/container-queries.md</span>
            <span class="workspace-label">Edit</span>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</div>`,
    },
  ],

  'tool-trace': [
    {
      id: 'grouped',
      name: 'Grouped',
      description:
        'Calls are gathered under one header per tool with a count, so a run that hits the same tool nine times reads as one block instead of nine rows.',
      guidance:
        'Use for a long run where the same handful of tools repeat and the question is which tool is doing the work, not what happened at 1.2 seconds. Do not use it when order matters, because grouping destroys the chronology that makes a trace debuggable. Group headers reuse .trace-header so the surface shift already in the component carries the grouping, with no second border. The running call keeps its pip motion and nothing else moves.',
      html: `<div class="trace">
  <div class="trace-header">
    <span class="status-pip is-streaming" aria-hidden="true"></span>
    <span class="trace-title">Tool trace</span>
    <span class="trace-meta">
      <span>4 calls</span>
      <span class="trace-sep" aria-hidden="true">/</span>
      <span>3 tools</span>
    </span>
  </div>
  <div class="trace-header">
    <span class="workspace-label">read_file</span>
    <span class="trace-meta"><span>2 calls</span></span>
  </div>
  <ol class="trace-list">
    <li class="trace-row is-done">
      <span class="trace-name">src/tax.ts</span>
      <span class="trace-args">214 lines</span>
      <span class="trace-status"><span class="status-pip status-pip-success" aria-hidden="true"></span>ok</span>
      <span class="trace-time" data-tabular>42ms</span>
    </li>
    <li class="trace-row is-done">
      <span class="trace-name">src/money.ts</span>
      <span class="trace-args">96 lines</span>
      <span class="trace-status"><span class="status-pip status-pip-success" aria-hidden="true"></span>ok</span>
      <span class="trace-time" data-tabular>31ms</span>
    </li>
  </ol>
  <div class="trace-header">
    <span class="workspace-label">grep</span>
    <span class="trace-meta"><span>1 call</span></span>
  </div>
  <ol class="trace-list">
    <li class="trace-row is-done">
      <span class="trace-name">roundOnce</span>
      <span class="trace-args">3 matches</span>
      <span class="trace-status"><span class="status-pip status-pip-success" aria-hidden="true"></span>ok</span>
      <span class="trace-time" data-tabular>110ms</span>
    </li>
  </ol>
  <div class="trace-header">
    <span class="workspace-label">run_terminal</span>
    <span class="trace-meta"><span>1 call</span></span>
  </div>
  <ol class="trace-list">
    <li class="trace-row is-streaming">
      <span class="trace-name">npm test billing</span>
      <span class="trace-args">24 specs</span>
      <span class="trace-status"><span class="status-pip status-pip-warning is-streaming" aria-hidden="true"></span>running</span>
      <span class="trace-time" data-tabular>1.5s</span>
      <div class="progress progress-indeterminate trace-bar" aria-hidden="true"><div class="progress-bar"></div></div>
    </li>
  </ol>
</div>`,
    },
    {
      id: 'timeline',
      name: 'Timeline',
      description:
        'The duration column becomes a proportional bar on every row, so a run reads as a shape and the one slow call is visible without arithmetic.',
      guidance:
        'Use when the question is where the time went. Every bar is a fraction of the same total, so pick the total once and keep it in the header: here the bars are twelfths, sixths, quarters and halves of the 3.0s run, which is why the widths are utility fractions and not hand numbers. A finished bar is static fill and never animates, which is law 2: the only motion on the screen is the pip on the call that is still running.',
      html: `<div class="trace">
  <div class="trace-header">
    <span class="status-pip is-streaming" aria-hidden="true"></span>
    <span class="trace-title">Tool trace</span>
    <span class="trace-meta">
      <span>4 calls</span>
      <span class="trace-sep" aria-hidden="true">/</span>
      <span>3.0s elapsed</span>
    </span>
  </div>
  <ol class="trace-list">
    <li class="trace-row is-done flex items-center gap-3">
      <span class="trace-name w-24 shrink-0">read_file</span>
      <span class="trace-args w-24 shrink-0">src/tax.ts</span>
      <span class="bar-track flex-1 min-w-0"><span class="bar-fill w-1/12"></span></span>
      <span class="trace-time w-12 shrink-0" data-tabular>0.25s</span>
    </li>
    <li class="trace-row is-done flex items-center gap-3">
      <span class="trace-name w-24 shrink-0">grep</span>
      <span class="trace-args w-24 shrink-0">roundOnce</span>
      <span class="bar-track flex-1 min-w-0"><span class="bar-fill w-1/6"></span></span>
      <span class="trace-time w-12 shrink-0" data-tabular>0.50s</span>
    </li>
    <li class="trace-row is-error flex items-center gap-3">
      <span class="trace-name w-24 shrink-0">apply_patch</span>
      <span class="trace-args w-24 shrink-0">src/tax.ts</span>
      <span class="bar-track flex-1 min-w-0"><span class="bar-fill w-1/4"></span></span>
      <span class="trace-time w-12 shrink-0" data-tabular>0.75s</span>
    </li>
    <li class="trace-row is-streaming flex items-center gap-3">
      <span class="trace-name w-24 shrink-0">run_terminal</span>
      <span class="trace-args w-24 shrink-0">npm test billing</span>
      <span class="bar-track flex-1 min-w-0"><span class="bar-fill w-1/2"></span></span>
      <span class="trace-time w-12 shrink-0" data-tabular>1.50s</span>
    </li>
  </ol>
  <div class="trace-header">
    <span class="trace-meta"><span>run_terminal is still running, so its bar is elapsed time rather than a total.</span></span>
  </div>
</div>`,
    },
    {
      id: 'compact-rows',
      name: 'Compact rows',
      description:
        'The argument column is dropped and each call collapses to name on the left, status and duration hard right, at roughly two thirds the row height.',
      guidance:
        'Use in a rail, a footer or an embedded panel where the trace is a companion to something else and the arguments are one click away. Do not use it as the only trace in a debugging surface: without the argument column, three reads of three different files are three identical rows. Status stays a pip plus plain mono text, never a chip, so the rows keep their vertical rhythm at the tighter height.',
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
    <li class="trace-row is-done flex items-center gap-4 py-1">
      <span class="trace-name flex-1 min-w-0">read_file</span>
      <span class="trace-status"><span class="status-pip status-pip-success" aria-hidden="true"></span>ok</span>
      <span class="trace-time w-12 shrink-0" data-tabular>42ms</span>
    </li>
    <li class="trace-row is-done flex items-center gap-4 py-1">
      <span class="trace-name flex-1 min-w-0">grep</span>
      <span class="trace-status"><span class="status-pip status-pip-success" aria-hidden="true"></span>ok</span>
      <span class="trace-time w-12 shrink-0" data-tabular>110ms</span>
    </li>
    <li class="trace-row is-error flex items-center gap-4 py-1">
      <span class="trace-name flex-1 min-w-0">apply_patch</span>
      <span class="trace-status"><span class="status-pip status-pip-danger" aria-hidden="true"></span>failed</span>
      <span class="trace-time w-12 shrink-0" data-tabular>96ms</span>
    </li>
    <li class="trace-row is-streaming flex items-center gap-4 py-1">
      <span class="trace-name flex-1 min-w-0">run_terminal</span>
      <span class="trace-status"><span class="status-pip status-pip-warning is-streaming" aria-hidden="true"></span>running</span>
      <span class="trace-time w-12 shrink-0" data-tabular>1.5s</span>
      <div class="progress progress-indeterminate trace-bar" aria-hidden="true"><div class="progress-bar"></div></div>
    </li>
  </ol>
</div>`,
    },
  ],

  'approval-bar': [
    {
      id: 'stacked',
      name: 'Stacked',
      description:
        'The call and its note take the full width and the three actions drop to a full width row beneath, instead of sitting to the right of the text.',
      guidance:
        'Use in a narrow column, a drawer or a mobile sheet, where the side by side layout would squeeze the note to four words a line. The buttons are a three column grid that folds to one below md, so Allow once is never a thumb width from Deny on a phone. The state is carried by the warning ink on the status line and the steady pip beside it, never by a coloured left edge: any left border thicker than the hairline is the stripe tell law 3 exists to stop.',
      html: `<div class="approval grid-cols-1">
  <div class="approval-main">
    <span class="approval-status">
      <span class="status-pip status-pip-warning" aria-hidden="true"></span>
      Needs approval
    </span>
    <span class="approval-action">write_file <span class="approval-target">src/auth.ts</span></span>
    <p class="approval-note">Replaces the session helper and rewrites two call sites. Review the diff before allowing.</p>
  </div>
  <div class="approval-actions grid grid-cols-1 md:grid-cols-3 gap-2">
    <button class="btn btn-ghost btn-sm approval-deny w-full" type="button">Deny</button>
    <button class="btn btn-outline btn-sm w-full" type="button">Edit</button>
    <button class="btn btn-primary btn-sm w-full" type="button">Allow once</button>
  </div>
</div>`,
    },
    {
      id: 'inline-row',
      name: 'Inline row',
      description:
        'One line: status pip, the call, then allow and deny pushed hard right. The explanatory note is gone.',
      guidance:
        'Use only when the call itself is the whole explanation, such as a read of a named file, and the user has already seen the rules they are approving under. Do not use it for a destructive capability: dropping the note to save a row is how someone approves a write to production because it looked like the last four reads. Edit is dropped too, because a row with three actions and no note is a toolbar, not a decision.',
      html: `<div class="approval flex items-center gap-3 flex-wrap">
  <span class="approval-status">
    <span class="status-pip status-pip-warning" aria-hidden="true"></span>
    Needs approval
  </span>
  <span class="approval-action">read_file <span class="approval-target">src/auth.ts</span></span>
  <div class="approval-actions ml-auto">
    <button class="btn btn-ghost btn-sm approval-deny" type="button">Deny</button>
    <button class="btn btn-primary btn-sm" type="button">Allow once</button>
  </div>
</div>`,
    },
    {
      id: 'detail-expanded',
      name: 'Detail expanded',
      description:
        'A scope table sits between the call and the actions, listing each capability the approval actually grants with its resource and risk.',
      guidance:
        'Use when one approval grants more than the call name implies, which is most write and migrate calls. Reading the capability list is the decision, so the table goes above the buttons and never behind a disclosure. Risk is a pip plus a word in the same three step vocabulary as the permission dialog, so a user who has seen one has seen both. The table is flush inside the bar rather than a second bordered box, and it sits in an overflow-x-auto block so a long resource path scrolls the table instead of running past the card on a phone.',
      html: `<div class="approval grid-cols-1">
  <div class="approval-main">
    <span class="approval-status">
      <span class="status-pip status-pip-warning" aria-hidden="true"></span>
      Needs approval
    </span>
    <span class="approval-action">write_file <span class="approval-target">src/auth.ts</span></span>
    <p class="approval-note">Replaces the session helper and rewrites two call sites. Review the diff before allowing.</p>
    <div class="overflow-x-auto mt-3">
      <table class="table table-compact permission-scope">
        <thead>
          <tr>
            <th scope="col">Capability</th>
            <th scope="col">Resource</th>
            <th scope="col">Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code class="permission-cap">files.write</code></td>
            <td class="permission-resource">repo / src/auth.ts</td>
            <td><span class="permission-risk"><span class="status-pip status-pip-warning" aria-hidden="true"></span>Medium</span></td>
          </tr>
          <tr>
            <td><code class="permission-cap">files.write</code></td>
            <td class="permission-resource">repo / src/session.ts</td>
            <td><span class="permission-risk"><span class="status-pip status-pip-warning" aria-hidden="true"></span>Medium</span></td>
          </tr>
          <tr>
            <td><code class="permission-cap">files.read</code></td>
            <td class="permission-resource">repo / src/auth.spec.ts</td>
            <td><span class="permission-risk"><span class="status-pip status-pip-success" aria-hidden="true"></span>Low</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="approval-actions">
    <button class="btn btn-ghost btn-sm approval-deny" type="button">Deny</button>
    <button class="btn btn-outline btn-sm" type="button">Edit</button>
    <button class="btn btn-primary btn-sm" type="button">Allow once</button>
  </div>
</div>`,
    },
  ],

  'agent-workspace': [
    {
      id: 'two-pane',
      name: 'Two pane',
      description:
        'The context rail is removed and the board is thread on the left, plan steps on the right, each pane sized by the container rather than a fixed rail width.',
      guidance:
        'Use when the files the run touched are already visible elsewhere on the page, or when the run is about a decision rather than a diff. Two panes hold their reading measure down to roughly 700px, where three do not. The cq wrapper is what the cq-lg switch measures, and lg is used rather than md so the board is already past its own 48rem threshold and the pane divider is a vertical hairline, not a horizontal one. Only the step that is still being drafted carries is-streaming.',
      html: `<div class="cq">
  <div class="workspace grid-cols-1 cq-lg:grid-cols-2">
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
        </div>
      </div>
    </section>
    <section class="workspace-pane">
      <div class="workspace-head">
        <span class="workspace-label">Steps</span>
        <span class="workspace-count">3 of 4</span>
      </div>
      <div class="workspace-body">
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
          <li class="workspace-step">
            <span class="status-pip status-pip-warning" aria-hidden="true"></span>
            <span>Re-run billing/invoice-total.spec.ts</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</div>`,
    },
    {
      id: 'stacked',
      name: 'Stacked',
      description:
        'All three panes stack vertically and only open into three columns when the host container is genuinely wide, for an embed in a narrow column.',
      guidance:
        'Use when the workspace is dropped into something whose width you do not control: a docs page, a side panel, a card in a dashboard you did not build. The default board measures its own width and folds at 48rem; this variant hands the decision to the host container instead, which is why the cq wrapper is mandatory here rather than optional. A cq-lg class with no cq ancestor is a silent no-op and is the single easiest mistake to make in this library.',
      html: `<div class="cq">
  <div class="workspace grid-cols-1 cq-lg:grid-cols-3">
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
  </div>
</div>`,
    },
    {
      id: 'context-right',
      name: 'Context right',
      description:
        'Steps move up into the main pane beside the transcript and the context rail widens to a full column, so file paths stop wrapping mid path.',
      guidance:
        'Use when the run touches deep paths, many files, or a monorepo where the last segment is never enough to identify a file. The fixed 14rem rail in the default board truncates those; a full column does not. Do not widen the rail past a third of the board: a file list is a reference, and once it competes with the transcript for attention the reader stops following the run. Steps keep their pips, and the drafting step is the only one that moves.',
      html: `<div class="cq">
  <div class="workspace grid-cols-1 cq-lg:grid-cols-3">
    <section class="workspace-pane cq-lg:col-span-2">
      <div class="workspace-head">
        <span class="workspace-label">Thread and steps</span>
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
  </div>
</div>`,
    },
  ],

  'prompt-composer': [
    {
      id: 'minimal',
      name: 'Minimal',
      description:
        'Field and send button only. The toolbar hairline, the attachment chips, the model label and both counters are gone.',
      guidance:
        'Use as a first run surface, or anywhere the user has one thing to type and no decisions to make first. Do not use it where a token budget or a model choice actually applies, because a counter the user cannot see is a limit they discover by hitting it. Even stripped, the component still owns the native surfaces law 10 is about: the shell carries the focus ring and the textarea keeps caret-color from .composer-input, which is the reason the field is chromeless rather than a bare textarea.',
      html: `<div class="cq">
  <form class="composer" action="#" method="post">
    <label class="sr-only" for="composer-input-minimal">Message the agent</label>
    <textarea class="textarea composer-input" id="composer-input-minimal" name="prompt" rows="2" placeholder="Describe the change you want, or paste a stack trace.">Rounding is off by a cent on EU invoices. Find where the tax is rounded twice and fix it.</textarea>
    <div class="composer-send justify-end p-3 pt-0">
      <button class="btn btn-primary btn-sm" type="submit">Send</button>
    </div>
  </form>
  <p class="composer-hint">Enter to send, Shift+Enter for newline</p>
</div>`,
    },
    {
      id: 'toolbar-top',
      name: 'Toolbar top',
      description:
        'The tool row moves above the field and takes a bottom hairline, and the counters move to their own row underneath with the send button.',
      guidance:
        'Use when the model and the attach actions are choices the user makes before writing, not after, which is the case in a workspace where the model changes per prompt. The hairline moves with the toolbar: .composer-toolbar draws its rule on the top edge by default, so border-t-0 plus border-b keeps exactly one rule in the shell and never two. The counters keep tabular numerals so the token figure does not shuffle while the user types.',
      html: `<div class="cq">
  <form class="composer" action="#" method="post">
    <div class="composer-toolbar border-t-0 border-b">
      <div class="composer-tools">
        <span class="composer-model">
          <span class="status-pip status-pip-success" aria-hidden="true"></span>
          claude-sonnet-5
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
    </div>
    <label class="sr-only" for="composer-input-toolbar-top">Message the agent</label>
    <textarea class="textarea composer-input" id="composer-input-toolbar-top" name="prompt" rows="2" placeholder="Describe the change you want, or paste a stack trace.">Rounding is off by a cent on EU invoices. Find where the tax is rounded twice and fix it.</textarea>
    <div class="composer-send justify-between p-3 pt-0">
      <span class="composer-count">
        <span class="composer-tokens" data-tabular>1,284 / 8,000 tokens</span>
        <span class="composer-quota" data-tabular>84% of today's request budget left</span>
      </span>
      <button class="btn btn-primary btn-sm" type="submit">Send</button>
    </div>
  </form>
  <p class="composer-hint">Enter to send, Shift+Enter for newline</p>
</div>`,
    },
    {
      id: 'attachments-first',
      name: 'Attachments first',
      description:
        'File chips move above the field, so the context the prompt is written against is visible while it is being written rather than under it.',
      guidance:
        'Use for a review or debug composer where the user drops files first and writes the question second, which is the order they actually work in. Each chip keeps its size in tabular numerals, because a 19.7 kB log and a 4.1 kB source file are different questions. Do not let the chip row grow past two lines: past that it is a file list and belongs in a context rail, not in the composer.',
      html: `<div class="cq">
  <form class="composer" action="#" method="post">
    <ul class="composer-files pt-3 pb-2">
      <li class="composer-file">
        <span class="composer-file-name">invoice-total.ts</span>
        <span class="composer-file-size" data-tabular>4.1 kB</span>
      </li>
      <li class="composer-file">
        <span class="composer-file-name">failing-run.log</span>
        <span class="composer-file-size" data-tabular>19.7 kB</span>
      </li>
      <li class="composer-file">
        <span class="composer-file-name">tax-rates.csv</span>
        <span class="composer-file-size" data-tabular>2.3 kB</span>
      </li>
    </ul>
    <label class="sr-only" for="composer-input-attachments-first">Message the agent</label>
    <textarea class="textarea composer-input" id="composer-input-attachments-first" name="prompt" rows="2" placeholder="Describe the change you want, or paste a stack trace.">Rounding is off by a cent on EU invoices. Find where the tax is rounded twice and fix it.</textarea>
    <div class="composer-toolbar">
      <div class="composer-tools">
        <span class="composer-model">
          <span class="status-pip status-pip-success" aria-hidden="true"></span>
          claude-sonnet-5
        </span>
        <button class="btn btn-ghost btn-sm btn-icon" type="button" aria-label="Attach a file">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21.44 11.05l-8.49 8.49a5 5 0 0 1-7.07-7.07l8.49-8.49a3.5 3.5 0 0 1 4.95 4.95l-8.49 8.49a2 2 0 0 1-2.83-2.83l7.78-7.78"/>
          </svg>
        </button>
      </div>
      <div class="composer-send">
        <span class="composer-count">
          <span class="composer-tokens" data-tabular>1,284 / 8,000 tokens</span>
        </span>
        <button class="btn btn-primary btn-sm" type="submit">Send</button>
      </div>
    </div>
  </form>
  <p class="composer-hint">Enter to send, Shift+Enter for newline</p>
</div>`,
    },
  ],

  'diff-view': [
    {
      id: 'side-by-side',
      name: 'Side by side',
      description:
        'Before and after sit in two scrolling columns with one hairline between them, instead of removed and added rows interleaved in one list.',
      guidance:
        'Use when the change rewrites lines rather than adding or deleting them, because a rewrite read as a minus block followed by a plus block makes the reader do the pairing by hand. The two columns stay side by side at every width and each scrolls on its own: a side by side diff needs the width, and folding it to one column at 400px would silently turn it back into the unified view. Do not use it for a long file move, where unified is shorter and just as clear.',
      html: `<div class="diff">
  <div class="diff-header">
    <span class="diff-path">src/billing/invoice-total.ts</span>
    <span class="badge badge-neutral diff-stat">
      <span class="diff-stat-add" data-tabular>+3</span>
      <span class="diff-stat-del" data-tabular>-2</span>
    </span>
  </div>
  <div class="grid grid-cols-2">
    <section class="min-w-0 border-r" aria-label="Before">
      <div class="diff-header">
        <span class="workspace-label">Before</span>
        <span class="diff-stat-del text-xs" data-tabular>-2</span>
      </div>
      <div class="diff-body">
        <div class="diff-row flex items-baseline gap-2 pl-3">
          <span class="diff-gutter w-8 shrink-0" aria-hidden="true">54</span>
          <span class="diff-marker w-4 shrink-0" aria-hidden="true"></span>
          <code class="diff-code">  const subtotal = lines.reduce((sum, l) =&gt; sum + l.amount, 0);</code>
        </div>
        <div class="diff-row is-removed flex items-baseline gap-2 pl-3">
          <span class="diff-gutter w-8 shrink-0" aria-hidden="true">55</span>
          <span class="diff-marker w-4 shrink-0" aria-hidden="true">-</span>
          <code class="diff-code"><span class="sr-only">Removed line. </span>  const taxDue = subtotal * 0.2;</code>
        </div>
        <div class="diff-row is-removed flex items-baseline gap-2 pl-3">
          <span class="diff-gutter w-8 shrink-0" aria-hidden="true">56</span>
          <span class="diff-marker w-4 shrink-0" aria-hidden="true">-</span>
          <code class="diff-code"><span class="sr-only">Removed line. </span>  return subtotal + taxDue;</code>
        </div>
        <div class="diff-row flex items-baseline gap-2 pl-3">
          <span class="diff-gutter w-8 shrink-0" aria-hidden="true">57</span>
          <span class="diff-marker w-4 shrink-0" aria-hidden="true"></span>
          <code class="diff-code">}</code>
        </div>
      </div>
    </section>
    <section class="min-w-0" aria-label="After">
      <div class="diff-header">
        <span class="workspace-label">After</span>
        <span class="diff-stat-add text-xs" data-tabular>+3</span>
      </div>
      <div class="diff-body">
        <div class="diff-row flex items-baseline gap-2 pl-3">
          <span class="diff-gutter w-8 shrink-0" aria-hidden="true">54</span>
          <span class="diff-marker w-4 shrink-0" aria-hidden="true"></span>
          <code class="diff-code">  const subtotal = lines.reduce((sum, l) =&gt; sum + l.amount, 0);</code>
        </div>
        <div class="diff-row is-added flex items-baseline gap-2 pl-3">
          <span class="diff-gutter w-8 shrink-0" aria-hidden="true">55</span>
          <span class="diff-marker w-4 shrink-0" aria-hidden="true">+</span>
          <code class="diff-code"><span class="sr-only">Added line. </span>  const rate = taxRateFor(tax.region, tax.asOf);</code>
        </div>
        <div class="diff-row is-added flex items-baseline gap-2 pl-3">
          <span class="diff-gutter w-8 shrink-0" aria-hidden="true">56</span>
          <span class="diff-marker w-4 shrink-0" aria-hidden="true">+</span>
          <code class="diff-code"><span class="sr-only">Added line. </span>  const taxDue = roundCents(subtotal * rate);</code>
        </div>
        <div class="diff-row is-added flex items-baseline gap-2 pl-3">
          <span class="diff-gutter w-8 shrink-0" aria-hidden="true">57</span>
          <span class="diff-marker w-4 shrink-0" aria-hidden="true">+</span>
          <code class="diff-code"><span class="sr-only">Added line. </span>  return { subtotal, taxDue, total: subtotal + taxDue };</code>
        </div>
      </div>
    </section>
  </div>
  <div class="diff-footer">
    <span class="diff-note">Rounding now happens once, on the tax line only.</span>
    <span class="diff-hunk" data-tabular>Hunk 2 of 3</span>
  </div>
</div>`,
    },
    {
      id: 'compact',
      name: 'Compact',
      description:
        'The two gutters and the marker column collapse into one signed line number, and the code sets tighter leading, so a hunk costs about half the height.',
      guidance:
        'Use where the diff is evidence rather than the work: an approval bar, a run log, a pull request summary that lists six files. The signed gutter carries the marker, so there is no separate column and no doubled line numbers, and the sr-only prefix on each changed line still announces added or removed to a screen reader. Tinted rows carry the state, never an edge stripe, which is law 3. Do not use it as the review surface itself, where the extra leading is what makes a long hunk readable.',
      html: `<div class="diff">
  <div class="diff-header">
    <span class="diff-path">src/billing/invoice-total.ts</span>
    <span class="badge badge-neutral diff-stat">
      <span class="diff-stat-add" data-tabular>+3</span>
      <span class="diff-stat-del" data-tabular>-2</span>
    </span>
  </div>
  <div class="diff-body">
    <div class="diff-row flex items-baseline gap-2 pl-3">
      <span class="diff-gutter w-10 shrink-0" aria-hidden="true">54</span>
      <code class="diff-code leading-snug">  const subtotal = lines.reduce((sum, l) =&gt; sum + l.amount, 0);</code>
    </div>
    <div class="diff-row is-removed flex items-baseline gap-2 pl-3">
      <span class="diff-gutter w-10 shrink-0" aria-hidden="true">-55</span>
      <code class="diff-code leading-snug"><span class="sr-only">Removed line. </span>  const taxDue = subtotal * 0.2;</code>
    </div>
    <div class="diff-row is-removed flex items-baseline gap-2 pl-3">
      <span class="diff-gutter w-10 shrink-0" aria-hidden="true">-56</span>
      <code class="diff-code leading-snug"><span class="sr-only">Removed line. </span>  return subtotal + taxDue;</code>
    </div>
    <div class="diff-row is-added flex items-baseline gap-2 pl-3">
      <span class="diff-gutter w-10 shrink-0" aria-hidden="true">+55</span>
      <code class="diff-code leading-snug"><span class="sr-only">Added line. </span>  const rate = taxRateFor(tax.region, tax.asOf);</code>
    </div>
    <div class="diff-row is-added flex items-baseline gap-2 pl-3">
      <span class="diff-gutter w-10 shrink-0" aria-hidden="true">+56</span>
      <code class="diff-code leading-snug"><span class="sr-only">Added line. </span>  const taxDue = roundCents(subtotal * rate);</code>
    </div>
    <div class="diff-row is-added flex items-baseline gap-2 pl-3">
      <span class="diff-gutter w-10 shrink-0" aria-hidden="true">+57</span>
      <code class="diff-code leading-snug"><span class="sr-only">Added line. </span>  return { subtotal, taxDue, total: subtotal + taxDue };</code>
    </div>
    <div class="diff-row flex items-baseline gap-2 pl-3">
      <span class="diff-gutter w-10 shrink-0" aria-hidden="true">58</span>
      <code class="diff-code leading-snug">}</code>
    </div>
  </div>
  <div class="diff-footer">
    <span class="diff-note">Rounding now happens once, on the tax line only.</span>
    <span class="diff-hunk" data-tabular>Hunk 2 of 3</span>
  </div>
</div>`,
    },
    {
      id: 'file-list',
      name: 'File list',
      description:
        'A file summary with per file add and delete counts sits above the hunk, separated by a hairline, so a multi file change has a contents page.',
      guidance:
        'Use when the change spans more than about three files and the reader needs to know the shape of it before reading any of it. Keep the hierarchy that law 8 asks for: the summary rows are small mono text and the open hunk below is the thing with weight, so the eye lands on the code rather than bouncing between four equal blocks. Counts use tabular numerals so the plus and minus columns line up down the list.',
      html: `<div class="diff">
  <div class="diff-header">
    <span class="diff-path">3 files changed</span>
    <span class="badge badge-neutral diff-stat">
      <span class="diff-stat-add" data-tabular>+7</span>
      <span class="diff-stat-del" data-tabular>-4</span>
    </span>
  </div>
  <ul class="list-none m-0 p-0">
    <li class="flex items-baseline justify-between gap-3 px-4 py-2">
      <span class="diff-path">src/billing/invoice-total.ts</span>
      <span class="diff-stat flex items-baseline gap-2 text-xs">
        <span class="diff-stat-add" data-tabular>+3</span>
        <span class="diff-stat-del" data-tabular>-2</span>
      </span>
    </li>
    <li class="flex items-baseline justify-between gap-3 px-4 py-2">
      <span class="diff-path">src/tax.ts</span>
      <span class="diff-stat flex items-baseline gap-2 text-xs">
        <span class="diff-stat-add" data-tabular>+2</span>
        <span class="diff-stat-del" data-tabular>-1</span>
      </span>
    </li>
    <li class="flex items-baseline justify-between gap-3 px-4 py-2">
      <span class="diff-path">billing/invoice-total.spec.ts</span>
      <span class="diff-stat flex items-baseline gap-2 text-xs">
        <span class="diff-stat-add" data-tabular>+2</span>
        <span class="diff-stat-del" data-tabular>-1</span>
      </span>
    </li>
  </ul>
  <hr class="divider">
  <div class="diff-header">
    <span class="diff-path">src/billing/invoice-total.ts</span>
    <span class="diff-hunk" data-tabular>Hunk 2 of 3</span>
  </div>
  <div class="diff-body">
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
  </div>
  <div class="diff-footer">
    <span class="diff-note">Rounding now happens once, on the tax line only.</span>
    <span class="diff-hunk" data-tabular>Hunk 2 of 3</span>
  </div>
</div>`,
    },
  ],

  'cost-meter': [
    {
      id: 'inline-row',
      name: 'Inline row',
      description:
        'Spend, limit and the track collapse onto one row with no surrounding card, so the meter can sit inside a header or a footer that already has a frame.',
      guidance:
        'Use inside a surface that is already bordered: a run header, an app footer, a settings row. The default .cost card inside another card is the nested box law 1 exists to stop, so this variant drops the card and keeps only the meter. The track is still role="meter" with the full aria value set, because the visual fill is the only other thing carrying the number. Fill width comes from a w-3/4 utility, so the markup sets no token and the figures are chosen to match it exactly.',
      html: `<div class="flex items-center gap-4 flex-wrap">
  <span class="text-sm font-medium" id="cost-label-inline-row">Agent spend</span>
  <span class="text-sm tabular">
    $187.50
    <span class="text-xs text-muted">of a $250.00 limit</span>
  </span>
  <div class="cost-track flex-1 min-w-0" role="meter" aria-labelledby="cost-label-inline-row" aria-valuenow="187.5" aria-valuemin="0" aria-valuemax="250" aria-valuetext="187.50 US dollars of a 250.00 dollar limit">
    <span class="cost-fill w-3/4"></span>
    <span class="cost-mark is-warn" aria-hidden="true"></span>
    <span class="cost-mark is-danger" aria-hidden="true"></span>
  </div>
  <span class="text-xs text-muted tabular">18 days left</span>
</div>`,
    },
    {
      id: 'breakdown-table',
      name: 'Breakdown table',
      description:
        'The legend and the definition rows are replaced by a per model cost table under the track, so spend is attributed rather than only totalled.',
      guidance:
        'Use when more than one model runs against the same budget and the useful question is which one is spending it. The table is compact with numeric columns right aligned on tabular numerals, so the costs form a column the eye can add up. Keep the headline figure dominant and the table quiet, which is law 8: one anchor number, supporting detail grouped beneath it, not five equal tiles. Fill width is the w-3/4 utility rather than a token set in markup.',
      html: `<div class="cost">
  <div class="cost-head">
    <div>
      <h3 class="cost-title" id="cost-label-breakdown-table">Agent spend</h3>
      <p class="cost-period">Billing period 1 Sep to 30 Sep 2026, 18 days left</p>
    </div>
    <span class="badge badge-warning">Warn threshold passed</span>
  </div>

  <p class="cost-value" data-tabular>
    $187.50
    <span class="cost-limit">of a $250.00 limit</span>
  </p>

  <div class="cost-track" role="meter" aria-labelledby="cost-label-breakdown-table" aria-valuenow="187.5" aria-valuemin="0" aria-valuemax="250" aria-valuetext="187.50 US dollars of a 250.00 dollar limit">
    <span class="cost-fill w-3/4"></span>
    <span class="cost-mark is-warn" aria-hidden="true"></span>
    <span class="cost-mark is-danger" aria-hidden="true"></span>
  </div>

  <hr class="divider">

  <table class="table table-compact">
    <thead>
      <tr>
        <th scope="col">Model</th>
        <th scope="col" class="cell-num">Runs</th>
        <th scope="col" class="cell-num">Tokens</th>
        <th scope="col" class="cell-num">Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>claude-sonnet-5</td>
        <td class="cell-num" data-tabular>214</td>
        <td class="cell-num" data-tabular>8.1M</td>
        <td class="cell-num" data-tabular>$104.30</td>
      </tr>
      <tr>
        <td>claude-opus-5</td>
        <td class="cell-num" data-tabular>46</td>
        <td class="cell-num" data-tabular>2.6M</td>
        <td class="cell-num" data-tabular>$68.40</td>
      </tr>
      <tr>
        <td>claude-haiku-5</td>
        <td class="cell-num" data-tabular>58</td>
        <td class="cell-num" data-tabular>1.7M</td>
        <td class="cell-num" data-tabular>$14.80</td>
      </tr>
    </tbody>
  </table>

  <p class="cost-note">Runs are queued rather than dropped once the hard stop is reached. Raise the limit in workspace billing.</p>
</div>`,
    },
  ],

  'model-picker': [
    {
      id: 'compact-list',
      name: 'Compact list',
      description:
        'One line per model with the context window and price inline on the right, and no radio column: the row itself is the control.',
      guidance:
        'Use in a settings sheet or a dropdown panel where the models are already familiar and the provider sentence is noise. The radio is still in the markup and still keyboard reachable, just visually hidden, so the CSS :has(:checked) selection and the focus ring both keep working and the control is a real radio group rather than a list of clickable divs. Do not hide the radio in a first run picker, where the affordance is the only thing telling a new user the list is a choice.',
      html: `<div class="cq">
  <fieldset class="model-picker">
    <legend class="model-legend">Model for this workspace</legend>
    <p class="model-note">Applies to new runs. Agents already running keep the model they started with.</p>
    <div class="model-list">
      <label class="model-row flex items-center justify-between gap-4 flex-wrap">
        <input class="radio-input model-radio sr-only" type="radio" name="workspace-model-compact-list" value="sonnet-5" checked>
        <span class="model-head">
          <span class="model-name">claude-sonnet-5</span>
          <span class="badge badge-neutral model-tag">Default</span>
        </span>
        <span class="model-meta flex items-baseline gap-3">
          <span class="model-context" data-tabular>200K context</span>
          <span class="model-price" data-tabular>$3.00 in / $15.00 out per 1M</span>
        </span>
      </label>

      <label class="model-row flex items-center justify-between gap-4 flex-wrap">
        <input class="radio-input model-radio sr-only" type="radio" name="workspace-model-compact-list" value="opus-5">
        <span class="model-head">
          <span class="model-name">claude-opus-5</span>
        </span>
        <span class="model-meta flex items-baseline gap-3">
          <span class="model-context" data-tabular>200K context</span>
          <span class="model-price" data-tabular>$15.00 in / $75.00 out per 1M</span>
        </span>
      </label>

      <label class="model-row flex items-center justify-between gap-4 flex-wrap">
        <input class="radio-input model-radio sr-only" type="radio" name="workspace-model-compact-list" value="haiku-5">
        <span class="model-head">
          <span class="model-name">claude-haiku-5</span>
        </span>
        <span class="model-meta flex items-baseline gap-3">
          <span class="model-context" data-tabular>200K context</span>
          <span class="model-price" data-tabular>$1.00 in / $5.00 out per 1M</span>
        </span>
      </label>

      <label class="model-row flex items-center justify-between gap-4 flex-wrap">
        <input class="radio-input model-radio sr-only" type="radio" name="workspace-model-compact-list" value="self-hosted-70b">
        <span class="model-head">
          <span class="model-name">Llama 3.3 70B</span>
          <span class="badge badge-neutral model-tag">Self hosted</span>
        </span>
        <span class="model-meta flex items-baseline gap-3">
          <span class="model-context" data-tabular>128K context</span>
          <span class="model-price" data-tabular>$0.40 in / $0.40 out per 1M</span>
        </span>
      </label>
    </div>
  </fieldset>
</div>`,
    },
    {
      id: 'two-column',
      name: 'Two column',
      description:
        'The list becomes a two column grid from md, so four models fit in two rows and the whole choice is visible without scrolling.',
      guidance:
        'Use when there are four to eight models and the comparison is horizontal: two families side by side, hosted against self hosted. Do not use it past about eight, where a two column grid stops being a comparison and becomes a wall. Each row keeps its radio, provider line and meta block, so the rows stay the same component and only the track count changes. Below md the grid folds to one column and the layout is the default list again.',
      html: `<div class="cq">
  <fieldset class="model-picker">
    <legend class="model-legend">Model for this workspace</legend>
    <p class="model-note">Applies to new runs. Agents already running keep the model they started with.</p>
    <div class="model-list grid grid-cols-1 md:grid-cols-2 gap-3">
      <label class="model-row">
        <input class="radio-input model-radio" type="radio" name="workspace-model-two-column" value="sonnet-5" checked>
        <span class="model-body">
          <span class="model-head">
            <span class="model-name">claude-sonnet-5</span>
            <span class="badge badge-neutral model-tag">Default</span>
          </span>
          <span class="model-provider">Anthropic, balanced latency and depth</span>
          <span class="model-price" data-tabular>$3.00 in / $15.00 out per 1M</span>
        </span>
      </label>

      <label class="model-row">
        <input class="radio-input model-radio" type="radio" name="workspace-model-two-column" value="opus-5">
        <span class="model-body">
          <span class="model-head">
            <span class="model-name">claude-opus-5</span>
          </span>
          <span class="model-provider">Anthropic, deepest reasoning, slowest</span>
          <span class="model-price" data-tabular>$15.00 in / $75.00 out per 1M</span>
        </span>
      </label>

      <label class="model-row">
        <input class="radio-input model-radio" type="radio" name="workspace-model-two-column" value="haiku-5">
        <span class="model-body">
          <span class="model-head">
            <span class="model-name">claude-haiku-5</span>
          </span>
          <span class="model-provider">Anthropic, fast edits and short tool loops</span>
          <span class="model-price" data-tabular>$1.00 in / $5.00 out per 1M</span>
        </span>
      </label>

      <label class="model-row">
        <input class="radio-input model-radio" type="radio" name="workspace-model-two-column" value="self-hosted-70b">
        <span class="model-body">
          <span class="model-head">
            <span class="model-name">Llama 3.3 70B</span>
            <span class="badge badge-neutral model-tag">Self hosted</span>
          </span>
          <span class="model-provider">Runs on your own GPU pool, no data leaves the VPC</span>
          <span class="model-price" data-tabular>$0.40 in / $0.40 out per 1M</span>
        </span>
      </label>
    </div>
  </fieldset>
</div>`,
    },
    {
      id: 'select-row',
      name: 'Select row',
      description:
        'The whole list collapses to a native select, with the context window and price of the chosen model rendered on a meta line underneath it.',
      guidance:
        'Use in a dense settings form, a toolbar, or a modal where the picker is one field among twelve and a four row list would dominate the form. A native select is exactly the surface law 10 is about: the library themes its border, height, focus ring and chevron, so it belongs to the interface instead of reverting to the system control. Keep the meta line, because a select hides the price and a user who cannot see it will not go looking.',
      html: `<div class="form-group">
  <label class="form-label" for="model-select-select-row">Model for this workspace</label>
  <select class="select" id="model-select-select-row" name="workspace-model-select-row">
    <option value="sonnet-5" selected>claude-sonnet-5, balanced latency and depth</option>
    <option value="opus-5">claude-opus-5, deepest reasoning, slowest</option>
    <option value="haiku-5">claude-haiku-5, fast edits and short tool loops</option>
    <option value="self-hosted-70b">Llama 3.3 70B, self hosted on your own GPU pool</option>
  </select>
  <span class="model-meta flex items-baseline gap-3 mt-2">
    <span class="model-context" data-tabular>200K context</span>
    <span class="model-price" data-tabular>$3.00 in / $15.00 out per 1M</span>
  </span>
  <p class="form-hint mt-1">Applies to new runs. Agents already running keep the model they started with.</p>
</div>`,
    },
  ],

  'run-status-header': [
    {
      id: 'compact',
      name: 'Compact',
      description:
        'Title, pip, timer and step count sit on one line and the run controls move behind a menu, so the header costs one row instead of three.',
      guidance:
        'Use above a long scrolling surface, a log or a diff, where every row the header takes is a row of the thing the user came to read. The pip is the only element allowed to move and it moves only while the run is live, which is law 2. The menu trigger is icon only, so it carries an aria-label, aria-expanded and aria-controls, and it uses the one chevron shape the library uses everywhere rather than a caret glyph.',
      html: `<header class="page-header run-header">
  <div class="run-main flex items-center gap-3 flex-wrap">
    <h1 class="run-title">Migrate billing to the Stripe adapter</h1>
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
  <div class="run-actions">
    <div class="dropdown">
      <button class="btn btn-ghost btn-sm btn-icon dropdown-trigger" type="button" data-ai-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="run-menu-compact" aria-label="Run actions">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <ul class="dropdown-menu dropdown-right" id="run-menu-compact">
        <li><button class="dropdown-item" type="button">View log</button></li>
        <li><button class="dropdown-item" type="button">Copy run id</button></li>
        <li class="dropdown-divider"></li>
        <li><button class="dropdown-item is-danger" type="button">Cancel run</button></li>
      </ul>
    </div>
  </div>
</header>`,
    },
    {
      id: 'stacked-meta',
      name: 'Stacked meta',
      description:
        'The title takes its own full width line and the run id, state, timer and step count wrap onto a second row beneath it, with the actions below.',
      guidance:
        'Use when run titles are long, which they are whenever the title is the prompt, and the side by side header would push the meta into a two word column. Everything is left aligned to one edge so the title and the meta share a spine instead of drifting apart. The state keeps its live region so a screen reader hears the run finish without the user hunting for it, and the pip is still the only thing that moves.',
      html: `<header class="page-header run-header flex-col items-start gap-3">
  <div class="run-main w-full">
    <h1 class="run-title">Migrate billing to the Stripe adapter and backfill 18 months of invoice tax rates</h1>
    <div class="page-header-meta run-meta flex-wrap">
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
</header>`,
    },
  ],

  'permission-dialog': [
    {
      id: 'inline-panel',
      name: 'Inline panel',
      description:
        'The same scope table, remember option and actions rendered as a panel in the page instead of a modal over it.',
      guidance:
        'Use when the request is not blocking: a queued run waiting on a grant, an approvals inbox, a settings page where several requests are pending at once. A modal is for a decision the user has to make now, and stacking four of them is how a user learns to click Allow without reading. The panel header carries the question, the table sits flush in the body with no second border, and the actions stay bottom right so the muscle memory matches the dialog.',
      html: `<div class="panel">
  <div class="panel-header">
    <h2 class="m-0 text-base" id="permission-title-inline-panel">Allow the billing migration?</h2>
  </div>
  <div class="panel-body">
    <p class="permission-lead" id="permission-lead-inline-panel">
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
      <input class="checkbox-input" type="checkbox" name="permission-remember-inline-panel" value="session">
      <span>
        Remember for this session
        <span class="permission-remember-hint">Skips this dialog for these four capabilities until you sign out.</span>
      </span>
    </label>
    <div class="flex items-center gap-3 flex-wrap mt-4">
      <span class="permission-expiry">Grant expires in <span data-tabular>42</span> min</span>
      <button class="btn btn-outline" type="button">Deny</button>
      <button class="btn btn-primary" type="button">Allow</button>
    </div>
  </div>
</div>`,
    },
    {
      id: 'compact',
      name: 'Compact',
      description:
        'The scope table is replaced by a two line summary: the capabilities on one line and the resources they are scoped to on the next.',
      guidance:
        'Use for a repeat grant, or a request whose capabilities are all low risk and read only, where a four row table asks the user to read a table to learn nothing. Do not use it for a write or a migrate: a summary line is how a high risk capability gets approved by someone skimming. Nothing sits above the heading, which is law 5, so the question is the first thing read and the capability line supports it rather than announcing it.',
      html: `<button class="btn btn-outline" type="button" aria-haspopup="dialog" aria-expanded="false" data-ai-toggle="modal" data-ai-target="#permission-dialog-compact">
  Review requested access
</button>

<div class="modal" id="permission-dialog-compact">
  <div class="modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="modal-box permission-box" role="dialog" aria-modal="true" aria-labelledby="permission-title-compact" aria-describedby="permission-lead-compact">
    <div class="modal-header">
      <h2 class="modal-title" id="permission-title-compact">Allow the billing read?</h2>
      <button class="modal-close" type="button" data-ai-dismiss="modal" aria-label="Close dialog">&times;</button>
    </div>
    <div class="modal-body">
      <p class="permission-lead" id="permission-lead-compact">
        Release Agent is asking for two read only capabilities scoped to the billing service. The
        grant ends the moment you sign out.
      </p>
      <p class="text-sm">
        <code class="permission-cap">db.read</code>
        <code class="permission-cap">metrics.read</code>
      </p>
      <p class="text-sm text-secondary">billing-prod / customers and grafana / billing-latency</p>
      <label class="checkbox permission-remember">
        <input class="checkbox-input" type="checkbox" name="permission-remember-compact" value="session">
        <span>
          Remember for this session
          <span class="permission-remember-hint">Skips this dialog for these two capabilities until you sign out.</span>
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
  ],
};

export default agentVariants;
