/**
 * Layout variants for the application category (batch 2 of the variant catalog).
 *
 * Shape and rules live in the variant design document. In short: a variant is a
 * structural alternative to a component's default layout, never a recolour, a
 * radius change or a density attribute. Each entry reuses the parent
 * component's copy, ids and component classes and moves only the boxes.
 *
 * Every variant here composes classes that already exist in public/classes.json
 * and states that already exist in public/states.json. Nothing sets a --ai-*
 * token, nothing carries an inline style attribute, and every id is suffixed
 * with the variant name so a variant and its parent can sit on one page.
 *
 * Addressed flat as `parent:variant`, for example `sidebar-nav:topbar`.
 */

export const applicationVariants = {
  /* ==========================================================================
     App shell and sidebar
     ========================================================================== */
  'sidebar-nav': [
    {
      id: 'topbar',
      name: 'Topbar',
      description:
        'Navigation moves into a full width bar above the content and the side rail is gone, so the content area gets the whole viewport width back.',
      guidance:
        'Use for an application with five or fewer top level destinations, or one where the content is wide by nature: a table, a canvas, a diff. Do not use it for an app with nested navigation or more than about seven destinations, because a horizontal bar has nowhere to put the second level and you end up with a dropdown per item. Below md the .nav-links list is display:none by design, so this variant pairs a drawer with it rather than leaving the navigation unreachable on a phone. The shell is not a card: do not wrap .app-content in one, or the KPI cards inside it become nested boxes.',
      html: `<div class="app-shell flex-col">
  <header class="app-header">
    <div class="flex items-center gap-6">
      <button type="button" class="btn btn-ghost btn-sm btn-icon md:hidden" data-ai-toggle="drawer" data-ai-target="#app-nav-topbar" aria-label="Open navigation" aria-expanded="false">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></svg>
      </button>
      <a class="brand" href="/">Meridian</a>
      <nav aria-label="Primary">
        <ul class="nav-links">
          <li><a class="nav-link is-active" href="/overview" aria-current="page">Dashboard</a></li>
          <li><a class="nav-link" href="/documents">Documents</a></li>
          <li><a class="nav-link" href="/activity">Activity</a></li>
          <li><a class="nav-link" href="/settings">Settings</a></li>
        </ul>
      </nav>
    </div>
    <div class="flex items-center gap-3">
      <button type="button" class="btn btn-outline btn-sm">Invite</button>
      <span class="avatar avatar-sm" aria-hidden="true">AC</span>
    </div>
  </header>
  <main class="app-main">
    <div class="app-content">
      <div class="page-header">
        <div>
          <h1>Dashboard</h1>
          <p class="page-header-meta">production-syd, last deploy 14 minutes ago</p>
        </div>
        <button type="button" class="btn btn-primary btn-sm">New deploy</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div class="kpi-card is-primary">
          <span class="kpi-label">Requests, 24h</span>
          <span class="kpi-value">1,284,902</span>
          <span class="kpi-trend is-up">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            Up 12.4 percent against yesterday
          </span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">p95 latency</span>
          <span class="kpi-value">184 ms</span>
          <span class="kpi-trend is-down">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
            Down 9 ms
          </span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Error rate</span>
          <span class="kpi-value">0.04%</span>
          <span class="kpi-trend is-up">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            Up 0.01 points
          </span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Build time</span>
          <span class="kpi-value">42 s</span>
          <span class="kpi-trend is-down">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
            Down 6 s
          </span>
        </div>
      </div>
      <div class="health mt-8">
        <div class="health-row">
          <span class="health-name"><span class="pip pip-ok" aria-hidden="true"></span>api-edge</span>
          <span class="text-xs text-muted tabular">99.99%</span>
        </div>
        <div class="health-row">
          <span class="health-name"><span class="pip pip-ok" aria-hidden="true"></span>workers</span>
          <span class="text-xs text-muted tabular">99.97%</span>
        </div>
        <div class="health-row">
          <span class="health-name"><span class="pip pip-warn" aria-hidden="true"></span>image-resize</span>
          <span class="text-xs text-muted tabular">99.21%</span>
        </div>
      </div>
    </div>
  </main>
  <div class="drawer drawer-left" id="app-nav-topbar">
    <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
    <div class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="app-nav-topbar-title">
      <div class="drawer-header">
        <h2 class="drawer-title" id="app-nav-topbar-title">Meridian</h2>
        <button type="button" class="close" data-ai-dismiss="drawer" aria-label="Close navigation"></button>
      </div>
      <nav class="drawer-nav" aria-label="Primary">
        <a class="sidebar-item is-active" href="/overview" aria-current="page">Dashboard</a>
        <a class="sidebar-item" href="/documents">Documents</a>
        <a class="sidebar-item" href="/activity">Activity</a>
        <a class="sidebar-item" href="/settings">Settings</a>
      </nav>
    </div>
  </div>
</div>`,
    },
    {
      id: 'split-rail',
      name: 'Split rail',
      description:
        'An icon only rail keeps the top level destinations and a second contextual panel sits between the rail and the content, holding the current section.',
      guidance:
        'Use when the application has a shallow top level and a deep second level: files inside a project, channels inside a workspace, tables inside a schema. The rail never scrolls and the middle panel does, which is the whole point. Do not use it below about 1024px of content width, because three columns leave the content pane too narrow to read; the rail and the panel share one hairline through border-ie rather than each carrying a box of its own.',
      html: `<div class="app-shell">
  <nav class="sidebar is-collapsed" aria-label="Sections">
    <div class="sidebar-header">
      <span class="font-semibold">M</span>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-section">
        <a href="/dashboard" class="sidebar-item is-active" aria-current="page" aria-label="Dashboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span>Dashboard</span>
        </a>
        <a href="/documents" class="sidebar-item" aria-label="Documents">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>Documents</span>
        </a>
        <a href="/activity" class="sidebar-item" aria-label="Activity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Activity</span>
        </a>
      </li>
    </ul>
  </nav>
  <div class="w-64 shrink-0 surface-0 border-ie hidden lg:block">
    <div class="sidebar-header">
      <span class="font-semibold">Dashboard</span>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-section">
        <span class="sidebar-section-title">Main</span>
        <a href="/dashboard/overview" class="sidebar-item is-active" aria-current="page">Overview<span class="sidebar-badge">12</span></a>
        <a href="/dashboard/deploys" class="sidebar-item">Deploys</a>
        <a href="/dashboard/incidents" class="sidebar-item">Incidents<span class="sidebar-badge">3</span></a>
      </li>
      <li class="sidebar-section">
        <span class="sidebar-section-title">Account</span>
        <a href="/dashboard/members" class="sidebar-item">Members</a>
        <a href="/dashboard/settings" class="sidebar-item">Settings</a>
      </li>
    </ul>
  </div>
  <main class="app-main">
    <div class="app-content">
      <div class="page-header">
        <div>
          <h1>Overview</h1>
          <p class="page-header-meta">production-syd, last deploy 14 minutes ago</p>
        </div>
        <button type="button" class="btn btn-primary btn-sm">New deploy</button>
      </div>
      <div class="health mt-6">
        <div class="health-row">
          <span class="health-name"><span class="pip pip-ok" aria-hidden="true"></span>api-edge</span>
          <span class="text-xs text-muted tabular">99.99%</span>
        </div>
        <div class="health-row">
          <span class="health-name"><span class="pip pip-ok" aria-hidden="true"></span>workers</span>
          <span class="text-xs text-muted tabular">99.97%</span>
        </div>
        <div class="health-row">
          <span class="health-name"><span class="pip pip-warn" aria-hidden="true"></span>image-resize</span>
          <span class="text-xs text-muted tabular">99.21%</span>
        </div>
      </div>
    </div>
  </main>
</div>`,
    },
    {
      id: 'collapsed-rail',
      name: 'Collapsed rail',
      description:
        'The rail keeps only the icons and each item names itself through a tooltip, so the content pane takes back about twelve rem of width.',
      guidance:
        'Use when the content is the product and the navigation is muscle memory: an editor, a canvas, a log viewer. Every item still needs an accessible name, so the label stays in the markup and the rail hides it visually, and the tooltip is the only visible affordance, which means it has to be the themed .tooltip rather than the browser title attribute. Do not ship this as the only navigation for a first time user, because an icon with no word beside it teaches nothing until it is hovered.',
      html: `<div class="app-shell">
  <nav class="sidebar is-collapsed" aria-label="Workspace">
    <div class="sidebar-header">
      <span class="font-semibold">M</span>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-section">
        <span class="sidebar-section-title">Main</span>
        <a href="/dashboard" class="sidebar-item tooltip is-active" aria-current="page" data-tooltip="Dashboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span>Dashboard</span>
          <span class="sidebar-badge">12</span>
        </a>
        <a href="/documents" class="sidebar-item tooltip" data-tooltip="Documents">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>Documents</span>
        </a>
        <a href="/activity" class="sidebar-item tooltip" data-tooltip="Activity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Activity</span>
          <span class="sidebar-badge">3</span>
        </a>
      </li>
      <li class="sidebar-section">
        <span class="sidebar-section-title">Account</span>
        <a href="/settings" class="sidebar-item tooltip" data-tooltip="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span>Settings</span>
        </a>
      </li>
    </ul>
  </nav>
  <main class="app-main">
    <div class="app-content">
      <div class="page-header">
        <div>
          <h1>Dashboard</h1>
          <p class="page-header-meta">production-syd, last deploy 14 minutes ago</p>
        </div>
        <button type="button" class="btn btn-primary btn-sm">New deploy</button>
      </div>
      <div class="health mt-6">
        <div class="health-row">
          <span class="health-name"><span class="pip pip-ok" aria-hidden="true"></span>api-edge</span>
          <span class="text-xs text-muted tabular">99.99%</span>
        </div>
        <div class="health-row">
          <span class="health-name"><span class="pip pip-warn" aria-hidden="true"></span>image-resize</span>
          <span class="text-xs text-muted tabular">99.21%</span>
        </div>
      </div>
    </div>
  </main>
</div>`,
    },
    {
      id: 'nested-sections',
      name: 'Nested sections',
      description:
        'Each sidebar group becomes a disclosure with its own count, so a long navigation collapses to the section the reader is working in.',
      guidance:
        'Use when the rail carries more than about twelve destinations and the reader only ever works in one group at a time. Every trigger needs aria-expanded and aria-controls or the group reads as an undifferentiated list of buttons, and the chevron is the same m6 9 6 6 6-6 path the rest of the library uses, rotated on open. The accordion stays flush inside the rail: it must not gain a border of its own, because the rail is already the box.',
      html: `<nav class="sidebar border rounded-lg overflow-hidden" aria-label="Workspace">
  <div class="sidebar-header">
    <span class="font-semibold">Workspace</span>
  </div>
  <ul class="sidebar-nav accordion">
    <li class="sidebar-section accordion-item is-open">
      <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="true" aria-controls="sidebar-nav-nested-sections-main">
        <span class="sidebar-section-title">Main</span>
        <span class="sidebar-badge">15</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="accordion-content" id="sidebar-nav-nested-sections-main">
        <a href="/dashboard" class="sidebar-item is-active" aria-current="page">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
          <span class="sidebar-badge">12</span>
        </a>
        <a href="/documents" class="sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Documents
        </a>
        <a href="/activity" class="sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Activity
          <span class="sidebar-badge">3</span>
        </a>
      </div>
    </li>
    <li class="sidebar-section accordion-item">
      <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="sidebar-nav-nested-sections-account">
        <span class="sidebar-section-title">Account</span>
        <span class="sidebar-badge">2</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="accordion-content" id="sidebar-nav-nested-sections-account">
        <a href="/members" class="sidebar-item">Members</a>
        <a href="/settings" class="sidebar-item">Settings</a>
      </div>
    </li>
  </ul>
</nav>`,
    },
  ],

  /* ==========================================================================
     App top bar
     ========================================================================== */
  'app-topbar': [
    {
      id: 'search-center',
      name: 'Search center',
      description:
        'The brand takes the start of the bar, the search field centres in the remaining space and the account cluster holds the end.',
      guidance:
        'Use when search is the primary way people move around the product and the bar carries no navigation of its own, which is the shape a documentation site or a console with a command palette wants. The field is capped at max-w-sm so it does not stretch to the full width of a wide monitor and lose its centre. Do not centre the field when the bar also carries navigation links, because the two clusters then compete for the same optical middle.',
      html: `<div class="topbar justify-between">
  <a class="brand" href="/">Meridian</a>
  <div class="flex-1 flex justify-center">
    <label class="sr-only" for="app-topbar-search-center-input">Search resources</label>
    <div class="input-group max-w-sm">
      <span class="input-addon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      </span>
      <input class="input" id="app-topbar-search-center-input" type="search" placeholder="Search resources..." />
    </div>
  </div>
  <div class="flex items-center gap-3">
    <span class="text-xs text-muted text-nowrap">12 unread</span>
    <span class="avatar avatar-sm" aria-hidden="true">AC</span>
  </div>
</div>`,
    },
    {
      id: 'breadcrumb-left',
      name: 'Breadcrumb left',
      description:
        'A breadcrumb trail replaces the search field at the start of the bar and the unread count and avatar stay at the end.',
      guidance:
        'Use on a detail screen inside a deep hierarchy, where the reader needs to know where they are more than they need to search. The last crumb carries aria-current so the trail announces the current page rather than reading as four equal links, and the list is a real ol inside a labelled nav. Do not use it at the root of the application, where a one item trail is noise.',
      html: `<div class="topbar justify-between">
  <nav aria-label="Breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/">Workspace</a></li>
      <li class="breadcrumb-item"><a href="/resources">Resources</a></li>
      <li class="breadcrumb-item is-current" aria-current="page">api-gateway</li>
    </ol>
  </nav>
  <div class="flex items-center gap-3">
    <span class="text-xs text-muted text-nowrap">12 unread</span>
    <span class="avatar avatar-sm" aria-hidden="true">AC</span>
  </div>
</div>`,
    },
    {
      id: 'workspace-switcher',
      name: 'Workspace switcher',
      description:
        'A workspace dropdown sits before the search field, separated from it by a vertical hairline instead of a second bordered box.',
      guidance:
        'Use when one account holds several workspaces, projects or organisations and the reader switches between them often enough that the current one belongs in the chrome. The separator is divider-vertical, a one pixel rule, because giving the switcher its own border would put a box inside the bar. The trigger carries aria-haspopup, aria-expanded and aria-controls so the menu is announced before it opens.',
      html: `<div class="topbar">
  <div class="dropdown">
    <button type="button" class="btn btn-ghost btn-sm dropdown-trigger" data-ai-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-controls="app-topbar-workspace-switcher-menu">
      Meridian
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <ul class="dropdown-menu" id="app-topbar-workspace-switcher-menu">
      <li class="dropdown-header">Workspaces</li>
      <li><button type="button" class="dropdown-item">Meridian</button></li>
      <li><button type="button" class="dropdown-item">Fieldnote</button></li>
      <li><button type="button" class="dropdown-item">Lattice Labs</button></li>
      <li class="dropdown-divider"></li>
      <li><button type="button" class="dropdown-item">New workspace</button></li>
    </ul>
  </div>
  <span class="divider-vertical" aria-hidden="true"></span>
  <label class="sr-only" for="app-topbar-workspace-switcher-search">Search resources</label>
  <input class="input" id="app-topbar-workspace-switcher-search" type="search" placeholder="Search resources..." />
  <span class="text-xs text-muted text-nowrap">12 unread</span>
  <span class="avatar avatar-sm" aria-hidden="true">AC</span>
</div>`,
    },
  ],

  /* ==========================================================================
     Dashboard page header
     ========================================================================== */
  'page-header': [
    {
      id: 'stacked',
      name: 'Stacked',
      description:
        'Title and meta sit above a full width action row instead of beside it, so the two buttons share the line rather than crowding the heading.',
      guidance:
        'Use on a narrow content column or a phone first screen, where a title and two buttons on one line wrap into an ugly two row header anyway. The action row takes the full width and both buttons grow, which makes them a real thumb target. Do not use it on a wide dashboard, where the empty space to the right of the title is doing useful work and a full width button pair reads as a form submit.',
      html: `<div class="page-header flex-col items-start">
  <div>
    <h1>Overview</h1>
    <p class="page-header-meta">Workspace production, last deploy 14m ago</p>
  </div>
  <div class="flex gap-2 w-full">
    <button class="btn btn-outline btn-sm flex-1" type="button">Export</button>
    <button class="btn btn-primary btn-sm flex-1" type="button">New report</button>
  </div>
</div>`,
    },
    {
      id: 'tabs-under',
      name: 'Tabs under',
      description:
        'The header gives up its own bottom rule and a tab row takes over as the boundary between the header and the page.',
      guidance:
        'Use when the page has two to five sibling views that share one title, which is the common shape for a resource detail screen. The header drops its rule through border-b-0 and pb-0 so the page shows one hairline, not two stacked a few pixels apart. Every tab carries aria-selected and points at a panel through aria-controls, because a coloured underline alone tells a screen reader nothing.',
      html: `<div>
  <div class="page-header border-b-0 pb-0">
    <div>
      <h1>Overview</h1>
      <p class="page-header-meta">Workspace production, last deploy 14m ago</p>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-outline btn-sm" type="button">Export</button>
      <button class="btn btn-primary btn-sm" type="button">New report</button>
    </div>
  </div>
  <div class="tabs mt-4">
    <div class="tabs-list" role="tablist" aria-label="Overview views">
      <button class="tab is-active" role="tab" id="page-header-tabs-under-summary-tab" aria-controls="page-header-tabs-under-summary" aria-selected="true" data-ai-tab="#page-header-tabs-under-summary">Summary</button>
      <button class="tab" role="tab" id="page-header-tabs-under-deploys-tab" aria-controls="page-header-tabs-under-deploys" aria-selected="false" tabindex="-1" data-ai-tab="#page-header-tabs-under-deploys">Deploys</button>
      <button class="tab" role="tab" id="page-header-tabs-under-usage-tab" aria-controls="page-header-tabs-under-usage" aria-selected="false" tabindex="-1" data-ai-tab="#page-header-tabs-under-usage">Usage</button>
    </div>
    <div id="page-header-tabs-under-summary" class="tab-panel is-active" role="tabpanel" aria-labelledby="page-header-tabs-under-summary-tab">
      <p class="text-secondary">1,284,902 requests in the last 24 hours, p95 at 184 ms across three regions.</p>
    </div>
    <div id="page-header-tabs-under-deploys" class="tab-panel" role="tabpanel" aria-labelledby="page-header-tabs-under-deploys-tab">
      <p class="text-secondary">Six deploys this week, last one 14 minutes ago from commit 8f42d19.</p>
    </div>
    <div id="page-header-tabs-under-usage" class="tab-panel" role="tabpanel" aria-labelledby="page-header-tabs-under-usage-tab">
      <p class="text-secondary">1,240 of 2,000 build minutes used. The quota resets on the 1st.</p>
    </div>
  </div>
</div>`,
    },
    {
      id: 'meta-right',
      name: 'Meta right',
      description:
        'The action buttons give up the end of the row to a three item detail list, so the header states facts instead of offering work.',
      guidance:
        'Use on a read only detail screen, a report or a status page, where the reader arrived to check something rather than to change it. The values are tabular so region, time and count line up under one another rather than dancing as the numbers change. Do not use it when the page has a primary action: a header with no button sends people hunting for one further down.',
      html: `<div class="page-header">
  <div>
    <h1>Overview</h1>
    <p class="page-header-meta">Workspace production, last deploy 14m ago</p>
  </div>
  <dl class="detail tabular">
    <dt>Region</dt>
    <dd>syd-1</dd>
    <dt>Last deploy</dt>
    <dd>14m ago</dd>
    <dt>Open incidents</dt>
    <dd>0</dd>
  </dl>
</div>`,
    },
  ],

  /* ==========================================================================
     SaaS metric and KPI summary
     ========================================================================== */
  'kpi-metric-cards': [
    {
      id: 'anchored',
      name: 'Anchored',
      description:
        'The lead metric leaves the grid and becomes a full width tile with its own trend line, and the three supporting metrics form a separate three up row beneath it.',
      guidance:
        'Use when one number is the number and the other three explain it, which is the honest shape for most dashboards and the reason law 8 exists. Splitting the anchor out of the grid rather than spanning it inside the grid lets the anchor carry a sparkline without stretching the row it sits in. Do not give the three supporting tiles their own sparklines as well, or the hierarchy collapses back into four identical cards.',
      html: `<div class="grid grid-cols-1 gap-4">
  <div class="kpi-card is-primary">
    <span class="kpi-label">Monthly Recurring Revenue</span>
    <div class="flex items-end justify-between gap-4">
      <span class="kpi-value">$124,500</span>
      <svg class="spark" viewBox="0 0 120 40" fill="none" aria-hidden="true">
        <polyline points="0,32 17,29 34,30 51,22 68,24 85,15 102,13 120,6" stroke="currentColor" stroke-width="1.75" />
      </svg>
    </div>
    <span class="kpi-trend is-up">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      +14.2% from last month
    </span>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="kpi-card">
      <span class="kpi-label">Active Subscriptions</span>
      <span class="kpi-value">1,482</span>
      <span class="kpi-trend is-up">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        +8.4%
      </span>
    </div>
    <div class="kpi-card">
      <span class="kpi-label">Churn Rate</span>
      <span class="kpi-value">1.18%</span>
      <span class="kpi-trend is-down">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
        -0.3% improvement
      </span>
    </div>
    <div class="kpi-card">
      <span class="kpi-label">Agent Queries / Day</span>
      <span class="kpi-value">4.8M</span>
      <span class="kpi-trend is-up">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        +42% spike
      </span>
    </div>
  </div>
</div>`,
    },
    {
      id: 'two-column',
      name: 'Two column',
      description:
        'Two metrics take the whole row as sparkline tiles, each pairing its number with seven days of history instead of a bare percentage.',
      guidance:
        'Use when the dashboard answers two questions and padding it out to four tiles would invent two more. The spark-stat tile rescales the metric through the component token, so the two numbers read smaller than an anchored primary and larger than a supporting tile with no hand sizing anywhere. Do not use it for four metrics: two rows of two is the flat identical grid that law 8 exists to prevent.',
      html: `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="spark-stat">
    <div>
      <span class="kpi-label">Monthly Recurring Revenue</span>
      <div class="kpi-value">$124,500</div>
      <span class="kpi-trend is-up">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        +14.2% from last month
      </span>
    </div>
    <svg class="spark" viewBox="0 0 120 40" fill="none" aria-hidden="true">
      <polyline points="0,32 17,29 34,30 51,22 68,24 85,15 102,13 120,6" stroke="currentColor" stroke-width="1.75" />
    </svg>
  </div>
  <div class="spark-stat">
    <div>
      <span class="kpi-label">Active Subscriptions</span>
      <div class="kpi-value">1,482</div>
      <span class="kpi-trend is-up">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        +8.4%
      </span>
    </div>
    <svg class="spark" viewBox="0 0 120 40" fill="none" aria-hidden="true">
      <polyline points="0,30 17,27 34,28 51,24 68,19 85,20 102,14 120,11" stroke="currentColor" stroke-width="1.75" />
    </svg>
  </div>
</div>`,
    },
    {
      id: 'inline-row',
      name: 'Inline row',
      description:
        'The cards disappear entirely: each metric hangs from a shared hairline in one band, with the lead figure set larger than the rest.',
      guidance:
        'Use inside something that is already a box, a panel, a modal or a report section, where four bordered tiles would be four boxes inside a box. The band puts every figure on one baseline through the shared hairline, so mixed sizes still read as one row, and is-primary on the lead stat does the scaling. Do not use it as the top level summary of an otherwise flat page, where the tiles are the only structure the screen has.',
      html: `<div class="stats-band">
  <div class="stat is-primary">
    <span class="stat-label">Monthly Recurring Revenue</span>
    <span class="stat-value">$124,500</span>
    <span class="kpi-trend is-up mt-2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      +14.2% from last month
    </span>
  </div>
  <div class="stat">
    <span class="stat-label">Active Subscriptions</span>
    <span class="stat-value">1,482</span>
    <span class="kpi-trend is-up mt-2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      +8.4%
    </span>
  </div>
  <div class="stat">
    <span class="stat-label">Churn Rate</span>
    <span class="stat-value">1.18%</span>
    <span class="kpi-trend is-down mt-2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>
      -0.3% improvement
    </span>
  </div>
  <div class="stat">
    <span class="stat-label">Agent Queries / Day</span>
    <span class="stat-value">4.8M</span>
    <span class="kpi-trend is-up mt-2">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      +42% spike
    </span>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Stats dashboard row
     ========================================================================== */
  'stats-dashboard': [
    {
      id: 'table-rows',
      name: 'Table rows',
      description:
        'The four tiles become four rows of a compact table, with the value and the change as their own right aligned columns.',
      guidance:
        'Use when the reader compares metrics against each other rather than glancing at one, and when the list will grow past four: a table takes a fifth row without relayout, a tile grid does not. The numeric columns carry cell-num so the digits align on the decimal and the change column reads as a column rather than a caption. Keep the table inside table-container, because a metric table is wider than a phone and must scroll rather than squeeze.',
      html: `<div class="table-container">
  <table class="table table-compact table-hover">
    <thead>
      <tr>
        <th scope="col">Metric</th>
        <th class="cell-num" scope="col">This month</th>
        <th class="cell-num" scope="col">Change</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-semibold">Total Revenue</td>
        <td class="cell-num">$48,290</td>
        <td class="cell-num"><span class="kpi-trend is-up">+12.3% vs last month</span></td>
      </tr>
      <tr>
        <td class="font-semibold">Active Users</td>
        <td class="cell-num">2,847</td>
        <td class="cell-num"><span class="kpi-trend is-up">+8.1% vs last month</span></td>
      </tr>
      <tr>
        <td class="font-semibold">Bounce Rate</td>
        <td class="cell-num">24.6%</td>
        <td class="cell-num"><span class="kpi-trend is-down">-3.2% vs last month</span></td>
      </tr>
      <tr>
        <td class="font-semibold">Avg. Session</td>
        <td class="cell-num">4m 32s</td>
        <td class="cell-num"><span class="kpi-trend is-up">+18.7% vs last month</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    {
      id: 'sparkline-column',
      name: 'Sparkline column',
      description:
        'The lead metric keeps a tile and the three supporting metrics become hairline rows, each with its own sparkline between the name and the figure.',
      guidance:
        'Use when the shape of each metric over the week matters as much as its current value, for example a weekly review rather than a live console. The bar-row grid gives the three rows one column geometry, so the names, the sparklines and the figures line up without any hand set widths. Do not put a sparkline on the lead tile and on every row at the same weight, or the eye has four charts and no anchor.',
      html: `<div class="flex flex-col gap-4">
  <div class="spark-stat">
    <div>
      <span class="kpi-label">Total Revenue</span>
      <div class="kpi-value">$48,290</div>
      <span class="kpi-trend is-up">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        +12.3% vs last month
      </span>
    </div>
    <svg class="spark" viewBox="0 0 120 40" fill="none" aria-hidden="true">
      <polyline points="0,31 17,28 34,29 51,21 68,23 85,14 102,12 120,5" stroke="currentColor" stroke-width="1.75" />
    </svg>
  </div>
  <div class="bars">
    <div class="bar-row">
      <span>Active Users</span>
      <svg class="spark w-full" viewBox="0 0 120 40" fill="none" aria-hidden="true">
        <polyline points="0,30 17,26 34,28 51,23 68,20 85,21 102,15 120,12" stroke="currentColor" stroke-width="1.75" />
      </svg>
      <span>2,847</span>
    </div>
    <div class="bar-row">
      <span>Bounce Rate</span>
      <svg class="spark w-full" viewBox="0 0 120 40" fill="none" aria-hidden="true">
        <polyline points="0,12 17,16 34,14 51,19 68,22 85,21 102,26 120,28" stroke="currentColor" stroke-width="1.75" />
      </svg>
      <span>24.6%</span>
    </div>
    <div class="bar-row">
      <span>Avg. Session</span>
      <svg class="spark w-full" viewBox="0 0 120 40" fill="none" aria-hidden="true">
        <polyline points="0,28 17,25 34,24 51,20 68,18 85,14 102,13 120,9" stroke="currentColor" stroke-width="1.75" />
      </svg>
      <span>4m 32s</span>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Data grid
     ========================================================================== */
  'data-grid': [
    {
      id: 'dense',
      name: 'Dense',
      description:
        'Cell padding drops to the compact scale and the density scope tightens every row, so roughly half again as many rows fit the same height.',
      guidance:
        'Use for an operations console where the reader scans for one row among many and vertical space is the scarce resource. Density here is a wrapper scope, not a token override: density-compact and table-compact both re-space the grid through the table cell padding property, so a single class changes every cell. Do not reach for this when the rows carry two lines of content each, because compact padding on a two line cell reads as a bug.',
      html: `<div class="density-compact">
  <div class="table-container">
    <table class="table table-hover table-sticky table-compact">
      <thead>
        <tr>
          <th scope="col">Service</th>
          <th scope="col">Region</th>
          <th class="cell-num" scope="col">p95 ms</th>
          <th class="cell-num" scope="col">Requests, 24h</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>api-gateway</td>
          <td>syd-1</td>
          <td class="cell-num">142</td>
          <td class="cell-num">1,284,902</td>
          <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
        </tr>
        <tr>
          <td>auth</td>
          <td>syd-1</td>
          <td class="cell-num">88</td>
          <td class="cell-num">402,118</td>
          <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
        </tr>
        <tr>
          <td>billing-worker</td>
          <td>fra-2</td>
          <td class="cell-num">1,204</td>
          <td class="cell-num">18,440</td>
          <td><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Degraded</span></td>
        </tr>
        <tr>
          <td>search</td>
          <td>sin-1</td>
          <td class="cell-num">210</td>
          <td class="cell-num">96,733</td>
          <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
        </tr>
        <tr>
          <td>image-resize</td>
          <td>sin-1</td>
          <td class="cell-num">640</td>
          <td class="cell-num">51,207</td>
          <td><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Degraded</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
    },
    {
      id: 'card-rows',
      name: 'Card rows',
      description:
        'Above md the grid is a table; below md the same rows render as stacked label and value pairs, one block per record.',
      guidance:
        'Use when the grid has more than about four columns and the reader genuinely uses it on a phone, where a five column table either squeezes or scrolls sideways past the column that matters. Both renderings carry the same data, so the phone view is a layout, not a reduced feature: keep them in step or the two will drift. The detail list is a real dl, which is what makes the label and value pairing announce correctly.',
      html: `<div>
  <div class="hidden md:block">
    <div class="table-container">
      <table class="table table-hover table-compact">
        <thead>
          <tr>
            <th scope="col">Service</th>
            <th scope="col">Region</th>
            <th class="cell-num" scope="col">p95 ms</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>api-gateway</td>
            <td>syd-1</td>
            <td class="cell-num">142</td>
            <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
          </tr>
          <tr>
            <td>auth</td>
            <td>syd-1</td>
            <td class="cell-num">88</td>
            <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
          </tr>
          <tr>
            <td>billing-worker</td>
            <td>fra-2</td>
            <td class="cell-num">1,204</td>
            <td><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Degraded</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="md:hidden flex flex-col gap-4">
    <dl class="detail border-t pt-4">
      <dt>Service</dt>
      <dd>api-gateway</dd>
      <dt>Region</dt>
      <dd>syd-1</dd>
      <dt>p95 ms</dt>
      <dd>142</dd>
      <dt>Status</dt>
      <dd><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></dd>
    </dl>
    <dl class="detail border-t pt-4">
      <dt>Service</dt>
      <dd>auth</dd>
      <dt>Region</dt>
      <dd>syd-1</dd>
      <dt>p95 ms</dt>
      <dd>88</dd>
      <dt>Status</dt>
      <dd><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></dd>
    </dl>
    <dl class="detail border-t pt-4">
      <dt>Service</dt>
      <dd>billing-worker</dd>
      <dt>Region</dt>
      <dd>fra-2</dd>
      <dt>p95 ms</dt>
      <dd>1,204</dd>
      <dt>Status</dt>
      <dd><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Degraded</span></dd>
    </dl>
  </div>
</div>`,
    },
    {
      id: 'split-header',
      name: 'Split header',
      description:
        'The filter tags and the search field move inside the table container, above the header row, sharing the container border instead of carrying one of their own.',
      guidance:
        'Use when the toolbar only ever acts on this one table, which is the usual case for a resource list. The toolbar drops its border and radius through border-0, border-b and rounded-none so the container shows one outline and one hairline, not a box floating above another box. Every filter tag mirrors its is-active state with aria-pressed inside a labelled group, because a tinted pill announces nothing on its own.',
      html: `<div class="table-container">
  <div class="filter-toolbar border-0 border-b rounded-none">
    <div class="filter-tags" role="group" aria-label="Filter services">
      <button type="button" class="filter-tag is-active" aria-pressed="true">All (5)</button>
      <button type="button" class="filter-tag" aria-pressed="false">Healthy</button>
      <button type="button" class="filter-tag" aria-pressed="false">Degraded</button>
    </div>
    <div class="flex items-center gap-2">
      <label class="sr-only" for="data-grid-split-header-search">Filter services</label>
      <input type="search" class="input max-w-xs" id="data-grid-split-header-search" placeholder="Filter services..." />
    </div>
  </div>
  <table class="table table-hover table-sticky table-compact">
    <thead>
      <tr>
        <th scope="col">Service</th>
        <th scope="col">Region</th>
        <th class="cell-num" scope="col">p95 ms</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>api-gateway</td>
        <td>syd-1</td>
        <td class="cell-num">142</td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
      </tr>
      <tr>
        <td>auth</td>
        <td>syd-1</td>
        <td class="cell-num">88</td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
      </tr>
      <tr>
        <td>billing-worker</td>
        <td>fra-2</td>
        <td class="cell-num">1,204</td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Degraded</span></td>
      </tr>
      <tr>
        <td>search</td>
        <td>sin-1</td>
        <td class="cell-num">210</td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    {
      id: 'selectable',
      name: 'Selectable',
      description:
        'A checkbox column leads every row and a sticky bulk action bar sits under the table, carrying the count and the actions that apply to the selection.',
      guidance:
        'Use when the reader acts on several rows at once: restart, scale, delete, export. Selected rows carry aria-selected rather than a class alone, and each checkbox has its own label naming the row, because four checkboxes called Select is four identical announcements. The bar is sticky rather than fixed so it stays inside the grid it belongs to, and it uses a uniform border, never a coloured edge stripe.',
      html: `<div class="flex flex-col gap-4">
  <div class="table-container">
    <table class="table table-hover table-sticky table-compact">
      <thead>
        <tr>
          <th scope="col" class="w-10">
            <label class="checkbox"><input type="checkbox" class="checkbox-input" /><span class="sr-only">Select all services</span></label>
          </th>
          <th scope="col">Service</th>
          <th scope="col">Region</th>
          <th class="cell-num" scope="col">p95 ms</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr aria-selected="true">
          <td><label class="checkbox"><input type="checkbox" class="checkbox-input" checked /><span class="sr-only">Select api-gateway</span></label></td>
          <td>api-gateway</td>
          <td>syd-1</td>
          <td class="cell-num">142</td>
          <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
        </tr>
        <tr aria-selected="true">
          <td><label class="checkbox"><input type="checkbox" class="checkbox-input" checked /><span class="sr-only">Select auth</span></label></td>
          <td>auth</td>
          <td>syd-1</td>
          <td class="cell-num">88</td>
          <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
        </tr>
        <tr aria-selected="true">
          <td><label class="checkbox"><input type="checkbox" class="checkbox-input" checked /><span class="sr-only">Select billing-worker</span></label></td>
          <td>billing-worker</td>
          <td>fra-2</td>
          <td class="cell-num">1,204</td>
          <td><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Degraded</span></td>
        </tr>
        <tr>
          <td><label class="checkbox"><input type="checkbox" class="checkbox-input" /><span class="sr-only">Select search</span></label></td>
          <td>search</td>
          <td>sin-1</td>
          <td class="cell-num">210</td>
          <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="bulk-bar" role="status">
    <span class="bulk-bar-count">3 selected</span>
    <button type="button" class="btn btn-ghost btn-xs">Clear</button>
    <div class="bulk-bar-actions">
      <button type="button" class="btn btn-outline btn-sm">Restart</button>
      <button type="button" class="btn btn-outline btn-sm">Scale</button>
      <button type="button" class="btn btn-danger btn-sm">Delete</button>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Data table with striping
     ========================================================================== */
  'table-data': [
    {
      id: 'two-line',
      name: 'Two line',
      description:
        'The first cell carries the repository name over a muted second line, which absorbs the environment column and drops the table from five columns to four.',
      guidance:
        'Use when one column is the identity of the row and another only qualifies it: repository and environment, person and role, file and path. Both lines truncate rather than wrap so the row height stays constant down the table, which is what makes a long list scannable. Keep the secondary line at text-xs and text-muted: at the same size as the primary it reads as a second value and the hierarchy is gone.',
      html: `<div class="table-container">
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Repository</th>
        <th scope="col">Branch</th>
        <th scope="col">Status</th>
        <th scope="col">Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="font-semibold truncate">llmcss-core</div>
          <div class="text-xs text-muted truncate">Production, edge-syd</div>
        </td>
        <td><code>main</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Active</span></td>
        <td>2m ago</td>
      </tr>
      <tr>
        <td>
          <div class="font-semibold truncate">llmcss-docs</div>
          <div class="text-xs text-muted truncate">Staging, edge-syd</div>
        </td>
        <td><code>preview/v1</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip" aria-hidden="true"></span>Building</span></td>
        <td>15m ago</td>
      </tr>
      <tr>
        <td>
          <div class="font-semibold truncate">llmcss-mcp</div>
          <div class="text-xs text-muted truncate">Edge, sin-1</div>
        </td>
        <td><code>feat/tools</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Queued</span></td>
        <td>1h ago</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    {
      id: 'sticky-header',
      name: 'Sticky header',
      description:
        'The container takes a fixed height and scrolls vertically, so the header row pins while the body moves under it.',
      guidance:
        'Use when the table is longer than a screen and the reader needs the column names at row forty as much as at row one. The height cap belongs on the container, not the table, because table-sticky pins the header against its scroll container and a table with no scrolling ancestor has nothing to pin to. Do not cap the height when the list is short: an empty scroll area under four rows looks like a loading failure.',
      html: `<div class="table-container h-64 overflow-y-auto">
  <table class="table table-hover table-sticky">
    <thead>
      <tr>
        <th scope="col" aria-sort="ascending">Repository</th>
        <th scope="col">Environment</th>
        <th scope="col">Branch</th>
        <th scope="col">Status</th>
        <th scope="col">Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-semibold">llmcss-core</td>
        <td>Production</td>
        <td><code>main</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Active</span></td>
        <td>2m ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-docs</td>
        <td>Staging</td>
        <td><code>preview/v1</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip" aria-hidden="true"></span>Building</span></td>
        <td>15m ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-mcp</td>
        <td>Edge</td>
        <td><code>feat/tools</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Queued</span></td>
        <td>1h ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-site</td>
        <td>Production</td>
        <td><code>main</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Active</span></td>
        <td>3h ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-vscode</td>
        <td>Staging</td>
        <td><code>feat/hover</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Queued</span></td>
        <td>6h ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-figma</td>
        <td>Preview</td>
        <td><code>feat/tokens</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Active</span></td>
        <td>Yesterday</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-registry</td>
        <td>Edge</td>
        <td><code>main</code></td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Active</span></td>
        <td>Yesterday</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    {
      id: 'compact-numeric',
      name: 'Compact numeric',
      description:
        'Numeric columns move to the end of each cell on tabular figures, padding drops to the compact scale and the striping is gone.',
      guidance:
        'Use for a table people read as numbers rather than as records: usage, latency, cost, counts. Right alignment plus tabular figures is what lets the eye compare magnitudes down a column, and it matters more than any amount of borrowed zebra striping, which is why the stripes go. Keep the text columns left aligned: centring a mixed table is the fastest way to make every column illegible.',
      html: `<div class="table-container">
  <table class="table table-compact table-hover">
    <thead>
      <tr>
        <th scope="col">Repository</th>
        <th scope="col">Environment</th>
        <th class="cell-num" scope="col">Builds</th>
        <th class="cell-num" scope="col">p95 ms</th>
        <th class="cell-num" scope="col">Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-semibold">llmcss-core</td>
        <td>Production</td>
        <td class="cell-num">1,284</td>
        <td class="cell-num">142</td>
        <td class="cell-num tabular">2m ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-docs</td>
        <td>Staging</td>
        <td class="cell-num">318</td>
        <td class="cell-num">88</td>
        <td class="cell-num tabular">15m ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-mcp</td>
        <td>Edge</td>
        <td class="cell-num">96</td>
        <td class="cell-num">1,204</td>
        <td class="cell-num tabular">1h ago</td>
      </tr>
      <tr>
        <td class="font-semibold">llmcss-site</td>
        <td>Production</td>
        <td class="cell-num">742</td>
        <td class="cell-num">210</td>
        <td class="cell-num tabular">3h ago</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
  ],

  /* ==========================================================================
     Settings list
     ========================================================================== */
  'settings-list': [
    {
      id: 'two-column',
      name: 'Two column',
      description:
        'Each row becomes a fixed two column grid from md up, so every control lands on the same vertical line no matter how long its label runs.',
      guidance:
        'Use when the descriptions vary in length, which is every real settings screen: the default flex row lets the control drift left as the text grows, and a column of controls that does not line up reads as carelessness. Below md the grid folds to one column and the control sits under its description rather than being squeezed beside it. Keep the row alignment at items-start so a three line description does not drag its switch down the page.',
      html: `<div class="settings-list max-w-2xl">
  <div class="settings-row grid grid-cols-1 md:grid-cols-2 items-start">
    <div>
      <div class="font-medium">Deploy previews</div>
      <p class="text-secondary">Open a preview URL on every push to main.</p>
    </div>
    <div class="flex md:justify-end">
      <label class="switch"><input type="checkbox" class="switch-input" checked /><span class="switch-track"><span class="switch-thumb"></span></span><span class="sr-only">Deploy previews</span></label>
    </div>
  </div>
  <div class="settings-row grid grid-cols-1 md:grid-cols-2 items-start">
    <div>
      <div class="font-medium">Failure mail</div>
      <p class="text-secondary">Email the owner when a run exits non-zero.</p>
    </div>
    <div class="flex md:justify-end">
      <label class="switch"><input type="checkbox" class="switch-input" /><span class="switch-track"><span class="switch-thumb"></span></span><span class="sr-only">Failure mail</span></label>
    </div>
  </div>
  <div class="settings-row grid grid-cols-1 md:grid-cols-2 items-start">
    <div>
      <div class="font-medium">Public registry</div>
      <p class="text-secondary">Allow anonymous reads of free components.</p>
    </div>
    <div class="flex md:justify-end">
      <label class="switch"><input type="checkbox" class="switch-input" checked /><span class="switch-track"><span class="switch-thumb"></span></span><span class="sr-only">Public registry</span></label>
    </div>
  </div>
</div>`,
    },
    {
      id: 'grouped-sections',
      name: 'Grouped sections',
      description:
        'The rows split into named groups, each group flush under its own heading, with one labelled hairline separating them instead of one box per group.',
      guidance:
        'Use once the list passes about eight rows and the reader is looking for a named setting rather than reading down the whole page. The groups drop their border through border-0 and rounded-none, because a bordered list under a heading inside a settings page is a box inside a box; the labelled divider carries the separation instead. Lead each group with a plain heading and no eyebrow pill above it.',
      html: `<div class="max-w-2xl">
  <h3 class="section-title text-lg">Deployments</h3>
  <div class="settings-list border-0 rounded-none mt-3">
    <div class="settings-row">
      <div>
        <div class="font-medium">Deploy previews</div>
        <p class="text-secondary">Open a preview URL on every push to main.</p>
      </div>
      <label class="switch"><input type="checkbox" class="switch-input" checked /><span class="switch-track"><span class="switch-thumb"></span></span><span class="sr-only">Deploy previews</span></label>
    </div>
    <div class="settings-row">
      <div>
        <div class="font-medium">Failure mail</div>
        <p class="text-secondary">Email the owner when a run exits non-zero.</p>
      </div>
      <label class="switch"><input type="checkbox" class="switch-input" /><span class="switch-track"><span class="switch-thumb"></span></span><span class="sr-only">Failure mail</span></label>
    </div>
  </div>
  <div class="divider">Registry</div>
  <div class="settings-list border-0 rounded-none">
    <div class="settings-row">
      <div>
        <div class="font-medium">Public registry</div>
        <p class="text-secondary">Allow anonymous reads of free components.</p>
      </div>
      <label class="switch"><input type="checkbox" class="switch-input" checked /><span class="switch-track"><span class="switch-thumb"></span></span><span class="sr-only">Public registry</span></label>
    </div>
  </div>
</div>`,
    },
    {
      id: 'inline-edit',
      name: 'Inline edit',
      description:
        'Every row opens its own field and save action in place, so the switch row becomes an editable row and nothing links out to a sub page.',
      guidance:
        'Use when the settings are values rather than toggles: a domain, an address, a namespace. Each field needs a real label and its hint sits in form-hint under the label, not as placeholder text, because placeholder text disappears the moment the reader starts typing. Keep the save action per row rather than one save at the bottom: a page wide save invites the reader to change five things and find out which one failed.',
      html: `<form class="settings-list max-w-2xl">
  <div class="settings-row flex-col items-stretch gap-3">
    <div>
      <label class="form-label" for="settings-list-inline-edit-domain">Deploy previews</label>
      <p class="form-hint">Open a preview URL on every push to main.</p>
    </div>
    <div class="flex gap-2">
      <input type="text" class="input" id="settings-list-inline-edit-domain" value="preview.llmcss.io" />
      <button type="button" class="btn btn-outline btn-xs">Save</button>
    </div>
  </div>
  <div class="settings-row flex-col items-stretch gap-3">
    <div>
      <label class="form-label" for="settings-list-inline-edit-mail">Failure mail</label>
      <p class="form-hint">Email the owner when a run exits non-zero.</p>
    </div>
    <div class="flex gap-2">
      <input type="email" class="input" id="settings-list-inline-edit-mail" value="ops@meridian.dev" />
      <button type="button" class="btn btn-outline btn-xs">Save</button>
    </div>
  </div>
  <div class="settings-row flex-col items-stretch gap-3">
    <div>
      <label class="form-label" for="settings-list-inline-edit-registry">Public registry</label>
      <p class="form-hint">Allow anonymous reads of free components.</p>
    </div>
    <div class="flex gap-2">
      <input type="text" class="input" id="settings-list-inline-edit-registry" value="@meridian/ui" />
      <button type="button" class="btn btn-outline btn-xs">Save</button>
    </div>
  </div>
</form>`,
    },
  ],

  /* ==========================================================================
     Empty state
     ========================================================================== */
  'empty-state': [
    {
      id: 'inline',
      name: 'Inline',
      description:
        'The block becomes one row: icon, copy and action on a single line, with the tall vertical padding cut back to py-6.',
      guidance:
        'Use inside a panel, a tab or a table container that already has a shape, where a twelve rem tall centred block would push everything below it off the screen. The icon drops to the text size and the description loses its bottom margin, so the row is the height of its copy and nothing else. Do not use it as the empty state for a whole page, where the reader needs the pause that the centred block provides.',
      html: `<div class="empty-state flex-row items-center text-start py-6 gap-4 border border-dashed rounded-lg">
  <svg class="empty-state-icon size-6 mb-0 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
  </svg>
  <div class="flex-1">
    <h3 class="empty-state-title">No documents yet</h3>
    <p class="empty-state-description mb-0 max-w-none">Create your first document to get started. Documents are automatically saved and synced across your workspace.</p>
  </div>
  <button class="btn btn-primary btn-sm shrink-0" type="button">Create Document</button>
</div>`,
    },
    {
      id: 'split-illustration',
      name: 'Split illustration',
      description:
        'Copy takes the left column and a bordered surface takes the right, holding the three templates a first document can start from.',
      guidance:
        'Use on a wide screen where a centred block leaves two thirds of the row empty and the product has something concrete to show next. The right panel is a surface with a hairline rather than a grey rectangle, and it holds real starting points, because a placeholder shape in a shipped empty state teaches the reader nothing. The outer dashed border is dropped here: the panel is already the box, and two boxes would nest.',
      html: `<div class="empty-state grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-start py-6">
  <div>
    <h3 class="empty-state-title">No documents yet</h3>
    <p class="empty-state-description">Create your first document to get started. Documents are automatically saved and synced across your workspace.</p>
    <button class="btn btn-primary btn-sm" type="button">Create Document</button>
  </div>
  <div class="surface-1 border rounded-lg aspect-video p-4 flex flex-col justify-center gap-3">
    <p class="text-xs text-muted">Start from</p>
    <a class="flex items-center gap-2 text-sm text-primary" href="/documents/new?template=blank">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Blank document
    </a>
    <a class="flex items-center gap-2 text-sm text-primary" href="/documents/new?template=incident">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Incident review
    </a>
    <a class="flex items-center gap-2 text-sm text-primary" href="/documents/new?template=runbook">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Deploy runbook
    </a>
  </div>
</div>`,
    },
    {
      id: 'action-list',
      name: 'Action list',
      description:
        'The single button becomes three suggested next actions as hairline rows, each with its own control, and the icon is dropped.',
      guidance:
        'Use when there is more than one reasonable first move and picking one for the reader would be guessing: create, import, or start from a template. The checklist rows are separated by hairlines and carry no border of their own, so the block stays one box. Do not stretch this past three rows: a zero state that opens with a menu of six choices is a worse zero state than one with a single button.',
      html: `<div class="empty-state items-stretch text-start max-w-lg border border-dashed rounded-lg">
  <h3 class="empty-state-title">No documents yet</h3>
  <p class="empty-state-description mb-4">Create your first document to get started. Documents are automatically saved and synced across your workspace.</p>
  <ul class="checklist">
    <li class="checklist-item">
      <span class="checklist-mark">1</span>
      <span class="checklist-label">Create a blank document</span>
      <button type="button" class="btn btn-outline btn-xs">Create</button>
    </li>
    <li class="checklist-item">
      <span class="checklist-mark">2</span>
      <span class="checklist-label">Import Markdown from a repository</span>
      <button type="button" class="btn btn-outline btn-xs">Import</button>
    </li>
    <li class="checklist-item">
      <span class="checklist-mark">3</span>
      <span class="checklist-label">Start from the deploy runbook template</span>
      <button type="button" class="btn btn-outline btn-xs">Browse</button>
    </li>
  </ul>
</div>`,
    },
  ],

  /* ==========================================================================
     Error state
     ========================================================================== */
  'error-state': [
    {
      id: 'inline-row',
      name: 'Inline row',
      description:
        'The centred block becomes one alert row, icon then message then retry, sitting directly above the region that failed.',
      guidance:
        'Use when part of the page loaded and part did not: the table is there, the chart is not. The alert carries one uniform hairline border and a tinted surface, never a thick coloured stripe down its left edge, which is the 2012 alert tell law 3 names. It is announced with role alert because it appears without the reader asking, and the retry sits inside the row so the fix is where the failure is.',
      html: `<div class="alert alert-danger" role="alert">
  <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
  <div class="flex-1">
    <strong class="font-semibold">Could not load deployments.</strong> The API returned 503 twice. Nothing was changed.
  </div>
  <button type="button" class="btn btn-outline btn-xs shrink-0">Retry</button>
</div>`,
    },
    {
      id: 'full-page',
      name: 'Full page',
      description:
        'The block centres in the full viewport height and gains the request id in mono type between the message and the two actions.',
      guidance:
        'Use when nothing on the route loaded and there is no surviving interface to sit inside, which is the only case that earns a whole screen. The request id is the thing support will ask for, so it belongs on the screen in mono type rather than in a console log the reader cannot reach. Keep both actions: retry for the common case, copy the id for the one where retrying will not help.',
      html: `<div class="auth-wrap">
  <div class="empty-state is-error max-w-lg">
    <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
    <h1 class="empty-state-title text-2xl">Could not load deployments</h1>
    <p class="empty-state-description mb-4">The API returned 503 twice. Nothing was changed. Try again, or send the request id to support.</p>
    <p class="text-xs text-muted font-mono">req_01JF8Q2K3M7X4V</p>
    <div class="flex gap-2 justify-center mt-4">
      <button type="button" class="btn btn-primary btn-sm">Retry</button>
      <button type="button" class="btn btn-outline btn-sm">Copy request id</button>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Authentication login card
     ========================================================================== */
  'auth-login-card': [
    {
      id: 'split-panel',
      name: 'Split panel',
      description:
        'The card keeps the left column and a quiet brand panel takes the right, stacking back to one column below lg.',
      guidance:
        'Use when the sign in page is also the first impression and there is something true to say beside the form. The right panel is a surface shift with no border of its own, because a second bordered box beside the card is two cards arguing; it is also hidden below lg rather than stacked, since nobody scrolls past a form to read a strapline. Keep the form itself untouched: the panel is decoration and the card is the product.',
      html: `<div class="auth-wrap">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl w-full items-center">
    <div class="auth-card max-w-full">
      <div class="text-center mb-6">
        <h3 class="card-title text-xl">Welcome back</h3>
        <p class="text-sm text-secondary mt-1">Enter your credentials to access your agent workspace.</p>
      </div>
      <form class="flex flex-col gap-4">
        <div class="form-group mb-0">
          <label class="form-label" for="auth-split-panel-email">Email</label>
          <input type="email" id="auth-split-panel-email" class="input" placeholder="you@domain.com" required />
        </div>
        <div class="form-group mb-0">
          <div class="flex justify-between items-center">
            <label class="form-label" for="auth-split-panel-pass">Password</label>
            <a href="#forgot" class="text-xs text-accent">Forgot password?</a>
          </div>
          <input type="password" id="auth-split-panel-pass" class="input" required />
        </div>
        <button type="submit" class="btn btn-primary w-full mt-2">Sign In</button>
      </form>
      <div class="text-center mt-6 pt-4 border-t">
        <p class="text-xs text-secondary">Don't have an account? <a href="#signup" class="text-accent font-semibold">Sign up</a></p>
      </div>
    </div>
    <div class="surface-1 rounded-xl p-8 hidden lg:block">
      <p class="title title-sm">Every deploy, explained before it ships.</p>
      <p class="text-sm text-secondary mt-3">Meridian runs the review, the rollout and the rollback from one workspace, so the person on call is never reading a diff for the first time.</p>
      <dl class="detail mt-6">
        <dt>Regions</dt>
        <dd>3</dd>
        <dt>Deploys today</dt>
        <dd>48</dd>
        <dt>p95 latency</dt>
        <dd>142 ms</dd>
      </dl>
    </div>
  </div>
</div>`,
    },
    {
      id: 'centered-minimal',
      name: 'Centered minimal',
      description:
        'The card is gone: the form sits on the page background at max-w-sm with one hairline between the fields and the sign in button.',
      guidance:
        'Use when the sign in screen is the whole page and there is nothing else on it, which makes the card border pure decoration. The hairline above the action does the work the card footer used to do, separating the things you type from the thing you press. Do not use it when the form sits inside another page or a modal, where the background gives it no edge at all and the fields float.',
      html: `<div class="auth-wrap">
  <div class="max-w-sm w-full">
    <div class="text-center">
      <h3 class="card-title text-xl">Welcome back</h3>
      <p class="text-sm text-secondary mt-1">Enter your credentials to access your agent workspace.</p>
    </div>
    <form class="mt-6">
      <div class="form-group">
        <label class="form-label" for="auth-centered-minimal-email">Email</label>
        <input type="email" id="auth-centered-minimal-email" class="input" placeholder="you@domain.com" required />
      </div>
      <div class="form-group">
        <div class="flex justify-between items-center">
          <label class="form-label" for="auth-centered-minimal-pass">Password</label>
          <a href="#forgot" class="text-xs text-accent">Forgot password?</a>
        </div>
        <input type="password" id="auth-centered-minimal-pass" class="input" required />
      </div>
      <hr class="divider" />
      <button type="submit" class="btn btn-primary w-full">Sign In</button>
    </form>
    <p class="text-xs text-secondary text-center mt-6">Don't have an account? <a href="#signup" class="text-accent font-semibold">Sign up</a></p>
  </div>
</div>`,
    },
    {
      id: 'stacked-providers',
      name: 'Stacked providers',
      description:
        'Three provider buttons take the top of the card, a labelled hairline splits the card in half and the email field follows underneath.',
      guidance:
        'Use when most people sign in with a provider and the email field is the fallback, which is the usual split for a developer product. Ordering matters more than styling here: putting the providers first tells the reader which path is expected without making the other one look broken. The divider carries the word that explains the choice, and nothing sits above the heading pretending to be a category label.',
      html: `<div class="auth-wrap">
  <div class="auth-card">
    <div class="text-center">
      <h3 class="card-title text-xl">Welcome back</h3>
      <p class="text-sm text-secondary mt-1">Enter your credentials to access your agent workspace.</p>
    </div>
    <div class="flex flex-col gap-2 mt-6">
      <button type="button" class="btn btn-outline w-full">Continue with GitHub</button>
      <button type="button" class="btn btn-outline w-full">Continue with Google</button>
      <button type="button" class="btn btn-outline w-full">Continue with a passkey</button>
    </div>
    <div class="divider">or</div>
    <form class="flex flex-col gap-4">
      <div class="form-group mb-0">
        <label class="form-label" for="auth-stacked-providers-email">Email</label>
        <input type="email" id="auth-stacked-providers-email" class="input" placeholder="you@domain.com" required />
      </div>
      <button type="submit" class="btn btn-primary w-full">Send a sign-in link</button>
    </form>
    <p class="text-xs text-secondary text-center mt-6">Don't have an account? <a href="#signup" class="text-accent font-semibold">Sign up</a></p>
  </div>
</div>`,
    },
    {
      id: 'two-step',
      name: 'Two step',
      description:
        'The single form splits into two panels, the finished email step summarised above a hairline and the code step open below it, with a stepper across the top.',
      guidance:
        'Use for a passwordless or a two factor sign in, where the second step has no meaning until the first one succeeded. The completed step keeps its value on screen with a change control beside it, so the reader can fix a typo without starting again. The step pips are static in both the completed and the current state: a pulsing circle on a step that is simply waiting for input is motion with nothing to report.',
      html: `<div class="auth-wrap">
  <div class="auth-card">
    <div class="stepper">
      <div class="step-item is-completed">
        <div class="step-circle">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <span class="step-label">Email</span>
      </div>
      <div class="step-item is-active">
        <div class="step-circle">2</div>
        <span class="step-label">Code</span>
      </div>
    </div>
    <div class="text-center mt-6">
      <h3 class="card-title text-xl">Welcome back</h3>
      <p class="text-sm text-secondary mt-1">Enter your credentials to access your agent workspace.</p>
    </div>
    <div class="level mt-6">
      <div>
        <div class="font-medium">Email</div>
        <p class="text-xs text-muted">ana@meridian.dev</p>
      </div>
      <button type="button" class="btn btn-ghost btn-xs">Change</button>
    </div>
    <hr class="divider" />
    <form class="flex flex-col gap-4">
      <div class="form-group mb-0">
        <label class="form-label" for="auth-two-step-code">Sign-in code</label>
        <input type="text" id="auth-two-step-code" class="input font-mono tabular" inputmode="numeric" autocomplete="one-time-code" required />
        <p class="form-hint">Six digits, sent a moment ago. The code expires in 10 minutes.</p>
      </div>
      <button type="submit" class="btn btn-primary w-full">Sign In</button>
    </form>
    <p class="text-xs text-secondary text-center mt-6">Don't have an account? <a href="#signup" class="text-accent font-semibold">Sign up</a></p>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Filter toolbar and pill tags
     ========================================================================== */
  'filter-toolbar': [
    {
      id: 'sidebar-facets',
      name: 'Sidebar facets',
      description:
        'The filters leave the bar and become a left rail of grouped checkboxes, leaving the bar with only the applied tags, the sort control and the count.',
      guidance:
        'Use when the facets outgrow one row: more than about six pill tags wrap the toolbar into three lines and stop reading as a row at all. The rail is flush, with section titles and no border of its own, because the toolbar beside it is already the bordered element. The applied tags stay in the bar so the reader can see and clear the current filter without scanning the rail.',
      html: `<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
  <aside>
    <ul class="sidebar-nav p-0">
      <li class="sidebar-section flex flex-col gap-2">
        <span class="sidebar-section-title">Environment</span>
        <label class="checkbox"><input type="checkbox" class="checkbox-input" checked /><span>Production (32)</span></label>
        <label class="checkbox"><input type="checkbox" class="checkbox-input" /><span>Staging (11)</span></label>
        <label class="checkbox"><input type="checkbox" class="checkbox-input" /><span>Preview (5)</span></label>
      </li>
      <li class="sidebar-section flex flex-col gap-2">
        <span class="sidebar-section-title">Result</span>
        <label class="checkbox"><input type="checkbox" class="checkbox-input" checked /><span>Failed (18)</span></label>
        <label class="checkbox"><input type="checkbox" class="checkbox-input" /><span>Passed (30)</span></label>
      </li>
    </ul>
  </aside>
  <div class="md:col-span-3 flex flex-col gap-4">
    <div class="filter-toolbar">
      <div class="filter-tags" role="group" aria-label="Applied filters">
        <span class="text-xs font-medium text-muted">Applied:</span>
        <button type="button" class="filter-tag is-active" aria-pressed="true">Production</button>
        <button type="button" class="filter-tag is-active" aria-pressed="true">Failed</button>
      </div>
      <div class="flex items-center gap-2">
        <label class="sr-only" for="filter-toolbar-sidebar-facets-sort">Sort jobs</label>
        <select class="select" id="filter-toolbar-sidebar-facets-sort">
          <option>Latest</option>
          <option>Oldest</option>
          <option>Duration</option>
        </select>
      </div>
    </div>
    <p class="text-xs text-muted tabular">18 of 48 jobs</p>
  </div>
</div>`,
    },
    {
      id: 'stacked-mobile',
      name: 'Stacked mobile',
      description:
        'The bar becomes two rows: search and sort on the first, the pill tags wrapping on the second with the result count at its end.',
      guidance:
        'Use when the toolbar has to work at 390px, where the default single row puts a search field, a select and four pills on one line and wraps them into an unreadable pile. Each row folds to a column below md and returns to a row above it, so the same markup is a phone layout and a desktop layout. Every tag still mirrors is-active with aria-pressed inside the labelled group: stacking changes the geometry, not the announcement.',
      html: `<div class="filter-toolbar flex-col items-stretch">
  <div class="flex flex-col md:flex-row gap-2 w-full">
    <label class="sr-only" for="filter-toolbar-stacked-mobile-search">Filter jobs</label>
    <input type="search" class="input flex-1" id="filter-toolbar-stacked-mobile-search" placeholder="Filter jobs..." />
    <label class="sr-only" for="filter-toolbar-stacked-mobile-sort">Sort jobs</label>
    <select class="select" id="filter-toolbar-stacked-mobile-sort">
      <option>Latest</option>
      <option>Oldest</option>
      <option>Duration</option>
    </select>
  </div>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full">
    <div class="filter-tags" role="group" aria-label="Filter jobs">
      <button type="button" class="filter-tag is-active" aria-pressed="true">All (48)</button>
      <button type="button" class="filter-tag" aria-pressed="false">Production</button>
      <button type="button" class="filter-tag" aria-pressed="false">Staging</button>
      <button type="button" class="filter-tag" aria-pressed="false">Failed</button>
    </div>
    <span class="text-xs text-muted tabular text-nowrap">48 jobs</span>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Modal dialog box
     ========================================================================== */
  'modal-dialog': [
    {
      id: 'side-sheet',
      name: 'Side sheet',
      description:
        'The same dialog arrives as a right hand drawer pinned to the full height of the viewport instead of a box centred over the page.',
      guidance:
        'Use when the reader needs to keep the page behind the dialog in view, or when the content is a long form that a centred box would turn into a scrolling column with its own scrollbar. The panel keeps role dialog, aria-modal and a title referenced by aria-labelledby, because a drawer that traps focus is a dialog whatever it looks like. Do not use it for a two button confirmation, where a full height panel is a lot of motion for one sentence.',
      html: `<button class="btn btn-primary" type="button" data-ai-toggle="drawer" data-ai-target="#modal-dialog-side-sheet" aria-haspopup="dialog" aria-expanded="false">
  Open Side Sheet
</button>

<div id="modal-dialog-side-sheet" class="drawer">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="modal-dialog-side-sheet-title">
    <div class="drawer-header">
      <h3 class="drawer-title" id="modal-dialog-side-sheet-title">Confirm Database Reset</h3>
      <button type="button" class="close" data-ai-dismiss="drawer" aria-label="Close"></button>
    </div>
    <div class="drawer-body">
      <p>Are you sure you want to reset the staging database? All mock records and schema migrations will revert to initial seed.</p>
      <dl class="detail mt-6">
        <dt>Mock records</dt>
        <dd>18,402</dd>
        <dt>Schema migrations</dt>
        <dd>26</dd>
        <dt>Seed version</dt>
        <dd>v1.14.0</dd>
      </dl>
    </div>
    <div class="drawer-footer flex justify-end gap-3">
      <button class="btn btn-outline" type="button" data-ai-dismiss="drawer">Cancel</button>
      <button class="btn btn-danger" type="button" data-ai-dismiss="drawer">Reset Database</button>
    </div>
  </div>
</div>`,
    },
    {
      id: 'wide-two-column',
      name: 'Wide two column',
      description:
        'The body splits into two columns inside one wider box, the choices on the left and what they will do on the right.',
      guidance:
        'Use when the dialog asks for input whose consequence is worth showing: a destructive action, a bulk edit, a template choice. The right column is a surface shift with no border, because a bordered preview inside a bordered box is exactly the nesting law 1 names; the surface carries the separation instead. Below md the two columns stack, with the choices first, so a phone reader sets the options before reading the outcome.',
      html: `<button class="btn btn-primary" type="button" data-ai-toggle="modal" data-ai-target="#modal-dialog-wide-two-column" aria-haspopup="dialog" aria-expanded="false">
  Open Modal Dialog
</button>

<div id="modal-dialog-wide-two-column" class="modal">
  <div class="modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="modal-box modal-box-lg" role="dialog" aria-modal="true" aria-labelledby="modal-dialog-wide-two-column-title">
    <div class="modal-header">
      <h3 class="modal-title" id="modal-dialog-wide-two-column-title">Confirm Database Reset</h3>
      <button type="button" class="close" data-ai-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body grid grid-cols-1 md:grid-cols-2 gap-6">
      <form class="flex flex-col gap-4">
        <p>Are you sure you want to reset the staging database? All mock records and schema migrations will revert to initial seed.</p>
        <div class="form-group mb-0">
          <label class="form-label" for="modal-dialog-wide-two-column-env">Environment</label>
          <select class="select" id="modal-dialog-wide-two-column-env">
            <option>staging</option>
            <option>preview</option>
          </select>
        </div>
        <label class="checkbox"><input type="checkbox" class="checkbox-input" checked /><span>Keep the seed users</span></label>
      </form>
      <div class="surface-1 rounded-lg p-4">
        <p class="text-xs text-muted">Reverts to initial seed</p>
        <dl class="detail mt-3">
          <dt>Mock records</dt>
          <dd>18,402</dd>
          <dt>Schema migrations</dt>
          <dd>26</dd>
          <dt>Seed version</dt>
          <dd>v1.14.0</dd>
        </dl>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" type="button" data-ai-dismiss="modal">Cancel</button>
      <button class="btn btn-danger" type="button" data-ai-dismiss="modal">Reset Database</button>
    </div>
  </div>
</div>`,
    },
    {
      id: 'compact-confirm',
      name: 'Compact confirm',
      description:
        'The header row is gone and the title moves into the body, so the box is a title, one sentence and two buttons at max-w-sm.',
      guidance:
        'Use for a destructive confirmation and nothing else: the reader already knows what they clicked and the dialog exists to give them one beat to stop. Dropping the header row removes the close control on purpose, since Cancel is the close control and two ways out of a two button dialog is one too many. The title leads directly, with nothing stamped above it, and the body never scrolls.',
      html: `<button class="btn btn-danger" type="button" data-ai-toggle="modal" data-ai-target="#modal-dialog-compact-confirm" aria-haspopup="dialog" aria-expanded="false">
  Reset Database
</button>

<div id="modal-dialog-compact-confirm" class="modal">
  <div class="modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="modal-box max-w-sm" role="dialog" aria-modal="true" aria-labelledby="modal-dialog-compact-confirm-title">
    <div class="modal-body">
      <h3 class="modal-title" id="modal-dialog-compact-confirm-title">Confirm Database Reset</h3>
      <p class="mt-2">All mock records and schema migrations will revert to initial seed.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" type="button" data-ai-dismiss="modal">Cancel</button>
      <button class="btn btn-danger" type="button" data-ai-dismiss="modal">Reset Database</button>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Standard card container
     ========================================================================== */
  'card-standard': [
    {
      id: 'media-top',
      name: 'Media top',
      description:
        'A full width media band sits above the header, separated by one hairline, and the header, body and footer keep their order underneath.',
      guidance:
        'Use when the card has something worth looking at before it is worth reading: a chart, a photograph, a preview. The band is a surface shift closed by a single hairline, not a bordered tile, so the card stays one box; it holds the last 24 hours of p95 latency rather than a grey rectangle, because a placeholder shape in a shipped card is a promise the product does not keep. Keep the aspect ratio fixed so a row of these cards does not stagger.',
      html: `<div class="card max-w-sm">
  <div class="aspect-video surface-1 border-b flex items-center p-4">
    <svg viewBox="0 0 240 80" fill="none" class="w-full" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="0,62 30,58 60,60 90,44 120,48 150,30 180,34 210,18 240,12" stroke="currentColor" stroke-width="2" />
    </svg>
  </div>
  <div class="card-header">
    <h3 class="card-title">Project Deployment</h3>
    <p class="card-description">Production deployment configured for edge nodes.</p>
  </div>
  <div class="card-body">
    <p class="text-sm">Last deployed 14 minutes ago via commit <code>8f42d19</code> to <strong>production-syd</strong>.</p>
  </div>
  <div class="card-footer">
    <span class="inline-flex items-center gap-2 text-sm"><span class="pip pip-ok" aria-hidden="true"></span>Online</span>
    <button class="btn btn-outline btn-xs" type="button">View Logs</button>
  </div>
</div>`,
    },
    {
      id: 'horizontal',
      name: 'Horizontal',
      description:
        'The media moves to a third of the width on the left and the header, body and footer stack in the remaining two thirds, folding back to a column below sm.',
      guidance:
        'Use in a list of cards, where a horizontal card gives four rows the height that four stacked cards would spend on two. The media pane is a surface shift rather than a bordered tile, and it is a third of the row rather than a fixed pixel width, so the split holds at every container size. Below sm it stacks, because a third of 390px is not a media pane, it is a stamp.',
      html: `<div class="card flex flex-col sm:flex-row max-w-lg">
  <div class="w-full sm:w-1/3 surface-1 flex items-center justify-center p-4">
    <svg viewBox="0 0 120 80" fill="none" class="w-full" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="0,62 15,58 30,60 45,44 60,48 75,30 90,34 105,18 120,12" stroke="currentColor" stroke-width="2" />
    </svg>
  </div>
  <div class="flex-1">
    <div class="card-header">
      <h3 class="card-title">Project Deployment</h3>
      <p class="card-description">Production deployment configured for edge nodes.</p>
    </div>
    <div class="card-body">
      <p class="text-sm">Last deployed 14 minutes ago via commit <code>8f42d19</code> to <strong>production-syd</strong>.</p>
    </div>
    <div class="card-footer">
      <span class="inline-flex items-center gap-2 text-sm"><span class="pip pip-ok" aria-hidden="true"></span>Online</span>
      <button class="btn btn-outline btn-xs" type="button">View Logs</button>
    </div>
  </div>
</div>`,
    },
    {
      id: 'footer-less',
      name: 'Footer less',
      description:
        'The footer is removed and its action moves up into the header row beside the title, so the card ends on its content.',
      guidance:
        'Use when the card carries one action and the footer exists only to hold it: a footer rule plus a button row is a lot of structure for a single control. The status moves into the body as a pip and plain text rather than becoming a chip in the header, which keeps the header to a title and one button. Do not use it when the card has two or more actions, where a header row of buttons starts competing with the title.',
      html: `<div class="card max-w-sm">
  <div class="card-header flex-row items-start justify-between gap-4">
    <div>
      <h3 class="card-title">Project Deployment</h3>
      <p class="card-description">Production deployment configured for edge nodes.</p>
    </div>
    <button class="btn btn-ghost btn-xs shrink-0" type="button">View Logs</button>
  </div>
  <div class="card-body">
    <p class="text-sm">Last deployed 14 minutes ago via commit <code>8f42d19</code> to <strong>production-syd</strong>.</p>
    <p class="inline-flex items-center gap-2 text-sm mt-3"><span class="pip pip-ok" aria-hidden="true"></span>Online</p>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Interactive tabs
     ========================================================================== */
  'tabs-system': [
    {
      id: 'vertical',
      name: 'Vertical',
      description:
        'The tab list becomes a left rail and the panels take the remaining three columns, folding back above the panels below md.',
      guidance:
        'Use when the tab labels are long or the set is large enough that a horizontal row would scroll: settings sections, a documentation sidebar, a schema browser. The list swaps its bottom rule for an inline end rule so the rail reads as a boundary rather than an underline hanging in space, and it announces aria-orientation vertical so arrow key navigation is the right axis. Do not use it for two or three short labels, where a rail wastes a quarter of the width.',
      html: `<div class="tabs grid grid-cols-1 md:grid-cols-4 gap-6">
  <div class="tabs-list flex-col items-stretch border-b-0 border-ie" role="tablist" aria-orientation="vertical" aria-label="Workspace">
    <button class="tab is-active" role="tab" id="tabs-system-vertical-overview-tab" aria-controls="tabs-system-vertical-overview" aria-selected="true" data-ai-tab="#tabs-system-vertical-overview">Overview</button>
    <button class="tab" role="tab" id="tabs-system-vertical-analytics-tab" aria-controls="tabs-system-vertical-analytics" aria-selected="false" tabindex="-1" data-ai-tab="#tabs-system-vertical-analytics">Analytics</button>
    <button class="tab" role="tab" id="tabs-system-vertical-settings-tab" aria-controls="tabs-system-vertical-settings" aria-selected="false" tabindex="-1" data-ai-tab="#tabs-system-vertical-settings">Settings</button>
  </div>
  <div class="md:col-span-3">
    <div id="tabs-system-vertical-overview" class="tab-panel is-active" role="tabpanel" aria-labelledby="tabs-system-vertical-overview-tab">
      <p class="text-secondary">Overview tab content displaying system health and recent build outputs.</p>
    </div>
    <div id="tabs-system-vertical-analytics" class="tab-panel" role="tabpanel" aria-labelledby="tabs-system-vertical-analytics-tab">
      <p class="text-secondary">Analytics tab content displaying traffic and user engagement charts.</p>
    </div>
    <div id="tabs-system-vertical-settings" class="tab-panel" role="tabpanel" aria-labelledby="tabs-system-vertical-settings-tab">
      <p class="text-secondary">Workspace preferences and security configurations.</p>
    </div>
  </div>
</div>`,
    },
    {
      id: 'underline-scroll',
      name: 'Underline scroll',
      description:
        'The list keeps one row and scrolls horizontally with snap points and an edge fade, so seven tabs fit a phone without wrapping.',
      guidance:
        'Use when the tab set grew past what a narrow screen can hold and stacking them into two rows would break the underline into two lines. The fade at the edge is the affordance that says there is more, and the snap points stop a swipe halfway through a label. It scrolls on input and never on its own: an auto scrolling tab strip is the marquee law 9 rules out, dressed as navigation.',
      html: `<div class="tabs">
  <div class="tabs-list scroll-x snap-x" role="tablist" aria-label="Workspace">
    <button class="tab is-active snap-start" role="tab" id="tabs-system-underline-scroll-overview-tab" aria-controls="tabs-system-underline-scroll-overview" aria-selected="true" data-ai-tab="#tabs-system-underline-scroll-overview">Overview</button>
    <button class="tab snap-start" role="tab" id="tabs-system-underline-scroll-analytics-tab" aria-controls="tabs-system-underline-scroll-analytics" aria-selected="false" tabindex="-1" data-ai-tab="#tabs-system-underline-scroll-analytics">Analytics</button>
    <button class="tab snap-start" role="tab" id="tabs-system-underline-scroll-deploys-tab" aria-controls="tabs-system-underline-scroll-deploys" aria-selected="false" tabindex="-1" data-ai-tab="#tabs-system-underline-scroll-deploys">Deploys</button>
    <button class="tab snap-start" role="tab" id="tabs-system-underline-scroll-logs-tab" aria-controls="tabs-system-underline-scroll-logs" aria-selected="false" tabindex="-1" data-ai-tab="#tabs-system-underline-scroll-logs">Logs</button>
    <button class="tab snap-start" role="tab" id="tabs-system-underline-scroll-members-tab" aria-controls="tabs-system-underline-scroll-members" aria-selected="false" tabindex="-1" data-ai-tab="#tabs-system-underline-scroll-members">Members</button>
    <button class="tab snap-start" role="tab" id="tabs-system-underline-scroll-billing-tab" aria-controls="tabs-system-underline-scroll-billing" aria-selected="false" tabindex="-1" data-ai-tab="#tabs-system-underline-scroll-billing">Billing</button>
    <button class="tab snap-start" role="tab" id="tabs-system-underline-scroll-settings-tab" aria-controls="tabs-system-underline-scroll-settings" aria-selected="false" tabindex="-1" data-ai-tab="#tabs-system-underline-scroll-settings">Settings</button>
  </div>
  <div id="tabs-system-underline-scroll-overview" class="tab-panel is-active" role="tabpanel" aria-labelledby="tabs-system-underline-scroll-overview-tab">
    <p class="text-secondary">Overview tab content displaying system health and recent build outputs.</p>
  </div>
  <div id="tabs-system-underline-scroll-analytics" class="tab-panel" role="tabpanel" aria-labelledby="tabs-system-underline-scroll-analytics-tab">
    <p class="text-secondary">Analytics tab content displaying traffic and user engagement charts.</p>
  </div>
  <div id="tabs-system-underline-scroll-deploys" class="tab-panel" role="tabpanel" aria-labelledby="tabs-system-underline-scroll-deploys-tab">
    <p class="text-secondary">Six deploys this week, last one 14 minutes ago from commit 8f42d19.</p>
  </div>
  <div id="tabs-system-underline-scroll-logs" class="tab-panel" role="tabpanel" aria-labelledby="tabs-system-underline-scroll-logs-tab">
    <p class="text-secondary">Structured run output for the last 48 hours, filtered by level.</p>
  </div>
  <div id="tabs-system-underline-scroll-members" class="tab-panel" role="tabpanel" aria-labelledby="tabs-system-underline-scroll-members-tab">
    <p class="text-secondary">Eleven members across three roles, two invites pending.</p>
  </div>
  <div id="tabs-system-underline-scroll-billing" class="tab-panel" role="tabpanel" aria-labelledby="tabs-system-underline-scroll-billing-tab">
    <p class="text-secondary">1,240 of 2,000 build minutes used. The quota resets on the 1st.</p>
  </div>
  <div id="tabs-system-underline-scroll-settings" class="tab-panel" role="tabpanel" aria-labelledby="tabs-system-underline-scroll-settings-tab">
    <p class="text-secondary">Workspace preferences and security configurations.</p>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Notification list
     ========================================================================== */
  'notification-list': [
    {
      id: 'grouped-by-day',
      name: 'Grouped by day',
      description:
        'The items break into date groups, each group flush under a labelled hairline instead of the list carrying one border around everything.',
      guidance:
        'Use once the inbox covers more than a day, where a reader scanning for this morning has no way to tell where yesterday started. The labelled divider is the group heading and the hairline at once, so each group costs one rule rather than a heading plus a box. The groups drop their border through border-0 and rounded-none: a bordered list under a heading inside a page is the nesting law 1 rules out.',
      html: `<div class="max-w-md">
  <div class="divider">Today</div>
  <div class="notification-list border-0 rounded-none">
    <div class="notification-item is-unread">
      <span class="notification-dot"></span>
      <div class="notification-content">
        <p class="notification-title">Deployment completed successfully</p>
        <p class="notification-meta">Production environment - 2 minutes ago</p>
      </div>
    </div>
    <div class="notification-item is-unread">
      <span class="notification-dot"></span>
      <div class="notification-content">
        <p class="notification-title">New team member joined the workspace</p>
        <p class="notification-meta">Sarah Chen accepted the invite - 15 minutes ago</p>
      </div>
    </div>
    <div class="notification-item">
      <span class="notification-dot is-read"></span>
      <div class="notification-content">
        <p class="notification-title">Weekly usage report ready</p>
        <p class="notification-meta">Analytics - 2 hours ago</p>
      </div>
    </div>
  </div>
  <div class="divider">Yesterday</div>
  <div class="notification-list border-0 rounded-none">
    <div class="notification-item">
      <span class="notification-dot is-read"></span>
      <div class="notification-content">
        <p class="notification-title">SSL certificate renewed</p>
        <p class="notification-meta">Infrastructure - Yesterday at 11:42 AM</p>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      id: 'compact-rows',
      name: 'Compact rows',
      description:
        'Each notification collapses to one line with the source folded away and the timestamp pinned to the end of the row on tabular figures.',
      guidance:
        'Use for a dropdown panel or a notification tray, where the reader is triaging rather than reading and twelve rows matter more than two lines each. The title truncates instead of wrapping so every row is the same height, which is what makes the column of timestamps line up and the list scannable. Do not use it when the second line carries the only useful information, as it does for an invite or an alert.',
      html: `<div class="notification-list max-w-lg">
  <div class="notification-item is-unread items-center py-2">
    <span class="notification-dot mt-0"></span>
    <p class="notification-title truncate flex-1 min-w-0">Deployment completed successfully</p>
    <span class="text-xs text-muted tabular text-nowrap">2m</span>
  </div>
  <div class="notification-item is-unread items-center py-2">
    <span class="notification-dot mt-0"></span>
    <p class="notification-title truncate flex-1 min-w-0">New team member joined the workspace</p>
    <span class="text-xs text-muted tabular text-nowrap">15m</span>
  </div>
  <div class="notification-item items-center py-2">
    <span class="notification-dot is-read mt-0"></span>
    <p class="notification-title truncate flex-1 min-w-0">Weekly usage report ready</p>
    <span class="text-xs text-muted tabular text-nowrap">2h</span>
  </div>
  <div class="notification-item items-center py-2">
    <span class="notification-dot is-read mt-0"></span>
    <p class="notification-title truncate flex-1 min-w-0">SSL certificate renewed</p>
    <span class="text-xs text-muted tabular text-nowrap">1d</span>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Stepper progress flow
     ========================================================================== */
  'stepper-flow': [
    {
      id: 'vertical',
      name: 'Vertical',
      description:
        'The steps stack down the page with the rail running between the circles on the left, and each step gains a line of detail beside its label.',
      guidance:
        'Use when the steps carry explanation, not just names: an onboarding flow, a migration, an approval chain. A vertical rail has room for a sentence per step where a horizontal one has room for a word, which is the only reason to turn it. Both the completed and the current circle are static: a step that is simply waiting for input has nothing to animate, and law 2 rules out the breathing ring.',
      html: `<ol class="stepper is-vertical list-none p-0 max-w-sm">
  <li class="step-item is-completed items-start">
    <div class="step-circle">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
      <span class="sr-only">Completed</span>
    </div>
    <div>
      <span class="step-label">Account</span>
      <p class="text-xs text-muted mt-1">ana@meridian.dev, verified 3 minutes ago.</p>
    </div>
  </li>
  <li class="step-item is-active items-start" aria-current="step">
    <div class="step-circle">2</div>
    <div>
      <span class="step-label">Workspace</span>
      <p class="text-xs text-muted mt-1">Name the workspace and pick the region it deploys to.</p>
    </div>
  </li>
  <li class="step-item items-start">
    <div class="step-circle">3</div>
    <div>
      <span class="step-label">Billing</span>
      <p class="text-xs text-muted mt-1">Card or invoice. You can skip this for 14 days.</p>
    </div>
  </li>
  <li class="step-item items-start">
    <div class="step-circle">4</div>
    <div>
      <span class="step-label">Complete</span>
      <p class="text-xs text-muted mt-1">Invite the team and run the first deploy.</p>
    </div>
  </li>
</ol>`,
    },
    {
      id: 'numbered-panel',
      name: 'Numbered panel',
      description:
        'The steps become a numbered list in a narrow left column and the active step opens as a panel taking the other two columns.',
      guidance:
        'Use for a wizard where each step is a form rather than a checkpoint, so the reader can see where they are and work at the same time instead of losing the map on every screen. The list is one column of three and the panel is the other two, which keeps the form at a readable measure on a wide screen. Below md the list stacks above the panel, because a quarter width step list on a phone is unreadable in both halves.',
      html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
  <ol class="stepper is-vertical list-none p-0">
    <li class="step-item is-completed">
      <div class="step-circle">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="sr-only">Completed</span>
      </div>
      <span class="step-label">Account</span>
    </li>
    <li class="step-item is-active" aria-current="step">
      <div class="step-circle">2</div>
      <span class="step-label">Workspace</span>
    </li>
    <li class="step-item">
      <div class="step-circle">3</div>
      <span class="step-label">Billing</span>
    </li>
    <li class="step-item">
      <div class="step-circle">4</div>
      <span class="step-label">Complete</span>
    </li>
  </ol>
  <form class="md:col-span-2 flex flex-col gap-4">
    <div>
      <h3 class="card-title">Workspace</h3>
      <p class="text-sm text-secondary mt-1">Name the workspace and pick the region it deploys to.</p>
    </div>
    <div class="form-group mb-0">
      <label class="form-label" for="stepper-flow-numbered-panel-name">Workspace name</label>
      <input type="text" class="input" id="stepper-flow-numbered-panel-name" value="Meridian" />
      <p class="form-hint">Members see this name in the switcher and in every invite.</p>
    </div>
    <div class="form-group mb-0">
      <label class="form-label" for="stepper-flow-numbered-panel-region">Primary region</label>
      <select class="select" id="stepper-flow-numbered-panel-region">
        <option>syd-1</option>
        <option>sin-1</option>
        <option>fra-2</option>
      </select>
    </div>
    <div class="flex gap-2">
      <button type="button" class="btn btn-outline btn-sm">Back</button>
      <button type="submit" class="btn btn-primary btn-sm">Continue to billing</button>
    </div>
  </form>
</div>`,
    },
  ],
};
