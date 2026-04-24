// navigation-behaviour.js
// Watches each page section with IntersectionObserver and highlights the matching nav link
// when that section occupies more than 50% of the viewport.

const NAVIGATION_ELEMENT_SELECTOR = 'nav.site-navigation';
const NAVIGATION_LINK_SELECTOR    = '.site-navigation__link';
const ACTIVE_LINK_CLASS           = 'is-active';

function applyActiveLinkHighlight() {
  const navigationElement      = document.querySelector(NAVIGATION_ELEMENT_SELECTOR);
  const navigationLinkElements = document.querySelectorAll(NAVIGATION_LINK_SELECTOR);
  const sectionElements        = document.querySelectorAll('main section[id], header[id]');

  if (!navigationElement || navigationLinkElements.length === 0) return;

  const activeSectionObserver = new IntersectionObserver(handleSectionIntersection, {
    threshold: 0.5
  });

  sectionElements.forEach(section => activeSectionObserver.observe(section));

  function handleSectionIntersection(intersectionEntries) {
    intersectionEntries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const matchingLink = document.querySelector(
        `${NAVIGATION_LINK_SELECTOR}[href="#${entry.target.id}"]`
      );

      if (!matchingLink) return;

      navigationLinkElements.forEach(link => link.classList.remove(ACTIVE_LINK_CLASS));
      matchingLink.classList.add(ACTIVE_LINK_CLASS);
    });
  }
}

function initialiseNavigationBehaviour() {
  applyActiveLinkHighlight();
}

document.addEventListener('DOMContentLoaded', initialiseNavigationBehaviour);
