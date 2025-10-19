export type NavigationLink = {
  href: string;
  label: string;
};

export const primaryNavigation: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/poetry', label: 'Poetry' },
  { href: '/courses', label: 'Courses' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export const formationNavigation: NavigationLink[] = [
  { href: '/courses', label: 'Courses' },
  { href: '/poetry', label: 'Poetry' },
  { href: '/portfolio', label: 'Portfolio' },
];

export const quickLinksNavigation: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];
