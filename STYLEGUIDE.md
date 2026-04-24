# STYLEGUIDE.md
# Mark Baldwin-Smith Personal Website — Visual & Code Style Guide

This document is the single source of truth for all visual, typographic, and code decisions
across the site. Every file the AI agent produces must conform to this guide. When in doubt,
refer here first.

---

## 1. VISUAL IDENTITY

### 1.1 Concept

The site should feel like a private manuscript or working folio from the 16th–17th century —
discovered, not designed. Think woodcut printing, alchemical marginalia, devotional books of hours,
Walsingham pilgrim tracts. The aesthetic carries quiet mysticism and scholarly warmth, not gothic
darkness. Whimsy lives in the details; the overall impression is beautiful, still, and serious.

Primary references:
- Woodcut illustrations from Albrecht Dürer, Hans Holbein the Younger
- Books of Hours (Très Riches Heures du Duc de Berry)
- Monastic manuscripts with red rubrics and dark ink
- Pilgrim broadsheets and devotional pamphlets, 1500–1700
- The interiors of Little St Mary's, Cambridge

---

### 1.2 Colour Palette

All hex values below are exact. No deviations. These must also be given to ChatGPT in image prompts.

```
--colour-vellum:           #F2E8D0   /* Primary background — warm aged parchment */
--colour-vellum-shadow:    #E8D9B5   /* Slightly darker vellum, for nav and card backs */
--colour-vellum-crease:    #D4C49A   /* Deep vellum, borders, folds, aged edges */
--colour-ink:              #1A1008   /* Primary text — near-black warm ink */
--colour-ink-medium:       #2D1F0E   /* Secondary text, subheadings */
--colour-ink-faded:        #5C3D1E   /* Tertiary text, footnotes, captions */
--colour-sepia:            #7A5230   /* Warm brown — body text supporting colour */
--colour-crimson:          #8B1A1A   /* Primary accent — rubric red, drop caps, highlights */
--colour-crimson-bright:   #A83232   /* Hover state red, interactive accent */
--colour-crimson-ghost:    #C96242   /* Very faint red wash — decorative only */
--colour-gold:             #C8A84B   /* Rare — gilded details in images and borders only */
--colour-white-vellum:     #FAF5EA   /* Near-white highlight on image overlays */
```

Use `--colour-gold` sparingly — only for a single highlight element per page section,
such as a seal, a star, or a rubricated initial. It should feel precious, not decorative.

No other colours are permitted. No greys, blues, or neutrals from outside this palette.

---

### 1.3 Typography

Fonts must be loaded from Google Fonts. Do not use system fonts for display text.

```
Display / Headings:    "IM Fell English" (regular + italic)
Subheadings / Labels:  "IM Fell DW Pica" (regular + italic)
Decorative initials:   "Cinzel Decorative" (400, 700)
Body text:             "IM Fell English" (regular)
Footnotes / Captions:  "IM Fell DW Pica" italic
```

Google Fonts import string:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=IM+Fell+DW+Pica:ital@0;1&family=Cinzel+Decorative:wght@400;700&display=swap" rel="stylesheet">
```

#### Type Scale

```
--font-size-base:     18px
--font-size-small:    14px
--font-size-caption:  13px
--font-size-h1:       clamp(2rem, 5vw, 3.8rem)
--font-size-h2:       clamp(1.4rem, 3vw, 2.2rem)
--font-size-h3:       clamp(1.1rem, 2vw, 1.5rem)
--line-height-body:   1.75
--line-height-heading: 1.15
--letter-spacing-wide: 0.12em
--letter-spacing-caps: 0.18em
```

Body text is always left-aligned or justified with `hyphens: auto`. Never centred except in
hero blocks and decorative captions.

Drop caps: applied only to the first paragraph of a major section. Size: 3.8rem, Cinzel Decorative,
`--colour-crimson`, floated left with appropriate margin.

---

### 1.4 Imagery

All images are rasterised (PNG or JPG, no SVG except as placeholder). See `PROMPTS.md` for
generation instructions.

Image style guidelines for the AI agent when writing `alt` text and `figure` captions:
- All images are black, sepia, and crimson on vellum — never colour photographs
- Images read as woodcut prints or manuscript illuminations
- They have visible texture: grain, ink bleed, slight imperfection
- They are not decorative only — each image carries thematic meaning

Image file size target: < 400KB per image. Use `loading="lazy"` on all below-fold images.

---

### 1.5 Texture & Surface

The vellum background must have layered texture applied purely in CSS:
1. Base background colour: `#F2E8D0`
2. SVG noise filter overlay (inline, as a `<filter>` in a hidden `<svg>` block in the HTML)
3. Repeating subtle horizontal grain lines via `repeating-linear-gradient`
4. A fixed `::before` pseudo-element on `body` for the grain overlay (pointer-events: none)

No background images for texture. CSS only.

Borders: 1–2px solid `--colour-ink` for structural borders. Use `--colour-vellum-crease` for
lighter decorative borders. Never use `box-shadow` with colour — only `rgba(26, 16, 8, N)`.

---

### 1.6 Spacing

Use a consistent 8px base grid. All margins and paddings should be multiples of 8px.

```
--space-xs:   8px
--space-sm:   16px
--space-md:   24px
--space-lg:   40px
--space-xl:   64px
--space-xxl:  96px
```

Section vertical padding: `--space-xxl` top and bottom.
Max content width: `900px`, centred, with `padding: 0 var(--space-lg)`.

---

### 1.7 Motion & Animation

Animation philosophy: **stillness punctuated by breath**. Most things do not move.
The things that do move, move slowly and with purpose.

Rules:
- Page load: the central hero illustration draws itself (stroke-dashoffset or opacity fade)
- Section reveal: `opacity: 0 → 1` + `translateY(16px → 0)` on scroll entry (IntersectionObserver)
- Hover on cards: slight `translateY(-4px)` + deepened shadow + border colour change to `--colour-crimson`
- Hover on nav links: underline scale-in from left
- Wax seal (if present): a slow `scale(1) → scale(1.03) → scale(1)` breathing loop, 4s
- No bouncing, no sliding panels, no parallax
- All transitions: `ease-out`, duration 300–500ms (hover), 800ms–2s (scroll reveals)
- Respect `prefers-reduced-motion`: wrap animation declarations in a media query

```css
@media (prefers-reduced-motion: reduce) {
  /* Reset all transitions and animations to instant */
}
```

---

## 2. CODE STYLE

### 2.1 File Structure

```
/
├── index.html
├── about.html          (if multi-page)
├── works.html          (if multi-page)
├── css/
│   ├── variables.css       ← All CSS custom properties only
│   ├── base.css            ← Reset, body, typography
│   ├── layout.css          ← Grid, sections, page scaffolding
│   ├── navigation.css      ← Nav bar styles
│   ├── hero.css            ← Hero section
│   ├── biography.css       ← About/bio section
│   ├── project-cards.css   ← Works grid and cards
│   ├── contact.css         ← Contact section
│   ├── animations.css      ← All keyframes and transitions
│   └── utilities.css       ← Helper classes (.visually-hidden etc)
├── js/
│   ├── scroll-reveal.js        ← IntersectionObserver for section reveals
│   ├── navigation-behaviour.js ← Sticky nav, active state
│   └── hero-animation.js       ← Hero illustration entrance animation
├── images/
│   ├── hero/
│   ├── works/
│   └── decorative/
└── fonts/              (only if self-hosting — otherwise Google Fonts link)
```

### 2.2 HTML Conventions

- Semantic HTML5 elements throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Each section has an `id` matching its nav anchor
- All images have descriptive `alt` attributes in sentence case, not keyword-stuffed
- CSS classes use `kebab-case`, prefixed by component: e.g. `project-card__title`, `biography-section__drop-cap`
- No inline styles. No `style=""` attributes. All styling in external CSS files.
- No inline event handlers. No `onclick=""`. All JS in external files.
- Use `<figure>` and `<figcaption>` for all images that carry meaning.
- Decorative-only images: `alt=""` and `aria-hidden="true"`

Example class naming:
```html
<section id="works" class="works-section">
  <div class="works-section__header">
  <div class="works-section__grid">
    <article class="project-card">
      <div class="project-card__symbol">
      <h3 class="project-card__title">
      <p class="project-card__description">
      <a class="project-card__link">
```

### 2.3 CSS Conventions

- All files begin with a comment block: `/* ═══ FILENAME.CSS — description ═══ */`
- All custom properties defined **only** in `variables.css` under `:root {}`
- Properties ordered: positioning → box model → typography → visual → animation
- No `!important` except for `.visually-hidden` utility
- Media queries: mobile-first. Breakpoints:
  ```
  --breakpoint-sm:  480px
  --breakpoint-md:  768px
  --breakpoint-lg:  1024px
  ```
- Avoid deeply nested selectors. Max 3 levels deep.

### 2.4 JavaScript Conventions

- All files begin with a comment block and a one-line description
- Use `const` by default; `let` only when reassignment is necessary. Never `var`.
- Function names: descriptive verbs — `initialiseSectionRevealObserver()`, `applyActiveLinkHighlight()`, `beginHeroDrawAnimation()`
- Variable names: full nouns — `sectionRevealObserver`, `navigationLinkElements`, `heroIllustrationPaths`
- No anonymous functions where a named function would be clearer
- Event listeners attached in a named `initialise()` function called on `DOMContentLoaded`
- No jQuery, no frameworks, no build tools
- ES6+ features allowed: `const`, `let`, arrow functions, template literals, `querySelectorAll`, `IntersectionObserver`, `classList`
- Each JS file is self-contained: it exports nothing and imports nothing. It reads from the DOM.

Example:
```js
// scroll-reveal.js
// Observes sections and elements with class .reveal-on-scroll
// and adds .is-visible when they enter the viewport.

const REVEAL_THRESHOLD = 0.12;
const REVEAL_CLASS = 'is-visible';
const OBSERVED_SELECTOR = '.reveal-on-scroll';

function initialiseSectionRevealObserver() {
  const revealObserver = new IntersectionObserver(handleRevealIntersection, {
    threshold: REVEAL_THRESHOLD
  });
  const elementsToReveal = document.querySelectorAll(OBSERVED_SELECTOR);
  elementsToReveal.forEach(element => revealObserver.observe(element));
}

function handleRevealIntersection(intersectionEntries) {
  intersectionEntries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(REVEAL_CLASS);
    }
  });
}

document.addEventListener('DOMContentLoaded', initialiseSectionRevealObserver);
```

### 2.5 Comments

- Each CSS file section headed with a ruled comment: `/* ── Section Name ── */`
- Non-obvious CSS values explained inline: `/* vellum noise overlay, pointer-events off */`
- JS functions preceded by a one-line comment explaining *why*, not *what*
- No commented-out dead code in final files

---

## 3. ACCESSIBILITY

- Colour contrast: all body text must meet WCAG AA (4.5:1 minimum) against `--colour-vellum`
- `--colour-ink` (#1A1008) on `--colour-vellum` (#F2E8D0): passes AAA
- `--colour-crimson` (#8B1A1A) on `--colour-vellum` (#F2E8D0): passes AA
- Focus styles: never removed. Use `outline: 2px solid var(--colour-crimson)` with `outline-offset: 3px`
- All interactive elements reachable by keyboard
- Use `.visually-hidden` class (not `display:none`) for screen-reader-only text

---

## 4. PERFORMANCE

- No JavaScript frameworks
- No CSS preprocessors
- No external dependencies beyond Google Fonts
- All images lazy-loaded below the fold
- Hero image: `loading="eager"`, preloaded with `<link rel="preload">`
- Target: Lighthouse score ≥ 90 on all categories

---

*End of STYLEGUIDE.md*
