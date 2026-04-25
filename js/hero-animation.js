// hero-animation.js
// Triggers the hero entrance sequence by adding animation classes after timed delays.
// Skips delays entirely when the user has requested reduced motion.

const HERO_ILLUSTRATION_SELECTOR = '.site-hero__central-illustration';
const HERO_NAME_SELECTOR         = '.site-hero__content--name';
const HERO_EPITHET_SELECTOR      = '.site-hero__content--epithet';
const HERO_SCROLL_HINT_SELECTOR  = '.site-hero__scroll-hint';

function beginHeroEntranceSequence() {
  const heroIllustration = document.querySelector(HERO_ILLUSTRATION_SELECTOR);
  const heroName         = document.querySelector(HERO_NAME_SELECTOR);
  const heroEpithet      = document.querySelector(HERO_EPITHET_SELECTOR);
  const heroScrollHint   = document.querySelector(HERO_SCROLL_HINT_SELECTOR);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    if (heroIllustration) heroIllustration.style.opacity = '1';
    if (heroName)         heroName.style.opacity         = '1';
    if (heroEpithet)      heroEpithet.style.opacity      = '1';
    if (heroScrollHint)   heroScrollHint.classList.add('animation-scroll-hint-pulse');
    return;
  }

  // Illustration emerges first
  if (heroIllustration) {
    setTimeout(() => {
      heroIllustration.classList.add('animation-hero-emerge');
    }, 400);
  }

  // Name rises while illustration is still fading in
  if (heroName) {
    setTimeout(() => {
      heroName.classList.add('animation-hero-text-rise');
    }, 800);
  }

  // Epithet follows once illustration is mostly visible
  if (heroEpithet) {
    setTimeout(() => {
      heroEpithet.classList.add('animation-hero-text-rise');
    }, 1800);
  }

  if (heroScrollHint) {
    setTimeout(() => {
      heroScrollHint.classList.add('animation-scroll-hint-pulse');
    }, 4000);
  }
}

document.addEventListener('DOMContentLoaded', beginHeroEntranceSequence);
