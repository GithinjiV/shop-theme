# Hero Slider Component

## Height
Set in `hero.css`:
```css
.hero-section { height: 560px; }
```
Mobile height is overridden at the bottom of the file (`420px` below 768px).

## Adding / Removing Slides
Each slide is a `.hero-slide` div inside `.hero-track`. Add or remove slides freely — the controller (`hero_slider_controller.js`) counts them automatically and builds the dots to match.

## Autoplay Speed
In `hero_slider_controller.js`:
```js
this.interval = setInterval(() => this.next(), 5000)
```
Change `5000` (milliseconds) to any value. Set to `0` or remove `startAutoplay()` to disable autoplay.

## Transition Speed
In `hero.css`:
```css
.hero-track { transition: transform 0.5s ease; }
```
Change `0.5s` or swap `ease` for `linear`, `ease-in-out`, etc.

## Text Position
The text sits inside `.hero-overlay > .container`. The container uses flexbox (`d-flex flex-column`) to stack the heading, subtitle, and buttons. Control position by changing the Bootstrap utility classes on the container div in `hero.html`.

**Vertically centered (default):**
```html
<div class="container h-100 d-flex flex-column justify-content-center">
```

**Vertically bottom:**
```html
<div class="container h-100 d-flex flex-column justify-content-end pb-5">
```

**Vertically top:**
```html
<div class="container h-100 d-flex flex-column justify-content-start pt-5">
```

**Horizontally centered** — add `align-items-center text-center` to the container:
```html
<div class="container h-100 d-flex flex-column justify-content-center align-items-center text-center">
```

**Pinned to the right** — add `align-items-end text-right`:
```html
<div class="container h-100 d-flex flex-column justify-content-center align-items-end text-right">
```

**Combining vertical + horizontal** — mix any `justify-content-*` with `align-items-*`:
| Position | Classes |
|---|---|
| Top left | `justify-content-start align-items-start pt-5` |
| Top center | `justify-content-start align-items-center text-center pt-5` |
| Top right | `justify-content-start align-items-end text-right pt-5` |
| Center left | `justify-content-center` (default) |
| Center center | `justify-content-center align-items-center text-center` |
| Center right | `justify-content-center align-items-end text-right` |
| Bottom left | `justify-content-end pb-5` |
| Bottom center | `justify-content-end align-items-center text-center pb-5` |
| Bottom right | `justify-content-end align-items-end text-right pb-5` |

Each slide can have its own position — just change the classes on that slide's container div independently.

## Overlay Darkness
The dark tint over the image is on `.hero-overlay`:
```css
.hero-overlay { background: rgba(0, 0, 0, 0.38); }
```
Increase the last value (0–1) for darker, decrease for lighter. Set to `0` to remove the overlay entirely.

## Arrows
Hide the arrows by removing the two `.hero-arrow` buttons from `hero.html`, or in CSS:
```css
.hero-arrow { display: none; }
```

## Dots
Hide the dots by removing the `.hero-dots` element, or in CSS:
```css
.hero-dots { display: none; }
```

## Static Hero (no slider)
If you only need one slide and no controls, remove the arrows and dots markup, remove the `data-controller` attribute from `<section>`, and simplify `.hero-track` to just a background image instead.
