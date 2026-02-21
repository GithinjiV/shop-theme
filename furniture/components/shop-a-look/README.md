# Shop a Look Component

Instagram-style "Shop the Look" UI with:
- curated image grid
- furniture-focused look builder form
- modal lightbox
- bundled product list
- add-all CTA

## Files
- `shop-a-look.html`: component markup.
- `shop-a-look-form.html`: look creation form markup.
- `shop-a-look.css`: component styles.
- `shop_a_look_controller.js`: Stimulus behavior for open/close and look switching.

## Usage
1. Load CSS:
   - `components/shop-a-look/shop-a-look.css`
2. Include HTML:
   - `components/shop-a-look/shop-a-look-form.html`
   - `components/shop-a-look/shop-a-look.html`
3. Register controller:
   - `application.register("shop-a-look", ShopALookController)`

## Card Data API
Each look card uses data attributes:
- `data-look-slug`
- `data-look-title`
- `data-look-meta`
- `data-look-image`

Product entries inside modal are provided by each card's `<template>`.

Each card image can also use the reusable hover slideshow:
- add `data-controller="hover-slideshow"` on `.sal-card-media`
- add `data-hover-slideshow-images-value="scene.jpg|product-1.jpg|product-2.jpg"`
- set image target: `data-hover-slideshow-target="image"`

## Customization
- Grid size:
  - edit `.sal-grid` in `shop-a-look.css`.
- Modal proportions:
  - edit `.sal-modal-shell` `grid-template-columns`.
- Card image height:
  - edit `.sal-card img`.
- CTA label:
  - edit button text `.sal-add-all` in HTML.
- Hook add-all action:
  - read `data-look-slug` from `data-shop-a-look-target="addAllButton"` in controller and connect to cart endpoint.
- Look-builder form fields:
  - update `.sal-form` block in `shop-a-look.html` to change image input type/options and product selectors.
