// scroll-reveal.js
// Observes elements with .reveal-on-scroll and adds .is-visible when they enter the viewport.
// Project cards within the works grid also receive incremental transition-delay for a staggered reveal.

const REVEAL_THRESHOLD  = 0.12;
const OBSERVED_SELECTOR = '.reveal-on-scroll';
const VISIBLE_CLASS     = 'is-visible';

function handleRevealIntersection(intersectionEntries) {
  intersectionEntries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(VISIBLE_CLASS);
    }
  });
}

function initialiseSectionRevealObserver() {
  const sectionRevealObserver = new IntersectionObserver(handleRevealIntersection, {
    threshold: REVEAL_THRESHOLD
  });

  const elementsToReveal = document.querySelectorAll(OBSERVED_SELECTOR);
  elementsToReveal.forEach(element => sectionRevealObserver.observe(element));

  // Apply incremental transition-delay to project cards so they reveal sequentially
  const projectCards = document.querySelectorAll('.works-section__grid .project-card');
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });
}

document.addEventListener('DOMContentLoaded', initialiseSectionRevealObserver);
