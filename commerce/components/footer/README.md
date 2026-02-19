# Footer Component

## Background Color
Set in `footer.css`:
```css
footer { background-color: #D9D9D9; }
```
Change to any hex value or CSS color.

## Mobile Accordion
On screens below 992px, each footer section collapses and the user taps the header to expand. Controlled by `footer_controller.js`.

- **Always expanded on mobile**: in `footer.css`, remove the `@media (max-width: 991.98px)` block that sets `.footer-section-body { display: none; }`.
- **Disable the accordion entirely**: remove `data-action="click->footer#toggle"` from each `.footer-section-header` and remove the chevron icons.

## Column Count
Uses Bootstrap's grid. Currently 4 columns on desktop (`col-lg-3`), full width on mobile (`col-12`).

- **3 columns**: change to `col-lg-4`
- **2 columns**: change to `col-lg-6`

## Social Icons
Icons are in `.footer-social` at the bottom. Add or remove `<a>` tags with Bootstrap Icons classes (`bi-facebook`, `bi-instagram`, `bi-tiktok`, `bi-twitter-x`, etc.).

Icon size and background are in `footer.css`:
```css
.footer-social-icon { width: 34px; height: 34px; background-color: #333; }
```

## Copyright Bar
The bottom row with social icons and copyright text. To stack them on desktop too, change the `d-flex` container to `flex-column` and add `text-center`.
