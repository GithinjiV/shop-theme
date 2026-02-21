# Product Hover Slideshow

Reusable Stimulus hover slideshow for product card images.

## Files
- `hover_slideshow_controller.js`: slideshow logic.
- `hover-slideshow.css`: slide-left transition styles.

## How It Works
- On hover/focus, images rotate at a fixed interval.
- Each transition slides left: current image exits left, next image enters from right.
- On mouse leave/blur, slideshow stops and resets to the first image.

## Markup
Attach to an image wrapper and provide image URLs as a `|`-separated string:

```html
<div
  class="sc-image-wrap"
  data-controller="hover-slideshow"
  data-hover-slideshow-images-value="img-1.jpg|img-2.jpg|img-3.jpg"
>
  <img src="img-1.jpg" data-hover-slideshow-target="image" alt="Product">
</div>
```

## Customization
- Slideshow interval:
  - Set `data-hover-slideshow-interval-value="1400"` on the wrapper (milliseconds).
  - Default is `1100`.
- Transition speed/easing:
  - Edit `transition: transform 300ms ease;` in `hover-slideshow.css`.
- Slide direction:
  - Current setup is left-slide.
  - To reverse direction, swap `translateX(-100%)` and `translateX(100%)` transform targets in CSS.
