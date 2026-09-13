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
        'Navigation moves into a full width bar above the content and the side rail is gone, so the content area gets the whole viewport width back. The current destination is marked by its text colour and a hairline under the label.',
      guidance:
        'Use for an application with five or fewer top level destinations, or one where the content is wide by nature: a table, a canvas, a diff. Do not use it for an app with nested navigation or more than about seven destinations, because a horizontal bar has nowhere to put the second level and you end up with a dropdown per item. On a phone the destinations do not go into a drawer: inside .app-header the .nav-links list stays on screen as a horizontal scroll row, no wrap, each destination keeping its own width, so nothing squeezes to one word per line. The header sits in the flow and is never sticky inside a card or a preview frame; a real page adds sticky-top. The shell is not a card: do not wrap .app-content in one, or the KPI cards inside it become nested boxes. min-h-0 on .app-shell drops the 100dvh floor so the shell is exactly as tall as its content, which is what a card, a preview or an embed wants.',
      html: `<div class="app-shell flex-col min-h-0">
  <header class="app-header">
    <div class="flex items-center gap-6 min-w-0">
      <a class="brand" href="#home">Meridian</a>
      <nav class="min-w-0" aria-label="Primary">
        <ul class="nav-links">
          <li><a class="nav-link is-active" href="#dashboard" aria-current="page">Dashboard</a></li>
          <li><a class="nav-link" href="#documents">Documents</a></li>
          <li><a class="nav-link" href="#activity">Activity</a></li>
          <li><a class="nav-link" href="#settings">Settings</a></li>
        </ul>
      </nav>
    </div>
    <div class="flex items-center gap-3 shrink-0">
      <button type="button" class="btn btn-outline btn-sm">Invite</button>
      <button type="button" class="btn btn-ghost">
        <span class="avatar avatar-sm" aria-hidden="true">AC</span>
        Avery Chen
      </button>
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
</div>`,
    },
    {
      id: 'split-rail',
      name: 'Split rail',
      description:
        'An icon only rail keeps the top level destinations and a second contextual panel sits between the rail and the content, holding the current section.',
      guidance:
        'Use when the application has a shallow top level and a deep second level: files inside a project, channels inside a workspace, tables inside a schema. The rail never scrolls and the middle panel does, which is the whole point. Every rail item carries an aria-label and a .tooltip with data-tooltip, because an icon with no accessible name is an unlabelled link; the tooltip opens downward (tooltip-bottom) so it is never clipped by the top edge of a card or a preview frame. The current rail item is marked on the icon colour as well as its surface, never by the grey box alone. Three columns need about 1024px of width, so below lg the panel is hidden and the rail plus the content stay: that is the phone strategy, panel out, rail in. The rail is only 4.25rem wide, so it stays a rail on a phone instead of becoming a full width band of centred icons, and the shell keeps its two columns at 390. The panel header is the section name in plain text with the count as plain muted text beside it, not a chip. min-h-0 on .app-shell drops the 100dvh floor so the shell is exactly as tall as its content.',
      html: `<div class="app-shell min-h-0">
  <nav class="sidebar is-collapsed" aria-label="Sections">
    <div class="sidebar-header">
      <span class="font-semibold">M</span>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-section">
        <a href="#dashboard" class="sidebar-item tooltip tooltip-bottom is-active" aria-current="page" aria-label="Dashboard" data-tooltip="Dashboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span>Dashboard</span>
        </a>
        <a href="#documents" class="sidebar-item tooltip tooltip-bottom" aria-label="Documents" data-tooltip="Documents">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>Documents</span>
        </a>
        <a href="#activity" class="sidebar-item tooltip tooltip-bottom" aria-label="Activity" data-tooltip="Activity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Activity</span>
        </a>
      </li>
    </ul>
  </nav>
  <div class="w-64 shrink-0 surface-0 border-ie hidden lg:block">
    <div class="sidebar-header gap-2">
      <span class="font-semibold">Dashboard</span>
      <span class="text-xs text-muted tabular">5 pages</span>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-section">
        <span class="sidebar-section-title">Main</span>
        <a href="#overview" class="sidebar-item is-active" aria-current="page">Overview<span class="sidebar-badge">12</span></a>
        <a href="#deploys" class="sidebar-item">Deploys</a>
        <a href="#incidents" class="sidebar-item">Incidents<span class="sidebar-badge">3</span></a>
      </li>
      <li class="sidebar-section">
        <span class="sidebar-section-title">Account</span>
        <a href="#members" class="sidebar-item">Members</a>
        <a href="#settings" class="sidebar-item">Settings</a>
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
        <div class="health-row">
          <span class="health-name"><span class="pip pip-ok" aria-hidden="true"></span>postgres-primary</span>
          <span class="text-xs text-muted tabular">99.95%</span>
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
        'The rail keeps only the icons and each item names itself through an aria-label and a tooltip, so the content pane takes back about twelve rem of width.',
      guidance:
        'Use when the content is the product and the navigation is muscle memory: an editor, a canvas, a log viewer. Every item still needs an accessible name, and a label the rail hides visually is not one, so each item carries aria-label as well as the visually hidden word; the tooltip is the themed .tooltip with data-tooltip rather than the browser title attribute, and it opens downward (tooltip-bottom) so the top edge of a card cannot clip it. The current item is marked on the icon colour, not by the grey box alone, and every item is 44px on both axes under a coarse pointer. The rail is only 4.25rem wide, so on a phone it stays a rail beside the content rather than becoming a full width band of centred icons. Do not ship this as the only navigation for a first time user, because an icon with no word beside it teaches nothing until it is hovered. min-h-0 on .app-shell drops the 100dvh floor so the shell is exactly as tall as its content.',
      html: `<div class="app-shell min-h-0">
  <nav class="sidebar is-collapsed" aria-label="Workspace">
    <div class="sidebar-header">
      <span class="font-semibold">M</span>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-section">
        <span class="sidebar-section-title">Main</span>
        <a href="#dashboard" class="sidebar-item tooltip tooltip-bottom is-active" aria-current="page" aria-label="Dashboard" data-tooltip="Dashboard">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span>Dashboard</span>
          <span class="sidebar-badge">12</span>
        </a>
        <a href="#documents" class="sidebar-item tooltip tooltip-bottom" aria-label="Documents" data-tooltip="Documents">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>Documents</span>
        </a>
        <a href="#activity" class="sidebar-item tooltip tooltip-bottom" aria-label="Activity" data-tooltip="Activity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Activity</span>
          <span class="sidebar-badge">3</span>
        </a>
      </li>
      <li class="sidebar-section">
        <span class="sidebar-section-title">Account</span>
        <a href="#settings" class="sidebar-item tooltip tooltip-bottom" aria-label="Settings" data-tooltip="Settings">
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
        <div class="health-row">
          <span class="health-name"><span class="pip pip-ok" aria-hidden="true"></span>workers</span>
          <span class="text-xs text-muted tabular">99.97%</span>
        </div>
        <div class="health-row">
          <span class="health-name"><span class="pip pip-ok" aria-hidden="true"></span>postgres-primary</span>
          <span class="text-xs text-muted tabular">99.95%</span>
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
        'Each sidebar group becomes a disclosure with its count in plain muted text beside the title, so a long navigation collapses to the section the reader is working in.',
      guidance:
        'Use when the rail carries more than about twelve destinations and the reader only ever works in one group at a time. Every trigger needs aria-expanded and aria-controls or the group reads as an undifferentiated list of buttons, and the chevron is the same m6 9 6 6 6-6 path the rest of the library uses, rotated on open. The count next to a section title is plain muted text, never a chip; chips are for the item rows, where a count belongs to a destination rather than to a heading. The accordion stays flush inside the rail: it must not gain a border of its own, because the rail is already the box, and the body carries no bottom padding of its own so no empty band opens between the last item and the section hairline. The trigger row is 44px under a coarse pointer.',
      html: `<nav class="sidebar border rounded-lg overflow-hidden" aria-label="Workspace">
  <div class="sidebar-header">
    <span class="font-semibold">Workspace</span>
  </div>
  <ul class="sidebar-nav accordion">
    <li class="sidebar-section accordion-item is-open">
      <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="true" aria-controls="sidebar-nav-nested-sections-main">
        <span class="flex items-center gap-2">
          <span class="sidebar-section-title">Main</span>
          <span class="text-xs text-muted tabular">15</span>
        </span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="accordion-content" id="sidebar-nav-nested-sections-main">
        <a href="#dashboard" class="sidebar-item is-active" aria-current="page">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
          <span class="sidebar-badge">12</span>
        </a>
        <a href="#documents" class="sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Documents
        </a>
        <a href="#activity" class="sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Activity
          <span class="sidebar-badge">3</span>
        </a>
      </div>
    </li>
    <li class="sidebar-section accordion-item">
      <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="sidebar-nav-nested-sections-account">
        <span class="flex items-center gap-2">
          <span class="sidebar-section-title">Account</span>
          <span class="text-xs text-muted tabular">2</span>
        </span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="accordion-content" id="sidebar-nav-nested-sections-account">
        <a href="#members" class="sidebar-item">Members</a>
        <a href="#settings" class="sidebar-item">Settings</a>
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
  <a class="brand" href="#home">Meridian</a>
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
      <li class="breadcrumb-item"><a href="#home">Workspace</a></li>
      <li class="breadcrumb-item"><a href="#resources">Resources</a></li>
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
        'The lead metric keeps a tile and the three supporting metrics become hairline rows, each pairing a small sparkline and its weekly delta with the figure.',
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
      <span class="flex items-center justify-end gap-3">
        <svg class="spark w-20 h-6 text-muted" viewBox="0 0 120 40" fill="none" aria-hidden="true">
          <polyline points="0,30 17,26 34,28 51,23 68,20 85,21 102,15 120,12" stroke="currentColor" stroke-width="1.75" />
        </svg>
        <span class="kpi-trend is-up tabular">+8.1%</span>
      </span>
      <span class="font-semibold text-primary">2,847</span>
    </div>
    <div class="bar-row">
      <span>Bounce Rate</span>
      <span class="flex items-center justify-end gap-3">
        <svg class="spark w-20 h-6 text-muted" viewBox="0 0 120 40" fill="none" aria-hidden="true">
          <polyline points="0,12 17,16 34,14 51,19 68,22 85,21 102,26 120,28" stroke="currentColor" stroke-width="1.75" />
        </svg>
        <span class="kpi-trend is-down tabular">-3.2%</span>
      </span>
      <span class="font-semibold text-primary">24.6%</span>
    </div>
    <div class="bar-row">
      <span>Avg. Session</span>
      <span class="flex items-center justify-end gap-3">
        <svg class="spark w-20 h-6 text-muted" viewBox="0 0 120 40" fill="none" aria-hidden="true">
          <polyline points="0,28 17,25 34,24 51,20 68,18 85,14 102,13 120,9" stroke="currentColor" stroke-width="1.75" />
        </svg>
        <span class="kpi-trend is-up tabular">+18.7%</span>
      </span>
      <span class="font-semibold text-primary">4m 32s</span>
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
    {
      id: 'expandable-rows',
      name: 'Expandable rows',
      description:
        'A disclosure control leads every row and opens a full width detail row underneath it, so the second level of a record arrives in place instead of on a page of its own.',
      guidance:
        'Use when each row has four or five supporting fields that only matter once, which is the case that otherwise grows a sixth and seventh column nobody reads. The detail row is a real tr with a td spanning every column, carrying a dl so each label and value pair announces as a pair; it is not a card, so nothing is nested inside the table container. The trigger is the shared chevron rotated with rotate-180 when the row is open, never a plus glyph beside it, and the open state is mirrored on aria-expanded with aria-controls naming the detail row. Closed detail rows carry the hidden attribute rather than a display utility, so the row is out of the accessibility tree as well as out of sight. The chevron button is a btn-icon, which takes the 44px floor under a coarse pointer.',
      html: `<div class="table-container">
  <table class="table table-sticky table-hover">
    <thead>
      <tr>
        <th scope="col" class="w-10"><span class="sr-only">Detail</span></th>
        <th scope="col">Service</th>
        <th scope="col">Region</th>
        <th class="cell-num" scope="col">p95 ms</th>
        <th class="cell-num" scope="col">Requests, 24h</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <button type="button" class="btn btn-ghost btn-icon btn-sm" aria-expanded="true" aria-controls="data-grid-expandable-rows-detail-gateway">
            <svg class="rotate-180" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            <span class="sr-only">Hide api-gateway detail</span>
          </button>
        </td>
        <td>api-gateway</td>
        <td>syd-1</td>
        <td class="cell-num">142</td>
        <td class="cell-num">1,284,902</td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
      </tr>
      <tr id="data-grid-expandable-rows-detail-gateway">
        <td colspan="6">
          <dl class="detail">
            <dt>Image</dt>
            <dd>ghcr.io/meridian/api-gateway:2.14.3</dd>
            <dt>Instances</dt>
            <dd>12 of 12 ready</dd>
            <dt>Last deploy</dt>
            <dd>14 minutes ago, commit 8f42d19</dd>
            <dt>On call</dt>
            <dd>Avery Chen, platform</dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <button type="button" class="btn btn-ghost btn-icon btn-sm" aria-expanded="false" aria-controls="data-grid-expandable-rows-detail-auth">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            <span class="sr-only">Show auth detail</span>
          </button>
        </td>
        <td>auth</td>
        <td>syd-1</td>
        <td class="cell-num">88</td>
        <td class="cell-num">402,118</td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-ok" aria-hidden="true"></span>Healthy</span></td>
      </tr>
      <tr id="data-grid-expandable-rows-detail-auth" hidden>
        <td colspan="6">
          <dl class="detail">
            <dt>Image</dt>
            <dd>ghcr.io/meridian/auth:5.2.0</dd>
            <dt>Instances</dt>
            <dd>6 of 6 ready</dd>
            <dt>Last deploy</dt>
            <dd>3 days ago, commit c01b7fa</dd>
            <dt>On call</dt>
            <dd>Dana Iversen, identity</dd>
          </dl>
        </td>
      </tr>
      <tr>
        <td>
          <button type="button" class="btn btn-ghost btn-icon btn-sm" aria-expanded="false" aria-controls="data-grid-expandable-rows-detail-billing">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            <span class="sr-only">Show billing-worker detail</span>
          </button>
        </td>
        <td>billing-worker</td>
        <td>fra-2</td>
        <td class="cell-num">1,204</td>
        <td class="cell-num">18,440</td>
        <td><span class="inline-flex items-center gap-2"><span class="pip pip-warn" aria-hidden="true"></span>Degraded</span></td>
      </tr>
      <tr id="data-grid-expandable-rows-detail-billing" hidden>
        <td colspan="6">
          <dl class="detail">
            <dt>Image</dt>
            <dd>ghcr.io/meridian/billing-worker:1.9.7</dd>
            <dt>Instances</dt>
            <dd>3 of 4 ready</dd>
            <dt>Last deploy</dt>
            <dd>26 minutes ago, commit 41d9e02</dd>
            <dt>On call</dt>
            <dd>Priya Raman, payments</dd>
          </dl>
        </td>
      </tr>
    </tbody>
  </table>
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
     Form inputs and groups
     ========================================================================== */
  'input-text': [
    {
      id: 'two-column-form',
      name: 'Two column form',
      description:
        'The form splits into sections: the heading and its description take the first column and the fields take the other two, with one action row under a hairline at the end.',
      guidance:
        'Use for a settings or profile form long enough to need headings, where a single column leaves the reader guessing which fields belong to which idea. The section heading is a plain h3 with its explanation beside it, never a badge eyebrow above it, and the fields keep the form-group, form-label, form-hint and form-error structure so the hint and the error stay attached to their field. There is no card around the sections: the hairline divider carries the separation, because a bordered block per section inside a bordered page is the nesting law. Below md the grid folds to one column and the description sits above its fields. Every control is an input, a select or a textarea, so each one takes the 44px floor under a coarse pointer from the library rather than from a utility here.',
      html: `<form class="flex flex-col">
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <h3 class="section-title text-base">Workspace</h3>
      <p class="text-sm text-secondary mt-2">The name members see in the switcher, and the slug every deploy URL is built from.</p>
    </div>
    <div class="md:col-span-2 grid gap-4">
      <div class="form-group mb-0">
        <label class="form-label" for="input-text-two-column-form-name">Workspace name</label>
        <input type="text" class="input" id="input-text-two-column-form-name" value="Meridian" />
        <span class="form-hint">Two to forty characters. Members see this in every invite.</span>
      </div>
      <div class="form-group mb-0">
        <label class="form-label" for="input-text-two-column-form-slug">Slug</label>
        <input type="text" class="input is-error" id="input-text-two-column-form-slug" value="meridian ops" aria-invalid="true" aria-describedby="input-text-two-column-form-slug-error" />
        <span class="form-error" id="input-text-two-column-form-slug-error">Lowercase letters, digits and hyphens only.</span>
      </div>
      <div class="form-group mb-0">
        <label class="form-label" for="input-text-two-column-form-region">Primary region</label>
        <select class="select" id="input-text-two-column-form-region">
          <option>syd-1</option>
          <option>sin-1</option>
          <option>fra-2</option>
        </select>
        <span class="form-hint">Builds run closest to this region. Changing it redeploys every service.</span>
      </div>
    </div>
  </section>
  <hr class="divider" />
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <h3 class="section-title text-base">Release notes</h3>
      <p class="text-sm text-secondary mt-2">Sent to the workspace channel with every production deploy.</p>
    </div>
    <div class="md:col-span-2 grid gap-4">
      <div class="form-group mb-0">
        <label class="form-label" for="input-text-two-column-form-summary">Default summary</label>
        <textarea class="textarea" id="input-text-two-column-form-summary" rows="4">Ships the new rate limiter and drops p95 on the gateway to 142 ms.</textarea>
        <span class="form-hint">Markdown is kept. Commit subjects are appended under whatever you write.</span>
      </div>
    </div>
  </section>
  <hr class="divider" />
  <div class="level">
    <p class="text-sm text-muted mb-0">Draft saved 2 minutes ago.</p>
    <div class="level-right">
      <button type="button" class="btn btn-ghost">Cancel</button>
      <button type="submit" class="btn btn-primary">Save changes</button>
    </div>
  </div>
</form>`,
    },
    {
      id: 'inline-row-form',
      name: 'Inline rows',
      description:
        'Every field becomes one row with its label at the inline start and its control on a shared vertical line at the far end, separated by hairlines rather than stacked in blocks.',
      guidance:
        'Use for a short settings form of six rows or fewer, where the reader is confirming values rather than composing them: the whole form reads as a list and every control lands on the same line. The rows split on the component container through cq and cq-md:grid-cols-2, not on the viewport, so the form folds to stacked labels inside a narrow card and keeps the two column reading in a wide one. Each hairline is a border-b on the row, which is why there is no box around the group. A row label is a real label with a for attribute, including the switch row, so the row text and the control are one target pair. One save action lives in the footer, because a per row save on a form this short doubles the number of things to click.',
      html: `<form class="cq">
  <div class="grid grid-cols-1 cq-md:grid-cols-2 cq-md:items-center gap-2 cq-md:gap-6 py-4 border-b">
    <label class="form-label" for="input-text-inline-row-form-name">Display name</label>
    <input type="text" class="input" id="input-text-inline-row-form-name" value="Avery Chen" />
  </div>
  <div class="grid grid-cols-1 cq-md:grid-cols-2 cq-md:items-center gap-2 cq-md:gap-6 py-4 border-b">
    <label class="form-label" for="input-text-inline-row-form-timezone">Time zone</label>
    <select class="select" id="input-text-inline-row-form-timezone">
      <option>Australia/Sydney</option>
      <option>Asia/Singapore</option>
      <option>Europe/Berlin</option>
    </select>
  </div>
  <div class="grid grid-cols-1 cq-md:grid-cols-2 cq-md:items-center gap-2 cq-md:gap-6 py-4 border-b">
    <label class="form-label" for="input-text-inline-row-form-alerts">Failure alerts</label>
    <div class="flex">
      <label class="switch"><input type="checkbox" class="switch-input" id="input-text-inline-row-form-alerts" checked /><span class="switch-track"><span class="switch-thumb"></span></span><span class="text-sm text-secondary">Email me when a run exits non-zero</span></label>
    </div>
  </div>
  <div class="level pt-4">
    <p class="text-sm text-muted mb-0">Applies to this workspace only.</p>
    <div class="level-right">
      <button type="submit" class="btn btn-primary">Save</button>
    </div>
  </div>
</form>`,
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
      <button type="button" class="btn btn-outline">Save</button>
    </div>
  </div>
  <div class="settings-row flex-col items-stretch gap-3">
    <div>
      <label class="form-label" for="settings-list-inline-edit-mail">Failure mail</label>
      <p class="form-hint">Email the owner when a run exits non-zero.</p>
    </div>
    <div class="flex gap-2">
      <input type="email" class="input" id="settings-list-inline-edit-mail" value="ops@meridian.dev" />
      <button type="button" class="btn btn-outline">Save</button>
    </div>
  </div>
  <div class="settings-row flex-col items-stretch gap-3">
    <div>
      <label class="form-label" for="settings-list-inline-edit-registry">Public registry</label>
      <p class="form-hint">Allow anonymous reads of free components.</p>
    </div>
    <div class="flex gap-2">
      <input type="text" class="input" id="settings-list-inline-edit-registry" value="@meridian/ui" />
      <button type="button" class="btn btn-outline">Save</button>
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
    <a class="flex items-center gap-2 text-sm text-primary" href="#new-blank">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Blank document
    </a>
    <a class="flex items-center gap-2 text-sm text-primary" href="#new-incident">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      Incident review
    </a>
    <a class="flex items-center gap-2 text-sm text-primary" href="#new-runbook">
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

  /* ==========================================================================
     Dropdown action menu
     ========================================================================== */
  'dropdown-menu': [
    {
      id: 'account-menu',
      name: 'Account menu',
      description:
        'The labelled button becomes an avatar, and the menu opens on an identity block naming who is signed in, followed by two labelled groups and sign out on its own.',
      guidance:
        'Use at the end of an application header, where the reader needs to know which account they are in before they pick anything. The identity block is a dropdown-header with the name and address as plain text, so nothing in it looks clickable; normal-case and tracking-normal keep an address readable, because the tracked uppercase styling that suits a one word group label does not suit an address. Each group keeps its own dropdown-header and the groups are separated by dropdown-divider, with sign out alone after the last divider so the destructive item is never adjacent to a routine one. Keyboard hints use kbd, which is 12px, the floor for visible text. The trigger is a btn-icon so the avatar takes the 44px target under a coarse pointer, and it carries aria-expanded plus aria-controls; the menu is rendered with is-open only so the variant can be read at rest. The wrapper reserves height for the open menu in a preview frame; a real header needs neither utility.',
      html: `<div class="flex justify-center items-start h-72 mb-24">
  <div class="dropdown is-open">
    <button type="button" class="btn btn-ghost btn-icon dropdown-trigger" data-ai-toggle="dropdown" aria-haspopup="true" aria-expanded="true" aria-controls="dropdown-menu-account-menu-list">
      <span class="avatar avatar-sm" aria-hidden="true">AC</span>
      <span class="sr-only">Account menu, Avery Chen</span>
    </button>
    <ul class="dropdown-menu dropdown-right" id="dropdown-menu-account-menu-list">
      <li class="dropdown-header normal-case tracking-normal">
        <span class="block text-sm text-primary">Avery Chen</span>
        <span class="block text-xs font-normal">avery.chen@meridian.dev</span>
      </li>
      <li class="dropdown-header">Account</li>
      <li><a class="dropdown-item" href="#profile">Profile<span class="kbd ml-auto">G P</span></a></li>
      <li><a class="dropdown-item" href="#preferences">Preferences<span class="kbd ml-auto">G E</span></a></li>
      <li class="dropdown-divider"></li>
      <li class="dropdown-header">Workspace</li>
      <li><a class="dropdown-item" href="#members">Members<span class="text-xs text-muted ml-auto">14</span></a></li>
      <li><a class="dropdown-item" href="#billing">Billing and plans</a></li>
      <li class="dropdown-divider"></li>
      <li><button type="button" class="dropdown-item is-danger">Sign out<span class="kbd ml-auto">Ctrl Q</span></button></li>
    </ul>
  </div>
</div>`,
    },
    {
      id: 'context-menu',
      name: 'Context menu',
      description:
        'The trigger button is gone and the menu opens at the corner of the row the pointer is on, with an icon column down the inline start, a submenu indicator on one item and the destructive action alone at the end.',
      guidance:
        'Use for the actions that belong to one row in a list or one object on a canvas, where the pointer is already on the target and a button per row would be five buttons of noise. The anchor is an empty .dropdown at the end of the target row: it has no width of its own, so .dropdown-right lands the menu inside the row rather than past its edge, and no trigger is rendered because the gesture is the trigger. The row that owns the menu carries aria-current as well as the tint, because a tint on its own announces nothing; the tint sits on the row padding so it reads as a band rather than a highlight behind the text. Every item puts a 16px icon in the same column, which is what lets a reader find Delete by shape before they read it. The submenu item says so with aria-haspopup and the shared chevron rotated by -rotate-90, never a unicode triangle. Delete is last, after a dropdown-divider, in is-danger ink, so the destructive action is never adjacent to a routine one. The wrapper reserves height for the open menu in a preview frame; a real list needs neither utility.',
      html: `<div class="mb-32">
  <div class="level mb-2">
    <span class="text-sm font-semibold">Edge config</span>
    <span class="text-sm text-muted">3 files</span>
  </div>
  <div class="border-t border-subtle">
    <div class="flex items-center gap-3 px-3 py-3 border-b border-subtle">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
      <span class="text-sm truncate flex-1 min-w-0">routes.edge.json</span>
      <span class="text-xs text-muted tabular">4.2 KB</span>
    </div>
    <div class="flex items-center gap-3 px-3 py-3 border-b border-subtle bg-accent-subtle" aria-current="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
      <span class="text-sm font-medium truncate flex-1 min-w-0">headers.edge.json</span>
      <span class="text-xs text-muted tabular">1.8 KB</span>
      <span class="dropdown is-open">
        <ul class="dropdown-menu dropdown-right" role="menu" aria-label="Actions for headers.edge.json">
          <li role="none">
            <button type="button" class="dropdown-item" role="menuitem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              Open
              <span class="kbd ml-auto">Enter</span>
            </button>
          </li>
          <li role="none">
            <button type="button" class="dropdown-item" role="menuitem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              Rename
              <span class="kbd ml-auto">F2</span>
            </button>
          </li>
          <li role="none">
            <button type="button" class="dropdown-item" role="menuitem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Duplicate
            </button>
          </li>
          <li role="none">
            <button type="button" class="dropdown-item" role="menuitem" aria-haspopup="menu" aria-expanded="false">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
              Move to
              <svg class="-rotate-90 ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </li>
          <li class="dropdown-divider" role="none"></li>
          <li role="none">
            <button type="button" class="dropdown-item is-danger" role="menuitem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Delete file
              <span class="kbd ml-auto">Del</span>
            </button>
          </li>
        </ul>
      </span>
    </div>
    <div class="flex items-center gap-3 px-3 py-3 border-b border-subtle">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
      <span class="text-sm truncate flex-1 min-w-0">redirects.edge.json</span>
      <span class="text-xs text-muted tabular">2.4 KB</span>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Contextual alert banners
     ========================================================================== */
  'alert-callouts': [
    {
      id: 'with-actions',
      name: 'With actions',
      description:
        'Each alert gains a bold title line above its sentence and puts its two actions on a row of their own inside the block, instead of running as one line of text.',
      guidance:
        'Use when the alert asks the reader to do something rather than just telling them: a maintenance window to schedule around, a key to copy. The title is a strong element on its own line, so the first three words carry the message and the sentence explains it. Actions sit on their own row under the body, the primary one as btn-outline and the secondary as btn-ghost, so neither competes with a page level primary button. Urgency stays in the icon colour and the tinted surface: the alert keeps one uniform hairline on all four sides and never an edge stripe. Icons come from the shared inline set, the same paths the parent uses, so a missing font can never render a box instead.',
      html: `<div class="flex flex-col gap-3">
  <div class="alert alert-info" role="status">
    <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    <div class="flex flex-col gap-3 min-w-0">
      <div>
        <strong class="font-semibold block">Maintenance scheduled</strong>
        <p class="mb-0">Edge servers will undergo routine maintenance at 02:00 UTC on 18 September. Requests fail over to syd-1 for about eight minutes.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="btn btn-sm btn-outline">View window</button>
        <button type="button" class="btn btn-sm btn-ghost">Remind me</button>
      </div>
    </div>
  </div>
  <div class="alert alert-success" role="status">
    <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01 9 11.01"/></svg>
    <div class="flex flex-col gap-3 min-w-0">
      <div>
        <strong class="font-semibold block">License key verified</strong>
        <p class="mb-0">Your new API license key has been verified and applied to the Meridian workspace. It covers 14 seats until 30 June 2027.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button type="button" class="btn btn-sm btn-outline">Copy key</button>
        <button type="button" class="btn btn-sm btn-ghost">Dismiss</button>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      id: 'inline-banner',
      name: 'Inline banner',
      description:
        'The stacked callout becomes one full width line directly under the section header: icon, a single sentence, a text link and a dismiss control, with no title line and no action row.',
      guidance:
        'Use for a notice the reader should see once on the way past, where the whole message fits in a sentence and the next step is a link rather than a decision: an allowance running down, a trial ending, a region degraded. It sits flush under the header hairline with no gap, so it reads as part of that section and not as a floating card in the content. Nothing is truncated: under a narrow container the sentence wraps to a second line rather than hiding half of itself, because a banner that clips its own message is worse than a banner two lines tall. The dismiss control is the shared .close button, whose X is drawn from the same mask every dismiss in the library uses, so a missing font can never leave a stray character in the corner. Urgency lives in the icon colour and the tinted surface, with one uniform hairline on all four sides: no edge stripe, in any property. Keep it to one notice. Two banners stacked under a header is a queue, and a queue belongs in a notification list.',
      html: `<div>
  <div class="level pb-3 border-b border-subtle">
    <h3 class="text-base font-semibold mb-0">Usage and limits</h3>
    <button type="button" class="btn btn-outline btn-sm">Manage plan</button>
  </div>
  <div class="alert alert-warning flex-wrap items-center py-3" role="status">
    <div class="flex items-start gap-3 flex-1 basis-2/3 min-w-0">
      <svg class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10.3 3.9-8.4 14A2 2 0 0 0 3.6 21h16.8a2 2 0 0 0 1.7-3.1l-8.4-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      <p class="mb-0 min-w-0">This workspace has used 84 percent of its 2 million request allowance for September.</p>
    </div>
    <div class="flex items-center gap-3 ml-auto shrink-0">
      <a class="link shrink-0" href="#usage">See the breakdown</a>
      <button type="button" class="close shrink-0" data-ai-dismiss="alert" aria-label="Dismiss this notice"></button>
    </div>
  </div>
  <dl class="detail mt-4">
    <dt>Requests</dt>
    <dd class="tabular">1,684,220 of 2,000,000</dd>
    <dt>Allowance resets</dt>
    <dd>1 October 2026</dd>
    <dt>Overage rate</dt>
    <dd class="tabular">0.40 AUD per 10,000 requests</dd>
  </dl>
</div>`,
    },
  ],

  /* ==========================================================================
     Pagination
     ========================================================================== */
  'pagination-controls': [
    {
      id: 'with-summary',
      name: 'With summary',
      description:
        'The numbered list is replaced by a range summary at the inline start and a previous and next pair at the far end, so the reader is told where they are instead of counting pages.',
      guidance:
        'Use when the set is too long for a numbered row to mean anything, which is anything past about twenty pages, or when the order is a feed rather than a catalogue and page 7 is not a place anybody returns to. The summary is plain muted text with tabular figures, so the digits do not jump as the reader pages through, and it is the count for the whole set, never a badge. Previous is unavailable on the first page: it keeps its shape and loses contrast, carries aria-disabled and drops out of the tab order, so the state is announced and not painted with a fill. Arrows are the shared chevron rotated with rotate-90 and -rotate-90, never a unicode arrow that a font gap can turn into a box. The row wraps under a narrow container, putting the pair below the summary rather than squeezing both.',
      html: `<nav class="level" aria-label="Pagination">
  <p class="text-sm text-muted tabular mb-0">Showing 21 to 40 of 312</p>
  <ul class="pagination">
    <li class="pagination-item">
      <a href="#previous" class="pagination-link gap-1 is-disabled" aria-disabled="true" tabindex="-1">
        <svg class="rotate-90" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        Previous
      </a>
    </li>
    <li class="pagination-item">
      <a href="#next" class="pagination-link gap-1">
        Next
        <svg class="-rotate-90" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </a>
    </li>
  </ul>
</nav>`,
    },
    {
      id: 'load-more',
      name: 'Load more',
      description:
        'The numbered row is replaced by one centred button that appends the next page in place, under a line saying how much of the set is already loaded and a thin track showing the same thing.',
      guidance:
        'Use for a feed the reader scans rather than navigates: activity, search results, a gallery. Nobody returns to page 7 of a feed, and an infinite scroll with no button takes the footer away from them, so the button stays and the reader decides. The count is plain muted text with tabular figures and a polite live region, so the digits do not jump and the new total is announced after each append. The track is progress progress-sm, the thinnest of the three, and it is decoration for the count: the count is the accessible value, which is why the progressbar role and its aria-value attributes sit on the track and never on the button. The fill is the nearest width fraction the utility set carries, because a demo cannot set a percentage without an inline style; a real implementation computes it. The button says what it will load, never just More, so a screen reader that reads it alone still knows the page size.',
      html: `<nav class="flex flex-col items-center gap-3" aria-label="Results">
  <p class="text-sm text-muted tabular mb-0" aria-live="polite">40 of 312 loaded</p>
  <div class="progress progress-sm w-full max-w-sm" role="progressbar" aria-label="Results loaded" aria-valuemin="0" aria-valuemax="312" aria-valuenow="40">
    <div class="progress-bar w-1/6"></div>
  </div>
  <button type="button" class="btn btn-outline">Load 20 more</button>
</nav>`,
    },
  ],

  /* ==========================================================================
     Command palette
     ========================================================================== */
  'command-palette-pro': [
    {
      id: 'preview-pane',
      name: 'Preview pane',
      description:
        'The results give up two thirds of the box and the highlighted result renders beside them, so the palette answers what a command will do before it is run.',
      guidance:
        'Use when the palette searches things rather than actions: components, documents, records. The split is a container query on the box itself through cq and cq-md:grid-cols-3, so the palette keeps its two columns wherever it is embedded and does not consult the viewport. Under 600px the preview is hidden outright rather than stacked, because a preview under a scrolling result list is a second scroll the reader did not ask for; the results stay whole. The hairline between the columns is a divider-vertical stretched with h-auto and self-stretch, not a border on a nested panel, so the two columns share one surface. The highlighted row is a real option in a listbox with aria-selected, because a tinted row announces nothing on its own. Every hint is command-kbd at 12px, and the shortcut is written out rather than drawn with a unicode command glyph.',
      html: `<button type="button" class="btn btn-outline" data-ai-toggle="modal" data-ai-target="#command-palette-pro-preview-pane" aria-haspopup="dialog" aria-expanded="false">
  Search components
  <span class="command-kbd ml-2">Ctrl K</span>
</button>

<div id="command-palette-pro-preview-pane" class="command-palette">
  <div class="modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="command-box cq">
    <div class="command-input-wrapper">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" class="command-input" value="table" aria-label="Search components, docs and commands" aria-controls="command-palette-pro-preview-pane-results" />
      <span class="command-kbd">Esc</span>
    </div>
    <div class="grid grid-cols-1 cq-md:grid-cols-3">
      <ul class="command-list" id="command-palette-pro-preview-pane-results" role="listbox" aria-label="Results">
        <li class="command-group-heading" role="presentation">Components</li>
        <li class="command-item is-selected" role="option" aria-selected="true">
          <div class="command-item-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M9 10v10"/></svg>
            <span>Data grid</span>
          </div>
        </li>
        <li class="command-item" role="option" aria-selected="false">
          <div class="command-item-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg>
            <span>Data table with striping</span>
          </div>
        </li>
        <li class="command-group-heading" role="presentation">Documentation</li>
        <li class="command-item" role="option" aria-selected="false">
          <div class="command-item-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>Tables that fit a phone</span>
          </div>
        </li>
      </ul>
      <div class="hidden cq-md:flex cq-md:col-span-2 gap-4 p-4">
        <span class="divider-vertical h-auto self-stretch" aria-hidden="true"></span>
        <div class="min-w-0">
          <h3 class="text-base font-semibold">Data grid</h3>
          <p class="text-sm text-secondary mt-1">Sortable grid with a sticky header, numeric columns aligned on the decimal, and a status pip per row.</p>
          <dl class="detail mt-4">
            <dt>Category</dt>
            <dd>Application</dd>
            <dt>Variants</dt>
            <dd>Dense, card rows, split header, selectable, expandable rows</dd>
            <dt>Reference</dt>
            <dd>data-grid</dd>
          </dl>
          <div class="flex items-center gap-2 mt-4">
            <button type="button" class="btn btn-sm btn-primary">Insert component</button>
            <span class="command-kbd">Enter</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      id: 'recent-first',
      name: 'Recent first',
      description:
        'The palette at rest, before a query is typed: a Recent group of three with their timestamps, a Suggested group under it, no preview pane, and the keyboard hints moved into a footer.',
      guidance:
        'Use as the empty query state of any palette. A palette that opens on nothing teaches nothing, and the thing a reader wants most often is the file they had open ten minutes ago. Recent comes first and is ordered by time, Suggested second and ordered by what the app thinks is next; two short groups beat one long list because the group heading is the only thing separating a history from a menu. Timestamps are plain muted text at text-sm, right aligned by the command-item row, never a badge and never smaller than the row they sit in. Shortcuts stay on the Suggested items only, since a recent file has no shortcut, and every hint is command-kbd at 12px with the keys written out, so no unicode command glyph can render as a box. The footer is a hairline row of hints built from utilities: the library has no command-footer class yet. The first row carries is-selected with aria-selected and the list points at it with aria-activedescendant, because the highlight is a colour and the state has to be spoken as well.',
      html: `<button type="button" class="btn btn-outline" data-ai-toggle="modal" data-ai-target="#command-palette-pro-recent-first" aria-haspopup="dialog" aria-expanded="false">
  Open command palette
  <span class="command-kbd ml-2">Ctrl K</span>
</button>

<div id="command-palette-pro-recent-first" class="command-palette">
  <div class="modal-backdrop" data-ai-dismiss="modal"></div>
  <div class="command-box">
    <div class="command-input-wrapper">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" class="command-input" value="" placeholder="Search files, components and commands" aria-label="Search files, components and commands" aria-controls="command-palette-pro-recent-first-results" />
      <span class="command-kbd">Esc</span>
    </div>
    <ul class="command-list" id="command-palette-pro-recent-first-results" role="listbox" aria-label="Recent and suggested" aria-activedescendant="command-palette-pro-recent-first-option-1">
      <li class="command-group-heading" role="presentation">Recent</li>
      <li class="command-item is-selected" id="command-palette-pro-recent-first-option-1" role="option" aria-selected="true">
        <div class="command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
          <span>tokens.css</span>
        </div>
        <span class="text-sm text-muted">12 minutes ago</span>
      </li>
      <li class="command-item" role="option" aria-selected="false">
        <div class="command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
          <span>variants-application.mjs</span>
        </div>
        <span class="text-sm text-muted">1 hour ago</span>
      </li>
      <li class="command-item" role="option" aria-selected="false">
        <div class="command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
          <span>forms-extra.css</span>
        </div>
        <span class="text-sm text-muted">Yesterday</span>
      </li>
      <li class="command-group-heading" role="presentation">Suggested</li>
      <li class="command-item" role="option" aria-selected="false">
        <div class="command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          <span>New component from template</span>
        </div>
        <span class="command-kbd">Ctrl N</span>
      </li>
      <li class="command-item" role="option" aria-selected="false">
        <div class="command-item-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M9 10v10"/></svg>
          <span>Go to registry catalog</span>
        </div>
        <span class="command-kbd">G R</span>
      </li>
    </ul>
    <div class="flex flex-wrap items-center gap-4 px-3 py-2 border-t border-subtle">
      <span class="flex items-center gap-2 text-sm text-muted"><span class="command-kbd">Up Down</span>to move</span>
      <span class="flex items-center gap-2 text-sm text-muted"><span class="command-kbd">Enter</span>to open</span>
      <span class="flex items-center gap-2 text-sm text-muted"><span class="command-kbd">Esc</span>to close</span>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Kanban column
     ========================================================================== */
  'kanban-column': [
    {
      id: 'board',
      name: 'Three column board',
      description:
        'The single column becomes the whole board: three columns side by side on one surface, divided by a hairline instead of by three separate boxes, stacking back to one column under a narrow container.',
      guidance:
        'Use when the reader has to move work between states rather than read one state, which is what a board is for. The three columns share one .kanban surface and are separated by a hairline, never by three .kanban boxes side by side: three bordered panels inside a panel is the nested box the first law is about. The split is a container query through cq and cq-md:grid-cols-3, so the board reads its own width and a board in a sidebar stacks while the same markup in a page does not. The hairline changes axis with the layout: a divider-vertical between the columns from cq-md up, a horizontal divider above each column below it, each hidden at the other size. The grid gap is zero on purpose, because the divider carries its own margin and a gap as well would leave the rule floating between two gutters. Counts are plain muted text beside the column name in .kanban-head, never a badge or a pill. Three columns is the ceiling for this shape: at four the columns are narrower than the item titles and the board wants its own horizontal scroll.',
      html: `<div class="kanban cq">
  <div class="grid grid-cols-1 cq-md:grid-cols-3 cq-md:gap-0">
    <section class="min-w-0">
      <div class="kanban-head"><span>Triage</span><span class="text-muted">4</span></div>
      <div class="kanban-item">Quota meter CSS <span class="text-xs text-muted">#184</span></div>
      <div class="kanban-item">Polar zip download <span class="text-xs text-muted">#191</span></div>
      <div class="kanban-item">Account dark flash <span class="text-xs text-muted">#203</span></div>
      <div class="kanban-item">Docs search empty state <span class="text-xs text-muted">#207</span></div>
    </section>
    <section class="min-w-0">
      <hr class="divider cq-md:hidden" />
      <div class="flex gap-2">
        <span class="divider-vertical h-auto self-stretch hidden cq-md:block" aria-hidden="true"></span>
        <div class="flex-1 min-w-0">
          <div class="kanban-head"><span>In progress</span><span class="text-muted">2</span></div>
          <div class="kanban-item">Range picker, two months <span class="text-xs text-muted">#211</span></div>
          <div class="kanban-item">Kanban board variant <span class="text-xs text-muted">#212</span></div>
        </div>
      </div>
    </section>
    <section class="min-w-0">
      <hr class="divider cq-md:hidden" />
      <div class="flex gap-2">
        <span class="divider-vertical h-auto self-stretch hidden cq-md:block" aria-hidden="true"></span>
        <div class="flex-1 min-w-0">
          <div class="kanban-head"><span>In review</span><span class="text-muted">3</span></div>
          <div class="kanban-item">Inbox reading pane <span class="text-xs text-muted">#198</span></div>
          <div class="kanban-item">Timeline two column <span class="text-xs text-muted">#209</span></div>
          <div class="kanban-item">Month schedule cells <span class="text-xs text-muted">#210</span></div>
        </div>
      </div>
    </section>
  </div>
</div>`,
    },
    {
      id: 'swimlane',
      name: 'Swimlane',
      description:
        'The column turns on its side: each team gets a lane whose items run across the board in one horizontal row instead of down a column, with a hairline between the lanes.',
      guidance:
        'Use when the board is grouped by who owns the work rather than by what state it is in, and the reader scans one lane at a time. A lane holds as many items as it holds, so the row scrolls sideways inside the board rather than wrapping: a wrapped lane stops being a lane, and a squeezed item that reads one word per line is worse than one the reader drags to. The items keep a real width and never shrink, which is what makes the scroll work; the inner row carries min-w-max so the wrapper has something to scroll. Lanes are separated by a divider on one shared surface, not by a box each. Counts stay plain muted text in the lane head. Two or three lanes is the useful ceiling, because every lane past the fold is a lane nobody scrolls.',
      html: `<div class="kanban cq">
  <div class="kanban-head"><span>Payments squad</span><span class="text-muted">4</span></div>
  <div class="overflow-x-auto">
    <div class="flex gap-3 min-w-max">
      <div class="kanban-item w-56 shrink-0 mb-0">Quota meter CSS <span class="text-xs text-muted">#184</span></div>
      <div class="kanban-item w-56 shrink-0 mb-0">Polar zip download <span class="text-xs text-muted">#191</span></div>
      <div class="kanban-item w-56 shrink-0 mb-0">Invoice retry backoff <span class="text-xs text-muted">#196</span></div>
      <div class="kanban-item w-56 shrink-0 mb-0">Seat proration rounding <span class="text-xs text-muted">#199</span></div>
    </div>
  </div>
  <hr class="divider" />
  <div class="kanban-head"><span>Registry squad</span><span class="text-muted">3</span></div>
  <div class="overflow-x-auto">
    <div class="flex gap-3 min-w-max">
      <div class="kanban-item w-56 shrink-0 mb-0">Range picker, two months <span class="text-xs text-muted">#211</span></div>
      <div class="kanban-item w-56 shrink-0 mb-0">Month schedule cells <span class="text-xs text-muted">#210</span></div>
      <div class="kanban-item w-56 shrink-0 mb-0">Timeline two column <span class="text-xs text-muted">#209</span></div>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Inbox list
     ========================================================================== */
  'inbox-list': [
    {
      id: 'split-reading-pane',
      name: 'Split reading pane',
      description:
        'The list gives up two thirds of the width and the selected message opens beside it, so a reader moves down the list without leaving the message they are reading.',
      guidance:
        'Use when the rows are things to read rather than things to count: mail, tickets, reviews. The split is a container query through cq and cq-md:grid-cols-3, so the pane appears when the component is wide enough for it and not because the window is. Under 600px the pane is hidden outright rather than stacked under the list, because a message under a scrolling list is a second scroll the reader did not ask for; on a phone the list is the screen and the message is the next screen. The two panes share one surface and are separated by a divider-vertical stretched with h-auto and self-stretch, never by a border on a nested panel. Unread is carried by weight alone through is-unread, with no pip and no tint, so the only other mark in the list, the tint on the open row, means one thing. That row carries aria-current as well, because a tint announces nothing. The message header is the media object: avatar in media-figure, name and address in media-body, so the header keeps its shape when the name wraps.',
      html: `<div class="cq grid grid-cols-1 cq-md:grid-cols-3">
  <div class="min-w-0">
    <div class="level px-3 mb-1">
      <span class="text-sm font-semibold">Inbox</span>
      <span class="text-sm text-muted">2 unread</span>
    </div>
    <div class="inbox-item px-3 bg-accent-subtle" aria-current="true">
      <div class="min-w-0">
        <div class="inbox-title truncate">Build failed on main</div>
        <div class="text-xs text-muted truncate">Rina Nakamura</div>
      </div>
      <span class="text-xs text-muted ml-auto">2m</span>
    </div>
    <div class="inbox-item is-unread px-3">
      <div class="min-w-0">
        <div class="inbox-title truncate">Seat request from acme</div>
        <div class="text-xs text-muted truncate">Billing</div>
      </div>
      <span class="text-xs text-muted ml-auto">1h</span>
    </div>
    <div class="inbox-item is-unread px-3">
      <div class="min-w-0">
        <div class="inbox-title truncate">Registry mirror is stale</div>
        <div class="text-xs text-muted truncate">Sam Okafor</div>
      </div>
      <span class="text-xs text-muted ml-auto">4h</span>
    </div>
    <div class="inbox-item px-3">
      <div class="min-w-0">
        <div class="inbox-title truncate">Certificate renewed</div>
        <div class="text-xs text-muted truncate">Infrastructure</div>
      </div>
      <span class="text-xs text-muted ml-auto">1d</span>
    </div>
  </div>
  <div class="hidden cq-md:flex cq-md:col-span-2 gap-4">
    <span class="divider-vertical h-auto self-stretch" aria-hidden="true"></span>
    <div class="min-w-0">
      <div class="media">
        <div class="media-figure"><span class="avatar" aria-hidden="true">RN</span></div>
        <div class="media-body">
          <h3 class="text-base font-semibold mb-0">Build failed on main</h3>
          <p class="text-sm text-muted mb-0">Rina Nakamura, rina@llmcss.io<span class="divider-vertical" aria-hidden="true"></span><span class="tabular">09:41</span></p>
        </div>
      </div>
      <p class="text-sm text-secondary mt-4">php -l api/lib.php exited 255 on commit 8f2c1a. The parse error is an unclosed match arm in api/lib.php at line 412, added with the token refresh patch.</p>
      <p class="text-sm text-secondary">The deploy to production-syd was held and the previous build is still serving traffic. Push a fix and re-run the job, or revert the commit and let the queue drain.</p>
      <div class="flex flex-wrap gap-2 mt-4">
        <button type="button" class="btn btn-sm btn-primary">Reply</button>
        <button type="button" class="btn btn-sm btn-outline">Re-run job</button>
        <button type="button" class="btn btn-sm btn-ghost">Archive</button>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      id: 'bulk-select',
      name: 'Bulk select',
      description:
        'A checkbox leads every row and the list header is replaced by a bulk bar carrying the selection count and the actions that apply to it.',
      guidance:
        'Use when the reader clears an inbox rather than reads it: archive the twelve deploy notices, mark a morning of alerts read. Each checkbox is labelled with the subject of its own row, because four controls all called Select are four identical announcements. Selected rows carry aria-selected as well as the tint, so the state is spoken and not only painted. The bar is a bulk-bar under the list rather than a floating strip over it, it names the count in plain text, and it puts the destructive action last with a visible gap from the routine ones. Unread stays weight alone: the checkbox column is the only thing added to the row, and a second mark in the same place would compete with it.',
      html: `<div class="flex flex-col gap-3 max-w-lg">
  <div class="inbox-item px-3" aria-selected="true">
    <label class="checkbox"><input type="checkbox" class="checkbox-input" checked /><span class="sr-only">Select Build failed on main</span></label>
    <div class="min-w-0">
      <div class="inbox-title truncate">Build failed on main</div>
      <div class="text-xs text-muted truncate">Rina Nakamura</div>
    </div>
    <span class="text-xs text-muted">2m</span>
  </div>
  <div class="inbox-item is-unread px-3" aria-selected="true">
    <label class="checkbox"><input type="checkbox" class="checkbox-input" checked /><span class="sr-only">Select Seat request from acme</span></label>
    <div class="min-w-0">
      <div class="inbox-title truncate">Seat request from acme</div>
      <div class="text-xs text-muted truncate">Billing</div>
    </div>
    <span class="text-xs text-muted">1h</span>
  </div>
  <div class="inbox-item is-unread px-3">
    <label class="checkbox"><input type="checkbox" class="checkbox-input" /><span class="sr-only">Select Registry mirror is stale</span></label>
    <div class="min-w-0">
      <div class="inbox-title truncate">Registry mirror is stale</div>
      <div class="text-xs text-muted truncate">Sam Okafor</div>
    </div>
    <span class="text-xs text-muted">4h</span>
  </div>
  <div class="inbox-item px-3">
    <label class="checkbox"><input type="checkbox" class="checkbox-input" /><span class="sr-only">Select Certificate renewed</span></label>
    <div class="min-w-0">
      <div class="inbox-title truncate">Certificate renewed</div>
      <div class="text-xs text-muted truncate">Infrastructure</div>
    </div>
    <span class="text-xs text-muted">1d</span>
  </div>
  <div class="bulk-bar" role="status">
    <span class="bulk-bar-count">2 selected</span>
    <button type="button" class="btn btn-ghost btn-xs">Clear</button>
    <div class="bulk-bar-actions">
      <button type="button" class="btn btn-outline btn-sm">Mark read</button>
      <button type="button" class="btn btn-outline btn-sm">Archive</button>
      <button type="button" class="btn btn-danger btn-sm">Delete</button>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     Timeline log
     ========================================================================== */
  'timeline-log': [
    {
      id: 'two-column',
      name: 'Two column',
      description:
        'From cq-md up the rail moves to the centre of the block and events sit on alternating sides of it, two to a row; under that width the same events fall back to one column beside a single left rail.',
      guidance:
        'Use when the log is long enough that a single column wastes half the width, and short enough per event that two events fit on a row: releases, milestones, an audit trail with one line each. The rail is a real element, not a border on the item, which is what lets it be the left rail on a phone and the centre rail at width from one set of markup: the left rail is hidden at cq-md and the centre rail, which lives inside each right hand event, is hidden below it. The grid gap is zero so the centre rail segments meet and read as one line. Each event marks itself with a static pip nearest the rail, turned around on the left hand side with cq-md:flex-row-reverse so the pip always touches the rail; a pip in a log is a steady state and never animates. Timestamps are tabular so the column of times does not shuffle as the values change. Below cq-md nothing alternates: order is the point of a log, and one column keeps it.',
      html: `<div class="cq">
  <div class="flex gap-4 cq-md:block">
    <span class="divider-vertical h-auto self-stretch cq-md:hidden" aria-hidden="true"></span>
    <ol class="timeline flex-1 min-w-0 cq-md:grid cq-md:grid-cols-2 cq-md:gap-0">
      <li class="py-3 pe-4">
        <div class="flex items-center gap-2 cq-md:flex-row-reverse">
          <span class="pip pip-ok" aria-hidden="true"></span>
          <span class="timeline-title">Registry published</span>
        </div>
        <div class="timeline-meta cq-md:text-right">origin<span class="divider-vertical" aria-hidden="true"></span><span class="tabular">09:41</span></div>
      </li>
      <li class="py-3 cq-md:flex cq-md:gap-4">
        <span class="divider-vertical h-auto self-stretch hidden cq-md:block" aria-hidden="true"></span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="pip" aria-hidden="true"></span>
            <span class="timeline-title">Token issued</span>
          </div>
          <div class="timeline-meta">polar webhook<span class="divider-vertical" aria-hidden="true"></span><span class="tabular">09:58</span></div>
        </div>
      </li>
      <li class="py-3 pe-4">
        <div class="flex items-center gap-2 cq-md:flex-row-reverse">
          <span class="pip pip-warn" aria-hidden="true"></span>
          <span class="timeline-title">Cache purge queued</span>
        </div>
        <div class="timeline-meta cq-md:text-right">edge-syd<span class="divider-vertical" aria-hidden="true"></span><span class="tabular">10:14</span></div>
      </li>
      <li class="py-3 cq-md:flex cq-md:gap-4">
        <span class="divider-vertical h-auto self-stretch hidden cq-md:block" aria-hidden="true"></span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="pip pip-ok" aria-hidden="true"></span>
            <span class="timeline-title">Pro component added</span>
          </div>
          <div class="timeline-meta">tool-trace<span class="divider-vertical" aria-hidden="true"></span><span class="tabular">11:02</span></div>
        </div>
      </li>
      <li class="py-3 pe-4">
        <div class="flex items-center gap-2 cq-md:flex-row-reverse">
          <span class="pip pip-err" aria-hidden="true"></span>
          <span class="timeline-title">Mirror sync failed</span>
        </div>
        <div class="timeline-meta cq-md:text-right">registry mirror<span class="divider-vertical" aria-hidden="true"></span><span class="tabular">11:37</span></div>
      </li>
      <li class="py-3 cq-md:flex cq-md:gap-4">
        <span class="divider-vertical h-auto self-stretch hidden cq-md:block" aria-hidden="true"></span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="pip pip-ok" aria-hidden="true"></span>
            <span class="timeline-title">Mirror sync recovered</span>
          </div>
          <div class="timeline-meta">registry mirror<span class="divider-vertical" aria-hidden="true"></span><span class="tabular">11:52</span></div>
        </div>
      </li>
    </ol>
  </div>
</div>`,
    },
    {
      id: 'single-line',
      name: 'Single line',
      description:
        'Each event collapses from two lines to one row: title, source and a right aligned time on the same baseline, so twice as many events fit before the fold.',
      guidance:
        'Use for a long audit trail or a deploy log, where the reader is looking for the one line that is different and the meta is two words. The title truncates and the time never does: the time column is fixed at the end with tabular figures so the digits line up down the list and a scan reads the gaps. Keep the row padding tight but not tighter than the rail spacing, or the pips merge into a dotted line. This is the wrong shape when an event needs a sentence: at that point the meta wraps under the title and the single line is a two line row with a ragged right edge, which is what the default layout already does properly.',
      html: `<ol class="timeline max-w-lg">
  <li class="timeline-item flex items-baseline gap-3 pb-3">
    <span class="timeline-title truncate min-w-0">Registry published</span>
    <span class="timeline-meta shrink-0">origin</span>
    <span class="timeline-meta ml-auto shrink-0 tabular">09:41</span>
  </li>
  <li class="timeline-item flex items-baseline gap-3 pb-3">
    <span class="timeline-title truncate min-w-0">Token issued</span>
    <span class="timeline-meta shrink-0">polar webhook</span>
    <span class="timeline-meta ml-auto shrink-0 tabular">09:58</span>
  </li>
  <li class="timeline-item flex items-baseline gap-3 pb-3">
    <span class="timeline-title truncate min-w-0">Cache purge queued</span>
    <span class="timeline-meta shrink-0">edge-syd</span>
    <span class="timeline-meta ml-auto shrink-0 tabular">10:14</span>
  </li>
  <li class="timeline-item flex items-baseline gap-3 pb-3">
    <span class="timeline-title truncate min-w-0">Pro component added</span>
    <span class="timeline-meta shrink-0">tool-trace</span>
    <span class="timeline-meta ml-auto shrink-0 tabular">11:02</span>
  </li>
  <li class="timeline-item flex items-baseline gap-3 pb-3">
    <span class="timeline-title truncate min-w-0">Mirror sync failed</span>
    <span class="timeline-meta shrink-0">registry mirror</span>
    <span class="timeline-meta ml-auto shrink-0 tabular">11:37</span>
  </li>
  <li class="timeline-item flex items-baseline gap-3 pb-3">
    <span class="timeline-title truncate min-w-0">Mirror sync recovered</span>
    <span class="timeline-meta shrink-0">registry mirror</span>
    <span class="timeline-meta ml-auto shrink-0 tabular">11:52</span>
  </li>
</ol>`,
    },
  ],

  /* ==========================================================================
     Calendar date picker
     ========================================================================== */
  'calendar-datepicker': [
    {
      id: 'range-two-month',
      name: 'Range, two months',
      description:
        'One month becomes two side by side and the selection becomes a range: both endpoints are marked, the days between them are tinted, and a footer line resolves the range and its night count.',
      guidance:
        'Use for any booking where the two dates are chosen together and the second one is usually in the following month: stays, leave, a maintenance window. Two grids side by side stop the reader paging forward and losing sight of the start date. The pair is a container query through cq and cq-md:grid-cols-2, and under 600px the second month is hidden rather than stacked, because two month grids stacked on a phone is a scroll with no context; the footer still resolves the whole range, so nothing is lost. Each grid names its own month in a caption, which is also its accessible name, so no id is needed and the pair can appear twice on a page. The endpoints use the is-selected state the library already ships and each one says in its label which end it is; the days between carry the accent tint and aria-selected, since the library has no is-in-range state yet. Days outside a grid own month stay muted and unavailable in both grids, so a date is only ever painted once, in its own month. The nav buttons are btn-icon, which takes the 44px target under a coarse pointer.',
      html: `<div class="calendar-panel cq">
  <div class="calendar-header">
    <button type="button" class="btn btn-ghost btn-icon" aria-label="Show August and September 2026">
      <svg class="rotate-90" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <span class="calendar-title">September and October 2026</span>
    <button type="button" class="btn btn-ghost btn-icon" aria-label="Show October and November 2026">
      <svg class="-rotate-90" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
  </div>
  <div class="grid grid-cols-1 cq-md:grid-cols-2 gap-6">
    <div class="min-w-0">
      <table class="calendar" role="grid">
        <caption class="calendar-title text-center pb-2">September 2026</caption>
        <thead>
          <tr>
            <th scope="col" class="calendar-weekday"><abbr title="Monday">Mon</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Tuesday">Tue</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Wednesday">Wed</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Thursday">Thu</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Friday">Fri</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Saturday">Sat</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Sunday">Sun</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>31</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">1</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">2</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">3</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">4</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">5</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">6</button></td>
          </tr>
          <tr>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">7</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">8</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">9</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">10</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">11</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">12</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">13</button></td>
          </tr>
          <tr>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">14</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">15</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">16</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">17</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">18</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">19</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">20</button></td>
          </tr>
          <tr>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">21</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">22</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">23</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">24</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">25</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">26</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">27</button></td>
          </tr>
          <tr>
            <td role="gridcell" aria-selected="true"><button type="button" class="calendar-day is-selected" tabindex="0" aria-label="28 September 2026, start of range">28</button></td>
            <td role="gridcell" aria-selected="true"><button type="button" class="calendar-day bg-accent-subtle" tabindex="-1">29</button></td>
            <td role="gridcell" aria-selected="true"><button type="button" class="calendar-day bg-accent-subtle" tabindex="-1">30</button></td>
            <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>1</button></td>
            <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>2</button></td>
            <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>3</button></td>
            <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>4</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="min-w-0 hidden cq-md:block">
      <table class="calendar" role="grid">
        <caption class="calendar-title text-center pb-2">October 2026</caption>
        <thead>
          <tr>
            <th scope="col" class="calendar-weekday"><abbr title="Monday">Mon</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Tuesday">Tue</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Wednesday">Wed</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Thursday">Thu</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Friday">Fri</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Saturday">Sat</abbr></th>
            <th scope="col" class="calendar-weekday"><abbr title="Sunday">Sun</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>28</button></td>
            <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>29</button></td>
            <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>30</button></td>
            <td role="gridcell" aria-selected="true"><button type="button" class="calendar-day bg-accent-subtle" tabindex="-1">1</button></td>
            <td role="gridcell" aria-selected="true"><button type="button" class="calendar-day bg-accent-subtle" tabindex="-1">2</button></td>
            <td role="gridcell" aria-selected="true"><button type="button" class="calendar-day is-selected" tabindex="-1" aria-label="3 October 2026, end of range">3</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">4</button></td>
          </tr>
          <tr>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">5</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">6</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">7</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">8</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">9</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">10</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">11</button></td>
          </tr>
          <tr>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">12</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">13</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">14</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">15</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">16</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">17</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">18</button></td>
          </tr>
          <tr>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">19</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">20</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">21</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">22</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">23</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">24</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">25</button></td>
          </tr>
          <tr>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">26</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">27</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">28</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">29</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">30</button></td>
            <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">31</button></td>
            <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>1</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="calendar-footer">
    <span class="tabular">28 September to 3 October 2026</span>
    <span class="tabular">5 nights</span>
  </div>
</div>`,
    },
    {
      id: 'month-schedule',
      name: 'Month schedule',
      description:
        'The day buttons become day cells: each one stacks the date over up to two event lines with a leading pip, and says how many more it is not showing.',
      guidance:
        'Use when the month is being read rather than picked: a team calendar, a roster, a release schedule. Two lines per cell is the honest ceiling for a month grid, so the third event is counted rather than crammed in: the overflow line is plain muted text, never a badge, and it says how many are hidden instead of ending in an ellipsis. Event text stays at text-sm, the same size as the rest of the body copy, and shrinks in colour rather than in size; nothing in a calendar cell may drop below 12px. Each event leads with a static pip, which is the same status vocabulary the rest of the library uses, and truncates on one line so the row heights stay level. Seven columns of readable text do not fit a phone, so the grid keeps a real column width and the wrapper scrolls horizontally: a squeezed month where every event reads one word per line is worse than a month the reader drags sideways. Days outside the month keep their number in muted ink and carry no events. Nav buttons are btn-icon, which takes the 44px target under a coarse pointer.',
      html: `<div class="calendar-panel cq">
  <div class="calendar-header">
    <button type="button" class="btn btn-ghost btn-icon" aria-label="Previous month, August 2026">
      <svg class="rotate-90" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
    <span class="calendar-title">September 2026</span>
    <button type="button" class="btn btn-ghost btn-icon" aria-label="Next month, October 2026">
      <svg class="-rotate-90" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </button>
  </div>
  <div class="scroll-x">
    <table class="calendar min-w-max">
      <caption class="sr-only">Team schedule for September 2026</caption>
      <thead>
        <tr>
          <th scope="col" class="calendar-weekday w-24"><abbr title="Monday">Mon</abbr></th>
          <th scope="col" class="calendar-weekday w-24"><abbr title="Tuesday">Tue</abbr></th>
          <th scope="col" class="calendar-weekday w-24"><abbr title="Wednesday">Wed</abbr></th>
          <th scope="col" class="calendar-weekday w-24"><abbr title="Thursday">Thu</abbr></th>
          <th scope="col" class="calendar-weekday w-24"><abbr title="Friday">Fri</abbr></th>
          <th scope="col" class="calendar-weekday w-24"><abbr title="Saturday">Sat</abbr></th>
          <th scope="col" class="calendar-weekday w-24"><abbr title="Sunday">Sun</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm text-muted tabular">31</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle">
            <span class="block text-sm font-semibold tabular">1</span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip pip-ok" aria-hidden="true"></span><span class="truncate">Sprint planning</span></span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip" aria-hidden="true"></span><span class="truncate">Design review</span></span>
          </td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">2</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle">
            <span class="block text-sm font-semibold tabular">3</span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip pip-warn" aria-hidden="true"></span><span class="truncate">Release 0.4.1</span></span>
          </td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">4</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">5</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">6</span></td>
        </tr>
        <tr>
          <td class="align-top text-left p-2 h-20 border-t border-subtle">
            <span class="block text-sm font-semibold tabular">7</span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip pip-ok" aria-hidden="true"></span><span class="truncate">Standup</span></span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip" aria-hidden="true"></span><span class="truncate">Docs sync</span></span>
            <span class="block text-sm text-muted mt-1">+3 more</span>
          </td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">8</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">9</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">10</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle">
            <span class="block text-sm font-semibold tabular">11</span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip" aria-hidden="true"></span><span class="truncate">Retro</span></span>
          </td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">12</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">13</span></td>
        </tr>
        <tr>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">14</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">15</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle">
            <span class="block text-sm font-semibold tabular">16</span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip pip-warn" aria-hidden="true"></span><span class="truncate">Token audit</span></span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip" aria-hidden="true"></span><span class="truncate">Pairing</span></span>
          </td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">17</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">18</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">19</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">20</span></td>
        </tr>
        <tr>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">21</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle">
            <span class="block text-sm font-semibold tabular">22</span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip pip-err" aria-hidden="true"></span><span class="truncate">Registry freeze</span></span>
          </td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">23</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">24</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">25</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">26</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">27</span></td>
        </tr>
        <tr>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">28</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle">
            <span class="block text-sm font-semibold tabular">29</span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip" aria-hidden="true"></span><span class="truncate">Board review</span></span>
            <span class="flex items-center gap-2 text-sm text-muted mt-1"><span class="pip" aria-hidden="true"></span><span class="truncate">Invoices</span></span>
            <span class="block text-sm text-muted mt-1">+2 more</span>
          </td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm font-semibold tabular">30</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm text-muted tabular">1</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm text-muted tabular">2</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm text-muted tabular">3</span></td>
          <td class="align-top text-left p-2 h-20 border-t border-subtle"><span class="block text-sm text-muted tabular">4</span></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="calendar-footer">
    <span class="tabular">16 events this month</span>
    <span>Team calendar, Australia/Sydney</span>
  </div>
</div>`,
    },
  ],
};
