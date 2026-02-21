# Sticky Cart Component

Bottom-fixed add-to-cart bar for the furniture single listing page.

## Files
- `sticky-cart.html`: Markup for the sticky bar.
- `sticky-cart.css`: Visual styles and responsive rules.
- `sticky_cart_controller.js`: Stimulus controller for visibility + quantity sync.

## Visibility Behavior
- The sticky bar is hidden while the main listing section (`.sl-product-wrap`) is visible.
- It becomes visible only when the whole listing section is out of view.

## Integration
- Loaded in `furniture/single_listing.html` via:
  - `<link rel="stylesheet" href="components/sticky-cart/sticky-cart.css">`
  - `<div data-include="components/sticky-cart/sticky-cart.html"></div>`
  - Stimulus registration: `application.register("sticky-cart", StickyCartController)`

## Data Hooks Used
- Source listing add button: `[data-sl-source-add]`
- Source listing quantity input: `[data-sl-source-qty]`
- Qty step controls: `[data-sl-qty-step]`
