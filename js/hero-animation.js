// hero-animation.js
// Triggers the hero entrance sequence by adding animation classes after timed delays.
// Skips delays entirely when the user has requested reduced motion.

const HERO_ILLUSTRATION_SELECTOR = '.site-hero__central-illustration';
const HERO_CONTENT_SELECTOR      = '.site-hero__content';
const HERO_SCROLL_HINT_SELECTOR  = '.site-hero__scroll-hint';

function beginHeroEntranceSequence() {
  const heroIllustration = document.querySelector(HERO_ILLUSTRATION_SELECTOR);
  const heroContent      = document.querySelector(HERO_CONTENT_SELECTOR);
  const heroScrollHint   = document.querySelector(HERO_SCROLL_HINT_SELECTOR);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show all elements immediately without delay
    if (heroIllustration) heroIllustration.style.opacity = '1';
    if (heroContent)      heroContent.style.opacity      = '1';
    if (heroScrollHint)   heroScrollHint.classList.add('animation-scroll-hint-pulse');
    return;
  }

  if (heroIllustration) {
    setTimeout(() => {
      heroIllustration.classList.add('animation-hero-emerge');
    }, 400);
  }

  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('animation-hero-text-rise');
    }, 1800);
  }

  if (heroScrollHint) {
    setTimeout(() => {
      heroScrollHint.classList.add('animation-scroll-hint-pulse');
    }, 4000);
  }
}

document.addEventListener('DOMContentLoaded', beginHeroEntranceSequence);
