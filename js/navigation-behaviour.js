// navigation-behaviour.js
// Watches scroll position and highlights the nav link for the active page section.

const NAVIGATION_ELEMENT_SELECTOR = 'nav.site-navigation';
const NAVIGATION_LINK_SELECTOR    = '.site-navigation__link';
const ACTIVE_LINK_CLASS           = 'is-active';

function applyActiveLinkHighlight() {
  const navigationElement      = document.querySelector(NAVIGATION_ELEMENT_SELECTOR);
  const navigationLinkElements = document.querySelectorAll(NAVIGATION_LINK_SELECTOR);
  const sectionElements        = Array.from(document.querySelectorAll('main section[id], header[id]'));

  if (!navigationElement || navigationLinkElements.length === 0) return;

  function updateActiveLink() {
    // The active section is the last one whose top edge is above 40% of the viewport.
    // Using getBoundingClientRect works correctly for sections of any height.
    const threshold = window.innerHeight * 0.4;
    let activeSection = null;

    for (const section of sectionElements) {
      if (section.getBoundingClientRect().top <= threshold) {
        activeSection = section;
      }
    }

    if (!activeSection) return;

    const matchingLink = document.querySelector(
      `${NAVIGATION_LINK_SELECTOR}[href="#${activeSection.id}"]`
    );

    if (!matchingLink) return;

    navigationLinkElements.forEach(link => link.classList.remove(ACTIVE_LINK_CLASS));
    matchingLink.classList.add(ACTIVE_LINK_CLASS);
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

// Marginal notes are shown on :hover in CSS; this extends that to keyboard focus
// so screen-reader and keyboard users can also trigger them.
function applyMarginalNoteKeyboardAccess() {
  const noteTriggers = document.querySelectorAll('.biography-section__marginal-note-trigger');

  noteTriggers.forEach(trigger => {
    trigger.setAttribute('tabindex', '0');

    trigger.addEventListener('focus', () => {
      trigger.classList.add('is-focused');
    });

    trigger.addEventListener('blur', () => {
      trigger.classList.remove('is-focused');
    });
  });
}

function initialiseNavigationBehaviour() {
  applyActiveLinkHighlight();
  applyMarginalNoteKeyboardAccess();
}

document.addEventListener('DOMContentLoaded', initialiseNavigationBehaviour);
