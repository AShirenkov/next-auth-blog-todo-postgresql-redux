'use client';

import { Navigation } from '@/widgets/layout/Navigation/Navigation';

const NAV_ITEMS = [
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
      <Navigation navLinks={NAV_ITEMS} />
    </header>
  );
}
