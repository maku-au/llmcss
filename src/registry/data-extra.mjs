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
    html: `<div class="ai-flex ai-flex-col ai-gap-5" style="max-width: 24rem;">
  <div class="ai-form-group">
    <label class="ai-form-label" for="cb-region">Deployment region</label>
    <div class="ai-combobox">
      <input id="cb-region" class="ai-input" type="text" role="combobox" aria-expanded="false" aria-controls="cb-region-list" aria-autocomplete="list" autocomplete="off" placeholder="Start typing a city" />
      <ul class="ai-combobox-list" id="cb-region-list" role="listbox" aria-label="Deployment region">
        <li class="ai-combobox-option" role="option" aria-selected="false">Sydney <span class="ai-combobox-hint">ap-southeast-2</span></li>
        <li class="ai-combobox-option" role="option" aria-selected="false">Singapore <span class="ai-combobox-hint">ap-southeast-1</span></li>
        <li class="ai-combobox-option" role="option" aria-selected="false">Frankfurt <span class="ai-combobox-hint">eu-central-1</span></li>
        <li class="ai-combobox-option" role="option" aria-selected="false">Sao Paulo <span class="ai-combobox-hint">sa-east-1</span></li>
        <li class="ai-combobox-option" role="option" aria-selected="false">Oregon <span class="ai-combobox-hint">us-west-2</span></li>
        <li class="ai-combobox-option" role="option" aria-disabled="true">Osaka <span class="ai-combobox-hint">at capacity</span></li>
        <li class="ai-combobox-empty" hidden>No region matches that name.</li>
      </ul>
    </div>
    <span class="ai-form-hint">Arrow keys move through matches, Enter selects, Escape closes.</span>
  </div>

  <div class="ai-form-group">
    <label class="ai-form-label" for="cb-native">Billing currency</label>
    <input id="cb-native" class="ai-input" type="text" list="cb-native-options" autocomplete="off" placeholder="AUD" />
    <datalist id="cb-native-options">
      <option value="AUD"></option>
      <option value="EUR"></option>
      <option value="SGD"></option>
      <option value="USD"></option>
    </datalist>
    <span class="ai-form-hint">A field with a list attribute keeps the browser datalist and is never enhanced.</span>
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
    html: `<div class="ai-calendar-panel" style="max-width: 20rem;">
  <div class="ai-calendar-header">
    <button type="button" class="ai-btn ai-btn-ghost ai-btn-icon ai-btn-sm" aria-label="Previous month, August 2026">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
    </button>
    <span class="ai-calendar-title" id="cal-label" aria-live="polite">September 2026</span>
    <button type="button" class="ai-btn ai-btn-ghost ai-btn-icon ai-btn-sm" aria-label="Next month, October 2026">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
  <table class="ai-calendar" role="grid" aria-labelledby="cal-label">
    <thead>
      <tr>
        <th scope="col" class="ai-calendar-weekday"><abbr title="Monday">Mon</abbr></th>
        <th scope="col" class="ai-calendar-weekday"><abbr title="Tuesday">Tue</abbr></th>
        <th scope="col" class="ai-calendar-weekday"><abbr title="Wednesday">Wed</abbr></th>
        <th scope="col" class="ai-calendar-weekday"><abbr title="Thursday">Thu</abbr></th>
        <th scope="col" class="ai-calendar-weekday"><abbr title="Friday">Fri</abbr></th>
        <th scope="col" class="ai-calendar-weekday"><abbr title="Saturday">Sat</abbr></th>
        <th scope="col" class="ai-calendar-weekday"><abbr title="Sunday">Sun</abbr></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td role="gridcell"><button type="button" class="ai-calendar-day is-muted" tabindex="-1" disabled>31</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>1</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>2</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>3</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>4</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>5</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>6</button></td>
      </tr>
      <tr>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>7</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>8</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>9</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>10</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1" disabled>11</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day is-today" tabindex="-1" aria-current="date">12</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">13</button></td>
      </tr>
      <tr>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">14</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">15</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">16</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">17</button></td>
        <td role="gridcell" aria-selected="true"><button type="button" class="ai-calendar-day is-selected" tabindex="0">18</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">19</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">20</button></td>
      </tr>
      <tr>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">21</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">22</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">23</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">24</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">25</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">26</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">27</button></td>
      </tr>
      <tr>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">28</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">29</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day" tabindex="-1">30</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day is-muted" tabindex="-1" disabled>1</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day is-muted" tabindex="-1" disabled>2</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day is-muted" tabindex="-1" disabled>3</button></td>
        <td role="gridcell"><button type="button" class="ai-calendar-day is-muted" tabindex="-1" disabled>4</button></td>
      </tr>
    </tbody>
  </table>
  <div class="ai-calendar-footer">
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
    html: `<div class="ai-flex ai-flex-wrap ai-gap-8">
  <div class="ai-form-group" style="max-width: 14rem;">
    <label class="ai-form-label" for="stp-seats">Team seats</label>
    <div class="ai-stepper-input">
      <button type="button" class="ai-stepper-btn" data-ai-step="-1" aria-controls="stp-seats" aria-label="Decrease seats"></button>
      <input id="stp-seats" class="ai-input" type="number" inputmode="numeric" value="12" min="1" max="250" step="1" />
      <button type="button" class="ai-stepper-btn is-increment" data-ai-step="1" aria-controls="stp-seats" aria-label="Increase seats"></button>
    </div>
    <span class="ai-form-hint">Billed monthly, prorated on change.</span>
  </div>

  <div class="ai-form-group" style="max-width: 14rem;">
    <label class="ai-form-label" for="stp-qty">Quantity</label>
    <div class="ai-stepper-input">
      <button type="button" class="ai-stepper-btn" data-ai-step="-1" aria-controls="stp-qty" aria-label="Decrease quantity" disabled></button>
      <input id="stp-qty" class="ai-input" type="number" inputmode="numeric" value="1" min="1" max="10" step="1" />
      <button type="button" class="ai-stepper-btn is-increment" data-ai-step="1" aria-controls="stp-qty" aria-label="Increase quantity"></button>
    </div>
    <span class="ai-form-hint">Ten per order while stock is limited.</span>
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
    html: `<div class="ai-flex ai-flex-col ai-gap-4" style="max-width: 24rem;">
  <div class="ai-form-group">
    <label class="ai-form-label" for="pw-current">Current password</label>
    <div class="ai-password">
      <input id="pw-current" class="ai-input" type="password" value="corvid-lantern-94" autocomplete="current-password" />
      <button type="button" class="ai-password-toggle" data-ai-password-toggle="#pw-current" aria-pressed="false" aria-label="Show password"></button>
    </div>
  </div>

  <div class="ai-form-group">
    <label class="ai-form-label" for="pw-new">New password</label>
    <div class="ai-password">
      <input id="pw-new" class="ai-input" type="password" autocomplete="new-password" placeholder="At least 12 characters" aria-describedby="pw-new-hint" />
      <button type="button" class="ai-password-toggle" data-ai-password-toggle="#pw-new" aria-pressed="false" aria-label="Show password"></button>
    </div>
    <span class="ai-form-hint" id="pw-new-hint">Use a passphrase you do not use anywhere else.</span>
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
    html: `<div class="ai-flex ai-flex-col ai-gap-5">
  <div class="ai-flex ai-flex-wrap ai-gap-6">
    <div class="ai-flex ai-items-center ai-gap-3">
      <span class="ai-avatar">RA<span class="ai-avatar-status ai-avatar-status-online"><span class="ai-sr-only">Online</span></span></span>
      <div>
        <div class="ai-text-sm ai-font-medium">Rina Alvarez</div>
        <div class="ai-text-xs ai-text-muted">Online</div>
      </div>
    </div>
    <div class="ai-flex ai-items-center ai-gap-3">
      <span class="ai-avatar">MO<span class="ai-avatar-status ai-avatar-status-away"><span class="ai-sr-only">Away</span></span></span>
      <div>
        <div class="ai-text-sm ai-font-medium">Miles Okafor</div>
        <div class="ai-text-xs ai-text-muted">Away since 14:20</div>
      </div>
    </div>
    <div class="ai-flex ai-items-center ai-gap-3">
      <span class="ai-avatar">JT<span class="ai-avatar-status ai-avatar-status-busy"><span class="ai-sr-only">Busy</span></span></span>
      <div>
        <div class="ai-text-sm ai-font-medium">Junko Tan</div>
        <div class="ai-text-xs ai-text-muted">In a review</div>
      </div>
    </div>
    <div class="ai-flex ai-items-center ai-gap-3">
      <span class="ai-avatar">DW<span class="ai-avatar-status ai-avatar-status-offline"><span class="ai-sr-only">Offline</span></span></span>
      <div>
        <div class="ai-text-sm ai-font-medium">Devon Wright</div>
        <div class="ai-text-xs ai-text-muted">Offline</div>
      </div>
    </div>
  </div>

  <hr class="ai-divider" />

  <div class="ai-flex ai-items-center ai-gap-4">
    <span class="ai-avatar ai-avatar-sm">RA<span class="ai-avatar-status ai-avatar-status-online"><span class="ai-sr-only">Online</span></span></span>
    <span class="ai-avatar ai-avatar-lg">RA<span class="ai-avatar-status ai-avatar-status-online"><span class="ai-sr-only">Online</span></span></span>
    <span class="ai-text-xs ai-text-muted">The dot and its ring scale with the avatar size.</span>
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
    html: `<div class="ai-flex ai-flex-col ai-gap-6" style="max-width: 26rem;">
  <div class="ai-form-group">
    <fieldset class="ai-rating">
      <legend class="ai-sr-only">Rate the Northwind integration</legend>
      <input class="ai-rating-input" type="radio" id="rate-5" name="integration-rating" value="5" />
      <label class="ai-rating-star" for="rate-5"><span class="ai-sr-only">5 stars, excellent</span></label>
      <input class="ai-rating-input" type="radio" id="rate-4" name="integration-rating" value="4" checked />
      <label class="ai-rating-star" for="rate-4"><span class="ai-sr-only">4 stars, good</span></label>
      <input class="ai-rating-input" type="radio" id="rate-3" name="integration-rating" value="3" />
      <label class="ai-rating-star" for="rate-3"><span class="ai-sr-only">3 stars, fair</span></label>
      <input class="ai-rating-input" type="radio" id="rate-2" name="integration-rating" value="2" />
      <label class="ai-rating-star" for="rate-2"><span class="ai-sr-only">2 stars, poor</span></label>
      <input class="ai-rating-input" type="radio" id="rate-1" name="integration-rating" value="1" />
      <label class="ai-rating-star" for="rate-1"><span class="ai-sr-only">1 star, unusable</span></label>
    </fieldset>
    <span class="ai-form-hint">Tab to the group, then use the arrow keys to change your rating.</span>
  </div>

  <hr class="ai-divider" />

  <div class="ai-flex ai-items-center ai-gap-3">
    <span class="ai-rating-static" style="--ai-rating-fill: 86%;" role="img" aria-label="Rated 4.3 out of 5">
      <span class="ai-rating-track"></span><span class="ai-rating-fill"></span>
    </span>
    <span class="ai-rating-value">4.3</span>
    <span class="ai-rating-count">1,284 reviews</span>
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
    html: `<div class="ai-checkout" style="max-width: 26rem;">
  <h3 class="ai-checkout-title">Order summary</h3>

  <ul class="ai-checkout-items">
    <li class="ai-checkout-item">
      <span class="ai-checkout-thumb" aria-hidden="true">AD</span>
      <div class="ai-checkout-body">
        <div class="ai-checkout-name">Atlas standing desk, walnut</div>
        <div class="ai-checkout-meta">1600 by 800 mm, qty 1</div>
      </div>
      <span class="ai-checkout-price">$640.00</span>
    </li>
    <li class="ai-checkout-item">
      <span class="ai-checkout-thumb" aria-hidden="true">CC</span>
      <div class="ai-checkout-body">
        <div class="ai-checkout-name">Caliper task chair</div>
        <div class="ai-checkout-meta">Graphite mesh, qty 2</div>
      </div>
      <span class="ai-checkout-price">$498.00</span>
    </li>
    <li class="ai-checkout-item">
      <span class="ai-checkout-thumb" aria-hidden="true">VM</span>
      <div class="ai-checkout-body">
        <div class="ai-checkout-name">Verge monitor arm</div>
        <div class="ai-checkout-meta">Single head, qty 1</div>
      </div>
      <span class="ai-checkout-price">$129.00</span>
    </li>
  </ul>

  <dl class="ai-checkout-totals">
    <div class="ai-checkout-row">
      <dt class="ai-checkout-label">Subtotal</dt>
      <dd class="ai-checkout-value">$1,267.00</dd>
    </div>
    <div class="ai-checkout-row">
      <dt class="ai-checkout-label">Shipping, two day freight</dt>
      <dd class="ai-checkout-value">$45.00</dd>
    </div>
    <div class="ai-checkout-row">
      <dt class="ai-checkout-label">GST</dt>
      <dd class="ai-checkout-value">$126.70</dd>
    </div>
    <div class="ai-checkout-row">
      <dt class="ai-checkout-label">Discount, FITOUT10</dt>
      <dd class="ai-checkout-value is-credit">-$95.00</dd>
    </div>
    <div class="ai-checkout-row is-total">
      <dt class="ai-checkout-label">Total due</dt>
      <dd class="ai-checkout-value">$1,343.70</dd>
    </div>
  </dl>

  <div class="ai-checkout-promo">
    <label class="ai-form-label" for="co-promo">Promo code</label>
    <div class="ai-input-group">
      <input id="co-promo" class="ai-input" type="text" autocomplete="off" placeholder="FITOUT10" />
      <button type="button" class="ai-btn ai-btn-outline">Apply</button>
    </div>
  </div>

  <div class="ai-checkout-actions">
    <button type="submit" class="ai-btn ai-btn-primary ai-w-full">Place order</button>
    <p class="ai-checkout-note">Delivery is booked once payment clears. Returns accepted for 30 days.</p>
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
    html: `<div class="ai-order" style="max-width: 40rem;">
  <div class="ai-order-head">
    <div>
      <h3 class="ai-order-title">Order 48210 is on its way</h3>
      <p class="ai-text-sm ai-text-secondary">Three items, dispatched from the Alexandria warehouse.</p>
    </div>
    <div class="ai-order-eta">
      Estimated delivery
      <strong>Thursday 17 September</strong>
    </div>
  </div>

  <ol class="ai-order-track">
    <li class="ai-order-step is-completed">
      <span class="ai-order-pip" aria-hidden="true"></span>
      <span class="ai-order-label">Ordered</span>
      <span class="ai-order-date">9 Sep, 10:42</span>
    </li>
    <li class="ai-order-step is-completed">
      <span class="ai-order-pip" aria-hidden="true"></span>
      <span class="ai-order-label">Packed</span>
      <span class="ai-order-date">10 Sep, 08:15</span>
    </li>
    <li class="ai-order-step is-current" aria-current="step">
      <span class="ai-order-pip" aria-hidden="true"></span>
      <span class="ai-order-label">Shipped</span>
      <span class="ai-order-date">11 Sep, 17:30</span>
    </li>
    <li class="ai-order-step is-upcoming">
      <span class="ai-order-pip" aria-hidden="true"></span>
      <span class="ai-order-label">Delivered</span>
      <span class="ai-order-date">Est. 17 Sep</span>
    </li>
  </ol>

  <div class="ai-order-meta">
    <span>Southbound Freight tracking <span class="ai-order-id">AU7734221905</span></span>
    <a class="ai-btn ai-btn-outline ai-btn-sm" href="#order-48210">Track shipment</a>
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
    html: `<div class="ai-scrollspy-layout">
  <nav class="ai-scrollspy" aria-label="On this page" data-ai-scrollspy-root="#spy-pane">
    <p class="ai-scrollspy-title">On this page</p>
    <ul class="ai-scrollspy-list">
      <li><a class="ai-scrollspy-link is-active" aria-current="location" href="#spy-limits">Rate limits</a></li>
      <li><a class="ai-scrollspy-link" href="#spy-retries">Retries and backoff</a></li>
      <li><a class="ai-scrollspy-link" href="#spy-webhooks">Webhook delivery</a></li>
    </ul>
  </nav>

  <div class="ai-scrollspy-pane" id="spy-pane">
    <section class="ai-scrollspy-section" id="spy-limits">
      <h3 class="ai-scrollspy-heading">Rate limits</h3>
      <p class="ai-scrollspy-body">Every API token is allowed 600 requests a minute, measured in a sliding window. The response carries the remaining budget in the X-Rate-Remaining header, and a rejected request returns 429 with the number of seconds until the window resets.</p>
    </section>
    <section class="ai-scrollspy-section" id="spy-retries">
      <h3 class="ai-scrollspy-heading">Retries and backoff</h3>
      <p class="ai-scrollspy-body">Retry a 429 or a 5xx response with exponential backoff, starting at one second and stopping after five attempts. Send the same idempotency key on each attempt so a write is never applied twice.</p>
    </section>
    <section class="ai-scrollspy-section" id="spy-webhooks">
      <h3 class="ai-scrollspy-heading">Webhook delivery</h3>
      <p class="ai-scrollspy-body">Webhooks are signed with your endpoint secret and delivered at least once, so treat duplicates as normal. Return a 2xx within ten seconds; anything slower is treated as a failure and queued for redelivery over the next six hours.</p>
    </section>
  </div>
</div>`,
  },
];
