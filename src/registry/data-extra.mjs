/**
 * Additional free components: form and identity primitives, two commerce
 * blocks and an in-page outline.
 *
 * Styles live in src/css/components/forms-extra.css, commerce-extra.css and
 * scrollspy.css. The two runtime helpers (src/runtime/combobox.ts and
 * src/runtime/scrollspy.ts) are progressive enhancement: every entry below
 * renders and stays usable with no JavaScript at all.
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
];
