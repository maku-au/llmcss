/**
 * Batch 3: ecommerce layout variants.
 *
 * A variant is a structural alternative to a component's default layout: the
 * boxes move. Media left versus media top, one column versus two, a drawer
 * versus a page section, a rail versus a stack. A recolour, a radius change or
 * a density change is not a variant; those are data-ai-skin, data-ai-accent and
 * data-ai-density.
 *
 * Every entry reuses its parent's copy, product names, prices and Unsplash
 * photographs verbatim, so the only thing a reader compares is the layout.
 * Every snippet composes classes that already exist in public/classes.json and
 * states that already exist in public/states.json: no CSS ships with this file.
 *
 * Keyed by parent component id. Addressed as `parent:variant`, for example
 * `product-card:horizontal`.
 *
 * @type {Record<string, Array<{id: string, name: string, description: string, guidance: string, html: string}>>}
 */
export const ecommerceVariants = {
  /* ==========================================================================
     product-card, Modern E-Commerce Product Card
     ========================================================================== */
  'product-card': [
    {
      id: 'horizontal',
      name: 'Horizontal',
      description:
        'Media moves to the inline start and the details column sits beside it from sm up, with the price and the add action sharing the last row.',
      guidance:
        'Use inside a wishlist, a search result list or a recommendation rail where the card has more width than height and the title needs room to breathe. Do not use it in a three or four column listing grid, because a horizontal card at 260px gives the media about 90px and the title two words a line. The media keeps its square aspect ratio and takes a third of the card, so a portrait photograph is cropped the same way it is in the default layout.',
      html: `<article class="product-card sm:flex-row max-w-lg">
  <div class="product-media w-full sm:w-1/3 shrink-0">
    <span class="badge badge-solid product-badge-float">NEW ARRIVAL</span>
    <img class="product-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" />
  </div>
  <div class="product-body">
    <h4 class="product-title">Aether Precision Wireless Studio Headphones</h4>
    <span class="product-category">Audio &amp; Acoustics</span>
    <div class="product-price-row justify-between">
      <span class="flex items-baseline gap-2">
        <span class="product-price">$349.00</span>
        <span class="product-compare-price">$420.00</span>
      </span>
      <button type="button" class="btn btn-primary btn-sm">Add to cart</button>
    </div>
  </div>
</article>`,
    },
    {
      id: 'compact-row',
      name: 'Compact row',
      description:
        'The card border is gone and each product becomes a hairline separated row with a small square thumbnail, a truncated title and the action at the end.',
      guidance:
        'Use for a cart preview, an order line, a back in stock list or anywhere a product appears inside something that already has a border, because a bordered card inside a bordered panel is law 1. Do not use it as a storefront listing: a 64px thumbnail cannot sell a physical object. The title truncates to one line on purpose, so put anything the reader must see in the second line or the price.',
      html: `<div class="flex flex-col max-w-lg">
  <div class="flex items-center gap-4 py-3">
    <img class="cart-thumb" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" />
    <div class="flex-1 min-w-0">
      <h4 class="product-title text-sm truncate">Aether Precision Wireless Studio Headphones</h4>
      <span class="product-category">Audio &amp; Acoustics</span>
    </div>
    <span class="product-price text-base">$349.00</span>
    <button type="button" class="btn btn-outline btn-xs">Add</button>
  </div>
  <hr class="divider" />
  <div class="flex items-center gap-4 py-3">
    <img class="cart-thumb" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=150&auto=format&fit=crop&q=80" alt="Field Notebook" />
    <div class="flex-1 min-w-0">
      <h4 class="product-title text-sm truncate">Field Notebook</h4>
      <span class="product-category">Paper</span>
    </div>
    <span class="product-price text-base">$18.00</span>
    <button type="button" class="btn btn-outline btn-xs">Add</button>
  </div>
  <hr class="divider" />
  <div class="flex items-center gap-4 py-3">
    <img class="cart-thumb" src="https://images.unsplash.com/photo-1502043150060-b01aa3030556?w=150&auto=format&fit=crop&q=80" alt="Wooden Ruler" />
    <div class="flex-1 min-w-0">
      <h4 class="product-title text-sm truncate">Wooden Ruler</h4>
      <span class="product-category">Desk</span>
    </div>
    <span class="product-price text-base">$32.00</span>
    <button type="button" class="btn btn-outline btn-xs">Add</button>
  </div>
</div>`,
    },
    {
      id: 'quick-add',
      name: 'Quick add',
      description:
        'The add action moves to the top of the body, directly under the media, and is visible at rest instead of arriving on hover.',
      guidance:
        'Use on a listing where adding is the primary verb and the reader is buying a known quantity of a known thing: consumables, refills, a repeat grocery order. Do not use it where the reader has to choose a size or a colour first, because the button then lies about what one click does. Nothing moves at rest and nothing is revealed on hover, which is law 2 applied to a card: a touch reader gets the same affordance a pointer reader gets.',
      html: `<article class="product-card max-w-xs">
  <div class="product-media">
    <span class="badge badge-solid product-badge-float">NEW ARRIVAL</span>
    <img class="product-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" />
  </div>
  <div class="product-body gap-3">
    <button type="button" class="btn btn-outline btn-sm w-full">Add to cart</button>
    <h4 class="product-title">Aether Precision Wireless Studio Headphones</h4>
    <span class="product-category">Audio &amp; Acoustics</span>
    <div class="product-price-row">
      <span class="product-price">$349.00</span>
      <span class="product-compare-price">$420.00</span>
    </div>
  </div>
</article>`,
    },
    {
      id: 'detail-panel',
      name: 'Detail panel',
      description:
        'The card opens out into a full product block: the media column on the inline start, the buy column beside it from md up, with quantity, saving and specification list.',
      guidance:
        'Use as the top of a product detail page, where the reader has already chosen the product and now needs the price, the quantity and the facts in one view. Do not use it inside a listing grid: it is a page section, not a tile. The category line stays under the title rather than over it, because an uppercase overline above a heading is the eyebrow law 5 exists to stop, and the specification list is a plain definition grid so it does not become a second box inside the panel.',
      html: `<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
  <div class="product-media aspect-square rounded-lg">
    <img class="product-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" />
  </div>
  <div class="flex flex-col gap-4">
    <h3 class="product-title text-2xl">Aether Precision Wireless Studio Headphones</h3>
    <span class="product-category">Audio &amp; Acoustics</span>
    <div class="product-price-row mt-0">
      <span class="product-price text-2xl">$349.00</span>
      <span class="product-compare-price">$420.00</span>
      <span class="badge badge-outline">Save $71</span>
    </div>
    <p class="text-sm text-secondary">Closed back, 40 mm beryllium coated drivers, 38 hour battery and a detachable balanced cable. Ships from the Alexandria warehouse.</p>
    <div class="flex items-center gap-3">
      <div class="stepper-input">
        <button type="button" class="stepper-btn" data-ai-step="-1" aria-controls="pd-qty-detail" aria-label="Decrease quantity" disabled></button>
        <input id="pd-qty-detail" class="input" type="number" inputmode="numeric" value="1" min="1" max="10" step="1" />
        <button type="button" class="stepper-btn is-increment" data-ai-step="1" aria-controls="pd-qty-detail" aria-label="Increase quantity"></button>
      </div>
      <button type="button" class="btn btn-primary flex-1">Add to cart</button>
    </div>
    <dl class="detail">
      <dt>Drivers</dt><dd>40 mm beryllium coated</dd>
      <dt>Battery</dt><dd>38 hours, 10 minute fast charge</dd>
      <dt>Wireless</dt><dd>Bluetooth 5.4, aptX Lossless</dd>
      <dt>Weight</dt><dd>286 g</dd>
    </dl>
  </div>
</div>`,
    },
    {
      id: 'with-swatches',
      name: 'With swatches',
      description:
        'A colour swatch row and an ear pad row move in between the title and the price, so the choice is made on the tile instead of on the product page.',
      guidance:
        'Use on a listing where the same product ships in several colourways and the reader has a preference before they have a product: apparel, accessories, anything with a finish. Do not use it when the options run past four, because a fifth swatch wraps and the tile stops being one glance. Both rows are radios, so the choice survives with no JavaScript, each swatch clears 44px on both axes, and the selected one is carried by a ring and the name under the row rather than by colour alone, which is law 12 applied to a control that has no text of its own.',
      html: `<article class="product-card max-w-xs">
  <div class="product-media">
    <span class="badge badge-solid product-badge-float">NEW ARRIVAL</span>
    <img class="product-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" />
  </div>
  <div class="product-body gap-3">
    <h4 class="product-title">Aether Precision Wireless Studio Headphones</h4>
    <span class="product-category">Audio &amp; Acoustics</span>

    <fieldset class="border-0 p-0 m-0">
      <legend class="form-label p-0">Colour</legend>
      <div class="radio-group radio-group-horizontal flex-wrap gap-2 mt-1">
        <label class="radio size-11 justify-center rounded-full ring-accent" for="pc-colour-slate">
          <input id="pc-colour-slate" class="radio-input size-8 bg-accent" data-ai-accent="steel" type="radio" name="pc-swatch-colour" checked />
          <span class="sr-only">Slate, selected</span>
        </label>
        <label class="radio size-11 justify-center rounded-full" for="pc-colour-teal">
          <input id="pc-colour-teal" class="radio-input size-8 bg-accent" data-ai-accent="teal" type="radio" name="pc-swatch-colour" />
          <span class="sr-only">Deep Teal</span>
        </label>
        <label class="radio size-11 justify-center rounded-full" for="pc-colour-amber">
          <input id="pc-colour-amber" class="radio-input size-8 bg-accent" data-ai-accent="amber" type="radio" name="pc-swatch-colour" />
          <span class="sr-only">Amber</span>
        </label>
      </div>
      <p class="text-sm text-secondary mt-1">Colour: Slate</p>
    </fieldset>

    <fieldset class="border-0 p-0 m-0">
      <legend class="form-label p-0">Ear pad</legend>
      <div class="segmented segmented-sm mt-1">
        <label class="segmented-btn" for="pc-pad-small">
          <input id="pc-pad-small" class="segmented-input" type="radio" name="pc-swatch-pad" /> Small
        </label>
        <label class="segmented-btn" for="pc-pad-standard">
          <input id="pc-pad-standard" class="segmented-input" type="radio" name="pc-swatch-pad" checked /> Standard
        </label>
        <label class="segmented-btn" for="pc-pad-deep">
          <input id="pc-pad-deep" class="segmented-input" type="radio" name="pc-swatch-pad" /> Deep
        </label>
      </div>
    </fieldset>

    <div class="product-price-row">
      <span class="product-price">$349.00</span>
      <span class="product-compare-price">$420.00</span>
    </div>
    <button type="button" class="btn btn-primary btn-sm w-full">Add to cart</button>
  </div>
</article>`,
    },
    {
      id: 'gallery-thumbs',
      name: 'Gallery with thumbnails',
      description:
        'The single photograph becomes a snapping gallery with a thumbnail rail under it, and the buy column moves beside the gallery once the container is wide enough.',
      guidance:
        'Use at the top of a product page for anything a reader inspects before buying, where one photograph answers a third of the questions and three answer most of them. Do not use it in a listing grid: a gallery in a tile asks the reader to shop inside a 300px window. Nothing advances on its own, which is law 9 for images, and each thumbnail is a link to its own slide, so the rail works with the scroll snapping alone and needs no script. The two column split comes from a container query rather than a breakpoint, so the same markup works in a page, a rail or a modal.',
      html: `<div class="cq max-w-3xl">
  <div class="grid grid-cols-1 cq-md:grid-cols-2 gap-6">
    <div class="flex flex-col gap-3">
      <div class="carousel snap-x" tabindex="0" role="group" aria-label="Aether Precision photographs">
        <figure class="product-media snap-start m-0 rounded-lg" id="pc-shot-desk">
          <img class="product-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" alt="Aether Precision headphones resting on a studio desk" />
        </figure>
        <figure class="product-media snap-start m-0 rounded-lg" id="pc-shot-front">
          <img class="product-img" src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80" alt="Aether Precision headphones seen from the front, headband extended" />
        </figure>
        <figure class="product-media snap-start m-0 rounded-lg" id="pc-shot-earcup">
          <img class="product-img" src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80" alt="Close view of the earcup, hinge and cable entry" />
        </figure>
      </div>
      <div class="flex items-center gap-2" role="group" aria-label="Jump to a photograph">
        <a class="btn btn-ghost btn-icon size-11 p-0" href="#pc-shot-desk" aria-label="Photograph 1, on a studio desk">
          <span class="avatar"><img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&auto=format&fit=crop&q=80" alt="" /></span>
        </a>
        <a class="btn btn-ghost btn-icon size-11 p-0" href="#pc-shot-front" aria-label="Photograph 2, front view">
          <span class="avatar"><img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=120&h=120&auto=format&fit=crop&q=80" alt="" /></span>
        </a>
        <a class="btn btn-ghost btn-icon size-11 p-0" href="#pc-shot-earcup" aria-label="Photograph 3, earcup detail">
          <span class="avatar"><img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=120&h=120&auto=format&fit=crop&q=80" alt="" /></span>
        </a>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h3 class="product-title text-xl">Aether Precision Wireless Studio Headphones</h3>
        <span class="product-category">Audio &amp; Acoustics</span>
      </div>
      <div class="product-price-row mt-0">
        <span class="product-price text-2xl">$349.00</span>
        <span class="product-compare-price">$420.00</span>
        <span class="badge badge-outline">Save $71</span>
      </div>
      <p class="text-sm text-secondary">Closed back, 40 mm beryllium coated drivers, 38 hour battery and a detachable balanced cable. Ships from the Alexandria warehouse.</p>
      <button type="button" class="btn btn-primary w-full">Add to cart</button>
      <p class="text-sm text-muted">Three photographs. Swipe the gallery or pick a thumbnail; it never advances on its own.</p>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     product-grid, Product Grid
     ========================================================================== */
  'product-grid': [
    {
      id: 'two-up-feature',
      name: 'Two up feature',
      description:
        'The first product spans two columns and lays its media beside its body, so the row opens on one dominant tile instead of three identical ones.',
      guidance:
        'Use at the top of a collection page, on a sale row or wherever one product is genuinely the reason the reader is here. Do not use it when the products are equals, because a feature tile that is not a feature reads as a rendering mistake. This is law 8 for a listing: four identical tiles at identical weight give the eye nowhere to land, so the anchor tile carries the size and the rest stay standard.',
      html: `<div class="product-grid grid-cols-2 md:grid-cols-4">
  <article class="product-card col-span-2 sm:flex-row">
    <div class="product-media w-full sm:w-1/2 shrink-0"><img class="product-img" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=600&auto=format&fit=crop&q=80" alt="Field Notebook" /></div>
    <div class="product-body">
      <div class="level"><h3 class="product-title text-lg">Field Notebook</h3><span class="badge badge-sale badge-sm">Sale</span></div>
      <p class="text-sm text-secondary">Sewn signatures, 90 gsm paper, lies flat at any page. Sale price held until 30 September.</p>
      <p class="product-price mt-0"><span>$18</span> <s class="product-compare-price">$24</s></p>
      <button type="button" class="btn btn-primary btn-sm">Add to cart</button>
    </div>
  </article>
  <article class="product-card">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1502043150060-b01aa3030556?w=600&auto=format&fit=crop&q=80" alt="Wooden Ruler" /></div>
    <div class="product-body">
      <h3 class="product-title">Wooden Ruler</h3>
      <p class="product-price">$32</p>
      <button type="button" class="btn btn-primary btn-sm w-full">Add to cart</button>
    </div>
  </article>
  <article class="product-card is-sold-out">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1629317297639-9201108cca3c?w=600&auto=format&fit=crop&q=80" alt="Desk Mat" /></div>
    <div class="product-body">
      <h3 class="product-title">Desk Mat</h3>
      <p class="product-price">$48</p>
      <button type="button" class="btn btn-outline btn-sm w-full" disabled>Sold out</button>
    </div>
  </article>
</div>`,
    },
    {
      id: 'dense',
      name: 'Dense',
      description:
        'The minimum column width drops to 160px so five or six tiles fit a wide row, titles truncate to one line and the action shrinks to extra small.',
      guidance:
        'Use for a large catalogue the reader is scanning rather than reading: a search result page, a brand page, a browse grid with hundreds of rows. Do not use it for a curated collection of six products, where the extra density buys nothing and costs every title its second line. Column count comes from the intrinsic grid rather than a breakpoint, so the same markup gives two tiles on a phone and six on a desktop with no media query to keep in step.',
      html: `<div class="grid-auto-fit grid-min-xs gap-4">
  <article class="product-card">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=400&auto=format&fit=crop&q=80" alt="Field Notebook" /></div>
    <div class="product-body gap-2">
      <h3 class="product-title text-sm truncate">Field Notebook</h3>
      <p class="product-price text-base mt-0"><span>$18</span> <s class="product-compare-price">$24</s></p>
      <button type="button" class="btn btn-outline btn-xs w-full">Add</button>
    </div>
  </article>
  <article class="product-card">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1502043150060-b01aa3030556?w=400&auto=format&fit=crop&q=80" alt="Wooden Ruler" /></div>
    <div class="product-body gap-2">
      <h3 class="product-title text-sm truncate">Wooden Ruler</h3>
      <p class="product-price text-base mt-0">$32</p>
      <button type="button" class="btn btn-outline btn-xs w-full">Add</button>
    </div>
  </article>
  <article class="product-card">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" /></div>
    <div class="product-body gap-2">
      <h3 class="product-title text-sm truncate">Aether Precision Wireless Studio Headphones</h3>
      <p class="product-price text-base mt-0">$349</p>
      <button type="button" class="btn btn-outline btn-xs w-full">Add</button>
    </div>
  </article>
  <article class="product-card is-sold-out">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1629317297639-9201108cca3c?w=400&auto=format&fit=crop&q=80" alt="Desk Mat" /></div>
    <div class="product-body gap-2">
      <h3 class="product-title text-sm truncate">Desk Mat</h3>
      <p class="product-price text-base mt-0">$48</p>
      <button type="button" class="btn btn-outline btn-xs w-full" disabled>Sold out</button>
    </div>
  </article>
</div>`,
    },
    {
      id: 'list-rows',
      name: 'List rows',
      description:
        'Tiles become full width rows separated by hairlines: thumbnail at the inline start, title and description in the middle, price and action at the end from sm up.',
      guidance:
        'Use when the products differ on facts rather than on looks, so the reader is comparing specifications, prices or availability down a column. Do not use it for anything bought on appearance, because a row gives the photograph a sixth of the space a tile gives it. Rows are separated by dividers rather than borders, which keeps the list flat: a bordered row inside a bordered container is law 1.',
      html: `<div class="flex flex-col max-w-2xl">
  <article class="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
    <img class="cart-thumb w-24 h-24" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=300&auto=format&fit=crop&q=80" alt="Field Notebook" />
    <div class="flex-1 min-w-0">
      <div class="level"><h3 class="product-title">Field Notebook</h3><span class="badge badge-sale badge-sm">Sale</span></div>
      <p class="text-xs text-muted mt-1">Sewn signatures, 90 gsm paper, lies flat at any page.</p>
    </div>
    <p class="product-price"><span>$18</span> <s class="product-compare-price">$24</s></p>
    <button type="button" class="btn btn-primary btn-sm">Add to cart</button>
  </article>
  <hr class="divider" />
  <article class="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
    <img class="cart-thumb w-24 h-24" src="https://images.unsplash.com/photo-1502043150060-b01aa3030556?w=300&auto=format&fit=crop&q=80" alt="Wooden Ruler" />
    <div class="flex-1 min-w-0">
      <h3 class="product-title">Wooden Ruler</h3>
      <p class="text-xs text-muted mt-1">Beech, 300 mm, etched metric and imperial scales.</p>
    </div>
    <p class="product-price">$32</p>
    <button type="button" class="btn btn-primary btn-sm">Add to cart</button>
  </article>
  <hr class="divider" />
  <article class="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
    <img class="cart-thumb w-24 h-24" src="https://images.unsplash.com/photo-1629317297639-9201108cca3c?w=300&auto=format&fit=crop&q=80" alt="Desk Mat" />
    <div class="flex-1 min-w-0">
      <h3 class="product-title">Desk Mat</h3>
      <p class="text-xs text-muted mt-1">Back in stock late September, 900 by 400 mm.</p>
    </div>
    <p class="product-price">$48</p>
    <button type="button" class="btn btn-outline btn-sm" disabled>Sold out</button>
  </article>
</div>`,
    },
    {
      id: 'facet-left',
      name: 'Facet left',
      description:
        'A facet rail takes the first of four columns and pins to the top of the viewport while the grid scrolls in the remaining three.',
      guidance:
        'Use for a catalogue big enough that filtering is the main verb: more products than a reader will scroll, and facets that actually cut the set down. Do not use it for a twelve product collection, where the rail is wider than the choice it offers. Below md the rail stacks above the grid and stops sticking, which is the right behaviour on a phone: a sticky filter column on a 390px screen eats the results it is filtering.',
      html: `<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
  <aside class="sticky-top self-start" aria-label="Filter products">
    <div class="sidebar-section">
      <p class="sidebar-section-title">Category</p>
      <div class="flex flex-col gap-2 mt-2">
        <label class="checkbox" for="facet-paper"><input id="facet-paper" type="checkbox" class="checkbox-input" checked /> Paper</label>
        <label class="checkbox" for="facet-desk"><input id="facet-desk" type="checkbox" class="checkbox-input" /> Desk</label>
        <label class="checkbox" for="facet-audio"><input id="facet-audio" type="checkbox" class="checkbox-input" /> Audio</label>
      </div>
    </div>
    <hr class="divider" />
    <div class="sidebar-section">
      <p class="sidebar-section-title">Availability</p>
      <div class="flex flex-col gap-2 mt-2">
        <label class="checkbox" for="facet-instock"><input id="facet-instock" type="checkbox" class="checkbox-input" checked /> In stock</label>
        <label class="checkbox" for="facet-sale"><input id="facet-sale" type="checkbox" class="checkbox-input" /> On sale</label>
      </div>
    </div>
  </aside>
  <div class="md:col-span-3">
    <div class="product-grid">
      <article class="product-card">
        <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=600&auto=format&fit=crop&q=80" alt="Field Notebook" /></div>
        <div class="product-body">
          <div class="level"><h3 class="product-title">Field Notebook</h3><span class="badge badge-sale badge-sm">Sale</span></div>
          <p class="product-price"><span>$18</span> <s class="product-compare-price">$24</s></p>
          <button type="button" class="btn btn-primary btn-sm w-full">Add to cart</button>
        </div>
      </article>
      <article class="product-card">
        <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1502043150060-b01aa3030556?w=600&auto=format&fit=crop&q=80" alt="Wooden Ruler" /></div>
        <div class="product-body">
          <h3 class="product-title">Wooden Ruler</h3>
          <p class="product-price">$32</p>
          <button type="button" class="btn btn-primary btn-sm w-full">Add to cart</button>
        </div>
      </article>
      <article class="product-card is-sold-out">
        <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1629317297639-9201108cca3c?w=600&auto=format&fit=crop&q=80" alt="Desk Mat" /></div>
        <div class="product-body">
          <h3 class="product-title">Desk Mat</h3>
          <p class="product-price">$48</p>
          <button type="button" class="btn btn-outline btn-sm w-full" disabled>Sold out</button>
        </div>
      </article>
    </div>
  </div>
</div>`,
    },
    {
      id: 'category-preview',
      name: 'Category preview',
      description:
        'One category tile spanning two columns sits above the product rows, with its own photograph and count, so the grid opens on a collection instead of on a product.',
      guidance:
        'Use on a landing page or a department page where the reader has not chosen a category yet and the row below is a sample rather than the whole catalogue. Do not use it on the collection page the tile leads to, because a category tile inside its own category sends the reader in a circle. The tile is one link end to end rather than a card with a button inside it, and the count is plain text under the description rather than a badge over the heading, which is the eyebrow law 5 exists to stop.',
      html: `<div class="product-grid grid-cols-2 md:grid-cols-4">
  <a class="product-card col-span-2 sm:flex-row no-underline" href="#collection-desk">
    <div class="product-media w-full sm:w-1/2 shrink-0">
      <img class="product-img" src="https://images.unsplash.com/photo-1629317297639-9201108cca3c?w=600&auto=format&fit=crop&q=80" alt="A desk mat, notebook and ruler laid out on a working surface" />
    </div>
    <div class="product-body">
      <h3 class="product-title text-lg">The desk collection</h3>
      <p class="text-sm text-secondary">Everything that lives on the working surface: mats, rulers, notebooks and the stands that hold them.</p>
      <p class="text-sm font-semibold text-accent mt-auto">Browse 9 products</p>
    </div>
  </a>
  <article class="product-card">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=600&auto=format&fit=crop&q=80" alt="Field Notebook" /></div>
    <div class="product-body">
      <div class="level"><h3 class="product-title">Field Notebook</h3><span class="badge badge-sale badge-sm">Sale</span></div>
      <p class="product-price"><span>$18</span> <s class="product-compare-price">$24</s></p>
      <button type="button" class="btn btn-primary btn-sm w-full">Add to cart</button>
    </div>
  </article>
  <article class="product-card">
    <div class="product-media"><img class="product-img" src="https://images.unsplash.com/photo-1502043150060-b01aa3030556?w=600&auto=format&fit=crop&q=80" alt="Wooden Ruler" /></div>
    <div class="product-body">
      <h3 class="product-title">Wooden Ruler</h3>
      <p class="product-price">$32</p>
      <button type="button" class="btn btn-primary btn-sm w-full">Add to cart</button>
    </div>
  </article>
</div>`,
    },
  ],

  /* ==========================================================================
     cart-drawer-pro, Slide-Out Cart Drawer
     ========================================================================== */
  'cart-drawer-pro': [
    {
      id: 'inline-page',
      name: 'Inline page',
      description:
        'The same bag rendered as a page section: no drawer, no backdrop, no trigger, with the totals ledger and the checkout action stacked under the line items.',
      guidance:
        'Use for the cart page itself, and for a checkout step where the bag has to stay readable while the reader fills in an address. Do not use it as the header bag, because a page section cannot be summoned from a toolbar. The item count is plain muted text beside the heading rather than a badge, and nothing here is a card: the rows sit on the page surface with their own hairlines so the section never becomes a box inside a box.',
      html: `<section class="max-w-lg" aria-label="Shopping bag">
  <h2 class="text-lg font-semibold">Shopping bag <span class="text-sm text-muted font-normal">2 items</span></h2>
  <div class="mt-4">
    <div class="cart-item">
      <img class="cart-thumb" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" />
      <div class="cart-details">
        <span class="cart-name">Aether Precision Studio</span>
        <span class="cart-subtext">Matte Obsidian / Bluetooth 5.4</span>
        <div class="flex justify-between items-center mt-2">
          <div class="cart-stepper">
            <button type="button" aria-label="Decrease quantity of Aether Precision Studio">-</button>
            <span class="px-2 text-xs tabular">1</span>
            <button type="button" aria-label="Increase quantity of Aether Precision Studio">+</button>
          </div>
          <span class="font-bold">$349.00</span>
        </div>
      </div>
    </div>
    <div class="cart-item">
      <img class="cart-thumb" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=150&auto=format&fit=crop&q=80" alt="Field Notebook" />
      <div class="cart-details">
        <span class="cart-name">Field Notebook</span>
        <span class="cart-subtext">Sewn signatures / 90 gsm</span>
        <div class="flex justify-between items-center mt-2">
          <div class="cart-stepper">
            <button type="button" aria-label="Decrease quantity of Field Notebook">-</button>
            <span class="px-2 text-xs tabular">1</span>
            <button type="button" aria-label="Increase quantity of Field Notebook">+</button>
          </div>
          <span class="font-bold">$18.00</span>
        </div>
      </div>
    </div>
  </div>
  <dl class="checkout-totals mt-5">
    <div class="checkout-row">
      <dt class="checkout-label">Subtotal</dt>
      <dd class="checkout-value">$367.00</dd>
    </div>
    <div class="checkout-row">
      <dt class="checkout-label">Shipping, two day freight</dt>
      <dd class="checkout-value">$12.00</dd>
    </div>
    <div class="checkout-row is-total">
      <dt class="checkout-label">Total due</dt>
      <dd class="checkout-value">$379.00</dd>
    </div>
  </dl>
  <button type="button" class="btn btn-primary btn-lg w-full mt-5">Checkout now</button>
</section>`,
    },
    {
      id: 'compact-rows',
      name: 'Compact rows',
      description:
        'Thumbnails are dropped and each line collapses to one row: name and variant at the inline start, the quantity stepper and the price at the end.',
      guidance:
        'Use when the bag routinely holds more than five lines, or when the products are things a photograph adds nothing to: licences, seats, digital goods, spare parts ordered by code. Do not use it for apparel or anything else a reader recognises by sight before they recognise it by name. Dropping the thumbnail nearly halves the row height, which is the whole point: the subtotal stays above the fold without scrolling.',
      html: `<button type="button" class="btn btn-primary" data-ai-toggle="drawer" data-ai-target="#cart-compact-rows">
  Open Cart Drawer
</button>

<div id="cart-compact-rows" class="drawer">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel">
    <div class="drawer-header">
      <h3 class="drawer-title">Shopping Bag <span class="text-sm text-muted font-normal">2 items</span></h3>
      <button type="button" class="modal-close" data-ai-dismiss="drawer" aria-label="Close shopping bag">&times;</button>
    </div>
    <div class="drawer-body">
      <div class="cart-item py-2">
        <div class="cart-details">
          <span class="cart-name">Aether Precision Studio</span>
          <span class="cart-subtext">Matte Obsidian / Bluetooth 5.4</span>
        </div>
        <div class="cart-stepper">
          <button type="button" aria-label="Decrease quantity of Aether Precision Studio">-</button>
          <span class="px-2 text-xs tabular">1</span>
          <button type="button" aria-label="Increase quantity of Aether Precision Studio">+</button>
        </div>
        <span class="font-bold text-sm tabular">$349.00</span>
      </div>
      <div class="cart-item py-2">
        <div class="cart-details">
          <span class="cart-name">Field Notebook</span>
          <span class="cart-subtext">Sewn signatures / 90 gsm</span>
        </div>
        <div class="cart-stepper">
          <button type="button" aria-label="Decrease quantity of Field Notebook">-</button>
          <span class="px-2 text-xs tabular">1</span>
          <button type="button" aria-label="Increase quantity of Field Notebook">+</button>
        </div>
        <span class="font-bold text-sm tabular">$18.00</span>
      </div>
    </div>
    <div class="drawer-footer">
      <div class="flex justify-between items-center mb-4">
        <span class="text-sm text-secondary">Subtotal</span>
        <span class="font-display font-bold text-xl tabular">$367.00</span>
      </div>
      <button type="button" class="btn btn-primary w-full btn-lg">Checkout Now</button>
    </div>
  </div>
</div>`,
    },
    {
      id: 'bottom-sheet',
      name: 'Bottom sheet',
      description:
        'The panel enters from the block end and spans the full width instead of sliding in from the inline end, with the checkout action pinned to the sheet footer.',
      guidance:
        'Use for a storefront whose traffic is mostly phones, where a bottom sheet sits under the thumb and a side drawer does not. Do not use it on a desktop first site: a full width sheet at 1440px is a 1440px wide list of two products. The footer stays outside the scrolling body so the subtotal and the checkout button never scroll away, which is the one thing a bag has to guarantee.',
      html: `<button type="button" class="btn btn-primary" data-ai-toggle="drawer" data-ai-target="#cart-bottom-sheet">
  Open Cart Drawer
</button>

<div id="cart-bottom-sheet" class="drawer drawer-bottom">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel">
    <div class="drawer-header">
      <h3 class="drawer-title">Shopping Bag <span class="text-sm text-muted font-normal">2 items</span></h3>
      <button type="button" class="modal-close" data-ai-dismiss="drawer" aria-label="Close shopping bag">&times;</button>
    </div>
    <div class="drawer-body">
      <div class="cart-item">
        <img class="cart-thumb" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80" alt="Minimalist Studio Headphones" />
        <div class="cart-details">
          <span class="cart-name">Aether Precision Studio</span>
          <span class="cart-subtext">Matte Obsidian / Bluetooth 5.4</span>
          <div class="flex justify-between items-center mt-2">
            <div class="cart-stepper">
              <button type="button" aria-label="Decrease quantity of Aether Precision Studio">-</button>
              <span class="px-2 text-xs tabular">1</span>
              <button type="button" aria-label="Increase quantity of Aether Precision Studio">+</button>
            </div>
            <span class="font-bold">$349.00</span>
          </div>
        </div>
      </div>
      <div class="cart-item">
        <img class="cart-thumb" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=150&auto=format&fit=crop&q=80" alt="Field Notebook" />
        <div class="cart-details">
          <span class="cart-name">Field Notebook</span>
          <span class="cart-subtext">Sewn signatures / 90 gsm</span>
          <div class="flex justify-between items-center mt-2">
            <div class="cart-stepper">
              <button type="button" aria-label="Decrease quantity of Field Notebook">-</button>
              <span class="px-2 text-xs tabular">1</span>
              <button type="button" aria-label="Increase quantity of Field Notebook">+</button>
            </div>
            <span class="font-bold">$18.00</span>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-footer">
      <div class="flex justify-between items-center mb-4">
        <span class="text-sm text-secondary">Subtotal</span>
        <span class="font-display font-bold text-xl tabular">$367.00</span>
      </div>
      <button type="button" class="btn btn-primary w-full btn-lg">Checkout Now</button>
    </div>
  </div>
</div>`,
    },
    {
      id: 'empty-bag',
      name: 'Empty bag',
      description:
        'The line items and the totals are replaced by an empty state with three suggested products under it, and the footer action becomes a way back to the shop.',
      guidance:
        'Use as the zero state of the same drawer, so an empty bag opened by accident still offers the reader somewhere to go. Do not fill it with the last thing the reader looked at unless you know it is still in stock, because a suggestion that cannot be bought is worse than an empty drawer. The suggestions are hairline separated rows on the drawer surface rather than three little cards, which is law 1, and the checkout button is gone instead of disabled: there is nothing to check out.',
      html: `<button type="button" class="btn btn-primary" data-ai-toggle="drawer" data-ai-target="#cart-empty-bag">
  Open Cart Drawer
</button>

<div id="cart-empty-bag" class="drawer">
  <div class="drawer-backdrop" data-ai-dismiss="drawer"></div>
  <div class="drawer-panel">
    <div class="drawer-header">
      <h3 class="drawer-title">Shopping Bag <span class="text-sm text-muted font-normal">0 items</span></h3>
      <button type="button" class="modal-close" data-ai-dismiss="drawer" aria-label="Close shopping bag">&times;</button>
    </div>
    <div class="drawer-body">
      <div class="empty-state py-8">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5.5 7.5h13l1 12.5h-15z" />
          <path d="M9 7.5a3 3 0 0 1 6 0" />
        </svg>
        <p class="empty-state-title">Your bag is empty</p>
        <p class="empty-state-description">Nothing has been added yet. These three are the ones people come back for.</p>
      </div>

      <hr class="divider" />

      <p class="text-sm font-semibold">Popular this week</p>
      <div class="flex flex-col mt-2">
        <div class="flex items-center gap-3 py-3">
          <img class="cart-thumb" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80" alt="Aether Precision Studio headphones" />
          <div class="cart-details min-w-0">
            <span class="cart-name truncate">Aether Precision Studio</span>
            <span class="cart-subtext truncate">Matte Obsidian / Bluetooth 5.4</span>
            <span class="font-bold text-sm tabular">$349.00</span>
          </div>
          <button type="button" class="btn btn-outline btn-sm">Add</button>
        </div>
        <hr class="divider" />
        <div class="flex items-center gap-3 py-3">
          <img class="cart-thumb" src="https://images.unsplash.com/photo-1565999741380-5f78494ebf64?w=150&auto=format&fit=crop&q=80" alt="Field Notebook" />
          <div class="cart-details min-w-0">
            <span class="cart-name truncate">Field Notebook</span>
            <span class="cart-subtext truncate">Sewn signatures / 90 gsm</span>
            <span class="font-bold text-sm tabular">$18.00</span>
          </div>
          <button type="button" class="btn btn-outline btn-sm">Add</button>
        </div>
        <hr class="divider" />
        <div class="flex items-center gap-3 py-3">
          <img class="cart-thumb" src="https://images.unsplash.com/photo-1502043150060-b01aa3030556?w=150&auto=format&fit=crop&q=80" alt="Wooden Ruler" />
          <div class="cart-details min-w-0">
            <span class="cart-name truncate">Wooden Ruler</span>
            <span class="cart-subtext truncate">Beech / 300 mm</span>
            <span class="font-bold text-sm tabular">$32.00</span>
          </div>
          <button type="button" class="btn btn-outline btn-sm">Add</button>
        </div>
      </div>
    </div>
    <div class="drawer-footer">
      <button type="button" class="btn btn-outline w-full btn-lg" data-ai-dismiss="drawer">Keep shopping</button>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     checkout-summary, Checkout Summary
     ========================================================================== */
  'checkout-summary': [
    {
      id: 'two-column',
      name: 'Two column',
      description:
        'Line items take the first column and the totals ledger, promo field and order action take the second from md up, still on one surface.',
      guidance:
        'Use on a wide confirmation step where the bag is long enough that a single column pushes the total below the fold. Do not use it in a narrow rail: at 320px the two columns collapse back to one and the extra grid buys nothing. The totals lose their own top hairline here because the column edge already separates them, and nothing inside gets a border of its own: the summary is the box, which is law 1.',
      html: `<div class="checkout max-w-3xl">
  <h3 class="checkout-title">Order summary</h3>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
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

    <div class="flex flex-col gap-5">
      <dl class="checkout-totals pt-0 border-0">
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
        <label class="form-label" for="co-promo-two-column">Promo code</label>
        <div class="input-group">
          <input id="co-promo-two-column" class="input" type="text" autocomplete="off" placeholder="FITOUT10" />
          <button type="button" class="btn btn-outline">Apply</button>
        </div>
      </div>

      <div class="checkout-actions">
        <button type="submit" class="btn btn-primary w-full">Place order</button>
        <p class="checkout-note">Delivery is booked once payment clears. Returns accepted for 30 days.</p>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      id: 'sticky-rail',
      name: 'Sticky rail',
      description:
        'The summary moves into a one third rail that pins to the top of the viewport while the delivery form scrolls in the other two thirds.',
      guidance:
        'Use on a checkout page with a real form beside it, so the total stays visible while the reader types an address they will get wrong twice. Do not use it when the summary is taller than the viewport, because a sticky element taller than the screen simply scrolls and the reader loses the total anyway. The form column is plain form groups on the page surface, never a card: putting one beside the summary would make the page two competing boxes.',
      html: `<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div class="md:col-span-2">
    <h2 class="text-lg font-semibold">Delivery address</h2>
    <div class="mt-4">
      <div class="form-group">
        <label class="form-label" for="co-rail-name">Full name</label>
        <input id="co-rail-name" class="input" type="text" autocomplete="name" value="Priya Raghavan" />
      </div>
      <div class="form-group">
        <label class="form-label" for="co-rail-street">Street address</label>
        <input id="co-rail-street" class="input" type="text" autocomplete="street-address" value="41 Wentworth Avenue" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-group">
          <label class="form-label" for="co-rail-suburb">Suburb</label>
          <input id="co-rail-suburb" class="input" type="text" autocomplete="address-level2" value="Surry Hills" />
        </div>
        <div class="form-group">
          <label class="form-label" for="co-rail-post">Postcode</label>
          <input id="co-rail-post" class="input" type="text" inputmode="numeric" autocomplete="postal-code" value="2010" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="co-rail-note">Delivery note</label>
        <input id="co-rail-note" class="input" type="text" placeholder="Loading dock is off Hutchinson Lane" />
        <span class="form-hint">The freight crew calls 30 minutes before they arrive.</span>
      </div>
    </div>
  </div>

  <div class="checkout sticky-top">
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
      <div class="checkout-row is-total">
        <dt class="checkout-label">Total due</dt>
        <dd class="checkout-value">$1,438.70</dd>
      </div>
    </dl>

    <div class="checkout-actions">
      <button type="submit" class="btn btn-primary w-full">Place order</button>
      <p class="checkout-note">Delivery is booked once payment clears. Returns accepted for 30 days.</p>
    </div>
  </div>
</div>`,
    },
    {
      id: 'collapsed-items',
      name: 'Collapsed items',
      description:
        'The line items fold behind one disclosure while the totals ledger and the order action stay open at every width.',
      guidance:
        'Use at the top of a phone checkout, where three items and their variants push the total off the screen before the reader has decided anything. Do not use it on the final review step: the last thing a reader confirms should not be hidden behind a chevron. The trigger carries aria-expanded and aria-controls rather than a colour alone, which is law 12, and it uses the library chevron so the open state is a rotation and not a swapped glyph.',
      html: `<div class="checkout max-w-sm">
  <div class="accordion">
    <div class="accordion-item">
      <button type="button" class="accordion-trigger" data-ai-toggle="accordion" aria-expanded="false" aria-controls="co-items-collapsed">
        <span>Order summary, 3 items</span>
        <svg class="accordion-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="accordion-content" id="co-items-collapsed">
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
      </div>
    </div>
  </div>

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

  <div class="checkout-actions">
    <button type="submit" class="btn btn-primary w-full">Place order</button>
    <p class="checkout-note">Delivery is booked once payment clears. Returns accepted for 30 days.</p>
  </div>
</div>`,
    },
    {
      id: 'with-address-form',
      name: 'With address form',
      description:
        'The summary moves into the second column of a two column checkout, with the delivery form beside it and the applied promo code shown as a credit line in the ledger.',
      guidance:
        'Use as the whole checkout step on a page wide enough for two columns, so the reader fills in an address with the total in view instead of scrolling between them. Do not use it inside a narrow rail: below the container query the form stacks above the summary and the reader is back to scrolling. The form sits on the page surface rather than in a second box beside the summary, which is law 1, every field clears 44px on both axes, and the code the reader already applied stays in the ledger as a credit row so the arithmetic still reads top to bottom.',
      html: `<div class="cq">
  <div class="grid grid-cols-1 cq-md:grid-cols-2 gap-8">
    <section aria-label="Delivery address">
      <h2 class="text-lg font-semibold">Delivery address</h2>
      <div class="mt-4">
        <div class="form-group">
          <label class="form-label" for="co-addr-name">Full name</label>
          <input id="co-addr-name" class="input h-11" type="text" autocomplete="name" value="Priya Raghavan" />
        </div>
        <div class="form-group">
          <label class="form-label" for="co-addr-street">Street address</label>
          <input id="co-addr-street" class="input h-11" type="text" autocomplete="street-address" value="41 Wentworth Avenue" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="form-group">
            <label class="form-label" for="co-addr-suburb">Suburb</label>
            <input id="co-addr-suburb" class="input h-11" type="text" autocomplete="address-level2" value="Surry Hills" />
          </div>
          <div class="form-group">
            <label class="form-label" for="co-addr-post">Postcode</label>
            <input id="co-addr-post" class="input h-11" type="text" inputmode="numeric" autocomplete="postal-code" value="2010" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="co-addr-note">Delivery note</label>
          <input id="co-addr-note" class="input h-11" type="text" placeholder="Loading dock is off Hutchinson Lane" />
          <span class="form-hint">The freight crew calls 30 minutes before they arrive.</span>
        </div>
      </div>
    </section>

    <div class="checkout">
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
        <label class="form-label" for="co-promo-with-address-form">Promo code</label>
        <div class="input-group">
          <input id="co-promo-with-address-form" class="input h-11" type="text" autocomplete="off" value="FITOUT10" />
          <button type="button" class="btn btn-outline">Apply</button>
        </div>
        <span class="form-hint">FITOUT10 is applied and shows as a credit in the ledger above.</span>
      </div>

      <div class="checkout-actions">
        <button type="submit" class="btn btn-primary w-full">Place order</button>
        <p class="checkout-note">Delivery is booked once payment clears. Returns accepted for 30 days.</p>
      </div>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     order-status, Order Status Tracker
     ========================================================================== */
  'order-status': [
    {
      id: 'vertical',
      name: 'Vertical',
      description:
        'The four steps run down the block, one row each, with the pip and the label at the inline start and the date pushed to a right column.',
      guidance:
        'Use in a narrow rail, an order detail sidebar or an email style summary, where a horizontal rail would give each of four labels about 60px. Do not use it when the reader only needs the current step, because four stacked rows is four times the height of one line. Each step keeps its own pip geometry classes, so completed, current and upcoming still read as the same three states they do in the default layout, and the current pip is a static ring that never pulses.',
      html: `<div class="order max-w-sm">
  <div class="orderline-head">
    <div>
      <h3 class="orderline-title">Order 48210 is on its way</h3>
      <p class="text-sm text-secondary">Three items, dispatched from the Alexandria warehouse.</p>
    </div>
  </div>

  <ol class="orderline-track is-vertical">
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
    <a class="btn btn-outline btn-sm" href="#order-48210-vertical">Track shipment</a>
  </div>
</div>`,
    },
    {
      id: 'compact-row',
      name: 'Compact row',
      description:
        'The rail is replaced by one status line: a pip, the current step in plain text and a step count, with the tracking row kept underneath.',
      guidance:
        'Use in an order history list, an account page or a notification, where the reader is scanning many orders and wants the state of each in one line. Do not use it as the only tracker on an order detail page, because a step count tells a reader where they are without telling them what happens next. The state is a pip plus plain text rather than a chip: a boxed status pill on a row that already sits inside a bordered surface is a box inside a box.',
      html: `<div class="order max-w-2xl">
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div class="min-w-0">
      <h3 class="orderline-title">Order 48210 is on its way</h3>
      <p class="text-sm text-secondary mt-1">Three items, dispatched from the Alexandria warehouse.</p>
    </div>
    <div class="flex items-center gap-2">
      <span class="pip pip-ok"></span>
      <span class="text-sm font-semibold">Shipped</span>
      <span class="text-xs text-muted tabular">step 3 of 4</span>
    </div>
  </div>

  <div class="orderline-meta">
    <span>Southbound Freight tracking <span class="orderline-id">AU7734221905</span></span>
    <a class="btn btn-outline btn-sm" href="#order-48210-compact-row">Track shipment</a>
  </div>
</div>`,
    },
    {
      id: 'with-items',
      name: 'With items',
      description:
        'The three shipped line items are listed under the tracker, separated from it by a hairline, so the rail and the contents of the parcel read as one block.',
      guidance:
        'Use on the order detail page itself, where "three items" in the subtitle is exactly the thing the reader wants expanded. Do not use it in a list of orders: three lines per order turns ten orders into thirty rows. The items reuse the checkout line item markup rather than a second card, and the divider does the separating, which keeps the whole thing one surface instead of a tracker box stacked on an items box.',
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

  <hr class="divider" />

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

  <div class="orderline-meta">
    <span>Southbound Freight tracking <span class="orderline-id">AU7734221905</span></span>
    <a class="btn btn-outline btn-sm" href="#order-48210-with-items">Track shipment</a>
  </div>
</div>`,
    },
    {
      id: 'history-rows',
      name: 'History rows',
      description:
        'The four step tracker is replaced by one row per order, each carrying the order number, the date, a status pip with its word beside it and the total.',
      guidance:
        'Use on an account page or an order index, where the reader is looking for one order among many and the state of each is a single word. Do not use it as the tracker on an order detail page, because a row says where an order got to without saying what happens next. Each state is a static pip plus plain text rather than a coloured chip, so nothing here is a box inside a box and nothing moves at rest, and the rows are separated by hairlines rather than borders so the list stays one surface.',
      html: `<div class="order max-w-2xl">
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <h3 class="orderline-title">Order history <span class="text-sm text-muted font-normal">4 orders</span></h3>
    <a class="btn btn-outline btn-sm" href="#orders-invoices">Download invoices</a>
  </div>

  <div class="flex flex-col mt-4">
    <div class="flex items-center gap-4 flex-wrap py-3">
      <div class="flex-1 min-w-0">
        <p class="font-semibold">Order 48210</p>
        <p class="text-sm text-muted tabular">9 September 2026, three items</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="pip pip-ok"></span>
        <span class="text-sm">Shipped</span>
      </div>
      <span class="font-bold tabular">$1,343.70</span>
      <a class="btn btn-ghost btn-sm" href="#order-48210-history-rows">View</a>
    </div>
    <hr class="divider" />
    <div class="flex items-center gap-4 flex-wrap py-3">
      <div class="flex-1 min-w-0">
        <p class="font-semibold">Order 48154</p>
        <p class="text-sm text-muted tabular">28 August 2026, one item</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="pip"></span>
        <span class="text-sm">Delivered</span>
      </div>
      <span class="font-bold tabular">$349.00</span>
      <a class="btn btn-ghost btn-sm" href="#order-48154-history-rows">View</a>
    </div>
    <hr class="divider" />
    <div class="flex items-center gap-4 flex-wrap py-3">
      <div class="flex-1 min-w-0">
        <p class="font-semibold">Order 47980</p>
        <p class="text-sm text-muted tabular">14 August 2026, two items</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="pip pip-warn"></span>
        <span class="text-sm">Return in progress</span>
      </div>
      <span class="font-bold tabular">$96.00</span>
      <a class="btn btn-ghost btn-sm" href="#order-47980-history-rows">View</a>
    </div>
    <hr class="divider" />
    <div class="flex items-center gap-4 flex-wrap py-3">
      <div class="flex-1 min-w-0">
        <p class="font-semibold">Order 47822</p>
        <p class="text-sm text-muted tabular">2 August 2026, one item</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="pip pip-err"></span>
        <span class="text-sm">Cancelled</span>
      </div>
      <span class="font-bold tabular">$48.00</span>
      <a class="btn btn-ghost btn-sm" href="#order-47822-history-rows">View</a>
    </div>
  </div>
</div>`,
    },
  ],

  /* ==========================================================================
     rating-stars, Rating Stars
     ========================================================================== */
  'rating-stars': [
    {
      id: 'with-histogram',
      name: 'With histogram',
      description:
        'The read only average gains a five row distribution beneath it, one bar per star band with the review count at the end of each row.',
      guidance:
        'Use on a product detail page or a review index, where the shape of the distribution is the honest part of the story: a 4.0 built from 575 fives and 54 ones is a different product from a 4.0 built from everyone agreeing. Do not use it in a listing row, where five bars cost more height than the whole tile. Bar widths are set with width utilities against the largest band rather than a token override, so the chart survives every skin without carrying a colour of its own.',
      html: `<div class="flex flex-col gap-5 max-w-md">
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
</div>`,
    },
    {
      id: 'inline-count',
      name: 'Inline count',
      description:
        'Stars, average and count collapse onto one line at extra small size, sized to sit under a product title in a listing row.',
      guidance:
        'Use inside a product row, a search result or a compact card, where the rating is supporting evidence rather than the subject. Do not use it as the rating block on a product page: at this size the difference between four stars and five is a few pixels. The average and the count share one muted line in tabular numerals so a column of these lines up down the page instead of jittering with each digit.',
      html: `<div class="flex items-center justify-between gap-4 max-w-sm">
  <div class="min-w-0">
    <h4 class="product-title text-sm">Aether Precision Wireless Studio Headphones</h4>
    <div class="flex items-center gap-2 mt-1">
      <span class="rating-static" role="img" aria-label="Rated 4.0 out of 5">
        <span class="rating-track"></span><span class="rating-fill w-4/5"></span>
      </span>
      <span class="text-xs text-muted tabular">4.0 from 1,284 reviews</span>
    </div>
  </div>
  <span class="product-price text-base">$349.00</span>
</div>`,
    },
    {
      id: 'review-list',
      name: 'Review list',
      description:
        'The read only average keeps its line and gains the reviews themselves underneath: one hairline separated row per reviewer with a portrait, a star row, a date and the review.',
      guidance:
        'Use on a product page under the rating summary, or as the body of a reviews page, where the average is the headline and the individual reviews are the evidence. Do not use it in a listing tile: three reviews are taller than the product they belong to. Each review is a row on one surface rather than a card of its own, which is law 1, the date sits in tabular numerals so a column of dates lines up, and the review text is held to a prose measure so a wide container does not stretch a sentence across 120 characters.',
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
      <span class="avatar"><img src="https://images.unsplash.com/photo-1770396529113-ba031cbf0cfa?w=96&h=96&auto=format&fit=crop&q=80" alt="Amara Osei" /></span>
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
      <span class="avatar"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&auto=format&fit=crop&q=80" alt="Jonas Berg" /></span>
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
      <span class="avatar"><img src="https://images.unsplash.com/photo-1582639849680-e2e89674e57b?w=96&h=96&auto=format&fit=crop&q=80" alt="Hana Sato" /></span>
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
    },
  ],

  /* ==========================================================================
     number-stepper, Number Stepper
     ========================================================================== */
  'number-stepper': [
    {
      id: 'inline-label',
      name: 'Inline label',
      description:
        'The label moves out of the column and onto the control row, with the unit after the field, so each quantity is one line instead of three.',
      guidance:
        'Use in a settings pane, an order form or a plan builder where several quantities stack and a stacked label for each one turns four fields into a page. Do not use it when the label runs past a few words, because a long label on a control row either wraps or squeezes the field. The hint moves to the foot of the group rather than repeating under every row, which keeps the rows the same height and the guidance in one place.',
      html: `<div class="flex flex-col gap-4 max-w-lg">
  <div class="form-group flex-row items-center gap-4 mb-0">
    <label class="form-label flex-1" for="stp-seats-inline-label">Team seats</label>
    <div class="stepper-input">
      <button type="button" class="stepper-btn" data-ai-step="-1" aria-controls="stp-seats-inline-label" aria-label="Decrease seats"></button>
      <input id="stp-seats-inline-label" class="input" type="number" inputmode="numeric" value="12" min="1" max="250" step="1" />
      <button type="button" class="stepper-btn is-increment" data-ai-step="1" aria-controls="stp-seats-inline-label" aria-label="Increase seats"></button>
    </div>
    <span class="text-sm text-muted w-16">seats</span>
  </div>

  <div class="form-group flex-row items-center gap-4 mb-0">
    <label class="form-label flex-1" for="stp-qty-inline-label">Quantity</label>
    <div class="stepper-input">
      <button type="button" class="stepper-btn" data-ai-step="-1" aria-controls="stp-qty-inline-label" aria-label="Decrease quantity" disabled></button>
      <input id="stp-qty-inline-label" class="input" type="number" inputmode="numeric" value="1" min="1" max="10" step="1" />
      <button type="button" class="stepper-btn is-increment" data-ai-step="1" aria-controls="stp-qty-inline-label" aria-label="Increase quantity"></button>
    </div>
    <span class="text-sm text-muted w-16">units</span>
  </div>

  <span class="form-hint">Seats are billed monthly and prorated on change. Ten units per order while stock is limited.</span>
</div>`,
    },
    {
      id: 'compact',
      name: 'Compact',
      description:
        'The 40px joined field is replaced by the extra small cart stepper, sized to sit in a table cell or a cart row beside the line it belongs to.',
      guidance:
        'Use inside a bag, an order line or a data row, where the quantity is one of several things on a row and a full height stepper would set the row height for everything else. Do not use it as the only quantity control on a mobile product page: at extra small the two targets are under the comfortable touch size. Both controls carry an aria-label and the value is announced politely, because a stepper whose buttons are a minus and a plus glyph says nothing to a screen reader on its own.',
      html: `<div class="flex items-center justify-between gap-4 max-w-sm">
  <div class="flex flex-col min-w-0">
    <span class="cart-name">Aether Precision Studio</span>
    <span class="cart-subtext">Matte Obsidian / Bluetooth 5.4</span>
  </div>
  <div class="flex items-center gap-4">
    <div class="cart-stepper">
      <button type="button" class="btn btn-ghost btn-xs" aria-label="Decrease quantity of Aether Precision Studio">-</button>
      <span class="px-2 text-xs tabular" role="status" aria-live="polite">1</span>
      <button type="button" class="btn btn-ghost btn-xs" aria-label="Increase quantity of Aether Precision Studio">+</button>
    </div>
    <span class="text-sm font-bold tabular">$349.00</span>
  </div>
</div>`,
    },
  ],
};
