'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import block from 'bem-css-modules';
import styles from './NavItem.module.scss';

const b = block(styles);

interface NavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ href, label, onClick }: NavItemProps) => {
  const pathname = usePathname();

  return (
    <li className={b('')}>
      <Link
        href={href}
        onClick={onClick}
        className={b('link', { active: pathname === href })}
      >
        {label}
      </Link>
    </li>
  );
};

export { NavItem };
