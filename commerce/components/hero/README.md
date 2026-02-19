# Hero Component

## Background Image
Set directly in `hero.css` on the `.hero` rule:
```css
background-image: linear-gradient(...), url('your-image-url');
```
The gradient overlays the image to ensure text legibility. Two versions exist: desktop (gradient left-to-right) and mobile (gradient top-to-bottom). Update both in the `@media (max-width: 768px)` block.

## Overlay / Gradient Direction
- **Left fade** (default, text on left): `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)`
- **Bottom fade** (text at bottom): `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)`
- **Full dark overlay**: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`
- **No overlay**: remove the gradient and keep only the `url(...)` value

## Text Position
The `.hero` element uses `align-items: flex-start` (text on the left). Change on `.hero` in `hero.css`:

| Position | CSS |
|---|---|
| Left (default) | `align-items: flex-start` |
| Center | `align-items: center; text-align: center` |
| Right | `align-items: flex-end; text-align: right` |

Also update the gradient direction to match so the darkest area sits behind the text.

## Height
```css
.hero { min-height: 85vh; }
```
Change to `min-height: 100vh` for full viewport, or a fixed value like `min-height: 600px`.

## Eyebrow Label
The small uppercase text above the heading (`.hero-eyebrow`). Remove the `<span class="hero-eyebrow">` element to hide it.

## CTA Buttons
`.hero-cta` is the primary button (white background). `.hero-secondary` is the underline-style secondary link. Both are inside `.hero-actions`. On mobile they stack full-width automatically.
