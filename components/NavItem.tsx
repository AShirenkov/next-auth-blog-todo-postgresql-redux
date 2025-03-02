'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import block from 'bem-css-modules';
import styles from './NavItem.module.scss';

const b = block(styles);

type NavItemProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

const NavItem = ({ href, label, onClick }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className={b('')}>
      <Link
        href={href}
        onClick={onClick}
        className={isActive ? b('link', { active: true }) : b('link')}
      >
        {label}
      </Link>
    </li>
  );
};

export { NavItem };
