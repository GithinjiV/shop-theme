# Navbar Component

## Sticky vs Static
The navbar uses `position: fixed` so it always stays at the top. Its vertical position is controlled by `--announcement-height` so it sits just below the announcement bar.

- **Remove fixed positioning**: change `.navbar { position: fixed; }` to `position: sticky; top: 0;` in `navbar.css`. Also remove `padding-top: var(--header-offset)` from `.main-content` in `base.css`.
- **Transparent on load**: add a class via JS on scroll, or set `.navbar { background: transparent; border: none; }` and add the background back on scroll.

## Background & Border
In `navbar.css`:
```css
.navbar { background: var(--color-bg); border-bottom: 1px solid var(--color-border); }
```
Change `--color-bg` in `base.css` or override directly.

## Height
```css
--navbar-height: 70px;
```
Set in `base.css`. This variable is also used to calculate `--header-offset` for the announcement bar and `main-content` padding, so changing it here updates everything automatically.

## Cart Panel
Slides in from the right. Width is set in `navbar.css`:
```css
.cart-panel { max-width: 420px; }
```
On mobile it expands to full width automatically.

## Mobile Panel
Slides in from the left. Width is `400px` on desktop, full width on mobile:
```css
.mobile-panel { max-width: 400px; }
```

## Search Overlay
Full-screen overlay with a centred search box. Closes on `Escape` key (handled in `navbar_controller.js`). To disable search entirely, remove the search button from the navbar actions and the `.search-overlay` block from `navbar.html`.

## Mega Dropdown
Opens on hover via CSS (`.has-dropdown:hover .mega-dropdown`). The dropdown is hidden on mobile via `@media`. To add a new top-level item with a dropdown, add a new `<li class="nav-item has-dropdown">` to the `<ul class="navbar-menu">` with a `.mega-dropdown` inside.
