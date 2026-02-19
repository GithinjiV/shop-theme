# Announcement Bar Component

## Background Color
Set via CSS variable override or directly in `announcement-bar.css`:
```css
.announcement-bar { background: var(--color-text); }
```
Change to any color. The default uses `--color-text` (dark) with `--color-bg` (white) text for contrast.

## Height
Controlled by the CSS variable in `base.css`:
```css
--announcement-height: 36px;
```
This variable is also used to position the navbar and offset `main-content`, so changing it here updates the whole layout automatically.

## Content
Edit the text and link directly in `announcement-bar.html`. Add more `<span>` items separated by `.announcement-divider` spans for multiple messages.

## Hiding It
To remove the announcement bar entirely:
1. Delete the `data-include` line from `index.html`
2. Update `--announcement-height: 0px` in `base.css` so the navbar and content shift up correctly
