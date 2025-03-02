'use client';

import { Navigation } from './Navigation';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blogs',
    href: '/blogs',
  },
];

export function Header() {
  return (
    <header>
      <Navigation navLinks={navItems} />
    </header>
  );
}
