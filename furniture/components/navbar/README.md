# Navbar Component

## Sticky vs Static
The `<header>` uses Bootstrap's `sticky-top` class to stay fixed at the top while scrolling.

- **Sticky** (default): `<header class="sticky-top bg-white">`
- **Static**: remove `sticky-top` → `<header class="bg-white">`
- **Fixed** (always on screen, overlaps content): replace with `position-fixed w-100` and add `padding-top` to the page body to compensate

## Background Color
Change `bg-white` on `<header>` to any Bootstrap bg utility, or override in `navbar.css`:
```css
header { background-color: #your-color !important; }
```

## Announcement Bar
- **Desktop**: the marquee strip at the bottom of the header (`.marquee-outer`). Remove the entire `<div class="d-none d-lg-block marquee-outer">` block to hide it.
- **Mobile**: the Bootstrap carousel (`#announcementCarousel`). Remove that block to hide it.
- **Marquee speed**: change `30s` in `.marquee-track { animation: marquee 30s ... }` in `navbar.css`.
- **Bar color**: change the inline `style="background-color: #EDD6C4;"` on both the carousel and the marquee divs.

## Cart Drawer
Included inside this component. Width is set in `navbar.css`:
```css
.cart-drawer { width: 380px; }
```
To disable the cart entirely, remove the cart drawer/overlay markup and the `openCart`/`closeCart` actions.

## Desktop Mega Dropdown
Dropdowns open on hover via CSS (`.navbar-nav .dropdown:hover > .mega-dropdown`).
- **Width**: `.mega-dropdown { width: 580px; }`
- **To open on click instead**: remove the CSS hover rule and wire up Bootstrap's built-in dropdown with `data-toggle="dropdown"` on each trigger.

## Mobile Search Panel
Slides in from the top when the search icon is tapped. Controlled by `navbar_controller.js`. Remove the `.mobile-search-panel` block and its trigger to disable it.
