# Mark Baldwin-Smith — Personal Website

A static personal website styled after 16th–17th century woodcut manuscripts: vellum parchment, black ink and crimson red typography, woodcut-style imagery, and contemplative animation. Built with vanilla HTML, CSS, and JavaScript — no build step, no frameworks, no dependencies beyond Google Fonts.

---

## Running Locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser.

> Open `index.html` directly as a `file://` URL and fonts will load incorrectly. Always use a local server.

---

## Deploying to GitHub Pages

1. Push to a GitHub repository named `YOUR-USERNAME.github.io`
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch → main → / (root)** and save
4. The site will be live at `https://YOUR-USERNAME.github.io` within a minute or two

---

## File Structure

```
/
├── index.html
├── css/
│   ├── variables.css       — CSS custom properties (colours, spacing, type scale)
│   ├── base.css            — Reset, body, typography, vellum texture
│   ├── layout.css          — Page sections, grid, spacing, footer
│   ├── navigation.css      — Sticky nav bar
│   ├── hero.css            — Full-height hero section
│   ├── biography.css       — Bio section with marginal notes and aside
│   ├── project-cards.css   — Works grid and cards
│   ├── contact.css         — Contact section
│   ├── animations.css      — @keyframes and animation utilities
│   └── utilities.css       — Helper classes
├── js/
│   ├── scroll-reveal.js          — Section reveals on scroll
│   ├── navigation-behaviour.js   — Active nav state on scroll
│   └── hero-animation.js         — Hero image entrance sequence
└── images/
    ├── hero/
    │   ├── pilgrim-tree.png
    │   └── vellum-texture-bg.png
    ├── works/
    │   ├── golden-thread-card.png
    │   ├── poetry-chapbook-card.png
    │   ├── kerygma-codex-card.png
    │   ├── essays-theology-card.png
    │   ├── sweet-sophia-card.png
    │   └── community-vision-card.png
    └── decorative/
        ├── manuscript-portrait.png
        ├── folio-ornament-works.png
        ├── colophon-ornament.png
        └── wax-seal.png
```

---

## Colour Palette

| Name | Hex | Use |
|---|---|---|
| Vellum | `#F2E8D0` | Page background |
| Vellum Shadow | `#E8D9B5` | Nav, card backs |
| Vellum Crease | `#D4C49A` | Borders, aged edges |
| Ink | `#1A1008` | Primary text |
| Ink Medium | `#2D1F0E` | Secondary text, subheadings |
| Ink Faded | `#5C3D1E` | Captions, footnotes |
| Sepia | `#7A5230` | Supporting body text |
| Crimson | `#8B1A1A` | Primary accent, drop caps |
| Crimson Bright | `#A83232` | Hover states |
| Gold | `#C8A84B` | Rare highlight only |

---

## Technology

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox, animations; no preprocessor
- **JavaScript ES6+** — vanilla; no frameworks, no build step
- **Google Fonts** — IM Fell English, IM Fell DW Pica, Cinzel Decorative

---

*per ardua ad lucem*
