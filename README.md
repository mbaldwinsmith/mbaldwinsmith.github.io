# Mark Baldwin-Smith — Personal Website

A static personal website in the aesthetic of 16th–17th century woodcut manuscripts:
vellum parchment background, black ink and crimson red typography, woodcut-style imagery,
and contemplative animation. Built with vanilla HTML, CSS, and JavaScript — no build step,
no frameworks, no dependencies beyond Google Fonts.


---

## Quick Start

### Host locally with Python

**Python 3 (recommended):**
```bash
cd /path/to/this/folder
python3 -m http.server 8080
```
Then open your browser and go to: `http://localhost:8080`

**Python 2 (if Python 3 is unavailable):**
```bash
python -m SimpleHTTPServer 8080
```

> **Why a local server?** Opening `index.html` directly as a `file://` URL will cause
> fonts and some images to load incorrectly. Always use a local server.

### Host as a GitHub Page

1. Create a new repository on GitHub (e.g. `markbaldwinsmith.github.io` for a root page,
   or any name for a project page)
2. Push all files in this folder to the repository's `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial site build"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```
3. In the repository on GitHub, go to **Settings → Pages**
4. Under "Source", select **Deploy from a branch → main → / (root)**
5. Click **Save**
6. Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/` within a minute or two

> For a root user page (`username.github.io`), name the repository exactly
> `YOUR-USERNAME.github.io` and it will serve from the root URL.

---

## Project File Map

```
/
├── README.md               ← You are here. Start here.
├── TASK.md                 ← AI agent task list. All build instructions.
├── STYLEGUIDE.md           ← Visual and code style reference. Agent reads this first.
├── PROMPTS.md              ← ChatGPT/DALL·E prompts for all site images. Mark uses this.
│
├── index.html              ← Main (and only) page
│
├── css/
│   ├── variables.css       ← All CSS custom properties (colours, spacing, type scale)
│   ├── base.css            ← Reset, body, typography, vellum texture overlay
│   ├── layout.css          ← Page sections, grid, spacing, footer
│   ├── navigation.css      ← Sticky nav bar
│   ├── hero.css            ← Full-height hero section
│   ├── biography.css       ← Bio/about section including marginal notes and aside
│   ├── project-cards.css   ← Works grid and individual cards
│   ├── contact.css         ← Contact section
│   ├── animations.css      ← All @keyframes and animation utility classes
│   └── utilities.css       ← Helper classes (.visually-hidden, .text-crimson, etc.)
│
├── js/
│   ├── scroll-reveal.js          ← IntersectionObserver section reveals on scroll
│   ├── navigation-behaviour.js   ← Sticky nav active state as sections scroll
│   └── hero-animation.js         ← Hero image entrance sequence
│
└── images/
    ├── hero/
    │   ├── pilgrim-tree.png          ← Central hero woodcut illustration
    │   └── vellum-texture-bg.png     ← Subtle hero background texture
    ├── works/
    │   ├── golden-thread-card.png
    │   ├── poetry-chapbook-card.png
    │   ├── kerygma-codex-card.png
    │   ├── essays-theology-card.png
    │   ├── sweet-sophia-card.png
    │   └── community-vision-card.png
    └── decorative/
        ├── manuscript-portrait.png   ← Bio section aside portrait
        ├── folio-ornament-works.png  ← Decorative band above works section
        ├── colophon-ornament.png     ← Footer ornament
        └── wax-seal.png              ← Bio aside wax seal
```

---

## Documentation Files

| File | Purpose | Who uses it |
|------|---------|-------------|
| `README.md` | This file. Overview and hosting. | Mark + Agent |
| `TASK.md` | Complete step-by-step build instructions, broken into modular phases. Tasks marked `[MARK]` require human input. | AI Agent (primarily) + Mark |
| `STYLEGUIDE.md` | All visual, typographic, colour, and code conventions. The agent reads this before writing any code. | AI Agent |
| `PROMPTS.md` | ChatGPT/DALL·E prompts for every image, with filenames and folder paths. | Mark |

---

## Colour Reference (quick lookup)

| Name | Hex | Use |
|------|-----|-----|
| Vellum | `#F2E8D0` | Page background |
| Vellum Shadow | `#E8D9B5` | Nav background, card backs |
| Vellum Crease | `#D4C49A` | Borders, aged edges |
| Ink | `#1A1008` | Primary text, borders |
| Ink Medium | `#2D1F0E` | Secondary text |
| Ink Faded | `#5C3D1E` | Captions, footnotes |
| Sepia | `#7A5230` | Supporting body colour |
| Crimson | `#8B1A1A` | Primary accent, drop caps |
| Crimson Bright | `#A83232` | Hover states |
| Gold | `#C8A84B` | Rare highlight only |

---

## Before You Launch — Mark's Checklist

- [ ] Bio text written and inserted (TASK.md §3.4)
- [ ] Project list decided, descriptions written, URLs gathered (TASK.md §3.6)
- [ ] Contact links updated with real email and URLs (TASK.md §3.7)
- [ ] Motto confirmed (TASK.md §3.2)
- [ ] All 12 images generated via PROMPTS.md and placed in `images/`
- [ ] Meta description written (TASK.md §6.3)
- [ ] Site reviewed locally at `localhost:8080`
- [ ] Site looks correct on mobile (check at 375px width)

---

## Technology

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox, animations, no preprocessor
- **JavaScript (ES6+)** — vanilla, no frameworks, no build step
- **Google Fonts** — IM Fell English, IM Fell DW Pica, Cinzel Decorative
- **No dependencies** — the site is entirely self-contained once images are added

---

*per ardua ad lucem*
