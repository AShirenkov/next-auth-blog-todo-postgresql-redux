'use client';

import { Navigation } from './Navigation';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'blogs',
    href: '/blogs',
  },
  {
    label: 'About',
    href: '/about',
  },
];

export function Header() {
  return (
    <header>
      <Navigation navLinks={navItems} />
    </header>
  );
}
