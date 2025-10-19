export type NavigationLink = {
  href: string;
  label: string;
};

export const primaryNavigation: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/prayers', label: 'Prayers' },
  { href: '/poetry', label: 'Poetry' },
  { href: '/courses', label: 'Courses' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export const formationNavigation: NavigationLink[] = [
  { href: '/prayers', label: 'Prayers' },
  { href: '/courses', label: 'Courses' },
  { href: '/poetry', label: 'Poetry' },
];

export const quickLinksNavigation: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];
