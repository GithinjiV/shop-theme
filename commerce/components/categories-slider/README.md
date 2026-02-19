# Categories Slider Component

## Drag to Scroll
The track is draggable on desktop via `slider_controller.js` (mousedown/mousemove/mouseup). On touch devices, native scroll handles it. No additional JS needed for touch.

## Adding / Removing Cards
Each card is an `<a class="category-card">` inside `.categories-track`. Add or remove cards freely — no JS changes needed.

## Card Width
In `categories-slider.css`:
```css
.category-card { width: 280px; }
```
Mobile reduces this to `220px` in the media query.

## Card Aspect Ratio
```css
.category-card-img { aspect-ratio: 3 / 4; }
```
Change to `1 / 1` for square cards, `16 / 9` for landscape, etc.

## Background Color
```css
.categories-slider { background: var(--color-hover); }
```
Change `--color-hover` in `base.css` or override directly with any color.

## Hover Zoom
Cards zoom their image on hover via:
```css
.category-card:hover .category-card-img img { transform: scale(1.05); }
```
Remove or reduce `scale(1.05)` to disable/soften the effect.

## Padding / Spacing
- Section padding: `.categories-slider { padding: 60px 0; }`
- Track side padding (shows partial next card): `.categories-track { padding: 0 48px; }`
- Gap between cards: `.categories-track { gap: 20px; }`
