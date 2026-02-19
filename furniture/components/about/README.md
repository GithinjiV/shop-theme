# About Page Components

The About page is split into isolated components following the same pattern as other components in this project.

## Component Map
- `components/about/about-layout.css`
  - Page shell styles (`.about-page`, `.about-content-area`).
- `components/about-hero/about-hero.html`
- `components/about-hero/about-hero.css`
  - Top intro block (`About Us`, `Elevating Elegance`, intro paragraph).
- `components/about-mosaic/about-mosaic.html`
- `components/about-mosaic/about-mosaic.css`
  - Mosaic placeholder grid section.
- `components/about-craft/about-craft.html`
- `components/about-craft/about-craft.css`
  - "Where Craft Meets Elegance" split content section.
- `components/about-mission-vision/about-mission-vision.html`
- `components/about-mission-vision/about-mission-vision.css`
  - Mission and Vision cards section.
- `components/about-how-we-work/about-how-we-work.html`
- `components/about-how-we-work/about-how-we-work.css`
  - "How We Work" two-column section.
- `components/about-deliver/about-deliver.html`
- `components/about-deliver/about-deliver.css`
  - Bottom image banner with CTA.

## How It Is Wired
`about.html` links each component stylesheet in `<head>` and includes each section in `<main>` using `data-include`.

## Editing Guidance
- Change structure/content in each section's `.html` file.
- Change section-specific styles only in that section's `.css` file.
- Keep shared page spacing in `components/about/about-layout.css`.
