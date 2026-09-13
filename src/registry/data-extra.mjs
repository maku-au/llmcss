/**
 * Additional free components: form and identity primitives, two commerce
 * blocks, an in-page outline, and three catalog blocks every benchmark ships
 * (article card, contact section, review list).
 *
 * Styles live in src/css/components/forms-extra.css, commerce-extra.css and
 * scrollspy.css. The two runtime helpers (src/runtime/combobox.ts and
 * src/runtime/scrollspy.ts) are progressive enhancement: every entry below
 * renders and stays usable with no JavaScript at all.
 *
 * The last three entries add no CSS at all: they are composed from card,
 * list-group, media, avatar, the rating set, the bars set, the form set and
 * the grid utilities, so nothing here widens the stylesheet budget.
 */

export const extraComponents = [
  {
    id: 'combobox-autocomplete',
    name: 'Combobox Autocomplete',
    description:
      'Text field with a filtered listbox, arrow key navigation, and aria-activedescendant. Without the runtime the list opens on focus and filters nothing, and a field using a native datalist is left untouched.',
    category: 'primitive',
    tier: 'free',
    tags: ['combobox', 'autocomplete', 'listbox', 'form', 'search', 'aria'],
    html: `<div class="flex flex-col gap-5" style="max-width: 24rem;">
  <div class="form-group">
    <label class="form-label" for="cb-region">Deployment region</label>
    <div class="combobox">
      <input id="cb-region" class="input" type="text" role="combobox" aria-expanded="false" aria-controls="cb-region-list" aria-autocomplete="list" autocomplete="off" placeholder="Start typing a city" />
      <ul class="combobox-list" id="cb-region-list" role="listbox" aria-label="Deployment region">
        <li class="combobox-option" role="option" aria-selected="false">Sydney <span class="combobox-hint">ap-southeast-2</span></li>
        <li class="combobox-option" role="option" aria-selected="false">Singapore <span class="combobox-hint">ap-southeast-1</span></li>
        <li class="combobox-option" role="option" aria-selected="false">Frankfurt <span class="combobox-hint">eu-central-1</span></li>
        <li class="combobox-option" role="option" aria-selected="false">Sao Paulo <span class="combobox-hint">sa-east-1</span></li>
        <li class="combobox-option" role="option" aria-selected="false">Oregon <span class="combobox-hint">us-west-2</span></li>
        <li class="combobox-option" role="option" aria-disabled="true">Osaka <span class="combobox-hint">at capacity</span></li>
        <li class="combobox-empty" hidden>No region matches that name.</li>
      </ul>
    </div>
    <span class="form-hint">Arrow keys move through matches, Enter selects, Escape closes.</span>
  </div>

  <div class="form-group">
    <label class="form-label" for="cb-native">Billing currency</label>
    <input id="cb-native" class="input" type="text" list="cb-native-options" autocomplete="off" placeholder="AUD" />
    <datalist id="cb-native-options">
      <option value="AUD"></option>
      <option value="EUR"></option>
      <option value="SGD"></option>
      <option value="USD"></option>
    </datalist>
    <span class="form-hint">A field with a list attribute keeps the browser datalist and is never enhanced.</span>
  </div>
</div>`,
  },

  {
    id: 'calendar-datepicker',
    name: 'Calendar Date Picker',
    description:
      'Month grid on the WAI-ARIA date picker grid pattern, with today, selected, outside-month and unavailable days plus tabular numerals. Static markup, so it renders complete with no JavaScript.',
    category: 'primitive',
    tier: 'free',
    tags: ['calendar', 'date', 'picker', 'grid', 'form', 'aria'],
    html: `<div class="calendar-panel" style="max-width: 20rem;">
  <div class="calendar-header">
    <button type="button" class="btn btn-ghost btn-icon btn-sm" aria-label="Previous month, August 2026">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
    </button>
    <span class="calendar-title" id="cal-label" aria-live="polite">September 2026</span>
    <button type="button" class="btn btn-ghost btn-icon btn-sm" aria-label="Next month, October 2026">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
  <table class="calendar" role="grid" aria-labelledby="cal-label">
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
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>1</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>2</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>3</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>4</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>5</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>6</button></td>
      </tr>
      <tr>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>7</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>8</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>9</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>10</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1" disabled>11</button></td>
        <td role="gridcell"><button type="button" class="calendar-day is-today" tabindex="-1" aria-current="date">12</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">13</button></td>
      </tr>
      <tr>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">14</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">15</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">16</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">17</button></td>
        <td role="gridcell" aria-selected="true"><button type="button" class="calendar-day is-selected" tabindex="0">18</button></td>
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
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">28</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">29</button></td>
        <td role="gridcell"><button type="button" class="calendar-day" tabindex="-1">30</button></td>
        <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>1</button></td>
        <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>2</button></td>
        <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>3</button></td>
        <td role="gridcell"><button type="button" class="calendar-day is-muted" tabindex="-1" disabled>4</button></td>
      </tr>
    </tbody>
  </table>
  <div class="calendar-footer">
    <span>Selected: Friday 18 September</span>
    <span>Earliest install date</span>
  </div>
</div>`,
  },

  {
    id: 'number-stepper',
    name: 'Number Stepper',
    description:
      'Quantity field with joined decrement and increment buttons, native spinners hidden and tabular numerals. The native number input already steps with the arrow keys, so the field works with no JavaScript; combobox.ts wires the two buttons for pointer users.',
    category: 'primitive',
    tier: 'free',
    tags: ['stepper', 'number', 'quantity', 'input', 'form'],
    html: `<div class="flex flex-wrap gap-8">
  <div class="form-group" style="max-width: 14rem;">
    <label class="form-label" for="stp-seats">Team seats</label>
    <div class="stepper-input">
      <button type="button" class="stepper-btn" data-ai-step="-1" aria-controls="stp-seats" aria-label="Decrease seats"></button>
      <input id="stp-seats" class="input" type="number" inputmode="numeric" value="12" min="1" max="250" step="1" />
      <button type="button" class="stepper-btn is-increment" data-ai-step="1" aria-controls="stp-seats" aria-label="Increase seats"></button>
    </div>
    <span class="form-hint">Billed monthly, prorated on change.</span>
  </div>

  <div class="form-group" style="max-width: 14rem;">
    <label class="form-label" for="stp-qty">Quantity</label>
    <div class="stepper-input">
      <button type="button" class="stepper-btn" data-ai-step="-1" aria-controls="stp-qty" aria-label="Decrease quantity" disabled></button>
      <input id="stp-qty" class="input" type="number" inputmode="numeric" value="1" min="1" max="10" step="1" />
      <button type="button" class="stepper-btn is-increment" data-ai-step="1" aria-controls="stp-qty" aria-label="Increase quantity"></button>
    </div>
    <span class="form-hint">Ten per order while stock is limited.</span>
  </div>
</div>`,
  },

  {
    id: 'password-toggle',
    name: 'Password Reveal Field',
    description:
      'Password field with a show and hide button that reports state through aria-pressed. CSS cannot change an input type, so the honest fallback is that the button stays hidden until combobox.ts marks the wrapper ready, leaving a plain, fully usable password field.',
    category: 'primitive',
    tier: 'free',
    tags: ['password', 'input', 'toggle', 'form', 'auth'],
    html: `<div class="flex flex-col gap-4" style="max-width: 24rem;">
  <div class="form-group">
    <label class="form-label" for="pw-current">Current password</label>
    <div class="password">
      <input id="pw-current" class="input" type="password" value="corvid-lantern-94" autocomplete="current-password" />
      <button type="button" class="password-toggle" data-ai-password-toggle="#pw-current" aria-pressed="false" aria-label="Show password"></button>
    </div>
  </div>

  <div class="form-group">
    <label class="form-label" for="pw-new">New password</label>
    <div class="password">
      <input id="pw-new" class="input" type="password" autocomplete="new-password" placeholder="At least 12 characters" aria-describedby="pw-new-hint" />
      <button type="button" class="password-toggle" data-ai-password-toggle="#pw-new" aria-pressed="false" aria-label="Show password"></button>
    </div>
    <span class="form-hint" id="pw-new-hint">Use a passphrase you do not use anywhere else.</span>
  </div>
</div>`,
  },

  {
    id: 'avatar-status',
    name: 'Avatar Status Dot',
    description:
      'Avatar with a presence dot ringed in the surface colour, in online, away, busy and offline variants across two sizes. Pure CSS with the status named in screen reader text, so no JavaScript is involved.',
    category: 'primitive',
    tier: 'free',
    tags: ['avatar', 'status', 'presence', 'identity', 'css-only'],
    html: `<div class="flex flex-col gap-5">
  <div class="flex flex-wrap gap-6">
    <div class="flex items-center gap-3">
      <span class="avatar">RA<span class="avatar-status avatar-status-online"><span class="sr-only">Online</span></span></span>
      <div>
        <div class="text-sm font-medium">Rina Alvarez</div>
        <div class="text-xs text-muted">Online</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="avatar">MO<span class="avatar-status avatar-status-away"><span class="sr-only">Away</span></span></span>
      <div>
        <div class="text-sm font-medium">Miles Okafor</div>
        <div class="text-xs text-muted">Away since 14:20</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="avatar">JT<span class="avatar-status avatar-status-busy"><span class="sr-only">Busy</span></span></span>
      <div>
        <div class="text-sm font-medium">Junko Tan</div>
        <div class="text-xs text-muted">In a review</div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="avatar">DW<span class="avatar-status avatar-status-offline"><span class="sr-only">Offline</span></span></span>
      <div>
        <div class="text-sm font-medium">Devon Wright</div>
        <div class="text-xs text-muted">Offline</div>
      </div>
    </div>
  </div>

  <hr class="divider" />

  <div class="flex items-center gap-4">
    <span class="avatar avatar-sm">RA<span class="avatar-status avatar-status-online"><span class="sr-only">Online</span></span></span>
    <span class="avatar avatar-lg">RA<span class="avatar-status avatar-status-online"><span class="sr-only">Online</span></span></span>
    <span class="text-xs text-muted">The dot and its ring scale with the avatar size.</span>
  </div>
</div>`,
  },

  {
    id: 'rating-stars',
    name: 'Rating Stars',
    description:
      'Interactive five star input built from reversed radios with a screen reader name on every star, plus a read-only display that fills fractionally by percentage. Entirely CSS, so both work with no JavaScript.',
    category: 'primitive',
    tier: 'free',
    tags: ['rating', 'stars', 'review', 'radio', 'form', 'css-only'],
    html: `<div class="flex flex-col gap-6" style="max-width: 26rem;">
  <div class="form-group">
    <fieldset class="rating">
      <legend class="sr-only">Rate the Northwind integration</legend>
      <input class="rating-input" type="radio" id="rate-5" name="integration-rating" value="5" />
      <label class="rating-star" for="rate-5"><span class="sr-only">5 stars, excellent</span></label>
      <input class="rating-input" type="radio" id="rate-4" name="integration-rating" value="4" checked />
      <label class="rating-star" for="rate-4"><span class="sr-only">4 stars, good</span></label>
      <input class="rating-input" type="radio" id="rate-3" name="integration-rating" value="3" />
      <label class="rating-star" for="rate-3"><span class="sr-only">3 stars, fair</span></label>
      <input class="rating-input" type="radio" id="rate-2" name="integration-rating" value="2" />
      <label class="rating-star" for="rate-2"><span class="sr-only">2 stars, poor</span></label>
      <input class="rating-input" type="radio" id="rate-1" name="integration-rating" value="1" />
      <label class="rating-star" for="rate-1"><span class="sr-only">1 star, unusable</span></label>
    </fieldset>
    <span class="form-hint">Tab to the group, then use the arrow keys to change your rating.</span>
  </div>

  <hr class="divider" />

  <div class="flex items-center gap-3">
    <span class="rating-static" style="--ai-rating-fill: 86%;" role="img" aria-label="Rated 4.3 out of 5">
      <span class="rating-track"></span><span class="rating-fill"></span>
    </span>
    <span class="rating-value">4.3</span>
    <span class="rating-count">1,284 reviews</span>
  </div>
</div>`,
  },

  {
    id: 'checkout-summary',
    name: 'Checkout Summary',
    description:
      'Order summary with line items, a totals ledger in right-aligned tabular numerals, a promo code field and the place order action. Static markup on one flat surface, so it needs no JavaScript.',
    category: 'ecommerce',
    tier: 'free',
    tags: ['checkout', 'cart', 'summary', 'totals', 'ecommerce', 'promo'],
    html: `<div class="checkout" style="max-width: 26rem;">
  <h3 class="checkout-title">Order summary</h3>

  <ul class="checkout-items">
    <li class="checkout-item">
      <span class="checkout-thumb" aria-hidden="true">AD</span>
      <div class="checkout-body">
        <div class="checkout-name">Atlas standing desk, walnut</div>
        <div class="checkout-meta">1600 by 800 mm, qty 1</div>
      </div>
      <span class="checkout-price">$640.00</span>
    </li>
    <li class="checkout-item">
      <span class="checkout-thumb" aria-hidden="true">CC</span>
      <div class="checkout-body">
        <div class="checkout-name">Caliper task chair</div>
        <div class="checkout-meta">Graphite mesh, qty 2</div>
      </div>
      <span class="checkout-price">$498.00</span>
    </li>
    <li class="checkout-item">
      <span class="checkout-thumb" aria-hidden="true">VM</span>
      <div class="checkout-body">
        <div class="checkout-name">Verge monitor arm</div>
        <div class="checkout-meta">Single head, qty 1</div>
      </div>
      <span class="checkout-price">$129.00</span>
    </li>
  </ul>

  <dl class="checkout-totals">
    <div class="checkout-row">
      <dt class="checkout-label">Subtotal</dt>
      <dd class="checkout-value">$1,267.00</dd>
    </div>
    <div class="checkout-row">
      <dt class="checkout-label">Shipping, two day freight</dt>
      <dd class="checkout-value">$45.00</dd>
    </div>
    <div class="checkout-row">
      <dt class="checkout-label">GST</dt>
      <dd class="checkout-value">$126.70</dd>
    </div>
    <div class="checkout-row">
      <dt class="checkout-label">Discount, FITOUT10</dt>
      <dd class="checkout-value is-credit">-$95.00</dd>
    </div>
    <div class="checkout-row is-total">
      <dt class="checkout-label">Total due</dt>
      <dd class="checkout-value">$1,343.70</dd>
    </div>
  </dl>

  <div class="checkout-promo">
    <label class="form-label" for="co-promo">Promo code</label>
    <div class="input-group">
      <input id="co-promo" class="input" type="text" autocomplete="off" placeholder="FITOUT10" />
      <button type="button" class="btn btn-outline">Apply</button>
    </div>
  </div>

  <div class="checkout-actions">
    <button type="submit" class="btn btn-primary w-full">Place order</button>
    <p class="checkout-note">Delivery is booked once payment clears. Returns accepted for 30 days.</p>
  </div>
</div>`,
  },

  {
    id: 'order-status',
    name: 'Order Status Tracker',
    description:
      'Four step fulfilment tracker with completed, current and upcoming states, a monospace tracking number and an estimated delivery date. Static markup with a calm pip on the current step, so no JavaScript and no animation.',
    category: 'ecommerce',
    tier: 'free',
    tags: ['order', 'tracking', 'shipping', 'status', 'steps', 'ecommerce'],
    html: `<div class="order max-w-2xl">
  <div class="orderline-head">
    <div>
      <h3 class="orderline-title">Order 48210 is on its way</h3>
      <p class="text-sm text-secondary">Three items, dispatched from the Alexandria warehouse.</p>
    </div>
    <div class="orderline-eta">
      Estimated delivery
      <strong>Thursday 17 September</strong>
    </div>
  </div>

  <ol class="orderline-track">
    <li class="orderline-step is-completed">
      <span class="orderline-pip" aria-hidden="true"></span>
      <span class="orderline-label">Ordered</span>
      <span class="orderline-date">9 Sep, 10:42</span>
    </li>
    <li class="orderline-step is-completed">
      <span class="orderline-pip" aria-hidden="true"></span>
      <span class="orderline-label">Packed</span>
      <span class="orderline-date">10 Sep, 08:15</span>
    </li>
    <li class="orderline-step is-current" aria-current="step">
      <span class="orderline-pip" aria-hidden="true"></span>
      <span class="orderline-label">Shipped</span>
      <span class="orderline-date">11 Sep, 17:30</span>
    </li>
    <li class="orderline-step is-upcoming">
      <span class="orderline-pip" aria-hidden="true"></span>
      <span class="orderline-label">Delivered</span>
      <span class="orderline-date">Est. 17 Sep</span>
    </li>
  </ol>

  <div class="orderline-meta">
    <span>Southbound Freight tracking <span class="orderline-id">AU7734221905</span></span>
    <a class="btn btn-outline btn-sm" href="#order-48210">Track shipment</a>
  </div>
</div>`,
  },

  {
    id: 'scrollspy-nav',
    name: 'Scrollspy Outline',
    description:
      'Sticky in-page outline whose active link tracks the section in view, marked with a hairline on the inline-start edge and aria-current="location". A link cannot match :target, so without the runtime the link the author marked .is-active stays marked and every link still jumps to its section.',
    category: 'application',
    tier: 'free',
    tags: ['scrollspy', 'navigation', 'outline', 'sticky', 'docs', 'anchor'],
    html: `<div class="scrollspy-layout">
  <nav class="scrollspy" aria-label="On this page" data-ai-scrollspy-root="#spy-pane">
    <p class="scrollspy-title">On this page</p>
    <ul class="scrollspy-list">
      <li><a class="scrollspy-link is-active" aria-current="location" href="#spy-limits">Rate limits</a></li>
      <li><a class="scrollspy-link" href="#spy-retries">Retries and backoff</a></li>
      <li><a class="scrollspy-link" href="#spy-webhooks">Webhook delivery</a></li>
    </ul>
  </nav>

  <div class="scrollspy-pane" id="spy-pane">
    <section class="scrollspy-section" id="spy-limits">
      <h3 class="scrollspy-heading">Rate limits</h3>
      <p class="scrollspy-body">Every API token is allowed 600 requests a minute, measured in a sliding window. The response carries the remaining budget in the X-Rate-Remaining header, and a rejected request returns 429 with the number of seconds until the window resets.</p>
    </section>
    <section class="scrollspy-section" id="spy-retries">
      <h3 class="scrollspy-heading">Retries and backoff</h3>
      <p class="scrollspy-body">Retry a 429 or a 5xx response with exponential backoff, starting at one second and stopping after five attempts. Send the same idempotency key on each attempt so a write is never applied twice.</p>
    </section>
    <section class="scrollspy-section" id="spy-webhooks">
      <h3 class="scrollspy-heading">Webhook delivery</h3>
      <p class="scrollspy-body">Webhooks are signed with your endpoint secret and delivered at least once, so treat duplicates as normal. Return a 2xx within ten seconds; anything slower is treated as a failure and queued for redelivery over the next six hours.</p>
    </section>
  </div>
</div>`,
  },

  {
    id: 'article-card',
    name: 'Article card',
    description:
      'Blog post card: cover image, category as plain muted text, a linked headline, a one line excerpt and an author row with a portrait and a tabular date. The demo is a three up grid that folds on its own container, not on the viewport.',
    category: 'marketing',
    tier: 'free',
    tags: ['article', 'blog', 'post', 'card', 'editorial', 'author'],
    html: `<div class="cq">
  <div class="grid grid-cols-1 cq-md:grid-cols-2 cq-lg:grid-cols-3 gap-6">
    <article class="card">
      <div class="aspect-video overflow-hidden">
        <img class="block w-full h-full object-cover" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&auto=format&fit=crop&q=80" alt="A stylesheet open in an editor beside validator output" width="800" height="450" loading="lazy" />
      </div>
      <div class="card-body flex flex-col gap-2">
        <span class="text-sm text-muted">Engineering</span>
        <h3 class="card-title"><a class="no-underline text-primary hover:text-accent" href="#post-container-queries">How container queries ended our breakpoint sprawl</a></h3>
        <p class="card-description">Nine viewport breakpoints became three container tiers, and the sidebar widget stopped needing a stylesheet of its own.</p>
        <div class="media items-center gap-3 mt-auto pt-2">
          <span class="avatar avatar-sm media-figure"><img src="https://images.unsplash.com/photo-1770396529113-ba031cbf0cfa?w=96&h=96&auto=format&fit=crop&q=80" alt="Amara Osei" width="96" height="96" loading="lazy" /></span>
          <div class="media-body flex items-center gap-2 flex-wrap">
            <span class="text-sm font-semibold">Amara Osei</span>
            <span class="text-sm text-muted tabular">2 September 2026</span>
          </div>
        </div>
      </div>
    </article>

    <article class="card">
      <div class="aspect-video overflow-hidden">
        <img class="block w-full h-full object-cover" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&auto=format&fit=crop&q=80" alt="Two engineers reading a diff together on a laptop" width="800" height="450" loading="lazy" />
      </div>
      <div class="card-body flex flex-col gap-2">
        <span class="text-sm text-muted">Research</span>
        <h3 class="card-title"><a class="no-underline text-primary hover:text-accent" href="#post-agent-css-errors">What agents actually get wrong when they write CSS</a></h3>
        <p class="card-description">We ran the validator over 4,000 generated snippets and found that four mistakes account for most of the failures.</p>
        <div class="media items-center gap-3 mt-auto pt-2">
          <span class="avatar avatar-sm media-figure"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&auto=format&fit=crop&q=80" alt="Jonas Berg" width="96" height="96" loading="lazy" /></span>
          <div class="media-body flex items-center gap-2 flex-wrap">
            <span class="text-sm font-semibold">Jonas Berg</span>
            <span class="text-sm text-muted tabular">21 August 2026</span>
          </div>
        </div>
      </div>
    </article>

    <article class="card">
      <div class="aspect-video overflow-hidden">
        <img class="block w-full h-full object-cover" src="https://images.unsplash.com/photo-1629317297639-9201108cca3c?w=800&h=450&auto=format&fit=crop&q=80" alt="A desk mat, notebook and ruler laid out on a working surface" width="800" height="450" loading="lazy" />
      </div>
      <div class="card-body flex flex-col gap-2">
        <span class="text-sm text-muted">Design</span>
        <h3 class="card-title"><a class="no-underline text-primary hover:text-accent" href="#post-hairlines-beat-shadows">Hairlines beat shadows once a card drops under 360 pixels</a></h3>
        <p class="card-description">A drop shadow needs room to read. At phone width a one pixel rule separates two rows and costs nothing.</p>
        <div class="media items-center gap-3 mt-auto pt-2">
          <span class="avatar avatar-sm media-figure"><img src="https://images.unsplash.com/photo-1582639849680-e2e89674e57b?w=96&h=96&auto=format&fit=crop&q=80" alt="Hana Sato" width="96" height="96" loading="lazy" /></span>
          <div class="media-body flex items-center gap-2 flex-wrap">
            <span class="text-sm font-semibold">Hana Sato</span>
            <span class="text-sm text-muted tabular">6 August 2026</span>
          </div>
        </div>
      </div>
    </article>
  </div>
</div>`,
    variants: [
      {
        id: 'list-rows',
        name: 'List rows',
        description:
          'The cards become horizontal rows on one surface: thumbnail at the inline start, category, headline, excerpt and author at the inline end, separated by hairlines instead of by borders and shadows.',
        guidance:
          'Use for a blog index, a search result page or a related-reading rail in a narrow column, where the reader is scanning headlines in order rather than browsing covers. Do not use it when the cover image is the reason to click, as a news or photography feed usually is: a 112 pixel thumbnail carries a face, not a scene. The rows share one list-group-flush surface so no row is a box inside a box, which is law 1, and the thumbnail keeps a fixed width and height so a portrait cover and a landscape cover produce the same row height. It pairs with the same author row as the default, kept on one wrapping line so a long name never pushes the date onto its own row.',
        html: `<ul class="list-group list-group-flush max-w-2xl">
  <li class="list-group-item items-start gap-4 py-4">
    <span class="shrink-0">
      <img class="block w-28 h-20 object-cover rounded-md" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=224&h=160&auto=format&fit=crop&q=80" alt="A stylesheet open in an editor beside validator output" width="224" height="160" loading="lazy" />
    </span>
    <div class="min-w-0 flex flex-col gap-1">
      <span class="text-sm text-muted">Engineering</span>
      <h3 class="card-title text-base"><a class="no-underline text-primary hover:text-accent" href="#post-container-queries">How container queries ended our breakpoint sprawl</a></h3>
      <p class="card-description">Nine viewport breakpoints became three container tiers, and the sidebar widget stopped needing a stylesheet of its own.</p>
      <div class="flex items-center gap-2 flex-wrap mt-1">
        <span class="avatar avatar-sm"><img src="https://images.unsplash.com/photo-1770396529113-ba031cbf0cfa?w=96&h=96&auto=format&fit=crop&q=80" alt="Amara Osei" width="96" height="96" loading="lazy" /></span>
        <span class="text-sm font-semibold">Amara Osei</span>
        <span class="text-sm text-muted tabular">2 September 2026</span>
      </div>
    </div>
  </li>
  <li class="list-group-item items-start gap-4 py-4">
    <span class="shrink-0">
      <img class="block w-28 h-20 object-cover rounded-md" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=224&h=160&auto=format&fit=crop&q=80" alt="Two engineers reading a diff together on a laptop" width="224" height="160" loading="lazy" />
    </span>
    <div class="min-w-0 flex flex-col gap-1">
      <span class="text-sm text-muted">Research</span>
      <h3 class="card-title text-base"><a class="no-underline text-primary hover:text-accent" href="#post-agent-css-errors">What agents actually get wrong when they write CSS</a></h3>
      <p class="card-description">We ran the validator over 4,000 generated snippets and found that four mistakes account for most of the failures.</p>
      <div class="flex items-center gap-2 flex-wrap mt-1">
        <span class="avatar avatar-sm"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&auto=format&fit=crop&q=80" alt="Jonas Berg" width="96" height="96" loading="lazy" /></span>
        <span class="text-sm font-semibold">Jonas Berg</span>
        <span class="text-sm text-muted tabular">21 August 2026</span>
      </div>
    </div>
  </li>
  <li class="list-group-item items-start gap-4 py-4">
    <span class="shrink-0">
      <img class="block w-28 h-20 object-cover rounded-md" src="https://images.unsplash.com/photo-1629317297639-9201108cca3c?w=224&h=160&auto=format&fit=crop&q=80" alt="A desk mat, notebook and ruler laid out on a working surface" width="224" height="160" loading="lazy" />
    </span>
    <div class="min-w-0 flex flex-col gap-1">
      <span class="text-sm text-muted">Design</span>
      <h3 class="card-title text-base"><a class="no-underline text-primary hover:text-accent" href="#post-hairlines-beat-shadows">Hairlines beat shadows once a card drops under 360 pixels</a></h3>
      <p class="card-description">A drop shadow needs room to read. At phone width a one pixel rule separates two rows and costs nothing.</p>
      <div class="flex items-center gap-2 flex-wrap mt-1">
        <span class="avatar avatar-sm"><img src="https://images.unsplash.com/photo-1582639849680-e2e89674e57b?w=96&h=96&auto=format&fit=crop&q=80" alt="Hana Sato" width="96" height="96" loading="lazy" /></span>
        <span class="text-sm font-semibold">Hana Sato</span>
        <span class="text-sm text-muted tabular">6 August 2026</span>
      </div>
    </div>
  </li>
</ul>`,
      },
    ],
  },

  {
    id: 'contact-section',
    name: 'Contact section',
    description:
      'Two column contact block: a heading, one paragraph and a details list of email, address and office hours on one side, a four field form with a primary submit on the other. The split is a container query, so the section folds inside a narrow column without a viewport breakpoint.',
    category: 'marketing',
    tier: 'free',
    tags: ['contact', 'form', 'section', 'email', 'support', 'address'],
    html: `<section class="cq">
  <div class="grid grid-cols-1 cq-md:grid-cols-2 gap-8 items-start">
    <div>
      <h2 class="section-title">Talk to the people who maintain it</h2>
      <p class="section-lead">Every message lands with the three engineers who ship the library. We answer within one business day and we never pass an address on.</p>
      <dl class="detail mt-6">
        <dt>Email</dt>
        <dd><a class="link" href="mailto:support@llmcss.io">support@llmcss.io</a></dd>
        <dt>Studio</dt>
        <dd>Level 3, 412 Kent Street, Sydney NSW 2000</dd>
        <dt>Office hours</dt>
        <dd>Monday to Friday, 9:00 to 17:00 AEST</dd>
      </dl>
    </div>

    <form class="grid gap-4">
      <div class="form-group mb-0">
        <label class="form-label" for="contact-section-name">Full name</label>
        <input class="input h-11" type="text" id="contact-section-name" name="name" autocomplete="name" placeholder="Amara Osei" />
      </div>
      <div class="form-group mb-0">
        <label class="form-label" for="contact-section-email">Work email</label>
        <input class="input h-11" type="email" id="contact-section-email" name="email" autocomplete="email" placeholder="amara@meridian.studio" />
        <span class="form-hint">We reply to this address and nothing else is sent to it.</span>
      </div>
      <div class="form-group mb-0">
        <label class="form-label" for="contact-section-topic">Topic</label>
        <select class="select h-11" id="contact-section-topic" name="topic">
          <option>Migrating a Tailwind codebase</option>
          <option>Pro templates and licensing</option>
          <option>Reporting a bug</option>
          <option>Something else</option>
        </select>
      </div>
      <div class="form-group mb-0">
        <label class="form-label" for="contact-section-message">Message</label>
        <textarea class="textarea" id="contact-section-message" name="message" rows="4" placeholder="Tell us what you are building and where it is stuck."></textarea>
        <span class="form-hint">Paste the markup or the validator output if you have it to hand.</span>
      </div>
      <button class="btn btn-primary h-11" type="submit">Send message</button>
    </form>
  </div>
</section>`,
    variants: [
      {
        id: 'map-first',
        name: 'Map first',
        description:
          'The details list moves above a wide location photo in the first column and the form keeps the second, so the reader sees where you are before deciding whether to write.',
        guidance:
          'Use when the address is the point: a studio, a showroom, a clinic or an office that takes walk-ins, and any page where a reader may be choosing between visiting and writing. Do not use it for a support or sales form where nobody will ever come to the door, because the photo pushes the submit button down the page for no return. The photo sits in a fixed sixteen by nine frame under the details list rather than behind it, so the address stays on the surface colour and keeps its contrast in both themes. It pairs with the same four field form as the default, and on a narrow container the two columns stack with the form last, which keeps the address and the photo together.',
        html: `<section class="cq">
  <div class="grid grid-cols-1 cq-md:grid-cols-2 gap-8 items-start">
    <div>
      <h2 class="section-title">Come and see the work in person</h2>
      <p class="section-lead">The studio is two minutes from Wynyard station. Knock on the Kent Street door, or write first and we will hold a desk for you.</p>
      <dl class="detail mt-6">
        <dt>Email</dt>
        <dd><a class="link" href="mailto:studio@llmcss.io">studio@llmcss.io</a></dd>
        <dt>Studio</dt>
        <dd>Level 3, 412 Kent Street, Sydney NSW 2000</dd>
        <dt>Office hours</dt>
        <dd>Monday to Friday, 9:00 to 17:00 AEST</dd>
      </dl>
      <div class="aspect-video overflow-hidden rounded-lg mt-6">
        <img class="block w-full h-full object-cover" src="https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=960&h=540&auto=format&fit=crop&q=80" alt="Aerial view of the city blocks around the studio entrance" width="960" height="540" loading="lazy" />
      </div>
    </div>

    <form class="grid gap-4">
      <div class="form-group mb-0">
        <label class="form-label" for="contact-map-name">Full name</label>
        <input class="input h-11" type="text" id="contact-map-name" name="name" autocomplete="name" placeholder="Jonas Berg" />
      </div>
      <div class="form-group mb-0">
        <label class="form-label" for="contact-map-email">Work email</label>
        <input class="input h-11" type="email" id="contact-map-email" name="email" autocomplete="email" placeholder="jonas@northline.dev" />
        <span class="form-hint">We reply to this address and nothing else is sent to it.</span>
      </div>
      <div class="form-group mb-0">
        <label class="form-label" for="contact-map-topic">Topic</label>
        <select class="select h-11" id="contact-map-topic" name="topic">
          <option>Booking a desk for the day</option>
          <option>A workshop for my team</option>
          <option>Press and speaking</option>
          <option>Something else</option>
        </select>
      </div>
      <div class="form-group mb-0">
        <label class="form-label" for="contact-map-message">Message</label>
        <textarea class="textarea" id="contact-map-message" name="message" rows="4" placeholder="Tell us when you would like to come and how many of you there are."></textarea>
        <span class="form-hint">Give us a date and we will confirm it the same day.</span>
      </div>
      <button class="btn btn-primary h-11" type="submit">Send message</button>
    </form>
  </div>
</section>`,
      },
    ],
  },

  {
    id: 'review-list',
    name: 'Review list',
    description:
      'The average rating on one line above the reviews themselves: one hairline separated row per reviewer with a portrait, a star row, a tabular date and the review held to a prose measure.',
    category: 'ecommerce',
    tier: 'free',
    tags: ['reviews', 'rating', 'stars', 'testimonial', 'list', 'product'],
    html: `<div class="flex flex-col gap-5 max-w-lg">
  <div class="flex items-center gap-3">
    <span class="rating-static" role="img" aria-label="Rated 4.0 out of 5">
      <span class="rating-track"></span><span class="rating-fill w-4/5"></span>
    </span>
    <span class="rating-value">4.0</span>
    <span class="rating-count">1,284 reviews</span>
  </div>

  <ul class="list-group list-group-flush">
    <li class="list-group-item items-start gap-3 py-4">
      <span class="avatar"><img src="https://images.unsplash.com/photo-1770396529113-ba031cbf0cfa?w=96&h=96&auto=format&fit=crop&q=80" alt="Amara Osei" width="96" height="96" loading="lazy" /></span>
      <div class="flex flex-col gap-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-semibold text-sm">Amara Osei</span>
          <span class="rating-static" role="img" aria-label="Rated 5 out of 5">
            <span class="rating-track"></span><span class="rating-fill w-full"></span>
          </span>
          <span class="text-sm text-muted tabular">2 September 2026</span>
        </div>
        <p class="text-sm max-w-prose">Mixed a full record on these over three weeks and never reached for the monitors. The clamp is firm out of the box and settles after a day or two.</p>
      </div>
    </li>
    <li class="list-group-item items-start gap-3 py-4">
      <span class="avatar"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&auto=format&fit=crop&q=80" alt="Jonas Berg" width="96" height="96" loading="lazy" /></span>
      <div class="flex flex-col gap-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-semibold text-sm">Jonas Berg</span>
          <span class="rating-static" role="img" aria-label="Rated 4 out of 5">
            <span class="rating-track"></span><span class="rating-fill w-4/5"></span>
          </span>
          <span class="text-sm text-muted tabular">21 August 2026</span>
        </div>
        <p class="text-sm max-w-prose">Battery lasted four long haul flights on one charge. The case is bigger than it needs to be, which is the only reason this is not five stars.</p>
      </div>
    </li>
    <li class="list-group-item items-start gap-3 py-4">
      <span class="avatar"><img src="https://images.unsplash.com/photo-1582639849680-e2e89674e57b?w=96&h=96&auto=format&fit=crop&q=80" alt="Hana Sato" width="96" height="96" loading="lazy" /></span>
      <div class="flex flex-col gap-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-semibold text-sm">Hana Sato</span>
          <span class="rating-static" role="img" aria-label="Rated 3 out of 5">
            <span class="rating-track"></span><span class="rating-fill w-3/5"></span>
          </span>
          <span class="text-sm text-muted tabular">6 August 2026</span>
        </div>
        <p class="text-sm max-w-prose">Sound is exactly as described and the balanced cable is a real one. My glasses break the seal on the left cup, so the bass goes with them.</p>
      </div>
    </li>
  </ul>
</div>`,
    variants: [
      {
        id: 'with-summary-bars',
        name: 'With summary bars',
        description:
          'A five row distribution moves in beside the average from cq-md up, so the shape of the scores is visible before the first review is read.',
        guidance:
          'Use on a product detail page or a reviews page with enough volume for the distribution to mean something, roughly a few hundred ratings and up: a 4.0 built from 575 fives and 54 ones is a different product from a 4.0 everyone agrees on. Do not use it on a new listing with eleven reviews, where five near empty bars read as a problem the product does not have. The histogram sits in the second column of a container query grid rather than a viewport one, so it drops under the average inside a narrow card and never squeezes the bars to a stub. Bar widths are width utilities measured against the largest band, which keeps the chart free of a colour of its own and correct in every skin.',
        html: `<div class="cq">
  <div class="flex flex-col gap-5 max-w-2xl">
    <div class="grid grid-cols-1 cq-md:grid-cols-2 gap-5 items-center">
      <div class="flex items-center gap-3">
        <span class="rating-static" role="img" aria-label="Rated 4.0 out of 5">
          <span class="rating-track"></span><span class="rating-fill w-4/5"></span>
        </span>
        <span class="rating-value">4.0</span>
        <span class="rating-count">1,284 reviews</span>
      </div>

      <div class="bars">
        <div class="bar-row"><span>5 stars</span><div class="bar-track"><div class="bar-fill w-full"></div></div><span>575</span></div>
        <div class="bar-row"><span>4 stars</span><div class="bar-track"><div class="bar-fill w-3/5"></div></div><span>360</span></div>
        <div class="bar-row"><span>3 stars</span><div class="bar-track"><div class="bar-fill w-1/3"></div></div><span>200</span></div>
        <div class="bar-row"><span>2 stars</span><div class="bar-track"><div class="bar-fill w-1/6"></div></div><span>95</span></div>
        <div class="bar-row"><span>1 star</span><div class="bar-track"><div class="bar-fill w-1/12"></div></div><span>54</span></div>
      </div>
    </div>

    <ul class="list-group list-group-flush">
      <li class="list-group-item items-start gap-3 py-4">
        <span class="avatar"><img src="https://images.unsplash.com/photo-1770396529113-ba031cbf0cfa?w=96&h=96&auto=format&fit=crop&q=80" alt="Amara Osei" width="96" height="96" loading="lazy" /></span>
        <div class="flex flex-col gap-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold text-sm">Amara Osei</span>
            <span class="rating-static" role="img" aria-label="Rated 5 out of 5">
              <span class="rating-track"></span><span class="rating-fill w-full"></span>
            </span>
            <span class="text-sm text-muted tabular">2 September 2026</span>
          </div>
          <p class="text-sm max-w-prose">Mixed a full record on these over three weeks and never reached for the monitors. The clamp is firm out of the box and settles after a day or two.</p>
        </div>
      </li>
      <li class="list-group-item items-start gap-3 py-4">
        <span class="avatar"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&auto=format&fit=crop&q=80" alt="Jonas Berg" width="96" height="96" loading="lazy" /></span>
        <div class="flex flex-col gap-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold text-sm">Jonas Berg</span>
            <span class="rating-static" role="img" aria-label="Rated 4 out of 5">
              <span class="rating-track"></span><span class="rating-fill w-4/5"></span>
            </span>
            <span class="text-sm text-muted tabular">21 August 2026</span>
          </div>
          <p class="text-sm max-w-prose">Battery lasted four long haul flights on one charge. The case is bigger than it needs to be, which is the only reason this is not five stars.</p>
        </div>
      </li>
      <li class="list-group-item items-start gap-3 py-4">
        <span class="avatar"><img src="https://images.unsplash.com/photo-1582639849680-e2e89674e57b?w=96&h=96&auto=format&fit=crop&q=80" alt="Hana Sato" width="96" height="96" loading="lazy" /></span>
        <div class="flex flex-col gap-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold text-sm">Hana Sato</span>
            <span class="rating-static" role="img" aria-label="Rated 3 out of 5">
              <span class="rating-track"></span><span class="rating-fill w-3/5"></span>
            </span>
            <span class="text-sm text-muted tabular">6 August 2026</span>
          </div>
          <p class="text-sm max-w-prose">Sound is exactly as described and the balanced cable is a real one. My glasses break the seal on the left cup, so the bass goes with them.</p>
        </div>
      </li>
    </ul>
  </div>
</div>`,
      },
    ],
  },
];
